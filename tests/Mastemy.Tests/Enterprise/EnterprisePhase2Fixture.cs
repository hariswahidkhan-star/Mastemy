using System.Collections.Concurrent;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Enterprise;
using Mastemy.Api.Modules.Trust;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace Mastemy.Tests.Enterprise;

/// <summary>Flags any upload containing "EICAR-TEST" as infected.</summary>
public sealed class FakeScanner : IMalwareScanner
{
    public bool Enabled => true;
    public string Engine => "fake";
    public async Task<ScanResult> ScanAsync(Stream content, CancellationToken ct)
    {
        using var r = new StreamReader(content);
        var text = await r.ReadToEndAsync(ct);
        return text.Contains("EICAR-TEST") ? new ScanResult(ScanVerdict.Infected, Engine, "Eicar") : new ScanResult(ScanVerdict.Clean, Engine, null);
    }
    public Task PingAsync(CancellationToken ct) => Task.CompletedTask;
}

/// <summary>
/// In-process fake OpenID provider: discovery, JWKS (RSA key generated per run) and a token endpoint that enforces the
/// client secret, redirect URI and PKCE verifier for codes minted by <see cref="IssueCode"/>.
/// </summary>
public sealed class FakeOidcProvider : HttpMessageHandler
{
    public const string Issuer = "https://idp.test";
    public const string ClientId = "mastemy-client";
    public const string ClientSecret = "s3cret-value";
    public RSA Rsa { get; private set; } = RSA.Create(2048);
    public string Kid { get; private set; } = "k1";
    public int DiscoveryHits;
    public int JwksHits;
    private readonly ConcurrentDictionary<string, (string Challenge, string IdToken)> codes = new();

    public void RotateKey() { Rsa = RSA.Create(2048); Kid = "k" + Guid.NewGuid().ToString("N")[..6]; }

    public string SignIdToken(Dictionary<string, object> claims, RSA? key = null, string? kid = null, string? alg = null)
    {
        var rsaKey = new RsaSecurityKey(key ?? Rsa) { KeyId = kid ?? Kid };
        return new JsonWebTokenHandler().CreateToken(JsonSerializer.Serialize(claims), new SigningCredentials(rsaKey, alg ?? SecurityAlgorithms.RsaSha256));
    }

    public static Dictionary<string, object> Claims(string nonce, string sub, string email, bool verified = true, string? aud = null, string? iss = null, DateTime? exp = null)
    {
        var now = DateTimeOffset.UtcNow;
        return new Dictionary<string, object>
        {
            ["iss"] = iss ?? Issuer, ["aud"] = aud ?? ClientId, ["sub"] = sub, ["email"] = email, ["email_verified"] = verified, ["name"] = "SSO User",
            ["nonce"] = nonce, ["iat"] = now.ToUnixTimeSeconds(), ["exp"] = new DateTimeOffset(exp ?? DateTime.UtcNow.AddMinutes(5)).ToUnixTimeSeconds(),
        };
    }

    public string IssueCode(string codeChallenge, string idToken)
    {
        var code = Guid.NewGuid().ToString("N");
        codes[code] = (codeChallenge, idToken);
        return code;
    }

    protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken ct)
    {
        var path = request.RequestUri!.AbsolutePath;
        if (request.RequestUri.Host != "idp.test") return new HttpResponseMessage(HttpStatusCode.NotFound);
        if (path == "/.well-known/openid-configuration")
        {
            Interlocked.Increment(ref DiscoveryHits);
            return Json(new { issuer = Issuer, authorization_endpoint = Issuer + "/authorize", token_endpoint = Issuer + "/token", jwks_uri = Issuer + "/jwks" });
        }
        if (path == "/jwks")
        {
            Interlocked.Increment(ref JwksHits);
            var p = Rsa.ExportParameters(false);
            return Json(new { keys = new[] { new { kty = "RSA", use = "sig", alg = "RS256", kid = Kid, n = Base64UrlEncoder.Encode(p.Modulus), e = Base64UrlEncoder.Encode(p.Exponent) } } });
        }
        if (path == "/token" && request.Method == HttpMethod.Post)
        {
            var form = (await request.Content!.ReadAsStringAsync(ct)).Split('&').Select(kv => kv.Split('='))
                .ToDictionary(kv => Uri.UnescapeDataString(kv[0]), kv => Uri.UnescapeDataString(kv[1].Replace('+', ' ')));
            if (form.GetValueOrDefault("client_id") != ClientId || form.GetValueOrDefault("client_secret") != ClientSecret)
                return new HttpResponseMessage(HttpStatusCode.Unauthorized);
            if (form.GetValueOrDefault("redirect_uri") != EnterprisePhase2Fixture.RedirectUri) return new HttpResponseMessage(HttpStatusCode.BadRequest);
            if (!codes.TryRemove(form.GetValueOrDefault("code") ?? "", out var entry)) return new HttpResponseMessage(HttpStatusCode.BadRequest);
            var challenge = Base64UrlEncoder.Encode(SHA256.HashData(Encoding.ASCII.GetBytes(form.GetValueOrDefault("code_verifier") ?? "")));
            if (challenge != entry.Challenge) return new HttpResponseMessage(HttpStatusCode.BadRequest);
            return Json(new { access_token = "at", token_type = "Bearer", id_token = entry.IdToken });
        }
        return new HttpResponseMessage(HttpStatusCode.NotFound);
    }

    private static HttpResponseMessage Json(object o) => new(HttpStatusCode.OK) { Content = JsonContent.Create(o) };
}

