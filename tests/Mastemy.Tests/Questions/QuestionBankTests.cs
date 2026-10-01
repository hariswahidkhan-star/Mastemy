using System.Net;
using System.Net.Http.Headers;
using System.Text;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Questions;
using Microsoft.EntityFrameworkCore;
using static Mastemy.Tests.Questions.QuestionsFixture;

namespace Mastemy.Tests.Questions;

public class QuestionBankTests(QuestionsFixture fx) : IClassFixture<QuestionsFixture>
{
    private const string Header = "ExternalId,QuestionType,Language,CourseCode,ModuleCode,LessonCode,SkillCode,CertificationObjective,Stem,OptionA,OptionB,OptionC,OptionD,OptionE,OptionF,CorrectOptions,Explanation,ExplanationA,ExplanationB,ExplanationC,ExplanationD,ExplanationE,ExplanationF,Difficulty,Tags,SourceReference,ReviewStatus";

    private static object Input(string ext, string stem = "What is 2+2?", QuestionType type = QuestionType.SingleChoice) => new
    {
        externalId = ext, type, language = "en", stem, explanation = "Basic arithmetic.", difficulty = Difficulty.Easy,
        skillCode = "MATH.ADD", certificationObjective = "", tags = new[] { "math" }, sourceReference = "original", allowShuffle = true,
        options = new[]
        {
            new { text = "4", isCorrect = true, rationale = "Correct sum." },
            new { text = "5", isCorrect = false, rationale = "Off by one." },
            new { text = "22", isCorrect = false, rationale = "Concatenation, not addition." },
        },
    };

    private static string Row(string ext, string course, string type = "SingleChoice", string module = "M01", string lesson = "L01",
        string stem = "Stem text", string a = "Alpha", string b = "Beta", string c = "", string correct = "A",
        string explanation = "Because.", string ea = "Why A", string eb = "Why B", string ec = "", string difficulty = "Easy", string review = "Draft")
        => string.Join(',', ext, type, "en", course, module, lesson, "SK.1", "", stem, a, b, c, "", "", "", correct, explanation, ea, eb, ec, "", "", "", difficulty, "t1;t2", "src", review);

    private static async Task<HttpResponseMessage> Preview(HttpClient client, Guid courseId, string content, string key, string mode = "create", string fileName = "q.csv")
    {
        var form = new MultipartFormDataContent();
        var file = new ByteArrayContent(Encoding.UTF8.GetBytes(content));
        file.Headers.ContentType = new MediaTypeHeaderValue(fileName.EndsWith(".json") ? "application/json" : "text/csv");
        form.Add(file, "file", fileName);
        form.Add(new StringContent(mode), "mode");
        form.Add(new StringContent(key), "idempotencyKey");
        return await client.PostAsync($"/api/studio/courses/{courseId}/questions/import/preview", form);
    }

    [Fact]
    public async Task Editing_active_question_creates_new_version_and_keeps_old_one()
    {
        var (authorId, author) = await fx.User(Roles.Instructor);
        var (_, reviewer) = await fx.User(Roles.Reviewer);
        var course = await fx.Course(authorId);

        var created = await Read<QuestionDto>(await author.PostAsync($"/api/studio/courses/{course.Id}/questions", JsonBody(Input("Q-1"))));
        Assert.Equal(1, created.CurrentVersion);

        // Draft edit (never used) updates in place.
        var edited = await Read<QuestionDto>(await author.PutAsync($"/api/studio/questions/{created.Id}", JsonBody(Input("Q-1", "What is two plus two?"))));
        Assert.Equal(1, edited.CurrentVersion);
        Assert.Equal("What is two plus two?", edited.Version.Stem);

        foreach (var s in new[] { "Reviewed", "Approved", "Active" })
            await Read<QuestionDto>(await reviewer.PostAsync($"/api/studio/questions/{created.Id}/state", JsonBody(new { state = s })));

        var v2 = await Read<QuestionDto>(await author.PutAsync($"/api/studio/questions/{created.Id}", JsonBody(Input("Q-1", "Compute 2 + 2."))));
        Assert.Equal(2, v2.CurrentVersion);
        Assert.Equal(QuestionState.Draft, v2.State); // changed content must be re-reviewed

        var versions = await fx.WithDb(db => db.QuestionVersions.Where(v => v.QuestionId == created.Id).OrderBy(v => v.Version).ToListAsync());
        Assert.Equal(2, versions.Count);
        Assert.Equal("What is two plus two?", versions[0].Stem); // old version immutable and retained
        Assert.Equal("Compute 2 + 2.", versions[1].Stem);
    }

