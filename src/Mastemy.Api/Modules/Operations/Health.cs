using Mastemy.Api.Data;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Engagement;
using Mastemy.Api.Modules.Resources;
using Mastemy.Api.Modules.Trust;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace Mastemy.Api.Modules.Operations;

public class OperationsOptions
{
    /// <summary>Oldest pending outbox email older than this marks readiness Degraded.</summary>
    public int OutboxDegradedMinutes { get; set; } = 15;
    /// <summary>Live courses not re-published within this many months appear in the overdue-content queue.</summary>
    public int OverdueContentMonths { get; set; } = 12;
}

public sealed class MySqlHealthCheck(AppDbContext db) : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken ct = default)
    {
        try
        {
            await db.Database.ExecuteSqlRawAsync("SELECT 1", ct);
            return HealthCheckResult.Healthy("MySQL reachable.");
        }
        catch (Exception e) when (e is not OperationCanceledException || !ct.IsCancellationRequested)
        {
            return HealthCheckResult.Unhealthy("MySQL unreachable: " + e.GetType().Name);
        }
    }
}

/// <summary>Writes, reads back and deletes a probe file under the resources root (same volume as staging and blobs).</summary>
public sealed class ResourceStorageHealthCheck(ResourceOptions opt, IWebHostEnvironment env) : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken ct = default)
    {
        var root = Path.GetFullPath(Path.IsPathRooted(opt.RootPath) ? opt.RootPath : Path.Combine(env.ContentRootPath, opt.RootPath));
        var probe = Path.Combine(root, ".staging", $"health-{Guid.NewGuid():N}.probe");
        try
        {
            Directory.CreateDirectory(Path.GetDirectoryName(probe)!);
            await File.WriteAllBytesAsync(probe, "ok"u8.ToArray(), ct);
            var back = await File.ReadAllBytesAsync(probe, ct);
            if (back.Length != 2) return HealthCheckResult.Unhealthy("Resource storage read-back mismatch.");
            var drive = new DriveInfo(root);
            var data = new Dictionary<string, object> { ["freeBytes"] = drive.AvailableFreeSpace };
            return drive.AvailableFreeSpace < 512L * 1024 * 1024
                ? HealthCheckResult.Degraded("Resource storage has less than 512 MiB free.", data: data)
                : HealthCheckResult.Healthy("Resource storage writable.", data);
        }
        catch (Exception e) when (e is IOException or UnauthorizedAccessException)
        {
            return HealthCheckResult.Unhealthy("Resource storage not writable: " + e.GetType().Name);
        }
        finally
        {
            try { File.Delete(probe); } catch (IOException) { } catch (UnauthorizedAccessException) { }
        }
    }
}

public sealed class OutboxBacklogHealthCheck(AppDbContext db, OperationsOptions opt, IEmailSender sender) : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken ct = default)
    {
        var now = DateTime.UtcNow;
        var pending = db.EmailOutbox.AsNoTracking().Where(m => m.SentAt == null && m.Attempts < EmailOutboxWorker.MaxAttempts);
        var oldest = await pending.MinAsync(m => (DateTime?)m.CreatedAt, ct);
        var count = await pending.CountAsync(ct);
        var dead = await db.EmailOutbox.CountAsync(m => m.SentAt == null && m.Attempts >= EmailOutboxWorker.MaxAttempts, ct);
        var age = oldest is null ? 0 : (now - oldest.Value).TotalSeconds;
        var data = new Dictionary<string, object>
        {
            ["pending"] = count, ["oldestAgeSeconds"] = Math.Round(age), ["deadLettered"] = dead, ["smtpConfigured"] = sender.IsConfigured,
        };
        if (age > opt.OutboxDegradedMinutes * 60) return HealthCheckResult.Degraded($"Oldest pending email is {Math.Round(age / 60)} minutes old.", data: data);
        if (dead > 0) return HealthCheckResult.Degraded($"{dead} email(s) exhausted their retries.", data: data);
        return HealthCheckResult.Healthy("Outbox draining.", data);
    }
}

