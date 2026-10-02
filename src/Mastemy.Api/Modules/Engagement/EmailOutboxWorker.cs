using System.Net.Mail;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Mastemy.Api.Modules.Engagement;

public class EmailOutboxOptions
{
    public int BatchSize { get; set; } = 50;
    public int PollIntervalSeconds { get; set; } = 10;
    public int RetryBaseSeconds { get; set; } = 30;
}

/// <summary>
/// Delivers queued <see cref="EmailOutboxMessage"/> rows in batches. Rows are claimed with
/// <c>FOR UPDATE SKIP LOCKED</c> and leased (NextAttemptAt pushed forward) so several API instances never send the same
/// message concurrently. Failures retry with exponential backoff up to <see cref="MaxAttempts"/>; LastError holds only
/// the exception type and SMTP status code (never server text, credentials or addresses).
/// </summary>
public class EmailOutboxWorker(IServiceScopeFactory scopes, IEmailSender sender, IOptions<EmailOutboxOptions> options,
    ILogger<EmailOutboxWorker> log) : BackgroundService
{
    public const int MaxAttempts = 6;
    private static readonly TimeSpan Lease = TimeSpan.FromMinutes(5);
    private readonly EmailOutboxOptions _o = options.Value;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        if (!sender.IsConfigured) return; // no SMTP: nothing is ever queued or sent
        using var timer = new PeriodicTimer(TimeSpan.FromSeconds(Math.Max(1, _o.PollIntervalSeconds)));
        try
        {
            do
            {
                try
                {
                    while (await ProcessBatchAsync(stoppingToken) >= Math.Max(1, _o.BatchSize)) { }
                }
                catch (Exception ex) when (ex is not OperationCanceledException) { log.LogWarning(ex, "Email outbox batch failed"); }
            } while (await timer.WaitForNextTickAsync(stoppingToken));
        }
        catch (OperationCanceledException) { }
    }

    /// <summary>Claims and sends one batch. Returns the number of messages claimed.</summary>
    public async Task<int> ProcessBatchAsync(CancellationToken ct = default)
    {
        if (!sender.IsConfigured) return 0;
        var batch = Math.Clamp(_o.BatchSize, 1, 1000);
        using var scope = scopes.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var now = DateTime.UtcNow;
        List<EmailOutboxMessage> claimed;
        await using (var tx = await db.Database.BeginTransactionAsync(ct))
        {
            claimed = await db.EmailOutbox.FromSqlInterpolated(
                    $"SELECT * FROM `EmailOutbox` WHERE `SentAt` IS NULL AND `Attempts` < {MaxAttempts} AND `NextAttemptAt` <= {now} ORDER BY `NextAttemptAt` LIMIT {batch} FOR UPDATE SKIP LOCKED")
                .ToListAsync(ct);
            foreach (var m in claimed) m.NextAttemptAt = now + Lease;
            await db.SaveChangesAsync(ct);
            await tx.CommitAsync(ct);
        }

        foreach (var m in claimed)
        {
            try
            {
                await sender.SendAsync(m.ToAddress, m.Subject, m.Body, ct);
                m.SentAt = DateTime.UtcNow;
                m.LastError = null;
            }
            catch (Exception ex) when (ex is not OperationCanceledException || !ct.IsCancellationRequested)
            {
                m.Attempts++;
                m.LastError = Describe(ex);
                m.NextAttemptAt = DateTime.UtcNow + Backoff(m.Attempts);
                log.LogWarning("Email {Id} delivery attempt {Attempt} failed: {Error}", m.Id, m.Attempts, m.LastError);
            }
            await db.SaveChangesAsync(CancellationToken.None);
        }
        return claimed.Count;
    }

    public TimeSpan Backoff(int attempts) =>
        TimeSpan.FromSeconds(Math.Max(1, _o.RetryBaseSeconds) * Math.Pow(2, Math.Max(0, attempts - 1)));

    private static string Describe(Exception ex) => ex switch
    {
        SmtpFailedRecipientException r => $"SmtpFailedRecipientException: {r.StatusCode}",
        SmtpException s => $"SmtpException: {s.StatusCode}",
        _ => ex.GetType().Name,
    };
}
