using System.IO.Compression;
using System.Text;
using Mastemy.Api.Infrastructure;

namespace Mastemy.Api.Modules.Resources;

/// <summary>
/// Allow-list for resource uploads, enforced on BOTH the extension and the content's magic bytes. Video and audio are
/// refused outright (videos live on YouTube only, spec §3); archives are refused. Content type is always derived
/// server-side from the verified type, never from the client.
/// </summary>
public static class FileTypePolicy
{
    public static readonly IReadOnlyDictionary<string, string> Allowed = new Dictionary<string, string>
    {
        ["pdf"] = "application/pdf",
        ["docx"] = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ["pptx"] = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        ["xlsx"] = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ["csv"] = "text/csv",
        ["txt"] = "text/plain",
        ["md"] = "text/markdown",
        ["png"] = "image/png",
        ["jpg"] = "image/jpeg",
        ["jpeg"] = "image/jpeg",
        ["webp"] = "image/webp",
        ["vtt"] = "text/vtt",
        ["srt"] = "application/x-subrip",
    };

    public static readonly HashSet<string> CaptionExtensions = ["vtt", "srt"];
    private static readonly HashSet<string> TextExtensions = ["csv", "txt", "md", "vtt", "srt"];

    public static readonly HashSet<string> VideoAudioExtensions =
    [
        "mp4", "m4v", "mov", "qt", "mkv", "webm", "avi", "wmv", "flv", "f4v", "mpg", "mpeg", "mpe", "m2v", "m2ts", "mts", "ts",
        "3gp", "3g2", "ogv", "vob", "rm", "rmvb", "asf", "divx", "mxf",
        "mp3", "wav", "m4a", "aac", "flac", "ogg", "oga", "opus", "wma", "aiff", "aif", "amr", "mka", "weba",
    ];

    public static readonly HashSet<string> ArchiveExtensions = ["zip", "rar", "7z", "tar", "gz", "tgz", "bz2", "xz", "zst", "cab", "iso", "jar"];

    public static AppException VideoNotAllowed() => new(415,
        "Video and audio files cannot be uploaded to Mastemy. Lesson videos must be hosted on YouTube and linked to the lesson.",
        "video_not_allowed");

    public static string Extension(string fileName)
    {
        var i = fileName.LastIndexOf('.');
        return i < 0 || i == fileName.Length - 1 ? "" : fileName[(i + 1)..].ToLowerInvariant();
    }

    /// <summary>Checks the claimed extension before any bytes are read (cheap early refusal).</summary>
    public static string CheckExtension(string fileName)
    {
        var ext = Extension(fileName);
        if (VideoAudioExtensions.Contains(ext)) throw VideoNotAllowed();
        if (ArchiveExtensions.Contains(ext)) throw new AppException(415, "Archives are not accepted. Upload the individual files instead.", "archive_not_allowed");
        if (!Allowed.ContainsKey(ext))
            throw new AppException(415, $"File type '.{ext}' is not allowed. Allowed: {string.Join(", ", Allowed.Keys)}.", "file_type_not_allowed");
        return ext;
    }

    /// <summary>True when the header looks like any common audio/video container or stream.</summary>
    public static bool LooksLikeVideoOrAudio(byte[] h)
    {
        bool At(int off, string ascii) => h.Length >= off + ascii.Length && Encoding.ASCII.GetString(h, off, ascii.Length) == ascii;
        var boxSize = h.Length >= 4 && h[0] == 0 && h[1] == 0; // ISO-BMFF/QuickTime boxes start with a small big-endian size
        if (At(4, "ftyp")) return true;                                           // MP4/MOV/M4V/M4A/3GP/HEIF-video
        if (h.Length >= 4 && h[0] == 0x1A && h[1] == 0x45 && h[2] == 0xDF && h[3] == 0xA3) return true; // Matroska/WebM
        if (At(0, "RIFF") && (At(8, "AVI ") || At(8, "WAVE") || At(8, "CDXA"))) return true;
        if (At(0, "OggS") || At(0, "fLaC") || (At(0, "FLV") && h.Length > 3 && h[3] == 1) || (At(0, "ID3") && h.Length > 3 && h[3] is >= 2 and <= 4) || At(0, ".RMF") || At(0, "#!AMR") || At(0, "FORM")) return true;
        if (boxSize && (At(4, "moov") || At(4, "mdat") || At(4, "wide") || At(4, "free") || At(4, "skip"))) return true; // bare QuickTime atoms
        if (h.Length >= 4 && h[0] == 0 && h[1] == 0 && h[2] == 1 && (h[3] == 0xBA || h[3] == 0xB3)) return true; // MPEG-PS / MPEG-1/2 video
        if (h.Length >= 4 && h[0] == 0x30 && h[1] == 0x26 && h[2] == 0xB2 && h[3] == 0x75) return true; // ASF/WMV/WMA
        if (h.Length >= 2 && h[0] == 0xFF && (h[1] & 0xF6) == 0xF0) return true;                       // AAC ADTS
        if (h.Length >= 2 && h[0] == 0xFF && (h[1] & 0xE0) == 0xE0 && (h[1] & 0x06) != 0) return true;  // MPEG audio frame (MP3)
        if (h.Length >= 377 && h[0] == 0x47 && h[188] == 0x47 && h[376] == 0x47) return true;          // MPEG-TS
        return false;
    }

