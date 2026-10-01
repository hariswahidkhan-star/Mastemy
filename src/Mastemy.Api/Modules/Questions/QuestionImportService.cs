using System.Text;
using System.Text.Json;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Questions;

public record ImportRowResult(int Row, string ExternalId, bool Ok, List<string> Errors);
public record ImportPreviewResult(Guid BatchId, string Mode, string Status, List<ImportRowResult> Rows, int ValidCount, int ErrorCount);
public record ImportCommitResult(Guid BatchId, string Status, int Created, int Updated);

/// <summary>Normalized row persisted in <see cref="QuestionImportBatch.PayloadJson"/>.</summary>
public class ImportRowPayload
{
    public int Row { get; set; }
    public string ExternalId { get; set; } = "";
    public List<string> Errors { get; set; } = [];
    public QuestionInput? Question { get; set; }
}

public class ImportPayload
{
    public string Mode { get; set; } = "create";
    public List<ImportRowPayload> Rows { get; set; } = [];
}

/// <summary>
/// Bulk MCQ import (CSV per templates/mcq-import-template.csv, or JSON per templates/mcq-import-schema.json) and CSV export.
/// Preview validates every row and stores the normalized rows; commit inserts them atomically, only when error-free,
/// and is idempotent. Imported questions always land in Draft — imports never bypass review.
/// </summary>
public class QuestionImportService(AppDbContext db, ICurrentUser me, AccessService access, AuditService audit)
{
    public const long MaxFileBytes = 5 * 1024 * 1024;
    public const int MaxRows = 5000;
    private static readonly string[] Letters = ["A", "B", "C", "D", "E", "F"];

    public static readonly string[] Columns =
    [
        "ExternalId", "QuestionType", "Language", "CourseCode", "ModuleCode", "LessonCode", "SkillCode", "CertificationObjective",
        "Stem", "OptionA", "OptionB", "OptionC", "OptionD", "OptionE", "OptionF", "CorrectOptions", "Explanation",
        "ExplanationA", "ExplanationB", "ExplanationC", "ExplanationD", "ExplanationE", "ExplanationF",
        "Difficulty", "Tags", "SourceReference", "ReviewStatus",
    ];

    private static readonly string[] RequiredColumns =
        ["ExternalId", "QuestionType", "Language", "CourseCode", "Stem", "OptionA", "OptionB", "CorrectOptions", "Explanation", "Difficulty"];

    private static readonly HashSet<string> MultiLine = ["Stem", "Explanation", "OptionA", "OptionB", "OptionC", "OptionD", "OptionE", "OptionF",
        "ExplanationA", "ExplanationB", "ExplanationC", "ExplanationD", "ExplanationE", "ExplanationF"];

