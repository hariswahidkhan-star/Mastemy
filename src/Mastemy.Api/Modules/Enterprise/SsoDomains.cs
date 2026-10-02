using System.Buffers.Binary;
using System.Net;
using System.Net.Sockets;
using System.Security.Cryptography;
using System.Text;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mastemy.Api.Modules.Enterprise;

public enum SsoDomainStatus { Pending, Verified, Rejected }

/// <summary>
/// An email domain an organization wants to use for SSO. Only Verified domains are honoured at the SSO callback.
/// Verification: a DNS TXT record <c>_mastemy-sso.&lt;domain&gt;</c> whose value is <see cref="VerificationToken"/>,
/// or explicit staff approval.
/// </summary>
public class OrgSsoDomain
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid OrganizationId { get; set; }
    public string Domain { get; set; } = "";
    public SsoDomainStatus Status { get; set; } = SsoDomainStatus.Pending;
    public string VerificationToken { get; set; } = "";
    public string? VerifiedVia { get; set; } // "dns" | "staff"
    public DateTime? VerifiedAt { get; set; }
    public Guid? DecidedBy { get; set; }
    public string? DecisionNote { get; set; }
    public DateTime? LastDnsCheckAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class OrgSsoDomainConfiguration : IEntityTypeConfiguration<OrgSsoDomain>
{
    public void Configure(EntityTypeBuilder<OrgSsoDomain> b)
    {
        b.ToTable("Enterprise_SsoDomains");
        b.Property(x => x.Domain).HasMaxLength(253);
        b.Property(x => x.Status).HasConversion<string>().HasMaxLength(16);
        b.Property(x => x.VerificationToken).HasMaxLength(100);
        b.Property(x => x.VerifiedVia).HasMaxLength(16);
        b.Property(x => x.DecisionNote).HasMaxLength(1000);
        b.HasIndex(x => new { x.OrganizationId, x.Domain }).IsUnique();
        b.HasIndex(x => new { x.Domain, x.Status });
        b.HasIndex(x => new { x.Status, x.CreatedAt });
    }
}

public record SsoDomainDto(Guid Id, string Domain, string Status, string TxtRecordName, string TxtRecordValue, string? VerifiedVia,
    DateTime? VerifiedAt, string? DecisionNote, DateTime? LastDnsCheckAt);
public record StaffSsoDomainDto(Guid Id, Guid OrganizationId, string OrganizationName, string OrganizationSlug, string Domain, string Status,
    string? VerifiedVia, DateTime? VerifiedAt, string? DecisionNote, DateTime CreatedAt);
public record SsoDomainDecisionInput(string? Note);

/// <summary>Consumer mailbox providers: anyone can get an address there, so they can never be SSO domains.</summary>
public static class PublicEmailDomains
{
    private static readonly HashSet<string> Exact = new(StringComparer.OrdinalIgnoreCase)
    {
        "gmail.com", "googlemail.com", "outlook.com", "hotmail.com", "live.com", "msn.com", "passport.com", "yahoo.com", "ymail.com",
        "rocketmail.com", "icloud.com", "me.com", "mac.com", "proton.me", "pm.me", "protonmail.com", "protonmail.ch", "aol.com", "aim.com",
        "mail.ru", "inbox.ru", "list.ru", "bk.ru", "internet.ru", "yandex.com", "ya.ru", "qq.com", "foxmail.com", "163.com", "126.com",
        "yeah.net", "sina.com", "sina.cn", "sohu.com", "aliyun.com", "139.com", "naver.com", "daum.net", "hanmail.net", "web.de",
        "t-online.de", "freenet.de", "orange.fr", "wanadoo.fr", "free.fr", "laposte.net", "libero.it", "virgilio.it", "tiscali.it",
        "zoho.com", "zohomail.com", "tutanota.com", "tutanota.de", "tuta.io", "tuta.com", "fastmail.com", "fastmail.fm", "hey.com",
        "mail.com", "email.com", "usa.com", "inbox.com", "hushmail.com", "rediffmail.com", "seznam.cz", "o2.pl", "wp.pl", "interia.pl",
        "onet.pl", "rambler.ru", "ukr.net", "comcast.net", "verizon.net", "att.net", "sbcglobal.net", "bellsouth.net", "cox.net",
        "earthlink.net", "charter.net", "btinternet.com", "sky.com", "virginmedia.com", "shaw.ca", "rogers.com", "bigpond.com",
        "optusnet.com.au", "duck.com", "mailfence.com", "posteo.de", "mailbox.org", "runbox.com", "disroot.org", "cock.li",
        "guerrillamail.com", "mailinator.com", "10minutemail.com", "temp-mail.org", "yopmail.com", "trashmail.com", "sharklasers.com",
        "outlook.sa", "hotmail.sa",
    };

