// Tiny local OpenID Connect provider for the SSO end-to-end test (never for production).
// Discovery + RS256 JWKS + authorization endpoint (auto-approves the user chosen by the test) + token
// endpoint with client secret and PKCE S256 checks. The API must run with Sso__AllowInsecureHttp=true.
//
//   FAKE_OIDC_PORT=12592 FAKE_OIDC_CLIENT_ID=mastemy FAKE_OIDC_CLIENT_SECRET=s3cret node e2e/fake-oidc.mjs
//
// Test hooks: POST /__test/user {sub, email, email_verified, name} picks who "signs in" next.
import http from 'node:http';
import { createHash, createSign, generateKeyPairSync, randomBytes } from 'node:crypto';

const port = Number(process.env.FAKE_OIDC_PORT ?? 12592);
const issuer = process.env.FAKE_OIDC_ISSUER ?? `http://localhost:${port}`;
const clientId = process.env.FAKE_OIDC_CLIENT_ID ?? 'mastemy-e2e';
const clientSecret = process.env.FAKE_OIDC_CLIENT_SECRET ?? 'e2e-oidc-secret';
const kid = `k-${randomBytes(4).toString('hex')}`;
const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
const jwk = { ...publicKey.export({ format: 'jwk' }), kid, use: 'sig', alg: 'RS256' };

let user = { sub: 'user-1', email: 'member@example.com', email_verified: true, name: 'SSO Member' };
const codes = new Map(); // code -> { nonce, challenge, redirectUri, user }

const b64url = (b) => Buffer.from(b).toString('base64url');

function signJwt(payload) {
  const head = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT', kid }));
  const body = b64url(JSON.stringify(payload));
  const s = createSign('RSA-SHA256').update(`${head}.${body}`).sign(privateKey);
  return `${head}.${body}.${b64url(s)}`;
}

function json(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json', 'cache-control': 'no-store' });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c) => (data += c));
    req.on('end', () => resolve(data));
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', issuer);
  const raw = await readBody(req);
  if (url.pathname === '/.well-known/openid-configuration')
    return json(res, 200, {
      issuer,
      authorization_endpoint: `${issuer}/authorize`,
      token_endpoint: `${issuer}/token`,
      jwks_uri: `${issuer}/jwks`,
      response_types_supported: ['code'],
      id_token_signing_alg_values_supported: ['RS256'],
      code_challenge_methods_supported: ['S256'],
    });
  if (url.pathname === '/jwks') return json(res, 200, { keys: [jwk] });
  if (url.pathname === '/__test/user' && req.method === 'POST') {
    user = { ...user, ...JSON.parse(raw || '{}') };
    return json(res, 200, user);
  }
  if (url.pathname === '/authorize') {
    const q = url.searchParams;
    const redirect = q.get('redirect_uri');
    if (q.get('client_id') !== clientId || !redirect || q.get('code_challenge_method') !== 'S256')
      return json(res, 400, { error: 'invalid_request' });
    const code = randomBytes(16).toString('hex');
    codes.set(code, {
      nonce: q.get('nonce'),
      challenge: q.get('code_challenge'),
      redirectUri: redirect,
      user: { ...user },
    });
    const to = new URL(redirect);
    to.searchParams.set('code', code);
    to.searchParams.set('state', q.get('state') ?? '');
    res.writeHead(302, { location: to.toString() });
    return res.end();
  }
  if (url.pathname === '/token' && req.method === 'POST') {
    const f = new URLSearchParams(raw);
    const entry = codes.get(f.get('code') ?? '');
    codes.delete(f.get('code') ?? '');
    if (!entry) return json(res, 400, { error: 'invalid_grant' });
    if (f.get('client_id') !== clientId || f.get('client_secret') !== clientSecret)
      return json(res, 401, { error: 'invalid_client' });
    if (f.get('redirect_uri') !== entry.redirectUri) return json(res, 400, { error: 'invalid_grant' });
    const verifier = f.get('code_verifier') ?? '';
    if (createHash('sha256').update(verifier).digest('base64url') !== entry.challenge)
      return json(res, 400, { error: 'invalid_grant', error_description: 'PKCE' });
    const now = Math.floor(Date.now() / 1000);
    const idToken = signJwt({
      iss: issuer,
      aud: clientId,
      sub: entry.user.sub,
      email: entry.user.email,
      email_verified: entry.user.email_verified,
      name: entry.user.name,
      nonce: entry.nonce,
      iat: now,
      exp: now + 300,
    });
    return json(res, 200, { access_token: 'at', token_type: 'Bearer', expires_in: 300, id_token: idToken });
  }
  json(res, 404, { error: 'not_found' });
});

server.listen(port, () => console.log(`fake OIDC provider on ${issuer}`));
