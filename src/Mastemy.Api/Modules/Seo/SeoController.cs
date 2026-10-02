using System.Globalization;
using System.Text;
using System.Xml;
using Mastemy.Api.Data;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Catalog;
using Mastemy.Api.Modules.Taxonomy;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Seo;

/// <summary>
/// Search-engine endpoints (spec §21). Only public, live catalogue pages are listed; learning workspaces,
/// attempts, private notes, studio and admin are disallowed in robots.txt and never appear in the sitemap.
/// Locale scheme: the web app has no locale path prefix, so English is the bare URL and Arabic is the same
/// URL with <c>?lang=ar</c>; both are emitted as hreflang alternates (x-default = English).
/// </summary>
[ApiController]
[AllowAnonymous]
public class SeoController(AppDbContext db, IConfiguration cfg, CourseSnapshotService snapshots, CertificationService certifications,
    DiscoveryService discovery, InstructorDirectoryService instructors) : ControllerBase
{
    public static readonly string[] StaticPaths = ["/", "/courses", "/free-lessons", "/verify", "/teach", "/about", "/help", "/contact",
        "/categories", "/certifications", "/pathways", "/instructors", "/packages", "/practice", "/notes-library", "/business", "/articles",
        "/bestseller-rule", "/plans", "/bundles"];
    public static readonly string[] DisallowedPaths = ["/me", "/studio", "/admin", "/attempts", "/learn/", "/api/",
        "/checkout", "/gift", "/orgs", "/staff", "/review", "/practice/session"];

    /// <summary>Editorial articles shipped with the web app (static content; slugs must match the web routes).</summary>
    public static readonly string[] ArticleSlugs = ["free-video-and-paid-study-services", "how-mcq-certificates-work", "prepare-for-a-certification-exam"];

    private string? BaseUrl
    {
        get
        {
            var raw = cfg["Seo:PublicBaseUrl"];
            if (string.IsNullOrWhiteSpace(raw) || !Uri.TryCreate(raw.Trim(), UriKind.Absolute, out var u)
                || (u.Scheme != Uri.UriSchemeHttps && u.Scheme != Uri.UriSchemeHttp)) return null;
            return u.GetLeftPart(UriPartial.Authority) + u.AbsolutePath.TrimEnd('/');
        }
    }

    private ObjectResult NotConfigured() => Problem(statusCode: 503, title: "seo_not_configured",
        detail: "Seo:PublicBaseUrl is not configured (absolute http(s) URL of the public site required).");

    [HttpGet("/sitemap.xml")]
    [HttpGet("api/seo/sitemap.xml")]
    public async Task<IActionResult> Sitemap(CancellationToken ct)
    {
        var baseUrl = BaseUrl;
        if (baseUrl is null) return NotConfigured();

        var courses = await db.Courses.AsNoTracking().Where(AccessService.IsLiveExpr)
            .OrderBy(c => c.Slug)
            .Select(c => new { c.Id, c.Slug, c.UpdatedAt, c.PublishedAt })
            .ToListAsync(ct);
        var liveIds = courses.Select(c => c.Id).ToHashSet();
        // Categories come from each live course's published snapshot (draft category edits are not advertised).
        var catLists = await snapshots.LiveCards().Select(x => new { x.Id, x.CategoryIds }).ToListAsync(ct);
        catLists.AddRange((await snapshots.LegacyCards()).Select(x => new { x.Id, x.CategoryIds }));
        var catSlugs = await db.Categories.AsNoTracking().ToDictionaryAsync(c => c.Id, c => c.Slug, ct);
        var catRows = catLists.SelectMany(x => CourseSnapshotService.ParseCategoryIds(x.CategoryIds)
                .Where(catSlugs.ContainsKey).Select(id => new { Slug = catSlugs[id], CourseId = x.Id }))
            .Where(r => liveIds.Contains(r.CourseId)).ToList();
        var courseLastMod = courses.ToDictionary(c => c.Id, c => Max(c.UpdatedAt, c.PublishedAt));
        // Categories without a live course are thin pages; they are reachable but not advertised.
        var categories = catRows.GroupBy(r => r.Slug).OrderBy(g => g.Key, StringComparer.Ordinal)
            .Select(g => (Slug: g.Key, LastMod: g.Max(r => courseLastMod[r.CourseId]))).ToList();
        DateTime? siteLastMod = courses.Count == 0 ? null : courseLastMod.Values.Max();

        // Academies: IsAcademy categories with at least one live course in the category or its descendants.
        var allCats = await db.Categories.AsNoTracking().Select(c => new { c.Id, c.Slug, c.ParentId, c.IsAcademy }).ToListAsync(ct);
        var liveCatIds = catLists.Where(x => liveIds.Contains(x.Id))
            .SelectMany(x => CourseSnapshotService.ParseCategoryIds(x.CategoryIds).Select(id => (Cat: id, Course: x.Id))).ToList();
        var academies = new List<(string Slug, DateTime? LastMod)>();
        foreach (var a in allCats.Where(c => c.IsAcademy).OrderBy(c => c.Slug, StringComparer.Ordinal))
        {
            var tree = new HashSet<int> { a.Id };
            for (var grew = true; grew;)
            {
                grew = false;
                foreach (var c in allCats) if (c.ParentId is { } pid && tree.Contains(pid) && tree.Add(c.Id)) grew = true;
            }
            var members = liveCatIds.Where(x => tree.Contains(x.Cat)).Select(x => courseLastMod[x.Course]).ToList();
            if (members.Count > 0) academies.Add((a.Slug, members.Max()));
        }
        var certs = await certifications.PublicCertifications().OrderBy(c => c.Slug).Select(c => new { c.Slug, c.LastCheckedAt }).ToListAsync(ct);
        var pathways = (await discovery.PublicPathways()).Select(p => p.Slug).OrderBy(x => x, StringComparer.Ordinal).ToList();
        var collections = (await discovery.ActiveCollections(null, null, false)).Select(c => c.Slug).OrderBy(x => x, StringComparer.Ordinal).ToList();
        var instructorIds = await instructors.PublicInstructorIds().OrderBy(x => x).ToListAsync(ct);

        var ms = new MemoryStream();
        using (var w = XmlWriter.Create(ms, new XmlWriterSettings { Indent = true, Encoding = new UTF8Encoding(false) }))
        {
            const string ns = "http://www.sitemaps.org/schemas/sitemap/0.9";
            const string xhtml = "http://www.w3.org/1999/xhtml";
            w.WriteStartDocument();
            w.WriteStartElement("urlset", ns);
            w.WriteAttributeString("xmlns", "xhtml", null, xhtml);
            void Entry(string path, DateTime? lastMod)
            {
                var en = baseUrl + path;
                var ar = en + "?lang=ar";
                foreach (var loc in new[] { en, ar })
                {
                    w.WriteStartElement("url", ns);
                    w.WriteElementString("loc", ns, loc);
                    if (lastMod is not null)
                        w.WriteElementString("lastmod", ns, DateTime.SpecifyKind(lastMod.Value, DateTimeKind.Utc)
                            .ToString("yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture));
                    foreach (var (lang, href) in new[] { ("en", en), ("ar", ar), ("x-default", en) })
                    {
                        w.WriteStartElement("xhtml", "link", xhtml);
                        w.WriteAttributeString("rel", "alternate");
                        w.WriteAttributeString("hreflang", lang);
                        w.WriteAttributeString("href", href);
                        w.WriteEndElement();
                    }
                    w.WriteEndElement();
                }
            }
            foreach (var p in StaticPaths) Entry(p, p is "/" or "/courses" ? siteLastMod : null);
            foreach (var c in categories) Entry("/categories/" + Uri.EscapeDataString(c.Slug), c.LastMod);
            foreach (var c in courses) Entry("/courses/" + Uri.EscapeDataString(c.Slug), courseLastMod[c.Id]);
            foreach (var a in academies) Entry("/academies/" + Uri.EscapeDataString(a.Slug), a.LastMod);
            foreach (var c in certs) Entry("/certifications/" + Uri.EscapeDataString(c.Slug), c.LastCheckedAt);
            foreach (var slug in pathways) Entry("/pathways/" + Uri.EscapeDataString(slug), null);
            foreach (var slug in collections) Entry("/collections/" + Uri.EscapeDataString(slug), null);
            foreach (var slug in ArticleSlugs) Entry("/articles/" + slug, null);
            foreach (var id in instructorIds) Entry("/instructors/" + id.ToString(), null);
            w.WriteEndElement();
            w.WriteEndDocument();
        }
        Response.Headers.CacheControl = "public, max-age=3600";
        return File(ms.ToArray(), "application/xml; charset=utf-8");
    }

    [HttpGet("/robots.txt")]
    [HttpGet("api/seo/robots.txt")]
    public IActionResult Robots()
    {
        var baseUrl = BaseUrl;
        if (baseUrl is null) return NotConfigured();
        var sb = new StringBuilder("User-agent: *\n");
        foreach (var p in DisallowedPaths) sb.Append("Disallow: ").Append(p).Append('\n');
        sb.Append("Allow: /\n\nSitemap: ").Append(baseUrl).Append("/sitemap.xml\n");
        Response.Headers.CacheControl = "public, max-age=3600";
        return Content(sb.ToString(), "text/plain; charset=utf-8");
    }

    private static DateTime Max(DateTime a, DateTime? b) => b is { } v && v > a ? v : a;
}
