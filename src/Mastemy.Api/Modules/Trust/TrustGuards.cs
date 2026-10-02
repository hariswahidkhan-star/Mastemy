using Mastemy.Api.Data;
using Mastemy.Api.Infrastructure;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Mastemy.Api.Modules.Trust;

/// <summary>
/// Global MVC filter enforcing trust &amp; safety state on routes owned by other modules, without touching them:
///  * learner lesson/resource/caption reads of an item under a takedown hold → 451 content_unavailable;
///  * any non-GET studio request by an instructor with an active suspension → 403 instructor_suspended (the role is also
///    removed in the database, so AccessService author checks fail immediately; this covers role-only checks on live tokens);
///  * payout batch creation first sweeps suspended instructors' new earnings into their held batch.
/// Runs after authentication/authorization, so only requests that reach an action pay for the (indexed) lookups.
/// </summary>
public sealed class TrustGuardFilter(AppDbContext db, ICurrentUser me) : IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext ctx, ActionExecutionDelegate next)
    {
        var template = ctx.ActionDescriptor.AttributeRouteInfo?.Template ?? "";
        var method = ctx.HttpContext.Request.Method;

        if (template.StartsWith("api/learn/lessons/{", StringComparison.OrdinalIgnoreCase) && !me.IsStaff)
        {
            if (RouteGuid(ctx, "id", "lessonId") is { } lessonId && await TrustService.IsHeld(db, HoldTarget.Lesson, lessonId))
                throw Unavailable();
        }
        else if ((template.StartsWith("api/learn/resources/{", StringComparison.OrdinalIgnoreCase)
                  || template.StartsWith("api/learn/captions/{", StringComparison.OrdinalIgnoreCase)) && !me.IsStaff)
        {
            if (RouteGuid(ctx, "id") is { } resourceId && await TrustService.IsHeld(db, HoldTarget.Resource, resourceId))
                throw Unavailable();
        }
        else if (template.StartsWith("api/studio/", StringComparison.OrdinalIgnoreCase) && !HttpMethods.IsGet(method) && !HttpMethods.IsHead(method)
                 && me.Id is { } uid && !me.IsStaff && await TrustService.IsSuspendedInstructor(db, uid))
        {
            throw new AppException(403, "Your instructor account is suspended. Studio changes are disabled.", "instructor_suspended");
        }
        else if (template.Equals("api/admin/payout-batches", StringComparison.OrdinalIgnoreCase) && HttpMethods.IsPost(method))
        {
            await TrustService.SweepHeldEarnings(db, ctx.HttpContext.RequestAborted);
        }
        await next();
    }

    private static AppException Unavailable() =>
        new(451, "This content is unavailable while a legal or safety complaint is reviewed.", "content_unavailable");

    private static Guid? RouteGuid(ActionExecutingContext ctx, params string[] names)
    {
        foreach (var n in names)
            if (ctx.RouteData.Values.TryGetValue(n, out var v) && Guid.TryParse(v?.ToString(), out var g)) return g;
        return null;
    }
}

/// <summary>Periodically parks new earnings of suspended instructors in their held payout batch.</summary>
public sealed class HeldEarningsSweeper(IServiceScopeFactory scopes, IConfiguration cfg, ILogger<HeldEarningsSweeper> log) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        var every = TimeSpan.FromMinutes(Math.Max(1, cfg.GetValue("Trust:HeldEarningsSweepMinutes", 10)));
        using var timer = new PeriodicTimer(every);
        // Suspension and payout-batch creation sweep synchronously; this catches sales recorded in between.
        while (await timer.WaitForNextTickAsync(ct).ConfigureAwait(false))
        {
            try
            {
                using var scope = scopes.CreateScope();
                var moved = await TrustService.SweepHeldEarnings(scope.ServiceProvider.GetRequiredService<AppDbContext>(), ct);
                if (moved > 0) log.LogInformation("Held {Count} ledger entries of suspended instructors", moved);
            }
            catch (OperationCanceledException) when (ct.IsCancellationRequested) { break; }
            catch (Exception e) { log.LogError(e, "Held-earnings sweep failed"); }
        }
    }
}
