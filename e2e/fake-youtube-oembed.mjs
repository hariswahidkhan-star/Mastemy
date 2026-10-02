// Local stand-in for https://www.youtube.com/oembed used by the e2e and Lighthouse stacks (never for production).
// The API's manual (no Data API key) video path asks oEmbed for a hint; whether the real endpoint is reachable
// differs between machines (blocked in some sandboxes, open on GitHub runners where the fake seed ids 404), so
// the stacks point YouTube__OEmbedUrl here and every run takes the same path.
//
//   FAKE_OEMBED_PORT=12151 node e2e/fake-youtube-oembed.mjs
//
// Any well-formed 11-character id is "found" (embeddable). Test hooks by id prefix:
//   "NOTFOUND..." -> 404 (deleted video), "PRIVATE..." -> 401 (private / embedding disabled).
import http from 'node:http';

const port = Number(process.env.FAKE_OEMBED_PORT ?? 12151);
const idPattern = /^[A-Za-z0-9_-]{11}$/;

http
  .createServer((req, res) => {
    const u = new URL(req.url ?? '/', `http://localhost:${port}`);
    if (u.pathname === '/healthz') return res.writeHead(200).end('ok');
    if (u.pathname !== '/oembed') return res.writeHead(404).end();
    let id = null;
    try {
      const watch = new URL(u.searchParams.get('url') ?? '');
      id = watch.searchParams.get('v');
    } catch {
      /* malformed url -> 400 below */
    }
    if (!id || !idPattern.test(id)) return res.writeHead(400).end('Bad Request');
    if (id.startsWith('NOTFOUND')) return res.writeHead(404).end('Not Found');
    if (id.startsWith('PRIVATE')) return res.writeHead(401).end('Unauthorized');
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(
      JSON.stringify({
        title: `Fake video ${id}`,
        author_name: 'Mastemy E2E',
        author_url: 'https://www.youtube.com/@mastemy-e2e',
        type: 'video',
        height: 113,
        width: 200,
        version: '1.0',
        provider_name: 'YouTube',
        provider_url: 'https://www.youtube.com/',
        thumbnail_height: 360,
        thumbnail_width: 480,
        thumbnail_url: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        html: `<iframe width="200" height="113" src="https://www.youtube.com/embed/${id}?feature=oembed" frameborder="0" allowfullscreen></iframe>`,
      }),
    );
  })
  .listen(port, '127.0.0.1', () => console.log(`fake YouTube oEmbed on :${port}`));
