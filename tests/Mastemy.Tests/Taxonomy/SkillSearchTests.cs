using System.Net;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Catalog;
using Mastemy.Api.Modules.Taxonomy;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.Taxonomy;

public class SkillSearchTests(TaxonomyFixture f) : IClassFixture<TaxonomyFixture>
{
    private async Task<SkillDto> Skill(string code, string name, int? parent = null) =>
        await TaxonomyFixture.Read<SkillDto>(await f.Client(f.Admin).PostJ("/api/admin/skills", new SkillUpsertRequest(code, name, null, parent, true)));

    private async Task<CourseSearchResultDto> Search(string qs) =>
        await TaxonomyFixture.Read<CourseSearchResultDto>(await f.Client().GetAsync("/api/courses?" + qs));

    [Fact]
    public async Task Skill_crud_is_staff_only_and_validated()
    {
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.InstructorA).PostJ("/api/admin/skills", new SkillUpsertRequest("x", "X", null, null, null))).StatusCode);
        Assert.Equal(HttpStatusCode.Unauthorized, (await f.Client().PostJ("/api/admin/skills", new SkillUpsertRequest("x", "X", null, null, null))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await f.Client(f.Admin).PostJ("/api/admin/skills", new SkillUpsertRequest("bad code!", "X", null, null, null))).StatusCode);
        var s = await Skill("crud.one", "Crud One");
        Assert.Equal(HttpStatusCode.Conflict, (await f.Client(f.Admin).PostJ("/api/admin/skills", new SkillUpsertRequest("crud.one", "Again", null, null, null))).StatusCode);
        var child = await Skill("crud.child", "Crud Child", s.Id);
        // cycle
        Assert.Equal(HttpStatusCode.BadRequest, (await f.Client(f.Admin).PutJ($"/api/admin/skills/{s.Id}", new SkillUpsertRequest("crud.one", "Crud One", null, child.Id, true))).StatusCode);
    }

    [Fact]
    public async Task Course_skills_are_author_edited_and_public_only_after_publish()
    {
        await Skill("sql", "SQL Querying");
        var course = await f.AddCourse("Skillful Course", f.InstructorA.Id);
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.InstructorB).PutJ($"/api/studio/courses/{course.Id}/skills", new CourseSkillsRequest(["sql"]))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await f.Client(f.InstructorA).PutJ($"/api/studio/courses/{course.Id}/skills", new CourseSkillsRequest(["nope"]))).StatusCode);
        var working = await TaxonomyFixture.Read<List<SkillDto>>(await f.Client(f.InstructorA).PutJ($"/api/studio/courses/{course.Id}/skills", new CourseSkillsRequest(["sql"])));
        Assert.Single(working);

        // Not visible publicly until the next publish (snapshot-safe).
        var pub = await TaxonomyFixture.Read<CourseTaxonomyDto>(await f.Client().GetAsync($"/api/courses/{course.Slug}/taxonomy"));
        Assert.Empty(pub.Skills);
        Assert.Equal(0, (await Search("skill=sql")).Total);
        await f.Republish(course.Id);
        pub = await TaxonomyFixture.Read<CourseTaxonomyDto>(await f.Client().GetAsync($"/api/courses/{course.Slug}/taxonomy"));
        Assert.Equal("sql", Assert.Single(pub.Skills).Code);
        Assert.Contains((await Search("skill=sql")).Items, c => c.Id == course.Id);

        // Removal also waits for publish.
        await TaxonomyFixture.Read<List<SkillDto>>(await f.Client(f.InstructorA).PutJ($"/api/studio/courses/{course.Id}/skills", new CourseSkillsRequest([])));
        pub = await TaxonomyFixture.Read<CourseTaxonomyDto>(await f.Client().GetAsync($"/api/courses/{course.Slug}/taxonomy"));
        Assert.Single(pub.Skills);
        await f.Republish(course.Id);
        pub = await TaxonomyFixture.Read<CourseTaxonomyDto>(await f.Client().GetAsync($"/api/courses/{course.Slug}/taxonomy"));
        Assert.Empty(pub.Skills);

        // Draft courses never expose taxonomy.
        var draft = await f.AddCourse("Draft Course", f.InstructorA.Id, live: false);
        Assert.Equal(HttpStatusCode.NotFound, (await f.Client().GetAsync($"/api/courses/{draft.Slug}/taxonomy")).StatusCode);
    }

    [Fact]
    public async Task Unknown_question_skill_codes_are_reported_not_blocked()
    {
        await Skill("known.code", "Known");
        var course = await f.AddCourse("Question Codes", f.InstructorA.Id, live: false);
        await f.WithDb(async db =>
        {
            foreach (var code in new[] { "known.code", "mystery.code" })
            {
                var q = new Question { CourseId = course.Id, ExternalId = code, CreatedBy = f.InstructorA.Id };
                q.Versions.Add(new QuestionVersion { QuestionId = q.Id, Version = 1, Stem = "s", SkillCode = code });
                db.Questions.Add(q);
            }
            await db.SaveChangesAsync();
        });
        var rep = await TaxonomyFixture.Read<List<UnknownSkillCodeDto>>(await f.Client(f.Reviewer).GetAsync("/api/admin/skills/unknown-question-codes"));
        Assert.Contains(rep, r => r.Code == "mystery.code" && r.QuestionCount == 1);
        Assert.DoesNotContain(rep, r => r.Code == "known.code");
    }

    [Fact]
    public async Task Suggestions_are_prefix_based_and_capped_at_eight()
    {
        for (var i = 0; i < 10; i++) await f.AddCourse($"Zebra Analytics {i}", f.InstructorA.Id);
        await f.AddCourse("Middle Zebra Words", f.InstructorA.Id);
        var draft = await f.AddCourse("Zebra Secret Draft", f.InstructorA.Id, live: false);
        var s = await TaxonomyFixture.Read<List<SuggestionDto>>(await f.Client().GetAsync("/api/search/suggestions?q=zeb"));
        Assert.Equal(8, s.Count);
        Assert.DoesNotContain(s, x => x.Key == draft.Slug);
        Assert.All(s, x => Assert.Contains("zebra", x.Text, StringComparison.OrdinalIgnoreCase));
        Assert.Empty(await TaxonomyFixture.Read<List<SuggestionDto>>(await f.Client().GetAsync("/api/search/suggestions?q=z")));
        await Skill("zeb.skill", "Zebrafish Biology");
        s = await TaxonomyFixture.Read<List<SuggestionDto>>(await f.Client().GetAsync("/api/search/suggestions?q=zebraf"));
        Assert.Contains(s, x => x.Kind == "skill" && x.Key == "zeb.skill");
        // word-prefix match inside a title
        s = await TaxonomyFixture.Read<List<SuggestionDto>>(await f.Client().GetAsync("/api/search/suggestions?q=word"));
        Assert.Contains(s, x => x.Text == "Middle Zebra Words");
    }

    [Fact]
    public async Task Misspelled_query_returns_did_you_mean()
    {
        var c = await f.AddCourse("Kubernetes Operations", f.InstructorA.Id);
        f.Factory.Services.CreateScope().ServiceProvider.GetRequiredService<CatalogQueryService>().InvalidateVocabulary();
        var r = await Search("q=kubernets");
        Assert.Equal("kubernetes", r.DidYouMean);
        Assert.Contains(r.Items, x => x.Id == c.Id);
        var exact = await Search("q=kubernetes");
        Assert.Null(exact.DidYouMean);
        var none = await Search("q=qqqqqqqqqq");
        Assert.Null(none.DidYouMean);
        Assert.Equal(0, none.Total);
    }

    [Fact]
    public async Task Levenshtein_limits()
    {
        Assert.Equal(1, CatalogQueryService.Levenshtein("pyton", "python"));
        Assert.Equal("python", CatalogQueryService.Closest("pyhton", ["python", "pytorch"]));
        Assert.Null(CatalogQueryService.Closest("abcdefg", ["python"]));
        Assert.Equal("sql", CatalogQueryService.Closest("sqk", ["sql"]));
        Assert.Null(CatalogQueryService.Closest("sqxx", ["sql"])); // short terms tolerate only one edit
        await Task.CompletedTask;
    }

    [Fact]
    public async Task Extended_filters()
    {
        var inst = await f.NewUser("Filter Instructor", Roles.Instructor);
        var shortC = await f.AddCourse("Filterable Short", inst.Id, durationSeconds: 1800);
        var longC = await f.AddCourse("Filterable Long", inst.Id, durationSeconds: 8 * 3600, publishedDaysAgo: 60);
        var other = await f.AddCourse("Filterable Other", f.InstructorB.Id, durationSeconds: 3 * 3600);
        var reviewer1 = await f.NewUser("R1", Roles.Student);
        await f.WithDb(async db =>
        {
            db.CourseReviews.Add(new CourseReview { CourseId = shortC.Id, UserId = reviewer1.Id, Rating = 5 });
            db.CourseReviews.Add(new CourseReview { CourseId = longC.Id, UserId = reviewer1.Id, Rating = 2 });
            db.CourseReviews.Add(new CourseReview { CourseId = other.Id, UserId = reviewer1.Id, Rating = 5, Hidden = true });
            db.Packages.Add(new LearningPackage { CourseId = shortC.Id, Title = "P", Price = 20, IsActive = true, ApprovalStatus = "Approved" });
            db.Packages.Add(new LearningPackage { CourseId = shortC.Id, Title = "P2", Price = 5, IsActive = false, ApprovalStatus = "Approved" });
            db.Packages.Add(new LearningPackage { CourseId = longC.Id, Title = "P", Price = 80, IsActive = true, ApprovalStatus = "Approved" });
            await db.SaveChangesAsync();
        });
        var ids = async (string qs) => (await Search("q=filterable&" + qs)).Items.Select(x => x.Id).ToHashSet();

        Assert.Equal(new HashSet<Guid> { shortC.Id, longC.Id }, await ids($"instructor={inst.Id}"));
        Assert.Equal(new HashSet<Guid> { shortC.Id }, await ids("duration=short"));
        Assert.Equal(new HashSet<Guid> { other.Id }, await ids("duration=medium"));
        Assert.Equal(new HashSet<Guid> { longC.Id }, await ids("duration=long"));
        Assert.Equal(HttpStatusCode.BadRequest, (await f.Client().GetAsync("/api/courses?duration=forever")).StatusCode);
        Assert.Equal(new HashSet<Guid> { shortC.Id, other.Id }, await ids("updatedWithinDays=30"));
        Assert.Equal(new HashSet<Guid> { shortC.Id }, await ids("minRating=4")); // hidden reviews never count
        Assert.Equal(new HashSet<Guid> { shortC.Id }, await ids("maxPrice=50")); // inactive cheaper package ignored
        Assert.Equal(new HashSet<Guid> { longC.Id }, await ids("minPrice=21"));
        Assert.Empty(await ids("maxPrice=10"));
        Assert.Equal(HttpStatusCode.BadRequest, (await f.Client().GetAsync("/api/courses?minRating=9")).StatusCode);

        // certification filter: only publicly visible certifications count
        var iss = await TaxonomyFixture.Read<IssuerDto>(await f.Client(f.Reviewer).PostJ("/api/admin/certification-issuers", new IssuerUpsertRequest("Filter Issuer", null, null)));
        var cert = await TaxonomyFixture.Read<CertificationAdminDto>(await f.Client(f.Reviewer).PostJ("/api/admin/certifications",
            new CertificationUpsertRequest(iss.Id, "Filter Cert", "filter-cert", "Global", "FC-1", "", "", null, null, "", "https://x.example/c",
                DateTime.UtcNow.AddDays(-1), "", "", "", CertificationKind.Examination, false, null, null)));
        await f.Client(f.Reviewer).PutAsync($"/api/admin/certifications/{cert.Id}/courses/{longC.Id}", null);
        Assert.Empty(await ids("certification=filter-cert"));
        Assert.True((await f.Client(f.Reviewer2).PostJ($"/api/admin/certifications/{cert.Id}/state", new CertificationStateRequest(CertificationState.Verified, null))).IsSuccessStatusCode);
        Assert.Equal(new HashSet<Guid> { longC.Id }, await ids("certification=filter-cert"));
        Assert.Equal(new HashSet<Guid> { longC.Id }, await ids("certification=FC-1"));
    }
}
