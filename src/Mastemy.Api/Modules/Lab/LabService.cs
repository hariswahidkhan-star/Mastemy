using System.Text.Json;
using Mastemy.Api.Data;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Lab;

public record BlueprintSummary(int Id, LabEngine Engine, string Title, string Description, LabDifficulty Difficulty,
    int? TimeLimitMinutes, int SortOrder, bool IsActive);

public record BlueprintDetail(int Id, Guid CourseId, Guid? ModuleId, Guid? LessonId, LabEngine Engine, string Title,
    string Description, LabDifficulty Difficulty, int? TimeLimitMinutes, int? MaxAttempts, int SortOrder,
    string StarterCode, string SeedDataJson, string ChecksJson, string HintsJson, string InstructionsMarkdown);

public record SessionSummary(long Id, int BlueprintId, string BlueprintTitle, LabSessionStatus Status,
    int AttemptNumber, DateTime StartedUtc, DateTime? CompletedUtc, decimal? ScorePercent);

public record SessionDetail(long Id, int BlueprintId, LabSessionStatus Status, int AttemptNumber,
    string Code, DateTime StartedUtc, DateTime LastSavedUtc, DateTime? CompletedUtc,
    int? DurationSeconds, decimal? ScorePercent, string? CheckResultsJson, int HintsUsed, string? FeedbackJson);

public record StartSessionRequest(int BlueprintId);
public record SaveProgressRequest(string Code);
public record SubmitRequest(string Code, string? CheckResults);
public record HintResponse(int HintIndex, string Hint);

public class LabService(AppDbContext db, ICurrentUser me)
{
    public async Task<List<BlueprintSummary>> GetBlueprintsAsync(Guid courseId, Guid? moduleId, Guid? lessonId)
    {
        var q = db.Set<LabBlueprint>().Where(b => b.CourseId == courseId && b.IsActive);
        if (moduleId.HasValue) q = q.Where(b => b.ModuleId == moduleId);
        if (lessonId.HasValue) q = q.Where(b => b.LessonId == lessonId);
        return await q.OrderBy(b => b.SortOrder)
            .Select(b => new BlueprintSummary(b.Id, b.Engine, b.Title, b.Description, b.Difficulty, b.TimeLimitMinutes, b.SortOrder, b.IsActive))
            .ToListAsync();
    }

    public async Task<BlueprintDetail> GetBlueprintAsync(int id)
    {
        var b = await db.Set<LabBlueprint>().FindAsync(id) ?? throw AppException.NotFound("Blueprint");
        return new(b.Id, b.CourseId, b.ModuleId, b.LessonId, b.Engine, b.Title, b.Description, b.Difficulty,
            b.TimeLimitMinutes, b.MaxAttempts, b.SortOrder, b.StarterCode, b.SeedDataJson, b.ChecksJson, b.HintsJson, b.InstructionsMarkdown);
    }

    public async Task<SessionDetail> StartSessionAsync(int blueprintId)
    {
        var uid = me.RequireId();
        var blueprint = await db.Set<LabBlueprint>().FindAsync(blueprintId) ?? throw AppException.NotFound("Blueprint");

        var existingCount = await db.Set<LabSession>()
            .CountAsync(s => s.BlueprintId == blueprintId && s.UserId == uid);

        if (blueprint.MaxAttempts.HasValue && existingCount >= blueprint.MaxAttempts.Value)
            throw AppException.Bad($"Maximum attempts ({blueprint.MaxAttempts.Value}) reached for this lab.");

        var session = new LabSession
        {
            BlueprintId = blueprintId,
            UserId = uid,
            AttemptNumber = existingCount + 1,
            Code = blueprint.StarterCode
        };
        db.Set<LabSession>().Add(session);
        await db.SaveChangesAsync();
        return ToDetail(session);
    }

    public async Task<SessionDetail> SaveProgressAsync(long sessionId, string code)
    {
        var session = await OwnSession(sessionId);
        if (session.Status != LabSessionStatus.Active) throw AppException.Bad("Session is not active.");
        session.Code = code;
        session.LastSavedUtc = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return ToDetail(session);
    }

    public async Task<SessionDetail> SubmitAsync(long sessionId, string code, string? checkResults)
    {
        var session = await OwnSession(sessionId);
        if (session.Status != LabSessionStatus.Active) throw AppException.Bad("Session is not active.");

        session.Code = code;
        session.Status = LabSessionStatus.Completed;
        session.CompletedUtc = DateTime.UtcNow;
        session.DurationSeconds = (int)(session.CompletedUtc.Value - session.StartedUtc).TotalSeconds;
        session.CheckResultsJson = checkResults;
        session.LastSavedUtc = DateTime.UtcNow;

        if (checkResults != null)
        {
            try
            {
                using var doc = JsonDocument.Parse(checkResults);
                var root = doc.RootElement;
                if (root.ValueKind == JsonValueKind.Array)
                {
                    int total = root.GetArrayLength(), passed = 0;
                    foreach (var el in root.EnumerateArray())
                        if (el.TryGetProperty("passed", out var p) && p.GetBoolean()) passed++;
                    session.ScorePercent = total > 0 ? Math.Round((decimal)passed / total * 100, 2) : 0;
                }
            }
            catch { /* non-parseable results — score stays null */ }
        }

        await db.SaveChangesAsync();
        return ToDetail(session);
    }

