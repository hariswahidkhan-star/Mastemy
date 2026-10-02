using System.Net;
using System.Xml.Linq;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.Seo;

/// <summary>Real-MySQL fixture with a mix of live, draft and archived courses.</summary>
public sealed class SeoFixture : IAsyncLifetime
{
    private readonly string _dbName = "mastemy_t_" + Guid.NewGuid().ToString("N");
    public WebApplicationFactory<Program> Factory { get; private set; } = null!;
    public WebApplicationFactory<Program> Unconfigured { get; private set; } = null!;
    public static readonly DateTime Updated = new(2026, 9, 1, 10, 0, 0, DateTimeKind.Utc);

    private WebApplicationFactory<Program> Build(string conn, string? baseUrl) =>
        new WebApplicationFactory<Program>().WithWebHostBuilder(b =>
        {
            b.UseSetting("ConnectionStrings:Default", conn);
            b.UseSetting("Jwt:Key", "seo-tests-signing-key-0123456789-abcdefghijklmnopqrs");
            b.UseSetting("Database:MigrateOnStartup", "false");
            b.UseSetting("Seed:Enabled", "false");
            b.UseSetting("Seo:PublicBaseUrl", baseUrl ?? "");
        });

    public async Task InitializeAsync()
    {
        var host = Environment.GetEnvironmentVariable("MASTEMY_TEST_MYSQL") ?? "Server=localhost;Port=3306;User=mastemy;Password=mastemy_dev_pw";
        var conn = $"{host};Database={_dbName}";
        Factory = Build(conn, "https://mastemy.example/");
        Unconfigured = Build(conn, null);
        using var scope = Factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        await db.Database.EnsureCreatedAsync();
        var owner = new User { Email = "o@t.local", NormalizedEmail = "O@T.LOCAL", DisplayName = "Owner", PasswordHash = "x" };
        db.Users.Add(owner);
        var live = new Category { Slug = "data", NameEn = "Data", NameAr = "بيانات", SortOrder = 1 };
        var empty = new Category { Slug = "empty-cat", NameEn = "Empty", NameAr = "فارغ", SortOrder = 2 };
        db.Categories.AddRange(live, empty);
        await db.SaveChangesAsync();
        Course C(string slug, CourseStatus s, DateTime? published) => new()
        {
            Slug = slug, Code = slug.ToUpperInvariant(), Title = slug, OwnerId = owner.Id, Status = s,
            PublishedAt = published, UpdatedAt = Updated,
        };
        var pub = C("live-course", CourseStatus.Published, Updated.AddDays(-10));
        var updating = C("updating-course", CourseStatus.InReview, Updated.AddDays(-20));
        var draft = C("draft-course", CourseStatus.Draft, null);
        var archived = C("archived-course", CourseStatus.Archived, Updated.AddDays(-30));
        db.Courses.AddRange(pub, updating, draft, archived);
        db.CourseCategories.Add(new CourseCategory { CourseId = pub.Id, CategoryId = live.Id });
        db.CourseCategories.Add(new CourseCategory { CourseId = draft.Id, CategoryId = empty.Id });
        await db.SaveChangesAsync();
    }

    public async Task DisposeAsync()
    {
        try
        {
            using var scope = Factory.Services.CreateScope();
            await scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.EnsureDeletedAsync();
        }
        finally
        {
            await Factory.DisposeAsync();
            await Unconfigured.DisposeAsync();
        }
    }
}

public class SeoTests(SeoFixture fx) : IClassFixture<SeoFixture>
{
    private static readonly XNamespace Sm = "http://www.sitemaps.org/schemas/sitemap/0.9";
    private static readonly XNamespace Xhtml = "http://www.w3.org/1999/xhtml";

    private async Task<XDocument> Sitemap(string path)
    {
        var res = await fx.Factory.CreateClient().GetAsync(path);
        var body = await res.Content.ReadAsStringAsync();
        Assert.True(res.IsSuccessStatusCode, body);
        Assert.Equal("application/xml", res.Content.Headers.ContentType!.MediaType);
        return XDocument.Parse(body);
    }

    [Theory]
    [InlineData("/sitemap.xml")]
    [InlineData("/api/seo/sitemap.xml")]
    public async Task Sitemap_lists_only_public_live_pages_with_absolute_urls(string path)
    {
        var doc = await Sitemap(path);
        var locs = doc.Root!.Elements(Sm + "url").Select(u => u.Element(Sm + "loc")!.Value).ToList();
        Assert.All(locs, l => Assert.StartsWith("https://mastemy.example/", l));
        Assert.Contains("https://mastemy.example/", locs);
        Assert.Contains("https://mastemy.example/courses", locs);
        Assert.Contains("https://mastemy.example/teach", locs);
        Assert.Contains("https://mastemy.example/courses/live-course", locs);
        Assert.Contains("https://mastemy.example/courses/live-course?lang=ar", locs);
        Assert.Contains("https://mastemy.example/courses/updating-course", locs); // live while a revision is in review
        Assert.Contains("https://mastemy.example/categories/data", locs);
        Assert.DoesNotContain(locs, l => l.Contains("draft-course") || l.Contains("archived-course") || l.Contains("empty-cat"));
        Assert.DoesNotContain(locs, l => l.Contains("/learn") || l.Contains("/me") || l.Contains("/studio") || l.Contains("/admin") || l.Contains("/attempts"));
        Assert.Equal(locs.Count, locs.Distinct().Count());
    }

    [Fact]
    public async Task Sitemap_course_entry_has_lastmod_and_hreflang_alternates()
    {
        var doc = await Sitemap("/sitemap.xml");
        var entry = doc.Root!.Elements(Sm + "url").Single(u => u.Element(Sm + "loc")!.Value == "https://mastemy.example/courses/live-course");
        Assert.Equal("2026-09-01T10:00:00Z", entry.Element(Sm + "lastmod")!.Value);
        var alts = entry.Elements(Xhtml + "link").ToDictionary(l => l.Attribute("hreflang")!.Value, l => l.Attribute("href")!.Value);
        Assert.Equal("https://mastemy.example/courses/live-course", alts["en"]);
        Assert.Equal("https://mastemy.example/courses/live-course?lang=ar", alts["ar"]);
        Assert.Equal("https://mastemy.example/courses/live-course", alts["x-default"]);
    }

    [Theory]
    [InlineData("/robots.txt")]
    [InlineData("/api/seo/robots.txt")]
    public async Task Robots_disallows_private_areas_and_points_at_sitemap(string path)
    {
        var res = await fx.Factory.CreateClient().GetAsync(path);
        var body = await res.Content.ReadAsStringAsync();
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        foreach (var p in new[] { "/me", "/studio", "/admin", "/attempts", "/learn/", "/api/" })
            Assert.Contains($"Disallow: {p}\n", body);
        Assert.Contains("Sitemap: https://mastemy.example/sitemap.xml", body);
    }

    [Theory]
    [InlineData("/sitemap.xml")]
    [InlineData("/robots.txt")]
    public async Task Missing_public_base_url_returns_503_with_clear_message(string path)
    {
        var res = await fx.Unconfigured.CreateClient().GetAsync(path);
        Assert.Equal(HttpStatusCode.ServiceUnavailable, res.StatusCode);
        Assert.Contains("Seo:PublicBaseUrl", await res.Content.ReadAsStringAsync());
    }
}
