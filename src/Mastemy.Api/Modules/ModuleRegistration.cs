namespace Mastemy.Api.Modules;

public static class ModuleRegistration
{
    public static IServiceCollection AddMastemyModules(this IServiceCollection s, IConfiguration cfg)
    {
        Identity.IdentityModule.Add(s, cfg);
        Catalog.CatalogModule.Add(s, cfg);
        YouTube.YouTubeModule.Add(s, cfg);
        Questions.QuestionsModule.Add(s, cfg);
        Assessment.AssessmentModule.Add(s, cfg);
        Learning.LearningModule.Add(s, cfg);
        Commerce.CommerceModule.Add(s, cfg);
        Engagement.EngagementModule.Add(s, cfg);
        Enterprise.EnterpriseModule.Add(s, cfg);
        Resources.ResourcesModule.Add(s, cfg);
        Ai.AiModule.Add(s, cfg);
        Account.AccountModule.Add(s, cfg);
        Taxonomy.TaxonomyModule.Add(s, cfg);
        Trust.TrustModule.Add(s, cfg);
        Operations.OperationsModule.Add(s, cfg);
        Authoring.AuthoringModule.Add(s, cfg); Analytics.AnalyticsModule.Add(s, cfg); StudyTools.StudyToolsModule.Add(s, cfg);
        return s;
    }
}
