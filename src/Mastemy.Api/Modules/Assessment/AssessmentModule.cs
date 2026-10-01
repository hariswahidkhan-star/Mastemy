namespace Mastemy.Api.Modules.Assessment;

public static class AssessmentModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        s.AddScoped<AssessmentStudioService>();
        s.AddScoped<AttemptService>();
        s.AddScoped<CertificateService>();
    }
}
