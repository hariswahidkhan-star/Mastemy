using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using Mastemy.Api.Domain;
using Mastemy.Tests.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Metadata;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Xunit.Abstractions;

namespace Mastemy.Tests.Security;

/// <summary>
/// OWASP A01: enumerates every routed endpoint and proves that anything not explicitly [AllowAnonymous] rejects anonymous
/// callers, that the anonymous surface is exactly the reviewed allow-list, and that privileged routes reject a Student.
/// </summary>
public partial class AuthorizationSweepTests(IdentityFixture f, ITestOutputHelper output) : IClassFixture<IdentityFixture>
{
    public record Ep(string Method, string Pattern, RouteEndpoint Endpoint)
    {
        public override string ToString() => $"{Method} {Pattern}";
    }

    public static List<Ep> Endpoints(IServiceProvider sp) =>
        sp.GetRequiredService<EndpointDataSource>().Endpoints.OfType<RouteEndpoint>()
            .SelectMany(e => (e.Metadata.GetMetadata<IHttpMethodMetadata>()?.HttpMethods ?? ["GET"])
                .Select(m => new Ep(m, "/" + e.RoutePattern.RawText!.TrimStart('/'), e)))
            // OpenAPI is environment-gated (tested in SecurityHardeningTests), not part of the reviewed surface.
            .Where(e => !e.Pattern.StartsWith("/openapi", StringComparison.OrdinalIgnoreCase))
            .OrderBy(e => e.Pattern).ThenBy(e => e.Method).ToList();

    public static bool IsAnonymous(Endpoint e) =>
        e.Metadata.GetMetadata<IAllowAnonymous>() is not null || e.Metadata.GetOrderedMetadata<IAuthorizeData>().Count == 0;

    [GeneratedRegex(@"\{\*?(?<name>[A-Za-z0-9_]+)(?<c>[^}]*)\}")]
    private static partial Regex Param();

    public static string Url(string pattern) => Param().Replace(pattern, m =>
    {
        var c = m.Groups["c"].Value;
        if (c.Contains("guid")) return Guid.NewGuid().ToString();
        if (c.Contains("int") || c.Contains("long") || c.Contains("decimal")) return "1";
        if (c.Contains("bool")) return "true";
        return "x";
    }).Replace("?", "");

    private static HttpRequestMessage Request(Ep e)
    {
        var msg = new HttpRequestMessage(new HttpMethod(e.Method), Url(e.Pattern));
        if (e.Method is "GET" or "HEAD" or "DELETE" or "OPTIONS") return msg;
        var accepts = e.Endpoint.Metadata.GetMetadata<IAcceptsMetadata>()?.ContentTypes ?? [];
        msg.Content = accepts.Any(t => t.StartsWith("multipart/", StringComparison.OrdinalIgnoreCase))
            ? new MultipartFormDataContent { { new StringContent("x"), "x" } }
            : new StringContent("{}", Encoding.UTF8, "application/json");
        return msg;
    }

    [Fact]
    public async Task Every_non_anonymous_endpoint_returns_401_without_credentials()
    {
        var eps = Endpoints(f.Factory.Services);
        Assert.True(eps.Count > 100, $"expected the full API surface, found {eps.Count} endpoints");
        var c = f.Anon();
        var failures = new List<string>();
        foreach (var e in eps.Where(e => !IsAnonymous(e.Endpoint)))
        {
            using var res = await c.SendAsync(Request(e));
            if (res.StatusCode != HttpStatusCode.Unauthorized) failures.Add($"{e} -> {(int)res.StatusCode}");
        }
        output.WriteLine($"checked {eps.Count(e => !IsAnonymous(e.Endpoint))} protected endpoints");
        Assert.True(failures.Count == 0, "Protected endpoints reachable anonymously:\n" + string.Join("\n", failures));
    }

    /// <summary>[AllowAnonymous] on a controller silently overrides [Authorize] on its actions; never mix them that way.</summary>
    [Fact]
    public void No_endpoint_mixes_AllowAnonymous_with_Authorize()
    {
        var mixed = Endpoints(f.Factory.Services)
            .Where(e => e.Endpoint.Metadata.GetMetadata<Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor>() is { } d
                        && d.ControllerTypeInfo.GetCustomAttributes(true).OfType<IAllowAnonymous>().Any()
                        && d.MethodInfo.GetCustomAttributes(true).OfType<IAuthorizeData>().Any())
            .Select(e => e.ToString()).ToList();
        Assert.True(mixed.Count == 0, "Endpoints with both [AllowAnonymous] and [Authorize] (the latter is ignored):\n" + string.Join("\n", mixed));
    }

    [Fact]
    public void Anonymous_surface_matches_reviewed_allow_list()
    {
        var anon = Endpoints(f.Factory.Services).Where(e => IsAnonymous(e.Endpoint)).Select(e => e.ToString()).ToList();
        foreach (var a in anon) output.WriteLine(a);
        var reviewed = File.ReadAllLines(Path.Combine(AppContext.BaseDirectory, "Security", "AnonymousEndpoints.txt"))
            .Select(l => l.Trim()).Where(l => l.Length > 0 && !l.StartsWith('#')).ToHashSet(StringComparer.OrdinalIgnoreCase);
        var unreviewed = anon.Where(a => !reviewed.Contains(a)).ToList();
        Assert.True(unreviewed.Count == 0, "Unreviewed anonymous endpoints (justify in docs/security/owasp-checklist.md and add to Security/AnonymousEndpoints.txt):\n"
                                           + string.Join("\n", unreviewed));
        var stale = reviewed.Where(r => !anon.Contains(r, StringComparer.OrdinalIgnoreCase)).ToList();
        Assert.True(stale.Count == 0, "Allow-list entries that no longer exist:\n" + string.Join("\n", stale));
    }

    [Fact]
    public async Task Privileged_endpoints_reject_a_student_token_with_403()
    {
        var provider = f.Factory.Services.GetRequiredService<IAuthorizationPolicyProvider>();
        var privileged = new List<Ep>();
        foreach (var e in Endpoints(f.Factory.Services).Where(e => !IsAnonymous(e.Endpoint)))
        {
            var data = e.Endpoint.Metadata.GetOrderedMetadata<IAuthorizeData>();
            var policy = await AuthorizationPolicy.CombineAsync(provider, data);
            var roleReqs = policy!.Requirements.OfType<RolesAuthorizationRequirement>().ToList();
            if (roleReqs.Any(r => !r.AllowedRoles.Contains(Roles.Student))) privileged.Add(e);
        }
        Assert.Contains(privileged, e => e.Pattern.StartsWith("/api/admin", StringComparison.OrdinalIgnoreCase));
        Assert.Contains(privileged, e => e.Endpoint.Metadata.GetOrderedMetadata<IAuthorizeData>().Any(d => d.Policy == "Finance"));
        Assert.Contains(privileged, e => e.Endpoint.Metadata.GetOrderedMetadata<IAuthorizeData>().Any(d => d.Policy == "Staff"));
        output.WriteLine($"{privileged.Count} privileged endpoints");

        var student = await f.AsNew(Roles.Student);
        var failures = new List<string>();
        foreach (var e in privileged)
        {
            using var res = await student.SendAsync(Request(e));
            if (res.StatusCode != HttpStatusCode.Forbidden) failures.Add($"{e} -> {(int)res.StatusCode}");
        }
        Assert.True(failures.Count == 0, "Privileged endpoints not refusing a Student:\n" + string.Join("\n", failures));
    }
}
