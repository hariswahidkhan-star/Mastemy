using System.Net;
using System.Text.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Account;
using Mastemy.Api.Modules.Catalog;
using Mastemy.Api.Modules.Taxonomy;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.Taxonomy;

/// <summary>Objective mapping reads, linked courses, bestseller rows, instructor profile text and the Notes Library.</summary>
public class FinalWaveTaxonomyTests(TaxonomyFixture f) : IClassFixture<TaxonomyFixture>
{
    private static CertificationUpsertRequest Req(Guid issuerId, string title) =>
        new(issuerId, title, null, "Global", "EX-" + title.Length, "Associate", "2026", null, null, "None", "https://issuer.example/exam",
            DateTime.UtcNow.AddDays(-10), "Checked", "Every 3 years", "None", CertificationKind.ProfessionalCertification, false, null, null);

    [Fact]
    public async Task Mappings_are_readable_by_authors_and_reviewers_only_and_linked_courses_listed()
    {
        var rev = f.Client(f.Reviewer);
        var iss = await TaxonomyFixture.Read<IssuerDto>(await rev.PostJ("/api/admin/certification-issuers", new IssuerUpsertRequest("Map Issuer", "https://i.example", "US")));
        var c = await TaxonomyFixture.Read<CertificationAdminDto>(await rev.PostJ("/api/admin/certifications", Req(iss.Id, "Mapping Cert")));
        var withObj = await TaxonomyFixture.Read<CertificationAdminDto>(await rev.PostJ($"/api/admin/certifications/{c.Id}/objectives", new ObjectiveUpsertRequest("O1", "One", 100, null)));
        var o1 = withObj.Objectives.Single();
        var course = await f.AddCourse("Mapping Course", f.InstructorA.Id);
        var draft = await f.AddCourse("Unlisted Draft", f.InstructorA.Id, live: false);
        var lessonId = Guid.NewGuid(); var qId = Guid.NewGuid();
        await f.WithDb(async db =>
        {
            var m = new CourseModule { CourseId = course.Id, Code = "M1", Title = "M" };
            db.Modules.Add(m);
            db.Lessons.Add(new Lesson { Id = lessonId, ModuleId = m.Id, Code = "L1", Title = "L" });
            db.Questions.Add(new Question { Id = qId, CourseId = course.Id, ExternalId = "mq1", State = QuestionState.Active, CreatedBy = f.InstructorA.Id });
            await db.SaveChangesAsync();
        });
        Assert.Equal(HttpStatusCode.NoContent, (await rev.PutAsync($"/api/admin/certifications/{c.Id}/courses/{course.Id}", null)).StatusCode);
        Assert.Equal(HttpStatusCode.NoContent, (await rev.PutAsync($"/api/admin/certifications/{c.Id}/courses/{draft.Id}", null)).StatusCode);
        var author = f.Client(f.InstructorA);
        await TaxonomyFixture.Read<CoverageReportDto>(await author.PutJ($"/api/studio/objectives/{o1.Id}/courses/{course.Id}/lessons", new MappingRequest([lessonId])));
        await TaxonomyFixture.Read<CoverageReportDto>(await author.PutJ($"/api/studio/objectives/{o1.Id}/courses/{course.Id}/questions", new MappingRequest([qId])));

        var mine = await TaxonomyFixture.Read<CertificationMappingsDto>(await author.GetAsync($"/api/studio/courses/{course.Id}/certifications/{c.Id}/mappings"));
        Assert.True(mine.Linked);
        Assert.Equal([lessonId], mine.Objectives.Single().LessonIds);
        Assert.Equal([qId], mine.Objectives.Single().QuestionIds);
        var asReviewer = await TaxonomyFixture.Read<CertificationMappingsDto>(await rev.GetAsync($"/api/admin/certifications/{c.Id}/mappings?courseId={course.Id}"));
        Assert.Equal([lessonId], asReviewer.Objectives.Single().LessonIds);
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.InstructorB).GetAsync($"/api/studio/courses/{course.Id}/certifications/{c.Id}/mappings")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.InstructorB).GetAsync($"/api/admin/certifications/{c.Id}/mappings?courseId={course.Id}")).StatusCode);

        var linked = await TaxonomyFixture.Read<List<LinkedCourseDto>>(await f.Client(f.Admin).GetAsync($"/api/admin/certifications/{c.Id}/courses"));
        Assert.Contains(linked, x => x.CourseId == course.Id && x.IsLive && x.Slug == course.Slug);
        Assert.Contains(linked, x => x.CourseId == draft.Id && !x.IsLive);
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.Student).GetAsync($"/api/admin/certifications/{c.Id}/courses")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await f.Client(f.Admin).GetAsync($"/api/admin/certifications/{Guid.NewGuid()}/courses")).StatusCode);
    }

    [Fact]
    public async Task Admin_bestseller_rows_include_course_title_and_slug()
    {
        var course = await f.AddCourse("Bestselling Row Course", f.InstructorA.Id);
        await f.WithDb(async db =>
        {
            db.Set<BestsellerStat>().Add(new BestsellerStat { CourseId = course.Id, DistinctBuyers = 7, NetRevenue = 70, Eligible = true, WindowStart = DateTime.UtcNow.AddDays(-30), ComputedAt = DateTime.UtcNow });
            await db.SaveChangesAsync();
        });
        var rows = await TaxonomyFixture.Read<List<BestsellerRowDto>>(await f.Client(f.Admin).GetAsync("/api/admin/bestsellers"));
        var r = rows.Single(x => x.CourseId == course.Id);
        Assert.Equal("Bestselling Row Course", r.CourseTitle);
        Assert.Equal(course.Slug, r.CourseSlug);
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.Student).GetAsync("/api/admin/bestsellers")).StatusCode);
    }

    [Fact]
    public async Task Instructor_directory_shows_headline_and_bio_only_for_public_profiles()
    {
        var pub = await f.NewUser("Public Prof", Roles.Instructor);
        var priv = await f.NewUser("Private Prof", Roles.Instructor);
        await f.AddCourse("Public Prof Course", pub.Id);
        await f.AddCourse("Private Prof Course", priv.Id);
        await f.WithDb(async db =>
        {
            db.Set<AccountProfile>().Add(new AccountProfile { UserId = pub.Id, Headline = "Cloud architect", Bio = "Ten years of cloud.", PublicInstructorProfile = true });
            db.Set<AccountProfile>().Add(new AccountProfile { UserId = priv.Id, Headline = "Hidden headline", Bio = "Hidden bio", PublicInstructorProfile = false });
            await db.SaveChangesAsync();
        });
        var list = await TaxonomyFixture.Read<PagedResult<InstructorSummaryDto>>(await f.Client().GetAsync("/api/instructors?q=Prof"));
        Assert.Equal("Cloud architect", list.Items.Single(x => x.Id == pub.Id).Headline);
        Assert.Null(list.Items.Single(x => x.Id == priv.Id).Headline);
        var p = await TaxonomyFixture.Read<InstructorProfileDto>(await f.Client().GetAsync($"/api/instructors/{pub.Id}"));
        Assert.Equal(("Cloud architect", "Ten years of cloud."), (p.Headline, p.Bio));
        var hidden = await TaxonomyFixture.Read<InstructorProfileDto>(await f.Client().GetAsync($"/api/instructors/{priv.Id}"));
        Assert.Null(hidden.Bio);
    }

    [Fact]
    public async Task Notes_library_flags_courses_with_notes_from_the_published_snapshot()
    {
        var withNotes = await f.AddCourse("Notebook Alpha", f.InstructorA.Id);
        var without = await f.AddCourse("Notebook Beta", f.InstructorA.Id);
        var draft = await f.AddCourse("Notebook Draft", f.InstructorA.Id, live: false);
        var payload = new CourseSnapshotPayload("Notebook Alpha", "", "", "", "", "", "en", CourseLevel.Beginner, "None", 70m, null, [],
            [new SnapshotModule(Guid.NewGuid(), "M1", "M", 1, [
                new Mastemy.Api.Modules.Catalog.SnapshotLesson(Guid.NewGuid(), "L1", "L1", "", 1, false, null, null, 0, "", null, 1),
                new Mastemy.Api.Modules.Catalog.SnapshotLesson(Guid.NewGuid(), "L2", "L2", "", 2, false, null, null, 0, "# Real notes", null, 1)])], [], []);
        await f.WithDb(async db =>
        {
            var s = await db.CourseSnapshots.FirstAsync(x => x.CourseId == withNotes.Id);
            s.PayloadJson = JsonSerializer.Serialize(payload, CourseSnapshotService.Json);
            await db.SaveChangesAsync();
        });
        var res = await TaxonomyFixture.Read<PagedResult<NotesLibraryItemDto>>(await f.Client().GetAsync("/api/notes-library?q=notebook&pageSize=50"));
        Assert.Equal(2, res.Total);
        var a = res.Items.Single(x => x.Course.Id == withNotes.Id);
        Assert.True(a.HasNotes); Assert.Equal(1, a.LessonsWithNotes);
        Assert.False(res.Items.Single(x => x.Course.Id == without.Id).HasNotes);
        Assert.DoesNotContain(res.Items, x => x.Course.Id == draft.Id);
        Assert.Equal("Notebook Alpha", res.Items[0].Course.Title); // ordered by title

        var paged = await TaxonomyFixture.Read<PagedResult<NotesLibraryItemDto>>(await f.Client().GetAsync("/api/notes-library?q=notebook&page=2&pageSize=1"));
        Assert.Equal(withoutId(paged), without.Id);
        static Guid withoutId(PagedResult<NotesLibraryItemDto> p) => p.Items.Single().Course.Id;
    }
}
