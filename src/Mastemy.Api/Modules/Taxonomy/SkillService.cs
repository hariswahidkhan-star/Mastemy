using System.Text.RegularExpressions;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Taxonomy;

public partial class SkillService(AppDbContext db, ICurrentUser me, AuditService audit, AccessService access)
{
    [GeneratedRegex("^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$")] private static partial Regex CodeRx();

    public static SkillDto ToDto(Skill s) => new(s.Id, s.Code, s.NameEn, s.NameAr, s.ParentId, s.IsActive);

    /// <summary>
    /// Course-skill links visible to the public: only for live courses with a snapshot, and only links that were in effect
    /// at the moment that snapshot was published (snapshot-safe; working-copy edits appear after the next publish).
    /// </summary>
    public static IQueryable<CourseSkill> PublishedLinks(AppDbContext db) =>
        from cs in db.Set<CourseSkill>().AsNoTracking()
        join c in db.Courses.AsNoTracking().Where(AccessService.IsLiveExpr) on cs.CourseId equals c.Id
        join s in db.CourseSnapshots.AsNoTracking() on new { Id = c.Id, V = c.PublishedVersion } equals new { Id = s.CourseId, V = s.Version }
        where cs.AddedAt <= s.PublishedAt && (cs.RemovedAt == null || cs.RemovedAt > s.PublishedAt)
        select cs;

    public Task<List<SkillDto>> List(bool includeInactive) =>
        db.Set<Skill>().AsNoTracking().Where(s => includeInactive || s.IsActive).OrderBy(s => s.NameEn)
            .Select(s => new SkillDto(s.Id, s.Code, s.NameEn, s.NameAr, s.ParentId, s.IsActive)).ToListAsync();

    public async Task<SkillDto> Create(SkillUpsertRequest req)
    {
        var s = new Skill();
        await Apply(s, req);
        if (await db.Set<Skill>().AnyAsync(x => x.Code == s.Code)) throw AppException.Conflict("Skill code already exists.", "duplicate_code");
        db.Set<Skill>().Add(s);
        await db.SaveChangesAsync();
        audit.Record("skill.created", "Skill", s.Id, new { s.Code });
        await db.SaveChangesAsync();
        return ToDto(s);
    }

    public async Task<SkillDto> Update(int id, SkillUpsertRequest req)
    {
        var s = await db.Set<Skill>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Skill");
        var oldCode = s.Code;
        await Apply(s, req);
        if (s.Code != oldCode)
        {
            if (await db.Set<Skill>().AnyAsync(x => x.Code == s.Code && x.Id != id)) throw AppException.Conflict("Skill code already exists.", "duplicate_code");
        }
        if (s.ParentId is { } pid)
        {
            // Reject cycles.
            var parents = await db.Set<Skill>().AsNoTracking().ToDictionaryAsync(x => x.Id, x => x.ParentId);
            int? cur = pid; var guard = 0;
            while (cur is { } c && guard++ < 1000) { if (c == id) throw AppException.Bad("Skill parent would create a cycle."); cur = parents.GetValueOrDefault(c); }
        }
        audit.Record("skill.updated", "Skill", s.Id, new { oldCode, s.Code, s.IsActive });
        await db.SaveChangesAsync();
        return ToDto(s);
    }

    private async Task Apply(Skill s, SkillUpsertRequest req)
    {
        var code = (req.Code ?? "").Trim();
        if (!CodeRx().IsMatch(code)) throw AppException.Bad("Skill code must be 1-64 characters: letters, digits, '.', '_' or '-'.");
        var name = (req.NameEn ?? "").Trim();
        if (name.Length is 0 or > 200) throw AppException.Bad("NameEn is required (max 200 characters).");
        var ar = (req.NameAr ?? "").Trim();
        if (ar.Length > 200) throw AppException.Bad("NameAr max 200 characters.");
        if (req.ParentId is { } p && (p == s.Id || !await db.Set<Skill>().AnyAsync(x => x.Id == p))) throw AppException.Bad("Unknown parent skill.");
        s.Code = code; s.NameEn = name; s.NameAr = ar; s.ParentId = req.ParentId; s.IsActive = req.IsActive ?? s.IsActive;
    }

