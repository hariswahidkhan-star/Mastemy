using System.Net;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Authoring;
using Mastemy.Api.Modules.Catalog;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.Authoring;

public class AuthoringTests(AuthoringFixture f) : IClassFixture<AuthoringFixture>
{
    private async Task<LessonNotesDto> Notes(HttpClient c, Guid lessonId) => await f.Read<LessonNotesDto>(await c.GetAsync($"/api/studio/lessons/{lessonId}/notes"));

    // ---------- concurrency / revisions ----------
    [Fact]
    public async Task Notes_save_requires_if_match_and_rejects_stale_with_412()
    {
        var c = await f.CreateCourse("Concurrency Course");
        var lessonId = c.Modules[0].Lessons[0].Id;
        var a = f.Client(f.Owner);
        var url = $"/api/studio/lessons/{lessonId}/notes";

        var missing = await f.Send(a, HttpMethod.Put, url, new LessonNotesRequest("x", null), null);
        Assert.Equal((HttpStatusCode)428, missing.StatusCode);

        var n0 = await Notes(a, lessonId);
        Assert.Equal(n0.ETag, (await a.GetAsync(url)).Headers.ETag?.ToString());
        // Tab 1 saves with the current ETag.
        var ok = await f.Send(a, HttpMethod.Put, url, new LessonNotesRequest("tab one", null), n0.ETag);
        var saved = await f.Read<StudioLessonDto>(ok);
        Assert.Equal(n0.NotesVersion + 1, saved.NotesVersion);
        Assert.Equal(StudioService.NotesETag(saved.NotesVersion), ok.Headers.ETag?.ToString());
        // Tab 2 still holds the old ETag: refused, and its text does not overwrite tab 1.
        var stale = await f.Send(a, HttpMethod.Put, url, new LessonNotesRequest("tab two", null), n0.ETag);
        Assert.Equal(HttpStatusCode.PreconditionFailed, stale.StatusCode);
        Assert.Contains("precondition_failed", await stale.Content.ReadAsStringAsync());
        // Weak validators and * never satisfy the precondition.
        Assert.Equal(HttpStatusCode.PreconditionFailed, (await f.Send(a, HttpMethod.Put, url, new LessonNotesRequest("w", null), "W/" + StudioService.NotesETag(saved.NotesVersion))).StatusCode);
        Assert.Equal(HttpStatusCode.PreconditionFailed, (await f.Send(a, HttpMethod.Put, url, new LessonNotesRequest("w", null), "*")).StatusCode);
        Assert.Equal("tab one", (await Notes(a, lessonId)).NotesMarkdown);
    }

    [Fact]
    public async Task Concurrent_saves_from_same_version_never_both_win()
    {
        var c = await f.CreateCourse("Race Course");
        var lessonId = c.Modules[0].Lessons[0].Id;
        var etag = (await Notes(f.Client(f.Owner), lessonId)).ETag;
        var url = $"/api/studio/lessons/{lessonId}/notes";
        var tasks = Enumerable.Range(0, 6).Select(i => f.Send(f.Client(f.Owner), HttpMethod.Put, url, new LessonNotesRequest($"writer {i}", null), etag)).ToList();
        var results = await Task.WhenAll(tasks);
        Assert.Equal(1, results.Count(r => r.StatusCode == HttpStatusCode.OK));
        Assert.All(results.Where(r => r.StatusCode != HttpStatusCode.OK), r => Assert.Equal(HttpStatusCode.PreconditionFailed, r.StatusCode));
        await f.WithDb(async db => Assert.Equal(2, await db.Set<LessonRevision>().CountAsync(r => r.LessonId == lessonId)));
    }

