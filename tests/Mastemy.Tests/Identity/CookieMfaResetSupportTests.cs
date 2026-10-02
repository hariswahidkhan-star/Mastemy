using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Http.Json;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Assessment;
using Mastemy.Api.Modules.Identity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.Identity;

/// <summary>Refresh cookie transport, SuperAdmin MFA reset safeguards and the Support role.</summary>
public class CookieMfaResetSupportTests(SecurityFixture f) : IClassFixture<SecurityFixture>
{
    private HttpClient NoCookies(WebApplicationFactory<Program>? factory = null) =>
        (factory ?? f.Factory).CreateClient(new WebApplicationFactoryClientOptions { HandleCookies = false });

    private static string? RefreshCookie(HttpResponseMessage r) =>
        r.Headers.TryGetValues("Set-Cookie", out var v) ? v.FirstOrDefault(x => x.StartsWith(RefreshCookies.CookieName + "=")) : null;

    private static string CookieValue(string setCookie) => setCookie.Split(';')[0][(RefreshCookies.CookieName.Length + 1)..];

    private static HttpRequestMessage Post(string url, string? cookie, bool header, object? body = null)
    {
        var m = new HttpRequestMessage(HttpMethod.Post, url);
        if (cookie is not null) m.Headers.Add("Cookie", $"{RefreshCookies.CookieName}={cookie}");
        if (header) m.Headers.Add(RefreshCookies.CsrfHeader, RefreshCookies.CsrfValue);
        if (body is not null) m.Content = JsonContent.Create(body);
        return m;
    }

    private static async Task<string?> Code(HttpResponseMessage r) =>
        System.Text.Json.JsonDocument.Parse(await r.Content.ReadAsStringAsync()).RootElement.TryGetProperty("type", out var t) ? t.GetString() : null;

    [Fact]
    public async Task Login_sets_strict_httponly_refresh_cookie_and_cookie_refresh_requires_csrf_header()
    {
        var u = await f.CreateUser(true);
        var c = NoCookies();
        var login = await f.Login(c, u);
        login.EnsureSuccessStatusCode();
        var set = RefreshCookie(login)!;
        Assert.NotNull(set);
        var lower = set.ToLowerInvariant();
        Assert.Contains("httponly", lower);
        Assert.Contains("secure", lower);
        Assert.Contains("samesite=strict", lower);
        Assert.Contains("path=/api/auth", lower);
        var body = await SecurityFixture.Read(login);
        Assert.Equal(body.RefreshToken, CookieValue(set)); // body mode on by default (backward compatible)

        // Cookie without the custom header: rejected (CSRF).
        var noHeader = await c.SendAsync(Post("/api/auth/refresh", CookieValue(set), header: false));
        Assert.Equal(HttpStatusCode.Forbidden, noHeader.StatusCode);
        Assert.Equal("csrf_header_required", await Code(noHeader));

        // Cookie + header with an empty body: rotates and sets a new cookie.
        var ok = await c.SendAsync(Post("/api/auth/refresh", CookieValue(set), header: true));
        Assert.Equal(HttpStatusCode.OK, ok.StatusCode);
        var rotated = RefreshCookie(ok)!;
        Assert.NotEqual(CookieValue(set), CookieValue(rotated));

        // Reusing the old cookie is a reuse: 401 and the cookie is cleared.
        var reuse = await c.SendAsync(Post("/api/auth/refresh", CookieValue(set), header: true));
        Assert.Equal(HttpStatusCode.Unauthorized, reuse.StatusCode);
        Assert.Contains("expires=thu, 01 jan 1970", RefreshCookie(reuse)!.ToLowerInvariant());

        // Logout with the cookie clears it and ends the session.
        var u2 = await f.CreateUser(true);
        var l2 = RefreshCookie(await f.Login(c, u2))!;
        var logout = await c.SendAsync(Post("/api/auth/logout", CookieValue(l2), header: true));
        Assert.Equal(HttpStatusCode.NoContent, logout.StatusCode);
        Assert.Contains("expires=thu, 01 jan 1970", RefreshCookie(logout)!.ToLowerInvariant());
        Assert.Equal(HttpStatusCode.Unauthorized, (await c.SendAsync(Post("/api/auth/refresh", CookieValue(l2), header: true))).StatusCode);

        // Body-token mode still works for non-browser clients.
        var u3 = await f.CreateUser(true);
        var b3 = await SecurityFixture.Read(await f.Login(c, u3));
        Assert.Equal(HttpStatusCode.OK, (await c.PostAsJsonAsync("/api/auth/refresh", new { refreshToken = b3.RefreshToken })).StatusCode);
    }

