using System.Runtime.CompilerServices;
using System.Text.Json;
using System.Text.Json.Nodes;
using Mastemy.Api.Data;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Catalog;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Ai;

public class FeynmanService(
    AppDbContext db, ICurrentUser me, AccessService access, CourseSnapshotService snapshots,
    IAiProvider provider, AiOptions opt, AiBudgetService budget, AiRateLimiter limiter)
{
    private const int MinExchanges = 3;
    private const int MaxExchanges = 5;
    private const int MaxTopicLength = 500;
    private const int MaxMessageChars = 3000;

    public void RequireConfigured() { if (!provider.IsConfigured) throw AiErrors.NotConfigured(); }

    private async Task<PublishedCourse> RequireAccess(Guid courseId, Guid uid)
    {
        var pc = await snapshots.TryLiveById(courseId) ?? throw AppException.NotFound("Course");
        if (me.IsStaff || await access.IsCourseAuthor(courseId)) return pc;
        if (await db.Enrollments.AnyAsync(e => e.UserId == uid && e.CourseId == courseId) || await access.HasPremiumAccess(courseId)) return pc;
        throw new AppException(403, "Enroll in this course to use Explain to Learn.", "not_enrolled");
    }

    private static FeynmanSessionDto ToDto(FeynmanSession s) => new(s.Id, s.CourseId, s.Topic, s.ExchangeCount,
        s.EvaluatedUtc.HasValue, s.CreatedUtc, s.EvaluatedUtc);

    private static string SystemPrompt(string topic, string courseName) => $"""
        You are a curious student trying to understand "{topic}" in the context of the course "{courseName}".
        The person explaining to you is a learner proving their understanding.

        Your job:
        - Ask genuine clarifying questions about parts you "don't understand"
        - Probe for deeper understanding ("But WHY does that happen?", "What would happen if...?")
        - If they use jargon, ask them to explain it simply
        - If their explanation has gaps, ask about the missing parts
        - Do NOT correct them or teach them — you are the student, they are the teacher
        - Be encouraging but genuinely confused about complex parts
        - Keep responses short (2-3 sentences max) — mostly questions
        - Sound like a real student, not an AI
        """;

    private static readonly JsonObject EvaluationSchema = JsonNode.Parse("""
        {
          "type": "object",
          "properties": {
            "accuracy": { "type": "integer", "description": "0-100: Are the facts correct?" },
            "completeness": { "type": "integer", "description": "0-100: Are all key aspects covered?" },
            "depth": { "type": "integer", "description": "0-100: Deep understanding or surface recall?" },
            "clarity": { "type": "integer", "description": "0-100: Could someone learn from this?" },
            "misconceptions": { "type": "array", "items": { "type": "string" }, "description": "Incorrect beliefs detected" },
            "wellExplained": { "type": "array", "items": { "type": "string" }, "description": "What was explained well" },
            "needsWork": { "type": "array", "items": { "type": "string" }, "description": "What needs improvement" },
            "summary": { "type": "string", "description": "2-3 sentence overall feedback" }
          },
          "required": ["accuracy", "completeness", "depth", "clarity", "misconceptions", "wellExplained", "needsWork", "summary"]
        }
        """)!.AsObject();

    public async Task<FeynmanStartResult> StartAsync(FeynmanStartInput input, CancellationToken ct)
    {
        var uid = me.RequireId();
        RequireConfigured();
        var topic = (input.Topic ?? "").Trim();
        if (topic.Length == 0) throw AppException.Bad("Topic is required.");
        if (topic.Length > MaxTopicLength) throw AppException.Bad($"Topic must be at most {MaxTopicLength} characters.");
        var pc = await RequireAccess(input.CourseId, uid);

        var firstMessage = $"Hi! I'm trying to understand {topic} but I'm struggling with it. Can you explain it to me in a way that makes sense? I'm taking {pc.Payload.Title} and this concept keeps coming up.";

        var now = DateTime.UtcNow;
        var transcript = new List<FeynmanTranscriptEntry>
        {
            new("assistant", firstMessage, now)
        };

        var session = new FeynmanSession
        {
            UserId = uid,
            CourseId = input.CourseId,
            Topic = topic,
            TranscriptJson = JsonSerializer.Serialize(transcript, AiTutorService.Json),
            ExchangeCount = 0,
            CreatedUtc = now,
        };
        db.Set<FeynmanSession>().Add(session);
        await db.SaveChangesAsync(ct);

        return new FeynmanStartResult(ToDto(session), firstMessage);
    }

    public record ContinuePlan(FeynmanSession Session, string CourseName, List<FeynmanTranscriptEntry> Transcript, string UserMessage);

    public async Task<ContinuePlan> PrepareContinue(Guid sessionId, FeynmanExplainInput input, CancellationToken ct)
    {
        var uid = me.RequireId();
        RequireConfigured();
        var session = await db.Set<FeynmanSession>().FirstOrDefaultAsync(s => s.Id == sessionId && s.UserId == uid, ct)
            ?? throw AppException.NotFound("Feynman session");
        if (session.EvaluatedUtc.HasValue) throw AppException.Bad("This session has already been evaluated.", "already_evaluated");
        if (session.ExchangeCount >= MaxExchanges) throw AppException.Bad("Maximum exchanges reached. Please evaluate your explanation.", "max_exchanges");

        var content = (input.Message ?? "").Trim();
        if (content.Length == 0) throw AppException.Bad("Message is required.", "invalid_message");
        if (content.Length > MaxMessageChars) throw AppException.Bad($"Message must be at most {MaxMessageChars} characters.", "invalid_message");

        var pc = await RequireAccess(session.CourseId, uid);
        limiter.Acquire(uid);

        var transcript = JsonSerializer.Deserialize<List<FeynmanTranscriptEntry>>(session.TranscriptJson, AiTutorService.Json) ?? [];
        return new ContinuePlan(session, pc.Payload.Title, transcript, content);
    }

    public async IAsyncEnumerable<SseEvent> ExecuteContinue(ContinuePlan plan, [EnumeratorCancellation] CancellationToken ct)
    {
        var uid = me.RequireId();
        var now = DateTime.UtcNow;
        plan.Transcript.Add(new FeynmanTranscriptEntry("user", plan.UserMessage, now));

        var messages = plan.Transcript.Select(t => new AiChatMessage(t.Role, t.Content)).ToList();
        var system = SystemPrompt(plan.Session.Topic, plan.CourseName);

        var estimate = AiText.EstimateTokens(system) + messages.Sum(m => AiText.EstimateTokens(m.Text)) + 512;
        await budget.RequireBudget(uid, estimate);

        var request = new AiRequest(system, messages, opt.TutorMaxOutputTokens);

        var sb = new System.Text.StringBuilder();
        AiUsage? usage = null;
        await foreach (var e in provider.Stream(request, ct))
        {
            if (e is AiTextDelta d)
            {
                sb.Append(d.Text);
                yield return new SseEvent("delta", new { text = d.Text });
            }
            else if (e is AiFinished f) { usage = f.Usage; }
        }

        var replyText = sb.ToString().Trim();
        plan.Transcript.Add(new FeynmanTranscriptEntry("assistant", replyText, DateTime.UtcNow));

        plan.Session.ExchangeCount++;
        plan.Session.TranscriptJson = JsonSerializer.Serialize(plan.Transcript, AiTutorService.Json);
        if (usage is not null) await budget.Record(uid, plan.Session.CourseId, "feynman", usage);
        await db.SaveChangesAsync(CancellationToken.None);

        yield return new SseEvent("done", new
        {
            content = replyText,
            exchangeCount = plan.Session.ExchangeCount,
            maxExchanges = MaxExchanges,
            canEvaluate = plan.Session.ExchangeCount >= MinExchanges,
        });
    }

    public async Task<FeynmanRubricDto> EvaluateAsync(Guid sessionId, CancellationToken ct)
    {
        var uid = me.RequireId();
        RequireConfigured();
        var session = await db.Set<FeynmanSession>().FirstOrDefaultAsync(s => s.Id == sessionId && s.UserId == uid, ct)
            ?? throw AppException.NotFound("Feynman session");
        if (session.EvaluatedUtc.HasValue) throw AppException.Bad("This session has already been evaluated.", "already_evaluated");
        if (session.ExchangeCount < MinExchanges) throw AppException.Bad($"At least {MinExchanges} exchanges are required before evaluation.", "insufficient_exchanges");

        var pc = await RequireAccess(session.CourseId, uid);
        limiter.Acquire(uid);

        var transcript = JsonSerializer.Deserialize<List<FeynmanTranscriptEntry>>(session.TranscriptJson, AiTutorService.Json) ?? [];
        var learnerParts = string.Join("\n\n", transcript.Where(t => t.Role == "user").Select(t => t.Content));

        var evalSystem = $"""
            You are an expert educator evaluating a learner's explanation of "{session.Topic}" from the course "{pc.Payload.Title}".

            Below is the full transcript of their explanation session. The learner was asked to explain the concept to a curious student.

            Evaluate the LEARNER's messages (not the student's questions) on these criteria:
            - Accuracy (0-100): Are the facts and concepts correct?
            - Completeness (0-100): Are all key aspects of the topic covered?
            - Depth (0-100): Does the explanation show deep understanding or just surface-level recall?
            - Clarity (0-100): Is the explanation clear enough that someone could learn from it?

            Also identify:
            - Any misconceptions or incorrect beliefs
            - What was explained well
            - What needs more work

            Be fair but rigorous. A score of 70+ means solid understanding. 90+ means exceptional.
            """;

        var transcriptText = string.Join("\n", transcript.Select(t => $"[{t.Role.ToUpperInvariant()}]: {t.Content}"));
        var evalMessages = new List<AiChatMessage> { new("user", $"Here is the explanation transcript:\n\n{transcriptText}") };

        var estimate = AiText.EstimateTokens(evalSystem) + AiText.EstimateTokens(transcriptText) + 2048;
        await budget.RequireBudget(uid, estimate);

        var request = new AiRequest(evalSystem, evalMessages, 4096, EvaluationSchema);
        var completion = await provider.Complete(request, ct);

        JsonNode parsed;
        try { parsed = JsonNode.Parse(completion.Text) ?? throw new JsonException(); }
        catch (JsonException) { throw new AppException(502, "AI returned invalid evaluation output.", "ai_invalid_output"); }

        var accuracy = Math.Clamp((int?)parsed["accuracy"] ?? 0, 0, 100);
        var completeness = Math.Clamp((int?)parsed["completeness"] ?? 0, 0, 100);
        var depth = Math.Clamp((int?)parsed["depth"] ?? 0, 0, 100);
        var clarity = Math.Clamp((int?)parsed["clarity"] ?? 0, 0, 100);
        var overall = (accuracy * 0.3m + completeness * 0.25m + depth * 0.25m + clarity * 0.2m);

        var misconceptions = parsed["misconceptions"]?.AsArray().Select(n => (string?)n ?? "").Where(s => s.Length > 0).ToList() ?? [];
        var wellExplained = parsed["wellExplained"]?.AsArray().Select(n => (string?)n ?? "").Where(s => s.Length > 0).ToList() ?? [];
        var needsWork = parsed["needsWork"]?.AsArray().Select(n => (string?)n ?? "").Where(s => s.Length > 0).ToList() ?? [];
        var summary = (string?)parsed["summary"] ?? "";

        var feedback = new FeynmanFeedbackDto(wellExplained, needsWork, summary);

        session.AccuracyScore = accuracy;
        session.CompletenessScore = completeness;
        session.DepthScore = depth;
        session.ClarityScore = clarity;
        session.MisconceptionsJson = JsonSerializer.Serialize(misconceptions, AiTutorService.Json);
        session.FeedbackJson = JsonSerializer.Serialize(feedback, AiTutorService.Json);
        session.EvaluatedUtc = DateTime.UtcNow;

        if (completion.Usage is not null) await budget.Record(uid, session.CourseId, "feynman", completion.Usage);
        await db.SaveChangesAsync(CancellationToken.None);

        return new FeynmanRubricDto(accuracy, completeness, depth, clarity, Math.Round(overall, 1), misconceptions, feedback);
    }

    public async Task<List<FeynmanSessionDto>> ListAsync(Guid? courseId)
    {
        var uid = me.RequireId();
        RequireConfigured();
        var q = db.Set<FeynmanSession>().AsNoTracking().Where(s => s.UserId == uid);
        if (courseId is { } cid) q = q.Where(s => s.CourseId == cid);
        return (await q.OrderByDescending(s => s.CreatedUtc).Take(100).ToListAsync()).Select(ToDto).ToList();
    }
}
