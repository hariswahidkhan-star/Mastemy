using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Identity;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.Identity;

public class AuthTests(IdentityFixture f) : IClassFixture<IdentityFixture>
{
    private static async Task<AuthResponse> Read(HttpResponseMessage r) => (await r.Content.ReadFromJsonAsync<AuthResponse>(IdentityFixture.Json))!;

    [Fact]
    public async Task Register_creates_student_with_normalized_email_and_rejects_duplicates()
    {
        var c = f.Anon();
        var local = "Mixed" + Guid.NewGuid().ToString("N")[..8];
        var res = await c.PostAsJsonAsync("/api/auth/register", new { email = $"  {local}@Example.COM ", password = "abcdefghi1", displayName = "Ann" });
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        var auth = await Read(res);
        Assert.Equal(["Student"], auth.User.Roles);
        await using (var db = f.NewDb())
        {
            var u = await db.Users.SingleAsync(x => x.Id == auth.User.Id);
            Assert.Equal($"{local}@example.com".ToLowerInvariant(), u.NormalizedEmail);
            Assert.NotEqual("abcdefghi1", u.PasswordHash);
        }
        var dup = await c.PostAsJsonAsync("/api/auth/register", new { email = $"{local.ToLowerInvariant()}@example.com", password = "abcdefghi1", displayName = "Ann" });
        Assert.Equal(HttpStatusCode.Conflict, dup.StatusCode);

        var me = f.Anon();
        me.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", auth.AccessToken);
        var dto = await me.GetFromJsonAsync<UserDto>("/api/auth/me", IdentityFixture.Json);
        Assert.Equal(auth.User.Id, dto!.Id);
    }

    [Theory]
    [InlineData("short1")]
    [InlineData("onlyletterslong")]
    [InlineData("1234567890123")]
    public async Task Register_enforces_password_policy(string pw)
    {
        var res = await f.Anon().PostAsJsonAsync("/api/auth/register", new { email = $"p{Guid.NewGuid():N}@example.com", password = pw, displayName = "X" });
        Assert.Equal(HttpStatusCode.BadRequest, res.StatusCode);
    }

    [Fact]
    public async Task Login_locks_out_after_five_failures_with_generic_error()
    {
        var u = await f.CreateUser();
        var c = f.Anon();
        for (var i = 0; i < 5; i++)
        {
            var bad = await c.PostAsJsonAsync("/api/auth/login", new { email = u.Email, password = "WrongPass123" });
            Assert.Equal(HttpStatusCode.Unauthorized, bad.StatusCode);
            Assert.Contains("Invalid email or password", await bad.Content.ReadAsStringAsync());
        }
        var locked = await c.PostAsJsonAsync("/api/auth/login", new { email = u.Email, password = IdentityFixture.Password });
        Assert.Equal(HttpStatusCode.Unauthorized, locked.StatusCode);
        await using var db = f.NewDb();
        var stored = await db.Users.SingleAsync(x => x.Id == u.Id);
        Assert.True(stored.LockoutUntil > DateTime.UtcNow.AddMinutes(14));

        var unknown = await c.PostAsJsonAsync("/api/auth/login", new { email = "nobody@example.com", password = "WrongPass123" });
        Assert.Equal(HttpStatusCode.Unauthorized, unknown.StatusCode);
        Assert.Contains("Invalid email or password", await unknown.Content.ReadAsStringAsync());
    }

    [Fact]
    public async Task Failed_login_increments_counter_and_success_resets_it()
    {
        var u = await f.CreateUser();
        var c = f.Anon();
        await c.PostAsJsonAsync("/api/auth/login", new { email = u.Email, password = "WrongPass123" });
        await c.PostAsJsonAsync("/api/auth/login", new { email = u.Email, password = "WrongPass123" });
        await using (var db = f.NewDb()) Assert.Equal(2, (await db.Users.SingleAsync(x => x.Id == u.Id)).FailedLoginCount);
        var ok = await c.PostAsJsonAsync("/api/auth/login", new { email = u.Email.ToUpperInvariant(), password = IdentityFixture.Password });
        Assert.Equal(HttpStatusCode.OK, ok.StatusCode);
        await using (var db = f.NewDb()) Assert.Equal(0, (await db.Users.SingleAsync(x => x.Id == u.Id)).FailedLoginCount);
    }

    [Fact]
    public async Task Suspended_user_cannot_login()
    {
        var u = await f.CreateUser();
        await using (var db = f.NewDb())
        {
            (await db.Users.SingleAsync(x => x.Id == u.Id)).IsSuspended = true;
            await db.SaveChangesAsync();
        }
        var res = await f.Anon().PostAsJsonAsync("/api/auth/login", new { email = u.Email, password = IdentityFixture.Password });
        Assert.Equal(HttpStatusCode.Unauthorized, res.StatusCode);
    }

    [Fact]
    public async Task Refresh_rotates_and_reuse_revokes_family()
    {
        var u = await f.CreateUser();
        var c = f.Anon();
        var first = await Read(await c.PostAsJsonAsync("/api/auth/login", new { email = u.Email, password = IdentityFixture.Password }));

        var r1 = await c.PostAsJsonAsync("/api/auth/refresh", new { refreshToken = first.RefreshToken });
        Assert.Equal(HttpStatusCode.OK, r1.StatusCode);
        var second = await Read(r1);
        Assert.NotEqual(first.RefreshToken, second.RefreshToken);

        await using (var db = f.NewDb())
        {
            Assert.False(await db.RefreshTokens.AnyAsync(t => t.TokenHash == first.RefreshToken || t.TokenHash == second.RefreshToken));
            var old = await db.RefreshTokens.SingleAsync(t => t.TokenHash == Tokens.Sha256(first.RefreshToken));
            Assert.NotNull(old.RevokedAt);
            Assert.NotNull(old.ReplacedById);
        }

        // Reuse of the rotated-out token: rejected and the whole family (including the live token) is revoked.
        var reuse = await c.PostAsJsonAsync("/api/auth/refresh", new { refreshToken = first.RefreshToken });
        Assert.Equal(HttpStatusCode.Unauthorized, reuse.StatusCode);
        var afterReuse = await c.PostAsJsonAsync("/api/auth/refresh", new { refreshToken = second.RefreshToken });
        Assert.Equal(HttpStatusCode.Unauthorized, afterReuse.StatusCode);
        await using (var db = f.NewDb())
            Assert.All(await db.RefreshTokens.Where(t => t.UserId == u.Id).ToListAsync(), t => Assert.NotNull(t.RevokedAt));
    }

    [Fact]
    public async Task Logout_revokes_refresh_token()
    {
        var u = await f.CreateUser();
        var c = f.Anon();
        var a = await Read(await c.PostAsJsonAsync("/api/auth/login", new { email = u.Email, password = IdentityFixture.Password }));
        Assert.Equal(HttpStatusCode.NoContent, (await c.PostAsJsonAsync("/api/auth/logout", new { refreshToken = a.RefreshToken })).StatusCode);
        Assert.Equal(HttpStatusCode.Unauthorized, (await c.PostAsJsonAsync("/api/auth/refresh", new { refreshToken = a.RefreshToken })).StatusCode);
    }

    [Fact]
    public async Task Me_requires_authentication()
    {
        Assert.Equal(HttpStatusCode.Unauthorized, (await f.Anon().GetAsync("/api/auth/me")).StatusCode);
    }
}
