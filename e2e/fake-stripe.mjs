// Minimal local stand-in for the Stripe REST endpoints the API calls (checkout sessions in payment and
// subscription mode, refunds, subscription cancel_at_period_end updates).
// It never reports payment success on its own: payment completion only reaches the API through a
// signed webhook that the test posts to /api/webhooks/stripe.
import http from 'node:http';

const port = Number(process.env.FAKE_STRIPE_PORT ?? 12111);
const sessions = new Map();
const refunds = [];
const subscriptions = new Map();
let seq = 0;

function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c) => (data += c));
    req.on('end', () => resolve(data));
  });
}

function json(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json' });
  res.end(JSON.stringify(body));
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://localhost:${port}`);
  const raw = await readBody(req);
  if (
    url.pathname.startsWith('/v1/') &&
    !(req.headers.authorization ?? '').startsWith('Bearer sk_test_')
  ) {
    return json(res, 401, { error: { message: 'Invalid API key' } });
  }
  const form = new URLSearchParams(raw);
  if (req.method === 'POST' && url.pathname === '/v1/checkout/sessions') {
    const id = `cs_test_${++seq}_${Date.now()}`;
    const success = form.get('success_url') ?? 'http://localhost:5173/';
    const s = {
      id,
      object: 'checkout.session',
      url: `${success}${success.includes('?') ? '&' : '?'}session_id=${id}`,
      amount_total: Number(form.get('line_items[0][price_data][unit_amount]')),
      currency: form.get('line_items[0][price_data][currency]'),
      client_reference_id: form.get('client_reference_id'),
      mode: form.get('mode') ?? 'payment',
      metadata: {
        ...(form.get('metadata[order_id]') ? { order_id: form.get('metadata[order_id]') } : {}),
        ...(form.get('metadata[subscription_id]')
          ? { subscription_id: form.get('metadata[subscription_id]') }
          : {}),
      },
      recurring_interval: form.get('line_items[0][price_data][recurring][interval]'),
      customer_email: form.get('customer_email'),
      payment_status: 'unpaid',
      payment_intent: `pi_test_${seq}`,
    };
    sessions.set(id, s);
    return json(res, 200, s);
  }
  const m = url.pathname.match(/^\/v1\/checkout\/sessions\/([^/]+)$/);
  if (req.method === 'GET' && m) {
    const s = sessions.get(decodeURIComponent(m[1]));
    return s ? json(res, 200, s) : json(res, 404, { error: { message: 'No such session' } });
  }
  if (req.method === 'POST' && url.pathname === '/v1/refunds') {
    const r = {
      id: `re_test_${++seq}`,
      object: 'refund',
      status: 'succeeded',
      payment_intent: form.get('payment_intent'),
      amount: Number(form.get('amount')),
    };
    refunds.push(r);
    return json(res, 200, r);
  }
  const sub = url.pathname.match(/^\/v1\/subscriptions\/([^/]+)$/);
  if (req.method === 'POST' && sub) {
    const id = decodeURIComponent(sub[1]);
    const current = subscriptions.get(id) ?? { id, object: 'subscription', status: 'active' };
    const flag = form.get('cancel_at_period_end');
    if (flag !== null) current.cancel_at_period_end = flag === 'true';
    subscriptions.set(id, current);
    return json(res, 200, current);
  }
  // Test-only inspection endpoints.
  if (req.method === 'GET' && url.pathname === '/__test/sessions')
    return json(res, 200, [...sessions.values()]);
  if (req.method === 'GET' && url.pathname === '/__test/refunds') return json(res, 200, refunds);
  if (req.method === 'GET' && url.pathname === '/__test/subscriptions')
    return json(res, 200, [...subscriptions.values()]);
  json(res, 404, { error: { message: `Unhandled ${req.method} ${url.pathname}` } });
});

server.listen(port, () => console.log(`fake stripe listening on ${port}`));
