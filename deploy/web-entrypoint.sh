#!/bin/sh
# Runs the Node SSR renderer and nginx together; exits (so the orchestrator restarts us) if either dies.
set -eu
: "${PUBLIC_BASE_URL:?PUBLIC_BASE_URL must be set (absolute public origin, e.g. https://mastemy.com)}"

su -s /bin/sh nginx -c "exec /usr/local/bin/node /app/dist-server/main.js" &
SSR=$!
nginx -g 'daemon off;' &
NGINX=$!

trap 'kill -TERM $SSR $NGINX 2>/dev/null; wait' TERM INT
while kill -0 "$SSR" 2>/dev/null && kill -0 "$NGINX" 2>/dev/null; do sleep 5; done
echo "web: a child process exited; stopping container" >&2
kill -TERM "$SSR" "$NGINX" 2>/dev/null || true
exit 1
