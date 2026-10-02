using System.Net;
using System.Net.Http.Json;
using System.Text;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Enterprise;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.Enterprise;

public class EnterpriseTests(EnterpriseFixture f) : IClassFixture<EnterpriseFixture>
{
    private async Task<(OrgDto Org, User Admin, HttpClient AdminClient, HttpClient Staff)> NewOrg(int seats = 10)
    {
        var (_, staff) = await f.User(Roles.Admin);
        var tag = Guid.NewGuid().ToString("N")[..12];
        var res = await staff.PostAsJsonAsync("api/admin/orgs", new OrgInput("Org " + tag, "org-" + tag, seats));
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        var org = (await res.Content.ReadFromJsonAsync<OrgDto>())!;
        var (admin, adminClient) = await f.User();
        await Join(org, staff, admin, adminClient, "Ops", "Admin");
        return (org, admin, adminClient, staff);
    }

    internal static async Task<InvitationCreatedDto> Invite(OrgDto org, HttpClient by, string email, string? role = null, string? dept = null)
    {
        var res = await by.PostAsJsonAsync($"api/orgs/{org.Id}/members", new AddMemberInput(email, role, dept));
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        return (await res.Content.ReadFromJsonAsync<InvitationCreatedDto>())!;
    }

    internal static Task<HttpResponseMessage> Accept(HttpClient as_, string token) =>
        as_.PostAsJsonAsync("api/org-invitations/accept", new AcceptInvitationInput(token));

    private static async Task Join(OrgDto org, HttpClient by, User u, HttpClient uc, string dept = "", string role = "Member")
    {
        var inv = await Invite(org, by, u.Email, role, dept);
        (await Accept(uc, inv.Token)).EnsureSuccessStatusCode();
    }

    private async Task<(User U, HttpClient C)> Member(OrgDto org, HttpClient by, string dept = "", string role = "Member")
    {
        var (u, c) = await f.User();
        await Join(org, by, u, c, dept, role);
        return (u, c);
    }

    private Task<List<Entitlement>> ActiveEnts(Guid userId, Guid courseId) =>
        f.Db(d => d.Entitlements.Where(e => e.UserId == userId && e.CourseId == courseId && e.RevokedAt == null).ToListAsync());

    [Fact]
    public async Task Staff_only_create_validates_and_audits()
    {
        var (_, plain) = await f.User();
        Assert.Equal(HttpStatusCode.Forbidden, (await plain.PostAsJsonAsync("api/admin/orgs", new OrgInput("Acme", "acme-x", 5))).StatusCode);
        var (_, staff) = await f.User(Roles.Admin);
        Assert.Equal(HttpStatusCode.BadRequest, (await staff.PostAsJsonAsync("api/admin/orgs", new OrgInput("Acme", "Bad Slug!", 5))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await staff.PostAsJsonAsync("api/admin/orgs", new OrgInput("Acme", "acme-y", 0))).StatusCode);
        var (org, _, _, _) = await NewOrg();
        Assert.Equal(HttpStatusCode.Conflict, (await staff.PostAsJsonAsync("api/admin/orgs", new OrgInput("Dup", org.Slug, 5))).StatusCode);
        Assert.True(await f.Db(d => d.AuditLogs.AnyAsync(a => a.Action == "org.created" && a.EntityId == org.Id.ToString())));
        // Seat limit cannot drop below usage (1 admin).
        var upd = await staff.PutAsJsonAsync($"api/admin/orgs/{org.Id}", new OrgUpdateInput("Renamed", null, 1));
        Assert.Equal(HttpStatusCode.OK, upd.StatusCode);
        Assert.Equal("Renamed", (await upd.Content.ReadFromJsonAsync<OrgDto>())!.Name);
    }