    private static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web);

    // ---------------- Preview ----------------

    public async Task<ImportPreviewResult> Preview(Guid courseId, Stream content, long length, string fileName, string? mode, string? idempotencyKey)
    {
        var uid = me.RequireId();
        var course = await db.Courses.AsNoTracking().FirstOrDefaultAsync(c => c.Id == courseId) ?? throw AppException.NotFound("Course");
        await access.RequireCourseEditor(courseId);
        mode = (mode ?? "create").Trim().ToLowerInvariant();
        if (mode is not ("create" or "update")) throw AppException.Bad("mode must be 'create' or 'update'.");
        idempotencyKey = idempotencyKey?.Trim();
        if (string.IsNullOrEmpty(idempotencyKey) || idempotencyKey.Length > 100 || QuestionRules.HasBadSingleLine(idempotencyKey))
            throw AppException.Bad("idempotencyKey is required (max 100 characters).");

        var existingBatch = await db.ImportBatches.AsNoTracking().FirstOrDefaultAsync(b => b.UserId == uid && b.IdempotencyKey == idempotencyKey);
        if (existingBatch is not null) return FromBatch(existingBatch, courseId);

        if (length > MaxFileBytes) throw AppException.Bad("The file exceeds the 5 MB limit.", "file_too_large");
        var bytes = await ReadLimited(content);
        string text;
        try { text = new UTF8Encoding(false, true).GetString(bytes); }
        catch (DecoderFallbackException) { throw AppException.Bad("The file is not valid UTF-8 text.", "invalid_encoding"); }
        if (text.Length > 0 && text[0] == '﻿') text = text[1..];

        var isJson = fileName.EndsWith(".json", StringComparison.OrdinalIgnoreCase) ||
                     (!fileName.EndsWith(".csv", StringComparison.OrdinalIgnoreCase) && text.TrimStart().StartsWith('['));
        var raw = isJson ? ParseJson(text) : ParseCsv(text);
        if (raw.Count == 0) throw AppException.Bad("The file contains no question rows.", "empty_file");
        if (raw.Count > MaxRows) throw AppException.Bad($"The file contains {raw.Count} rows; the limit is {MaxRows}.", "too_many_rows");

        var payload = new ImportPayload { Mode = mode, Rows = await ValidateRows(course, raw, mode) };
        var batch = new QuestionImportBatch
        {
            CourseId = courseId, UserId = uid, IdempotencyKey = idempotencyKey, Status = "Previewed",
            PayloadJson = JsonSerializer.Serialize(payload, Json), RowCount = payload.Rows.Count,
            ErrorCount = payload.Rows.Count(r => r.Errors.Count > 0),
        };
        db.ImportBatches.Add(batch);
        audit.Record("question.import_previewed", "QuestionImportBatch", batch.Id, new { courseId, mode, batch.RowCount, batch.ErrorCount });
        try { await db.SaveChangesAsync(); }
        catch (DbUpdateException)
        {
            // Concurrent preview with the same key: return the batch that won.
            db.ChangeTracker.Clear();
            var winner = await db.ImportBatches.AsNoTracking().FirstOrDefaultAsync(b => b.UserId == uid && b.IdempotencyKey == idempotencyKey);
            if (winner is null) throw;
            return FromBatch(winner, courseId);
        }
        return ToPreview(batch, payload);
    }

    private ImportPreviewResult FromBatch(QuestionImportBatch b, Guid courseId)
    {
        if (b.CourseId != courseId) throw AppException.Conflict("This idempotencyKey was already used for another course.", "idempotency_key_reused");
        return ToPreview(b, Deserialize(b));
    }

    private static ImportPayload Deserialize(QuestionImportBatch b) => JsonSerializer.Deserialize<ImportPayload>(b.PayloadJson, Json) ?? new ImportPayload();

    private static ImportPreviewResult ToPreview(QuestionImportBatch b, ImportPayload p) => new(b.Id, p.Mode, b.Status,
        p.Rows.Select(r => new ImportRowResult(r.Row, r.ExternalId, r.Errors.Count == 0, r.Errors)).ToList(),
        p.Rows.Count(r => r.Errors.Count == 0), b.ErrorCount);

    private static async Task<byte[]> ReadLimited(Stream s)
    {
        using var ms = new MemoryStream();
        var buf = new byte[81920];
        int n;
        while ((n = await s.ReadAsync(buf)) > 0)
        {
            if (ms.Length + n > MaxFileBytes) throw AppException.Bad("The file exceeds the 5 MB limit.", "file_too_large");
            ms.Write(buf, 0, n);
        }
        return ms.ToArray();
    }

    private record RawRow(int Row, Dictionary<string, string?> Fields, List<string> Errors);

    private static List<RawRow> ParseCsv(string text)
    {
        List<List<string>> records;
        try { records = Csv.Parse(text); }
        catch (CsvFormatException ex) { throw AppException.Bad($"Malformed CSV: {ex.Message}", "malformed_csv"); }
        if (records.Count == 0) return [];
        var header = records[0].Select(h => h.Trim()).ToList();
        var map = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase);
        for (var i = 0; i < header.Count; i++)
        {
            var canonical = Columns.FirstOrDefault(c => c.Equals(header[i], StringComparison.OrdinalIgnoreCase))
                ?? throw AppException.Bad($"Unknown column '{QuestionRules.Trunc(header[i])}' in header.", "invalid_header");
            if (!map.TryAdd(canonical, i)) throw AppException.Bad($"Duplicate column '{canonical}' in header.", "invalid_header");
        }
        var missing = RequiredColumns.Where(c => !map.ContainsKey(c)).ToList();
        if (missing.Count > 0) throw AppException.Bad($"Missing required column(s): {string.Join(", ", missing)}.", "invalid_header");
        if (records.Count - 1 > MaxRows) throw AppException.Bad($"The file contains {records.Count - 1} rows; the limit is {MaxRows}.", "too_many_rows");

        var rows = new List<RawRow>();
        for (var r = 1; r < records.Count; r++)
        {
            var rec = records[r];
            var errs = new List<string>();
            if (rec.Count != header.Count) errs.Add($"Row has {rec.Count} fields but the header has {header.Count}.");
            var f = new Dictionary<string, string?>();
            foreach (var (col, idx) in map) f[col] = idx < rec.Count ? rec[idx] : null;
            rows.Add(new RawRow(r + 1, f, errs)); // spreadsheet row number (header is row 1)
        }
        return rows;
    }

    private static List<RawRow> ParseJson(string text)
    {
        JsonDocument doc;
        try { doc = JsonDocument.Parse(text, new JsonDocumentOptions { MaxDepth = 8 }); }
        catch (JsonException ex) { throw AppException.Bad($"Malformed JSON: {ex.Message}", "malformed_json"); }
        using (doc)
        {
            if (doc.RootElement.ValueKind != JsonValueKind.Array) throw AppException.Bad("The JSON file must contain an array of questions.", "malformed_json");
            if (doc.RootElement.GetArrayLength() > MaxRows) throw AppException.Bad($"The file contains {doc.RootElement.GetArrayLength()} rows; the limit is {MaxRows}.", "too_many_rows");
            var rows = new List<RawRow>();
            var n = 0;
            foreach (var el in doc.RootElement.EnumerateArray())
            {
                n++;
                var errs = new List<string>();
                var f = new Dictionary<string, string?>();
                if (el.ValueKind != JsonValueKind.Object) { errs.Add("Each item must be a JSON object."); rows.Add(new RawRow(n, f, errs)); continue; }
                foreach (var p in el.EnumerateObject())
                {
                    var col = Columns.FirstOrDefault(c => c == p.Name);
                    if (col is null) { errs.Add($"Unknown property '{QuestionRules.Trunc(p.Name)}'."); continue; }
                    if (col is "CorrectOptions" or "Tags")
                    {
                        if (p.Value.ValueKind == JsonValueKind.Null) { f[col] = null; continue; }
                        if (p.Value.ValueKind != JsonValueKind.Array || p.Value.EnumerateArray().Any(x => x.ValueKind != JsonValueKind.String))
                        { errs.Add($"{col} must be an array of strings."); continue; }
                        f[col] = string.Join(';', p.Value.EnumerateArray().Select(x => x.GetString()));
                        continue;
                    }
                    if (p.Value.ValueKind == JsonValueKind.Null) { f[col] = null; continue; }
                    if (p.Value.ValueKind != JsonValueKind.String) { errs.Add($"{col} must be a string."); continue; }
                    f[col] = p.Value.GetString();
                }
                rows.Add(new RawRow(n, f, errs));
            }
            return rows;
        }
    }

    private async Task<List<ImportRowPayload>> ValidateRows(Course course, List<RawRow> raw, string mode)
    {
        var modules = await db.Modules.AsNoTracking().Where(m => m.CourseId == course.Id).Select(m => new { m.Id, m.Code }).ToListAsync();
        var moduleIds = modules.Select(m => m.Id).ToList();
        var lessons = await db.Lessons.AsNoTracking().Where(l => moduleIds.Contains(l.ModuleId)).Select(l => new { l.Id, l.Code, l.ModuleId }).ToListAsync();
        var existing = await db.Questions.AsNoTracking().Where(q => q.CourseId == course.Id).Select(q => new { q.ExternalId, q.State })
            .ToDictionaryAsync(q => q.ExternalId, q => q.State, StringComparer.OrdinalIgnoreCase);
        var seen = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        var result = new List<ImportRowPayload>();

        foreach (var r in raw)
        {
            var e = new List<string>(r.Errors);
            string Get(string col) => r.Fields.TryGetValue(col, out var v) && v is not null ? v.Trim() : "";

            foreach (var col in Columns)
            {
                var v = r.Fields.GetValueOrDefault(col);
                if (v is null) continue;
                if (MultiLine.Contains(col) ? QuestionRules.HasBadChars(v) : QuestionRules.HasBadSingleLine(v))
                    e.Add($"{col} contains control characters, line breaks or malformed text.");
            }
            foreach (var col in RequiredColumns)
                if (Get(col).Length == 0) e.Add($"{col} is required.");

            var externalId = Get("ExternalId");
            if (externalId.Length > 0)
            {
                if (!QuestionRules.ExternalIdRx().IsMatch(externalId)) e.Add("ExternalId must be 1-100 characters: letters, digits, '.', '_' or '-'.");
                if (!seen.Add(externalId)) e.Add($"Duplicate ExternalId '{externalId}' within the file.");
                var exists = existing.TryGetValue(externalId, out var st);
                if (mode == "create" && exists) e.Add($"ExternalId '{externalId}' already exists in this course (use update mode to create a new version).");
                if (mode == "update" && !exists) e.Add($"ExternalId '{externalId}' does not exist in this course (update mode only changes existing questions).");
                if (mode == "update" && exists && st == QuestionState.Retired) e.Add($"Question '{externalId}' is retired and cannot be updated.");
            }

            QuestionType type = default;
            var typeText = Get("QuestionType");
            if (typeText.Length > 0 && !(Enum.TryParse(typeText, true, out type) && Enum.IsDefined(type) && !int.TryParse(typeText, out _)))
                e.Add("QuestionType must be SingleChoice or MultipleSelect.");
            Difficulty difficulty = default;
            var diffText = Get("Difficulty");
            if (diffText.Length > 0 && !(Enum.TryParse(diffText, true, out difficulty) && Enum.IsDefined(difficulty) && !int.TryParse(diffText, out _)))
                e.Add("Difficulty must be Easy, Medium or Hard.");
            var lang = Get("Language");
            if (lang.Length > 0 && !QuestionRules.LanguageRx().IsMatch(lang)) e.Add("Language must look like 'en' or 'ar' (optionally 'en-US').");
            var courseCode = Get("CourseCode");
            if (courseCode.Length > 0 && !courseCode.Equals(course.Code, StringComparison.OrdinalIgnoreCase))
                e.Add($"CourseCode '{QuestionRules.Trunc(courseCode)}' does not match this course ({course.Code}).");

            Guid? moduleId = null, lessonId = null;
            var moduleCode = Get("ModuleCode");
            if (moduleCode.Length > 0)
            {
                var m = modules.FirstOrDefault(x => x.Code.Equals(moduleCode, StringComparison.OrdinalIgnoreCase));
                if (m is null) e.Add($"ModuleCode '{QuestionRules.Trunc(moduleCode)}' does not exist in this course.");
                else moduleId = m.Id;
            }
            var lessonCode = Get("LessonCode");
            if (lessonCode.Length > 0)
            {
                var candidates = lessons.Where(l => l.Code.Equals(lessonCode, StringComparison.OrdinalIgnoreCase) && (moduleId is null || l.ModuleId == moduleId)).ToList();
                if (moduleCode.Length > 0 && moduleId is null) { /* module error already reported */ }
                else if (candidates.Count == 0) e.Add($"LessonCode '{QuestionRules.Trunc(lessonCode)}' does not exist in {(moduleId is null ? "this course" : "module " + moduleCode)}.");
                else if (candidates.Count > 1) e.Add($"LessonCode '{QuestionRules.Trunc(lessonCode)}' is ambiguous; also provide ModuleCode.");
                else { lessonId = candidates[0].Id; moduleId ??= candidates[0].ModuleId; }
            }

            // Options, per-option explanations and correct letters.
            var options = new List<OptionInput>();
            var gap = false;
            for (var i = 0; i < Letters.Length; i++)
            {
                var L = Letters[i];
                var text = Get("Option" + L);
                var why = Get("Explanation" + L);
                if (text.Length == 0)
                {
                    gap = true;
                    if (why.Length > 0) e.Add($"Explanation{L} is filled but Option{L} is empty.");
                    continue;
                }
                if (gap) e.Add($"Option{L} is filled after an empty option; options must be contiguous from A.");
                if (why.Length == 0) e.Add($"Explanation{L} is required because Option{L} is filled.");
                options.Add(new OptionInput(null, text, false, why));
            }
            var correctText = Get("CorrectOptions");
            var correctLetters = new HashSet<string>();
            if (correctText.Length > 0)
            {
                foreach (var part in correctText.Split(';', StringSplitOptions.TrimEntries))
                {
                    var letter = part.ToUpperInvariant();
                    var idx = Array.IndexOf(Letters, letter);
                    if (idx < 0) { e.Add($"CorrectOptions contains '{QuestionRules.Trunc(part)}'; use letters A-F separated by ';' (e.g. A;C)."); continue; }
                    if (!correctLetters.Add(letter)) { e.Add($"CorrectOptions lists {letter} more than once."); continue; }
                    if (Get("Option" + letter).Length == 0) e.Add($"CorrectOptions references Option{letter}, which is empty.");
                }
                if (typeText.Equals("SingleChoice", StringComparison.OrdinalIgnoreCase) && correctLetters.Count != 1)
                    e.Add("SingleChoice questions must have exactly one correct option.");
            }
            for (var i = 0; i < options.Count; i++)
                options[i] = options[i] with { IsCorrect = correctLetters.Contains(Letters[i]) };

            var review = Get("ReviewStatus");
            if (review.Length > 0 && !review.Equals("Draft", StringComparison.OrdinalIgnoreCase))
                e.Add($"ReviewStatus '{QuestionRules.Trunc(review)}' is not allowed: imported questions always start as Draft and must go through review.");

            var input = new QuestionInput(externalId, type, lang, Get("Stem"), Get("Explanation"), difficulty,
                Get("SkillCode"), Get("CertificationObjective"), QuestionRules.SplitTags(Get("Tags")), Get("SourceReference"), true,
                moduleId, lessonId, options);
            // Shared content rules (lengths, distinct option text, rationale presence, correct-count) — avoid duplicate messages.
            if (e.Count == 0)
                e.AddRange(QuestionRules.Validate(input));

            result.Add(new ImportRowPayload { Row = r.Row, ExternalId = externalId, Errors = e.Distinct().ToList(), Question = e.Count == 0 ? input : null });
        }
        return result;
    }

    // ---------------- Commit ----------------

    public async Task<ImportCommitResult> Commit(Guid courseId, Guid batchId)
    {
        var uid = me.RequireId();
        var batch = await db.ImportBatches.AsNoTracking().FirstOrDefaultAsync(b => b.Id == batchId && b.CourseId == courseId && b.UserId == uid)
            ?? throw AppException.NotFound("Import batch");
        await access.RequireCourseEditor(courseId);
        var payload = Deserialize(batch);
        if (batch.Status == "Committed") return Committed(batch.Id, payload);
        if (batch.ErrorCount > 0 || payload.Rows.Any(r => r.Errors.Count > 0 || r.Question is null))
            throw AppException.Conflict($"The import has {batch.ErrorCount} row(s) with errors; fix the file and preview again. Nothing was imported.", "import_has_errors");

        await using var tx = await db.Database.BeginTransactionAsync();
        // Claim the batch; the row lock serializes concurrent commits and makes a second commit a no-op.
        var claimed = await db.ImportBatches.Where(b => b.Id == batchId && b.Status == "Previewed")
            .ExecuteUpdateAsync(s => s.SetProperty(b => b.Status, "Committed"));
        if (claimed == 0)
        {
            await tx.RollbackAsync();
            var now = await db.ImportBatches.AsNoTracking().FirstAsync(b => b.Id == batchId);
            if (now.Status == "Committed") return Committed(batchId, payload);
            throw AppException.Conflict("This import batch can no longer be committed.", "batch_not_committable");
        }

        var rows = payload.Rows.Select(r => r.Question!).ToList();
        var ids = rows.Select(r => r.ExternalId).ToList();
        var existing = await db.Questions.Where(q => q.CourseId == courseId && ids.Contains(q.ExternalId)).ToListAsync();
        var moduleIds = rows.Where(r => r.ModuleId != null).Select(r => r.ModuleId!.Value).Distinct().ToList();
        var lessonIds = rows.Where(r => r.LessonId != null).Select(r => r.LessonId!.Value).Distinct().ToList();
        var liveModules = await db.Modules.CountAsync(m => moduleIds.Contains(m.Id) && m.CourseId == courseId);
        var liveLessons = await db.Lessons.CountAsync(l => lessonIds.Contains(l.Id));
        string? conflict = null;
        if (liveModules != moduleIds.Count || liveLessons != lessonIds.Count) conflict = "Modules or lessons referenced by the import have changed since the preview.";
        else if (payload.Mode == "create" && existing.Count > 0) conflict = $"ExternalId '{existing[0].ExternalId}' was created after the preview.";
        else if (payload.Mode == "update" && (existing.Count != ids.Count || existing.Any(q => q.State == QuestionState.Retired)))
            conflict = "Some questions to update no longer exist or were retired after the preview.";
        if (conflict is not null)
        {
            await tx.RollbackAsync();
            throw AppException.Conflict(conflict + " Preview the file again with a new idempotencyKey. Nothing was imported.", "import_stale");
        }

        var created = 0; var updated = 0;
        var nowUtc = DateTime.UtcNow;
        foreach (var input in rows)
        {
            if (payload.Mode == "create")
            {
                var q = new Question { CourseId = courseId, ExternalId = input.ExternalId, ModuleId = input.ModuleId, LessonId = input.LessonId, CreatedBy = uid, State = QuestionState.Draft };
                db.Questions.Add(q);
                db.QuestionVersions.Add(QuestionService.NewVersion(q.Id, 1, input));
                created++;
            }
            else
            {
                var q = existing.First(x => x.ExternalId.Equals(input.ExternalId, StringComparison.OrdinalIgnoreCase));
                q.CurrentVersion += 1;
                db.QuestionVersions.Add(QuestionService.NewVersion(q.Id, q.CurrentVersion, input));
                q.ModuleId = input.ModuleId; q.LessonId = input.LessonId;
                q.State = QuestionState.Draft; q.ReviewedBy = null; q.UpdatedAt = nowUtc;
                updated++;
            }
        }
        audit.Record("question.import_committed", "QuestionImportBatch", batchId, new { courseId, payload.Mode, created, updated });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return new ImportCommitResult(batchId, "Committed", created, updated);
    }

    private static ImportCommitResult Committed(Guid id, ImportPayload p) =>
        new(id, "Committed", p.Mode == "create" ? p.Rows.Count : 0, p.Mode == "update" ? p.Rows.Count : 0);

    public async Task<byte[]> ErrorsCsv(Guid courseId, Guid batchId)
    {
        var uid = me.RequireId();
        var batch = await db.ImportBatches.AsNoTracking().FirstOrDefaultAsync(b => b.Id == batchId && b.CourseId == courseId && b.UserId == uid)
            ?? throw AppException.NotFound("Import batch");
        await access.RequireCourseEditor(courseId);
        var payload = Deserialize(batch);
        var rows = new List<string?[]> { new[] { "Row", "ExternalId", "Error" } };
        foreach (var r in payload.Rows)
            foreach (var err in r.Errors) rows.Add([r.Row.ToString(), r.ExternalId, err]);
        return Csv.ToUtf8WithBom(Csv.Write(rows));
    }

    // ---------------- Export / template ----------------

    public async Task<byte[]> Export(Guid courseId)
    {
        me.RequireId();
        var course = await db.Courses.AsNoTracking().FirstOrDefaultAsync(c => c.Id == courseId) ?? throw AppException.NotFound("Course");
        await access.RequireCourseEditor(courseId);
        var questions = await db.Questions.AsNoTracking().Where(q => q.CourseId == courseId).OrderBy(q => q.ExternalId).ToListAsync();
        var qids = questions.Select(q => q.Id).ToList();
        var versions = await db.QuestionVersions.AsNoTracking().Include(v => v.Options).Where(v => qids.Contains(v.QuestionId)).ToListAsync();
        var modules = await db.Modules.AsNoTracking().Where(m => m.CourseId == courseId).ToDictionaryAsync(m => m.Id, m => m.Code);
        var mids = modules.Keys.ToList();
        var lessons = await db.Lessons.AsNoTracking().Where(l => mids.Contains(l.ModuleId)).ToDictionaryAsync(l => l.Id, l => l.Code);

        var rows = new List<string?[]> { Columns };
        foreach (var q in questions)
        {
            var v = versions.First(x => x.QuestionId == q.Id && x.Version == q.CurrentVersion);
            var opts = v.Options.OrderBy(o => o.SortOrder).ToList();
            string? Opt(int i) => i < opts.Count ? opts[i].Text : "";
            string? Why(int i) => i < opts.Count ? opts[i].Rationale : "";
            rows.Add(
            [
                q.ExternalId, v.Type.ToString(), v.Language, course.Code,
                q.ModuleId is { } m && modules.TryGetValue(m, out var mc) ? mc : "",
                q.LessonId is { } l && lessons.TryGetValue(l, out var lc) ? lc : "",
                v.SkillCode, v.CertificationObjective, v.Stem,
                Opt(0), Opt(1), Opt(2), Opt(3), Opt(4), Opt(5),
                string.Join(';', opts.Select((o, i) => (o, i)).Where(x => x.o.IsCorrect).Select(x => Letters[x.i])),
                v.Explanation, Why(0), Why(1), Why(2), Why(3), Why(4), Why(5),
                v.Difficulty.ToString(), v.Tags, v.SourceReference, q.State.ToString(),
            ]);
        }
        audit.Record("question.exported", "Course", courseId, new { count = questions.Count });
        await db.SaveChangesAsync();
        return Csv.ToUtf8WithBom(Csv.Write(rows));
    }

    public static byte[] Template()
    {
        var rows = new List<string?[]>
        {
            Columns,
            new string?[]
            {
                "SAMPLE-0001", "SingleChoice", "en", "COURSE-CODE", "M01", "L01", "SKILL.CODE", "",
                "Which statement best describes a large language model?",
                "A database that retrieves stored answers", "A model that predicts the next text based on learned patterns", "", "", "", "",
                "B", "LLMs generate text probabilistically and do not guarantee correctness.",
                "Incorrect: the model does not store ready-made answers.", "Correct: it predicts the next tokens from patterns in training data.", "", "", "", "",
                "Easy", "basics;llm", "Mastemy original", "Draft",
            },
        };
        return Csv.ToUtf8WithBom(Csv.Write(rows));
    }
}
