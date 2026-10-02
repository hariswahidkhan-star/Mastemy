using System.Net;
using System.Net.Http.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Resources;
using static Mastemy.Tests.Resources.ResourcesFixture;

namespace Mastemy.Tests.Resources;

/// <summary>Studio resource list filters: ?kind= and ?type= (content-type family or exact type).</summary>
public class ResourceFilterTests(ResourcesFixture fx) : IClassFixture<ResourcesFixture>
{
    [Fact]
    public async Task Studio_list_filters_by_kind_and_content_type()
    {
        var (ownerId, owner) = await fx.User(Roles.Instructor);
        var (_, stranger) = await fx.User(Roles.Instructor);
        var (course, lessonId) = await fx.Course(ownerId);
        ResourceFile F(string name, string type, string kind = ResourceKinds.Resource) => new()
        {
            CourseId = course.Id, LessonId = lessonId, FileName = name, ContentType = type, Kind = kind, SizeBytes = 1, Sha256 = Guid.NewGuid().ToString("N"),
            StorageKey = "k/" + Guid.NewGuid().ToString("N"),
        };
        await fx.WithDb(async db =>
        {
            db.ResourceFiles.AddRange(F("a.png", "image/png"), F("b.jpg", "image/jpeg"), F("c.pdf", "application/pdf"),
                F("en.vtt", "text/vtt", ResourceKinds.Caption), F("gone.png", "image/png") );
            await db.SaveChangesAsync();
            var gone = db.ResourceFiles.Local.Single(r => r.FileName == "gone.png");
            gone.DeletedAt = DateTime.UtcNow;
            await db.SaveChangesAsync();
        });
        var url = $"/api/studio/courses/{course.Id}/resources";
        async Task<List<string>> Names(string q) =>
            (await owner.GetFromJsonAsync<List<ResourceDto>>(url + q, Json))!.Select(r => r.FileName).OrderBy(n => n).ToList();

        Assert.Equal(["a.png", "b.jpg", "c.pdf", "en.vtt"], await Names(""));
        Assert.Equal(["a.png", "b.jpg"], await Names("?type=image"));
        Assert.Equal(["a.png", "b.jpg"], await Names("?kind=resource&type=IMAGE"));
        Assert.Equal(["c.pdf"], await Names("?type=application/pdf"));
        Assert.Equal(["en.vtt"], await Names("?kind=Caption"));
        Assert.Empty(await Names("?kind=Caption&type=image"));
        Assert.Equal(HttpStatusCode.BadRequest, (await owner.GetAsync(url + "?type=pictures")).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await owner.GetAsync(url + "?kind=Video")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await stranger.GetAsync(url + "?type=image")).StatusCode);
    }
}