    /// <summary>Provider brands registered under many country TLDs (gmx.de, yandex.com.tr, yahoo.co.uk, hotmail.fr …).</summary>
    private static readonly HashSet<string> Brands = new(StringComparer.OrdinalIgnoreCase)
    {
        "gmail", "googlemail", "gmx", "yandex", "yahoo", "ymail", "hotmail", "outlook", "live", "msn", "windowslive", "icloud", "aol",
        "proton", "protonmail", "mail", "email", "web", "qq", "163", "126", "sina", "naver", "zoho", "tutanota", "fastmail", "rambler",
        "libero", "orange", "wanadoo", "free", "seznam", "rediffmail", "yopmail", "mailinator", "guerrillamail",
    };

    public static bool IsPublic(string domain)
    {
        var d = domain.Trim().TrimEnd('.').ToLowerInvariant();
        if (Exact.Contains(d) || Exact.Any(e => d.EndsWith("." + e, StringComparison.Ordinal))) return true;
        var labels = d.Split('.');
        // brand.<tld> or brand.<sld>.<cc> where the suffix labels look like a public suffix (e.g. gmx.de, yahoo.co.uk, yandex.com.tr).
        return labels.Length is 2 or 3 && Brands.Contains(labels[0]) && labels.Skip(1).All(l => l.Length <= 3);
    }
}

/// <summary>Looks up DNS TXT records.</summary>
public interface IDnsTxtResolver
{
    /// <summary>All TXT strings of the name (each record's character-strings concatenated). Throws <see cref="DnsLookupException"/> when DNS is unreachable.</summary>
    Task<IReadOnlyList<string>> LookupTxt(string name, CancellationToken ct);
}

public class DnsLookupException(string message) : Exception(message);

/// <summary>
/// Minimal DNS TXT client: one recursive query over UDP to the system's configured resolver (/etc/resolv.conf, or the
/// <c>Sso:DnsServer</c> override). No caching; the response id and question are checked; truncated answers are refused.
/// </summary>
public class SystemDnsTxtResolver(SsoOptions opt) : IDnsTxtResolver
{
    public async Task<IReadOnlyList<string>> LookupTxt(string name, CancellationToken ct)
    {
        var server = Server() ?? throw new DnsLookupException("No DNS resolver is configured on this server.");
        var id = (ushort)RandomNumberGenerator.GetInt32(0, 65536);
        var query = BuildQuery(id, name);
        using var udp = new UdpClient(server.AddressFamily);
        using var timeout = CancellationTokenSource.CreateLinkedTokenSource(ct);
        timeout.CancelAfter(TimeSpan.FromSeconds(5));
        try
        {
            await udp.SendAsync(query, new IPEndPoint(server, 53), timeout.Token);
            while (true)
            {
                var res = await udp.ReceiveAsync(timeout.Token);
                if (!res.RemoteEndPoint.Address.Equals(server)) continue;
                var parsed = ParseTxtResponse(res.Buffer, id, name);
                if (parsed is not null) return parsed;
            }
        }
        catch (OperationCanceledException) when (!ct.IsCancellationRequested) { throw new DnsLookupException("The DNS resolver did not answer."); }
        catch (SocketException) { throw new DnsLookupException("The DNS resolver is unreachable."); }
    }

