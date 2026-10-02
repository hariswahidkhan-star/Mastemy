using System.Net;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Assessment;
using Mastemy.Api.Modules.Catalog;
using Mastemy.Api.Modules.Engagement;
using Mastemy.Api.Modules.Learning;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.Catalog;

/// <summary>
/// Read models served from the published snapshot: card/search columns, the SnapshotLessons index, discovery, sitemap
/// categories, dashboard titles and learner assessment settings never reflect unpublished draft edits.
/// </summary>
public class SnapshotReadModelTests(CatalogFixture f) : IClassFixture<CatalogFixture>
{
    private async Task<StudioCourseDto> CreateCourse(string title, int lessons = 2, int? categoryId = null, CourseLevel level = CourseLevel.Beginner)
    {
        var a = f.Client(f.InstructorA);
        var course = await f.Read<StudioCourseDto>(await a.PostJ("/api/studio/courses", new CreateCourseRequest(
            title, "Sub", "About " + title, "Analysts", "None", ["Outcome"], "en", level, [categoryId ?? f.CategoryId])));
        var mod = await f.Read<StudioModuleDto>(await a.PostJ($"/api/studio/courses/{course.Id}/modules", new TitleRequest("Module 1")));
        for (var i = 0; i < lessons; i++)
        {
            var lesson = await f.Read<StudioLessonDto>(await a.PostJ($"/api/studio/modules/{mod.Id}/lessons", new LessonCreateRequest($"Lesson {i + 1}", "Obj", false)));
            await f.WithDb(async db =>
            {
                var v = new VideoAsset { YouTubeVideoId = "rm" + Guid.NewGuid().ToString("N")[..9], Title = "v", DurationSeconds = 100, Status = VideoStatus.Ready, UploaderId = f.InstructorA.Id };
                db.VideoAssets.Add(v);
                (await db.Lessons.FirstAsync(x => x.Id == lesson.Id)).VideoAssetId = v.Id;
                await db.SaveChangesAsync();
            });
        }
        return await f.Read<StudioCourseDto>(await a.GetAsync($"/api/studio/courses/{course.Id}"));
    }

    private async Task Publish(Guid id)
    {
        await f.Read<CourseStatusDto>(await f.Client(f.InstructorA).PostAsync($"/api/studio/courses/{id}/submit", null));
        await f.Read<CourseStatusDto>(await f.Client(f.Reviewer).PostJ($"/api/review/courses/{id}/decision", new ReviewDecisionRequest("Approve", null)));
        await f.Read<CourseStatusDto>(await f.Client(f.Admin).PostAsync($"/api/admin/courses/{id}/publish", null));
    }

    private async Task StartUpdate(Guid id) =>
        await f.Read<CourseStatusDto>(await f.Client(f.InstructorA).PostAsync($"/api/studio/courses/{id}/start-update", null));

    private async Task Rename(StudioCourseDto c, string title, int? categoryId = null) =>
        await f.Read<StudioCourseDto>(await f.Client(f.InstructorA).PutJ($"/api/studio/courses/{c.Id}", new UpdateCourseRequest(title, "Sub",
            "About it", "Analysts", "None", ["Outcome"], "en", CourseLevel.Beginner, [categoryId ?? f.CategoryId], null, null, null)));

    private static string Token() => "tok" + Guid.NewGuid().ToString("N")[..10];

    private async Task<int> NewCategory()
    {
        var slug = "cat-" + Guid.NewGuid().ToString("N")[..8];
        var cat = new Category { Slug = slug, NameEn = slug, NameAr = slug, SortOrder = 5 };
        await f.WithDb(async db => { db.Categories.Add(cat); await db.SaveChangesAsync(); });
        return cat.Id;
    }

