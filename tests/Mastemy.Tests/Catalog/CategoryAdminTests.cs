using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Catalog;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.Catalog;

public class CategoryAdminFixture : IAsyncLifetime
{
    public string DbName { get; } = "mastemy_t_" + Guid.NewGuid().ToString("N");
    public WebApplicationFactory<Program> Factory { get; private set; } = null!;

    public async Task InitializeAsync()
    {
        Factory = new WebApplicationFactory<Program>().WithWebHostBuilder(b =>
        {
            b.UseEnvironment("Testing");
            b.UseSetting("ConnectionStrings:Default", $"Server=localhost;Port=3306;Database={DbName};User=mastemy;Password=mastemy_dev_pw;");
            b.UseSetting("Jwt:Key", "test-signing-key-0123456789abcdef0123456789abcdef");
            b.UseSetting("Security:RequireMfaForPrivileged", "false");
            b.UseSetting("Database:MigrateOnStartup", "false");
        });
        await Db(d => d.Database.EnsureCreatedAsync());
    }

    public async Task DisposeAsync()
    {
        await Db(d => d.Database.EnsureDeletedAsync());
        await Factory.DisposeAsync();
    }

    public async Task<T> Db<T>(Func<AppDbContext, Task<T>> f)
    {
        using var scope = Factory.Services.CreateScope();
        return await f(scope.ServiceProvider.GetRequiredService<AppDbContext>());
    }

    public Task Db(Func<AppDbContext, Task> f) => Db<int>(async d => { await f(d); return 0; });

    public async Task<(User User, HttpClient Client)> User(params string[] roles)
    {
        var u = new User { Email = $"{Guid.NewGuid():N}@t.local", DisplayName = "T", PasswordHash = "x" };
        u.NormalizedEmail = u.Email.ToLowerInvariant();
        u.Roles = roles.Select(r => new UserRole { UserId = u.Id, Role = r }).ToList();
        await Db(async d => { d.Users.Add(u); await d.SaveChangesAsync(); });
        var c = Factory.CreateClient();
        c.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Factory.Services.GetRequiredService<JwtIssuer>().Issue(u));
        return (u, c);
    }
}

public class CategoryAdminTests(CategoryAdminFixture f) : IClassFixture<CategoryAdminFixture>
{
    private static string Slug() => "cat-" + Guid.NewGuid().ToString("N")[..10];

    private static async Task<CategoryAdminDto> Create(HttpClient c, string slug, int? parent = null, bool academy = false, int sort = 0)
    {
        var res = await c.PostAsJsonAsync("api/admin/categories", new CategoryAdminInput(slug, "Name " + slug, "اسم", parent, academy, sort));
        Assert.Equal(HttpStatusCode.Created, res.StatusCode);
        return (await res.Content.ReadFromJsonAsync<CategoryAdminDto>())!;
    }

