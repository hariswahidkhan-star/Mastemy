using System.Net;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Catalog;
using Mastemy.Api.Modules.Taxonomy;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.Taxonomy;

public class DiscoveryTests(TaxonomyFixture f) : IClassFixture<TaxonomyFixture>
{
    private async Task<HomeDto> Home() => await TaxonomyFixture.Read<HomeDto>(await f.Client().GetAsync("/api/home"));

    private async Task Buy(Guid courseId, Guid buyer, OrderStatus status = OrderStatus.Paid, double daysAgo = 1, string? refundStatus = null)
    {
        await f.WithDb(async db =>
        {
            var pkg = await db.Packages.FirstOrDefaultAsync(p => p.CourseId == courseId);
            if (pkg is null) { pkg = new LearningPackage { CourseId = courseId, Title = "P", Price = 10, IsActive = true, ApprovalStatus = "Approved" }; db.Packages.Add(pkg); }
            var o = new Order { UserId = buyer, Status = status, Total = 10, PaidAt = DateTime.UtcNow.AddDays(-daysAgo), IdempotencyKey = Guid.NewGuid().ToString("N") };
            o.Items.Add(new OrderItem { OrderId = o.Id, PackageId = pkg.Id, CourseId = courseId, UnitPrice = 10 });
            db.Orders.Add(o);
            if (refundStatus is not null) db.Refunds.Add(new Refund { OrderId = o.Id, Amount = 10, Status = refundStatus });
            await db.SaveChangesAsync();
        });
    }

    private async Task<List<User>> Buyers(int n)
    {
        var list = new List<User>();
        for (var i = 0; i < n; i++) list.Add(await f.NewUser("Buyer " + i, Roles.Student));
        return list;
    }

    private Task<BestsellerRunDto> Recompute() => f.WithService<BestsellerService, BestsellerRunDto>(s => s.Recompute(DateTime.UtcNow));

    private async Task<BestsellerStat?> Stat(Guid courseId)
    {
        BestsellerStat? s = null;
        await f.WithDb(async db => s = await db.Set<BestsellerStat>().AsNoTracking().FirstOrDefaultAsync(x => x.CourseId == courseId));
        return s;
    }

