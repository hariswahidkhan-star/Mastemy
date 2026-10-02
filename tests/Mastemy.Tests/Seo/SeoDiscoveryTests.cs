using System.Net;
using System.Xml.Linq;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Taxonomy;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.Seo;

/// <summary>Fixture with discovery content: academies, certifications, pathways, collections and instructors (public and not).</summary>
public sealed class SeoDiscoveryFixture : IAsyncLifetime
{
    private readonly string _dbName = "mastemy_t_" + Guid.NewGuid().ToString("N");
    public WebApplicationFactory<Program> Factory { get; private set; } = null!;
    public Guid PublicInstructorId { get; private set; }
    public Guid HiddenInstructorId { get; private set; }

    public async Task InitializeAsync()
    {
        var host = Environment.GetEnvironmentVariable("MASTEMY_TEST_MYSQL") ?? "Server=localhost;Port=3306;User=mastemy;Password=mastemy_dev_pw";
        Factory = new WebApplicationFactory<Program>().WithWebHostBuilder(b =>
        {
            b.UseSetting("ConnectionStrings:Default", $"{host};Database={_dbName}");
            b.UseSetting("Jwt:Key", "seo-tests-signing-key-0123456789-abcdefghijklmnopqrs");
            b.UseSetting("Security:RequireMfaForPrivileged", "false");
            b.UseSetting("Database:MigrateOnStartup", "false");
            b.UseSetting("Seed:Enabled", "false");
            b.UseSetting("Taxonomy:DailyJobEnabled", "false");
            b.UseSetting("Seo:PublicBaseUrl", "https://mastemy.example");
        });
        using var scope = Factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        await db.Database.EnsureCreatedAsync();

        User U(string email, params string[] roles)
        {
            var u = new User { Email = email, NormalizedEmail = email, DisplayName = email, PasswordHash = "x" };
            u.Roles.AddRange(roles.Select(r => new UserRole { UserId = u.Id, Role = r }));
            db.Users.Add(u);
            return u;
        }
        var teacher = U("teacher@t.local", Roles.Instructor);
        var draftOnly = U("draftonly@t.local", Roles.Instructor);
        PublicInstructorId = teacher.Id; HiddenInstructorId = draftOnly.Id;

        var academy = new Category { Slug = "ai-academy", NameEn = "AI", NameAr = "AI", SortOrder = 1, IsAcademy = true };
        var emptyAcademy = new Category { Slug = "empty-academy", NameEn = "Empty", NameAr = "Empty", SortOrder = 2, IsAcademy = true };
        db.Categories.AddRange(academy, emptyAcademy);
        await db.SaveChangesAsync();
        var child = new Category { Slug = "ml", NameEn = "ML", NameAr = "ML", SortOrder = 3, ParentId = academy.Id };
        db.Categories.Add(child);
        await db.SaveChangesAsync();

        var now = DateTime.UtcNow;
        var live = new Course { Slug = "ml-course", Code = "MLC", Title = "ML", OwnerId = teacher.Id, Status = CourseStatus.Published, PublishedAt = now.AddDays(-2), UpdatedAt = now.AddDays(-1) };
        var draft = new Course { Slug = "draft-ml", Code = "DML", Title = "Draft", OwnerId = draftOnly.Id, Status = CourseStatus.Draft, UpdatedAt = now };
        db.Courses.AddRange(live, draft);
        db.CourseInstructors.Add(new CourseInstructor { CourseId = live.Id, UserId = teacher.Id, Role = CourseInstructorRole.Owner, RevenueSharePercent = 100 });
        db.CourseInstructors.Add(new CourseInstructor { CourseId = draft.Id, UserId = draftOnly.Id, Role = CourseInstructorRole.Owner, RevenueSharePercent = 100 });
        db.CourseCategories.Add(new CourseCategory { CourseId = live.Id, CategoryId = child.Id }); // via descendant
        db.CourseCategories.Add(new CourseCategory { CourseId = draft.Id, CategoryId = emptyAcademy.Id });

        var issuer = new CertificationIssuer { Name = "Issuer", Country = "US" };
        db.Set<CertificationIssuer>().Add(issuer);
        db.Set<Certification>().AddRange(
            new Certification { IssuerId = issuer.Id, Slug = "fresh-cert", Title = "Fresh", State = CertificationState.Verified, ReviewerId = teacher.Id, LastCheckedAt = now.AddDays(-5) },
            new Certification { IssuerId = issuer.Id, Slug = "stale-cert", Title = "Stale", State = CertificationState.Verified, ReviewerId = teacher.Id, LastCheckedAt = now.AddYears(-3) },
            new Certification { IssuerId = issuer.Id, Slug = "candidate-cert", Title = "Candidate", State = CertificationState.ResearchCandidate });

        var path = new Pathway { Slug = "ml-path", TitleEn = "ML path", IsPublished = true };
        var emptyPath = new Pathway { Slug = "empty-path", TitleEn = "Empty", IsPublished = true };
        var unpublished = new Pathway { Slug = "hidden-path", TitleEn = "Hidden", IsPublished = false };
        db.Set<Pathway>().AddRange(path, emptyPath, unpublished);
        db.Set<PathwayCourse>().AddRange(new PathwayCourse { PathwayId = path.Id, CourseId = live.Id },
            new PathwayCourse { PathwayId = emptyPath.Id, CourseId = draft.Id }, new PathwayCourse { PathwayId = unpublished.Id, CourseId = live.Id });

        var col = new Collection { Slug = "picks", TitleEn = "Picks" };
        var expired = new Collection { Slug = "old-picks", TitleEn = "Old", ActiveTo = now.AddDays(-1) };
        var emptyCol = new Collection { Slug = "empty-picks", TitleEn = "Empty" };
        db.Set<Collection>().AddRange(col, expired, emptyCol);
        db.Set<CollectionCourse>().AddRange(new CollectionCourse { CollectionId = col.Id, CourseId = live.Id },
            new CollectionCourse { CollectionId = expired.Id, CourseId = live.Id }, new CollectionCourse { CollectionId = emptyCol.Id, CourseId = draft.Id });
        await db.SaveChangesAsync();
    }

