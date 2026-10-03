namespace Mastemy.Api.Modules.Scenario;

public static class ScenarioModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        s.AddScoped<ScenarioService>();
    }
}
