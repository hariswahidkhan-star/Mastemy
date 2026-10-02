using System.Globalization;
using System.Text;
using Mastemy.Api.Data;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Catalog;
using Mastemy.Api.Modules.Resources;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Ai;

public static class AiText
{
    private static readonly HashSet<string> Stop = new(StringComparer.Ordinal)
    {
        "a","an","the","and","or","but","if","of","to","in","on","at","by","for","with","about","as","is","are","was","were","be","been",
        "it","its","this","that","these","those","what","which","who","whom","how","why","when","where","do","does","did","can","could",
        "should","would","will","shall","may","might","must","i","you","he","she","we","they","me","my","your","our","their","not","no",
        "from","into","than","then","so","please","explain","tell","give","there","here","some","any","all","more","most","also","just",
    };

    /// <summary>Lower-cased letter/digit tokens (Unicode-aware, so Arabic works) without stop words or 1-char tokens.</summary>
    public static List<string> Terms(string text)
    {
        var result = new List<string>();
        var sb = new StringBuilder();
        void Flush()
        {
            if (sb.Length > 1) { var t = sb.ToString(); if (!Stop.Contains(t)) result.Add(t); }
            sb.Clear();
        }
        foreach (var ch in text)
        {
            if (char.IsLetterOrDigit(ch)) sb.Append(char.ToLowerInvariant(ch));
            else Flush();
        }
        Flush();
        return result;
    }

    /// <summary>Lower-case, punctuation-free, single-spaced form used for assessment-stem matching.</summary>
    public static string Normalize(string text)
    {
        var sb = new StringBuilder(text.Length);
        var space = true;
        foreach (var ch in text.Normalize(NormalizationForm.FormKC))
        {
            if (char.IsLetterOrDigit(ch)) { sb.Append(char.ToLowerInvariant(ch)); space = false; }
            else if (!space) { sb.Append(' '); space = true; }
        }
        return sb.ToString().Trim();
    }

    public static int EstimateTokens(string s) => Math.Max(1, s.Length / 4);
    public static string Clock(int seconds) =>
        seconds >= 3600 ? TimeSpan.FromSeconds(seconds).ToString(@"h\:mm\:ss", CultureInfo.InvariantCulture)
                        : TimeSpan.FromSeconds(seconds).ToString(@"mm\:ss", CultureInfo.InvariantCulture);
}

/// <summary>Heading-aware chunking of markdown notes and time-windowed chunking of caption cues.</summary>
public static class AiChunker
{
    public record Piece(string Section, string Text, int? StartSeconds);

    public static List<Piece> Markdown(string markdown, int maxTokens)
    {
        var maxChars = Math.Max(400, maxTokens * 4);
        var pieces = new List<Piece>();
        var headings = new List<(int Level, string Text)>();
        var buf = new StringBuilder();
        string SectionName() => headings.Count == 0 ? "Notes" : string.Join(" > ", headings.Select(h => h.Text));
        var section = "Notes";
        void Emit()
        {
            var t = buf.ToString().Trim();
            if (t.Length > 0)
                foreach (var part in SplitLong(t, maxChars)) pieces.Add(new Piece(Trunc(section), part, null));
            buf.Clear();
        }
        foreach (var raw in markdown.Replace("\r\n", "\n").Split('\n'))
        {
            var line = raw.TrimEnd();
            var trimmed = line.TrimStart();
            var level = 0;
            while (level < trimmed.Length && level < 7 && trimmed[level] == '#') level++;
            if (level is >= 1 and <= 6 && trimmed.Length > level && trimmed[level] == ' ')
            {
                Emit();
                var text = trimmed[(level + 1)..].Trim();
                headings.RemoveAll(h => h.Level >= level);
                headings.Add((level, text));
                section = SectionName();
                buf.AppendLine(trimmed);
                continue;
            }
            if (buf.Length + line.Length + 1 > maxChars && line.Length == 0) Emit();
            buf.AppendLine(line);
            if (buf.Length >= maxChars) Emit();
        }
        Emit();
        return pieces;
    }

    public static List<Piece> Transcript(IReadOnlyList<CaptionCue> cues, int maxTokens)
    {
        var maxChars = Math.Max(400, maxTokens * 4);
        var pieces = new List<Piece>();
        var buf = new StringBuilder();
        int? start = null;
        foreach (var cue in cues)
        {
            var text = Captions.PlainText(cue.Text).Trim();
            if (text.Length == 0) continue;
            start ??= (int)cue.Start.TotalSeconds;
            buf.Append(text).Append(' ');
            if (buf.Length >= maxChars)
            {
                pieces.Add(new Piece(AiText.Clock(start.Value), buf.ToString().Trim(), start));
                buf.Clear(); start = null;
            }
        }
        if (buf.Length > 0 && start is not null) pieces.Add(new Piece(AiText.Clock(start.Value), buf.ToString().Trim(), start));
        return pieces;
    }

