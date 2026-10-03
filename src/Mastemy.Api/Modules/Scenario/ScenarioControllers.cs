using System.Text.Json;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Ai;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mastemy.Api.Modules.Scenario;

[ApiController, Route("api/scenarios"), Authorize]
public class ScenarioController(ScenarioService svc, ICurrentUser me) : ControllerBase
{
    private static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web);

    [HttpGet("templates")]
    public Task<List<ScenarioTemplateDto>> Templates([FromQuery] Guid? courseId) => svc.GetTemplatesAsync(courseId);

    [HttpGet("templates/{id:int}")]
    public Task<ScenarioTemplateDetailDto> Template(int id) => svc.GetTemplateAsync(id);

    [HttpPost("sessions")]
    public Task<ScenarioSessionDetailDto> Start(StartScenarioInput input) => svc.StartSessionAsync(input.TemplateId, me.RequireId());

    [HttpPost("sessions/{id:long}/respond")]
    public async Task Respond(long id, ScenarioRespondInput input, CancellationToken ct)
    {
        var plan = await svc.PrepareRespond(id, input.Message, me.RequireId(), ct);
        Response.StatusCode = 200;
        Response.ContentType = "text/event-stream; charset=utf-8";
        Response.Headers.CacheControl = "no-cache, no-store";
        Response.Headers["X-Accel-Buffering"] = "no";
        await Response.StartAsync(ct);
        var enumerator = svc.ExecuteRespond(plan, ct).GetAsyncEnumerator(ct);
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
        await Response.WriteAsync($"event: {e.Event}\ndata: {JsonSerializer.Serialize(e.Data, Json)}\n\n", ct);
        await Response.Body.FlushAsync(ct);
    }

    [HttpPost("sessions/{id:long}/complete")]
    public Task<ScenarioSessionDetailDto> Complete(long id) => svc.CompleteAsync(id, me.RequireId());

    [HttpGet("sessions")]
    public Task<List<ScenarioSessionDto>> Sessions([FromQuery] Guid? courseId) => svc.GetSessionsAsync(me.RequireId(), courseId);

    [HttpGet("sessions/{id:long}")]
    public Task<ScenarioSessionDetailDto> Session(long id) => svc.GetSessionAsync(id, me.RequireId());
}

[ApiController, Route("api/scenarios/studio"), Authorize(Policy = "Instructor")]
public class ScenarioStudioController(ScenarioService svc) : ControllerBase
{
    [HttpPost("templates")]
    public Task<ScenarioTemplateDetailDto> Create(CreateScenarioTemplateInput input) => svc.CreateTemplateAsync(input);

    [HttpPut("templates/{id:int}")]
    public Task<ScenarioTemplateDetailDto> Update(int id, UpdateScenarioTemplateInput input) => svc.UpdateTemplateAsync(id, input);

    [HttpDelete("templates/{id:int}")]
    public async Task<IActionResult> Delete(int id) { await svc.DeleteTemplateAsync(id); return NoContent(); }
}
