using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Ai;
using Mastemy.Api.Modules.Commerce;
using static Mastemy.Tests.Ai.AiFixture;

namespace Mastemy.Tests.Ai;

public class AiSubscriptionBudgetTests(AiFixture fx) : IClassFixture<AiFixture>
{
    private async Task Subscribe(Guid userId, Guid courseId, int allowance, string status)
    {
        var plan = new Plan { Code = "P" + Guid.NewGuid().ToString("N")[..8], Name = "Plan", Price = 10m, Currency = "USD", AiAllowance = allowance };
        var sub = new Subscription { UserId = userId, PlanId = plan.Id, Status = status, IdempotencyKey = Guid.NewGuid().ToString("N") };
        var ent = new Entitlement { UserId = userId, CourseId = courseId, Source = EntitlementSource.Subscription, StartsAt = DateTime.UtcNow.AddDays(-1) };
        await fx.WithDb(async db =>
        {
            db.Set<Plan>().Add(plan); db.Set<Subscription>().Add(sub); db.Entitlements.Add(ent);
            db.Set<SubscriptionEntitlement>().Add(new SubscriptionEntitlement { EntitlementId = ent.Id, SubscriptionId = sub.Id });
            await db.SaveChangesAsync();
        });
    }

    [Fact]
    public async Task Active_subscription_uses_plan_ai_allowance_and_ended_one_falls_back_to_tiers()
    {
        var course = await fx.PublishedCourse();
        var (subscriberId, subscriber) = await fx.User(Roles.Student);
        await Subscribe(subscriberId, course.CourseId, 25, "Active");
        var me = await Read<UsageSummaryDto>(await subscriber.GetAsync("/api/ai/usage/me"));
        Assert.StartsWith("subscription:", me.Plan);
        Assert.Equal(25L * 8_000, me.LimitTokens);

        // A canceled subscription no longer grants the plan allowance; the still-valid entitlement keeps the premium tier.
        var (otherId, other) = await fx.User(Roles.Student);
        await Subscribe(otherId, course.CourseId, 25, "Canceled");
        Assert.Equal("premium", (await Read<UsageSummaryDto>(await other.GetAsync("/api/ai/usage/me"))).Plan);

        // Zero allowance never means unlimited: fall back to the regular tier.
        var (zeroId, zero) = await fx.User(Roles.Student);
        await Subscribe(zeroId, course.CourseId, 0, "Active");
        Assert.Equal("premium", (await Read<UsageSummaryDto>(await zero.GetAsync("/api/ai/usage/me"))).Plan);
    }
}
