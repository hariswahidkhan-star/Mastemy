using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Identity;
using Mastemy.Tests.Trust;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.Identity;

/// <summary>Stands in for api.pwnedpasswords.com/range/{prefix}.</summary>
public sealed class FakePwnedHandler : HttpMessageHandler
{
    public const string Breached = "Breached-password-1";
    public const string PaddedOnly = "Padded-only-password-2";
    public enum Behaviour { Normal, Down, Slow, ServerError }
    public Behaviour Mode { get; set; }
    public List<HttpRequestMessage> Requests { get; } = [];

    protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken ct)
    {
        lock (Requests) Requests.Add(request);
        switch (Mode)
        {
            case Behaviour.Down: throw new HttpRequestException("connection refused");
            case Behaviour.Slow: await Task.Delay(TimeSpan.FromSeconds(30), ct); break;
            case Behaviour.ServerError: return new HttpResponseMessage(HttpStatusCode.ServiceUnavailable);
        }
        var prefix = request.RequestUri!.AbsolutePath.Split('/').Last();
        var lines = new List<string> { "0018A45C4D1DEF81644B54AB7F969B88D65:1", "00D4F6E8FA6EECAD2A3AA415EEC418D38EC:0" };
        var (bp, bs) = BreachedPasswordChecker.Sha1Parts(Breached);
        if (prefix == bp) lines.Add(bs.ToLowerInvariant() + ":42"); // case-insensitive match
        var (pp, ps) = BreachedPasswordChecker.Sha1Parts(PaddedOnly);
        if (prefix == pp) lines.Add(ps + ":0"); // padding entry: never a real hit
        return new HttpResponseMessage(HttpStatusCode.OK) { Content = new StringContent(string.Join("\r\n", lines)) };
    }
}

public class BreachedPasswordFixture : TrustDb
{
    public FakePwnedHandler Handler { get; } = new();
    public WebApplicationFactory<Program> Checked { get; private set; } = null!;

    public override async Task InitializeAsync()
    {
        await base.InitializeAsync();
        Checked = CreateFactory(new()
        {
            ["Security:BreachedPasswordCheck:Enabled"] = "true",
            ["Security:BreachedPasswordCheck:RangeApiUrl"] = "https://hibp.test/range/",
            ["Security:BreachedPasswordCheck:TimeoutSeconds"] = "1",
        }).WithWebHostBuilder(b => b.ConfigureTestServices(s =>
            s.AddHttpClient(BreachedPasswordOptions.HttpClientName).ConfigurePrimaryHttpMessageHandler(() => Handler)));
    }

    public override async Task DisposeAsync()
    {
        try { await Checked.DisposeAsync(); }
        finally { await base.DisposeAsync(); }
    }
}

public class BreachedPasswordTests(BreachedPasswordFixture fx) : IClassFixture<BreachedPasswordFixture>
{
    private static object Register(string password) => new { email = $"u{Guid.NewGuid():N}@test.local", password, displayName = "Learner" };

    private async Task<HttpResponseMessage> RegisterOn(WebApplicationFactory<Program> f, string password) =>
        await f.CreateClient().PostAsJsonAsync("/api/auth/register", Register(password));

    private void Mode(FakePwnedHandler.Behaviour m) { fx.Handler.Mode = m; lock (fx.Handler.Requests) fx.Handler.Requests.Clear(); }

    [Fact]
    public async Task Register_rejects_a_breached_password_sending_only_the_hash_prefix_with_padding()
    {
        Mode(FakePwnedHandler.Behaviour.Normal);
        var r = await RegisterOn(fx.Checked, FakePwnedHandler.Breached);
        Assert.Equal(HttpStatusCode.BadRequest, r.StatusCode);
        Assert.Equal("password_breached", await TrustDb.ErrorCode(r));

        var req = Assert.Single(fx.Handler.Requests);
        var (prefix, suffix) = BreachedPasswordChecker.Sha1Parts(FakePwnedHandler.Breached);
        Assert.Equal("https://hibp.test/range/" + prefix, req.RequestUri!.ToString());
        Assert.DoesNotContain(suffix, req.RequestUri.ToString(), StringComparison.OrdinalIgnoreCase);
        Assert.Equal("true", req.Headers.GetValues("Add-Padding").Single());
    }

    [Fact]
    public async Task Register_accepts_unknown_and_padding_only_passwords()
    {
        Mode(FakePwnedHandler.Behaviour.Normal);
        Assert.Equal(HttpStatusCode.OK, (await RegisterOn(fx.Checked, "Unique-pass-" + Guid.NewGuid().ToString("N")[..8] + "1")).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await RegisterOn(fx.Checked, FakePwnedHandler.PaddedOnly)).StatusCode);
    }

    [Theory]
    [InlineData(FakePwnedHandler.Behaviour.Down)]
    [InlineData(FakePwnedHandler.Behaviour.Slow)]
    [InlineData(FakePwnedHandler.Behaviour.ServerError)]
    public async Task Unreachable_service_fails_open(FakePwnedHandler.Behaviour mode)
    {
        Mode(mode);
        var r = await RegisterOn(fx.Checked, FakePwnedHandler.Breached);
        Assert.Equal(HttpStatusCode.OK, r.StatusCode);
        Mode(FakePwnedHandler.Behaviour.Normal);
    }

    [Fact]
    public async Task Reset_and_change_reject_breached_passwords()
    {
        Mode(FakePwnedHandler.Behaviour.Normal);
        // Reset: the breach check runs before the token is looked up (so the link is not consumed).
        var reset = await fx.Checked.CreateClient().PostAsJsonAsync("/api/auth/password/reset", new { token = "not-a-real-token", newPassword = FakePwnedHandler.Breached });
        Assert.Equal("password_breached", await TrustDb.ErrorCode(reset));

        const string current = "Current-pass-12345";
        var user = new User { Email = $"c{Guid.NewGuid():N}@test.local", DisplayName = "Changer", PasswordHash = PasswordHasher.Hash(current) };
        user.NormalizedEmail = user.Email.ToUpperInvariant();
        await fx.WithDb(async db => { db.Users.Add(user); await db.SaveChangesAsync(); });
        var client = fx.Checked.CreateClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", fx.Checked.Services.GetRequiredService<JwtIssuer>().Issue(user));

        var change = await client.PostAsJsonAsync("/api/auth/password/change", new { currentPassword = current, newPassword = FakePwnedHandler.Breached });
        Assert.Equal(HttpStatusCode.BadRequest, change.StatusCode);
        Assert.Equal("password_breached", await TrustDb.ErrorCode(change));

        var ok = await client.PostAsJsonAsync("/api/auth/password/change", new { currentPassword = current, newPassword = "Fresh-pass-" + Guid.NewGuid().ToString("N")[..6] + "9" });
        Assert.True(ok.IsSuccessStatusCode, $"{(int)ok.StatusCode} {await ok.Content.ReadAsStringAsync()}");
    }

    [Fact]
    public async Task Check_is_off_by_default_outside_production()
    {
        Assert.False(fx.Factory.Services.GetRequiredService<BreachedPasswordChecker>().Enabled);
        Assert.Equal(HttpStatusCode.OK, (await RegisterOn(fx.Factory, FakePwnedHandler.Breached)).StatusCode);
    }

    [Fact]
    public void Sha1_parts_match_the_known_vector()
    {
        // SHA-1("password") = 5BAA61E4C9B93F3F0682250B6CF8331B7EE68FD8
        Assert.Equal(("5BAA6", "1E4C9B93F3F0682250B6CF8331B7EE68FD8"), BreachedPasswordChecker.Sha1Parts("password"));
    }
}
