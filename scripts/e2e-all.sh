#!/usr/bin/env bash
# One command for the whole browser suite: starts a production-like stack on a fresh MySQL database and runs
# every Playwright spec in e2e/tests (functional flows + accessibility). Nothing external is contacted:
#   fake Stripe (e2e/fake-stripe.mjs), fake Anthropic (e2e/fake-anthropic.mjs), fake OIDC (e2e/fake-oidc.mjs),
#   SMTP sink (e2e/smtp-sink.mjs). MFA is required for privileged roles and refresh tokens travel only in the
#   HttpOnly cookie (Auth:AllowBodyRefreshToken=false), as in production.
#
#   scripts/e2e-all.sh                    # whole suite
#   scripts/e2e-all.sh a11y.spec.ts       # extra args go to `playwright test`
#
# The production Node SSR server (dist-server, with SSR_PROXY_API=1) also runs, on E2E_SSR_URL, for the SSR /
# CSP / web-vitals specs (ssr.spec.ts, perf.spec.ts).
#
# Environment (all optional): MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, E2E_DB, E2E_PORT_BASE (default 5080 -> API
# 5080, web 5173, SSR 5190, fakes on 12111/12131/12592, SMTP 2525/2580), E2E_SKIP_BUILD=1,
# E2E_LOG_DIR, E2E_WEB=preview|dev (default preview: production bundle via
# `vite preview`), E2E_WEB_DIST. Only processes started here are stopped on exit.
set -euo pipefail
ROOT=$(cd "$(dirname "$0")/.." && pwd)
cd "$ROOT"

MYSQL_HOST=${MYSQL_HOST:-127.0.0.1}
MYSQL_USER=${MYSQL_USER:-mastemy}
MYSQL_PASSWORD=${MYSQL_PASSWORD:-mastemy_dev_pw}
export E2E_DB=${E2E_DB:-mastemy_e2e}
BASE=${E2E_PORT_BASE:-5080}
OFF=$((BASE - 5080))
API_PORT=$((5080 + OFF))
WEB_PORT=$((5173 + OFF))
SSR_PORT=$((5190 + OFF))
STRIPE_PORT=$((12111 + OFF))
AI_PORT=$((12131 + OFF))
OIDC_PORT=$((12592 + OFF))
SMTP_PORT=$((2525 + OFF))
SMTP_HTTP_PORT=$((2580 + OFF))
LOG_DIR=${E2E_LOG_DIR:-$ROOT/e2e/stack-logs}
WEB_DIST=${E2E_WEB_DIST:-$ROOT/e2e/.web-dist}
mkdir -p "$LOG_DIR"

PIDS=()
cleanup() {
  for p in "${PIDS[@]}"; do kill "$p" 2>/dev/null || true; done
  wait 2>/dev/null || true
}
trap cleanup EXIT INT TERM

wait_for() { # url name pid
  for _ in $(seq 1 180); do
    curl -sf -o /dev/null "$1" && return 0
    kill -0 "$3" 2>/dev/null || { echo "$2 exited; see $LOG_DIR"; tail -40 "$LOG_DIR/$2.log"; return 1; }
    sleep 1
  done
  echo "$2 did not answer at $1"; tail -40 "$LOG_DIR/$2.log"; return 1
}

# A leftover server on one of our ports would answer the readiness checks in place of the fresh one.
for port in $API_PORT $WEB_PORT $SSR_PORT $STRIPE_PORT $AI_PORT $OIDC_PORT $SMTP_PORT $SMTP_HTTP_PORT; do
  if (exec 3<>"/dev/tcp/127.0.0.1/$port") 2>/dev/null; then
    echo "port $port is already in use; stop that process or pick another E2E_PORT_BASE" >&2
    exit 1
  fi
done

for d in e2e src/web; do [ -d "$d/node_modules" ] || (cd "$d" && npm ci --no-audit --no-fund); done
if [ -z "${E2E_SKIP_BUILD:-}" ]; then
  dotnet build src/Mastemy.Api -c Release -nologo -v q
fi
if [ -z "${E2E_SKIP_BUILD:-}" ] || [ ! -f "$WEB_DIST/index.html" ] || [ ! -f "$WEB_DIST-server/main.js" ]; then
  (cd src/web && node scripts/generate-images.mjs >/dev/null \
    && npx vite build --outDir "$WEB_DIST" --emptyOutDir --logLevel warn \
    && npx vite build --ssr server/main.ts --outDir "$WEB_DIST-server" --emptyOutDir --logLevel warn)
fi

