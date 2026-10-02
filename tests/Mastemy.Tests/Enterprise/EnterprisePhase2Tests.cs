using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Commerce;
using Mastemy.Api.Modules.Enterprise;
using Mastemy.Api.Modules.Taxonomy;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.Enterprise;

public class EnterprisePhase2Tests(EnterprisePhase2Fixture f) : IClassFixture<EnterprisePhase2Fixture>
{
    internal record OrgCtx(OrgDto Org, User Admin, HttpClient AdminClient, HttpClient Staff);

    private async Task<OrgCtx> NewOrg(int seats = 10)
    {
        var (_, staff) = await f.User(Roles.Admin);
        var tag = Guid.NewGuid().ToString("N")[..12];
        var res = await staff.PostAsJsonAsync("api/admin/orgs", new OrgInput("Org " + tag, "org-" + tag, seats));
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        var org = (await res.Content.ReadFromJsonAsync<OrgDto>())!;
        var (admin, adminClient) = await f.User();
        await Join(org, staff, admin, adminClient, "Ops", "Admin");
        return new OrgCtx(org, admin, adminClient, staff);
    }

    private static async Task Join(OrgDto org, HttpClient by, User u, HttpClient uc, string dept = "", string role = "Member")
    {
        var inv = await EnterpriseTests.Invite(org, by, u.Email, role, dept);
        (await EnterpriseTests.Accept(uc, inv.Token)).EnsureSuccessStatusCode();
    }

    private async Task<(User U, HttpClient C)> Member(OrgCtx o, string dept = "", string role = "Member")
    {
        var (u, c) = await f.User();
        await Join(o.Org, o.AdminClient, u, c, dept, role);
        return (u, c);
    }

    private async Task<Pathway> NewPathway(bool published, params Guid[] courseIds)
    {
        var p = new Pathway { Slug = "p-" + Guid.NewGuid().ToString("N")[..10], TitleEn = "Path", TitleAr = "مسار", IsPublished = published };
        await f.Db(async d =>
        {
            d.Set<Pathway>().Add(p);
            for (var i = 0; i < courseIds.Length; i++) d.Set<PathwayCourse>().Add(new PathwayCourse { PathwayId = p.Id, CourseId = courseIds[i], SortOrder = i });
            await d.SaveChangesAsync();
        });
        return p;
    }

    // ---------------- pathways ----------------

    [Fact]
    public async Task Pathway_assignment_expands_to_live_courses_with_one_due_date()
    {
        var o = await NewOrg();
        var (manager, mc) = await Member(o, "Ops", "Manager");
        var (sales, _) = await Member(o, "Sales");
        var (ops, _) = await Member(o, "Ops");
        var c1 = await f.LiveCourse();
        var c2 = await f.LiveCourse();
        var draft = await f.LiveCourse(live: false);
        var path = await NewPathway(true, c1.Id, c2.Id, draft.Id);
        var hidden = await NewPathway(false, c1.Id);
        var due = DateTime.UtcNow.AddDays(30);

        Assert.Equal(HttpStatusCode.NotFound, (await mc.PostAsJsonAsync($"api/orgs/{o.Org.Id}/pathway-assignments", new PathwayAssignmentInput(hidden.Id, null, "Ops", due, false))).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await mc.PostAsJsonAsync($"api/orgs/{o.Org.Id}/pathway-assignments", new PathwayAssignmentInput(path.Id, null, "Ops", due, true))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await mc.PostAsJsonAsync($"api/orgs/{o.Org.Id}/pathway-assignments", new PathwayAssignmentInput(path.Id, null, "Ops", DateTime.UtcNow.AddDays(-1), false))).StatusCode);

