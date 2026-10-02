using System.Net;
using System.Text;
using System.Text.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Resources;
using Microsoft.EntityFrameworkCore;
using static Mastemy.Tests.Resources.ResourcesFixture;

namespace Mastemy.Tests.Resources;

public class ResourceTests(ResourcesFixture fx) : IClassFixture<ResourcesFixture>
{
    private static async Task<string> ErrorCode(HttpResponseMessage r)
    {
        using var doc = JsonDocument.Parse(await r.Content.ReadAsStringAsync());
        return doc.RootElement.GetProperty("type").GetString()!;
    }

    private string BlobPath(Guid courseId, string sha) => Path.Combine(fx.RootPath, courseId.ToString("N"), sha[..2], sha[2..4], sha);

    private static string UploadUrl(Course c, Guid? lessonId = null, bool premium = false, string kind = "Resource", string? lang = null) =>
        $"/api/studio/courses/{c.Id}/resources?kind={kind}&isPremium={premium.ToString().ToLowerInvariant()}"
        + (lessonId is { } l ? $"&lessonId={l}" : "") + (lang is null ? "" : $"&language={lang}");

    [Theory]
    [InlineData("lecture.mp4")]
    [InlineData("clip.MOV")]
    [InlineData("talk.webm")]
    [InlineData("audio.mp3")]
    [InlineData("x.mkv")]
    public async Task Video_and_audio_extensions_are_rejected(string name)
    {
        var (aid, author) = await fx.User(Roles.Instructor);
        var (course, _) = await fx.Course(aid);
        var r = await author.PostAsync(UploadUrl(course), File(name, Pdf(100)));
        Assert.Equal(HttpStatusCode.UnsupportedMediaType, r.StatusCode);
        Assert.Equal("video_not_allowed", await ErrorCode(r));
        Assert.Contains("YouTube", await r.Content.ReadAsStringAsync());
    }

    public static IEnumerable<object[]> DisguisedVideos()
    {
        var mp4 = new byte[200]; new byte[] { 0, 0, 0, 0x18 }.CopyTo(mp4, 0); "ftypisom"u8.ToArray().CopyTo(mp4, 4);
        var mkv = new byte[200]; new byte[] { 0x1A, 0x45, 0xDF, 0xA3 }.CopyTo(mkv, 0);
        var avi = new byte[200]; "RIFF\0\0\0\0AVI "u8.ToArray().CopyTo(avi, 0);
        var mp3 = new byte[200]; "ID3\u0003"u8.ToArray().CopyTo(mp3, 0);
        yield return [mp4, "notes.pdf"];
        yield return [mkv, "slides.pdf"];
        yield return [avi, "data.csv"];
        yield return [mp3, "readme.txt"];
    }

    [Theory]
    [MemberData(nameof(DisguisedVideos))]
    public async Task Video_disguised_with_an_allowed_extension_is_rejected_by_magic_bytes(byte[] content, string name)
    {
        var (aid, author) = await fx.User(Roles.Instructor);
        var (course, _) = await fx.Course(aid);
        var r = await author.PostAsync(UploadUrl(course), File(name, content));
        Assert.Equal(HttpStatusCode.UnsupportedMediaType, r.StatusCode);
        Assert.Equal("video_not_allowed", await ErrorCode(r));
        Assert.Equal(0, await fx.WithDb(db => db.ResourceFiles.CountAsync(x => x.CourseId == course.Id)));
    }

