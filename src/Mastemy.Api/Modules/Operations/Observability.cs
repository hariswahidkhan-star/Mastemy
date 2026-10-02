using System.Diagnostics;
using System.Text.RegularExpressions;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

namespace Mastemy.Api.Modules.Operations;

/// <summary>
/// Adds X-Correlation-Id to every request/response and a logging scope carrying it. A well-formed inbound id (from the
/// edge proxy or a client) is reused; otherwise the W3C trace id of the current activity (or a new id) is used.
/// Registered as an IStartupFilter so it wraps the whole pipeline, including the exception handler.
/// </summary>
public sealed partial class CorrelationIdStartupFilter : IStartupFilter
{
    public const string Header = "X-Correlation-Id";

    [GeneratedRegex("^[A-Za-z0-9._-]{1,64}$")]
    private static partial Regex Valid();

    public Action<IApplicationBuilder> Configure(Action<IApplicationBuilder> next) => app =>
    {
        app.Use(async (ctx, nxt) =>
        {
            var inbound = ctx.Request.Headers[Header].ToString();
            var id = Valid().IsMatch(inbound) ? inbound : Activity.Current?.TraceId.ToHexString() ?? Guid.NewGuid().ToString("N");
            ctx.TraceIdentifier = id;
            Activity.Current?.SetTag("correlation.id", id);
            ctx.Response.OnStarting(() => { ctx.Response.Headers[Header] = id; return Task.CompletedTask; });
            var logger = ctx.RequestServices.GetRequiredService<ILoggerFactory>().CreateLogger("Mastemy.Request");
            using (logger.BeginScope(new Dictionary<string, object> { ["CorrelationId"] = id }))
                await nxt();
        });
        next(app);
    };

    public static bool IsValid(string value) => Valid().IsMatch(value);
}

public static class Observability
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        s.AddSingleton<IStartupFilter, CorrelationIdStartupFilter>();

        if (cfg.GetValue("Logging:Json", false))
        {
            s.AddLogging(b =>
            {
                b.ClearProviders();
                b.AddJsonConsole(o =>
                {
                    o.IncludeScopes = true;
                    o.UseUtcTimestamp = true;
                    o.TimestampFormat = "yyyy-MM-ddTHH:mm:ss.fffZ ";
                });
            });
        }

        var endpoint = cfg["Otel:Endpoint"];
        if (string.IsNullOrWhiteSpace(endpoint)) return; // telemetry export is off unless explicitly configured
        if (!Uri.TryCreate(endpoint, UriKind.Absolute, out var uri)) throw new InvalidOperationException("Otel:Endpoint must be an absolute URI.");
        var serviceName = cfg["Otel:ServiceName"] is { Length: > 0 } n ? n : "mastemy-api";
        var protocol = string.Equals(cfg["Otel:Protocol"], "http", StringComparison.OrdinalIgnoreCase)
            ? OpenTelemetry.Exporter.OtlpExportProtocol.HttpProtobuf : OpenTelemetry.Exporter.OtlpExportProtocol.Grpc;
        var headers = cfg["Otel:Headers"]; // e.g. "authorization=Bearer xyz" (kept in secrets, never logged)
        void Exporter(OpenTelemetry.Exporter.OtlpExporterOptions o)
        {
            o.Endpoint = uri; o.Protocol = protocol;
            if (!string.IsNullOrWhiteSpace(headers)) o.Headers = headers;
        }
        var ratio = Math.Clamp(cfg.GetValue("Otel:TraceSampleRatio", 1.0), 0.0, 1.0);
        s.AddOpenTelemetry()
            .ConfigureResource(r => r.AddService(serviceName, serviceVersion: typeof(Observability).Assembly.GetName().Version?.ToString()))
            .WithTracing(t => t
                .SetSampler(new ParentBasedSampler(new TraceIdRatioBasedSampler(ratio)))
                .AddAspNetCoreInstrumentation(o => o.Filter = ctx => !ctx.Request.Path.StartsWithSegments("/health"))
                .AddHttpClientInstrumentation()
                .AddSource("Mastemy")
                .AddOtlpExporter(Exporter))
            .WithMetrics(m => m
                .AddAspNetCoreInstrumentation()
                .AddHttpClientInstrumentation()
                .AddRuntimeInstrumentation()
                .AddMeter("Mastemy")
                .AddOtlpExporter(Exporter));
    }
}
