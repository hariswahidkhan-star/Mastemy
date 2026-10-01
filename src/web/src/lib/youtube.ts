/** Minimal typings for the official YouTube IFrame Player API. */
export interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  getPlayerState(): number;
  destroy(): void;
}
export interface YTPlayerEvent {
  target: YTPlayer;
  data: number;
}
interface YTNamespace {
  Player: new (
    el: HTMLElement | string,
    opts: {
      host?: string;
      videoId: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (e: YTPlayerEvent) => void;
        onStateChange?: (e: YTPlayerEvent) => void;
        onError?: (e: YTPlayerEvent) => void;
      };
    },
  ) => YTPlayer;
  PlayerState: { ENDED: 0; PLAYING: 1; PAUSED: 2; BUFFERING: 3; CUED: 5 };
}
declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export const YT_STATE = { ENDED: 0, PLAYING: 1, PAUSED: 2 } as const;

let loader: Promise<YTNamespace> | null = null;

/** Loads https://www.youtube.com/iframe_api exactly once and resolves with the YT namespace. */
export function loadYouTubeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (loader) return loader;
  loader = new Promise<YTNamespace>((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      if (window.YT) resolve(window.YT);
    };
    const existing = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    if (!existing) {
      const s = document.createElement('script');
      s.src = 'https://www.youtube.com/iframe_api';
      s.async = true;
      s.onerror = () => {
        loader = null;
        reject(new Error('youtube_api_load_failed'));
      };
      document.head.appendChild(s);
    }
  });
  return loader;
}

/** Player error codes documented by the IFrame API mapped to i18n keys. */
export function playerErrorKey(code: number): string {
  switch (code) {
    case 2:
      return 'player.error2';
    case 5:
      return 'player.error5';
    case 100:
      return 'player.error100';
    case 101:
    case 150:
      return 'player.error150';
    case 153:
      return 'player.error153';
    default:
      return 'player.errorUnknown';
  }
}

export function youtubeWatchUrl(videoId: string, startSeconds?: number): string {
  const t = startSeconds && startSeconds > 0 ? `&t=${Math.floor(startSeconds)}s` : '';
  return `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}${t}`;
}
