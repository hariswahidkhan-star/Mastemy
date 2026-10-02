using System.Net;
using System.Net.Http.Json;
using System.Reflection;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Enterprise;
using Mastemy.Api.Modules.Identity;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.Enterprise;

/// <summary>
/// OIDC SSO: domain verification (DNS TXT / staff approval, public domains refused), no auto-linking of existing accounts
/// (explicit signed-in link flow instead), identities keyed by (org, issuer, sub), login-CSRF browser binding, rate limits
/// and state cleanup.
/// </summary>
public class SsoTests(EnterprisePhase2Fixture f) : IClassFixture<EnterprisePhase2Fixture>
{
    private record OrgCtx(OrgDto Org, User Admin, HttpClient AdminClient, HttpClient Staff);
    public record AuthUserLite(Guid Id, string Email);
    public record AuthResponseLite(string AccessToken, string? RefreshToken, AuthUserLite User);

    private async Task<OrgCtx> NewOrg(int seats = 10)
    {
        var (_, staff) = await f.User(Roles.Admin);
        var tag = Guid.NewGuid().ToString("N")[..12];
        var res = await staff.PostAsJsonAsync("api/admin/orgs", new OrgInput("Org " + tag, "org-" + tag, seats));
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        var org = (await res.Content.ReadFromJsonAsync<OrgDto>())!;
        var (admin, adminClient) = await f.User();
        var inv = await EnterpriseTests.Invite(org, staff, admin.Email, "Admin", "Ops");
        (await EnterpriseTests.Accept(adminClient, inv.Token)).EnsureSuccessStatusCode();
        return new OrgCtx(org, admin, adminClient, staff);
    }

    private static string Domain(string p) => p + Guid.NewGuid().ToString("N")[..8] + ".test";

    private async Task<SsoConfigDto> Put(OrgCtx o, params string[] domains)
    {
        var res = await o.AdminClient.PutAsJsonAsync($"api/orgs/{o.Org.Id}/sso",
            new SsoConfigInput(FakeOidcProvider.Issuer, FakeOidcProvider.ClientId, FakeOidcProvider.ClientSecret, domains.ToList(), true));
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        return (await res.Content.ReadFromJsonAsync<SsoConfigDto>())!;
    }

    /// <summary>Configures SSO and has staff approve every domain.</summary>
    private async Task ConfigureVerified(OrgCtx o, params string[] domains)
    {
        var cfg = await Put(o, domains);
        foreach (var d in cfg.Domains)
            Assert.Equal(HttpStatusCode.OK, (await o.Staff.PostAsJsonAsync($"api/admin/enterprise/sso-domains/{d.Id}/approve", new SsoDomainDecisionInput("ok"))).StatusCode);
    }

    private static string? CookieFrom(HttpResponseMessage res)
    {
        if (!res.Headers.TryGetValues("Set-Cookie", out var values)) return null;
        var c = values.FirstOrDefault(v => v.StartsWith(SsoController.BinderCookie + "=", StringComparison.Ordinal));
        if (c is null) return null;
        Assert.Contains("httponly", c, StringComparison.OrdinalIgnoreCase);
        Assert.Contains("secure", c, StringComparison.OrdinalIgnoreCase);
        Assert.Contains("samesite=lax", c, StringComparison.OrdinalIgnoreCase);
        Assert.Contains("path=/api/sso", c, StringComparison.OrdinalIgnoreCase);
        var v = c[(SsoController.BinderCookie.Length + 1)..].Split(';')[0];
        return v.Length == 0 ? "" : v;
    }

    private static HttpRequestMessage WithBinder(HttpMethod m, string url, string? binder)
    {
        var req = new HttpRequestMessage(m, url);
        if (binder is not null) req.Headers.Add("Cookie", $"{SsoController.BinderCookie}={binder}");
        return req;
    }

    private record Started(string State, string Nonce, string Challenge, string Binder);

    private static Started Parse(string url, string binder)
    {
        Assert.StartsWith(FakeOidcProvider.Issuer + "/authorize?", url);
        var q = QueryHelpers.ParseQuery(new Uri(url).Query);
        return new Started(q["state"].ToString(), q["nonce"].ToString(), q["code_challenge"].ToString(), binder);
    }

