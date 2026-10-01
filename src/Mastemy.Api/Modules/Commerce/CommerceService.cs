using System.Text.Json;
using System.Text.RegularExpressions;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Commerce;

// ---------- DTOs ----------
public record PackageInput(string Title, string Contents, decimal Price, string Currency, int AccessDays);
public record PackageDto(Guid Id, Guid CourseId, string Title, string Contents, decimal Price, string Currency, int AccessDays,
    bool IsActive, string ApprovalStatus, DateTime CreatedAt);
public record DecisionInput(string Decision, string? Notes);
public record CheckoutInput(Guid PackageId, string IdempotencyKey);
public record CheckoutResponse(Guid OrderId, string CheckoutUrl);
public record OrderItemDto(Guid PackageId, Guid CourseId, string PackageTitle, string CourseTitle, decimal UnitPrice);
public record OrderDto(Guid Id, string Status, decimal Total, string Currency, DateTime CreatedAt, DateTime? PaidAt,
    List<OrderItemDto> Items, string? RefundStatus, bool RefundEligible);
public record RefundRequestInput(string Reason);
public record RefundDto(Guid Id, Guid OrderId, Guid UserId, decimal Amount, string Currency, string Reason, string Status,
    string? ProviderRefundId, DateTime CreatedAt);
public record LedgerEntryDto(Guid Id, Guid OrderId, Guid CourseId, string Kind, decimal GrossAmount, decimal InstructorAmount,
    decimal PlatformAmount, string Currency, Guid? PayoutBatchId, DateTime CreatedAt);
public record CurrencyTotal(string Currency, decimal InstructorAmount, decimal GrossSales, int Entries);
public record EarningsDto(List<LedgerEntryDto> Entries, List<CurrencyTotal> Totals);
public record PayoutLine(Guid InstructorId, string Currency, decimal Amount, int Entries);
public record PayoutBatchDto(Guid Id, string Status, Guid CreatedBy, Guid? ApprovedBy, DateTime CreatedAt, List<PayoutLine> Lines);

/// <summary>Result of webhook processing (returned with HTTP 200 so Stripe does not retry a handled event).</summary>
public record WebhookResult(string Status, string? Detail = null);

