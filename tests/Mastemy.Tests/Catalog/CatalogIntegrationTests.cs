using System.Net;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Catalog;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.Catalog;

public class CatalogIntegrationTests(CatalogFixture f) : IClassFixture<CatalogFixture>
{
    private async Task<StudioCourseDto> CreateCourse(string title, int modules = 1, int lessonsPerModule = 2, VideoStatus? video = VideoStatus.Ready)
    {
        var a = f.Client(f.InstructorA);
        var course = await f.Read<StudioCourseDto>(await a.PostJ("/api/studio/courses", new CreateCourseRequest(
            title, "Sub", "A course about " + title, "Analysts", "None", ["Outcome one", "Outcome two"], "en", CourseLevel.Beginner, [f.CategoryId])));
        for (var m = 0; m < modules; m++)
        {
            var mod = await f.Read<StudioModuleDto>(await a.PostJ($"/api/studio/courses/{course.Id}/modules", new TitleRequest($"Module {m + 1}")));
            for (var l = 0; l < lessonsPerModule; l++)
            {
                var lesson = await f.Read<StudioLessonDto>(await a.PostJ($"/api/studio/modules/{mod.Id}/lessons", new LessonCreateRequest($"Lesson {l + 1}", "Obj", false)));
                if (video is not null)
                    await f.WithDb(async db =>
                    {
                        var v = new VideoAsset { YouTubeVideoId = "abcdefghijk", Title = "v", DurationSeconds = 100, Status = video.Value, UploaderId = f.InstructorA.Id };
                        db.VideoAssets.Add(v);
                        var le = await db.Lessons.FirstAsync(x => x.Id == lesson.Id);
                        le.VideoAssetId = v.Id;
                        await db.SaveChangesAsync();
                    });
            }
        }
        return await f.Read<StudioCourseDto>(await a.GetAsync($"/api/studio/courses/{course.Id}"));
    }

    private async Task Publish(Guid id)
    {
        await f.Read<CourseStatusDto>(await f.Client(f.InstructorA).PostAsync($"/api/studio/courses/{id}/submit", null));
        await f.Read<CourseStatusDto>(await f.Client(f.Reviewer).PostJ($"/api/review/courses/{id}/decision", new ReviewDecisionRequest("Approve", null)));
        await f.Read<CourseStatusDto>(await f.Client(f.Admin).PostAsync($"/api/admin/courses/{id}/publish", null));
    }

    [Fact]
    public async Task Draft_course_is_invisible_publicly()
    {
        var c = await CreateCourse("Hidden Draft Course");
        var anon = f.Client();
        Assert.Equal(HttpStatusCode.NotFound, (await anon.GetAsync($"/api/courses/{c.Slug}")).StatusCode);
        var list = await f.Read<PagedResult<CourseCardDto>>(await anon.GetAsync("/api/courses?q=Hidden%20Draft"));
        Assert.DoesNotContain(list.Items, x => x.Id == c.Id);
    }