    private async Task<Started> Start(OrgCtx o, string? returnTo = null)
    {
        var res = await f.Anonymous().GetAsync($"api/sso/{o.Org.Slug}/start" + (returnTo is null ? "" : "?returnTo=" + Uri.EscapeDataString(returnTo)));
        Assert.Equal(HttpStatusCode.Redirect, res.StatusCode);
        var binder = CookieFrom(res);
        Assert.False(string.IsNullOrEmpty(binder));
        return Parse(res.Headers.Location!.ToString(), binder!);
    }

    private record Completion(Dictionary<string, string> Query, string? Binder);

    private async Task<Completion> Callback(string state, string code, string? binder)
    {
        var res = await f.Anonymous().SendAsync(WithBinder(HttpMethod.Get, $"api/sso/callback?code={code}&state={Uri.EscapeDataString(state)}", binder));
        Assert.Equal(HttpStatusCode.Redirect, res.StatusCode);
        var loc = res.Headers.Location!.ToString();
        Assert.StartsWith(EnterprisePhase2Fixture.CompletionUrl, loc);
        return new Completion(QueryHelpers.ParseQuery(new Uri(loc).Query).ToDictionary(kv => kv.Key, kv => kv.Value.ToString()), CookieFrom(res));
    }

    private async Task<Completion> Login(OrgCtx o, Func<string, Dictionary<string, object>> claims)
    {
        var s = await Start(o);
        return await Callback(s.State, f.Idp.IssueCode(s.Challenge, f.Idp.SignIdToken(claims(s.Nonce))), s.Binder);
    }

    private async Task<HttpResponseMessage> ExchangeRaw(string handoff, string? binder)
    {
        var req = WithBinder(HttpMethod.Post, "api/sso/exchange", binder);
        req.Content = JsonContent.Create(new SsoExchangeInput(handoff));
        return await f.Anonymous().SendAsync(req);
    }

    private async Task<AuthResponseLite> Exchange(Completion c)
    {
        Assert.True(c.Query.ContainsKey("handoff"), string.Join(",", c.Query.Select(kv => kv.Key + "=" + kv.Value)));
        var res = await ExchangeRaw(c.Query["handoff"], c.Binder);
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        Assert.Equal("", CookieFrom(res)); // the binder is cleared
        return (await res.Content.ReadFromJsonAsync<AuthResponseLite>())!;
    }

    private async Task<User> VerifiedUser(string email, params string[] roles)
    {
        var (u, _) = await f.UserWithEmail(email, roles);
        await f.Db(async d =>
        {
            d.Set<UserSecurity>().Add(new UserSecurity { UserId = u.Id, EmailVerifiedAt = DateTime.UtcNow, VerifiedEmail = u.NormalizedEmail });
            await d.SaveChangesAsync();
        });
        return u;
    }

    private async Task<Started> StartLink(User u, OrgCtx o)
    {
        var res = await f.Browserless(u).PostAsJsonAsync($"api/sso/{o.Org.Slug}/link/start", new SsoLinkStartInput("/me/security"));
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        var binder = CookieFrom(res);
        Assert.False(string.IsNullOrEmpty(binder));
        return Parse((await res.Content.ReadFromJsonAsync<SsoLinkStartDto>())!.AuthorizationUrl, binder!);
    }

    // ---------------- configuration + domain verification ----------------

