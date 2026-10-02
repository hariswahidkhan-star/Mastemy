namespace Mastemy.Api.Modules.Account;

public static class AccountModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        s.AddScoped<ProfileService>();
        s.AddScoped<SkillProfileService>();
        s.AddScoped<DataRightsService>();
    }
}