    public async Task<SessionDetail> GetSessionAsync(long sessionId)
    {
        var session = await OwnSession(sessionId);
        return ToDetail(session);
    }

    public async Task<List<SessionSummary>> GetSessionsAsync(Guid? courseId)
    {
        var uid = me.RequireId();
        var q = db.Set<LabSession>()
            .Where(s => s.UserId == uid)
            .Join(db.Set<LabBlueprint>(), s => s.BlueprintId, b => b.Id, (s, b) => new { s, b });

        if (courseId.HasValue) q = q.Where(x => x.b.CourseId == courseId);

        return await q.OrderByDescending(x => x.s.StartedUtc)
            .Select(x => new SessionSummary(x.s.Id, x.s.BlueprintId, x.b.Title, x.s.Status,
                x.s.AttemptNumber, x.s.StartedUtc, x.s.CompletedUtc, x.s.ScorePercent))
            .ToListAsync();
    }

    public async Task<HintResponse> GetNextHintAsync(long sessionId)
    {
        var session = await OwnSession(sessionId);
        if (session.Status != LabSessionStatus.Active) throw AppException.Bad("Session is not active.");

        var blueprint = await db.Set<LabBlueprint>().FindAsync(session.BlueprintId) ?? throw AppException.NotFound("Blueprint");

        List<string> hints;
        try { hints = JsonSerializer.Deserialize<List<string>>(blueprint.HintsJson) ?? []; }
        catch { hints = []; }

        if (session.HintsUsed >= hints.Count) throw AppException.Bad("No more hints available.");

        var hint = hints[session.HintsUsed];
        session.HintsUsed++;
        await db.SaveChangesAsync();
        return new HintResponse(session.HintsUsed - 1, hint);
    }

    public async Task RecordEvidenceAsync(long sessionId, LabEvidence evidence)
    {
        var session = await OwnSession(sessionId);
        evidence.SessionId = session.Id;
        evidence.UserId = me.RequireId();
        evidence.RecordedUtc = DateTime.UtcNow;
        db.Set<LabEvidence>().Add(evidence);
        await db.SaveChangesAsync();
    }

    private async Task<LabSession> OwnSession(long id)
    {
        var uid = me.RequireId();
        var session = await db.Set<LabSession>().FindAsync(id) ?? throw AppException.NotFound("Session");
        if (session.UserId != uid) throw AppException.Forbidden();
        return session;
    }

    private static SessionDetail ToDetail(LabSession s) =>
        new(s.Id, s.BlueprintId, s.Status, s.AttemptNumber, s.Code, s.StartedUtc, s.LastSavedUtc,
            s.CompletedUtc, s.DurationSeconds, s.ScorePercent, s.CheckResultsJson, s.HintsUsed, s.FeedbackJson);
}

public class LabBlueprintService(AppDbContext db, ICurrentUser me)
{
    public async Task<LabBlueprint> CreateAsync(LabBlueprint blueprint)
    {
        RequireInstructor();
        blueprint.CreatedUtc = DateTime.UtcNow;
        blueprint.UpdatedUtc = DateTime.UtcNow;
        db.Set<LabBlueprint>().Add(blueprint);
        await db.SaveChangesAsync();
        return blueprint;
    }

    public async Task<LabBlueprint> UpdateAsync(int id, LabBlueprint input)
    {
        RequireInstructor();
        var bp = await db.Set<LabBlueprint>().FindAsync(id) ?? throw AppException.NotFound("Blueprint");
        bp.CourseId = input.CourseId;
        bp.ModuleId = input.ModuleId;
        bp.LessonId = input.LessonId;
        bp.Engine = input.Engine;
        bp.Title = input.Title;
        bp.Description = input.Description;
        bp.Difficulty = input.Difficulty;
        bp.TimeLimitMinutes = input.TimeLimitMinutes;
        bp.MaxAttempts = input.MaxAttempts;
        bp.SortOrder = input.SortOrder;
        bp.StarterCode = input.StarterCode;
        bp.SolutionCode = input.SolutionCode;
        bp.SeedDataJson = input.SeedDataJson;
        bp.ChecksJson = input.ChecksJson;
        bp.HintsJson = input.HintsJson;
        bp.InstructionsMarkdown = input.InstructionsMarkdown;
        bp.IsActive = input.IsActive;
        bp.UpdatedUtc = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return bp;
    }

    public async Task DeleteAsync(int id)
    {
        RequireInstructor();
        var bp = await db.Set<LabBlueprint>().FindAsync(id) ?? throw AppException.NotFound("Blueprint");
        bp.IsActive = false;
        bp.UpdatedUtc = DateTime.UtcNow;
        await db.SaveChangesAsync();
    }

    private void RequireInstructor()
    {
        me.RequireId();
        if (!me.IsInRole(Domain.Roles.Instructor) && !me.IsStaff)
            throw AppException.Forbidden();
    }
}
