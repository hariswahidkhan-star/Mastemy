namespace Mastemy.Api.Modules.SkillGraph;

public static class SkillGraphModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        s.AddScoped<SkillGraphService>();
    }
}