    [Fact]
    public async Task Org_isolation_manager_of_A_gets_404_for_B()
    {
        var (a, _, adminA, _) = await NewOrg();
        var (b, _, adminB, _) = await NewOrg();
        var (_, managerA) = await Member(a, adminA, role: "Manager");
        var (_, memberB) = await Member(b, adminB);
        foreach (var c in new[] { adminA, managerA, memberB })
        {
            Assert.Equal(HttpStatusCode.NotFound, (await c.GetAsync($"api/orgs/{(c == memberB ? b.Id : b.Id)}/members")).StatusCode);
            Assert.Equal(HttpStatusCode.NotFound, (await c.GetAsync($"api/orgs/{b.Id}/reports/progress")).StatusCode);
        }
        Assert.Equal(HttpStatusCode.OK, (await managerA.GetAsync($"api/orgs/{a.Id}/reports/progress")).StatusCode);
        var (u, _) = await f.User();
        Assert.Equal(HttpStatusCode.NotFound, (await adminA.PostAsJsonAsync($"api/orgs/{b.Id}/members", new AddMemberInput(u.Email, null, null))).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await adminA.GetAsync($"api/orgs/{Guid.NewGuid()}")).StatusCode);
    }

    [Fact]
    public async Task Seat_limit_holds_under_parallel_adds()
    {
        var (org, _, admin, _) = await NewOrg(seats: 4); // admin uses 1 seat -> 3 free
        var users = new List<(User U, HttpClient C, string Token)>();
        for (var i = 0; i < 12; i++)
        {
            var (u, c) = await f.User();
            users.Add((u, c, (await Invite(org, admin, u.Email)).Token)); // invitations do not consume seats
        }
        var results = await Task.WhenAll(users.Select(x => Accept(x.C, x.Token)));
        Assert.Equal(3, results.Count(r => r.StatusCode == HttpStatusCode.OK));
        Assert.All(results.Where(r => r.StatusCode != HttpStatusCode.OK), r => Assert.Equal(HttpStatusCode.Conflict, r.StatusCode));
        Assert.Equal(4, await f.Db(d => d.OrganizationMembers.CountAsync(m => m.OrganizationId == org.Id)));
    }

    [Fact]
    public async Task Role_rules_and_last_admin_protection()
    {
        var (org, admin, adminC, staff) = await NewOrg();
        var (mgr, mgrC) = await Member(org, adminC, role: "Manager");
        var (_, _) = await Member(org, adminC);
        var (u, _) = await f.User();
        // Manager cannot grant Manager/Admin, but can add a Member.
        Assert.Equal(HttpStatusCode.Forbidden, (await mgrC.PostAsJsonAsync($"api/orgs/{org.Id}/members", new AddMemberInput(u.Email, "Admin", null))).StatusCode);
        var (m2, _) = await Member(org, mgrC, "Sales");
        Assert.Equal(HttpStatusCode.Forbidden, (await mgrC.PatchAsJsonAsync($"api/orgs/{org.Id}/members/{m2.Id}", new UpdateMemberInput("Manager", null))).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await mgrC.DeleteAsync($"api/orgs/{org.Id}/members/{admin.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await mgrC.PatchAsJsonAsync($"api/orgs/{org.Id}/members/{m2.Id}", new UpdateMemberInput(null, "Eng"))).StatusCode);
        // Last admin: cannot remove or demote, even as staff.
        Assert.Equal(HttpStatusCode.Conflict, (await adminC.DeleteAsync($"api/orgs/{org.Id}/members/{admin.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.Conflict, (await staff.PatchAsJsonAsync($"api/orgs/{org.Id}/members/{admin.Id}", new UpdateMemberInput("Member", null))).StatusCode);
        // Promote manager to admin, then the original admin can be demoted.
        Assert.Equal(HttpStatusCode.OK, (await adminC.PatchAsJsonAsync($"api/orgs/{org.Id}/members/{mgr.Id}", new UpdateMemberInput("Admin", null))).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await adminC.PatchAsJsonAsync($"api/orgs/{org.Id}/members/{admin.Id}", new UpdateMemberInput("Member", null))).StatusCode);
        // Former admin is now a plain member -> 404 on management.
        Assert.Equal(HttpStatusCode.NotFound, (await adminC.GetAsync($"api/orgs/{org.Id}/members")).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await mgrC.PatchAsJsonAsync($"api/orgs/{org.Id}/members/{m2.Id}", new UpdateMemberInput("Owner", null))).StatusCode);
    }

    [Fact]
    public async Task Premium_grant_and_revoke_lifecycle_never_touches_purchases()
    {
        var (org, _, admin, staff) = await NewOrg();
        var course = await f.Course();
        var (sales, _) = await Member(org, admin, "Sales");
        var (eng, _) = await Member(org, admin, "Eng");
        // eng also bought the course.
        await f.Db(async d => { d.Entitlements.Add(new Entitlement { UserId = eng.Id, CourseId = course.Course.Id, Source = EntitlementSource.Purchase }); await d.SaveChangesAsync(); });

        var r1 = await admin.PostAsJsonAsync($"api/orgs/{org.Id}/assignments", new AssignmentInput(course.Course.Id, null, null, DateTime.UtcNow.AddDays(7), true));
        Assert.Equal(HttpStatusCode.OK, r1.StatusCode);
        var orgWide = (await r1.Content.ReadFromJsonAsync<AssignmentDto>())!;
        var r2 = await admin.PostAsJsonAsync($"api/orgs/{org.Id}/assignments", new AssignmentInput(course.Course.Id, null, "Sales", null, true));
        var salesOnly = (await r2.Content.ReadFromJsonAsync<AssignmentDto>())!;
        var e = Assert.Single(await ActiveEnts(sales.Id, course.Course.Id));
        Assert.Equal(EntitlementSource.Organization, e.Source);
        Assert.Equal(org.Id, e.OrganizationId);
        Assert.Equal(2, (await ActiveEnts(eng.Id, course.Course.Id)).Count); // purchase + org

        // Joining later grants.
        var (late, _) = await Member(org, admin, "Ops");
        Assert.Single(await ActiveEnts(late.Id, course.Course.Id));

        // Removing the org-wide assignment: Sales still justified by the department assignment; Eng keeps only purchase.
        Assert.Equal(HttpStatusCode.NoContent, (await admin.DeleteAsync($"api/orgs/{org.Id}/assignments/{orgWide.Id}")).StatusCode);
        Assert.Single(await ActiveEnts(sales.Id, course.Course.Id));
        Assert.Equal(EntitlementSource.Purchase, Assert.Single(await ActiveEnts(eng.Id, course.Course.Id)).Source);
        Assert.Empty(await ActiveEnts(late.Id, course.Course.Id));

        // Department change revokes.
        await admin.PatchAsJsonAsync($"api/orgs/{org.Id}/members/{sales.Id}", new UpdateMemberInput(null, "Eng"));
        Assert.Empty(await ActiveEnts(sales.Id, course.Course.Id));
        await admin.PatchAsJsonAsync($"api/orgs/{org.Id}/members/{sales.Id}", new UpdateMemberInput(null, "sales"));
        Assert.Single(await ActiveEnts(sales.Id, course.Course.Id));

        // Leaving revokes.
        Assert.Equal(HttpStatusCode.NoContent, (await admin.DeleteAsync($"api/orgs/{org.Id}/members/{sales.Id}")).StatusCode);
        Assert.Empty(await ActiveEnts(sales.Id, course.Course.Id));

        // Deactivation revokes all; purchase still intact.
        await Member(org, admin, "Sales");
        (await staff.PostAsync($"api/admin/orgs/{org.Id}/deactivate", null)).EnsureSuccessStatusCode();
        Assert.Equal(0, await f.Db(d => d.Entitlements.CountAsync(x => x.OrganizationId == org.Id && x.RevokedAt == null)));
        Assert.Equal(EntitlementSource.Purchase, Assert.Single(await ActiveEnts(eng.Id, course.Course.Id)).Source);
        Assert.Equal(HttpStatusCode.NotFound, (await admin.GetAsync($"api/orgs/{org.Id}/members")).StatusCode);
        Assert.True(await f.Db(d => d.AuditLogs.AnyAsync(a => a.Action == "org.deactivated" && a.EntityId == org.Id.ToString())));
        _ = salesOnly;
    }

    [Fact]
    public async Task Other_orgs_entitlements_untouched()
    {
        var (a, _, adminA, staff) = await NewOrg();
        var (b, _, adminB, _) = await NewOrg();
        var course = await f.Course();
        var (u, uc) = await Member(a, adminA);
        await Join(b, adminB, u, uc);
        await adminA.PostAsJsonAsync($"api/orgs/{a.Id}/assignments", new AssignmentInput(course.Course.Id, null, null, null, true));
        await adminB.PostAsJsonAsync($"api/orgs/{b.Id}/assignments", new AssignmentInput(course.Course.Id, null, null, null, true));
        Assert.Equal(2, (await ActiveEnts(u.Id, course.Course.Id)).Count);
        await staff.PostAsync($"api/admin/orgs/{a.Id}/deactivate", null);
        Assert.Equal(b.Id, Assert.Single(await ActiveEnts(u.Id, course.Course.Id)).OrganizationId);
    }

    [Fact]
    public async Task Assignment_validation_and_member_view()
    {
        var (org, _, admin, _) = await NewOrg();
        var draft = await f.Course(status: CourseStatus.Draft);
        Assert.Equal(HttpStatusCode.NotFound, (await admin.PostAsJsonAsync($"api/orgs/{org.Id}/assignments", new AssignmentInput(draft.Course.Id, null, null, null, false))).StatusCode);
        var course = await f.Course();
        Assert.Equal(HttpStatusCode.BadRequest, (await admin.PostAsJsonAsync($"api/orgs/{org.Id}/assignments", new AssignmentInput(course.Course.Id, null, null, DateTime.UtcNow.AddDays(-1), false))).StatusCode);
        var (mgr, mgrC) = await Member(org, admin, role: "Manager");
        Assert.Equal(HttpStatusCode.Forbidden, (await mgrC.PostAsJsonAsync($"api/orgs/{org.Id}/assignments", new AssignmentInput(course.Course.Id, null, null, null, true))).StatusCode);
        var (m, mc) = await Member(org, admin, "Eng");
        var due = DateTime.UtcNow.AddDays(3);
        Assert.Equal(HttpStatusCode.OK, (await mgrC.PostAsJsonAsync($"api/orgs/{org.Id}/assignments", new AssignmentInput(course.Course.Id, m.Id, null, due, false))).StatusCode);
        Assert.Equal(HttpStatusCode.Conflict, (await mgrC.PostAsJsonAsync($"api/orgs/{org.Id}/assignments", new AssignmentInput(course.Course.Id, m.Id, null, due, false))).StatusCode);
        var mine = (await mc.GetFromJsonAsync<List<MyOrgDto>>("api/me/organizations"))!;
        var o = Assert.Single(mine);
        var a = Assert.Single(o.Assignments);
        Assert.Equal(course.Course.Id, a.CourseId);
        Assert.NotNull(a.DueAt);
        Assert.False(a.Overdue);
        // Members cannot see management endpoints.
        Assert.Equal(HttpStatusCode.NotFound, (await mc.GetAsync($"api/orgs/{org.Id}/assignments")).StatusCode);
        _ = mgr;
    }

    [Fact]
    public async Task Bulk_csv_preview_is_uniform_and_commit_creates_invitations()
    {
        var (org, _, admin, _) = await NewOrg(seats: 4); // 3 free seats
        var (u1, u1c) = await f.User();
        var (u2, _) = await f.User();
        // nobody@nowhere.test has no account: it must validate exactly like an existing account's email.
        var bad = $"email\n{u1.Email}\nnobody@nowhere.test\n{u1.Email.ToUpperInvariant()}\nnot-an-email\n";
        var prev = (await (await admin.PostAsJsonAsync($"api/orgs/{org.Id}/members/bulk/preview", new BulkMembersInput(bad, "Sales"))).Content.ReadFromJsonAsync<BulkPreviewDto>())!;
        Assert.False(prev.CanCommit);
        Assert.Equal(4, prev.Total);
        Assert.Equal(2, prev.Valid);
        Assert.Null(prev.Rows.Single(r => r.Email == "nobody@nowhere.test").Error);
        Assert.Equal("Duplicate email in file.", prev.Rows.Single(r => r.Email == u1.Email.ToUpperInvariant()).Error);
        Assert.Equal(HttpStatusCode.BadRequest, (await admin.PostAsJsonAsync($"api/orgs/{org.Id}/members/bulk", new BulkMembersInput(bad, "Sales"))).StatusCode);
        Assert.Equal(0, await f.Db(d => d.OrganizationInvitations.CountAsync(i => i.OrganizationId == org.Id && i.Department == "Sales")));

        var (u3, _) = await f.User();
        var tooMany = $"{u1.Email}\n{u2.Email}\n{u3.Email}\nghost@nowhere.test\n";
        var over = (await (await admin.PostAsJsonAsync($"api/orgs/{org.Id}/members/bulk/preview", new BulkMembersInput(tooMany, null))).Content.ReadFromJsonAsync<BulkPreviewDto>())!;
        Assert.Equal(3, over.SeatsAvailable);
        Assert.Equal("Exceeds available seats.", over.Rows.Last().Error);
        Assert.False(over.CanCommit);
        var overCommit = await admin.PostAsJsonAsync($"api/orgs/{org.Id}/members/bulk", new BulkMembersInput(tooMany, null));
        Assert.Equal(HttpStatusCode.BadRequest, overCommit.StatusCode);

        var ok = $"{u1.Email}\n{u2.Email}\n";
        var res = await admin.PostAsJsonAsync($"api/orgs/{org.Id}/members/bulk", new BulkMembersInput(ok, "Sales"));
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        var result = (await res.Content.ReadFromJsonAsync<BulkInviteResultDto>())!;
        Assert.Equal(2, result.Invited);
        Assert.Equal(1, await f.Db(d => d.OrganizationMembers.CountAsync(m => m.OrganizationId == org.Id))); // nothing joined yet
        Assert.Equal(2, (await admin.GetFromJsonAsync<List<InvitationDto>>($"api/orgs/{org.Id}/invitations"))!.Count);
        (await Accept(u1c, result.Invitations.Single(i => i.Email == u1.Email).Token)).EnsureSuccessStatusCode();
        Assert.Equal(1, await f.Db(d => d.OrganizationMembers.CountAsync(m => m.OrganizationId == org.Id && m.Department == "Sales")));
    }

    [Fact]
    public async Task Progress_report_is_correct_and_csv_neutralized()
    {
        var (org, _, admin, _) = await NewOrg();
        var course = await f.Course(lessons: 4, title: "=HYPERLINK(\"http://evil\")");
        var (m, _) = await Member(org, admin, "Eng");
        var (lazy, _) = await Member(org, admin, "Eng");
        var (mgr, mgrC) = await Member(org, admin, role: "Manager");
        await admin.PostAsJsonAsync($"api/orgs/{org.Id}/assignments", new AssignmentInput(course.Course.Id, null, "Eng", DateTime.UtcNow.AddMinutes(1), false));
        await f.Db(async d =>
        {
            d.LessonProgress.Add(new LessonProgress { UserId = m.Id, LessonId = course.Lessons[0].Id, Completed = true });
            d.LessonProgress.Add(new LessonProgress { UserId = m.Id, LessonId = course.Lessons[1].Id, Completed = true });
            d.LessonProgress.Add(new LessonProgress { UserId = m.Id, LessonId = course.Lessons[2].Id, Completed = false });
            var a1 = new Attempt { AssessmentId = course.Final.Id, UserId = m.Id, Status = AttemptStatus.Submitted, ScorePercent = 60, Passed = false };
            var a2 = new Attempt { AssessmentId = course.Final.Id, UserId = m.Id, Status = AttemptStatus.Submitted, ScorePercent = 85, Passed = true };
            d.Attempts.AddRange(a1, a2);
            d.Certificates.Add(new Certificate { Code = "CERT-ABC", UserId = m.Id, CourseId = course.Course.Id, AttemptId = a2.Id, RecipientName = "x", CourseTitle = "x", Status = CertificateStatus.Valid, ScorePercent = 85 });
            d.LearnerNotes.Add(new LearnerNote { UserId = m.Id, LessonId = course.Lessons[0].Id, CourseId = course.Course.Id, Body = "TOP-SECRET-PRIVATE-NOTE" });
            // Make the assignment overdue.
            await d.SaveChangesAsync();
            var asg = await d.OrganizationAssignments.SingleAsync(x => x.OrganizationId == org.Id);
            asg.DueAt = DateTime.UtcNow.AddDays(-1);
            await d.SaveChangesAsync();
        });

        var res = await mgrC.GetAsync($"api/orgs/{org.Id}/reports/progress");
        var raw = await res.Content.ReadAsStringAsync();
        Assert.DoesNotContain("TOP-SECRET", raw);
        var rows = (await res.Content.ReadFromJsonAsync<List<ProgressRowDto>>())!;
        Assert.Equal(2, rows.Count); // only Eng members are covered
        var r = rows.Single(x => x.UserId == m.Id);
        Assert.Equal(2, r.CompletedLessons);
        Assert.Equal(4, r.TotalLessons);
        Assert.Equal(50m, r.ProgressPercent);
        Assert.Equal(85m, r.BestScorePercent);
        Assert.True(r.Passed);
        Assert.Equal("CERT-ABC", r.CertificateCode);
        Assert.False(r.Overdue);
        var l = rows.Single(x => x.UserId == lazy.Id);
        Assert.Equal(0m, l.ProgressPercent);
        Assert.Null(l.BestScorePercent);
        Assert.True(l.Overdue);

        var csvRes = await mgrC.GetAsync($"api/orgs/{org.Id}/reports/progress?format=csv");
        Assert.Equal("text/csv", csvRes.Content.Headers.ContentType!.MediaType);
        var csv = Encoding.UTF8.GetString(await csvRes.Content.ReadAsByteArrayAsync());
        Assert.Contains("\"'=HYPERLINK(\"\"http://evil\"\")\"", csv);
        Assert.DoesNotContain(",=HYPERLINK", csv);
        Assert.DoesNotContain("TOP-SECRET", csv);
        Assert.Equal("'@x", EnterpriseReportService.Neutralize("@x"));
        Assert.Equal("'-1", EnterpriseReportService.Neutralize("-1"));
        _ = mgr;
    }
}
