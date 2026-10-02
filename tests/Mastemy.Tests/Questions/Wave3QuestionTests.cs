using System.IO.Compression;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Questions;
using Microsoft.EntityFrameworkCore;
using static Mastemy.Tests.Questions.Wave3QuestionsFixture;

namespace Mastemy.Tests.Questions;

public class Wave3QuestionTests(Wave3QuestionsFixture fx) : IClassFixture<Wave3QuestionsFixture>
{
    private static object Input(string ext, string stem = "What is 2+2?", Guid? caseGroupId = null, int? caseOrder = null,
        CognitiveLevel? level = null, string optionA = "4") => new
    {
        externalId = ext, type = QuestionType.SingleChoice, language = "en", stem, explanation = "Basic arithmetic.", difficulty = Difficulty.Easy,
        skillCode = "MATH.ADD", certificationObjective = "", tags = new[] { "math" }, sourceReference = "original", allowShuffle = true,
        options = new[]
        {
            new { text = optionA, isCorrect = true, rationale = "Correct sum." },
            new { text = "5", isCorrect = false, rationale = "Off by one." },
        },
        cognitiveLevel = level, caseGroupId, caseGroupOrder = caseOrder,
    };

    private async Task<Guid> Image(Guid courseId, string fileName = "chart.png", bool premium = false, string type = "image/png")
    {
        var r = new ResourceFile { CourseId = courseId, FileName = fileName, ContentType = type, SizeBytes = 10, Sha256 = "x", StorageKey = "k", IsPremium = premium };
        await fx.WithDb(async db => { db.ResourceFiles.Add(r); await db.SaveChangesAsync(); });
        return r.Id;
    }

    private static MultipartFormDataContent Form(byte[] content, string fileName, params (string Key, string Value)[] fields)
    {
        var form = new MultipartFormDataContent();
        var file = new ByteArrayContent(content);
        file.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
        form.Add(file, "file", fileName);
        foreach (var (k, v) in fields) form.Add(new StringContent(v), k);
        return form;
    }

    private static string[] Row(string ext, string course, string stem = "Stem text", string image = "") =>
        [ext, "SingleChoice", "en", course, stem, "Alpha", "Beta", "A", "Because.", "Why A", "Why B", "Easy", image];

    private static readonly string[] CustomHeader =
        ["Question ID", "Type", "Lang", "Course", "Question", "Choice A", "Choice B", "Answer", "Explanation", "Rationale A", "Rationale B", "Level", "Image"];

    [Fact]
    public async Task Rich_stems_are_validated_and_images_must_be_course_resources()
    {
        var (authorId, author) = await fx.User(Roles.Instructor);
        var course = await fx.Course(authorId);
        var other = await fx.Course(authorId);
        var img = await Image(course.Id);
        var foreignImg = await Image(other.Id);
        var premiumImg = await Image(course.Id, "p.png", premium: true);
        var pdf = await Image(course.Id, "doc.pdf", type: "application/pdf");

        var bad = await author.PostAsync($"/api/studio/courses/{course.Id}/questions", JsonBody(Input("H-1", "# Heading stem")));
        Assert.Equal(HttpStatusCode.BadRequest, bad.StatusCode);
        Assert.Contains("headings", await bad.Content.ReadAsStringAsync());
        var html = await author.PostAsync($"/api/studio/courses/{course.Id}/questions", JsonBody(Input("H-2", "x", optionA: "<img src=x onerror=alert(1)>")));
        Assert.Equal(HttpStatusCode.BadRequest, html.StatusCode);

        foreach (var badId in new[] { foreignImg, premiumImg, pdf, Guid.NewGuid() })
        {
            var r = await author.PostAsync($"/api/studio/courses/{course.Id}/questions", JsonBody(Input("I-" + badId.ToString("N")[..6], $"See ![c](resource:{badId})")));
            Assert.Equal(HttpStatusCode.BadRequest, r.StatusCode);
        }

        var stem = $"Given the table:\r\n\r\n| x | y |\n|---|---|\n| 1 | 2 |\n\nand $x^2$, see ![chart](resource:{img})\n\n```\nprint('<hi>')\n```";
        var ok = await Read<QuestionDto>(await author.PostAsync($"/api/studio/courses/{course.Id}/questions",
            JsonBody(Input("R-1", stem, level: CognitiveLevel.Analyze))));
        Assert.DoesNotContain("\r", ok.Version.Stem); // line endings normalized
        Assert.Equal(CognitiveLevel.Analyze, ok.Meta!.CognitiveLevel);
        var detail = await Read<QuestionDetailDto>(await author.GetAsync($"/api/studio/questions/{ok.Id}"));
        Assert.Equal(CognitiveLevel.Analyze, detail.Question.Meta!.CognitiveLevel);
    }

