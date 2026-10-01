using Mastemy.Api.Modules.YouTube;

namespace Mastemy.Tests.YouTube;

public class YouTubeUrlParserTests
{
    private const string Id = "dQw4w9WgXcQ";

    [Theory]
    [InlineData("dQw4w9WgXcQ")]
    [InlineData("  dQw4w9WgXcQ  ")]
    [InlineData("https://www.youtube.com/watch?v=dQw4w9WgXcQ")]
    [InlineData("http://www.youtube.com/watch?v=dQw4w9WgXcQ")]
    [InlineData("https://youtube.com/watch?v=dQw4w9WgXcQ")]
    [InlineData("youtube.com/watch?v=dQw4w9WgXcQ")]
    [InlineData("www.youtube.com/watch?v=dQw4w9WgXcQ")]
    [InlineData("https://WWW.YouTube.com/watch?v=dQw4w9WgXcQ")]
    [InlineData("https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=42s")]
    [InlineData("https://www.youtube.com/watch?feature=share&v=dQw4w9WgXcQ")]
    [InlineData("https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLabcdefghijklmnop")]
    [InlineData("https://www.youtube.com/watch?v=dQw4w9WgXcQ#comments")]
    [InlineData("https://m.youtube.com/watch?v=dQw4w9WgXcQ")]
    [InlineData("https://youtu.be/dQw4w9WgXcQ")]
    [InlineData("https://youtu.be/dQw4w9WgXcQ?t=10")]
    [InlineData("https://youtu.be/dQw4w9WgXcQ?si=abcdef")]
    [InlineData("youtu.be/dQw4w9WgXcQ")]
    [InlineData("https://www.youtube.com/shorts/dQw4w9WgXcQ")]
    [InlineData("https://youtube.com/shorts/dQw4w9WgXcQ?feature=share")]
    [InlineData("https://www.youtube.com/shorts/dQw4w9WgXcQ/")]
    [InlineData("https://www.youtube.com/embed/dQw4w9WgXcQ")]
    [InlineData("https://www.youtube.com/embed/dQw4w9WgXcQ?start=5")]
    [InlineData("https://www.youtube.com/live/dQw4w9WgXcQ")]
    [InlineData("https://m.youtube.com/shorts/dQw4w9WgXcQ")]
    [InlineData("https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ")]
    [InlineData("https://youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0")]
    public void Accepts_supported_forms(string input)
    {
        Assert.True(YouTubeUrlParser.TryParseVideoId(input, out var id));
        Assert.Equal(Id, id);
    }