    /// <summary>Working (unpublished) skill set of a course; authors, reviewers and staff.</summary>
    public async Task<List<SkillDto>> CourseWorkingSkills(Guid courseId)
    {
        await access.RequireCourseAuthorOrStaff(courseId);
        return await (from cs in db.Set<CourseSkill>().AsNoTracking()
                      join s in db.Set<Skill>().AsNoTracking() on cs.SkillId equals s.Id
                      where cs.CourseId == courseId && cs.RemovedAt == null
                      orderby s.NameEn
                      select new SkillDto(s.Id, s.Code, s.NameEn, s.NameAr, s.ParentId, s.IsActive)).ToListAsync();
    }

    /// <summary>Replaces the course's working skill set. Takes effect publicly at the next publish.</summary>
    public async Task<List<SkillDto>> SetCourseSkills(Guid courseId, CourseSkillsRequest req)
    {
        if (!await db.Courses.AnyAsync(c => c.Id == courseId)) throw AppException.NotFound("Course");
        await access.RequireCourseEditor(courseId);
        var codes = (req.Codes ?? []).Select(c => (c ?? "").Trim()).Where(c => c.Length > 0).Distinct(StringComparer.OrdinalIgnoreCase).ToList();
        if (codes.Count > 30) throw AppException.Bad("A course may have at most 30 skills.");
        var skills = await db.Set<Skill>().Where(s => codes.Contains(s.Code)).ToListAsync();
        var unknown = codes.Where(c => !skills.Any(s => string.Equals(s.Code, c, StringComparison.OrdinalIgnoreCase))).ToList();
        if (unknown.Count > 0) throw AppException.Bad("Unknown skill codes: " + string.Join(", ", unknown), "unknown_skill");
        var inactive = skills.Where(s => !s.IsActive).Select(s => s.Code).ToList();
        if (inactive.Count > 0) throw AppException.Bad("Inactive skill codes: " + string.Join(", ", inactive), "inactive_skill");

        var now = DateTime.UtcNow;
        var uid = me.RequireId();
        var current = await db.Set<CourseSkill>().Where(x => x.CourseId == courseId && x.RemovedAt == null).ToListAsync();
        var wanted = skills.Select(s => s.Id).ToHashSet();
        var removed = current.Where(x => !wanted.Contains(x.SkillId)).ToList();
        foreach (var r in removed) { r.RemovedAt = now; r.RemovedBy = uid; }
        var added = wanted.Where(id => current.All(x => x.SkillId != id)).ToList();
        foreach (var id in added) db.Set<CourseSkill>().Add(new CourseSkill { CourseId = courseId, SkillId = id, AddedAt = now, AddedBy = uid });
        if (added.Count + removed.Count > 0)
        {
            audit.Record("course.skills_changed", "Course", courseId, new { added, removed = removed.Select(r => r.SkillId) });
            await db.SaveChangesAsync();
        }
        return await CourseWorkingSkills(courseId);
    }

    /// <summary>Skills shown publicly for a live course (as of its current snapshot).</summary>
    public async Task<List<SkillDto>> PublicCourseSkills(Guid courseId) =>
        await (from cs in PublishedLinks(db)
               join s in db.Set<Skill>().AsNoTracking() on cs.SkillId equals s.Id
               where cs.CourseId == courseId && s.IsActive
               orderby s.NameEn
               select new SkillDto(s.Id, s.Code, s.NameEn, s.NameAr, s.ParentId, s.IsActive)).ToListAsync();

    /// <summary>
    /// Soft validation of the free-text SkillCode stored on question versions: codes that are not in the skills catalog,
    /// with the number of questions whose current or pending version uses them. Writes are not blocked (warning only).
    /// </summary>
    public async Task<List<UnknownSkillCodeDto>> UnknownQuestionSkillCodes()
    {
        var known = await db.Set<Skill>().AsNoTracking().Select(s => s.Code).ToListAsync();
        var knownSet = known.ToHashSet(StringComparer.OrdinalIgnoreCase);
        var used = await (from q in db.Questions.AsNoTracking()
                          join v in db.QuestionVersions.AsNoTracking() on q.Id equals v.QuestionId
                          where (v.Version == q.CurrentVersion || v.Version == q.PendingVersion) && v.SkillCode != ""
                          select new { q.Id, v.SkillCode }).ToListAsync();
        return used.Where(u => !knownSet.Contains(u.SkillCode.Trim())).GroupBy(u => u.SkillCode.Trim(), StringComparer.OrdinalIgnoreCase)
            .Select(g => new UnknownSkillCodeDto(g.Key, g.Select(x => x.Id).Distinct().Count())).OrderByDescending(x => x.QuestionCount).ThenBy(x => x.Code).ToList();
    }
}