    [Fact]
    public async Task Self_review_and_non_reviewer_approval_are_forbidden()
    {
        var (authorId, author) = await fx.User(Roles.Instructor, Roles.Reviewer);
        var (_, otherInstructor) = await fx.User(Roles.Instructor);
        var (_, reviewer) = await fx.User(Roles.Reviewer);
        var course = await fx.Course(authorId);
        var q = await Read<QuestionDto>(await author.PostAsync($"/api/studio/courses/{course.Id}/questions", JsonBody(Input("Q-SELF"))));

        var self = await author.PostAsync($"/api/studio/questions/{q.Id}/state", JsonBody(new { state = "Reviewed" }));
        Assert.Equal(HttpStatusCode.Forbidden, self.StatusCode);
        var notReviewer = await otherInstructor.PostAsync($"/api/studio/questions/{q.Id}/state", JsonBody(new { state = "Reviewed" }));
        Assert.Equal(HttpStatusCode.Forbidden, notReviewer.StatusCode);
        var skip = await reviewer.PostAsync($"/api/studio/questions/{q.Id}/state", JsonBody(new { state = "Active" }));
        Assert.Equal(HttpStatusCode.Conflict, skip.StatusCode); // must follow the state machine
        var ok = await reviewer.PostAsync($"/api/studio/questions/{q.Id}/state", JsonBody(new { state = "Reviewed" }));
        Assert.Equal(HttpStatusCode.OK, ok.StatusCode);
    }

    [Fact]
    public async Task Question_input_validation_rejects_bad_content()
    {
        var (authorId, author) = await fx.User(Roles.Instructor);
        var course = await fx.Course(authorId);
        var bad = new
        {
            externalId = "Q-BAD", type = "SingleChoice", language = "en", stem = "S", explanation = "", difficulty = "Easy",
            allowShuffle = true, options = new[]
            {
                new { text = "Same", isCorrect = true, rationale = "r" },
                new { text = "same", isCorrect = true, rationale = "" },
            },
        };
        var r = await author.PostAsync($"/api/studio/courses/{course.Id}/questions", JsonBody(bad));
        Assert.Equal(HttpStatusCode.BadRequest, r.StatusCode);
        var body = await r.Content.ReadAsStringAsync();
        Assert.Contains("explanation is required", body);
        Assert.Contains("distinct", body);
        Assert.Contains("exactly one correct", body);
        Assert.Contains("rationale is required", body);
    }

    [Fact]
    public async Task Import_reports_each_validation_rule_per_row()
    {
        var (authorId, author) = await fx.User(Roles.Instructor);
        var course = await fx.Course(authorId);
        await Read<QuestionDto>(await author.PostAsync($"/api/studio/courses/{course.Id}/questions", JsonBody(Input("EXISTING-1"))));
        var c = course.Code;
        var lines = new[]
        {
            Header,
            Row("OK-1", c),                                                // 2 ok
            Row("", c),                                                    // 3 missing ExternalId
            Row("BAD-TYPE", c, type: "TrueFalse"),                         // 4
            Row("BAD-CORRECT", c, correct: "C"),                           // 5 references empty option
            Row("SINGLE-2", c, correct: "A;B"),                            // 6 single with two correct
            Row("OK-1", c),                                                // 7 duplicate in file
            Row("EXISTING-1", c),                                          // 8 exists (create mode)
            Row("DUP-OPT", c, a: "Same", b: "same"),                       // 9 duplicate option text
            Row("NO-EXPL-B", c, eb: ""),                                   // 10 missing ExplanationB
            Row("BAD-MODULE", c, module: "M99"),                           // 11
            Row("BAD-LESSON", c, lesson: "L77"),                           // 12
            Row("BAD-DIFF", c, difficulty: "Impossible"),                  // 13
            Row("BYPASS", c, review: "Approved"),                          // 14 imports never bypass review
            Row("CTRL", c, stem: "bad\u0007bell"),                         // 15 control char
            Row("WRONG-COURSE", "OTHER-COURSE"),                           // 16
            Row("BAD-LETTER", c, correct: "Z"),                            // 17
            Row("GAP", c, b: "", eb: "", c: "Gamma", ec: "Why C"),         // 18 non-contiguous options
            Row("NO-EXPL", c, explanation: ""),                            // 19 missing explanation
        };
        var resp = await Preview(author, course.Id, string.Join("\r\n", lines), "rules-" + Guid.NewGuid());
        var p = await Read<ImportPreviewResult>(resp);
        string Errors(int row) => string.Join(" | ", p.Rows.Single(r => r.Row == row).Errors);

        Assert.True(p.Rows.Single(r => r.Row == 2).Ok, Errors(2));
        Assert.Contains("ExternalId is required", Errors(3));
        Assert.Contains("QuestionType must be", Errors(4));
        Assert.Contains("OptionC, which is empty", Errors(5));
        Assert.Contains("exactly one correct", Errors(6));
        Assert.Contains("Duplicate ExternalId", Errors(7));
        Assert.Contains("already exists", Errors(8));
        Assert.Contains("distinct", Errors(9));
        Assert.Contains("ExplanationB is required", Errors(10));
        Assert.Contains("ModuleCode 'M99'", Errors(11));
        Assert.Contains("LessonCode 'L77'", Errors(12));
        Assert.Contains("Difficulty must be", Errors(13));
        Assert.Contains("ReviewStatus 'Approved' is not allowed", Errors(14));
        Assert.Contains("control characters", Errors(15));
        Assert.Contains("does not match this course", Errors(16));
        Assert.Contains("use letters A-F", Errors(17));
        Assert.Contains("contiguous", Errors(18));
        Assert.Contains("Explanation is required", Errors(19));
        Assert.Equal(1, p.ValidCount);
        Assert.Equal(17, p.ErrorCount);

        // Commit is refused atomically: nothing is inserted, not even the valid row.
        var commit = await author.PostAsync($"/api/studio/courses/{course.Id}/questions/import/{p.BatchId}/commit", null);
        Assert.Equal(HttpStatusCode.Conflict, commit.StatusCode);
        Assert.Equal(1, await fx.WithDb(db => db.Questions.CountAsync(q => q.CourseId == course.Id)));

        // Errors CSV lists every error, neutralized and parseable.
        var csv = await author.GetAsync($"/api/studio/courses/{course.Id}/questions/import/{p.BatchId}/errors.csv");
        Assert.Equal(HttpStatusCode.OK, csv.StatusCode);
        var parsed = Csv.Parse(Encoding.UTF8.GetString(await csv.Content.ReadAsByteArrayAsync()));
        Assert.Equal(["Row", "ExternalId", "Error"], parsed[0]);
        Assert.True(parsed.Count > 17);
    }

