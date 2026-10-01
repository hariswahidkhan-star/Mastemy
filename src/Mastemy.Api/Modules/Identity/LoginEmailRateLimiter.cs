using System.Threading.RateLimiting;

namespace Mastemy.Api.Modules.Identity;

/// <summary>
/// Per-normalized-email fixed-window limiter for login attempts. Complements the per-IP "auth" policy so a
/// distributed attacker cannot hammer one account, while per-account exponential backoff bounds the delay a
/// victim can be forced into.
/// </summary>
public sealed class LoginEmailRateLimiter : IDisposable
{
    private readonly PartitionedRateLimiter<string> limiter;

    public LoginEmailRateLimiter(int permitsPerMinute)
    {
        var permits = Math.Max(1, permitsPerMinute);
        limiter = PartitionedRateLimiter.Create<string, string>(email => RateLimitPartition.GetFixedWindowLimiter(email,
            _ => new FixedWindowRateLimiterOptions { PermitLimit = permits, Window = TimeSpan.FromMinutes(1), QueueLimit = 0 }));
    }

    public bool TryAcquire(string normalizedEmail)
    {
        using var lease = limiter.AttemptAcquire(normalizedEmail);
        return lease.IsAcquired;
    }

    public void Dispose() => limiter.Dispose();
}