    [Fact]
    public async Task Revisions_are_listed_and_restore_creates_new_revision()
    {
        var c = await f.CreateCourse("Revision Course");
        var lessonId = c.Modules[0].Lessons[0].Id;
        var a = f.Client(f.Owner);
        var url = $"/api/studio/lessons/{lessonId}/notes";
        foreach (var text in new[] { "first", "second", "third" })
            await f.Read<StudioLessonDto>(await f.Send(a, HttpMethod.Put, url, new LessonNotesRequest(text, text == "second" ? "premium two" : null), (await Notes(a, lessonId)).ETag));
        var list = await f.Read<List<LessonRevisionSummaryDto>>(await a.GetAsync($"/api/studio/lessons/{lessonId}/revisions"));
        Assert.Equal([4, 3, 2, 1], list.Select(x => x.Revision).ToArray()); // 1 = base text before tracking
        Assert.True(list[0].IsCurrent);
        Assert.Equal("owner", list[0].AuthorName);
        var r3 = await f.Read<LessonRevisionDto>(await a.GetAsync($"/api/studio/lessons/{lessonId}/revisions/3"));
        Assert.Equal("second", r3.NotesMarkdown);
        Assert.Equal("premium two", r3.PremiumNotesMarkdown);

        var restoreUrl = $"/api/studio/lessons/{lessonId}/revisions/3/restore";
        Assert.Equal((HttpStatusCode)428, (await f.Send<object>(a, HttpMethod.Post, restoreUrl, null, null)).StatusCode);
        Assert.Equal(HttpStatusCode.PreconditionFailed, (await f.Send<object>(a, HttpMethod.Post, restoreUrl, null, StudioService.NotesETag(2))).StatusCode);
        var restored = await f.Read<StudioLessonDto>(await f.Send<object>(a, HttpMethod.Post, restoreUrl, null, (await Notes(a, lessonId)).ETag));
        Assert.Equal(5, restored.NotesVersion);
        Assert.Equal("second", restored.NotesMarkdown);
        Assert.Equal("premium two", restored.PremiumNotesMarkdown);
        var after = await f.Read<List<LessonRevisionSummaryDto>>(await a.GetAsync($"/api/studio/lessons/{lessonId}/revisions"));
        Assert.Equal(3, after[0].RestoredFromRevision);
        Assert.Equal(404, (int)(await f.Send<object>(a, HttpMethod.Post, $"/api/studio/lessons/{lessonId}/revisions/99/restore", null, StudioService.NotesETag(5))).StatusCode);

        // Change history merges audit entries and notes revisions.
        var history = await f.Read<CourseHistoryDto>(await a.GetAsync($"/api/studio/courses/{c.Id}/history?pageSize=100"));
        Assert.Contains(history.Items, e => e.Kind == "notes_revision" && e.Revision == 5 && e.Action == "lesson.notes.restored");
        Assert.Contains(history.Items, e => e.Kind == "audit" && e.Action == StudioService.ContentChangedAction);
        Assert.True(history.Items.Zip(history.Items.Skip(1)).All(p => p.First.At >= p.Second.At));
        // Outsiders see neither revisions nor history.
        var other = f.Client(f.Other);
        Assert.Equal(HttpStatusCode.Forbidden, (await other.GetAsync($"/api/studio/lessons/{lessonId}/revisions")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await other.GetAsync($"/api/studio/courses/{c.Id}/history")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Send<object>(other, HttpMethod.Post, restoreUrl, null, StudioService.NotesETag(5))).StatusCode);
    }

    [Fact]
    public async Task Course_update_honours_if_match()
    {
        var c = await f.CreateCourse("Course Etag");
        var a = f.Client(f.Owner);
        var get = await a.GetAsync($"/api/studio/courses/{c.Id}");
        var etag = get.Headers.ETag!.ToString();
        var req = new UpdateCourseRequest("Course Etag v2", null, "d", null, null, ["o"], "en", null, null, null, null, null);
        var ok = await f.Send(a, HttpMethod.Put, $"/api/studio/courses/{c.Id}", req, etag);
        await f.Read<StudioCourseDto>(ok);
        Assert.NotEqual(etag, ok.Headers.ETag!.ToString());
        Assert.Equal(HttpStatusCode.PreconditionFailed, (await f.Send(a, HttpMethod.Put, $"/api/studio/courses/{c.Id}", req with { Title = "v3" }, etag)).StatusCode);
    }

