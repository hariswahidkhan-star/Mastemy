using Mastemy.Api.Modules.Questions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mastemy.Api.Modules.Assessment;

[ApiController]
[Authorize]
public class PracticeController(PracticeService svc) : ControllerBase
{
    [HttpPost("api/practice/sessions")]
    public Task<PracticeSessionView> Create(PracticeSessionInput input) => svc.Create(input);

    [HttpGet("api/practice/sessions")]
    public Task<List<PracticeSessionSummary>> Mine() => svc.Mine();

    [HttpGet("api/practice/sessions/{id:guid}")]
    public Task<PracticeSessionView> Get(Guid id) => svc.Get(id);

    [HttpPut("api/practice/sessions/{id:guid}/items/{itemId:guid}")]
    public Task<PracticeItemView> Answer(Guid id, Guid itemId, PracticeAnswerInput input) => svc.Answer(id, itemId, input);

    [HttpPost("api/practice/sessions/{id:guid}/items/{itemId:guid}/check")]
    public Task<CheckResult> Check(Guid id, Guid itemId) => svc.Check(id, itemId);

    [HttpPost("api/practice/sessions/{id:guid}/items/{itemId:guid}/challenge")]
    public Task<MyChallengeDto> Challenge(Guid id, Guid itemId, ChallengeInput input) => svc.Challenge(id, itemId, input);

    [HttpPost("api/practice/sessions/{id:guid}/finish")]
    public Task<PracticeResult> Finish(Guid id) => svc.Finish(id);

    [HttpGet("api/practice/review/due")]
    public Task<List<DueReviewDto>> Due([FromQuery] int limit = 50) => svc.Due(limit);

    [HttpGet("api/me/question-bookmarks")]
    public Task<List<BookmarkDto>> Bookmarks() => svc.Bookmarks();

    [HttpPut("api/me/question-bookmarks/{questionId:guid}")]
    public async Task<IActionResult> Bookmark(Guid questionId) { await svc.Bookmark(questionId); return NoContent(); }

    [HttpDelete("api/me/question-bookmarks/{questionId:guid}")]
    public async Task<IActionResult> Unbookmark(Guid questionId) { await svc.Unbookmark(questionId); return NoContent(); }
}

[ApiController]
[Authorize]
public class AccommodationsController(AccommodationService svc) : ControllerBase
{
    [Authorize(Policy = "Staff")]
    [HttpPost("api/admin/accommodations")]
    public Task<AccommodationDto> Grant(AccommodationInput input) => svc.Grant(input);

    [Authorize(Policy = "Staff")]
    [HttpGet("api/admin/accommodations")]
    public Task<List<AccommodationDto>> List([FromQuery] Guid? userId, [FromQuery] bool includeRevoked = false) => svc.List(userId, includeRevoked);

    [Authorize(Policy = "Staff")]
    [HttpDelete("api/admin/accommodations/{id:guid}")]
    public async Task<IActionResult> Revoke(Guid id) { await svc.Revoke(id); return NoContent(); }

    [HttpGet("api/me/accommodations")]
    public Task<List<MyAccommodationDto>> Mine() => svc.Mine();

    [HttpGet("api/studio/assessments/{id:guid}/policy")]
    public Task<AssessmentPolicyDto> GetPolicy(Guid id) => svc.GetPolicy(id);

    [HttpPut("api/studio/assessments/{id:guid}/policy")]
    public Task<AssessmentPolicyDto> SetPolicy(Guid id, AssessmentPolicyInput input) => svc.SetPolicy(id, input);
}

[ApiController]
[Authorize]
public class RegradeController(RegradeService svc, ItemAnalyticsService analytics) : ControllerBase
{
    [HttpPost("api/review/questions/{questionId:guid}/regrades")]
    public Task<RegradeDto> Propose(Guid questionId, RegradeProposalInput input) => svc.Propose(questionId, input);

    [HttpGet("api/review/regrades")]
    public Task<List<RegradeDto>> List([FromQuery] RegradeStatus? status) => svc.List(status);

    [HttpGet("api/review/regrades/{id:guid}")]
    public Task<RegradeDetailDto> Get(Guid id) => svc.Get(id);

    [Authorize(Policy = "Staff")]
    [HttpPost("api/admin/regrades/{id:guid}/approve")]
    public Task<RegradeDetailDto> Approve(Guid id, RegradeDecisionInput input) => svc.Approve(id, input);

