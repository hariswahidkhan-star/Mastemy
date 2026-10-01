using Mastemy.Api.Domain;

namespace Mastemy.Api.Modules.YouTube;

public record VideoEvaluation(VideoStatus Status, string? Reason, bool WrongChannel);

/// <summary>
/// Pure rules turning observed YouTube metadata into a lesson-video status (spec §10.5).
/// A video is Ready only when it exists, belongs to the selected channel, is processed, public/unlisted,
/// embeddable and not age-restricted.
/// </summary>
public static class VideoEvaluator
{
    public const string PrivateReason = "private videos cannot be played by learners";
    public const string NotEmbeddableReason = "Embedding is disabled for this video; it cannot be played inside Mastemy.";
    public const string NotFoundReason = "Video not found on YouTube (removed, deleted or never existed).";

    public static VideoEvaluation Evaluate(VideoMetadata? md, string expectedChannelId)
    {
        if (md is null) return new(VideoStatus.Failed, NotFoundReason, false);
        if (!string.Equals(md.ChannelId, expectedChannelId, StringComparison.Ordinal))
            return new(VideoStatus.Restricted, $"Video belongs to channel {md.ChannelId}, not the selected channel {expectedChannelId}.", true);

        switch (md.UploadStatus)
        {
            case "failed":
                return new(VideoStatus.Failed, $"YouTube processing failed{Suffix(md.FailureReason)}.", false);
            case "rejected":
                return new(VideoStatus.Failed, $"YouTube rejected the video{Suffix(md.RejectionReason)}.", false);
            case "deleted":
                return new(VideoStatus.Failed, "The video was deleted on YouTube.", false);
            case "uploaded":
                return new(VideoStatus.Processing, "YouTube is still processing this video.", false);
            case "processed":
                break;
            default:
                return new(VideoStatus.Processing, $"Unknown YouTube upload status '{md.UploadStatus ?? "none"}'.", false);
        }

        if (md.PrivacyStatus == "private") return new(VideoStatus.Restricted, PrivateReason, false);
        if (md.PrivacyStatus is not ("public" or "unlisted"))
            return new(VideoStatus.Restricted, $"Unsupported privacy status '{md.PrivacyStatus ?? "unknown"}'.", false);
        if (md.Embeddable != true) return new(VideoStatus.Restricted, NotEmbeddableReason, false);
        if (md.AgeRestricted) return new(VideoStatus.Restricted, "Age-restricted videos cannot be played in embedded players.", false);

        string? note = null;
        if (md.RegionAllowed.Count > 0) note = $"Region restriction: only available in {string.Join(", ", md.RegionAllowed.Take(20))}.";
        else if (md.RegionBlocked.Count > 0) note = $"Region restriction: blocked in {string.Join(", ", md.RegionBlocked.Take(20))}.";
        return new(VideoStatus.Ready, note, false);
    }

    private static string Suffix(string? r) => string.IsNullOrWhiteSpace(r) ? "" : $" ({r})";
}
