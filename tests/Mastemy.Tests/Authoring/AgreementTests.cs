using System.Net;
using Mastemy.Api.Modules.Authoring;
using Mastemy.Api.Modules.Catalog;

namespace Mastemy.Tests.Authoring;

/// <summary>Own fixture: publishing an agreement affects every later submit in the database.</summary>
public class AgreementTests(AuthoringFixture f) : IClassFixture<AuthoringFixture>
{
    [Fact]
    public async Task Current_agreement_must_be_accepted_before_submit()
    {
        var c = await f.CreateCourse("Agreement Course");
        var a = f.Client(f.Owner);
        Assert.False((await f.Read<MyAgreementDto>(await a.GetAsync("/api/studio/agreement"))).Required);

        Assert.Equal(HttpStatusCode.Forbidden, (await f.Post(a, "/api/admin/agreements", new CreateAgreementRequest("2026-10", "Terms", "Body"))).StatusCode);
        var admin = f.Client(f.Admin);
        await f.Read<AgreementDto>(await f.Post(admin, "/api/admin/agreements", new CreateAgreementRequest("2026-10", "Instructor terms", "You own your content...")));
        Assert.Equal(HttpStatusCode.Conflict, (await f.Post(admin, "/api/admin/agreements", new CreateAgreementRequest("2026-10", "Dup", "x"))).StatusCode);

        var mine = await f.Read<MyAgreementDto>(await a.GetAsync("/api/studio/agreement"));
        Assert.True(mine.Required);
        Assert.False(mine.Accepted);
        var blocked = await a.PostAsync($"/api/studio/courses/{c.Id}/submit", null);
        Assert.Equal(HttpStatusCode.Conflict, blocked.StatusCode);
        Assert.Contains("agreement_required", await blocked.Content.ReadAsStringAsync());

        Assert.Equal(HttpStatusCode.Conflict, (await f.Post(a, "/api/studio/agreement/accept", new AcceptAgreementRequest("old"))).StatusCode);
        var accepted = await f.Read<MyAgreementDto>(await f.Post(a, "/api/studio/agreement/accept", new AcceptAgreementRequest("2026-10")));
        Assert.True(accepted.Accepted);
        await f.Read<MyAgreementDto>(await f.Post(a, "/api/studio/agreement/accept", new AcceptAgreementRequest("2026-10"))); // idempotent
        await f.Read<CourseStatusDto>(await a.PostAsync($"/api/studio/courses/{c.Id}/submit", null));

        // A new version supersedes the old acceptance.
        await Task.Delay(1100);
        await f.Read<AgreementDto>(await f.Post(admin, "/api/admin/agreements", new CreateAgreementRequest("2027-01", "Instructor terms v2", "Updated")));
        var c2 = await f.CreateCourse("Agreement Course 2");
        Assert.Equal(HttpStatusCode.Conflict, (await a.PostAsync($"/api/studio/courses/{c2.Id}/submit", null)).StatusCode);
    }
}
