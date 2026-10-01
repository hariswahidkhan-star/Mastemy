namespace Mastemy.Api.Modules.Questions;

public static class QuestionsModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        s.AddScoped<QuestionService>();
        s.AddScoped<QuestionImportService>();
    }
}
