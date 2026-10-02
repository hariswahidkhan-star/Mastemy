using System.Security.Cryptography;
using System.Text;

namespace Mastemy.Api.Modules.Identity;

/// <summary>RFC 6238 TOTP (HMAC-SHA1, 30-second steps, 6 digits) with RFC 4648 base32 secrets.</summary>
public static class Totp
{
    public const int StepSeconds = 30;
    public const int Digits = 6;
    public const int SecretBytes = 20; // 160-bit, as recommended by RFC 4226

    public static long StepAt(DateTimeOffset time) => time.ToUnixTimeSeconds() / StepSeconds;

    public static byte[] NewSecret() => RandomNumberGenerator.GetBytes(SecretBytes);

    /// <summary>RFC 4226 HOTP value for the given counter.</summary>
    public static string Code(byte[] secret, long step)
    {
        Span<byte> counter = stackalloc byte[8];
        for (var i = 7; i >= 0; i--) { counter[i] = (byte)(step & 0xff); step >>= 8; }
        Span<byte> hash = stackalloc byte[20];
        HMACSHA1.HashData(secret, counter, hash);
        var offset = hash[^1] & 0x0f;
        var binary = ((hash[offset] & 0x7f) << 24) | (hash[offset + 1] << 16) | (hash[offset + 2] << 8) | hash[offset + 3];
        return (binary % 1_000_000).ToString("D6");
    }

    /// <summary>Returns the matching time step within ±<paramref name="window"/> steps of <paramref name="now"/>, or null.
    /// Comparison is constant-time per candidate.</summary>
    public static long? Match(byte[] secret, string? code, DateTimeOffset now, int window = 1)
    {
        var c = (code ?? "").Replace(" ", "").Trim();
        if (c.Length != Digits || !c.All(char.IsAsciiDigit)) return null;
        var current = StepAt(now);
        long? found = null;
        for (var d = -window; d <= window; d++)
        {
            var step = current + d;
            if (CryptographicOperations.FixedTimeEquals(Encoding.ASCII.GetBytes(Code(secret, step)), Encoding.ASCII.GetBytes(c)))
                found ??= step;
        }
        return found;
    }

    private const string Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

    public static string ToBase32(byte[] data)
    {
        var sb = new StringBuilder((data.Length * 8 + 4) / 5);
        int buffer = 0, bits = 0;
        foreach (var b in data)
        {
            buffer = (buffer << 8) | b; bits += 8;
            while (bits >= 5) { sb.Append(Alphabet[(buffer >> (bits - 5)) & 31]); bits -= 5; }
        }
        if (bits > 0) sb.Append(Alphabet[(buffer << (5 - bits)) & 31]);
        return sb.ToString();
    }

    public static byte[] FromBase32(string s)
    {
        var clean = s.Trim().TrimEnd('=').Replace(" ", "").ToUpperInvariant();
        var output = new List<byte>(clean.Length * 5 / 8);
        int buffer = 0, bits = 0;
        foreach (var ch in clean)
        {
            var v = Alphabet.IndexOf(ch);
            if (v < 0) throw new FormatException("Invalid base32 character.");
            buffer = (buffer << 5) | v; bits += 5;
            if (bits >= 8) { output.Add((byte)((buffer >> (bits - 8)) & 0xff)); bits -= 8; }
        }
        return output.ToArray();
    }
}
