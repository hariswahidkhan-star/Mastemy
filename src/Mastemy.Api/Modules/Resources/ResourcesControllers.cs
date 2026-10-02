using Mastemy.Api.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Net.Http.Headers;

namespace Mastemy.Api.Modules.Resources;

/// <summary>Stops MVC from buffering/reading the multipart body for model binding, so the upload can be streamed.</summary>
[AttributeUsage(AttributeTargets.Method)]
public sealed class DisableFormValueModelBindingAttribute : Attribute, IResourceFilter
{
    public void OnResourceExecuting(ResourceExecutingContext context)
    {
        var factories = context.ValueProviderFactories;
        factories.RemoveType<FormValueProviderFactory>();
        factories.RemoveType<FormFileValueProviderFactory>();
        factories.RemoveType<JQueryFormValueProviderFactory>();
    }

    public void OnResourceExecuted(ResourceExecutedContext context) { }
}

/// <summary>Reads exactly one file part named "file" from a multipart body as a stream (no buffering of the whole upload).</summary>
internal static class MultipartUpload
{
    public static async Task<T> WithFile<T>(HttpRequest request, long maxFileBytes, Func<string?, Stream, CancellationToken, Task<T>> handle, CancellationToken ct)
    {
        var sizeFeature = request.HttpContext.Features.Get<IHttpMaxRequestBodySizeFeature>();
        if (sizeFeature is { IsReadOnly: false }) sizeFeature.MaxRequestBodySize = maxFileBytes + 64 * 1024;
        if (!MediaTypeHeaderValue.TryParse(request.ContentType, out var mt) || !mt.MediaType.Equals("multipart/form-data", StringComparison.OrdinalIgnoreCase))
            throw AppException.Bad("Upload must be multipart/form-data with a 'file' part.", "multipart_required");
        var boundary = HeaderUtilities.RemoveQuotes(mt.Boundary).Value;
        if (string.IsNullOrEmpty(boundary) || boundary.Length > 200) throw AppException.Bad("Missing multipart boundary.", "multipart_required");
        var reader = new MultipartReader(boundary, request.Body) { HeadersLengthLimit = 16 * 1024 };
        MultipartSection? section;
        while ((section = await reader.ReadNextSectionAsync(ct)) is not null)
        {
            if (!ContentDispositionHeaderValue.TryParse(section.ContentDisposition, out var cd) || !cd.IsFileDisposition()) continue;
            if (!string.Equals(cd.Name.Value, "file", StringComparison.Ordinal)) continue;
            var name = cd.FileNameStar.HasValue ? cd.FileNameStar.Value : HeaderUtilities.RemoveQuotes(cd.FileName).Value;
            return await handle(name, section.Body, ct);
        }
        throw AppException.Bad("No 'file' part found in the upload.", "file_required");
    }
}

[ApiController]
[Authorize]
public class StudioResourcesController(ResourceService svc) : ControllerBase
{
    [HttpGet("api/studio/courses/{courseId:guid}/resources")]
    public Task<List<ResourceDto>> List(Guid courseId) => svc.StudioList(courseId);

    [HttpGet("api/studio/courses/{courseId:guid}/resources/usage")]
    public Task<ResourceUsageDto> Usage(Guid courseId) => svc.Usage(courseId);

    /// <summary>multipart/form-data with one "file" part; metadata in the query string.</summary>
    [HttpPost("api/studio/courses/{courseId:guid}/resources")]
    [DisableRequestSizeLimit]
    [DisableFormValueModelBinding] // bounded per request by MultipartUpload using Resources:MaxFileBytes
    public async Task<IActionResult> Upload(Guid courseId, [FromQuery] Guid? lessonId, [FromQuery] string? kind, [FromQuery] string? language,
        [FromQuery] bool isPremium, CancellationToken ct)
    {
        var dto = await MultipartUpload.WithFile(Request, svc.Options.MaxFileBytes,
            (name, body, c) => svc.Upload(courseId, new UploadRequest(lessonId, kind, language, isPremium), name, body, c), ct);
        return StatusCode(201, dto);
    }

    [HttpPut("api/studio/resources/{id:guid}/file")]
    [DisableRequestSizeLimit]
    [DisableFormValueModelBinding]
    public Task<ResourceDto> Replace(Guid id, [FromQuery] bool? isPremium, CancellationToken ct) =>
        MultipartUpload.WithFile(Request, svc.Options.MaxFileBytes, (name, body, c) => svc.Replace(id, isPremium, name, body, c), ct);

    [HttpPatch("api/studio/resources/{id:guid}")]
    public Task<ResourceDto> Update(Guid id, UpdateResourceInput input) => svc.Update(id, input);

    [HttpDelete("api/studio/resources/{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct) { await svc.Delete(id, ct); return NoContent(); }
}

[ApiController]
[AllowAnonymous]
public class LearnResourcesController(ResourceService svc) : ControllerBase
{
    [HttpGet("api/learn/lessons/{lessonId:guid}/resources")]
    public Task<List<LearnerResourceDto>> List(Guid lessonId) => svc.LessonResources(lessonId);

    [HttpGet("api/learn/resources/{id:guid}/download")]
    public async Task<IActionResult> Download(Guid id)
    {
        var d = await svc.Download(id);
        Response.Headers[HeaderNames.XContentTypeOptions] = "nosniff";
        Response.Headers[HeaderNames.ContentSecurityPolicy] = "default-src 'none'; sandbox";
        Response.Headers[HeaderNames.CacheControl] = d.Premium ? "private, no-store" : "private, max-age=300";
        // FileStreamResult with a download name emits Content-Disposition: attachment (with RFC 5987 filename*).
        return File(d.Content, d.ContentType, d.FileName, enableRangeProcessing: true);
    }

    [HttpGet("api/learn/lessons/{lessonId:guid}/captions")]
    public Task<List<CaptionTrackDto>> Captions(Guid lessonId) => svc.CaptionTracks(lessonId);

    [HttpGet("api/learn/captions/{id:guid}/vtt")]
    public async Task<IActionResult> Caption(Guid id, CancellationToken ct)
    {
        var vtt = await svc.CaptionVtt(id, ct);
        Response.Headers[HeaderNames.XContentTypeOptions] = "nosniff";
        return Content(vtt, "text/vtt; charset=utf-8");
    }

    [HttpGet("api/learn/lessons/{lessonId:guid}/transcript")]
    public Task<List<TranscriptMatch>> Transcript(Guid lessonId, [FromQuery] string? q, [FromQuery] string? language, CancellationToken ct) =>
        svc.Transcript(lessonId, q, language, ct);
}
