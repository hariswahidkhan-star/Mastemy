namespace Mastemy.Api.Modules.Learning;

public static class LearningModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        s.AddScoped<LearningService>();
        s.AddScoped<NotesService>();
        s.AddScoped<ReviewsService>();
    }
}
