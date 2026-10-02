using Mastemy.Api.Domain;

namespace Mastemy.Api.Modules.Assessment;

// ---------- Studio ----------
public record AssessmentInput(
    string Title, AssessmentKind Kind, AssessmentMode Mode, int? TimeLimitMinutes, int? MaxAttempts, decimal PassPercent,
    MultiSelectScoring MultiSelectScoring, int QuestionCount, bool? ShuffleQuestions, bool? ShuffleOptions, bool IsPremium,
    bool CountsTowardCertificate, Guid? ModuleId, Guid? LessonId, List<Guid>? QuestionIds, AnswerReviewPolicy? ReviewPolicy = null);

public record AssessmentDto(
    Guid Id, Guid CourseId, Guid? ModuleId, Guid? LessonId, string Title, AssessmentKind Kind, AssessmentMode Mode,
    int? TimeLimitMinutes, int? MaxAttempts, decimal PassPercent, MultiSelectScoring MultiSelectScoring, int QuestionCount,
    bool ShuffleQuestions, bool ShuffleOptions, bool IsPremium, bool CountsTowardCertificate, List<Guid> QuestionIds,
    int ActiveQuestionCount, int AttemptCount, AnswerReviewPolicy ReviewPolicy);

// ---------- Learner ----------
public record AssessmentSummaryDto(
    Guid Id, Guid CourseId, Guid? ModuleId, Guid? LessonId, string Title, AssessmentKind Kind, AssessmentMode Mode,
    int? TimeLimitMinutes, int? MaxAttempts, decimal PassPercent, MultiSelectScoring MultiSelectScoring, int QuestionCount,
    bool IsPremium, bool PremiumLocked, bool CountsTowardCertificate, string ScoringRules, string CertificateCriteria,
    int? AttemptsUsed, Guid? InProgressAttemptId, AnswerReviewPolicy ReviewPolicy,
    bool AllowPause = false, int MaxPauseMinutes = 0, int? EffectiveTimeLimitMinutes = null, bool AccommodationApplied = false,
    decimal NegativeMarkingPerWrong = 0m, string? NegativeMarkingRules = null);

public record LearnerOptionDto(Guid Id, string Text);

/// <summary>An item as shown to a learner during an attempt. Deliberately has no correctness or rationale fields.</summary>
public record AttemptItemView(Guid ItemId, int SortOrder, QuestionType Type, string Stem, List<LearnerOptionDto> Options,
    List<Guid> SelectedOptionIds, bool Flagged, Guid? CaseGroupId = null);

/// <summary>Case exhibit shared by consecutive items of an attempt (frozen at attempt start).</summary>
public record AttemptCaseDto(Guid CaseGroupId, string Title, string ExhibitMarkdown, List<Guid> ResourceIds, List<Guid> ItemIds);

public record AttemptPauseState(bool AllowPause, bool Paused, DateTime? PausedAt, int PauseSecondsRemaining);

public record AttemptView(Guid Id, Guid AssessmentId, AssessmentMode Mode, AttemptStatus Status, DateTime StartedAt,
    DateTime? DeadlineAt, DateTime ServerNow, DateTime? SubmittedAt, List<AttemptItemView> Items,
    List<AttemptCaseDto>? Cases = null, AttemptPauseState? Pause = null, int? ExtraTimePercent = null, bool Untimed = false);

public record SaveItemInput(List<Guid>? SelectedOptionIds, bool Flagged);

public record ReviewOptionDto(Guid Id, string Text, bool IsCorrect, bool Selected, string Rationale);

public record ReviewItemDto(Guid ItemId, int SortOrder, QuestionType Type, string Stem, string Explanation, decimal Points,
    bool Correct, List<Guid> SelectedOptionIds, List<Guid> CorrectOptionIds, List<ReviewOptionDto> Options, string? WorkedSolution = null);

public record TopicResult(string Tag, int Correct, int Total);

public record AttemptResult(Guid AttemptId, AttemptStatus Status, decimal ScorePercent, decimal PointsEarned, int PointsPossible,
    bool Passed, decimal PassPercent, MultiSelectScoring ScoringPolicy, int Correct, int Incorrect, int Unanswered,
    List<TopicResult> Topics, List<ReviewItemDto>? Review, string? CertificateCode, bool ReviewAvailable,
    bool ReadinessIsEstimate = true, string ReadinessDisclaimer = Scoring.ReadinessDisclaimer, bool Regraded = false);

public record AttemptDetail(AttemptView Attempt, AttemptResult? Result);

public record AttemptListItem(Guid Id, Guid AssessmentId, string AssessmentTitle, Guid CourseId, AttemptStatus Status,
    DateTime StartedAt, DateTime? SubmittedAt, decimal? ScorePercent, bool? Passed);

public record RationaleDto(Guid OptionId, string Rationale);

public record CheckResult(Guid ItemId, bool Correct, List<Guid> CorrectOptionIds, List<RationaleDto> Rationales, string Explanation,
    string? WorkedSolution = null);

