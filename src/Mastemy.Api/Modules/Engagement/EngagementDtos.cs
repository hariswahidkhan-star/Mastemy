using System.Text.RegularExpressions;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;

namespace Mastemy.Api.Modules.Engagement;

public record EngagementPage<T>(List<T> Items, int Total, int Page, int PageSize);

// Discovery
public record CourseCardLiteDto(Guid Id, string Slug, string Title, string Subtitle, CourseLevel Level, string Language,
    decimal? MinPrice, string? Currency);
public record WishlistItemDto(CourseCardLiteDto Course, DateTime AddedAt);
public record RecentlyViewedDto(CourseCardLiteDto Course, DateTime ViewedAt);
public record ComparePackageDto(Guid Id, string Title, string Contents, decimal Price, string Currency, int AccessDays);
public record CompareCourseDto(Guid Id, string Slug, string Title, CourseLevel Level, string Language, int LessonCount,
    int ReadyVideoCount, int ActiveQuestionCount, int TotalDurationSeconds, List<ComparePackageDto> Packages,
    decimal? RatingAverage, int RatingCount, DateTime? ReviewedAt, string CredentialType);

// Discussions
public record ThreadInput(Guid? LessonId, string? Title, string? Body);
public record ThreadEditInput(string? Title, string? Body);
public record ReplyInput(string? Body);
public record ResolveInput(bool Resolved);
public record HideInput(bool Hidden, string? Reason);
public record ThreadSummaryDto(Guid Id, Guid CourseId, Guid? LessonId, Guid AuthorId, string AuthorName, string Title,
    string Body, bool Resolved, bool Hidden, int ReplyCount, DateTime CreatedAt, DateTime UpdatedAt);
public record ReplyDto(Guid Id, Guid ThreadId, Guid AuthorId, string AuthorName, string Body, bool IsInstructorReply,
    bool Hidden, DateTime CreatedAt);
public record ThreadDetailDto(ThreadSummaryDto Thread, List<ReplyDto> Replies);

// Announcements
public record AnnouncementInput(string? Title, string? Body, string? ClientRequestId = null);
public record AnnouncementDto(Guid Id, Guid CourseId, Guid AuthorId, string AuthorName, string Title, string Body, DateTime CreatedAt);
public record AnnouncementCreatedDto(AnnouncementDto Announcement, int NotifiedCount, bool Duplicate = false);

// Notifications
public record NotificationDto(Guid Id, string Kind, string Title, string Link, DateTime? ReadAt, DateTime CreatedAt);
public record NotificationPageDto(List<NotificationDto> Items, int Total, int Page, int PageSize, int UnreadCount);
public record PreferenceDto(string Kind, bool InApp, bool Email);
public record PreferencesDto(bool EmailAvailable, List<PreferenceDto> Items);
public record PreferencesInput(List<PreferenceDto>? Items);

// Issues
public record IssueInput(Guid? LessonId, string? Category, string? Body);
public record IssueDto(long Id, Guid CourseId, Guid? LessonId, string Category, string Body, Guid? ReporterId,
    string ReporterName, DateTime CreatedAt);

public static class NotificationKinds
{
    public const string Announcement = "announcement", Reply = "reply", ReviewReply = "review_reply",
        CourseUpdated = "course_updated", Certificate = "certificate", IssueReported = "issue_reported";
    public static readonly string[] All = [Announcement, Reply, ReviewReply, CourseUpdated, Certificate, IssueReported];
}

public static partial class TextRules
{
    [GeneratedRegex(@"<\s*/?\s*[a-zA-Z!?]")]
    private static partial Regex HtmlTag();

    /// <summary>Trims and validates plain-text user content: length bounds and no HTML markup.</summary>
    public static string PlainText(string? value, string field, int min, int max)
    {
        var v = (value ?? "").Trim();
        if (v.Length < min || v.Length > max) throw AppException.Bad($"{field} must be {min}-{max} characters.");
        if (HtmlTag().IsMatch(v)) throw AppException.Bad($"{field} must be plain text (HTML is not allowed).", "html_not_allowed");
        return v;
    }

    public static (int Page, int PageSize) Paging(int page, int pageSize)
    {
        if (page < 1) throw AppException.Bad("page must be >= 1.");
        if (pageSize is < 1 or > 100) throw AppException.Bad("pageSize must be 1-100.");
        return (page, pageSize);
    }
}
