using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Net.Http.Headers;

namespace Mastemy.Api.Modules.Assessment;

public record CertificateVisibilityInput(bool PubliclyVisible);

[ApiController]
public class CertificatePdfController(CertificateService svc) : ControllerBase
{
    /// <summary>Owner (bearer token) or anyone while the certificate is publicly visible. Revoked: 410.</summary>
    [AllowAnonymous]
    [EnableRateLimiting("auth")]
    [HttpGet("api/certificates/{code}/pdf")]
    public async Task<IActionResult> Pdf(string code)
    {
        var (pdf, normalized) = await svc.Pdf(code);
        Response.Headers[HeaderNames.XContentTypeOptions] = "nosniff";
        Response.Headers[HeaderNames.CacheControl] = "private, no-store";
        return File(pdf, "application/pdf", $"mastemy-certificate-{normalized}.pdf");
    }

    [Authorize(Policy = "Staff")]
    [HttpGet("api/admin/certificate-templates/{id:guid}/preview.pdf")]
    public async Task<IActionResult> TemplatePreview(Guid id)
    {
        var pdf = await svc.PreviewTemplate(id);
        Response.Headers[HeaderNames.XContentTypeOptions] = "nosniff";
        Response.Headers[HeaderNames.CacheControl] = "private, no-store";
        return File(pdf, "application/pdf");
    }

    [Authorize]
    [HttpPut("api/me/certificates/{id:guid}/visibility")]
    public Task<MyCertificateDto> Visibility(Guid id, CertificateVisibilityInput input) => svc.SetVisibility(id, input.PubliclyVisible);
}
