using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mastemy.Api.Modules.Lab;

[ApiController]
[Authorize]
[Route("api/lab")]
public class LabController(LabService lab) : ControllerBase
{
    [HttpGet("blueprints")]
    public Task<List<BlueprintSummary>> Blueprints([FromQuery] Guid courseId, [FromQuery] Guid? moduleId, [FromQuery] Guid? lessonId)
        => lab.GetBlueprintsAsync(courseId, moduleId, lessonId);

    [HttpGet("blueprints/{id:int}")]
    public Task<BlueprintDetail> Blueprint(int id) => lab.GetBlueprintAsync(id);

    [HttpPost("sessions")]
    public Task<SessionDetail> Start(StartSessionRequest req) => lab.StartSessionAsync(req.BlueprintId);

    [HttpGet("sessions/{id:long}")]
    public Task<SessionDetail> Session(long id) => lab.GetSessionAsync(id);

    [HttpGet("sessions")]
    public Task<List<SessionSummary>> Sessions([FromQuery] Guid? courseId) => lab.GetSessionsAsync(courseId);

    [HttpPut("sessions/{id:long}/save")]
    public Task<SessionDetail> Save(long id, SaveProgressRequest req) => lab.SaveProgressAsync(id, req.Code);

    [HttpPost("sessions/{id:long}/submit")]
    public Task<SessionDetail> Submit(long id, SubmitRequest req) => lab.SubmitAsync(id, req.Code, req.CheckResults);

    [HttpPost("sessions/{id:long}/hint")]
    public Task<HintResponse> Hint(long id) => lab.GetNextHintAsync(id);
}

[ApiController]
[Authorize(Policy = "Instructor")]
[Route("api/studio/lab/blueprints")]
public class LabStudioController(LabBlueprintService blueprints) : ControllerBase
{
    [HttpPost]
    public Task<LabBlueprint> Create(LabBlueprint input) => blueprints.CreateAsync(input);

    [HttpPut("{id:int}")]
    public Task<LabBlueprint> Update(int id, LabBlueprint input) => blueprints.UpdateAsync(id, input);

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id) { await blueprints.DeleteAsync(id); return NoContent(); }
}
