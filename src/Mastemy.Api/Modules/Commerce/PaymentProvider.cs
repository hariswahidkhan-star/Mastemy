using System.Globalization;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Mastemy.Api.Infrastructure;

namespace Mastemy.Api.Modules.Commerce;

public record CheckoutSessionRequest(Guid OrderId, Guid UserId, string ProductName, long UnitAmountMinor, string Currency, string? CustomerEmail);
public record CheckoutSessionResult(string SessionId, string? Url);
public record ProviderRefundResult(string RefundId, string Status);

/// <summary>Payment provider abstraction. Implementations must never report success they did not obtain from the provider.</summary>
public interface IPaymentProvider
{
    string Name { get; }
    bool IsConfigured { get; }
    bool IsWebhookConfigured { get; }
    Task<CheckoutSessionResult> CreateCheckoutSession(CheckoutSessionRequest req, CancellationToken ct = default);
    Task<CheckoutSessionResult> GetCheckoutSession(string sessionId, CancellationToken ct = default);
    Task<ProviderRefundResult> RefundPayment(string providerPaymentId, long amountMinor, Guid orderId, CancellationToken ct = default);
    /// <summary>Verifies a webhook signature over the exact raw request body.</summary>
    bool VerifyWebhookSignature(byte[] rawBody, string? signatureHeader, DateTimeOffset now);
}

public static class Money
{
    // Stripe zero-decimal currencies: amounts are sent in whole units.
    private static readonly HashSet<string> ZeroDecimal =
        ["BIF", "CLP", "DJF", "GNF", "JPY", "KMF", "KRW", "MGA", "PYG", "RWF", "UGX", "VND", "VUV", "XAF", "XOF", "XPF"];

    public static bool IsZeroDecimal(string currency) => ZeroDecimal.Contains(currency.ToUpperInvariant());

    public static long ToMinor(decimal amount, string currency)
    {
        var scaled = IsZeroDecimal(currency) ? amount : amount * 100m;
        if (scaled != decimal.Truncate(scaled)) throw AppException.Bad("Amount has more decimal places than the currency allows.");
        return (long)scaled;
    }

    public static decimal FromMinor(long minor, string currency) => IsZeroDecimal(currency) ? minor : minor / 100m;
}

/// <summary>
/// Stripe Checkout via raw HTTPS (form-encoded) — no SDK. Base URL is configurable (Stripe:ApiBaseUrl) so tests can
/// point it at a fake handler. When Stripe keys are missing every call fails with 503 payments_not_configured.
/// </summary>
public class StripePaymentProvider(IHttpClientFactory httpFactory, IConfiguration cfg, ILogger<StripePaymentProvider> log) : IPaymentProvider
{
    public const string HttpClientName = "stripe";
    public static readonly TimeSpan SignatureTolerance = TimeSpan.FromMinutes(5);
    public string Name => "stripe";
    private string SecretKey => cfg["Stripe:SecretKey"] ?? "";
    private string WebhookSecret => cfg["Stripe:WebhookSecret"] ?? "";
    private string BaseUrl => (cfg["Stripe:ApiBaseUrl"] is { Length: > 0 } b ? b : "https://api.stripe.com").TrimEnd('/');
    public bool IsConfigured => !string.IsNullOrWhiteSpace(SecretKey) && !string.IsNullOrWhiteSpace(WebhookSecret);
    public bool IsWebhookConfigured => !string.IsNullOrWhiteSpace(WebhookSecret);

    private void EnsureConfigured()
    {
        if (!IsConfigured) throw new AppException(503, "Payments are not configured on this server.", "payments_not_configured");
    }

    private HttpRequestMessage Req(HttpMethod m, string path, IEnumerable<KeyValuePair<string, string>>? form = null, string? idempotencyKey = null)
    {
        var r = new HttpRequestMessage(m, BaseUrl + path);
        r.Headers.Authorization = new AuthenticationHeaderValue("Bearer", SecretKey);
        if (idempotencyKey is not null) r.Headers.Add("Idempotency-Key", idempotencyKey);
        if (form is not null) r.Content = new FormUrlEncodedContent(form);
        return r;
    }

    private async Task<JsonElement> Send(HttpRequestMessage req, CancellationToken ct)
    {
        var http = httpFactory.CreateClient(HttpClientName);
        HttpResponseMessage res;
        try { res = await http.SendAsync(req, ct); }
        catch (HttpRequestException ex)
        {
            log.LogError(ex, "Stripe request failed");
            throw new AppException(502, "Payment provider is unreachable. Please retry.", "payment_provider_error");
        }
        var body = await res.Content.ReadAsStringAsync(ct);
        if (!res.IsSuccessStatusCode)
        {
            log.LogWarning("Stripe returned {Status} for {Path}", (int)res.StatusCode, req.RequestUri?.AbsolutePath);
            throw new AppException(502, "Payment provider rejected the request.", "payment_provider_error");
        }
        try { return JsonDocument.Parse(body).RootElement.Clone(); }
        catch (JsonException) { throw new AppException(502, "Payment provider returned an invalid response.", "payment_provider_error"); }
    }

