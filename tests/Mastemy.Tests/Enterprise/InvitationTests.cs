using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Enterprise;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.Enterprise;

public class InvitationTests(EnterpriseFixture f) : IClassFixture<EnterpriseFixture>
{
    private async Task<(OrgDto Org, User Admin, HttpClient AdminC, HttpClient Staff)> NewOrg(int seats = 10)
    {
        var (_, staff) = await f.User(Roles.Admin);
        var tag = Guid.NewGuid().ToString("N")[..12];
        var org = (await (await staff.PostAsJsonAsync("api/admin/orgs", new OrgInput("Org " + tag, "org-" + tag, seats))).Content.ReadFromJsonAsync<OrgDto>())!;
        var (admin, ac) = await f.User();
        (await EnterpriseTests.Accept(ac, (await EnterpriseTests.Invite(org, staff, admin.Email, "Admin")).Token)).EnsureSuccessStatusCode();
        return (org, admin, ac, staff);
    }

    private static async Task<string?> Problem(HttpResponseMessage r) =>
        JsonDocument.Parse(await r.Content.ReadAsStringAsync()).RootElement.TryGetProperty("type", out var t) ? t.GetString() : null;

    [Fact]
    public async Task Invite_response_is_identical_for_existing_and_unknown_emails()
    {
        var (org, _, admin, _) = await NewOrg();
        var (existing, _) = await f.User();
        var r1 = await admin.PostAsJsonAsync($"api/orgs/{org.Id}/members", new AddMemberInput(existing.Email, null, "Eng"));
        var r2 = await admin.PostAsJsonAsync($"api/orgs/{org.Id}/members", new AddMemberInput("no-account-" + Guid.NewGuid().ToString("N")[..8] + "@nowhere.test", null, "Eng"));
        Assert.Equal(HttpStatusCode.OK, r1.StatusCode);
        Assert.Equal(r1.StatusCode, r2.StatusCode);
        static List<string> Shape(string json) => JsonDocument.Parse(json).RootElement.EnumerateObject().Select(p => $"{p.Name}:{p.Value.ValueKind}").ToList();
        Assert.Equal(Shape(await r1.Content.ReadAsStringAsync()), Shape(await r2.Content.ReadAsStringAsync()));
        Assert.Equal(HttpStatusCode.BadRequest, (await admin.PostAsJsonAsync($"api/orgs/{org.Id}/members", new AddMemberInput("not-an-email", null, null))).StatusCode);
        // Only a hash of the token is stored.
        var inv = (await r1.Content.ReadFromJsonAsync<InvitationCreatedDto>())!;
        var row = await f.Db(d => d.OrganizationInvitations.AsNoTracking().SingleAsync(i => i.Id == inv.Id));
        Assert.Equal(EnterpriseService.HashToken(inv.Token), row.TokenHash);
        Assert.NotEqual(inv.Token, row.TokenHash);
        Assert.InRange(row.ExpiresAt, DateTime.UtcNow.AddDays(13.9), DateTime.UtcNow.AddDays(14.1));
        Assert.False(await f.Db(d => d.OrganizationMembers.AnyAsync(m => m.OrganizationId == org.Id && m.UserId == existing.Id)));
    }

    [Fact]
    public async Task Acceptance_requires_matching_email_and_is_single_use()
    {
        var (org, _, admin, _) = await NewOrg();
        var (u, uc) = await f.User();
        var (_, other) = await f.User();
        var inv = await EnterpriseTests.Invite(org, admin, u.Email.ToUpperInvariant(), null, "Eng");
        var wrong = await EnterpriseTests.Accept(other, inv.Token);
        Assert.Equal(HttpStatusCode.NotFound, wrong.StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await EnterpriseTests.Accept(uc, "bogus-token")).StatusCode);
        var ok = await EnterpriseTests.Accept(uc, inv.Token);
        Assert.Equal(HttpStatusCode.OK, ok.StatusCode);
        var acc = (await ok.Content.ReadFromJsonAsync<AcceptedInvitationDto>())!;
        Assert.Equal(org.Id, acc.OrganizationId);
        Assert.Equal("Eng", acc.Department);
        Assert.Equal("Member", acc.Role);
        var again = await EnterpriseTests.Accept(uc, inv.Token);
        Assert.Equal(HttpStatusCode.Conflict, again.StatusCode);
        Assert.Equal("invitation_used", await Problem(again));

