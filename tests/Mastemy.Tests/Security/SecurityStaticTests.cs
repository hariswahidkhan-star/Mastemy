using System.Net;
using System.Text.RegularExpressions;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Questions;

namespace Mastemy.Tests.Security;

/// <summary>Source-level guards (secrets, injection sinks, deserialization) and SSRF guard unit tests. No database needed.</summary>
public class SecurityStaticTests
{
    public static string RepoRoot()
    {
        var d = new DirectoryInfo(AppContext.BaseDirectory);
        while (d is not null && !File.Exists(Path.Combine(d.FullName, "Mastemy.slnx"))) d = d.Parent;
        return d?.FullName ?? throw new InvalidOperationException("Repository root (Mastemy.slnx) not found.");
    }

    private static readonly string[] SkipDirs = ["bin", "obj", "node_modules", ".git", "dist", "build", "coverage", "playwright-report", "test-results", ".claude"];
    private static readonly string[] TextExt = [".cs", ".json", ".yml", ".yaml", ".ts", ".tsx", ".js", ".mjs", ".sh", ".conf", ".env", ".md", ".config", ".xml", ".toml", ".ini", ".txt", ".csproj", ".props", ".html", ".ps1"];

    public static IEnumerable<string> SourceFiles(string root)
    {
        var stack = new Stack<DirectoryInfo>([new DirectoryInfo(root)]);
        while (stack.Count > 0)
        {
            var dir = stack.Pop();
            foreach (var sub in dir.EnumerateDirectories())
                if (!SkipDirs.Contains(sub.Name, StringComparer.OrdinalIgnoreCase)) stack.Push(sub);
            foreach (var f in dir.EnumerateFiles())
                if (TextExt.Contains(f.Extension, StringComparer.OrdinalIgnoreCase) || f.Name.StartsWith(".env") || f.Name.EndsWith("Dockerfile"))
                    yield return f.FullName;
        }
    }

    /// <summary>gitleaks-style rules for high-confidence credential formats.</summary>
    private static readonly (string Rule, Regex Pattern)[] SecretRules =
    [
        ("aws-access-key", new(@"\b(AKIA|ASIA)[0-9A-Z]{16}\b")),
        ("private-key", new(@"-----BEGIN (RSA |EC |DSA |OPENSSH |ENCRYPTED )?PRIVATE KEY-----")),
        ("stripe-live-key", new(@"\b(sk|rk|pk)_live_[0-9A-Za-z]{16,}")),
        ("stripe-webhook-secret", new(@"\bwhsec_[0-9A-Za-z]{24,}")),
        ("anthropic-key", new(@"\bsk-ant-[0-9A-Za-z_\-]{20,}")),
        ("openai-key", new(@"\bsk-(proj-)?[A-Za-z0-9]{40,}")),
        ("github-token", new(@"\b(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36}\b|\bgithub_pat_[A-Za-z0-9_]{60,}")),
        ("google-api-key", new(@"\bAIza[0-9A-Za-z_\-]{35}\b")),
        ("google-oauth-secret", new(@"\bGOCSPX-[0-9A-Za-z_\-]{20,}")),
        ("slack-token", new(@"\bxox[abprs]-[0-9A-Za-z-]{10,}")),
        ("jwt", new(@"\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}")),
        ("connection-string-password", new(@"(?i)\b(password|pwd)\s*=\s*(?!mastemy_dev_pw\b|\$|\{|<|\*|;|"")[^;""'\s]{6,}")),
    ];

    /// <summary>
    /// Paths (relative, '/'-separated) allowed to contain secret-looking values: test fixtures and the reviewed local
    /// development config, which only holds throw-away development values.
    /// </summary>
    private static bool Allowed(string rel) =>
        rel.StartsWith("tests/") || rel.StartsWith("e2e/") || rel == "src/Mastemy.Api/appsettings.Development.json"
        || rel.Contains(".test.") || rel.Contains(".spec.") || rel.StartsWith("docs/security/");

