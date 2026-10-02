using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.Identity;

/// <summary>Access tokens stop working immediately after session revoke, suspension, deletion or demotion.</summary>
public class TokenRevocationTests(IdentityFixture fx) : IClassFixture<IdentityFixture>
{
    private async Task<(HttpClient Client, AuthResponse Auth)> Login(User u)
    {
        var c = fx.Factory.CreateClient();
        var res = await c.PostAsJsonAsync("/api/auth/login", new { email = u.Email, password = IdentityFixture.Password });
        res.EnsureSuccessStatusCode();
        var auth = (await res.Content.ReadFromJsonAsync<AuthResponse>(IdentityFixture.Json))!;
        c.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", auth.AccessToken);
        return (c, auth);
    }

    [Fact]
    public async Task Revoking_a_session_rejects_its_access_token_on_the_next_request()
    {
        var u = await fx.CreateUser();
        var (a, _) = await Login(u);
        var (b, _) = await Login(u);
        Assert.Equal(HttpStatusCode.OK, (await a.GetAsync("/api/auth/me")).StatusCode);
        var sessions = (await b.GetFromJsonAsync<List<SessionDto>>("/api/auth/sessions", IdentityFixture.Json))!;
        var other = sessions.Single(s => !s.Current);
        Assert.Equal(HttpStatusCode.NoContent, (await b.DeleteAsync($"/api/auth/sessions/{other.Id}")).StatusCode);

        Assert.Equal(HttpStatusCode.Unauthorized, (await a.GetAsync("/api/auth/me")).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await b.GetAsync("/api/auth/me")).StatusCode); // the other session is unaffected
    }

    [Fact]
    public async Task Logout_and_revoke_all_reject_outstanding_access_tokens()
    {
        var u = await fx.CreateUser();
        var (a, authA) = await Login(u);
        var (b, _) = await Login(u);
        await fx.Anon().PostAsJsonAsync("/api/auth/logout", new { refreshToken = authA.RefreshToken });
        Assert.Equal(HttpStatusCode.Unauthorized, (await a.GetAsync("/api/auth/me")).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await b.GetAsync("/api/auth/me")).StatusCode);
        await b.DeleteAsync("/api/auth/sessions");
        Assert.Equal(HttpStatusCode.Unauthorized, (await b.GetAsync("/api/auth/me")).StatusCode);
    }

    [Fact]
    public async Task Suspending_a_user_rejects_their_access_token_immediately()
    {
        var admin = await fx.CreateUser(Roles.Admin);
        var (adminClient, _) = await Login(admin);
        var u = await fx.CreateUser();
        var (c, _) = await Login(u);
        Assert.Equal(HttpStatusCode.OK, (await c.GetAsync("/api/auth/me")).StatusCode); // warms the cache
        var res = await adminClient.PutAsJsonAsync($"/api/admin/users/{u.Id}/suspend", new { suspended = true });
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        Assert.Equal(HttpStatusCode.Unauthorized, (await c.GetAsync("/api/auth/me")).StatusCode);
    }

    [Fact]
    public async Task Demoting_an_admin_rejects_staff_access_immediately()
    {
        var super = await fx.CreateUser(Roles.SuperAdmin);
        var (superClient, _) = await Login(super);
        var target = await fx.CreateUser(Roles.Admin);
        var (c, _) = await Login(target);
        Assert.Equal(HttpStatusCode.OK, (await c.GetAsync("/api/admin/users")).StatusCode); // warms the cache
        var res = await superClient.PutAsJsonAsync($"/api/admin/users/{target.Id}/roles", new { roles = new[] { Roles.Student } });
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        var after = await c.GetAsync("/api/admin/users");
        Assert.Contains(after.StatusCode, new[] { HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden });
    }

    [Fact]
    public async Task Legacy_tokens_without_sid_require_an_active_user_with_matching_roles()
    {
        var u = await fx.CreateUser(Roles.Admin);
        var issuer = fx.Factory.Services.GetRequiredService<JwtIssuer>();
        var c = fx.Factory.CreateClient();
        c.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", issuer.Issue(u));
        Assert.Equal(HttpStatusCode.OK, (await c.GetAsync("/api/admin/users")).StatusCode);

        // A token claiming a role the user does not hold is rejected even though it is validly signed.
        var forged = new User { Id = u.Id, Email = u.Email, DisplayName = u.DisplayName, Roles = [new UserRole { UserId = u.Id, Role = Roles.SuperAdmin }] };
        var f = fx.Factory.CreateClient();
        f.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", issuer.Issue(forged));
        Assert.Equal(HttpStatusCode.Unauthorized, (await f.GetAsync("/api/auth/me")).StatusCode);

        // Deleted (anonymized) or unknown users are rejected; the cache is invalidated in-process.
        await using (var db = fx.NewDb()) await db.Users.Where(x => x.Id == u.Id).ExecuteUpdateAsync(s => s.SetProperty(x => x.IsSuspended, true));
        fx.Factory.Services.GetRequiredService<TokenSessionValidator>().Invalidate(u.Id);
        Assert.Equal(HttpStatusCode.Unauthorized, (await c.GetAsync("/api/auth/me")).StatusCode);
        var ghost = fx.Factory.CreateClient();
        ghost.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", issuer.Issue(new User { Email = "ghost@example.com", DisplayName = "g" }));
        Assert.Equal(HttpStatusCode.Unauthorized, (await ghost.GetAsync("/api/auth/me")).StatusCode);
    }

    [Fact]
    public async Task Deleting_the_account_rejects_its_access_token()
    {
        var u = await fx.CreateUser();
        var (c, _) = await Login(u);
        Assert.Equal(HttpStatusCode.OK, (await c.GetAsync("/api/auth/me")).StatusCode);
        var req = new HttpRequestMessage(HttpMethod.Delete, "/api/me") { Content = JsonContent.Create(new { password = IdentityFixture.Password, confirm = "DELETE" }) };
        var res = await c.SendAsync(req);
        Assert.True(res.IsSuccessStatusCode, await res.Content.ReadAsStringAsync());
        Assert.Equal(HttpStatusCode.Unauthorized, (await c.GetAsync("/api/auth/me")).StatusCode);
    }
}