    [Fact]
    public async Task Publish_fills_card_columns_and_lesson_index()
    {
        var token = Token();
        var c = await CreateCourse("Columns " + token, lessons: 3);
        await Publish(c.Id);
        await f.WithDb(async db =>
        {
            var s = await db.CourseSnapshots.SingleAsync(x => x.CourseId == c.Id);
            Assert.Equal("Columns " + token, s.Title);
            Assert.Equal("Sub", s.Subtitle);
            Assert.Equal(CourseLevel.Beginner, s.Level);
            Assert.Equal("en", s.Language);
            Assert.Equal($",{f.CategoryId},", s.CategoryIds);
            Assert.Equal(3, s.LessonCount);
            Assert.Equal(300, s.TotalDurationSeconds);
            Assert.Contains(token.ToLowerInvariant(), s.SearchText);
            Assert.Contains("outcome", s.SearchText);
            var idx = await db.SnapshotLessons.Where(x => x.SnapshotId == s.Id).ToListAsync();
            Assert.Equal(c.Modules[0].Lessons.Select(l => l.Id).OrderBy(x => x), idx.Select(x => x.LessonId).OrderBy(x => x));
            Assert.All(idx, x => { Assert.Equal(1, x.Version); Assert.Equal(c.Id, x.CourseId); });
        });

        await StartUpdate(c.Id);
        await Publish(c.Id);
        await f.WithDb(async db =>
            Assert.Equal(3, await db.SnapshotLessons.CountAsync(x => x.CourseId == c.Id && x.Version == 2)));
    }

