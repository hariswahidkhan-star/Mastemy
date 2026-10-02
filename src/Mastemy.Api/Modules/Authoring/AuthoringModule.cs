namespace Mastemy.Api.Modules.Authoring;

public static class AuthoringModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        s.AddScoped<CourseScopeService>();
        s.AddScoped<AgreementService>();
        s.AddScoped<RevisionService>();
        s.AddScoped<TemplateService>();
        s.AddScoped<TranslationService>();
        s.AddScoped<PreviewService>();
    }
}