public sealed class MalwareScannerHealthCheck(IMalwareScanner scanner, ScanningOptions opt) : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken ct = default)
    {
        var data = new Dictionary<string, object> { ["mode"] = opt.EffectiveMode.ToString(), ["engine"] = scanner.Engine };
        if (!scanner.Enabled)
            return opt.EffectiveMode == ScanMode.Required
                ? HealthCheckResult.Unhealthy("Scanning is Required but no scanner is configured.", data: data)
                : HealthCheckResult.Healthy("Scanning disabled (Optional, no scanner configured).", data);
        try
        {
            await scanner.PingAsync(ct);
            return HealthCheckResult.Healthy("Scanner answering.", data);
        }
        catch (ScannerUnavailableException e)
        {
            return opt.EffectiveMode == ScanMode.Required
                ? HealthCheckResult.Unhealthy("Scanner unreachable; uploads are refused.", data: data)
                : HealthCheckResult.Degraded("Scanner unreachable; uploads accepted unscanned. " + e.Message, data: data);
        }
    }
}

public record HealthEntryDto(string Name, string Status, string? Description, double DurationMs, IReadOnlyDictionary<string, object>? Data);
public record HealthReportDto(string Status, double? TotalDurationMs = null, List<HealthEntryDto>? Checks = null);

/// <summary>
/// /health/live: process is up (no dependencies). /health/ready: dependencies (MySQL, resource storage, email outbox, scanner).
/// Non-staff callers get only <c>{status}</c> from a report cached for <see cref="PublicCacheTtl"/> (so anonymous traffic
/// cannot drive DB/storage/scanner probes); Staff get per-check details computed fresh, cached for <see cref="StaffCacheTtl"/>.
/// Unhealthy → 503, Degraded → 200.
/// </summary>
[ApiController]
[AllowAnonymous]
[Route("health")]
public class HealthController(HealthCheckService health, ICurrentUser me, Microsoft.Extensions.Caching.Memory.IMemoryCache cache) : ControllerBase
{
    public static readonly TimeSpan PublicCacheTtl = TimeSpan.FromSeconds(10);
    public static readonly TimeSpan StaffCacheTtl = TimeSpan.FromSeconds(2);
    private static readonly SemaphoreSlim PublicGate = new(1, 1);
    private static readonly SemaphoreSlim StaffGate = new(1, 1);

    private async Task<HealthReport> Cached(string key, TimeSpan ttl, SemaphoreSlim gate)
    {
        if (cache.TryGetValue(key, out HealthReport? hit) && hit is not null) return hit;
        await gate.WaitAsync(); // one probe at a time per audience; waiters reuse its result
        try
        {
            if (cache.TryGetValue(key, out hit) && hit is not null) return hit;
            // Not tied to the caller's abort token: the shared result must not be a cancellation artefact.
            var report = await health.CheckHealthAsync(r => r.Tags.Contains("ready"), CancellationToken.None);
            cache.Set(key, report, ttl);
            return report;
        }
        finally { gate.Release(); }
    }

    [HttpGet("live")]
    public IActionResult Live()
    {
        Response.Headers.CacheControl = "no-store";
        return Ok(new HealthReportDto("Healthy"));
    }

    [HttpGet("ready")]
    public async Task<IActionResult> Ready()
    {
        Response.Headers.CacheControl = "no-store";
        if (!me.IsStaff)
        {
            var pub = await Cached("health:ready:public", PublicCacheTtl, PublicGate);
            return StatusCode(pub.Status == HealthStatus.Unhealthy ? 503 : 200, new { status = pub.Status.ToString() });
        }
        var report = await Cached("health:ready:staff", StaffCacheTtl, StaffGate);
        var dto = new HealthReportDto(report.Status.ToString(), Math.Round(report.TotalDuration.TotalMilliseconds, 1),
            report.Entries.Select(e => new HealthEntryDto(e.Key, e.Value.Status.ToString(), e.Value.Description,
                Math.Round(e.Value.Duration.TotalMilliseconds, 1), e.Value.Data.Count == 0 ? null : e.Value.Data)).ToList());
        return StatusCode(report.Status == HealthStatus.Unhealthy ? 503 : 200, dto);
    }
}