    [Fact]
    public async Task Archives_unknown_types_and_mismatched_content_are_rejected()
    {
        var (aid, author) = await fx.User(Roles.Instructor);
        var (course, _) = await fx.Course(aid);
        var zip = await author.PostAsync(UploadUrl(course), File("bundle.zip", "PK\u0003\u0004rest"u8.ToArray()));
        Assert.Equal("archive_not_allowed", await ErrorCode(zip));
        var exe = await author.PostAsync(UploadUrl(course), File("tool.exe", "MZ"u8.ToArray()));
        Assert.Equal("file_type_not_allowed", await ErrorCode(exe));
        var fakePdf = await author.PostAsync(UploadUrl(course), File("x.pdf", "hello"u8.ToArray()));
        Assert.Equal("file_content_mismatch", await ErrorCode(fakePdf));
        var fakeDocx = await author.PostAsync(UploadUrl(course), File("x.docx", "PK\u0003\u0004not a zip"u8.ToArray()));
        Assert.Equal("file_content_mismatch", await ErrorCode(fakeDocx));
    }

    [Fact]
    public async Task Per_file_limit_quota_and_dedupe_are_enforced()
    {
        var (aid, author) = await fx.User(Roles.Instructor);
        var (course, _) = await fx.Course(aid);
        var tooBig = await author.PostAsync(UploadUrl(course), File("big.pdf", Pdf((int)MaxFileBytes + 1)));
        Assert.Equal(HttpStatusCode.RequestEntityTooLarge, tooBig.StatusCode);
        Assert.Equal("file_too_large", await ErrorCode(tooBig));

        var first = await author.PostAsync(UploadUrl(course), File("a.pdf", Pdf(3500, (byte)'a')));
        Assert.Equal(HttpStatusCode.Created, first.StatusCode);
        var dup = await author.PostAsync(UploadUrl(course), File("copy.pdf", Pdf(3500, (byte)'a')));
        Assert.Equal(HttpStatusCode.Conflict, dup.StatusCode);
        Assert.Equal("duplicate_resource", await ErrorCode(dup));
        var over = await author.PostAsync(UploadUrl(course), File("b.pdf", Pdf(3500, (byte)'b')));
        Assert.Equal(HttpStatusCode.RequestEntityTooLarge, over.StatusCode);
        Assert.Equal("quota_exceeded", await ErrorCode(over));
        var fits = await author.PostAsync(UploadUrl(course), File("c.pdf", Pdf(2000, (byte)'c')));
        Assert.Equal(HttpStatusCode.Created, fits.StatusCode);
        var usage = await Read<ResourceUsageDto>(await author.GetAsync($"/api/studio/courses/{course.Id}/resources/usage"));
        Assert.Equal(5500, usage.UsedBytes);
        // No temp files left behind after rejected uploads.
        Assert.Empty(Directory.GetFiles(Path.Combine(fx.RootPath, ".staging")));
    }

    [Fact]
    public async Task Only_course_editors_can_upload_and_live_courses_must_be_in_update()
    {
        var (aid, _) = await fx.User(Roles.Instructor);
        var (_, stranger) = await fx.User(Roles.Instructor);
        var (course, _) = await fx.Course(aid);
        var r = await stranger.PostAsync(UploadUrl(course), File("a.pdf", Pdf(50)));
        Assert.Equal(HttpStatusCode.Forbidden, r.StatusCode);

        var (pid, publishedOwner) = await fx.User(Roles.Instructor);
        var (published, _) = await fx.Course(pid, CourseStatus.Published);
        var locked = await publishedOwner.PostAsync(UploadUrl(published), File("a.pdf", Pdf(50)));
        Assert.Equal(HttpStatusCode.Conflict, locked.StatusCode);
        Assert.Equal("course_not_editable", await ErrorCode(locked));
    }

