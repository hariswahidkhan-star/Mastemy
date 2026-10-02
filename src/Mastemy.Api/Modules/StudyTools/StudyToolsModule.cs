namespace Mastemy.Api.Modules.StudyTools;

public static class StudyToolsModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        s.AddScoped<StudyPlanService>();
        s.AddScoped<LearnerToolsService>();
        s.AddScoped<CalendarFeedService>();
        s.AddSingleton<StudyReminderWorker>();
        s.AddHostedService(sp => sp.GetRequiredService<StudyReminderWorker>());
    }
}