    [Fact]
    public async Task Live_lesson_resolves_through_the_snapshot_lesson_index()
    {
        var c = await CreateCourse("Index Lookup Course");
        var lesson = c.Modules[0].Lessons[0];
        await Publish(c.Id);
        var anon = f.Client();
        Assert.Equal(HttpStatusCode.OK, (await anon.GetAsync($"/api/learn/lessons/{lesson.Id}")).StatusCode);

        // The lookup is driven by the index row for the current version: a lesson the published payload contains but whose
        // index row points to a superseded version is not considered (no payload scans).
        await f.WithDb(async db =>
        {
            var row = await db.SnapshotLessons.SingleAsync(x => x.LessonId == lesson.Id);
            db.SnapshotLessons.Remove(row);
            db.SnapshotLessons.Add(new Mastemy.Api.Domain.SnapshotLesson { LessonId = lesson.Id, SnapshotId = row.SnapshotId, CourseId = c.Id, Version = 99 });
            await db.SaveChangesAsync();
        });
        Assert.Equal(HttpStatusCode.NotFound, (await anon.GetAsync($"/api/learn/lessons/{lesson.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await anon.GetAsync($"/api/learn/lessons/{c.Modules[0].Lessons[1].Id}")).StatusCode);
    }

    [Fact]
    public async Task Search_pages_in_sql_with_filters_and_escaping()
    {
        var token = Token();
        var cat = await NewCategory();
        var ids = new List<Guid>();
        foreach (var name in new[] { "Alpha", "Bravo", "Charlie" })
        {
            var c = await CreateCourse($"{name} {token}", lessons: 1, categoryId: cat, level: name == "Charlie" ? CourseLevel.Advanced : CourseLevel.Beginner);
            await Publish(c.Id);
            ids.Add(c.Id);
        }
        var anon = f.Client();
        var p1 = await f.Read<PagedResult<CourseCardDto>>(await anon.GetAsync($"/api/courses?q={token}&sort=title&pageSize=2&page=1"));
        var p2 = await f.Read<PagedResult<CourseCardDto>>(await anon.GetAsync($"/api/courses?q={token}&sort=title&pageSize=2&page=2"));
        Assert.Equal(3, p1.Total);
        Assert.Equal(3, p2.Total);
        Assert.Equal([$"Alpha {token}", $"Bravo {token}"], p1.Items.Select(x => x.Title));
        Assert.Equal([$"Charlie {token}"], p2.Items.Select(x => x.Title));
        var card = p1.Items[0];
        Assert.Equal(1, card.VideoCount);
        Assert.Equal(100, card.TotalDurationSeconds);
        Assert.Single(card.Categories);

        // Case-insensitive multi-term, category (by slug or id), level and language filters, all in SQL.
        var slug = (await f.Read<List<CategoryDto>>(await anon.GetAsync("/api/categories"))).Single(x => x.Id == cat);
        Assert.Equal(3, slug.CourseCount);
        Assert.Equal(3, (await f.Read<PagedResult<CourseCardDto>>(await anon.GetAsync($"/api/courses?category={slug.Slug}"))).Total);
        Assert.Single((await f.Read<PagedResult<CourseCardDto>>(await anon.GetAsync($"/api/courses?q=BRAVO%20{token}"))).Items);
        Assert.Single((await f.Read<PagedResult<CourseCardDto>>(await anon.GetAsync($"/api/courses?q={token}&level=Advanced"))).Items);
        Assert.Empty((await f.Read<PagedResult<CourseCardDto>>(await anon.GetAsync($"/api/courses?q={token}&language=ar"))).Items);
        Assert.Empty((await f.Read<PagedResult<CourseCardDto>>(await anon.GetAsync($"/api/courses?q={token}%25"))).Items);
        Assert.Empty((await f.Read<PagedResult<CourseCardDto>>(await anon.GetAsync($"/api/courses?q={token[..4]}_{token[5..]}"))).Items);

        // Draft rename is not searchable until re-publish.
        var first = await f.Read<StudioCourseDto>(await f.Client(f.InstructorA).GetAsync($"/api/studio/courses/{ids[0]}"));
        await StartUpdate(first.Id);
        var renamed = Token();
        await Rename(first, "Zulu " + renamed, cat);
        Assert.Empty((await f.Read<PagedResult<CourseCardDto>>(await anon.GetAsync($"/api/courses?q={renamed}"))).Items);
        Assert.Equal(3, (await f.Read<PagedResult<CourseCardDto>>(await anon.GetAsync($"/api/courses?q={token}"))).Total);
    }

    [Fact]
    public async Task Discovery_and_dashboard_show_the_published_title_after_a_draft_rename()
    {
        var cat = await NewCategory();
        var a = await CreateCourse("Published Discovery A", lessons: 1, categoryId: cat);
        var b = await CreateCourse("Published Discovery B", lessons: 1, categoryId: cat);
        await Publish(a.Id);
        await Publish(b.Id);
        var student = f.Client(f.Student);
        Assert.True((await student.PostAsync($"/api/me/wishlist/{a.Id}", null)).IsSuccessStatusCode);
        Assert.True((await student.PostAsync($"/api/me/recently-viewed/{a.Id}", null)).IsSuccessStatusCode);
        await f.WithDb(async db =>
        {
            db.Entitlements.Add(new Entitlement { UserId = f.Student.Id, CourseId = a.Id, StartsAt = DateTime.UtcNow.AddMinutes(-1) });
            await db.SaveChangesAsync();
        });

        await StartUpdate(a.Id);
        await Rename(a, "Draft Only Rename", await NewCategory());

        var compare = await f.Read<List<CompareCourseDto>>(await f.Client().GetAsync($"/api/courses/compare?ids={a.Id},{b.Id}"));
        Assert.Equal("Published Discovery A", compare.Single(x => x.Id == a.Id).Title);
        Assert.Equal(1, compare.Single(x => x.Id == a.Id).LessonCount);
        var related = await f.Read<List<CourseCardLiteDto>>(await f.Client().GetAsync($"/api/courses/{b.Id}/related"));
        Assert.Equal("Published Discovery A", Assert.Single(related, x => x.Id == a.Id).Title); // published category still shared
        var wish = await f.Read<List<WishlistItemDto>>(await student.GetAsync("/api/me/wishlist"));
        Assert.Equal("Published Discovery A", wish.Single(x => x.Course.Id == a.Id).Course.Title);
        var recent = await f.Read<List<RecentlyViewedDto>>(await student.GetAsync("/api/me/recently-viewed"));
        Assert.Equal("Published Discovery A", recent.Single(x => x.Course.Id == a.Id).Course.Title);
        var dash = await f.Read<DashboardDto>(await student.GetAsync("/api/me/dashboard"));
        Assert.Equal("Published Discovery A", dash.Entitlements.Single(x => x.Course.Id == a.Id).Course.Title);

        await Rename(a, "Draft Only Rename", cat);
        await Publish(a.Id);
        compare = await f.Read<List<CompareCourseDto>>(await f.Client().GetAsync($"/api/courses/compare?ids={a.Id},{b.Id}"));
        Assert.Equal("Draft Only Rename", compare.Single(x => x.Id == a.Id).Title);
        wish = await f.Read<List<WishlistItemDto>>(await student.GetAsync("/api/me/wishlist"));
        Assert.Equal("Draft Only Rename", wish.Single(x => x.Course.Id == a.Id).Course.Title);
    }

    [Fact]
    public async Task Sitemap_categories_come_from_the_published_snapshot()
    {
        var published = await NewCategory();
        var draftOnly = await NewCategory();
        var c = await CreateCourse("Sitemap Snapshot Course", lessons: 1, categoryId: published);
        await Publish(c.Id);
        await StartUpdate(c.Id);
        await Rename(c, "Sitemap Snapshot Course", draftOnly);
        string publishedSlug = "", draftSlug = "";
        await f.WithDb(async db =>
        {
            publishedSlug = (await db.Categories.SingleAsync(x => x.Id == published)).Slug;
            draftSlug = (await db.Categories.SingleAsync(x => x.Id == draftOnly)).Slug;
        });
        await using var seo = f.Factory.WithWebHostBuilder(b => b.UseSetting("Seo:PublicBaseUrl", "https://mastemy.test"));
        var xml = await seo.CreateClient().GetStringAsync("/sitemap.xml");
        Assert.Contains("https://mastemy.test/categories/" + publishedSlug, xml);
        Assert.DoesNotContain("/categories/" + draftSlug, xml);
    }

    private async Task<(Guid AssessmentId, Guid QuestionId)> AddAssessment(Guid courseId, Guid? lessonId, decimal passPercent)
    {
        var q = new Question { CourseId = courseId, ExternalId = "Q" + Guid.NewGuid().ToString("N")[..6], State = QuestionState.Active, CreatedBy = f.InstructorA.Id };
        var v = new QuestionVersion { QuestionId = q.Id, Version = 1, Type = QuestionType.SingleChoice, Stem = "stem", Explanation = "x", Tags = "t" };
        v.Options = [new QuestionOption { QuestionVersionId = v.Id, SortOrder = 0, Text = "right", IsCorrect = true },
                     new QuestionOption { QuestionVersionId = v.Id, SortOrder = 1, Text = "wrong" }];
        q.Versions.Add(v);
        var a = new Mastemy.Api.Domain.Assessment
        {
            CourseId = courseId, LessonId = lessonId, Title = "Quiz " + Guid.NewGuid().ToString("N")[..6], Kind = AssessmentKind.LessonPractice,
            Mode = AssessmentMode.Exam, PassPercent = passPercent, ReviewPolicy = AnswerReviewPolicy.AfterSubmit,
        };
        a.Questions.Add(new AssessmentQuestion { AssessmentId = a.Id, QuestionId = q.Id, SortOrder = 0 });
        await f.WithDb(async db => { db.Questions.Add(q); db.Assessments.Add(a); await db.SaveChangesAsync(); });
        return (a.Id, q.Id);
    }

    [Fact]
    public async Task Learners_get_published_assessments_and_settings_only()
    {
        var c = await CreateCourse("Assessment Snapshot Course", lessons: 1);
        var lesson = c.Modules[0].Lessons[0];
        var (published, _) = await AddAssessment(c.Id, lesson.Id, 70m);
        await Publish(c.Id);
        await StartUpdate(c.Id);
        var (draft, _) = await AddAssessment(c.Id, lesson.Id, 50m);
        await f.WithDb(async db =>
        {
            (await db.Assessments.SingleAsync(x => x.Id == published)).PassPercent = 90m;
            await db.SaveChangesAsync();
        });

        var student = f.Client(f.Student);
        var view = await f.Read<LessonViewDto>(await student.GetAsync($"/api/learn/lessons/{lesson.Id}"));
        var listed = Assert.Single(view.Assessments);
        Assert.Equal(published, listed.Id);
        Assert.Equal(70m, listed.PassPercent);
        Assert.Equal(HttpStatusCode.NotFound, (await student.GetAsync($"/api/assessments/{draft}")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await student.PostAsync($"/api/assessments/{draft}/attempts", null)).StatusCode);

        Assert.Equal(70m, (await f.Read<AssessmentSummaryDto>(await student.GetAsync($"/api/assessments/{published}"))).PassPercent);
        // Authors preview the working settings.
        Assert.Equal(90m, (await f.Read<AssessmentSummaryDto>(await f.Client(f.InstructorA).GetAsync($"/api/assessments/{published}"))).PassPercent);
        var attempt = await f.Read<AttemptView>(await student.PostAsync($"/api/assessments/{published}/attempts", null));
        var result = await f.Read<AttemptResult>(await student.PostAsync($"/api/attempts/{attempt.Id}/submit", null));
        Assert.Equal(70m, result.PassPercent);

        await Publish(c.Id);
        Assert.Equal(90m, (await f.Read<AssessmentSummaryDto>(await student.GetAsync($"/api/assessments/{published}"))).PassPercent);
        Assert.Equal(2, (await f.Read<LessonViewDto>(await student.GetAsync($"/api/learn/lessons/{lesson.Id}"))).Assessments.Count);
        var next = await f.Read<AttemptView>(await student.PostAsync($"/api/assessments/{published}/attempts", null));
        Assert.Equal(90m, (await f.Read<AttemptResult>(await student.PostAsync($"/api/attempts/{next.Id}/submit", null))).PassPercent);
    }
}
