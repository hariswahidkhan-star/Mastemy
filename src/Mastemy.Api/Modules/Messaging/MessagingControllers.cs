using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mastemy.Api.Modules.Messaging;

[ApiController]
[Authorize]
public class MessagingController(MessagingService svc) : ControllerBase
{
    [HttpGet("api/messages/conversations")] public Task<List<ConversationDto>> Conversations() => svc.MyConversations();

    [HttpGet("api/messages/conversations/{id:guid}")]
    public Task<ConversationPageDto> Get(Guid id, [FromQuery] DateTime? before, [FromQuery] int limit = 50) => svc.Get(id, before, limit);

    [HttpPost("api/messages/conversations/{id:guid}/messages")]
    public async Task<IActionResult> Reply(Guid id, SendMessageInput input) => StatusCode(201, await svc.Reply(id, input));

    /// <summary>Learner → the course's instructors.</summary>
    [HttpPost("api/courses/{courseId:guid}/messages")]
    public async Task<IActionResult> ToInstructors(Guid courseId, SendMessageInput input) => StatusCode(201, await svc.LearnerSend(courseId, input));

    /// <summary>Instructor → an enrolled learner.</summary>
    [HttpPost("api/studio/courses/{courseId:guid}/learners/{learnerId:guid}/messages")]
    public async Task<IActionResult> ToLearner(Guid courseId, Guid learnerId, SendMessageInput input) =>
        StatusCode(201, await svc.InstructorSend(courseId, learnerId, input));

    [HttpPost("api/messages/{messageId:guid}/report")]
    public async Task<IActionResult> Report(Guid messageId, ReportMessageInput input) => StatusCode(201, await svc.Report(messageId, input));

    [HttpGet("api/messages/blocks")] public Task<List<BlockDto>> Blocks() => svc.Blocks();
    [HttpPost("api/messages/blocks")] public Task<BlockDto> Block(BlockInput input) => svc.Block(input);

    [HttpDelete("api/messages/blocks/{userId:guid}")]
    public async Task<IActionResult> Unblock(Guid userId) { await svc.Unblock(userId); return NoContent(); }

    [HttpGet("api/studio/courses/{courseId:guid}/auto-messages")]
    public Task<List<AutoMessageDto>> AutoMessages(Guid courseId) => svc.AutoMessages(courseId);

    [HttpPut("api/studio/courses/{courseId:guid}/auto-messages/{kind}")]
    public Task<AutoMessageDto> SetAutoMessage(Guid courseId, string kind, AutoMessageInput input) => svc.SetAutoMessage(courseId, kind, input);

    [HttpGet("api/moderation/messages/reports")]
    public Task<List<ModerationReportDto>> Reports([FromQuery] bool includeHidden = false) => svc.Reports(includeHidden);

    [HttpPost("api/moderation/messages/{messageId:guid}/hide")]
    public Task<MessageDto> Hide(Guid messageId, HideMessageInput input) => svc.Hide(messageId, input);

    [HttpPost("api/moderation/messages/{messageId:guid}/unhide")]
    public Task<MessageDto> Unhide(Guid messageId) => svc.Unhide(messageId);
}
