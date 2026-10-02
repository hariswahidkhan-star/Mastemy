using System.Text.Json;
using System.Text.RegularExpressions;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Commerce;

public record PlanInput(string Code, string Name, string Scope, int? CategoryId, decimal Price, string Currency, string Interval, int AiAllowance, string IncludedServices);
public record PlanUpdateInput(string? Name, int? AiAllowance, string? IncludedServices, bool? IsActive);
public record PlanDto(Guid Id, string Code, string Name, string Scope, int? CategoryId, decimal Price, string Currency, string Interval, int AiAllowance,
    string IncludedServices, bool IsActive, string RenewalTerms, string FreeVideoNotice);
public record SubscriptionCheckoutInput(Guid PlanId, string IdempotencyKey);
public record SubscriptionCheckoutResponse(Guid SubscriptionId, string CheckoutUrl);
public record SubscriptionDto(Guid Id, Guid PlanId, string PlanName, string Status, DateTime? CurrentPeriodStart, DateTime? CurrentPeriodEnd,
    bool CancelAtPeriodEnd, DateTime? GraceUntil, DateTime? EndedAt, string RenewalTerms);
public record PoolAllocateInput(int Year, int Month);
public record PoolLineDto(Guid CourseId, long Units, decimal Amount);
public record PoolAllocationDto(Guid Id, int Year, int Month, string Currency, decimal Revenue, decimal PoolPercent, decimal Pool, long TotalUnits, decimal Allocated, List<PoolLineDto> Lines);

