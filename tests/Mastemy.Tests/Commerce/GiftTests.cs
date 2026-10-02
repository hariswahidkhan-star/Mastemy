using System.Net;
using System.Net.Http.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Commerce;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.Commerce;

public class GiftTests(CommerceFixture fx) : IClassFixture<CommerceFixture>
{
    [Fact]
    public async Task Gift_code_is_shown_once_redeemed_once_and_refund_only_before_redemption()
    {
        var seed = await fx.SeedCourse(25m);
        var (buyer, buyerClient) = await fx.User(Roles.Student);
        var co = await Kit.Pay(fx, buyerClient, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key(), gift = new { message = "Good luck!" } });
        Assert.False(await fx.Db(d => d.Entitlements.AnyAsync(e => e.OrderId == co.OrderId))); // buyer gets nothing
        Assert.Equal(2, (await fx.LedgerForOrder(co.OrderId)).Count); // instructors are still paid for the sale

        var (_, stranger) = await fx.User(Roles.Student);
        Assert.Equal(HttpStatusCode.NotFound, (await stranger.GetAsync($"/api/me/orders/{co.OrderId}/gift-code")).StatusCode);
        var shown = (await buyerClient.GetFromJsonAsync<GiftCodeDto>($"/api/me/orders/{co.OrderId}/gift-code"))!;
        Assert.StartsWith("GIFT-", shown.Code);
        Assert.Equal("gift_code_already_revealed", await Kit.ErrorCode(await buyerClient.GetAsync($"/api/me/orders/{co.OrderId}/gift-code")));
        Assert.Null(await fx.Db(d => d.Set<GiftCode>().Where(g => g.OrderId == co.OrderId).Select(g => g.CodeCipher).FirstAsync()));

        Assert.Equal("gift_invalid", await Kit.ErrorCode(await stranger.PostAsJsonAsync("/api/gifts/redeem", new { code = "GIFT-NOTAREALCODE" })));
        var (recipient, recipientClient) = await fx.User(Roles.Student);
        var redeemed = await recipientClient.PostAsJsonAsync("/api/gifts/redeem", new { code = shown.Code.ToLowerInvariant() });
        Assert.True(redeemed.StatusCode == HttpStatusCode.OK, await redeemed.Content.ReadAsStringAsync());
        Assert.True(await fx.Db(d => d.Entitlements.AnyAsync(e => e.UserId == recipient.Id && e.OrderId == co.OrderId && e.RevokedAt == null)));
        Assert.Equal(HttpStatusCode.Conflict, (await stranger.PostAsJsonAsync("/api/gifts/redeem", new { code = shown.Code })).StatusCode);

        Assert.Equal("gift_already_redeemed", await Kit.ErrorCode(await buyerClient.PostAsJsonAsync($"/api/me/orders/{co.OrderId}/refund-request", new { reason = "changed mind" })));
        var (_, finance) = await fx.User(Roles.Finance);
        Assert.Equal("gift_already_redeemed", await Kit.ErrorCode(await finance.PostAsJsonAsync($"/api/admin/orders/{co.OrderId}/refunds", new { amount = 25, reason = "goodwill" })));
        Assert.Equal(buyer.Id, await fx.Db(d => d.Orders.Where(o => o.Id == co.OrderId).Select(o => o.UserId).FirstAsync()));
    }

    [Fact]
    public async Task Emailed_gift_goes_to_outbox_and_unredeemed_gift_refund_voids_code()
    {
        var seed = await fx.SeedCourse(25m);
        var (_, buyerClient) = await fx.User(Roles.Student);
        var email = $"friend-{Guid.NewGuid():N}@gift.test";
        var co = await Kit.Pay(fx, buyerClient, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key(), gift = new { recipientEmail = email, message = "Enjoy" } });
        var mail = await fx.Db(d => d.EmailOutbox.SingleAsync(m => m.ToAddress == email));
        Assert.Contains("GIFT-", mail.Body);
        Assert.Contains("free", mail.Body);
        Assert.Equal("gift_code_emailed", await Kit.ErrorCode(await buyerClient.GetAsync($"/api/me/orders/{co.OrderId}/gift-code")));
        var code = System.Text.RegularExpressions.Regex.Match(mail.Body, "GIFT-[A-Z0-9]+").Value;

        Assert.Equal("gift_partial_refund_not_allowed", await Kit.ErrorCode(await (await fx.User(Roles.Finance)).Client.PostAsJsonAsync($"/api/admin/orders/{co.OrderId}/refunds", new { amount = 5, reason = "partial" })));
        var refund = (await (await buyerClient.PostAsJsonAsync($"/api/me/orders/{co.OrderId}/refund-request", new { reason = "wrong friend" })).Content.ReadFromJsonAsync<RefundDto>())!;
        var (_, finance) = await fx.User(Roles.Finance);
        Assert.Equal(HttpStatusCode.OK, (await finance.PostAsJsonAsync($"/api/admin/refunds/{refund.Id}/decision", new { decision = "Approve" })).StatusCode);
        Assert.Equal("Void", await fx.Db(d => d.Set<GiftCode>().Where(g => g.OrderId == co.OrderId).Select(g => g.Status).FirstAsync()));
        var (_, late) = await fx.User(Roles.Student);
        Assert.Equal("gift_void", await Kit.ErrorCode(await late.PostAsJsonAsync("/api/gifts/redeem", new { code })));
    }

    [Fact]
    public async Task Invoice_pdf_returns_503_when_seller_details_missing()
    {
        var seed = await fx.SeedCourse(10m);
        var (_, client) = await fx.User(Roles.Student);
        var co = await Kit.Pay(fx, client, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key() });
        var inv = (await client.GetFromJsonAsync<List<InvoiceDto>>("/api/me/invoices"))!.Single(i => i.OrderId == co.OrderId);
        Assert.Null(inv.TaxAmount); // Tax:Mode not configured -> no tax fields
        var pdf = await client.GetAsync($"/api/me/invoices/{inv.Id}/pdf");
        Assert.Equal(HttpStatusCode.ServiceUnavailable, pdf.StatusCode);
        Assert.Equal("invoicing_not_configured", await Kit.ErrorCode(pdf));
    }
}
