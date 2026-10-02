using Mastemy.Api.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mastemy.Api.Modules.Analytics;

[ApiController]
[AllowAnonymous]
[Route("api/analytics")]
public class AnalyticsController(AnalyticsIngestService svc) : ControllerBase
{
    private string? Cookie => Request.Cookies[AnalyticsIngestService.ConsentCookie];

    /// <summary>Consent-gated event ingest. 403 consent_required without consent; 429 when rate limited.</summary>
    [HttpPost("events")]
    public async Task<IActionResult> Events(AnalyticsEventsRequest req)
    {
        // The client key is used in memory only (rate limiting and the daily-rotating hash); it is never stored.
        var key = (HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown") + "|" + Request.Headers.UserAgent.ToString();
        var result = await svc.Ingest(req, Cookie, Tokens.Sha256(key));
        return Accepted(result);
    }

    [HttpGet("consent")]
    public Task<ConsentDto> Consent() => svc.Consent(Cookie);

    /// <summary>Records the choice (on the account when signed in) and sets the first-party consent cookie.</summary>
    [HttpPut("consent"), Microsoft.AspNetCore.RateLimiting.EnableRateLimiting("public-write")]
    public async Task<ConsentDto> SetConsent(ConsentRequest req)
    {
        var dto = await svc.SetConsent(req.Analytics);
        Response.Cookies.Append(AnalyticsIngestService.ConsentCookie, req.Analytics ? "analytics" : "necessary", new CookieOptions
        {
            HttpOnly = false, // the web client reads it to decide whether to send events
            Secure = Request.IsHttps, SameSite = SameSiteMode.Lax, Path = "/", MaxAge = TimeSpan.FromDays(180), IsEssential = true,
        });
        return dto;
    }
}

[ApiController]
public class AnalyticsReportsController(AnalyticsReportService svc) : ControllerBase
{
    /// <summary>Course owner/co-instructors and staff (editors are refused with editor_scope).</summary>
    [HttpGet("api/studio/courses/{id:guid}/analytics"), Authorize(Policy = "Instructor")]
    public Task<CourseAnalyticsDto> Course(Guid id, [FromQuery] DateTime? from, [FromQuery] DateTime? to, [FromQuery] string? bucket)
        => svc.Course(id, from, to, bucket);

    [HttpGet("api/studio/courses/{id:guid}/analytics/questions"), Authorize(Policy = "Instructor")]
    public Task<List<QuestionStatDto>> Questions(Guid id) => svc.QuestionStats(id);

    [HttpGet("api/admin/analytics/dashboard"), Authorize(Policy = "Staff")]
    public Task<AdminDashboardDto> Admin([FromQuery] DateTime? from, [FromQuery] DateTime? to, [FromQuery] string? bucket)
        => svc.Admin(from, to, bucket);
}
