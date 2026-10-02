using System.Buffers.Binary;
using System.Diagnostics.Metrics;
using System.Net.Sockets;
using System.Text;
using Mastemy.Api.Infrastructure;

namespace Mastemy.Api.Modules.Trust;

public enum ScanMode { Optional, Required }
public enum ScanVerdict { Clean, Infected, NotScanned }

public class ScanningOptions
{
    /// <summary>Required: uploads fail with 503 when no scanner answers. Optional: uploads proceed unscanned (recorded as NotScanned).
    /// Defaults to Required when a ClamAV host is configured and Optional otherwise.</summary>
    public ScanMode? Mode { get; set; }
    public string ClamAvHost { get; set; } = "";
    public int ClamAvPort { get; set; } = 3310;
    public int TimeoutSeconds { get; set; } = 30;
    /// <summary>Must not exceed clamd's StreamMaxLength; larger chunks are split.</summary>
    public int ChunkBytes { get; set; } = 64 * 1024;

    public ScanMode EffectiveMode => Mode ?? (string.IsNullOrWhiteSpace(ClamAvHost) ? ScanMode.Optional : ScanMode.Required);
}

public sealed record ScanResult(ScanVerdict Verdict, string Engine, string? Signature);

/// <summary>Thrown when the scanner cannot be reached or returns an error (not a verdict).</summary>
public sealed class ScannerUnavailableException(string message, Exception? inner = null) : Exception(message, inner);

public interface IMalwareScanner
{
    /// <summary>False for the null scanner (no engine configured).</summary>
    bool Enabled { get; }
    string Engine { get; }
    Task<ScanResult> ScanAsync(Stream content, CancellationToken ct);
    /// <summary>Cheap liveness probe (clamd PING). Throws <see cref="ScannerUnavailableException"/>.</summary>
    Task PingAsync(CancellationToken ct);
}

public sealed class NullScanner : IMalwareScanner
{
    public bool Enabled => false;
    public string Engine => "none";
    public Task<ScanResult> ScanAsync(Stream content, CancellationToken ct) => Task.FromResult(new ScanResult(ScanVerdict.NotScanned, Engine, null));
    public Task PingAsync(CancellationToken ct) => throw new ScannerUnavailableException("No malware scanner is configured.");
}

/// <summary>clamd client using the INSTREAM protocol over TCP (zero-terminated commands, 4-byte big-endian chunk lengths).</summary>
public sealed class ClamAvScanner(ScanningOptions opt) : IMalwareScanner
{
    public bool Enabled => true;
    public string Engine => "clamav";

    private async Task<(TcpClient Client, NetworkStream Stream)> Connect(CancellationToken ct)
    {
        var client = new TcpClient();
        try
        {
            using var cts = CancellationTokenSource.CreateLinkedTokenSource(ct);
            cts.CancelAfter(TimeSpan.FromSeconds(Math.Max(1, opt.TimeoutSeconds)));
            await client.ConnectAsync(opt.ClamAvHost, opt.ClamAvPort, cts.Token);
            var s = client.GetStream();
            s.ReadTimeout = s.WriteTimeout = Math.Max(1, opt.TimeoutSeconds) * 1000;
            return (client, s);
        }
        catch (Exception e) when (e is SocketException or OperationCanceledException or IOException && !ct.IsCancellationRequested)
        {
            client.Dispose();
            throw new ScannerUnavailableException($"ClamAV at {opt.ClamAvHost}:{opt.ClamAvPort} is unreachable.", e);
        }
    }

    private async Task<string> ReadReply(NetworkStream s, CancellationToken ct)
    {
        using var cts = CancellationTokenSource.CreateLinkedTokenSource(ct);
        cts.CancelAfter(TimeSpan.FromSeconds(Math.Max(1, opt.TimeoutSeconds)));
        var buf = new MemoryStream();
        var one = new byte[512];
        while (buf.Length < 8192)
        {
            var n = await s.ReadAsync(one, cts.Token);
            if (n == 0) break;
            var zero = Array.IndexOf(one, (byte)0, 0, n);
            if (zero >= 0) { buf.Write(one, 0, zero); break; }
            buf.Write(one, 0, n);
        }
        return Encoding.ASCII.GetString(buf.ToArray()).Trim();
    }