    private static IEnumerable<string> SplitLong(string text, int maxChars)
    {
        for (var i = 0; i < text.Length; i += maxChars)
            yield return text.Substring(i, Math.Min(maxChars, text.Length - i));
    }

    private static string Trunc(string s) => s.Length <= 250 ? s : s[..250];
}

/// <summary>Okapi BM25 over one course's chunks, computed in memory per request.</summary>
public static class Bm25
{
    public record Hit(AiChunk Chunk, double Score, int MatchedTerms);

    public static List<Hit> Search(IReadOnlyList<AiChunk> chunks, string query, int topK, double k1 = 1.2, double b = 0.75)
    {
        var qTerms = AiText.Terms(query).Distinct().ToList();
        if (qTerms.Count == 0 || chunks.Count == 0) return [];
        var docs = chunks.Select(c => AiText.Terms(c.LessonTitle + " " + c.Section + " " + c.Text)).ToList();
        var avg = docs.Average(d => (double)Math.Max(1, d.Count));
        var df = qTerms.ToDictionary(t => t, t => docs.Count(d => d.Contains(t)));
        var n = docs.Count;
        var hits = new List<Hit>();
        for (var i = 0; i < n; i++)
        {
            var tf = docs[i].GroupBy(t => t).ToDictionary(g => g.Key, g => g.Count());
            double score = 0; var matched = 0;
            foreach (var t in qTerms)
            {
                if (!tf.TryGetValue(t, out var f)) continue;
                matched++;
                var idf = Math.Log(1 + (n - df[t] + 0.5) / (df[t] + 0.5));
                score += idf * (f * (k1 + 1)) / (f + k1 * (1 - b + b * docs[i].Count / avg));
            }
            if (matched > 0) hits.Add(new Hit(chunks[i], score, matched));
        }
        return hits.OrderByDescending(h => h.Score).ThenBy(h => h.Chunk.Ordinal).Take(topK).ToList();
    }
}

/// <summary>Rebuilds a course's chunk index from its CURRENT PUBLISHED snapshot (never from working rows or the question bank).</summary>
public class AiIndexer(AppDbContext db, IResourceStorage storage, AiOptions opt, ILogger<AiIndexer> log)
{
    /// <summary>Ensures the index matches the course's published version; returns the indexed version (0 = nothing indexable).</summary>
    public async Task<int> EnsureIndexed(Guid courseId, CancellationToken ct, bool force = false)
    {
        var course = await db.Courses.AsNoTracking().FirstOrDefaultAsync(c => c.Id == courseId, ct);
        if (course is null || !AccessService.IsLive(course) || course.PublishedVersion == 0)
        {
            await Clear(courseId, ct);
            return 0;
        }
        var state = await db.Set<AiIndexState>().FirstOrDefaultAsync(s => s.CourseId == courseId, ct);
        if (!force && state is not null && state.SnapshotVersion == course.PublishedVersion) return state.SnapshotVersion;

        var snap = await db.CourseSnapshots.AsNoTracking()
            .FirstOrDefaultAsync(s => s.CourseId == courseId && s.Version == course.PublishedVersion, ct);
        if (snap is null) return 0;
        var payload = CourseSnapshotService.Deserialize(snap.PayloadJson);
        var chunks = new List<AiChunk>();
        var ordinal = 0;
        var resources = payload.Resources ?? [];
        foreach (var (_, lesson) in payload.OrderedLessons())
        {
            void Add(AiChunker.Piece p, string kind, bool premium) => chunks.Add(new AiChunk
            {
                CourseId = courseId, SnapshotVersion = snap.Version, LessonId = lesson.Id,
                LessonTitle = lesson.Title.Length <= 255 ? lesson.Title : lesson.Title[..255], Section = p.Section, SourceKind = kind,
                IsPremium = premium, StartSeconds = p.StartSeconds, Ordinal = ordinal++, Text = p.Text, TokenEstimate = AiText.EstimateTokens(p.Text),
            });
            foreach (var p in AiChunker.Markdown(lesson.NotesMarkdown ?? "", opt.ChunkTokens)) Add(p, AiSourceKinds.Notes, false);
            if (!string.IsNullOrWhiteSpace(lesson.PremiumNotesMarkdown))
                foreach (var p in AiChunker.Markdown(lesson.PremiumNotesMarkdown!, opt.ChunkTokens)) Add(p, AiSourceKinds.PremiumNotes, true);
            // One transcript per lesson: prefer the course language track, else the first caption track.
            var track = resources.Where(r => r.Kind == "Caption" && r.LessonId == lesson.Id)
                .OrderByDescending(r => string.Equals(r.Language, payload.Language, StringComparison.OrdinalIgnoreCase))
                .ThenBy(r => r.Language, StringComparer.Ordinal).FirstOrDefault();
            if (track is not null)
            {
                var cues = await ReadCues(track, ct);
                foreach (var p in AiChunker.Transcript(cues, opt.ChunkTokens)) Add(p, AiSourceKinds.Transcript, track.IsPremium);
            }
        }

        await using var tx = await db.Database.BeginTransactionAsync(ct);
        await db.Set<AiChunk>().Where(c => c.CourseId == courseId).ExecuteDeleteAsync(ct);
        db.Set<AiChunk>().AddRange(chunks);
        if (state is null) { state = new AiIndexState { CourseId = courseId }; db.Set<AiIndexState>().Add(state); }
        state.SnapshotVersion = snap.Version; state.ChunkCount = chunks.Count; state.IndexedAt = DateTime.UtcNow;
        await db.SaveChangesAsync(ct);
        await tx.CommitAsync(ct);
        log.LogInformation("AI index rebuilt for course {CourseId} v{Version}: {Count} chunks", courseId, snap.Version, chunks.Count);
        return snap.Version;
    }

