namespace Mastemy.Api.Modules.Enterprise;

public static class EnterpriseModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        s.AddScoped<OrgEntitlementSync>();
        s.AddScoped<EnterpriseService>();
        s.AddScoped<EnterpriseReportService>();
    }
}
