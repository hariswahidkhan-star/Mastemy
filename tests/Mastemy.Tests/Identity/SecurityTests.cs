using System.Net;
using System.Net.Http.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.Identity;

public class MfaTests(SecurityFixture f) : IClassFixture<SecurityFixture>
{
    private static async Task<string> Body(HttpResponseMessage r) => await r.Content.ReadAsStringAsync();

    [Theory]
    [InlineData("Admin")]
    [InlineData("SuperAdmin")]
    [InlineData("Finance")]
    [InlineData("Reviewer")]
    [InlineData("Moderator")]
    public async Task Privileged_login_without_mfa_gets_restricted_enrollment_token(string role)
    {
        var u = await f.CreateUser(true, role);
        var c = f.Anon();
        var login = await SecurityFixture.Read(await f.Login(c, u));
        Assert.Equal(LoginStatus.MfaEnrollmentRequired, login.Status);
        Assert.Null(login.RefreshToken);
        Assert.NotNull(login.AccessToken);
        SecurityFixture.WithToken(c, login.AccessToken);

        // The restricted token is refused everywhere except the enrollment endpoints.
        Assert.Equal(HttpStatusCode.Forbidden, (await c.GetAsync("/api/admin/users")).StatusCode); // token carries no roles
        foreach (var url in new[] { "/api/me/profile", "/api/auth/sessions", "/api/me/notes" })
        {
            var r = await c.GetAsync(url);
            Assert.Equal(HttpStatusCode.Forbidden, r.StatusCode);
            Assert.Contains("mfa_enrollment_required", await Body(r));
        }
        Assert.Equal(HttpStatusCode.OK, (await c.GetAsync("/api/auth/mfa/status")).StatusCode);
        var status = await c.GetFromJsonAsync<MfaStatusDto>("/api/auth/mfa/status", IdentityFixture.Json);
        Assert.True(status!.Required);
        Assert.False(status.Enabled);

        var enroll = await (await c.PostAsync("/api/auth/mfa/enroll", null)).Content.ReadFromJsonAsync<MfaEnrollmentDto>(IdentityFixture.Json);
        Assert.StartsWith("otpauth://totp/", enroll!.OtpAuthUri);
        Assert.Contains("issuer=Mastemy", enroll.OtpAuthUri);
        await using (var db = f.NewDb())
        {
            var sec = await db.Set<UserSecurity>().SingleAsync(s => s.UserId == u.Id);
            Assert.DoesNotContain(enroll.Secret, sec.MfaPendingSecretProtected); // encrypted at rest
        }
        var bad = await c.PostAsJsonAsync("/api/auth/mfa/enroll/confirm", new { code = "000000" == SecurityFixture.Code(enroll.Secret) ? "111111" : "000000" });
        Assert.Equal(HttpStatusCode.BadRequest, bad.StatusCode);
        var ok = await c.PostAsJsonAsync("/api/auth/mfa/enroll/confirm", new { code = SecurityFixture.Code(enroll.Secret) });
        Assert.Equal(HttpStatusCode.OK, ok.StatusCode);
        var done = (await ok.Content.ReadFromJsonAsync<MfaEnrolledDto>(IdentityFixture.Json))!;
        Assert.Equal(10, done.RecoveryCodes.Distinct().Count());
        Assert.Equal(LoginStatus.Ok, done.Session.Status);
        Assert.NotNull(done.Session.RefreshToken);

        var full = SecurityFixture.WithToken(f.Anon(), done.Session.AccessToken);
        Assert.Equal(HttpStatusCode.OK, (await full.GetAsync("/api/auth/sessions")).StatusCode);
        // Recovery codes are stored hashed only.
        await using (var db = f.NewDb())
        {
            var hashes = await db.Set<MfaRecoveryCode>().Where(x => x.UserId == u.Id).Select(x => x.CodeHash).ToListAsync();
            Assert.Equal(10, hashes.Count);
            Assert.DoesNotContain(done.RecoveryCodes[0].Replace("-", ""), hashes);
        }
        // Refreshing keeps the MFA authentication level.
        var refreshed = await SecurityFixture.Read(await f.Anon().PostAsJsonAsync("/api/auth/refresh", new { refreshToken = done.Session.RefreshToken }));
        Assert.Equal(HttpStatusCode.OK, (await SecurityFixture.WithToken(f.Anon(), refreshed.AccessToken).GetAsync("/api/auth/sessions")).StatusCode);
    }