echo "== fresh database $E2E_DB on $MYSQL_HOST"
mysql -h"$MYSQL_HOST" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" \
  -e "DROP DATABASE IF EXISTS \`$E2E_DB\`; CREATE DATABASE \`$E2E_DB\` CHARACTER SET utf8mb4;" 2>/dev/null
RES_DIR=${TMPDIR:-/tmp}/mastemy-e2e-resources-$E2E_DB
rm -rf "$RES_DIR"

FAKE_STRIPE_PORT=$STRIPE_PORT node e2e/fake-stripe.mjs >"$LOG_DIR/fake-stripe.log" 2>&1 & PIDS+=($!)
FAKE_AI_PORT=$AI_PORT node e2e/fake-anthropic.mjs >"$LOG_DIR/fake-anthropic.log" 2>&1 & PIDS+=($!)
FAKE_OIDC_PORT=$OIDC_PORT node e2e/fake-oidc.mjs >"$LOG_DIR/fake-oidc.log" 2>&1 & PIDS+=($!)
SMTP_SINK_PORT=$SMTP_PORT SMTP_SINK_HTTP_PORT=$SMTP_HTTP_PORT node e2e/smtp-sink.mjs >"$LOG_DIR/smtp-sink.log" 2>&1 & PIDS+=($!)

(
  export ASPNETCORE_ENVIRONMENT=Development # dev seed admin + migrations; everything security-relevant set below
  export ASPNETCORE_URLS=http://localhost:$API_PORT
  export ConnectionStrings__Default="Server=$MYSQL_HOST;Port=3306;Database=$E2E_DB;User=$MYSQL_USER;Password=$MYSQL_PASSWORD;"
  export Database__MigrateOnStartup=true
  export Cors__Origins__0=http://localhost:$WEB_PORT
  export Security__RequireMfaForPrivileged=true
  export Auth__AllowBodyRefreshToken=false
  export RateLimits__AuthPerMinute=600
  export Certificates__VerifyBaseUrl=http://localhost:$WEB_PORT/verify
  export Seo__PublicBaseUrl=http://localhost:$WEB_PORT
  export Stripe__SecretKey=sk_test_e2e Stripe__WebhookSecret=whsec_e2e_secret
  export Stripe__ApiBaseUrl=http://localhost:$STRIPE_PORT
  export Stripe__SuccessUrl="http://localhost:$WEB_PORT/me?checkout=success"
  export Stripe__CancelUrl="http://localhost:$WEB_PORT/me?checkout=cancel"
  export Payouts__MinimumAmount=1
  export Invoice__SellerName="Mastemy E2E" Invoice__SellerAddress="1 Test Street" Invoice__SellerTaxId=DE000000000
  export Ai__ApiKey=sk-ant-e2e-fake Ai__BaseUrl=http://localhost:$AI_PORT
  export Sso__RedirectUri=http://localhost:$API_PORT/api/sso/callback
  export Sso__CompletionUrl=http://localhost:$WEB_PORT/sso/complete
  export Sso__AllowInsecureHttp=true
  export Resources__RootPath=$RES_DIR
  export Email__SmtpHost=127.0.0.1 Email__SmtpPort=$SMTP_PORT Email__EnableSsl=false
  export Email__From=no-reply@e2e.mastemy.test Email__PublicBaseUrl=http://localhost:$WEB_PORT Email__PollIntervalSeconds=1
  exec dotnet run --project src/Mastemy.Api --no-launch-profile --no-build -c Release
) >"$LOG_DIR/api.log" 2>&1 & API_PID=$!; PIDS+=($API_PID)

# Production bundle served by `vite preview` (same /api proxy as dev): no HMR, so editing sources during a run
# cannot reload pages under the tests. E2E_WEB=dev uses the Vite dev server instead (faster edit/re-run loop).
if [ "${E2E_WEB:-preview}" = dev ]; then
  (cd src/web && API_PROXY_TARGET=http://localhost:$API_PORT exec node node_modules/vite/bin/vite.js --port "$WEB_PORT" --strictPort) >"$LOG_DIR/web.log" 2>&1 &
else
  (cd src/web && API_PROXY_TARGET=http://localhost:$API_PORT exec node node_modules/vite/bin/vite.js preview --outDir "$WEB_DIST" --port "$WEB_PORT" --strictPort) >"$LOG_DIR/web.log" 2>&1 &
fi
WEB_PID=$!; PIDS+=($WEB_PID)

# The production SSR server on the same client build, forwarding /api to the API (no nginx here).
DIST_DIR="$WEB_DIST" SSR_PROXY_API=1 PORT=$SSR_PORT API_INTERNAL_URL=http://localhost:$API_PORT \
  PUBLIC_BASE_URL=http://localhost:$SSR_PORT node "$WEB_DIST-server/main.js" >"$LOG_DIR/ssr.log" 2>&1 &
SSR_PID=$!; PIDS+=($SSR_PID)

wait_for "http://localhost:$API_PORT/api/categories" api "$API_PID"
wait_for "http://localhost:$WEB_PORT/" web "$WEB_PID"
wait_for "http://localhost:$SSR_PORT/healthz" ssr "$SSR_PID"
wait_for "http://localhost:$SMTP_HTTP_PORT/messages" smtp-sink "${PIDS[3]}"
echo "== stack up: web :$WEB_PORT ssr :$SSR_PORT api :$API_PORT"

# The MFA secret cache belongs to this database; start clean.
rm -f "${TMPDIR:-/tmp}/mastemy-e2e-mfa-http%3A%2F%2Flocalhost%3A$API_PORT.json"

cd e2e
E2E_BASE_URL=http://localhost:$WEB_PORT E2E_API_URL=http://localhost:$API_PORT E2E_SSR_URL=http://localhost:$SSR_PORT \
E2E_FAKE_STRIPE_URL=http://localhost:$STRIPE_PORT E2E_SMTP_SINK_URL=http://localhost:$SMTP_HTTP_PORT \
E2E_FAKE_OIDC_URL=http://localhost:$OIDC_PORT MYSQL_HOST=$MYSQL_HOST \
  npx playwright test "$@"
