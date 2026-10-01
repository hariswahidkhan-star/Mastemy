namespace Mastemy.Api.Modules.Catalog;

public static class CatalogModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        s.AddScoped<CatalogQueryService>();
        s.AddScoped<StudioService>();
        s.AddScoped<ReviewService>();
    }
}
