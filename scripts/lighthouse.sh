#!/usr/bin/env bash
# Lighthouse (mobile + desktop) against the production SSR server with real seeded content.
#
#   scripts/lighthouse.sh                       # build web + API, fresh DB, seed, audit, assert >= LH_MIN
#
# Starts: the API (Development env, fresh database $LH_DB, MFA for privileged roles off so the seed can sign
# in), the Node SSR server (dist-server) with API_INTERNAL_URL/PUBLIC_BASE_URL, then runs `lighthouse@12`
# on the key public pages and writes JSON reports + summary.json/summary.md to $LH_OUT.
#
# Environment (all optional): MYSQL_HOST/MYSQL_USER/MYSQL_PASSWORD, LH_DB (mastemy_lighthouse),
# LH_PORT_BASE (6400 -> API 6400, SSR 6401), LH_OUT ($TMPDIR/mastemy-lighthouse), LH_WEB_DIR (src/web: a web
# checkout whose dist/ and dist-server/ are used), LH_SKIP_BUILD=1, LH_MIN (95; 0 = report only),
# LH_RUNS (1: runs per page/form factor, the median performance run is kept), CHROME_PATH.
# Only processes started here are stopped on exit.
set -euo pipefail
ROOT=$(cd "$(dirname "$0")/.." && pwd)
cd "$ROOT"

MYSQL_HOST=${MYSQL_HOST:-127.0.0.1}
MYSQL_USER=${MYSQL_USER:-mastemy}
MYSQL_PASSWORD=${MYSQL_PASSWORD:-mastemy_dev_pw}
LH_DB=${LH_DB:-mastemy_lighthouse}
BASE=${LH_PORT_BASE:-6400}
API_PORT=$BASE
SSR_PORT=$((BASE + 1))
OUT=$(mkdir -p "${LH_OUT:-${TMPDIR:-/tmp}/mastemy-lighthouse}" && cd "${LH_OUT:-${TMPDIR:-/tmp}/mastemy-lighthouse}" && pwd)
WEB_DIR=$(cd "${LH_WEB_DIR:-$ROOT/src/web}" && pwd)
LH_MIN=${LH_MIN:-95}
LH_RUNS=${LH_RUNS:-1}
if [ -z "${CHROME_PATH:-}" ]; then
  CHROME_PATH=$(ls -d /opt/pw-browsers/chromium-*/chrome-linux/chrome 2>/dev/null | head -1 || true)
  [ -n "$CHROME_PATH" ] || CHROME_PATH=$(cd e2e && node -e "console.log(require('@playwright/test').chromium.executablePath())")
fi
export CHROME_PATH

PIDS=()
cleanup() {
  for p in "${PIDS[@]}"; do kill "$p" 2>/dev/null || true; done
  wait 2>/dev/null || true
}
trap cleanup EXIT INT TERM

wait_for() { # url name pid
  for _ in $(seq 1 180); do
    curl -sf -o /dev/null "$1" && return 0
    kill -0 "$3" 2>/dev/null || { echo "$2 exited"; tail -40 "$OUT/$2.log"; return 1; }
    sleep 1
  done
  echo "$2 did not answer at $1"; tail -40 "$OUT/$2.log"; return 1
}

for port in $API_PORT $SSR_PORT; do
  if (exec 3<>"/dev/tcp/127.0.0.1/$port") 2>/dev/null; then
    echo "port $port is already in use; pick another LH_PORT_BASE" >&2
    exit 1
  fi
done

if [ -z "${LH_SKIP_BUILD:-}" ]; then
  dotnet build src/Mastemy.Api -c Release -nologo -v q
  (cd "$WEB_DIR" && { [ -d node_modules ] || npm ci --no-audit --no-fund; } && npm run build >/dev/null)
fi

echo "== fresh database $LH_DB"
mysql -h"$MYSQL_HOST" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" \
  -e "DROP DATABASE IF EXISTS \`$LH_DB\`; CREATE DATABASE \`$LH_DB\` CHARACTER SET utf8mb4;" 2>/dev/null

(
  export ASPNETCORE_ENVIRONMENT=Development
  export ASPNETCORE_URLS=http://localhost:$API_PORT
  export ConnectionStrings__Default="Server=$MYSQL_HOST;Port=3306;Database=$LH_DB;User=$MYSQL_USER;Password=$MYSQL_PASSWORD;"
  export Database__MigrateOnStartup=true
  export Security__RequireMfaForPrivileged=false
  export RateLimits__AuthPerMinute=600
  export Seo__PublicBaseUrl=http://localhost:$SSR_PORT
  export Certificates__VerifyBaseUrl=http://localhost:$SSR_PORT/verify
  export Resources__RootPath=${TMPDIR:-/tmp}/mastemy-lh-resources-$LH_DB
  export Email__SmtpHost=127.0.0.1 Email__SmtpPort=1 Email__EnableSsl=false
  exec dotnet run --project src/Mastemy.Api --no-launch-profile --no-build -c Release
) >"$OUT/api.log" 2>&1 & API_PID=$!; PIDS+=($API_PID)
wait_for "http://localhost:$API_PORT/api/categories" api "$API_PID"

echo "== seeding content"
API_URL=http://localhost:$API_PORT node e2e/lighthouse/seed.mjs >"$OUT/seed.json"
cat "$OUT/seed.json"

SSR_PROXY_API=1 PORT=$SSR_PORT API_INTERNAL_URL=http://localhost:$API_PORT PUBLIC_BASE_URL=http://localhost:$SSR_PORT \
  SSR_CACHE_SECONDS=300 node "$WEB_DIR/dist-server/main.js" >"$OUT/ssr.log" 2>&1 & SSR_PID=$!; PIDS+=($SSR_PID)
wait_for "http://localhost:$SSR_PORT/healthz" ssr "$SSR_PID"

SEED="$OUT/seed.json" BASE_URL=http://localhost:$SSR_PORT OUT="$OUT" LH_RUNS=$LH_RUNS LH_MIN=$LH_MIN \
  node e2e/lighthouse/run.mjs
