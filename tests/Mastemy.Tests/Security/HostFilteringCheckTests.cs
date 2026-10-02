using Mastemy.Api.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Mastemy.Tests.Security;

public class HostFilteringCheckTests
{
    private sealed class Env(string name) : IHostEnvironment
    {
        public string EnvironmentName { get; set; } = name;
        public string ApplicationName { get; set; } = "Mastemy.Api";
        public string ContentRootPath { get; set; } = "/";
        public IFileProvider ContentRootFileProvider { get; set; } = new NullFileProvider();
    }

    private sealed class CapturingLogger : ILogger
    {
        public List<(LogLevel Level, string Message)> Entries { get; } = [];
        public IDisposable? BeginScope<TState>(TState state) where TState : notnull => null;
        public bool IsEnabled(LogLevel logLevel) => true;
        public void Log<TState>(LogLevel level, EventId id, TState state, Exception? ex, Func<TState, Exception?, string> fmt) => Entries.Add((level, fmt(state, ex)));
    }

    private static IConfiguration Cfg(string? allowedHosts) =>
        new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string?> { ["AllowedHosts"] = allowedHosts }).Build();

    [Theory]
    [InlineData("*")]
    [InlineData(null)]
    [InlineData("mastemy.example;*")]
    public void Production_with_wildcard_logs_a_warning_but_does_not_throw(string? hosts)
    {
        var log = new CapturingLogger();
        Assert.True(HostFilteringCheck.WarnIfUnsafe(new Env(Environments.Production), Cfg(hosts), log));
        Assert.Contains(log.Entries, e => e.Level == LogLevel.Warning && e.Message.Contains("AllowedHosts") && e.Message.Contains("${PUBLIC_HOST}"));
    }

    [Fact]
    public void Production_with_explicit_hosts_is_quiet()
    {
        var log = new CapturingLogger();
        Assert.False(HostFilteringCheck.WarnIfUnsafe(new Env(Environments.Production), Cfg("mastemy.example;api;localhost"), log));
        Assert.Empty(log.Entries);
    }

    [Fact]
    public void Development_keeps_the_wildcard_without_warning()
    {
        var log = new CapturingLogger();
        Assert.False(HostFilteringCheck.WarnIfUnsafe(new Env(Environments.Development), Cfg("*"), log));
        Assert.Empty(log.Entries);
    }

    [Fact]
    public void Compose_sets_allowed_hosts_from_public_host()
    {
        var root = AppContext.BaseDirectory;
        while (!File.Exists(Path.Combine(root, "docker-compose.yml"))) root = Path.GetDirectoryName(root)!;
        Assert.Contains("AllowedHosts: \"${PUBLIC_HOST:?", File.ReadAllText(Path.Combine(root, "docker-compose.yml")));
        Assert.Contains("PUBLIC_HOST=", File.ReadAllText(Path.Combine(root, ".env.example")));
    }
}
