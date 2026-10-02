using System.Net;
using System.Text.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Ai;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using static Mastemy.Tests.Ai.AiFixture;

namespace Mastemy.Tests.Ai;

public class AiTutorTests(AiFixture fx) : IClassFixture<AiFixture>
{
    private static async Task<ConversationDto> Conversation(HttpClient c, Guid courseId) =>
        await Read<ConversationDto>(await c.PostAsync("/api/ai/tutor/conversations", JsonBody(new { courseId })));

    private static Task<HttpResponseMessage> Ask(HttpClient c, Guid conversationId, string content) =>
        c.PostAsync($"/api/ai/tutor/conversations/{conversationId}/messages", JsonBody(new { content }));

    private static JsonElement Done(List<Sse> events) => events.Single(e => e.Event == "done").Data;
    private static string Streamed(List<Sse> events) => string.Concat(events.Where(e => e.Event == "delta").Select(e => e.Data.GetProperty("text").GetString()));

    [Fact]
    public async Task Grounded_answer_streams_validated_citations_and_strips_invented_ones()
    {
        fx.Fake.Reset();
        var course = await fx.PublishedCourse();
        var (learnerId, learner) = await fx.Learner(course.CourseId);
        var conv = await Conversation(learner, course.CourseId);
        fx.Fake.Reply = _ => "Chlorophyll absorbs sunlight [[S1]]. Also unicorns [[S9]] exist.";

        var events = await ReadSse(await Ask(learner, conv.Id, "How does chlorophyll absorb sunlight?"));
        Assert.Equal("done", events[^1].Event);
        Assert.Equal("citations", events[^2].Event);
        var streamed = Streamed(events);
        Assert.Equal("Chlorophyll absorbs sunlight [1]. Also unicorns  exist.", streamed);
        Assert.DoesNotContain("SECRET-THOUGHT", streamed);
        var done = Done(events);
        Assert.True(done.GetProperty("grounded").GetBoolean());
        Assert.Equal("answered", done.GetProperty("outcome").GetString());
        var cites = done.GetProperty("citations").EnumerateArray().ToList();
        var cite = Assert.Single(cites);
        Assert.Equal(course.LessonId, cite.GetProperty("lessonId").GetGuid());
        Assert.Equal("Plant energy", cite.GetProperty("lessonTitle").GetString());
        var chunkId = cite.GetProperty("chunkId").GetGuid();
        Assert.True(await fx.WithDb(db => db.Set<AiChunk>().AnyAsync(c => c.Id == chunkId && c.CourseId == course.CourseId)));

        // Request shape: streamed Messages API call with cached system prompt, no tools, data delimiters, refusal fallback.
        var body = JsonDocument.Parse(Assert.Single(fx.Fake.Requests)).RootElement;
        Assert.Equal("claude-opus-5-5", body.GetProperty("model").GetString());
        Assert.True(body.GetProperty("stream").GetBoolean());
        Assert.False(body.TryGetProperty("tools", out _));
        Assert.Equal("ephemeral", body.GetProperty("system")[0].GetProperty("cache_control").GetProperty("type").GetString());
        Assert.Equal("default", body.GetProperty("fallbacks").GetString());
        var prompt = Assert.Single(fx.Fake.Prompts);
        Assert.Contains("<course_material>", prompt);
        Assert.Contains("Chlorophyll absorbs sunlight", prompt);
        // Embedded delimiter in course notes is neutralised: only our own closing tag remains.
        Assert.Equal(1, prompt.Split("</course_material>").Length - 1);

        // Persisted, private, metered.
        var detail = await Read<ConversationDetailDto>(await learner.GetAsync($"/api/ai/tutor/conversations/{conv.Id}"));
        Assert.Equal(["user", "assistant"], detail.Messages.Select(m => m.Role));
        Assert.Single(detail.Messages[1].Citations);
        var usage = await fx.WithDb(db => db.Set<AiUsageRecord>().SingleAsync(u => u.UserId == learnerId));
        Assert.Equal("tutor", usage.Feature);
        Assert.Equal(120, usage.InputTokens);
        Assert.Equal(80, usage.OutputTokens);
        Assert.True(usage.CostEstimate > 0);
    }