public class CommerceService(AppDbContext db, ICurrentUser me, AccessService access, AuditService audit,
    IPaymentProvider provider, IConfiguration cfg, ILogger<CommerceService> log)
{
    // ===================== Packages =====================

    /// <summary>
    /// Paid-services guard (spec §2 / §11): Mastemy course videos are free YouTube embeds and are NEVER sold.
    /// A package may only describe paid services (premium notes, premium MCQ banks, mock exams, mentoring, etc.).
    /// Titles or contents that advertise selling/unlocking video access are rejected with 400 "package_sells_video_access".
    /// </summary>
    private static readonly Regex VideoAccessPattern = new(
        @"video[s]?\s+access|access\s+(to\s+)?(the\s+|all\s+)?video[s]?|unlock(s|ed|ing)?\s+(the\s+|all\s+)?video[s]?|video[s]?\s+unlock|paid\s+video[s]?|premium\s+video[s]?|watch\s+(the\s+)?video[s]?",
        RegexOptions.IgnoreCase | RegexOptions.CultureInvariant | RegexOptions.Compiled, TimeSpan.FromMilliseconds(200));

    public static bool MentionsVideoAccess(string text) => VideoAccessPattern.IsMatch(text);

    private static PackageDto ToDto(LearningPackage p) => new(p.Id, p.CourseId, p.Title, p.Contents, p.Price, p.Currency, p.AccessDays,
        p.IsActive, p.ApprovalStatus, p.CreatedAt);

    public async Task<PackageDto> ProposePackage(Guid courseId, PackageInput input)
    {
        if (!await db.Courses.AnyAsync(c => c.Id == courseId)) throw AppException.NotFound("Course");
        await access.RequireCourseEditor(courseId);
        var title = (input.Title ?? "").Trim();
        var contents = (input.Contents ?? "").Trim();
        var currency = (input.Currency ?? "").Trim();
        if (title.Length is < 3 or > 200) throw AppException.Bad("Title must be 3-200 characters.");
        if (contents.Length == 0) throw AppException.Bad("Contents must list the paid services included.");
        if (contents.Length > 8000) throw AppException.Bad("Contents must be at most 8000 characters.");
        if (MentionsVideoAccess(title) || MentionsVideoAccess(contents))
            throw AppException.Bad("Packages may only sell paid services (premium notes, MCQ banks, mock exams...). Course videos are always free and cannot be sold.", "package_sells_video_access");
        if (!Regex.IsMatch(currency, "^[A-Z]{3}$")) throw AppException.Bad("Currency must be an ISO 4217 code in upper case (e.g. USD).");
        if (input.Price <= 0 || input.Price > 10000) throw AppException.Bad("Price must be greater than 0 and at most 10000.");
        Money.ToMinor(input.Price, currency); // validates decimal places
        if (input.AccessDays is < 1 or > 3650) throw AppException.Bad("Access days must be between 1 and 3650.");
        var p = new LearningPackage
        {
            CourseId = courseId, Title = title, Contents = contents, Price = input.Price, Currency = currency,
            AccessDays = input.AccessDays, IsActive = false, ApprovalStatus = "Proposed",
        };
        db.Packages.Add(p);
        audit.Record("package.proposed", nameof(LearningPackage), p.Id, new { courseId, title, input.Price, currency, input.AccessDays });
        await db.SaveChangesAsync();
        return ToDto(p);
    }

    public async Task<List<PackageDto>> CoursePackages(Guid courseId)
    {
        if (!await db.Courses.AnyAsync(c => c.Id == courseId)) throw AppException.NotFound("Course");
        await access.RequireCourseAuthorOrStaff(courseId);
        var list = await db.Packages.AsNoTracking().Where(p => p.CourseId == courseId).OrderByDescending(p => p.CreatedAt).ToListAsync();
        return list.Select(ToDto).ToList();
    }

    public async Task<List<PackageDto>> AdminPackages(string? status)
    {
        var q = db.Packages.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(status)) q = q.Where(p => p.ApprovalStatus == status);
        return (await q.OrderBy(p => p.CreatedAt).Take(500).ToListAsync()).Select(ToDto).ToList();
    }

    public async Task<PackageDto> DecidePackage(Guid id, DecisionInput input)
    {
        var p = await db.Packages.FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Package");
        var old = p.ApprovalStatus;
        switch (input.Decision)
        {
            case "Approve":
                if (MentionsVideoAccess(p.Title) || MentionsVideoAccess(p.Contents))
                    throw AppException.Bad("Package advertises video access and cannot be approved.", "package_sells_video_access");
                p.ApprovalStatus = "Approved"; p.IsActive = true; break;
            case "Reject":
                p.ApprovalStatus = "Rejected"; p.IsActive = false; break;
            case "Deactivate":
                p.IsActive = false; break;
            default: throw AppException.Bad("Decision must be Approve, Reject or Deactivate.");
        }
        audit.Record("package.decision", nameof(LearningPackage), p.Id, new { decision = input.Decision, old, @new = p.ApprovalStatus, input.Notes });
        await db.SaveChangesAsync();
        return ToDto(p);
    }

    // ===================== Checkout =====================

    public async Task<CheckoutResponse> Checkout(CheckoutInput input)
    {
        var uid = me.RequireId();
        var key = (input.IdempotencyKey ?? "").Trim();
        if (key.Length is < 8 or > 128) throw AppException.Bad("idempotencyKey must be 8-128 characters.");
        if (!provider.IsConfigured) throw new AppException(503, "Payments are not configured on this server.", "payments_not_configured");

        var existing = await db.Orders.Include(o => o.Items).FirstOrDefaultAsync(o => o.UserId == uid && o.IdempotencyKey == key);
        if (existing is not null)
        {
            if (existing.Items.All(i => i.PackageId != input.PackageId))
                throw AppException.Conflict("This idempotency key was already used for a different package.", "idempotency_key_reused");
            if (existing.Status != OrderStatus.Pending) throw AppException.Conflict($"Order is already {existing.Status}.", "order_not_pending");
            return await EnsureSession(existing);
        }

        var pkg = await db.Packages.AsNoTracking().FirstOrDefaultAsync(p => p.Id == input.PackageId) ?? throw AppException.NotFound("Package");
        if (!pkg.IsActive || pkg.ApprovalStatus != "Approved") throw AppException.Bad("Package is not available for purchase.", "package_unavailable");
        var course = await db.Courses.AsNoTracking().FirstOrDefaultAsync(c => c.Id == pkg.CourseId) ?? throw AppException.NotFound("Course");
        if (!AccessService.IsLive(course)) throw AppException.Bad("Course is not available.", "course_unavailable");

        var order = new Order
        {
            UserId = uid, Status = OrderStatus.Pending, Total = pkg.Price, Currency = pkg.Currency, IdempotencyKey = key,
            Items = [new OrderItem { PackageId = pkg.Id, CourseId = pkg.CourseId, UnitPrice = pkg.Price }],
        };
        db.Orders.Add(order);
        try { await db.SaveChangesAsync(); }
        catch (DbUpdateException ex)
        {
            // Concurrent request with the same idempotency key won the race: return its session.
            db.ChangeTracker.Clear();
            var winner = await db.Orders.Include(o => o.Items).FirstOrDefaultAsync(o => o.UserId == uid && o.IdempotencyKey == key);
            if (winner is null) throw new InvalidOperationException("Order could not be created.", ex);
            if (winner.Items.All(i => i.PackageId != input.PackageId))
                throw AppException.Conflict("This idempotency key was already used for a different package.", "idempotency_key_reused");
            return await EnsureSession(winner);
        }
        return await EnsureSession(order);
    }

    private async Task<CheckoutResponse> EnsureSession(Order order)
    {
        if (!string.IsNullOrEmpty(order.ProviderSessionId))
        {
            var s = await provider.GetCheckoutSession(order.ProviderSessionId);
            if (string.IsNullOrEmpty(s.Url))
                throw AppException.Conflict("The checkout session has expired. Start a new checkout with a new idempotency key.", "checkout_session_expired");
            return new CheckoutResponse(order.Id, s.Url);
        }
        var item = order.Items.First();
        var pkgTitle = await db.Packages.Where(p => p.Id == item.PackageId).Select(p => p.Title).FirstAsync();
        var email = await db.Users.Where(u => u.Id == order.UserId).Select(u => u.Email).FirstOrDefaultAsync();
        var session = await provider.CreateCheckoutSession(new CheckoutSessionRequest(order.Id, order.UserId, pkgTitle,
            Money.ToMinor(order.Total, order.Currency), order.Currency, email));
        if (string.IsNullOrEmpty(session.Url)) throw new AppException(502, "Payment provider returned no checkout URL.", "payment_provider_error");
        order.ProviderSessionId = session.SessionId;
        await db.SaveChangesAsync();
        return new CheckoutResponse(order.Id, session.Url);
    }

    // ===================== Webhook =====================

    public async Task<WebhookResult> HandleStripeWebhook(byte[] rawBody, string? signature)
    {
        if (!provider.IsWebhookConfigured) throw new AppException(503, "Payments are not configured on this server.", "payments_not_configured");
        if (!provider.VerifyWebhookSignature(rawBody, signature, DateTimeOffset.UtcNow))
            throw AppException.Bad("Invalid webhook signature.", "invalid_signature");

        JsonElement root;
        try { root = JsonDocument.Parse(rawBody).RootElement.Clone(); }
        catch (JsonException) { throw AppException.Bad("Malformed webhook payload."); }
        var eventId = Str(root, "id");
        var type = Str(root, "type") ?? "";
        if (string.IsNullOrEmpty(eventId) || eventId.Length > 255) throw AppException.Bad("Webhook event id missing.");

        if (await db.ProcessedWebhookEvents.AnyAsync(e => e.EventId == eventId)) return new WebhookResult("duplicate");

        await using var tx = await db.Database.BeginTransactionAsync();
        db.ProcessedWebhookEvents.Add(new ProcessedWebhookEvent { EventId = eventId, Type = type.Length > 255 ? type[..255] : type });
        WebhookResult result;
        try
        {
            result = type switch
            {
                "checkout.session.completed" or "checkout.session.async_payment_succeeded" => await OnCheckoutCompleted(root, eventId),
                // Refunds are initiated through the Finance approval flow; provider-side refund events are recorded only.
                "charge.refunded" or "refund.created" or "refund.updated" => Audited(eventId, type, "refund_event_recorded"),
                _ => new WebhookResult("ignored", type),
            };
            await db.SaveChangesAsync();
            await tx.CommitAsync();
        }
        catch (DbUpdateException ex)
        {
            // Primary key on EventId: a concurrent delivery of the same event already committed.
            await tx.RollbackAsync();
            db.ChangeTracker.Clear();
            if (await db.ProcessedWebhookEvents.AnyAsync(e => e.EventId == eventId)) return new WebhookResult("duplicate");
            log.LogError(ex, "Webhook {EventId} failed to persist", eventId);
            throw;
        }
        return result;
    }

    private WebhookResult Audited(string eventId, string type, string status)
    {
        audit.Record("stripe.event", "WebhookEvent", eventId, new { type });
        return new WebhookResult(status);
    }

    private static string? Str(JsonElement e, string name) =>
        e.ValueKind == JsonValueKind.Object && e.TryGetProperty(name, out var v) && v.ValueKind == JsonValueKind.String ? v.GetString() : null;

    private async Task<WebhookResult> OnCheckoutCompleted(JsonElement root, string eventId)
    {
        if (!root.TryGetProperty("data", out var data) || !data.TryGetProperty("object", out var obj))
            throw AppException.Bad("Webhook payload has no data.object.");
        var sessionId = Str(obj, "id");
        string? orderIdStr = null;
        if (obj.TryGetProperty("metadata", out var md)) orderIdStr = Str(md, "order_id");
        orderIdStr ??= Str(obj, "client_reference_id");
        if (!Guid.TryParse(orderIdStr, out var orderId)) return Reject(eventId, null, "missing_order_reference");

        var order = await db.Orders.Include(o => o.Items).FirstOrDefaultAsync(o => o.Id == orderId);
        if (order is null) return Reject(eventId, orderId, "order_not_found");
        if (order.ProviderSessionId is not null && sessionId is not null && order.ProviderSessionId != sessionId)
            return Reject(eventId, orderId, "session_mismatch");
        if (order.Status == OrderStatus.Paid) return new WebhookResult("already_paid");
        if (order.Status != OrderStatus.Pending) return Reject(eventId, orderId, $"order_{order.Status.ToString().ToLowerInvariant()}");
        if (Str(obj, "payment_status") != "paid") return new WebhookResult("awaiting_payment");

        long? amount = obj.TryGetProperty("amount_total", out var a) && a.ValueKind == JsonValueKind.Number && a.TryGetInt64(out var av) ? av : null;
        var currency = Str(obj, "currency");
        if (amount is null || currency is null || amount.Value != Money.ToMinor(order.Total, order.Currency)
            || !string.Equals(currency, order.Currency, StringComparison.OrdinalIgnoreCase))
            return Reject(eventId, orderId, "amount_or_currency_mismatch", new { amount, currency, expectedAmount = Money.ToMinor(order.Total, order.Currency), expectedCurrency = order.Currency });

        var paymentIntent = Str(obj, "payment_intent") ?? sessionId ?? eventId;
        var now = DateTime.UtcNow;
        order.Status = OrderStatus.Paid;
        order.PaidAt = now;
        order.ProviderSessionId ??= sessionId;
        db.Payments.Add(new Payment { OrderId = order.Id, Provider = provider.Name, ProviderPaymentId = paymentIntent, Amount = order.Total, Currency = order.Currency });

        var poolPercent = Math.Clamp(cfg.GetValue("Commission:InstructorSharePercent", 70m), 0m, 100m);
        foreach (var item in order.Items)
        {
            var pkg = await db.Packages.AsNoTracking().FirstAsync(p => p.Id == item.PackageId);
            db.Entitlements.Add(new Entitlement
            {
                UserId = order.UserId, CourseId = item.CourseId, PackageId = item.PackageId, OrderId = order.Id,
                Source = EntitlementSource.Purchase, StartsAt = now, EndsAt = now.AddDays(pkg.AccessDays),
            });
            var instructors = await db.CourseInstructors.AsNoTracking().Where(ci => ci.CourseId == item.CourseId)
                .OrderBy(ci => ci.Role).ThenBy(ci => ci.UserId).ToListAsync();
            foreach (var e in CommissionSplit.Compute(order.Id, item.CourseId, item.UnitPrice, order.Currency, poolPercent, instructors))
                db.CommissionLedger.Add(e);
        }
        audit.Record("order.paid", nameof(Order), order.Id, new { eventId, paymentIntent, order.Total, order.Currency });
        return new WebhookResult("paid");
    }

    private WebhookResult Reject(string eventId, Guid? orderId, string reason, object? details = null)
    {
        log.LogWarning("Stripe event {EventId} rejected for order {OrderId}: {Reason}", eventId, orderId, reason);
        audit.Record("order.payment_rejected", nameof(Order), orderId?.ToString() ?? "-", new { eventId, reason, details });
        return new WebhookResult("rejected", reason);
    }

    // ===================== Orders & refunds =====================

    private int RefundWindowDays => Math.Max(0, cfg.GetValue("Commerce:RefundWindowDays", 30));

    public async Task<List<OrderDto>> MyOrders()
    {
        var uid = me.RequireId();
        var orders = await db.Orders.AsNoTracking().Include(o => o.Items).Where(o => o.UserId == uid)
            .OrderByDescending(o => o.CreatedAt).Take(200).ToListAsync();
        var ids = orders.Select(o => o.Id).ToList();
        var pkgIds = orders.SelectMany(o => o.Items).Select(i => i.PackageId).Distinct().ToList();
        var courseIds = orders.SelectMany(o => o.Items).Select(i => i.CourseId).Distinct().ToList();
        var pkgs = await db.Packages.AsNoTracking().Where(p => pkgIds.Contains(p.Id)).ToDictionaryAsync(p => p.Id, p => p.Title);
        var courses = await db.Courses.AsNoTracking().Where(c => courseIds.Contains(c.Id)).ToDictionaryAsync(c => c.Id, c => c.Title);
        var refunds = (await db.Refunds.AsNoTracking().Where(r => ids.Contains(r.OrderId)).OrderBy(r => r.CreatedAt).ToListAsync())
            .GroupBy(r => r.OrderId).ToDictionary(g => g.Key, g => g.Last().Status);
        var cutoff = DateTime.UtcNow.AddDays(-RefundWindowDays);
        return orders.Select(o => new OrderDto(o.Id, o.Status.ToString(), o.Total, o.Currency, o.CreatedAt, o.PaidAt,
            o.Items.Select(i => new OrderItemDto(i.PackageId, i.CourseId, pkgs.GetValueOrDefault(i.PackageId, ""), courses.GetValueOrDefault(i.CourseId, ""), i.UnitPrice)).ToList(),
            refunds.GetValueOrDefault(o.Id),
            o.Status == OrderStatus.Paid && o.PaidAt >= cutoff && refunds.GetValueOrDefault(o.Id) is null or "Rejected")).ToList();
    }

    public async Task<RefundDto> RequestRefund(Guid orderId, RefundRequestInput input)
    {
        var uid = me.RequireId();
        var reason = (input.Reason ?? "").Trim();
        if (reason.Length is < 3 or > 500) throw AppException.Bad("Reason must be 3-500 characters.");
        var order = await db.Orders.FirstOrDefaultAsync(o => o.Id == orderId && o.UserId == uid) ?? throw AppException.NotFound("Order");
        if (order.Status != OrderStatus.Paid || order.PaidAt is null) throw AppException.Bad("Only paid orders can be refunded.", "order_not_paid");
        if (order.PaidAt.Value.AddDays(RefundWindowDays) < DateTime.UtcNow)
            throw AppException.Bad($"The refund window of {RefundWindowDays} days has passed.", "refund_window_expired");
        if (await db.Refunds.AnyAsync(r => r.OrderId == orderId && (r.Status == "Requested" || r.Status == "Processing" || r.Status == "Completed")))
            throw AppException.Conflict("A refund request already exists for this order.", "refund_already_requested");
        var r = new Refund { OrderId = orderId, Amount = order.Total, Reason = reason, Status = "Requested", RequestedBy = uid };
        db.Refunds.Add(r);
        audit.Record("refund.requested", nameof(Refund), r.Id, new { orderId, reason });
        await db.SaveChangesAsync();
        return new RefundDto(r.Id, orderId, uid, r.Amount, order.Currency, r.Reason, r.Status, null, r.CreatedAt);
    }

    public async Task<List<RefundDto>> AdminRefunds(string? status)
    {
        var q = from r in db.Refunds.AsNoTracking()
                join o in db.Orders.AsNoTracking() on r.OrderId equals o.Id
                select new { r, o.UserId, o.Currency };
        if (!string.IsNullOrWhiteSpace(status)) q = q.Where(x => x.r.Status == status);
        var list = await q.OrderBy(x => x.r.CreatedAt).Take(500).ToListAsync();
        return list.Select(x => new RefundDto(x.r.Id, x.r.OrderId, x.UserId, x.r.Amount, x.Currency, x.r.Reason, x.r.Status, x.r.ProviderRefundId, x.r.CreatedAt)).ToList();
    }

    public async Task<RefundDto> DecideRefund(Guid refundId, DecisionInput input)
    {
        var uid = me.RequireId();
        if (input.Decision is not ("Approve" or "Reject")) throw AppException.Bad("Decision must be Approve or Reject.");
        var exists = await db.Refunds.AsNoTracking().FirstOrDefaultAsync(x => x.Id == refundId) ?? throw AppException.NotFound("Refund");
        var now = DateTime.UtcNow;

        // Atomic claim: exactly one decider can move Requested -> Processing (or -> Rejected). Losers get 409.
        var target = input.Decision == "Reject" ? "Rejected" : "Processing";
        var claimed = await db.Refunds.Where(x => x.Id == refundId && x.Status == "Requested")
            .ExecuteUpdateAsync(s => s.SetProperty(x => x.Status, target).SetProperty(x => x.DecidedBy, (Guid?)uid).SetProperty(x => x.DecidedAt, (DateTime?)now));
        if (claimed != 1)
        {
            var current = await db.Refunds.AsNoTracking().Where(x => x.Id == refundId).Select(x => x.Status).FirstAsync();
            throw AppException.Conflict($"Refund is already {current}.", "refund_already_decided");
        }
        var r = await db.Refunds.FirstAsync(x => x.Id == refundId);
        var order = await db.Orders.FirstAsync(o => o.Id == r.OrderId);

        if (input.Decision == "Reject")
        {
            audit.Record("refund.rejected", nameof(Refund), r.Id, new { r.OrderId, input.Notes });
            await db.SaveChangesAsync();
            return ToRefundDto(r, order);
        }

        ProviderRefundResult pr;
        try
        {
            if (order.Status != OrderStatus.Paid) throw AppException.Conflict("Order is not in a refundable state.", "order_not_paid");
            var payment = await db.Payments.AsNoTracking().Where(p => p.OrderId == order.Id).OrderBy(p => p.CreatedAt).FirstOrDefaultAsync()
                          ?? throw AppException.Conflict("No captured payment found for this order.", "payment_missing");
            // Provider first: never mark a refund complete unless the provider accepted it (provider call is idempotent per order).
            pr = await provider.RefundPayment(payment.ProviderPaymentId, Money.ToMinor(r.Amount, order.Currency), order.Id);
        }
        catch
        {
            // Release the claim so the refund can be decided again.
            await db.Refunds.Where(x => x.Id == refundId && x.Status == "Processing")
                .ExecuteUpdateAsync(s => s.SetProperty(x => x.Status, "Requested").SetProperty(x => x.DecidedBy, (Guid?)null).SetProperty(x => x.DecidedAt, (DateTime?)null));
            throw;
        }

        await using var tx = await db.Database.BeginTransactionAsync();
        r.Status = "Completed";
        r.ProviderRefundId = pr.RefundId;
        order.Status = OrderStatus.Refunded;
        // Revoke ONLY entitlements created by this order; Organization/Grant/other-order entitlements are untouched.
        var ents = await db.Entitlements.Where(e => e.OrderId == order.Id && e.RevokedAt == null).ToListAsync();
        foreach (var e in ents) e.RevokedAt = now;
        var sales = await db.CommissionLedger.AsNoTracking().Where(c => c.OrderId == order.Id && c.Kind == "Sale").ToListAsync();
        var reversed = await db.CommissionLedger.AsNoTracking().Where(c => c.OrderId == order.Id && c.Kind == "RefundReversal").Select(c => c.InstructorId).ToListAsync();
        foreach (var s in sales.Where(s => !reversed.Contains(s.InstructorId)).GroupBy(s => s.InstructorId).Select(g => g.First()))
            db.CommissionLedger.Add(new CommissionLedgerEntry
            {
                InstructorId = s.InstructorId, OrderId = s.OrderId, CourseId = s.CourseId, Kind = "RefundReversal",
                GrossAmount = -s.GrossAmount, InstructorAmount = -s.InstructorAmount, PlatformAmount = -s.PlatformAmount, Currency = s.Currency,
            });
        var revokedCerts = await RevokePremiumCertificates(order, now);
        audit.Record("refund.approved", nameof(Refund), r.Id, new { r.OrderId, pr.RefundId, revokedEntitlements = ents.Select(e => e.Id), revokedCertificates = revokedCerts, input.Notes });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return ToRefundDto(r, order);
    }

    private static RefundDto ToRefundDto(Refund r, Order order) =>
        new(r.Id, r.OrderId, order.UserId, r.Amount, order.Currency, r.Reason, r.Status, r.ProviderRefundId, r.CreatedAt);

    /// <summary>
    /// A certificate earned through a premium (paid) assessment depends on the refunded purchase: revoke it unless the user
    /// still holds another active entitlement for the course (e.g. organization grant or another order).
    /// </summary>
    private async Task<List<Guid>> RevokePremiumCertificates(Order order, DateTime now)
    {
        var courseIds = await db.OrderItems.AsNoTracking().Where(i => i.OrderId == order.Id).Select(i => i.CourseId).Distinct().ToListAsync();
        var revoked = new List<Guid>();
        foreach (var courseId in courseIds)
        {
            var stillEntitled = await db.Entitlements.AnyAsync(e => e.UserId == order.UserId && e.CourseId == courseId && e.OrderId != order.Id
                && e.RevokedAt == null && e.StartsAt <= now && (e.EndsAt == null || e.EndsAt > now));
            if (stillEntitled) continue;
            var certs = await (from c in db.Certificates
                               join at in db.Attempts on c.AttemptId equals at.Id
                               join a in db.Assessments on at.AssessmentId equals a.Id
                               where c.UserId == order.UserId && c.CourseId == courseId && c.Status == CertificateStatus.Valid && a.IsPremium
                               select c).ToListAsync();
            foreach (var c in certs)
            {
                c.Status = CertificateStatus.Revoked;
                c.RevocationReason = "Refunded purchase: certificate was earned through premium assessment access.";
                audit.Record("certificate.revoked", nameof(Certificate), c.Id, new { reason = "refund", order.Id, courseId });
                revoked.Add(c.Id);
            }
        }
        return revoked;
    }

    // ===================== Earnings & payouts =====================

    private static LedgerEntryDto ToDto(CommissionLedgerEntry e) => new(e.Id, e.OrderId, e.CourseId, e.Kind, e.GrossAmount, e.InstructorAmount,
        e.PlatformAmount, e.Currency, e.PayoutBatchId, e.CreatedAt);

    public async Task<EarningsDto> MyEarnings()
    {
        var uid = me.RequireId();
        var entries = await db.CommissionLedger.AsNoTracking().Where(e => e.InstructorId == uid).OrderByDescending(e => e.CreatedAt).ToListAsync();
        var totals = entries.GroupBy(e => e.Currency).OrderBy(g => g.Key)
            .Select(g => new CurrencyTotal(g.Key, g.Sum(e => e.InstructorAmount), g.Where(e => e.Kind == "Sale").Sum(e => e.GrossAmount), g.Count())).ToList();
        return new EarningsDto(entries.Select(ToDto).ToList(), totals);
    }

    private async Task<PayoutBatchDto> BatchDto(PayoutBatch b)
    {
        var lines = await db.CommissionLedger.AsNoTracking().Where(e => e.PayoutBatchId == b.Id)
            .GroupBy(e => new { e.InstructorId, e.Currency })
            .Select(g => new PayoutLine(g.Key.InstructorId, g.Key.Currency, g.Sum(e => e.InstructorAmount), g.Count())).ToListAsync();
        return new PayoutBatchDto(b.Id, b.Status, b.CreatedBy, b.ApprovedBy, b.CreatedAt, lines.OrderBy(l => l.Currency).ThenBy(l => l.InstructorId).ToList());
    }

    public async Task<PayoutBatchDto> CreatePayoutBatch()
    {
        var uid = me.RequireId();
        await using var tx = await db.Database.BeginTransactionAsync();
        var batch = new PayoutBatch { CreatedBy = uid, Status = "Draft" };
        db.PayoutBatches.Add(batch);
        await db.SaveChangesAsync();
        // Atomic claim: only entries not already in a batch are moved (safe under concurrent batch creation).
        var claimed = await db.CommissionLedger.Where(e => e.PayoutBatchId == null).ExecuteUpdateAsync(s => s.SetProperty(e => e.PayoutBatchId, batch.Id));
        if (claimed == 0)
        {
            await tx.RollbackAsync();
            throw AppException.Bad("There are no unbatched ledger entries.", "nothing_to_pay");
        }
        audit.Record("payout_batch.created", nameof(PayoutBatch), batch.Id, new { entries = claimed });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return await BatchDto(batch);
    }

    public async Task<List<PayoutBatchDto>> PayoutBatches()
    {
        var list = await db.PayoutBatches.AsNoTracking().OrderByDescending(b => b.CreatedAt).Take(100).ToListAsync();
        var ids = list.Select(b => b.Id).ToList();
        var rows = await db.CommissionLedger.AsNoTracking().Where(e => e.PayoutBatchId != null && ids.Contains(e.PayoutBatchId!.Value))
            .GroupBy(e => new { BatchId = e.PayoutBatchId!.Value, e.InstructorId, e.Currency })
            .Select(g => new { g.Key.BatchId, g.Key.InstructorId, g.Key.Currency, Amount = g.Sum(e => e.InstructorAmount), Count = g.Count() })
            .ToListAsync();
        var byBatch = rows.ToLookup(r => r.BatchId);
        return list.Select(b => new PayoutBatchDto(b.Id, b.Status, b.CreatedBy, b.ApprovedBy, b.CreatedAt,
            byBatch[b.Id].Select(r => new PayoutLine(r.InstructorId, r.Currency, r.Amount, r.Count))
                .OrderBy(l => l.Currency).ThenBy(l => l.InstructorId).ToList())).ToList();
    }

    public async Task<PayoutBatchDto> ApprovePayoutBatch(Guid id)
    {
        var uid = me.RequireId();
        var b = await db.PayoutBatches.FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Payout batch");
        if (b.Status != "Draft") throw AppException.Conflict($"Batch is already {b.Status}.");
        if (b.CreatedBy == uid) throw AppException.Forbidden("A payout batch must be approved by a different user than its creator.");
        b.Status = "Approved"; b.ApprovedBy = uid;
        audit.Record("payout_batch.approved", nameof(PayoutBatch), b.Id);
        await db.SaveChangesAsync();
        return await BatchDto(b);
    }
}

