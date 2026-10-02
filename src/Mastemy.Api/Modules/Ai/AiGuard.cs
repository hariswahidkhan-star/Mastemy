using System.Threading.RateLimiting;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Mastemy.Api.Modules.Ai;

/// <summary>Per-user token bucket (Ai:PerUserPerMinute) shared by every AI feature.</summary>
public sealed class AiRateLimiter : IDisposable
{
    private readonly PartitionedRateLimiter<Guid> limiter;

    public AiRateLimiter(AiOptions opt)
    {
        var perMinute = Math.Max(1, opt.PerUserPerMinute);
        limiter = PartitionedRateLimiter.Create<Guid, Guid>(id => RateLimitPartition.GetTokenBucketLimiter(id, _ => new TokenBucketRateLimiterOptions
        {
            TokenLimit = perMinute, TokensPerPeriod = perMinute, ReplenishmentPeriod = TimeSpan.FromMinutes(1),
            QueueLimit = 0, AutoReplenishment = true,
        }));
    }

    public void Acquire(Guid userId)
    {
        using var lease = limiter.AttemptAcquire(userId);
        if (!lease.IsAcquired) throw new AppException(429, "Too many AI requests; please wait a minute.", "ai_rate_limited");
    }

    public void Dispose() => limiter.Dispose();
}

/// <summary>Budgets (user plan / organization / global, monthly) and usage metering.</summary>
public class AiBudgetService(AppDbContext db, AiOptions opt)
{
    public static string PeriodOf(DateTime utc) => utc.ToString("yyyy-MM", System.Globalization.CultureInfo.InvariantCulture);

    public async Task<(string Plan, long Limit)> PlanFor(Guid userId)
    {
        var now = DateTime.UtcNow;
        if (await db.UserRoles.AnyAsync(r => r.UserId == userId && (r.Role == Roles.Instructor || r.Role == Roles.Admin || r.Role == Roles.SuperAdmin)))
            return ("instructor", opt.InstructorMonthlyTokens);
        // Subscribers: the active plan's explicit AI allowance (largest one if several), converted to tokens.
        var allowance = await (from e in db.Entitlements.AsNoTracking()
                               join se in db.Set<Mastemy.Api.Modules.Commerce.SubscriptionEntitlement>().AsNoTracking() on e.Id equals se.EntitlementId
                               join s in db.Set<Mastemy.Api.Modules.Commerce.Subscription>().AsNoTracking() on se.SubscriptionId equals s.Id
                               join p in db.Set<Mastemy.Api.Modules.Commerce.Plan>().AsNoTracking() on s.PlanId equals p.Id
                               where e.UserId == userId && e.Source == EntitlementSource.Subscription && e.RevokedAt == null
                                     && e.StartsAt <= now && (e.EndsAt == null || e.EndsAt > now)
                                     && s.UserId == userId && (s.Status == "Active" || s.Status == "PastDue")
                               orderby p.AiAllowance descending
                               select new { p.Code, p.AiAllowance }).FirstOrDefaultAsync();
        if (allowance is { AiAllowance: > 0 })
            return ("subscription:" + allowance.Code, (long)allowance.AiAllowance * Math.Max(1, opt.TokensPerAllowanceRequest));
        if (await db.Entitlements.AnyAsync(e => e.UserId == userId && e.RevokedAt == null && e.StartsAt <= now && (e.EndsAt == null || e.EndsAt > now)))
            return ("premium", opt.PremiumUserMonthlyTokens);
        return ("free", opt.UserMonthlyTokens);
    }

    private Task<Guid?> OrgOf(Guid userId) =>
        db.OrganizationMembers.AsNoTracking().Where(m => m.UserId == userId).OrderBy(m => m.JoinedAt).Select(m => (Guid?)m.OrganizationId).FirstOrDefaultAsync();

    private IQueryable<AiUsageRecord> Month() { var p = PeriodOf(DateTime.UtcNow); return db.Set<AiUsageRecord>().AsNoTracking().Where(u => u.Period == p); }

    private static Task<long> Sum(IQueryable<AiUsageRecord> q) =>
        q.SumAsync(u => (long)u.InputTokens + u.OutputTokens + u.CacheReadTokens + u.CacheWriteTokens);

    public async Task<UsageSummaryDto> Summary(Guid userId)
    {
        var (plan, limit) = await PlanFor(userId);
        var used = await Sum(Month().Where(u => u.UserId == userId));
        return new UsageSummaryDto(PeriodOf(DateTime.UtcNow), plan, used, limit, Math.Max(0, limit - used));
    }

