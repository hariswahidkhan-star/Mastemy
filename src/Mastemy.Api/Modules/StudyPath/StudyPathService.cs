using System.Text.Json;
using System.Text.Json.Nodes;
using Mastemy.Api.Data;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Ai;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.StudyPath;

public class StudyPathService(AppDbContext db, IAiProvider provider, AiBudgetService budget, AiOptions opt)
{
    private static readonly JsonSerializerOptions Json = new() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

    public void RequireConfigured() { if (!provider.IsConfigured) throw AiErrors.NotConfigured(); }

    // ---------- Optimal Path ----------

    public async Task<StudyPathRecommendationDto> GetOptimalPathAsync(Guid userId, Guid courseId, CancellationToken ct)
    {
        RequireConfigured();
        await budget.RequireBudget(userId, 0); // validate budget

        // Gather course structure
        var course = await db.Set<Domain.Course>().AsNoTracking().FirstOrDefaultAsync(c => c.Id == courseId, ct)
            ?? throw AppException.NotFound("Course");
        var modules = await db.Set<Domain.CourseModule>().AsNoTracking()
            .Where(m => m.CourseId == courseId).OrderBy(m => m.SortOrder)
            .ToListAsync(ct);
        var lessons = await db.Set<Domain.Lesson>().AsNoTracking()
            .Where(l => modules.Select(m => m.Id).Contains(l.ModuleId)).OrderBy(l => l.SortOrder)
            .ToListAsync(ct);

        // Gather progress
        var progress = await db.Set<Domain.LessonProgress>().AsNoTracking()
            .Where(p => p.UserId == userId && lessons.Select(l => l.Id).Contains(p.LessonId))
            .ToListAsync(ct);

        var completedIds = progress.Where(p => p.Completed).Select(p => p.LessonId).ToHashSet();

        var lessonSummary = lessons.Select(l => new
        {
            l.Id,
            l.Title,
            Completed = completedIds.Contains(l.Id),
            Module = modules.FirstOrDefault(m => m.Id == l.ModuleId)?.Title ?? "",
        }).ToList();

        var systemPrompt = $$"""
            You are an AI learning optimizer for the course "{{course.Title}}".
            Analyze the student's progress and recommend an optimal lesson order.
            Consider: dependencies between topics, knowledge gaps, and learning efficiency.
            Respond in JSON matching this schema exactly:
            {"recommendedLessonIds": ["guid",...], "reasoning": "string", "optimalOrder": [{"lessonId":"guid","title":"string","reason":"string"}], "estimatedMinutes": number}
            """;

        var userMsg = "Student progress:\n" + JsonSerializer.Serialize(lessonSummary, Json) + "\n\nPlease analyze and recommend the optimal learning path for remaining lessons.";

        var completion = await provider.Complete(new AiRequest(systemPrompt,
            [new AiChatMessage("user", userMsg)], opt.GenerationMaxOutputTokens), ct);

        await budget.Record(userId, courseId, "studypath", completion.Usage);

        // Parse AI response
        var jsonStart = completion.Text.IndexOf('{');
        var jsonEnd = completion.Text.LastIndexOf('}');
        var jsonText = jsonStart >= 0 && jsonEnd > jsonStart ? completion.Text[jsonStart..(jsonEnd + 1)] : "{}";

        List<Guid> recommendedIds = [];
        string reasoning = "";
        List<OptimalOrderItem> optimalOrder = [];
        int estimatedMinutes = 0;

        try
        {
            var parsed = JsonNode.Parse(jsonText);
            reasoning = (string?)parsed?["reasoning"] ?? "";
            estimatedMinutes = (int?)parsed?["estimatedMinutes"] ?? 0;
            if (parsed?["recommendedLessonIds"] is JsonArray ids)
                recommendedIds = ids.Select(x => Guid.TryParse((string?)x, out var g) ? g : Guid.Empty).Where(g => g != Guid.Empty).ToList();
            if (parsed?["optimalOrder"] is JsonArray order)
                optimalOrder = order.Select(o => new OptimalOrderItem(
                    Guid.TryParse((string?)o?["lessonId"], out var g) ? g : Guid.Empty,
                    (string?)o?["title"] ?? "",
                    (string?)o?["reason"] ?? "")).Where(o => o.LessonId != Guid.Empty).ToList();
        }
        catch { reasoning = completion.Text; }

        var rec = new StudyPathRecommendation
        {
            UserId = userId,
            CourseId = courseId,
            RecommendedLessonIds = JsonSerializer.Serialize(recommendedIds),
            Reasoning = reasoning,
            OptimalOrder = JsonSerializer.Serialize(optimalOrder, Json),
            EstimatedMinutes = estimatedMinutes,
        };
        db.Set<StudyPathRecommendation>().Add(rec);
        await db.SaveChangesAsync(ct);

        return new StudyPathRecommendationDto(rec.Id, courseId, recommendedIds, reasoning, optimalOrder, estimatedMinutes, rec.CreatedUtc);
    }