/// <summary>
/// Premium subscriptions via Stripe Checkout (mode=subscription). Access is materialised as Entitlement rows
/// (Source=Subscription, EndsAt = current_period_end, or the grace end while a renewal payment is failing).
/// </summary>
public class SubscriptionService(AppDbContext db, ICurrentUser me, AuditService audit, IPaymentProvider provider, InvoiceService invoices,
    LedgerService ledger, IConfiguration cfg, ILogger<SubscriptionService> log)
{
    private int GraceDays => Math.Clamp(cfg.GetValue("Subscriptions:GraceDays", 7), 0, 60);
    private decimal PoolPercent => Math.Clamp(cfg.GetValue("Commission:SubscriptionPoolPercent", cfg.GetValue("Commission:InstructorSharePercent", 70m)), 0m, 100m);

    public static string RenewalTerms(Plan p) =>
        $"Renews automatically every {p.Interval} at {p.Price} {p.Currency} until you cancel. Cancelling stops the next renewal; " +
        $"premium study services stay available until the end of the period you already paid for. Includes up to {p.AiAllowance} AI tutor " +
        $"requests per {p.Interval}. If a renewal payment fails, access continues during a short grace period and then ends.";

    private static PlanDto ToDto(Plan p) => new(p.Id, p.Code, p.Name, p.Scope, p.CategoryId, p.Price, p.Currency, p.Interval, p.AiAllowance,
        p.IncludedServices, p.IsActive, RenewalTerms(p), CommerceText.FreeVideoNotice);

    private static void GuardServices(string name, string services)
    {
        if (CommerceService.MentionsVideoAccess(name) || CommerceService.MentionsVideoAccess(services))
            throw AppException.Bad("Plans may only include paid study services; course videos are always free.", "package_sells_video_access");
        if (Regex.IsMatch(name + " " + services, @"\bunlimited\b", RegexOptions.IgnoreCase))
            throw AppException.Bad("Plans must state explicit allowances; 'unlimited' claims are not allowed.", "unlimited_claim");
    }

    // ===================== Plans =====================

    public async Task<PlanDto> CreatePlan(PlanInput input)
    {
        var code = CommerceText.NormalizeCode(input.Code, "Plan code");
        var name = (input.Name ?? "").Trim(); var services = (input.IncludedServices ?? "").Trim();
        if (name.Length is < 3 or > 200) throw AppException.Bad("Name must be 3-200 characters.");
        if (services.Length is < 3 or > 4000) throw AppException.Bad("Included services must be 3-4000 characters.");
        GuardServices(name, services);
        if (input.Scope is not ("AllCourses" or "Category")) throw AppException.Bad("Scope must be AllCourses or Category.");
        if (input.Scope == "Category" && (input.CategoryId is null || !await db.Categories.AnyAsync(c => c.Id == input.CategoryId)))
            throw AppException.Bad("A category plan needs a valid categoryId.");
        if (input.Interval is not ("month" or "year")) throw AppException.Bad("Interval must be month or year.");
        if (input.AiAllowance is < 0 or > 100_000) throw AppException.Bad("aiAllowance must be between 0 and 100000.");
        var cur = CommerceText.Currency(input.Currency);
        CommerceText.ValidAmount(input.Price, cur, "Price");
        if (await db.Set<Plan>().AnyAsync(p => p.Code == code)) throw AppException.Conflict("A plan with this code exists.", "plan_code_taken");
        var p = new Plan
        {
            Code = code, Name = name, Scope = input.Scope, CategoryId = input.Scope == "Category" ? input.CategoryId : null, Price = input.Price,
            Currency = cur, Interval = input.Interval, AiAllowance = input.AiAllowance, IncludedServices = services,
        };
        db.Set<Plan>().Add(p);
        audit.Record("plan.created", nameof(Plan), p.Id, new { code, name, p.Scope, p.CategoryId, p.Price, cur, p.Interval, p.AiAllowance });
        await db.SaveChangesAsync();
        return ToDto(p);
    }

    /// <summary>Price/interval/scope are immutable (existing subscribers keep their terms); create a new plan instead.</summary>
    public async Task<PlanDto> UpdatePlan(Guid id, PlanUpdateInput input)
    {
        var p = await db.Set<Plan>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Plan");
        var name = input.Name?.Trim() ?? p.Name; var services = input.IncludedServices?.Trim() ?? p.IncludedServices;
        if (name.Length is < 3 or > 200) throw AppException.Bad("Name must be 3-200 characters.");
        if (services.Length is < 3 or > 4000) throw AppException.Bad("Included services must be 3-4000 characters.");
        GuardServices(name, services);
        if (input.AiAllowance is < 0 or > 100_000) throw AppException.Bad("aiAllowance must be between 0 and 100000.");
        p.Name = name; p.IncludedServices = services; p.AiAllowance = input.AiAllowance ?? p.AiAllowance; p.IsActive = input.IsActive ?? p.IsActive;
        audit.Record("plan.updated", nameof(Plan), p.Id, new { p.Name, p.AiAllowance, p.IsActive });
        await db.SaveChangesAsync();
        return ToDto(p);
    }

    public async Task<List<PlanDto>> Plans(bool includeInactive) =>
        (await db.Set<Plan>().AsNoTracking().Where(p => includeInactive || p.IsActive).OrderBy(p => p.Price).ToListAsync()).Select(ToDto).ToList();

    // ===================== Checkout & self-service =====================

    public async Task<SubscriptionCheckoutResponse> Checkout(SubscriptionCheckoutInput input)
    {
        var uid = me.RequireId();
        var key = (input.IdempotencyKey ?? "").Trim();
        if (key.Length is < 8 or > 128) throw AppException.Bad("idempotencyKey must be 8-128 characters.");
        if (!provider.IsConfigured) throw new AppException(503, "Payments are not configured on this server.", "payments_not_configured");
        var existing = await db.Set<Subscription>().FirstOrDefaultAsync(s => s.UserId == uid && s.IdempotencyKey == key);
        if (existing is not null)
        {
            if (existing.PlanId != input.PlanId) throw AppException.Conflict("This idempotency key was already used for a different plan.", "idempotency_key_reused");
            if (existing.Status != "Incomplete") throw AppException.Conflict($"Subscription is already {existing.Status}.", "subscription_not_pending");
            return await EnsureSession(existing);
        }
        var plan = await db.Set<Plan>().AsNoTracking().FirstOrDefaultAsync(p => p.Id == input.PlanId && p.IsActive) ?? throw AppException.NotFound("Plan");
        if (await db.Set<Subscription>().AnyAsync(s => s.UserId == uid && s.PlanId == plan.Id && (s.Status == "Active" || s.Status == "PastDue")))
            throw AppException.Conflict("You already have this subscription.", "already_subscribed");
        var sub = new Subscription { UserId = uid, PlanId = plan.Id, IdempotencyKey = key };
        db.Set<Subscription>().Add(sub);
        audit.Record("subscription.checkout_started", nameof(Subscription), sub.Id, new { planId = plan.Id });
        try { await db.SaveChangesAsync(); }
        catch (DbUpdateException)
        {
            db.ChangeTracker.Clear();
            var winner = await db.Set<Subscription>().FirstAsync(s => s.UserId == uid && s.IdempotencyKey == key);
            if (winner.PlanId != input.PlanId) throw AppException.Conflict("This idempotency key was already used for a different plan.", "idempotency_key_reused");
            return await EnsureSession(winner);
        }
        return await EnsureSession(sub);
    }

    private async Task<SubscriptionCheckoutResponse> EnsureSession(Subscription sub)
    {
        if (!string.IsNullOrEmpty(sub.ProviderSessionId))
        {
            var s = await provider.GetCheckoutSession(sub.ProviderSessionId);
            if (string.IsNullOrEmpty(s.Url)) throw AppException.Conflict("The checkout session has expired. Start again with a new idempotency key.", "checkout_session_expired");
            return new SubscriptionCheckoutResponse(sub.Id, s.Url);
        }
        var plan = await db.Set<Plan>().AsNoTracking().FirstAsync(p => p.Id == sub.PlanId);
        var email = await db.Users.Where(u => u.Id == sub.UserId).Select(u => u.Email).FirstOrDefaultAsync();
        var session = await provider.CreateCheckoutSession(new CheckoutSessionRequest(sub.Id, sub.UserId, plan.Name, Money.ToMinor(plan.Price, plan.Currency), plan.Currency, email)
        { Mode = "subscription", RecurringInterval = plan.Interval });
        if (string.IsNullOrEmpty(session.Url)) throw new AppException(502, "Payment provider returned no checkout URL.", "payment_provider_error");
        sub.ProviderSessionId = session.SessionId;
        await db.SaveChangesAsync();
        return new SubscriptionCheckoutResponse(sub.Id, session.Url);
    }

    private async Task<SubscriptionDto> ToDto(Subscription s)
    {
        var plan = await db.Set<Plan>().AsNoTracking().FirstAsync(p => p.Id == s.PlanId);
        return new SubscriptionDto(s.Id, s.PlanId, plan.Name, s.Status, s.CurrentPeriodStart, s.CurrentPeriodEnd, s.CancelAtPeriodEnd, s.GraceUntil, s.EndedAt, RenewalTerms(plan));
    }

    public async Task<List<SubscriptionDto>> MySubscriptions()
    {
        var uid = me.RequireId();
        var list = await db.Set<Subscription>().AsNoTracking().Where(s => s.UserId == uid && s.Status != "Incomplete").OrderByDescending(s => s.CreatedAt).ToListAsync();
        var res = new List<SubscriptionDto>();
        foreach (var s in list) res.Add(await ToDto(s));
        return res;
    }

    /// <summary>Cancel (or resume) at period end through the provider; local state changes only after the provider confirms.</summary>
    public async Task<SubscriptionDto> SetCancelAtPeriodEnd(Guid id, bool cancel)
    {
        var uid = me.RequireId();
        var s = await db.Set<Subscription>().FirstOrDefaultAsync(x => x.Id == id && x.UserId == uid) ?? throw AppException.NotFound("Subscription");
        if (s.Status is not ("Active" or "PastDue") || string.IsNullOrEmpty(s.ProviderSubscriptionId))
            throw AppException.Conflict($"Subscription is {s.Status} and cannot be changed.", "subscription_not_active");
        if (s.CancelAtPeriodEnd == cancel) return await ToDto(s);
        if (!provider.IsConfigured) throw new AppException(503, "Payments are not configured on this server.", "payments_not_configured");
        await provider.SetCancelAtPeriodEnd(s.ProviderSubscriptionId, cancel);
        s.CancelAtPeriodEnd = cancel; s.UpdatedAt = DateTime.UtcNow;
        audit.Record(cancel ? "subscription.cancel_requested" : "subscription.resumed", nameof(Subscription), s.Id, new { s.CurrentPeriodEnd });
        await db.SaveChangesAsync();
        return await ToDto(s);
    }

    // ===================== Webhooks =====================

    private static string? Str(JsonElement e, string name) =>
        e.ValueKind == JsonValueKind.Object && e.TryGetProperty(name, out var v) && v.ValueKind == JsonValueKind.String ? v.GetString() : null;

    private static long? Long(JsonElement e, string name) =>
        e.ValueKind == JsonValueKind.Object && e.TryGetProperty(name, out var v) && v.ValueKind == JsonValueKind.Number && v.TryGetInt64(out var l) ? l : null;

    private static JsonElement Prop(JsonElement e, params string[] path)
    {
        foreach (var p in path)
        {
            if (e.ValueKind != JsonValueKind.Object || !e.TryGetProperty(p, out e)) return default;
        }
        return e;
    }

    private static DateTime? Unix(long? s) => s is null ? null : DateTimeOffset.FromUnixTimeSeconds(s.Value).UtcDateTime;

    private static Guid? LocalId(JsonElement obj)
    {
        foreach (var md in new[] { Prop(obj, "metadata"), Prop(obj, "subscription_details", "metadata"), Prop(obj, "parent", "subscription_details", "metadata") })
            if (Guid.TryParse(Str(md, "subscription_id"), out var g)) return g;
        return null;
    }

    private async Task<Subscription?> Find(string? providerSubId, Guid? localId)
    {
        Subscription? s = null;
        if (!string.IsNullOrEmpty(providerSubId)) s = await db.Set<Subscription>().FirstOrDefaultAsync(x => x.ProviderSubscriptionId == providerSubId);
        if (s is null && localId is not null)
        {
            s = await db.Set<Subscription>().FirstOrDefaultAsync(x => x.Id == localId);
            if (s is not null && s.ProviderSubscriptionId is not null && providerSubId is not null && s.ProviderSubscriptionId != providerSubId) return null;
            if (s is not null && s.ProviderSubscriptionId is null && providerSubId is not null) s.ProviderSubscriptionId = providerSubId;
        }
        return s;
    }

    public async Task<WebhookResult> OnCheckoutCompleted(JsonElement obj, string eventId)
    {
        var s = await Find(Str(obj, "subscription"), LocalId(obj));
        if (s is null) return Rejected(eventId, "subscription_not_found");
        s.ProviderCustomerId ??= Str(obj, "customer");
        s.UpdatedAt = DateTime.UtcNow;
        audit.Record("subscription.checkout_completed", nameof(Subscription), s.Id, new { eventId, s.ProviderSubscriptionId });
        return new WebhookResult("subscription_linked");
    }

    public async Task<WebhookResult> OnSubscriptionChanged(JsonElement obj, string type, string eventId)
    {
        var providerId = Str(obj, "id");
        var s = await Find(providerId, LocalId(obj));
        if (s is null) return LocalId(obj) is null ? new WebhookResult("ignored", "unknown_subscription") : Rejected(eventId, "subscription_not_found");
        var now = DateTime.UtcNow;
        var item = Prop(obj, "items", "data");
        var first = item.ValueKind == JsonValueKind.Array && item.GetArrayLength() > 0 ? item[0] : default;
        var periodStart = Unix(Long(obj, "current_period_start") ?? Long(first, "current_period_start"));
        var periodEnd = Unix(Long(obj, "current_period_end") ?? Long(first, "current_period_end"));
        if (periodEnd is not null && (s.CurrentPeriodEnd is null || periodEnd > s.CurrentPeriodEnd)) { s.CurrentPeriodEnd = periodEnd; s.CurrentPeriodStart = periodStart; }
        s.ProviderCustomerId ??= Str(obj, "customer");
        if (obj.TryGetProperty("cancel_at_period_end", out var cap) && cap.ValueKind is JsonValueKind.True or JsonValueKind.False) s.CancelAtPeriodEnd = cap.GetBoolean();
        var status = type == "customer.subscription.deleted" ? "canceled" : Str(obj, "status");
        var old = s.Status;
        if (s.Status is "Canceled" or "Ended" && status is not ("canceled" or "unpaid" or "incomplete_expired"))
            return new WebhookResult("ignored", "subscription_already_ended"); // stale out-of-order event
        switch (status)
        {
            case "active" or "trialing":
                s.Status = "Active"; s.GraceUntil = null;
                await SyncEntitlements(s, s.CurrentPeriodEnd ?? now);
                break;
            case "past_due":
                s.Status = "PastDue"; s.GraceUntil ??= now.AddDays(GraceDays);
                await SyncEntitlements(s, Max(s.CurrentPeriodEnd, s.GraceUntil) ?? now);
                break;
            case "canceled" or "incomplete_expired" or "unpaid":
                await End(s, status == "unpaid" ? "Ended" : "Canceled", now);
                break;
            default:
                break; // incomplete / paused: no access change
        }
        s.UpdatedAt = now;
        audit.Record("subscription.updated", nameof(Subscription), s.Id, new { eventId, type, old, @new = s.Status, s.CurrentPeriodEnd, s.CancelAtPeriodEnd });
        return new WebhookResult("subscription_" + s.Status.ToLowerInvariant());
    }

    private static DateTime? Max(DateTime? a, DateTime? b) => a is null ? b : b is null ? a : a > b ? a : b;

    private async Task End(Subscription s, string status, DateTime now)
    {
        s.Status = status; s.EndedAt ??= now; s.GraceUntil = null;
        var ids = db.Set<SubscriptionEntitlement>().Where(x => x.SubscriptionId == s.Id).Select(x => x.EntitlementId);
        var ents = await db.Entitlements.Where(e => ids.Contains(e.Id) && (e.EndsAt == null || e.EndsAt > now)).ToListAsync();
        foreach (var e in ents) e.EndsAt = now;
    }

    public async Task<WebhookResult> OnInvoicePaid(JsonElement obj, string eventId)
    {
        var invoiceId = Str(obj, "id");
        if (string.IsNullOrEmpty(invoiceId)) return Rejected(eventId, "invoice_id_missing");
        var providerSub = Str(obj, "subscription") ?? Str(Prop(obj, "parent", "subscription_details"), "subscription");
        if (providerSub is null && LocalId(obj) is null) return new WebhookResult("ignored", "not_a_subscription_invoice");
        var s = await Find(providerSub, LocalId(obj));
        // Not linked yet (event raced ahead of checkout completion): fail so the provider retries later.
        if (s is null) throw new AppException(409, "Subscription is not linked yet; retry later.", "subscription_not_linked");
        if (await db.Set<SubscriptionInvoice>().AnyAsync(i => i.ProviderInvoiceId == invoiceId)) return new WebhookResult("duplicate_invoice");
        var plan = await db.Set<Plan>().AsNoTracking().FirstAsync(p => p.Id == s.PlanId);
        var amountMinor = Long(obj, "amount_paid"); var currency = Str(obj, "currency");
        if (amountMinor is null || currency is null || !string.Equals(currency, plan.Currency, StringComparison.OrdinalIgnoreCase))
            return Rejected(eventId, "invoice_amount_or_currency_invalid");
        var amount = Money.FromMinor(amountMinor.Value, plan.Currency);
        var now = DateTime.UtcNow;
        var lines = Prop(obj, "lines", "data");
        var line = lines.ValueKind == JsonValueKind.Array && lines.GetArrayLength() > 0 ? lines[0] : default;
        var pStart = Unix(Long(Prop(line, "period"), "start") ?? Long(obj, "period_start"));
        var pEnd = Unix(Long(Prop(line, "period"), "end") ?? Long(obj, "period_end"));

        Guid orderId = Guid.Empty;
        if (amount > 0)
        {
            var order = new Order
            {
                UserId = s.UserId, Status = OrderStatus.Paid, Total = amount, Currency = plan.Currency, PaidAt = now,
                IdempotencyKey = "subinv-" + (invoiceId.Length > 100 ? invoiceId[..100] : invoiceId),
            };
            db.Orders.Add(order);
            var detail = new OrderDetail { OrderId = order.Id, Kind = "SubscriptionInvoice", ListAmount = amount, Fingerprint = "subscription|" + s.Id, SubscriptionId = s.Id };
            db.Set<OrderDetail>().Add(detail);
            var pi = Str(obj, "payment_intent") ?? Str(obj, "charge") ?? invoiceId;
            db.Payments.Add(new Payment { OrderId = order.Id, Provider = provider.Name, ProviderPaymentId = pi, Amount = amount, Currency = plan.Currency });
            await db.SaveChangesAsync();
            await invoices.IssueInvoice(order, detail, [new InvoiceLine($"{plan.Name} subscription ({plan.Interval}){(pStart is null ? "" : $" {pStart:yyyy-MM-dd} to {pEnd:yyyy-MM-dd}")}", amount)], now);
            orderId = order.Id;
        }
        if (orderId != Guid.Empty)
            db.Set<SubscriptionInvoice>().Add(new SubscriptionInvoice { SubscriptionId = s.Id, ProviderInvoiceId = invoiceId, OrderId = orderId, Amount = amount, Currency = plan.Currency, PeriodStart = pStart, PeriodEnd = pEnd, PaidAt = now });
        if (pEnd is not null && (s.CurrentPeriodEnd is null || pEnd > s.CurrentPeriodEnd)) { s.CurrentPeriodEnd = pEnd; s.CurrentPeriodStart = pStart; }
        if (s.Status is "Incomplete" or "PastDue" or "Active")
        {
            s.Status = "Active"; s.GraceUntil = null;
            await SyncEntitlements(s, s.CurrentPeriodEnd ?? now);
        }
        s.UpdatedAt = now;
        audit.Record("subscription.invoice_paid", nameof(Subscription), s.Id, new { eventId, invoiceId, amount, plan.Currency, s.CurrentPeriodEnd });
        return new WebhookResult("subscription_renewed");
    }

    public async Task<WebhookResult> OnInvoicePaymentFailed(JsonElement obj, string eventId)
    {
        var providerSub = Str(obj, "subscription") ?? Str(Prop(obj, "parent", "subscription_details"), "subscription");
        if (providerSub is null && LocalId(obj) is null) return new WebhookResult("ignored", "not_a_subscription_invoice");
        var s = await Find(providerSub, LocalId(obj));
        if (s is null) throw new AppException(409, "Subscription is not linked yet; retry later.", "subscription_not_linked");
        if (s.Status is "Canceled" or "Ended") return new WebhookResult("ignored", "subscription_already_ended");
        var now = DateTime.UtcNow;
        s.Status = "PastDue";
        s.GraceUntil ??= now.AddDays(GraceDays);
        await SyncEntitlements(s, Max(s.CurrentPeriodEnd, s.GraceUntil)!.Value);
        s.UpdatedAt = now;
        audit.Record("subscription.payment_failed", nameof(Subscription), s.Id, new { eventId, invoice = Str(obj, "id"), s.GraceUntil });
        return new WebhookResult("subscription_past_due");
    }

    private WebhookResult Rejected(string eventId, string reason)
    {
        log.LogWarning("Stripe subscription event {EventId} rejected: {Reason}", eventId, reason);
        audit.Record("stripe.event_rejected", "WebhookEvent", eventId, new { reason });
        return new WebhookResult("rejected", reason);
    }

    // ===================== Entitlements =====================

    private async Task<List<Guid>> CoursesInScope(Plan plan)
    {
        var live = db.Courses.AsNoTracking().Where(AccessService.IsLiveExpr);
        if (plan.Scope == "AllCourses") return await live.Select(c => c.Id).ToListAsync();
        var cats = await db.Categories.AsNoTracking().Where(c => c.Id == plan.CategoryId || c.ParentId == plan.CategoryId).Select(c => c.Id).ToListAsync();
        var inCat = db.CourseCategories.Where(cc => cats.Contains(cc.CategoryId)).Select(cc => cc.CourseId);
        return await live.Where(c => inCat.Contains(c.Id)).Select(c => c.Id).ToListAsync();
    }

    /// <summary>Ensures one subscription entitlement per in-scope live course, all ending at <paramref name="endsAt"/>.</summary>
    public async Task SyncEntitlements(Subscription s, DateTime endsAt)
    {
        var plan = await db.Set<Plan>().AsNoTracking().FirstAsync(p => p.Id == s.PlanId);
        var courseIds = await CoursesInScope(plan);
        var links = await (from se in db.Set<SubscriptionEntitlement>()
                           join e in db.Entitlements on se.EntitlementId equals e.Id
                           where se.SubscriptionId == s.Id
                           select e).ToListAsync();
        foreach (var e in links) { e.EndsAt = endsAt; e.RevokedAt = null; }
        var now = DateTime.UtcNow;
        foreach (var courseId in courseIds.Except(links.Select(l => l.CourseId)))
        {
            var e = new Entitlement { UserId = s.UserId, CourseId = courseId, Source = EntitlementSource.Subscription, StartsAt = now, EndsAt = endsAt };
            db.Entitlements.Add(e);
            db.Set<SubscriptionEntitlement>().Add(new SubscriptionEntitlement { EntitlementId = e.Id, SubscriptionId = s.Id });
        }
    }

    /// <summary>Background maintenance: end subscriptions whose grace period passed; add entitlements for newly published in-scope courses.</summary>
    public async Task<(int Ended, int Synced)> Maintain()
    {
        var now = DateTime.UtcNow;
        var expired = await db.Set<Subscription>().Where(s => s.Status == "PastDue" && s.GraceUntil != null && s.GraceUntil <= now).ToListAsync();
        foreach (var s in expired)
        {
            await End(s, "Ended", s.GraceUntil!.Value < now ? s.GraceUntil.Value : now);
            audit.Record("subscription.grace_expired", nameof(Subscription), s.Id, new { s.GraceUntil });
        }
        var active = await db.Set<Subscription>().Where(s => s.Status == "Active" && s.CurrentPeriodEnd > now).Take(5000).ToListAsync();
        foreach (var s in active) await SyncEntitlements(s, s.CurrentPeriodEnd!.Value);
        await db.SaveChangesAsync();
        return (expired.Count, active.Count);
    }

    // ===================== Subscription revenue pool =====================

    /// <summary>
    /// Monthly instructor pool from subscription revenue (per currency), allocated by consumption share:
    ///   Revenue R = Σ subscription invoice payments in the month − Σ completed refunds of subscription orders decided in the month.
    ///   Pool P = floor(R × Commission:SubscriptionPoolPercent / 100).
    ///   Units U_c = Σ over eligible subscribers s of min(cap, |{(s, c, refId, utcDay)}|), where each element is a distinct
    ///   (subscriber, course, assessmentId-or-resourceId, UTC day) of a submitted premium attempt or a premium resource download
    ///   in the month, made while s held a subscription entitlement for c; cap = Subscriptions:MaxUnitsPerSubscriberPerCourse (default 30).
    ///   Excluded subscribers: course instructors/owner of c (for c), staff (any role other than Student/Instructor), and users
    ///   whose subscription payment was refunded or charged back (dispute not won) in the month.
    ///   Course amount A_c = floor(P × U_c / ΣU); A_c is split between instructors by RevenueSharePercent (CommissionSplit at 100%).
    ///   Rounding remainders and courses without payees stay with the platform. With ΣU = 0 nothing is allocated.
    /// One allocation per (year, month, currency) — re-running is a no-op. Ledger kind "SubscriptionPool".
    /// </summary>
    public async Task<List<PoolAllocationDto>> AllocatePool(int year, int month)
    {
        if (year is < 2000 or > 2100 || month is < 1 or > 12) throw AppException.Bad("Invalid period.");
        var start = new DateTime(year, month, 1, 0, 0, 0, DateTimeKind.Utc);
        var end = start.AddMonths(1);
        if (end > DateTime.UtcNow) throw AppException.Bad("A month can only be allocated after it has ended.", "period_not_closed");
        var invoicesInPeriod = await (from si in db.Set<SubscriptionInvoice>().AsNoTracking()
                                      join s in db.Set<Subscription>().AsNoTracking() on si.SubscriptionId equals s.Id
                                      where si.PaidAt >= start && si.PaidAt < end
                                      select new { si.Currency, si.Amount, si.OrderId, s.UserId, SubscriptionId = s.Id }).ToListAsync();
        var result = new List<PoolAllocationDto>();
        foreach (var group in invoicesInPeriod.GroupBy(i => i.Currency))
        {
            var currency = group.Key;
            if (await db.Set<PoolAllocation>().AnyAsync(a => a.Year == year && a.Month == month && a.Currency == currency)) continue;
            var orderIds = group.Select(g => g.OrderId).ToList();
            var refunded = await (from r in db.Refunds.AsNoTracking()
                                  join d in db.Set<OrderDetail>().AsNoTracking() on r.OrderId equals d.OrderId
                                  join o in db.Orders.AsNoTracking() on r.OrderId equals o.Id
                                  where d.Kind == "SubscriptionInvoice" && o.Currency == currency && r.Status == "Completed" && r.DecidedAt >= start && r.DecidedAt < end
                                  select r.Amount).SumAsync(a => (decimal?)a) ?? 0m;
            var revenue = Math.Max(0, group.Sum(g => g.Amount) - refunded);
            var pct = PoolPercent;
            var pool = Money.Floor(revenue * pct / 100m, currency);
            var subIds = group.Select(g => g.SubscriptionId).Distinct().ToList();

            // Subscription entitlements (user, course) of these subscribers.
            var subEnts = await (from se in db.Set<SubscriptionEntitlement>().AsNoTracking()
                                 join e in db.Entitlements.AsNoTracking() on se.EntitlementId equals e.Id
                                 where subIds.Contains(se.SubscriptionId)
                                 select new { e.UserId, e.CourseId, e.StartsAt }).ToListAsync();
            var userIds = subEnts.Select(e => e.UserId).Distinct().ToList();
            var attempts = await (from at in db.Attempts.AsNoTracking()
                                  join a in db.Assessments.AsNoTracking() on at.AssessmentId equals a.Id
                                  where a.IsPremium && at.Status == AttemptStatus.Submitted && at.SubmittedAt >= start && at.SubmittedAt < end && userIds.Contains(at.UserId)
                                  select new { at.UserId, a.CourseId, RefId = (Guid?)a.Id, At = at.SubmittedAt!.Value }).ToListAsync();
            var downloads = await db.Set<ConsumptionEvent>().AsNoTracking()
                .Where(c => c.Kind == "PremiumDownload" && c.OccurredAt >= start && c.OccurredAt < end && userIds.Contains(c.UserId))
                .Select(c => new { c.UserId, c.CourseId, c.RefId, At = c.OccurredAt }).ToListAsync();
            var courseIds = attempts.Select(a => a.CourseId).Concat(downloads.Select(d => d.CourseId)).Distinct().ToList();
            var instructors = await db.CourseInstructors.AsNoTracking().Where(ci => courseIds.Contains(ci.CourseId)).ToListAsync();
            var owners = await db.Courses.AsNoTracking().Where(c => courseIds.Contains(c.Id)).Select(c => new { c.Id, c.OwnerId }).ToListAsync();
            var authors = instructors.Select(i => (i.CourseId, i.UserId)).Concat(owners.Select(o => (CourseId: o.Id, UserId: o.OwnerId))).ToHashSet();
            var staff = (await db.UserRoles.AsNoTracking()
                .Where(r => userIds.Contains(r.UserId) && r.Role != Roles.Student && r.Role != Roles.Instructor)
                .Select(r => r.UserId).ToListAsync()).ToHashSet();
            var reversed = await ReversedSubscribers(userIds, start, end);
            var cap = Math.Max(1, cfg.GetValue("Subscriptions:MaxUnitsPerSubscriberPerCourse", 30));
            var units = attempts.Concat(downloads)
                .Where(x => x.RefId is not null)
                .Where(x => !staff.Contains(x.UserId) && !reversed.Contains(x.UserId) && !authors.Contains((x.CourseId, x.UserId)))
                .Where(x => subEnts.Any(e => e.UserId == x.UserId && e.CourseId == x.CourseId && e.StartsAt <= x.At))
                .Select(x => (x.UserId, x.CourseId, RefId: x.RefId!.Value, Day: x.At.Date)).Distinct()
                .GroupBy(x => (x.UserId, x.CourseId)).Select(g => (g.Key.CourseId, Units: (long)Math.Min(cap, g.Count())))
                .GroupBy(x => x.CourseId).ToDictionary(g => g.Key, g => g.Sum(x => x.Units));
            var totalUnits = units.Values.Sum();

            var alloc = new PoolAllocation { Year = year, Month = month, Currency = currency, Revenue = revenue, PoolPercent = pct, Pool = pool, TotalUnits = totalUnits, CreatedBy = me.Id };
            db.Set<PoolAllocation>().Add(alloc);
            var lines = new List<PoolLineDto>();
            if (totalUnits > 0 && pool > 0)
            {
                foreach (var (courseId, u) in units.OrderBy(k => k.Key))
                {
                    var amount = Money.Floor(pool * u / totalUnits, currency);
                    var line = new PoolAllocationLine { AllocationId = alloc.Id, CourseId = courseId, Units = u, Amount = amount };
                    db.Set<PoolAllocationLine>().Add(line);
                    lines.Add(new PoolLineDto(courseId, u, amount));
                    if (amount <= 0) continue;
                    var payees = instructors.Where(i => i.CourseId == courseId).OrderBy(i => i.Role).ThenBy(i => i.UserId).ToList();
                    foreach (var e in CommissionSplit.Compute(line.Id, courseId, amount, currency, 100m, payees))
                    {
                        e.Kind = "SubscriptionPool";
                        ledger.Add(e, null, "SubscriptionPool", line.Id);
                        alloc.Allocated += e.InstructorAmount;
                    }
                }
            }
            audit.Record("subscription_pool.allocated", nameof(PoolAllocation), alloc.Id, new { year, month, currency, revenue, pool, totalUnits, alloc.Allocated });
            try { await db.SaveChangesAsync(); }
            catch (DbUpdateException)
            {
                db.ChangeTracker.Clear(); // a concurrent run allocated this period first
                continue;
            }
            result.Add(new PoolAllocationDto(alloc.Id, year, month, currency, revenue, pct, pool, totalUnits, alloc.Allocated, lines));
        }
        return result;
    }

    /// <summary>Subscribers whose subscription payment was refunded (completed) or charged back (dispute not won) in [start, end).</summary>
    private async Task<HashSet<Guid>> ReversedSubscribers(List<Guid> userIds, DateTime start, DateTime end)
    {
        var subOrders = from si in db.Set<SubscriptionInvoice>().AsNoTracking()
                        join s in db.Set<Subscription>().AsNoTracking() on si.SubscriptionId equals s.Id
                        where userIds.Contains(s.UserId)
                        select new { si.OrderId, s.UserId };
        var refunded = await (from so in subOrders
                              join r in db.Refunds.AsNoTracking() on so.OrderId equals r.OrderId
                              where r.Status == "Completed" && r.DecidedAt >= start && r.DecidedAt < end
                              select so.UserId).ToListAsync();
        var disputed = await (from so in subOrders
                              join d in db.Set<Dispute>().AsNoTracking() on so.OrderId equals d.OrderId
                              where d.Status != "Won" && d.CreatedAt < end && (d.ClosedAt == null || d.ClosedAt >= start)
                              select so.UserId).ToListAsync();
        return refunded.Concat(disputed).ToHashSet();
    }

    public async Task<List<PoolAllocationDto>> Allocations(int? year)
    {
        var q = db.Set<PoolAllocation>().AsNoTracking();
        if (year is not null) q = q.Where(a => a.Year == year);
        var list = await q.OrderByDescending(a => a.Year).ThenByDescending(a => a.Month).Take(240).ToListAsync();
        var ids = list.Select(a => a.Id).ToList();
        var lines = (await db.Set<PoolAllocationLine>().AsNoTracking().Where(l => ids.Contains(l.AllocationId)).ToListAsync()).ToLookup(l => l.AllocationId);
        return list.Select(a => new PoolAllocationDto(a.Id, a.Year, a.Month, a.Currency, a.Revenue, a.PoolPercent, a.Pool, a.TotalUnits, a.Allocated,
            lines[a.Id].Select(l => new PoolLineDto(l.CourseId, l.Units, l.Amount)).ToList())).ToList();
    }
}

