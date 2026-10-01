import { useEffect, useMemo, useState } from 'react';

/** Milliseconds to add to the local clock to approximate the server clock. */
export function serverOffsetMs(serverNowIso: string, localNowMs: number = Date.now()): number {
  const server = Date.parse(serverNowIso);
  return Number.isNaN(server) ? 0 : server - localNowMs;
}

export function remainingMs(
  deadlineIso: string,
  offsetMs: number,
  localNowMs: number = Date.now(),
): number {
  const deadline = Date.parse(deadlineIso);
  if (Number.isNaN(deadline)) return 0;
  return Math.max(0, deadline - (localNowMs + offsetMs));
}

/**
 * Server-authoritative countdown: the offset between the server's `serverNow` and the local clock is
 * captured once when the attempt is loaded, so a wrong local clock cannot extend or shorten the deadline.
 * Returns null for untimed attempts.
 */
export function useServerCountdown(deadlineAt: string | null, serverNow: string): number | null {
  const offset = useMemo(() => serverOffsetMs(serverNow), [serverNow]);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!deadlineAt) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [deadlineAt]);
  if (!deadlineAt) return null;
  return remainingMs(deadlineAt, offset, now);
}

export function formatCountdown(ms: number): string {
  const total = Math.ceil(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}
