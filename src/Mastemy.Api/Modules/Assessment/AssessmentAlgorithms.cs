using System.Security.Cryptography;

namespace Mastemy.Api.Modules.Assessment;

/// <summary>A question that may appear on a form.</summary>
public record FormCandidate(Guid QuestionId, int LinkOrder, Guid? CaseGroupId, int CaseGroupOrder);

/// <summary>
/// Builds a form from the active pool. Case-group members are an indivisible unit: always delivered together, contiguous
/// and in their configured order, regardless of question shuffling or the question-count limit. Shuffling permutes units,
/// never the members inside a unit. With a question count, whole units are taken while they fit (a lone oversized first
/// unit is still delivered so a form is never empty).
/// </summary>
public static class FormBuilder
{
    public static List<Guid> Build(IReadOnlyList<FormCandidate> pool, bool shuffle, int questionCount, Func<int, int>? random = null)
    {
        random ??= RandomNumberGenerator.GetInt32;
        var units = pool
            .GroupBy(c => c.CaseGroupId ?? c.QuestionId)
            .Select(g => g.OrderBy(c => c.CaseGroupId is null ? 0 : c.CaseGroupOrder).ThenBy(c => c.LinkOrder).ThenBy(c => c.QuestionId).ToList())
            .OrderBy(u => u.Min(c => c.LinkOrder)).ThenBy(u => u[0].QuestionId)
            .ToList();
        // A random subset is drawn whenever a question count applies; without shuffling the chosen units keep authored order.
        if (shuffle || questionCount > 0)
        {
            for (var i = units.Count - 1; i > 0; i--)
            {
                var j = random(i + 1);
                (units[i], units[j]) = (units[j], units[i]);
            }
        }
        var chosen = new List<List<FormCandidate>>();
        if (questionCount <= 0) chosen = units;
        else
        {
            var total = 0;
            foreach (var u in units)
            {
                if (total + u.Count > questionCount) continue;
                chosen.Add(u);
                total += u.Count;
                if (total == questionCount) break;
            }
            if (chosen.Count == 0 && units.Count > 0) chosen.Add(units.OrderBy(u => u.Count).First());
        }
        if (!shuffle) chosen = chosen.OrderBy(u => u.Min(c => c.LinkOrder)).ThenBy(u => u[0].QuestionId).ToList();
        return chosen.SelectMany(u => u.Select(c => c.QuestionId)).ToList();
    }
}

/// <summary>SM-2 spaced repetition (SuperMemo 2): quality 0-5, ease factor floor 1.3, intervals 1, 6, then interval x EF.</summary>
public static class Sm2
{
    public static int Quality(decimal points) => points >= 1m ? 4 : points > 0m ? 3 : 1;

    public static (int Repetitions, decimal Ease, int IntervalDays) Next(int repetitions, decimal ease, int intervalDays, int quality)
    {
        quality = Math.Clamp(quality, 0, 5);
        var q = 5 - quality;
        var newEase = Math.Max(1.3m, ease + (0.1m - q * (0.08m + q * 0.02m)));
        if (quality < 3) return (0, newEase, 1);
        var interval = repetitions switch
        {
            0 => 1,
            1 => 6,
            _ => (int)Math.Max(1, Math.Round(intervalDays * newEase, MidpointRounding.AwayFromZero)),
        };
        return (repetitions + 1, newEase, Math.Min(interval, 3650));
    }
}

public record ItemStat(int N, double? PValue, double? PValueLow, double? PValueHigh, double? Discrimination, double? DiscriminationLow,
    double? DiscriminationHigh, bool SufficientData);

/// <summary>
/// Classical item statistics. Difficulty (p-value) = proportion of fully correct responses with a Wilson 95% interval.
/// Discrimination = corrected point-biserial correlation between item correctness and the rest-of-test score (total minus
/// this item, as a proportion), with a Fisher-z 95% interval. Nothing is reported below <see cref="MinN"/> responses.
/// </summary>
public static class ItemStatistics
{
    public const int MinN = 30;
    private const double Z = 1.959963984540054;

    /// <param name="responses">(item correct, rest-of-test proportion) per scored response.</param>
    public static ItemStat Compute(IReadOnlyList<(bool Correct, double RestScore)> responses)
    {
        var n = responses.Count;
        if (n < MinN) return new ItemStat(n, null, null, null, null, null, null, false);
        var k = responses.Count(r => r.Correct);
        var p = (double)k / n;
        var denom = 1 + Z * Z / n;
        var centre = (p + Z * Z / (2 * n)) / denom;
        var half = Z * Math.Sqrt(p * (1 - p) / n + Z * Z / (4.0 * n * n)) / denom;
        double? r = null, lo = null, hi = null;
        var mean = responses.Average(x => x.RestScore);
        var sd = Math.Sqrt(responses.Sum(x => (x.RestScore - mean) * (x.RestScore - mean)) / n);
        if (k > 0 && k < n && sd > 1e-12)
        {
            var m1 = responses.Where(x => x.Correct).Average(x => x.RestScore);
            var m0 = responses.Where(x => !x.Correct).Average(x => x.RestScore);
            var rpb = Math.Clamp((m1 - m0) / sd * Math.Sqrt(p * (1 - p)), -0.9999, 0.9999);
            var z = Math.Atanh(rpb);
            var se = 1 / Math.Sqrt(n - 3);
            r = Math.Round(rpb, 4); lo = Math.Round(Math.Tanh(z - Z * se), 4); hi = Math.Round(Math.Tanh(z + Z * se), 4);
        }
        return new ItemStat(n, Math.Round(p, 4), Math.Round(Math.Max(0, centre - half), 4), Math.Round(Math.Min(1, centre + half), 4), r, lo, hi, true);
    }
}