    [Fact]
    public async Task Admin_endpoints_require_mfa_authenticated_token()
    {
        var admin = await f.CreateUser(true, Roles.Admin);
        // A token issued without amr=mfa (e.g. legacy or password-only) is refused for privileged roles.
        var legacy = SecurityFixture.WithToken(f.Anon(), f.Factory.Services.GetRequiredService<JwtIssuer>().Issue(admin));
        var r = await legacy.GetAsync("/api/admin/users");
        Assert.Equal(HttpStatusCode.Forbidden, r.StatusCode);
        Assert.Contains("mfa_required", await Body(r));
        Assert.Equal(HttpStatusCode.OK, (await legacy.GetAsync("/api/auth/me")).StatusCode);

        // A student is unaffected.
        var student = await f.CreateUser(false);
        var sc = SecurityFixture.WithToken(f.Anon(), f.Factory.Services.GetRequiredService<JwtIssuer>().Issue(student));
        Assert.Equal(HttpStatusCode.OK, (await sc.GetAsync("/api/me/profile")).StatusCode);

        var (c, _, _, _) = await f.SignedInWithMfa(Roles.Admin);
        Assert.Equal(HttpStatusCode.OK, (await c.GetAsync("/api/admin/users")).StatusCode);
    }

    [Fact]
    public async Task Mfa_login_challenge_rejects_replayed_code_and_wrong_codes()
    {
        var u = await f.CreateUser(true, Roles.Reviewer);
        var secret = await f.SeedMfa(u);
        var c = f.Anon();
        var login = await SecurityFixture.Read(await f.Login(c, u));
        Assert.Equal(LoginStatus.MfaRequired, login.Status);
        Assert.Null(login.AccessToken);
        Assert.Null(login.RefreshToken);

        var code = SecurityFixture.Code(secret);
        var wrong = code == "123456" ? "654321" : "123456";
        Assert.Equal(HttpStatusCode.Unauthorized, (await c.PostAsJsonAsync("/api/auth/mfa/verify", new { mfaToken = login.MfaToken, code = wrong })).StatusCode);
        var ok = await c.PostAsJsonAsync("/api/auth/mfa/verify", new { mfaToken = login.MfaToken, code });
        Assert.Equal(HttpStatusCode.OK, ok.StatusCode);
        Assert.NotNull((await SecurityFixture.Read(ok)).RefreshToken);
        // Challenge is single use.
        Assert.Equal(HttpStatusCode.Unauthorized, (await c.PostAsJsonAsync("/api/auth/mfa/verify", new { mfaToken = login.MfaToken, code })).StatusCode);

        // Same code on a new challenge: replay (its time step was consumed).
        var login2 = await SecurityFixture.Read(await f.Login(c, u));
        var replay = await c.PostAsJsonAsync("/api/auth/mfa/verify", new { mfaToken = login2.MfaToken, code });
        Assert.Equal(HttpStatusCode.Unauthorized, replay.StatusCode);
        Assert.Contains("invalid_mfa_code", await Body(replay));
        // The next step's code is still accepted (±1 window).
        Assert.Equal(HttpStatusCode.OK, (await c.PostAsJsonAsync("/api/auth/mfa/verify", new { mfaToken = login2.MfaToken, code = SecurityFixture.Code(secret, 1) })).StatusCode);
        // Codes two steps away are outside the window.
        var login3 = await SecurityFixture.Read(await f.Login(c, u));
        Assert.Equal(HttpStatusCode.Unauthorized, (await c.PostAsJsonAsync("/api/auth/mfa/verify", new { mfaToken = login3.MfaToken, code = SecurityFixture.Code(secret, 3) })).StatusCode);
    }

    [Fact]
    public async Task Challenge_is_invalidated_after_five_failed_codes()
    {
        var u = await f.CreateUser(false);
        var secret = await f.SeedMfa(u);
        var c = f.Anon();
        var login = await SecurityFixture.Read(await f.Login(c, u));
        var valid = new[] { SecurityFixture.Code(secret, -1), SecurityFixture.Code(secret), SecurityFixture.Code(secret, 1) };
        var wrong = Enumerable.Range(100000, 10).Select(i => i.ToString()).First(x => !valid.Contains(x));
        for (var i = 0; i < MfaService.MaxChallengeAttempts; i++)
            await c.PostAsJsonAsync("/api/auth/mfa/verify", new { mfaToken = login.MfaToken, code = wrong });
        var r = await c.PostAsJsonAsync("/api/auth/mfa/verify", new { mfaToken = login.MfaToken, code = SecurityFixture.Code(secret) });
        Assert.Equal(HttpStatusCode.Unauthorized, r.StatusCode);
        Assert.Contains("invalid_mfa_challenge", await Body(r));
    }