    private IPAddress? Server()
    {
        if (!string.IsNullOrWhiteSpace(opt.DnsServer) && IPAddress.TryParse(opt.DnsServer, out var o)) return o;
        try
        {
            foreach (var line in File.ReadLines("/etc/resolv.conf"))
            {
                var parts = line.Split((char[]?)null, StringSplitOptions.RemoveEmptyEntries);
                if (parts.Length >= 2 && parts[0] == "nameserver" && IPAddress.TryParse(parts[1].Split('%')[0], out var ip)) return ip;
            }
        }
        catch (IOException) { }
        catch (UnauthorizedAccessException) { }
        return null;
    }

    public static byte[] BuildQuery(ushort id, string name)
    {
        var buf = new List<byte>(512);
        void U16(int v) { buf.Add((byte)(v >> 8)); buf.Add((byte)v); }
        U16(id); U16(0x0100); U16(1); U16(0); U16(0); U16(0); // RD, one question
        foreach (var label in name.TrimEnd('.').Split('.'))
        {
            var bytes = Encoding.ASCII.GetBytes(label);
            if (bytes.Length is 0 or > 63) throw new ArgumentException("Invalid DNS name.", nameof(name));
            buf.Add((byte)bytes.Length); buf.AddRange(bytes);
        }
        buf.Add(0);
        U16(16); U16(1); // TXT, IN
        return buf.ToArray();
    }

    /// <summary>Parses a response to <see cref="BuildQuery"/>. Null when it is not the answer to this query (wrong id / question).</summary>
    public static IReadOnlyList<string>? ParseTxtResponse(byte[] msg, ushort id, string name)
    {
        try
        {
            if (msg.Length < 12 || BinaryPrimitives.ReadUInt16BigEndian(msg) != id) return null;
            var flags = BinaryPrimitives.ReadUInt16BigEndian(msg.AsSpan(2));
            if ((flags & 0x8000) == 0) return null; // not a response
            if ((flags & 0x0200) != 0) throw new DnsLookupException("The DNS answer was truncated.");
            var rcode = flags & 0x000F;
            var qd = BinaryPrimitives.ReadUInt16BigEndian(msg.AsSpan(4));
            var an = BinaryPrimitives.ReadUInt16BigEndian(msg.AsSpan(6));
            var pos = 12;
            for (var i = 0; i < qd; i++)
            {
                var qname = ReadName(msg, ref pos);
                if (!string.Equals(qname, name.TrimEnd('.'), StringComparison.OrdinalIgnoreCase)) return null;
                pos += 4;
            }
            if (rcode == 3) return []; // NXDOMAIN
            if (rcode != 0) throw new DnsLookupException($"The DNS resolver failed (rcode {rcode}).");
            var result = new List<string>();
            for (var i = 0; i < an; i++)
            {
                ReadName(msg, ref pos);
                var type = BinaryPrimitives.ReadUInt16BigEndian(msg.AsSpan(pos));
                var rdlen = BinaryPrimitives.ReadUInt16BigEndian(msg.AsSpan(pos + 8));
                pos += 10;
                if (pos + rdlen > msg.Length) throw new DnsLookupException("Malformed DNS answer.");
                if (type == 16)
                {
                    var sb = new StringBuilder();
                    var p = pos;
                    while (p < pos + rdlen)
                    {
                        int len = msg[p++];
                        if (p + len > pos + rdlen) throw new DnsLookupException("Malformed DNS answer.");
                        sb.Append(Encoding.UTF8.GetString(msg, p, len));
                        p += len;
                    }
                    result.Add(sb.ToString());
                }
                pos += rdlen;
            }
            return result;
        }
        catch (IndexOutOfRangeException) { throw new DnsLookupException("Malformed DNS answer."); }
        catch (ArgumentOutOfRangeException) { throw new DnsLookupException("Malformed DNS answer."); }
    }

