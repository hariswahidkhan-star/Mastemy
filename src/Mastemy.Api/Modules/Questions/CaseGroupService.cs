using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Questions;

public record CaseGroupInput(string Title, string ExhibitMarkdown, List<Guid>? ResourceIds);
public record CaseGroupDto(Guid Id, Guid CourseId, string Title, string ExhibitMarkdown, List<Guid> ResourceIds, List<Guid> QuestionIds,
    DateTime CreatedAt, DateTime UpdatedAt);

/// <summary>Validation of course-scoped references used by questions (image resources, case groups).</summary>
public static class QuestionAssets
{
    public const int MaxImagesPerQuestion = 20;

    /// <summary>
    /// Every referenced resource must be a live (not deleted), non-premium image file of the same course; the case group,
    /// if any, must belong to the course. Returns errors (empty when valid).
    /// </summary>
    public static async Task<List<string>> Check(AppDbContext db, Guid courseId, IReadOnlyCollection<Guid> resourceIds, Guid? caseGroupId,
        bool imagesOnly = true)
    {
        var e = new List<string>();
        if (resourceIds.Count > MaxImagesPerQuestion) e.Add($"At most {MaxImagesPerQuestion} images may be referenced.");
        else if (resourceIds.Count > 0)
        {
            var ok = await db.ResourceFiles.AsNoTracking()
                .Where(r => resourceIds.Contains(r.Id) && r.CourseId == courseId && r.DeletedAt == null && r.Kind == "Resource" && !r.IsPremium
                            && (!imagesOnly || RichText.ImageContentTypes.Contains(r.ContentType)))
                .Select(r => r.Id).ToListAsync();
            foreach (var missing in resourceIds.Except(ok))
                e.Add(imagesOnly ? $"Image resource {missing} is not a non-premium image file of this course."
                                 : $"Resource {missing} is not a non-premium resource file of this course.");
        }
        if (caseGroupId is { } cg && !await db.Set<CaseGroup>().AnyAsync(g => g.Id == cg && g.CourseId == courseId))
            e.Add("caseGroupId does not belong to this course.");
        return e;
    }

    public static List<Guid> ParseIds(string? csv) =>
        string.IsNullOrEmpty(csv) ? [] : csv.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(Guid.Parse).ToList();
}

/// <summary>Case groups: shared exhibits whose member questions are delivered together and in order (spec §13).</summary>
public class CaseGroupService(AppDbContext db, ICurrentUser me, AccessService access, AuditService audit)
{
    public const int MaxExhibit = 20000;

    public async Task<List<CaseGroupDto>> List(Guid courseId)
    {
        if (!await db.Courses.AnyAsync(c => c.Id == courseId)) throw AppException.NotFound("Course");
        await access.RequireCourseAuthorOrStaff(courseId);
        var groups = await db.Set<CaseGroup>().AsNoTracking().Where(g => g.CourseId == courseId).OrderBy(g => g.Title).ToListAsync();
        var ids = groups.Select(g => g.Id).ToList();
        var members = await db.Set<QuestionMeta>().AsNoTracking().Where(m => m.CaseGroupId != null && ids.Contains(m.CaseGroupId.Value)).ToListAsync();
        return groups.Select(g => ToDto(g, members)).ToList();
    }

    public async Task<CaseGroupDto> Get(Guid id)
    {
        var g = await db.Set<CaseGroup>().AsNoTracking().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Case group");
        await access.RequireCourseAuthorOrStaff(g.CourseId);
        var members = await db.Set<QuestionMeta>().AsNoTracking().Where(m => m.CaseGroupId == id).ToListAsync();
        return ToDto(g, members);
    }

    public async Task<CaseGroupDto> Create(Guid courseId, CaseGroupInput input)
    {
        var uid = me.RequireId();
        if (!await db.Courses.AnyAsync(c => c.Id == courseId)) throw AppException.NotFound("Course");
        await access.RequireCourseEditor(courseId);
        var resources = await Validate(courseId, input);
        var g = new CaseGroup
        {
            CourseId = courseId, Title = input.Title.Trim(), ExhibitMarkdown = RichText.Normalize(input.ExhibitMarkdown).Trim(),
            ResourceIds = string.Join(',', resources), CreatedBy = uid,
        };
        db.Set<CaseGroup>().Add(g);
        audit.Record("case_group.created", "CaseGroup", g.Id, new { courseId, g.Title });
        await db.SaveChangesAsync();
        return ToDto(g, []);
    }

    public async Task<CaseGroupDto> Update(Guid id, CaseGroupInput input)
    {
        me.RequireId();
        var g = await db.Set<CaseGroup>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Case group");
        await access.RequireCourseEditor(g.CourseId);
        var resources = await Validate(g.CourseId, input);
        g.Title = input.Title.Trim();
        g.ExhibitMarkdown = RichText.Normalize(input.ExhibitMarkdown).Trim();
        g.ResourceIds = string.Join(',', resources);
        g.UpdatedAt = DateTime.UtcNow;
        audit.Record("case_group.updated", "CaseGroup", g.Id, new { g.Title });
        await db.SaveChangesAsync();
        return await Get(id);
    }

    public async Task Delete(Guid id)
    {
        me.RequireId();
        var g = await db.Set<CaseGroup>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Case group");
        await access.RequireCourseEditor(g.CourseId);
        if (await db.Set<QuestionMeta>().AnyAsync(m => m.CaseGroupId == id))
            throw AppException.Conflict("Remove the questions from this case group before deleting it.", "case_group_in_use");
        db.Set<CaseGroup>().Remove(g);
        audit.Record("case_group.deleted", "CaseGroup", id, new { g.Title });
        await db.SaveChangesAsync();
    }

    private async Task<List<Guid>> Validate(Guid courseId, CaseGroupInput? input)
    {
        if (input is null) throw AppException.Bad("Request body is required.");
        var e = new List<string>();
        if (string.IsNullOrWhiteSpace(input.Title) || input.Title.Length > 200 || QuestionRules.HasBadSingleLine(input.Title))
            e.Add("title is required (max 200 characters, single line).");
        if (string.IsNullOrWhiteSpace(input.ExhibitMarkdown)) e.Add("exhibitMarkdown is required.");
        else
        {
            if (input.ExhibitMarkdown.Length > MaxExhibit) e.Add($"exhibitMarkdown exceeds {MaxExhibit} characters.");
            if (QuestionRules.HasBadChars(input.ExhibitMarkdown)) e.Add("exhibitMarkdown contains control characters or malformed text.");
        }
        var ids = new HashSet<Guid>();
        RichText.Validate("exhibitMarkdown", input.ExhibitMarkdown, e, ids);
        var attached = (input.ResourceIds ?? []).Distinct().ToList();
        if (e.Count == 0) e.AddRange(await QuestionAssets.Check(db, courseId, ids, null));
        if (e.Count == 0) e.AddRange(await QuestionAssets.Check(db, courseId, attached, null, imagesOnly: false));
        if (e.Count > 0) throw AppException.Bad(string.Join(" ", e), "validation_failed");
        return attached;
    }

    private static CaseGroupDto ToDto(CaseGroup g, List<QuestionMeta> members) => new(g.Id, g.CourseId, g.Title, g.ExhibitMarkdown,
        QuestionAssets.ParseIds(g.ResourceIds),
        members.Where(m => m.CaseGroupId == g.Id).OrderBy(m => m.CaseGroupOrder).Select(m => m.QuestionId).ToList(), g.CreatedAt, g.UpdatedAt);
}
