using System.Buffers.Binary;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Sockets;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.Trust;

/// <summary>Real MySQL database (unique per fixture) shared by one or more API factories with different settings.</summary>
public class TrustDb : IAsyncLifetime
{
    public static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web) { Converters = { new JsonStringEnumConverter() } };
    public string DbName { get; } = "mastemy_t_" + Guid.NewGuid().ToString("N");
    public string RootPath { get; } = Path.Combine(Path.GetTempPath(), "mastemy-trust-" + Guid.NewGuid().ToString("N"));
    private readonly List<WebApplicationFactory<Program>> _factories = [];
    public WebApplicationFactory<Program> Factory { get; private set; } = null!;

    public string ConnectionString =>
        Environment.GetEnvironmentVariable("MASTEMY_TEST_MYSQL") is { Length: > 0 } baseCs
            ? $"{baseCs};Database={DbName}"
            : $"Server=localhost;Port=3306;Database={DbName};User=mastemy;Password=mastemy_dev_pw;";

    protected virtual Dictionary<string, string?> Settings => new();

    public WebApplicationFactory<Program> CreateFactory(Dictionary<string, string?> settings)
    {
        var f = new WebApplicationFactory<Program>().WithWebHostBuilder(b =>
        {
            b.UseSetting("ConnectionStrings:Default", ConnectionString);
            b.UseSetting("Jwt:Key", "test-signing-key-0123456789-abcdefghijklmnop");
            b.UseSetting("Security:RequireMfaForPrivileged", "false");
            b.UseSetting("Database:MigrateOnStartup", "false");
            b.UseSetting("RateLimits:AuthPerMinute", "1000");
            b.UseSetting("Resources:RootPath", RootPath);
            b.UseSetting("Trust:ComplaintsPerHourPerIp", "1000");
            foreach (var kv in settings) b.UseSetting(kv.Key, kv.Value);
        });
        _factories.Add(f);
        return f;
    }

    public virtual async Task InitializeAsync()
    {
        Factory = CreateFactory(Settings);
        await WithDb(db => db.Database.EnsureCreatedAsync());
    }

    public virtual async Task DisposeAsync()
    {
        await WithDb(db => db.Database.EnsureDeletedAsync());
        foreach (var f in _factories) await f.DisposeAsync();
        try { Directory.Delete(RootPath, true); } catch (IOException) { }
    }

    public async Task WithDb(Func<AppDbContext, Task> action)
    {
        using var scope = Factory.Services.CreateScope();
        await action(scope.ServiceProvider.GetRequiredService<AppDbContext>());
    }

    public async Task<T> WithDb<T>(Func<AppDbContext, Task<T>> action)
    {
        using var scope = Factory.Services.CreateScope();
        return await action(scope.ServiceProvider.GetRequiredService<AppDbContext>());
    }

    public Task<(Guid Id, HttpClient Client)> User(params string[] roles) => UserOn(Factory, roles);

    public async Task<(Guid Id, HttpClient Client)> UserOn(WebApplicationFactory<Program> factory, params string[] roles)
    {
        var user = new User
        {
            Email = $"{Guid.NewGuid():N}@test.local", DisplayName = "Test User " + Guid.NewGuid().ToString("N")[..6],
            PasswordHash = "x", Roles = roles.Select(r => new UserRole { Role = r }).ToList(),
        };
        user.NormalizedEmail = user.Email.ToUpperInvariant();
        foreach (var r in user.Roles) r.UserId = user.Id;
        await WithDb(async db => { db.Users.Add(user); await db.SaveChangesAsync(); });
        var token = factory.Services.GetRequiredService<JwtIssuer>().Issue(user);
        var client = factory.CreateClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        return (user.Id, client);
    }

    /// <summary>Course (one module, one lesson) owned by <paramref name="ownerId"/>.</summary>
    public async Task<(Course Course, Guid LessonId)> Course(Guid ownerId, CourseStatus status = CourseStatus.Updating, Guid? videoAssetId = null)
    {
        var code = "C" + Guid.NewGuid().ToString("N")[..8].ToUpperInvariant();
        var course = new Course
        {
            Code = code, Slug = code.ToLowerInvariant(), Title = "Course " + code, OwnerId = ownerId, Status = status,
            PublishedAt = status is CourseStatus.Updating or CourseStatus.Published ? DateTime.UtcNow : null,
        };
        var m1 = new CourseModule { CourseId = course.Id, Code = "M01", Title = "Module 1" };
        var lesson = new Lesson { ModuleId = m1.Id, Code = "L01", Title = "Lesson 1", VideoAssetId = videoAssetId };
        m1.Lessons.Add(lesson);
        course.Modules.Add(m1);
        course.Instructors.Add(new CourseInstructor { CourseId = course.Id, UserId = ownerId, Role = CourseInstructorRole.Owner, RevenueSharePercent = 70 });
        await WithDb(async db => { db.Courses.Add(course); await db.SaveChangesAsync(); });
        return (course, lesson.Id);
    }

    public static MultipartFormDataContent File(string fileName, byte[] content)
    {
        var form = new MultipartFormDataContent();
        var part = new ByteArrayContent(content);
        part.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
        form.Add(part, "file", fileName);
        return form;
    }

    public static byte[] Pdf(string body)
    {
        return Encoding.ASCII.GetBytes("%PDF-1.4\n" + body + "\n%%EOF\n");
    }

    public static StringContent JsonBody(object o) => new(JsonSerializer.Serialize(o, Json), Encoding.UTF8, "application/json");

    public static async Task<T> Read<T>(HttpResponseMessage r)
    {
        var body = await r.Content.ReadAsStringAsync();
        if (!r.IsSuccessStatusCode) throw new Xunit.Sdk.XunitException($"HTTP {(int)r.StatusCode}: {body}");
        return JsonSerializer.Deserialize<T>(body, Json)!;
    }

    public static async Task<string> ErrorCode(HttpResponseMessage r)
    {
        using var doc = JsonDocument.Parse(await r.Content.ReadAsStringAsync());
        return doc.RootElement.GetProperty("type").GetString()!;
    }
}

