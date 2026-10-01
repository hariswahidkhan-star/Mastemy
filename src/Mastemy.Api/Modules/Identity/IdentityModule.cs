namespace Mastemy.Api.Modules.Identity;

public static class IdentityModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        s.AddScoped<AuthService>();
        s.AddScoped<AdminService>();
        s.AddScoped<OnboardingService>();
    }
}