    private static string ReadName(byte[] msg, ref int pos)
    {
        var labels = new List<string>();
        var p = pos;
        var jumped = false;
        for (var hops = 0; hops < 64; hops++)
        {
            int len = msg[p];
            if (len == 0) { if (!jumped) pos = p + 1; return string.Join('.', labels); }
            if ((len & 0xC0) == 0xC0)
            {
                var target = ((len & 0x3F) << 8) | msg[p + 1];
                if (!jumped) pos = p + 2;
                jumped = true;
                p = target;
                continue;
            }
            labels.Add(Encoding.ASCII.GetString(msg, p + 1, len));
            p += len + 1;
        }
        throw new DnsLookupException("Malformed DNS answer.");
    }
}

/// <summary>Domain verification for SSO: DNS TXT self-service (org Admin) and staff approve/reject.</summary>
public class SsoDomainService(AppDbContext db, ICurrentUser me, AuditService audit, EnterpriseService orgs, IDnsTxtResolver dns)
{
    public const string TxtPrefix = "_mastemy-sso.";

    public static SsoDomainDto Dto(OrgSsoDomain d) => new(d.Id, d.Domain, d.Status.ToString(), TxtPrefix + d.Domain, d.VerificationToken,
        d.VerifiedVia, d.VerifiedAt, d.DecisionNote, d.LastDnsCheckAt);

    public static string NewToken() => "mastemy-sso-verify=" + Tokens.Random(24);

    /// <summary>Org Admin: checks the TXT record and marks the domain Verified when it carries the token.</summary>
    public async Task<SsoDomainDto> VerifyDns(Guid orgId, Guid domainId, CancellationToken ct)
    {
        var (_, role) = await orgs.RequireManager(orgId);
        EnterprisePhase2Service.RequireAdmin(role, "Only an organization Admin can verify SSO domains.");
        var d = await db.Set<OrgSsoDomain>().FirstOrDefaultAsync(x => x.Id == domainId && x.OrganizationId == orgId, ct) ?? throw AppException.NotFound("SSO domain");
        if (d.Status == SsoDomainStatus.Verified) return Dto(d);
        if (d.Status == SsoDomainStatus.Rejected)
            throw AppException.Conflict("Staff rejected this domain. Remove it or contact support.", "domain_rejected");
        if (PublicEmailDomains.IsPublic(d.Domain)) throw AppException.Bad("Public email domains can never be used for SSO.", "public_email_domain");
        IReadOnlyList<string> records;
        try { records = await dns.LookupTxt(TxtPrefix + d.Domain, ct); }
        catch (DnsLookupException e) { throw new AppException(503, e.Message, "dns_unavailable"); }
        d.LastDnsCheckAt = DateTime.UtcNow;
        if (!records.Any(r => CryptographicOperations.FixedTimeEquals(Encoding.UTF8.GetBytes(r.Trim()), Encoding.UTF8.GetBytes(d.VerificationToken))))
        {
            await db.SaveChangesAsync(ct);
            throw AppException.Conflict($"No TXT record {TxtPrefix}{d.Domain} with the verification value was found. DNS changes can take a while to appear.",
                "domain_verification_failed");
        }
        await RequireUnclaimed(d, ct);
        d.Status = SsoDomainStatus.Verified; d.VerifiedVia = "dns"; d.VerifiedAt = DateTime.UtcNow; d.UpdatedAt = DateTime.UtcNow;
        d.DecidedBy = me.RequireId();
        audit.Record("org.sso.domain_verified", nameof(Organization), orgId, new { d.Domain, via = "dns" });
        await db.SaveChangesAsync(ct);
        return Dto(d);
    }

    private async Task RequireUnclaimed(OrgSsoDomain d, CancellationToken ct)
    {
        if (await db.Set<OrgSsoDomain>().AnyAsync(x => x.Domain == d.Domain && x.Status == SsoDomainStatus.Verified && x.OrganizationId != d.OrganizationId, ct))
            throw AppException.Conflict("Another organization has already verified this domain.", "domain_claimed");
    }

