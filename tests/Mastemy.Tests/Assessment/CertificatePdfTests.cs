using System.Net;
using System.Text;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Assessment;
using static Mastemy.Tests.Assessment.AssessmentFixture;

namespace Mastemy.Tests.Assessment;

public class CertificatePdfTests(AssessmentFixture fx) : IClassFixture<AssessmentFixture>
{
    private async Task<(Certificate Cert, HttpClient Owner)> Issue(string name = "Ada Lovelace", string title = "Networking Fundamentals")
    {
        var (uid, owner) = await fx.User();
        var (aid, _) = await fx.User(Roles.Instructor);
        var course = await fx.Course(aid, CourseStatus.Published);
        var cert = new Certificate
        {
            Code = CertificateService.NewCode(), UserId = uid, CourseId = course.Id, AttemptId = Guid.NewGuid(), RecipientName = name,
            CourseTitle = title, AssessmentCriteria = "Passed the FinalAssessment assessment \"Final\" with a score of 85% against a pass threshold of 70%.",
            ScorePercent = 85m, Status = CertificateStatus.Valid, PubliclyVisible = true, IssuedAt = new DateTime(2026, 9, 1, 0, 0, 0, DateTimeKind.Utc),
        };
        await fx.WithDb(async db => { db.Certificates.Add(cert); await db.SaveChangesAsync(); });
        return (cert, owner);
    }

    [Fact]
    public async Task Pdf_is_generated_for_public_certificates_and_contains_the_code()
    {
        var (cert, _) = await Issue();
        var anon = fx.Factory.CreateClient();
        var r = await anon.GetAsync($"/api/certificates/{cert.Code.ToLowerInvariant()}/pdf");
        Assert.Equal(HttpStatusCode.OK, r.StatusCode);
        Assert.Equal("application/pdf", r.Content.Headers.ContentType!.MediaType);
        Assert.Equal("attachment", r.Content.Headers.ContentDisposition!.DispositionType);
        var bytes = await r.Content.ReadAsByteArrayAsync();
        Assert.True(bytes.Length > 1000);
        Assert.Equal("%PDF", Encoding.ASCII.GetString(bytes, 0, 4));
        var raw = Encoding.Latin1.GetString(bytes);
        Assert.Contains(cert.Code, raw);
        Assert.Contains("/FontFile2", raw); // fonts are embedded, not host-dependent
    }

    [Fact]
    public async Task Arabic_names_render_with_the_bundled_unicode_font()
    {
        var (cert, owner) = await Issue("محمد عبد الله", "أساسيات الشبكات");
        var r = await owner.GetAsync($"/api/certificates/{cert.Code}/pdf");
        Assert.Equal(HttpStatusCode.OK, r.StatusCode);
        var raw = Encoding.Latin1.GetString(await r.Content.ReadAsByteArrayAsync());
        Assert.Contains("Noto#20Naskh#20Arabic", raw); // embedded subset of the bundled Arabic font
    }

    [Fact]
    public void Arabic_shaping_uses_contextual_forms_and_rtl_order()
    {
        // "سلام": seen initial, lam-alef ligature (final, joined to seen), meem isolated (alef does not join left); drawn right-to-left.
        var runs = ArabicText.ToVisual("سلام");
        var run = Assert.Single(runs);
        Assert.True(run.Arabic);
        Assert.Equal("\uFEE1\uFEFC\uFEB3", run.Text);
        var mixed = ArabicText.ToVisual("Ali علي 2026");
        Assert.Equal("2026", mixed[0].Text);
        Assert.Contains(mixed, x => x.Text == "Ali");
        Assert.Equal([new VisualRun("Plain", false)], ArabicText.ToVisual("Plain"));
    }

    [Fact]
    public async Task Revoked_certificate_pdf_is_gone()
    {
        var (cert, owner) = await Issue();
        var (_, admin) = await fx.User(Roles.Admin);
        var rev = await admin.PostAsync($"/api/admin/certificates/{cert.Id}/revoke", JsonBody(new { reason = "Refunded" }));
        Assert.Equal(HttpStatusCode.NoContent, rev.StatusCode);
        Assert.Equal(HttpStatusCode.Gone, (await fx.Factory.CreateClient().GetAsync($"/api/certificates/{cert.Code}/pdf")).StatusCode);
        Assert.Equal(HttpStatusCode.Gone, (await owner.GetAsync($"/api/certificates/{cert.Code}/pdf")).StatusCode);
    }

    [Fact]
    public async Task Visibility_toggle_hides_verification_and_public_pdf_but_not_from_owner()
    {
        var (cert, owner) = await Issue();
        var anon = fx.Factory.CreateClient();
        var (_, other) = await fx.User();
        Assert.Equal(HttpStatusCode.NotFound, (await other.PutAsync($"/api/me/certificates/{cert.Id}/visibility", JsonBody(new { publiclyVisible = false }))).StatusCode);
        Assert.Equal(HttpStatusCode.Unauthorized, (await anon.PutAsync($"/api/me/certificates/{cert.Id}/visibility", JsonBody(new { publiclyVisible = false }))).StatusCode);

        var hidden = await Read<MyCertificateDto>(await owner.PutAsync($"/api/me/certificates/{cert.Id}/visibility", JsonBody(new { publiclyVisible = false })));
        Assert.False(hidden.PubliclyVisible);
        Assert.Equal(HttpStatusCode.NotFound, (await anon.GetAsync($"/api/certificates/verify/{cert.Code}")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await anon.GetAsync($"/api/certificates/{cert.Code}/pdf")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await other.GetAsync($"/api/certificates/{cert.Code}/pdf")).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await owner.GetAsync($"/api/certificates/{cert.Code}/pdf")).StatusCode);

        await Read<MyCertificateDto>(await owner.PutAsync($"/api/me/certificates/{cert.Id}/visibility", JsonBody(new { publiclyVisible = true })));
        Assert.Equal(HttpStatusCode.OK, (await anon.GetAsync($"/api/certificates/verify/{cert.Code}")).StatusCode);
    }
}
