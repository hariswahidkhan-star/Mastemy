using Mastemy.Api.Modules.Analytics;

namespace Mastemy.Tests.Analytics;

/// <summary>The raw report SQL only interpolates trusted fragments; values are always parameters.</summary>
public class AnalyticsSqlSafetyTests
{
    [Theory]
    [InlineData("day'; DROP TABLE users; --")]
    [InlineData("week) UNION SELECT password FROM users --")]
    public void Bucket_expression_never_embeds_the_bucket_string(string hostile)
    {
        var sql = AnalyticsReportService.BucketExpr("u.`CreatedAt`", hostile);
        Assert.Equal("DATE_FORMAT(u.`CreatedAt`, '%Y-%m-%d')", sql);
        Assert.DoesNotContain(hostile, sql);
    }

    [Theory]
    [InlineData("users`; DROP TABLE x; --")]
    [InlineData("a b")]
    [InlineData("")]
    public void Unsafe_identifiers_are_rejected(string name) =>
        Assert.Throws<InvalidOperationException>(() => AnalyticsReportService.SafeIdentifier(name));

    [Fact]
    public void Model_table_names_are_accepted() => Assert.Equal("CommissionLedger", AnalyticsReportService.SafeIdentifier("CommissionLedger"));
}
