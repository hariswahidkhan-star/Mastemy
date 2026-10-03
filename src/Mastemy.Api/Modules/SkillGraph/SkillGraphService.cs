using Mastemy.Api.Data;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.SkillGraph;

public class SkillGraphService(AppDbContext db)
{
    // ---------- Graph structure ----------

    public async Task<SkillGraphDto> GetGraphAsync(int? categoryId)
    {
        var nodesQ = db.Set<SkillNode>().AsNoTracking();
        if (categoryId.HasValue)
            nodesQ = nodesQ.Where(n => n.CategoryId == categoryId.Value);

        var nodes = await nodesQ.OrderBy(n => n.Name)
            .Select(n => new SkillNodeDto(n.Id, n.Code, n.Name, n.Description, n.CategoryCode, n.CategoryId))
            .ToListAsync();

        var nodeIds = nodes.Select(n => n.Id).ToHashSet();

        var edges = await db.Set<SkillEdge>().AsNoTracking()
            .Where(e => nodeIds.Contains(e.FromSkillId) && nodeIds.Contains(e.ToSkillId))
            .Select(e => new SkillEdgeDto(e.Id, e.FromSkillId, e.ToSkillId))
            .ToListAsync();

        return new SkillGraphDto(nodes, edges);
    }

    // ---------- Mastery ----------

    public async Task<SkillMasterySummaryDto> GetUserMasteryAsync(Guid userId, int? categoryId)
    {
        var nodesQ = db.Set<SkillNode>().AsNoTracking();
        if (categoryId.HasValue)
            nodesQ = nodesQ.Where(n => n.CategoryId == categoryId.Value);

        var nodes = await nodesQ.ToListAsync();
        var nodeIds = nodes.Select(n => n.Id).ToHashSet();

        var masteries = await db.Set<SkillMastery>().AsNoTracking()
            .Where(m => m.UserId == userId && nodeIds.Contains(m.SkillId))
            .ToDictionaryAsync(m => m.SkillId);

        var now = DateTime.UtcNow;
        var items = nodes.Select(n =>
        {
            masteries.TryGetValue(n.Id, out var m);
            return new SkillMasteryDto(
                n.Id, n.Code, n.Name,
                m?.MasteryScore ?? 0,
                m?.EvidenceCount ?? 0,
                m?.LastPracticedUtc ?? DateTime.MinValue,
                m?.NextReviewUtc,
                m?.Stability ?? 0,
                m?.Difficulty ?? 0);
        }).ToList();

        var mastered = items.Count(i => i.MasteryScore >= 80);
        var inProgress = items.Count(i => i.MasteryScore >= 40 && i.MasteryScore < 80);
        var weak = items.Count(i => i.MasteryScore > 0 && i.MasteryScore < 40);
        var dueForReview = items.Count(i => i.NextReviewUtc.HasValue && i.NextReviewUtc.Value <= now);

        return new SkillMasterySummaryDto(nodes.Count, mastered, inProgress, weak, dueForReview, items);
    }

    public async Task<SkillMasteryDto> GetSkillMasteryAsync(Guid userId, int skillId)
    {
        var node = await db.Set<SkillNode>().AsNoTracking().FirstOrDefaultAsync(n => n.Id == skillId)
            ?? throw AppException.NotFound("Skill node");

        var m = await db.Set<SkillMastery>().AsNoTracking()
            .FirstOrDefaultAsync(x => x.UserId == userId && x.SkillId == skillId);

        return new SkillMasteryDto(
            node.Id, node.Code, node.Name,
            m?.MasteryScore ?? 0,
            m?.EvidenceCount ?? 0,
            m?.LastPracticedUtc ?? DateTime.MinValue,
            m?.NextReviewUtc,
            m?.Stability ?? 0,
            m?.Difficulty ?? 0);
    }

    // ---------- Record evidence (FSRS) ----------

    public async Task<SkillMasteryDto> RecordEvidenceAsync(Guid userId, int skillId, decimal score, string source)
    {
        var node = await db.Set<SkillNode>().AsNoTracking().FirstOrDefaultAsync(n => n.Id == skillId)
            ?? throw AppException.NotFound("Skill node");

        if (score < 0 || score > 100)
            throw AppException.Bad("Score must be between 0 and 100.");

        var m = await db.Set<SkillMastery>().FirstOrDefaultAsync(x => x.UserId == userId && x.SkillId == skillId);

        if (m == null)
        {
            m = new SkillMastery
            {
                UserId = userId,
                SkillId = skillId,
                MasteryScore = score,
                EvidenceCount = 1,
                LastPracticedUtc = DateTime.UtcNow,
                Stability = 1.0m,
                Difficulty = 5.0m, // mid-range on 1-10 scale
            };
            UpdateFsrs(m, score);
            db.Set<SkillMastery>().Add(m);
        }
        else
        {
            // Weighted running average for mastery score
            m.MasteryScore = (m.MasteryScore * m.EvidenceCount + score) / (m.EvidenceCount + 1);
            m.EvidenceCount++;
            m.LastPracticedUtc = DateTime.UtcNow;
            UpdateFsrs(m, score);
        }

        await db.SaveChangesAsync();

        return new SkillMasteryDto(
            node.Id, node.Code, node.Name,
            m.MasteryScore, m.EvidenceCount,
            m.LastPracticedUtc, m.NextReviewUtc,
            m.Stability, m.Difficulty);
    }

