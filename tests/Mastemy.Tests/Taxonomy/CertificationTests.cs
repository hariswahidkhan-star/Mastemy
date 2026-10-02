using System.Net;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Taxonomy;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.Taxonomy;

public class CertificationTests(TaxonomyFixture f) : IClassFixture<TaxonomyFixture>
{
    private async Task<IssuerDto> Issuer(string name) =>
        await TaxonomyFixture.Read<IssuerDto>(await f.Client(f.Reviewer).PostJ("/api/admin/certification-issuers",
            new IssuerUpsertRequest(name, "https://issuer.example", "US")));

    private static CertificationUpsertRequest Req(Guid issuerId, string title, string url = "https://issuer.example/exam", int checkedDaysAgo = 10,
        bool nonMcq = false, string? disclosure = null) =>
        new(issuerId, title, null, "Global", "EX-" + title.Length, "Associate", "2026", null, null, "None", url,
            DateTime.UtcNow.AddDays(-checkedDaysAgo), "Checked the official page", "Every 3 years", "No partner status claimed",
            CertificationKind.ProfessionalCertification, nonMcq, disclosure, null);

    private async Task<CertificationAdminDto> Create(CertificationUpsertRequest req, User? as_ = null) =>
        await TaxonomyFixture.Read<CertificationAdminDto>(await f.Client(as_ ?? f.Reviewer).PostJ("/api/admin/certifications", req));

    private Task<HttpResponseMessage> SetState(Guid id, CertificationState s, User who) =>
        f.Client(who).PostJ($"/api/admin/certifications/{id}/state", new CertificationStateRequest(s, null));

    private async Task<List<PublicCertificationSummaryDto>> PublicList() =>
        await TaxonomyFixture.Read<List<PublicCertificationSummaryDto>>(await f.Client().GetAsync("/api/certifications"));