    /// <summary>Throws 429 ai_budget_exhausted when the user's, their organization's or the global monthly budget cannot cover the estimate.</summary>
    public async Task RequireBudget(Guid userId, int estimatedTokens)
    {
        var (_, limit) = await PlanFor(userId);
        var month = Month();
        if (await Sum(month.Where(u => u.UserId == userId)) + estimatedTokens > limit)
            throw new AppException(429, "Your monthly AI allowance is used up. It resets at the start of next month.", "ai_budget_exhausted");
        if (await OrgOf(userId) is { } org && await Sum(month.Where(u => u.OrganizationId == org)) + estimatedTokens > opt.OrgMonthlyTokens)
            throw new AppException(429, "Your organization's monthly AI allowance is used up.", "ai_budget_exhausted");
        if (await Sum(month) + estimatedTokens > opt.GlobalMonthlyTokens)
            throw new AppException(429, "AI assistance has reached its monthly platform limit.", "ai_budget_exhausted");
    }

    public decimal Cost(AiUsage u)
    {
        if (!opt.Pricing.TryGetValue(u.Model, out var p) && !opt.Pricing.TryGetValue(opt.Model, out p)) return 0m;
        return (u.InputTokens * p.InputPerMTok + u.OutputTokens * p.OutputPerMTok + u.CacheReadTokens * p.CacheReadPerMTok
                + u.CacheWriteTokens * p.CacheWritePerMTok) / 1_000_000m;
    }

    /// <summary>Adds a usage row (caller saves).</summary>
    public async Task Record(Guid userId, Guid? courseId, string feature, AiUsage u)
    {
        db.Set<AiUsageRecord>().Add(new AiUsageRecord
        {
            UserId = userId, OrganizationId = await OrgOf(userId), CourseId = courseId, Feature = feature, Model = u.Model,
            InputTokens = u.InputTokens, OutputTokens = u.OutputTokens, CacheReadTokens = u.CacheReadTokens, CacheWriteTokens = u.CacheWriteTokens,
            CostEstimate = Cost(u), Period = PeriodOf(DateTime.UtcNow),
        });
    }
}

/// <summary>Secure-exam boundary and assessment-item protection (spec §15/§19).</summary>
public class AiAssessmentGuard(AppDbContext db, IMemoryCache cache, AiOptions opt)
{
    /// <summary>403 exam_in_progress while the user has an unexpired InProgress Exam-mode attempt in the course.</summary>
    public async Task RequireNoExamInProgress(Guid userId, Guid courseId)
    {
        var now = DateTime.UtcNow;
        var busy = await (from a in db.Attempts.AsNoTracking()
                          join s in db.Assessments.AsNoTracking() on a.AssessmentId equals s.Id
                          where a.UserId == userId && a.Status == AttemptStatus.InProgress && s.CourseId == courseId
                                && s.Mode == AssessmentMode.Exam && (a.DeadlineAt == null || a.DeadlineAt > now)
                          select a.Id).AnyAsync();
        if (busy) throw new AppException(403, "AI assistance is unavailable for this course while you have an exam in progress.", "exam_in_progress");
    }

    private record Stem(string Normalized, HashSet<string> Shingles);

    private async Task<List<Stem>> ActiveStems(Guid courseId)
    {
        return (await cache.GetOrCreateAsync("ai-stems:" + courseId, async e =>
        {
            e.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(2);
            var stems = await (from q in db.Questions.AsNoTracking()
                               join v in db.QuestionVersions.AsNoTracking() on new { Q = q.Id, V = q.CurrentVersion } equals new { Q = v.QuestionId, V = v.Version }
                               where q.CourseId == courseId && q.State == QuestionState.Active
                               select v.Stem).ToListAsync();
            return stems.Select(s => AiText.Normalize(s)).Where(s => s.Length >= 12).Distinct()
                .Select(s => new Stem(s, Shingles(s))).ToList();
        }))!;
    }

    private static HashSet<string> Shingles(string normalized)
    {
        var w = normalized.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        var set = new HashSet<string>(StringComparer.Ordinal);
        for (var i = 0; i + 2 < w.Length; i++) set.Add(w[i] + " " + w[i + 1] + " " + w[i + 2]);
        return set;
    }

    /// <summary>True when the text reproduces (verbatim or near-verbatim) the stem of an Active question in the course.</summary>
    public async Task<bool> ContainsAssessmentItem(Guid courseId, string text)
    {
        var norm = AiText.Normalize(text);
        if (norm.Length < 12) return false;
        var msgShingles = Shingles(norm);
        foreach (var s in await ActiveStems(courseId))
        {
            if (norm.Contains(s.Normalized, StringComparison.Ordinal)) return true;
            if (s.Shingles.Count >= 3)
            {
                var hit = s.Shingles.Count(msgShingles.Contains);
                if ((double)hit / s.Shingles.Count >= opt.StemSimilarityThreshold) return true;
            }
        }
        return false;
    }
}
