namespace Mastemy.Api.Modules.Identity;

public static class IdentityModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        s.AddSingleton(new LoginEmailRateLimiter(cfg.GetValue("RateLimits:LoginPerEmailPerMinute", 10)));
        s.AddScoped<AuthService>();
        s.AddScoped<AdminService>();
        s.AddScoped<OnboardingService>();
    }
}
