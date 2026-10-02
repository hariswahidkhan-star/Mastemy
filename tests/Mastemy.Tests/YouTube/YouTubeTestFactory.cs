using System.Collections.Concurrent;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.YouTube;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.YouTube;

/// <summary>In-process fake of the Google/YouTube endpoints used by the module.</summary>
public class FakeYouTube : HttpMessageHandler
{
    public const string UploadHost = "upload.fake.test";
    public readonly ConcurrentDictionary<string, object> Videos = new();
    public readonly ConcurrentDictionary<string, HttpStatusCode> OEmbed = new();
    public readonly ConcurrentDictionary<string, List<string>> Playlists = new();
    public volatile bool QuotaExceeded;
    public volatile bool SessionExpired;
    public readonly MemoryStream Received = new();
    public readonly List<string> ChunkRanges = [];
    public readonly ConcurrentBag<string> Requests = [];
    public string CompletedVideoId = "UpLoAdEd123";
    public string? LastInitiateBody;
    /// <summary>Signalled when an upload chunk reached the fake; the response is then held until <see cref="HoldChunk"/> completes.</summary>
    public volatile TaskCompletionSource? ChunkEntered;
    public volatile TaskCompletionSource? HoldChunk;
    public string? LastInitiateQuery;
    public string OwnChannelId = "UCownownownownownownownow";
    /// <summary>Playlists owned by the authorized channel: id -> title.</summary>
    public readonly ConcurrentDictionary<string, string> OwnPlaylists = new();
    public readonly ConcurrentBag<string> Thumbnails = [];
    public readonly ConcurrentBag<string> Captions = [];
    public volatile bool TokenRevoked;
    public volatile bool ScopeInsufficient;

    public static object Video(string id, string channel, string privacy = "public", bool embeddable = true, string upload = "processed",
        string duration = "PT4M13S", string title = "Lesson video") => new
    {
        id,
        snippet = new { channelId = channel, title },
        contentDetails = new { duration },
        status = new { privacyStatus = privacy, embeddable, uploadStatus = upload },
    };

    private static HttpResponseMessage Json(object o, HttpStatusCode code = HttpStatusCode.OK) =>
        new(code) { Content = new StringContent(JsonSerializer.Serialize(o), Encoding.UTF8, "application/json") };

    private static HttpResponseMessage Quota() => Json(new { error = new { code = 403, message = "quota", errors = new[] { new { reason = "quotaExceeded" } } } }, HttpStatusCode.Forbidden);

    protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage req, CancellationToken ct)
    {
        var u = req.RequestUri!;
        Requests.Add($"{req.Method} {u.AbsolutePath}");
        var q = System.Web.HttpUtility.ParseQueryString(u.Query);
        if (u.AbsolutePath.EndsWith("/oembed"))
        {
            var id = System.Web.HttpUtility.ParseQueryString(new Uri(q["url"]!).Query)["v"]!;
            var code = OEmbed.GetValueOrDefault(id, HttpStatusCode.NotFound);
            return code == HttpStatusCode.OK ? Json(new { title = "oEmbed title", author_name = "Someone" }) : new HttpResponseMessage(code);
        }
        if (u.AbsolutePath.EndsWith("/token") && TokenRevoked)
            return Json(new { error = "invalid_grant" }, HttpStatusCode.BadRequest);
        if (u.AbsolutePath.EndsWith("/token"))
            return Json(new { access_token = "ya29.fake", expires_in = 3600, refresh_token = "1//refresh-fake", scope = GoogleOAuthClient.Scopes });
        if (u.AbsolutePath.EndsWith("/revoke")) return new HttpResponseMessage(HttpStatusCode.OK);
        if (u.Host == UploadHost)
        {
            if (req.Method == HttpMethod.Post && u.AbsolutePath.EndsWith("/thumbnails/set"))
            {
                if (QuotaExceeded) return Quota();
                var bytes = await req.Content!.ReadAsByteArrayAsync(ct);
                Thumbnails.Add($"{q["videoId"]}:{req.Content.Headers.ContentType?.MediaType}:{bytes.Length}");
                return Json(new { items = Array.Empty<object>() });
            }
            if (req.Method == HttpMethod.Post && u.AbsolutePath.EndsWith("/captions"))
            {
                if (QuotaExceeded) return Quota();
                if (ScopeInsufficient)
                    return Json(new { error = new { code = 403, message = "scope", errors = new[] { new { reason = "insufficientPermissions" } } } }, HttpStatusCode.Forbidden);
                Captions.Add(await req.Content!.ReadAsStringAsync(ct));
                return Json(new { id = "cap" + Guid.NewGuid().ToString("N")[..8] });
            }
            if (req.Method == HttpMethod.Post)
            {
                if (QuotaExceeded) return Quota();
                LastInitiateQuery = u.Query;
                LastInitiateBody = await req.Content!.ReadAsStringAsync(ct);
                var r = new HttpResponseMessage(HttpStatusCode.OK);
                r.Headers.Location = new Uri($"https://{UploadHost}/upload/youtube/v3/videos?uploadType=resumable&upload_id=fake{Guid.NewGuid():N}");
                return r;
            }
            if (SessionExpired) return new HttpResponseMessage(HttpStatusCode.NotFound);
            var range = req.Content!.Headers.ContentRange!;
            if (range.From is null)
            {
                await req.Content.ReadAsByteArrayAsync(ct);
                return Incomplete();
            }
            ChunkRanges.Add($"{range.From}-{range.To}/{range.Length}");
            Assert.Equal(Received.Length, range.From);
            await using (var s = await req.Content.ReadAsStreamAsync(ct)) await s.CopyToAsync(Received, ct);
            if (ChunkEntered is { } entered) entered.TrySetResult();
            if (HoldChunk is { } hold) await hold.Task.WaitAsync(ct); // honours cancellation (lease-loss abort)
            if (Received.Length == range.Length) return Json(new { id = CompletedVideoId, status = new { uploadStatus = "uploaded" } });
            return Incomplete();
        }
        if (u.AbsolutePath.EndsWith("/channels"))
            return Json(new { items = new[] { new { id = OwnChannelId, snippet = new { title = "Own channel" } } } });
        if (QuotaExceeded) return Quota();
        if (u.AbsolutePath.EndsWith("/videos"))
        {
            var ids = q["id"]!.Split(',');
            return Json(new { items = ids.Where(Videos.ContainsKey).Select(i => Videos[i]).ToArray() });
        }
        if (u.AbsolutePath.EndsWith("/playlists"))
        {
            if (req.Method == HttpMethod.Post)
            {
                using var doc = JsonDocument.Parse(await req.Content!.ReadAsStringAsync(ct));
                var id = "PL" + Guid.NewGuid().ToString("N");
                Playlists[id] = [];
                OwnPlaylists[id] = doc.RootElement.GetProperty("snippet").GetProperty("title").GetString()!;
                return Json(new { id });
            }
            return Json(new { items = OwnPlaylists.Select(kv => new { id = kv.Key, snippet = new { title = kv.Value } }).ToArray() });
        }
        if (u.AbsolutePath.EndsWith("/playlistItems") && req.Method != HttpMethod.Get)
        {
            if (req.Method == HttpMethod.Delete)
            {
                var parts = q["id"]!.Split('|');
                lock (Playlists) Playlists[parts[0]].Remove(parts[1]);
                return new HttpResponseMessage(HttpStatusCode.NoContent);
            }
            using var doc = JsonDocument.Parse(await req.Content!.ReadAsStringAsync(ct));
            var sn = doc.RootElement.GetProperty("snippet");
            var pl = sn.GetProperty("playlistId").GetString()!;
            var vid = sn.GetProperty("resourceId").GetProperty("videoId").GetString()!;
            var pos = sn.GetProperty("position").GetInt32();
            lock (Playlists)
            {
                var list = Playlists[pl];
                if (req.Method == HttpMethod.Put) list.Remove(vid);
                list.Insert(Math.Min(pos, list.Count), vid);
            }
            return Json(new { id = $"{pl}|{vid}" });
        }
        if (u.AbsolutePath.EndsWith("/playlistItems"))
        {
            var pid = q["playlistId"]!;
            var ids = Playlists.GetValueOrDefault(pid) ?? [];
            return Json(new { items = ids.Select((v, i) => new { id = $"{pid}|{v}", snippet = new { title = $"Item {i}", position = i }, contentDetails = new { videoId = v } }).ToArray() });
        }
        return new HttpResponseMessage(HttpStatusCode.NotFound);
    }

    private HttpResponseMessage Incomplete()
    {
        var r = new HttpResponseMessage((HttpStatusCode)308);
        if (Received.Length > 0) r.Headers.TryAddWithoutValidation("Range", $"bytes=0-{Received.Length - 1}");
        return r;
    }
}

public class YouTubeTestFactory : WebApplicationFactory<Program>
{
    public string DbName { get; }
    /// <summary>False for a second "instance" sharing another factory's database: it must not drop it.</summary>
    public bool OwnsDatabase { get; }
    public FakeYouTube Fake { get; } = new();
    private readonly Dictionary<string, string?> _settings;

