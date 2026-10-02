#!/usr/bin/env bash
# Restores a backup set produced by scripts/backup.sh.
#   scripts/restore.sh <backup-set-dir>
# Environment:
#   MYSQL_HOST/MYSQL_PORT/MYSQL_USER/MYSQL_PASSWORD   target server
#   RESTORE_DATABASE        target database (default: mastemy)
#   RESTORE_RESOURCES_DIR   target resources root (default: ./src/Mastemy.Api/data/resources)
#   FORCE=1                 required to overwrite a non-empty database or resources dir
# Checksums are verified before anything is touched. The API must be stopped (or in maintenance) while restoring.
set -euo pipefail
umask 077

set_dir=${1:?usage: restore.sh <backup-set-dir>}
MYSQL_HOST=${MYSQL_HOST:-127.0.0.1}
MYSQL_PORT=${MYSQL_PORT:-3306}
MYSQL_USER=${MYSQL_USER:-mastemy}
RESTORE_DATABASE=${RESTORE_DATABASE:-mastemy}
RESTORE_RESOURCES_DIR=${RESTORE_RESOURCES_DIR:-./src/Mastemy.Api/data/resources}
FORCE=${FORCE:-0}
: "${MYSQL_PASSWORD:?MYSQL_PASSWORD must be set}"
export MYSQL_PWD="$MYSQL_PASSWORD"
[[ "$RESTORE_DATABASE" =~ ^[A-Za-z0-9_]+$ ]] || { echo "invalid RESTORE_DATABASE" >&2; exit 2; }

mysql_() { mysql -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USER" "$@"; }

echo "[restore] verifying checksums in $set_dir" >&2
(cd "$set_dir" && sha256sum --quiet -c SHA256SUMS) || { echo "checksum verification FAILED; refusing to restore" >&2; exit 1; }

existing=$(mysql_ -N -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='$RESTORE_DATABASE'")
if [ "$existing" -gt 0 ] && [ "$FORCE" != "1" ]; then
  echo "database $RESTORE_DATABASE has $existing tables; set FORCE=1 to replace it" >&2; exit 1
fi
if [ -d "$RESTORE_RESOURCES_DIR" ] && [ -n "$(ls -A "$RESTORE_RESOURCES_DIR" 2>/dev/null)" ] && [ "$FORCE" != "1" ]; then
  echo "resources dir $RESTORE_RESOURCES_DIR is not empty; set FORCE=1 to replace it" >&2; exit 1
fi

echo "[restore] recreating database $RESTORE_DATABASE" >&2
mysql_ -e "DROP DATABASE IF EXISTS \`$RESTORE_DATABASE\`; CREATE DATABASE \`$RESTORE_DATABASE\` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;"
gzip -dc "$set_dir/db.sql.gz" | mysql_ --default-character-set=utf8mb4 "$RESTORE_DATABASE"

echo "[restore] restoring resources into $RESTORE_RESOURCES_DIR" >&2
if [ -d "$RESTORE_RESOURCES_DIR" ]; then
  # Restore into a sibling directory and swap, so a failed extract never leaves a half-restored tree.
  tmp="${RESTORE_RESOURCES_DIR%/}.restore-$$"
  mkdir -p "$tmp"
  tar -xzf "$set_dir/resources.tar.gz" -C "$tmp" --no-same-owner
  old="${RESTORE_RESOURCES_DIR%/}.old-$$"
  mv "$RESTORE_RESOURCES_DIR" "$old" && mv "$tmp" "$RESTORE_RESOURCES_DIR" && rm -rf "$old"
else
  mkdir -p "$RESTORE_RESOURCES_DIR"
  tar -xzf "$set_dir/resources.tar.gz" -C "$RESTORE_RESOURCES_DIR" --no-same-owner
fi
echo "[restore] done" >&2
