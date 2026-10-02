using System.Security.Cryptography;
using System.Text;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mastemy.Api.Modules.StudyTools;

/// <summary>
/// Secret calendar-subscription token for a learner's study plan (one per user). Only the SHA-256 hash is stored; the raw
/// token is shown once when created. Creating a new token replaces (revokes) the previous one.
/// </summary>
public class CalendarFeedToken
{
    public Guid UserId { get; set; }
    public string TokenHash { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? LastUsedAt { get; set; }
}

public class CalendarFeedTokenConfig : IEntityTypeConfiguration<CalendarFeedToken>
{
    public void Configure(EntityTypeBuilder<CalendarFeedToken> b)
    {
        b.ToTable("StudyTools_CalendarTokens");
        b.HasKey(x => x.UserId);
        b.Property(x => x.TokenHash).HasMaxLength(64).IsRequired();
        b.HasIndex(x => x.TokenHash).IsUnique();
        b.HasOne<User>().WithMany().HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Cascade);
    }
}

public record CalendarTokenDto(string Token, string Url, DateTime CreatedAt);
public record CalendarTokenStatusDto(bool Active, DateTime? CreatedAt, DateTime? LastUsedAt);

public class CalendarFeedService(AppDbContext db, ICurrentUser me, StudyPlanService plans)
{
    public static string Hash(string token) => Convert.ToHexStringLower(SHA256.HashData(Encoding.UTF8.GetBytes(token)));

    /// <summary>URL-safe 256-bit token (43 chars).</summary>
    public static bool LooksValid(string? token) =>
        token is { Length: 43 } && token.All(c => char.IsAsciiLetterOrDigit(c) || c is '-' or '_');

    public async Task<CalendarTokenDto> Create()
    {
        var uid = me.RequireId();
        if (!await db.Set<StudyPlan>().AnyAsync(p => p.UserId == uid))
            throw AppException.Conflict("Create a study plan before subscribing to its calendar.", "no_study_plan");
        var token = Base64Url(RandomNumberGenerator.GetBytes(32));
        var row = await db.Set<CalendarFeedToken>().FirstOrDefaultAsync(x => x.UserId == uid);
        if (row is null) db.Set<CalendarFeedToken>().Add(row = new CalendarFeedToken { UserId = uid });
        row.TokenHash = Hash(token); row.CreatedAt = DateTime.UtcNow; row.LastUsedAt = null;
        await db.SaveChangesAsync();
        return new CalendarTokenDto(token, $"/api/calendar/{token}.ics", row.CreatedAt);
    }

    public async Task<CalendarTokenStatusDto> Status()
    {
        var uid = me.RequireId();
        var row = await db.Set<CalendarFeedToken>().AsNoTracking().FirstOrDefaultAsync(x => x.UserId == uid);
        return new CalendarTokenStatusDto(row is not null, row?.CreatedAt, row?.LastUsedAt);
    }

    public async Task Revoke()
    {
        var uid = me.RequireId();
        await db.Set<CalendarFeedToken>().Where(x => x.UserId == uid).ExecuteDeleteAsync();
    }

    /// <summary>Anonymous feed: unknown/revoked token, suspended user or deleted plan → 404 (nothing distinguishes them).</summary>
    public async Task<string> Feed(string token)
    {
        if (!LooksValid(token)) throw AppException.NotFound("Calendar");
        var hash = Hash(token);
        var row = await db.Set<CalendarFeedToken>().FirstOrDefaultAsync(x => x.TokenHash == hash) ?? throw AppException.NotFound("Calendar");
        if (!await db.Users.AnyAsync(u => u.Id == row.UserId && !u.IsSuspended)) throw AppException.NotFound("Calendar");
        string ics;
        try { ics = await plans.IcsFor(row.UserId); }
        catch (AppException e) when (e.Status == 404) { throw AppException.NotFound("Calendar"); }
        var now = DateTime.UtcNow;
        if (row.LastUsedAt is null || now - row.LastUsedAt > TimeSpan.FromMinutes(10))
        {
            row.LastUsedAt = now;
            await db.SaveChangesAsync();
        }
        return ics;
    }

    private static string Base64Url(byte[] b) => Convert.ToBase64String(b).TrimEnd('=').Replace('+', '-').Replace('/', '_');
}

[ApiController]
public class CalendarFeedController(CalendarFeedService feeds) : ControllerBase
{
    [Authorize, HttpPost("api/me/study-plan/calendar-token")]
    public Task<CalendarTokenDto> Create() => feeds.Create();

    [Authorize, HttpGet("api/me/study-plan/calendar-token")]
    public Task<CalendarTokenStatusDto> Status() => feeds.Status();

    [Authorize, HttpDelete("api/me/study-plan/calendar-token")]
    public async Task<IActionResult> Revoke() { await feeds.Revoke(); return NoContent(); }

    /// <summary>Anonymous subscription URL (calendar apps cannot send bearer tokens). Rate-limited per IP.</summary>
    [AllowAnonymous, EnableRateLimiting("auth"), HttpGet("api/calendar/{token}.ics")]
    public async Task<IActionResult> Feed(string token)
    {
        var ics = await feeds.Feed(token);
        Response.Headers.CacheControl = "private, no-store";
        Response.Headers["X-Robots-Tag"] = "noindex";
        return File(Encoding.UTF8.GetBytes(ics), "text/calendar; charset=utf-8");
    }
}