    public async Task<List<StaffSsoDomainDto>> StaffList(string? status)
    {
        var q = db.Set<OrgSsoDomain>().AsNoTracking();
        if (!string.IsNullOrWhiteSpace(status))
        {
            if (!Enum.TryParse<SsoDomainStatus>(status, true, out var s)) throw AppException.Bad("Unknown status.", "invalid_status");
            q = q.Where(x => x.Status == s);
        }
        var rows = await q.OrderBy(x => x.CreatedAt).Take(500).ToListAsync();
        var ids = rows.Select(r => r.OrganizationId).Distinct().ToList();
        var names = await db.Organizations.AsNoTracking().Where(o => ids.Contains(o.Id)).ToDictionaryAsync(o => o.Id, o => new { o.Name, o.Slug });
        return rows.Select(r => new StaffSsoDomainDto(r.Id, r.OrganizationId, names.GetValueOrDefault(r.OrganizationId)?.Name ?? "",
            names.GetValueOrDefault(r.OrganizationId)?.Slug ?? "", r.Domain, r.Status.ToString(), r.VerifiedVia, r.VerifiedAt, r.DecisionNote, r.CreatedAt)).ToList();
    }

    public async Task<StaffSsoDomainDto> Decide(Guid id, bool approve, SsoDomainDecisionInput input)
    {
        var note = (input.Note ?? "").Trim();
        if (note.Length > 1000) throw AppException.Bad("note is too long.", "invalid_note");
        if (!approve && note.Length == 0) throw AppException.Bad("A reason is required to reject a domain.", "note_required");
        var d = await db.Set<OrgSsoDomain>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("SSO domain");
        if (approve)
        {
            if (PublicEmailDomains.IsPublic(d.Domain)) throw AppException.Bad("Public email domains can never be used for SSO.", "public_email_domain");
            await RequireUnclaimed(d, default);
            d.Status = SsoDomainStatus.Verified; d.VerifiedVia = "staff"; d.VerifiedAt = DateTime.UtcNow;
        }
        else
        {
            d.Status = SsoDomainStatus.Rejected; d.VerifiedVia = null; d.VerifiedAt = null;
        }
        d.DecidedBy = me.RequireId(); d.DecisionNote = note.Length == 0 ? null : note; d.UpdatedAt = DateTime.UtcNow;
        audit.Record(approve ? "org.sso.domain_approved" : "org.sso.domain_rejected", nameof(Organization), d.OrganizationId, new { d.Domain, note });
        await db.SaveChangesAsync();
        var org = await db.Organizations.AsNoTracking().FirstAsync(o => o.Id == d.OrganizationId);
        return new StaffSsoDomainDto(d.Id, d.OrganizationId, org.Name, org.Slug, d.Domain, d.Status.ToString(), d.VerifiedVia, d.VerifiedAt, d.DecisionNote, d.CreatedAt);
    }
}

/// <summary>Deletes expired SSO login states (and spent handoffs) every 10 minutes.</summary>
public class SsoStateCleanup(IServiceScopeFactory scopes, ILogger<SsoStateCleanup> log) : BackgroundService
{
    public static readonly TimeSpan Interval = TimeSpan.FromMinutes(10);

    public static Task<int> Purge(AppDbContext db, DateTime now, CancellationToken ct = default) =>
        db.Set<SsoLoginState>().Where(s => s.ExpiresAt < now && (s.HandoffExpiresAt == null || s.HandoffExpiresAt < now)).ExecuteDeleteAsync(ct);

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                using var scope = scopes.CreateScope();
                var n = await Purge(scope.ServiceProvider.GetRequiredService<AppDbContext>(), DateTime.UtcNow, stoppingToken);
                if (n > 0) log.LogInformation("Removed {Count} expired SSO login states", n);
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested) { break; }
            catch (Exception e) { log.LogWarning(e, "SSO state cleanup failed"); }
            try { await Task.Delay(Interval, stoppingToken); } catch (OperationCanceledException) { break; }
        }
    }
}