    [Fact]
    public async Task Path_traversal_file_names_are_neutralized()
    {
        var (aid, author) = await fx.User(Roles.Instructor);
        var (course, lessonId) = await fx.Course(aid);
        var dto = await Read<ResourceDto>(await author.PostAsync(UploadUrl(course, lessonId), File("../../../etc/passwd.pdf", Pdf(80))));
        Assert.Equal("passwd.pdf", dto.FileName);
        Assert.Matches("^[0-9a-f]{64}$", dto.Sha256);
        var stored = await fx.WithDb(db => db.ResourceFiles.SingleAsync(x => x.Id == dto.Id));
        Assert.Equal(course.Id.ToString("N") + "/" + dto.Sha256, stored.StorageKey);
        Assert.True(System.IO.File.Exists(BlobPath(course.Id, dto.Sha256)));

        Assert.Equal("evil.txt", FileTypePolicy.SanitizeFileName(@"..\..\windows\evil.txt"));
        Assert.Equal("file", FileTypePolicy.SanitizeFileName(".."));
        Assert.Equal("a_b.pdf", FileTypePolicy.SanitizeFileName("a\u0000b.pdf"));
        Assert.Equal("hidden.pdf", FileTypePolicy.SanitizeFileName(".hidden.pdf"));
        Assert.Equal("x.pdf", FileTypePolicy.SanitizeFileName("/abs/x.pdf"));
    }

    [Fact]
    public async Task Premium_resources_are_listed_locked_until_entitled_and_free_ones_are_open()
    {
        var (aid, author) = await fx.User(Roles.Instructor);
        var (course, lessonId) = await fx.Course(aid);
        var free = await Read<ResourceDto>(await author.PostAsync(UploadUrl(course, lessonId), File("free.pdf", Pdf(120, (byte)'f'))));
        var prem = await Read<ResourceDto>(await author.PostAsync(UploadUrl(course, lessonId, premium: true), File("premium.pdf", Pdf(130, (byte)'p'))));

        var anon = fx.Factory.CreateClient();
        var list = await Read<List<LearnerResourceDto>>(await anon.GetAsync($"/api/learn/lessons/{lessonId}/resources"));
        Assert.Equal(2, list.Count);
        var lockedRow = list.Single(x => x.Id == prem.Id);
        Assert.True(lockedRow.Locked);
        Assert.Null(lockedRow.DownloadUrl);
        Assert.False(list.Single(x => x.Id == free.Id).Locked);

        var freeDl = await anon.GetAsync($"/api/learn/resources/{free.Id}/download");
        Assert.Equal(HttpStatusCode.OK, freeDl.StatusCode);
        Assert.Equal("attachment", freeDl.Content.Headers.ContentDisposition!.DispositionType);
        Assert.Equal("nosniff", freeDl.Headers.GetValues("X-Content-Type-Options").Single());
        Assert.Equal("application/pdf", freeDl.Content.Headers.ContentType!.MediaType);
        Assert.Equal(Pdf(120, (byte)'f'), await freeDl.Content.ReadAsByteArrayAsync());

        Assert.Equal(HttpStatusCode.Unauthorized, (await anon.GetAsync($"/api/learn/resources/{prem.Id}/download")).StatusCode);
        var (lid, learner) = await fx.User();
        var denied = await learner.GetAsync($"/api/learn/resources/{prem.Id}/download");
        Assert.Equal(HttpStatusCode.Forbidden, denied.StatusCode);
        Assert.Equal("premium_required", await ErrorCode(denied));

        await fx.WithDb(async db =>
        {
            db.Entitlements.Add(new Entitlement { UserId = lid, CourseId = course.Id, Source = default, StartsAt = DateTime.UtcNow.AddMinutes(-1) });
            await db.SaveChangesAsync();
        });
        var mine = await Read<List<LearnerResourceDto>>(await learner.GetAsync($"/api/learn/lessons/{lessonId}/resources"));
        Assert.False(mine.Single(x => x.Id == prem.Id).Locked);
        var ok = await learner.GetAsync($"/api/learn/resources/{prem.Id}/download");
        Assert.Equal(HttpStatusCode.OK, ok.StatusCode);
        Assert.Contains("no-store", ok.Headers.CacheControl!.ToString());

        // Revoking the entitlement re-locks on the very next download (authorization is re-checked).
        await fx.WithDb(async db =>
        {
            var e = await db.Entitlements.SingleAsync(x => x.UserId == lid);
            e.RevokedAt = DateTime.UtcNow;
            await db.SaveChangesAsync();
        });
        Assert.Equal(HttpStatusCode.Forbidden, (await learner.GetAsync($"/api/learn/resources/{prem.Id}/download")).StatusCode);
    }

