using Mastemy.Api.Modules.Assessment;

namespace Mastemy.Tests.Assessment;

public class Wave3AlgorithmTests
{
    private static readonly Guid G = Guid.NewGuid();

    private static List<FormCandidate> Pool(out List<Guid> groupOrder)
    {
        var g1 = Guid.NewGuid(); var g2 = Guid.NewGuid(); var g3 = Guid.NewGuid();
        groupOrder = [g1, g2, g3];
        return
        [
            new(Guid.NewGuid(), 0, null, 0),
            new(g3, 1, G, 2), // case group members registered out of order
            new(Guid.NewGuid(), 2, null, 0),
            new(g1, 3, G, 0),
            new(Guid.NewGuid(), 4, null, 0),
            new(g2, 5, G, 1),
        ];
    }

    [Fact]
    public void Case_groups_stay_contiguous_and_ordered_under_shuffle()
    {
        var shuffledPositions = new HashSet<int>();
        for (var run = 0; run < 300; run++)
        {
            var pool = Pool(out var order);
            var form = FormBuilder.Build(pool, shuffle: true, questionCount: 0);
            Assert.Equal(6, form.Count);
            var start = form.IndexOf(order[0]);
            Assert.Equal(order, form.Skip(start).Take(3).ToList());
            shuffledPositions.Add(start);
        }
        Assert.True(shuffledPositions.Count > 1, "the case-group unit itself should move under shuffling");
    }

    [Fact]
    public void Question_count_takes_whole_case_groups_only()
    {
        for (var run = 0; run < 300; run++)
        {
            var pool = Pool(out var order);
            var form = FormBuilder.Build(pool, shuffle: true, questionCount: 4);
            Assert.True(form.Count <= 4);
            var members = form.Where(order.Contains).ToList();
            Assert.True(members.Count is 0 or 3, "a case group is never split");
            if (members.Count == 3) Assert.Equal(order, members);
        }
        // A lone oversized group is still delivered whole rather than producing an empty form.
        var onlyGroup = Pool(out var o).Where(c => c.CaseGroupId is not null).ToList();
        Assert.Equal(o, FormBuilder.Build(onlyGroup, shuffle: true, questionCount: 2));
    }

    [Fact]
    public void Without_shuffle_authored_order_is_kept_with_groups_at_their_first_position()
    {
        var pool = Pool(out var order);
        var form = FormBuilder.Build(pool, shuffle: false, questionCount: 0);
        Assert.Equal(pool[0].QuestionId, form[0]);
        Assert.Equal(order, form.Skip(1).Take(3).ToList());
        Assert.Equal(pool[2].QuestionId, form[4]);
        Assert.Equal(pool[4].QuestionId, form[5]);
    }

    [Fact]
    public void Sm2_schedule_follows_the_algorithm()
    {
        var (r, e, i) = Sm2.Next(0, 2.5m, 0, 4);
        Assert.Equal((1, 2.5m, 1), (r, e, i));
        (r, e, i) = Sm2.Next(r, e, i, 4);
        Assert.Equal((2, 2.5m, 6), (r, e, i));
        (r, e, i) = Sm2.Next(r, e, i, 4);
        Assert.Equal((3, 2.5m, 15), (r, e, i));
        (r, e, i) = Sm2.Next(r, e, i, 1); // lapse resets repetitions and lowers ease
        Assert.Equal(0, r);
        Assert.Equal(1, i);
        Assert.Equal(1.96m, e);
        for (var k = 0; k < 20; k++) (r, e, i) = Sm2.Next(r, e, i, 0);
        Assert.Equal(1.3m, e); // floor
        Assert.Equal(4, Sm2.Quality(1m));
        Assert.Equal(3, Sm2.Quality(0.5m));
        Assert.Equal(1, Sm2.Quality(0m));
    }

    [Fact]
    public void Item_statistics_are_withheld_below_minimum_sample()
    {
        var data = Enumerable.Range(0, 29).Select(k => (k % 2 == 0, k / 29.0)).ToList();
        var s = ItemStatistics.Compute(data);
        Assert.False(s.SufficientData);
        Assert.Equal(29, s.N);
        Assert.Null(s.PValue);
        Assert.Null(s.Discrimination);
    }

    [Fact]
    public void Item_statistics_report_p_value_and_point_biserial_with_intervals()
    {
        // Strong learners (high rest score) answer correctly: discrimination must be high and positive.
        var data = Enumerable.Range(0, 40).Select(k => (Correct: k >= 20, Rest: k / 40.0)).ToList();
        var s = ItemStatistics.Compute(data);
        Assert.True(s.SufficientData);
        Assert.Equal(40, s.N);
        Assert.Equal(0.5, s.PValue);
        Assert.True(s.PValueLow < 0.5 && s.PValueHigh > 0.5);
        Assert.True(s.Discrimination > 0.8);
        Assert.True(s.DiscriminationLow < s.Discrimination && s.DiscriminationHigh > s.Discrimination);
        Assert.True(s.DiscriminationHigh <= 1);

        // Everyone correct: p = 1, discrimination undefined (not fabricated).
        var all = ItemStatistics.Compute(Enumerable.Range(0, 30).Select(k => (true, k / 30.0)).ToList());
        Assert.Equal(1.0, all.PValue);
        Assert.Null(all.Discrimination);
    }
}
