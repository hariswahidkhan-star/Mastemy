import { useCallback, useEffect, useRef, useState } from 'react';
import type { JsRunRequest, JsRunResult } from './types';

/**
 * Owns the JavaScript Web Worker for a lab panel: creates it once, tears it down on unmount, and exposes a
 * `run` that resolves with the next result message. Mirrors the useLab hook pattern used for SQL.
 */
export function useJsLab() {
  const workerRef = useRef<Worker | null>(null);
  const pendingRef = useRef<((r: JsRunResult) => void) | null>(null);
  const [ready, setReady] = useState(false);
  const [running, setRunning] = useState(false);

  const spawn = useCallback(() => {
    const w = new Worker(new URL('./jsWorker.ts', import.meta.url), { type: 'module' });
    w.onmessage = (ev: MessageEvent<JsRunResult>) => {
      if (ev.data.type === 'ready') {
        setReady(true);
        return;
      }
      const resolve = pendingRef.current;
      pendingRef.current = null;
      setRunning(false);
      resolve?.(ev.data);
    };
    workerRef.current = w;
    return w;
  }, []);

  useEffect(() => {
    spawn();
    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
      pendingRef.current = null;
    };
  }, [spawn]);

  const run = useCallback(
    (req: Omit<JsRunRequest, 'type'>, timeoutMs = 10_000): Promise<JsRunResult> => {
      const worker = workerRef.current;
      if (!worker || pendingRef.current) {
        return Promise.resolve({ type: 'result', ok: false, error: 'The lab is busy; try again.' });
      }
      setRunning(true);
      return new Promise<JsRunResult>((resolve) => {
        const timer = setTimeout(() => {
          if (pendingRef.current) {
            pendingRef.current = null;
            workerRef.current?.terminate();
            setReady(false);
            spawn();
            setRunning(false);
            resolve({
              type: 'result',
              ok: false,
              error: 'Timed out after 10s. The engine was reset.',
            });
          }
        }, timeoutMs);
        pendingRef.current = (r) => {
          clearTimeout(timer);
          resolve(r);
        };
        worker.postMessage({ type: 'run', ...req } satisfies JsRunRequest);
      });
    },
    [spawn],
  );

  return { ready, running, run };
}
