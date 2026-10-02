namespace Mastemy.Api.Modules.Identity;

public static class IdentityModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        s.AddSingleton(new LoginEmailRateLimiter(cfg.GetValue("RateLimits:LoginPerEmailPerMinute", 10)));
        s.AddScoped<AuthService>();
        s.AddScoped<AdminService>();
        s.AddScoped<OnboardingService>();
        s.AddSingleton<AccessTokenFactory>();
        s.AddScoped<EmailVerificationService>();
        s.AddScoped<PasswordService>();
        s.AddScoped<MfaService>();
        s.AddScoped<SessionService>();
        s.AddScoped<RefreshCookies>();
        s.AddScoped<MfaResetService>();
        s.AddScoped<SupportService>();
        // "Support" policy (read-only user/order lookup, resend verification) is owned by this module.
        s.Configure<Microsoft.AspNetCore.Authorization.AuthorizationOptions>(o =>
            o.AddPolicy(SupportPolicy.Name, p => p.RequireRole(SupportPolicy.Roles_)));
        // Access tokens are re-checked against the DB (session live, user active, roles current) with a <=5s per-process cache.
        s.AddMemoryCache();
        s.AddSingleton<TokenSessionValidator>();
        s.PostConfigure<Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions>(
            Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, TokenSessionValidator.Attach);
        // Global MVC filter: restricted MFA-enrollment tokens and MFA enforcement for privileged roles (spec §21).
        s.Configure<Microsoft.AspNetCore.Mvc.MvcOptions>(o => o.Filters.Add<MfaEnforcementFilter>());
    }
}
