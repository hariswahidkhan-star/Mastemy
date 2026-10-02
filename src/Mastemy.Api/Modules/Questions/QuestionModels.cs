using System.Text.RegularExpressions;
using Mastemy.Api.Domain;

namespace Mastemy.Api.Modules.Questions;

public record OptionInput(Guid? Id, string Text, bool IsCorrect, string Rationale);

public record QuestionInput(
    string ExternalId, QuestionType Type, string Language, string Stem, string Explanation, Difficulty Difficulty,
    string? SkillCode, string? CertificationObjective, List<string>? Tags, string? SourceReference, bool AllowShuffle,
    Guid? ModuleId, Guid? LessonId, List<OptionInput> Options,
    CognitiveLevel? CognitiveLevel = null, Guid? CaseGroupId = null, int? CaseGroupOrder = null);

public record StateChangeInput(QuestionState State);

public record OptionDto(Guid Id, int SortOrder, string Text, bool IsCorrect, string Rationale);

public record QuestionVersionDto(Guid Id, int Version, QuestionType Type, string Language, string Stem, string Explanation,
    Difficulty Difficulty, string SkillCode, string CertificationObjective, List<string> Tags, string SourceReference,
    bool AllowShuffle, Guid? EditedBy, Guid? ReviewedBy, DateTime CreatedAt, List<OptionDto> Options);

public record QuestionDto(Guid Id, Guid CourseId, string ExternalId, QuestionState State, int CurrentVersion,
    Guid? ModuleId, Guid? LessonId, Guid CreatedBy, Guid? ReviewedBy, DateTime CreatedAt, DateTime UpdatedAt,
    QuestionVersionDto Version, int? PendingVersion, QuestionState? PendingState, QuestionVersionDto? Pending,
    QuestionMetaDto? Meta = null);

public record QuestionMetaDto(CognitiveLevel? CognitiveLevel, Guid? CaseGroupId, int CaseGroupOrder, Guid? SourceQuestionId,
    int? SourceVersion, Guid? SourceCourseId, bool Reusable)
{
    public static QuestionMetaDto From(QuestionMeta? m) => m is null
        ? new QuestionMetaDto(null, null, 0, null, null, null, false)
        : new QuestionMetaDto(m.CognitiveLevel, m.CaseGroupId, m.CaseGroupOrder, m.SourceQuestionId, m.SourceVersion, m.SourceCourseId, m.Reusable);
}

public record QuestionVersionSummary(Guid Id, int Version, DateTime CreatedAt, Guid? EditedBy, Guid? ReviewedBy);

public record QuestionDetailDto(QuestionDto Question, List<QuestionVersionSummary> Versions);

public record Paged<T>(List<T> Items, int Total, int Page, int PageSize);

/// <summary>Content rules shared by the editor and the bulk importer.</summary>
public static partial class QuestionRules
{
    public const int MinOptions = 2, MaxOptions = 6;
    public const int MaxStem = 8000, MaxExplanation = 8000, MaxOption = 2000, MaxRationale = 4000;
    public const int MaxSkill = 100, MaxObjective = 200, MaxSource = 500, MaxTag = 50;

    [GeneratedRegex("^[A-Za-z0-9._-]{1,100}$")] public static partial Regex ExternalIdRx();
    [GeneratedRegex("^[a-z]{2}(-[A-Z]{2})?$")] public static partial Regex LanguageRx();

    /// <summary>True when the text contains control characters, replacement characters (malformed encoding) or lone surrogates.</summary>
    public static bool HasBadChars(string? s)
    {
        if (string.IsNullOrEmpty(s)) return false;
        for (var i = 0; i < s.Length; i++)
        {
            var c = s[i];
            if (c is '\t' or '\n' or '\r') continue;
            if (c < 0x20 || c == 0x7F || (c >= 0x80 && c <= 0x9F) || c == '�' || c == '﻿') return true;
            if (char.IsHighSurrogate(c)) { if (i + 1 >= s.Length || !char.IsLowSurrogate(s[i + 1])) return true; i++; continue; }
            if (char.IsLowSurrogate(c)) return true;
        }
        return false;
    }

    /// <summary>Single-line fields may not contain line breaks either.</summary>
    public static bool HasBadSingleLine(string? s) => HasBadChars(s) || (s?.IndexOfAny(['\r', '\n', '\t']) ?? -1) >= 0;

    public static List<string> NormalizeTags(IEnumerable<string>? tags) =>
        (tags ?? []).Select(t => t.Trim()).Where(t => t.Length > 0).Distinct(StringComparer.OrdinalIgnoreCase).ToList();

    public static List<string> SplitTags(string? tags) => NormalizeTags((tags ?? "").Split(';'));

