namespace Mastemy.Api.Modules.StudyPath;

public static class StudyPathModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        s.AddScoped<StudyPathService>();
    }
}