    [Fact]
    public async Task Body_refresh_tokens_can_be_disabled_so_only_the_cookie_works()
    {
        await using var cookieOnly = f.Factory.WithWebHostBuilder(b => b.UseSetting("Auth:AllowBodyRefreshToken", "false"));
        var c = NoCookies(cookieOnly);
        var u = await f.CreateUser(true);
        var login = await f.Login(c, u);
        var body = await SecurityFixture.Read(login);
        Assert.Null(body.RefreshToken); // never exposed to page script
        Assert.NotNull(body.AccessToken);
        var cookie = CookieValue(RefreshCookie(login)!);
        var bodyRefresh = await c.PostAsJsonAsync("/api/auth/refresh", new { refreshToken = cookie });
        Assert.Equal(HttpStatusCode.BadRequest, bodyRefresh.StatusCode);
        Assert.Equal("body_refresh_token_disabled", await Code(bodyRefresh));
        var ok = await c.SendAsync(Post("/api/auth/refresh", cookie, header: true));
        Assert.Equal(HttpStatusCode.OK, ok.StatusCode);
        Assert.Null((await SecurityFixture.Read(ok)).RefreshToken);
    }

    [Fact]
    public async Task Access_tokens_carry_auth_time_that_survives_refresh()
    {
        var u = await f.CreateUser(true);
        var c = NoCookies();
        var login = await SecurityFixture.Read(await f.Login(c, u));
        var t1 = new JwtSecurityTokenHandler().ReadJwtToken(login.AccessToken).Claims.First(x => x.Type == SecurityClaims.AuthTime).Value;
        await using (var db = f.NewDb())
            await db.Set<AuthSession>().Where(x => x.UserId == u.Id).ExecuteUpdateAsync(x => x.SetProperty(a => a.CreatedAt, a => a.CreatedAt.AddMinutes(-30)));
        var refreshed = await SecurityFixture.Read(await c.PostAsJsonAsync("/api/auth/refresh", new { refreshToken = login.RefreshToken }));
        var t2 = long.Parse(new JwtSecurityTokenHandler().ReadJwtToken(refreshed.AccessToken).Claims.First(x => x.Type == SecurityClaims.AuthTime).Value);
        Assert.True(long.Parse(t1) - t2 >= 29 * 60); // original sign-in time (session creation), not the refresh time
    }

    private string Token(User u, string sid, bool mfa, DateTime authTime) =>
        f.Factory.Services.GetRequiredService<AccessTokenFactory>().Issue(u, Guid.Parse(sid), mfa, authTime);

    private static string Sid(string accessToken) =>
        new JwtSecurityTokenHandler().ReadJwtToken(accessToken).Claims.First(x => x.Type == SecurityClaims.SessionId).Value;