public class TrustFixture : TrustDb;

/// <summary>
/// Minimal clamd stand-in speaking the real wire protocol: zPING → PONG; zINSTREAM with 4-byte big-endian length-prefixed
/// chunks terminated by a zero-length chunk → "stream: OK" or "stream: Eicar-Test-Signature FOUND" when the payload
/// contains <see cref="Marker"/> (a harmless stand-in for the EICAR test string, kept out of the repo on purpose).
/// </summary>
public sealed class FakeClamd : IAsyncDisposable
{
    public const string Marker = "MASTEMY-FAKE-MALWARE-SIGNATURE";
    private readonly TcpListener _listener = new(IPAddress.Loopback, 0);
    private readonly CancellationTokenSource _cts = new();
    private readonly Task _loop;
    public int Port { get; }
    public int Scans;
    public long LastStreamBytes;

    public FakeClamd()
    {
        _listener.Start();
        Port = ((IPEndPoint)_listener.LocalEndpoint).Port;
        _loop = Task.Run(Loop);
    }

    private async Task Loop()
    {
        while (!_cts.IsCancellationRequested)
        {
            TcpClient client;
            try { client = await _listener.AcceptTcpClientAsync(_cts.Token); }
            catch { return; }
            _ = Task.Run(() => Handle(client));
        }
    }

    private async Task Handle(TcpClient client)
    {
        using var _ = client;
        var s = client.GetStream();
        var cmd = new StringBuilder();
        var one = new byte[1];
        while (await s.ReadAsync(one) == 1 && one[0] != 0) cmd.Append((char)one[0]);
        if (cmd.ToString() == "zPING") { await s.WriteAsync("PONG\0"u8.ToArray()); return; }
        if (cmd.ToString() != "zINSTREAM") { await s.WriteAsync("UNKNOWN COMMAND\0"u8.ToArray()); return; }
        var data = new MemoryStream();
        var len = new byte[4];
        while (true)
        {
            await s.ReadExactlyAsync(len);
            var n = (int)BinaryPrimitives.ReadUInt32BigEndian(len);
            if (n == 0) break;
            var buf = new byte[n];
            await s.ReadExactlyAsync(buf);
            data.Write(buf);
        }
        Interlocked.Increment(ref Scans);
        LastStreamBytes = data.Length;
        var infected = Encoding.ASCII.GetString(data.ToArray()).Contains(Marker, StringComparison.Ordinal);
        await s.WriteAsync(Encoding.ASCII.GetBytes(infected ? "stream: Eicar-Test-Signature FOUND\0" : "stream: OK\0"));
    }

    public async ValueTask DisposeAsync()
    {
        _cts.Cancel();
        _listener.Stop();
        try { await _loop; } catch { }
    }

    /// <summary>A loopback port with nothing listening.</summary>
    public static int DeadPort()
    {
        var l = new TcpListener(IPAddress.Loopback, 0);
        l.Start();
        var p = ((IPEndPoint)l.LocalEndpoint).Port;
        l.Stop();
        return p;
    }
}
