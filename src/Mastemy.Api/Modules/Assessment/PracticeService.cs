using System.Security.Cryptography;
using System.Text.Json;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Questions;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Assessment;

public record PracticeSessionInput(List<Guid>? CourseIds, List<string>? Topics, List<string>? Skills, List<Difficulty>? Difficulties,
    List<string>? Objectives, bool UnseenOnly = false, bool PreviousMistakes = false, bool BookmarkedOnly = false, bool DueForReview = false,
    int? Count = null);

public record PracticeItemView(Guid ItemId, int SortOrder, Guid CourseId, QuestionType Type, string Stem, List<LearnerOptionDto> Options,
    List<Guid> SelectedOptionIds, bool Checked, Guid? CaseGroupId, string? CaseTitle, string? CaseExhibitMarkdown);

public record PracticeSessionView(Guid Id, DateTime CreatedAt, DateTime? FinishedAt, MultiSelectScoring ScoringPolicy, List<PracticeItemView> Items);

public record PracticeSessionSummary(Guid Id, DateTime CreatedAt, DateTime? FinishedAt, int Items, int Answered);

public record PracticeResult(Guid SessionId, int Total, int Answered, int Correct, decimal PointsEarned, List<ReviewItemDto> Review,
    bool ReadinessIsEstimate, string ReadinessDisclaimer);

public record PracticeAnswerInput(List<Guid>? SelectedOptionIds);

public record BookmarkDto(Guid QuestionId, Guid CourseId, string Stem, DateTime CreatedAt);

public record DueReviewDto(Guid QuestionId, Guid CourseId, DateTime DueAt, int IntervalDays, int Repetitions, decimal EaseFactor);

/// <summary>Updates the SM-2 review card of (learner, question) from a scored answer. Caller saves.</summary>
public static class ReviewScheduler
{
    public static async Task Record(AppDbContext db, Guid userId, Guid questionId, decimal points)
    {
        var set = db.Set<ReviewCard>();
        var card = set.Local.FirstOrDefault(c => c.UserId == userId && c.QuestionId == questionId)
                   ?? await set.FirstOrDefaultAsync(c => c.UserId == userId && c.QuestionId == questionId);
        if (card is null) { card = new ReviewCard { UserId = userId, QuestionId = questionId }; set.Add(card); }
        var quality = Sm2.Quality(points);
        var (reps, ease, interval) = Sm2.Next(card.Repetitions, card.EaseFactor, card.IntervalDays, quality);
        var now = DateTime.UtcNow;
        card.Repetitions = reps; card.EaseFactor = ease; card.IntervalDays = interval;
        card.LastQuality = quality; card.LastReviewedAt = now; card.DueAt = now.AddDays(interval);
    }
}

