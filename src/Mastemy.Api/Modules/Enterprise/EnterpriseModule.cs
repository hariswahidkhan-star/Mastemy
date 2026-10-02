using Mastemy.Api.Infrastructure;
namespace Mastemy.Api.Modules.Enterprise;

public static class EnterpriseModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        s.AddScoped<OrgEntitlementSync>();
        s.AddScoped<EnterpriseService>();
        s.AddScoped<EnterpriseReportService>();
        // Phase 2: pathways, org-private materials, seat purchasing, OIDC SSO.
        s.AddScoped<EnterprisePhase2Service>();
        var sso = cfg.GetSection("Sso").Get<SsoOptions>() ?? new SsoOptions();
        s.AddSingleton(sso);
        // A10: the issuer is org-controlled, so connections are pinned to public addresses (no redirects) unless
        // Sso:AllowInsecureHttp (tests/development) is set.
        s.AddHttpClient(OidcMetadataClient.HttpClientName, c => c.Timeout = TimeSpan.FromSeconds(10))
            .ConfigurePrimaryHttpMessageHandler(() => SsrfGuard.CreateHandler(allowPrivate: sso.AllowInsecureHttp));
        s.AddSingleton<OidcMetadataClient>();
        s.AddScoped<SsoConfigService>();
        s.AddScoped<SsoLoginService>();
        s.AddScoped<SsoDomainService>();
        s.AddSingleton<IDnsTxtResolver, SystemDnsTxtResolver>();
        s.AddHostedService<SsoStateCleanup>();
    }
}