    public async Task<ScanResult> ScanAsync(Stream content, CancellationToken ct)
    {
        var (client, s) = await Connect(ct);
        using var _ = client;
        string reply;
        try
        {
            await s.WriteAsync("zINSTREAM\0"u8.ToArray(), ct);
            var buf = new byte[Math.Clamp(opt.ChunkBytes, 1024, 1024 * 1024)];
            var len = new byte[4];
            int n;
            while ((n = await content.ReadAsync(buf, ct)) > 0)
            {
                BinaryPrimitives.WriteUInt32BigEndian(len, (uint)n);
                await s.WriteAsync(len, ct);
                await s.WriteAsync(buf.AsMemory(0, n), ct);
            }
            BinaryPrimitives.WriteUInt32BigEndian(len, 0);
            await s.WriteAsync(len, ct);
            await s.FlushAsync(ct);
            reply = await ReadReply(s, ct);
        }
        catch (Exception e) when (e is IOException or SocketException or OperationCanceledException && !ct.IsCancellationRequested)
        {
            throw new ScannerUnavailableException("ClamAV connection failed during scan.", e);
        }
        return Parse(reply, Engine);
    }

    /// <summary>"stream: OK" → clean; "stream: &lt;name&gt; FOUND" → infected; anything else (e.g. "... ERROR") → unavailable.</summary>
    public static ScanResult Parse(string reply, string engine = "clamav")
    {
        var body = reply.StartsWith("stream:", StringComparison.Ordinal) ? reply["stream:".Length..].Trim() : reply.Trim();
        if (body == "OK") return new ScanResult(ScanVerdict.Clean, engine, null);
        if (body.EndsWith(" FOUND", StringComparison.Ordinal))
        {
            var sig = body[..^" FOUND".Length].Trim();
            return new ScanResult(ScanVerdict.Infected, engine, sig.Length > 200 ? sig[..200] : sig);
        }
        throw new ScannerUnavailableException($"ClamAV returned an error: {(body.Length > 200 ? body[..200] : body)}");
    }

    public async Task PingAsync(CancellationToken ct)
    {
        var (client, s) = await Connect(ct);
        using var _ = client;
        try
        {
            await s.WriteAsync("zPING\0"u8.ToArray(), ct);
            var reply = await ReadReply(s, ct);
            if (reply != "PONG") throw new ScannerUnavailableException($"Unexpected ClamAV PING reply '{reply}'.");
        }
        catch (Exception e) when (e is IOException or SocketException or OperationCanceledException && !ct.IsCancellationRequested)
        {
            throw new ScannerUnavailableException("ClamAV did not answer PING.", e);
        }
    }
}

/// <summary>
/// Applies Scanning:Mode to an upload: infected → 422 malware_detected; scanner missing/unreachable → 503 scanning_unavailable
/// when Required, NotScanned when Optional. Callers discard the staged file when this throws.
/// </summary>
public sealed class MalwareScanPolicy(IMalwareScanner scanner, ScanningOptions opt, ILogger<MalwareScanPolicy> log)
{
    private static readonly Meter Meter = new("Mastemy");
    private static readonly Counter<long> Scans = Meter.CreateCounter<long>("mastemy.malware_scans", description: "Upload scans by verdict");

    public ScanMode Mode => opt.EffectiveMode;

    public async Task<ScanResult> EnforceAsync(string path, CancellationToken ct)
    {
        ScanResult result;
        if (!scanner.Enabled)
        {
            if (Mode == ScanMode.Required)
            {
                Scans.Add(1, new KeyValuePair<string, object?>("verdict", "unavailable"));
                throw new AppException(503, "Malware scanning is required but no scanner is configured.", "scanning_unavailable");
            }
            result = new ScanResult(ScanVerdict.NotScanned, scanner.Engine, null);
        }
        else
        {
            try
            {
                await using var fs = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read, 81920, useAsync: true);
                result = await scanner.ScanAsync(fs, ct);
            }
            catch (ScannerUnavailableException e)
            {
                Scans.Add(1, new KeyValuePair<string, object?>("verdict", "unavailable"));
                if (Mode == ScanMode.Required)
                {
                    log.LogError(e, "Malware scanner unavailable; upload refused (Scanning:Mode=Required).");
                    throw new AppException(503, "The malware scanner is unavailable. Try again later.", "scanning_unavailable");
                }
                log.LogWarning(e, "Malware scanner unavailable; upload accepted unscanned (Scanning:Mode=Optional).");
                result = new ScanResult(ScanVerdict.NotScanned, scanner.Engine, null);
            }
        }
        Scans.Add(1, new KeyValuePair<string, object?>("verdict", result.Verdict.ToString()));
        if (result.Verdict == ScanVerdict.Infected)
        {
            log.LogWarning("Upload rejected: malware signature {Signature} detected by {Engine}.", result.Signature, result.Engine);
            throw new AppException(422, "The file was rejected because malware was detected.", "malware_detected");
        }
        return result;
    }
}