    [Fact]
    public async Task Bestseller_requires_ten_distinct_genuine_buyers_net_of_refunds()
    {
        var course = await f.AddCourse("Bestseller Candidate", f.InstructorA.Id);
        var buyers = await Buyers(12);
        for (var i = 0; i < 9; i++) await Buy(course.Id, buyers[i].Id);
        await Buy(course.Id, buyers[0].Id);                                     // duplicate buyer counts once
        await Buy(course.Id, f.InstructorA.Id);                                 // course author excluded
        await Buy(course.Id, f.Admin.Id);                                       // staff excluded
        await Buy(course.Id, buyers[9].Id, refundStatus: "Completed");          // refunded
        await Buy(course.Id, buyers[10].Id, status: OrderStatus.Refunded);      // refunded / charged back status
        await Buy(course.Id, buyers[11].Id, daysAgo: 31);                       // outside window
        await Recompute();
        var s = await Stat(course.Id);
        Assert.Equal(9, s!.DistinctBuyers);
        Assert.False(s.Eligible);
        Assert.DoesNotContain((await Home()).Bestselling, b => b.Course.Id == course.Id);

        // A rejected refund does not remove the sale; the 10th genuine buyer makes it eligible.
        var tenth = (await Buyers(1))[0];
        await Buy(course.Id, tenth.Id, refundStatus: "Rejected");
        await Recompute();
        s = await Stat(course.Id);
        Assert.Equal(10, s!.DistinctBuyers);
        Assert.True(s.Eligible);
        var home = await Home();
        var card = Assert.Single(home.Bestselling, b => b.Course.Id == course.Id);
        Assert.True(card.BestsellerLabel);
        Assert.Contains("10 distinct buyers", home.BestsellerRule);

        // A pending refund request pulls it back under the threshold.
        await f.WithDb(async db =>
        {
            var orderId = await db.Orders.Where(o => o.UserId == buyers[1].Id).Select(o => o.Id).FirstAsync();
            db.Refunds.Add(new Refund { OrderId = orderId, Amount = 10, Status = "Requested" });
            await db.SaveChangesAsync();
        });
        await Recompute();
        Assert.False((await Stat(course.Id))!.Eligible);
        Assert.DoesNotContain((await Home()).Bestselling, b => b.Course.Id == course.Id);
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.Student).PostAsync("/api/admin/bestsellers/recompute", null)).StatusCode);
    }

    [Fact]
    public async Task Pathways_show_only_published_with_live_courses_and_enroll_is_idempotent()
    {
        var live1 = await f.AddCourse("Path Live One", f.InstructorA.Id);
        var live2 = await f.AddCourse("Path Live Two", f.InstructorA.Id);
        var draft = await f.AddCourse("Path Draft", f.InstructorA.Id, live: false);
        var admin = f.Client(f.Admin);
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.InstructorA).PostJ("/api/admin/pathways",
            new PathwayUpsertRequest("x", "X", null, null, null, CourseLevel.Beginner, null, true, null, null, null))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await admin.PostJ("/api/admin/pathways",
            new PathwayUpsertRequest("Bad Slug!", "X", null, null, null, CourseLevel.Beginner, null, true, null, null, null))).StatusCode);
        var p = await TaxonomyFixture.Read<PathwayAdminDto>(await admin.PostJ("/api/admin/pathways",
            new PathwayUpsertRequest("data-starter", "Data Starter", "مسار", "Start here", null, CourseLevel.Beginner, f.AiCategoryId, false, 1,
                [live2.Id, draft.Id, live1.Id], null)));
        Assert.Equal(HttpStatusCode.NotFound, (await f.Client().GetAsync("/api/pathways/data-starter")).StatusCode); // unpublished
        p = await TaxonomyFixture.Read<PathwayAdminDto>(await admin.PutJ($"/api/admin/pathways/{p.Id}",
            new PathwayUpsertRequest("data-starter", "Data Starter", "مسار", "Start here", null, CourseLevel.Beginner, f.AiCategoryId, true, 1,
                [live2.Id, draft.Id, live1.Id], null)));
        var detail = await TaxonomyFixture.Read<PathwayDetailDto>(await f.Client().GetAsync("/api/pathways/data-starter"));
        Assert.Equal([live2.Id, live1.Id], detail.Courses.Select(c => c.Id).ToArray()); // order kept, draft dropped
        Assert.Contains((await Home()).BeginnerPathways, x => x.Slug == "data-starter");
        var academy = await TaxonomyFixture.Read<AcademyDto>(await f.Client().GetAsync("/api/academies/ai-academy"));
        Assert.Contains(academy.Pathways, x => x.Slug == "data-starter");
        Assert.Equal(HttpStatusCode.NotFound, (await f.Client().GetAsync("/api/academies/data")).StatusCode); // not an academy

        Assert.Equal(HttpStatusCode.Unauthorized, (await f.Client().PostAsync("/api/pathways/data-starter/enroll", null)).StatusCode);
        var student = await f.NewUser("Path Student", Roles.Student);
        var r1 = await TaxonomyFixture.Read<PathwayEnrollResultDto>(await f.Client(student).PostAsync("/api/pathways/data-starter/enroll", null));
        Assert.Equal(2, r1.Enrolled);
        var r2 = await TaxonomyFixture.Read<PathwayEnrollResultDto>(await f.Client(student).PostAsync("/api/pathways/data-starter/enroll", null));
        Assert.Equal((0, 2), (r2.Enrolled, r2.AlreadyEnrolled));
        await f.WithDb(async db => Assert.False(await db.Enrollments.AnyAsync(e => e.UserId == student.Id && e.CourseId == draft.Id)));
    }

    [Fact]
    public async Task Collections_respect_active_dates_and_live_courses_on_home()
    {
        var c1 = await f.AddCourse("Featured Course", f.InstructorA.Id, categoryId: f.AiCategoryId);
        var draft = await f.AddCourse("Featured Draft", f.InstructorA.Id, live: false);
        var admin = f.Client(f.Admin);
        await TaxonomyFixture.Read<CollectionAdminDto>(await admin.PostJ("/api/admin/collections",
            new CollectionUpsertRequest("editors-picks", "Editors' picks", null, CollectionKind.Editorial, null, null, null, 0, [draft.Id, c1.Id])));
        await TaxonomyFixture.Read<CollectionAdminDto>(await admin.PostJ("/api/admin/collections",
            new CollectionUpsertRequest("future-picks", "Future", null, CollectionKind.Editorial, null, DateTime.UtcNow.AddDays(5), null, 0, [c1.Id])));
        await TaxonomyFixture.Read<CollectionAdminDto>(await admin.PostJ("/api/admin/collections",
            new CollectionUpsertRequest("expired-picks", "Expired", null, CollectionKind.Editorial, null, DateTime.UtcNow.AddDays(-5), DateTime.UtcNow.AddDays(-1), 0, [c1.Id])));
        var home = await Home();
        var fe = Assert.Single(home.Featured);
        Assert.Equal("editors-picks", fe.Slug);
        Assert.Equal([c1.Id], fe.Courses.Select(x => x.Id).ToArray());
        Assert.Contains(home.New, x => x.Id == c1.Id);
        Assert.Contains(home.AiSkills, x => x.Id == c1.Id);
        Assert.DoesNotContain(home.New, x => x.Id == draft.Id);
        Assert.Equal(HttpStatusCode.NotFound, (await f.Client().GetAsync("/api/collections/future-picks")).StatusCode);

        // Recently updated = re-published courses only
        Assert.DoesNotContain(home.RecentlyUpdated, x => x.Id == c1.Id);
        await f.Republish(c1.Id);
        Assert.Contains((await Home()).RecentlyUpdated, x => x.Id == c1.Id);
        // Certification preparation needs a publicly visible certification
        Assert.DoesNotContain((await Home()).CertificationPreparation, x => x.Id == c1.Id);
    }

    [Fact]
    public async Task Instructor_directory_lists_only_instructors_with_live_courses()
    {
        var withLive = await f.NewUser("Zed Live Teacher", Roles.Instructor);
        var draftOnly = await f.NewUser("Yan Draft Teacher", Roles.Instructor);
        var suspended = await f.NewUser("Xi Suspended Teacher", Roles.Instructor);
        var c = await f.AddCourse("Directory Course", withLive.Id);
        await f.AddCourse("Directory Draft", draftOnly.Id, live: false);
        await f.AddCourse("Directory Suspended", suspended.Id);
        await f.WithDb(async db =>
        {
            (await db.Users.FirstAsync(u => u.Id == suspended.Id)).IsSuspended = true;
            db.CourseReviews.Add(new CourseReview { CourseId = c.Id, UserId = f.Student.Id, Rating = 4 });
            await db.SaveChangesAsync();
        });
        var list = await TaxonomyFixture.Read<PagedResult<InstructorSummaryDto>>(await f.Client().GetAsync("/api/instructors?q=Teacher"));
        var row = Assert.Single(list.Items);
        Assert.Equal((withLive.Id, 1, 4.00m, 1), (row.Id, row.LiveCourseCount, row.RatingAverage!.Value, row.RatingCount));
        var prof = await TaxonomyFixture.Read<InstructorProfileDto>(await f.Client().GetAsync($"/api/instructors/{withLive.Id}"));
        Assert.Equal(c.Id, Assert.Single(prof.Courses).Id);
        Assert.Equal(HttpStatusCode.NotFound, (await f.Client().GetAsync($"/api/instructors/{draftOnly.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await f.Client().GetAsync($"/api/instructors/{suspended.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await f.Client().GetAsync($"/api/instructors/{f.Student.Id}")).StatusCode);
    }
}
