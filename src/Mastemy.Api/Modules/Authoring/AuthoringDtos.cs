using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Learning;

namespace Mastemy.Api.Modules.Catalog
{
    public record DuplicateCourseRequest(string? Title);
    public record BulkLessonsRequest(string[] Titles);
}

namespace Mastemy.Api.Modules.Authoring
{
    // ---------- Revisions / history ----------
    public record LessonNotesDto(Guid LessonId, int NotesVersion, string ETag, string NotesMarkdown, string? PremiumNotesMarkdown);
    public record LessonRevisionSummaryDto(int Revision, Guid? AuthorId, string? AuthorName, DateTime CreatedAt, int? RestoredFromRevision,
        int NotesLength, int PremiumNotesLength, bool IsCurrent);
    public record LessonRevisionDto(int Revision, Guid? AuthorId, string? AuthorName, DateTime CreatedAt, int? RestoredFromRevision,
        string NotesMarkdown, string? PremiumNotesMarkdown, bool IsCurrent);
    public record CourseHistoryEntryDto(string Kind, string Action, DateTime At, Guid? ActorId, string? ActorName, Guid? LessonId,
        int? Revision, string? Details);
    public record CourseHistoryDto(Guid CourseId, int Page, int PageSize, bool HasMore, List<CourseHistoryEntryDto> Items);

    // ---------- Templates / checklist ----------
    public record TemplateLessonDto(string Title, string? Objective);
    public record TemplateModuleDto(string Title, List<TemplateLessonDto>? Lessons);
    public record CourseTemplateDto(Guid Id, string Name, string Description, List<TemplateModuleDto> Modules, List<string> Checklist,
        bool IsActive, DateTime UpdatedAt);
    public record CourseTemplateRequest(string Name, string? Description, List<TemplateModuleDto>? Modules, List<string>? Checklist, bool? IsActive);
    public record CreateFromTemplateRequest(Guid TemplateId, Catalog.CreateCourseRequest Course);
    public record ChecklistItemDto(Guid Id, string Text, int SortOrder, bool Done, Guid? DoneBy, DateTime? DoneAt);
    public record ChecklistAddRequest(string Text);
    public record ChecklistToggleRequest(bool Done);

    // ---------- Translations ----------
    public record TranslationLinkRequest(Guid CourseId);
    public record StudioTranslationDto(Guid CourseId, string Code, string Title, string Language, CourseStatus Status);
    public record CourseLanguageDto(Guid CourseId, string Slug, string Language, string Title, bool IsCurrent);

    // ---------- Preview ----------
    /// <summary>Learner view built from the draft rows (same DTO shapes as /api/learn). Never contains answer keys.</summary>
    public record LearnerPreviewDto(Guid CourseId, string As, string Device, bool IsDraftPreview, CurriculumDto Curriculum, List<LessonViewDto> Lessons);
}
