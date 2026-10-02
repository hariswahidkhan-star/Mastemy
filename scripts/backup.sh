#!/usr/bin/env bash
# Mastemy backup: consistent MySQL dump + resource-file archive, with checksums and retention (spec §3).
#
# Video is never backed up: Mastemy stores no video, and as defence in depth any file with a video/audio
# extension, plus the transient upload staging area, is excluded from the archive and counted in the manifest.
#
# Configuration (environment):
#   MYSQL_HOST (127.0.0.1) MYSQL_PORT (3306) MYSQL_USER (mastemy) MYSQL_PASSWORD (required) MYSQL_DATABASE (mastemy)
#   RESOURCES_DIR   resource blob root (Resources:RootPath)            default: ./src/Mastemy.Api/data/resources
#   BACKUP_DIR      where backup sets are written                      default: ./backups
#   RETENTION_DAYS  backup sets older than this are deleted (0 = keep) default: 14
# Output: $BACKUP_DIR/mastemy-<UTC timestamp>/{db.sql.gz,resources.tar.gz,manifest.json,SHA256SUMS}
# Prints the backup set path on the last line of stdout.
set -euo pipefail
umask 077

MYSQL_HOST=${MYSQL_HOST:-127.0.0.1}
MYSQL_PORT=${MYSQL_PORT:-3306}
MYSQL_USER=${MYSQL_USER:-mastemy}
MYSQL_DATABASE=${MYSQL_DATABASE:-mastemy}
RESOURCES_DIR=${RESOURCES_DIR:-./src/Mastemy.Api/data/resources}
BACKUP_DIR=${BACKUP_DIR:-./backups}
RETENTION_DAYS=${RETENTION_DAYS:-14}
: "${MYSQL_PASSWORD:?MYSQL_PASSWORD must be set}"
export MYSQL_PWD="$MYSQL_PASSWORD" # never on the command line (visible in ps)

[[ "$MYSQL_DATABASE" =~ ^[A-Za-z0-9_]+$ ]] || { echo "invalid MYSQL_DATABASE" >&2; exit 2; }
[[ "$RETENTION_DAYS" =~ ^[0-9]+$ ]] || { echo "RETENTION_DAYS must be a non-negative integer" >&2; exit 2; }

VIDEO_EXT_RE='.*\.(mp4|m4v|mov|avi|mkv|webm|wmv|flv|mpg|mpeg|3gp|ts|mts|m2ts|ogv|mp3|wav|aac|m4a|flac|ogg|opus)$'

stamp=$(date -u +%Y%m%dT%H%M%SZ)
dest="$BACKUP_DIR/mastemy-$stamp"
mkdir -p "$dest"
trap 'rc=$?; if [ $rc -ne 0 ]; then echo "backup failed (rc=$rc); removing partial set $dest" >&2; rm -rf "$dest"; fi' EXIT

echo "[backup] dumping database $MYSQL_DATABASE from $MYSQL_HOST:$MYSQL_PORT" >&2
mysqldump -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USER" \
  --single-transaction --quick --routines --triggers --events --no-tablespaces \
  --hex-blob --default-character-set=utf8mb4 --set-gtid-purged=OFF \
  "$MYSQL_DATABASE" | gzip -9 > "$dest/db.sql.gz"
# A dump that did not finish has no completion trailer.
gzip -dc "$dest/db.sql.gz" | tail -n 1 | grep -q "Dump completed" || { echo "mysqldump output incomplete" >&2; exit 1; }

files=0; excluded=0
if [ -d "$RESOURCES_DIR" ]; then
  echo "[backup] archiving resources from $RESOURCES_DIR (excluding .staging and video/audio)" >&2
  excluded=$(cd "$RESOURCES_DIR" && find . -type f ! -path './.staging/*' -regextype posix-extended -iregex "$VIDEO_EXT_RE" | wc -l)
  (cd "$RESOURCES_DIR" && find . -type f ! -path './.staging/*' ! -name '*.probe' -regextype posix-extended ! -iregex "$VIDEO_EXT_RE" -print0 \
     | LC_ALL=C sort -z | tar --null --no-recursion -T - -czf -) > "$dest/resources.tar.gz"
  files=$(tar -tzf "$dest/resources.tar.gz" | grep -vc '/$' || true)
else
  echo "[backup] WARNING: resources dir $RESOURCES_DIR not found; archiving nothing" >&2
  tar -czf "$dest/resources.tar.gz" -T /dev/null
fi

tables=$(mysql -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USER" -N -e \
  "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='$MYSQL_DATABASE' AND table_type='BASE TABLE'")
cat > "$dest/manifest.json" <<JSON
{
  "createdAtUtc": "$stamp",
  "database": "$MYSQL_DATABASE",
  "tables": $tables,
  "resourceFiles": $files,
  "excludedVideoOrAudioFiles": $excluded,
  "tool": "scripts/backup.sh"
}
JSON
(cd "$dest" && sha256sum db.sql.gz resources.tar.gz manifest.json > SHA256SUMS)
[ "$excluded" -eq 0 ] || echo "[backup] WARNING: $excluded video/audio file(s) found in resources dir and excluded; investigate" >&2

if [ "$RETENTION_DAYS" -gt 0 ]; then
  find "$BACKUP_DIR" -maxdepth 1 -type d -name 'mastemy-*' -mtime +"$RETENTION_DAYS" -print -exec rm -rf {} + >&2 || true
fi
trap - EXIT
echo "[backup] done: $(du -sh "$dest" | cut -f1) in $dest" >&2
echo "$dest"
