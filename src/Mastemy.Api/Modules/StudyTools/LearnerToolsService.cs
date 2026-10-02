using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Catalog;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.StudyTools;

public record FolderRequest(string Name, int? SortOrder);
public record FolderCourseDto(Guid CourseId, string Slug, string Title, DateTime AddedAt);
public record FolderDto(Guid Id, string Name, int SortOrder, DateTime CreatedAt, List<FolderCourseDto> Courses);
public record BookmarkRequest(Guid LessonId, int TimestampSeconds, string? Label);
public record BookmarkDto(Guid Id, Guid CourseId, string CourseTitle, Guid LessonId, string LessonTitle, int TimestampSeconds, string Label,
    bool LessonAvailable, DateTime CreatedAt);
public record ContinueLearningDto(Guid CourseId, string Slug, string CourseTitle, Guid? LessonId, string? LessonTitle, int PositionSeconds,
    int ProgressPercent, int CompletedLessons, int TotalLessons, bool CourseCompleted, DateTime? LastActivityAt);

/// <summary>Course folders, timestamped lesson bookmarks and "continue learning" (spec §16). All rows are private to their owner.</summary>
public class LearnerToolsService(AppDbContext db, ICurrentUser me, CourseSnapshotService snapshots)
{
    public const int MaxFolders = 50, MaxBookmarks = 2000;

    // ---------- folders ----------
    public async Task<List<FolderDto>> Folders()
    {
        var uid = me.RequireId();
        var folders = await db.Set<CourseFolder>().AsNoTracking().Where(f => f.UserId == uid).OrderBy(f => f.SortOrder).ThenBy(f => f.Name).ToListAsync();
        var ids = folders.Select(f => f.Id).ToList();
        var items = await (from i in db.Set<CourseFolderItem>().AsNoTracking()
                           join c in db.Courses.AsNoTracking() on i.CourseId equals c.Id
                           where ids.Contains(i.FolderId)
                           select new { i.FolderId, i.CourseId, c.Slug, c.Title, i.AddedAt }).ToListAsync();
        var cards = await snapshots.CardsFor(items.Select(i => i.CourseId).Distinct().ToList());
        return folders.Select(f => new FolderDto(f.Id, f.Name, f.SortOrder, f.CreatedAt, items.Where(i => i.FolderId == f.Id).OrderBy(i => i.AddedAt)
            .Select(i => new FolderCourseDto(i.CourseId, i.Slug, cards.TryGetValue(i.CourseId, out var card) ? card.Title : i.Title, i.AddedAt)).ToList())).ToList();
    }

    public async Task<FolderDto> CreateFolder(FolderRequest req)
    {
        var uid = me.RequireId();
        var name = FolderName(req.Name);
        var count = await db.Set<CourseFolder>().CountAsync(f => f.UserId == uid);
        if (count >= MaxFolders) throw AppException.Bad($"You can have at most {MaxFolders} folders.");
        if (await db.Set<CourseFolder>().AnyAsync(f => f.UserId == uid && f.Name == name)) throw AppException.Conflict("A folder with that name already exists.", "folder_exists");
        var f = new CourseFolder { UserId = uid, Name = name, SortOrder = req.SortOrder ?? count + 1 };
        db.Set<CourseFolder>().Add(f);
        try { await db.SaveChangesAsync(); }
        catch (DbUpdateException) { throw AppException.Conflict("A folder with that name already exists.", "folder_exists"); }
        return new FolderDto(f.Id, f.Name, f.SortOrder, f.CreatedAt, []);
    }

    public async Task<FolderDto> UpdateFolder(Guid id, FolderRequest req)
    {
        var f = await OwnFolder(id);
        var name = FolderName(req.Name);
        if (await db.Set<CourseFolder>().AnyAsync(x => x.UserId == f.UserId && x.Name == name && x.Id != id))
            throw AppException.Conflict("A folder with that name already exists.", "folder_exists");
        f.Name = name;
        if (req.SortOrder is not null) f.SortOrder = req.SortOrder.Value;
        await db.SaveChangesAsync();
        return (await Folders()).First(x => x.Id == id);
    }