    [Fact]
    public async Task Recovery_codes_are_single_use_and_regenerable()
    {
        // A student may opt in to MFA voluntarily.
        var u = await f.CreateUser(false);
        var c = f.Anon();
        var first = await SecurityFixture.Read(await f.Login(c, u));
        Assert.Equal(LoginStatus.Ok, first.Status);
        SecurityFixture.WithToken(c, first.AccessToken);
        var enroll = (await (await c.PostAsync("/api/auth/mfa/enroll", null)).Content.ReadFromJsonAsync<MfaEnrollmentDto>(IdentityFixture.Json))!;
        var done = (await (await c.PostAsJsonAsync("/api/auth/mfa/enroll/confirm", new { code = SecurityFixture.Code(enroll.Secret) }))
            .Content.ReadFromJsonAsync<MfaEnrolledDto>(IdentityFixture.Json))!;
        // Enabling MFA ended the earlier password-only session.
        Assert.Equal(HttpStatusCode.Unauthorized, (await f.Anon().PostAsJsonAsync("/api/auth/refresh", new { refreshToken = first.RefreshToken })).StatusCode);

        var anon = f.Anon();
        var login = await SecurityFixture.Read(await f.Login(anon, u));
        var ok = await anon.PostAsJsonAsync("/api/auth/mfa/verify", new { mfaToken = login.MfaToken, recoveryCode = done.RecoveryCodes[0].ToLowerInvariant() });
        Assert.Equal(HttpStatusCode.OK, ok.StatusCode);
        var login2 = await SecurityFixture.Read(await f.Login(anon, u));
        Assert.Equal(HttpStatusCode.Unauthorized, (await anon.PostAsJsonAsync("/api/auth/mfa/verify", new { mfaToken = login2.MfaToken, recoveryCode = done.RecoveryCodes[0] })).StatusCode);
        var authed = SecurityFixture.WithToken(f.Anon(), (await SecurityFixture.Read(ok)).AccessToken);
        var status = await authed.GetFromJsonAsync<MfaStatusDto>("/api/auth/mfa/status", IdentityFixture.Json);
        Assert.Equal(9, status!.RemainingRecoveryCodes);
        await using (var db = f.NewDb())
            Assert.True(await db.AuditLogs.AnyAsync(a => a.Action == "user.mfa_recovery_code_used" && a.EntityId == u.Id.ToString()));

        // Regenerating requires a fresh TOTP code and invalidates every old code.
        var regen = await authed.PostAsJsonAsync("/api/auth/mfa/recovery-codes", new { code = SecurityFixture.Code(enroll.Secret, 1) });
        Assert.Equal(HttpStatusCode.OK, regen.StatusCode);
        var login3 = await SecurityFixture.Read(await f.Login(anon, u));
        Assert.Equal(HttpStatusCode.Unauthorized, (await anon.PostAsJsonAsync("/api/auth/mfa/verify", new { mfaToken = login3.MfaToken, recoveryCode = done.RecoveryCodes[1] })).StatusCode);
    }

    [Fact]
    public async Task Privileged_user_cannot_disable_mfa_but_student_can()
    {
        var (admin, _, adminSecret, _) = await f.SignedInWithMfa(Roles.Admin);
        var r = await admin.PostAsJsonAsync("/api/auth/mfa/disable", new { password = SecurityFixture.Password, code = SecurityFixture.Code(adminSecret, 1) });
        Assert.Equal(HttpStatusCode.Conflict, r.StatusCode);
        Assert.Contains("mfa_required_for_role", await Body(r));

        var (student, su, secret, _) = await f.SignedInWithMfa();
        Assert.Equal(HttpStatusCode.BadRequest, (await student.PostAsJsonAsync("/api/auth/mfa/disable", new { password = "Wrong123456", code = SecurityFixture.Code(secret, 1) })).StatusCode);
        Assert.Equal(HttpStatusCode.NoContent, (await student.PostAsJsonAsync("/api/auth/mfa/disable", new { password = SecurityFixture.Password, code = SecurityFixture.Code(secret, 1) })).StatusCode);
        var login = await SecurityFixture.Read(await f.Login(f.Anon(), su));
        Assert.Equal(LoginStatus.Ok, login.Status);
    }

