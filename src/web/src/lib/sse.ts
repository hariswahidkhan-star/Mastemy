import { apiFetch } from '../api/client';

export interface SseMessage {
  event: string;
  data: string;
}

/**
 * Incremental text/event-stream parser (WHATWG rules that matter here: `event:` / `data:` fields, multi-line data
 * joined by "\n", blank line dispatches, CRLF tolerated, comments ignored). Feed chunks, get complete events back.
 */
export class SseParser {
  private buffer = '';
  private event = '';
  private data: string[] = [];

  push(chunk: string): SseMessage[] {
    this.buffer += chunk;
    const out: SseMessage[] = [];
    let nl: number;
    while ((nl = this.buffer.search(/\r\n|\n|\r/)) >= 0) {
      const line = this.buffer.slice(0, nl);
      const sepLen = this.buffer.startsWith('\r\n', nl) ? 2 : 1;
      this.buffer = this.buffer.slice(nl + sepLen);
      if (line === '') {
        if (this.data.length > 0)
          out.push({ event: this.event || 'message', data: this.data.join('\n') });
        this.event = '';
        this.data = [];
        continue;
      }
      if (line.startsWith(':')) continue;
      const colon = line.indexOf(':');
      const field = colon < 0 ? line : line.slice(0, colon);
      let value = colon < 0 ? '' : line.slice(colon + 1);
      if (value.startsWith(' ')) value = value.slice(1);
      if (field === 'event') this.event = value;
      else if (field === 'data') this.data.push(value);
    }
    return out;
  }
}

/**
 * POSTs JSON and reads the streamed SSE reply with fetch + ReadableStream (EventSource cannot POST or send a
 * bearer token). Errors before the stream opens surface as ApiError (problem+json) from apiFetch.
 */
export async function postSse(
  path: string,
  body: unknown,
  onEvent: (msg: SseMessage) => void,
  signal?: AbortSignal,
): Promise<void> {
  const res = await apiFetch(path, {
    method: 'POST',
    body,
    headers: { Accept: 'text/event-stream' },
    signal,
  });
  const parser = new SseParser();
  if (!res.body) {
    parser.push(await res.text()).forEach(onEvent);
    parser.push('\n\n').forEach(onEvent);
    return;
  }
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    parser.push(decoder.decode(value, { stream: true })).forEach(onEvent);
  }
  parser.push(decoder.decode() + '\n\n').forEach(onEvent);
}
