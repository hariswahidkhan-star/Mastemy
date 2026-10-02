using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Authoring;
using Mastemy.Api.Modules.Catalog;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Mastemy.Api.Modules.Analytics;

// ---------- DTOs ----------
public record BucketPointDto(string Bucket, long Value);
public record CurrencyBucketDto(string Bucket, string Currency, decimal Amount);
public record FunnelStepDto(Guid LessonId, string ModuleTitle, string LessonTitle, int SortIndex, long Started, long Completed);
public record AssessmentStatDto(Guid AssessmentId, string Title, string Kind, long Attempts, long Passed, decimal PassRatePercent, decimal? AverageScorePercent);
public record ConversionDto(long CourseViewVisitors, long Enrollments, long Purchases, decimal? ViewToEnrollPercent, decimal? EnrollToPurchasePercent,
    string Note);
public record LedgerTotalDto(string Currency, string Kind, decimal Gross, decimal InstructorAmount, decimal PlatformAmount, long Entries);
public record RefundRateDto(long PaidOrders, long RefundedOrders, decimal? RefundRatePercent);
public record CourseAnalyticsDto(Guid CourseId, DateTime From, DateTime To, string Bucket, DateTime GeneratedAt,
    List<BucketPointDto> EnrollmentsOverTime, long EnrollmentsInRange, long TotalEnrollments,
    List<BucketPointDto> ActiveLearnersOverTime, long ActiveLearnersInRange,
    List<FunnelStepDto> CompletionFunnel, decimal AverageProgressPercent,
    List<AssessmentStatDto> Assessments, string QuestionStatsUrl, ConversionDto Conversion,
    List<LedgerTotalDto> Revenue, List<LedgerTotalDto> MyEarnings, List<CurrencyBucketDto> RevenueOverTime, RefundRateDto Refunds);
public record QuestionStatDto(Guid QuestionId, string ExternalId, long Answered, long FullCredit, decimal? AveragePoints, decimal? FullCreditPercent);

public record CurrencyTotalDto(string Currency, long Count, decimal Amount);
public record VideoRepairDto(Guid Id, string YouTubeVideoId, string Title, VideoStatus Status, string? Reason, DateTime? LastCheckedAt);
public record OverdueCourseDto(Guid Id, string Code, string Title, DateTime? LastPublishedAt);
public record ReviewQueuesDto(long CoursesInReview, long QuestionsAwaitingReview, long QuestionsAwaitingApproval, long InstructorApplications,
    long RefundRequests, long UploadApprovals);
public record AiFeatureUsageDto(string Feature, long Calls, long InputTokens, long OutputTokens, decimal CostEstimate);
public record AiUsageSummaryDto(long Calls, long DistinctUsers, long InputTokens, long OutputTokens, long CacheReadTokens,
    long CacheWriteTokens, decimal CostEstimate, List<AiFeatureUsageDto> ByFeature);
public record AdminDashboardDto(DateTime From, DateTime To, string Bucket, DateTime GeneratedAt,
    long TotalUsers, long NewSignupsInRange, List<BucketPointDto> SignupsOverTime,
    long ActiveLearnersInRange, List<BucketPointDto> ActiveLearnersOverTime, long PublishedCourses,
    List<CurrencyTotalDto> OrdersByCurrency, List<CurrencyBucketDto> RevenueOverTime, List<CurrencyTotalDto> RefundsByCurrency,
    long PendingRefundRequests, AiUsageSummaryDto AiUsage, long VideosNeedingRepair, List<VideoRepairDto> VideosNeedingRepairSample,
    int ContentReviewMonths, long OverdueContentUpdates, List<OverdueCourseDto> OverdueContentSample, ReviewQueuesDto ReviewQueues);

// Raw SQL row shapes (column aliases match property names).
public class BucketRow { public string Bucket { get; set; } = ""; public long Value { get; set; } }
public class CurrencyBucketRow { public string Bucket { get; set; } = ""; public string Currency { get; set; } = ""; public decimal Amount { get; set; } }

