using Mastemy.Api.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mastemy.Api.Modules.StudyTools;

/// <summary>A learner's study plan (one per user): goal courses, target date and weekly time budget.</summary>
public class StudyPlan
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public DateTime TargetDate { get; set; }
    public int WeeklyMinutes { get; set; }
    public int SessionDaysMask { get; set; } // bit (1 << (int)DayOfWeek)
    public int SessionHourUtc { get; set; }
    public bool RemindersEnabled { get; set; }
    public bool FitsBeforeTarget { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class StudyPlanCourse
{
    public Guid PlanId { get; set; }
    public Guid CourseId { get; set; }
    public int SortOrder { get; set; }
}

/// <summary>One scheduled lesson. Items sharing ScheduledAt form one study session (one calendar event / one reminder).</summary>
public class StudyPlanItem
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid PlanId { get; set; }
    public Guid UserId { get; set; }
    public Guid CourseId { get; set; }
    public Guid LessonId { get; set; }
    public string CourseTitle { get; set; } = "";
    public string LessonTitle { get; set; } = "";
    public int DurationSeconds { get; set; }
    public DateTime WeekStart { get; set; }
    public DateTime ScheduledAt { get; set; }
    public int SortOrder { get; set; }
    public DateTime? ReminderSentAt { get; set; }
}

public class CourseFolder
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public string Name { get; set; } = "";
    public int SortOrder { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class CourseFolderItem
{
    public Guid FolderId { get; set; }
    public Guid CourseId { get; set; }
    public DateTime AddedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>A lesson bookmark at a video timestamp. Separate from learner notes (no body text).</summary>
public class LessonBookmark
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid CourseId { get; set; }
    public Guid LessonId { get; set; }
    public int TimestampSeconds { get; set; }
    public string Label { get; set; } = "";
    public string LessonTitleSnapshot { get; set; } = "";
    public string CourseTitleSnapshot { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class StudyPlanConfig : IEntityTypeConfiguration<StudyPlan>
{
    public void Configure(EntityTypeBuilder<StudyPlan> b)
    {
        b.ToTable("StudyTools_Plans");
        b.HasKey(x => x.Id);
        b.HasIndex(x => x.UserId).IsUnique();
        b.HasOne<User>().WithMany().HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Cascade);
    }
}

public class StudyPlanCourseConfig : IEntityTypeConfiguration<StudyPlanCourse>
{
    public void Configure(EntityTypeBuilder<StudyPlanCourse> b)
    {
        b.ToTable("StudyTools_PlanCourses");
        b.HasKey(x => new { x.PlanId, x.CourseId });
        b.HasOne<StudyPlan>().WithMany().HasForeignKey(x => x.PlanId).OnDelete(DeleteBehavior.Cascade);
        b.HasOne<Course>().WithMany().HasForeignKey(x => x.CourseId).OnDelete(DeleteBehavior.Cascade);
    }
}

public class StudyPlanItemConfig : IEntityTypeConfiguration<StudyPlanItem>
{
    public void Configure(EntityTypeBuilder<StudyPlanItem> b)
    {
        b.ToTable("StudyTools_PlanItems");
        b.HasKey(x => x.Id);
        b.HasIndex(x => new { x.PlanId, x.SortOrder });
        b.HasIndex(x => new { x.ReminderSentAt, x.ScheduledAt });
        b.HasOne<StudyPlan>().WithMany().HasForeignKey(x => x.PlanId).OnDelete(DeleteBehavior.Cascade);
    }
}

public class CourseFolderConfig : IEntityTypeConfiguration<CourseFolder>
{
    public void Configure(EntityTypeBuilder<CourseFolder> b)
    {
        b.ToTable("StudyTools_Folders");
        b.HasKey(x => x.Id);
        b.Property(x => x.Name).HasMaxLength(100);
        b.HasIndex(x => new { x.UserId, x.Name }).IsUnique();
        b.HasOne<User>().WithMany().HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Cascade);
    }
}

public class CourseFolderItemConfig : IEntityTypeConfiguration<CourseFolderItem>
{
    public void Configure(EntityTypeBuilder<CourseFolderItem> b)
    {
        b.ToTable("StudyTools_FolderCourses");
        b.HasKey(x => new { x.FolderId, x.CourseId });
        b.HasOne<CourseFolder>().WithMany().HasForeignKey(x => x.FolderId).OnDelete(DeleteBehavior.Cascade);
        b.HasOne<Course>().WithMany().HasForeignKey(x => x.CourseId).OnDelete(DeleteBehavior.Cascade);
    }
}

public class LessonBookmarkConfig : IEntityTypeConfiguration<LessonBookmark>
{
    public void Configure(EntityTypeBuilder<LessonBookmark> b)
    {
        b.ToTable("StudyTools_Bookmarks");
        b.HasKey(x => x.Id);
        b.Property(x => x.Label).HasMaxLength(200);
        b.HasIndex(x => new { x.UserId, x.CourseId, x.CreatedAt });
        b.HasIndex(x => new { x.UserId, x.LessonId, x.TimestampSeconds }).IsUnique();
        b.HasOne<User>().WithMany().HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Cascade);
    }
}
