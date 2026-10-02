using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Account;
using Mastemy.Api.Modules.Identity;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.Account;

public class ProfileTests(AccountFixture f) : IClassFixture<AccountFixture>
{
    [Fact]
    public async Task Profile_requires_authentication_and_updates_with_validation()
    {
        Assert.Equal(HttpStatusCode.Unauthorized, (await f.Anon().GetAsync("/api/me/profile")).StatusCode);
        var c = await f.As(await f.CreateUser());
        var p = (await c.GetFromJsonAsync<ProfileDto>("/api/me/profile", AccountFixture.Json))!;
        Assert.Equal("AL", p.Initials);
        Assert.Equal("UTC", p.TimeZone);

        var ok = await c.PutAsJsonAsync("/api/me/profile", new
        {
            displayName = "Grace Hopper", headline = "Compiler pioneer", bio = "Hello", preferredLanguage = "ar", timeZone = "Asia/Dubai",
            links = new[] { new { label = "Site", url = "https://example.com/me" } },
        });
        Assert.Equal(HttpStatusCode.OK, ok.StatusCode);
        p = (await ok.Content.ReadFromJsonAsync<ProfileDto>(AccountFixture.Json))!;
        Assert.Equal(("Grace Hopper", "GH", "ar", "Asia/Dubai"), (p.DisplayName, p.Initials, p.PreferredLanguage, p.TimeZone));
        Assert.Single(p.Links);

        foreach (var tz in new[] { "Mars/Olympus", "Eastern Standard Time", "" })
        {
            var r = await c.PutAsJsonAsync("/api/me/profile", new { timeZone = tz });
            Assert.Equal(HttpStatusCode.BadRequest, r.StatusCode);
            Assert.Contains("invalid_timezone", await r.Content.ReadAsStringAsync());
        }
        foreach (var url in new[] { "http://example.com", "javascript:alert(1)", "https://user:pw@example.com", "/relative" })
            Assert.Equal(HttpStatusCode.BadRequest, (await c.PutAsJsonAsync("/api/me/profile", new { links = new[] { new { label = "x", url } } })).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await c.PutAsJsonAsync("/api/me/profile", new
            { links = Enumerable.Range(0, 6).Select(i => new { label = "l" + i, url = "https://example.com/" + i }).ToArray() })).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await c.PutAsJsonAsync("/api/me/profile", new { preferredLanguage = "xx" })).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await c.PutAsJsonAsync("/api/me/profile", new { bio = new string('b', 5001) })).StatusCode);
        // Nothing invalid was persisted.
        p = (await c.GetFromJsonAsync<ProfileDto>("/api/me/profile", AccountFixture.Json))!;
        Assert.Equal("Asia/Dubai", p.TimeZone);
        Assert.Equal("https://example.com/me", p.Links.Single().Url);
    }

    [Fact]
    public async Task Public_instructor_profile_only_for_instructors_who_publish_it()
    {
        var student = await f.CreateUser();
        var sc = await f.As(student);
        Assert.Equal(HttpStatusCode.Forbidden, (await sc.PutAsJsonAsync("/api/me/profile", new { publicInstructorProfile = true })).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await f.Anon().GetAsync($"/api/instructors/{student.Id}/profile")).StatusCode);

        var inst = await f.CreateUser(Roles.Instructor);
        var ic = await f.As(inst);
        await ic.PutAsJsonAsync("/api/me/profile", new { headline = "Data scientist", links = new[] { new { label = "Blog", url = "https://blog.example.com" } } });
        Assert.Equal(HttpStatusCode.NotFound, (await f.Anon().GetAsync($"/api/instructors/{inst.Id}/profile")).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await ic.PutAsJsonAsync("/api/me/profile", new { publicInstructorProfile = true })).StatusCode);
        var pub = await f.Anon().GetFromJsonAsync<PublicInstructorProfileDto>($"/api/instructors/{inst.Id}/profile", AccountFixture.Json);
        Assert.Equal("Data scientist", pub!.Headline);
        var raw = await f.Anon().GetStringAsync($"/api/instructors/{inst.Id}/profile");
        Assert.DoesNotContain(inst.Email, raw); // no private data
    }

    [Fact]
    public async Task Learning_goals_onboarding_roundtrip_and_validation()
    {
        var c = await f.As(await f.CreateUser());
        var empty = await c.GetFromJsonAsync<LearningGoalsDto>("/api/me/learning-goals", AccountFixture.Json);
        Assert.Empty(empty!.SkillsOfInterest);
        var ok = await c.PutAsJsonAsync("/api/me/learning-goals", new { goals = "Pass PMP", skillsOfInterest = new[] { "Scheduling", "scheduling", "Risk" }, learningLanguage = "ar" });
        Assert.Equal(HttpStatusCode.OK, ok.StatusCode);
        var g = await c.GetFromJsonAsync<LearningGoalsDto>("/api/me/learning-goals", AccountFixture.Json);
        Assert.Equal(["Scheduling", "Risk"], g!.SkillsOfInterest);
        Assert.Equal("ar", g.LearningLanguage);
        Assert.Equal(HttpStatusCode.BadRequest, (await c.PutAsJsonAsync("/api/me/learning-goals", new { learningLanguage = "not a language" })).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await c.PutAsJsonAsync("/api/me/learning-goals",
            new { skillsOfInterest = Enumerable.Range(0, 21).Select(i => "s" + i).ToArray() })).StatusCode);
    }
}

