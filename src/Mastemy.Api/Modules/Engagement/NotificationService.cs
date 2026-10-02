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
    /// <summary>Creates in-app notifications for users who have not disabled the kind and, when SMTP is configured, queues
    /// email (outbox) for users who opted in. Never sends email inline. Runs inside the caller's transaction when one is
    /// open, otherwise in its own. Returns the number of in-app notifications created.</summary>
    Task<int> Publish(IEnumerable<Guid> userIds, string kind, string title, string link);
}

/// <summary>Stages outbound email rows (caller saves). Rows are only created when SMTP is configured.</summary>
public class EmailOutbox(AppDbContext db, IEmailSender sender)
{
    public bool Enabled => sender.IsConfigured;

    public bool Enqueue(string to, string subject, string body)
    {
        if (!Enabled || string.IsNullOrWhiteSpace(to)) return false;
        db.EmailOutbox.Add(new EmailOutboxMessage
        {
            ToAddress = to.Length > 512 ? to[..512] : to,
            Subject = subject.Length > 512 ? subject[..512] : subject,
            Body = body,
        });
        return true;
    }
}

public class NotificationService(AppDbContext db, ICurrentUser me, IEmailSender email, IOptions<EmailOptions> emailOpt) : INotificationService
{
    public const int ChunkSize = 1000;

    public async Task<int> Publish(IEnumerable<Guid> userIds, string kind, string title, string link)
    {
        if (!NotificationKinds.All.Contains(kind)) throw new ArgumentException($"Unknown notification kind '{kind}'.", nameof(kind));
        var ids = userIds.Distinct().ToList();
        if (ids.Count == 0) return 0;
        title = title.Length > 300 ? title[..300] : title;
        var ownTx = db.Database.CurrentTransaction is null ? await db.Database.BeginTransactionAsync() : null;
        try
        {
            var created = 0;
            var now = DateTime.UtcNow;
            var url = string.IsNullOrEmpty(emailOpt.Value.PublicBaseUrl) ? link : emailOpt.Value.PublicBaseUrl.TrimEnd('/') + link;
            foreach (var chunk in ids.Chunk(ChunkSize).Select(c => c.ToList()))
            {
                var prefs = await db.NotificationPreferences.AsNoTracking()
                    .Where(p => p.Kind == kind && chunk.Contains(p.UserId)).ToDictionaryAsync(p => p.UserId);
                var inApp = chunk.Where(id => !prefs.TryGetValue(id, out var p) || p.InApp).ToList();
                if (inApp.Count > 0) { await InsertNotifications(inApp, kind, title, link, now); created += inApp.Count; }

                if (!email.IsConfigured) continue; // no SMTP: no outbox rows at all
                var emailIds = prefs.Values.Where(p => p.Email).Select(p => p.UserId).ToList();
                if (emailIds.Count == 0) continue;
                var targets = await db.Users.AsNoTracking().Where(u => emailIds.Contains(u.Id) && !u.IsSuspended)
                    .Select(u => u.Email).ToListAsync();
                foreach (var to in targets)
                    db.EmailOutbox.Add(new EmailOutboxMessage
                    {
                        ToAddress = to, Subject = title, Body = $"{title}\n\n{url}", NextAttemptAt = now, CreatedAt = now,
                    });
                await db.SaveChangesAsync();
            }
            if (ownTx is not null) await ownTx.CommitAsync();
            return created;
        }
        finally
        {
            if (ownTx is not null) await ownTx.DisposeAsync();
        }
    }

    /// <summary>One multi-row INSERT per chunk (fan-out to thousands of learners must not be row-by-row).</summary>
    private Task<int> InsertNotifications(List<Guid> users, string kind, string title, string link, DateTime now)
    {
        var sql = new System.Text.StringBuilder(
            "INSERT INTO `Notifications` (`Id`,`UserId`,`Kind`,`Title`,`Link`,`ReadAt`,`CreatedAt`) VALUES ");
        var args = new List<object> { kind, title, link, now };
        for (var i = 0; i < users.Count; i++)
        {
            if (i > 0) sql.Append(',');
            sql.Append("({").Append(args.Count).Append("},{").Append(args.Count + 1).Append("},{0},{1},{2},NULL,{3})");
            args.Add(Guid.NewGuid().ToString());
            args.Add(users[i].ToString());
        }
        return db.Database.ExecuteSqlRawAsync(sql.ToString(), args);
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