    [Fact]
    public async Task SuperAdmin_mfa_reset_requires_fresh_mfa_reason_and_forces_reenrollment()
    {
        var (super, superUser, _, superAuth) = await f.SignedInWithMfa(Roles.SuperAdmin);
        var (admin, _, _, _) = await f.SignedInWithMfa(Roles.Admin);
        var (target, targetUser, _, targetAuth) = await f.SignedInWithMfa(Roles.Student);
        var url = $"/api/admin/users/{targetUser.Id}/mfa/reset";
        var body = new { reason = "User lost their phone; identity verified by ticket #123." };

        Assert.Equal(HttpStatusCode.Forbidden, (await admin.PostAsJsonAsync(url, body)).StatusCode); // Admin is not enough
        var self = await super.PostAsJsonAsync($"/api/admin/users/{superUser.Id}/mfa/reset", body);
        Assert.Equal(HttpStatusCode.BadRequest, self.StatusCode);
        Assert.Equal("cannot_reset_own_mfa", await Code(self));
        Assert.Equal(HttpStatusCode.BadRequest, (await super.PostAsJsonAsync(url, new { reason = "short" })).StatusCode);

        // A SuperAdmin token whose MFA sign-in is older than 10 minutes is refused.
        var stale = SecurityFixture.WithToken(f.Anon(), Token(superUser, Sid(superAuth.AccessToken!), true, DateTime.UtcNow.AddMinutes(-11)));
        var staleRes = await stale.PostAsJsonAsync(url, body);
        Assert.Equal(HttpStatusCode.Forbidden, staleRes.StatusCode);
        Assert.Equal("fresh_mfa_required", await Code(staleRes));

        var res = await super.PostAsJsonAsync(url, body);
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        var dto = (await res.Content.ReadFromJsonAsync<MfaResetResultDto>(IdentityFixture.Json))!;
        Assert.True(dto.ReenrollmentRequired);

        // Sessions revoked, MFA cleared, audited with reason, user notified.
        Assert.Equal(HttpStatusCode.Unauthorized, (await target.GetAsync("/api/auth/sessions")).StatusCode);
        await using (var db = f.NewDb())
        {
            var sec = await db.Set<UserSecurity>().AsNoTracking().FirstAsync(s => s.UserId == targetUser.Id);
            Assert.Null(sec.MfaEnabledAt);
            Assert.Equal(0, await db.Set<MfaRecoveryCode>().CountAsync(x => x.UserId == targetUser.Id));
            var log = await db.AuditLogs.AsNoTracking().SingleAsync(a => a.Action == "user.mfa_reset_by_admin" && a.EntityId == targetUser.Id.ToString());
            Assert.Equal(superUser.Id, log.ActorId);
            Assert.Contains("lost their phone", log.Details);
            Assert.True(await db.Notifications.AnyAsync(n => n.UserId == targetUser.Id && n.Link.Contains("mfa_reset")));
            Assert.True(await db.EmailOutbox.AnyAsync(m => m.ToAddress == targetUser.Email && m.Subject.Contains("two-factor")));
        }
        // Second reset: nothing left to reset.
        Assert.Equal(HttpStatusCode.Conflict, (await super.PostAsJsonAsync(url, body)).StatusCode);

        // Next sign-in (a non-privileged user) must re-enroll before using the account.
        var c = f.Anon();
        var login = await SecurityFixture.Read(await f.Login(c, targetUser));
        Assert.Equal(LoginStatus.MfaEnrollmentRequired, login.Status);
        Assert.Null(login.RefreshToken);
        SecurityFixture.WithToken(c, login.AccessToken);
        Assert.Equal(HttpStatusCode.Forbidden, (await c.GetAsync("/api/auth/sessions")).StatusCode);
        var enroll = (await (await c.PostAsync("/api/auth/mfa/enroll", null)).Content.ReadFromJsonAsync<MfaEnrollmentDto>(IdentityFixture.Json))!;
        var confirm = await c.PostAsJsonAsync("/api/auth/mfa/enroll/confirm", new { code = SecurityFixture.Code(enroll.Secret) });
        Assert.Equal(HttpStatusCode.OK, confirm.StatusCode);
        await using (var db = f.NewDb())
            Assert.NotNull((await db.Set<MfaResetRecord>().AsNoTracking().SingleAsync(r => r.UserId == targetUser.Id)).ReenrolledAt);
        Assert.Equal(LoginStatus.MfaRequired, (await SecurityFixture.Read(await f.Login(f.Anon(), targetUser))).Status);
        _ = targetAuth;
    }

