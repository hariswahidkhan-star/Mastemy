using Mastemy.Api.Data;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Mastemy.Api.Modules.Taxonomy;

/// <summary>
/// Admin-only production backlog of course ideas (spec §5/§8). Never exposed publicly. State flow:
/// Idea → Validating → Approved → InProduction → Published; any non-published state → Rejected; Rejected → Idea (reopen).
/// Approved requires an owner and an update owner; Published requires a linked live course.
/// </summary>
public class BacklogService(AppDbContext db, AuditService audit, IOptions<TaxonomyOptions> options, IWebHostEnvironment env)
{
    private static readonly Dictionary<CourseIdeaState, CourseIdeaState[]> Allowed = new()
    {
        [CourseIdeaState.Idea] = [CourseIdeaState.Validating, CourseIdeaState.Rejected],
        [CourseIdeaState.Validating] = [CourseIdeaState.Idea, CourseIdeaState.Approved, CourseIdeaState.Rejected],
        [CourseIdeaState.Approved] = [CourseIdeaState.Validating, CourseIdeaState.InProduction, CourseIdeaState.Rejected],
        [CourseIdeaState.InProduction] = [CourseIdeaState.Approved, CourseIdeaState.Published, CourseIdeaState.Rejected],
        [CourseIdeaState.Published] = [],
        [CourseIdeaState.Rejected] = [CourseIdeaState.Idea],
    };

    public static bool CanTransition(CourseIdeaState from, CourseIdeaState to) => Allowed[from].Contains(to);

    private static Guid[] ParseIds(string csv) =>
        csv.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(x => Guid.TryParse(x, out var g) ? g : Guid.Empty).Where(g => g != Guid.Empty).ToArray();

    public static CourseIdeaDto ToDto(CourseIdea i) => new(i.Id, i.Title, i.Audience, i.Rationale, i.DemandEvidence, i.Group, i.State, i.OwnerId,
        i.UpdateOwnerId, i.LinkedCourseId, ParseIds(i.CertificationIds), i.MaintenanceCostNote, i.PriorityScore, i.RoadmapRank, i.CreatedAt, i.UpdatedAt);

    public async Task<List<CourseIdeaDto>> List(CourseIdeaState? state, string? q)
    {
        var query = db.Set<CourseIdea>().AsNoTracking();
        if (state is { } s) query = query.Where(i => i.State == s);
        if (!string.IsNullOrWhiteSpace(q))
        {
            var p = "%" + Catalog.CatalogQueryService.EscapeLike(q.Trim()) + "%";
            query = query.Where(i => EF.Functions.Like(i.Title, p, "!"));
        }
        return (await query.OrderByDescending(i => i.PriorityScore).ThenBy(i => i.RoadmapRank).ThenBy(i => i.Title).ToListAsync()).Select(ToDto).ToList();
    }