    [Fact]
    public async Task Granting_privileged_role_requires_verified_email_and_admins_can_mark_verified()
    {
        var (sa, _, _, _) = await f.SignedInWithMfa(Roles.SuperAdmin);
        var target = await f.CreateUser(false);
        var page = await sa.GetFromJsonAsync<PagedResult<AdminUserDto>>($"/api/admin/users?q={target.Email[..12]}", IdentityFixture.Json);
        Assert.False(page!.Items.Single().EmailVerified);

        var r = await sa.PutAsJsonAsync($"/api/admin/users/{target.Id}/roles", new { roles = new[] { "Student", "Finance" } });
        Assert.Equal(HttpStatusCode.Conflict, r.StatusCode);
        Assert.Contains("email_not_verified", await Body(r));
        // Non-privileged roles do not need it.
        Assert.Equal(HttpStatusCode.OK, (await sa.PutAsJsonAsync($"/api/admin/users/{target.Id}/roles", new { roles = new[] { "Student", "Instructor" } })).StatusCode);

        Assert.Equal(HttpStatusCode.Accepted, (await sa.PostAsync($"/api/admin/users/{target.Id}/email-verification/resend", null)).StatusCode);
        Assert.NotNull(await f.LatestEmailToken(target.Email, "/verify-email"));
        var marked = await (await sa.PostAsync($"/api/admin/users/{target.Id}/email-verification/mark-verified", null))
            .Content.ReadFromJsonAsync<AdminUserDto>(IdentityFixture.Json);
        Assert.True(marked!.EmailVerified);
        Assert.Equal(HttpStatusCode.OK, (await sa.PutAsJsonAsync($"/api/admin/users/{target.Id}/roles", new { roles = new[] { "Student", "Finance" } })).StatusCode);
        await using var db = f.NewDb();
        Assert.True(await db.AuditLogs.AnyAsync(a => a.Action == "user.email_marked_verified" && a.EntityId == target.Id.ToString()));

        // Students cannot use the admin actions.
        var student = SecurityFixture.WithToken(f.Anon(), (await SecurityFixture.Read(await f.Login(f.Anon(), await f.CreateUser(true)))).AccessToken);
        Assert.Equal(HttpStatusCode.Forbidden, (await student.PostAsync($"/api/admin/users/{target.Id}/email-verification/mark-verified", null)).StatusCode);
    }
}