/// <summary>In-memory DNS: TXT records set by tests; <see cref="Down"/> simulates an unreachable resolver.</summary>
public sealed class FakeDns : IDnsTxtResolver
{
    public ConcurrentDictionary<string, List<string>> Txt { get; } = new(StringComparer.OrdinalIgnoreCase);
    public bool Down { get; set; }
    public Task<IReadOnlyList<string>> LookupTxt(string name, CancellationToken ct)
    {
        if (Down) throw new DnsLookupException("The DNS resolver is unreachable.");
        return Task.FromResult<IReadOnlyList<string>>(Txt.TryGetValue(name, out var v) ? v.ToList() : []);
    }
}

public class EnterprisePhase2Fixture : IAsyncLifetime
{
    public const string RedirectUri = "https://api.test/api/sso/callback";
    public const string CompletionUrl = "https://app.test/sso/complete";
    public string DbName { get; } = "mastemy_t_" + Guid.NewGuid().ToString("N");
    public string RootPath { get; } = Path.Combine(Path.GetTempPath(), "mastemy-ent2-" + Guid.NewGuid().ToString("N"));
    public FakeOidcProvider Idp { get; } = new();
    public FakeDns Dns { get; } = new();
    public WebApplicationFactory<Program> Factory { get; private set; } = null!;

    public async Task InitializeAsync()
    {
        Factory = new WebApplicationFactory<Program>().WithWebHostBuilder(b =>
        {
            b.UseEnvironment("Testing");
            b.UseSetting("ConnectionStrings:Default", $"Server=localhost;Port=3306;Database={DbName};User=mastemy;Password=mastemy_dev_pw;");
            b.UseSetting("Jwt:Key", "test-signing-key-0123456789abcdef0123456789abcdef");
            b.UseSetting("Security:RequireMfaForPrivileged", "false");
            b.UseSetting("Database:MigrateOnStartup", "false");
            b.UseSetting("Resources:RootPath", RootPath);
            b.UseSetting("Enterprise:OrgMaterialQuotaBytes", "4096");
            b.UseSetting("Sso:RedirectUri", RedirectUri);
            b.UseSetting("Sso:CompletionUrl", CompletionUrl);
            b.UseSetting("RateLimits:AuthPerMinute", "1000");
            b.ConfigureTestServices(s =>
            {
                s.AddSingleton<IMalwareScanner, FakeScanner>();
                s.AddSingleton<IDnsTxtResolver>(Dns);
                s.AddHttpClient(OidcMetadataClient.HttpClientName).ConfigurePrimaryHttpMessageHandler(() => Idp);
            });
        });
        await Db(d => d.Database.EnsureCreatedAsync());
    }

    public async Task DisposeAsync()
    {
        await Db(d => d.Database.EnsureDeletedAsync());
        await Factory.DisposeAsync();
        try { Directory.Delete(RootPath, true); } catch (IOException) { }
    }

    public async Task<T> Db<T>(Func<AppDbContext, Task<T>> f)
    {
        using var scope = Factory.Services.CreateScope();
        return await f(scope.ServiceProvider.GetRequiredService<AppDbContext>());
    }

    public Task Db(Func<AppDbContext, Task> f) => Db<int>(async d => { await f(d); return 0; });

    public async Task<(User User, HttpClient Client)> User(params string[] roles) => await UserWithEmail($"{Guid.NewGuid():N}@t.local", roles);

    public async Task<(User User, HttpClient Client)> UserWithEmail(string email, params string[] roles)
    {
        var u = new User { Email = email, DisplayName = "Tester", PasswordHash = "x" };
        u.NormalizedEmail = u.Email.ToLowerInvariant();
        u.Roles = roles.Select(r => new UserRole { UserId = u.Id, Role = r }).ToList();
        await Db(async d => { d.Users.Add(u); await d.SaveChangesAsync(); });
        return (u, Client(u));
    }

    public HttpClient Client(User u)
    {
        var c = Factory.CreateClient();
        c.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Factory.Services.GetRequiredService<JwtIssuer>().Issue(u));
        return c;
    }

    /// <summary>No automatic cookies: SSO tests pass the Secure binder cookie explicitly (TestServer runs over http).</summary>
    public HttpClient Anonymous() => Factory.CreateClient(new WebApplicationFactoryClientOptions { AllowAutoRedirect = false, HandleCookies = false });

    public HttpClient Browserless(User u)
    {
        var c = Factory.CreateClient(new WebApplicationFactoryClientOptions { AllowAutoRedirect = false, HandleCookies = false });
        c.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Factory.Services.GetRequiredService<JwtIssuer>().Issue(u));
        return c;
    }

    public async Task<Course> LiveCourse(bool live = true)
    {
        var (owner, _) = await User(Roles.Instructor);
        var tag = Guid.NewGuid().ToString("N")[..10];
        var c = new Course
        {
            Code = "C" + tag, Slug = "c-" + tag, Title = "Course " + tag, OwnerId = owner.Id,
            Status = live ? CourseStatus.Published : CourseStatus.Draft, PublishedAt = live ? DateTime.UtcNow : null,
        };
        await Db(async d => { d.Courses.Add(c); await d.SaveChangesAsync(); });
        return c;
    }
}