    [Fact]
    public async Task Transcript_chunks_are_cited_with_timestamp()
    {
        fx.Fake.Reset();
        var course = await fx.PublishedCourse();
        var (_, learner) = await fx.Learner(course.CourseId);
        var conv = await Conversation(learner, course.CourseId);
        fx.Fake.Reply = _ => "They produce ATP [[S1]].";
        var done = Done(await ReadSse(await Ask(learner, conv.Id, "What do mitochondria produce?")));
        var cite = Assert.Single(done.GetProperty("citations").EnumerateArray());
        Assert.Equal("Transcript", cite.GetProperty("sourceKind").GetString());
        Assert.Equal(65, cite.GetProperty("startSeconds").GetInt32());
        Assert.Equal("01:05", cite.GetProperty("section").GetString());
        Assert.Equal(course.Lesson2Id, cite.GetProperty("lessonId").GetGuid());
    }

    [Fact]
    public async Task No_grounding_refuses_without_calling_the_model()
    {
        fx.Fake.Reset();
        var course = await fx.PublishedCourse();
        var (_, learner) = await fx.Learner(course.CourseId);
        var conv = await Conversation(learner, course.CourseId);
        var done = Done(await ReadSse(await Ask(learner, conv.Id, "Who won the football world cup?")));
        Assert.Equal("not_covered", done.GetProperty("outcome").GetString());
        Assert.False(done.GetProperty("grounded").GetBoolean());
        Assert.Contains("isn't covered in this course", done.GetProperty("content").GetString());
        Assert.Empty(fx.Fake.Requests);
    }

    [Fact]
    public async Task Model_not_covered_or_uncited_answers_become_refusals()
    {
        fx.Fake.Reset();
        var course = await fx.PublishedCourse();
        var (_, learner) = await fx.Learner(course.CourseId);
        var conv = await Conversation(learner, course.CourseId);

        fx.Fake.Reply = _ => "NOT_COVERED";
        var events = await ReadSse(await Ask(learner, conv.Id, "What colour is chlorophyll exactly?"));
        Assert.DoesNotContain("NOT_COVERED", Streamed(events));
        Assert.Equal("not_covered", Done(events).GetProperty("outcome").GetString());

        fx.Fake.Reply = _ => "Chlorophyll is purple, trust me.";
        var done = Done(await ReadSse(await Ask(learner, conv.Id, "What colour is chlorophyll?")));
        Assert.Equal("not_covered", done.GetProperty("outcome").GetString());
        Assert.Empty(done.GetProperty("citations").EnumerateArray());

        fx.Fake.Reply = _ => "partial [[S1]]";
        fx.Fake.StopReason = "refusal";
        done = Done(await ReadSse(await Ask(learner, conv.Id, "chlorophyll sunlight")));
        Assert.Equal("refused", done.GetProperty("outcome").GetString());
    }

    [Fact]
    public async Task Blocked_while_exam_attempt_in_progress_in_that_course()
    {
        fx.Fake.Reset();
        var course = await fx.PublishedCourse();
        var (learnerId, learner) = await fx.Learner(course.CourseId);
        var conv = await Conversation(learner, course.CourseId);
        var exam = new Mastemy.Api.Domain.Assessment { CourseId = course.CourseId, Title = "Final", Kind = AssessmentKind.FinalAssessment, Mode = AssessmentMode.Exam };
        var practice = new Mastemy.Api.Domain.Assessment { CourseId = course.CourseId, Title = "Practice", Kind = AssessmentKind.LessonPractice, Mode = AssessmentMode.Practice };
        await fx.WithDb(async db =>
        {
            db.Assessments.AddRange(exam, practice);
            db.Attempts.Add(new Attempt { AssessmentId = practice.Id, UserId = learnerId, Status = AttemptStatus.InProgress });
            await db.SaveChangesAsync();
        });
        fx.Fake.Reply = _ => "Sunlight [[S1]].";
        // A practice-mode attempt does not block.
        Assert.Equal("answered", Done(await ReadSse(await Ask(learner, conv.Id, "chlorophyll sunlight"))).GetProperty("outcome").GetString());

        var attempt = new Attempt { AssessmentId = exam.Id, UserId = learnerId, Status = AttemptStatus.InProgress, DeadlineAt = DateTime.UtcNow.AddHours(1) };
        await fx.WithDb(async db => { db.Attempts.Add(attempt); await db.SaveChangesAsync(); });
        await AssertProblem(await Ask(learner, conv.Id, "chlorophyll sunlight"), 403, "exam_in_progress");
        await AssertProblem(await learner.PostAsync("/api/ai/tutor/conversations", JsonBody(new { courseId = course.CourseId })), 403, "exam_in_progress");
        await AssertProblem(await learner.PostAsync("/api/ai/practice", JsonBody(new { courseId = course.CourseId, count = 1 })), 403, "exam_in_progress");

        await fx.WithDb(async db => { (await db.Attempts.SingleAsync(a => a.Id == attempt.Id)).Status = AttemptStatus.Submitted; await db.SaveChangesAsync(); });
        Assert.Equal("answered", Done(await ReadSse(await Ask(learner, conv.Id, "chlorophyll sunlight"))).GetProperty("outcome").GetString());
    }