        var res = await o.AdminClient.PostAsJsonAsync($"api/orgs/{o.Org.Id}/pathway-assignments", new PathwayAssignmentInput(path.Id, null, "Ops", due, true));
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        var pa = (await res.Content.ReadFromJsonAsync<PathwayAssignmentDto>())!;
        Assert.Equal(new[] { c1.Id, c2.Id }.OrderBy(x => x), pa.CourseIds.OrderBy(x => x));
        var rows = await f.Db(d => d.OrganizationAssignments.Where(a => a.OrganizationId == o.Org.Id).ToListAsync());
        Assert.Equal(2, rows.Count);
        Assert.All(rows, r => Assert.Equal(due, r.DueAt!.Value, TimeSpan.FromSeconds(1)));
        Assert.All(rows, r => Assert.Equal("Ops", r.Department));
        // Premium granted to the Ops member only.
        Assert.True(await f.Db(d => d.Entitlements.AnyAsync(e => e.UserId == ops.Id && e.CourseId == c1.Id && e.RevokedAt == null)));
        Assert.False(await f.Db(d => d.Entitlements.AnyAsync(e => e.UserId == sales.Id && e.RevokedAt == null)));
        Assert.Equal(HttpStatusCode.Conflict, (await o.AdminClient.PostAsJsonAsync($"api/orgs/{o.Org.Id}/pathway-assignments", new PathwayAssignmentInput(path.Id, null, "Ops", due, true))).StatusCode);
        Assert.Single((await mc.GetFromJsonAsync<List<PathwayAssignmentDto>>($"api/orgs/{o.Org.Id}/pathway-assignments"))!);

        // Another org's admin cannot see or touch it.
        var other = await NewOrg();
        Assert.Equal(HttpStatusCode.NotFound, (await other.AdminClient.GetAsync($"api/orgs/{o.Org.Id}/pathway-assignments")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await other.AdminClient.DeleteAsync($"api/orgs/{o.Org.Id}/pathway-assignments/{pa.Id}")).StatusCode);

