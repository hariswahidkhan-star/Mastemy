using System.Net;
using System.Net.Mail;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Mastemy.Api.Modules.Engagement;

public class EmailOptions
{
    public string SmtpHost { get; set; } = "";
    public int SmtpPort { get; set; } = 587;
    public string Username { get; set; } = "";
    public string Password { get; set; } = "";
    public string From { get; set; } = "";
    public bool EnableSsl { get; set; } = true;
    public string PublicBaseUrl { get; set; } = "";
}

public interface IEmailSender
{
    /// <summary>True only when SMTP host and sender address are configured. When false, nothing is ever sent.</summary>
    bool IsConfigured { get; }
    Task SendAsync(string to, string subject, string body, CancellationToken ct = default);
}

public class SmtpEmailSender(IOptions<EmailOptions> options) : IEmailSender
{
    private readonly EmailOptions _o = options.Value;
    public bool IsConfigured => !string.IsNullOrWhiteSpace(_o.SmtpHost) && !string.IsNullOrWhiteSpace(_o.From);

    public async Task SendAsync(string to, string subject, string body, CancellationToken ct = default)
    {
        if (!IsConfigured) throw new InvalidOperationException("Email is not configured.");
        using var client = new SmtpClient(_o.SmtpHost, _o.SmtpPort) { EnableSsl = _o.EnableSsl };
        if (!string.IsNullOrEmpty(_o.Username)) client.Credentials = new NetworkCredential(_o.Username, _o.Password);
        using var msg = new MailMessage(_o.From, to, subject, body) { IsBodyHtml = false };
        await client.SendMailAsync(msg, ct);
    }
}

/// <summary>Cross-module entry point for user notifications. Respects per-kind in-app/email preferences.</summary>
public interface INotificationService
{
    /// <summary>Creates in-app notifications (saved immediately) for users who have not disabled the kind, and sends
    /// email to users who opted in when email is configured. Returns the number of in-app notifications created.</summary>
    Task<int> Publish(IEnumerable<Guid> userIds, string kind, string title, string link);
}

public class NotificationService(AppDbContext db, ICurrentUser me, IEmailSender email, IOptions<EmailOptions> emailOpt,
    ILogger<NotificationService> log) : INotificationService
{
    public async Task<int> Publish(IEnumerable<Guid> userIds, string kind, string title, string link)
    {
        if (!NotificationKinds.All.Contains(kind)) throw new ArgumentException($"Unknown notification kind '{kind}'.", nameof(kind));
        var ids = userIds.Distinct().ToList();
        if (ids.Count == 0) return 0;
        title = title.Length > 300 ? title[..300] : title;
        var prefs = await db.NotificationPreferences.AsNoTracking()
            .Where(p => p.Kind == kind && ids.Contains(p.UserId)).ToDictionaryAsync(p => p.UserId);
        var inApp = ids.Where(id => !prefs.TryGetValue(id, out var p) || p.InApp).ToList();
        foreach (var id in inApp)
            db.Notifications.Add(new Notification { UserId = id, Kind = kind, Title = title, Link = link });
        await db.SaveChangesAsync();

        if (email.IsConfigured)
        {
            var emailIds = prefs.Values.Where(p => p.Email).Select(p => p.UserId).ToList();
            if (emailIds.Count > 0)
            {
                var targets = await db.Users.AsNoTracking().Where(u => emailIds.Contains(u.Id) && !u.IsSuspended)
                    .Select(u => u.Email).ToListAsync();
                var url = string.IsNullOrEmpty(emailOpt.Value.PublicBaseUrl) ? link : emailOpt.Value.PublicBaseUrl.TrimEnd('/') + link;
                foreach (var to in targets)
                {
                    try { await email.SendAsync(to, title, $"{title}\n\n{url}"); }
                    catch (Exception ex) { log.LogWarning(ex, "Notification email ({Kind}) failed", kind); }
                }
            }
        }
        return inApp.Count;
    }

    public async Task<NotificationPageDto> List(int page, int pageSize, bool unreadOnly)
    {
        (page, pageSize) = TextRules.Paging(page, pageSize);
        var uid = me.RequireId();
        var q = db.Notifications.AsNoTracking().Where(n => n.UserId == uid);
        var unread = await q.CountAsync(n => n.ReadAt == null);
        if (unreadOnly) q = q.Where(n => n.ReadAt == null);
        var total = await q.CountAsync();
        var items = await q.OrderByDescending(n => n.CreatedAt).ThenBy(n => n.Id).Skip((page - 1) * pageSize).Take(pageSize)
            .Select(n => new NotificationDto(n.Id, n.Kind, n.Title, n.Link, n.ReadAt, n.CreatedAt)).ToListAsync();
        return new NotificationPageDto(items, total, page, pageSize, unread);
    }

    public async Task MarkRead(Guid id)
    {
        var uid = me.RequireId();
        var n = await db.Notifications.FirstOrDefaultAsync(x => x.Id == id && x.UserId == uid) ?? throw AppException.NotFound("Notification");
        n.ReadAt ??= DateTime.UtcNow;
        await db.SaveChangesAsync();
    }

    public async Task<int> MarkAllRead()
    {
        var uid = me.RequireId();
        var now = DateTime.UtcNow;
        return await db.Notifications.Where(n => n.UserId == uid && n.ReadAt == null)
            .ExecuteUpdateAsync(s => s.SetProperty(n => n.ReadAt, now));
    }

    public async Task<PreferencesDto> Preferences()
    {
        var uid = me.RequireId();
        var stored = await db.NotificationPreferences.AsNoTracking().Where(p => p.UserId == uid).ToDictionaryAsync(p => p.Kind);
        return new PreferencesDto(email.IsConfigured, NotificationKinds.All.Select(k =>
            stored.TryGetValue(k, out var p) ? new PreferenceDto(k, p.InApp, p.Email) : new PreferenceDto(k, true, false)).ToList());
    }

    public async Task<PreferencesDto> UpdatePreferences(PreferencesInput input)
    {
        var uid = me.RequireId();
        var items = input.Items ?? throw AppException.Bad("items is required.");
        if (items.Any(i => !NotificationKinds.All.Contains(i.Kind))) throw AppException.Bad("Unknown notification kind.");
        if (items.Select(i => i.Kind).Distinct().Count() != items.Count) throw AppException.Bad("Duplicate notification kind.");
        var stored = await db.NotificationPreferences.Where(p => p.UserId == uid).ToDictionaryAsync(p => p.Kind);
        foreach (var i in items)
        {
            if (!stored.TryGetValue(i.Kind, out var p))
            {
                p = new NotificationPreference { UserId = uid, Kind = i.Kind };
                db.NotificationPreferences.Add(p);
            }
            p.InApp = i.InApp; p.Email = i.Email;
        }
        await db.SaveChangesAsync();
        return await Preferences();
    }
}