    [Fact]
    public async Task Draft_course_resources_are_hidden_from_learners()
    {
        var (aid, author) = await fx.User(Roles.Instructor);
        var (course, lessonId) = await fx.Course(aid, CourseStatus.Draft);
        var dto = await Read<ResourceDto>(await author.PostAsync(UploadUrl(course, lessonId), File("d.pdf", Pdf(60))));
        var anon = fx.Factory.CreateClient();
        Assert.Equal(HttpStatusCode.NotFound, (await anon.GetAsync($"/api/learn/lessons/{lessonId}/resources")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await anon.GetAsync($"/api/learn/resources/{dto.Id}/download")).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await author.GetAsync($"/api/learn/resources/{dto.Id}/download")).StatusCode);
    }

    [Fact]
    public async Task Replace_increments_version_and_delete_releases_blob()
    {
        var (aid, author) = await fx.User(Roles.Instructor);
        var (course, lessonId) = await fx.Course(aid);
        var v1 = await Read<ResourceDto>(await author.PostAsync(UploadUrl(course, lessonId), File("notes.txt", "version one"u8.ToArray())));
        Assert.True(System.IO.File.Exists(BlobPath(course.Id, v1.Sha256)));
        var v2 = await Read<ResourceDto>(await author.PutAsync($"/api/studio/resources/{v1.Id}/file", File("notes-v2.txt", "version two"u8.ToArray())));
        Assert.Equal(v1.Id, v2.Id);
        Assert.Equal(2, v2.Version);
        Assert.Equal("text/plain", v2.ContentType);
        Assert.False(System.IO.File.Exists(BlobPath(course.Id, v1.Sha256))); // never published: nothing serves the old version
        var anon = fx.Factory.CreateClient();
        Assert.Equal("version two", await anon.GetStringAsync($"/api/learn/resources/{v1.Id}/download"));

        var patched = await Read<ResourceDto>(await author.PatchAsync($"/api/studio/resources/{v1.Id}", JsonBody(new { isPremium = true })));
        Assert.True(patched.IsPremium);

        Assert.Equal(HttpStatusCode.NoContent, (await author.DeleteAsync($"/api/studio/resources/{v1.Id}")).StatusCode);
        Assert.False(System.IO.File.Exists(BlobPath(course.Id, v2.Sha256)));
        Assert.Equal(HttpStatusCode.NotFound, (await anon.GetAsync($"/api/learn/resources/{v1.Id}/download")).StatusCode);
        Assert.Equal(1, await fx.WithDb(db => db.AuditLogs.CountAsync(a => a.Action == "resource.deleted" && a.EntityId == v1.Id.ToString())));
    }

    private const string Srt = "1\r\n00:00:01,000 --> 00:00:03,500\r\nWelcome to <i>networking</i> basics\r\n\r\n2\r\n00:01:02,250 --> 00:01:05,000\r\nA subnet mask splits the address\r\n";

    [Fact]
    public async Task Srt_captions_are_validated_served_as_vtt_and_searchable()
    {
        var (aid, author) = await fx.User(Roles.Instructor);
        var (course, lessonId) = await fx.Course(aid);
        var bad = await author.PostAsync(UploadUrl(course, lessonId, kind: "Caption", lang: "en"),
            File("bad.srt", "1\n00:00:05,000 --> 00:00:01,000\nbackwards\n"u8.ToArray()));
        Assert.Equal("invalid_caption_file", await ErrorCode(bad));
        var noLang = await author.PostAsync(UploadUrl(course, lessonId, kind: "Caption", lang: "not a tag"), File("c.srt", Encoding.UTF8.GetBytes(Srt)));
        Assert.Equal("invalid_language", await ErrorCode(noLang));
        var premiumCaption = await author.PostAsync(UploadUrl(course, lessonId, premium: true, kind: "Caption", lang: "en"), File("c.srt", Encoding.UTF8.GetBytes(Srt)));
        Assert.Equal("captions_must_be_free", await ErrorCode(premiumCaption));
        var pdfCaption = await author.PostAsync(UploadUrl(course, lessonId, kind: "Caption", lang: "en"), File("c.pdf", Pdf(40)));
        Assert.Equal("file_type_not_allowed", await ErrorCode(pdfCaption));

        var cap = await Read<ResourceDto>(await author.PostAsync(UploadUrl(course, lessonId, kind: "Caption", lang: "en-gb"), File("captions.srt", Encoding.UTF8.GetBytes(Srt))));
        Assert.Equal("Caption", cap.Kind);
        Assert.Equal("en-GB", cap.Language);

        var anon = fx.Factory.CreateClient();
        var tracks = await Read<List<CaptionTrackDto>>(await anon.GetAsync($"/api/learn/lessons/{lessonId}/captions"));
        var track = Assert.Single(tracks);
        var vtt = await anon.GetAsync(track.Url);
        Assert.Equal("text/vtt", vtt.Content.Headers.ContentType!.MediaType);
        var body = await vtt.Content.ReadAsStringAsync();
        Assert.StartsWith("WEBVTT", body);
        Assert.Contains("00:00:01.000 --> 00:00:03.500", body);
        Assert.Contains("00:01:02.250 --> 00:01:05.000", body);
        Assert.DoesNotContain(",000", body);
        // Captions are not listed as downloadable resources.
        Assert.Empty(await Read<List<LearnerResourceDto>>(await anon.GetAsync($"/api/learn/lessons/{lessonId}/resources")));

        var hits = await Read<List<TranscriptMatch>>(await anon.GetAsync($"/api/learn/lessons/{lessonId}/transcript?q=SUBNET"));
        var hit = Assert.Single(hits);
        Assert.Equal(62.25, hit.StartSeconds);
        Assert.Equal("00:01:02.250", hit.Start);
        Assert.Equal("A subnet mask splits the address", hit.Text);
        var tagged = Assert.Single(await Read<List<TranscriptMatch>>(await anon.GetAsync($"/api/learn/lessons/{lessonId}/transcript?q=networking basics")));
        Assert.Equal("Welcome to networking basics", tagged.Text);
        Assert.Empty(await Read<List<TranscriptMatch>>(await anon.GetAsync($"/api/learn/lessons/{lessonId}/transcript?q=subnet&language=ar")));
        Assert.Equal(HttpStatusCode.BadRequest, (await anon.GetAsync($"/api/learn/lessons/{lessonId}/transcript?q=a")).StatusCode);
    }

    [Fact]
    public void Caption_parser_handles_vtt_and_converts_srt()
    {
        var vtt = Captions.Parse("WEBVTT\n\nNOTE comment\n\nintro\n00:01.000 --> 00:02.000 align:start\nHello\n", "vtt");
        Assert.Equal(TimeSpan.FromSeconds(1), Assert.Single(vtt).Start);
        var srt = Captions.Parse(Srt, "srt");
        Assert.Equal(2, srt.Count);
        Assert.Equal("WEBVTT\n\n00:00:01.000 --> 00:00:03.500\nWelcome to <i>networking</i> basics\n\n00:01:02.250 --> 00:01:05.000\nA subnet mask splits the address\n\n",
            Captions.ToVtt(srt));
        Assert.Throws<Mastemy.Api.Infrastructure.AppException>(() => Captions.Parse("no header\n\n00:01.000 --> 00:02.000\nx", "vtt"));
        Assert.Throws<Mastemy.Api.Infrastructure.AppException>(() => Captions.Parse("1\n00:00:01,000 -> 00:00:02,000\nx", "srt"));
        Assert.Throws<Mastemy.Api.Infrastructure.AppException>(() => Captions.Parse("1\n00:00:61,000 --> 00:01:02,000\nx", "srt"));
    }
}
