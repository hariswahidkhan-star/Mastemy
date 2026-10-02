using System.Net;
using Mastemy.Api.Modules.Taxonomy;

namespace Mastemy.Tests.Taxonomy;

public class BacklogTests(TaxonomyFixture f) : IClassFixture<TaxonomyFixture>
{
    private static string RoadmapPath()
    {
        var dir = new DirectoryInfo(AppContext.BaseDirectory);
        while (dir is not null && !File.Exists(Path.Combine(dir.FullName, "docs", "course-roadmap.md"))) dir = dir.Parent;
        return Path.Combine(dir!.FullName, "docs", "course-roadmap.md");
    }

    [Fact]
    public async Task Roadmap_import_creates_100_ideas_idempotently_and_is_staff_only()
    {
        var md = await File.ReadAllTextAsync(RoadmapPath());
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.Reviewer).PostJ("/api/admin/course-ideas/import-roadmap", new RoadmapImportRequest(md))).StatusCode);
        Assert.Equal(HttpStatusCode.Unauthorized, (await f.Client().PostJ("/api/admin/course-ideas/import-roadmap", new RoadmapImportRequest(md))).StatusCode);
        var r = await TaxonomyFixture.Read<RoadmapImportResultDto>(await f.Client(f.Admin).PostJ("/api/admin/course-ideas/import-roadmap", new RoadmapImportRequest(md)));
        Assert.Equal((100, 100, 0), (r.Parsed, r.Created, r.Skipped));
        var again = await TaxonomyFixture.Read<RoadmapImportResultDto>(await f.Client(f.Admin).PostJ("/api/admin/course-ideas/import-roadmap", new RoadmapImportRequest(md)));
        Assert.Equal((100, 0, 100), (again.Parsed, again.Created, again.Skipped));
        var ideas = await TaxonomyFixture.Read<List<CourseIdeaDto>>(await f.Client(f.Admin).GetAsync("/api/admin/course-ideas?state=Idea"));
        Assert.True(ideas.Count >= 100);
        var first = Assert.Single(ideas, i => i.RoadmapRank == 1);
        Assert.Equal("AI Essentials for Professionals", first.Title);
        // Never public: no idea title leaks into the catalog or home.
        var home = await (await f.Client().GetAsync("/api/home")).Content.ReadAsStringAsync();
        Assert.DoesNotContain("AI Essentials for Professionals", home);
        var courses = await (await f.Client().GetAsync("/api/courses?q=essentials")).Content.ReadAsStringAsync();
        Assert.DoesNotContain("AI Essentials for Professionals", courses);
        Assert.Equal(HttpStatusCode.BadRequest, (await f.Client(f.Admin).PostJ("/api/admin/course-ideas/import-roadmap", new RoadmapImportRequest("no table here"))).StatusCode);
    }

    [Fact]
    public async Task Idea_state_rules()
    {
        var admin = f.Client(f.Admin);
        var idea = await TaxonomyFixture.Read<CourseIdeaDto>(await admin.PostJ("/api/admin/course-ideas",
            new CourseIdeaUpsertRequest("State Rule Idea", "Analysts", "Gap", "Survey of 40 learners", "AI", null, null, null, null, "Quarterly tool updates", 50)));
        Task<HttpResponseMessage> Move(CourseIdeaState s) => admin.PostJ($"/api/admin/course-ideas/{idea.Id}/state", new CourseIdeaStateRequest(s, null));

        Assert.Equal(HttpStatusCode.Conflict, (await Move(CourseIdeaState.Approved)).StatusCode);   // must validate first
        Assert.True((await Move(CourseIdeaState.Validating)).IsSuccessStatusCode);
        var noOwner = await Move(CourseIdeaState.Approved);
        Assert.Equal(HttpStatusCode.Conflict, noOwner.StatusCode);
        Assert.Contains("owner", await noOwner.Content.ReadAsStringAsync());
        var course = await f.AddCourse("Idea Course", f.InstructorA.Id, live: false);
        await TaxonomyFixture.Read<CourseIdeaDto>(await admin.PutJ($"/api/admin/course-ideas/{idea.Id}",
            new CourseIdeaUpsertRequest("State Rule Idea", "Analysts", "Gap", "Survey", "AI", f.Admin.Id, f.InstructorA.Id, course.Id, null, null, 50)));
        Assert.True((await Move(CourseIdeaState.Approved)).IsSuccessStatusCode);
        Assert.True((await Move(CourseIdeaState.InProduction)).IsSuccessStatusCode);
        Assert.Equal(HttpStatusCode.Conflict, (await Move(CourseIdeaState.Published)).StatusCode); // course not live
        Assert.Equal(HttpStatusCode.Conflict, (await admin.DeleteAsync($"/api/admin/course-ideas/{idea.Id}")).StatusCode);
        await f.WithDb(async db =>
        {
            var c = await db.Courses.FindAsync(course.Id);
            c!.Status = Mastemy.Api.Domain.CourseStatus.Published; c.PublishedAt = DateTime.UtcNow;
            await db.SaveChangesAsync();
        });
        Assert.True((await Move(CourseIdeaState.Published)).IsSuccessStatusCode);
        Assert.Equal(HttpStatusCode.Conflict, (await Move(CourseIdeaState.Rejected)).StatusCode); // published is terminal

        var other = await TaxonomyFixture.Read<CourseIdeaDto>(await admin.PostJ("/api/admin/course-ideas",
            new CourseIdeaUpsertRequest("Rejectable Idea", null, null, null, null, null, null, null, null, null, null)));
        Assert.True((await admin.PostJ($"/api/admin/course-ideas/{other.Id}/state", new CourseIdeaStateRequest(CourseIdeaState.Rejected, "No demand"))).IsSuccessStatusCode);
        Assert.True((await admin.PostJ($"/api/admin/course-ideas/{other.Id}/state", new CourseIdeaStateRequest(CourseIdeaState.Idea, "Reopened"))).IsSuccessStatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.InstructorA).GetAsync("/api/admin/course-ideas")).StatusCode);
        Assert.Equal(HttpStatusCode.Conflict, (await admin.PostJ("/api/admin/course-ideas",
            new CourseIdeaUpsertRequest("Rejectable Idea", null, null, null, null, null, null, null, null, null, null))).StatusCode);
    }

    [Fact]
    public void Transition_table()
    {
        Assert.True(BacklogService.CanTransition(CourseIdeaState.Idea, CourseIdeaState.Validating));
        Assert.False(BacklogService.CanTransition(CourseIdeaState.Idea, CourseIdeaState.Published));
        Assert.False(BacklogService.CanTransition(CourseIdeaState.Published, CourseIdeaState.Idea));
        Assert.True(BacklogService.CanTransition(CourseIdeaState.Rejected, CourseIdeaState.Idea));
    }
}
