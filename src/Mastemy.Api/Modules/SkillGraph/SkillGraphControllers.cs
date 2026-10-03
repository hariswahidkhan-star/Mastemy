using Mastemy.Api.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mastemy.Api.Modules.SkillGraph;

[ApiController]
[Route("api/skills")]
[Authorize]
public class SkillGraphController(SkillGraphService svc, ICurrentUser me) : ControllerBase
{
    [HttpGet("graph"), AllowAnonymous]
    public Task<SkillGraphDto> Graph([FromQuery] int? categoryId) =>
        svc.GetGraphAsync(categoryId);

    [HttpGet("mastery")]
    public Task<SkillMasterySummaryDto> Mastery([FromQuery] int? categoryId) =>
        svc.GetUserMasteryAsync(me.RequireId(), categoryId);

    [HttpGet("mastery/{skillId:int}")]
    public Task<SkillMasteryDto> SkillMastery(int skillId) =>
        svc.GetSkillMasteryAsync(me.RequireId(), skillId);

    [HttpPost("mastery/{skillId:int}/evidence")]
    public Task<SkillMasteryDto> RecordEvidence(int skillId, RecordEvidenceRequest req) =>
        svc.RecordEvidenceAsync(me.RequireId(), skillId, req.Score, req.Source);

    [HttpGet("gaps/{targetSkillId:int}")]
    public Task<List<SkillGapDto>> Gaps(int targetSkillId) =>
        svc.FindGapsAsync(me.RequireId(), targetSkillId);

    [HttpGet("recommendations")]
    public Task<List<SkillRecommendationDto>> Recommendations() =>
        svc.GetRecommendationsAsync(me.RequireId());

    [HttpGet("due-reviews")]
    public Task<List<SkillMasteryDto>> DueReviews() =>
        svc.GetDueReviewsAsync(me.RequireId());
}

[ApiController]
[Route("api/admin/skill-graph")]
[Authorize(Policy = "Staff")]
public class AdminSkillGraphController(SkillGraphService svc) : ControllerBase
{
    [HttpPost("nodes")]
    public Task<SkillNodeDto> CreateNode(SkillNodeUpsertRequest req) => svc.CreateNode(req);

    [HttpPut("nodes/{id:int}")]
    public Task<SkillNodeDto> UpdateNode(int id, SkillNodeUpsertRequest req) => svc.UpdateNode(id, req);

    [HttpPost("edges")]
    public Task<SkillEdgeDto> CreateEdge(SkillEdgeRequest req) => svc.CreateEdge(req);

    [HttpDelete("edges/{id:int}")]
    public async Task<IActionResult> DeleteEdge(int id) { await svc.DeleteEdge(id); return NoContent(); }
}
