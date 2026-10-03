using System.Text.Json;
using Mastemy.Api.Data;
using Mastemy.Api.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Ai;

[ApiController, Route("api/ai"), Authorize]
public class AiController(AiTutorService tutor, AiAssistService assist, FeynmanService feynman, AiBudgetService budget, IAiProvider provider, ICurrentUser me) : ControllerBase
{
    /// <summary>Whether AI is available, so the UI can say "not configured" instead of failing.</summary>
    [HttpGet("status")]
    public AiStatusDto Status() => provider.IsConfigured
        ? new AiStatusDto(true, provider.Model, null)
        : new AiStatusDto(false, null, "AI assistance is not configured on this server.");

    [HttpGet("usage/me")]
    public async Task<UsageSummaryDto> MyUsage()
    {
        tutor.RequireConfigured();
        return await budget.Summary(me.RequireId());
    }

    [HttpPost("tutor/conversations")]
    public Task<ConversationDto> Create(CreateConversationInput input) => tutor.Create(input);

    [HttpGet("tutor/conversations")]
    public Task<List<ConversationDto>> List([FromQuery] Guid? courseId) => tutor.List(courseId);

    [HttpGet("tutor/conversations/{id:guid}")]
    public Task<ConversationDetailDto> Get(Guid id) => tutor.Get(id);

    [HttpDelete("tutor/conversations/{id:guid}")]
    public async Task<IActionResult> Delete(Guid id) { await tutor.Delete(id); return NoContent(); }

    /// <summary>Sends a message; the reply streams as text/event-stream (events: delta, citations, done, error).</summary>
    [HttpPost("tutor/conversations/{id:guid}/messages")]
    public async Task Send(Guid id, SendMessageInput input, CancellationToken ct)
    {
        var plan = await tutor.Prepare(id, input, ct); // validation/authorization/budget errors surface as normal problem+json
        Response.StatusCode = 200;
        Response.ContentType = "text/event-stream; charset=utf-8";
        Response.Headers.CacheControl = "no-cache, no-store";
        Response.Headers["X-Accel-Buffering"] = "no";
        await Response.StartAsync(ct);
        var enumerator = tutor.Execute(plan, ct).GetAsyncEnumerator(ct);
        try
        {
            while (true)
            {
                SseEvent ev;
                try
                {
                    if (!await enumerator.MoveNextAsync()) break;
                    ev = enumerator.Current;
                }
                catch (AppException ex)
                {
                    await Write(new SseEvent("error", new { code = ex.Code, message = ex.Message, status = ex.Status }), ct);
                    break;
                }
                await Write(ev, ct);
            }
        }
        finally { await enumerator.DisposeAsync(); }
    }

    private async Task Write(SseEvent e, CancellationToken ct)
    {
        await Response.WriteAsync($"event: {e.Event}\ndata: {JsonSerializer.Serialize(e.Data, AiTutorService.Json)}\n\n", ct);
        await Response.Body.FlushAsync(ct);
    }

    [HttpPost("practice")]
    public Task<PracticeSetDto> Practice(PracticeInput input, CancellationToken ct) => assist.GeneratePractice(input, ct);

    [HttpGet("practice/{id:guid}")]
    public Task<PracticeSetDto> GetPractice(Guid id) => assist.GetPractice(id);

    [HttpPost("practice/{id:guid}/check")]
    public Task<PracticeCheckDto> Check(Guid id, PracticeCheckInput input) => assist.CheckPractice(id, input);

    // ---------- Feynman Engine ----------

    [HttpPost("feynman/start")]
    public Task<FeynmanStartResult> FeynmanStart(FeynmanStartInput input, CancellationToken ct) => feynman.StartAsync(input, ct);

    [HttpPost("feynman/{sessionId:guid}/explain")]
    public async Task FeynmanExplain(Guid sessionId, FeynmanExplainInput input, CancellationToken ct)
    {
        var plan = await feynman.PrepareContinue(sessionId, input, ct);
        Response.StatusCode = 200;
        Response.ContentType = "text/event-stream; charset=utf-8";
        Response.Headers.CacheControl = "no-cache, no-store";
        Response.Headers["X-Accel-Buffering"] = "no";
        await Response.StartAsync(ct);
        var enumerator = feynman.ExecuteContinue(plan, ct).GetAsyncEnumerator(ct);
        try
        {
            while (true)
            {
                SseEvent ev;
                try
                {
                    if (!await enumerator.MoveNextAsync()) break;
                    ev = enumerator.Current;
                }
                catch (AppException ex)
                {
                    await WriteSse(new SseEvent("error", new { code = ex.Code, message = ex.Message, status = ex.Status }), ct);
                    break;
                }
                await WriteSse(ev, ct);
            }
        }
        finally { await enumerator.DisposeAsync(); }
    }