    /// <summary>
    /// Verifies the staged content really is the type its extension claims. Video/audio content is refused with
    /// video_not_allowed even when disguised under an allowed extension.
    /// </summary>
    public static void VerifyContent(string ext, StagedFile f)
    {
        var h = f.Header;
        if (f.Size == 0) throw Bad("The file is empty.");
        if (LooksLikeVideoOrAudio(h)) throw VideoNotAllowed();
        bool Starts(params byte[] sig) => h.Length >= sig.Length && h.AsSpan(0, sig.Length).SequenceEqual(sig);
        switch (ext)
        {
            case "pdf":
                if (!Starts("%PDF-"u8.ToArray())) throw Mismatch(ext);
                break;
            case "png":
                if (!Starts(0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A)) throw Mismatch(ext);
                break;
            case "jpg" or "jpeg":
                if (!Starts(0xFF, 0xD8, 0xFF)) throw Mismatch(ext);
                break;
            case "webp":
                if (!(Starts("RIFF"u8.ToArray()) && h.Length >= 12 && h.AsSpan(8, 4).SequenceEqual("WEBP"u8))) throw Mismatch(ext);
                break;
            case "docx" or "pptx" or "xlsx":
                if (!Starts(0x50, 0x4B, 0x03, 0x04)) throw Mismatch(ext);
                VerifyOoxml(ext, f.TempPath);
                break;
            default:
                if (!TextExtensions.Contains(ext)) throw Mismatch(ext);
                VerifyUtf8Text(f.TempPath);
                break;
        }
    }

    private static void VerifyOoxml(string ext, string path)
    {
        var part = ext switch { "docx" => "word/", "pptx" => "ppt/", _ => "xl/" };
        try
        {
            using var zip = ZipFile.OpenRead(path);
            if (zip.Entries.Count > 10_000) throw Mismatch(ext);
            var hasTypes = false; var hasPart = false;
            foreach (var e in zip.Entries)
            {
                if (e.FullName == "[Content_Types].xml") hasTypes = true;
                if (e.FullName.StartsWith(part, StringComparison.Ordinal)) hasPart = true;
                var name = Extension(e.Name);
                if (VideoAudioExtensions.Contains(name)) throw new AppException(415,
                    "Office documents with embedded video or audio are not accepted. Link videos from YouTube instead.", "video_not_allowed");
            }
            if (!hasTypes || !hasPart) throw Mismatch(ext);
        }
        catch (InvalidDataException) { throw Mismatch(ext); }
    }

    private static void VerifyUtf8Text(string path)
    {
        var utf8 = new UTF8Encoding(false, throwOnInvalidBytes: true);
        using var reader = new StreamReader(path, utf8, detectEncodingFromByteOrderMarks: false);
        var buf = new char[8192];
        try
        {
            int n;
            while ((n = reader.Read(buf, 0, buf.Length)) > 0)
                for (var i = 0; i < n; i++)
                    if (buf[i] == '\0' || (char.IsControl(buf[i]) && buf[i] is not ('\n' or '\r' or '\t' or '\f')))
                        throw Bad("Text files must be plain UTF-8 text without control characters.", "file_content_mismatch");
        }
        catch (DecoderFallbackException) { throw Bad("Text files must be UTF-8 encoded.", "file_content_mismatch"); }
    }

    private static AppException Mismatch(string ext) =>
        new(415, $"The file content does not match its '.{ext}' extension.", "file_content_mismatch");

    private static AppException Bad(string msg, string code = "bad_request") => AppException.Bad(msg, code);

    /// <summary>
    /// Reduces a client file name to a safe display name: last path segment only, no control/reserved characters,
    /// no leading dots, bounded length. It is metadata only and never used to build a filesystem path.
    /// </summary>
    public static string SanitizeFileName(string? raw)
    {
        var name = (raw ?? "").Replace('\\', '/');
        name = name[(name.LastIndexOf('/') + 1)..];
        var sb = new StringBuilder(name.Length);
        foreach (var ch in name.Normalize(NormalizationForm.FormC))
        {
            if (char.IsControl(ch) || ch is '<' or '>' or ':' or '"' or '|' or '?' or '*' or ';' || char.GetUnicodeCategory(ch) == System.Globalization.UnicodeCategory.Format)
                sb.Append('_');
            else sb.Append(ch);
        }
        name = sb.ToString().Trim().TrimStart('.').Trim();
        while (name.Contains("..")) name = name.Replace("..", ".");
        if (name.Length > 200)
        {
            var ext = Extension(name);
            name = name[..(200 - ext.Length - 1)] + "." + ext;
        }
        return name.Length == 0 || name.StartsWith('.') ? "file" : name;
    }
}