    // ---------- editor scope ----------
    [Fact]
    public async Task Editor_can_edit_content_but_not_manage()
    {
        var c = await f.CreateCourse("Scoped Editor Course", withTeam: true);
        var e = f.Client(f.Editor);
        var lessonId = c.Modules[0].Lessons[0].Id;
        // content: allowed
        await f.Read<StudioLessonDto>(await f.Put(e, $"/api/studio/lessons/{lessonId}", new LessonUpdateRequest("Edited by editor", null, null)));
        await f.Read<StudioLessonDto>(await f.Send(e, HttpMethod.Put, $"/api/studio/lessons/{lessonId}/notes", new LessonNotesRequest("editor notes", null), (await Notes(e, lessonId)).ETag));
        var dup = await f.Read<StudioLessonDto>(await e.PostAsync($"/api/studio/lessons/{lessonId}/duplicate", null));
        Assert.Equal(c.Modules[0].Lessons[0].VideoAssetId, dup.VideoAssetId); // asset used only inside this team's course: reusable
        await f.Read<LearnerPreviewDto>(await e.GetAsync($"/api/studio/courses/{c.Id}/preview"));
        // management: refused with editor_scope
        foreach (var res in new[]
                 {
                     await e.PostAsync($"/api/studio/courses/{c.Id}/submit", null),
                     await e.PostAsync($"/api/studio/courses/{c.Id}/start-update", null),
                     await f.Post(e, $"/api/studio/courses/{c.Id}/co-instructors", new CoInstructorRequest(f.Other.Email, CourseInstructorRole.Editor, 0)),
                     await f.Post(e, $"/api/studio/courses/{c.Id}/duplicate", new DuplicateCourseRequest(null)),
                     await f.Post(e, $"/api/studio/courses/{c.Id}/translations", new TranslationLinkRequest(Guid.NewGuid())),
                     await e.GetAsync($"/api/studio/courses/{c.Id}/analytics"),
                 })
            Assert.Equal(HttpStatusCode.Forbidden, res.StatusCode);
        var submit = await e.PostAsync($"/api/studio/courses/{c.Id}/submit", null);
        Assert.Contains("editor_scope", await submit.Content.ReadAsStringAsync());
        // The co-instructor is a manager.
        await f.Read<StudioCourseDto>(await f.Post(f.Client(f.CoInstructor), $"/api/studio/courses/{c.Id}/duplicate", new DuplicateCourseRequest("Co copy")));
        await f.Read<CourseStatusDto>(await f.Client(f.CoInstructor).PostAsync($"/api/studio/courses/{c.Id}/submit", null));
    }

