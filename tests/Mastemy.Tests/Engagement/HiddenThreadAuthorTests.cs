using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Engagement;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.Engagement;

public class HiddenThreadAuthorTests(EngagementFixture fx) : IClassFixture<EngagementFixture>
{
    [Fact]
    public async Task Author_of_a_hidden_thread_sees_reason_and_appeal_link_while_others_get_404()
    {
        var s = await fx.SeedCourse();
        var (author, ac) = await fx.User(Roles.Student);
        var (other, oc) = await fx.User(Roles.Student);
        await fx.Enroll(author.Id, s.Course.Id);
        await fx.Enroll(other.Id, s.Course.Id);
        var (_, mod) = await fx.User(Roles.Moderator);
        var t = (await (await ac.PostAsJsonAsync($"/api/courses/{s.Course.Id}/discussions", new ThreadInput(null, "Buy my stuff", "link spam"))).Content.ReadFromJsonAsync<ThreadDetailDto>())!.Thread;
        Assert.Null((await ac.GetFromJsonAsync<ThreadDetailDto>($"/api/discussions/{t.Id}"))!.Moderation);

        Assert.Equal(HttpStatusCode.NoContent, (await mod.PostAsJsonAsync($"/api/moderation/discussions/{t.Id}/hide", new HideInput(true, "Advertising is not allowed"))).StatusCode);

        var res = await ac.GetAsync($"/api/discussions/{t.Id}");
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        var json = JsonDocument.Parse(await res.Content.ReadAsStringAsync()).RootElement;
        Assert.True(json.GetProperty("hidden").GetBoolean());
        var mo = json.GetProperty("moderation");
        Assert.True(mo.GetProperty("hidden").GetBoolean());
        Assert.Equal("Advertising is not allowed", mo.GetProperty("reason").GetString());
        Assert.Equal("/api/appeals", mo.GetProperty("appealUrl").GetString());
        Assert.Equal("Discussion", mo.GetProperty("appealTargetType").GetString());
        Assert.Equal(t.Id, mo.GetProperty("appealTargetId").GetGuid());
        Assert.Equal(0, json.GetProperty("replies").GetArrayLength());

        Assert.Equal(HttpStatusCode.NotFound, (await oc.GetAsync($"/api/discussions/{t.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await fx.Client().GetAsync($"/api/discussions/{t.Id}")).StatusCode);
        Assert.Null((await mod.GetFromJsonAsync<ThreadDetailDto>($"/api/discussions/{t.Id}"))!.Moderation); // moderators see the post itself
        // The author still cannot edit or reply to it.
        Assert.Equal(HttpStatusCode.NotFound, (await ac.PostAsJsonAsync($"/api/discussions/{t.Id}/replies", new ReplyInput("x"))).StatusCode);

        // Unhiding clears the notice.
        Assert.Equal(HttpStatusCode.NoContent, (await mod.PostAsJsonAsync($"/api/moderation/discussions/{t.Id}/hide", new HideInput(false, null))).StatusCode);
        Assert.Null((await ac.GetFromJsonAsync<ThreadDetailDto>($"/api/discussions/{t.Id}"))!.Moderation);
        Assert.False(await fx.Db(d => d.Set<ModerationNote>().AnyAsync(n => n.TargetId == t.Id)));
    }
}
