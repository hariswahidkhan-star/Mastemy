using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace Mastemy.Api.Modules.Account;

[ApiController]
[Route("api/me")]
[Authorize]
public class AccountController(ProfileService profiles, SkillProfileService skills, DataRightsService rights) : ControllerBase
{
    [HttpGet("profile")] public Task<ProfileDto> Profile() => profiles.Get();
    [HttpPut("profile")] public Task<ProfileDto> UpdateProfile(UpdateProfileRequest req) => profiles.Update(req);

    [HttpGet("learning-goals")] public Task<LearningGoalsDto> Goals() => profiles.GetGoals();
    [HttpPut("learning-goals")] public Task<LearningGoalsDto> PutGoals(UpdateLearningGoalsRequest req) => profiles.PutGoals(req);

    [HttpGet("skills")] public Task<SkillProfileDto> Skills() => skills.Get();
    [HttpPost("skills")] public Task<SkillEvidenceDto> AddSkill(AddSkillRequest req) => skills.Add(req);
    [HttpDelete("skills/{id:guid}")]
    public async Task<IActionResult> DeleteSkill(Guid id) { await skills.Delete(id); return NoContent(); }

    [HttpGet("export"), EnableRateLimiting("auth")]
    public async Task<IActionResult> Export()
    {
        var data = await rights.Export();
        Response.Headers.ContentDisposition = $"attachment; filename=\"mastemy-export-{DateTime.UtcNow:yyyyMMdd}.json\"";
        Response.Headers.CacheControl = "no-store";
        return Ok(data);
    }

    /// <summary>Immediate and irreversible: anonymizes the account. Requires password, confirm "DELETE" and an MFA code when enrolled.</summary>
    [HttpDelete(""), EnableRateLimiting("auth")]
    public async Task<IActionResult> Delete(DeleteAccountRequest req) { await rights.Delete(req); return NoContent(); }
}

[ApiController]
public class PublicInstructorProfileController(ProfileService profiles) : ControllerBase
{
    [HttpGet("api/instructors/{id:guid}/profile"), AllowAnonymous]
    public Task<PublicInstructorProfileDto> Get(Guid id) => profiles.PublicInstructor(id);
}
