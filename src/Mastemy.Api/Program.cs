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
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
var cfg = builder.Configuration;

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
    o.AddPolicy("auth", ctx => RateLimitPartition.GetFixedWindowLimiter(
        ctx.Connection.RemoteIpAddress?.ToString() ?? "unknown",
        _ => new FixedWindowRateLimiterOptions { PermitLimit = cfg.GetValue("RateLimits:AuthPerMinute", 20), Window = TimeSpan.FromMinutes(1) }));
});

var origins = cfg.GetSection("Cors:Origins").Get<string[]>() ?? [];
builder.Services.AddCors(o => o.AddDefaultPolicy(p => p.WithOrigins(origins).AllowAnyHeader().AllowAnyMethod()));
builder.Services.AddControllers().AddJsonOptions(o =>
    o.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter()));
builder.Services.AddProblemDetails();
builder.Services.AddOpenApi();

var app = builder.Build();

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
    ctx.Response.StatusCode = pd.Status!.Value;
    await ctx.Response.WriteAsJsonAsync(pd, (System.Text.Json.JsonSerializerOptions?)null, "application/problem+json");
}));

app.Use(async (ctx, next) =>
{
    ctx.Response.Headers["X-Content-Type-Options"] = "nosniff";
    ctx.Response.Headers["Referrer-Policy"] = "strict-origin-when-cross-origin";
    ctx.Response.Headers["X-Frame-Options"] = "DENY";
    await next();
});

app.MapOpenApi();
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
    await Seeder.SeedAsync(db, cfg, app.Logger);
}

app.Run();

public partial class Program;