// ---------- Certificates ----------
public record CertificateVerification(string Code, string RecipientName, string CourseTitle, DateTime IssuedAt,
    CertificateStatus Status, string AssessmentCriteria, string Kind = CredentialKinds.AssessedKnowledge,
    string Title = CredentialKinds.AssessedTitle, string VerificationLabel = CredentialKinds.AssessedVerificationLabel);

public record MyCertificateDto(Guid Id, string Code, Guid CourseId, string CourseTitle, string RecipientName, DateTime IssuedAt,
    CertificateStatus Status, decimal ScorePercent, string AssessmentCriteria, bool PubliclyVisible,
    string Kind = CredentialKinds.AssessedKnowledge, string Title = CredentialKinds.AssessedTitle);

public record RevokeInput(string Reason);

/// <summary>Server-side scoring rules (also published verbatim by the assessment summary endpoint).</summary>
public static class Scoring
{
    public const string ReadinessDisclaimer =
        "Scores, topic breakdowns and recommendations are practice estimates based on this platform's questions only. " +
        "They are not a prediction or guarantee of passing any external or official examination.";

    public const string Rules =
        "SingleChoice: 1 point when the single correct option is selected, otherwise 0. " +
        "MultipleSelect with AllOrNothing: 1 point only when exactly the set of correct options is selected, otherwise 0. " +
        "MultipleSelect with PartialCredit: max(0, (correct options selected - incorrect options selected) / number of correct options). " +
        "Unanswered items score 0. Score % = points earned / number of questions x 100 (displayed rounded to 2 decimals, half away from zero); " +
        "the attempt passes when the unrounded score is greater than or equal to the pass percentage. Time-limited attempts are scored automatically at the deadline.";

    /// <summary>Disclosed in the assessment summary before an attempt whenever an Exam-mode negative-marking rate is set.</summary>
    public static string NegativeRules(decimal perWrong) =>
        $"Negative marking: {perWrong.ToString("0.####", System.Globalization.CultureInfo.InvariantCulture)} point(s) are deducted for each wrong answer. " +
        "A wrong answer is an answered item that earns 0 points; unanswered items and items earning partial credit (MultipleSelect with PartialCredit) " +
        "are never penalised. The attempt total is floored at 0 and the pass decision uses the penalised total.";

    /// <summary>Wrong = answered and earned 0. Penalised total = max(0, earned - perWrong x wrong).</summary>
    public static decimal ApplyNegativeMarking(decimal earned, int wrong, decimal perWrong) =>
        perWrong <= 0m ? earned : Math.Max(0m, earned - perWrong * wrong);

    public static decimal Item(QuestionType type, IReadOnlyCollection<Guid> correct, IReadOnlyCollection<Guid> selected, MultiSelectScoring policy)
    {
        if (selected.Count == 0 || correct.Count == 0) return 0m;
        if (type == QuestionType.SingleChoice)
            return selected.Count == 1 && correct.Contains(selected.First()) ? 1m : 0m;
        if (policy == MultiSelectScoring.AllOrNothing)
            return selected.Count == correct.Count && selected.All(correct.Contains) ? 1m : 0m;
        var right = selected.Count(correct.Contains);
        var wrong = selected.Count - right;
        return Math.Round(Math.Max(0m, (decimal)(right - wrong) / correct.Count), 4);
    }

    /// <summary>Pass decision on the exact ratio (never on the rounded display value): earned/possible*100 >= passPercent.</summary>
    public static bool Passed(decimal earned, int possible, decimal passPercent) =>
        possible > 0 ? earned * 100m >= passPercent * possible : passPercent <= 0m;

    public static decimal DisplayPercent(decimal earned, int possible) =>
        possible == 0 ? 0m : Math.Round(earned / possible * 100m, 2, MidpointRounding.AwayFromZero);

    /// <summary>Whether Exam-mode answer keys, rationales and explanations may be shown for a scored attempt.</summary>
    public static bool RevealAnswers(AnswerReviewPolicy policy, bool passed, int attemptsUsed, int? maxAttempts) => policy switch
    {
        AnswerReviewPolicy.AfterSubmit => true,
        AnswerReviewPolicy.AfterPassOrAttemptsExhausted => passed || (maxAttempts is { } m && attemptsUsed >= m),
        _ => false,
    };
}

// ---------- Reports ----------
public record SkillResultDto(string Skill, decimal PointsEarned, int Questions, decimal AccuracyPercent, bool Weak);
public record LessonRecommendationDto(Guid LessonId, string ModuleTitle, string LessonTitle, List<string> WeakSkills, int Misses);
/// <summary>Diagnostic report. <see cref="ReadinessIsEstimate"/> is always true: no pass guarantee is ever implied.</summary>
public record RecommendationsDto(Guid AttemptId, Domain.AssessmentKind Kind, List<SkillResultDto> Skills, List<LessonRecommendationDto> Lessons,
    bool ReadinessIsEstimate, string ReadinessDisclaimer);