    [Authorize(Policy = "Staff")]
    [HttpPost("api/admin/regrades/{id:guid}/reject")]
    public Task<RegradeDto> Reject(Guid id, RegradeDecisionInput input) => svc.Reject(id, input);

    [Authorize(Policy = "Staff")]
    [HttpGet("api/admin/certificate-flags")]
    public Task<List<CertificateFlagDto>> Flags([FromQuery] CertificateFlagStatus? status) => svc.Flags(status);

    [Authorize(Policy = "Staff")]
    [HttpPost("api/admin/certificate-flags/{id:guid}/decide")]
    public Task<CertificateFlagDto> DecideFlag(Guid id, CertificateFlagDecisionInput input) => svc.DecideFlag(id, input);

    [HttpGet("api/studio/questions/{id:guid}/analytics")]
    public Task<ItemAnalyticsDto> QuestionAnalytics(Guid id, [FromQuery] int? version) => analytics.ForQuestion(id, version);

    [HttpGet("api/studio/assessments/{id:guid}/item-analytics")]
    public Task<List<ItemAnalyticsDto>> AssessmentAnalytics(Guid id) => analytics.ForAssessment(id);
}

[ApiController]
[Authorize]
public class CertificateWorkflowController(CertificateWorkflowService svc) : ControllerBase
{
    [HttpGet("api/certificate-templates")]
    public Task<List<CertificateTemplateDto>> Templates([FromQuery] bool includeArchived = false) => svc.Templates(includeArchived);

    [Authorize(Policy = "Staff")]
    [HttpPost("api/admin/certificate-templates")]
    public Task<CertificateTemplateDto> Create(CertificateTemplateInput input) => svc.CreateTemplate(input);

    [Authorize(Policy = "Staff")]
    [HttpPut("api/admin/certificate-templates/{id:guid}")]
    public Task<CertificateTemplateDto> Update(Guid id, CertificateTemplateInput input) => svc.UpdateTemplate(id, input);

    [Authorize(Policy = "Staff")]
    [HttpDelete("api/admin/certificate-templates/{id:guid}")]
    public async Task<IActionResult> Archive(Guid id) { await svc.ArchiveTemplate(id); return NoContent(); }

    [HttpGet("api/studio/courses/{courseId:guid}/certificate-template")]
    public Task<CourseTemplateDto> GetCourseTemplate(Guid courseId) => svc.GetCourseTemplate(courseId);

    [HttpPut("api/studio/courses/{courseId:guid}/certificate-template")]
    public Task<CourseTemplateDto> SetCourseTemplate(Guid courseId, CourseTemplateInput input) => svc.SetCourseTemplate(courseId, input);

    [HttpPost("api/me/certificates/{id:guid}/corrections")]
    public Task<CorrectionDto> RequestCorrection(Guid id, CorrectionInput input) => svc.RequestCorrection(id, input);

    [HttpGet("api/me/certificate-corrections")]
    public Task<List<CorrectionDto>> MyCorrections() => svc.Corrections(null, mine: true);

    [Authorize(Policy = "Staff")]
    [HttpGet("api/admin/certificate-corrections")]
    public Task<List<CorrectionDto>> Corrections([FromQuery] CertificateRequestStatus? status) => svc.Corrections(status, mine: false);

    [Authorize(Policy = "Staff")]
    [HttpPost("api/admin/certificate-corrections/{id:guid}/decide")]
    public Task<CorrectionDto> DecideCorrection(Guid id, RequestDecisionInput input) => svc.DecideCorrection(id, input);

    [HttpPost("api/me/certificates/{id:guid}/appeals")]
    public Task<AppealDto> Appeal(Guid id, AppealInput input) => svc.Appeal(id, input);

    [HttpGet("api/me/certificate-appeals")]
    public Task<List<AppealDto>> MyAppeals() => svc.Appeals(null, mine: true);

    [Authorize(Policy = "Staff")]
    [HttpGet("api/admin/certificate-appeals")]
    public Task<List<AppealDto>> Appeals([FromQuery] CertificateRequestStatus? status) => svc.Appeals(status, mine: false);

    [Authorize(Policy = "Staff")]
    [HttpPost("api/admin/certificate-appeals/{id:guid}/decide")]
    public Task<AppealDto> DecideAppeal(Guid id, RequestDecisionInput input) => svc.DecideAppeal(id, input);
}