        // Expired invitations cannot be accepted.
        var (v, vc) = await f.User();
        var exp = await EnterpriseTests.Invite(org, admin, v.Email);
        await f.Db(d => d.OrganizationInvitations.Where(i => i.Id == exp.Id).ExecuteUpdateAsync(x => x.SetProperty(i => i.ExpiresAt, DateTime.UtcNow.AddMinutes(-1))));
        var expired = await EnterpriseTests.Accept(vc, exp.Token);
        Assert.Equal(HttpStatusCode.Conflict, expired.StatusCode);
        Assert.Equal("invitation_expired", await Problem(expired));
    }

    [Fact]
    public async Task Pending_list_revoke_and_seat_limit_at_acceptance()
    {
        var (org, _, admin, staff) = await NewOrg(seats: 2); // admin holds 1 seat
        var (mgr, mgrC) = await f.User();
        (await EnterpriseTests.Accept(mgrC, (await EnterpriseTests.Invite(org, admin, mgr.Email, "Manager")).Token)).EnsureSuccessStatusCode();
        var (a, ac) = await f.User();
        var (b, bc) = await f.User();
        var invA = await EnterpriseTests.Invite(org, mgrC, a.Email);
        var invB = await EnterpriseTests.Invite(org, mgrC, b.Email);
        var invAdmin = await EnterpriseTests.Invite(org, admin, "boss@nowhere.test", "Admin");
        var pending = (await mgrC.GetFromJsonAsync<List<InvitationDto>>($"api/orgs/{org.Id}/invitations"))!;
        Assert.Equal(3, pending.Count);

        // Managers cannot revoke privileged invitations; Admins can.
        Assert.Equal(HttpStatusCode.Forbidden, (await mgrC.DeleteAsync($"api/orgs/{org.Id}/invitations/{invAdmin.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.NoContent, (await admin.DeleteAsync($"api/orgs/{org.Id}/invitations/{invAdmin.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.NoContent, (await mgrC.DeleteAsync($"api/orgs/{org.Id}/invitations/{invB.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await EnterpriseTests.Accept(bc, invB.Token)).StatusCode);
        Assert.Single((await admin.GetFromJsonAsync<List<InvitationDto>>($"api/orgs/{org.Id}/invitations"))!);

        // Org is full (admin + manager): acceptance fails cleanly and the invitation stays pending.
        var full = await EnterpriseTests.Accept(ac, invA.Token);
        Assert.Equal(HttpStatusCode.Conflict, full.StatusCode);
        Assert.Equal("seat_limit_reached", await Problem(full));
        Assert.Single((await admin.GetFromJsonAsync<List<InvitationDto>>($"api/orgs/{org.Id}/invitations"))!);
        (await staff.PutAsJsonAsync($"api/admin/orgs/{org.Id}", new OrgUpdateInput(null, null, 3))).EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, (await EnterpriseTests.Accept(ac, invA.Token)).StatusCode);

        // Re-inviting the same address replaces the earlier pending invitation.
        var first = await EnterpriseTests.Invite(org, admin, "twice@nowhere.test");
        var second = await EnterpriseTests.Invite(org, admin, "TWICE@nowhere.test");
        var list = (await admin.GetFromJsonAsync<List<InvitationDto>>($"api/orgs/{org.Id}/invitations"))!;
        Assert.DoesNotContain(list, i => i.Id == first.Id);
        Assert.Contains(list, i => i.Id == second.Id);
    }

    [Fact]
    public async Task Members_list_shows_email_only_to_admins()
    {
        var (org, admin, adminC, staff) = await NewOrg();
        var (mgr, mgrC) = await f.User();
        (await EnterpriseTests.Accept(mgrC, (await EnterpriseTests.Invite(org, adminC, mgr.Email, "Manager", "Ops")).Token)).EnsureSuccessStatusCode();
        var asManager = (await mgrC.GetFromJsonAsync<List<MemberDto>>($"api/orgs/{org.Id}/members"))!;
        Assert.All(asManager, m => Assert.Null(m.Email));
        Assert.Contains(asManager, m => m.UserId == mgr.Id && m.Department == "Ops" && m.DisplayName != "");
        var raw = await mgrC.GetStringAsync($"api/orgs/{org.Id}/members");
        Assert.DoesNotContain(admin.Email, raw);
        Assert.Contains((await adminC.GetFromJsonAsync<List<MemberDto>>($"api/orgs/{org.Id}/members"))!, m => m.Email == mgr.Email);
        Assert.Contains((await staff.GetFromJsonAsync<List<MemberDto>>($"api/orgs/{org.Id}/members"))!, m => m.Email == admin.Email);
    }

    [Fact]
    public async Task Manager_cannot_change_department_when_premium_coverage_would_change()
    {
        var (org, _, adminC, _) = await NewOrg();
        var course = await f.Course();
        var (mgr, mgrC) = await f.User();
        (await EnterpriseTests.Accept(mgrC, (await EnterpriseTests.Invite(org, adminC, mgr.Email, "Manager")).Token)).EnsureSuccessStatusCode();
        var (m, mc) = await f.User();
        (await EnterpriseTests.Accept(mc, (await EnterpriseTests.Invite(org, mgrC, m.Email, null, "Sales")).Token)).EnsureSuccessStatusCode();
        // No premium assignments yet: a Manager may move departments.
        Assert.Equal(HttpStatusCode.OK, (await mgrC.PatchAsJsonAsync($"api/orgs/{org.Id}/members/{m.Id}", new UpdateMemberInput(null, "Support"))).StatusCode);
        (await adminC.PostAsJsonAsync($"api/orgs/{org.Id}/assignments", new AssignmentInput(course.Course.Id, null, "Sales", null, true))).EnsureSuccessStatusCode();
        // Moving into the premium department would grant premium: Admin only.
        var denied = await mgrC.PatchAsJsonAsync($"api/orgs/{org.Id}/members/{m.Id}", new UpdateMemberInput(null, "Sales"));
        Assert.Equal(HttpStatusCode.Forbidden, denied.StatusCode);
        Assert.Equal("premium_scope_requires_admin", await Problem(denied));
        Assert.Equal("Support", await f.Db(d => d.OrganizationMembers.Where(x => x.OrganizationId == org.Id && x.UserId == m.Id).Select(x => x.Department).SingleAsync()));
        // Department changes that keep coverage identical stay allowed for Managers.
        Assert.Equal(HttpStatusCode.OK, (await mgrC.PatchAsJsonAsync($"api/orgs/{org.Id}/members/{m.Id}", new UpdateMemberInput(null, "Marketing"))).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await adminC.PatchAsJsonAsync($"api/orgs/{org.Id}/members/{m.Id}", new UpdateMemberInput(null, "Sales"))).StatusCode);
        Assert.True(await f.Db(d => d.Entitlements.AnyAsync(e => e.UserId == m.Id && e.CourseId == course.Course.Id && e.RevokedAt == null)));
        // And moving out (revoking premium) is Admin-only as well.
        Assert.Equal(HttpStatusCode.Forbidden, (await mgrC.PatchAsJsonAsync($"api/orgs/{org.Id}/members/{m.Id}", new UpdateMemberInput(null, "Ops"))).StatusCode);
    }
}