    [Fact]
    public async Task Declines_messages_containing_an_active_question_stem_and_never_sends_answer_keys()
    {
        fx.Fake.Reset();
        var course = await fx.PublishedCourse();
        var (_, learner) = await fx.Learner(course.CourseId);
        const string stem = "Which organelle hosts the light reactions that split water and release oxygen during photosynthesis?";
        await fx.ActiveQuestion(course.CourseId, course.OwnerId, stem, "ZQX1");
        var conv = await Conversation(learner, course.CourseId);

        // Near-verbatim paste (case/punctuation changed, extra words) is declined without calling the model.
        var done = Done(await ReadSse(await Ask(learner, conv.Id,
            "Quiz help pls: which organelle hosts the light reactions that split water, and release oxygen during photosynthesis??? A or B")));
        Assert.Equal("declined_assessment_item", done.GetProperty("outcome").GetString());
        Assert.Empty(fx.Fake.Requests);

        // A concept question in the learner's own words is answered, and no answer-key text reaches the prompt.
        fx.Fake.Reply = _ => "The thylakoid membrane [[S1]].";
        done = Done(await ReadSse(await Ask(learner, conv.Id, "Explain the thylakoid light reactions")));
        Assert.Equal("answered", done.GetProperty("outcome").GetString());
        var all = fx.Fake.AllRequests;
        foreach (var secret in new[] { "KEYOPT-ZQX1", "WRONGOPT-ZQX1", "RATIONALE-ZQX1", "WRONGWHY-ZQX1", "EXPLAIN-ZQX1", stem })
            Assert.DoesNotContain(secret, all);
        Assert.False(await fx.WithDb(db => db.Set<AiChunk>().AnyAsync(c => c.Text.Contains("ZQX1"))));
    }

    [Fact]
    public async Task Premium_chunks_are_only_retrieved_for_entitled_learners()
    {
        fx.Fake.Reset();
        var course = await fx.PublishedCourse();
        var (_, free) = await fx.Learner(course.CourseId);
        var (_, paid) = await fx.Learner(course.CourseId, premium: true);
        fx.Fake.Reply = _ => "Rubisco [[S1]].";

        var freeConv = await Conversation(free, course.CourseId);
        var done = Done(await ReadSse(await Ask(free, freeConv.Id, "What does rubisco zebrafinch do in the Calvin cycle?")));
        Assert.Equal("not_covered", done.GetProperty("outcome").GetString());
        Assert.DoesNotContain("zebrafinch", fx.Fake.AllRequests);

        var paidConv = await Conversation(paid, course.CourseId);
        done = Done(await ReadSse(await Ask(paid, paidConv.Id, "What does rubisco zebrafinch do in the Calvin cycle?")));
        Assert.Equal("answered", done.GetProperty("outcome").GetString());
        Assert.Equal("PremiumNotes", Assert.Single(done.GetProperty("citations").EnumerateArray()).GetProperty("sourceKind").GetString());
        Assert.Contains("zebrafinch", fx.Fake.AllRequests);
    }

