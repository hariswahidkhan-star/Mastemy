using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Mastemy.Tests.Operations;

public class BackgroundJobsSwitchTests
{
    private static WebApplicationFactory<Program> Build(bool enabled) => new WebApplicationFactory<Program>().WithWebHostBuilder(b =>
    {
        b.UseSetting("ConnectionStrings:Default", "Server=127.0.0.1;Port=1;Database=none;User=none;Password=none;");
        b.UseSetting("Jwt:Key", "bg-switch-tests-signing-key-0123456789-abcdefghij");
        b.UseSetting("Database:MigrateOnStartup", "false");
        b.UseSetting("BackgroundJobs:Enabled", enabled ? "true" : "false");
    });

    [Fact]
    public async Task Disabling_background_jobs_removes_only_Mastemy_workers()
    {
        await using var off = Build(false);
        var hosted = off.Services.GetServices<IHostedService>().ToList();
        Assert.DoesNotContain(hosted, h => h.GetType().Assembly == typeof(Program).Assembly);
        // Worker classes stay resolvable for code that calls them directly.
        Assert.NotNull(off.Services.GetService<Mastemy.Api.Modules.Messaging.AutoMessageWorker>());
    }
}
