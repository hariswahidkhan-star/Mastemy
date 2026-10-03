using Mastemy.Api.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mastemy.Api.Modules.StudyPath;

[ApiController, Route("api/studypath"), Authorize]
public class StudyPathController(StudyPathService svc, ICurrentUser me) : ControllerBase
{
    [HttpGet("{courseId:guid}/optimal")]
    public Task<StudyPathRecommendationDto> GetOptimalPath(Guid courseId, CancellationToken ct)
        => svc.GetOptimalPathAsync(me.RequireId(), courseId, ct);

    [HttpGet("streak")]
    public Task<LearningStreakDto> GetStreak()
        => svc.GetStreakAsync(me.RequireId());

    [HttpPost("activity")]
    public Task<LearningStreakDto> RecordActivity(RecordActivityInput input)
        => svc.RecordActivityAsync(me.RequireId(), input.Minutes);

    [HttpPost("{courseId:guid}/daily-challenge")]
    public Task<DailyChallengeDto> GenerateDailyChallenge(Guid courseId, CancellationToken ct)
        => svc.GenerateDailyChallengeAsync(me.RequireId(), courseId, ct);

    [HttpPost("challenges/{id:guid}/complete")]
    public async Task<IActionResult> CompleteChallenge(Guid id)
    {
        await svc.CompleteChallengeAsync(id, me.RequireId());
        return NoContent();
    }
}