    [Fact]
    public async Task Update_mode_requires_existing_ids()
    {
        var (authorId, author) = await fx.User(Roles.Instructor);
        var course = await fx.Course(authorId);
        var p = await Read<ImportPreviewResult>(await Preview(author, course.Id, Header + "\n" + Row("NOPE-1", course.Code), "upd-" + Guid.NewGuid(), "update"));
        Assert.Contains("does not exist", string.Join(" ", p.Rows[0].Errors));
    }

    [Fact]
    public async Task Preview_and_commit_are_idempotent_and_update_mode_versions()
    {
        var (authorId, author) = await fx.User(Roles.Instructor);
        var course = await fx.Course(authorId);
        var arabic = string.Join(',', "AR-1", "SingleChoice", "ar", course.Code, "M01", "L02", "AI.BASICS", "",
            "\"ما الذي يصف، بشكل أدق\nالنموذج اللغوي الكبير؟\"", "قاعدة بيانات", "\"نموذج يتنبأ بالنص التالي\"", "", "", "", "", "B",
            "\"النموذج اللغوي الكبير يولّد النص احتمالياً.\"", "غير صحيح", "صحيح", "", "", "", "", "Easy", "basics;llm", "Mastemy original", "");
        var content = "﻿" + Header + "\r\n" + Row("IMP-1", course.Code, type: "MultipleSelect", c: "Gamma", ec: "Why C", correct: "A;C") + "\r\n" + arabic + "\r\n";
        var key = "idem-" + Guid.NewGuid();

        var p1 = await Read<ImportPreviewResult>(await Preview(author, course.Id, content, key));
        var p2 = await Read<ImportPreviewResult>(await Preview(author, course.Id, content, key));
        Assert.Equal(p1.BatchId, p2.BatchId);
        Assert.Equal(0, p1.ErrorCount);
        Assert.Equal(1, await fx.WithDb(db => db.ImportBatches.CountAsync(b => b.IdempotencyKey == key)));

        var c1 = await Read<ImportCommitResult>(await author.PostAsync($"/api/studio/courses/{course.Id}/questions/import/{p1.BatchId}/commit", null));
        var c2 = await Read<ImportCommitResult>(await author.PostAsync($"/api/studio/courses/{course.Id}/questions/import/{p1.BatchId}/commit", null));
        Assert.Equal(2, c1.Created);
        Assert.Equal(c1, c2);
        var qs = await fx.WithDb(db => db.Questions.Where(q => q.CourseId == course.Id).ToListAsync());
        Assert.Equal(2, qs.Count);
        Assert.All(qs, q => Assert.Equal(QuestionState.Draft, q.State));
        var arId = qs.Single(q => q.ExternalId == "AR-1").Id;
        var impId = qs.Single(q => q.ExternalId == "IMP-1").Id;
        var ar = await fx.WithDb(db => db.QuestionVersions.Include(v => v.Options).SingleAsync(v => v.QuestionId == arId));
        Assert.Equal("ما الذي يصف، بشكل أدق\nالنموذج اللغوي الكبير؟", ar.Stem);
        Assert.True(ar.Options.Single(o => o.SortOrder == 1).IsCorrect);
        var imp = await fx.WithDb(db => db.QuestionVersions.Include(v => v.Options).SingleAsync(v => v.QuestionId == impId));
        Assert.Equal(QuestionType.MultipleSelect, imp.Type);
        Assert.Equal(2, imp.Options.Count(o => o.IsCorrect));

        // Update mode creates a new version in Draft.
        await fx.WithDb(async db => { var q = await db.Questions.SingleAsync(x => x.ExternalId == "IMP-1" && x.CourseId == course.Id); q.State = QuestionState.Active; await db.SaveChangesAsync(); });
        var up = await Read<ImportPreviewResult>(await Preview(author, course.Id, Header + "\n" + Row("IMP-1", course.Code, stem: "Updated stem"), "up-" + Guid.NewGuid(), "update"));
        Assert.Equal(0, up.ErrorCount);
        var uc = await Read<ImportCommitResult>(await author.PostAsync($"/api/studio/courses/{course.Id}/questions/import/{up.BatchId}/commit", null));
        Assert.Equal(1, uc.Updated);
        var updated = await fx.WithDb(db => db.Questions.SingleAsync(x => x.ExternalId == "IMP-1" && x.CourseId == course.Id));
        Assert.Equal(2, updated.CurrentVersion);
        Assert.Equal(QuestionState.Draft, updated.State);
        Assert.Equal(2, await fx.WithDb(db => db.QuestionVersions.CountAsync(v => v.QuestionId == updated.Id)));
    }