    [Fact]
    public async Task Support_role_has_read_only_masked_lookup_and_can_resend_verification_only()
    {
        // Support sees (masked) personal data, so it is an MFA-required role.
        var plain = f.Anon();
        var supportProbe = await f.CreateUser(true, Roles.Support);
        Assert.Equal("mfa_enrollment_required", (await SecurityFixture.Read(await f.Login(plain, supportProbe))).Status);
        var (sc, supportUser, _, _) = await f.SignedInWithMfa(Roles.Support);
        var learner = await f.CreateUser(false);
        await using (var db = f.NewDb())
        {
            var course = new Course { Code = "S" + Guid.NewGuid().ToString("N")[..6], Slug = "s" + Guid.NewGuid().ToString("N")[..8], Title = "Support Course", OwnerId = supportUser.Id };
            db.Courses.Add(course);
            db.Enrollments.Add(new Enrollment { UserId = learner.Id, CourseId = course.Id });
            db.Orders.Add(new Order { UserId = learner.Id, Status = OrderStatus.Paid, Total = 10, Currency = "USD", IdempotencyKey = Guid.NewGuid().ToString() });
            db.Set<CompletionAward>().Add(new CompletionAward { Code = "SUPPORTAWARD", UserId = learner.Id, CourseId = course.Id, CourseTitle = "Support Course", RecipientName = "x" });
            await db.SaveChangesAsync();
        }

        var lookup = await sc.GetFromJsonAsync<List<UserLookupDto>>($"/api/support/users/lookup?q={learner.Email}", IdentityFixture.Json);
        var row = Assert.Single(lookup!);
        Assert.DoesNotContain(learner.Email, row.MaskedEmail);
        var detail = (await sc.GetFromJsonAsync<SupportUserDto>($"/api/support/users/{learner.Id}", IdentityFixture.Json))!;
        Assert.Equal(AdminService.MaskEmail(learner.Email), detail.MaskedEmail);
        Assert.Single(detail.Enrollments);
        Assert.Single(detail.Orders);
        Assert.Equal("Completion", Assert.Single(detail.Certificates).Kind);
        Assert.False(detail.EmailVerified);
        Assert.Equal(HttpStatusCode.Accepted, (await sc.PostAsync($"/api/support/users/{learner.Id}/email-verification/resend", null)).StatusCode);
        await using (var db = f.NewDb())
            Assert.True(await db.AuditLogs.AnyAsync(a => a.Action == "user.email_verification_resent" && a.ActorId == supportUser.Id));

        // Support cannot change roles, refund, suspend or use staff/finance endpoints.
        Assert.Equal(HttpStatusCode.Forbidden, (await sc.PutAsJsonAsync($"/api/admin/users/{learner.Id}/roles", new { roles = new[] { "Admin" } })).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await sc.PostAsJsonAsync($"/api/admin/orders/{Guid.NewGuid()}/refunds", new { amount = 1, reason = "x" })).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await sc.PutAsJsonAsync($"/api/admin/users/{learner.Id}/suspend", new { suspended = true })).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await sc.GetAsync("/api/admin/users")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await sc.GetAsync("/api/admin/orders")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await sc.PostAsJsonAsync($"/api/admin/users/{learner.Id}/mfa/reset", new { reason = "aaaaaaaaaaaaaaa" })).StatusCode);

        // Students have no support access.
        var student = await f.CreateUser(true);
        var stc = f.Anon();
        SecurityFixture.WithToken(stc, (await SecurityFixture.Read(await f.Login(stc, student))).AccessToken);
        Assert.Equal(HttpStatusCode.Forbidden, (await stc.GetAsync($"/api/support/users/{learner.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await stc.GetAsync("/api/support/orders?email=" + learner.Email)).StatusCode);
    }
}
