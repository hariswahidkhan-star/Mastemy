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
        if (u.AbsolutePath.EndsWith("/token"))
            return Json(new { access_token = "ya29.fake", expires_in = 3600, refresh_token = "1//refresh-fake", scope = GoogleOAuthClient.Scopes });
        if (u.AbsolutePath.EndsWith("/revoke")) return new HttpResponseMessage(HttpStatusCode.OK);
        if (u.Host == UploadHost)
        {
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
            if (HoldChunk is { } hold) await hold.Task;
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
        if (u.AbsolutePath.EndsWith("/playlistItems"))
        {
            var ids = Playlists.GetValueOrDefault(q["playlistId"]!) ?? [];
            return Json(new { items = ids.Select((v, i) => new { snippet = new { title = $"Item {i}", position = i }, contentDetails = new { videoId = v } }).ToArray() });
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
    public string DbName { get; } = "mastemy_t_" + Guid.NewGuid().ToString("N");
    public FakeYouTube Fake { get; } = new();
    private readonly Dictionary<string, string?> _settings;

    public YouTubeTestFactory(bool apiKey = true, bool oauth = true, Dictionary<string, string?>? extra = null)
    {
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
        try
        {
            using var scope = Services.CreateScope();
            await scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.EnsureDeletedAsync();
        }
        catch { /* best effort cleanup */ }
        await base.DisposeAsync();
        GC.SuppressFinalize(this);
    }
}
