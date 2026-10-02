# Deployment Runbook

Verify paths and service names against `docker-compose.yml` and the API project before use; adjust if they differ.

## Environment variables

ASP.NET Core maps `__` to configuration sections.

| Variable | Required | Purpose |
|---|---|---|
| `ConnectionStrings__Default` | Yes | MySQL, e.g. `Server=db;Port=3306;Database=mastemy;User=mastemy;Password=...;CharSet=utf8mb4` |
| `Jwt__Key` | Yes | Signing key, ≥ 32 random bytes; rotate invalidates sessions |
| `Stripe__SecretKey` | For payments | Server-only secret key |
| `Stripe__WebhookSecret` | For payments | Endpoint signing secret (`whsec_...`) |
| `YouTube__ApiKey` | Optional | Metadata validation; without it, manual metadata entry |
| `YouTube__OAuthClientId` / `YouTube__OAuthClientSecret` | Optional | Only for the flagged uploader / channel connections |
| `Features__*` | Optional | Initial flag defaults, e.g. `Features__YouTubeApiUploadsEnabled=false`; runtime changes are made by SuperAdmin and audited |

Never commit secrets; supply via the host's secret store or an untracked `.env`.

## Local / single-host deployment

```bash
cp .env.example .env      # fill secrets
docker compose up -d --build
docker compose logs -f api
```

## Migrations

```bash
dotnet tool restore
dotnet ef database update --project src/Mastemy.Api
# production: generate an idempotent script, review, then apply
dotnet ef migrations script --idempotent --project src/Mastemy.Api -o migrate.sql
```

Back up the database before applying any migration.

## Backup

Backups contain MySQL and the non-video resources directory only. There are no video files to back up; if any appear in the resources directory, treat it as an incident.

```bash
MYSQL_HOST=127.0.0.1 MYSQL_PASSWORD=... MYSQL_DATABASE=mastemy \
RESOURCES_DIR=/path/to/appdata/resources BACKUP_DIR=/srv/backups RETENTION_DAYS=14 scripts/backup.sh
```

`scripts/backup.sh` writes `mastemy-<UTC>/{db.sql.gz, resources.tar.gz, manifest.json, SHA256SUMS}`. It uses `mysqldump --single-transaction` (a consistent snapshot without locking InnoDB tables) and fails if the dump is incomplete. It excludes `.staging/` and any video/audio file by extension (the manifest counts exclusions and the script warns) and deletes sets older than `RETENTION_DAYS`. The password is passed via `MYSQL_PWD`, never argv. Copy each set off-host, encrypted, together with the DataProtection key directory (`/app/data/keys`). Run `scripts/restore-test.sh` at least monthly and after every migration (see `operations/runbook.md` §6 and `operations/restore-test-evidence.md`).

### Resource files backup

- The resources directory is `Resources:RootPath` (default `data/resources` under the API content root). It is part of every backup, together with the MySQL dump, and must be on a persistent volume.
- Blobs are content-addressed: `<root>/<course-id>/<sha[0..2]>/<sha[2..4]>/<sha256>` (legacy: `<root>/<sha[0..2]>/<sha[2..4]>/<sha256>`); the `ResourceFiles` table maps them to courses, lessons and display names. Back up the database and the directory from the same point in time; a blob without a row is harmless, a row without a blob returns 404 on download.
- `<root>/.staging/` holds in-flight uploads only and need not be backed up.
- Video and audio are never present: uploads are refused by extension and by magic bytes (`video_not_allowed`); lesson videos live on YouTube. The extension guard in `scripts/backup.sh` is a second line of defence; any video file found in this directory is an incident.
- Size is bounded by `Resources:PerCourseQuotaBytes` per course and `Resources:MaxFileBytes` per file.

## Restore

```bash
docker compose stop api
MYSQL_PASSWORD=... RESTORE_DATABASE=mastemy RESTORE_RESOURCES_DIR=/path/to/appdata/resources FORCE=1 \
  scripts/restore.sh /srv/backups/mastemy-YYYYMMDDTHHMMSSZ
docker compose start api
```

`restore.sh` verifies `SHA256SUMS` before touching anything and refuses to overwrite a non-empty database or directory without `FORCE=1`. It swaps the resources directory atomically.

Then verify `/health/ready` and smoke-test: login, a course page, a lesson player, a resource download and a certificate verification lookup.

## Health, observability and scanning

| Variable | Default | Purpose |
|---|---|---|
| `Logging__Json` | false | JSON console logs with scopes (CorrelationId) |
| `Otel__Endpoint` | unset (off) | OTLP collector URL; enables tracing + metrics export |
| `Otel__Protocol` / `Otel__Headers` / `Otel__ServiceName` / `Otel__TraceSampleRatio` | grpc / – / mastemy-api / 1.0 | exporter options |
| `Scanning__ClamAvHost` / `Scanning__ClamAvPort` | unset / 3310 | clamd for resource uploads (`docker compose --profile scanning up -d`, host `clamav`) |
| `Scanning__Mode` | Required if host set, else Optional | Required: uploads fail 503 when the scanner is down |
| `Operations__OutboxDegradedMinutes` / `Operations__OverdueContentMonths` | 15 / 12 | readiness threshold / overdue-content queue |
| `Trust__ComplaintsPerHourPerIp` / `Trust__HeldEarningsSweepMinutes` | 10 / 10 | complaint rate limit / held-earnings sweep |

Probes: `/health/live` (liveness) and `/health/ready` (dependencies; 503 when Unhealthy; details only for Staff). Every response carries `X-Correlation-Id`.

## OpenAPI

`docs/openapi.json` is generated from the running API: run `scripts/export-openapi.sh` after any endpoint change and commit the result. CI runs `scripts/export-openapi.sh --check`.

## Rollback

1. Stop traffic (or put the app in maintenance).
2. Redeploy the previous image tag.
3. If the failed release ran a migration that is not backward-compatible, restore the pre-deploy database backup (loses writes since backup; reconcile Stripe events by replaying webhooks from the Stripe dashboard).
4. Verify health and smoke tests; record the incident.

## Stripe webhook

Point Stripe to `https://<host>/api/...webhook` (check route in code). Webhooks are signature-verified and deduplicated; replay is safe.