    [Fact]
    public async Task Staff_only_and_validation()
    {
        var (_, plain) = await f.User(Roles.Instructor);
        Assert.Equal(HttpStatusCode.Forbidden, (await plain.PostAsJsonAsync("api/admin/categories", new CategoryAdminInput(Slug(), "A", "ب", null, false, 0))).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await plain.GetAsync("api/admin/categories")).StatusCode);
        var (_, staff) = await f.User(Roles.Admin);
        Assert.Equal(HttpStatusCode.BadRequest, (await staff.PostAsJsonAsync("api/admin/categories", new CategoryAdminInput("Bad Slug", "A", "ب", null, false, 0))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await staff.PostAsJsonAsync("api/admin/categories", new CategoryAdminInput(Slug(), "", "ب", null, false, 0))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await staff.PostAsJsonAsync("api/admin/categories", new CategoryAdminInput(Slug(), "A", "", null, false, 0))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await staff.PostAsJsonAsync("api/admin/categories", new CategoryAdminInput(Slug(), "A", "ب", 999_999, false, 0))).StatusCode);
        var c = await Create(staff, Slug(), academy: true, sort: 5);
        Assert.True(c.IsAcademy);
        Assert.Equal(HttpStatusCode.Conflict, (await staff.PostAsJsonAsync("api/admin/categories", new CategoryAdminInput(c.Slug, "A", "ب", null, false, 0))).StatusCode);
        Assert.True(await f.Db(d => d.AuditLogs.AnyAsync(a => a.Action == "category.created" && a.EntityId == c.Id.ToString())));
        // Public category list shows the new category.
        var pub = await f.Factory.CreateClient().GetStringAsync("api/categories");
        Assert.Contains(c.Slug, pub);
    }

    [Fact]
    public async Task Hierarchy_update_and_cycle_prevention()
    {
        var (_, staff) = await f.User(Roles.Admin);
        var root = await Create(staff, Slug());
        var child = await Create(staff, Slug(), parent: root.Id);
        var grand = await Create(staff, Slug(), parent: child.Id);
        Assert.Equal(1, (await staff.GetFromJsonAsync<CategoryAdminDto>($"api/admin/categories/{root.Id}"))!.ChildCount);

        var cycle = await staff.PutAsJsonAsync($"api/admin/categories/{root.Id}", new CategoryAdminInput(root.Slug, "Root", "جذر", grand.Id, false, 0));
        Assert.Equal(HttpStatusCode.BadRequest, cycle.StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await staff.PutAsJsonAsync($"api/admin/categories/{root.Id}", new CategoryAdminInput(root.Slug, "Root", "جذر", root.Id, false, 0))).StatusCode);

        var upd = await staff.PutAsJsonAsync($"api/admin/categories/{grand.Id}", new CategoryAdminInput(grand.Slug, "Renamed", "معدل", root.Id, true, 3));
        Assert.Equal(HttpStatusCode.OK, upd.StatusCode);
        var dto = (await upd.Content.ReadFromJsonAsync<CategoryAdminDto>())!;
        Assert.Equal(("Renamed", "معدل", root.Id, true, 3), (dto.NameEn, dto.NameAr, dto.ParentId, dto.IsAcademy, dto.SortOrder));
        Assert.True(await f.Db(d => d.AuditLogs.AnyAsync(a => a.Action == "category.updated" && a.EntityId == grand.Id.ToString())));
        Assert.Equal(HttpStatusCode.Conflict, (await staff.PutAsJsonAsync($"api/admin/categories/{grand.Id}", new CategoryAdminInput(child.Slug, "x", "y", null, false, 0))).StatusCode);
    }

    [Fact]
    public async Task Cannot_delete_category_with_courses_or_children()
    {
        var (owner, _) = await f.User(Roles.Instructor);
        var (_, staff) = await f.User(Roles.Admin);
        var parent = await Create(staff, Slug());
        var used = await Create(staff, Slug(), parent: parent.Id);
        var tag = Guid.NewGuid().ToString("N")[..10];
        var course = new Course { Code = "C" + tag, Slug = "c-" + tag, Title = "C", OwnerId = owner.Id };
        course.Categories.Add(new CourseCategory { CourseId = course.Id, CategoryId = used.Id });
        await f.Db(async d => { d.Courses.Add(course); await d.SaveChangesAsync(); });

        var res = await staff.DeleteAsync($"api/admin/categories/{used.Id}");
        Assert.Equal(HttpStatusCode.Conflict, res.StatusCode);
        Assert.Contains("category_has_courses", await res.Content.ReadAsStringAsync());
        Assert.Equal(HttpStatusCode.Conflict, (await staff.DeleteAsync($"api/admin/categories/{parent.Id}")).StatusCode);

        await f.Db(async d => { d.CourseCategories.RemoveRange(d.CourseCategories.Where(x => x.CategoryId == used.Id)); await d.SaveChangesAsync(); });
        Assert.Equal(HttpStatusCode.NoContent, (await staff.DeleteAsync($"api/admin/categories/{used.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.NoContent, (await staff.DeleteAsync($"api/admin/categories/{parent.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await staff.DeleteAsync($"api/admin/categories/{parent.Id}")).StatusCode);
        Assert.True(await f.Db(d => d.AuditLogs.AnyAsync(a => a.Action == "category.deleted" && a.EntityId == used.Id.ToString())));
    }
}
