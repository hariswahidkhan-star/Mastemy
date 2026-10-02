// Tiny stand-in for the Anthropic Messages API (POST /v1/messages, streamed SSE) used by the workspace e2e spec.
// Start the API with Ai__ApiKey=<anything> and Ai__BaseUrl=http://localhost:$FAKE_AI_PORT to use it.
// It answers from the first <source id="..."> it finds in the request and cites it as [[id]]; with no source it
// replies NOT_COVERED. Only the event types the API's AnthropicProvider reads are emitted.
import { createServer } from 'node:http';

const port = Number(process.env.FAKE_AI_PORT ?? 12131);

function sse(res, type, data) {
  res.write(`event: ${type}\ndata: ${JSON.stringify({ type, ...data })}\n\n`);
}

const server = createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' }).end('{"ok":true}');
    return;
  }
  if (req.method !== 'POST' || !req.url?.startsWith('/v1/messages')) {
    res.writeHead(404).end();
    return;
  }
  let raw = '';
  req.on('data', (c) => (raw += c));
  req.on('end', () => {
    let body = {};
    try {
      body = JSON.parse(raw);
    } catch {
      res.writeHead(400).end();
      return;
    }
    const text = JSON.stringify(body);
    const source = /<source id=\\?"([A-Za-z0-9_-]+)\\?"/.exec(text)?.[1];
    const answer = source
      ? `According to the course material, retention reviews happen every quarter [[${source}]].`
      : 'NOT_COVERED';
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
    });
    sse(res, 'message_start', {
      message: {
        id: 'msg_fake',
        model: body.model ?? 'fake',
        usage: { input_tokens: 42, output_tokens: 1 },
      },
    });
    sse(res, 'content_block_start', {
      index: 0,
      content_block: { type: 'text', text: '' },
    });
    // Split mid-marker on purpose so the API's citation rewriting is exercised across deltas.
    const parts = answer.match(/.{1,17}/g) ?? [answer];
    for (const p of parts)
      sse(res, 'content_block_delta', {
        index: 0,
        delta: { type: 'text_delta', text: p },
      });
    sse(res, 'content_block_stop', { index: 0 });
    sse(res, 'message_delta', {
      delta: { stop_reason: 'end_turn' },
      usage: { output_tokens: 20 },
    });
    sse(res, 'message_stop', {});
    res.end();
  });
});

server.listen(port, () => console.log(`fake Anthropic API on :${port}`));
