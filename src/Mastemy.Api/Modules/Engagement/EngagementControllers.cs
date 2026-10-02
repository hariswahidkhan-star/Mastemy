using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mastemy.Api.Modules.Engagement;

[ApiController]
public class DiscoveryController(DiscoveryService svc) : ControllerBase
{
    [HttpGet("api/me/wishlist"), Authorize]
    public Task<List<WishlistItemDto>> Wishlist() => svc.Wishlist();

    [HttpPost("api/me/wishlist/{courseId:guid}"), Authorize]
    public async Task<IActionResult> Add(Guid courseId) { await svc.AddWishlist(courseId); return NoContent(); }

    [HttpDelete("api/me/wishlist/{courseId:guid}"), Authorize]
    public async Task<IActionResult> Remove(Guid courseId) { await svc.RemoveWishlist(courseId); return NoContent(); }

    [HttpGet("api/me/recently-viewed"), Authorize]
    public Task<List<RecentlyViewedDto>> Recent() => svc.Recent();

    [HttpPost("api/me/recently-viewed/{courseId:guid}"), Authorize]
    public async Task<IActionResult> Track(Guid courseId) { await svc.TrackView(courseId); return NoContent(); }

    [HttpGet("api/courses/compare"), AllowAnonymous]
    public Task<List<CompareCourseDto>> Compare([FromQuery] string? ids) => svc.Compare(ids);

    [HttpGet("api/courses/{id:guid}/related"), AllowAnonymous]
    public Task<List<CourseCardLiteDto>> Related(Guid id) => svc.Related(id);
}

[ApiController]
public class DiscussionsController(DiscussionService svc) : ControllerBase
{
    [HttpGet("api/courses/{id:guid}/discussions"), AllowAnonymous]
    public Task<EngagementPage<ThreadSummaryDto>> List(Guid id, [FromQuery] Guid? lessonId, [FromQuery] string? q,
        [FromQuery] bool? resolved, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        => svc.List(id, lessonId, q, resolved, page, pageSize);

    [HttpPost("api/courses/{id:guid}/discussions"), Authorize]
    public Task<ThreadDetailDto> Create(Guid id, ThreadInput input) => svc.Create(id, input);

    [HttpGet("api/discussions/{id:guid}"), AllowAnonymous]
    public Task<ThreadDetailDto> Get(Guid id) => svc.Get(id);

    [HttpPut("api/discussions/{id:guid}"), Authorize]
    public Task<ThreadDetailDto> Edit(Guid id, ThreadEditInput input) => svc.EditThread(id, input);

    [HttpPost("api/discussions/{id:guid}/replies"), Authorize]
    public Task<ReplyDto> Reply(Guid id, ReplyInput input) => svc.Reply(id, input);

    [HttpPut("api/discussion-replies/{id:guid}"), Authorize]
    public Task<ReplyDto> EditReply(Guid id, ReplyInput input) => svc.EditReply(id, input);

    [HttpPost("api/discussions/{id:guid}/resolve"), Authorize]
    public Task<ThreadDetailDto> Resolve(Guid id, ResolveInput input) => svc.SetResolved(id, input.Resolved);

    [HttpPost("api/moderation/discussions/{id:guid}/hide"), Authorize]
    public async Task<IActionResult> Hide(Guid id, HideInput input) { await svc.HideThread(id, input); return NoContent(); }

    [HttpPost("api/moderation/discussion-replies/{id:guid}/hide"), Authorize]
    public async Task<IActionResult> HideReply(Guid id, HideInput input) { await svc.HideReply(id, input); return NoContent(); }
}

[ApiController, Authorize]
public class AnnouncementsController(AnnouncementService svc) : ControllerBase
{
    [HttpPost("api/studio/courses/{id:guid}/announcements")]
    public Task<AnnouncementCreatedDto> Create(Guid id, AnnouncementInput input, [FromHeader(Name = "Idempotency-Key")] string? idempotencyKey)
        => svc.Create(id, input, idempotencyKey);

    [HttpGet("api/courses/{id:guid}/announcements")]
    public Task<EngagementPage<AnnouncementDto>> List(Guid id, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        => svc.List(id, page, pageSize);
}

[ApiController, Authorize]
public class NotificationsController(NotificationService svc) : ControllerBase
{
    [HttpGet("api/me/notifications")]
    public Task<NotificationPageDto> List([FromQuery] int page = 1, [FromQuery] int pageSize = 20, [FromQuery] bool unreadOnly = false)
        => svc.List(page, pageSize, unreadOnly);

    [HttpPost("api/me/notifications/{id:guid}/read")]
    public async Task<IActionResult> Read(Guid id) { await svc.MarkRead(id); return NoContent(); }

    [HttpPost("api/me/notifications/read-all")]
    public async Task<IActionResult> ReadAll() { await svc.MarkAllRead(); return NoContent(); }

    [HttpGet("api/me/notification-preferences")]
    public Task<PreferencesDto> Prefs() => svc.Preferences();

    [HttpPut("api/me/notification-preferences")]
    public Task<PreferencesDto> UpdatePrefs(PreferencesInput input) => svc.UpdatePreferences(input);
}

[ApiController, Authorize]
public class IssuesController(IssueReportService svc) : ControllerBase
{
    [HttpPost("api/courses/{id:guid}/issues")]
    public Task<IssueDto> Report(Guid id, IssueInput input) => svc.Report(id, input);

    [HttpGet("api/studio/courses/{id:guid}/issues")]
    public Task<EngagementPage<IssueDto>> List(Guid id, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        => svc.List(id, page, pageSize);
}