/// <summary>
/// Custom practice (spec §15): sessions drawn from Active questions of courses the learner can access, filtered by topic,
/// skill, difficulty, objective, unseen, previous mistakes, bookmarks or spaced-review due date. Questions are eligible
/// only through published, non-certificate assessments; premium banks need an active entitlement (re-checked on every
/// answer). Practice reveals rationales on check and never counts toward certificates. Answer keys never appear before
/// a check.
/// </summary>
public class PracticeService(AppDbContext db, ICurrentUser me, AccessService access, Catalog.CourseSnapshotService snapshots,
    QuestionChallengeService challenges)
{
    public const int MaxCount = 100, DefaultCount = 20, MaxCourses = 25;
    private static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web);

    private record Eligible(Guid QuestionId, Guid CourseId, bool RequiresPremium);

    public async Task<PracticeSessionView> Create(PracticeSessionInput input)
    {
        var uid = me.RequireId();
        if (input is null) throw AppException.Bad("Request body is required.");
        var count = input.Count ?? DefaultCount;
        if (count is < 1 or > MaxCount) throw AppException.Bad($"count must be between 1 and {MaxCount}.");
        if ((input.Difficulties ?? []).Any(d => !Enum.IsDefined(d))) throw AppException.Bad("difficulties contains an invalid value.");
        var courseIds = (input.CourseIds ?? []).Distinct().ToList();
        if (courseIds.Count > MaxCourses) throw AppException.Bad($"At most {MaxCourses} courses per session.");
        if (courseIds.Count == 0)
        {
            var now = DateTime.UtcNow;
            courseIds = await db.Enrollments.Where(e => e.UserId == uid).Select(e => e.CourseId)
                .Union(db.Entitlements.Where(e => e.UserId == uid && e.RevokedAt == null && e.StartsAt <= now && (e.EndsAt == null || e.EndsAt > now)).Select(e => e.CourseId))
                .Distinct().Take(MaxCourses).ToListAsync();
            if (courseIds.Count == 0) throw AppException.Conflict("Enrol in a course (or choose courses) to practise.", "no_courses");
        }

        var pool = await EligibleQuestions(uid, courseIds);
        var qids = pool.Keys.ToList();
        var questions = await db.Questions.AsNoTracking().Where(q => qids.Contains(q.Id)).ToDictionaryAsync(q => q.Id);
        var versions = (await db.QuestionVersions.AsNoTracking().Where(v => qids.Contains(v.QuestionId)).ToListAsync())
            .Where(v => questions.TryGetValue(v.QuestionId, out var q) && q.CurrentVersion == v.Version).ToDictionary(v => v.QuestionId);

        var topics = Norm(input.Topics); var skills = Norm(input.Skills); var objectives = Norm(input.Objectives);
        var difficulties = (input.Difficulties ?? []).ToHashSet();
        IEnumerable<QuestionVersion> filtered = versions.Values;
        if (topics.Count > 0) filtered = filtered.Where(v => QuestionRules.SplitTags(v.Tags).Any(t => topics.Contains(t)));
        if (skills.Count > 0) filtered = filtered.Where(v => skills.Contains(v.SkillCode));
        if (objectives.Count > 0) filtered = filtered.Where(v => objectives.Contains(v.CertificationObjective));
        if (difficulties.Count > 0) filtered = filtered.Where(v => difficulties.Contains(v.Difficulty));
        if (input.UnseenOnly)
        {
            var seen = await SeenQuestions(uid);
            filtered = filtered.Where(v => !seen.Contains(v.QuestionId));
        }
        if (input.PreviousMistakes)
        {
            var mistakes = await Mistakes(uid);
            filtered = filtered.Where(v => mistakes.Contains(v.QuestionId));
        }
        if (input.BookmarkedOnly)
        {
            var marks = (await db.Set<QuestionBookmark>().AsNoTracking().Where(b => b.UserId == uid).Select(b => b.QuestionId).ToListAsync()).ToHashSet();
            filtered = filtered.Where(v => marks.Contains(v.QuestionId));
        }
        if (input.DueForReview)
        {
            var now = DateTime.UtcNow;
            var due = (await db.Set<ReviewCard>().AsNoTracking().Where(c => c.UserId == uid && c.DueAt <= now).Select(c => c.QuestionId).ToListAsync()).ToHashSet();
            filtered = filtered.Where(v => due.Contains(v.QuestionId));
        }
        var picked = filtered.OrderBy(_ => RandomNumberGenerator.GetInt32(int.MaxValue)).Take(count).ToList();
        if (picked.Count == 0) throw AppException.Conflict("No questions match these filters.", "no_matching_questions");

        var pickedIds = picked.Select(v => v.Id).ToList();
        var withOptions = await db.QuestionVersions.AsNoTracking().Include(v => v.Options).Where(v => pickedIds.Contains(v.Id)).ToDictionaryAsync(v => v.Id);
        var session = new PracticeSession
        {
            UserId = uid,
            FiltersJson = JsonSerializer.Serialize(input with { CourseIds = courseIds, Count = count }, Json),
        };
        var order = 0;
        foreach (var v in picked)
        {
            var full = withOptions[v.Id];
            var opts = full.Options.OrderBy(o => o.SortOrder).ToList();
            if (full.AllowShuffle) opts = opts.OrderBy(_ => RandomNumberGenerator.GetInt32(int.MaxValue)).ToList();
            var e = pool[v.QuestionId];
            session.Items.Add(new PracticeItem
            {
                SessionId = session.Id, QuestionVersionId = v.Id, QuestionId = v.QuestionId, CourseId = e.CourseId, RequiresPremium = e.RequiresPremium,
                SortOrder = order++, OptionOrder = string.Join(',', opts.Select(o => o.Id)),
            });
        }
        db.Set<PracticeSession>().Add(session);
        await db.SaveChangesAsync();
        return await View(session);
    }

    private static HashSet<string> Norm(List<string>? xs) =>
        (xs ?? []).Select(x => x?.Trim() ?? "").Where(x => x.Length > 0).ToHashSet(StringComparer.OrdinalIgnoreCase);

    /// <summary>Active questions reachable through published, non-certificate assessments the learner may take.</summary>
    private async Task<Dictionary<Guid, Eligible>> EligibleQuestions(Guid uid, List<Guid> courseIds)
    {
        var result = new Dictionary<Guid, Eligible>();
        foreach (var cid in courseIds)
        {
            var published = await snapshots.TryLiveById(cid);
            if (published is null) continue;
            var premium = await access.HasPremiumAccess(cid, uid);
            var allowed = (published.Payload.Assessments ?? []).Where(a => !a.CountsTowardCertificate && (!a.IsPremium || premium)).ToList();
            if (allowed.Count == 0) continue;
            var freeIds = allowed.Where(a => !a.IsPremium).Select(a => a.Id).ToList();
            var allIds = allowed.Select(a => a.Id).ToList();
            var links = await db.AssessmentQuestions.AsNoTracking().Where(l => allIds.Contains(l.AssessmentId))
                .Join(db.Questions.Where(q => q.State == QuestionState.Active && q.CourseId == cid), l => l.QuestionId, q => q.Id, (l, q) => new { l.AssessmentId, l.QuestionId })
                .ToListAsync();
            foreach (var g in links.GroupBy(l => l.QuestionId))
                result[g.Key] = new Eligible(g.Key, cid, !g.Any(x => freeIds.Contains(x.AssessmentId)));
        }
        return result;
    }

    private async Task<HashSet<Guid>> SeenQuestions(Guid uid)
    {
        var fromAttempts = await (from it in db.AttemptItems
                                  join at in db.Attempts on it.AttemptId equals at.Id
                                  join v in db.QuestionVersions on it.QuestionVersionId equals v.Id
                                  where at.UserId == uid
                                  select v.QuestionId).Distinct().ToListAsync();
        var fromPractice = await (from it in db.Set<PracticeItem>()
                                  join s in db.Set<PracticeSession>() on it.SessionId equals s.Id
                                  where s.UserId == uid
                                  select it.QuestionId).Distinct().ToListAsync();
        return fromAttempts.Concat(fromPractice).ToHashSet();
    }

    /// <summary>Questions whose most recent scored answer by the learner was not fully correct.</summary>
    private async Task<HashSet<Guid>> Mistakes(Guid uid)
    {
        var fromAttempts = await (from it in db.AttemptItems
                                  join at in db.Attempts on it.AttemptId equals at.Id
                                  join v in db.QuestionVersions on it.QuestionVersionId equals v.Id
                                  where at.UserId == uid && it.Points != null && it.SelectedOptionIds != ""
                                  select new { v.QuestionId, Points = it.Points!.Value, When = it.CheckedAt ?? at.SubmittedAt ?? at.StartedAt }).ToListAsync();
        var fromPractice = await (from it in db.Set<PracticeItem>()
                                  join s in db.Set<PracticeSession>() on it.SessionId equals s.Id
                                  where s.UserId == uid && it.Points != null && it.SelectedOptionIds != ""
                                  select new { it.QuestionId, Points = it.Points!.Value, When = it.CheckedAt ?? s.FinishedAt ?? s.CreatedAt }).ToListAsync();
        return fromAttempts.Concat(fromPractice).GroupBy(x => x.QuestionId)
            .Where(g => g.OrderByDescending(x => x.When).First().Points < 1m).Select(g => g.Key).ToHashSet();
    }

    public async Task<PracticeSessionView> Get(Guid id)
    {
        var uid = me.RequireId();
        var s = await db.Set<PracticeSession>().AsNoTracking().Include(x => x.Items).FirstOrDefaultAsync(x => x.Id == id && x.UserId == uid)
                ?? throw AppException.NotFound("Practice session");
        return await View(s);
    }

    public async Task<List<PracticeSessionSummary>> Mine()
    {
        var uid = me.RequireId();
        return await db.Set<PracticeSession>().AsNoTracking().Where(s => s.UserId == uid).OrderByDescending(s => s.CreatedAt).Take(50)
            .Select(s => new PracticeSessionSummary(s.Id, s.CreatedAt, s.FinishedAt, s.Items.Count, s.Items.Count(i => i.SelectedOptionIds != "")))
            .ToListAsync();
    }

    public async Task<PracticeItemView> Answer(Guid id, Guid itemId, PracticeAnswerInput input)
    {
        if (input is null) throw AppException.Bad("Request body is required.");
        PracticeItemView? view = null;
        await Locked(id, async s =>
        {
            if (s.FinishedAt is not null) throw AppException.Conflict("This practice session is finished.", "session_finished");
            var item = s.Items.FirstOrDefault(i => i.Id == itemId) ?? throw AppException.NotFound("Practice item");
            await RequirePremium(item);
            if (item.CheckedAt is not null) throw AppException.Conflict("This answer was checked and is now locked.", "item_locked");
            var v = await db.QuestionVersions.AsNoTracking().Include(x => x.Options).FirstAsync(x => x.Id == item.QuestionVersionId);
            var allowed = Ids(item.OptionOrder);
            var selected = (input.SelectedOptionIds ?? []).Distinct().ToList();
            if (selected.Any(x => !allowed.Contains(x))) throw AppException.Bad("selectedOptionIds contains an option that is not part of this item.");
            if (v.Type == QuestionType.SingleChoice && selected.Count > 1) throw AppException.Bad("Single-choice items accept at most one option.");
            item.SelectedOptionIds = string.Join(',', allowed.Where(selected.Contains));
            view = ItemView(item, v, null);
        });
        return view!;
    }

    public async Task<CheckResult> Check(Guid id, Guid itemId)
    {
        CheckResult? result = null;
        await Locked(id, async s =>
        {
            if (s.FinishedAt is not null) throw AppException.Conflict("This practice session is finished.", "session_finished");
            var item = s.Items.FirstOrDefault(i => i.Id == itemId) ?? throw AppException.NotFound("Practice item");
            await RequirePremium(item);
            var v = await db.QuestionVersions.AsNoTracking().Include(x => x.Options).FirstAsync(x => x.Id == item.QuestionVersionId);
            var opts = Ids(item.OptionOrder).Select(oid => v.Options.First(o => o.Id == oid)).ToList();
            var correct = opts.Where(o => o.IsCorrect).Select(o => o.Id).ToList();
            var selected = Ids(item.SelectedOptionIds);
            var points = Scoring.Item(v.Type, correct, selected, s.ScoringPolicy);
            if (item.CheckedAt is null)
            {
                item.CheckedAt = DateTime.UtcNow;
                item.Points = points;
                if (selected.Count > 0) await ReviewScheduler.Record(db, s.UserId, item.QuestionId, points);
            }
            result = new CheckResult(item.Id, points == 1m, correct, opts.Select(o => new RationaleDto(o.Id, o.Rationale)).ToList(), v.Explanation);
        });
        return result!;
    }

    public async Task<PracticeResult> Finish(Guid id)
    {
        PracticeSession? session = null;
        await Locked(id, async s =>
        {
            session = s;
            if (s.FinishedAt is not null) return; // idempotent
            var versions = await Versions(s);
            foreach (var item in s.Items.Where(i => i.CheckedAt is null))
            {
                var v = versions[item.QuestionVersionId];
                var selected = Ids(item.SelectedOptionIds);
                item.Points = Scoring.Item(v.Type, v.Options.Where(o => o.IsCorrect).Select(o => o.Id).ToList(), selected, s.ScoringPolicy);
                if (selected.Count > 0) await ReviewScheduler.Record(db, s.UserId, item.QuestionId, item.Points.Value);
            }
            s.FinishedAt = DateTime.UtcNow;
        });
        var vs = await Versions(session!);
        var review = new List<ReviewItemDto>();
        // Answer keys of premium items are only revealed while premium access is still active (refund/expiry hides them;
        // the score is still returned).
        var premiumOk = new Dictionary<Guid, bool>();
        foreach (var cid in session!.Items.Where(i => i.RequiresPremium).Select(i => i.CourseId).Distinct())
            premiumOk[cid] = await access.HasPremiumAccess(cid);
        foreach (var item in session!.Items.OrderBy(i => i.SortOrder))
        {
            var v = vs[item.QuestionVersionId];
            var selected = Ids(item.SelectedOptionIds);
            var opts = Ids(item.OptionOrder).Select(oid => v.Options.First(o => o.Id == oid)).ToList();
            if (item.RequiresPremium && !premiumOk[item.CourseId])
            {
                // Per-item points/correctness would reveal the key too; only the aggregate score is returned.
                review.Add(new ReviewItemDto(item.Id, item.SortOrder, v.Type, v.Stem, "", 0, false, selected, [],
                    opts.Select(o => new ReviewOptionDto(o.Id, o.Text, false, selected.Contains(o.Id), "")).ToList()));
                continue;
            }
            review.Add(new ReviewItemDto(item.Id, item.SortOrder, v.Type, v.Stem, v.Explanation, item.Points ?? 0, item.Points == 1m, selected,
                opts.Where(o => o.IsCorrect).Select(o => o.Id).ToList(),
                opts.Select(o => new ReviewOptionDto(o.Id, o.Text, o.IsCorrect, selected.Contains(o.Id), o.Rationale)).ToList()));
        }
        return new PracticeResult(session.Id, session.Items.Count, session.Items.Count(i => i.SelectedOptionIds != ""), session.Items.Count(i => i.Points == 1m),
            session.Items.Sum(i => i.Points ?? 0), review, true, Scoring.ReadinessDisclaimer);
    }

    public async Task<MyChallengeDto> Challenge(Guid id, Guid itemId, ChallengeInput input)
    {
        var uid = me.RequireId();
        var item = await db.Set<PracticeItem>().AsNoTracking()
            .Join(db.Set<PracticeSession>(), i => i.SessionId, s => s.Id, (i, s) => new { i, s })
            .Where(x => x.s.Id == id && x.s.UserId == uid && x.i.Id == itemId).Select(x => x.i).FirstOrDefaultAsync()
            ?? throw AppException.NotFound("Practice item");
        return await challenges.Open(item.QuestionVersionId, input?.Reason);
    }

    // ---------------- Bookmarks and spaced review ----------------

    /// <summary>Bookmarks are limited to questions the learner was actually shown (no enumeration of banks).</summary>
    public async Task Bookmark(Guid questionId)
    {
        var uid = me.RequireId();
        if (!(await SeenQuestions(uid)).Contains(questionId)) throw AppException.NotFound("Question");
        if (await db.Set<QuestionBookmark>().AnyAsync(b => b.UserId == uid && b.QuestionId == questionId)) return;
        db.Set<QuestionBookmark>().Add(new QuestionBookmark { UserId = uid, QuestionId = questionId });
        try { await db.SaveChangesAsync(); }
        catch (DbUpdateException) { /* concurrent duplicate: already bookmarked */ }
    }

    public async Task Unbookmark(Guid questionId)
    {
        var uid = me.RequireId();
        await db.Set<QuestionBookmark>().Where(b => b.UserId == uid && b.QuestionId == questionId).ExecuteDeleteAsync();
    }

    public async Task<List<BookmarkDto>> Bookmarks()
    {
        var uid = me.RequireId();
        return await (from b in db.Set<QuestionBookmark>().AsNoTracking()
                      join q in db.Questions on b.QuestionId equals q.Id
                      join v in db.QuestionVersions on new { Q = q.Id, V = q.CurrentVersion } equals new { Q = v.QuestionId, V = v.Version }
                      where b.UserId == uid && q.State == QuestionState.Active
                      orderby b.CreatedAt descending
                      select new BookmarkDto(q.Id, q.CourseId, v.Stem, b.CreatedAt)).Take(500).ToListAsync();
    }

    public async Task<List<DueReviewDto>> Due(int limit)
    {
        var uid = me.RequireId();
        limit = Math.Clamp(limit, 1, 200);
        var now = DateTime.UtcNow;
        return await (from c in db.Set<ReviewCard>().AsNoTracking()
                      join q in db.Questions on c.QuestionId equals q.Id
                      where c.UserId == uid && c.DueAt <= now && q.State == QuestionState.Active
                      orderby c.DueAt
                      select new DueReviewDto(c.QuestionId, q.CourseId, c.DueAt, c.IntervalDays, c.Repetitions, c.EaseFactor)).Take(limit).ToListAsync();
    }

    // ---------------- Internals ----------------

    private async Task RequirePremium(PracticeItem item)
    {
        if (item.RequiresPremium && !await access.HasPremiumAccess(item.CourseId))
            throw new AppException(403, "Premium access for this practice question is no longer active.", "premium_required");
    }

    private async Task Locked(Guid id, Func<PracticeSession, Task> action)
    {
        var uid = me.RequireId();
        db.ChangeTracker.Clear();
        await using var tx = await db.Database.BeginTransactionAsync();
        await db.Database.ExecuteSqlInterpolatedAsync($"SELECT `Id` FROM `Assessment_PracticeSessions` WHERE `Id` = {id.ToString()} FOR UPDATE");
        var s = await db.Set<PracticeSession>().Include(x => x.Items).FirstOrDefaultAsync(x => x.Id == id);
        if (s is null || s.UserId != uid) throw AppException.NotFound("Practice session");
        await action(s);
        await db.SaveChangesAsync();
        await tx.CommitAsync();
    }

    private async Task<Dictionary<Guid, QuestionVersion>> Versions(PracticeSession s)
    {
        var ids = s.Items.Select(i => i.QuestionVersionId).Distinct().ToList();
        return await db.QuestionVersions.AsNoTracking().Include(v => v.Options).Where(v => ids.Contains(v.Id)).ToDictionaryAsync(v => v.Id);
    }

    private async Task<PracticeSessionView> View(PracticeSession s)
    {
        var versions = await Versions(s);
        var qids = s.Items.Select(i => i.QuestionId).ToList();
        var groupOf = await db.Set<QuestionMeta>().AsNoTracking().Where(m => qids.Contains(m.QuestionId) && m.CaseGroupId != null)
            .ToDictionaryAsync(m => m.QuestionId, m => m.CaseGroupId!.Value);
        var gids = groupOf.Values.Distinct().ToList();
        var groups = await db.Set<CaseGroup>().AsNoTracking().Where(g => gids.Contains(g.Id)).ToDictionaryAsync(g => g.Id);
        var items = s.Items.OrderBy(i => i.SortOrder)
            .Select(i => ItemView(i, versions[i.QuestionVersionId], groupOf.TryGetValue(i.QuestionId, out var g) ? groups.GetValueOrDefault(g) : null)).ToList();
        return new PracticeSessionView(s.Id, s.CreatedAt, s.FinishedAt, s.ScoringPolicy, items);
    }

    private static PracticeItemView ItemView(PracticeItem i, QuestionVersion v, CaseGroup? g) => new(i.Id, i.SortOrder, i.CourseId, v.Type, v.Stem,
        Ids(i.OptionOrder).Select(id => v.Options.First(o => o.Id == id)).Select(o => new LearnerOptionDto(o.Id, o.Text)).ToList(),
        Ids(i.SelectedOptionIds), i.CheckedAt is not null, g?.Id, g?.Title, g?.ExhibitMarkdown);

    private static List<Guid> Ids(string csv) =>
        string.IsNullOrEmpty(csv) ? [] : csv.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(Guid.Parse).ToList();
}