    [Fact]
    public async Task Admin_endpoints_require_reviewer_or_staff()
    {
        Assert.Equal(HttpStatusCode.Unauthorized, (await f.Client().GetAsync("/api/admin/certifications")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.InstructorA).GetAsync("/api/admin/certifications")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.Student).PostJ("/api/admin/certification-issuers",
            new IssuerUpsertRequest("X", null, null))).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.Reviewer).PostAsync("/api/admin/certifications/flag-stale", null)).StatusCode);
    }

    [Fact]
    public async Task Verification_requires_https_source_fresh_check_and_independent_reviewer()
    {
        var iss = await Issuer("Issuer Verify");
        // http source rejected at write time
        var bad = await f.Client(f.Reviewer).PostJ("/api/admin/certifications", Req(iss.Id, "Http Cert", url: "http://issuer.example/x"));
        Assert.Equal(HttpStatusCode.BadRequest, bad.StatusCode);

        var c = await Create(Req(iss.Id, "Cloud Associate"));
        Assert.Equal(CertificationState.ResearchCandidate, c.State);
        // editor cannot verify own edit
        var self = await SetState(c.Id, CertificationState.Verified, f.Reviewer);
        Assert.Equal(HttpStatusCode.Conflict, self.StatusCode);
        Assert.Contains("different person", await self.Content.ReadAsStringAsync());
        Assert.DoesNotContain(await PublicList(), x => x.Id == c.Id);

        var ok = await TaxonomyFixture.Read<CertificationAdminDto>(await SetState(c.Id, CertificationState.Verified, f.Reviewer2));
        Assert.Equal(f.Reviewer2.Id, ok.ReviewerId);
        Assert.True(ok.PubliclyVisible);
        var pub = Assert.Single(await PublicList(), x => x.Id == c.Id);
        Assert.Equal("Issuer Verify", pub.IssuerName);
        var detail = await TaxonomyFixture.Read<PublicCertificationDto>(await f.Client().GetAsync($"/api/certifications/{c.Slug}"));
        Assert.Equal(c.Title, detail.Title);

        // any edit clears verification and hides it until re-verified by someone other than the editor
        var edited = await TaxonomyFixture.Read<CertificationAdminDto>(await f.Client(f.Reviewer2).PutJ($"/api/admin/certifications/{c.Id}", Req(iss.Id, "Cloud Associate")));
        Assert.Null(edited.ReviewerId);
        Assert.False(edited.PubliclyVisible);
        Assert.DoesNotContain(await PublicList(), x => x.Id == c.Id);
        Assert.Equal(HttpStatusCode.NotFound, (await f.Client().GetAsync($"/api/certifications/{c.Slug}")).StatusCode);
        Assert.Equal(HttpStatusCode.Conflict, (await SetState(c.Id, CertificationState.Verified, f.Reviewer2)).StatusCode);
        Assert.True((await SetState(c.Id, CertificationState.Verified, f.Reviewer)).IsSuccessStatusCode);
        Assert.Contains(await PublicList(), x => x.Id == c.Id);

        await f.WithDb(async db => Assert.True(await db.AuditLogs.AnyAsync(a => a.EntityId == c.Id.ToString() && a.Action == "certification.state_changed")));
    }

    [Fact]
    public async Task Stale_check_date_blocks_verification_and_hides_and_flags()
    {
        var iss = await Issuer("Issuer Stale");
        var old = await Create(Req(iss.Id, "Old Check", checkedDaysAgo: 200));
        Assert.Equal(HttpStatusCode.Conflict, (await SetState(old.Id, CertificationState.Verified, f.Reviewer2)).StatusCode);

        var c = await Create(Req(iss.Id, "Ages Out"));
        Assert.True((await SetState(c.Id, CertificationState.InformationOnly, f.Reviewer2)).IsSuccessStatusCode);
        Assert.Contains(await PublicList(), x => x.Id == c.Id);
        // Time passes: last check is now 181 days old.
        await f.WithDb(async db =>
        {
            var e = await db.Set<Certification>().FirstAsync(x => x.Id == c.Id);
            e.LastCheckedAt = DateTime.UtcNow.AddDays(-181);
            await db.SaveChangesAsync();
        });
        Assert.DoesNotContain(await PublicList(), x => x.Id == c.Id); // hidden immediately, job or not
        var flagged = await f.WithService<CertificationService, int>(s => s.FlagStale(DateTime.UtcNow));
        Assert.True(flagged >= 1);
        var queue = await TaxonomyFixture.Read<List<CertificationAdminDto>>(await f.Client(f.Reviewer).GetAsync("/api/admin/certifications?stale=true"));
        var q = Assert.Single(queue, x => x.Id == c.Id);
        Assert.True(q.IsStale);
        Assert.NotNull(q.StaleFlaggedAt);
    }

    [Fact]
    public async Task Non_public_states_and_retirement_rules()
    {
        var iss = await Issuer("Issuer States");
        var c = await Create(Req(iss.Id, "Needs Disclosure", nonMcq: true));
        // non-MCQ exam requires a disclosure before verification
        Assert.Equal(HttpStatusCode.Conflict, (await SetState(c.Id, CertificationState.Verified, f.Reviewer2)).StatusCode);

        var d = await Create(Req(iss.Id, "Prod Cert", nonMcq: true, disclosure: "Mastemy offers video instruction and MCQ preparation, not a replica of the lab exam."));
        // InProduction needs objectives
        Assert.Equal(HttpStatusCode.Conflict, (await SetState(d.Id, CertificationState.InProduction, f.Reviewer2)).StatusCode);
        await TaxonomyFixture.Read<CertificationAdminDto>(await f.Client(f.Reviewer2).PostJ($"/api/admin/certifications/{d.Id}/objectives",
            new ObjectiveUpsertRequest("D1", "Domain 1", 60, null)));
        // adding an objective is an edit by Reviewer2, so Reviewer2 cannot verify; Reviewer can
        Assert.Equal(HttpStatusCode.Conflict, (await SetState(d.Id, CertificationState.InProduction, f.Reviewer2)).StatusCode);
        var prod = await TaxonomyFixture.Read<CertificationAdminDto>(await SetState(d.Id, CertificationState.InProduction, f.Reviewer));
        Assert.False(prod.PubliclyVisible); // InProduction is not public
        // PublishedPreparation requires a live linked course
        Assert.Equal(HttpStatusCode.Conflict, (await SetState(d.Id, CertificationState.PublishedPreparation, f.Reviewer)).StatusCode);
        var course = await f.AddCourse("Prod Cert Prep", f.InstructorA.Id);
        Assert.Equal(HttpStatusCode.NoContent, (await f.Client(f.Reviewer).PutAsync($"/api/admin/certifications/{d.Id}/courses/{course.Id}", null)).StatusCode);
        var pp = await TaxonomyFixture.Read<CertificationAdminDto>(await SetState(d.Id, CertificationState.PublishedPreparation, f.Reviewer));
        Assert.True(pp.PubliclyVisible);
        var detail = await TaxonomyFixture.Read<PublicCertificationDto>(await f.Client().GetAsync($"/api/certifications/{d.Slug}"));
        Assert.NotNull(detail.NonMcqDisclosure);
        Assert.Single(detail.PreparationCourses);

        // objective weights cannot exceed 100%
        Assert.Equal(HttpStatusCode.BadRequest, (await f.Client(f.Reviewer).PostJ($"/api/admin/certifications/{d.Id}/objectives",
            new ObjectiveUpsertRequest("D2", "Domain 2", 50, null))).StatusCode);

        Assert.True((await SetState(d.Id, CertificationState.Retired, f.Reviewer)).IsSuccessStatusCode);
        Assert.DoesNotContain(await PublicList(), x => x.Id == d.Id);
        Assert.Equal(HttpStatusCode.Conflict, (await SetState(d.Id, CertificationState.Verified, f.Reviewer2)).StatusCode);
        Assert.True((await SetState(d.Id, CertificationState.ResearchCandidate, f.Reviewer2)).IsSuccessStatusCode);
    }

    [Fact]
    public async Task Coverage_report_counts_lessons_and_active_questions_and_flags_gaps()
    {
        var iss = await Issuer("Issuer Coverage");
        var c = await Create(Req(iss.Id, "Coverage Cert"));
        var withObj = await TaxonomyFixture.Read<CertificationAdminDto>(await f.Client(f.Reviewer).PostJ($"/api/admin/certifications/{c.Id}/objectives",
            new ObjectiveUpsertRequest("O1", "Objective one", 40, null)));
        withObj = await TaxonomyFixture.Read<CertificationAdminDto>(await f.Client(f.Reviewer).PostJ($"/api/admin/certifications/{c.Id}/objectives",
            new ObjectiveUpsertRequest("O2", "Objective two", 60, null)));
        var o1 = withObj.Objectives.First(o => o.Code == "O1");
        var o2 = withObj.Objectives.First(o => o.Code == "O2");

        var course = await f.AddCourse("Coverage Course", f.InstructorA.Id);
        var lessonId = Guid.NewGuid();
        var activeQ = Guid.NewGuid();
        var draftQ = Guid.NewGuid();
        await f.WithDb(async db =>
        {
            var m = new CourseModule { CourseId = course.Id, Code = "M1", Title = "M" };
            db.Modules.Add(m);
            db.Lessons.Add(new Lesson { Id = lessonId, ModuleId = m.Id, Code = "L1", Title = "L" });
            db.Questions.Add(new Question { Id = activeQ, CourseId = course.Id, ExternalId = "q1", State = QuestionState.Active, CreatedBy = f.InstructorA.Id });
            db.Questions.Add(new Question { Id = draftQ, CourseId = course.Id, ExternalId = "q2", State = QuestionState.Draft, CreatedBy = f.InstructorA.Id });
            await db.SaveChangesAsync();
        });

        var author = f.Client(f.InstructorA);
        // course must be linked first
        Assert.Equal(HttpStatusCode.Conflict, (await author.PutJ($"/api/studio/objectives/{o1.Id}/courses/{course.Id}/lessons", new MappingRequest([lessonId]))).StatusCode);
        Assert.Equal(HttpStatusCode.NoContent, (await f.Client(f.Reviewer).PutAsync($"/api/admin/certifications/{c.Id}/courses/{course.Id}", null)).StatusCode);
        // another instructor cannot map this course
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.InstructorB).PutJ($"/api/studio/objectives/{o1.Id}/courses/{course.Id}/lessons", new MappingRequest([lessonId]))).StatusCode);
        await TaxonomyFixture.Read<CoverageReportDto>(await author.PutJ($"/api/studio/objectives/{o1.Id}/courses/{course.Id}/lessons", new MappingRequest([lessonId])));
        await TaxonomyFixture.Read<CoverageReportDto>(await author.PutJ($"/api/studio/objectives/{o1.Id}/courses/{course.Id}/questions", new MappingRequest([activeQ])));
        await TaxonomyFixture.Read<CoverageReportDto>(await author.PutJ($"/api/studio/objectives/{o2.Id}/courses/{course.Id}/questions", new MappingRequest([draftQ])));
        // foreign question rejected
        Assert.Equal(HttpStatusCode.BadRequest, (await author.PutJ($"/api/studio/objectives/{o2.Id}/courses/{course.Id}/questions", new MappingRequest([Guid.NewGuid()]))).StatusCode);

        var rep = await TaxonomyFixture.Read<CoverageReportDto>(await author.GetAsync($"/api/studio/courses/{course.Id}/certifications/{c.Id}/coverage"));
        var r1 = rep.Objectives.First(o => o.Code == "O1");
        var r2 = rep.Objectives.First(o => o.Code == "O2");
        Assert.Equal((1, 1, false), (r1.LessonCount, r1.ActiveQuestionCount, r1.Gap));
        Assert.Equal((0, 0, true), (r2.LessonCount, r2.ActiveQuestionCount, r2.Gap)); // draft question does not count
        Assert.Contains("no_lessons", r2.Gaps);
        Assert.Equal(1, rep.GapCount);
        Assert.Equal(40m, rep.CoveredWeightPercent);
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.InstructorB).GetAsync($"/api/studio/courses/{course.Id}/certifications/{c.Id}/coverage")).StatusCode);
        var all = await TaxonomyFixture.Read<CoverageReportDto>(await f.Client(f.Reviewer).GetAsync($"/api/admin/certifications/{c.Id}/coverage"));
        Assert.Equal(1, all.GapCount);
    }
}