/// <summary>
/// Instructor course analytics and the admin platform dashboard. Aggregates run in MySQL (GROUP BY on a date bucket
/// expression); results are cached for 5 minutes per (report, scope, range, bucket). Authorization is always checked
/// before the cache is consulted.
/// </summary>
public class AnalyticsReportService(AppDbContext db, ICurrentUser me, CourseScopeService scope, CourseSnapshotService snapshots,
    IMemoryCache cache, IConfiguration cfg)
{
    public static readonly TimeSpan CacheTtl = TimeSpan.FromMinutes(5);
    private static readonly OrderStatus[] PaidStatuses = [OrderStatus.Paid, OrderStatus.Refunded, OrderStatus.PartiallyRefunded];
    private static readonly OrderStatus[] RefundedStatuses = [OrderStatus.Refunded, OrderStatus.PartiallyRefunded];

    public static (DateTime From, DateTime To, string Bucket) NormalizeRange(DateTime? from, DateTime? to, string? bucket)
    {
        static DateTime Utc(DateTime d) => d.Kind == DateTimeKind.Unspecified ? DateTime.SpecifyKind(d, DateTimeKind.Utc) : d.ToUniversalTime();
        var t = to is null ? DateTime.UtcNow.Date.AddDays(1) : Utc(to.Value);
        var f = from is null ? t.AddDays(-30) : Utc(from.Value);
        if (f >= t) throw AppException.Bad("from must be before to.");
        if ((t - f).TotalDays > 731) throw AppException.Bad("The range may span at most 2 years.");
        var b = string.IsNullOrWhiteSpace(bucket) ? "day" : bucket.Trim().ToLowerInvariant();
        if (b is not ("day" or "week" or "month")) throw AppException.Bad("bucket must be day, week or month.");
        return (f, t, b);
    }

    /// <summary>MySQL expression mapping a datetime column to its bucket label (weeks start on Monday).</summary>
    public static string BucketExpr(string column, string bucket) => bucket switch
    {
        "week" => $"DATE_FORMAT(DATE_SUB(DATE({column}), INTERVAL WEEKDAY({column}) DAY), '%Y-%m-%d')",
        "month" => $"DATE_FORMAT({column}, '%Y-%m-01')",
        _ => $"DATE_FORMAT({column}, '%Y-%m-%d')",
    };

    private string T<TEntity>() => "`" + db.Model.FindEntityType(typeof(TEntity))!.GetTableName() + "`";

    private Task<List<BucketRow>> Buckets(string sql, params object[] args) => db.Database.SqlQueryRaw<BucketRow>(sql, args).ToListAsync();

    // ---------- Instructor ----------
    public async Task<CourseAnalyticsDto> Course(Guid courseId, DateTime? from, DateTime? to, string? bucket)
    {
        var uid = me.RequireId();
        var course = await db.Courses.AsNoTracking().FirstOrDefaultAsync(c => c.Id == courseId) ?? throw AppException.NotFound("Course");
        await scope.RequireCourseManager(courseId); // revenue and conversion are management data: not for scoped editors
        var (f, t, b) = NormalizeRange(from, to, bucket);
        var key = $"analytics:course:{courseId}:{uid}:{f:O}:{t:O}:{b}";
        if (cache.TryGetValue(key, out CourseAnalyticsDto? hit) && hit is not null) return hit;
        var dto = await ComputeCourse(course, uid, f, t, b);
        cache.Set(key, dto, CacheTtl);
        return dto;
    }

    private async Task<CourseAnalyticsDto> ComputeCourse(Course course, Guid uid, DateTime f, DateTime t, string b)
    {
        var cid = course.Id.ToString();
        var lessonsSql = $"(SELECT sl.`LessonId` FROM {T<Domain.SnapshotLesson>()} sl WHERE sl.`CourseId` = {{0}} " +
                         $"UNION SELECT l.`Id` FROM {T<Lesson>()} l JOIN {T<CourseModule>()} m ON l.`ModuleId` = m.`Id` WHERE m.`CourseId` = {{0}})";

        var enrollOverTime = await Buckets(
            $"SELECT {BucketExpr("e.`CreatedAt`", b)} AS `Bucket`, COUNT(*) AS `Value` FROM {T<Enrollment>()} e " +
            "WHERE e.`CourseId` = {0} AND e.`CreatedAt` >= {1} AND e.`CreatedAt` < {2} GROUP BY `Bucket` ORDER BY `Bucket`", cid, f, t);
        var totalEnroll = await db.Enrollments.LongCountAsync(e => e.CourseId == course.Id);

        var activeOverTime = await Buckets(
            $"SELECT {BucketExpr("p.`UpdatedAt`", b)} AS `Bucket`, COUNT(DISTINCT p.`UserId`) AS `Value` FROM {T<LessonProgress>()} p " +
            $"WHERE p.`LessonId` IN {lessonsSql} AND p.`UpdatedAt` >= {{1}} AND p.`UpdatedAt` < {{2}} GROUP BY `Bucket` ORDER BY `Bucket`", cid, f, t);
        var activeInRange = (await Buckets(
            $"SELECT 'all' AS `Bucket`, COUNT(DISTINCT p.`UserId`) AS `Value` FROM {T<LessonProgress>()} p " +
            $"WHERE p.`LessonId` IN {lessonsSql} AND p.`UpdatedAt` >= {{1}} AND p.`UpdatedAt` < {{2}}", cid, f, t)).Single().Value;

        // Funnel ordered by what learners see (published snapshot; the draft for never-published courses).
        var payload = AccessService.IsLive(course) ? (await snapshots.ForCourse(course)).Payload : await snapshots.BuildFromDraft(course.Id);
        var ordered = payload.OrderedLessons().ToList();
        var lessonIds = ordered.Select(x => x.Lesson.Id).ToList();
        var funnelRows = await db.LessonProgress.AsNoTracking().Where(p => lessonIds.Contains(p.LessonId))
            .GroupBy(p => p.LessonId).Select(g => new { LessonId = g.Key, Started = g.LongCount(), Completed = g.LongCount(p => p.Completed) })
            .ToDictionaryAsync(x => x.LessonId);
        var funnel = ordered.Select((x, i) => new FunnelStepDto(x.Lesson.Id, x.Module.Title, x.Lesson.Title, i + 1,
            funnelRows.TryGetValue(x.Lesson.Id, out var r) ? r.Started : 0, funnelRows.TryGetValue(x.Lesson.Id, out var r2) ? r2.Completed : 0)).ToList();

        var completedByEnrolled = lessonIds.Count == 0 ? 0 : await db.LessonProgress.AsNoTracking()
            .LongCountAsync(p => p.Completed && lessonIds.Contains(p.LessonId) && db.Enrollments.Any(e => e.UserId == p.UserId && e.CourseId == course.Id));
        var avgProgress = totalEnroll == 0 || lessonIds.Count == 0 ? 0m
            : Math.Round(100m * completedByEnrolled / (totalEnroll * (decimal)lessonIds.Count), 2);

        var assess = await (from a in db.Attempts.AsNoTracking()
                            join s in db.Assessments.AsNoTracking() on a.AssessmentId equals s.Id
                            where s.CourseId == course.Id && a.Status == AttemptStatus.Submitted && a.SubmittedAt >= f && a.SubmittedAt < t
                            group a by new { s.Id, s.Title, s.Kind } into g
                            select new { g.Key.Id, g.Key.Title, g.Key.Kind, Attempts = g.LongCount(), Passed = g.LongCount(x => x.Passed == true),
                                Avg = g.Average(x => x.ScorePercent) }).ToListAsync();
        var assessments = assess.OrderBy(x => x.Title, StringComparer.Ordinal).Select(x => new AssessmentStatDto(x.Id, x.Title, x.Kind.ToString(), x.Attempts, x.Passed,
            x.Attempts == 0 ? 0 : Math.Round(100m * x.Passed / x.Attempts, 2), x.Avg is null ? null : Math.Round(x.Avg.Value, 2))).ToList();

        // Conversion: only consented events exist, so view counts cover consenting visitors only.
        var views = await db.Set<AnalyticsEvent>().AsNoTracking()
            .Where(e => e.CourseId == course.Id && e.Type == AnalyticsEventTypes.CourseView && e.OccurredAt >= f && e.OccurredAt < t)
            .Select(e => e.AnonId).Distinct().LongCountAsync();
        var enrollInRange = enrollOverTime.Sum(x => x.Value);
        var paidOrders = db.Orders.AsNoTracking().Where(o => PaidStatuses.Contains(o.Status) && o.PaidAt >= f && o.PaidAt < t
                                                             && db.OrderItems.Any(i => i.OrderId == o.Id && i.CourseId == course.Id));
        var purchases = await paidOrders.LongCountAsync();
        var refunded = await paidOrders.LongCountAsync(o => RefundedStatuses.Contains(o.Status));
        var conversion = new ConversionDto(views, enrollInRange, purchases,
            views == 0 ? null : Math.Round(100m * enrollInRange / views, 2), enrollInRange == 0 ? null : Math.Round(100m * purchases / enrollInRange, 2),
            "Course views come only from visitors who consented to analytics; enrollments and purchases are complete counts.");

        var ledger = db.CommissionLedger.AsNoTracking().Where(l => l.CourseId == course.Id && l.CreatedAt >= f && l.CreatedAt < t);
        var revenue = await LedgerTotals(ledger);
        var mine = await LedgerTotals(ledger.Where(l => l.InstructorId == uid));
        var revenueOverTime = await db.Database.SqlQueryRaw<CurrencyBucketRow>(
            $"SELECT {BucketExpr("l.`CreatedAt`", b)} AS `Bucket`, l.`Currency` AS `Currency`, SUM(l.`GrossAmount`) AS `Amount` " +
            $"FROM {T<CommissionLedgerEntry>()} l WHERE l.`CourseId` = {{0}} AND l.`CreatedAt` >= {{1}} AND l.`CreatedAt` < {{2}} " +
            "GROUP BY `Bucket`, `Currency` ORDER BY `Bucket`, `Currency`", cid, f, t).ToListAsync();

        return new CourseAnalyticsDto(course.Id, f, t, b, DateTime.UtcNow, Points(enrollOverTime), enrollInRange, totalEnroll,
            Points(activeOverTime), activeInRange, funnel, avgProgress, assessments, $"/api/studio/courses/{course.Id}/analytics/questions",
            conversion, revenue, mine, revenueOverTime.Select(r => new CurrencyBucketDto(r.Bucket, r.Currency, r.Amount)).ToList(),
            new RefundRateDto(purchases, refunded, purchases == 0 ? null : Math.Round(100m * refunded / purchases, 2)));
    }

    private static async Task<List<LedgerTotalDto>> LedgerTotals(IQueryable<CommissionLedgerEntry> q) =>
        (await q.GroupBy(l => new { l.Currency, l.Kind })
            .Select(g => new { g.Key.Currency, g.Key.Kind, Gross = g.Sum(x => x.GrossAmount), Ins = g.Sum(x => x.InstructorAmount),
                Plat = g.Sum(x => x.PlatformAmount), N = g.LongCount() }).ToListAsync())
        .OrderBy(x => x.Currency).ThenBy(x => x.Kind).Select(x => new LedgerTotalDto(x.Currency, x.Kind, x.Gross, x.Ins, x.Plat, x.N)).ToList();

    private static List<BucketPointDto> Points(List<BucketRow> rows) => rows.Select(r => new BucketPointDto(r.Bucket, r.Value)).ToList();

    /// <summary>Per-question answer statistics for a course (no option-level correctness is exposed).</summary>
    public async Task<List<QuestionStatDto>> QuestionStats(Guid courseId)
    {
        if (!await db.Courses.AnyAsync(c => c.Id == courseId)) throw AppException.NotFound("Course");
        await scope.RequireContentEditor(courseId);
        var key = $"analytics:questions:{courseId}";
        if (cache.TryGetValue(key, out List<QuestionStatDto>? hit) && hit is not null) return hit;
        var rows = await (from i in db.AttemptItems.AsNoTracking()
                          join a in db.Attempts.AsNoTracking() on i.AttemptId equals a.Id
                          join v in db.QuestionVersions.AsNoTracking() on i.QuestionVersionId equals v.Id
                          join q in db.Questions.AsNoTracking() on v.QuestionId equals q.Id
                          where q.CourseId == courseId && a.Status == AttemptStatus.Submitted && i.SelectedOptionIds != ""
                          group i by new { q.Id, q.ExternalId } into g
                          select new { g.Key.Id, g.Key.ExternalId, Answered = g.LongCount(), Full = g.LongCount(x => x.Points >= 1m),
                              Avg = g.Average(x => x.Points) }).ToListAsync();
        var result = rows.OrderBy(r => r.ExternalId, StringComparer.Ordinal).Select(r => new QuestionStatDto(r.Id, r.ExternalId, r.Answered, r.Full,
            r.Avg is null ? null : Math.Round(r.Avg.Value, 4), r.Answered == 0 ? null : Math.Round(100m * r.Full / r.Answered, 2))).ToList();
        cache.Set(key, result, CacheTtl);
        return result;
    }

    // ---------- Admin ----------
    public async Task<AdminDashboardDto> Admin(DateTime? from, DateTime? to, string? bucket)
    {
        me.RequireId();
        if (!me.IsStaff) throw AppException.Forbidden();
        var (f, t, b) = NormalizeRange(from, to, bucket);
        var key = $"analytics:admin:{f:O}:{t:O}:{b}";
        if (cache.TryGetValue(key, out AdminDashboardDto? hit) && hit is not null) return hit;
        var dto = await ComputeAdmin(f, t, b);
        cache.Set(key, dto, CacheTtl);
        return dto;
    }

    /// <summary>Totals of metered AI provider calls (Ai_Usage) created in [f, t).</summary>
    private async Task<AiUsageSummaryDto> AiUsage(DateTime f, DateTime t)
    {
        var q = db.Set<Ai.AiUsageRecord>().AsNoTracking().Where(u => u.CreatedAt >= f && u.CreatedAt < t);
        var byFeature = (await q.GroupBy(u => u.Feature).Select(g => new
            {
                Feature = g.Key, Calls = g.LongCount(), In = g.Sum(x => (long)x.InputTokens), Out = g.Sum(x => (long)x.OutputTokens),
                CacheR = g.Sum(x => (long)x.CacheReadTokens), CacheW = g.Sum(x => (long)x.CacheWriteTokens), Cost = g.Sum(x => x.CostEstimate),
            }).ToListAsync()).OrderByDescending(x => x.Cost).ThenBy(x => x.Feature, StringComparer.Ordinal).ToList();
        var users = await q.Select(u => u.UserId).Distinct().LongCountAsync();
        return new AiUsageSummaryDto(byFeature.Sum(x => x.Calls), users, byFeature.Sum(x => x.In), byFeature.Sum(x => x.Out),
            byFeature.Sum(x => x.CacheR), byFeature.Sum(x => x.CacheW), byFeature.Sum(x => x.Cost),
            byFeature.Select(x => new AiFeatureUsageDto(x.Feature, x.Calls, x.In, x.Out, x.Cost)).ToList());
    }

    private async Task<AdminDashboardDto> ComputeAdmin(DateTime f, DateTime t, string b)
    {
        var now = DateTime.UtcNow;
        var totalUsers = await db.Users.LongCountAsync();
        var signups = await Buckets($"SELECT {BucketExpr("u.`CreatedAt`", b)} AS `Bucket`, COUNT(*) AS `Value` FROM {T<User>()} u " +
                                    "WHERE u.`CreatedAt` >= {0} AND u.`CreatedAt` < {1} GROUP BY `Bucket` ORDER BY `Bucket`", f, t);
        var active = await Buckets($"SELECT {BucketExpr("p.`UpdatedAt`", b)} AS `Bucket`, COUNT(DISTINCT p.`UserId`) AS `Value` FROM {T<LessonProgress>()} p " +
                                   "WHERE p.`UpdatedAt` >= {0} AND p.`UpdatedAt` < {1} GROUP BY `Bucket` ORDER BY `Bucket`", f, t);
        var activeInRange = await db.LessonProgress.AsNoTracking().Where(p => p.UpdatedAt >= f && p.UpdatedAt < t).Select(p => p.UserId).Distinct().LongCountAsync();
        var published = await db.Courses.AsNoTracking().Where(AccessService.IsLiveExpr).LongCountAsync();

        var orders = (await db.Orders.AsNoTracking().Where(o => PaidStatuses.Contains(o.Status) && o.PaidAt >= f && o.PaidAt < t)
                .GroupBy(o => o.Currency).Select(g => new { Currency = g.Key, N = g.LongCount(), Sum = g.Sum(o => o.Total) }).ToListAsync())
            .OrderBy(x => x.Currency).Select(x => new CurrencyTotalDto(x.Currency, x.N, x.Sum)).ToList();
        var paidList = string.Join(",", PaidStatuses.Select(s => (int)s));
        var revenueOverTime = await db.Database.SqlQueryRaw<CurrencyBucketRow>(
            $"SELECT {BucketExpr("o.`PaidAt`", b)} AS `Bucket`, o.`Currency` AS `Currency`, SUM(o.`Total`) AS `Amount` FROM {T<Order>()} o " +
            $"WHERE o.`Status` IN ({paidList}) AND o.`PaidAt` >= {{0}} AND o.`PaidAt` < {{1}} GROUP BY `Bucket`, `Currency` ORDER BY `Bucket`, `Currency`", f, t).ToListAsync();
        var refunds = (await (from r in db.Refunds.AsNoTracking()
                              join o in db.Orders.AsNoTracking() on r.OrderId equals o.Id
                              where r.Status == "Completed" && (r.DecidedAt ?? r.CreatedAt) >= f && (r.DecidedAt ?? r.CreatedAt) < t
                              group r by o.Currency into g
                              select new { Currency = g.Key, N = g.LongCount(), Sum = g.Sum(x => x.Amount) }).ToListAsync())
            .OrderBy(x => x.Currency).Select(x => new CurrencyTotalDto(x.Currency, x.N, x.Sum)).ToList();
        var pendingRefunds = await db.Refunds.LongCountAsync(r => r.Status == "Requested" || r.Status == "Processing");

        var repairQ = db.VideoAssets.AsNoTracking().Where(v => v.Status == VideoStatus.Restricted || v.Status == VideoStatus.Failed);
        var repairCount = await repairQ.LongCountAsync();
        var repairSample = await repairQ.OrderByDescending(v => v.LastCheckedAt).ThenBy(v => v.Id).Take(50)
            .Select(v => new VideoRepairDto(v.Id, v.YouTubeVideoId, v.Title, v.Status, v.StatusReason, v.LastCheckedAt)).ToListAsync();

        var months = Math.Clamp(cfg.GetValue("Analytics:ContentReviewMonths", 12), 1, 120);
        var cutoff = now.AddMonths(-months);
        var overdueQ = from c in db.Courses.AsNoTracking().Where(AccessService.IsLiveExpr)
                       let last = db.CourseSnapshots.Where(s => s.CourseId == c.Id).Max(s => (DateTime?)s.PublishedAt) ?? c.PublishedAt
                       where last != null && last < cutoff
                       select new { c.Id, c.Code, c.Title, Last = last };
        var overdueCount = await overdueQ.LongCountAsync();
        var overdue = await overdueQ.OrderBy(x => x.Last).Take(50).Select(x => new OverdueCourseDto(x.Id, x.Code, x.Title, x.Last)).ToListAsync();

        var queues = new ReviewQueuesDto(
            await db.Courses.LongCountAsync(c => c.Status == CourseStatus.InReview),
            await db.Questions.LongCountAsync(q => q.State == QuestionState.Draft || q.PendingState == QuestionState.Draft),
            await db.Questions.LongCountAsync(q => q.State == QuestionState.Reviewed || q.PendingState == QuestionState.Reviewed),
            await db.InstructorApplications.LongCountAsync(a => a.Status == ApplicationStatus.Submitted || a.Status == ApplicationStatus.InReview),
            pendingRefunds,
            await db.UploadSessions.LongCountAsync(u => u.Status == UploadSessionStatus.AwaitingApproval));

        return new AdminDashboardDto(f, t, b, now, totalUsers, signups.Sum(x => x.Value), Points(signups), activeInRange, Points(active), published,
            orders, revenueOverTime.Select(r => new CurrencyBucketDto(r.Bucket, r.Currency, r.Amount)).ToList(), refunds, pendingRefunds,
            await AiUsage(f, t),
            repairCount, repairSample, months, overdueCount, overdue, queues);
    }
}