    [Fact]
    public async Task Other_instructor_cannot_edit()
    {
        var c = await CreateCourse("Cross Edit Course");
        var b = f.Client(f.InstructorB);
        var res = await b.PutJ($"/api/studio/courses/{c.Id}", new UpdateCourseRequest("Hijack", null, null, null, null, null, null, null, null, null, null, null));
        Assert.Equal(HttpStatusCode.Forbidden, res.StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await b.PostJ($"/api/studio/courses/{c.Id}/modules", new TitleRequest("x"))).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await b.DeleteAsync($"/api/studio/lessons/{c.Modules[0].Lessons[0].Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await b.PostAsync($"/api/studio/courses/{c.Id}/submit", null)).StatusCode);
    }

    [Fact]
    public async Task Reviewer_cannot_approve_own_course()
    {
        var r = f.Client(f.Reviewer);
        var course = await f.Read<StudioCourseDto>(await r.PostJ("/api/studio/courses", new CreateCourseRequest(
            "Reviewer Own Course", "s", "d", null, null, ["o"], "en", null, null)));
        var mod = await f.Read<StudioModuleDto>(await r.PostJ($"/api/studio/courses/{course.Id}/modules", new TitleRequest("M")));
        var lesson = await f.Read<StudioLessonDto>(await r.PostJ($"/api/studio/modules/{mod.Id}/lessons", new LessonCreateRequest("L", null, null)));
        await f.WithDb(async db =>
        {
            var v = new VideoAsset { YouTubeVideoId = "abcdefghijk", DurationSeconds = 10, Status = VideoStatus.Ready, UploaderId = f.Reviewer.Id };
            db.VideoAssets.Add(v);
            (await db.Lessons.FirstAsync(x => x.Id == lesson.Id)).VideoAssetId = v.Id;
            await db.SaveChangesAsync();
        });
        await f.Read<CourseStatusDto>(await r.PostAsync($"/api/studio/courses/{course.Id}/submit", null));
        var res = await r.PostJ($"/api/review/courses/{course.Id}/decision", new ReviewDecisionRequest("Approve", null));
        Assert.Equal(HttpStatusCode.Forbidden, res.StatusCode);
    }

    [Fact]
    public async Task Submit_fails_when_a_video_is_not_ready()
    {
        var c = await CreateCourse("Unready Video Course", video: VideoStatus.Processing);
        var a = f.Client(f.InstructorA);
        var v = await f.Read<ValidationResultDto>(await a.GetAsync($"/api/studio/courses/{c.Id}/validation"));
        Assert.False(v.Ok);
        Assert.Contains(v.Issues, i => i.Contains("not ready"));
        Assert.Equal(HttpStatusCode.BadRequest, (await a.PostAsync($"/api/studio/courses/{c.Id}/submit", null)).StatusCode);
        await f.WithDb(async db => Assert.Equal(CourseStatus.Draft, (await db.Courses.FirstAsync(x => x.Id == c.Id)).Status));
    }

    [Fact]
    public async Task Full_publication_path_makes_course_visible_with_correct_counts()
    {
        var c = await CreateCourse("Full Path Analytics", modules: 2, lessonsPerModule: 2);
        await f.WithDb(async db =>
        {
            db.Questions.Add(new Question { CourseId = c.Id, ExternalId = "Q1", State = QuestionState.Active, CreatedBy = f.InstructorA.Id });
            db.Questions.Add(new Question { CourseId = c.Id, ExternalId = "Q2", State = QuestionState.Draft, CreatedBy = f.InstructorA.Id });
            db.Packages.Add(new LearningPackage { CourseId = c.Id, Title = "Premium", Contents = "Mocks", Price = 10, IsActive = true, ApprovalStatus = "Approved" });
            db.Packages.Add(new LearningPackage { CourseId = c.Id, Title = "Proposed", Contents = "x", Price = 5, IsActive = true, ApprovalStatus = "Proposed" });
            db.CourseReviews.Add(new CourseReview { CourseId = c.Id, UserId = f.Student.Id, Rating = 4 });
            db.CourseReviews.Add(new CourseReview { CourseId = c.Id, UserId = f.InstructorB.Id, Rating = 1, Hidden = true });
            await db.SaveChangesAsync();
        });
        var a = f.Client(f.InstructorA);
        Assert.Equal(CourseStatus.InReview, (await f.Read<CourseStatusDto>(await a.PostAsync($"/api/studio/courses/{c.Id}/submit", null))).Status);
        // publish before approval is a conflict
        Assert.Equal(HttpStatusCode.Conflict, (await f.Client(f.Admin).PostAsync($"/api/admin/courses/{c.Id}/publish", null)).StatusCode);
        // edits are blocked while in review
        Assert.Equal(HttpStatusCode.Conflict, (await a.PostJ($"/api/studio/courses/{c.Id}/modules", new TitleRequest("x"))).StatusCode);
        var approved = await f.Read<CourseStatusDto>(await f.Client(f.Reviewer).PostJ($"/api/review/courses/{c.Id}/decision", new ReviewDecisionRequest("Approve", "Looks good")));
        Assert.Equal(CourseStatus.Approved, approved.Status);
        Assert.NotNull(approved.ReviewedAt);
        var pub = await f.Read<CourseStatusDto>(await f.Client(f.Admin).PostAsync($"/api/admin/courses/{c.Id}/publish", null));
        Assert.Equal(CourseStatus.Published, pub.Status);
        Assert.NotNull(pub.PublishedAt);

        var anon = f.Client();
        var d = await f.Read<CourseDetailDto>(await anon.GetAsync($"/api/courses/{c.Slug}"));
        Assert.Equal(4, d.VideoCount);
        Assert.Equal(400, d.TotalDurationSeconds);
        Assert.Equal(1, d.QuestionCount);
        Assert.Single(d.Packages);
        Assert.Equal(1, d.RatingCount);
        Assert.Equal(4m, d.RatingAverage);
        Assert.Contains(d.Instructors, i => i.DisplayName == "Instructor A");
        Assert.Equal(2, d.Outcomes.Length);

        var list = await f.Read<PagedResult<CourseCardDto>>(await anon.GetAsync("/api/courses?q=analytics%20full&category=data"));
        Assert.Contains(list.Items, x => x.Id == c.Id && x.VideoCount == 4);
        var cats = await f.Read<List<CategoryDto>>(await anon.GetAsync("/api/categories"));
        Assert.True(cats.Single(x => x.Id == f.CategoryId).CourseCount >= 1);

        // start-update keeps it visible
        Assert.Equal(CourseStatus.Updating, (await f.Read<CourseStatusDto>(await a.PostAsync($"/api/studio/courses/{c.Id}/start-update", null))).Status);
        Assert.Equal(HttpStatusCode.OK, (await anon.GetAsync($"/api/courses/{c.Slug}")).StatusCode);
    }

    [Fact]
    public async Task Archived_course_is_hidden()
    {
        var c = await CreateCourse("Archive Me Course");
        await Publish(c.Id);
        var anon = f.Client();
        Assert.Equal(HttpStatusCode.OK, (await anon.GetAsync($"/api/courses/{c.Slug}")).StatusCode);
        Assert.Equal(CourseStatus.Archived, (await f.Read<CourseStatusDto>(await f.Client(f.Admin).PostAsync($"/api/admin/courses/{c.Id}/archive", null))).Status);
        Assert.Equal(HttpStatusCode.NotFound, (await anon.GetAsync($"/api/courses/{c.Slug}")).StatusCode);
        await f.WithDb(async db => Assert.Equal(2, await db.Lessons.CountAsync(l => db.Modules.Any(m => m.Id == l.ModuleId && m.CourseId == c.Id))));
    }

    [Fact]
    public async Task Reorder_requires_exact_set_of_children()
    {
        var c = await CreateCourse("Reorder Course", modules: 3, lessonsPerModule: 2, video: null);
        var a = f.Client(f.InstructorA);
        var ids = c.Modules.Select(m => m.Id).ToArray();
        Assert.Equal(HttpStatusCode.BadRequest, (await a.PostJ($"/api/studio/courses/{c.Id}/modules/reorder", new ReorderRequest(ids[..2]))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await a.PostJ($"/api/studio/courses/{c.Id}/modules/reorder", new ReorderRequest([ids[0], ids[0], ids[1]]))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await a.PostJ($"/api/studio/courses/{c.Id}/modules/reorder", new ReorderRequest([ids[0], ids[1], Guid.NewGuid()]))).StatusCode);
        var lessonFromOtherModule = c.Modules[1].Lessons[0].Id;
        Assert.Equal(HttpStatusCode.BadRequest, (await a.PostJ($"/api/studio/modules/{c.Modules[0].Id}/lessons/reorder",
            new ReorderRequest([c.Modules[0].Lessons[0].Id, lessonFromOtherModule]))).StatusCode);

        var reversed = ids.Reverse().ToArray();
        Assert.Equal(HttpStatusCode.NoContent, (await a.PostJ($"/api/studio/courses/{c.Id}/modules/reorder", new ReorderRequest(reversed))).StatusCode);
        var after = await f.Read<StudioCourseDto>(await a.GetAsync($"/api/studio/courses/{c.Id}"));
        Assert.Equal(reversed, after.Modules.Select(m => m.Id).ToArray());
    }

    [Fact]
    public async Task Deleting_lesson_keeps_video_asset_and_is_blocked_after_publish_with_enrollments()
    {
        var c = await CreateCourse("Delete Lesson Course", modules: 1, lessonsPerModule: 3);
        var a = f.Client(f.InstructorA);
        var lesson = c.Modules[0].Lessons[2];
        Assert.Equal(HttpStatusCode.NoContent, (await a.DeleteAsync($"/api/studio/lessons/{lesson.Id}")).StatusCode);
        await f.WithDb(async db => Assert.True(await db.VideoAssets.AnyAsync(v => v.Id == lesson.VideoAssetId)));

        await Publish(c.Id);
        await f.WithDb(async db => { db.Enrollments.Add(new Enrollment { CourseId = c.Id, UserId = f.Student.Id }); await db.SaveChangesAsync(); });
        await f.Read<CourseStatusDto>(await a.PostAsync($"/api/studio/courses/{c.Id}/start-update", null));
        Assert.Equal(HttpStatusCode.Conflict, (await a.DeleteAsync($"/api/studio/lessons/{c.Modules[0].Lessons[0].Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.Conflict, (await a.DeleteAsync($"/api/studio/modules/{c.Modules[0].Id}")).StatusCode);
    }

    [Fact]
    public async Task Request_changes_stores_comment_and_slug_code_are_unique()
    {
        var c1 = await CreateCourse("Same Title Course");
        var c2 = await CreateCourse("Same Title Course");
        Assert.NotEqual(c1.Slug, c2.Slug);
        Assert.NotEqual(c1.Code, c2.Code);
        Assert.Contains(c1.Instructors, i => i.Role == CourseInstructorRole.Owner && i.RevenueSharePercent == 100m);

        var a = f.Client(f.InstructorA);
        await f.Read<CourseStatusDto>(await a.PostAsync($"/api/studio/courses/{c1.Id}/submit", null));
        var r = f.Client(f.Reviewer);
        Assert.Equal(HttpStatusCode.BadRequest, (await r.PostJ($"/api/review/courses/{c1.Id}/decision", new ReviewDecisionRequest("RequestChanges", ""))).StatusCode);
        var res = await f.Read<CourseStatusDto>(await r.PostJ($"/api/review/courses/{c1.Id}/decision", new ReviewDecisionRequest("RequestChanges", "Fix lesson 1")));
        Assert.Equal(CourseStatus.ChangesRequested, res.Status);
        var comments = await f.Read<List<ReviewCommentDto>>(await a.GetAsync($"/api/review/courses/{c1.Id}/comments"));
        Assert.Contains(comments, x => x.Body == "Fix lesson 1");
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.InstructorB).GetAsync($"/api/review/courses/{c1.Id}/comments")).StatusCode);
        // editable again after changes requested
        Assert.Equal(HttpStatusCode.OK, (await a.PutJ($"/api/studio/lessons/{c1.Modules[0].Lessons[0].Id}/notes", new LessonNotesRequest("notes", null))).StatusCode);
    }

    // ---------- Live continuity during re-review ----------

    [Fact]
    public async Task Previously_published_course_stays_live_through_re_review_and_PublishedAt_is_first_publish()
    {
        var c = await CreateCourse("Continuity Course");
        var anon = f.Client();
        var a = f.Client(f.InstructorA);

        // Never-published course in review is not live.
        await f.Read<CourseStatusDto>(await a.PostAsync($"/api/studio/courses/{c.Id}/submit", null));
        Assert.Equal(HttpStatusCode.NotFound, (await anon.GetAsync($"/api/courses/{c.Slug}")).StatusCode);
        await f.Read<CourseStatusDto>(await f.Client(f.Reviewer).PostJ($"/api/review/courses/{c.Id}/decision", new ReviewDecisionRequest("Approve", null)));
        Assert.Equal(HttpStatusCode.NotFound, (await anon.GetAsync($"/api/courses/{c.Slug}")).StatusCode);
        var first = await f.Read<CourseStatusDto>(await f.Client(f.Admin).PostAsync($"/api/admin/courses/{c.Id}/publish", null));
        Assert.NotNull(first.PublishedAt);

        async Task AssertLive()
        {
            Assert.Equal(HttpStatusCode.OK, (await anon.GetAsync($"/api/courses/{c.Slug}")).StatusCode);
            var search = await f.Read<PagedResult<CourseCardDto>>(await anon.GetAsync("/api/courses?q=Continuity"));
            Assert.Contains(search.Items, x => x.Id == c.Id);
        }

        await f.Read<CourseStatusDto>(await a.PostAsync($"/api/studio/courses/{c.Id}/start-update", null));
        await AssertLive();
        Assert.Equal(CourseStatus.InReview, (await f.Read<CourseStatusDto>(await a.PostAsync($"/api/studio/courses/{c.Id}/submit", null))).Status);
        await AssertLive();
        Assert.Equal(CourseStatus.ChangesRequested, (await f.Read<CourseStatusDto>(await f.Client(f.Reviewer).PostJ(
            $"/api/review/courses/{c.Id}/decision", new ReviewDecisionRequest("RequestChanges", "Fix it")))).Status);
        await AssertLive();
        await f.Read<CourseStatusDto>(await a.PostAsync($"/api/studio/courses/{c.Id}/submit", null));
        Assert.Equal(CourseStatus.Approved, (await f.Read<CourseStatusDto>(await f.Client(f.Reviewer).PostJ(
            $"/api/review/courses/{c.Id}/decision", new ReviewDecisionRequest("Approve", null)))).Status);
        await AssertLive();

        var second = await f.Read<CourseStatusDto>(await f.Client(f.Admin).PostAsync($"/api/admin/courses/{c.Id}/publish", null));
        Assert.Equal(CourseStatus.Published, second.Status);
        Assert.True(Math.Abs((second.PublishedAt!.Value - first.PublishedAt!.Value).TotalMilliseconds) < 1);
        await f.WithDb(async db => Assert.True((await db.Courses.SingleAsync(x => x.Id == c.Id)).UpdatedAt > first.PublishedAt!.Value.AddMilliseconds(1)));

        await f.Read<CourseStatusDto>(await f.Client(f.Admin).PostAsync($"/api/admin/courses/{c.Id}/archive", null));
        Assert.Equal(HttpStatusCode.NotFound, (await anon.GetAsync($"/api/courses/{c.Slug}")).StatusCode);
    }

    [Fact]
    public void IsLive_rule_matches_spec()
    {
        var p = DateTime.UtcNow;
        Assert.True(Mastemy.Api.Infrastructure.AccessService.IsLive(CourseStatus.Published, p));
        Assert.True(Mastemy.Api.Infrastructure.AccessService.IsLive(CourseStatus.Updating, p));
        foreach (var s in new[] { CourseStatus.InReview, CourseStatus.ChangesRequested, CourseStatus.Approved })
        {
            Assert.True(Mastemy.Api.Infrastructure.AccessService.IsLive(s, p));
            Assert.False(Mastemy.Api.Infrastructure.AccessService.IsLive(s, null));
        }
        Assert.False(Mastemy.Api.Infrastructure.AccessService.IsLive(CourseStatus.Archived, p));
        Assert.False(Mastemy.Api.Infrastructure.AccessService.IsLive(CourseStatus.Draft, null));
    }

    // ---------- Change log for reviewers ----------

    [Fact]
    public async Task Edits_while_updating_are_audited_and_listed_for_reviewers_since_last_publish()
    {
        var c = await CreateCourse("Changes Log Course", modules: 1, lessonsPerModule: 3);
        var a = f.Client(f.InstructorA);
        await Publish(c.Id);
        await f.Read<CourseStatusDto>(await a.PostAsync($"/api/studio/courses/{c.Id}/start-update", null));

        var lesson0 = c.Modules[0].Lessons[0];
        await f.Read<StudioLessonDto>(await a.PutJ($"/api/studio/lessons/{lesson0.Id}/notes", new LessonNotesRequest(null, "Premium secret v2")));
        var deleted = c.Modules[0].Lessons[2];
        Assert.Equal(HttpStatusCode.NoContent, (await a.DeleteAsync($"/api/studio/lessons/{deleted.Id}")).StatusCode);

        var changes = await f.Read<CourseChangesDto>(await f.Client(f.Reviewer).GetAsync($"/api/review/courses/{c.Id}/changes"));
        Assert.NotNull(changes.SinceLastPublishAt);
        // Pre-publish authoring (creates) is not included; only post-publish edits.
        Assert.DoesNotContain(changes.Changes, x => x.Op == "create");
        Assert.Contains(changes.Changes, x => x.Entity == "Lesson" && x.EntityId == lesson0.Id.ToString()
                                              && x.ChangedFields.Contains("premiumNotesMarkdown") && !x.ChangedFields.Contains("notesMarkdown"));
        var del = Assert.Single(changes.Changes, x => x.Op == "delete");
        Assert.Equal(deleted.Id.ToString(), del.EntityId);
        Assert.Contains("\"hadReadyVideo\":true", del.Details);
        Assert.Contains("\"liveUnreviewed\":true", del.Details);
        Assert.Equal(f.InstructorA.Id, del.ActorId);

        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.Student).GetAsync($"/api/review/courses/{c.Id}/changes")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await a.GetAsync($"/api/review/courses/{c.Id}/changes")).StatusCode);
    }

    // ---------- Demoted / suspended instructors ----------

    [Fact]
    public async Task Demoted_or_suspended_course_instructor_loses_edit_access()
    {
        var c = await CreateCourse("Demotion Course", video: null);
        var demoted = new User { Email = $"d{Guid.NewGuid():N}@test.local", DisplayName = "Demoted", PasswordHash = "x" };
        demoted.NormalizedEmail = demoted.Email.ToUpperInvariant();
        demoted.Roles.Add(new UserRole { UserId = demoted.Id, Role = Roles.Instructor });
        await f.WithDb(async db =>
        {
            db.Users.Add(demoted);
            db.CourseInstructors.Add(new CourseInstructor { CourseId = c.Id, UserId = demoted.Id, Role = CourseInstructorRole.CoInstructor });
            await db.SaveChangesAsync();
        });
        var client = f.Client(demoted); // token keeps the Instructor claim
        var req = new UpdateCourseRequest("Demotion Course", "Sub", "d", "a", "p", ["o"], "en", null, null, null, null, null);
        Assert.Equal(HttpStatusCode.OK, (await client.PutJ($"/api/studio/courses/{c.Id}", req)).StatusCode);

        await f.WithDb(async db =>
        {
            db.UserRoles.RemoveRange(db.UserRoles.Where(r => r.UserId == demoted.Id));
            db.UserRoles.Add(new UserRole { UserId = demoted.Id, Role = Roles.Student });
            await db.SaveChangesAsync();
        });
        Assert.Equal(HttpStatusCode.Forbidden, (await client.PutJ($"/api/studio/courses/{c.Id}", req)).StatusCode);

        await f.WithDb(async db =>
        {
            db.UserRoles.Add(new UserRole { UserId = demoted.Id, Role = Roles.Instructor });
            (await db.Users.SingleAsync(u => u.Id == demoted.Id)).IsSuspended = true;
            await db.SaveChangesAsync();
        });
        Assert.Equal(HttpStatusCode.Forbidden, (await client.PutJ($"/api/studio/courses/{c.Id}", req)).StatusCode);
    }
}
