using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Mastemy.Api.Modules.YouTube;

public record CreateUploadRequest(Guid ChannelId, Guid? LessonId, string? Title, string? Description, string? PrivacyStatus,
    bool NotifySubscribers, bool SyntheticMediaDisclosed, string? FileName, long FileSize, string? FileFingerprint);

public record ResumeUploadRequest(string? FileFingerprint, bool Restart = false);

public record UploadDto(Guid Id, UploadSessionStatus Status, long ConfirmedOffset, long FileSize, long ChunkBytes, Guid ChannelId, Guid? LessonId,
    string Title, string PrivacyStatus, bool NotifySubscribers, bool SyntheticMediaDisclosed, string FileName, string? ResultVideoId,
    string? FailureReason, Guid UserId, Guid? ApprovedBy, DateTime CreatedAt, DateTime UpdatedAt)
{
    public static UploadDto From(YouTubeUploadSession s, long chunkBytes) => new(s.Id, s.Status, s.ConfirmedOffset, s.FileSize, chunkBytes,
        s.ChannelId, s.LessonId, s.Title, s.PrivacyStatus, s.NotifySubscribers, s.SyntheticMediaDisclosed, s.FileName, s.ResultVideoId,
        s.FailureReason, s.UserId, s.ApprovedBy, s.CreatedAt, s.UpdatedAt);
}

/// <summary>Thrown when a chunk does not start at the server-confirmed offset; the controller returns 409 with the offset.</summary>
public class UploadOffsetMismatchException(long confirmedOffset)
    : AppException(409, $"Chunk must start at the confirmed offset {confirmedOffset}.", "offset_mismatch")
{
    public long ConfirmedOffset { get; } = confirmedOffset;
}

