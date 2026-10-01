namespace Mastemy.Api.Modules.Commerce;

public static class CommerceModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        s.AddHttpClient(StripePaymentProvider.HttpClientName, c => c.Timeout = TimeSpan.FromSeconds(30));
        s.AddScoped<IPaymentProvider, StripePaymentProvider>();
        s.AddScoped<CommerceService>();
    }
}
