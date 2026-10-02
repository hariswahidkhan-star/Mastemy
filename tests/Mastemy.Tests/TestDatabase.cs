using MySql.Data.MySqlClient;

namespace Mastemy.Tests;

/// <summary>
/// Fixture teardown that is safe with the API's hosted background workers.
/// Hosts are stopped first (so no worker is mid-query or mid-connect against a database that is
/// about to disappear), then the per-fixture database is dropped over a plain connection that does
/// not depend on any (already disposed) host service provider. Every step runs even if an earlier one
/// fails; failures are rethrown together rather than swallowed.
/// </summary>
public static class TestDatabase
{
    public static async Task DisposeHostsThenDropAsync(string connectionString, params IAsyncDisposable?[] hosts)
    {
        var errors = new List<Exception>();
        foreach (var h in hosts)
        {
            if (h is null) continue;
            try { await h.DisposeAsync(); }
            catch (Exception e) { errors.Add(e); }
        }
        try { await DropAsync(connectionString); }
        catch (Exception e) { errors.Add(e); }
        if (errors.Count == 1) throw errors[0];
        if (errors.Count > 1) throw new AggregateException("Fixture teardown failed", errors);
    }

    public static async Task DropAsync(string connectionString)
    {
        var b = new MySqlConnectionStringBuilder(connectionString);
        var db = b.Database;
        if (string.IsNullOrEmpty(db) || !db.StartsWith("mastemy_t_", StringComparison.Ordinal))
            throw new InvalidOperationException($"Refusing to drop non-test database '{db}'.");
        b.Database = "";
        await using var conn = new MySqlConnection(b.ConnectionString);
        await conn.OpenAsync();
        await using var cmd = conn.CreateCommand();
        cmd.CommandText = $"DROP DATABASE IF EXISTS `{db.Replace("`", "``")}`";
        await cmd.ExecuteNonQueryAsync();
    }
}
