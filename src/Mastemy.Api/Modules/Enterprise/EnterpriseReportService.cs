using System.Text;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Enterprise;

/// <summary>
/// Manager progress reporting for one organization. Reads only progress, attempt scores and certificates;
/// learner notes are never queried.
/// </summary>
public class EnterpriseReportService(AppDbContext db, EnterpriseService orgs)
{
    public async Task<List<ProgressRowDto>> Progress(Guid orgId)
    {
        await orgs.RequireManager(orgId);
        var members = await (from m in db.OrganizationMembers
                             join u in db.Users on m.UserId equals u.Id
                             where m.OrganizationId == orgId
                             orderby u.Email
                             select new { m, u.Email, u.DisplayName }).AsNoTracking().ToListAsync();
        var assignments = await db.OrganizationAssignments.AsNoTracking().Where(a => a.OrganizationId == orgId).ToListAsync();
        var courseIds = assignments.Select(a => a.CourseId).Distinct().ToList();
        var userIds = members.Select(x => x.m.UserId).ToList();
        if (courseIds.Count == 0 || userIds.Count == 0) return [];

        var titles = await db.Courses.Where(c => courseIds.Contains(c.Id)).ToDictionaryAsync(c => c.Id, c => c.Title);
        var lessons = await (from l in db.Lessons
                             join mo in db.Modules on l.ModuleId equals mo.Id
                             where courseIds.Contains(mo.CourseId)
                             select new { l.Id, mo.CourseId }).ToListAsync();
        var lessonCourse = lessons.ToDictionary(x => x.Id, x => x.CourseId);
        var totals = lessons.GroupBy(x => x.CourseId).ToDictionary(g => g.Key, g => g.Count());
        var lessonIds = lessons.Select(x => x.Id).ToList();
        var completed = (await db.LessonProgress
                .Where(p => p.Completed && userIds.Contains(p.UserId) && lessonIds.Contains(p.LessonId))
                .Select(p => new { p.UserId, p.LessonId }).ToListAsync())
            .GroupBy(p => (p.UserId, lessonCourse[p.LessonId])).ToDictionary(g => g.Key, g => g.Count());
        var scores = (await (from at in db.Attempts
                             join s in db.Assessments on at.AssessmentId equals s.Id
                             where s.CountsTowardCertificate && courseIds.Contains(s.CourseId) && userIds.Contains(at.UserId)
                                   && at.Status == AttemptStatus.Submitted && at.ScorePercent != null
                             select new { at.UserId, s.CourseId, at.ScorePercent, at.Passed }).ToListAsync())
            .GroupBy(x => (x.UserId, x.CourseId))
            .ToDictionary(g => g.Key, g => (Best: g.Max(x => x.ScorePercent!.Value), Passed: g.Any(x => x.Passed == true)));
        var certs = (await db.Certificates
                .Where(c => c.Status == CertificateStatus.Valid && courseIds.Contains(c.CourseId) && userIds.Contains(c.UserId))
                .Select(c => new { c.UserId, c.CourseId, c.Code, c.IssuedAt }).ToListAsync())
            .GroupBy(c => (c.UserId, c.CourseId)).ToDictionary(g => g.Key, g => g.OrderByDescending(c => c.IssuedAt).First().Code);

        var now = DateTime.UtcNow;
        var rows = new List<ProgressRowDto>();
        foreach (var x in members)
        {
            var covering = assignments.Where(a => OrgEntitlementSync.Covers(a, x.m)).GroupBy(a => a.CourseId);
            foreach (var g in covering.OrderBy(g => titles.GetValueOrDefault(g.Key)))
            {
                var key = (x.m.UserId, g.Key);
                var total = totals.GetValueOrDefault(g.Key);
                var done = completed.GetValueOrDefault(key);
                var hasScore = scores.TryGetValue(key, out var sc);
                var cert = certs.GetValueOrDefault(key);
                var passed = (hasScore && sc.Passed) || cert is not null;
                var due = g.Where(a => a.DueAt != null).Select(a => a.DueAt).Min();
                rows.Add(new ProgressRowDto(x.m.UserId, x.Email, x.DisplayName, x.m.Department, g.Key, titles.GetValueOrDefault(g.Key, ""),
                    done, total, total == 0 ? 0 : Math.Round(100m * done / total, 1), hasScore ? sc.Best : null, passed, cert,
                    due, due < now && !passed));
            }
        }
        return rows;
    }

    public async Task<byte[]> ProgressCsv(Guid orgId)
    {
        var rows = await Progress(orgId);
        var sb = new StringBuilder();
        void Line(IEnumerable<string?> cells) => sb.Append(string.Join(',', cells.Select(Escape))).Append("\r\n");
        Line(["Email", "Name", "Department", "Course", "CompletedLessons", "TotalLessons", "ProgressPercent", "BestScorePercent",
            "Passed", "CertificateCode", "DueAt", "Overdue"]);
        foreach (var r in rows)
            Line([r.Email, r.DisplayName, r.Department, r.CourseTitle, r.CompletedLessons.ToString(), r.TotalLessons.ToString(),
                r.ProgressPercent.ToString(System.Globalization.CultureInfo.InvariantCulture),
                r.BestScorePercent?.ToString(System.Globalization.CultureInfo.InvariantCulture), r.Passed ? "yes" : "no",
                r.CertificateCode, r.DueAt?.ToString("yyyy-MM-dd'T'HH:mm:ss'Z'"), r.Overdue ? "yes" : "no"]);
        return [.. Encoding.UTF8.GetPreamble(), .. Encoding.UTF8.GetBytes(sb.ToString())];
    }

    /// <summary>Prefixes a single quote to cells spreadsheet apps would interpret as formulas (local copy of Questions.Csv.Neutralize).</summary>
    public static string Neutralize(string? value)
    {
        value ??= "";
        if (value.Length > 0 && value[0] is '=' or '+' or '-' or '@' or '\t' or '\r') return "'" + value;
        return value;
    }

    public static string Escape(string? value)
    {
        var v = Neutralize(value);
        var needsQuotes = v.IndexOfAny([',', '"', '\r', '\n']) >= 0 || (v.Length > 0 && (char.IsWhiteSpace(v[0]) || char.IsWhiteSpace(v[^1])));
        return needsQuotes ? "\"" + v.Replace("\"", "\"\"") + "\"" : v;
    }

    /// <summary>(user, course) pairs where the user passed a certificate-counting assessment.</summary>
    public static async Task<HashSet<(Guid, Guid)>> PassedCourses(AppDbContext db, List<Guid> userIds) =>
        (await (from at in db.Attempts
                join s in db.Assessments on at.AssessmentId equals s.Id
                where userIds.Contains(at.UserId) && at.Passed == true && s.CountsTowardCertificate
                select new { at.UserId, s.CourseId }).Distinct().ToListAsync()).Select(x => (x.UserId, x.CourseId)).ToHashSet();
}