    public async Task DisposeAsync()
    {
        try
        {
            using var scope = Factory.Services.CreateScope();
            await scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.EnsureDeletedAsync();
        }
        finally { await Factory.DisposeAsync(); }
    }
}

public class SeoDiscoveryTests(SeoDiscoveryFixture fx) : IClassFixture<SeoDiscoveryFixture>
{
    private static readonly XNamespace Sm = "http://www.sitemaps.org/schemas/sitemap/0.9";
    private const string B = "https://mastemy.example";

    private async Task<List<string>> Locs()
    {
        var res = await fx.Factory.CreateClient().GetAsync("/sitemap.xml");
        var body = await res.Content.ReadAsStringAsync();
        Assert.True(res.IsSuccessStatusCode, body);
        return XDocument.Parse(body).Root!.Elements(Sm + "url").Select(u => u.Element(Sm + "loc")!.Value).ToList();
    }

    [Fact]
    public async Task Sitemap_lists_static_discovery_routes_with_arabic_alternates()
    {
        var locs = await Locs();
        foreach (var p in new[] { "/categories", "/certifications", "/pathways", "/instructors", "/packages", "/practice", "/notes-library",
                     "/business", "/articles", "/bestseller-rule", "/plans", "/bundles" })
        {
            Assert.Contains(B + p, locs);
            Assert.Contains(B + p + "?lang=ar", locs);
        }
        Assert.Equal(locs.Count, locs.Distinct().Count());
    }

    [Fact]
    public async Task Sitemap_lists_only_public_dynamic_discovery_pages()
    {
        var locs = await Locs();
        Assert.Contains(B + "/academies/ai-academy", locs);
        Assert.Contains(B + "/academies/ai-academy?lang=ar", locs);
        Assert.DoesNotContain(B + "/academies/empty-academy", locs);
        Assert.Contains(B + "/certifications/fresh-cert", locs);
        Assert.DoesNotContain(locs, l => l.Contains("stale-cert") || l.Contains("candidate-cert"));
        Assert.Contains(B + "/pathways/ml-path", locs);
        Assert.DoesNotContain(locs, l => l.Contains("empty-path") || l.Contains("hidden-path"));
        Assert.Contains(B + "/collections/picks", locs);
        Assert.DoesNotContain(locs, l => l.Contains("old-picks") || l.Contains("empty-picks"));
        foreach (var a in new[] { "free-video-and-paid-study-services", "how-mcq-certificates-work", "prepare-for-a-certification-exam" })
            Assert.Contains($"{B}/articles/{a}?lang=ar", locs);
        Assert.Contains($"{B}/instructors/{fx.PublicInstructorId}", locs);
        Assert.DoesNotContain(locs, l => l.Contains(fx.HiddenInstructorId.ToString()));
    }

    [Fact]
    public async Task Robots_disallows_transactional_and_staff_areas()
    {
        var res = await fx.Factory.CreateClient().GetAsync("/robots.txt");
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        var body = await res.Content.ReadAsStringAsync();
        foreach (var p in new[] { "/checkout", "/gift", "/orgs", "/staff", "/review", "/practice/session" })
            Assert.Contains($"Disallow: {p}\n", body);
        Assert.DoesNotContain("Disallow: /practice\n", body);
    }
}