    [Fact]
    public async Task Case_groups_are_course_scoped_and_keep_members()
    {
        var (authorId, author) = await fx.User(Roles.Instructor);
        var (strangerId, stranger) = await fx.User(Roles.Instructor);
        var course = await fx.Course(authorId);
        var otherCourse = await fx.Course(strangerId);
        var img = await Image(course.Id);

        var badExhibit = await author.PostAsync($"/api/studio/courses/{course.Id}/case-groups", JsonBody(new { title = "Case", exhibitMarkdown = "<iframe>", resourceIds = Array.Empty<Guid>() }));
        Assert.Equal(HttpStatusCode.BadRequest, badExhibit.StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await stranger.PostAsync($"/api/studio/courses/{course.Id}/case-groups",
            JsonBody(new { title = "Case", exhibitMarkdown = "Exhibit", resourceIds = Array.Empty<Guid>() }))).StatusCode);

        var g = await Read<CaseGroupDto>(await author.PostAsync($"/api/studio/courses/{course.Id}/case-groups",
            JsonBody(new { title = "Case study 1", exhibitMarkdown = $"Balance sheet:\n\n| a | b |\n|---|---|\n| 1 | 2 |\n\n![bs](resource:{img})", resourceIds = new[] { img } })));
        Assert.Equal([img], g.ResourceIds);

        var q1 = await Read<QuestionDto>(await author.PostAsync($"/api/studio/courses/{course.Id}/questions", JsonBody(Input("CG-2", caseGroupId: g.Id, caseOrder: 2))));
        var q2 = await Read<QuestionDto>(await author.PostAsync($"/api/studio/courses/{course.Id}/questions", JsonBody(Input("CG-1", caseGroupId: g.Id, caseOrder: 1))));
        Assert.Equal(g.Id, q1.Meta!.CaseGroupId);
        var fetched = await Read<CaseGroupDto>(await author.GetAsync($"/api/studio/case-groups/{g.Id}"));
        Assert.Equal([q2.Id, q1.Id], fetched.QuestionIds); // ordered by case order

        // A case group of another course cannot be referenced.
        var foreign = await Read<CaseGroupDto>(await stranger.PostAsync($"/api/studio/courses/{otherCourse.Id}/case-groups",
            JsonBody(new { title = "Other", exhibitMarkdown = "x", resourceIds = Array.Empty<Guid>() })));
        Assert.Equal(HttpStatusCode.BadRequest, (await author.PostAsync($"/api/studio/courses/{course.Id}/questions", JsonBody(Input("CG-X", caseGroupId: foreign.Id)))).StatusCode);

