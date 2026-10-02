namespace Mastemy.Api.Modules.Questions;

public static class QuestionsModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        s.AddScoped<QuestionService>();
        s.AddScoped<QuestionImportService>();
        s.AddScoped<CaseGroupService>();
        s.AddScoped<QuestionReuseService>();
        s.AddScoped<QuestionChallengeService>();
        s.AddHostedService<QuestionImportWorker>();
    }
}
