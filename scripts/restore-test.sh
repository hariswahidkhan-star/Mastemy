#!/usr/bin/env bash
# Restore drill: back up the source (or use a given backup set), restore it into a scratch database and a temp
# resources directory, then verify integrity:
#   1. every table's row count in the restore equals the source;
#   2. every ResourceFiles row whose blob exists in the source has a restored blob whose SHA-256 equals the
#      database Sha256 column (per-course keys "{course}/{sha}" and legacy bare-digest keys are both handled);
#   3. no video/audio file is present in the restored resources.
# Exit 0 only when all checks pass. Scratch DB and temp dir are removed unless KEEP=1.
#   scripts/restore-test.sh [existing-backup-set-dir]
# Environment: as backup.sh (MYSQL_*, RESOURCES_DIR, BACKUP_DIR); SCRATCH_DATABASE optional.
set -euo pipefail
umask 077
here=$(cd "$(dirname "$0")" && pwd)

MYSQL_HOST=${MYSQL_HOST:-127.0.0.1}
MYSQL_PORT=${MYSQL_PORT:-3306}
MYSQL_USER=${MYSQL_USER:-mastemy}
MYSQL_DATABASE=${MYSQL_DATABASE:-mastemy}
RESOURCES_DIR=${RESOURCES_DIR:-./src/Mastemy.Api/data/resources}
: "${MYSQL_PASSWORD:?MYSQL_PASSWORD must be set}"
export MYSQL_PWD="$MYSQL_PASSWORD"
SCRATCH_DATABASE=${SCRATCH_DATABASE:-mastemy_restoretest_$(date -u +%Y%m%d%H%M%S)}
[[ "$SCRATCH_DATABASE" =~ ^mastemy_restoretest_[A-Za-z0-9_]+$ ]] || { echo "SCRATCH_DATABASE must start with mastemy_restoretest_" >&2; exit 2; }
[ "$SCRATCH_DATABASE" != "$MYSQL_DATABASE" ] || { echo "scratch DB must differ from source" >&2; exit 2; }

mysql_() { mysql -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USER" -N -B "$@"; }
work=$(mktemp -d "${TMPDIR:-/tmp}/mastemy-restoretest.XXXXXX")
cleanup() {
  if [ "${KEEP:-0}" != "1" ]; then
    mysql_ -e "DROP DATABASE IF EXISTS \`$SCRATCH_DATABASE\`" || true
    rm -rf "$work"
  else
    echo "[restore-test] KEEP=1: scratch DB $SCRATCH_DATABASE and $work retained" >&2
  fi
}
trap cleanup EXIT

started=$(date -u +%s)
echo "== Mastemy restore drill $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo "source db: $MYSQL_DATABASE @ $MYSQL_HOST:$MYSQL_PORT; source resources: $RESOURCES_DIR"

if [ $# -ge 1 ]; then
  set_dir=$1
  echo "backup set: $set_dir (given)"
else
  set_dir=$(BACKUP_DIR="$work/backups" RETENTION_DAYS=0 "$here/backup.sh")
  echo "backup set: $set_dir (fresh)"
fi
echo "manifest: $(tr -d '\n' < "$set_dir/manifest.json" | tr -s ' ')"
echo "backup size: db=$(du -h "$set_dir/db.sql.gz" | cut -f1) resources=$(du -h "$set_dir/resources.tar.gz" | cut -f1)"

restored_res="$work/resources"
RESTORE_DATABASE="$SCRATCH_DATABASE" RESTORE_RESOURCES_DIR="$restored_res" FORCE=0 "$here/restore.sh" "$set_dir"
echo "restored into db=$SCRATCH_DATABASE resources=$restored_res"

fail=0

echo "-- check 1: row counts (source vs restored)"
tables=$(mysql_ -e "SELECT table_name FROM information_schema.tables WHERE table_schema='$MYSQL_DATABASE' AND table_type='BASE TABLE' ORDER BY table_name")
ntables=0; nrows=0
for t in $tables; do
  [[ "$t" =~ ^[A-Za-z0-9_]+$ ]] || { echo "skip odd table name"; continue; }
  src=$(mysql_ -e "SELECT COUNT(*) FROM \`$MYSQL_DATABASE\`.\`$t\`")
  dst=$(mysql_ -e "SELECT COUNT(*) FROM \`$SCRATCH_DATABASE\`.\`$t\`" 2>/dev/null || echo "MISSING")
  ntables=$((ntables+1)); nrows=$((nrows+src))
  if [ "$src" != "$dst" ]; then echo "MISMATCH $t: source=$src restored=$dst"; fail=1; fi
done
echo "tables compared: $ntables, total rows: $nrows, mismatches: $([ $fail -eq 0 ] && echo 0 || echo 'see above')"

echo "-- check 2: resource blobs vs ResourceFiles.Sha256"
blob_path() { # $1 root, $2 storage key
  local key=$2 course sha
  if [[ "$key" =~ ^([0-9a-f]{32})/([0-9a-f]{64})$ ]]; then course=${BASH_REMATCH[1]}; sha=${BASH_REMATCH[2]}; echo "$1/$course/${sha:0:2}/${sha:2:2}/$sha"
  elif [[ "$key" =~ ^([0-9a-f]{64})$ ]]; then sha=${BASH_REMATCH[1]}; echo "$1/${sha:0:2}/${sha:2:2}/$sha"
  else echo ""; fi
}
checked=0; ok=0; missing_src=0; missing_dst=0; bad=0; badkey=0
has_table=$(mysql_ -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='$SCRATCH_DATABASE' AND table_name='ResourceFiles'")
if [ "$has_table" = "1" ]; then
  while IFS=$'\t' read -r id key sha; do
    [ -n "$id" ] || continue
    checked=$((checked+1))
    p_src=$(blob_path "$RESOURCES_DIR" "$key"); p_dst=$(blob_path "$restored_res" "$key")
    if [ -z "$p_dst" ]; then badkey=$((badkey+1)); echo "BAD KEY resource $id"; fail=1; continue; fi
    if [ ! -f "$p_src" ]; then missing_src=$((missing_src+1)); continue; fi # not in source either: not a restore defect
    if [ ! -f "$p_dst" ]; then missing_dst=$((missing_dst+1)); echo "MISSING after restore: resource $id"; fail=1; continue; fi
    actual=$(sha256sum "$p_dst" | cut -d' ' -f1)
    if [ "$actual" = "$(echo "$sha" | tr 'A-F' 'a-f')" ]; then ok=$((ok+1)); else bad=$((bad+1)); echo "HASH MISMATCH resource $id"; fail=1; fi
  done < <(mysql_ -e "SELECT Id, StorageKey, Sha256 FROM \`$SCRATCH_DATABASE\`.ResourceFiles ORDER BY Id")
fi
echo "resource rows: $checked, verified: $ok, hash mismatches: $bad, missing after restore: $missing_dst, absent in source: $missing_src, invalid keys: $badkey"

echo "-- check 3: no video/audio in restored resources"
videos=$(find "$restored_res" -type f -regextype posix-extended -iregex '.*\.(mp4|m4v|mov|avi|mkv|webm|wmv|flv|mpg|mpeg|3gp|ts|mts|m2ts|ogv|mp3|wav|aac|m4a|flac|ogg|opus)$' | wc -l)
echo "video/audio files restored: $videos"; [ "$videos" -eq 0 ] || fail=1

elapsed=$(( $(date -u +%s) - started ))
if [ $fail -eq 0 ]; then echo "RESULT: PASS (restore drill completed in ${elapsed}s)"; else echo "RESULT: FAIL (${elapsed}s)"; fi
exit $fail
