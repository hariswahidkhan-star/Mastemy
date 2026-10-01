using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.YouTube;

public record PagedResult<T>(IReadOnlyList<T> Items, int Total, int Page, int PageSize);
public record ConfirmVideoRequest(bool Approve, string? Reason);

[ApiController]
public class YouTubeChannelsController(ChannelPolicy policy, ChannelService channels) : ControllerBase
{
    [HttpGet("api/youtube/channels"), Authorize(Policy = "Instructor")]
    public async Task<List<ChannelDto>> Mine() => (await policy.Usable()).Select(ChannelDto.From).ToList();

    [HttpPost("api/admin/youtube/channels"), Authorize(Policy = "Staff")]
    public async Task<ActionResult<ChannelDto>> Create(CreateChannelRequest req) => StatusCode(201, await channels.Create(req));

    [HttpDelete("api/youtube/channels/{id:guid}/authorization"), Authorize]
    public async Task<IActionResult> Revoke(Guid id, CancellationToken ct) { await channels.Revoke(id, ct); return NoContent(); }

    [HttpGet("api/youtube/oauth/start"), Authorize]
    public async Task<OAuthStartDto> Start([FromQuery] ChannelMode mode)
    {
        var r = await channels.Start(mode);
        Response.Cookies.Append(ChannelService.NonceCookieName, r.Nonce, new CookieOptions
        {
            HttpOnly = true, Secure = Request.IsHttps, SameSite = SameSiteMode.Lax, Path = "/api/youtube/oauth",
            MaxAge = ChannelService.StateLifetime, IsEssential = true,
        });
        return r.Dto;
    }

    /// <summary>Google redirects the browser here; the protected state identifies the user. Tokens are never returned.</summary>
    [HttpGet("api/youtube/oauth/callback"), AllowAnonymous]
    public Task<ChannelDto> Callback([FromQuery] string? code, [FromQuery] string? state, [FromQuery] string? error, CancellationToken ct)
    {
        var cookie = Request.Cookies[ChannelService.NonceCookieName];
        Response.Cookies.Delete(ChannelService.NonceCookieName, new CookieOptions { Path = "/api/youtube/oauth", Secure = Request.IsHttps, HttpOnly = true, SameSite = SameSiteMode.Lax });
        return channels.Callback(code, state, error, cookie, ct);
    }
}

[ApiController]
public class YouTubeVideosController(VideoLinkService videos, PlaylistImportService playlists, AppDbContext db) : ControllerBase
{
    [HttpPost("api/studio/lessons/{id:guid}/video"), Authorize(Policy = "Instructor")]
    public Task<VideoAssetDto> Link(Guid id, LinkVideoRequest req, CancellationToken ct) => videos.Link(id, req, ct);

    [HttpPost("api/studio/videos/{id:guid}/recheck"), Authorize]
    public Task<VideoAssetDto> Recheck(Guid id, CancellationToken ct) => videos.Recheck(id, ct);

    [HttpGet("api/admin/youtube/videos"), Authorize(Policy = "Reviewer")]
    public async Task<PagedResult<VideoAssetDto>> List([FromQuery] VideoStatus? status, [FromQuery] int page = 1, [FromQuery] int pageSize = 50, CancellationToken ct = default)
    {
        page = Math.Max(1, page); pageSize = Math.Clamp(pageSize, 1, 200);
        var q = db.VideoAssets.AsNoTracking().AsQueryable();
        if (status is { } s) q = q.Where(a => a.Status == s);
        var total = await q.CountAsync(ct);
        var items = await q.OrderByDescending(a => a.CreatedAt).Skip((page - 1) * pageSize).Take(pageSize).ToListAsync(ct);
        return new PagedResult<VideoAssetDto>(items.Select(VideoAssetDto.From).ToList(), total, page, pageSize);
    }

    [HttpPost("api/admin/youtube/videos/{id:guid}/confirm"), Authorize(Policy = "Reviewer")]
    public Task<VideoAssetDto> Confirm(Guid id, ConfirmVideoRequest req, CancellationToken ct) => videos.ReviewerConfirm(id, req.Approve, req.Reason, ct);

    [HttpPost("api/studio/courses/{id:guid}/import-playlist"), Authorize(Policy = "Instructor")]
    public Task<PlaylistPreviewDto> Preview(Guid id, PlaylistPreviewRequest req, CancellationToken ct) => playlists.Preview(id, req, ct);

    [HttpPost("api/studio/courses/{id:guid}/import-playlist/commit"), Authorize(Policy = "Instructor")]
    public async Task<ActionResult<PlaylistCommitResult>> Commit(Guid id, PlaylistCommitRequest req, CancellationToken ct)
        => StatusCode(201, await playlists.Commit(id, req, ct));
}

[ApiController]
public class YouTubeUploadsController(UploadRelayService uploads) : ControllerBase
{
    [HttpPost("api/youtube/uploads"), Authorize(Policy = "Instructor")]
    public async Task<ActionResult<UploadDto>> Create(CreateUploadRequest req, CancellationToken ct)
    {
        var (dto, created) = await uploads.Create(req, ct);
        return created ? StatusCode(201, dto) : Ok(dto);
    }

    [HttpGet("api/youtube/uploads/{id:guid}"), Authorize]
    public Task<UploadDto> Get(Guid id, CancellationToken ct) => uploads.Get(id, ct);

    [HttpGet("api/admin/youtube/uploads"), Authorize(Policy = "Staff")]
    public Task<List<UploadDto>> AdminList([FromQuery] UploadSessionStatus? status, CancellationToken ct) => uploads.AdminList(status, ct);

    [HttpPost("api/admin/youtube/uploads/{id:guid}/approve"), Authorize(Policy = "Staff")]
    public Task<UploadDto> Approve(Guid id, CancellationToken ct) => uploads.Approve(id, ct);

    /// <summary>Raw body chunk, streamed to YouTube. Not model-bound so the body is never buffered.</summary>
    [HttpPut("api/youtube/uploads/{id:guid}/chunk"), Authorize(Policy = "Instructor")]
    [DisableRequestSizeLimit]
    public async Task<IActionResult> Chunk(Guid id, CancellationToken ct)
    {
        try { return Ok(await uploads.Chunk(id, Request, ct)); }
        catch (UploadOffsetMismatchException ex)
        {
            var pd = new ProblemDetails { Status = 409, Title = ex.Message, Type = ex.Code };
            pd.Extensions["confirmedOffset"] = ex.ConfirmedOffset;
            return new ObjectResult(pd) { StatusCode = 409, ContentTypes = { "application/problem+json" } };
        }
    }

    [HttpPost("api/youtube/uploads/{id:guid}/resume"), Authorize(Policy = "Instructor")]
    public Task<UploadDto> Resume(Guid id, ResumeUploadRequest req, CancellationToken ct) => uploads.Resume(id, req, ct);

    [HttpDelete("api/youtube/uploads/{id:guid}"), Authorize]
    public Task<UploadDto> Cancel(Guid id, CancellationToken ct) => uploads.Cancel(id, ct);
}
