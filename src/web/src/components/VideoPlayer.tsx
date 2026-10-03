import { forwardRef } from 'react';
import { YouTubePlayer, type PlayerHandle } from './YouTubePlayer';

interface Props {
  providerKey: string;
  assetId: string;
  title: string;
  startSeconds?: number;
  onPause?: (seconds: number) => void;
  onEnded?: (seconds: number) => void;
  className?: string;
}

/**
 * Provider-agnostic video player. Delegates to the appropriate player component
 * based on providerKey. Currently supports "youtube"; other providers show a placeholder.
 */
export const VideoPlayer = forwardRef<PlayerHandle, Props>(function VideoPlayer(
  { providerKey, assetId, title, startSeconds, onPause, onEnded, className },
  ref,
) {
  if (providerKey === 'youtube') {
    return (
      <div className={className}>
        <YouTubePlayer
          ref={ref}
          videoId={assetId}
          title={title}
          startSeconds={startSeconds}
          onPause={onPause}
          onEnded={onEnded}
        />
      </div>
    );
  }

  return (
    <div className={className} role="status">
      <p>
        Video provider <strong>{providerKey}</strong> is not yet supported.
      </p>
    </div>
  );
});
