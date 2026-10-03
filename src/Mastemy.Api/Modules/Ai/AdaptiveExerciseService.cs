using System.Text.Json;
using System.Text.Json.Nodes;
using Mastemy.Api.Data;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Catalog;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Ai;

public class AdaptiveExerciseService(
    AppDbContext db, ICurrentUser me, AccessService access, CourseSnapshotService snapshots,
    IAiProvider provider, AiBudgetService budget, AiRateLimiter limiter)
{
    public void RequireConfigured() { if (!provider.IsConfigured) throw AiErrors.NotConfigured(); }

    private async Task<PublishedCourse> RequireAccess(Guid courseId, Guid uid)
    {
        var pc = await snapshots.TryLiveById(courseId) ?? throw AppException.NotFound("Course");
        if (me.IsStaff || await access.IsCourseAuthor(courseId)) return pc;
        if (await db.Enrollments.AnyAsync(e => e.UserId == uid && e.CourseId == courseId) || await access.HasPremiumAccess(courseId)) return pc;
        throw new AppException(403, "Enroll in this course to generate exercises.", "not_enrolled");
    }

    private static readonly JsonObject ExerciseSchema = JsonNode.Parse("""
        {
          "type": "object",
          "properties": {
            "title": { "type": "string" },
            "instructions": { "type": "string" },
            "starterCode": { "type": "string" },
            "expectedBehavior": { "type": "string" },
            "hints": { "type": "array", "items": { "type": "string" } }
          },
          "required": ["title", "instructions", "expectedBehavior", "hints"]
        }
        """)!.AsObject();

    public async Task<GeneratedExerciseDto> GenerateAsync(GenerateExerciseInput input, CancellationToken ct)
    {
        var uid = me.RequireId();
        RequireConfigured();
        var pc = await RequireAccess(input.CourseId, uid);
        limiter.Acquire(uid);

        var weakAreas = input.WeakAreas is { Length: > 0 } ? string.Join(", ", input.WeakAreas) : "general practice";

        var system = $"""
            You are an expert educator creating a unique practice exercise for the course "{pc.Payload.Title}".
            The student needs practice in: {weakAreas}.
            Generate ONE exercise that:
            - Is unique and not a copy of standard textbook problems
            - Targets the specified weak areas
            - Has clear instructions
            - Includes starter code if applicable (otherwise null)
            - Describes expected behavior
            - Provides 2-3 progressive hints (from vague to specific)
            Respond in JSON matching the schema.
            """;

        var messages = new List<AiChatMessage> { new("user", $"Generate a practice exercise focusing on: {weakAreas}") };
        var estimate = AiText.EstimateTokens(system) + 512;
        await budget.RequireBudget(uid, estimate);

        var request = new AiRequest(system, messages, 2048, ExerciseSchema);
        var completion = await provider.Complete(request, ct);

        JsonNode parsed;
        try { parsed = JsonNode.Parse(completion.Text) ?? throw new JsonException(); }
        catch (JsonException) { throw new AppException(502, "AI returned invalid exercise output.", "ai_invalid_output"); }

        var exercise = new GeneratedExercise
        {
            UserId = uid,
            CourseId = input.CourseId,
            LessonId = input.LessonId,
            SkillArea = weakAreas,
            Difficulty = "medium",
            ExerciseJson = completion.Text,
        };
        db.Set<GeneratedExercise>().Add(exercise);
        if (completion.Usage is not null) await budget.Record(uid, input.CourseId, "exercise_gen", completion.Usage);
        await db.SaveChangesAsync(ct);

        return ToDto(exercise, parsed);
    }

    public async Task RecordAttemptAsync(Guid exerciseId, RecordAttemptInput input, CancellationToken ct)
    {
        var uid = me.RequireId();
        var ex = await db.Set<GeneratedExercise>().FirstOrDefaultAsync(e => e.Id == exerciseId && e.UserId == uid, ct)
            ?? throw AppException.NotFound("Exercise");
        ex.AttemptedAt = DateTime.UtcNow;
        ex.Passed = input.Passed;
        await db.SaveChangesAsync(ct);
    }

    public async Task<List<GeneratedExerciseDto>> GetHistoryAsync(Guid courseId, CancellationToken ct)
    {
        var uid = me.RequireId();
        var rows = await db.Set<GeneratedExercise>().AsNoTracking()
            .Where(e => e.UserId == uid && e.CourseId == courseId)
            .OrderByDescending(e => e.CreatedUtc).Take(50).ToListAsync(ct);
        return rows.Select(r =>
        {
            JsonNode? p = null;
            try { p = JsonNode.Parse(r.ExerciseJson); } catch { }
            return ToDto(r, p);
        }).ToList();
    }

    private static GeneratedExerciseDto ToDto(GeneratedExercise e, JsonNode? p) => new(
        e.Id, e.CourseId, e.LessonId, e.SkillArea, e.Difficulty,
        new ExercisePayload(
            (string?)p?["title"] ?? "Practice Exercise",
            (string?)p?["instructions"] ?? "",
            (string?)p?["starterCode"],
            (string?)p?["expectedBehavior"] ?? "",
            p?["hints"]?.AsArray().Select(n => (string?)n ?? "").Where(s => s.Length > 0).ToList() ?? []),
        e.AttemptedAt, e.Passed, e.CreatedUtc);
}