    public async Task<CheckoutSessionResult> CreateCheckoutSession(CheckoutSessionRequest r, CancellationToken ct = default)
    {
        EnsureConfigured();
        var oid = r.OrderId.ToString();
        var form = new List<KeyValuePair<string, string>>
        {
            new("mode", "payment"),
            new("success_url", cfg["Stripe:SuccessUrl"] is { Length: > 0 } s ? s : "http://localhost:5173/checkout/success"),
            new("cancel_url", cfg["Stripe:CancelUrl"] is { Length: > 0 } c ? c : "http://localhost:5173/checkout/cancel"),
            new("client_reference_id", oid),
            new("metadata[order_id]", oid),
            new("payment_intent_data[metadata][order_id]", oid),
            new("line_items[0][quantity]", "1"),
            new("line_items[0][price_data][currency]", r.Currency.ToLowerInvariant()),
            new("line_items[0][price_data][unit_amount]", r.UnitAmountMinor.ToString(CultureInfo.InvariantCulture)),
            new("line_items[0][price_data][product_data][name]", r.ProductName),
        };
        if (!string.IsNullOrWhiteSpace(r.CustomerEmail)) form.Add(new("customer_email", r.CustomerEmail));
        return Parse(await Send(Req(HttpMethod.Post, "/v1/checkout/sessions", form, "checkout-" + oid), ct));
    }

    public async Task<CheckoutSessionResult> GetCheckoutSession(string sessionId, CancellationToken ct = default)
    {
        EnsureConfigured();
        return Parse(await Send(Req(HttpMethod.Get, "/v1/checkout/sessions/" + Uri.EscapeDataString(sessionId)), ct));
    }

    private static CheckoutSessionResult Parse(JsonElement json)
    {
        var id = json.TryGetProperty("id", out var i) && i.ValueKind == JsonValueKind.String ? i.GetString() : null;
        if (string.IsNullOrEmpty(id)) throw new AppException(502, "Payment provider returned no session id.", "payment_provider_error");
        var url = json.TryGetProperty("url", out var u) && u.ValueKind == JsonValueKind.String ? u.GetString() : null;
        return new CheckoutSessionResult(id, url);
    }

    public async Task<ProviderRefundResult> RefundPayment(string providerPaymentId, long amountMinor, Guid orderId, CancellationToken ct = default)
    {
        EnsureConfigured();
        var form = new List<KeyValuePair<string, string>>
        {
            new("payment_intent", providerPaymentId),
            new("amount", amountMinor.ToString(CultureInfo.InvariantCulture)),
            new("metadata[order_id]", orderId.ToString()),
        };
        var json = await Send(Req(HttpMethod.Post, "/v1/refunds", form, "refund-" + orderId), ct);
        var id = json.TryGetProperty("id", out var i) && i.ValueKind == JsonValueKind.String ? i.GetString() : null;
        var status = json.TryGetProperty("status", out var s) && s.ValueKind == JsonValueKind.String ? s.GetString() : null;
        if (string.IsNullOrEmpty(id)) throw new AppException(502, "Payment provider returned no refund id.", "payment_provider_error");
        if (status is "failed" or "canceled") throw new AppException(502, $"Provider refund {status}.", "payment_provider_error");
        return new ProviderRefundResult(id, status ?? "unknown");
    }

    public bool VerifyWebhookSignature(byte[] rawBody, string? header, DateTimeOffset now)
        => StripeSignature.Verify(rawBody, header, WebhookSecret, now, SignatureTolerance);
}

/// <summary>Stripe-Signature verification: HMAC-SHA256("{t}.{rawBody}") with the endpoint secret, constant-time compare, timestamp tolerance.</summary>
public static class StripeSignature
{
    public static bool Verify(byte[] rawBody, string? header, string secret, DateTimeOffset now, TimeSpan tolerance)
    {
        if (string.IsNullOrWhiteSpace(header) || string.IsNullOrEmpty(secret)) return false;
        long? t = null;
        var sigs = new List<string>();
        foreach (var part in header.Split(','))
        {
            var kv = part.Split('=', 2);
            if (kv.Length != 2) continue;
            var k = kv[0].Trim(); var v = kv[1].Trim();
            if (k == "t" && long.TryParse(v, NumberStyles.None, CultureInfo.InvariantCulture, out var tv)) t = tv;
            else if (k == "v1") sigs.Add(v);
        }
        if (t is null || sigs.Count == 0) return false;
        DateTimeOffset ts;
        try { ts = DateTimeOffset.FromUnixTimeSeconds(t.Value); } catch (ArgumentOutOfRangeException) { return false; }
        if ((now - ts).Duration() > tolerance) return false;
        var expected = Compute(rawBody, t.Value, secret);
        var ok = false;
        foreach (var s in sigs)
        {
            byte[] given;
            try { given = Convert.FromHexString(s); } catch (FormatException) { continue; }
            if (given.Length == expected.Length && CryptographicOperations.FixedTimeEquals(given, expected)) ok = true;
        }
        return ok;
    }

    public static byte[] Compute(byte[] rawBody, long timestamp, string secret)
    {
        var prefix = Encoding.UTF8.GetBytes(timestamp.ToString(CultureInfo.InvariantCulture) + ".");
        var payload = new byte[prefix.Length + rawBody.Length];
        Buffer.BlockCopy(prefix, 0, payload, 0, prefix.Length);
        Buffer.BlockCopy(rawBody, 0, payload, prefix.Length, rawBody.Length);
        return HMACSHA256.HashData(Encoding.UTF8.GetBytes(secret), payload);
    }

    public static string Header(byte[] rawBody, long timestamp, string secret)
        => $"t={timestamp},v1={Convert.ToHexString(Compute(rawBody, timestamp, secret)).ToLowerInvariant()}";
}