    [Fact]
    public async Task Budget_exhaustion_returns_429_before_calling_the_model()
    {
        fx.Fake.Reset();
        var course = await fx.PublishedCourse();
        var (learnerId, learner) = await fx.Learner(course.CourseId);
        var conv = await Conversation(learner, course.CourseId);
        var limit = fx.Factory.Services.GetRequiredService<AiOptions>().UserMonthlyTokens;
        await fx.WithDb(async db =>
        {
            db.Set<AiUsageRecord>().Add(new AiUsageRecord { UserId = learnerId, Feature = "tutor", Model = "claude-opus-5-5", InputTokens = limit, Period = DateTime.UtcNow.ToString("yyyy-MM") });
            await db.SaveChangesAsync();
        });
        await AssertProblem(await Ask(learner, conv.Id, "chlorophyll sunlight"), 429, "ai_budget_exhausted");
        Assert.Empty(fx.Fake.Requests);
        var me = await Read<UsageSummaryDto>(await learner.GetAsync("/api/ai/usage/me"));
        Assert.Equal("free", me.Plan);
        Assert.Equal(0, me.RemainingTokens);
    }

    [Fact]
    public async Task Conversations_are_private_to_their_owner_and_staff_see_metadata_only()
    {
        fx.Fake.Reset();
        var course = await fx.PublishedCourse();
        var (learnerId, learner) = await fx.Learner(course.CourseId);
        var (_, other) = await fx.Learner(course.CourseId);
        var (_, admin) = await fx.User(Roles.Admin);
        var conv = await Conversation(learner, course.CourseId);
        fx.Fake.Reply = _ => "PRIVATE-ANSWER [[S1]]";
        await ReadSse(await Ask(learner, conv.Id, "chlorophyll sunlight"));

        Assert.Equal(HttpStatusCode.NotFound, (await other.GetAsync($"/api/ai/tutor/conversations/{conv.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await admin.GetAsync($"/api/ai/tutor/conversations/{conv.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await other.PostAsync($"/api/ai/tutor/conversations/{conv.Id}/messages", JsonBody(new { content = "hi there" }))).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await other.DeleteAsync($"/api/ai/tutor/conversations/{conv.Id}")).StatusCode);

        var metaRaw = await (await admin.GetAsync($"/api/admin/ai/conversations?userId={learnerId}")).Content.ReadAsStringAsync();
        Assert.Contains(conv.Id.ToString(), metaRaw);
        Assert.DoesNotContain("PRIVATE-ANSWER", metaRaw);
        Assert.DoesNotContain("chlorophyll", metaRaw);
        Assert.Equal(HttpStatusCode.Forbidden, (await learner.GetAsync("/api/admin/ai/conversations")).StatusCode);

        var usage = await Read<AdminUsageDto>(await admin.GetAsync("/api/admin/ai/usage"));
        Assert.Contains(usage.ByFeature, r => r.Key == "tutor");
        Assert.Equal(HttpStatusCode.Forbidden, (await learner.GetAsync("/api/admin/ai/usage")).StatusCode);
    }

    [Fact]
    public async Task Non_enrolled_users_and_draft_courses_are_rejected()
    {
        fx.Fake.Reset();
        var course = await fx.PublishedCourse();
        var (_, stranger) = await fx.User(Roles.Student);
        await AssertProblem(await stranger.PostAsync("/api/ai/tutor/conversations", JsonBody(new { courseId = course.CourseId })), 403, "not_enrolled");
        Assert.Equal(HttpStatusCode.NotFound, (await stranger.PostAsync("/api/ai/tutor/conversations", JsonBody(new { courseId = Guid.NewGuid() }))).StatusCode);
        Assert.Equal(HttpStatusCode.Unauthorized, (await fx.Factory.CreateClient().PostAsync("/api/ai/tutor/conversations", JsonBody(new { courseId = course.CourseId }))).StatusCode);
        var (_, learner) = await fx.Learner(course.CourseId);
        var conv = await Conversation(learner, course.CourseId);
        await AssertProblem(await Ask(learner, conv.Id, new string('x', 2001)), 400, "invalid_message");
    }

    private AiMaintenanceWorker Worker() => new(fx.Factory.Services.GetRequiredService<IServiceScopeFactory>(),
        fx.Factory.Services.GetRequiredService<AiOptions>(), Microsoft.Extensions.Logging.Abstractions.NullLogger<AiMaintenanceWorker>.Instance);

    [Fact]
    public async Task Index_follows_new_published_versions_and_retention_purges_old_conversations()
    {
        fx.Fake.Reset();
        var course = await fx.PublishedCourse();
        using (var scope = fx.Factory.Services.CreateScope())
        {
            var indexer = scope.ServiceProvider.GetRequiredService<AiIndexer>();
            Assert.Equal(1, await indexer.EnsureIndexed(course.CourseId, default));
            // Draft edit is invisible until a new snapshot is published.
            await fx.WithDb(async db => { (await db.Lessons.SingleAsync(l => l.Id == course.Lesson2Id)).NotesMarkdown = "Draft-only kumquat text."; await db.SaveChangesAsync(); });
            await Worker().RunOnce(default);
            Assert.False(await fx.WithDb(db => db.Set<AiChunk>().AnyAsync(c => c.CourseId == course.CourseId && c.Text.Contains("kumquat"))));
            using (var pub = fx.Factory.Services.CreateScope())
            {
                var db = pub.ServiceProvider.GetRequiredService<Mastemy.Api.Data.AppDbContext>();
                var c = await db.Courses.SingleAsync(x => x.Id == course.CourseId);
                await pub.ServiceProvider.GetRequiredService<Mastemy.Api.Modules.Catalog.CourseSnapshotService>().AddSnapshot(c, course.OwnerId, DateTime.UtcNow);
                await db.SaveChangesAsync();
            }
            await Worker().RunOnce(default);
            Assert.True(await fx.WithDb(db => db.Set<AiChunk>().AnyAsync(c => c.CourseId == course.CourseId && c.SnapshotVersion == 2 && c.Text.Contains("kumquat"))));
        }

        var (_, learner) = await fx.Learner(course.CourseId);
        var conv = await Conversation(learner, course.CourseId);
        await fx.WithDb(async db =>
        {
            var c = await db.Set<AiConversation>().SingleAsync(x => x.Id == conv.Id);
            c.LastMessageAt = DateTime.UtcNow.AddDays(-91);
            db.Set<AiMessage>().Add(new AiMessage { ConversationId = c.Id, Content = "old" });
            await db.SaveChangesAsync();
        });
        await fx.WithDb(db => AiMaintenanceWorker.PurgeExpired(db, fx.Factory.Services.GetRequiredService<AiOptions>(), DateTime.UtcNow, default));
        Assert.False(await fx.WithDb(db => db.Set<AiConversation>().AnyAsync(x => x.Id == conv.Id)));
        Assert.False(await fx.WithDb(db => db.Set<AiMessage>().AnyAsync(x => x.ConversationId == conv.Id)));
    }

    [Fact]
    public async Task Unconfigured_provider_returns_503_on_every_ai_endpoint()
    {
        var course = await fx.PublishedCourse();
        await using var bare = fx.Factory.WithWebHostBuilder(b => b.UseSetting("Ai:ApiKey", ""));
        var (_, learner) = await fx.UserOn(bare, Roles.Student);
        var (_, instructor) = await fx.UserOn(bare, Roles.Instructor);
        var status = await Read<AiStatusDto>(await learner.GetAsync("/api/ai/status"));
        Assert.False(status.Configured);
        await AssertProblem(await learner.PostAsync("/api/ai/tutor/conversations", JsonBody(new { courseId = course.CourseId })), 503, "ai_not_configured");
        await AssertProblem(await learner.GetAsync("/api/ai/tutor/conversations"), 503, "ai_not_configured");
        await AssertProblem(await learner.PostAsync($"/api/ai/tutor/conversations/{Guid.NewGuid()}/messages", JsonBody(new { content = "hi" })), 503, "ai_not_configured");
        await AssertProblem(await learner.PostAsync("/api/ai/practice", JsonBody(new { courseId = course.CourseId })), 503, "ai_not_configured");
        await AssertProblem(await learner.GetAsync("/api/ai/usage/me"), 503, "ai_not_configured");
        await AssertProblem(await instructor.PostAsync($"/api/ai/studio/courses/{course.CourseId}/assist", JsonBody(new { kind = "Outline" })), 503, "ai_not_configured");
        await AssertProblem(await instructor.PostAsync($"/api/ai/studio/courses/{course.CourseId}/mcq-drafts", JsonBody(new { count = 1 })), 503, "ai_not_configured");
    }
}
