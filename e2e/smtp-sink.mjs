// Minimal local SMTP sink for e2e: accepts every message (no TLS, no auth) and keeps it in memory.
// Messages are exposed over HTTP so tests can read verification / password-reset links:
//   GET    /messages[?to=addr]  -> [{ id, from, to[], subject, body, receivedAt }] (oldest first)
//   DELETE /messages            -> clears the store
// Ports: SMTP_SINK_PORT (default 2525) and SMTP_SINK_HTTP_PORT (default 2580).
import net from 'node:net';
import http from 'node:http';

const smtpPort = Number(process.env.SMTP_SINK_PORT ?? 2525);
const httpPort = Number(process.env.SMTP_SINK_HTTP_PORT ?? 2580);
const messages = [];
let seq = 0;

function decodeQuotedPrintable(s) {
  const bytes = [];
  const text = s.replace(/=\r?\n/g, '');
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '=' && /^[0-9A-Fa-f]{2}$/.test(text.slice(i + 1, i + 3))) {
      bytes.push(parseInt(text.slice(i + 1, i + 3), 16));
      i += 2;
    } else bytes.push(...Buffer.from(text[i], 'utf8'));
  }
  return Buffer.from(bytes).toString('utf8');
}

function decodeWords(s) {
  return s.replace(/=\?([^?]+)\?([BbQq])\?([^?]*)\?=/g, (_m, _cs, enc, data) =>
    enc.toUpperCase() === 'B'
      ? Buffer.from(data, 'base64').toString('utf8')
      : decodeQuotedPrintable(data.replace(/_/g, ' ')),
  );
}

function parseHeaders(raw) {
  const headers = {};
  const unfolded = raw.replace(/\r?\n[ \t]+/g, ' ');
  for (const line of unfolded.split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i > 0) headers[line.slice(0, i).trim().toLowerCase()] = line.slice(i + 1).trim();
  }
  return headers;
}

function decodeBody(headers, body) {
  const enc = (headers['content-transfer-encoding'] ?? '').toLowerCase();
  if (enc === 'base64') return Buffer.from(body.replace(/\s/g, ''), 'base64').toString('utf8');
  if (enc === 'quoted-printable') return decodeQuotedPrintable(body);
  return body;
}

/** Decodes a (possibly multipart) RFC 5322 message into a plain-text body. */
function parseMessage(data) {
  const split = data.search(/\r?\n\r?\n/);
  const rawHeaders = split >= 0 ? data.slice(0, split) : data;
  const rawBody = split >= 0 ? data.slice(split).replace(/^\r?\n\r?\n/, '') : '';
  const headers = parseHeaders(rawHeaders);
  const type = headers['content-type'] ?? 'text/plain';
  let body;
  const boundary = /boundary="?([^";]+)"?/i.exec(type)?.[1];
  if (type.toLowerCase().startsWith('multipart/') && boundary) {
    const parts = rawBody.split(`--${boundary}`).slice(1, -1);
    body = parts
      .map((p) => {
        const sp = p.replace(/^\r?\n/, '');
        const at = sp.search(/\r?\n\r?\n/);
        const h = parseHeaders(sp.slice(0, at));
        return decodeBody(h, sp.slice(at).replace(/^\r?\n\r?\n/, ''));
      })
      .join('\n');
  } else body = decodeBody(headers, rawBody);
  return { subject: decodeWords(headers.subject ?? ''), body };
}

const smtp = net.createServer((socket) => {
  socket.setEncoding('utf8');
  let buffer = '';
  let inData = false;
  let envelope = { from: '', to: [] };
  const reply = (line) => socket.write(`${line}\r\n`);
  reply('220 mastemy-smtp-sink ready');
  socket.on('data', (chunk) => {
    buffer += chunk;
    for (;;) {
      if (inData) {
        const end = buffer.indexOf('\r\n.\r\n');
        if (end < 0) return;
        const raw = buffer.slice(0, end).replace(/\r\n\.\./g, '\r\n.');
        buffer = buffer.slice(end + 5);
        inData = false;
        const { subject, body } = parseMessage(raw);
        messages.push({
          id: ++seq,
          from: envelope.from,
          to: envelope.to,
          subject,
          body,
          receivedAt: new Date().toISOString(),
        });
        envelope = { from: '', to: [] };
        reply('250 OK: queued');
        continue;
      }
      const nl = buffer.indexOf('\r\n');
      if (nl < 0) return;
      const line = buffer.slice(0, nl);
      buffer = buffer.slice(nl + 2);
      const cmd = line.slice(0, 4).toUpperCase();
      if (cmd === 'EHLO') {
        reply('250-mastemy-smtp-sink');
        reply('250-8BITMIME');
        reply('250 SMTPUTF8');
      } else if (cmd === 'HELO') reply('250 mastemy-smtp-sink');
      else if (cmd === 'MAIL') {
        envelope.from = /<([^>]*)>/.exec(line)?.[1] ?? '';
        reply('250 OK');
      } else if (cmd === 'RCPT') {
        envelope.to.push((/<([^>]*)>/.exec(line)?.[1] ?? '').toLowerCase());
        reply('250 OK');
      } else if (cmd === 'DATA') {
        inData = true;
        reply('354 End data with <CR><LF>.<CR><LF>');
      } else if (cmd === 'RSET') {
        envelope = { from: '', to: [] };
        reply('250 OK');
      } else if (cmd === 'QUIT') {
        reply('221 Bye');
        socket.end();
        return;
      } else if (cmd === 'NOOP') reply('250 OK');
      else reply('502 Command not implemented');
    }
  });
  socket.on('error', () => {});
});

const api = http.createServer((req, res) => {
  const url = new URL(req.url ?? '/', `http://localhost:${httpPort}`);
  if (url.pathname === '/messages' && req.method === 'GET') {
    const to = url.searchParams.get('to')?.toLowerCase();
    const list = to ? messages.filter((m) => m.to.includes(to)) : messages;
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(list));
  } else if (url.pathname === '/messages' && req.method === 'DELETE') {
    messages.length = 0;
    res.writeHead(204);
    res.end();
  } else {
    res.writeHead(404);
    res.end();
  }
});

smtp.listen(smtpPort, '127.0.0.1', () => console.log(`smtp sink: SMTP on :${smtpPort}`));
api.listen(httpPort, '127.0.0.1', () => console.log(`smtp sink: HTTP on :${httpPort}`));
