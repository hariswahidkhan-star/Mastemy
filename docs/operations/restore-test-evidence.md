# Restore-test evidence

Drill run on 2026-10-02 against the local development MySQL 8 server (`127.0.0.1:3306`). The source was the populated
end-to-end database `mastemy_e2e_w2` (56 tables, 1031 rows, 12 resource files) and its resources
directory. Command:

```bash
MYSQL_PASSWORD=*** MYSQL_DATABASE=mastemy_e2e_w2 \
RESOURCES_DIR=/tmp/mastemy-e2e-resources-mastemy_e2e_w2 scripts/restore-test.sh
```

The script took a fresh backup with `scripts/backup.sh`. It restored that backup with `scripts/restore.sh` into the scratch
database `mastemy_restoretest_<timestamp>` and a temporary resources directory, then ran the integrity checks. At the end
it dropped the scratch database and deleted the directory.

## Output (verbatim; scratchpad paths shortened to `$TMP`)

```
== Mastemy restore drill 2026-10-02T00:54:56Z
source db: mastemy_e2e_w2 @ 127.0.0.1:3306; source resources: /tmp/mastemy-e2e-resources-mastemy_e2e_w2
[backup] dumping database mastemy_e2e_w2 from 127.0.0.1:3306
[backup] archiving resources from /tmp/mastemy-e2e-resources-mastemy_e2e_w2 (excluding .staging and video/audio)
[backup] done: 88K in $TMP/mastemy-restoretest.JMZbtb/backups/mastemy-20261002T005456Z
backup set: $TMP/mastemy-restoretest.JMZbtb/backups/mastemy-20261002T005456Z (fresh)
manifest: { "createdAtUtc": "20261002T005456Z", "database": "mastemy_e2e_w2", "tables": 56, "resourceFiles": 12, "excludedVideoOrAudioFiles": 0, "tool": "scripts/backup.sh"}
backup size: db=72K resources=4.0K
[restore] verifying checksums in $TMP/mastemy-restoretest.JMZbtb/backups/mastemy-20261002T005456Z
[restore] recreating database mastemy_restoretest_20261002005455
[restore] restoring resources into $TMP/mastemy-restoretest.JMZbtb/resources
[restore] done
restored into db=mastemy_restoretest_20261002005455 resources=$TMP/mastemy-restoretest.JMZbtb/resources
-- check 1: row counts (source vs restored)
tables compared: 56, total rows: 1031, mismatches: 0
-- check 2: resource blobs vs ResourceFiles.Sha256
resource rows: 12, verified: 12, hash mismatches: 0, missing after restore: 0, absent in source: 0, invalid keys: 0
-- check 3: no video/audio in restored resources
video/audio files restored: 0
RESULT: PASS (restore drill completed in 12s)
```

## Negative checks (same day)

A copy of the resources directory was seeded with `lecture.MP4` and an in-flight `.staging/a.part`. After the backup, the
set's `db.sql.gz` was tampered with:

```
$ scripts/backup.sh   # resources dir seeded with lecture.MP4 and a .staging/*.part file
[backup] WARNING: 1 video/audio file(s) found in resources dir and excluded; investigate
  "excludedVideoOrAudioFiles": 1,
archive entries matching mp4|staging: 0
$ scripts/restore.sh <set>   # after appending bytes to db.sql.gz
[restore] verifying checksums in $TMP/neg/b/mastemy-20261002T005527Z
db.sql.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
checksum verification FAILED; refusing to restore
rc=1
scratch db created: 0
```

The backup left out the video/audio file and the staging file, and reported the excluded file. The restore refused the
corrupted set before it created any database.

## What this proves and what it does not

* **Proven:**
  * The dump is transactionally consistent and complete for every table.
  * The resource archive restores every blob referenced by `ResourceFiles` byte for byte: each restored file's SHA-256
    equals its `Sha256` column.
  * Checksums are verified before a restore starts.
* **Not proven:**
  * Timing at production size (RTO). Repeat the drill on a production-sized copy.
  * Off-host copying and encryption. These are handled by the operator's cron wrapper.
  * DataProtection key restore. Copy `/app/data/keys` with every backup set, and after a restore check that a YouTube
    channel token still decrypts.
* **In CI:** the drill runs again after the Playwright suite, against the `mastemy_e2e` database that the suite has just
  exercised (`.github/workflows/ci.yml`, step "Backup/restore drill").
