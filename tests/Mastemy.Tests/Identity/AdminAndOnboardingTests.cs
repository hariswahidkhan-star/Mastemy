using System.Net;
using System.Net.Http.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Identity;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.Identity;

public class AdminTests(IdentityFixture f) : IClassFixture<IdentityFixture>
{
    [Fact]
    public async Task Role_change_requires_superadmin_and_is_audited()
    {
        var target = await f.CreateUser();
        var admin = await f.AsNew(Roles.Admin);
        var forbidden = await admin.PutAsJsonAsync($"/api/admin/users/{target.Id}/roles", new { roles = new[] { "Student", "Reviewer" } });
        Assert.Equal(HttpStatusCode.Forbidden, forbidden.StatusCode);
        var student = await f.AsNew();
        Assert.Equal(HttpStatusCode.Forbidden, (await student.PutAsJsonAsync($"/api/admin/users/{target.Id}/roles", new { roles = new[] { "Admin" } })).StatusCode);

        var sa = await f.AsNew(Roles.SuperAdmin);
        Assert.Equal(HttpStatusCode.BadRequest, (await sa.PutAsJsonAsync($"/api/admin/users/{target.Id}/roles", new { roles = new[] { "Wizard" } })).StatusCode);
        // Privileged roles need a verified email first.
        var unverified = await sa.PutAsJsonAsync($"/api/admin/users/{target.Id}/roles", new { roles = new[] { "Student", "Reviewer" } });
        Assert.Equal(HttpStatusCode.Conflict, unverified.StatusCode);
        Assert.Contains("email_not_verified", await unverified.Content.ReadAsStringAsync());
        Assert.Equal(HttpStatusCode.OK, (await sa.PostAsync($"/api/admin/users/{target.Id}/email-verification/mark-verified", null)).StatusCode);
        var ok = await sa.PutAsJsonAsync($"/api/admin/users/{target.Id}/roles", new { roles = new[] { "Student", "Reviewer" } });
        Assert.Equal(HttpStatusCode.OK, ok.StatusCode);
        await using var db = f.NewDb();
        Assert.Equal(["Reviewer", "Student"], (await db.UserRoles.Where(r => r.UserId == target.Id).Select(r => r.Role).ToListAsync()).Order());
        Assert.True(await db.AuditLogs.AnyAsync(a => a.Action == "user.roles_changed" && a.EntityId == target.Id.ToString()));
    }

    [Fact]
    public async Task SuperAdmin_cannot_remove_own_superadmin()
    {
        var me = await f.CreateUser(Roles.SuperAdmin);
        var c = await f.As(me);
        var res = await c.PutAsJsonAsync($"/api/admin/users/{me.Id}/roles", new { roles = new[] { "Admin" } });
        Assert.Equal(HttpStatusCode.BadRequest, res.StatusCode);
    }