    private static void UpdateFsrs(SkillMastery m, decimal score)
    {
        const decimal desiredRetention = 0.9m;
        var isSuccess = score >= 60; // passing threshold

        if (isSuccess)
        {
            // Update stability after success
            var eFactor = (decimal)Math.Exp(0.1);
            var stabilityPow = (decimal)Math.Pow((double)m.Stability, -0.2);
            var daysSinceReview = m.NextReviewUtc.HasValue
                ? (decimal)(DateTime.UtcNow - m.LastPracticedUtc).TotalDays
                : 1m;
            var expFactor = (decimal)Math.Exp(0.05 * (double)(1m - daysSinceReview));

            var newStability = m.Stability * (1m + eFactor * (11m - m.Difficulty) * stabilityPow * (expFactor - 1m));
            m.Stability = Math.Max(0.1m, Math.Min(newStability, 3650m)); // cap at 10 years

            // Difficulty decreases slightly on success
            m.Difficulty = Math.Max(1m, Math.Min(10m, m.Difficulty - 0.1m));
        }
        else
        {
            // Failure: reduce stability, increase difficulty
            m.Stability = Math.Max(0.1m, m.Stability * 0.5m);
            m.Difficulty = Math.Max(1m, Math.Min(10m, m.Difficulty + 0.2m));
        }

        // Calculate next review interval: interval = stability * (1/retention - 1) * 9
        var interval = m.Stability * (1m / desiredRetention - 1m) * 9m;
        var intervalDays = Math.Max(1, (int)Math.Ceiling((double)interval));
        m.NextReviewUtc = DateTime.UtcNow.AddDays(intervalDays);
    }

    // ---------- Gap finder ----------

    public async Task<List<SkillGapDto>> FindGapsAsync(Guid userId, int targetSkillId)
    {
        var _ = await db.Set<SkillNode>().AsNoTracking().FirstOrDefaultAsync(n => n.Id == targetSkillId)
            ?? throw AppException.NotFound("Target skill node");

        // Load all edges and mastery
        var edges = await db.Set<SkillEdge>().AsNoTracking().ToListAsync();
        var masteries = await db.Set<SkillMastery>().AsNoTracking()
            .Where(m => m.UserId == userId)
            .ToDictionaryAsync(m => m.SkillId, m => m.MasteryScore);
        var nodes = await db.Set<SkillNode>().AsNoTracking().ToDictionaryAsync(n => n.Id);

        // Build adjacency: for each skill, what are its prerequisites?
        var prereqs = new Dictionary<int, List<int>>();
        foreach (var e in edges)
        {
            if (!prereqs.ContainsKey(e.ToSkillId))
                prereqs[e.ToSkillId] = [];
            prereqs[e.ToSkillId].Add(e.FromSkillId);
        }

        // BFS/DFS with visited set to handle cycles
        var gaps = new List<SkillGapDto>();
        var visited = new HashSet<int>();

        void Walk(int skillId, int depth)
        {
            if (!visited.Add(skillId)) return; // cycle protection
            if (!prereqs.TryGetValue(skillId, out var pres)) return;

            foreach (var preId in pres)
            {
                if (!visited.Contains(preId))
                {
                    var score = masteries.GetValueOrDefault(preId, 0);
                    if (score < 80 && nodes.TryGetValue(preId, out var node)) // not mastered
                    {
                        gaps.Add(new SkillGapDto(preId, node.Code, node.Name, score, depth + 1));
                    }
                    Walk(preId, depth + 1);
                }
            }
        }

        Walk(targetSkillId, 0);
        return gaps.OrderByDescending(g => g.Depth).ThenBy(g => g.MasteryScore).ToList();
    }

    // ---------- Recommendations ----------

    public async Task<List<SkillRecommendationDto>> GetRecommendationsAsync(Guid userId)
    {
        var now = DateTime.UtcNow;
        var masteries = await db.Set<SkillMastery>().AsNoTracking()
            .Include(m => m.Skill)
            .Where(m => m.UserId == userId)
            .ToListAsync();

        var recs = new List<SkillRecommendationDto>();

        // Due for review
        foreach (var m in masteries.Where(m => m.NextReviewUtc.HasValue && m.NextReviewUtc.Value <= now && m.Skill != null)
            .OrderBy(m => m.NextReviewUtc).Take(10))
        {
            recs.Add(new SkillRecommendationDto(m.SkillId, m.Skill!.Code, m.Skill.Name,
                "Due for review", m.MasteryScore, m.NextReviewUtc));
        }

        // Weak skills to strengthen
        foreach (var m in masteries.Where(m => m.MasteryScore < 40 && m.Skill != null)
            .OrderBy(m => m.MasteryScore).Take(5))
        {
            if (recs.All(r => r.SkillId != m.SkillId))
                recs.Add(new SkillRecommendationDto(m.SkillId, m.Skill!.Code, m.Skill.Name,
                    "Weak skill", m.MasteryScore, m.NextReviewUtc));
        }

        return recs;
    }

