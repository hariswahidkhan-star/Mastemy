using System.Text.Json;
using Mastemy.Api.Data;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Catalog;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Ai;

public class AiCoachService(
    AppDbContext db, ICurrentUser me, AccessService access, CourseSnapshotService snapshots,
    IAiProvider provider, AiBudgetService budget, AiRateLimiter limiter)
{
    public void RequireConfigured() { if (!provider.IsConfigured) throw AiErrors.NotConfigured(); }

    private async Task<PublishedCourse> RequireAccess(Guid courseId, Guid uid)
    {
        var pc = await snapshots.TryLiveById(courseId) ?? throw AppException.NotFound("Course");
        if (me.IsStaff || await access.IsCourseAuthor(courseId)) return pc;
        if (await db.Enrollments.AnyAsync(e => e.UserId == uid && e.CourseId == courseId) || await access.HasPremiumAccess(courseId)) return pc;
        throw new AppException(403, "Enroll in this course to use AI Coach.", "not_enrolled");
    }

    public async Task<CoachHintDto> GetHintAsync(CoachHintInput input, CancellationToken ct)
    {
        var uid = me.RequireId();
        RequireConfigured();
        var pc = await RequireAccess(input.CourseId, uid);
        limiter.Acquire(uid);

        var system = $$"""
            You are an AI coding coach for the course "{{pc.Payload.Title}}".
            The student is working on a lab exercise and may be stuck.
            Based on the context and their current code, provide ONE short, contextual hint.
            Classify your hint as one of: Nudge (gentle direction), Warning (potential mistake), Encouragement (positive reinforcement), Strategy (approach suggestion).
            Respond in JSON: {"hintText": "...", "hintType": "Nudge|Warning|Encouragement|Strategy"}
            Keep hints under 2 sentences. Be helpful but don't give away the answer.
            """;

        var userMsg = $"Context: {input.Context}";
        if (!string.IsNullOrWhiteSpace(input.CurrentCode))
            userMsg += $"\n\nCurrent code:\n```\n{input.CurrentCode}\n```";

        var messages = new List<AiChatMessage> { new("user", userMsg) };
        var estimate = AiText.EstimateTokens(system) + AiText.EstimateTokens(userMsg) + 256;
        await budget.RequireBudget(uid, estimate);

        var request = new AiRequest(system, messages, 512);
        var completion = await provider.Complete(request, ct);

        string hintText;
        CoachHintType hintType;
        try
        {
            var parsed = JsonDocument.Parse(completion.Text).RootElement;
            hintText = parsed.GetProperty("hintText").GetString() ?? "Keep going, you're on the right track!";
            hintType = Enum.TryParse<CoachHintType>(parsed.GetProperty("hintType").GetString(), true, out var ht) ? ht : CoachHintType.Nudge;
        }
        catch
        {
            hintText = completion.Text.Trim();
            hintType = CoachHintType.Nudge;
        }

        var hint = new CoachHint
        {
            UserId = uid,
            CourseId = input.CourseId,
            LessonId = input.LessonId,
            Context = input.Context ?? "",
            HintText = hintText,
            HintType = hintType,
        };
        db.Set<CoachHint>().Add(hint);
        if (completion.Usage is not null) await budget.Record(uid, input.CourseId, "coach", completion.Usage);
        await db.SaveChangesAsync(ct);

        return new CoachHintDto(hint.Id, hint.HintText, hint.HintType.ToString(), hint.CreatedUtc);
    }

    public async Task<CoachHintDto> GetEncouragementAsync(CoachEncourageInput input, CancellationToken ct)
    {
        var uid = me.RequireId();
        RequireConfigured();
        await RequireAccess(input.CourseId, uid);
        limiter.Acquire(uid);

        var system = """
            You are an encouraging AI coach. The student just completed an action in their course.
            Generate a brief, genuine encouraging message (1-2 sentences). Be specific to what they accomplished.
            Respond with just the encouragement text, no JSON.
            """;

        var messages = new List<AiChatMessage> { new("user", $"The student just: {input.Action}") };
        var estimate = AiText.EstimateTokens(system) + AiText.EstimateTokens(input.Action) + 128;
        await budget.RequireBudget(uid, estimate);

        var request = new AiRequest(system, messages, 256);
        var completion = await provider.Complete(request, ct);

        var hint = new CoachHint
        {
            UserId = uid,
            CourseId = input.CourseId,
            LessonId = Guid.Empty,
            Context = input.Action,
            HintText = completion.Text.Trim(),
            HintType = CoachHintType.Encouragement,
        };
        db.Set<CoachHint>().Add(hint);
        if (completion.Usage is not null) await budget.Record(uid, input.CourseId, "coach", completion.Usage);
        await db.SaveChangesAsync(ct);

        return new CoachHintDto(hint.Id, hint.HintText, hint.HintType.ToString(), hint.CreatedUtc);
    }
}