/// <summary>
/// Resumable relay to YouTube (spec §10.3). Each chunk is streamed from the incoming request body straight to the
/// upstream resumable session: nothing is written to disk or the database and at most one copy-buffer is held in memory.
/// The upstream session URI and OAuth tokens never leave the server.
/// </summary>
public partial class UploadRelayService(AppDbContext db, ICurrentUser me, AccessService access, AuditService audit, FeatureFlagService flags,
    ChannelPolicy channels, GoogleOAuthClient google, IHttpClientFactory http, IOptions<YouTubeOptions> options, ILogger<UploadRelayService> log,
    IServiceScopeFactory scopes)
{
    public const long MaxFileBytes = 256L * 1024 * 1024 * 1024; // YouTube limit: 256 GB
    private static readonly UploadSessionStatus[] ActiveStatuses =
        [UploadSessionStatus.AwaitingApproval, UploadSessionStatus.Approved, UploadSessionStatus.AwaitingSourceFile, UploadSessionStatus.Uploading];

    [GeneratedRegex(@"^bytes (\d{1,15})-(\d{1,15})/(\d{1,15})$")] private static partial Regex ContentRangeRx();
    [GeneratedRegex(@"^bytes=0-(\d{1,15})$")] private static partial Regex RangeRx();

    private YouTubeOptions O => options.Value;
    private long ChunkBytes => O.EffectiveChunkBytes;
    private UploadDto Dto(YouTubeUploadSession s) => UploadDto.From(s, ChunkBytes);

    private async Task RequireEnabled()
    {
        if (!await flags.IsEnabled(FeatureFlags.YouTubeApiUploadsEnabled))
            throw new AppException(403, "YouTube API uploads are disabled. Upload in YouTube Studio and link the video instead.", YouTubeErrors.UploadsDisabled);
    }

    private async Task<YouTubeUploadSession> Own(Guid id, CancellationToken ct, bool allowStaff = false)
    {
        var uid = me.RequireId();
        var s = await db.UploadSessions.FirstOrDefaultAsync(x => x.Id == id, ct) ?? throw AppException.NotFound("Upload");
        if (s.UserId != uid && !(allowStaff && me.IsStaff)) throw AppException.NotFound("Upload");
        return s;
    }

    public async Task<(UploadDto Dto, bool Created)> Create(CreateUploadRequest req, CancellationToken ct)
    {
        var uid = me.RequireId();
        await RequireEnabled();
        var title = req.Title?.Trim() ?? "";
        if (title.Length is 0 or > 100 || title.IndexOfAny(['<', '>']) >= 0) throw AppException.Bad("Title is required, at most 100 characters, without < or >.");
        var description = req.Description ?? "";
        if (description.Length > 5000 || description.IndexOfAny(['<', '>']) >= 0) throw AppException.Bad("Description must be at most 5000 characters, without < or >.");
        var privacy = req.PrivacyStatus?.Trim().ToLowerInvariant();
        if (privacy is not ("private" or "unlisted" or "public")) throw AppException.Bad("Privacy must be private, unlisted or public.");
        var fileName = Path.GetFileName(req.FileName?.Trim() ?? "");
        if (fileName.Length is 0 or > 255) throw AppException.Bad("File name is required (max 255 characters).");
        if (req.FileSize <= 0 || req.FileSize > MaxFileBytes) throw AppException.Bad("File size must be between 1 byte and 256 GB.");
        var fp = req.FileFingerprint?.Trim() ?? "";
        if (fp.Length is < 8 or > 128) throw AppException.Bad("File fingerprint is required (8-128 characters).");

        var channel = await channels.RequireUsable(req.ChannelId);
        if (req.LessonId is { } lessonId)
        {
            var courseId = await db.Lessons.Where(l => l.Id == lessonId).Join(db.Modules, l => l.ModuleId, m => m.Id, (l, m) => (Guid?)m.CourseId)
                               .FirstOrDefaultAsync(ct) ?? throw AppException.NotFound("Lesson");
            await access.RequireCourseEditor(courseId);
        }

        // Duplicate protection: the same file to the same channel resumes the existing intent.
        var dup = await db.UploadSessions.FirstOrDefaultAsync(s => s.UserId == uid && s.ChannelId == channel.Id && s.FileFingerprint == fp
                                                                   && s.FileSize == req.FileSize && ActiveStatuses.Contains(s.Status), ct);
        if (dup is not null) return (Dto(dup), false);

        var active = await db.UploadSessions.CountAsync(s => s.UserId == uid && ActiveStatuses.Contains(s.Status), ct);
        if (active >= Math.Max(1, O.MaxConcurrentUploadsPerUser))
            throw AppException.Conflict($"You already have {active} active uploads. Finish or cancel one first.", "too_many_uploads");

        var s = new YouTubeUploadSession
        {
            UserId = uid, ChannelId = channel.Id, LessonId = req.LessonId, Title = title, Description = description, PrivacyStatus = privacy,
            NotifySubscribers = req.NotifySubscribers, SyntheticMediaDisclosed = req.SyntheticMediaDisclosed, FileName = fileName,
            FileSize = req.FileSize, FileFingerprint = fp, Status = UploadSessionStatus.AwaitingApproval,
        };
        db.UploadSessions.Add(s);
        audit.Record("youtube.upload.requested", "YouTubeUploadSession", s.Id, new { channelId = channel.Id, title, privacy, s.FileSize, s.NotifySubscribers });
        await db.SaveChangesAsync(ct);
        return (Dto(s), true);
    }

    public async Task<UploadDto> Get(Guid id, CancellationToken ct) => Dto(await Own(id, ct, allowStaff: true));

    public async Task<List<UploadDto>> AdminList(UploadSessionStatus? status, CancellationToken ct)
    {
        var q = db.UploadSessions.AsNoTracking().AsQueryable();
        if (status is { } st) q = q.Where(s => s.Status == st);
        return (await q.OrderByDescending(s => s.CreatedAt).Take(200).ToListAsync(ct)).Select(Dto).ToList();
    }

    public async Task<UploadDto> Approve(Guid id, CancellationToken ct)
    {
        var uid = me.RequireId();
        if (!me.IsStaff) throw AppException.Forbidden();
        await RequireEnabled();
        var s = await db.UploadSessions.FirstOrDefaultAsync(x => x.Id == id, ct) ?? throw AppException.NotFound("Upload");
        if (s.Status != UploadSessionStatus.AwaitingApproval) throw AppException.Conflict($"Upload is {s.Status}.", "invalid_state");
        var ch = await db.YouTubeChannels.FirstAsync(c => c.Id == s.ChannelId, ct);
        if (!ChannelPolicy.IsAuthorized(ch))
            throw AppException.Conflict("The channel has no active OAuth authorization. Connect it before approving uploads.", "channel_not_authorized");
        s.Status = UploadSessionStatus.Approved;
        s.ApprovedBy = uid;
        s.UpdatedAt = DateTime.UtcNow;
        audit.Record("youtube.upload.approved", "YouTubeUploadSession", s.Id,
            new { channel = ch.ChannelId, s.Title, s.PrivacyStatus, s.NotifySubscribers, s.SyntheticMediaDisclosed });
        await db.SaveChangesAsync(ct);
        return Dto(s);
    }

    /// <summary>
    /// Cancels an upload. Takes the session's database lease when it is free (polling for up to 2 seconds); if a chunk transfer
    /// is in flight on any instance the cancellation is still applied with a conditional update (the cancel request is recorded
    /// in the row), and the in-flight chunk holder's own conditional writes then fail, so a cancelled session is never overwritten.
    /// </summary>
    public async Task<UploadDto> Cancel(Guid id, CancellationToken ct)
    {
        var s = await Own(id, ct, allowStaff: true);
        var lease = await WaitLease(s.Id, TimeSpan.FromSeconds(2), ct);
        var held = lease is not null;
        try
        {
            await db.Entry(s).ReloadAsync(ct);
            if (s.Status == UploadSessionStatus.Cancelled) return Dto(s);
            if (s.Status is UploadSessionStatus.Completed) throw AppException.Conflict("Upload already completed; manage the video on YouTube.", "invalid_state");
            // Nothing is deleted on YouTube; the upstream session is simply abandoned and expires there.
            var now = DateTime.UtcNow;
            var n = await db.UploadSessions
                .Where(x => x.Id == s.Id && x.Status != UploadSessionStatus.Completed && x.Status != UploadSessionStatus.Cancelled)
                .ExecuteUpdateAsync(u => u.SetProperty(x => x.Status, UploadSessionStatus.Cancelled)
                    .SetProperty(x => x.UpstreamSessionUri, (string?)null).SetProperty(x => x.UpdatedAt, now), ct);
            await db.Entry(s).ReloadAsync(ct);
            if (n == 0)
            {
                if (s.Status is UploadSessionStatus.Completed) throw AppException.Conflict("Upload already completed; manage the video on YouTube.", "invalid_state");
                return Dto(s);
            }
            audit.Record("youtube.upload.cancelled", "YouTubeUploadSession", s.Id, new { duringTransfer = !held });
            await db.SaveChangesAsync(ct);
            return Dto(s);
        }
        finally { if (lease is not null) await ReleaseLease(s.Id, lease); }
    }

    // ---- Cross-instance chunk lease (YouTubeUploadSession.LockToken / LockedUntil) ----

    private TimeSpan LeaseDuration => TimeSpan.FromSeconds(Math.Max(5, O.UploadLeaseSeconds));

    /// <summary>Single conditional UPDATE: takes the lease only when it is free or expired. Returns the lease token or null.</summary>
    private async Task<string?> TryLease(Guid id, CancellationToken ct)
    {
        var token = Tokens.Random(16);
        var now = DateTime.UtcNow;
        var until = now.Add(LeaseDuration);
        var n = await db.UploadSessions.Where(x => x.Id == id && (x.LockedUntil == null || x.LockedUntil < now))
            .ExecuteUpdateAsync(u => u.SetProperty(x => x.LockToken, token).SetProperty(x => x.LockedUntil, until), ct);
        return n == 1 ? token : null;
    }

    private async Task<string?> WaitLease(Guid id, TimeSpan wait, CancellationToken ct)
    {
        var deadline = DateTime.UtcNow + wait;
        while (true)
        {
            if (await TryLease(id, ct) is { } token) return token;
            if (DateTime.UtcNow >= deadline) return null;
            await Task.Delay(100, ct);
        }
    }

    /// <summary>Releases the lease only if this holder still owns it (by token).</summary>
    private Task ReleaseLease(Guid id, string token) => db.UploadSessions.Where(x => x.Id == id && x.LockToken == token)
        .ExecuteUpdateAsync(u => u.SetProperty(x => x.LockToken, (string?)null).SetProperty(x => x.LockedUntil, (DateTime?)null), CancellationToken.None);

    /// <summary>
    /// Keeps a lease alive while a long upstream write is in progress (renews every third of the lease duration through its own
    /// DbContext, since the request's context is busy). Renewal is by token, so a lease that was lost is never re-taken.
    /// When the lease is lost (another holder took it) or renewal fails twice in a row, <paramref name="onLost"/> is cancelled so
    /// the in-flight upstream transfer is aborted and this (now stale) holder stops before writing anything.
    /// </summary>
    private sealed class LeaseRenewer : IAsyncDisposable
    {
        public const int MaxConsecutiveFailures = 2;
        private readonly CancellationTokenSource _stop = new();
        private readonly Task _loop;
        private volatile bool _lost;
        public bool Lost => _lost;

        public LeaseRenewer(IServiceScopeFactory scopes, Guid id, string token, TimeSpan lease, ILogger log, CancellationTokenSource onLost)
        {
            _loop = Task.Run(async () =>
            {
                using var timer = new PeriodicTimer(lease / 3);
                var failures = 0;
                try
                {
                    while (await timer.WaitForNextTickAsync(_stop.Token))
                    {
                        try
                        {
                            using var scope = scopes.CreateScope();
                            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                            var until = DateTime.UtcNow.Add(lease);
                            var n = await db.UploadSessions.Where(x => x.Id == id && x.LockToken == token)
                                .ExecuteUpdateAsync(u => u.SetProperty(x => x.LockedUntil, until), _stop.Token);
                            if (n == 0)
                            {
                                log.LogWarning("Upload lease for session {Session} was lost; aborting the in-flight transfer", id);
                                break;
                            }
                            failures = 0;
                        }
                        catch (Exception ex) when (ex is not OperationCanceledException)
                        {
                            log.LogWarning(ex, "Upload lease renewal failed for {Session}", id);
                            if (++failures >= MaxConsecutiveFailures) break;
                        }
                    }
                    if (!_stop.IsCancellationRequested)
                    {
                        _lost = true;
                        await onLost.CancelAsync();
                    }
                }
                catch (OperationCanceledException) { }
                catch (ObjectDisposedException) { }
            });
        }

        public async ValueTask DisposeAsync()
        {
            await _stop.CancelAsync();
            try { await _loop; } catch (OperationCanceledException) { }
            _stop.Dispose();
        }
    }

    /// <summary>Statuses from which the relay itself may write session state (never Cancelled/Completed/Failed).</summary>
    private static readonly UploadSessionStatus[] RelayWritable =
        [UploadSessionStatus.Approved, UploadSessionStatus.Uploading, UploadSessionStatus.AwaitingSourceFile, UploadSessionStatus.Expired];

    /// <summary>
    /// Writes the relay-owned session fields only if the row is still in a relay-writable status (conditional UPDATE), then saves
    /// any other pending changes (audit, assets). Returns false when the session was cancelled/failed concurrently; the in-memory
    /// entity is then reloaded from the database.
    /// </summary>
    private async Task<bool> Persist(YouTubeUploadSession s)
    {
        // Every relay write happens under a lease; the write is conditional on still holding it (by token), so a stale holder
        // whose lease expired and was taken over can never overwrite ConfirmedOffset/Status written by the new holder.
        var lease = _leaseToken ?? throw new InvalidOperationException("Relay writes require the session lease.");
        // Snapshot first: the values are passed as query parameters (not read from the tracked entity during the update).
        var (id, status, offset, uri, failure, result, updated) =
            (s.Id, s.Status, s.ConfirmedOffset, s.UpstreamSessionUri, s.FailureReason, s.ResultVideoId, s.UpdatedAt);
        var n = await db.UploadSessions.Where(x => x.Id == id && x.LockToken == lease && RelayWritable.Contains(x.Status))
            .ExecuteUpdateAsync(u => u.SetProperty(x => x.Status, status).SetProperty(x => x.ConfirmedOffset, offset)
                .SetProperty(x => x.UpstreamSessionUri, uri).SetProperty(x => x.FailureReason, failure)
                .SetProperty(x => x.ResultVideoId, result).SetProperty(x => x.UpdatedAt, updated), CancellationToken.None);
        // Accept the in-memory values as persisted so SaveChanges never issues an unconditional UPDATE for the session
        // (setting State = Unchanged would revert the current values to the originals).
        var entry = db.Entry(s);
        entry.OriginalValues.SetValues(entry.CurrentValues);
        entry.State = EntityState.Unchanged;
        if (n == 0 && !await db.UploadSessions.AnyAsync(x => x.Id == id && x.LockToken == lease, CancellationToken.None))
        {
            // Lease lost: discard everything this holder staged (audit, assets) and stop.
            db.ChangeTracker.Clear();
            throw LeaseLost();
        }
        await db.SaveChangesAsync(CancellationToken.None);
        if (n == 0) await db.Entry(s).ReloadAsync(CancellationToken.None);
        return n == 1;
    }

    /// <summary>Lease token held by this request (scoped service: one request at a time).</summary>
    private string? _leaseToken;

    private static AppException LeaseLost() =>
        AppException.Conflict("Another transfer took over this upload. Query the upload status and resume.", "lease_lost");

    public async Task<UploadDto> Resume(Guid id, ResumeUploadRequest req, CancellationToken ct)
    {
        await RequireEnabled();
        var s = await Own(id, ct);
        if (!string.Equals(req.FileFingerprint?.Trim(), s.FileFingerprint, StringComparison.Ordinal))
            throw AppException.Conflict("The selected file does not match the file this upload was started with.", YouTubeErrors.FileMismatch);
        var lease = await TryLease(s.Id, ct) ?? throw AppException.Conflict("A chunk is being transferred for this upload.", "chunk_in_progress");
        _leaseToken = lease;
        using var linked = CancellationTokenSource.CreateLinkedTokenSource(ct);
        try
        {
            await db.Entry(s).ReloadAsync(ct);
            await using var renew = new LeaseRenewer(scopes, s.Id, lease, LeaseDuration, log, linked);
            ct = linked.Token;
            try { await ResumeLocked(s, req, ct); }
            catch (OperationCanceledException) when (renew.Lost) { throw LeaseLost(); }
            return Dto(s);
        }
        finally { _leaseToken = null; await ReleaseLease(s.Id, lease); }
    }

    private async Task ResumeLocked(YouTubeUploadSession s, ResumeUploadRequest req, CancellationToken ct)
    {
        {
            switch (s.Status)
            {
                case UploadSessionStatus.Expired:
                    if (!req.Restart) throw AppException.Conflict("The YouTube upload session expired. Restart the upload from the beginning.", "upload_session_expired");
                    s.Status = UploadSessionStatus.Approved; s.ConfirmedOffset = 0; s.UpstreamSessionUri = null; s.FailureReason = null;
                    audit.Record("youtube.upload.restarted", "YouTubeUploadSession", s.Id);
                    break;
                case UploadSessionStatus.Approved:
                    break;
                case UploadSessionStatus.Uploading or UploadSessionStatus.AwaitingSourceFile:
                    if (s.UpstreamSessionUri is null) { s.Status = UploadSessionStatus.Approved; s.ConfirmedOffset = 0; break; }
                    await QueryUpstream(s, ct);
                    break;
                default:
                    throw AppException.Conflict($"Upload is {s.Status} and cannot be resumed.", "invalid_state");
            }
            s.UpdatedAt = DateTime.UtcNow;
            await Persist(s);
        }
    }

    /// <summary>Streams one chunk of the request body to the upstream resumable session.</summary>
    public async Task<UploadDto> Chunk(Guid id, HttpRequest request, CancellationToken ct)
    {
        await RequireEnabled();
        var s = await Own(id, ct);

        var m = ContentRangeRx().Match(request.Headers.ContentRange.ToString().Trim());
        if (!m.Success) throw AppException.Bad("Content-Range header 'bytes start-end/total' is required.", "invalid_content_range");
        var start = long.Parse(m.Groups[1].Value);
        var end = long.Parse(m.Groups[2].Value);
        var total = long.Parse(m.Groups[3].Value);
        if (total != s.FileSize) throw AppException.Bad($"Content-Range total must equal the declared file size {s.FileSize}.", "invalid_content_range");
        if (end < start || end >= total) throw AppException.Bad("Content-Range is out of bounds.", "invalid_content_range");
        var length = end - start + 1;
        if (request.ContentLength is not { } cl || cl != length) throw AppException.Bad("Content-Length must equal the Content-Range length.", "invalid_content_range");
        if (length > ChunkBytes) throw AppException.Bad($"Chunk exceeds the maximum of {ChunkBytes} bytes.", "chunk_too_large");
        var isFinal = end + 1 == total;
        if (!isFinal && length % YouTubeOptions.ChunkGranularity != 0)
            throw AppException.Bad("Non-final chunks must be a multiple of 256 KiB.", "invalid_chunk_size");

        var lease = await TryLease(s.Id, ct) ?? throw AppException.Conflict("A chunk is already being transferred for this upload.", "chunk_in_progress");
        _leaseToken = lease;
        using var linked = CancellationTokenSource.CreateLinkedTokenSource(ct);
        try
        {
            await db.Entry(s).ReloadAsync(ct);
            await using var renew = new LeaseRenewer(scopes, s.Id, lease, LeaseDuration, log, linked);
            try { return await ChunkLocked(s, request, start, end, total, length, renew, linked.Token); }
            catch (OperationCanceledException) when (renew.Lost) { throw LeaseLost(); }
        }
        finally { _leaseToken = null; await ReleaseLease(s.Id, lease); }
    }

    private async Task<UploadDto> ChunkLocked(YouTubeUploadSession s, HttpRequest request, long start, long end, long total, long length,
        LeaseRenewer renew, CancellationToken ct)
    {
        {
            switch (s.Status)
            {
                case UploadSessionStatus.Approved or UploadSessionStatus.Uploading: break;
                case UploadSessionStatus.AwaitingApproval: throw AppException.Conflict("Upload has not been approved yet.", "not_approved");
                case UploadSessionStatus.AwaitingSourceFile: throw AppException.Conflict("Transfer was interrupted. Reselect the file and resume.", "resume_required");
                case UploadSessionStatus.Expired: throw AppException.Conflict("The YouTube upload session expired. Restart the upload.", "upload_session_expired");
                default: throw AppException.Conflict($"Upload is {s.Status}.", "invalid_state");
            }
            if (start != s.ConfirmedOffset) throw new UploadOffsetMismatchException(s.ConfirmedOffset);

            var channel = await db.YouTubeChannels.FirstAsync(c => c.Id == s.ChannelId, ct);
            var token = await google.GetAccessToken(channel, ct);
            if (s.UpstreamSessionUri is null)
            {
                if (start != 0) throw new UploadOffsetMismatchException(0);
                s.UpstreamSessionUri = await Initiate(s, token, ct);
                s.Status = UploadSessionStatus.Uploading;
                s.UpdatedAt = DateTime.UtcNow;
                audit.Record("youtube.upload.started", "YouTubeUploadSession", s.Id);
                if (!await Persist(s)) throw AppException.Conflict($"Upload is {s.Status}.", "invalid_state");
            }

            using var body = new BoundedReadStream(request.Body, length);
            using var content = new StreamContent(body, 64 * 1024);
            content.Headers.ContentLength = length;
            content.Headers.ContentRange = new ContentRangeHeaderValue(start, end, total);
            content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
            using var up = new HttpRequestMessage(HttpMethod.Put, s.UpstreamSessionUri) { Content = content };
            up.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            HttpResponseMessage resp;
            try { resp = await http.CreateClient(YouTubeOptions.UploadHttpClientName).SendAsync(up, HttpCompletionOption.ResponseHeadersRead, ct); }
            catch (Exception ex) when (ex is HttpRequestException or IOException or OperationCanceledException or BadHttpRequestException)
            {
                // Stale holder (lease taken over or renewal failing): abort without touching session state.
                if (renew.Lost) throw LeaseLost();
                log.LogWarning(ex, "Upload relay interrupted for session {Session}", s.Id);
                await Interrupted(s, "Transfer was interrupted. Reselect the same file and resume.");
                throw new AppException(502, "The transfer to YouTube was interrupted. Reselect the file and resume.", "transfer_interrupted");
            }
            using (resp) await HandleUpstreamResponse(s, resp, channel, ct);
            return Dto(s);
        }
    }

    private async Task Interrupted(YouTubeUploadSession s, string reason)
    {
        s.Status = UploadSessionStatus.AwaitingSourceFile;
        s.FailureReason = reason;
        s.UpdatedAt = DateTime.UtcNow;
        await Persist(s);
    }

    private async Task<string> Initiate(YouTubeUploadSession s, string token, CancellationToken ct)
    {
        var url = $"{O.UploadBaseUrl.TrimEnd('/')}/videos?uploadType=resumable&part=snippet,status&notifySubscribers={(s.NotifySubscribers ? "true" : "false")}";
        var meta = new
        {
            snippet = new { title = s.Title, description = s.Description },
            status = new { privacyStatus = s.PrivacyStatus, containsSyntheticMedia = s.SyntheticMediaDisclosed, selfDeclaredMadeForKids = false },
        };
        using var req = new HttpRequestMessage(HttpMethod.Post, url)
        {
            Content = new StringContent(JsonSerializer.Serialize(meta), Encoding.UTF8, "application/json"),
        };
        req.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
        req.Headers.Add("X-Upload-Content-Length", s.FileSize.ToString());
        req.Headers.Add("X-Upload-Content-Type", "application/octet-stream");
        HttpResponseMessage resp;
        try { resp = await http.CreateClient(YouTubeOptions.UploadHttpClientName).SendAsync(req, ct); }
        catch (HttpRequestException) { throw new AppException(502, "YouTube upload service is unreachable.", YouTubeErrors.Upstream); }
        using (resp)
        {
            if (!resp.IsSuccessStatusCode)
            {
                var err = YouTubeErrors.FromResponse(resp.StatusCode, await resp.Content.ReadAsStringAsync(ct));
                if (resp.StatusCode == HttpStatusCode.Unauthorized) GoogleOAuthClient.Forget(s.ChannelId);
                // Quota exhausted: the intent stays Approved (queued); the source file is required again when transfer starts.
                throw err.ToAppException();
            }
            var loc = resp.Headers.Location;
            if (loc is null || !IsTrustedUploadUri(loc)) throw new AppException(502, "YouTube did not return a valid upload session.", YouTubeErrors.Upstream);
            return loc.ToString();
        }
    }

    private bool IsTrustedUploadUri(Uri u)
    {
        if (!u.IsAbsoluteUri) return false;
        var baseUri = new Uri(O.UploadBaseUrl);
        return u.Scheme == baseUri.Scheme && string.Equals(u.Host, baseUri.Host, StringComparison.OrdinalIgnoreCase) && u.Port == baseUri.Port;
    }

    private async Task QueryUpstream(YouTubeUploadSession s, CancellationToken ct)
    {
        var channel = await db.YouTubeChannels.FirstAsync(c => c.Id == s.ChannelId, ct);
        var token = await google.GetAccessToken(channel, ct);
        using var content = new ByteArrayContent([]);
        content.Headers.ContentLength = 0;
        content.Headers.ContentRange = new ContentRangeHeaderValue(s.FileSize);
        using var req = new HttpRequestMessage(HttpMethod.Put, s.UpstreamSessionUri) { Content = content };
        req.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
        HttpResponseMessage resp;
        try { resp = await http.CreateClient(YouTubeOptions.UploadHttpClientName).SendAsync(req, ct); }
        catch (HttpRequestException) { throw new AppException(502, "YouTube upload service is unreachable. Try resuming again.", YouTubeErrors.Upstream); }
        using (resp) await HandleUpstreamResponse(s, resp, channel, ct);
    }

    private async Task HandleUpstreamResponse(YouTubeUploadSession s, HttpResponseMessage resp, YouTubeChannel channel, CancellationToken ct)
    {
        var code = (int)resp.StatusCode;
        s.UpdatedAt = DateTime.UtcNow;
        if (code == 308)
        {
            long offset = 0;
            if (resp.Headers.TryGetValues("Range", out var ranges))
            {
                var rm = RangeRx().Match(ranges.FirstOrDefault()?.Trim() ?? "");
                if (rm.Success) offset = long.Parse(rm.Groups[1].Value) + 1;
            }
            if (offset > s.FileSize) offset = s.FileSize;
            s.ConfirmedOffset = offset;
            s.Status = UploadSessionStatus.Uploading;
            s.FailureReason = null;
            await Persist(s);
            return;
        }
        if (code is 200 or 201)
        {
            string? videoId = null;
            try
            {
                using var doc = JsonDocument.Parse(await resp.Content.ReadAsStringAsync(ct));
                if (doc.RootElement.TryGetProperty("id", out var idEl) && idEl.ValueKind == JsonValueKind.String) videoId = idEl.GetString();
            }
            catch (JsonException) { }
            if (!YouTubeUrlParser.IsValidVideoId(videoId))
            {
                await Interrupted(s, "YouTube completed the upload but returned no video id. Resume to query its status.");
                throw new AppException(502, "YouTube returned an invalid completion response.", YouTubeErrors.Upstream);
            }
            await Complete(s, videoId!, channel, ct);
            return;
        }
        if (code is 404 or 410)
        {
            s.Status = UploadSessionStatus.Expired;
            s.UpstreamSessionUri = null;
            s.ConfirmedOffset = 0;
            s.FailureReason = "The YouTube upload session expired. Restart the upload with the same file.";
            if (!await Persist(s)) throw AppException.Conflict($"Upload is {s.Status}.", "invalid_state");
            throw AppException.Conflict(s.FailureReason!, "upload_session_expired");
        }
        var err = YouTubeErrors.FromResponse(resp.StatusCode, await resp.Content.ReadAsStringAsync(ct));
        if (code == 401) GoogleOAuthClient.Forget(channel.Id);
        await Interrupted(s, err.IsQuota ? "YouTube API quota exhausted; resume after the quota resets." : $"YouTube returned {code}; resume to verify the uploaded offset.");
        throw err.ToAppException();
    }

    private async Task Complete(YouTubeUploadSession s, string videoId, YouTubeChannel channel, CancellationToken ct)
    {
        // The bytes are on YouTube regardless of a concurrent cancel: always record the asset.
        var asset = await db.VideoAssets.FirstOrDefaultAsync(a => a.YouTubeVideoId == videoId && a.ChannelId == channel.Id, CancellationToken.None);
        if (asset is null)
        {
            asset = new VideoAsset { YouTubeVideoId = videoId, ChannelId = channel.Id, UploaderId = s.UserId };
            db.VideoAssets.Add(asset);
            asset.ObservedChannelId = channel.ChannelId;
            asset.Title = s.Title;
            asset.Status = VideoStatus.Processing;
            asset.PrivacyStatus = s.PrivacyStatus;
            asset.StatusReason = s.PrivacyStatus == "private"
                ? "Uploaded as private: not learner-ready until made public/unlisted (unverified API projects are locked to private)."
                : "Uploaded via API; waiting for YouTube processing. Recheck before publication.";
            asset.RightsDeclared = true;
            asset.RightsDeclarationText = $"Rights and metadata approved before transfer by staff user {s.ApprovedBy}.";
            asset.VideoOwnerUserId = channel.Mode == ChannelMode.InstructorOwned ? channel.OwnerUserId : null;
            asset.LastCheckedAt = DateTime.UtcNow;
        }

        s.Status = UploadSessionStatus.Completed;
        s.ResultVideoId = videoId;
        s.ConfirmedOffset = s.FileSize;
        s.UpstreamSessionUri = null;
        s.FailureReason = null;
        s.UpdatedAt = DateTime.UtcNow;
        if (await Persist(s))
        {
            if (s.LessonId is { } lessonId)
            {
                var lesson = await db.Lessons.FirstOrDefaultAsync(l => l.Id == lessonId, CancellationToken.None);
                if (lesson is not null)
                {
                    var course = await db.Modules.Where(m => m.Id == lesson.ModuleId).Join(db.Courses, m => m.CourseId, c => c.Id, (m, c) => c).FirstOrDefaultAsync(CancellationToken.None);
                    if (course is not null && CourseRules.IsEditable(course.Status)) lesson.VideoAssetId = asset.Id;
                }
            }
            audit.Record("youtube.upload.completed", "YouTubeUploadSession", s.Id, new { videoId, assetId = asset.Id });
            await db.SaveChangesAsync(CancellationToken.None);
            return;
        }

        // Cancelled (or failed) while the final chunk was in flight: keep the session's terminal status, remember the video,
        // and do not attach it to the lesson.
        const string reason = "Cancelled while the final chunk was in transfer; YouTube completed the upload. The video was recorded but not linked to the lesson.";
        var now = DateTime.UtcNow;
        await db.UploadSessions.Where(x => x.Id == s.Id && x.Status == UploadSessionStatus.Cancelled)
            .ExecuteUpdateAsync(u => u.SetProperty(x => x.ResultVideoId, videoId).SetProperty(x => x.FailureReason, reason)
                .SetProperty(x => x.ConfirmedOffset, s.FileSize).SetProperty(x => x.UpdatedAt, now), CancellationToken.None);
        audit.Record("youtube.upload.completed_after_cancel", "YouTubeUploadSession", s.Id, new { videoId, assetId = asset.Id, status = s.Status.ToString() });
        await db.SaveChangesAsync(CancellationToken.None);
        await db.Entry(s).ReloadAsync(CancellationToken.None);
    }
}