public class AccountRecoveryTests(SecurityFixture f) : IClassFixture<SecurityFixture>
{
    [Fact]
    public async Task Registration_sends_verification_email_and_token_is_single_use()
    {
        var email = $"r{Guid.NewGuid():N}@example.com";
        var res = await f.Anon().PostAsJsonAsync("/api/auth/register", new { email, password = "abcdefghi1", displayName = "Reg" });
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        var auth = await SecurityFixture.Read(res);
        Assert.False(auth.User.EmailVerified);
        var token = await f.LatestEmailToken(email, "/verify-email");
        Assert.NotNull(token);

        Assert.Equal(HttpStatusCode.BadRequest, (await f.Anon().PostAsJsonAsync("/api/auth/email/verify", new { token = "nope" })).StatusCode);
        Assert.Equal(HttpStatusCode.NoContent, (await f.Anon().PostAsJsonAsync("/api/auth/email/verify", new { token })).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await f.Anon().PostAsJsonAsync("/api/auth/email/verify", new { token })).StatusCode);
        var me = await SecurityFixture.WithToken(f.Anon(), auth.AccessToken).GetFromJsonAsync<UserDto>("/api/auth/me", IdentityFixture.Json);
        Assert.True(me!.EmailVerified);
        var again = await SecurityFixture.WithToken(f.Anon(), auth.AccessToken).PostAsync("/api/auth/email/resend", null);
        Assert.Equal(HttpStatusCode.Conflict, again.StatusCode);
    }

    [Fact]
    public async Task Password_reset_is_uniform_single_use_expiring_and_revokes_sessions()
    {
        var unknown = await f.Anon().PostAsJsonAsync("/api/auth/password/forgot", new { email = $"nobody{Guid.NewGuid():N}@example.com" });
        var u = await f.CreateUser(false);
        var c = f.Anon();
        var session = await SecurityFixture.Read(await f.Login(c, u));
        var known = await f.Anon().PostAsJsonAsync("/api/auth/password/forgot", new { email = u.Email.ToUpperInvariant() });
        Assert.Equal(HttpStatusCode.Accepted, unknown.StatusCode);
        Assert.Equal(HttpStatusCode.Accepted, known.StatusCode);
        Assert.Equal(await unknown.Content.ReadAsStringAsync(), await known.Content.ReadAsStringAsync());

        var token = await f.LatestEmailToken(u.Email, "/reset-password");
        Assert.NotNull(token);
        await using (var db = f.NewDb())
            Assert.False(await db.Set<OneTimeToken>().AnyAsync(t => t.TokenHash == token)); // stored hashed

        Assert.Equal(HttpStatusCode.BadRequest, (await f.Anon().PostAsJsonAsync("/api/auth/password/reset", new { token, newPassword = "weak" })).StatusCode);
        Assert.Equal(HttpStatusCode.NoContent, (await f.Anon().PostAsJsonAsync("/api/auth/password/reset", new { token, newPassword = "BrandNewPass9" })).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await f.Anon().PostAsJsonAsync("/api/auth/password/reset", new { token, newPassword = "AnotherPass9" })).StatusCode);
        Assert.Equal(HttpStatusCode.Unauthorized, (await f.Anon().PostAsJsonAsync("/api/auth/refresh", new { refreshToken = session.RefreshToken })).StatusCode);
        Assert.Equal(HttpStatusCode.Unauthorized, (await f.Login(f.Anon(), u)).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await f.Login(f.Anon(), u, "BrandNewPass9")).StatusCode);

        // A newer request invalidates the older link; an expired link is rejected.
        await f.Anon().PostAsJsonAsync("/api/auth/password/forgot", new { email = u.Email });
        var older = await f.LatestEmailToken(u.Email, "/reset-password");
        await Task.Delay(20);
        await f.Anon().PostAsJsonAsync("/api/auth/password/forgot", new { email = u.Email });
        var newer = await f.LatestEmailToken(u.Email, "/reset-password");
        Assert.NotEqual(older, newer);
        Assert.Equal(HttpStatusCode.BadRequest, (await f.Anon().PostAsJsonAsync("/api/auth/password/reset", new { token = older, newPassword = "OlderLink99x" })).StatusCode);
        await using (var db = f.NewDb())
            await db.Set<OneTimeToken>().Where(t => t.UserId == u.Id && t.UsedAt == null)
                .ExecuteUpdateAsync(s => s.SetProperty(t => t.ExpiresAt, DateTime.UtcNow.AddMinutes(-1)));
        var expired = await f.Anon().PostAsJsonAsync("/api/auth/password/reset", new { token = newer, newPassword = "Expired999x" });
        Assert.Equal(HttpStatusCode.BadRequest, expired.StatusCode);
        Assert.Contains("invalid_token", await expired.Content.ReadAsStringAsync());
    }

    [Fact]
    public async Task Change_password_requires_current_password_and_revokes_refresh_tokens()
    {
        var u = await f.CreateUser(false);
        var auth = await SecurityFixture.Read(await f.Login(f.Anon(), u));
        var c = SecurityFixture.WithToken(f.Anon(), auth.AccessToken);
        Assert.Equal(HttpStatusCode.Unauthorized, (await f.Anon().PostAsJsonAsync("/api/auth/password/change", new { currentPassword = SecurityFixture.Password, newPassword = "NewPassword12" })).StatusCode);
        var wrong = await c.PostAsJsonAsync("/api/auth/password/change", new { currentPassword = "WrongPass123", newPassword = "NewPassword12" });
        Assert.Equal(HttpStatusCode.BadRequest, wrong.StatusCode);
        Assert.Equal(HttpStatusCode.NoContent, (await c.PostAsJsonAsync("/api/auth/password/change", new { currentPassword = SecurityFixture.Password, newPassword = "NewPassword12" })).StatusCode);
        Assert.Equal(HttpStatusCode.Unauthorized, (await f.Anon().PostAsJsonAsync("/api/auth/refresh", new { refreshToken = auth.RefreshToken })).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await f.Login(f.Anon(), u, "NewPassword12")).StatusCode);
        await using var db = f.NewDb();
        Assert.True(await db.AuditLogs.AnyAsync(a => a.Action == "user.password_changed" && a.EntityId == u.Id.ToString()));
    }

    [Fact]
    public async Task Sessions_list_user_agents_and_can_be_revoked_individually_or_all()
    {
        var u = await f.CreateUser(false);
        var a = f.Anon(); a.DefaultRequestHeaders.UserAgent.ParseAdd("BrowserA/1.0");
        var b = f.Anon(); b.DefaultRequestHeaders.UserAgent.ParseAdd("BrowserB/2.0");
        var sa = await SecurityFixture.Read(await f.Login(a, u));
        var sb = await SecurityFixture.Read(await f.Login(b, u));
        SecurityFixture.WithToken(a, sa.AccessToken);
        var list = (await a.GetFromJsonAsync<List<SessionDto>>("/api/auth/sessions", IdentityFixture.Json))!;
        Assert.Equal(2, list.Count);
        Assert.Contains(list, s => s.UserAgent == "BrowserA/1.0" && s.Current);
        var other = list.Single(s => s.UserAgent == "BrowserB/2.0");
        Assert.False(other.Current);

        // Another user cannot revoke it.
        var stranger = SecurityFixture.WithToken(f.Anon(), (await SecurityFixture.Read(await f.Login(f.Anon(), await f.CreateUser(false)))).AccessToken);
        Assert.Equal(HttpStatusCode.NotFound, (await stranger.DeleteAsync($"/api/auth/sessions/{other.Id}")).StatusCode);

        Assert.Equal(HttpStatusCode.NoContent, (await a.DeleteAsync($"/api/auth/sessions/{other.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.Unauthorized, (await f.Anon().PostAsJsonAsync("/api/auth/refresh", new { refreshToken = sb.RefreshToken })).StatusCode);
        var refreshed = await SecurityFixture.Read(await f.Anon().PostAsJsonAsync("/api/auth/refresh", new { refreshToken = sa.RefreshToken }));
        Assert.NotNull(refreshed.RefreshToken);
        Assert.Equal(HttpStatusCode.NoContent, (await a.DeleteAsync("/api/auth/sessions")).StatusCode);
        Assert.Equal(HttpStatusCode.Unauthorized, (await f.Anon().PostAsJsonAsync("/api/auth/refresh", new { refreshToken = refreshed.RefreshToken })).StatusCode);
        Assert.Empty((await a.GetFromJsonAsync<List<SessionDto>>("/api/auth/sessions", IdentityFixture.Json))!);
        Assert.Equal(HttpStatusCode.Unauthorized, (await f.Anon().GetAsync("/api/auth/sessions")).StatusCode);
    }
}

/// <summary>Server without SMTP: registration still works, reset/resend fail loudly (503) instead of faking success.</summary>
public class EmailNotConfiguredTests(IdentityFixture f) : IClassFixture<IdentityFixture>
{
    [Fact]
    public async Task Reset_and_resend_return_503_when_email_is_not_configured()
    {
        var email = $"n{Guid.NewGuid():N}@example.com";
        var reg = await f.Anon().PostAsJsonAsync("/api/auth/register", new { email, password = "abcdefghi1", displayName = "N" });
        Assert.Equal(HttpStatusCode.OK, reg.StatusCode);
        var auth = (await reg.Content.ReadFromJsonAsync<AuthResponse>(IdentityFixture.Json))!;
        Assert.False(auth.User.EmailVerified);
        await using (var db = f.NewDb()) Assert.False(await db.EmailOutbox.AnyAsync(m => m.ToAddress == email));

        var forgot = await f.Anon().PostAsJsonAsync("/api/auth/password/forgot", new { email });
        Assert.Equal(HttpStatusCode.ServiceUnavailable, forgot.StatusCode);
        Assert.Contains("email_not_configured", await forgot.Content.ReadAsStringAsync());
        var c = f.Anon();
        c.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", auth.AccessToken);
        Assert.Equal(HttpStatusCode.ServiceUnavailable, (await c.PostAsync("/api/auth/email/resend", null)).StatusCode);
    }
}
