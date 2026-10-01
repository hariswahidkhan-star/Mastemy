#!/usr/bin/env bash
# Starts the API against a freshly recreated database, with Stripe pointed at the local fake.
set -euo pipefail
cd "$(dirname "$0")/.."
DB=${E2E_DB:-mastemy_e2e}
MYSQL_HOST=${MYSQL_HOST:-127.0.0.1}
mysql -h"$MYSQL_HOST" -umastemy -pmastemy_dev_pw -e "DROP DATABASE IF EXISTS $DB; CREATE DATABASE $DB CHARACTER SET utf8mb4;" 2>/dev/null
export ASPNETCORE_ENVIRONMENT=Development
export ASPNETCORE_URLS=http://localhost:5080
export ConnectionStrings__Default="Server=$MYSQL_HOST;Port=3306;Database=$DB;User=mastemy;Password=mastemy_dev_pw;"
export RateLimits__AuthPerMinute=${RateLimits__AuthPerMinute:-600}
export Stripe__SecretKey=sk_test_e2e
export Stripe__WebhookSecret=whsec_e2e_secret
export Stripe__ApiBaseUrl=http://localhost:12111
exec dotnet run --project src/Mastemy.Api --no-launch-profile ${API_CONFIGURATION:+-c $API_CONFIGURATION}