    public async Task<CourseIdeaDto> Get(Guid id) =>
        ToDto(await db.Set<CourseIdea>().AsNoTracking().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Course idea"));

    public async Task<CourseIdeaDto> Upsert(Guid? id, CourseIdeaUpsertRequest req)
    {
        var title = CertificationService.Trunc(req.Title, 250);
        if (title.Length == 0) throw AppException.Bad("Title is required.");
        if (req.PriorityScore is < 0 or > 1000) throw AppException.Bad("PriorityScore must be between 0 and 1000.");
        foreach (var uid in new[] { req.OwnerId, req.UpdateOwnerId }.OfType<Guid>())
            if (!await db.Users.AnyAsync(u => u.Id == uid)) throw AppException.Bad("Unknown owner user.");
        if (req.LinkedCourseId is { } cid && !await db.Courses.AnyAsync(c => c.Id == cid)) throw AppException.Bad("Unknown linked course.");
        var certIds = (req.CertificationIds ?? []).Distinct().ToList();
        if (certIds.Count > 0 && await db.Set<Certification>().CountAsync(c => certIds.Contains(c.Id)) != certIds.Count)
            throw AppException.Bad("Unknown certification id(s).");
        CourseIdea i;
        if (id is { } gid) i = await db.Set<CourseIdea>().FirstOrDefaultAsync(x => x.Id == gid) ?? throw AppException.NotFound("Course idea");
        else { i = new CourseIdea(); db.Set<CourseIdea>().Add(i); }
        if (await db.Set<CourseIdea>().AnyAsync(x => x.Title == title && x.Id != i.Id)) throw AppException.Conflict("An idea with this title already exists.");
        i.Title = title; i.Audience = CertificationService.Trunc(req.Audience, 5000); i.Rationale = CertificationService.Trunc(req.Rationale, 20000);
        i.DemandEvidence = CertificationService.Trunc(req.DemandEvidence, 20000); i.Group = CertificationService.Trunc(req.Group, 200);
        i.OwnerId = req.OwnerId; i.UpdateOwnerId = req.UpdateOwnerId; i.LinkedCourseId = req.LinkedCourseId;
        i.CertificationIds = string.Join(',', certIds); i.MaintenanceCostNote = CertificationService.Trunc(req.MaintenanceCostNote, 5000);
        i.PriorityScore = req.PriorityScore ?? i.PriorityScore; i.UpdatedAt = DateTime.UtcNow;
        if (i.State == CourseIdeaState.Published && !await IsLive(i.LinkedCourseId)) throw AppException.Conflict("A published idea must stay linked to a live course.");
        audit.Record(id is null ? "course_idea.created" : "course_idea.updated", "CourseIdea", i.Id, new { i.Title });
        await db.SaveChangesAsync();
        return ToDto(i);
    }

    private async Task<bool> IsLive(Guid? courseId) =>
        courseId is { } cid && await db.Courses.Where(AccessService.IsLiveExpr).AnyAsync(c => c.Id == cid);

    public async Task<CourseIdeaDto> ChangeState(Guid id, CourseIdeaStateRequest req)
    {
        var i = await db.Set<CourseIdea>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Course idea");
        if (!Enum.IsDefined(req.State)) throw AppException.Bad("Invalid state.");
        if (!CanTransition(i.State, req.State))
            throw AppException.Conflict($"Cannot move a course idea from {i.State} to {req.State}.", "invalid_transition");
        if (req.State is CourseIdeaState.Approved && (i.OwnerId is null || i.UpdateOwnerId is null))
            throw AppException.Conflict("An owner and an update owner are required before approval.", "owner_required");
        if (req.State is CourseIdeaState.InProduction && i.LinkedCourseId is null)
            throw AppException.Conflict("Link the draft course before production starts.", "course_required");
        if (req.State is CourseIdeaState.Published && !await IsLive(i.LinkedCourseId))
            throw AppException.Conflict("An idea is published only when its linked course is live.", "course_not_live");
        var from = i.State;
        i.State = req.State; i.UpdatedAt = DateTime.UtcNow;
        audit.Record("course_idea.state_changed", "CourseIdea", i.Id, new { from, to = req.State, notes = CertificationService.Trunc(req.Notes, 2000) });
        await db.SaveChangesAsync();
        return ToDto(i);
    }

    public async Task Delete(Guid id)
    {
        var i = await db.Set<CourseIdea>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Course idea");
        if (i.State is CourseIdeaState.InProduction or CourseIdeaState.Published)
            throw AppException.Conflict("Ideas in production or published cannot be deleted; reject them instead.");
        db.Set<CourseIdea>().Remove(i);
        audit.Record("course_idea.deleted", "CourseIdea", id, new { i.Title });
        await db.SaveChangesAsync();
    }

    public record RoadmapRow(int Rank, string Title, string Group);

    /// <summary>Parses the "| # | Candidate | Group | Brief |" table of docs/course-roadmap.md.</summary>
    public static List<RoadmapRow> ParseRoadmap(string markdown)
    {
        var rows = new List<RoadmapRow>();
        foreach (var raw in markdown.Split('\n'))
        {
            var line = raw.Trim();
            if (!line.StartsWith('|')) continue;
            var cells = line.Trim('|').Split('|').Select(c => c.Trim()).ToArray();
            if (cells.Length < 3 || !int.TryParse(cells[0], out var rank) || rank <= 0) continue;
            var title = cells[1].Replace("**", "").Trim();
            if (title.Length is 0 or > 250) continue;
            rows.Add(new RoadmapRow(rank, title, cells[2].Length > 200 ? cells[2][..200] : cells[2]));
        }
        return rows.DistinctBy(r => r.Title, StringComparer.OrdinalIgnoreCase).ToList();
    }

    /// <summary>
    /// Imports roadmap candidates as Idea rows (idempotent: existing titles are skipped). Uses the posted markdown, else the
    /// configured Taxonomy:RoadmapPath, else docs/course-roadmap.md found above the content root. Never auto-run.
    /// </summary>
    public async Task<RoadmapImportResultDto> ImportRoadmap(RoadmapImportRequest? req)
    {
        var md = req?.Markdown;
        if (string.IsNullOrWhiteSpace(md))
        {
            var path = ResolveRoadmapPath() ?? throw new AppException(503, "Roadmap file not found; post the markdown in the request body.", "roadmap_unavailable");
            md = await File.ReadAllTextAsync(path);
        }
        if (md.Length > 2_000_000) throw AppException.Bad("Markdown too large.");
        var rows = ParseRoadmap(md);
        if (rows.Count == 0) throw AppException.Bad("No roadmap rows found (expected a '| # | Candidate | Group | Brief |' table).");
        var existing = (await db.Set<CourseIdea>().Select(i => i.Title).ToListAsync()).ToHashSet(StringComparer.OrdinalIgnoreCase);
        var created = 0;
        foreach (var r in rows.Where(r => !existing.Contains(r.Title)))
        {
            db.Set<CourseIdea>().Add(new CourseIdea
            {
                Title = r.Title, Group = r.Group, RoadmapRank = r.Rank, State = CourseIdeaState.Idea,
                Rationale = "Imported from the unvalidated course roadmap; demand, willingness to pay, instructor readiness, differentiation, maintenance cost and margin not yet validated.",
            });
            created++;
        }
        audit.Record("course_idea.roadmap_imported", "CourseIdea", "roadmap", new { parsed = rows.Count, created });
        await db.SaveChangesAsync();
        return new RoadmapImportResultDto(rows.Count, created, rows.Count - created);
    }

    private string? ResolveRoadmapPath()
    {
        var configured = options.Value.RoadmapPath;
        if (!string.IsNullOrWhiteSpace(configured)) return File.Exists(configured) ? configured : null;
        var dir = new DirectoryInfo(env.ContentRootPath);
        for (var i = 0; i < 6 && dir is not null; i++, dir = dir.Parent)
        {
            var p = Path.Combine(dir.FullName, "docs", "course-roadmap.md");
            if (File.Exists(p)) return p;
        }
        return null;
    }
}
