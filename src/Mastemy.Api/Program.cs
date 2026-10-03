using Microsoft.AspNetCore.DataProtection;
using System.Text;
using System.Threading.RateLimiting;
using Mastemy.Api.Data;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
var cfg = builder.Configuration;

// A05: no Server banner; a conservative default body limit (upload endpoints raise it per-endpoint).
builder.WebHost.ConfigureKestrel(k =>
{
    k.AddServerHeader = false;
    k.Limits.MaxRequestBodySize = cfg.GetValue<long>("Limits:MaxRequestBodyBytes", 8 * 1024 * 1024);
});
builder.Services.Configure<Microsoft.AspNetCore.Builder.ForwardedHeadersOptions>(o => SecurityHeaders.ConfigureForwardedHeaders(o, cfg));
builder.Services.AddSingleton<SecurityMetrics>();
builder.Services.AddSingleton<SecurityAlertNotifier>();
builder.Services.TryAddSingleton(TimeProvider.System);
builder.Services.AddSingleton<SecurityEvents>();

var jwt = cfg.GetSection("Jwt").Get<JwtOptions>() ?? new JwtOptions();
if (string.IsNullOrWhiteSpace(jwt.Key) || jwt.Key.Length < 32)
    throw new InvalidOperationException("Jwt:Key must be configured with at least 32 characters (set Jwt__Key).");
builder.Services.AddSingleton(jwt);
builder.Services.AddSingleton<JwtIssuer>();

var conn = cfg.GetConnectionString("Default") ?? throw new InvalidOperationException("ConnectionStrings:Default is required.");
builder.Services.AddDbContext<AppDbContext>(o => o.UseMySQL(conn));

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ICurrentUser, CurrentUser>();
builder.Services.AddScoped<AuditService>();
builder.Services.AddScoped<FeatureFlagService>();
builder.Services.AddScoped<AccessService>();
builder.Services.AddSingleton<SecretProtector>();
var dpDir = cfg["DataProtection:KeysPath"];
var dp = builder.Services.AddDataProtection().SetApplicationName("Mastemy");
if (!string.IsNullOrWhiteSpace(dpDir)) dp.PersistKeysToFileSystem(new DirectoryInfo(dpDir));

builder.Services.AddMastemyModules(cfg);
// BackgroundJobs:Enabled=false removes Mastemy's own hosted workers (outbox, sweepers, reminders, ...) while keeping
// their classes resolvable. Used by tooling that boots the app without a database (e.g. scripts/export-openapi.sh).
if (!cfg.GetValue("BackgroundJobs:Enabled", true))
{
    var own = typeof(Program).Assembly;
    var workers = builder.Services.Where(d => d.ServiceType == typeof(IHostedService)
        && (d.ImplementationType?.Assembly == own || d.ImplementationFactory?.Method.Module.Assembly == own)).ToList();
    foreach (var d in workers) builder.Services.Remove(d);
}

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(o =>
{
    o.MapInboundClaims = false;
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = jwt.Issuer, ValidAudience = jwt.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key)),
        ValidateIssuer = true, ValidateAudience = true, ValidateLifetime = true, ValidateIssuerSigningKey = true,
        ClockSkew = TimeSpan.FromSeconds(30),
        RoleClaimType = System.Security.Claims.ClaimTypes.Role, NameClaimType = "name",
    };
});
builder.Services.AddAuthorization(o =>
{
    o.AddPolicy("Staff", p => p.RequireRole("Admin", "SuperAdmin"));
    o.AddPolicy("SuperAdmin", p => p.RequireRole("SuperAdmin"));
    o.AddPolicy("Reviewer", p => p.RequireRole("Reviewer", "Admin", "SuperAdmin"));
    o.AddPolicy("Instructor", p => p.RequireRole("Instructor", "Admin", "SuperAdmin"));
    o.AddPolicy("Finance", p => p.RequireRole("Finance", "Admin", "SuperAdmin"));
});

