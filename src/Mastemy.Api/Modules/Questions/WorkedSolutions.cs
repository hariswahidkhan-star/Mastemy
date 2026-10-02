using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mastemy.Api.Modules.Questions;

/// <summary>
/// Optional step-by-step worked solution of one question version (1:1 side table of <see cref="QuestionVersion"/>). Rich text
/// validated like rationales/explanations; shown to learners only where the explanation is shown (practice check/review and
/// exam review once the answer-review policy allows it).
/// </summary>
public class QuestionWorkedSolution
{
    public Guid QuestionVersionId { get; set; }
    public string Text { get; set; } = "";
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class QuestionWorkedSolutionConfig : IEntityTypeConfiguration<QuestionWorkedSolution>
{
    public void Configure(EntityTypeBuilder<QuestionWorkedSolution> b)
    {
        b.ToTable("Questions_WorkedSolutions");
        b.HasKey(x => x.QuestionVersionId);
        b.Property(x => x.Text).HasColumnType("longtext").IsRequired();
        b.HasOne<QuestionVersion>().WithOne().HasForeignKey<QuestionWorkedSolution>(x => x.QuestionVersionId).OnDelete(DeleteBehavior.Cascade);
    }
}

public static class WorkedSolutions
{
    public const int MaxLength = 8000;

    /// <summary>Stages the worked solution of a version (caller saves). Blank removes it.</summary>
    public static async Task Stage(AppDbContext db, Guid versionId, string? text)
    {
        var normalized = string.IsNullOrWhiteSpace(text) ? null : RichText.Normalize(text).Trim();
        var row = db.Set<QuestionWorkedSolution>().Local.FirstOrDefault(x => x.QuestionVersionId == versionId)
                  ?? await db.Set<QuestionWorkedSolution>().FirstOrDefaultAsync(x => x.QuestionVersionId == versionId);
        if (normalized is null) { if (row is not null) db.Set<QuestionWorkedSolution>().Remove(row); return; }
        if (row is null) db.Set<QuestionWorkedSolution>().Add(new QuestionWorkedSolution { QuestionVersionId = versionId, Text = normalized });
        else { row.Text = normalized; row.UpdatedAt = DateTime.UtcNow; }
    }

    public static async Task<Dictionary<Guid, string>> For(AppDbContext db, IEnumerable<Guid> versionIds)
    {
        var ids = versionIds.Distinct().ToList();
        if (ids.Count == 0) return [];
        return await db.Set<QuestionWorkedSolution>().AsNoTracking().Where(x => ids.Contains(x.QuestionVersionId))
            .ToDictionaryAsync(x => x.QuestionVersionId, x => x.Text);
    }

    /// <summary>Fills <see cref="QuestionVersionDto.WorkedSolution"/> on the current and pending versions of a DTO.</summary>
    public static async Task<QuestionDto> Attach(AppDbContext db, QuestionDto dto)
    {
        var map = await For(db, dto.Pending is null ? [dto.Version.Id] : [dto.Version.Id, dto.Pending.Id]);
        return dto with
        {
            Version = dto.Version with { WorkedSolution = map.GetValueOrDefault(dto.Version.Id) },
            Pending = dto.Pending is null ? null : dto.Pending with { WorkedSolution = map.GetValueOrDefault(dto.Pending.Id) },
        };
    }
}