/// <summary>Records premium consumption signals for the subscription pool (call from premium resource downloads).</summary>
public class ConsumptionRecorder(AppDbContext db)
{
    /// <summary>
    /// Records a premium download for the subscription pool. Deduplicated on (user, resource RefId, UTC day): repeated downloads
    /// of the same file on the same day store nothing new (allocation also counts distinct (user, course, refId, day) only).
    /// Course authors and staff are not recorded at all.
    /// </summary>
    public async Task RecordPremiumDownload(Guid userId, Guid courseId, Guid resourceId)
    {
        var day = DateTime.UtcNow.Date;
        var next = day.AddDays(1);
        if (await db.Set<ConsumptionEvent>().AnyAsync(c => c.UserId == userId && c.Kind == "PremiumDownload" && c.RefId == resourceId && c.OccurredAt >= day && c.OccurredAt < next))
            return;
        if (await db.CourseInstructors.AnyAsync(ci => ci.CourseId == courseId && ci.UserId == userId)
            || await db.Courses.AnyAsync(c => c.Id == courseId && c.OwnerId == userId)
            || await db.UserRoles.AnyAsync(r => r.UserId == userId && r.Role != Roles.Student && r.Role != Roles.Instructor))
            return;
        db.Set<ConsumptionEvent>().Add(new ConsumptionEvent { UserId = userId, CourseId = courseId, Kind = "PremiumDownload", RefId = resourceId });
        await db.SaveChangesAsync();
    }
}