    // ---------- Streak ----------

    public async Task<LearningStreakDto> GetStreakAsync(Guid userId)
    {
        var streak = await db.Set<LearningStreak>().FirstOrDefaultAsync(s => s.UserId == userId);
        if (streak == null)
            return new LearningStreakDto(0, 0, DateTime.UtcNow, 0, 60);

        return new LearningStreakDto(streak.CurrentStreak, streak.LongestStreak,
            streak.LastActivityUtc, streak.TotalMinutesThisWeek, streak.WeeklyGoalMinutes);
    }

    public async Task<LearningStreakDto> RecordActivityAsync(Guid userId, int minutes)
    {
        if (minutes <= 0) throw AppException.Bad("Minutes must be positive.");

        var now = DateTime.UtcNow;
        var today = now.Date;
        var streak = await db.Set<LearningStreak>().FirstOrDefaultAsync(s => s.UserId == userId);

        if (streak == null)
        {
            streak = new LearningStreak
            {
                UserId = userId,
                CurrentStreak = 1,
                LongestStreak = 1,
                LastActivityUtc = now,
                TotalMinutesThisWeek = minutes,
            };
            db.Set<LearningStreak>().Add(streak);
        }
        else
        {
            var lastDate = streak.LastActivityUtc.Date;

            if (lastDate == today)
            {
                // Same day: just add minutes
                streak.TotalMinutesThisWeek += minutes;
            }
            else if (lastDate == today.AddDays(-1))
            {
                // Yesterday: increment streak
                streak.CurrentStreak++;
                streak.TotalMinutesThisWeek += minutes;
            }
            else
            {
                // Older: reset streak
                streak.CurrentStreak = 1;
                streak.TotalMinutesThisWeek = minutes;
            }

            if (streak.CurrentStreak > streak.LongestStreak)
                streak.LongestStreak = streak.CurrentStreak;

            // Reset weekly total on Monday
            var lastMonday = today.AddDays(-(int)today.DayOfWeek + (int)DayOfWeek.Monday);
            if (lastMonday < DateTime.MinValue.AddDays(7)) lastMonday = today;
            if (streak.LastActivityUtc.Date < lastMonday)
                streak.TotalMinutesThisWeek = minutes;

            streak.LastActivityUtc = now;
            streak.UpdatedUtc = now;
        }

        await db.SaveChangesAsync();
        return new LearningStreakDto(streak.CurrentStreak, streak.LongestStreak,
            streak.LastActivityUtc, streak.TotalMinutesThisWeek, streak.WeeklyGoalMinutes);
    }

    // ---------- Daily Challenge ----------