    /// <summary>Validates a full question; returns human-readable errors (empty when valid).</summary>
    public static List<string> Validate(QuestionInput q)
    {
        var e = new List<string>();
        if (string.IsNullOrWhiteSpace(q.ExternalId) || !ExternalIdRx().IsMatch(q.ExternalId))
            e.Add("externalId is required (1-100 chars: letters, digits, '.', '_', '-').");
        if (!Enum.IsDefined(q.Type)) e.Add("type must be SingleChoice or MultipleSelect.");
        if (!Enum.IsDefined(q.Difficulty)) e.Add("difficulty must be Easy, Medium or Hard.");
        if (string.IsNullOrWhiteSpace(q.Language) || !LanguageRx().IsMatch(q.Language)) e.Add("language must look like 'en' or 'ar' (optionally 'en-US').");
        Text(e, "stem", q.Stem, MaxStem, required: true);
        Text(e, "explanation", q.Explanation, MaxExplanation, required: true);
        if (q.CognitiveLevel is { } cl && !Enum.IsDefined(cl)) e.Add("cognitiveLevel must be Remember, Understand, Apply, Analyze or Evaluate.");
        if (q.CaseGroupOrder is < 0 or > 1000) e.Add("caseGroupOrder must be between 0 and 1000.");
        var ids = new HashSet<Guid>();
        RichText.Validate("stem", q.Stem, e, ids);
        RichText.Validate("explanation", q.Explanation, e, ids);
        Line(e, "skillCode", q.SkillCode, MaxSkill);
        Line(e, "certificationObjective", q.CertificationObjective, MaxObjective);
        Line(e, "sourceReference", q.SourceReference, MaxSource);
        foreach (var t in q.Tags ?? [])
        {
            if (t.Length > MaxTag || t.Contains(';') || HasBadSingleLine(t)) { e.Add($"tag '{Trunc(t)}' is invalid (max {MaxTag} chars, no ';' or control characters)."); }
        }
        var opts = q.Options ?? [];
        if (opts.Count < MinOptions || opts.Count > MaxOptions) e.Add($"between {MinOptions} and {MaxOptions} options are required.");
        for (var i = 0; i < opts.Count; i++)
        {
            var o = opts[i];
            var label = $"option {(char)('A' + Math.Min(i, 25))}";
            Text(e, $"{label} text", o.Text, MaxOption, required: true);
            Text(e, $"{label} rationale", o.Rationale, MaxRationale, required: true);
            RichText.Validate($"{label} text", o.Text, e, ids);
            RichText.Validate($"{label} rationale", o.Rationale, e, ids);
        }
        var dup = opts.Where(o => !string.IsNullOrWhiteSpace(o.Text)).GroupBy(o => o.Text.Trim(), StringComparer.OrdinalIgnoreCase).FirstOrDefault(g => g.Count() > 1);
        if (dup is not null) e.Add($"option text must be distinct (duplicate: '{Trunc(dup.Key)}').");
        var correct = opts.Count(o => o.IsCorrect);
        if (q.Type == QuestionType.SingleChoice && correct != 1) e.Add("SingleChoice questions need exactly one correct option.");
        if (q.Type == QuestionType.MultipleSelect && correct < 1) e.Add("MultipleSelect questions need at least one correct option.");
        return e;
    }

    private static void Text(List<string> e, string name, string? v, int max, bool required)
    {
        if (string.IsNullOrWhiteSpace(v)) { if (required) e.Add($"{name} is required."); return; }
        if (v.Length > max) e.Add($"{name} exceeds {max} characters.");
        if (HasBadChars(v)) e.Add($"{name} contains control characters or malformed text.");
    }

    private static void Line(List<string> e, string name, string? v, int max)
    {
        if (string.IsNullOrEmpty(v)) return;
        if (v.Length > max) e.Add($"{name} exceeds {max} characters.");
        if (HasBadSingleLine(v)) e.Add($"{name} contains control characters or line breaks.");
    }

    /// <summary>Course resources referenced as images anywhere in the question.</summary>
    public static HashSet<Guid> ResourceIds(QuestionInput q)
    {
        var set = new HashSet<Guid>(RichText.ResourceIds(q.Stem).Concat(RichText.ResourceIds(q.Explanation)));
        foreach (var o in q.Options ?? []) { set.UnionWith(RichText.ResourceIds(o.Text)); set.UnionWith(RichText.ResourceIds(o.Rationale)); }
        return set;
    }

    public static string Trunc(string s) => s.Length <= 40 ? s : s[..40] + "…";

    public static QuestionVersionDto ToDto(QuestionVersion v) => new(v.Id, v.Version, v.Type, v.Language, v.Stem, v.Explanation,
        v.Difficulty, v.SkillCode, v.CertificationObjective, SplitTags(v.Tags), v.SourceReference, v.AllowShuffle, v.EditedBy, v.ReviewedBy, v.CreatedAt,
        v.Options.OrderBy(o => o.SortOrder).Select(o => new OptionDto(o.Id, o.SortOrder, o.Text, o.IsCorrect, o.Rationale)).ToList());

    public static QuestionDto ToDto(Question q, QuestionVersion v, QuestionVersion? pending = null) => new(q.Id, q.CourseId, q.ExternalId, q.State, q.CurrentVersion,
        q.ModuleId, q.LessonId, q.CreatedBy, q.ReviewedBy, q.CreatedAt, q.UpdatedAt, ToDto(v),
        pending is null ? null : q.PendingVersion, pending is null ? null : q.PendingState, pending is null ? null : ToDto(pending));
}
