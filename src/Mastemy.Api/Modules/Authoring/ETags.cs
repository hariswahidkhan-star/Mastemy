using Mastemy.Api.Infrastructure;

namespace Mastemy.Api.Modules.Authoring;

/// <summary>Strong-ETag comparison for optimistic concurrency (RFC 9110 §13.1.1). Weak validators and "*" never match.</summary>
public static class ETags
{
    public static bool Matches(string ifMatchHeader, string current)
    {
        foreach (var raw in ifMatchHeader.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
        {
            // "*" is deliberately not honoured: autosave must always prove which version it edited.
            if (raw.StartsWith("W/", StringComparison.Ordinal)) continue;
            if (string.Equals(raw, current, StringComparison.Ordinal)) return true;
        }
        return false;
    }

    public static AppException Stale(string message) => new(412, message, "precondition_failed");
}