        Assert.Equal(HttpStatusCode.Conflict, (await author.DeleteAsync($"/api/studio/case-groups/{g.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await stranger.GetAsync($"/api/studio/case-groups/{g.Id}")).StatusCode);
    }

    [Fact]
    public async Task Xlsx_import_uses_column_mapping_and_maps_image_resources()
    {
        var (authorId, author) = await fx.User(Roles.Instructor);
        var course = await fx.Course(authorId);
        var img = await Image(course.Id, "Diagram.PNG");
        var xlsx = Xlsx.Write("Q", [CustomHeader, Row("X-1", course.Code, image: "diagram.png"), Row("X-2", course.Code)]);

        // Custom headers without mapping are rejected with a pointer to the mapping step.
        var noMap = await author.PostAsync($"/api/studio/courses/{course.Id}/questions/import/preview", Form(xlsx, "q.xlsx", ("mode", "create"), ("idempotencyKey", "k0-" + Guid.NewGuid())));
        Assert.Equal(HttpStatusCode.BadRequest, noMap.StatusCode);

        var inspect = await Read<ImportInspectResult>(await author.PostAsync($"/api/studio/courses/{course.Id}/questions/import/inspect", Form(xlsx, "q.xlsx")));
        Assert.Equal("xlsx", inspect.Format);
        Assert.Equal(2, inspect.RowCount);
        Assert.Equal("ExternalId", inspect.SuggestedMapping["Question ID"]);
        Assert.Equal("ImageResource", inspect.SuggestedMapping["Image"]);
        Assert.Equal("QuestionType", inspect.SuggestedMapping["Type"]);
        Assert.Equal("Language", inspect.SuggestedMapping["Lang"]);

        var mapping = JsonSerializer.Serialize(inspect.SuggestedMapping);
        var preview = await Read<ImportPreviewResult>(await author.PostAsync($"/api/studio/courses/{course.Id}/questions/import/preview",
            Form(xlsx, "q.xlsx", ("mode", "create"), ("idempotencyKey", "k1-" + Guid.NewGuid()), ("mapping", mapping))));
        Assert.Equal(0, preview.ErrorCount);
        var commit = await author.PostAsync($"/api/studio/courses/{course.Id}/questions/import/{preview.BatchId}/commit", null);
        Assert.Equal(HttpStatusCode.OK, commit.StatusCode);
        var stem = await fx.WithDb(db => db.Questions.Where(q => q.CourseId == course.Id && q.ExternalId == "X-1")
            .Join(db.QuestionVersions, q => q.Id, v => v.QuestionId, (q, v) => v.Stem).FirstAsync());
        Assert.Contains($"(resource:{img})", stem);

        // Unknown image file names are row errors.
        var bad = Xlsx.Write("Q", [CustomHeader, Row("X-3", course.Code, image: "missing.png")]);
        var p2 = await Read<ImportPreviewResult>(await author.PostAsync($"/api/studio/courses/{course.Id}/questions/import/preview",
            Form(bad, "q.xlsx", ("mode", "create"), ("idempotencyKey", "k2-" + Guid.NewGuid()), ("mapping", mapping))));
        Assert.Equal(1, p2.ErrorCount);
        Assert.Contains(p2.Rows[0].Errors, e => e.Contains("ImageResource"));

        // A mapping that targets an unknown column is rejected.
        var badMap = await author.PostAsync($"/api/studio/courses/{course.Id}/questions/import/preview",
            Form(xlsx, "q.xlsx", ("mode", "create"), ("idempotencyKey", "k3-" + Guid.NewGuid()), ("mapping", "{\"Question ID\":\"Nope\"}")));
        Assert.Equal(HttpStatusCode.BadRequest, badMap.StatusCode);
    }

    private static byte[] WorkbookWithFormula(string courseCode)
    {
        using var ms = new MemoryStream();
        using (var zip = new ZipArchive(ms, ZipArchiveMode.Create, true))
        {
            void Add(string name, string content) { using var s = zip.CreateEntry(name).Open(); s.Write(Encoding.UTF8.GetBytes(content)); }
            const string ns = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";
            Add("xl/workbook.xml", $"<workbook xmlns=\"{ns}\" xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\"><sheets><sheet name=\"S\" sheetId=\"1\" r:id=\"rId1\"/></sheets></workbook>");
            Add("xl/_rels/workbook.xml.rels", "<Relationships xmlns=\"http://schemas.openxmlformats.org/package/2006/relationships\"><Relationship Id=\"rId1\" Type=\"x\" Target=\"worksheets/sheet1.xml\"/></Relationships>");
            string C(string r, string v) => $"<c r=\"{r}\" t=\"inlineStr\"><is><t>{v}</t></is></c>";
            var header = string.Join("", new[] { "ExternalId", "QuestionType", "Language", "CourseCode", "Stem", "OptionA", "OptionB", "CorrectOptions", "Explanation", "ExplanationA", "ExplanationB", "Difficulty" }
                .Select((h, i) => C($"{(char)('A' + i)}1", h)));
            var row = C("A2", "F-1") + C("B2", "SingleChoice") + C("C2", "en") + C("D2", courseCode) +
                      "<c r=\"E2\" t=\"str\"><f>HYPERLINK(\"http://evil\",\"x\")</f><v>x</v></c>" +
                      C("F2", "a") + C("G2", "b") + C("H2", "A") + C("I2", "e") + C("J2", "ea") + C("K2", "eb") + C("L2", "Easy");
            Add("xl/worksheets/sheet1.xml", $"<worksheet xmlns=\"{ns}\"><sheetData><row r=\"1\">{header}</row><row r=\"2\">{row}</row></sheetData></worksheet>");
        }
        return ms.ToArray();
    }

    [Fact]
    public async Task Xlsx_formula_cells_are_rejected_and_nothing_is_stored()
    {
        var (authorId, author) = await fx.User(Roles.Instructor);
        var course = await fx.Course(authorId);
        var r = await author.PostAsync($"/api/studio/courses/{course.Id}/questions/import/preview",
            Form(WorkbookWithFormula(course.Code), "q.xlsx", ("mode", "create"), ("idempotencyKey", "f-" + Guid.NewGuid())));
        Assert.Equal(HttpStatusCode.BadRequest, r.StatusCode);
        var body = await r.Content.ReadAsStringAsync();
        Assert.Contains("malformed_xlsx", body);
        Assert.Contains("E2", body);
        Assert.Equal(0, await fx.WithDb(db => db.ImportBatches.CountAsync(b => b.CourseId == course.Id)));
    }

    [Fact]
    public async Task Xlsx_template_and_export_are_downloadable_spreadsheets()
    {
        var anon = fx.Factory.CreateClient();
        var t = await anon.GetAsync("/api/templates/mcq-import.xlsx");
        Assert.Equal(HttpStatusCode.OK, t.StatusCode);
        var rows = Xlsx.Read(await t.Content.ReadAsByteArrayAsync(), 100);
        Assert.Equal(QuestionImportService.Columns, rows[0]);
        Assert.Contains("ImageResource", rows[0]);

        var (authorId, author) = await fx.User(Roles.Instructor);
        var course = await fx.Course(authorId);
        await Read<QuestionDto>(await author.PostAsync($"/api/studio/courses/{course.Id}/questions", JsonBody(Input("E-1", optionA: "-1"))));
        var x = await author.GetAsync($"/api/studio/courses/{course.Id}/questions/export.xlsx");
        Assert.Equal(HttpStatusCode.OK, x.StatusCode);
        var exported = Xlsx.Read(await x.Content.ReadAsByteArrayAsync(), 100);
        Assert.Equal("E-1", exported[1][0]);
        Assert.Equal("'-1", exported[1][9]); // formula-looking value neutralized
        var (_, stranger) = await fx.User(Roles.Instructor);
        Assert.Equal(HttpStatusCode.Forbidden, (await stranger.GetAsync($"/api/studio/courses/{course.Id}/questions/export.xlsx")).StatusCode);
    }

    private async Task<ImportStatusResult> WaitFor(HttpClient c, Guid courseId, Guid batchId, params string[] done)
    {
        for (var i = 0; i < 60; i++)
        {
            var s = await Read<ImportStatusResult>(await c.GetAsync($"/api/studio/courses/{courseId}/questions/import/{batchId}"));
            if (done.Contains(s.Status)) return s;
            await Task.Delay(500);
        }
        throw new Xunit.Sdk.XunitException("Queued import did not finish in time.");
    }

    private static byte[] CanonicalXlsx(string course, int n, string module = "") =>
        Xlsx.Write("Q", new[] { new[] { "ExternalId", "QuestionType", "Language", "CourseCode", "ModuleCode", "Stem", "OptionA", "OptionB", "CorrectOptions", "Explanation", "ExplanationA", "ExplanationB", "Difficulty" } }
            .Concat(Enumerable.Range(1, n).Select(i => new[] { $"L-{i}", "SingleChoice", "en", course, module, $"Stem {i}", "a", "b", "A", "e", "ea", "eb", "Easy" })));

    [Fact]
    public async Task Large_imports_are_queued_processed_in_background_and_polled()
    {
        var (authorId, author) = await fx.User(Roles.Instructor);
        var course = await fx.Course(authorId);
        var preview = await Read<ImportPreviewResult>(await author.PostAsync($"/api/studio/courses/{course.Id}/questions/import/preview",
            Form(CanonicalXlsx(course.Code, 5), "big.xlsx", ("mode", "create"), ("idempotencyKey", "big-" + Guid.NewGuid()))));
        Assert.Equal(0, preview.ErrorCount);
        var commit = await author.PostAsync($"/api/studio/courses/{course.Id}/questions/import/{preview.BatchId}/commit", null);
        Assert.Equal(HttpStatusCode.Accepted, commit.StatusCode);
        Assert.Equal("Queued", (await Read<ImportCommitResult>(commit)).Status);

        var (_, stranger) = await fx.User(Roles.Instructor);
        Assert.Equal(HttpStatusCode.NotFound, (await stranger.GetAsync($"/api/studio/courses/{course.Id}/questions/import/{preview.BatchId}")).StatusCode);

        var done = await WaitFor(author, course.Id, preview.BatchId, "Committed", "Failed");
        Assert.Equal("Committed", done.Status);
        Assert.Equal(5, done.Created);
        Assert.Equal(5, await fx.WithDb(db => db.Questions.CountAsync(q => q.CourseId == course.Id && q.State == QuestionState.Draft)));
        // Commit again is idempotent.
        var again = await Read<ImportCommitResult>(await author.PostAsync($"/api/studio/courses/{course.Id}/questions/import/{preview.BatchId}/commit", null));
        Assert.Equal("Committed", again.Status);
    }

    [Fact]
    public async Task Queued_import_that_became_stale_imports_nothing()
    {
        var (authorId, author) = await fx.User(Roles.Instructor);
        var course = await fx.Course(authorId);
        var preview = await Read<ImportPreviewResult>(await author.PostAsync($"/api/studio/courses/{course.Id}/questions/import/preview",
            Form(CanonicalXlsx(course.Code, 4, module: "M02"), "big.xlsx", ("mode", "create"), ("idempotencyKey", "stale-" + Guid.NewGuid()))));
        Assert.Equal(0, preview.ErrorCount);
        // The module referenced by every row disappears after preview (lesson first, then module).
        await fx.WithDb(async db =>
        {
            var m = await db.Modules.Include(x => x.Lessons).FirstAsync(x => x.CourseId == course.Id && x.Code == "M02");
            db.Lessons.RemoveRange(m.Lessons); db.Modules.Remove(m); await db.SaveChangesAsync();
        });
        var commit = await author.PostAsync($"/api/studio/courses/{course.Id}/questions/import/{preview.BatchId}/commit", null);
        Assert.Equal(HttpStatusCode.Accepted, commit.StatusCode);
        var done = await WaitFor(author, course.Id, preview.BatchId, "Committed", "Failed");
        Assert.Equal("Failed", done.Status);
        Assert.Contains("Nothing was imported", done.Error);
        Assert.Equal(0, await fx.WithDb(db => db.Questions.CountAsync(q => q.CourseId == course.Id)));
    }

    [Fact]
    public async Task Questions_are_copied_as_new_drafts_with_provenance_only_when_authorized()
    {
        var (aId, a) = await fx.User(Roles.Instructor);
        var (bId, b) = await fx.User(Roles.Instructor);
        var (_, staff) = await fx.User(Roles.Admin);
        var a1 = await fx.Course(aId);
        var a2 = await fx.Course(aId);
        var b1 = await fx.Course(bId);
        var src = await Read<QuestionDto>(await a.PostAsync($"/api/studio/courses/{a1.Id}/questions", JsonBody(Input("SRC-1", level: CognitiveLevel.Apply))));
        await fx.WithDb(db => db.Questions.Where(q => q.Id == src.Id).ExecuteUpdateAsync(s => s.SetProperty(q => q.State, QuestionState.Active)));

        // Author copies between their own courses: new Draft with provenance, not a link.
        var copy = await Read<CopyQuestionsResult>(await a.PostAsync($"/api/studio/courses/{a2.Id}/questions/copy", JsonBody(new { sourceQuestionIds = new[] { src.Id } })));
        var c = Assert.Single(copy.Created);
        Assert.NotEqual(src.Id, c.Id);
        Assert.Equal(QuestionState.Draft, c.State);
        Assert.Equal(src.Id, c.Meta!.SourceQuestionId);
        Assert.Equal(1, c.Meta.SourceVersion);
        Assert.Equal(CognitiveLevel.Apply, c.Meta.CognitiveLevel);
        Assert.Equal("SRC-1", c.ExternalId);
        Assert.NotEqual(src.Version.Options[0].Id, c.Version.Options[0].Id);
        // Copying again into the same course gets a unique external id.
        var copy2 = await Read<CopyQuestionsResult>(await a.PostAsync($"/api/studio/courses/{a2.Id}/questions/copy", JsonBody(new { sourceQuestionIds = new[] { src.Id } })));
        Assert.Equal("SRC-1-copy", copy2.Created[0].ExternalId);

        // Another instructor cannot copy unshared questions (not disclosed).
        Assert.Equal(HttpStatusCode.NotFound, (await b.PostAsync($"/api/studio/courses/{b1.Id}/questions/copy", JsonBody(new { sourceQuestionIds = new[] { src.Id } }))).StatusCode);
        // Only staff can share; sharing needs an Active question.
        Assert.Equal(HttpStatusCode.Forbidden, (await a.PutAsync($"/api/admin/questions/{src.Id}/reusable", JsonBody(new { reusable = true }))).StatusCode);
        Assert.Equal(HttpStatusCode.Conflict, (await staff.PutAsync($"/api/admin/questions/{c.Id}/reusable", JsonBody(new { reusable = true }))).StatusCode);
        var shared = await Read<QuestionDto>(await staff.PutAsync($"/api/admin/questions/{src.Id}/reusable", JsonBody(new { reusable = true })));
        Assert.True(shared.Meta!.Reusable);
        var bank = await Read<Paged<SharedQuestionDto>>(await b.GetAsync("/api/studio/shared-questions"));
        Assert.Contains(bank.Items, x => x.Id == src.Id);
        Assert.DoesNotContain("isCorrect", JsonSerializer.Serialize(bank, Json), StringComparison.OrdinalIgnoreCase);
        var bCopy = await Read<CopyQuestionsResult>(await b.PostAsync($"/api/studio/courses/{b1.Id}/questions/copy", JsonBody(new { sourceQuestionIds = new[] { src.Id } })));
        Assert.Equal(src.Id, bCopy.Created[0].Meta!.SourceQuestionId);
        // But not into a course they do not author.
        Assert.Equal(HttpStatusCode.Forbidden, (await b.PostAsync($"/api/studio/courses/{a1.Id}/questions/copy", JsonBody(new { sourceQuestionIds = new[] { src.Id } }))).StatusCode);
        var audits = await fx.WithDb(db => db.AuditLogs.CountAsync(l => l.Action == "question.copied" && l.EntityId == bCopy.Created[0].Id.ToString()));
        Assert.Equal(1, audits);
    }

    [Fact]
    public async Task Questions_with_course_images_cannot_be_copied_to_another_course()
    {
        var (aId, a) = await fx.User(Roles.Instructor);
        var a1 = await fx.Course(aId);
        var a2 = await fx.Course(aId);
        var img = await Image(a1.Id);
        var src = await Read<QuestionDto>(await a.PostAsync($"/api/studio/courses/{a1.Id}/questions", JsonBody(Input("IMG-1", $"See ![x](resource:{img})"))));
        var r = await a.PostAsync($"/api/studio/courses/{a2.Id}/questions/copy", JsonBody(new { sourceQuestionIds = new[] { src.Id } }));
        Assert.Equal(HttpStatusCode.BadRequest, r.StatusCode);
        Assert.Equal(0, await fx.WithDb(db => db.Questions.CountAsync(q => q.CourseId == a2.Id)));
    }
}