    [Fact]
    public void Repository_contains_no_hardcoded_secrets_outside_test_fixtures()
    {
        var root = RepoRoot();
        var hits = new List<string>();
        foreach (var file in SourceFiles(root))
        {
            var rel = Path.GetRelativePath(root, file).Replace('\\', '/');
            if (Allowed(rel)) continue;
            var lines = File.ReadAllLines(file);
            for (var i = 0; i < lines.Length; i++)
                foreach (var (rule, rx) in SecretRules)
                    if (rx.IsMatch(lines[i])) hits.Add($"{rel}:{i + 1} [{rule}]");
        }
        Assert.True(hits.Count == 0, "Possible hardcoded secrets:\n" + string.Join("\n", hits));
    }

    [Fact]
    public void Production_appsettings_holds_no_secret_values()
    {
        var json = File.ReadAllText(Path.Combine(RepoRoot(), "src/Mastemy.Api/appsettings.json"));
        var secretish = new Regex(@"""(?<k>[A-Za-z]*(Key|Secret|Password|ApiKey|Token))""\s*:\s*""(?<v>[^""]*)""");
        var bad = secretish.Matches(json).Where(m => m.Groups["v"].Value.Length > 0).Select(m => m.Groups["k"].Value).ToList();
        Assert.True(bad.Count == 0, "Secrets must come from environment/secret store, not appsettings.json: " + string.Join(", ", bad));
    }

    [Fact]
    public void Secret_rules_detect_known_formats()
    {
        string[] samples =
        [
            "AKIA" + "ABCDEFGHIJKLMNOP", "sk_live_" + "abcdefghijklmnop1234", "sk-ant-" + "api03-abcdefghijklmnopqrstuv",
            "-----BEGIN " + "RSA PRIVATE KEY-----", "Password=" + "hunter2hunter2;",
        ];
        foreach (var s in samples) Assert.Contains(SecretRules, r => r.Pattern.IsMatch(s));
        Assert.DoesNotContain(SecretRules, r => r.Pattern.IsMatch("Password=mastemy_dev_pw;"));
        Assert.DoesNotContain(SecretRules, r => r.Pattern.IsMatch("Password=${MYSQL_PASSWORD}"));
    }

    // ---------- A03 / A08: dangerous sinks ----------
    private static IEnumerable<(string Rel, string Text)> ApiSources()
    {
        var root = RepoRoot();
        return SourceFiles(Path.Combine(root, "src/Mastemy.Api")).Where(f => f.EndsWith(".cs"))
            .Select(f => (Path.GetRelativePath(root, f).Replace('\\', '/'), File.ReadAllText(f)));
    }

    /// <summary>
    /// Reviewed raw-SQL call sites. Each uses positional {n} parameters for every value; only identifiers derived from the
    /// EF model or fixed bucket expressions are concatenated. A new raw-SQL call fails this test until reviewed.
    /// </summary>
    private static readonly Dictionary<string, int> ReviewedRawSql = new()
    {
        ["src/Mastemy.Api/Modules/Analytics/AnalyticsReports.cs"] = 2, // Buckets + CurrencyBuckets helpers; values always bound as parameters
        ["src/Mastemy.Api/Modules/Operations/Health.cs"] = 1,
        ["src/Mastemy.Api/Modules/Engagement/NotificationService.cs"] = 1,
    };