    [Fact]
    public async Task Flag_change_is_superadmin_only_and_audited()
    {
        var admin = await f.AsNew(Roles.Admin);
        Assert.Equal(HttpStatusCode.OK, (await admin.GetAsync("/api/admin/settings")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden,
            (await admin.PutAsJsonAsync($"/api/admin/settings/{FeatureFlags.YouTubeApiUploadsEnabled}", new { value = true })).StatusCode);

        var sa = await f.AsNew(Roles.SuperAdmin);
        var res = await sa.PutAsJsonAsync($"/api/admin/settings/{FeatureFlags.YouTubeApiUploadsEnabled}", new { value = true });
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        var all = await res.Content.ReadFromJsonAsync<Dictionary<string, bool>>();
        Assert.True(all![FeatureFlags.YouTubeApiUploadsEnabled]);
        Assert.Equal(HttpStatusCode.BadRequest, (await sa.PutAsJsonAsync("/api/admin/settings/Nope", new { value = true })).StatusCode);

        var audit = await sa.GetFromJsonAsync<PagedResult<AuditLogDto>>("/api/admin/audit?entityType=PlatformSetting", IdentityFixture.Json);
        Assert.Contains(audit!.Items, a => a.Action == "setting.changed" && a.EntityId == FeatureFlags.YouTubeApiUploadsEnabled);
    }

    [Fact]
    public async Task Suspend_revokes_tokens_and_users_list_searches()
    {
        var target = await f.CreateUser();
        var tc = f.Anon();
        var auth = (await (await tc.PostAsJsonAsync("/api/auth/login", new { email = target.Email, password = IdentityFixture.Password }))
            .Content.ReadFromJsonAsync<AuthResponse>(IdentityFixture.Json))!;
        var admin = await f.AsNew(Roles.Admin);
        var page = await admin.GetFromJsonAsync<PagedResult<AdminUserDto>>($"/api/admin/users?q={target.Email[..10]}", IdentityFixture.Json);
        Assert.Contains(page!.Items, u => u.Id == target.Id);

        Assert.Equal(HttpStatusCode.OK, (await admin.PutAsJsonAsync($"/api/admin/users/{target.Id}/suspend", new { suspended = true })).StatusCode);
        Assert.Equal(HttpStatusCode.Unauthorized, (await tc.PostAsJsonAsync("/api/auth/refresh", new { refreshToken = auth.RefreshToken })).StatusCode);
        await using var db = f.NewDb();
        Assert.True(await db.AuditLogs.AnyAsync(a => a.Action == "user.suspended" && a.EntityId == target.Id.ToString()));
    }
}

public class OnboardingTests(IdentityFixture f) : IClassFixture<IdentityFixture>
{
    private const string Video = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

    private static object App(string? code = null, string url = Video, bool agree = true) => new
    {
        headline = "Senior data engineer", bio = "Ten years of building data platforms and teaching.",
        expertiseEvidence = "Certifications and published talks.", testVideoUrl = url, agreementAccepted = agree, invitationCode = code,
    };

    private async Task<string> Invite(string email)
    {
        var staff = await f.AsNew(Roles.Admin);
        var res = await staff.PostAsJsonAsync("/api/admin/instructor-invitations", new { email });
        res.EnsureSuccessStatusCode();
        var dto = (await res.Content.ReadFromJsonAsync<InvitationCreatedDto>(IdentityFixture.Json))!;
        await using var db = f.NewDb();
        var inv = await db.InstructorInvitations.SingleAsync(i => i.Id == dto.Id);
        Assert.Equal(Tokens.Sha256(dto.Code), inv.CodeHash);
        Assert.True(inv.ExpiresAt > DateTime.UtcNow.AddDays(13.9));
        return dto.Code;
    }

    private async Task<ApplicationDto> Approve(Guid id)
    {
        var reviewer = await f.AsNew(Roles.Reviewer);
        var res = await reviewer.PostAsJsonAsync($"/api/admin/instructor-applications/{id}/decision", new { decision = "Approve", notes = "Welcome" });
        res.EnsureSuccessStatusCode();
        return (await res.Content.ReadFromJsonAsync<ApplicationDto>(IdentityFixture.Json))!;
    }