    [HttpPost("feynman/{sessionId:guid}/evaluate")]
    public Task<FeynmanRubricDto> FeynmanEvaluate(Guid sessionId, CancellationToken ct) => feynman.EvaluateAsync(sessionId, ct);

    [HttpGet("feynman/sessions")]
    public Task<List<FeynmanSessionDto>> FeynmanSessions([FromQuery] Guid? courseId) => feynman.ListAsync(courseId);

    private async Task WriteSse(SseEvent e, CancellationToken ct)
    {
        await Response.WriteAsync($"event: {e.Event}\ndata: {JsonSerializer.Serialize(e.Data, AiTutorService.Json)}\n\n", ct);
        await Response.Body.FlushAsync(ct);
    }

    [HttpPost("studio/courses/{courseId:guid}/assist"), Authorize(Policy = "Instructor")]
    public Task<AssistResultDto> Assist(Guid courseId, AssistInput input, CancellationToken ct) => assist.Assist(courseId, input, ct);

    [HttpPost("studio/courses/{courseId:guid}/mcq-drafts"), Authorize(Policy = "Instructor")]
    public Task<McqDraftResultDto> McqDrafts(Guid courseId, McqDraftInput input, CancellationToken ct) => assist.McqDrafts(courseId, input, ct);
}

/// <summary>Staff views: usage metering and conversation METADATA only (content stays private to the learner).</summary>
[ApiController, Route("api/admin/ai"), Authorize(Policy = "Staff")]
public class AiAdminController(AppDbContext db, AiOptions opt, AiIndexer indexer, AuditService audit) : ControllerBase
{
    [HttpGet("usage")]
    public async Task<AdminUsageDto> Usage([FromQuery] string? period)
    {
        var p = string.IsNullOrWhiteSpace(period) ? AiBudgetService.PeriodOf(DateTime.UtcNow) : period.Trim();
        if (!System.Text.RegularExpressions.Regex.IsMatch(p, @"^\d{4}-\d{2}$")) throw AppException.Bad("period must be yyyy-MM.");
        var rows = await db.Set<AiUsageRecord>().AsNoTracking().Where(u => u.Period == p)
            .Select(u => new UsageRow(u.UserId, u.OrganizationId, u.Feature, u.Model,
                (long)u.InputTokens + u.CacheReadTokens + u.CacheWriteTokens, u.OutputTokens, u.CostEstimate))
            .ToListAsync();
        List<UsageRowDto> By(Func<UsageRow, string> key, int take = 100) => rows.GroupBy(key)
            .Select(g => new UsageRowDto(g.Key, g.Sum(r => r.In), g.Sum(r => r.Out), g.Sum(r => r.Cost), g.Count()))
            .OrderByDescending(r => r.InputTokens + r.OutputTokens).Take(take).ToList();
        return new AdminUsageDto(p, rows.Sum(r => r.In + r.Out), rows.Sum(r => r.Cost), opt.GlobalMonthlyTokens,
            By(r => r.Feature), By(r => r.Model), By(r => r.UserId.ToString(), 25), By(r => r.OrganizationId?.ToString() ?? "none"));
    }

    private record UsageRow(Guid UserId, Guid? OrganizationId, string Feature, string Model, long In, long Out, decimal Cost);

    [HttpGet("conversations")]
    public async Task<List<ConversationMetaDto>> Conversations([FromQuery] Guid? userId, [FromQuery] Guid? courseId)
    {
        var q = db.Set<AiConversation>().AsNoTracking();
        if (userId is { } u) q = q.Where(c => c.UserId == u);
        if (courseId is { } c2) q = q.Where(c => c.CourseId == c2);
        return await q.OrderByDescending(c => c.LastMessageAt).Take(500)
            .Select(c => new ConversationMetaDto(c.Id, c.UserId, c.CourseId, c.MessageCount, c.CreatedAt, c.LastMessageAt)).ToListAsync();
    }

    [HttpPost("courses/{courseId:guid}/reindex")]
    public async Task<object> Reindex(Guid courseId, CancellationToken ct)
    {
        var v = await indexer.EnsureIndexed(courseId, ct, force: true);
        audit.Record("ai.index.rebuilt", "Course", courseId, new { version = v });
        await db.SaveChangesAsync(ct);
        return new { courseId, snapshotVersion = v };
    }
}
