import { useCallback, useEffect, useRef, useState } from 'react';
import type { RunRequest, RunResult } from './types';

/**
 * Owns the SQL Web Worker for a lab panel: creates it once, tears it down on unmount, and exposes a `run`
 * that resolves with the next result message. Running is serialized (one in-flight run at a time) and guarded
 * by a timeout so a pathological query cannot hang the UI — the worker is terminated and recreated on timeout.
 */
export function useLab() {
  const workerRef = useRef<Worker | null>(null);
  const pendingRef = useRef<((r: RunResult) => void) | null>(null);
  const [ready, setReady] = useState(false);
  const [running, setRunning] = useState(false);

  const spawn = useCallback(() => {
    const w = new Worker(new URL('./sqlWorker.ts', import.meta.url), { type: 'module' });
    w.onmessage = (ev: MessageEvent<RunResult>) => {
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
    (req: Omit<RunRequest, 'type'>, timeoutMs = 10_000): Promise<RunResult> => {
      const worker = workerRef.current;
      if (!worker || pendingRef.current) {
        return Promise.resolve({ type: 'result', ok: false, error: 'The lab is busy; try again.' });
      }
      setRunning(true);
      return new Promise<RunResult>((resolve) => {
        const timer = setTimeout(() => {
          if (pendingRef.current) {
            pendingRef.current = null;
            // Recover from a runaway query: kill and respawn the engine.
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
        worker.postMessage({ type: 'run', ...req } satisfies RunRequest);
      });
    },
    [spawn],
  );

  return { ready, running, run };
}