/// <summary>Read-only forward stream exposing exactly <c>length</c> bytes of the inner stream (never buffers).</summary>
public sealed class BoundedReadStream(Stream inner, long length) : Stream
{
    private long _remaining = length;
    public override bool CanRead => true;
    public override bool CanSeek => false;
    public override bool CanWrite => false;
    public override long Length => length;
    public override long Position { get => length - _remaining; set => throw new NotSupportedException(); }
    public override void Flush() { }
    public override long Seek(long offset, SeekOrigin origin) => throw new NotSupportedException();
    public override void SetLength(long value) => throw new NotSupportedException();
    public override void Write(byte[] buffer, int offset, int count) => throw new NotSupportedException();
    public override int Read(byte[] buffer, int offset, int count) => ReadAsync(buffer.AsMemory(offset, count)).AsTask().GetAwaiter().GetResult();
    public override Task<int> ReadAsync(byte[] buffer, int offset, int count, CancellationToken ct) => ReadAsync(buffer.AsMemory(offset, count), ct).AsTask();

    public override async ValueTask<int> ReadAsync(Memory<byte> buffer, CancellationToken ct = default)
    {
        if (_remaining <= 0) return 0;
        var max = (int)Math.Min(buffer.Length, _remaining);
        var n = await inner.ReadAsync(buffer[..max], ct);
        if (n == 0) throw new IOException("Request body ended before the declared chunk length.");
        _remaining -= n;
        return n;
    }
}