/// <summary>
/// Commission split: instructor pool = gross × InstructorSharePercent, split between course instructors by
/// RevenueSharePercent (normalised if shares exceed 100%). Each instructor amount is rounded down to the currency's minor unit (0 decimals for zero-decimal currencies such as JPY, else 2);
/// everything not paid to instructors (including rounding remainders and unallocated shares) goes to the platform,
/// recorded on the first entry so that Σ(instructor) + Σ(platform) == gross exactly.
/// </summary>
public static class CommissionSplit
{
    public static List<CommissionLedgerEntry> Compute(Guid orderId, Guid courseId, decimal gross, string currency, decimal poolPercent,
        IReadOnlyList<CourseInstructor> instructors)
    {
        var result = new List<CommissionLedgerEntry>();
        var payees = instructors.Where(i => i.RevenueSharePercent > 0).ToList();
        if (payees.Count == 0) return result;
        var pool = gross * poolPercent / 100m;
        var decimals = Money.IsZeroDecimal(currency) ? 0 : 2; // minor units: JPY etc. have no fractional amounts
        var shareTotal = payees.Sum(i => i.RevenueSharePercent);
        var divisor = shareTotal > 100m ? shareTotal : 100m;
        foreach (var i in payees)
        {
            var amt = Math.Round(pool * i.RevenueSharePercent / divisor, decimals, MidpointRounding.ToZero);
            result.Add(new CommissionLedgerEntry
            {
                InstructorId = i.UserId, OrderId = orderId, CourseId = courseId, Kind = "Sale", GrossAmount = gross,
                InstructorAmount = amt, PlatformAmount = 0m, Currency = currency,
            });
        }
        result[0].PlatformAmount = gross - result.Sum(e => e.InstructorAmount);
        return result;
    }
}