    [Fact]
    public void Raw_sql_is_limited_to_reviewed_parameterized_call_sites()
    {
        var rx = new Regex(@"\b(FromSqlRaw|ExecuteSqlRaw|ExecuteSqlRawAsync|SqlQueryRaw)\b");
        var found = ApiSources().Select(s => (s.Rel, Count: rx.Matches(s.Text).Count)).Where(x => x.Count > 0)
            .ToDictionary(x => x.Rel, x => x.Count);
        Assert.Equal(ReviewedRawSql.OrderBy(k => k.Key), found.OrderBy(k => k.Key));
        // Interpolated strings passed straight to a raw API would bypass parameterization (reviewed files interpolate only
        // model-derived identifiers; values there use {{n}} placeholders).
        var interp = new Regex(@"(FromSqlRaw|ExecuteSqlRaw(Async)?|SqlQueryRaw<[^>]+>)\(\s*\$""");
        var direct = ApiSources().Where(s => !ReviewedRawSql.ContainsKey(s.Rel) && interp.IsMatch(s.Text)).Select(s => s.Rel).ToList();
        Assert.Empty(direct);
    }

    [Fact]
    public void No_unsafe_deserializers_in_api()
    {
        var rx = new Regex(@"TypeNameHandling|BinaryFormatter|NetDataContractSerializer|LosFormatter|SoapFormatter|JavaScriptSerializer|Newtonsoft\.Json");
        var hits = ApiSources().Where(s => rx.IsMatch(s.Text)).Select(s => s.Rel).ToList();
        Assert.Empty(hits);
    }

    [Theory]
    [InlineData("=SUM(A1)", "'=SUM(A1)")]
    [InlineData("+1", "'+1")]
    [InlineData("-1", "'-1")]
    [InlineData("@cmd", "'@cmd")]
    [InlineData("\tx", "'\tx")]
    [InlineData("plain", "plain")]
    public void Spreadsheet_formulas_are_neutralized(string input, string expected) => Assert.Equal(expected, Csv.Neutralize(input));

    // ---------- A10: SSRF guard ----------
    [Theory]
    [InlineData("127.0.0.1", false)]
    [InlineData("10.0.0.5", false)]
    [InlineData("172.16.0.1", false)]
    [InlineData("172.31.255.255", false)]
    [InlineData("192.168.1.1", false)]
    [InlineData("169.254.169.254", false)] // cloud metadata
    [InlineData("100.64.0.1", false)]
    [InlineData("0.0.0.0", false)]
    [InlineData("224.0.0.1", false)]
    [InlineData("::1", false)]
    [InlineData("fe80::1", false)]
    [InlineData("fd00::1", false)]
    [InlineData("::ffff:127.0.0.1", false)]
    [InlineData("8.8.8.8", true)]
    [InlineData("172.32.0.1", true)]
    [InlineData("2606:4700:4700::1111", true)]
    public void Ssrf_guard_classifies_addresses(string ip, bool isPublic) => Assert.Equal(isPublic, SsrfGuard.IsPublic(IPAddress.Parse(ip)));

    [Theory]
    [InlineData("https://127.0.0.1:9/.well-known/openid-configuration")]
    [InlineData("https://localhost:9/.well-known/openid-configuration")]
    [InlineData("https://169.254.169.254/latest/meta-data")]
    [InlineData("https://[::1]:9/")]
    public async Task Ssrf_guard_refuses_connections_to_internal_addresses(string url)
    {
        using var client = new HttpClient(SsrfGuard.CreateHandler(allowPrivate: false)) { Timeout = TimeSpan.FromSeconds(10) };
        var ex = await Assert.ThrowsAsync<HttpRequestException>(() => client.GetAsync(url));
        Assert.Contains("not allowed", ex.ToString());
    }

    [Fact]
    public void Oidc_urls_must_be_https_unless_insecure_mode()
    {
        Assert.Throws<Mastemy.Api.Modules.Enterprise.SsoException>(() => Mastemy.Api.Modules.Enterprise.OidcMetadataClient.RequireUrl("http://idp.example", false));
        Assert.Throws<Mastemy.Api.Modules.Enterprise.SsoException>(() => Mastemy.Api.Modules.Enterprise.OidcMetadataClient.RequireUrl("file:///etc/passwd", true));
        Mastemy.Api.Modules.Enterprise.OidcMetadataClient.RequireUrl("https://idp.example", false);
    }
}