        Assert.Equal(HttpStatusCode.Forbidden, (await mc.DeleteAsync($"api/orgs/{o.Org.Id}/pathway-assignments/{pa.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.NoContent, (await o.AdminClient.DeleteAsync($"api/orgs/{o.Org.Id}/pathway-assignments/{pa.Id}")).StatusCode);
        Assert.False(await f.Db(d => d.OrganizationAssignments.AnyAsync(a => a.OrganizationId == o.Org.Id)));
        Assert.False(await f.Db(d => d.Entitlements.AnyAsync(e => e.UserId == ops.Id && e.RevokedAt == null)));
        Assert.True(await f.Db(d => d.AuditLogs.AnyAsync(a => a.Action == "org.pathway_assignment.deleted" && a.EntityId == o.Org.Id.ToString())));
        _ = manager;
    }

    [Fact]
    public async Task Pathway_without_live_courses_is_rejected()
    {
        var o = await NewOrg();
        var draft = await f.LiveCourse(live: false);
        var path = await NewPathway(true, draft.Id);
        var res = await o.AdminClient.PostAsJsonAsync($"api/orgs/{o.Org.Id}/pathway-assignments", new PathwayAssignmentInput(path.Id, null, null, null, false));
        Assert.Equal(HttpStatusCode.Conflict, res.StatusCode);
    }

    // ---------------- materials ----------------

    private static MultipartFormDataContent File(string name, byte[] content)
    {
        var form = new MultipartFormDataContent();
        var part = new ByteArrayContent(content);
        part.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
        form.Add(part, "file", name);
        return form;
    }

    [Fact]
    public async Task Org_materials_are_private_to_members_and_policy_checked()
    {
        var o = await NewOrg();
        var (_, mc) = await Member(o, "Sales");
        var (_, manager) = await Member(o, "Ops", "Manager");
        var (_, outsider) = await f.User();
        var other = await NewOrg();
        var pdf = Encoding.ASCII.GetBytes("%PDF-1.4\n% org handbook\n");

        Assert.Equal(HttpStatusCode.Forbidden, (await manager.PostAsync($"api/orgs/{o.Org.Id}/materials", File("a.pdf", pdf))).StatusCode);
        Assert.Equal(HttpStatusCode.UnsupportedMediaType, (await o.AdminClient.PostAsync($"api/orgs/{o.Org.Id}/materials", File("lesson.mp4", [0, 0, 0, 0x18, 0x66, 0x74, 0x79, 0x70]))).StatusCode);
        Assert.Equal(HttpStatusCode.UnsupportedMediaType, (await o.AdminClient.PostAsync($"api/orgs/{o.Org.Id}/materials", File("fake.pdf", Encoding.ASCII.GetBytes("not a pdf")))).StatusCode);
        Assert.Equal((HttpStatusCode)422, (await o.AdminClient.PostAsync($"api/orgs/{o.Org.Id}/materials", File("bad.txt", Encoding.UTF8.GetBytes("hello EICAR-TEST")))).StatusCode);
        Assert.Equal(HttpStatusCode.RequestEntityTooLarge, (await o.AdminClient.PostAsync($"api/orgs/{o.Org.Id}/materials", File("big.txt", Encoding.UTF8.GetBytes(new string('a', 5000))))).StatusCode);

        var up = await o.AdminClient.PostAsync($"api/orgs/{o.Org.Id}/materials?title=Handbook", File("handbook.pdf", pdf));
        Assert.Equal(HttpStatusCode.Created, up.StatusCode);
        var mat = (await up.Content.ReadFromJsonAsync<OrgMaterialDto>())!;
        Assert.Equal("Clean", mat.ScanVerdict);
        var opsOnly = (await (await o.AdminClient.PostAsync($"api/orgs/{o.Org.Id}/materials?department=Ops", File("ops.txt", Encoding.UTF8.GetBytes("ops notes")))).Content.ReadFromJsonAsync<OrgMaterialDto>())!;

        var list = (await mc.GetFromJsonAsync<List<OrgMaterialDto>>($"api/orgs/{o.Org.Id}/materials"))!;
        Assert.Single(list); // the Sales member does not see the Ops-only file
        var dl = await mc.GetAsync(mat.DownloadUrl.TrimStart('/'));
        Assert.Equal(HttpStatusCode.OK, dl.StatusCode);
        Assert.Equal(pdf, await dl.Content.ReadAsByteArrayAsync());
        Assert.Equal("attachment", dl.Content.Headers.ContentDisposition?.DispositionType);
        Assert.Contains("no-store", dl.Headers.CacheControl!.ToString());
        Assert.Equal(HttpStatusCode.NotFound, (await mc.GetAsync(opsOnly.DownloadUrl.TrimStart('/'))).StatusCode);
        Assert.Equal(2, (await manager.GetFromJsonAsync<List<OrgMaterialDto>>($"api/orgs/{o.Org.Id}/materials"))!.Count);

        foreach (var c in new[] { outsider, other.AdminClient, f.Anonymous() })
        {
            var r = await c.GetAsync(mat.DownloadUrl.TrimStart('/'));
            Assert.True(r.StatusCode is HttpStatusCode.NotFound or HttpStatusCode.Unauthorized, r.StatusCode.ToString());
        }
        Assert.Equal(HttpStatusCode.NotFound, (await other.AdminClient.GetAsync($"api/orgs/{o.Org.Id}/materials")).StatusCode);

        Assert.Equal(HttpStatusCode.NotFound, (await mc.DeleteAsync($"api/orgs/{o.Org.Id}/materials/{mat.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.NoContent, (await o.AdminClient.DeleteAsync($"api/orgs/{o.Org.Id}/materials/{mat.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await mc.GetAsync(mat.DownloadUrl.TrimStart('/'))).StatusCode);
        Assert.True(await f.Db(d => d.AuditLogs.AnyAsync(a => a.Action == "org.material.uploaded" && a.EntityId == o.Org.Id.ToString())));
    }

    // ---------------- seats & invoices ----------------

    [Fact]
    public async Task Seat_request_order_invoice_and_mark_paid_increase_limit()
    {
        var o = await NewOrg(seats: 5);
        var (_, manager) = await Member(o, "Ops", "Manager");
        Assert.Equal(HttpStatusCode.Forbidden, (await manager.PostAsJsonAsync($"api/orgs/{o.Org.Id}/seat-requests", new SeatRequestInput(10, null))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await o.AdminClient.PostAsJsonAsync($"api/orgs/{o.Org.Id}/seat-requests", new SeatRequestInput(0, null))).StatusCode);
        var rq = await o.AdminClient.PostAsJsonAsync($"api/orgs/{o.Org.Id}/seat-requests", new SeatRequestInput(10, "Q3 onboarding"));
        Assert.Equal(HttpStatusCode.Created, rq.StatusCode);
        var request = (await rq.Content.ReadFromJsonAsync<SeatRequestDto>())!;
        Assert.Equal(HttpStatusCode.Conflict, (await o.AdminClient.PostAsJsonAsync($"api/orgs/{o.Org.Id}/seat-requests", new SeatRequestInput(3, null))).StatusCode);

        Assert.Equal(HttpStatusCode.Forbidden, (await o.AdminClient.GetAsync("api/admin/enterprise/seat-requests")).StatusCode);
        Assert.Contains((await o.Staff.GetFromJsonAsync<List<SeatRequestDto>>("api/admin/enterprise/seat-requests?status=Requested"))!, r => r.Id == request.Id);
        Assert.Equal(HttpStatusCode.Forbidden, (await o.AdminClient.PostAsJsonAsync("api/admin/enterprise/orders", new EnterpriseOrderInput(o.Org.Id, request.Id, null, 12.5m, "USD"))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await o.Staff.PostAsJsonAsync("api/admin/enterprise/orders", new EnterpriseOrderInput(o.Org.Id, request.Id, null, 12.555m, "USD"))).StatusCode);

        var cr = await o.Staff.PostAsJsonAsync("api/admin/enterprise/orders", new EnterpriseOrderInput(o.Org.Id, request.Id, null, 12.5m, "usd"));
        Assert.Equal(HttpStatusCode.Created, cr.StatusCode);
        var order = (await cr.Content.ReadFromJsonAsync<EnterpriseOrderDto>())!;
        Assert.Equal((10, 125m, "USD", "AwaitingPayment"), (order.Quantity, order.Total, order.Currency, order.Status));
        Assert.Equal("Payment due by bank transfer", order.PaymentInstructions);
        var invoice = await f.Db(d => d.Set<Invoice>().AsNoTracking().FirstAsync(i => i.Id == order.InvoiceId));
        Assert.Equal(125m, invoice.Total);
        Assert.Contains("Payment due by bank transfer", invoice.LinesJson);
        Assert.Equal(o.Org.Name, invoice.BuyerName);
        Assert.StartsWith("INV-", order.InvoiceNumber);
        Assert.Equal(5, (await o.Staff.GetFromJsonAsync<List<OrgDto>>("api/admin/orgs"))!.Single(x => x.Id == o.Org.Id).SeatLimit); // not yet paid
        // The requesting org admin sees the invoice among their invoices.
        Assert.Single((await o.AdminClient.GetFromJsonAsync<List<EnterpriseOrderDto>>($"api/orgs/{o.Org.Id}/enterprise-orders"))!);
        Assert.Equal(HttpStatusCode.Forbidden, (await manager.GetAsync($"api/orgs/{o.Org.Id}/enterprise-orders")).StatusCode);

        Assert.Equal(HttpStatusCode.BadRequest, (await o.Staff.PostAsJsonAsync($"api/admin/enterprise/orders/{order.Id}/mark-paid", new MarkPaidInput(""))).StatusCode);
        var paid = await o.Staff.PostAsJsonAsync($"api/admin/enterprise/orders/{order.Id}/mark-paid", new MarkPaidInput("BANK-REF-001"));
        Assert.Equal(HttpStatusCode.OK, paid.StatusCode);
        var p = (await paid.Content.ReadFromJsonAsync<EnterpriseOrderDto>())!;
        Assert.Equal(("Paid", 5, 15), (p.Status, p.SeatLimitBefore!.Value, p.SeatLimitAfter!.Value));
        Assert.Equal(15, (await o.Staff.GetFromJsonAsync<List<OrgDto>>("api/admin/orgs"))!.Single(x => x.Id == o.Org.Id).SeatLimit);
        Assert.Equal(HttpStatusCode.Conflict, (await o.Staff.PostAsJsonAsync($"api/admin/enterprise/orders/{order.Id}/mark-paid", new MarkPaidInput("BANK-REF-001"))).StatusCode);
        Assert.Equal(OrderStatus.Paid, await f.Db(d => d.Orders.Where(x => x.Id == order.OrderId).Select(x => x.Status).FirstAsync()));
        Assert.Equal("Paid", (await o.AdminClient.GetFromJsonAsync<List<SeatRequestDto>>($"api/orgs/{o.Org.Id}/seat-requests"))!.Single().Status);
        Assert.True(await f.Db(d => d.AuditLogs.AnyAsync(a => a.Action == "enterprise.order.paid" && a.EntityId == o.Org.Id.ToString())));

        // Rejection path.
        var rq2 = (await (await o.AdminClient.PostAsJsonAsync($"api/orgs/{o.Org.Id}/seat-requests", new SeatRequestInput(2, null))).Content.ReadFromJsonAsync<SeatRequestDto>())!;
        Assert.Equal(HttpStatusCode.OK, (await o.Staff.PostAsJsonAsync($"api/admin/enterprise/seat-requests/{rq2.Id}/reject", new RejectSeatRequestInput("Not needed"))).StatusCode);
        Assert.Equal(HttpStatusCode.Conflict, (await o.Staff.PostAsJsonAsync("api/admin/enterprise/orders", new EnterpriseOrderInput(o.Org.Id, rq2.Id, null, 10m, "USD"))).StatusCode);
    }

    // ---------------- SSO ----------------

    private async Task ConfigureSso(OrgCtx o, params string[] domains)
    {
        var res = await o.AdminClient.PutAsJsonAsync($"api/orgs/{o.Org.Id}/sso",
            new SsoConfigInput(FakeOidcProvider.Issuer, FakeOidcProvider.ClientId, FakeOidcProvider.ClientSecret, domains.ToList(), true));
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
    }

    private record Started(string State, string Nonce, string Challenge);

    private async Task<Started> Start(OrgCtx o, string? returnTo = null)
    {
        var res = await f.Anonymous().GetAsync($"api/sso/{o.Org.Slug}/start" + (returnTo is null ? "" : "?returnTo=" + Uri.EscapeDataString(returnTo)));
        Assert.Equal(HttpStatusCode.Redirect, res.StatusCode);
        var loc = res.Headers.Location!;
        Assert.StartsWith(FakeOidcProvider.Issuer + "/authorize?", loc.ToString());
        var q = Microsoft.AspNetCore.WebUtilities.QueryHelpers.ParseQuery(loc.Query);
        Assert.Equal("S256", q["code_challenge_method"].ToString());
        Assert.Equal(EnterprisePhase2Fixture.RedirectUri, q["redirect_uri"].ToString());
        Assert.Equal(FakeOidcProvider.ClientId, q["client_id"].ToString());
        return new Started(q["state"].ToString(), q["nonce"].ToString(), q["code_challenge"].ToString());
    }

    /// <summary>Runs the callback and returns the completion query (handoff or error).</summary>
    private async Task<Dictionary<string, string>> Callback(string state, string code)
    {
        var res = await f.Anonymous().GetAsync($"api/sso/callback?code={code}&state={Uri.EscapeDataString(state)}");
        Assert.Equal(HttpStatusCode.Redirect, res.StatusCode);
        var loc = res.Headers.Location!;
        Assert.StartsWith(EnterprisePhase2Fixture.CompletionUrl, loc.ToString());
        return Microsoft.AspNetCore.WebUtilities.QueryHelpers.ParseQuery(loc.Query).ToDictionary(kv => kv.Key, kv => kv.Value.ToString());
    }

    private async Task<Dictionary<string, string>> Login(OrgCtx o, Func<string, Dictionary<string, object>> claims, Func<Dictionary<string, object>, string>? sign = null)
    {
        var s = await Start(o);
        var token = (sign ?? (c => f.Idp.SignIdToken(c)))(claims(s.Nonce));
        return await Callback(s.State, f.Idp.IssueCode(s.Challenge, token));
    }

    private async Task<AuthResponseLite> Exchange(string handoff)
    {
        var res = await f.Anonymous().PostAsJsonAsync("api/sso/exchange", new SsoExchangeInput(handoff));
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        return (await res.Content.ReadFromJsonAsync<AuthResponseLite>())!;
    }

    public record AuthUserLite(Guid Id, string Email);
    public record AuthResponseLite(string AccessToken, string RefreshToken, AuthUserLite User);

    [Fact]
    public async Task Sso_config_is_admin_only_and_secret_is_never_returned()
    {
        var o = await NewOrg();
        var (_, manager) = await Member(o, "Ops", "Manager");
        Assert.Equal(HttpStatusCode.Forbidden, (await manager.PutAsJsonAsync($"api/orgs/{o.Org.Id}/sso", new SsoConfigInput(FakeOidcProvider.Issuer, "c", "s", ["acme.test"], true))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await o.AdminClient.PutAsJsonAsync($"api/orgs/{o.Org.Id}/sso", new SsoConfigInput("http://idp.test", "c", "s", ["acme.test"], true))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await o.AdminClient.PutAsJsonAsync($"api/orgs/{o.Org.Id}/sso", new SsoConfigInput(FakeOidcProvider.Issuer, "c", "s", ["not a domain"], true))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await o.AdminClient.PutAsJsonAsync($"api/orgs/{o.Org.Id}/sso", new SsoConfigInput(FakeOidcProvider.Issuer, "c", null, ["acme.test"], true))).StatusCode);
        await ConfigureSso(o, "acme.test");
        var json = await o.AdminClient.GetStringAsync($"api/orgs/{o.Org.Id}/sso");
        Assert.DoesNotContain(FakeOidcProvider.ClientSecret, json);
        Assert.Contains("\"hasClientSecret\":true", json);
        var stored = await f.Db(d => d.Set<OrgSsoConfig>().AsNoTracking().FirstAsync(c => c.OrganizationId == o.Org.Id));
        Assert.NotEqual(FakeOidcProvider.ClientSecret, stored.ClientSecretProtected);
        Assert.DoesNotContain(FakeOidcProvider.ClientSecret, await f.Db(d => d.AuditLogs.Where(a => a.Action == "org.sso.configured").Select(a => a.Details).FirstAsync()));
        var other = await NewOrg();
        Assert.Equal(HttpStatusCode.NotFound, (await other.AdminClient.GetAsync($"api/orgs/{o.Org.Id}/sso")).StatusCode);
    }

    [Fact]
    public async Task Sso_jit_provisions_member_and_issues_tokens()
    {
        var o = await NewOrg();
        var domain = "acme" + Guid.NewGuid().ToString("N")[..6] + ".test";
        await ConfigureSso(o, domain);
        var email = "new.user@" + domain;
        var s = await Start(o, "/learn/dashboard");
        var q = await Callback(s.State, f.Idp.IssueCode(s.Challenge, f.Idp.SignIdToken(FakeOidcProvider.Claims(s.Nonce, "sub-1", email))));
        Assert.True(q.ContainsKey("handoff"), string.Join(",", q.Select(kv => kv.Key + "=" + kv.Value)));
        Assert.Equal("/learn/dashboard", q["returnTo"]);
        var auth = await Exchange(q["handoff"]);
        Assert.Equal(email, auth.User.Email);
        Assert.False(string.IsNullOrEmpty(auth.RefreshToken));

        // Handoff is single use; the state cannot be replayed.
        Assert.Equal(HttpStatusCode.Unauthorized, (await f.Anonymous().PostAsJsonAsync("api/sso/exchange", new SsoExchangeInput(q["handoff"]))).StatusCode);
        Assert.Equal("sso_invalid_state", (await Callback(s.State, "whatever"))["error"]);

        var member = await f.Db(d => d.OrganizationMembers.AsNoTracking().FirstAsync(m => m.OrganizationId == o.Org.Id && m.UserId == auth.User.Id));
        Assert.Equal(OrgRole.Member, member.Role);
        // The access token works and shows the org.
        var c = f.Factory.CreateClient();
        c.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", auth.AccessToken);
        Assert.Contains((await c.GetFromJsonAsync<List<MyOrgDto>>("api/me/organizations"))!, x => x.Id == o.Org.Id);

        // Second login with the same subject reuses the account (no new user).
        var again = await Login(o, n => FakeOidcProvider.Claims(n, "sub-1", email));
        Assert.Equal(auth.User.Id, (await Exchange(again["handoff"])).User.Id);
        Assert.Equal(1, await f.Db(d => d.Users.CountAsync(u => u.NormalizedEmail == email)));
        Assert.True(f.Idp.DiscoveryHits <= 2); // discovery cached across logins
    }

    [Fact]
    public async Task Sso_rejects_bad_tokens_domains_and_unverified_email()
    {
        var o = await NewOrg();
        var domain = "corp" + Guid.NewGuid().ToString("N")[..6] + ".test";
        await ConfigureSso(o, domain);
        var email = "x@" + domain;
        Assert.Equal("sso_domain_not_allowed", (await Login(o, n => FakeOidcProvider.Claims(n, "s-a", "x@evil.test")))["error"]);
        Assert.Equal("sso_email_unverified", (await Login(o, n => FakeOidcProvider.Claims(n, "s-b", email, verified: false)))["error"]);
        Assert.Equal("sso_invalid_token", (await Login(o, _ => FakeOidcProvider.Claims("wrong-nonce", "s-c", email)))["error"]);
        Assert.Equal("sso_invalid_token", (await Login(o, n => FakeOidcProvider.Claims(n, "s-d", email, aud: "someone-else")))["error"]);
        Assert.Equal("sso_invalid_token", (await Login(o, n => FakeOidcProvider.Claims(n, "s-e", email, iss: "https://evil.test")))["error"]);
        Assert.Equal("sso_invalid_token", (await Login(o, n => FakeOidcProvider.Claims(n, "s-f", email, exp: DateTime.UtcNow.AddMinutes(-10))))["error"]);
        using var attacker = System.Security.Cryptography.RSA.Create(2048);
        Assert.Equal("sso_invalid_token", (await Login(o, n => FakeOidcProvider.Claims(n, "s-g", email), c => f.Idp.SignIdToken(c, attacker)))["error"]);
        Assert.Equal("sso_invalid_token", (await Login(o, n => FakeOidcProvider.Claims(n, "s-h", email), c => f.Idp.SignIdToken(c, alg: Microsoft.IdentityModel.Tokens.SecurityAlgorithms.RsaSha512)))["error"]);
        Assert.Equal("sso_invalid_state", (await Callback("forged-state", "code"))["error"]);
        // PKCE: a code minted for a different challenge is refused at the token endpoint.
        var s = await Start(o);
        Assert.Equal("sso_token_exchange_failed", (await Callback(s.State, f.Idp.IssueCode("other-challenge", f.Idp.SignIdToken(FakeOidcProvider.Claims(s.Nonce, "s-i", email)))))["error"]);
        Assert.False(await f.Db(d => d.Users.AnyAsync(u => u.NormalizedEmail == email)));

        // Key rotation: a token signed with a new key is accepted after the JWKS refetch.
        f.Idp.RotateKey();
        await Task.Delay(TimeSpan.FromSeconds(31)); // JWKS refetch throttle
        var ok = await Login(o, n => FakeOidcProvider.Claims(n, "s-j", email));
        Assert.True(ok.ContainsKey("handoff"));
    }

    [Fact]
    public async Task Sso_links_existing_only_when_verified_and_blocks_privileged()
    {
        var o = await NewOrg();
        var domain = "link" + Guid.NewGuid().ToString("N")[..6] + ".test";
        await ConfigureSso(o, domain);

        var (unverified, _) = await f.UserWithEmail("u1@" + domain);
        Assert.Equal("sso_link_requires_verified_email", (await Login(o, n => FakeOidcProvider.Claims(n, "l-1", unverified.Email)))["error"]);

        var (verified, _) = await f.UserWithEmail("u2@" + domain);
        await f.Db(async d =>
        {
            d.Set<Mastemy.Api.Modules.Identity.UserSecurity>().Add(new Mastemy.Api.Modules.Identity.UserSecurity { UserId = verified.Id, EmailVerifiedAt = DateTime.UtcNow, VerifiedEmail = verified.NormalizedEmail });
            await d.SaveChangesAsync();
        });
        var linked = await Login(o, n => FakeOidcProvider.Claims(n, "l-2", verified.Email));
        Assert.Equal(verified.Id, (await Exchange(linked["handoff"])).User.Id);

        var (admin, _) = await f.UserWithEmail("boss@" + domain, Roles.Admin);
        await f.Db(async d =>
        {
            d.Set<Mastemy.Api.Modules.Identity.UserSecurity>().Add(new Mastemy.Api.Modules.Identity.UserSecurity { UserId = admin.Id, EmailVerifiedAt = DateTime.UtcNow, VerifiedEmail = admin.NormalizedEmail });
            await d.SaveChangesAsync();
        });
        Assert.Equal("sso_privileged_not_allowed", (await Login(o, n => FakeOidcProvider.Claims(n, "l-3", admin.Email)))["error"]);
        Assert.False(await f.Db(d => d.OrganizationMembers.AnyAsync(m => m.UserId == admin.Id)));
    }

    [Fact]
    public async Task Sso_start_requires_enabled_config_and_seat()
    {
        var o = await NewOrg(seats: 1); // the admin already uses the only seat
        Assert.Equal(HttpStatusCode.NotFound, (await f.Anonymous().GetAsync($"api/sso/{o.Org.Slug}/start")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await f.Anonymous().GetAsync("api/sso/no-such-org/start")).StatusCode);
        var domain = "full" + Guid.NewGuid().ToString("N")[..6] + ".test";
        await ConfigureSso(o, domain);
        Assert.Equal("seat_limit_reached", (await Login(o, n => FakeOidcProvider.Claims(n, "f-1", "a@" + domain)))["error"]);
        Assert.False(await f.Db(d => d.Users.AnyAsync(u => u.NormalizedEmail == "a@" + domain)));
        Assert.Equal(HttpStatusCode.NoContent, (await o.AdminClient.DeleteAsync($"api/orgs/{o.Org.Id}/sso")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await f.Anonymous().GetAsync($"api/sso/{o.Org.Slug}/start")).StatusCode);
    }
}
