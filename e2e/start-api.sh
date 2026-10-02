#!/usr/bin/env bash
# Starts the API against a freshly recreated database, with Stripe pointed at the local fake and email
# (verification / password reset) delivered to the local SMTP sink (e2e/smtp-sink.mjs, started here unless
# its HTTP port already answers). Defaults match CI (API :5080, web :5173, fake Stripe :12111, SMTP :2525,
# sink HTTP :2580); override API_PORT / WEB_PORT / FAKE_STRIPE_PORT / SMTP_SINK_PORT / SMTP_SINK_HTTP_PORT /
# E2E_DB to run a second stack side by side.
set -euo pipefail
cd "$(dirname "$0")/.."
DB=${E2E_DB:-mastemy_e2e}
MYSQL_HOST=${MYSQL_HOST:-127.0.0.1}
API_PORT=${API_PORT:-5080}
WEB_PORT=${WEB_PORT:-5173}
FAKE_STRIPE_PORT=${FAKE_STRIPE_PORT:-12111}
export SMTP_SINK_PORT=${SMTP_SINK_PORT:-2525}
export SMTP_SINK_HTTP_PORT=${SMTP_SINK_HTTP_PORT:-2580}
mysql -h"$MYSQL_HOST" -umastemy -pmastemy_dev_pw -e "DROP DATABASE IF EXISTS $DB; CREATE DATABASE $DB CHARACTER SET utf8mb4;" 2>/dev/null
export ASPNETCORE_ENVIRONMENT=Development
export ASPNETCORE_URLS=http://localhost:$API_PORT
export ConnectionStrings__Default="Server=$MYSQL_HOST;Port=3306;Database=$DB;User=mastemy;Password=mastemy_dev_pw;"
export RateLimits__AuthPerMinute=${RateLimits__AuthPerMinute:-600}
export Stripe__SecretKey=sk_test_e2e
export Stripe__WebhookSecret=whsec_e2e_secret
export Stripe__ApiBaseUrl=http://localhost:$FAKE_STRIPE_PORT
export Stripe__SuccessUrl=http://localhost:$WEB_PORT/me?checkout=success
export Stripe__CancelUrl=http://localhost:$WEB_PORT/me?checkout=cancel
# Uploaded resources go to a throwaway directory, never into the source tree.
export Resources__RootPath=${Resources__RootPath:-${TMPDIR:-/tmp}/mastemy-e2e-resources-$DB}
# Email goes to the local sink (plain SMTP, no TLS); links point at the web app; the outbox polls every second.
export Email__SmtpHost=127.0.0.1
export Email__SmtpPort=$SMTP_SINK_PORT
export Email__EnableSsl=false
export Email__From=no-reply@e2e.mastemy.test
export Email__PublicBaseUrl=http://localhost:$WEB_PORT
export Email__PollIntervalSeconds=1
# Privileged roles need MFA (the default); the e2e helpers enroll and answer TOTP challenges.
export Security__RequireMfaForPrivileged=${Security__RequireMfaForPrivileged:-true}

SINK_PID=""
if ! (exec 3<>"/dev/tcp/127.0.0.1/$SMTP_SINK_HTTP_PORT") 2>/dev/null; then
  node e2e/smtp-sink.mjs &
  SINK_PID=$!
fi
API_PID=""
cleanup() {
  [ -n "$API_PID" ] && kill "$API_PID" 2>/dev/null || true
  [ -n "$SINK_PID" ] && kill "$SINK_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM
dotnet run --project src/Mastemy.Api --no-launch-profile ${API_CONFIGURATION:+-c $API_CONFIGURATION} &
API_PID=$!
wait "$API_PID"
