using System.Text.Json;
using Mastemy.Api.Data;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Ai;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Scenario;

public class ScenarioService(AppDbContext db, ICurrentUser me, IAiProvider provider, AiOptions aiOpt, AiBudgetService budget)
{
    private static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web);

    private void RequireConfigured() { if (!provider.IsConfigured) throw AiErrors.NotConfigured(); }

    // ---------- Templates ----------

    public async Task<List<ScenarioTemplateDto>> GetTemplatesAsync(Guid? courseId)
    {
        var q = db.Set<ScenarioTemplate>().AsNoTracking().Where(t => t.IsActive);
        if (courseId is { } cid) q = q.Where(t => t.CourseId == cid || t.CourseId == null);
        return await q.OrderBy(t => t.Title).Select(t => new ScenarioTemplateDto(
            t.Id, t.CourseId, t.Title, t.Description, t.Category.ToString(),
            t.CharacterName, t.CharacterRole, t.SituationBrief,
            t.MaxTurns, t.Difficulty, t.CreatedUtc)).ToListAsync();
    }

    public async Task<ScenarioTemplateDetailDto> GetTemplateAsync(int id)
    {
        var t = await db.Set<ScenarioTemplate>().AsNoTracking().FirstOrDefaultAsync(x => x.Id == id)
            ?? throw AppException.NotFound("ScenarioTemplate");
        return new ScenarioTemplateDetailDto(
            t.Id, t.CourseId, t.Title, t.Description, t.Category.ToString(),
            t.CharacterName, t.CharacterRole, t.CharacterPersonality,
            t.SituationBrief, t.SystemPrompt, t.ScoringRubricJson,
            t.MaxTurns, t.Difficulty, t.IsActive, t.CreatedUtc);
    }

    // ---------- Sessions ----------

    public async Task<ScenarioSessionDetailDto> StartSessionAsync(int templateId, Guid userId)
    {
        RequireConfigured();
        var template = await db.Set<ScenarioTemplate>().FirstOrDefaultAsync(t => t.Id == templateId && t.IsActive)
            ?? throw AppException.NotFound("ScenarioTemplate");

        // Build the opening message from the character
        var openingRequest = new AiRequest(
            template.SystemPrompt,
            [new AiChatMessage("user", "[SCENARIO START] The student has just entered the scenario. Deliver your opening line in character. Stay in character throughout.")],
            aiOpt.TutorMaxOutputTokens);
        var opening = await provider.Complete(openingRequest, CancellationToken.None);
        await budget.Record(userId, template.CourseId, "scenario", opening.Usage);

        var now = DateTime.UtcNow;
        var firstMessage = new ScenarioMessageDto("assistant", opening.Text.Trim(), now);
        var session = new ScenarioSession
        {
            TemplateId = templateId,
            UserId = userId,
            TranscriptJson = JsonSerializer.Serialize(new[] { firstMessage }, Json),
            TurnCount = 0,
            StartedUtc = now,
        };
        db.Set<ScenarioSession>().Add(session);
        await db.SaveChangesAsync();

        return ToDetail(session, template, [firstMessage], null);
    }

    public record RespondPlan(ScenarioSession Session, ScenarioTemplate Template, List<ScenarioMessageDto> Transcript, AiRequest Request);

    public async Task<RespondPlan> PrepareRespond(long sessionId, string message, Guid userId, CancellationToken ct)
    {
        RequireConfigured();
        var content = (message ?? "").Trim();
        if (content.Length == 0) throw AppException.Bad("Message is required.", "invalid_message");
        if (content.Length > aiOpt.MaxUserMessageChars) throw AppException.Bad($"Message must be at most {aiOpt.MaxUserMessageChars} characters.", "invalid_message");

        var session = await db.Set<ScenarioSession>().FirstOrDefaultAsync(s => s.Id == sessionId && s.UserId == userId, ct)
            ?? throw AppException.NotFound("ScenarioSession");
        if (session.IsCompleted) throw AppException.Bad("This scenario has already been completed.", "scenario_completed");

        var template = await db.Set<ScenarioTemplate>().AsNoTracking().FirstAsync(t => t.Id == session.TemplateId, ct);
        var transcript = JsonSerializer.Deserialize<List<ScenarioMessageDto>>(session.TranscriptJson, Json) ?? [];

        // Add user message
        transcript.Add(new ScenarioMessageDto("user", content, DateTime.UtcNow));

        // Build messages for AI
        var messages = new List<AiChatMessage>();
        // Include recent history (last N turns)
        var historyMessages = transcript.TakeLast(aiOpt.HistoryTurns * 2 + 1).ToList();
        foreach (var m in historyMessages)
        {
            var role = m.Role == "assistant" ? "assistant" : "user";
            if (messages.Count > 0 && messages[^1].Role == role)
                messages[^1] = messages[^1] with { Text = messages[^1].Text + "\n\n" + m.Content };
            else
                messages.Add(new AiChatMessage(role, m.Content));
        }
        // Ensure first message is user
        if (messages.Count > 0 && messages[0].Role == "assistant")
            messages.Insert(0, new AiChatMessage("user", "[SCENARIO START]"));

        var turnsLeft = template.MaxTurns - session.TurnCount - 1;
        var turnHint = turnsLeft <= 2 ? $"\n\n[System note: {turnsLeft} student turns remaining. Begin wrapping up naturally.]" : "";
        if (messages.Count > 0 && messages[^1].Role == "user")
            messages[^1] = messages[^1] with { Text = messages[^1].Text + turnHint };

        var estimate = AiText.EstimateTokens(template.SystemPrompt) + messages.Sum(m => AiText.EstimateTokens(m.Text)) + 512;
        await budget.RequireBudget(userId, estimate);

        return new RespondPlan(session, template, transcript, new AiRequest(template.SystemPrompt, messages, aiOpt.TutorMaxOutputTokens));
    }

    public async IAsyncEnumerable<SseEvent> ExecuteRespond(RespondPlan plan, [System.Runtime.CompilerServices.EnumeratorCancellation] CancellationToken ct)
    {
        var uid = me.RequireId();
        var sb = new System.Text.StringBuilder();
        AiUsage? usage = null;
        await foreach (var e in provider.Stream(plan.Request, ct))
        {
            if (e is AiTextDelta d)
            {
                sb.Append(d.Text);
                yield return new SseEvent("delta", new { text = d.Text });
            }
            else if (e is AiFinished f) usage = f.Usage;
        }

        var replyText = sb.ToString().Trim();
        var now = DateTime.UtcNow;
        plan.Transcript.Add(new ScenarioMessageDto("assistant", replyText, now));
        plan.Session.TranscriptJson = JsonSerializer.Serialize(plan.Transcript, Json);
        plan.Session.TurnCount++;

        if (usage is not null) await budget.Record(uid, plan.Template.CourseId, "scenario", usage);
        await db.SaveChangesAsync(CancellationToken.None);

        var maxReached = plan.Session.TurnCount >= plan.Template.MaxTurns;
        yield return new SseEvent("done", new
        {
            content = replyText,
            turnCount = plan.Session.TurnCount,
            maxTurns = plan.Template.MaxTurns,
            maxReached,
        });
    }

    public async Task<ScenarioSessionDetailDto> CompleteAsync(long sessionId, Guid userId)
    {
        RequireConfigured();
        var session = await db.Set<ScenarioSession>().FirstOrDefaultAsync(s => s.Id == sessionId && s.UserId == userId)
            ?? throw AppException.NotFound("ScenarioSession");
        if (session.IsCompleted) throw AppException.Bad("Already completed.", "scenario_completed");

        var template = await db.Set<ScenarioTemplate>().AsNoTracking().FirstAsync(t => t.Id == session.TemplateId);
        var transcript = JsonSerializer.Deserialize<List<ScenarioMessageDto>>(session.TranscriptJson, Json) ?? [];

        // Build evaluation prompt
        var transcriptText = string.Join("\n", transcript.Select(m => $"{m.Role.ToUpperInvariant()}: {m.Content}"));
        var evalSystem = $$"""
            You are an expert professional skills evaluator. You will evaluate a student's performance in a role-play scenario.

            SCENARIO: {{template.Title}}
            CHARACTER: {{template.CharacterName}} ({{template.CharacterRole}})
            SITUATION: {{template.SituationBrief}}

            SCORING RUBRIC (JSON array of dimensions with weights and criteria):
            {{template.ScoringRubricJson}}

            Evaluate the student's responses (marked as USER) in the transcript below. For each dimension in the rubric, provide:
            - A score from 0 to 100
            - Specific feedback referencing actual moments from the conversation

            Also provide an overall summary of strengths and areas for improvement.

            Respond ONLY with valid JSON in this exact format:
            {
              "dimensions": [
                {"dimension": "<name>", "score": 0, "weight": 0.25, "feedback": "<specific feedback>"}
              ],
              "summary": "<2-3 paragraph overall assessment>"
            }
            """;

        var evalRequest = new AiRequest(evalSystem,
            [new AiChatMessage("user", $"<transcript>\n{transcriptText}\n</transcript>\n\nEvaluate the student's performance.")],
            aiOpt.GenerationMaxOutputTokens);
        var evalResult = await provider.Complete(evalRequest, CancellationToken.None);
        await budget.Record(userId, template.CourseId, "scenario_eval", evalResult.Usage);

        // Parse evaluation
        List<ScenarioDimensionScoreDto> scores = [];
        string summary = "";
        decimal overall = 0;
        try
        {
            var json = ExtractJson(evalResult.Text);
            using var doc = JsonDocument.Parse(json);
            var root = doc.RootElement;
            if (root.TryGetProperty("dimensions", out var dims))
            {
                foreach (var d in dims.EnumerateArray())
                {
                    scores.Add(new ScenarioDimensionScoreDto(
                        d.GetProperty("dimension").GetString() ?? "",
                        d.GetProperty("score").GetDecimal(),
                        d.TryGetProperty("weight", out var w) ? w.GetDecimal() : 1m,
                        d.GetProperty("feedback").GetString() ?? ""));
                }
            }
            if (root.TryGetProperty("summary", out var s)) summary = s.GetString() ?? "";
            var totalWeight = scores.Sum(s2 => s2.Weight);
            if (totalWeight > 0)
                overall = Math.Round(scores.Sum(s2 => s2.Score * s2.Weight) / totalWeight, 1);
        }
        catch
        {
            summary = evalResult.Text;
            overall = 0;
        }

        session.IsCompleted = true;
        session.CompletedUtc = DateTime.UtcNow;
        session.ScoresJson = JsonSerializer.Serialize(scores, Json);
        session.OverallScore = overall;
        session.SummaryFeedback = summary;
        await db.SaveChangesAsync();

        return ToDetail(session, template, transcript, scores);
    }

    public async Task<ScenarioSessionDetailDto> GetSessionAsync(long sessionId, Guid userId)
    {
        var session = await db.Set<ScenarioSession>().AsNoTracking().FirstOrDefaultAsync(s => s.Id == sessionId && s.UserId == userId)
            ?? throw AppException.NotFound("ScenarioSession");
        var template = await db.Set<ScenarioTemplate>().AsNoTracking().FirstAsync(t => t.Id == session.TemplateId);
        var transcript = JsonSerializer.Deserialize<List<ScenarioMessageDto>>(session.TranscriptJson, Json) ?? [];
        var scores = session.ScoresJson is not null
            ? JsonSerializer.Deserialize<List<ScenarioDimensionScoreDto>>(session.ScoresJson, Json) : null;
        return ToDetail(session, template, transcript, scores);
    }

    public async Task<List<ScenarioSessionDto>> GetSessionsAsync(Guid userId, Guid? courseId)
    {
        var q = db.Set<ScenarioSession>().AsNoTracking().Where(s => s.UserId == userId);
        if (courseId is { } cid)
        {
            var templateIds = await db.Set<ScenarioTemplate>().AsNoTracking()
                .Where(t => t.CourseId == cid || t.CourseId == null).Select(t => t.Id).ToListAsync();
            q = q.Where(s => templateIds.Contains(s.TemplateId));
        }
        var sessions = await q.OrderByDescending(s => s.StartedUtc).Take(100).ToListAsync();
        var tIds = sessions.Select(s => s.TemplateId).Distinct().ToList();
        var templates = await db.Set<ScenarioTemplate>().AsNoTracking().Where(t => tIds.Contains(t.Id))
            .ToDictionaryAsync(t => t.Id);
        return sessions.Select(s =>
        {
            var t = templates.GetValueOrDefault(s.TemplateId);
            return new ScenarioSessionDto(s.Id, s.TemplateId, t?.Title ?? "", t?.CharacterName ?? "",
                t?.Category.ToString() ?? "", s.TurnCount, t?.MaxTurns ?? 0, s.IsCompleted,
                s.OverallScore, s.StartedUtc, s.CompletedUtc);
        }).ToList();
    }

    // ---------- Studio (Instructor template CRUD) ----------

    public async Task<ScenarioTemplateDetailDto> CreateTemplateAsync(CreateScenarioTemplateInput input)
    {
        if (string.IsNullOrWhiteSpace(input.Title)) throw AppException.Bad("Title is required.");
        if (!Enum.TryParse<ScenarioCategory>(input.Category, true, out var cat)) throw AppException.Bad("Invalid category.");

        var t = new ScenarioTemplate
        {
            CourseId = input.CourseId,
            Title = input.Title.Trim(),
            Description = (input.Description ?? "").Trim(),
            Category = cat,
            CharacterName = (input.CharacterName ?? "").Trim(),
            CharacterRole = (input.CharacterRole ?? "").Trim(),
            CharacterPersonality = (input.CharacterPersonality ?? "").Trim(),
            SituationBrief = (input.SituationBrief ?? "").Trim(),
            SystemPrompt = (input.SystemPrompt ?? "").Trim(),
            ScoringRubricJson = input.ScoringRubricJson ?? "[]",
            MaxTurns = input.MaxTurns > 0 ? input.MaxTurns : 10,
            Difficulty = (input.Difficulty ?? "Intermediate").Trim(),
        };
        db.Set<ScenarioTemplate>().Add(t);
        await db.SaveChangesAsync();
        return await GetTemplateAsync(t.Id);
    }

    public async Task<ScenarioTemplateDetailDto> UpdateTemplateAsync(int id, UpdateScenarioTemplateInput input)
    {
        var t = await db.Set<ScenarioTemplate>().FirstOrDefaultAsync(x => x.Id == id)
            ?? throw AppException.NotFound("ScenarioTemplate");
        if (input.Title is { } title) t.Title = title.Trim();
        if (input.Description is { } desc) t.Description = desc.Trim();
        if (input.Category is { } catStr && Enum.TryParse<ScenarioCategory>(catStr, true, out var cat2)) t.Category = cat2;
        if (input.CharacterName is { } cn) t.CharacterName = cn.Trim();
        if (input.CharacterRole is { } cr) t.CharacterRole = cr.Trim();
        if (input.CharacterPersonality is { } cp) t.CharacterPersonality = cp.Trim();
        if (input.SituationBrief is { } sb) t.SituationBrief = sb.Trim();
        if (input.SystemPrompt is { } sp) t.SystemPrompt = sp.Trim();
        if (input.ScoringRubricJson is { } sr) t.ScoringRubricJson = sr;
        if (input.MaxTurns is { } mt && mt > 0) t.MaxTurns = mt;
        if (input.Difficulty is { } diff) t.Difficulty = diff.Trim();
        if (input.IsActive is { } ia) t.IsActive = ia;
        await db.SaveChangesAsync();
        return await GetTemplateAsync(t.Id);
    }

    public async Task DeleteTemplateAsync(int id)
    {
        var t = await db.Set<ScenarioTemplate>().FirstOrDefaultAsync(x => x.Id == id)
            ?? throw AppException.NotFound("ScenarioTemplate");
        t.IsActive = false;
        await db.SaveChangesAsync();
    }

    // ---------- Helpers ----------

    private static ScenarioSessionDetailDto ToDetail(ScenarioSession s, ScenarioTemplate t,
        List<ScenarioMessageDto> transcript, List<ScenarioDimensionScoreDto>? scores) =>
        new(s.Id, s.TemplateId, t.Title, t.CharacterName, t.CharacterRole,
            t.Category.ToString(), t.SituationBrief, s.TurnCount, t.MaxTurns, s.IsCompleted,
            transcript, scores, s.OverallScore, s.SummaryFeedback, s.StartedUtc, s.CompletedUtc);

    private static string ExtractJson(string text)
    {
        // Find JSON object in response text (may be wrapped in markdown code fences)
        var start = text.IndexOf('{');
        if (start < 0) return text;
        var end = text.LastIndexOf('}');
        if (end < start) return text;
        return text[start..(end + 1)];
    }
}