    // ---------- preview ----------
    [Fact]
    public async Task Preview_uses_draft_toggles_premium_and_never_contains_answer_keys()
    {
        var c = await f.CreateCourse("Preview Course");
        var a = f.Client(f.Owner);
        var lessonId = c.Modules[0].Lessons[0].Id;
        await f.Read<StudioLessonDto>(await f.Send(a, HttpMethod.Put, $"/api/studio/lessons/{lessonId}/notes", new LessonNotesRequest("free text", "PREMIUM-SECRET"), (await Notes(a, lessonId)).ETag));
        await f.WithDb(async db =>
        {
            var q = new Question { CourseId = c.Id, ExternalId = "Q1", State = QuestionState.Active, CreatedBy = f.Owner.Id };
            var v = new QuestionVersion { QuestionId = q.Id, Version = 1, Stem = "STEM-TEXT", Explanation = "EXPLANATION-TEXT" };
            v.Options.Add(new QuestionOption { Text = "RIGHT-ANSWER", IsCorrect = true, Rationale = "RATIONALE-TEXT" });
            v.Options.Add(new QuestionOption { Text = "WRONG", IsCorrect = false, SortOrder = 1 });
            q.Versions.Add(v);
            db.Questions.Add(q);
            var asm = new Mastemy.Api.Domain.Assessment { CourseId = c.Id, LessonId = lessonId, Title = "Lesson quiz", Kind = AssessmentKind.LessonPractice, QuestionCount = 1 };
            asm.Questions.Add(new AssessmentQuestion { AssessmentId = asm.Id, QuestionId = q.Id });
            db.Assessments.Add(asm);
            await db.SaveChangesAsync();
        });

        foreach (var mode in new[] { "free", "premium" })
        {
            var res = await a.GetAsync($"/api/studio/courses/{c.Id}/preview?as={mode}&device=mobile");
            var raw = await res.Content.ReadAsStringAsync();
            Assert.Equal(HttpStatusCode.OK, res.StatusCode);
            Assert.DoesNotContain("isCorrect", raw, StringComparison.OrdinalIgnoreCase);
            Assert.DoesNotContain("RIGHT-ANSWER", raw);
            Assert.DoesNotContain("RATIONALE-TEXT", raw);
            Assert.DoesNotContain("EXPLANATION-TEXT", raw);
            Assert.DoesNotContain("STEM-TEXT", raw);
            var p = await f.Read<LearnerPreviewDto>(res);
            Assert.Equal("mobile", p.Device);
            Assert.True(p.IsDraftPreview);
            var l0 = p.Lessons.First(x => x.Lesson.Id == lessonId);
            Assert.Equal("free text", l0.NotesMarkdown); // draft, never published
            Assert.Contains(l0.Assessments, x => x.Title == "Lesson quiz");
            if (mode == "free") { Assert.Null(l0.PremiumNotesMarkdown); Assert.True(l0.PremiumLocked); Assert.False(p.Curriculum.HasPremiumAccess); }
            else { Assert.Equal("PREMIUM-SECRET", l0.PremiumNotesMarkdown); Assert.False(l0.PremiumLocked); Assert.True(p.Curriculum.HasPremiumAccess); }
        }
        Assert.Equal(HttpStatusCode.BadRequest, (await a.GetAsync($"/api/studio/courses/{c.Id}/preview?as=owner")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.Other).GetAsync($"/api/studio/courses/{c.Id}/preview")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.Student).GetAsync($"/api/studio/courses/{c.Id}/preview?as=premium")).StatusCode);
        Assert.Equal(HttpStatusCode.Unauthorized, (await f.Client().GetAsync($"/api/studio/courses/{c.Id}/preview")).StatusCode);
        await f.Read<LearnerPreviewDto>(await f.Client(f.Reviewer).GetAsync($"/api/studio/courses/{c.Id}/preview?as=premium"));
    }

    // ---------- duplication / bulk ----------
    [Fact]
    public async Task Duplicate_course_copies_content_as_new_draft_and_relinks_only_reusable_videos()
    {
        var c = await f.CreateCourse("Original Course", modules: 2, lessons: 2);
        var a = f.Client(f.Owner);
        var l0 = c.Modules[0].Lessons[0].Id;
        await f.Read<StudioLessonDto>(await f.Send(a, HttpMethod.Put, $"/api/studio/lessons/{l0}/notes", new LessonNotesRequest("orig notes", "orig premium"), (await Notes(a, l0)).ETag));
        // Lesson 0.1's video was uploaded by someone else and is also used in another instructor's course: not reusable.
        Guid foreignVideo = Guid.Empty;
        var otherCourse = await f.Read<StudioCourseDto>(await f.Post(f.Client(f.Other), "/api/studio/courses", new CreateCourseRequest("Other owns", null, null, null, null, null, "en", null, null)));
        var om = await f.Read<StudioModuleDto>(await f.Post(f.Client(f.Other), $"/api/studio/courses/{otherCourse.Id}/modules", new TitleRequest("M")));
        var ol = await f.Read<StudioLessonDto>(await f.Post(f.Client(f.Other), $"/api/studio/modules/{om.Id}/lessons", new LessonCreateRequest("L", null, null)));
        await f.WithDb(async db =>
        {
            var v = new VideoAsset { YouTubeVideoId = "zyxwvutsrqp", DurationSeconds = 60, Status = VideoStatus.Ready, UploaderId = f.Other.Id };
            db.VideoAssets.Add(v);
            (await db.Lessons.FirstAsync(x => x.Id == c.Modules[0].Lessons[1].Id)).VideoAssetId = v.Id;
            (await db.Lessons.FirstAsync(x => x.Id == ol.Id)).VideoAssetId = v.Id;
            foreignVideo = v.Id;
            await db.SaveChangesAsync();
        });
        await f.Publish(c.Id);

        var copy = await f.Read<StudioCourseDto>(await f.Post(a, $"/api/studio/courses/{c.Id}/duplicate", new DuplicateCourseRequest(null)));
        Assert.NotEqual(c.Id, copy.Id);
        Assert.Equal(CourseStatus.Draft, copy.Status);
        Assert.Equal("Copy of Original Course", copy.Title);
        Assert.Null(copy.PublishedAt);
        Assert.Equal(2, copy.Modules.Count);
        Assert.Equal(4, copy.Modules.Sum(m => m.Lessons.Count));
        Assert.DoesNotContain(copy.Modules.SelectMany(m => m.Lessons), l => c.Modules.SelectMany(m => m.Lessons).Any(o => o.Id == l.Id));
        var cl0 = copy.Modules[0].Lessons[0];
        Assert.Equal("orig notes", cl0.NotesMarkdown);
        Assert.Equal("orig premium", cl0.PremiumNotesMarkdown);
        Assert.Equal(c.Modules[0].Lessons[0].VideoAssetId, cl0.VideoAssetId); // own upload: relinked (same asset row)
        Assert.Null(copy.Modules[0].Lessons[1].VideoAssetId); // foreign shared video: left unlinked
        Assert.Contains(copy.Instructors, i => i.UserId == f.Owner.Id && i.Role == CourseInstructorRole.Owner);
        await f.WithDb(async db =>
        {
            var asset = await db.VideoAssets.FirstAsync(v => v.Id == foreignVideo);
            Assert.Equal(f.Other.Id, asset.UploaderId); // ownership untouched
            var src = await db.Courses.FirstAsync(x => x.Id == c.Id);
            Assert.Equal(CourseStatus.Published, src.Status);
        });
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Post(f.Client(f.Other), $"/api/studio/courses/{c.Id}/duplicate", new DuplicateCourseRequest(null))).StatusCode);
    }

    [Fact]
    public async Task Duplicate_module_and_lesson_and_bulk_create()
    {
        var c = await f.CreateCourse("Dup Parts Course", modules: 1, lessons: 2);
        var a = f.Client(f.Owner);
        var m = await f.Read<StudioModuleDto>(await a.PostAsync($"/api/studio/modules/{c.Modules[0].Id}/duplicate", null));
        Assert.Equal("Copy of Module 1", m.Title);
        Assert.Equal(2, m.Lessons.Count);
        Assert.All(m.Lessons, l => Assert.StartsWith(m.Code + ".L", l.Code));
        Assert.Equal(c.Modules[0].Lessons[0].VideoAssetId, m.Lessons[0].VideoAssetId);

        var l = await f.Read<StudioLessonDto>(await a.PostAsync($"/api/studio/lessons/{c.Modules[0].Lessons[0].Id}/duplicate", null));
        Assert.Equal("Copy of Lesson 1.1", l.Title);
        Assert.Equal(3, l.SortOrder);

        var bulk = await f.Read<List<StudioLessonDto>>(await f.Post(a, $"/api/studio/modules/{c.Modules[0].Id}/lessons/bulk", new BulkLessonsRequest(["Intro", "Deep dive", "Wrap up"])));
        Assert.Equal(["Intro", "Deep dive", "Wrap up"], bulk.Select(x => x.Title).ToArray());
        Assert.Equal([4, 5, 6], bulk.Select(x => x.SortOrder).ToArray());
        Assert.Equal(bulk.Count, bulk.Select(x => x.Code).Distinct().Count());
        Assert.Equal(HttpStatusCode.BadRequest, (await f.Post(a, $"/api/studio/modules/{c.Modules[0].Id}/lessons/bulk", new BulkLessonsRequest(["ok", " "]))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await f.Post(a, $"/api/studio/modules/{c.Modules[0].Id}/lessons/bulk", new BulkLessonsRequest(Enumerable.Repeat("x", 101).ToArray()))).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Post(f.Client(f.Other), $"/api/studio/modules/{c.Modules[0].Id}/lessons/bulk", new BulkLessonsRequest(["x"]))).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.Other).PostAsync($"/api/studio/lessons/{c.Modules[0].Lessons[0].Id}/duplicate", null)).StatusCode);
    }

    // ---------- templates ----------
    [Fact]
    public async Task Staff_templates_are_applied_on_create_with_checklist()
    {
        var admin = f.Client(f.Admin);
        var req = new CourseTemplateRequest("Cert prep " + Guid.NewGuid().ToString("N")[..6], "Standard",
            [new TemplateModuleDto("Orientation", [new TemplateLessonDto("Welcome", "Know the course"), new TemplateLessonDto("Exam overview", null)]),
             new TemplateModuleDto("Practice", [new TemplateLessonDto("Mock exam", null)])],
            ["Record intro video", "Write 50 MCQs"], true);
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Post(f.Client(f.Owner), "/api/admin/course-templates", req)).StatusCode);
        var t = await f.Read<CourseTemplateDto>(await f.Post(admin, "/api/admin/course-templates", req));
        Assert.Equal(HttpStatusCode.Conflict, (await f.Post(admin, "/api/admin/course-templates", req)).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await f.Post(admin, "/api/admin/course-templates", req with { Name = "Bad", Modules = [new TemplateModuleDto("", null)] })).StatusCode);

        var a = f.Client(f.Owner);
        Assert.Contains(await f.Read<List<CourseTemplateDto>>(await a.GetAsync("/api/studio/course-templates")), x => x.Id == t.Id);
        var course = await f.Read<StudioCourseDto>(await f.Post(a, "/api/studio/courses/from-template", new CreateFromTemplateRequest(t.Id,
            new CreateCourseRequest("From Template Course", null, null, null, null, null, "en", null, null))));
        Assert.Equal(["Orientation", "Practice"], course.Modules.Select(m => m.Title).ToArray());
        Assert.Equal(["Welcome", "Exam overview"], course.Modules[0].Lessons.Select(l => l.Title).ToArray());
        Assert.Equal("Know the course", course.Modules[0].Lessons[0].Objective);
        var checklist = await f.Read<List<ChecklistItemDto>>(await a.GetAsync($"/api/studio/courses/{course.Id}/checklist"));
        Assert.Equal(["Record intro video", "Write 50 MCQs"], checklist.Select(x => x.Text).ToArray());
        var toggled = await f.Read<ChecklistItemDto>(await f.Put(a, $"/api/studio/courses/{course.Id}/checklist/{checklist[0].Id}", new ChecklistToggleRequest(true)));
        Assert.True(toggled.Done);
        Assert.Equal(f.Owner.Id, toggled.DoneBy);
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Put(f.Client(f.Other), $"/api/studio/courses/{course.Id}/checklist/{checklist[0].Id}", new ChecklistToggleRequest(false))).StatusCode);

        // Deactivated templates cannot be applied.
        Assert.Equal(HttpStatusCode.NoContent, (await admin.DeleteAsync($"/api/admin/course-templates/{t.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await f.Post(a, "/api/studio/courses/from-template", new CreateFromTemplateRequest(t.Id,
            new CreateCourseRequest("Nope", null, null, null, null, null, "en", null, null)))).StatusCode);
    }

    // ---------- translations ----------
    [Fact]
    public async Task Translations_link_languages_and_public_lists_only_live_variants()
    {
        var en = await f.CreateCourse("Translated EN", language: "en");
        var ar = await f.CreateCourse("Translated AR", language: "ar");
        var en2 = await f.CreateCourse("Another EN", language: "en");
        var a = f.Client(f.Owner);
        var linked = await f.Read<List<StudioTranslationDto>>(await f.Post(a, $"/api/studio/courses/{en.Id}/translations", new TranslationLinkRequest(ar.Id)));
        Assert.Single(linked, x => x.CourseId == ar.Id && x.Language == "ar");
        Assert.Equal(HttpStatusCode.Conflict, (await f.Post(a, $"/api/studio/courses/{en2.Id}/translations", new TranslationLinkRequest(ar.Id))).StatusCode);
        var otherCourse = await f.Read<StudioCourseDto>(await f.Post(f.Client(f.Other), "/api/studio/courses", new CreateCourseRequest("Other FR", null, null, null, null, null, "fr", null, null)));
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Post(a, $"/api/studio/courses/{en.Id}/translations", new TranslationLinkRequest(otherCourse.Id))).StatusCode);

        await f.Publish(en.Id);
        var langs = await f.Read<List<CourseLanguageDto>>(await f.Client().GetAsync($"/api/courses/{en.Slug}/languages"));
        Assert.Single(langs); // Arabic variant is still a draft
        Assert.True(langs[0].IsCurrent);
        await f.Publish(ar.Id);
        langs = await f.Read<List<CourseLanguageDto>>(await f.Client().GetAsync($"/api/courses/{en.Slug}/languages"));
        Assert.Equal(["ar", "en"], langs.Select(l => l.Language).ToArray());
        Assert.Equal(HttpStatusCode.NotFound, (await f.Client().GetAsync($"/api/courses/{en2.Slug}/languages")).StatusCode);

        Assert.Equal(HttpStatusCode.NoContent, (await a.DeleteAsync($"/api/studio/courses/{ar.Id}/translations")).StatusCode);
        Assert.Empty(await f.Read<List<StudioTranslationDto>>(await a.GetAsync($"/api/studio/courses/{en.Id}/translations")));
    }
}