    [Fact]
    public async Task Config_is_admin_only_secret_hidden_and_domains_start_pending()
    {
        var o = await NewOrg();
        var (m, mc) = await f.User();
        var inv = await EnterpriseTests.Invite(o.Org, o.AdminClient, m.Email, "Manager", "Ops");
        (await EnterpriseTests.Accept(mc, inv.Token)).EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.Forbidden, (await mc.PutAsJsonAsync($"api/orgs/{o.Org.Id}/sso", new SsoConfigInput(FakeOidcProvider.Issuer, "c", "s", ["acme.test"], true))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await o.AdminClient.PutAsJsonAsync($"api/orgs/{o.Org.Id}/sso", new SsoConfigInput("http://idp.test", "c", "s", ["acme.test"], true))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await o.AdminClient.PutAsJsonAsync($"api/orgs/{o.Org.Id}/sso", new SsoConfigInput(FakeOidcProvider.Issuer, "c", "s", ["not a domain"], true))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await o.AdminClient.PutAsJsonAsync($"api/orgs/{o.Org.Id}/sso", new SsoConfigInput(FakeOidcProvider.Issuer, "c", null, ["acme.test"], true))).StatusCode);
        var domain = Domain("acme");
        var cfg = await Put(o, domain);
        var row = Assert.Single(cfg.Domains);
        Assert.Equal("Pending", row.Status);
        Assert.Equal("_mastemy-sso." + domain, row.TxtRecordName);
        Assert.StartsWith("mastemy-sso-verify=", row.TxtRecordValue);
        var json = await o.AdminClient.GetStringAsync($"api/orgs/{o.Org.Id}/sso");
        Assert.DoesNotContain(FakeOidcProvider.ClientSecret, json);
        Assert.Contains("\"hasClientSecret\":true", json);
        // Re-saving keeps the token (the TXT record stays valid); removing a domain drops its row.
        var again = await Put(o, domain, "second-" + domain);
        Assert.Equal(row.TxtRecordValue, again.Domains.Single(d => d.Domain == domain).TxtRecordValue);
        Assert.Equal(domain, Assert.Single((await Put(o, domain)).Domains).Domain);
        var other = await NewOrg();
        Assert.Equal(HttpStatusCode.NotFound, (await other.AdminClient.GetAsync($"api/orgs/{o.Org.Id}/sso")).StatusCode);
    }

    [Theory]
    [InlineData("gmail.com")]
    [InlineData("outlook.com")]
    [InlineData("hotmail.com")]
    [InlineData("yahoo.com")]
    [InlineData("icloud.com")]
    [InlineData("proton.me")]
    [InlineData("protonmail.com")]
    [InlineData("aol.com")]
    [InlineData("gmx.de")]
    [InlineData("gmx.net")]
    [InlineData("mail.ru")]
    [InlineData("yandex.ru")]
    [InlineData("yandex.com.tr")]
    [InlineData("qq.com")]
    [InlineData("163.com")]
    [InlineData("yahoo.co.uk")]
    [InlineData("hotmail.fr")]
    public async Task Public_email_domains_can_never_be_allowed(string domain)
    {
        Assert.True(PublicEmailDomains.IsPublic(domain));
        var o = await NewOrg();
        var res = await o.AdminClient.PutAsJsonAsync($"api/orgs/{o.Org.Id}/sso",
            new SsoConfigInput(FakeOidcProvider.Issuer, FakeOidcProvider.ClientId, FakeOidcProvider.ClientSecret, ["corp.example", domain], true));
        Assert.Equal(HttpStatusCode.BadRequest, res.StatusCode);
        Assert.Contains("public_email_domain", await res.Content.ReadAsStringAsync());
    }

    [Theory]
    [InlineData("acme.com")]
    [InlineData("mail.acme.com")]
    [InlineData("university.edu.sa")]
    [InlineData("gmxtools.de")]
    public void Company_domains_are_not_public(string domain) => Assert.False(PublicEmailDomains.IsPublic(domain));

    [Fact]
    public async Task Pending_domain_is_not_honoured_until_dns_verification()
    {
        var o = await NewOrg();
        var domain = Domain("dns");
        var row = Assert.Single((await Put(o, domain)).Domains);
        Assert.Equal("sso_domain_not_allowed", (await Login(o, n => FakeOidcProvider.Claims(n, "p-1", "a@" + domain))).Query["error"]);
        Assert.False(await f.Db(d => d.Users.AnyAsync(u => u.NormalizedEmail == "a@" + domain)));

        var verify = $"api/orgs/{o.Org.Id}/sso/domains/{row.Id}/verify";
        // Only the org Admin may verify.
        var (_, oc) = await f.User();
        Assert.Equal(HttpStatusCode.NotFound, (await oc.PostAsync(verify, null)).StatusCode);
        // No record yet / wrong value.
        var res = await o.AdminClient.PostAsync(verify, null);
        Assert.Equal(HttpStatusCode.Conflict, res.StatusCode);
        Assert.Contains("domain_verification_failed", await res.Content.ReadAsStringAsync());
        f.Dns.Txt["_mastemy-sso." + domain] = ["something-else"];
        Assert.Equal(HttpStatusCode.Conflict, (await o.AdminClient.PostAsync(verify, null)).StatusCode);
        // Resolver down → 503, never a fake success.
        f.Dns.Down = true;
        try
        {
            var down = await o.AdminClient.PostAsync(verify, null);
            Assert.Equal(HttpStatusCode.ServiceUnavailable, down.StatusCode);
            Assert.Contains("dns_unavailable", await down.Content.ReadAsStringAsync());
        }
        finally { f.Dns.Down = false; }

        f.Dns.Txt["_mastemy-sso." + domain] = ["v=spf1 -all", row.TxtRecordValue];
        var ok = (await (await o.AdminClient.PostAsync(verify, null)).Content.ReadFromJsonAsync<SsoDomainDto>())!;
        Assert.Equal("Verified", ok.Status);
        Assert.Equal("dns", ok.VerifiedVia);
        Assert.True(await f.Db(d => d.AuditLogs.AnyAsync(a => a.Action == "org.sso.domain_verified" && a.EntityId == o.Org.Id.ToString())));
        Assert.True((await Login(o, n => FakeOidcProvider.Claims(n, "p-2", "a@" + domain))).Query.ContainsKey("handoff"));

        // A second organization cannot claim the same domain.
        var other = await NewOrg();
        var otherRow = Assert.Single((await Put(other, domain)).Domains);
        f.Dns.Txt["_mastemy-sso." + domain] = [otherRow.TxtRecordValue];
        var claimed = await other.AdminClient.PostAsync($"api/orgs/{other.Org.Id}/sso/domains/{otherRow.Id}/verify", null);
        Assert.Equal(HttpStatusCode.Conflict, claimed.StatusCode);
        Assert.Contains("domain_claimed", await claimed.Content.ReadAsStringAsync());
        Assert.Equal(HttpStatusCode.Conflict, (await other.Staff.PostAsJsonAsync($"api/admin/enterprise/sso-domains/{otherRow.Id}/approve", new SsoDomainDecisionInput(null))).StatusCode);
        Assert.Equal("sso_domain_not_allowed", (await Login(other, n => FakeOidcProvider.Claims(n, "p-3", "b@" + domain))).Query["error"]);
    }

    [Fact]
    public async Task Staff_approve_and_reject_domains_with_audit()
    {
        var o = await NewOrg();
        var domain = Domain("staff");
        var row = Assert.Single((await Put(o, domain)).Domains);
        Assert.Equal(HttpStatusCode.Forbidden, (await o.AdminClient.GetAsync("api/admin/enterprise/sso-domains")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await o.AdminClient.PostAsJsonAsync($"api/admin/enterprise/sso-domains/{row.Id}/approve", new SsoDomainDecisionInput(null))).StatusCode);
        var pending = await o.Staff.GetFromJsonAsync<List<StaffSsoDomainDto>>("api/admin/enterprise/sso-domains?status=Pending");
        var listed = Assert.Single(pending!, p => p.Id == row.Id);
        Assert.Equal(o.Org.Slug, listed.OrganizationSlug);
        Assert.Equal(HttpStatusCode.BadRequest, (await o.Staff.GetAsync("api/admin/enterprise/sso-domains?status=Bogus")).StatusCode);

        // Reject needs a reason; a rejected domain cannot be self-verified.
        Assert.Equal(HttpStatusCode.BadRequest, (await o.Staff.PostAsJsonAsync($"api/admin/enterprise/sso-domains/{row.Id}/reject", new SsoDomainDecisionInput(""))).StatusCode);
        var rej = await o.Staff.PostAsJsonAsync($"api/admin/enterprise/sso-domains/{row.Id}/reject", new SsoDomainDecisionInput("Not your domain"));
        Assert.Equal("Rejected", (await rej.Content.ReadFromJsonAsync<StaffSsoDomainDto>())!.Status);
        f.Dns.Txt["_mastemy-sso." + domain] = [row.TxtRecordValue];
        var self = await o.AdminClient.PostAsync($"api/orgs/{o.Org.Id}/sso/domains/{row.Id}/verify", null);
        Assert.Equal(HttpStatusCode.Conflict, self.StatusCode);
        Assert.Contains("domain_rejected", await self.Content.ReadAsStringAsync());
        Assert.Equal("Rejected", (await o.AdminClient.GetFromJsonAsync<SsoConfigDto>($"api/orgs/{o.Org.Id}/sso"))!.Domains.Single().Status);
        Assert.Equal("sso_domain_not_allowed", (await Login(o, n => FakeOidcProvider.Claims(n, "st-1", "a@" + domain))).Query["error"]);

        var ok = await o.Staff.PostAsJsonAsync($"api/admin/enterprise/sso-domains/{row.Id}/approve", new SsoDomainDecisionInput("Checked contract"));
        var dto = (await ok.Content.ReadFromJsonAsync<StaffSsoDomainDto>())!;
        Assert.Equal("Verified", dto.Status);
        Assert.Equal("staff", dto.VerifiedVia);
        Assert.True(await f.Db(d => d.AuditLogs.AnyAsync(a => a.Action == "org.sso.domain_rejected" && a.EntityId == o.Org.Id.ToString())));
        Assert.True(await f.Db(d => d.AuditLogs.AnyAsync(a => a.Action == "org.sso.domain_approved" && a.EntityId == o.Org.Id.ToString())));
        Assert.True((await Login(o, n => FakeOidcProvider.Claims(n, "st-2", "a@" + domain))).Query.ContainsKey("handoff"));
    }

    // ---------------- login, linking, identity keys ----------------

    [Fact]
    public async Task Jit_provisions_new_email_and_matches_later_logins_on_sub_not_email()
    {
        var o = await NewOrg();
        var domain = Domain("jit");
        await ConfigureVerified(o, domain);
        var email = "new.user@" + domain;
        var s = await Start(o, "/learn/dashboard");
        var c = await Callback(s.State, f.Idp.IssueCode(s.Challenge, f.Idp.SignIdToken(FakeOidcProvider.Claims(s.Nonce, "sub-1", email))), s.Binder);
        Assert.Equal("/learn/dashboard", c.Query["returnTo"]);
        Assert.False(string.IsNullOrEmpty(c.Binder));
        Assert.NotEqual(s.Binder, c.Binder); // rotated for the handoff
        var auth = await Exchange(c);
        Assert.Equal(email, auth.User.Email);
        Assert.Equal(HttpStatusCode.Unauthorized, (await ExchangeRaw(c.Query["handoff"], c.Binder)).StatusCode); // single use
        Assert.Equal("sso_invalid_state", (await Callback(s.State, "whatever", s.Binder)).Query["error"]); // no replay
        Assert.Equal(OrgRole.Member, (await f.Db(d => d.OrganizationMembers.AsNoTracking().FirstAsync(m => m.OrganizationId == o.Org.Id && m.UserId == auth.User.Id))).Role);

        // Same sub with a changed email still resolves to the same account.
        var renamed = await Login(o, n => FakeOidcProvider.Claims(n, "sub-1", "renamed@" + domain));
        Assert.Equal(auth.User.Id, (await Exchange(renamed)).User.Id);
        // A different sub presenting the existing email is NOT signed into that account.
        Assert.Equal("sso_link_required", (await Login(o, n => FakeOidcProvider.Claims(n, "sub-attacker", email))).Query["error"]);
        Assert.Equal(1, await f.Db(d => d.Set<SsoIdentity>().CountAsync(i => i.UserId == auth.User.Id)));

        // Identities are keyed by issuer too: a row for the same sub under another issuer never matches.
        var (victim, _) = await f.User();
        await f.Db(async d =>
        {
            d.Set<SsoIdentity>().Add(new SsoIdentity { OrganizationId = o.Org.Id, Issuer = "https://old-idp.test", IssuerHash = Mastemy.Api.Infrastructure.Tokens.Sha256("https://old-idp.test"), Subject = "sub-2", UserId = victim.Id });
            await d.SaveChangesAsync();
        });
        var fresh = await Exchange(await Login(o, n => FakeOidcProvider.Claims(n, "sub-2", "other@" + domain)));
        Assert.NotEqual(victim.Id, fresh.User.Id);
    }

    [Fact]
    public async Task Existing_account_is_never_auto_linked_and_links_only_from_its_own_session()
    {
        var o = await NewOrg();
        var domain = Domain("link");
        await ConfigureVerified(o, domain);
        var user = await VerifiedUser("u2@" + domain);

        // Org-controlled IdP asserting the user's email cannot take over the account.
        Assert.Equal("sso_link_required", (await Login(o, n => FakeOidcProvider.Claims(n, "l-1", user.Email))).Query["error"]);
        Assert.False(await f.Db(d => d.Set<SsoIdentity>().AnyAsync(i => i.UserId == user.Id)));
        Assert.False(await f.Db(d => d.OrganizationMembers.AnyAsync(m => m.UserId == user.Id)));

        // Link start needs a session and a verified email.
        Assert.Equal(HttpStatusCode.Unauthorized, (await f.Anonymous().PostAsJsonAsync($"api/sso/{o.Org.Slug}/link/start", new SsoLinkStartInput(null))).StatusCode);
        var (unverified, _) = await f.UserWithEmail("u1@" + domain);
        var uv = await f.Browserless(unverified).PostAsJsonAsync($"api/sso/{o.Org.Slug}/link/start", new SsoLinkStartInput(null));
        Assert.Equal(HttpStatusCode.Forbidden, uv.StatusCode);
        Assert.Contains("sso_link_requires_verified_email", await uv.Content.ReadAsStringAsync());

        // IdP email must equal the signed-in user's email.
        var bad = await StartLink(user, o);
        Assert.Equal("sso_link_email_mismatch", (await Callback(bad.State, f.Idp.IssueCode(bad.Challenge, f.Idp.SignIdToken(FakeOidcProvider.Claims(bad.Nonce, "l-2", "someone@" + domain))), bad.Binder)).Query["error"]);

        // The explicit link binds the IdP identity to the session user.
        var link = await StartLink(user, o);
        var done = await Callback(link.State, f.Idp.IssueCode(link.Challenge, f.Idp.SignIdToken(FakeOidcProvider.Claims(link.Nonce, "l-2", user.Email))), link.Binder);
        Assert.Equal(o.Org.Slug, done.Query["linked"]);
        Assert.Equal("/me/security", done.Query["returnTo"]);
        Assert.False(done.Query.ContainsKey("handoff"));
        Assert.True(await f.Db(d => d.Set<SsoIdentity>().AnyAsync(i => i.UserId == user.Id && i.Subject == "l-2" && i.OrganizationId == o.Org.Id)));
        Assert.True(await f.Db(d => d.OrganizationMembers.AnyAsync(m => m.UserId == user.Id && m.OrganizationId == o.Org.Id)));
        Assert.True(await f.Db(d => d.AuditLogs.AnyAsync(a => a.Action == "sso.identity_linked" && a.EntityId == user.Id.ToString())));
        // From now on SSO signs into that account.
        Assert.Equal(user.Id, (await Exchange(await Login(o, n => FakeOidcProvider.Claims(n, "l-2", user.Email)))).User.Id);

        // That IdP identity cannot be linked to a second account.
        var other = await VerifiedUser("u3@" + domain);
        var steal = await StartLink(other, o);
        Assert.Equal("sso_link_email_mismatch", (await Callback(steal.State, f.Idp.IssueCode(steal.Challenge, f.Idp.SignIdToken(FakeOidcProvider.Claims(steal.Nonce, "l-2", user.Email))), steal.Binder)).Query["error"]);
        var steal2 = await StartLink(other, o);
        Assert.Equal("sso_identity_in_use", (await Callback(steal2.State, f.Idp.IssueCode(steal2.Challenge, f.Idp.SignIdToken(FakeOidcProvider.Claims(steal2.Nonce, "l-2", other.Email))), steal2.Binder)).Query["error"]);

        // Privileged accounts can't link (or sign in) through SSO.
        var admin = await VerifiedUser("boss@" + domain, Roles.Admin);
        var priv = await f.Browserless(admin).PostAsJsonAsync($"api/sso/{o.Org.Slug}/link/start", new SsoLinkStartInput(null));
        Assert.Equal(HttpStatusCode.Forbidden, priv.StatusCode);
        Assert.Contains("sso_privileged_not_allowed", await priv.Content.ReadAsStringAsync());
    }

    // ---------------- login CSRF ----------------

    [Fact]
    public async Task Callback_and_exchange_require_the_browser_binder_cookie()
    {
        var o = await NewOrg();
        var domain = Domain("csrf");
        await ConfigureVerified(o, domain);
        var s = await Start(o);
        var code = f.Idp.IssueCode(s.Challenge, f.Idp.SignIdToken(FakeOidcProvider.Claims(s.Nonce, "c-1", "c@" + domain)));
        // An attacker forwarding their own callback URL to a victim: the victim's browser has no (or another) binder.
        var noCookie = await Callback(s.State, code, null);
        Assert.Equal("sso_session_mismatch", noCookie.Query["error"]);
        Assert.Equal("", noCookie.Binder); // cleared
        var other = await Start(o);
        Assert.Equal("sso_session_mismatch", (await Callback(s.State, code, other.Binder)).Query["error"]);
        // The rightful browser can still finish (the state was not burnt by the mismatches).
        var ok = await Callback(s.State, code, s.Binder);
        Assert.True(ok.Query.ContainsKey("handoff"));
        // The handoff is bound to the browser too.
        var res = await ExchangeRaw(ok.Query["handoff"], null);
        Assert.Equal(HttpStatusCode.Unauthorized, res.StatusCode);
        Assert.Contains("sso_session_mismatch", await res.Content.ReadAsStringAsync());
        Assert.Equal(HttpStatusCode.Unauthorized, (await ExchangeRaw(ok.Query["handoff"], s.Binder)).StatusCode); // the start binder is not the handoff binder
        Assert.Equal("c@" + domain, (await Exchange(ok)).User.Email);
    }

    // ---------------- rate limiting, cleanup, start ----------------

    [Fact]
    public void Sso_start_endpoints_are_rate_limited()
    {
        foreach (var name in new[] { nameof(SsoController.Start), nameof(SsoController.LinkStart), nameof(SsoController.Exchange) })
        {
            var attr = typeof(SsoController).GetMethod(name)!.GetCustomAttribute<EnableRateLimitingAttribute>();
            Assert.Equal("auth", attr?.PolicyName);
        }
    }

    [Fact]
    public async Task Expired_login_states_are_purged()
    {
        var o = await NewOrg();
        var now = DateTime.UtcNow;
        string Row(DateTime exp, DateTime? handoffExp)
        {
            var h = Guid.NewGuid().ToString("N");
            f.Db(async d =>
            {
                d.Set<SsoLoginState>().Add(new SsoLoginState { StateHash = h, OrganizationId = o.Org.Id, ExpiresAt = exp, HandoffExpiresAt = handoffExp,
                    HandoffHash = handoffExp is null ? null : Guid.NewGuid().ToString("N") });
                await d.SaveChangesAsync();
            }).GetAwaiter().GetResult();
            return h;
        }
        var expired = Row(now.AddMinutes(-5), null);
        var expiredHandoff = Row(now.AddMinutes(-20), now.AddMinutes(-15));
        var live = Row(now.AddMinutes(5), null);
        var liveHandoff = Row(now.AddMinutes(-1), now.AddMinutes(1));
        await f.Db(d => SsoStateCleanup.Purge(d, now));
        var left = await f.Db(d => d.Set<SsoLoginState>().Select(s => s.StateHash).ToListAsync());
        Assert.DoesNotContain(expired, left);
        Assert.DoesNotContain(expiredHandoff, left);
        Assert.Contains(live, left);
        Assert.Contains(liveHandoff, left);
        Assert.True(SsoStateCleanup.Interval <= TimeSpan.FromHours(1));
        Assert.Contains(f.Factory.Services.GetServices<Microsoft.Extensions.Hosting.IHostedService>(), h => h is SsoStateCleanup);
    }

    [Fact]
    public async Task Start_requires_enabled_config_and_seat()
    {
        var o = await NewOrg(seats: 1); // the admin already uses the only seat
        Assert.Equal(HttpStatusCode.NotFound, (await f.Anonymous().GetAsync($"api/sso/{o.Org.Slug}/start")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await f.Anonymous().GetAsync("api/sso/no-such-org/start")).StatusCode);
        var domain = Domain("full");
        await ConfigureVerified(o, domain);
        Assert.Equal("seat_limit_reached", (await Login(o, n => FakeOidcProvider.Claims(n, "f-1", "a@" + domain))).Query["error"]);
        Assert.False(await f.Db(d => d.Users.AnyAsync(u => u.NormalizedEmail == "a@" + domain)));
        Assert.Equal(HttpStatusCode.NoContent, (await o.AdminClient.DeleteAsync($"api/orgs/{o.Org.Id}/sso")).StatusCode);
        Assert.False(await f.Db(d => d.Set<OrgSsoDomain>().AnyAsync(x => x.OrganizationId == o.Org.Id)));
        Assert.Equal(HttpStatusCode.NotFound, (await f.Anonymous().GetAsync($"api/sso/{o.Org.Slug}/start")).StatusCode);
    }

    [Fact]
    public async Task Rejects_bad_tokens_and_unverified_email()
    {
        var o = await NewOrg();
        var domain = Domain("corp");
        await ConfigureVerified(o, domain);
        var email = "x@" + domain;
        Assert.Equal("sso_domain_not_allowed", (await Login(o, n => FakeOidcProvider.Claims(n, "s-a", "x@evil.test"))).Query["error"]);
        Assert.Equal("sso_domain_not_allowed", (await Login(o, n => FakeOidcProvider.Claims(n, "s-a2", "x@gmail.com"))).Query["error"]);
        Assert.Equal("sso_email_unverified", (await Login(o, n => FakeOidcProvider.Claims(n, "s-b", email, verified: false))).Query["error"]);
        Assert.Equal("sso_invalid_token", (await Login(o, _ => FakeOidcProvider.Claims("wrong-nonce", "s-c", email))).Query["error"]);
        Assert.Equal("sso_invalid_token", (await Login(o, n => FakeOidcProvider.Claims(n, "s-d", email, aud: "someone-else"))).Query["error"]);
        Assert.Equal("sso_invalid_token", (await Login(o, n => FakeOidcProvider.Claims(n, "s-e", email, iss: "https://evil.test"))).Query["error"]);
        Assert.Equal("sso_invalid_token", (await Login(o, n => FakeOidcProvider.Claims(n, "s-f", email, exp: DateTime.UtcNow.AddMinutes(-10)))).Query["error"]);
        using var attacker = System.Security.Cryptography.RSA.Create(2048);
        var sa = await Start(o);
        Assert.Equal("sso_invalid_token", (await Callback(sa.State, f.Idp.IssueCode(sa.Challenge, f.Idp.SignIdToken(FakeOidcProvider.Claims(sa.Nonce, "s-g", email), attacker)), sa.Binder)).Query["error"]);
        var sb = await Start(o);
        Assert.Equal("sso_invalid_token", (await Callback(sb.State, f.Idp.IssueCode(sb.Challenge, f.Idp.SignIdToken(FakeOidcProvider.Claims(sb.Nonce, "s-h", email), alg: Microsoft.IdentityModel.Tokens.SecurityAlgorithms.RsaSha512)), sb.Binder)).Query["error"]);
        Assert.Equal("sso_invalid_state", (await Callback("forged-state", "code", "x")).Query["error"]);
        var s = await Start(o);
        Assert.Equal("sso_token_exchange_failed", (await Callback(s.State, f.Idp.IssueCode("other-challenge", f.Idp.SignIdToken(FakeOidcProvider.Claims(s.Nonce, "s-i", email))), s.Binder)).Query["error"]);
        Assert.False(await f.Db(d => d.Users.AnyAsync(u => u.NormalizedEmail == email)));

        // Key rotation: a token signed with a new key is accepted after the JWKS refetch.
        f.Idp.RotateKey();
        await Task.Delay(TimeSpan.FromSeconds(31)); // JWKS refetch throttle
        Assert.True((await Login(o, n => FakeOidcProvider.Claims(n, "s-j", email))).Query.ContainsKey("handoff"));
    }

    // ---------------- DNS wire format ----------------

    [Fact]
    public void Dns_txt_query_and_response_round_trip()
    {
        const string name = "_mastemy-sso.acme.test";
        var q = SystemDnsTxtResolver.BuildQuery(0x1234, name);
        Assert.Equal(0x12, q[0]);
        Assert.Equal(0x34, q[1]);
        Assert.Equal(new byte[] { 0, 16, 0, 1 }, q[^4..]);
        // Response = header (QR, RD, RA; 1 question, 2 answers) + echoed question + two TXT answers using name compression.
        var resp = new List<byte> { 0x12, 0x34, 0x81, 0x80, 0, 1, 0, 2, 0, 0, 0, 0 };
        resp.AddRange(q[12..]);
        void Txt(params string[] parts)
        {
            var rdata = parts.SelectMany(p => new[] { (byte)p.Length }.Concat(System.Text.Encoding.ASCII.GetBytes(p))).ToArray();
            resp.AddRange([0xC0, 12, 0, 16, 0, 1, 0, 0, 0, 60, (byte)(rdata.Length >> 8), (byte)rdata.Length]);
            resp.AddRange(rdata);
        }
        Txt("mastemy-sso-verify=", "abc");
        Txt("v=spf1 -all");
        Assert.Equal(["mastemy-sso-verify=abc", "v=spf1 -all"], SystemDnsTxtResolver.ParseTxtResponse(resp.ToArray(), 0x1234, name));
        Assert.Null(SystemDnsTxtResolver.ParseTxtResponse(resp.ToArray(), 0x9999, name)); // wrong id
        Assert.Null(SystemDnsTxtResolver.ParseTxtResponse(resp.ToArray(), 0x1234, "_mastemy-sso.other.test")); // wrong question
        var nx = resp.Take(12).Concat(q[12..]).ToArray();
        nx[3] = 0x83; nx[7] = 0; // NXDOMAIN, no answers
        Assert.Empty(SystemDnsTxtResolver.ParseTxtResponse(nx, 0x1234, name)!);
        var truncated = resp.ToArray();
        truncated[2] |= 0x02;
        Assert.Throws<DnsLookupException>(() => SystemDnsTxtResolver.ParseTxtResponse(truncated, 0x1234, name));
    }
}