builder.Services.AddRateLimiter(o =>
{
    o.RejectionStatusCode = 429;
    o.OnRejected = (ctx, _) =>
    {
        ctx.HttpContext.RequestServices.GetRequiredService<SecurityEvents>()
            .Warn("rate_limited", detail: ctx.HttpContext.Request.Path.Value);
        return ValueTask.CompletedTask;
    };
    o.AddPolicy("auth", ctx => RateLimitPartition.GetFixedWindowLimiter(
        ctx.Connection.RemoteIpAddress?.ToString() ?? "unknown",
        _ => new FixedWindowRateLimiterOptions { PermitLimit = cfg.GetValue("RateLimits:AuthPerMinute", 20), Window = TimeSpan.FromMinutes(1) }));
    // Anonymous write endpoints without a dedicated limiter (affiliate clicks, consent, complaints).
    o.AddPolicy("public-write", ctx => RateLimitPartition.GetFixedWindowLimiter(
        ctx.Connection.RemoteIpAddress?.ToString() ?? "unknown",
        _ => new FixedWindowRateLimiterOptions { PermitLimit = cfg.GetValue("RateLimits:PublicWritePerMinute", 60), Window = TimeSpan.FromMinutes(1) }));
});

var origins = cfg.GetSection("Cors:Origins").Get<string[]>() ?? [];
if (origins.Any(o => o.Contains('*')))
    throw new InvalidOperationException("Cors:Origins must list explicit origins; wildcards are not allowed.");
// No AllowCredentials: the SPA is served same-origin behind the edge proxy, so cross-origin callers never get cookies.
builder.Services.AddCors(o => o.AddDefaultPolicy(p => p.WithOrigins(origins).AllowAnyHeader().AllowAnyMethod()));
builder.Services.AddControllers().AddJsonOptions(o =>
    o.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter()));
builder.Services.AddProblemDetails();
builder.Services.AddOpenApi();

var app = builder.Build();
HostFilteringCheck.WarnIfUnsafe(app.Environment, cfg, app.Logger);

app.UseExceptionHandler(e => e.Run(async ctx =>
{
    var ex = ctx.Features.Get<IExceptionHandlerFeature>()?.Error;
    var pd = ex switch
    {
        AppException a => new ProblemDetails { Status = a.Status, Title = a.Message, Type = a.Code },
        DbUpdateConcurrencyException => new ProblemDetails { Status = 409, Title = "The record was changed by someone else. Reload and retry.", Type = "concurrency" },
        _ => new ProblemDetails { Status = 500, Title = "An unexpected error occurred." },
    };
    if (pd.Status == 500) app.Logger.LogError(ex, "Unhandled exception for {Path}", ctx.Request.Path);
    else if (ex is AppException { Status: 401 or 403 or 429 } sec)
        ctx.RequestServices.GetRequiredService<SecurityEvents>().Warn(sec.Code ?? "denied", detail: $"{sec.Status} {ctx.Request.Method} {ctx.Request.Path}", status: sec.Status);
    ctx.Response.StatusCode = pd.Status!.Value;
    await ctx.Response.WriteAsJsonAsync(pd, (System.Text.Json.JsonSerializerOptions?)null, "application/problem+json");
}));

app.UseForwardedHeaders();
SecurityMetrics.CountForbiddenResponses(app);
app.UseMastemySecurityHeaders(cfg);
// TLS normally terminates at the edge proxy; enable when Kestrel itself serves HTTPS.
if (cfg.GetValue("Security:HttpsRedirection", false)) app.UseHttpsRedirection();

// A05: the API description is only published in Development or when OpenApi:Enabled is set explicitly.
if (app.Environment.IsDevelopment() || cfg.GetValue("OpenApi:Enabled", false)) app.MapOpenApi();
app.UseCors();
app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

if (cfg.GetValue("Database:MigrateOnStartup", false))
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await db.Database.MigrateAsync();
    await Seeder.SeedAsync(db, cfg, app.Logger,
        allowAccountSeed: app.Environment.IsDevelopment() || cfg.GetValue("Seed:AllowSuperAdminBootstrap", false));
    await Mastemy.Api.Modules.SkillGraph.SkillGraphSeeder.SeedAsync(db);
    await Mastemy.Api.Modules.Scenario.ScenarioSeeder.SeedAsync(db);
}

app.Run();

public partial class Program;