    [Theory]
    [InlineData("a-b_c1D2e3F")]
    [InlineData("___________")]
    [InlineData("-----------")]
    public void Accepts_ids_with_dash_and_underscore(string id)
    {
        Assert.True(YouTubeUrlParser.TryParseVideoId(id, out var parsed));
        Assert.Equal(id, parsed);
        Assert.True(YouTubeUrlParser.TryParseVideoId($"https://youtu.be/{id}", out parsed));
        Assert.Equal(id, parsed);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    [InlineData("dQw4w9WgXc")] // 10 chars
    [InlineData("dQw4w9WgXcQQ")] // 12 chars
    [InlineData("dQw4w9WgXc!")]
    [InlineData("dQw4w9 WgXcQ")]
    [InlineData("https://www.youtube.com/watch?v=dQw4w9WgXc")]
    [InlineData("https://www.youtube.com/watch?v=dQw4w9WgXcQQ")]
    [InlineData("https://www.youtube.com/watch")]
    [InlineData("https://www.youtube.com/watch?v=")]
    [InlineData("https://www.youtube.com/watch?v=dQw4w9WgXcQ&v=aaaaaaaaaaa")]
    [InlineData("https://www.youtube.com/")]
    [InlineData("https://www.youtube.com/dQw4w9WgXcQ")]
    [InlineData("https://www.youtube.com/channel/UCabcdefghijklmnopqrstuv")]
    [InlineData("https://www.youtube.com/@someone")]
    [InlineData("https://www.youtube.com/playlist?list=PLabcdefghijklmnop")]
    [InlineData("https://www.youtube.com/shorts/dQw4w9WgXcQ/extra")]
    [InlineData("https://www.youtube.com/embed/")]
    [InlineData("https://www.youtube.com/v/dQw4w9WgXcQ")]
    [InlineData("https://youtu.be/")]
    [InlineData("https://youtu.be/dQw4w9WgXcQ/extra")]
    [InlineData("https://youtu.be/watch?v=dQw4w9WgXcQ")]
    [InlineData("https://www.youtube-nocookie.com/watch?v=dQw4w9WgXcQ")]
    [InlineData("https://www.youtube-nocookie.com/shorts/dQw4w9WgXcQ")]
    // lookalike / hostile hosts
    [InlineData("https://youtube.com.evil.example/watch?v=dQw4w9WgXcQ")]
    [InlineData("https://evil.example/youtube.com/watch?v=dQw4w9WgXcQ")]
    [InlineData("https://notyoutube.com/watch?v=dQw4w9WgXcQ")]
    [InlineData("https://youtube.co/watch?v=dQw4w9WgXcQ")]
    [InlineData("https://www.youtube.co.evil/watch?v=dQw4w9WgXcQ")]
    [InlineData("https://youtu.be.evil.example/dQw4w9WgXcQ")]
    [InlineData("https://fakeyoutu.be/dQw4w9WgXcQ")]
    [InlineData("https://www.y0utube.com/watch?v=dQw4w9WgXcQ")]
    [InlineData("https://xn--youtube-ss1b.com/watch?v=dQw4w9WgXcQ")]
    [InlineData("https://www.youtube.com@evil.example/watch?v=dQw4w9WgXcQ")]
    [InlineData("https://user:pass@www.youtube.com/watch?v=dQw4w9WgXcQ")]
    [InlineData("https://www.youtube.com:8443/watch?v=dQw4w9WgXcQ")]
    [InlineData("https://www.youtube.com\\@evil.example/watch?v=dQw4w9WgXcQ")]
    [InlineData("https://music.youtube.com/watch?v=dQw4w9WgXcQ")]
    [InlineData("https://gaming.youtube.com/watch?v=dQw4w9WgXcQ")]
    // bad schemes
    [InlineData("ftp://www.youtube.com/watch?v=dQw4w9WgXcQ")]
    [InlineData("javascript://www.youtube.com/watch?v=dQw4w9WgXcQ")]
    [InlineData("file:///www.youtube.com/watch?v=dQw4w9WgXcQ")]
    [InlineData("data:text/html,dQw4w9WgXcQ")]
    [InlineData("https://vimeo.com/123456789")]
    [InlineData("not a url at all")]
    public void Rejects_everything_else(string? input)
    {
        Assert.False(YouTubeUrlParser.TryParseVideoId(input, out var id));
        Assert.Equal("", id);
    }

    [Fact]
    public void Rejects_overlong_input() =>
        Assert.False(YouTubeUrlParser.TryParseVideoId("https://www.youtube.com/watch?v=dQw4w9WgXcQ&x=" + new string('a', 3000), out _));

    [Theory]
    [InlineData("PLabcdefghijklmnop", "PLabcdefghijklmnop")]
    [InlineData("PL9tY0BWXOZFuFEG_GtOBZ8-8wbkH-NVAr", "PL9tY0BWXOZFuFEG_GtOBZ8-8wbkH-NVAr")]
    [InlineData("https://www.youtube.com/playlist?list=PLabcdefghijklmnop", "PLabcdefghijklmnop")]
    [InlineData("youtube.com/playlist?list=PLabcdefghijklmnop", "PLabcdefghijklmnop")]
    [InlineData("https://m.youtube.com/playlist?list=PLabcdefghijklmnop", "PLabcdefghijklmnop")]
    [InlineData("https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLabcdefghijklmnop&index=2", "PLabcdefghijklmnop")]
    [InlineData("https://youtu.be/dQw4w9WgXcQ?list=PLabcdefghijklmnop", "PLabcdefghijklmnop")]
    [InlineData("https://www.youtube.com/embed/videoseries?list=PLabcdefghijklmnop", "PLabcdefghijklmnop")]
    [InlineData("https://www.youtube-nocookie.com/embed/videoseries?list=PLabcdefghijklmnop", "PLabcdefghijklmnop")]
    [InlineData("https://www.youtube.com/playlist?list=UUabcdefghijklmnopqrstuv", "UUabcdefghijklmnopqrstuv")]
    [InlineData("https://www.youtube.com/playlist?list=OLAK5uy_abcdefghijklmnop", "OLAK5uy_abcdefghijklmnop")]
    public void Parses_playlists(string input, string expected)
    {
        Assert.True(YouTubeUrlParser.TryParsePlaylistId(input, out var id));
        Assert.Equal(expected, id);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("dQw4w9WgXcQ")]
    [InlineData("PLshort")]
    [InlineData("XXabcdefghijklmnop")]
    [InlineData("PLabc$efghijklmnop")]
    [InlineData("https://www.youtube.com/playlist")]
    [InlineData("https://www.youtube.com/playlist?list=")]
    [InlineData("https://www.youtube.com/watch?v=dQw4w9WgXcQ")]
    [InlineData("https://www.youtube.com/channel/UCabcdefghijklmnopqrstuv?list=PLabcdefghijklmnop")]
    [InlineData("https://youtube.com.evil.example/playlist?list=PLabcdefghijklmnop")]
    [InlineData("https://evil.example/playlist?list=PLabcdefghijklmnop")]
    [InlineData("https://user@www.youtube.com/playlist?list=PLabcdefghijklmnop")]
    [InlineData("https://www.youtube.com:444/playlist?list=PLabcdefghijklmnop")]
    [InlineData("ftp://www.youtube.com/playlist?list=PLabcdefghijklmnop")]
    [InlineData("https://www.youtube.com/playlist?list=PLabcdefghijklmnop&list=PLzzzzzzzzzzzzzz")]
    public void Rejects_bad_playlists(string? input) => Assert.False(YouTubeUrlParser.TryParsePlaylistId(input, out _));

    [Theory]
    [InlineData("PT1H2M3S", 3723)]
    [InlineData("PT4M13S", 253)]
    [InlineData("PT45S", 45)]
    [InlineData("P1DT1S", 86401)]
    [InlineData("P0D", 0)]
    [InlineData("garbage", 0)]
    [InlineData(null, 0)]
    public void Parses_iso_durations(string? iso, int seconds) => Assert.Equal(seconds, YouTubeMetadataClient.ParseIsoDuration(iso));
}