public class SkillProfileTests(AccountFixture f) : IClassFixture<AccountFixture>
{
    [Fact]
    public async Task Skill_profile_labels_every_evidence_type_and_never_claims_verification()
    {
        var u = await f.CreateUser();
        await f.SeedLearningAndCommerce(u, "PMP-RISK");
        var c = await f.As(u);
        Assert.Equal(HttpStatusCode.OK, (await c.PostAsJsonAsync("/api/me/skills", new { name = "Python", evidenceType = "self_declared" })).StatusCode);
        var ext = await c.PostAsJsonAsync("/api/me/skills", new { name = "AWS Solutions Architect", evidenceType = "external_credential",
            issuer = "Amazon Web Services", credentialUrl = "https://aws.example.com/cred/1", obtainedAt = "2025-01-10" });
        Assert.Equal(HttpStatusCode.OK, ext.StatusCode);
        // Users cannot self-assert MCQ evidence or bad credential links.
        Assert.Equal(HttpStatusCode.BadRequest, (await c.PostAsJsonAsync("/api/me/skills", new { name = "X", evidenceType = "mcq_assessed" })).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await c.PostAsJsonAsync("/api/me/skills", new { name = "X", evidenceType = "external_credential", issuer = "I", credentialUrl = "http://x.example.com" })).StatusCode);
        Assert.Equal(HttpStatusCode.Conflict, (await c.PostAsJsonAsync("/api/me/skills", new { name = "Python", evidenceType = "self_declared" })).StatusCode);

        var profile = (await c.GetFromJsonAsync<SkillProfileDto>("/api/me/skills", AccountFixture.Json))!;
        Assert.All(profile.Items, i => Assert.False(i.Verified));
        Assert.Contains("does not verify", profile.Notice);
        var mcq = profile.Items.Single(i => i.EvidenceType == SkillEvidence.McqAssessed);
        Assert.Equal("PMP-RISK", mcq.Name);
        Assert.Equal(1, mcq.AssessmentsPassed);
        Assert.Contains("does not verify practical professional competence", mcq.Label);
        var e = profile.Items.Single(i => i.EvidenceType == SkillEvidence.ExternalCredential);
        Assert.Contains("not verified", e.Label);
        Assert.Equal("Amazon Web Services", e.Issuer);
        Assert.Contains(profile.Items, i => i.EvidenceType == SkillEvidence.SelfDeclared && i.Name == "Python");

