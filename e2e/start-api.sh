#!/usr/bin/env bash
# Starts the API against a freshly recreated database, with Stripe pointed at the local fake.
# Defaults match CI (API :5080, web :5173, fake Stripe :12111); override API_PORT / WEB_PORT /
# FAKE_STRIPE_PORT / E2E_DB to run a second stack side by side.
set -euo pipefail
cd "$(dirname "$0")/.."
DB=${E2E_DB:-mastemy_e2e}
MYSQL_HOST=${MYSQL_HOST:-127.0.0.1}
API_PORT=${API_PORT:-5080}
WEB_PORT=${WEB_PORT:-5173}
FAKE_STRIPE_PORT=${FAKE_STRIPE_PORT:-12111}
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
exec dotnet run --project src/Mastemy.Api --no-launch-profile ${API_CONFIGURATION:+-c $API_CONFIGURATION}