    // Flags are global per test-class database, so the whole lifecycle runs sequentially in one test.
    [Fact]
    public async Task Onboarding_flag_lifecycle()
    {
        // 1. Defaults: closed + invite-only. No code -> 403.
        var applicant = await f.CreateUser();
        var ac = await f.As(applicant);
        Assert.Equal(HttpStatusCode.Forbidden, (await ac.PostAsJsonAsync("/api/instructor-applications", App())).StatusCode);

        // 2. Invite path works while public registration is closed; code bound to email, single-use.
        var code = await Invite(applicant.Email);
        var other = await f.As(await f.CreateUser());
        Assert.Equal(HttpStatusCode.Forbidden, (await other.PostAsJsonAsync("/api/instructor-applications", App(code))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await ac.PostAsJsonAsync("/api/instructor-applications", App(code, agree: false))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await ac.PostAsJsonAsync("/api/instructor-applications", App(code, url: "https://vimeo.com/123"))).StatusCode);
        var submit = await ac.PostAsJsonAsync("/api/instructor-applications", App(code));
        Assert.Equal(HttpStatusCode.OK, submit.StatusCode);
        var app = (await submit.Content.ReadFromJsonAsync<ApplicationDto>(IdentityFixture.Json))!;
        Assert.Equal("dQw4w9WgXcQ", app.TestVideoId);
        // The invitation is single-use.
        Assert.Equal(HttpStatusCode.Forbidden, (await ac.PostAsJsonAsync("/api/instructor-applications", App(code))).StatusCode);

        // Students cannot review.
        Assert.Equal(HttpStatusCode.Forbidden, (await ac.PostAsJsonAsync($"/api/admin/instructor-applications/{app.Id}/decision", new { decision = "Approve" })).StatusCode);

        // 3. Approval grants the Instructor role and is audited.
        var approved = await Approve(app.Id);
        Assert.Equal(ApplicationStatus.Approved, approved.Status);
        await using (var db = f.NewDb())
        {
            Assert.True(await db.UserRoles.AnyAsync(r => r.UserId == applicant.Id && r.Role == Roles.Instructor));
            Assert.True(await db.AuditLogs.AnyAsync(a => a.Action == "user.role_granted" && a.EntityId == applicant.Id.ToString()));
        }

        // 4. Open public, invite-only still on: code required.
        await f.SetFlag(FeatureFlags.ExternalInstructorRegistrationEnabled, true);
        var u2 = await f.As(await f.CreateUser());
        Assert.Equal(HttpStatusCode.Forbidden, (await u2.PostAsJsonAsync("/api/instructor-applications", App("bogus-code"))).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await u2.PostAsJsonAsync("/api/instructor-applications", App())).StatusCode);

        // 5. Open, not invite-only: anyone may apply.
        await f.SetFlag(FeatureFlags.InstructorApplicationsInviteOnly, false);
        Assert.Equal(HttpStatusCode.OK, (await u2.PostAsJsonAsync("/api/instructor-applications", App())).StatusCode);
        Assert.Equal(HttpStatusCode.Conflict, (await u2.PostAsJsonAsync("/api/instructor-applications", App())).StatusCode);

        // 6. Paused: new applications blocked (even invited), approved instructor keeps role.
        var invitedLater = await f.CreateUser();
        var laterCode = await Invite(invitedLater.Email);
        await f.SetFlag(FeatureFlags.NewInstructorApplicationsPaused, true);
        var u3 = await f.As(await f.CreateUser());
        Assert.Equal(HttpStatusCode.Forbidden, (await u3.PostAsJsonAsync("/api/instructor-applications", App())).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await (await f.As(invitedLater)).PostAsJsonAsync("/api/instructor-applications", App(laterCode))).StatusCode);
        var status = await u3.GetFromJsonAsync<OnboardingStatusDto>("/api/instructor-onboarding/status", IdentityFixture.Json);
        Assert.True(status!.Paused);

        // Toggling every flag back to closed never touches existing instructor roles.
        await f.SetFlag(FeatureFlags.ExternalInstructorRegistrationEnabled, false);
        await f.SetFlag(FeatureFlags.InstructorApplicationsInviteOnly, true);
        var me = await (await f.As(applicant)).GetFromJsonAsync<UserDto>("/api/auth/me", IdentityFixture.Json);
        Assert.Contains(Roles.Instructor, me!.Roles);
        var myStatus = await (await f.As(applicant)).GetFromJsonAsync<OnboardingStatusDto>("/api/instructor-onboarding/status", IdentityFixture.Json);
        Assert.Equal(ApplicationStatus.Approved, myStatus!.MyApplication!.Status);
    }

    [Theory]
    [InlineData("https://youtu.be/dQw4w9WgXcQ", true)]
    [InlineData("https://www.youtube.com/shorts/dQw4w9WgXcQ", true)]
    [InlineData("https://www.youtube.com/embed/dQw4w9WgXcQ", true)]
    [InlineData("https://m.youtube.com/watch?v=dQw4w9WgXcQ&t=10", true)]
    [InlineData("https://evil.com/watch?v=dQw4w9WgXcQ", false)]
    [InlineData("javascript:alert(1)", false)]
    [InlineData("https://www.youtube.com/watch?v=short", false)]
    public void YouTube_parser(string url, bool ok) => Assert.Equal(ok, YouTubeUrl.TryParseVideoId(url, out _));
}