    public YouTubeTestFactory(bool apiKey = true, bool oauth = true, Dictionary<string, string?>? extra = null, string? sharedDbName = null)
    {
        DbName = sharedDbName ?? "mastemy_t_" + Guid.NewGuid().ToString("N");
        OwnsDatabase = sharedDbName is null;
        _settings = new()
        {
            ["ConnectionStrings:Default"] = $"server=localhost;port=3306;database={DbName};user=mastemy;password=mastemy_dev_pw",
            ["Jwt:Key"] = "test-signing-key-that-is-long-enough-0123456789",
            ["Database:MigrateOnStartup"] = "false",
            ["YouTube:ApiKey"] = apiKey ? "fake-api-key" : "",
            ["YouTube:OAuthClientId"] = oauth ? "client-id" : "",
            ["YouTube:OAuthClientSecret"] = oauth ? "client-secret" : "",
            ["YouTube:OAuthRedirectUri"] = oauth ? "https://mastemy.test/api/youtube/oauth/callback" : "",
            ["YouTube:ApiBaseUrl"] = "https://api.fake.test/youtube/v3",
            ["YouTube:UploadBaseUrl"] = $"https://{FakeYouTube.UploadHost}/upload/youtube/v3",
            ["YouTube:TokenUrl"] = "https://oauth.fake.test/token",
            ["YouTube:RevokeUrl"] = "https://oauth.fake.test/revoke",
            ["YouTube:OEmbedUrl"] = "https://www.fake.test/oembed",
            ["YouTube:UploadChunkBytes"] = (512 * 1024).ToString(),
            ["YouTube:RecheckHours"] = "0",
        };
        if (extra is not null) foreach (var kv in extra) _settings[kv.Key] = kv.Value;
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        foreach (var kv in _settings) builder.UseSetting(kv.Key, kv.Value);
        builder.ConfigureServices(s =>
        {
            s.AddHttpClient(YouTubeOptions.HttpClientName).ConfigurePrimaryHttpMessageHandler(() => Fake);
            s.AddHttpClient(YouTubeOptions.UploadHttpClientName).ConfigurePrimaryHttpMessageHandler(() => Fake);
        });
    }

    public async Task InitDb()
    {
        using var scope = Services.CreateScope();
        await scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.EnsureCreatedAsync();
    }

    public async Task WithDb(Func<AppDbContext, Task> f)
    {
        using var scope = Services.CreateScope();
        await f(scope.ServiceProvider.GetRequiredService<AppDbContext>());
    }

    public async Task<T> WithDb<T>(Func<AppDbContext, Task<T>> f)
    {
        using var scope = Services.CreateScope();
        return await f(scope.ServiceProvider.GetRequiredService<AppDbContext>());
    }

    public async Task<(Guid Id, HttpClient Client)> User(params string[] roles)
    {
        var u = new User { Email = $"{Guid.NewGuid():N}@t.test", DisplayName = "T", PasswordHash = "x" };
        u.NormalizedEmail = u.Email.ToUpperInvariant();
        u.Roles = roles.Select(r => new UserRole { UserId = u.Id, Role = r }).ToList();
        await WithDb(async db => { db.Users.Add(u); await db.SaveChangesAsync(); });
        var token = Services.GetRequiredService<JwtIssuer>().Issue(u);
        var c = CreateClient();
        c.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        return (u.Id, c);
    }

    public Task SetFlag(string key, bool value) => WithDb(async db =>
    {
        var s = await db.PlatformSettings.FindAsync(key);
        if (s is null) db.PlatformSettings.Add(new PlatformSetting { Key = key, Value = value ? "true" : "false" });
        else s.Value = value ? "true" : "false";
        await db.SaveChangesAsync();
    });

    public async Task<Guid> Channel(string ytChannelId, ChannelMode mode = ChannelMode.MastemyManaged, Guid? owner = null, bool authorized = false)
    {
        var protector = Services.GetRequiredService<SecretProtector>();
        var ch = new YouTubeChannel
        {
            ChannelId = ytChannelId, Title = "Ch " + ytChannelId[..6], Mode = mode, OwnerUserId = owner,
            EncryptedRefreshToken = authorized ? protector.Protect("1//refresh") : null, AuthorizedAt = authorized ? DateTime.UtcNow : null,
        };
        await WithDb(async db => { db.YouTubeChannels.Add(ch); await db.SaveChangesAsync(); });
        return ch.Id;
    }

    /// <summary>Creates a Draft course authored by <paramref name="author"/> with one module and one lesson.</summary>
    public async Task<(Guid CourseId, Guid ModuleId, Guid LessonId)> Course(Guid author, CourseStatus status = CourseStatus.Draft)
    {
        var code = Guid.NewGuid().ToString("N")[..10];
        var course = new Course { Code = code, Slug = "c-" + code, Title = "Course", OwnerId = author, Status = status };
        var module = new CourseModule { CourseId = course.Id, Code = "M1", Title = "Module", SortOrder = 1 };
        var lesson = new Lesson { ModuleId = module.Id, Code = "L1", Title = "Lesson", SortOrder = 1 };
        await WithDb(async db =>
        {
            db.Courses.Add(course);
            db.CourseInstructors.Add(new CourseInstructor { CourseId = course.Id, UserId = author, Role = CourseInstructorRole.Owner, RevenueSharePercent = 70 });
            db.Modules.Add(module);
            db.Lessons.Add(lesson);
            await db.SaveChangesAsync();
        });
        return (course.Id, module.Id, lesson.Id);
    }

    public override async ValueTask DisposeAsync()
    {
        if (OwnsDatabase) try
        {
            using var scope = Services.CreateScope();
            await scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.EnsureDeletedAsync();
        }
        catch { /* best effort cleanup */ }
        await base.DisposeAsync();
        GC.SuppressFinalize(this);
    }
}
