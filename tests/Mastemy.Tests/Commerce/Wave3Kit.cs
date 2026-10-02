using System.Net;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Commerce;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.Commerce;

/// <summary>Fixture variant with invoicing seller details and inclusive tax configured.</summary>
public class InvoicingFixture : CommerceFixture
{
    protected override Dictionary<string, string> ExtraSettings => new()
    {
        ["Invoice:SellerName"] = "Mastemy Test Ltd",
        ["Invoice:SellerAddress"] = "1 Test Street\nTestville",
        ["Invoice:SellerTaxId"] = "TX-123",
        ["Tax:Mode"] = "Inclusive",
        ["Commission:ReferralInstructorSharePercent"] = "90",
        ["Payouts:MinimumAmount"] = "10",
    };
}

/// <summary>Helpers shared by the wave-3 commerce tests: signed fake Stripe events and purchase flows.</summary>
public static class Kit
{
    public static string Key() => "idem-" + Guid.NewGuid().ToString("N");
    public static string EvtId() => "evt_" + Guid.NewGuid().ToString("N");

    public static string Event(string type, object obj, string? id = null) =>
        JsonSerializer.Serialize(new { id = id ?? EvtId(), type, data = new { @object = obj } });

    public static async Task<HttpResponseMessage> Webhook(CommerceFixture fx, string json, string? secret = null, long? ts = null)
    {
        var raw = Encoding.UTF8.GetBytes(json);
        var req = new HttpRequestMessage(HttpMethod.Post, "/api/webhooks/stripe") { Content = new ByteArrayContent(raw) };
        req.Content.Headers.ContentType = new("application/json");
        req.Headers.Add("Stripe-Signature", StripeSignature.Header(raw, ts ?? DateTimeOffset.UtcNow.ToUnixTimeSeconds(), secret ?? CommerceFixture.WebhookSecret));
        return await fx.Client().SendAsync(req);
    }

    public static async Task<WebhookResult> WebhookOk(CommerceFixture fx, string json)
    {
        var res = await Webhook(fx, json);
        Assert.True(res.StatusCode == HttpStatusCode.OK, await res.Content.ReadAsStringAsync());
        return (await res.Content.ReadFromJsonAsync<WebhookResult>())!;
    }

    public static object Completed(Guid orderId, decimal amount, string currency = "USD") => new
    {
        id = "cs_test_" + orderId, payment_status = "paid", amount_total = Money.ToMinor(amount, currency), currency = currency.ToLowerInvariant(),
        payment_intent = "pi_" + orderId.ToString("N"), client_reference_id = orderId.ToString(), metadata = new { order_id = orderId.ToString() },
    };

    public static async Task<CheckoutResponse> Checkout(HttpClient client, object body)
    {
        var res = await client.PostAsJsonAsync("/api/checkout", body);
        Assert.True(res.StatusCode == HttpStatusCode.OK, await res.Content.ReadAsStringAsync());
        return (await res.Content.ReadFromJsonAsync<CheckoutResponse>())!;
    }

    public static async Task<string> ErrorCode(HttpResponseMessage res)
    {
        var body = await res.Content.ReadAsStringAsync();
        try { return JsonDocument.Parse(body).RootElement.GetProperty("type").GetString() ?? body; }
        catch { return body; }
    }

    /// <summary>Checkout + signed paid webhook for whatever amount the server computed.</summary>
    public static async Task<CheckoutResponse> Pay(CommerceFixture fx, HttpClient client, object body)
    {
        var co = await Checkout(client, body);
        if (co.Status == "Paid") return co;
        var r = await WebhookOk(fx, Event("checkout.session.completed", Completed(co.OrderId, co.Amount, co.Currency)));
        Assert.Equal("paid", r.Status);
        return co;
    }

    public static Task<int> Audits(CommerceFixture fx, string action) => fx.Db(d => d.AuditLogs.CountAsync(a => a.Action == action));
}