    public async Task DeleteFolder(Guid id)
    {
        var f = await OwnFolder(id);
        db.Set<CourseFolder>().Remove(f);
        await db.SaveChangesAsync();
    }

    public async Task AddToFolder(Guid folderId, Guid courseId)
    {
        var f = await OwnFolder(folderId);
        if (!await db.Enrollments.AnyAsync(e => e.UserId == f.UserId && e.CourseId == courseId))
            throw AppException.Bad("Only courses you are enrolled in can be added to a folder.", "not_enrolled");
        if (await db.Set<CourseFolderItem>().AnyAsync(i => i.FolderId == folderId && i.CourseId == courseId)) return;
        db.Set<CourseFolderItem>().Add(new CourseFolderItem { FolderId = folderId, CourseId = courseId });
        try { await db.SaveChangesAsync(); } catch (DbUpdateException) { db.ChangeTracker.Clear(); } // concurrent duplicate add
    }

    public async Task RemoveFromFolder(Guid folderId, Guid courseId)
    {
        await OwnFolder(folderId);
        await db.Set<CourseFolderItem>().Where(i => i.FolderId == folderId && i.CourseId == courseId).ExecuteDeleteAsync();
    }

    private async Task<CourseFolder> OwnFolder(Guid id)
    {
        var uid = me.RequireId();
        // Another user's folder is indistinguishable from a missing one.
        return await db.Set<CourseFolder>().FirstOrDefaultAsync(f => f.Id == id && f.UserId == uid) ?? throw AppException.NotFound("Folder");
    }

    private static string FolderName(string? v)
    {
        var t = (v ?? "").Trim();
        if (t.Length is 0 or > 100) throw AppException.Bad("name is required (max 100 characters).");
        return t;
    }

    // ---------- bookmarks ----------
    public async Task<List<BookmarkDto>> Bookmarks(Guid? courseId, Guid? lessonId)
    {
        var uid = me.RequireId();
        var q = db.Set<LessonBookmark>().AsNoTracking().Where(b => b.UserId == uid);
        if (courseId is not null) q = q.Where(b => b.CourseId == courseId);
        if (lessonId is not null) q = q.Where(b => b.LessonId == lessonId);
        var rows = await q.OrderBy(b => b.CourseId).ThenBy(b => b.LessonId).ThenBy(b => b.TimestampSeconds).Take(MaxBookmarks).ToListAsync();
        var ids = rows.Select(r => r.LessonId).Distinct().ToList();
        var live = (await (from sl in db.SnapshotLessons.AsNoTracking()
                           join c in db.Courses.AsNoTracking() on sl.CourseId equals c.Id
                           where ids.Contains(sl.LessonId) && sl.Version == c.PublishedVersion
                           select sl.LessonId).ToListAsync()).ToHashSet();
        return rows.Select(b => new BookmarkDto(b.Id, b.CourseId, b.CourseTitleSnapshot, b.LessonId, b.LessonTitleSnapshot, b.TimestampSeconds, b.Label,
            live.Contains(b.LessonId), b.CreatedAt)).ToList();
    }

    public async Task<BookmarkDto> AddBookmark(BookmarkRequest req)
    {
        var uid = me.RequireId();
        var (pc, _, lesson) = await snapshots.LiveLesson(req.LessonId);
        if (req.TimestampSeconds < 0) throw AppException.Bad("timestampSeconds must be zero or positive.");
        if (lesson.DurationSeconds > 0 && req.TimestampSeconds > lesson.DurationSeconds)
            throw AppException.Bad("timestampSeconds is beyond the end of the video.");
        var label = (req.Label ?? "").Trim();
        if (label.Length > 200) throw AppException.Bad("label must be at most 200 characters.");
        if (await db.Set<LessonBookmark>().CountAsync(b => b.UserId == uid) >= MaxBookmarks)
            throw AppException.Bad($"You can have at most {MaxBookmarks} bookmarks.");
        var existing = await db.Set<LessonBookmark>().FirstOrDefaultAsync(b => b.UserId == uid && b.LessonId == lesson.Id && b.TimestampSeconds == req.TimestampSeconds);
        if (existing is null)
        {
            existing = new LessonBookmark
            {
                UserId = uid, CourseId = pc.Course.Id, LessonId = lesson.Id, TimestampSeconds = req.TimestampSeconds,
                LessonTitleSnapshot = Cap(lesson.Title), CourseTitleSnapshot = Cap(pc.Payload.Title),
            };
            db.Set<LessonBookmark>().Add(existing);
        }
        existing.Label = label;
        try { await db.SaveChangesAsync(); }
        catch (DbUpdateException) { throw AppException.Conflict("That bookmark already exists.", "bookmark_exists"); }
        return new BookmarkDto(existing.Id, existing.CourseId, existing.CourseTitleSnapshot, existing.LessonId, existing.LessonTitleSnapshot,
            existing.TimestampSeconds, existing.Label, true, existing.CreatedAt);
    }

