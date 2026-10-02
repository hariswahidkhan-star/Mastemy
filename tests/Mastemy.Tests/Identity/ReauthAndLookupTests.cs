using System.Net;
using System.Net.Http.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Identity;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.Identity;

public class ReauthAndLookupTests(IdentityFixture f) : IClassFixture<IdentityFixture>
{
    private static async Task<T> Get<T>(HttpClient c, string url)
    {
        var r = await c.GetAsync(url);
        Assert.True(r.IsSuccessStatusCode, $"{url}: {(int)r.StatusCode} {await r.Content.ReadAsStringAsync()}");
        return (await r.Content.ReadFromJsonAsync<T>(IdentityFixture.Json))!;
    }

    [Fact]
    public async Task Role_change_tells_the_user_to_sign_in_again_and_me_reports_requires_reauth()
    {
        var learner = await f.CreateUser(Roles.Student);
        var learnerClient = await f.As(learner);
        Assert.False((await Get<UserDto>(learnerClient, "/api/auth/me")).RequiresReauth);

        var admin = await f.AsNew(Roles.SuperAdmin);
        // A privileged token without amr=mfa must re-authenticate (MFA step-up).
        Assert.True((await Get<UserDto>(admin, "/api/auth/me")).RequiresReauth);

        var res = await admin.PutAsJsonAsync($"/api/admin/users/{learner.Id}/roles", new { roles = new[] { Roles.Student, Roles.Instructor } });
        res.EnsureSuccessStatusCode();
        var dto = (await res.Content.ReadFromJsonAsync<AdminUserDto>(IdentityFixture.Json))!;
        Assert.True(dto.SignInAgainRequired);
        Assert.Contains("sign in again", dto.Notice!, StringComparison.OrdinalIgnoreCase);
        await using (var db = f.NewDb())
            Assert.True(await db.Notifications.AnyAsync(n => n.UserId == learner.Id && n.Kind == "account_security" && n.Title.Contains("sign in again")));

        // The learner's existing token lacks the new role: still valid, but flagged so the UI prompts a fresh sign-in.
        Assert.True((await Get<UserDto>(learnerClient, "/api/auth/me")).RequiresReauth);
        var fresh = await f.As(learner);
        Assert.False((await Get<UserDto>(fresh, "/api/auth/me")).RequiresReauth);

        // Re-saving the same roles is not a change.
        var same = await admin.PutAsJsonAsync($"/api/admin/users/{learner.Id}/roles", new { roles = new[] { Roles.Instructor, Roles.Student } });
        var sameDto = (await same.Content.ReadFromJsonAsync<AdminUserDto>(IdentityFixture.Json))!;
        Assert.False(sameDto.SignInAgainRequired);
        Assert.Null(sameDto.Notice);
    }

    [Fact]
    public async Task User_lookup_is_staff_only_and_masks_emails()
    {
        var target = await f.CreateUser(Roles.Student);
        var unique = "Lookup " + Guid.NewGuid().ToString("N")[..8];
        await using (var db = f.NewDb())
        {
            await db.Users.Where(u => u.Id == target.Id).ExecuteUpdateAsync(s => s.SetProperty(u => u.DisplayName, unique));
        }
        var staff = await f.AsNew(Roles.Admin);
        var hits = await Get<List<UserLookupDto>>(staff, $"/api/admin/users/lookup?q={Uri.EscapeDataString(unique)}");
        var hit = Assert.Single(hits);
        Assert.Equal(target.Id, hit.Id);
        Assert.Equal(unique, hit.DisplayName);
        Assert.DoesNotContain(target.Email.Split('@')[0], hit.MaskedEmail);
        Assert.Contains("***", hit.MaskedEmail);
        Assert.Single(await Get<List<UserLookupDto>>(staff, $"/api/admin/users/lookup?q={target.Email}"));
        Assert.Single(await Get<List<UserLookupDto>>(staff, $"/api/admin/users/lookup?q={target.Id}"));
        Assert.Equal(HttpStatusCode.BadRequest, (await staff.GetAsync("/api/admin/users/lookup?q=a")).StatusCode);
        var student = await f.AsNew(Roles.Student);
        Assert.Equal(HttpStatusCode.Forbidden, (await student.GetAsync($"/api/admin/users/lookup?q={Uri.EscapeDataString(unique)}")).StatusCode);
    }

    [Theory]
    [InlineData("jane.doe@example.com", "j***e@e***.com")]
    [InlineData("ab@x.io", "a***@x***.io")]
    [InlineData("broken", "***")]
    public void Emails_are_masked(string email, string masked) => Assert.Equal(masked, AdminService.MaskEmail(email));
}
