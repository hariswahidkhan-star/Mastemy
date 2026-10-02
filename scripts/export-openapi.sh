#!/usr/bin/env bash
# Regenerates docs/openapi.json from the running API (MapOpenApi at /openapi/v1.json).
#   scripts/export-openapi.sh            write docs/openapi.json
#   scripts/export-openapi.sh --check    exit 1 if docs/openapi.json is out of date (used by CI)
# The API is started on a loopback port with throwaway settings; generating the document does not touch the database.
set -euo pipefail
cd "$(dirname "$0")/.."
mode=${1:-write}
out=docs/openapi.json
port=${OPENAPI_PORT:-5199}
config=${API_CONFIGURATION:-Release}

command -v jq >/dev/null || { echo "jq is required" >&2; exit 2; }
dotnet build src/Mastemy.Api -c "$config" -nologo -v q >/dev/null

tmp=$(mktemp -d)
log="$tmp/api.log"
(
  export ASPNETCORE_ENVIRONMENT=Production
  export ASPNETCORE_URLS="http://127.0.0.1:$port"
  export ConnectionStrings__Default="Server=127.0.0.1;Port=1;Database=openapi_export;User=none;Password=none;"
  export Jwt__Key="openapi-export-only-key-not-a-secret-0123456789"
  export Database__MigrateOnStartup=false
  export Resources__RootPath="$tmp/resources"
  exec dotnet "src/Mastemy.Api/bin/$config/net10.0/Mastemy.Api.dll" --contentRoot "$PWD/src/Mastemy.Api"
) >"$log" 2>&1 &
pid=$!
trap 'kill $pid 2>/dev/null || true; wait $pid 2>/dev/null || true; rm -rf "$tmp"' EXIT

for _ in $(seq 1 60); do
  if curl -sf "http://127.0.0.1:$port/openapi/v1.json" -o "$tmp/raw.json"; then break; fi
  kill -0 $pid 2>/dev/null || { cat "$log" >&2; echo "API exited before serving OpenAPI" >&2; exit 1; }
  sleep 1
done
[ -s "$tmp/raw.json" ] || { cat "$log" >&2; echo "timed out waiting for /openapi/v1.json" >&2; exit 1; }

# Stable output: sorted keys, server URLs removed (they reflect the export port, not the deployment).
jq -S 'del(.servers)' "$tmp/raw.json" > "$tmp/openapi.json"

if [ "$mode" = "--check" ]; then
  if ! diff -q "$tmp/openapi.json" "$out" >/dev/null 2>&1; then
    echo "docs/openapi.json is out of date. Run scripts/export-openapi.sh and commit the result." >&2
    diff -u "$out" "$tmp/openapi.json" | head -60 >&2 || true
    exit 1
  fi
  echo "docs/openapi.json is up to date."
else
  cp "$tmp/openapi.json" "$out"
  echo "wrote $out ($(jq '.paths | length' "$out") paths)"
fi