    public async Task DeleteBookmark(Guid id)
    {
        var uid = me.RequireId();
        var n = await db.Set<LessonBookmark>().Where(b => b.Id == id && b.UserId == uid).ExecuteDeleteAsync();
        if (n == 0) throw AppException.NotFound("Bookmark");
    }

    private static string Cap(string s) => s.Length <= 500 ? s : s[..500];

    // ---------- continue learning ----------
    /// <summary>
    /// Enrolled live courses ordered by most recent activity, each with the lesson to resume: the last touched lesson if it is
    /// unfinished (at its saved position), otherwise the next unfinished lesson in curriculum order.
    /// </summary>
    public async Task<List<ContinueLearningDto>> ContinueLearning(int limit)
    {
        var uid = me.RequireId();
        limit = Math.Clamp(limit, 1, 50);
        var courses = await (from e in db.Enrollments.AsNoTracking()
                             join c in db.Courses.AsNoTracking() on e.CourseId equals c.Id
                             where e.UserId == uid
                             select new { c, e.CreatedAt }).ToListAsync();
        var live = courses.Where(x => AccessService.IsLive(x.c)).ToList();
        var published = await snapshots.ForCourses(live.Select(x => x.c).ToList());
        var allLessons = published.Values.SelectMany(p => p.Payload.OrderedLessons().Select(x => x.Lesson.Id)).ToList();
        var progress = await db.LessonProgress.AsNoTracking().Where(p => p.UserId == uid && allLessons.Contains(p.LessonId)).ToDictionaryAsync(p => p.LessonId);
        var result = new List<ContinueLearningDto>();
        foreach (var x in live)
        {
            var pc = published[x.c.Id];
            var ordered = pc.Payload.OrderedLessons().Select(o => o.Lesson).ToList();
            var mine = ordered.Where(l => progress.ContainsKey(l.Id)).Select(l => progress[l.Id]).ToList();
            var done = mine.Count(p => p.Completed);
            var last = mine.OrderByDescending(p => p.UpdatedAt).FirstOrDefault();
            Catalog.SnapshotLesson? resume = null;
            var position = 0;
            if (last is not null && !last.Completed) { resume = ordered.First(l => l.Id == last.LessonId); position = last.PositionSeconds; }
            else
            {
                var start = last is null ? 0 : ordered.FindIndex(l => l.Id == last.LessonId) + 1;
                resume = ordered.Skip(start).Concat(ordered.Take(start)).FirstOrDefault(l => !(progress.TryGetValue(l.Id, out var p) && p.Completed));
                if (resume is not null && progress.TryGetValue(resume.Id, out var rp)) position = rp.PositionSeconds;
            }
            result.Add(new ContinueLearningDto(x.c.Id, x.c.Slug, pc.Payload.Title, resume?.Id, resume?.Title, position,
                ordered.Count == 0 ? 0 : (int)Math.Round(100.0 * done / ordered.Count), done, ordered.Count,
                ordered.Count > 0 && done == ordered.Count, last?.UpdatedAt ?? null));
        }
        return result.OrderByDescending(r => r.LastActivityAt ?? DateTime.MinValue)
            .ThenByDescending(r => courses.First(c => c.c.Id == r.CourseId).CreatedAt).Take(limit).ToList();
    }
}