    // ---------- Due reviews ----------

    public async Task<List<SkillMasteryDto>> GetDueReviewsAsync(Guid userId)
    {
        var now = DateTime.UtcNow;
        return await db.Set<SkillMastery>().AsNoTracking()
            .Include(m => m.Skill)
            .Where(m => m.UserId == userId && m.NextReviewUtc != null && m.NextReviewUtc <= now)
            .OrderBy(m => m.NextReviewUtc)
            .Select(m => new SkillMasteryDto(
                m.SkillId, m.Skill!.Code, m.Skill.Name,
                m.MasteryScore, m.EvidenceCount,
                m.LastPracticedUtc, m.NextReviewUtc,
                m.Stability, m.Difficulty))
            .ToListAsync();
    }

    // ---------- Admin CRUD ----------

    public async Task<SkillNodeDto> CreateNode(SkillNodeUpsertRequest req)
    {
        var code = (req.Code ?? "").Trim();
        if (string.IsNullOrWhiteSpace(code) || code.Length > 64)
            throw AppException.Bad("Code is required (max 64 chars).");
        var name = (req.Name ?? "").Trim();
        if (string.IsNullOrWhiteSpace(name) || name.Length > 200)
            throw AppException.Bad("Name is required (max 200 chars).");
        if (await db.Set<SkillNode>().AnyAsync(n => n.Code == code))
            throw AppException.Conflict("Skill node code already exists.", "duplicate_code");

        var node = new SkillNode
        {
            Code = code,
            Name = name,
            Description = req.Description?.Trim(),
            CategoryCode = req.CategoryCode?.Trim(),
            CategoryId = req.CategoryId,
            CreatedUtc = DateTime.UtcNow,
        };
        db.Set<SkillNode>().Add(node);
        await db.SaveChangesAsync();
        return ToDto(node);
    }

    public async Task<SkillNodeDto> UpdateNode(int id, SkillNodeUpsertRequest req)
    {
        var node = await db.Set<SkillNode>().FirstOrDefaultAsync(n => n.Id == id)
            ?? throw AppException.NotFound("Skill node");
        var code = (req.Code ?? "").Trim();
        if (string.IsNullOrWhiteSpace(code) || code.Length > 64)
            throw AppException.Bad("Code is required (max 64 chars).");
        if (code != node.Code && await db.Set<SkillNode>().AnyAsync(n => n.Code == code && n.Id != id))
            throw AppException.Conflict("Skill node code already exists.", "duplicate_code");
        node.Code = code;
        node.Name = (req.Name ?? "").Trim();
        node.Description = req.Description?.Trim();
        node.CategoryCode = req.CategoryCode?.Trim();
        node.CategoryId = req.CategoryId;
        await db.SaveChangesAsync();
        return ToDto(node);
    }

    public async Task<SkillEdgeDto> CreateEdge(SkillEdgeRequest req)
    {
        if (!await db.Set<SkillNode>().AnyAsync(n => n.Id == req.FromSkillId))
            throw AppException.NotFound("From skill node");
        if (!await db.Set<SkillNode>().AnyAsync(n => n.Id == req.ToSkillId))
            throw AppException.NotFound("To skill node");
        if (req.FromSkillId == req.ToSkillId)
            throw AppException.Bad("A skill cannot be its own prerequisite.");
        if (await db.Set<SkillEdge>().AnyAsync(e => e.FromSkillId == req.FromSkillId && e.ToSkillId == req.ToSkillId))
            throw AppException.Conflict("Edge already exists.", "duplicate_edge");

        var edge = new SkillEdge { FromSkillId = req.FromSkillId, ToSkillId = req.ToSkillId };
        db.Set<SkillEdge>().Add(edge);
        await db.SaveChangesAsync();
        return new SkillEdgeDto(edge.Id, edge.FromSkillId, edge.ToSkillId);
    }

    public async Task DeleteEdge(int id)
    {
        var edge = await db.Set<SkillEdge>().FirstOrDefaultAsync(e => e.Id == id)
            ?? throw AppException.NotFound("Skill edge");
        db.Set<SkillEdge>().Remove(edge);
        await db.SaveChangesAsync();
    }

    private static SkillNodeDto ToDto(SkillNode n) =>
        new(n.Id, n.Code, n.Name, n.Description, n.CategoryCode, n.CategoryId);
}
