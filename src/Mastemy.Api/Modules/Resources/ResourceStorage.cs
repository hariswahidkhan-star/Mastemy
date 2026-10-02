using System.Security.Cryptography;
using System.Text.RegularExpressions;
using Mastemy.Api.Infrastructure;

namespace Mastemy.Api.Modules.Resources;

public class ResourceOptions
{
    /// <summary>Directory holding resource blobs; relative paths resolve against the content root.</summary>
    public string RootPath { get; set; } = "data/resources";
    public long MaxFileBytes { get; set; } = 25L * 1024 * 1024;
    public long PerCourseQuotaBytes { get; set; } = 500L * 1024 * 1024;
}

/// <summary>An uploaded body written to a private temporary file, hashed while streaming. Never addressable by users.</summary>
public sealed class StagedFile(string tempPath, string sha256, long size, byte[] header) : IAsyncDisposable
{
    public string TempPath { get; } = tempPath;
    public string Sha256 { get; } = sha256;
    public long Size { get; } = size;
    /// <summary>First bytes of the content (up to 4 KiB) for magic-number checks.</summary>
    public byte[] Header { get; } = header;
    internal bool Committed { get; set; }

    public ValueTask DisposeAsync()
    {
        if (!Committed) { try { File.Delete(TempPath); } catch (IOException) { } }
        return ValueTask.CompletedTask;
    }
}

/// <summary>
/// Content-addressed blob store for non-video resource files. Keys are lowercase SHA-256 hex digests and are the
/// only thing that ever reaches the filesystem layer, so user-supplied file names can never influence a path.
/// </summary>
public interface IResourceStorage
{
    /// <summary>Streams <paramref name="body"/> to a temp file, hashing it. Throws 413 once <paramref name="maxBytes"/> is exceeded.</summary>
    Task<StagedFile> StageAsync(Stream body, long maxBytes, CancellationToken ct);
    /// <summary>Moves a staged file into the store under its hash key (no-op if the blob already exists). Returns the key.</summary>
    Task<string> CommitAsync(StagedFile staged, CancellationToken ct);
    Stream OpenRead(string key);
    bool Exists(string key);
    Task DeleteAsync(string key, CancellationToken ct);
}

public partial class LocalDiskResourceStorage : IResourceStorage
{
    private readonly string root;
    private readonly string tmp;

    public LocalDiskResourceStorage(ResourceOptions opt, IWebHostEnvironment env)
    {
        root = Path.GetFullPath(Path.IsPathRooted(opt.RootPath) ? opt.RootPath : Path.Combine(env.ContentRootPath, opt.RootPath));
        tmp = Path.Combine(root, ".staging");
        Directory.CreateDirectory(tmp);
    }

    [GeneratedRegex("^[0-9a-f]{64}$")]
    private static partial Regex KeyPattern();

    private string PathFor(string key)
    {
        if (!KeyPattern().IsMatch(key)) throw new ArgumentException("Invalid storage key.", nameof(key));
        return Path.Combine(root, key[..2], key[2..4], key);
    }

    public async Task<StagedFile> StageAsync(Stream body, long maxBytes, CancellationToken ct)
    {
        var path = Path.Combine(tmp, Guid.NewGuid().ToString("N") + ".part");
        var header = new MemoryStream();
        long total = 0;
        using var hash = IncrementalHash.CreateHash(HashAlgorithmName.SHA256);
        try
        {
            await using (var fs = new FileStream(path, FileMode.CreateNew, FileAccess.Write, FileShare.None, 81920, useAsync: true))
            {
                var buf = new byte[81920];
                int n;
                while ((n = await body.ReadAsync(buf, ct)) > 0)
                {
                    total += n;
                    if (total > maxBytes)
                        throw new AppException(413, $"File exceeds the maximum size of {maxBytes} bytes.", "file_too_large");
                    if (header.Length < 4096) header.Write(buf, 0, (int)Math.Min(n, 4096 - header.Length));
                    hash.AppendData(buf, 0, n);
                    await fs.WriteAsync(buf.AsMemory(0, n), ct);
                }
            }
            return new StagedFile(path, Convert.ToHexString(hash.GetHashAndReset()).ToLowerInvariant(), total, header.ToArray());
        }
        catch
        {
            try { File.Delete(path); } catch (IOException) { }
            throw;
        }
    }

    public Task<string> CommitAsync(StagedFile staged, CancellationToken ct)
    {
        var dest = PathFor(staged.Sha256);
        Directory.CreateDirectory(Path.GetDirectoryName(dest)!);
        if (File.Exists(dest)) File.Delete(staged.TempPath);
        else
        {
            try { File.Move(staged.TempPath, dest); }
            catch (IOException) when (File.Exists(dest)) { File.Delete(staged.TempPath); } // concurrent identical upload
        }
        staged.Committed = true;
        return Task.FromResult(staged.Sha256);
    }

    public Stream OpenRead(string key) =>
        new FileStream(PathFor(key), FileMode.Open, FileAccess.Read, FileShare.Read, 81920, useAsync: true);

    public bool Exists(string key) => File.Exists(PathFor(key));

    public Task DeleteAsync(string key, CancellationToken ct)
    {
        var p = PathFor(key);
        if (File.Exists(p)) File.Delete(p);
        return Task.CompletedTask;
    }
}
