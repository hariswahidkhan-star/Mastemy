import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { loadYouTubeApi, playerErrorKey, youtubeWatchUrl, YT_STATE } from '../lib/youtube';
import type { YTPlayer } from '../lib/youtube';
import { useI18n } from '../i18n/I18nProvider';

export interface PlayerHandle {
  getCurrentTime: () => number;
  seekTo: (seconds: number) => void;
}

interface Props {
  videoId: string;
  title: string;
  startSeconds?: number;
  onPause?: (seconds: number) => void;
  onEnded?: (seconds: number) => void;
}

/**
 * Official YouTube IFrame Player (youtube-nocookie host). Nothing is drawn over the player;
 * all Mastemy controls live outside it. Errors show a helpful message and a link to YouTube.
 */
export const YouTubePlayer = forwardRef<PlayerHandle, Props>(function YouTubePlayer(
  { videoId, title, startSeconds, onPause, onEnded },
  ref,
) {
  const { t, lang } = useI18n();
  const mountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const callbacks = useRef({ onPause, onEnded });
  useEffect(() => {
    callbacks.current = { onPause, onEnded };
  });
  const startRef = useRef(startSeconds);

  useImperativeHandle(
    ref,
    () => ({
      getCurrentTime: () => {
        try {
          return playerRef.current?.getCurrentTime() ?? 0;
        } catch {
          return 0;
        }
      },
      seekTo: (s: number) => {
        try {
          playerRef.current?.seekTo(s, true);
          playerRef.current?.playVideo();
        } catch {
          /* player not ready */
        }
      },
    }),
    [],
  );

  useEffect(() => {
    let cancelled = false;
    setErrorCode(null);
    setLoadFailed(false);
    const host = mountRef.current;
    if (!host) return;
    // The API replaces the target element, so give it a fresh child each time.
    const target = document.createElement('div');
    host.replaceChildren(target);
    loadYouTubeApi()
      .then((YT) => {
        if (cancelled) return;
        playerRef.current = new YT.Player(target, {
          host: 'https://www.youtube-nocookie.com',
          videoId,
          playerVars: {
            rel: 0,
            playsinline: 1,
            hl: lang,
            cc_lang_pref: lang,
            origin: window.location.origin,
            start: Math.max(0, Math.floor(startRef.current ?? 0)),
          },
          events: {
            onError: (e) => setErrorCode(e.data),
            onStateChange: (e) => {
              const time = (() => {
                try {
                  return e.target.getCurrentTime();
                } catch {
                  return 0;
                }
              })();
              if (e.data === YT_STATE.PAUSED) callbacks.current.onPause?.(time);
              if (e.data === YT_STATE.ENDED) callbacks.current.onEnded?.(time);
            },
          },
        });
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true);
      });
    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy();
      } catch {
        /* already gone */
      }
      playerRef.current = null;
    };
  }, [videoId, lang]);

  if (errorCode !== null || loadFailed) {
    return (
      <div className="player-error" role="alert">
        <strong>{t('player.errorTitle')}</strong>
        <p style={{ margin: 0 }}>
          {loadFailed ? t('player.loadFailed') : t(playerErrorKey(errorCode ?? 0))}
        </p>
        <a
          className="btn btn--primary btn--md"
          href={youtubeWatchUrl(videoId)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('player.watchOnYouTube')}
        </a>
      </div>
    );
  }

  return (
    <div className="player-frame">
      <div ref={mountRef} title={title} aria-label={t('player.label', { title })} />
    </div>
  );
});