    private async Task<List<CaptionCue>> ReadCues(SnapshotResource track, CancellationToken ct)
    {
        try
        {
            if (!storage.Exists(track.StorageKey)) return [];
            await using var s = storage.OpenRead(track.StorageKey);
            using var reader = new StreamReader(s, Encoding.UTF8);
            return Captions.Parse(await reader.ReadToEndAsync(ct), FileTypePolicy.Extension(track.FileName));
        }
        catch (AppException ex)
        {
            log.LogWarning("Skipping unreadable caption {Id}: {Message}", track.Id, ex.Message);
            return [];
        }
    }

    private async Task Clear(Guid courseId, CancellationToken ct)
    {
        await db.Set<AiChunk>().Where(c => c.CourseId == courseId).ExecuteDeleteAsync(ct);
        await db.Set<AiIndexState>().Where(c => c.CourseId == courseId).ExecuteDeleteAsync(ct);
    }

    /// <summary>Live courses whose index is missing or older than their published version, plus indexes of courses no longer live.</summary>
    public async Task<List<Guid>> StaleCourses(CancellationToken ct)
    {
        var live = await db.Courses.AsNoTracking().Where(AccessService.IsLiveExpr).Where(c => c.PublishedVersion > 0)
            .Where(c => !db.Set<AiIndexState>().Any(s => s.CourseId == c.Id && s.SnapshotVersion == c.PublishedVersion))
            .Select(c => c.Id).Take(50).ToListAsync(ct);
        var gone = await db.Set<AiIndexState>().AsNoTracking()
            .Where(s => !db.Courses.Where(AccessService.IsLiveExpr).Any(c => c.Id == s.CourseId))
            .Select(s => s.CourseId).Take(50).ToListAsync(ct);
        return live.Concat(gone).Distinct().ToList();
    }
}

/// <summary>
/// Background maintenance: rebuilds AI indexes when a new snapshot is published (polls CourseSnapshots versions),
/// and enforces data retention (tutor conversations older than Ai:ConversationRetentionDays, expired practice sets).
/// </summary>
public class AiMaintenanceWorker(IServiceScopeFactory scopes, AiOptions opt, ILogger<AiMaintenanceWorker> log) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        if (!opt.BackgroundEnabled) return;
        var delay = TimeSpan.FromSeconds(Math.Max(5, opt.IndexPollSeconds));
        while (!stoppingToken.IsCancellationRequested)
        {
            try { await RunOnce(stoppingToken); }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested) { break; }
            catch (Exception ex) { log.LogWarning(ex, "AI maintenance pass failed"); }
            try { await Task.Delay(delay, stoppingToken); } catch (OperationCanceledException) { break; }
        }
    }

    public async Task RunOnce(CancellationToken ct)
    {
        using var scope = scopes.CreateScope();
        var indexer = scope.ServiceProvider.GetRequiredService<AiIndexer>();
        foreach (var id in await indexer.StaleCourses(ct))
            await indexer.EnsureIndexed(id, ct);
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        await PurgeExpired(db, opt, DateTime.UtcNow, ct);
    }

    public static async Task PurgeExpired(AppDbContext db, AiOptions opt, DateTime now, CancellationToken ct)
    {
        var cutoff = now.AddDays(-Math.Max(1, opt.ConversationRetentionDays));
        var old = db.Set<AiConversation>().Where(c => c.LastMessageAt < cutoff).Select(c => c.Id);
        await db.Set<AiMessage>().Where(m => old.Contains(m.ConversationId)).ExecuteDeleteAsync(ct);
        await db.Set<AiConversation>().Where(c => c.LastMessageAt < cutoff).ExecuteDeleteAsync(ct);
        await db.Set<AiPracticeSet>().Where(p => p.ExpiresAt < now).ExecuteDeleteAsync(ct);
    }
}
