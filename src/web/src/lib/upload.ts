import { api, apiFetch } from '../api/client';
import type { UploadSessionDto } from '../api/types';

export const CHUNK_SIZE = 8 * 1024 * 1024; // 8 MiB
const EDGE = 1024 * 1024; // 1 MiB

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function readBlob(blob: Blob): Promise<ArrayBuffer> {
  if (typeof blob.arrayBuffer === 'function') return blob.arrayBuffer();
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as ArrayBuffer);
    r.onerror = () => reject(r.error);
    r.readAsArrayBuffer(blob);
  });
}

/**
 * Identifies a local source file without reading all of it:
 * SHA-256 over (first 1 MiB + last 1 MiB + decimal size). Used to verify the same file is re-selected on resume.
 */
export async function fileFingerprint(file: Blob): Promise<string> {
  const head = await readBlob(file.slice(0, Math.min(EDGE, file.size)));
  const tail = await readBlob(file.slice(Math.max(0, file.size - EDGE), file.size));
  const size = new TextEncoder().encode(String(file.size));
  const joined = new Uint8Array(head.byteLength + tail.byteLength + size.byteLength);
  joined.set(new Uint8Array(head), 0);
  joined.set(new Uint8Array(tail), head.byteLength);
  joined.set(size, head.byteLength + tail.byteLength);
  return toHex(await crypto.subtle.digest('SHA-256', joined));
}

export function contentRange(start: number, endExclusive: number, total: number): string {
  return `bytes ${start}-${endExclusive - 1}/${total}`;
}

export interface UploadProgress {
  sent: number;
  total: number;
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Sends the file in sequential 8 MiB chunks starting at the server-confirmed offset.
 * The server relays each chunk to YouTube; nothing is staged permanently. On transient failure the
 * confirmed offset is re-read from the server before retrying.
 */
export async function sendChunks(
  sessionId: string,
  file: Blob,
  startOffset: number,
  onProgress: (p: UploadProgress) => void,
  signal: AbortSignal,
): Promise<UploadSessionDto | null> {
  let offset = startOffset;
  let last: UploadSessionDto | null = null;
  let failures = 0;
  while (offset < file.size) {
    if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
    const end = Math.min(offset + CHUNK_SIZE, file.size);
    try {
      const res = await apiFetch(`/api/youtube/uploads/${sessionId}/chunk`, {
        method: 'PUT',
        body: file.slice(offset, end),
        headers: {
          'Content-Range': contentRange(offset, end, file.size),
          'Content-Type': 'application/octet-stream',
        },
        signal,
      });
      const text = await res.text();
      last = text ? (JSON.parse(text) as UploadSessionDto) : last;
      offset =
        last && typeof last.confirmedOffset === 'number' && last.confirmedOffset > offset
          ? last.confirmedOffset
          : end;
      failures = 0;
      onProgress({ sent: offset, total: file.size });
    } catch (e) {
      if (signal.aborted) throw e;
      failures += 1;
      if (failures > 3) throw e;
      await wait(1000 * 2 ** failures);
      const status = await api<UploadSessionDto>(`/api/youtube/uploads/${sessionId}`);
      offset = status.confirmedOffset;
      last = status;
    }
  }
  return last;
}

const STORE_KEY = 'mastemy.uploads';
export interface StoredUpload {
  sessionId: string;
  fileName: string;
  fileSize: number;
  fingerprint: string;
}
export function rememberUpload(lessonId: string, u: StoredUpload | null): void {
  try {
    const all = JSON.parse(localStorage.getItem(STORE_KEY) ?? '{}') as Record<string, StoredUpload>;
    if (u) all[lessonId] = u;
    else delete all[lessonId];
    localStorage.setItem(STORE_KEY, JSON.stringify(all));
  } catch {
    /* storage unavailable: resume still works by re-entering details */
  }
}
export function recallUpload(lessonId: string): StoredUpload | null {
  try {
    const all = JSON.parse(localStorage.getItem(STORE_KEY) ?? '{}') as Record<string, StoredUpload>;
    return all[lessonId] ?? null;
  } catch {
    return null;
  }
}