    public async Task<DailyChallengeDto> GenerateDailyChallengeAsync(Guid userId, Guid courseId, CancellationToken ct)
    {
        RequireConfigured();
        await budget.RequireBudget(userId, 0);

        // Check for existing today's challenge
        var today = DateTime.UtcNow.Date;
        var existing = await db.Set<DailyChallenge>().FirstOrDefaultAsync(
            c => c.UserId == userId && c.CourseId == courseId && c.CreatedUtc >= today, ct);
        if (existing != null)
            return ToDto(existing);

        // Get recently studied lessons
        var recentProgress = await db.Set<Domain.LessonProgress>().AsNoTracking()
            .Where(p => p.UserId == userId)
            .OrderByDescending(p => p.UpdatedAt)
            .Take(5)
            .ToListAsync(ct);

        var lessonIds = recentProgress.Select(p => p.LessonId).ToList();
        var recentLessons = await db.Set<Domain.Lesson>().AsNoTracking()
            .Where(l => lessonIds.Contains(l.Id))
            .ToListAsync(ct);

        var course = await db.Set<Domain.Course>().AsNoTracking().FirstOrDefaultAsync(c => c.Id == courseId, ct)
            ?? throw AppException.NotFound("Course");

        var lessonContext = recentLessons.Any()
            ? string.Join("\n", recentLessons.Select(l => $"- {l.Title}"))
            : "No recent lessons (generate a general challenge for the course)";

        var systemPrompt = $$"""
            Generate a quick 5-minute learning challenge for a student studying "{{course.Title}}".
            The challenge should test recall and understanding of recently studied material.
            Respond in JSON: {"question":"string","hint":"string","type":"recall|apply|connect"}
            Keep it concise and engaging. One question only.
            """;

        var completion = await provider.Complete(new AiRequest(systemPrompt,
            [new AiChatMessage("user", $"Recent lessons:\n{lessonContext}")],
            opt.TutorMaxOutputTokens), ct);

        await budget.Record(userId, courseId, "studypath.challenge", completion.Usage);

        var jsonStart = completion.Text.IndexOf('{');
        var jsonEnd = completion.Text.LastIndexOf('}');
        var jsonText = jsonStart >= 0 && jsonEnd > jsonStart ? completion.Text[jsonStart..(jsonEnd + 1)] : """{"question":"Review your recent lessons","hint":"Check your notes","type":"recall"}""";

        string question = "Review your recent lessons", hint = "", type = "recall";
        try
        {
            var parsed = JsonNode.Parse(jsonText);
            question = (string?)parsed?["question"] ?? question;
            hint = (string?)parsed?["hint"] ?? "";
            type = (string?)parsed?["type"] ?? "recall";
        }
        catch { /* use defaults */ }

        var challenge = new DailyChallenge
        {
            UserId = userId,
            CourseId = courseId,
            ChallengeType = type,
            ChallengeJson = jsonText,
        };
        db.Set<DailyChallenge>().Add(challenge);
        await db.SaveChangesAsync(ct);

        return ToDto(challenge);
    }

    public async Task CompleteChallengeAsync(Guid challengeId, Guid userId)
    {
        var challenge = await db.Set<DailyChallenge>().FirstOrDefaultAsync(c => c.Id == challengeId && c.UserId == userId)
            ?? throw AppException.NotFound("Challenge");
        if (challenge.CompletedAt.HasValue) return;
        challenge.CompletedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
    }

    private static DailyChallengeDto ToDto(DailyChallenge c)
    {
        DailyChallengeContent content;
        try
        {
            var parsed = JsonNode.Parse(c.ChallengeJson);
            content = new DailyChallengeContent(
                (string?)parsed?["question"] ?? "",
                (string?)parsed?["hint"] ?? "",
                (string?)parsed?["type"] ?? c.ChallengeType);
        }
        catch
        {
            content = new DailyChallengeContent("Review your recent lessons", "", c.ChallengeType);
        }
        return new DailyChallengeDto(c.Id, c.CourseId, c.ChallengeType, content, c.CompletedAt.HasValue, c.CreatedUtc);
    }
}
