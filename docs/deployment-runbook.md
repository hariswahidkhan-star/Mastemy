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
docker compose exec db sh -c 'mysqldump --single-transaction --routines --triggers -u root -p"$MYSQL_ROOT_PASSWORD" mastemy' | gzip > mastemy-$(date +%F).sql.gz
tar czf resources-$(date +%F).tar.gz --exclude='*.mp4' --exclude='*.mov' --exclude='*.mkv' --exclude='*.webm' <resources-dir>
```

Store copies off-host, encrypted. Test a restore at least monthly.

### Resource files backup

- The resources directory is `Resources:RootPath` (default `data/resources` under the API content root). It is part of every backup, together with the MySQL dump, and must be on a persistent volume.
- Blobs are content-addressed: `<root>/<sha[0..2]>/<sha[2..4]>/<sha256>`; the `ResourceFiles` table maps them to courses, lessons and display names. Back up the database and the directory from the same point in time; a blob without a row is harmless, a row without a blob returns 404 on download.
- `<root>/.staging/` holds in-flight uploads only and need not be backed up.
- Video and audio are never present: uploads are refused by extension and by magic bytes (`video_not_allowed`); lesson videos live on YouTube. The `--exclude` patterns above are a second line of defence; any video file found in this directory is an incident.
- Size is bounded by `Resources:PerCourseQuotaBytes` per course and `Resources:MaxFileBytes` per file.

## Restore

```bash
gunzip -c mastemy-YYYY-MM-DD.sql.gz | docker compose exec -T db sh -c 'mysql -u root -p"$MYSQL_ROOT_PASSWORD" mastemy'
tar xzf resources-YYYY-MM-DD.tar.gz -C <resources-dir>
```

Then start the API and verify: login, a course page, a lesson player, a certificate verification lookup.

## Rollback

1. Stop traffic (or put the app in maintenance).
2. Redeploy the previous image tag.
3. If the failed release ran a migration that is not backward-compatible, restore the pre-deploy database backup (loses writes since backup; reconcile Stripe events by replaying webhooks from the Stripe dashboard).
4. Verify health and smoke tests; record the incident.

## Stripe webhook

Point Stripe to `https://<host>/api/...webhook` (check route in code). Webhooks are signature-verified and deduplicated; replay is safe.