        // Another user's skills are not visible or deletable.
        var other = await f.As(await f.CreateUser());
        var otherProfile = (await other.GetFromJsonAsync<SkillProfileDto>("/api/me/skills", AccountFixture.Json))!;
        Assert.Empty(otherProfile.Items);
        Assert.Equal(HttpStatusCode.NotFound, (await other.DeleteAsync($"/api/me/skills/{e.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.NoContent, (await c.DeleteAsync($"/api/me/skills/{e.Id}")).StatusCode);
    }
}

public class DataRightsTests(AccountFixture f) : IClassFixture<AccountFixture>
{
    [Fact]
    public async Task Export_contains_only_own_data()
    {
        var u = await f.CreateUser();
        var seeded = await f.SeedLearningAndCommerce(u, "SKILL-A");
        var other = await f.CreateUser();
        await f.SeedLearningAndCommerce(other, "SKILL-B");
        var c = await f.As(u);
        var res = await c.GetAsync("/api/me/export");
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        Assert.Contains("attachment", res.Content.Headers.ContentDisposition?.ToString() ?? res.Headers.ToString());
        var json = await res.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;
        Assert.Equal(u.Email, root.GetProperty("account").GetProperty("email").GetString());
        Assert.Contains(seeded.Note.Body, json);
        Assert.Equal(1, root.GetProperty("orders").GetArrayLength());
        Assert.Equal(1, root.GetProperty("assessmentAttempts").GetArrayLength());
        Assert.Equal(1, root.GetProperty("certificates").GetArrayLength());
        Assert.Equal(1, root.GetProperty("enrollments").GetArrayLength());
        Assert.DoesNotContain(other.Email, json);
        Assert.DoesNotContain("SKILL-B", json);
        Assert.DoesNotContain("PasswordHash", json, StringComparison.OrdinalIgnoreCase);
        Assert.Equal(HttpStatusCode.Unauthorized, (await f.Anon().GetAsync("/api/me/export")).StatusCode);
    }

    [Fact]
    public async Task Delete_anonymizes_user_and_retains_financial_records()
    {
        var u = await f.CreateUser(Roles.Instructor);
        var seeded = await f.SeedLearningAndCommerce(u, "SKILL-D");
        var c = await f.As(u);
        await c.PutAsJsonAsync("/api/me/profile", new { headline = "Secret headline", publicInstructorProfile = true });
        await using (var seedDb = f.NewDb())
        {
            seedDb.Set<Mastemy.Api.Modules.StudyTools.CalendarFeedToken>().Add(new Mastemy.Api.Modules.StudyTools.CalendarFeedToken { UserId = u.Id, TokenHash = new string('a', 64) });
            await seedDb.SaveChangesAsync();
        }

        Assert.Equal(HttpStatusCode.BadRequest, (await c.SendAsync(DeleteReq(new { password = AccountFixture.Password }))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await c.SendAsync(DeleteReq(new { password = "WrongPass123", confirm = "DELETE" }))).StatusCode);
        Assert.Equal(HttpStatusCode.NoContent, (await c.SendAsync(DeleteReq(new { password = AccountFixture.Password, confirm = "DELETE" }))).StatusCode);

        await using var db = f.NewDb();
        var user = await db.Users.Include(x => x.Roles).SingleAsync(x => x.Id == u.Id);
        Assert.Equal($"deleted+{u.Id:N}@invalid", user.Email);
        Assert.Equal("Deleted user", user.DisplayName);
        Assert.True(user.IsSuspended);
        Assert.Equal([Roles.Student], user.Roles.Select(r => r.Role).ToArray());
        Assert.False(await db.LearnerNotes.AnyAsync(n => n.UserId == u.Id));
        Assert.True(await db.Orders.AnyAsync(o => o.Id == seeded.Order.Id && o.UserId == u.Id));
        Assert.True(await db.Payments.AnyAsync(p => p.OrderId == seeded.Order.Id));
        Assert.True(await db.CommissionLedger.AnyAsync(l => l.OrderId == seeded.Order.Id));
        var cert = await db.Certificates.SingleAsync(x => x.Id == seeded.Certificate.Id);
        Assert.False(cert.PubliclyVisible);
        Assert.False(await db.RefreshTokens.AnyAsync(t => t.UserId == u.Id && t.RevokedAt == null));
        Assert.False(await db.Set<Mastemy.Api.Modules.StudyTools.CalendarFeedToken>().AnyAsync(t => t.UserId == u.Id)); // calendar feed URL revoked
        Assert.True(await db.AuditLogs.AnyAsync(a => a.Action == "user.deleted" && a.EntityId == u.Id.ToString()));
        var profile = await db.Set<AccountProfile>().SingleAsync(p => p.UserId == u.Id);
        Assert.Equal("", profile.Headline);
        Assert.NotNull(profile.DeletedAt);

        // The old credentials no longer work and the public profile is gone.
        Assert.Equal(HttpStatusCode.Unauthorized, (await f.Anon().PostAsJsonAsync("/api/auth/login", new { email = u.Email, password = AccountFixture.Password })).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await f.Anon().GetAsync($"/api/instructors/{u.Id}/profile")).StatusCode);
    }

    [Fact]
    public async Task Delete_requires_mfa_code_when_enrolled()
    {
        var u = await f.CreateUser();
        var c = await f.As(u);
        var enroll = (await (await c.PostAsync("/api/auth/mfa/enroll", null)).Content.ReadFromJsonAsync<MfaEnrollmentDto>(AccountFixture.Json))!;
        var done = (await (await c.PostAsJsonAsync("/api/auth/mfa/enroll/confirm", new { code = AccountFixture.Code(enroll.Secret) }))
            .Content.ReadFromJsonAsync<MfaEnrolledDto>(AccountFixture.Json))!;
        c.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", done.Session.AccessToken);

        var noCode = await c.SendAsync(DeleteReq(new { password = AccountFixture.Password, confirm = "DELETE" }));
        Assert.Equal(HttpStatusCode.BadRequest, noCode.StatusCode);
        Assert.Contains("invalid_mfa_code", await noCode.Content.ReadAsStringAsync());
        // The code used for enrollment cannot be replayed.
        Assert.Equal(HttpStatusCode.BadRequest, (await c.SendAsync(DeleteReq(new { password = AccountFixture.Password, confirm = "DELETE", mfaCode = AccountFixture.Code(enroll.Secret, -1) == AccountFixture.Code(enroll.Secret) ? "000000" : AccountFixture.Code(enroll.Secret, -1) }))).StatusCode);
        Assert.Equal(HttpStatusCode.NoContent, (await c.SendAsync(DeleteReq(new { password = AccountFixture.Password, confirm = "DELETE", mfaCode = AccountFixture.Code(enroll.Secret, 1) }))).StatusCode);
        await using var db = f.NewDb();
        Assert.False(await db.Set<UserSecurity>().AnyAsync(s => s.UserId == u.Id));
    }

    [Fact]
    public async Task Last_superadmin_cannot_delete_account()
    {
        await using (var db = f.NewDb())
            Assert.False(await db.UserRoles.AnyAsync(r => r.Role == Roles.SuperAdmin)); // fresh database per class
        var sa = await f.CreateUser(Roles.SuperAdmin);
        var c = await f.As(sa);
        var r = await c.SendAsync(DeleteReq(new { password = AccountFixture.Password, confirm = "DELETE" }));
        Assert.True(r.StatusCode == HttpStatusCode.Conflict, await r.Content.ReadAsStringAsync());
    }

    private static HttpRequestMessage DeleteReq(object body) =>
        new(HttpMethod.Delete, "/api/me") { Content = JsonContent.Create(body) };
}