    [Fact]
    public async Task Json_import_is_supported()
    {
        var (authorId, author) = await fx.User(Roles.Instructor);
        var course = await fx.Course(authorId);
        var json = $$"""
        [{"ExternalId":"J-1","QuestionType":"MultipleSelect","Language":"en","CourseCode":"{{course.Code}}","ModuleCode":"M02","LessonCode":"L01",
          "Stem":"Pick the primes","OptionA":"2","OptionB":"4","OptionC":"5","CorrectOptions":["A","C"],"Explanation":"2 and 5 are prime.",
          "ExplanationA":"Prime.","ExplanationB":"Composite.","ExplanationC":"Prime.","Difficulty":"Medium","Tags":["primes"]},
         {"ExternalId":"J-2","Bogus":1}]
        """;
        var p = await Read<ImportPreviewResult>(await Preview(author, course.Id, json, "json-" + Guid.NewGuid(), fileName: "q.json"));
        Assert.True(p.Rows[0].Ok, string.Join(" | ", p.Rows[0].Errors));
        Assert.Contains("Unknown property 'Bogus'", string.Join(" ", p.Rows[1].Errors));
    }

    [Fact]
    public async Task Export_neutralizes_formula_injection_and_is_author_only()
    {
        var (authorId, author) = await fx.User(Roles.Instructor);
        var (_, outsider) = await fx.User(Roles.Instructor);
        var course = await fx.Course(authorId);
        await Read<QuestionDto>(await author.PostAsync($"/api/studio/courses/{course.Id}/questions", JsonBody(Input("XSS-1", "=HYPERLINK(\"http://evil\",\"x\")"))));

        var r = await author.GetAsync($"/api/studio/courses/{course.Id}/questions/export.csv");
        Assert.Equal(HttpStatusCode.OK, r.StatusCode);
        var rows = Csv.Parse(Encoding.UTF8.GetString(await r.Content.ReadAsByteArrayAsync()));
        Assert.Equal(QuestionImportService.Columns, rows[0]);
        var stem = rows[1][Array.IndexOf(QuestionImportService.Columns, "Stem")];
        Assert.Equal("'=HYPERLINK(\"http://evil\",\"x\")", stem);
        Assert.Equal("A", rows[1][Array.IndexOf(QuestionImportService.Columns, "CorrectOptions")]);

        Assert.Equal(HttpStatusCode.Forbidden, (await outsider.GetAsync($"/api/studio/courses/{course.Id}/questions/export.csv")).StatusCode);
    }

    [Fact]
    public async Task Template_is_public_and_matches_columns()
    {
        var r = await fx.Factory.CreateClient().GetAsync("/api/templates/mcq-import.csv");
        Assert.Equal(HttpStatusCode.OK, r.StatusCode);
        var rows = Csv.Parse(Encoding.UTF8.GetString(await r.Content.ReadAsByteArrayAsync()));
        Assert.Equal(QuestionImportService.Columns, rows[0]);
    }
}
