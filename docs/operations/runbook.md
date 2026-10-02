# Operations Runbook

Scope: the single-host deployment in `docker-compose.yml` (MySQL, API, web/SSR, optional ClamAV). Verify service names and
paths against the compose file before acting. Every staff action in the admin API is audited; record incident actions in the
incident log as well.

## 1. Signals

| Signal | Where | Meaning |
|---|---|---|
| `GET /health/live` | anonymous; Docker healthcheck on `api` and `web` | process up. Failing → container restarts |
| `GET /health/ready` | anonymous gets `{status}`; Staff token gets per-check detail | `mysql`, `resource_storage`, `email_outbox`, `malware_scanner`. 503 = Unhealthy |
| `X-Correlation-Id` | every response; nginx sets it from `$request_id` for `/api/` | quote it in support tickets; search logs by `CorrelationId` |
| Structured logs | `Logging__Json=true` → one JSON object per line on stdout, with scopes (CorrelationId, trace ids) | ship stdout to the log store |
| Traces + metrics (OTLP) | set `Otel__Endpoint` (and `Otel__Protocol=grpc|http`, `Otel__Headers`, `Otel__ServiceName`, `Otel__TraceSampleRatio`) | ASP.NET Core, HttpClient (YouTube/Stripe/SMTP calls), .NET runtime, and `Mastemy` meter (`mastemy.malware_scans{verdict}`). Off when unset |

## 2. Alerts (recommended thresholds)

| Alert | Condition | Severity | First response |
|---|---|---|---|
| API down | `/health/live` fails 3× in 1 min | Page | §3.1 |
| Not ready | `/health/ready` 503 for 5 min | Page | read Staff detail; §3.2–3.4 |
| DB unreachable | `mysql` check Unhealthy | Page | §3.2 |
| Disk | `resource_storage` Degraded (< 512 MiB free) or host disk > 85% | Ticket → Page at 95% | §3.3 |
| Email backlog | `email_outbox` Degraded (oldest pending > `Operations__OutboxDegradedMinutes`, default 15) or dead-lettered > 0 | Ticket | §3.5 |
| Scanner down | `malware_scanner` Unhealthy (Required mode → uploads return 503) | Ticket (Page if instructors blocked) | §3.6 |
| 5xx rate | `http.server.request.duration` count with status 5xx > 2% for 10 min | Page | logs by CorrelationId |
| Latency | p95 `http.server.request.duration` > 1.5 s for 10 min | Ticket | traces |
| Malware detections | `mastemy.malware_scans{verdict="Infected"}` > 0 | Ticket | §5.3 |
| Payment webhooks | Stripe dashboard: failed deliveries > 0 for 30 min | Page | replay from Stripe (idempotent) |
| Backup | no new `backups/mastemy-*` set in 26 h, or `restore-test.sh` FAIL | Page | §6 |
| Broken videos | `GET /api/admin/operations/broken-links` non-empty | Daily review | §5.2 |

## 3. Incident handling

**Severity:** SEV1 = site down / data loss / payments broken / security breach; SEV2 = major feature down (uploads, emails, certificates); SEV3 = degraded.
**Roles:** incident lead (decides), operator (executes), communicator (status page / instructors / learners).
**Flow:** acknowledge → declare severity and open an incident log (UTC timestamps, actions, correlation ids) → stabilise (rollback beats forward-fix) → verify `/health/ready` and smoke tests → communicate resolution → blameless post-incident review within 5 working days with action items.
For a personal-data breach, also start the regulatory notification clock with the data-protection contact (jurisdiction-dependent; get qualified advice — do not assume a deadline).

1. **API down.** `docker compose ps`, `docker compose logs --tail 200 api`. Startup throws on missing `Jwt__Key`, `ConnectionStrings__Default`, invalid `Resources__*`, `Scanning__ClamAvPort` or `Otel__Endpoint`. Bad release → redeploy previous image tag (`deployment-runbook.md` → Rollback).
2. **MySQL.** `docker compose exec db mysqladmin ping`; check disk (`df -h`), `SHOW PROCESSLIST`, connection limit. Restore from backup only for data loss (§6), never for availability.
3. **Disk.** Resource blobs live in the `appdata` volume (`/app/data/resources`). Abandoned uploads in `.staging` are deleted on request completion; files older than a day there are safe to remove. Grow the volume; per-course quotas (`Resources__PerCourseQuotaBytes`) bound growth.
4. **Readiness degraded but serving.** Degraded does not remove the instance from rotation; fix within business hours.
5. **Email backlog.** Check SMTP credentials and provider status. Messages retry with exponential backoff up to 6 attempts; dead-lettered rows (`EmailOutbox.Attempts >= 6`, `SentAt IS NULL`) can be re-queued with `UPDATE EmailOutbox SET Attempts=0, NextAttemptAt=UTC_TIMESTAMP() WHERE …` after the cause is fixed.
6. **Scanner.** `docker compose --profile scanning ps clamav`, `docker compose logs clamav` (signature updates by freshclam). While it is down and `Scanning__Mode=Required`, uploads fail closed with 503 `scanning_unavailable` — keep it that way unless the incident lead accepts the risk of switching to `Optional` temporarily (record the decision; uploads made meanwhile are marked `NotScanned` and must be rescanned: list them with `SELECT * FROM Resources_ScanRecords WHERE Verdict='NotScanned'`).

## 4. Key rotation

Rotate on schedule (at least yearly), on staff departure with access, and immediately on suspected exposure. Store all secrets in the host secret store / untracked `.env`; never in git.

| Secret | Procedure | Impact |
|---|---|---|
| `Jwt__Key` | Generate ≥ 32 random bytes (`openssl rand -base64 48`), update, restart API. | All access tokens become invalid at once; clients refresh via refresh tokens (stored server-side, not signed with this key), so users stay signed in. On suspected compromise also revoke refresh tokens: `UPDATE RefreshTokens SET RevokedAt=UTC_TIMESTAMP() WHERE RevokedAt IS NULL` (forces re-login). |
| Data Protection keys (`DataProtection__KeysPath`, `/app/data/keys`) | Keys roll automatically every 90 days and old keys are kept for decryption. To force rotation: stop API, back up the key directory, add a new key by restarting with the old keys present (ASP.NET creates a new default key when the current one expires; to expire immediately, set the `expirationDate` of the current `key-*.xml` to now) then restart. **Never delete old keys**: YouTube OAuth refresh tokens are encrypted with them. On compromise: revoke and re-connect YouTube channels (below) after rotating, then delete compromised keys. Back up the key directory with every backup set. |
| Stripe (`Stripe__SecretKey`, `Stripe__WebhookSecret`) | Dashboard → roll secret key (keep the old one valid for a short overlap), update env, restart, verify a test checkout; webhook: add a new endpoint secret / roll it, update `Stripe__WebhookSecret`, restart, send a test event. | Webhooks signed with the old secret fail verification after the switch; Stripe retries, and processing is idempotent. |
| YouTube (`YouTube__ApiKey`, `YouTube__OAuthClientSecret`) | Google Cloud console → create new key/secret, restrict (API + referrer/IP), update env, restart, then delete the old one. Channel OAuth refresh tokens: revoke at https://myaccount.google.com/permissions for the channel account and reconnect via the channel connection flow. | API key swap is seamless. A new client secret does not invalidate refresh tokens; revoking them requires reconnecting channels. |
| SMTP / OTLP headers | provider console → new credential, update env, restart. | none |
| MySQL passwords | `ALTER USER 'mastemy'@'%' IDENTIFIED BY '…'`, update `MYSQL_PASSWORD` / connection string, restart API. | brief connection errors during restart |

## 5. Trust & safety procedures

### 5.1 Complaint / takedown (copyright, rights, abuse, privacy)
1. Triage `GET /api/admin/trust/complaints?status=Open` daily; copyright/privacy within 1 business day.
2. Check the evidence and the target. Decide: **Dismiss**, **Hide** (content items: reviews/discussions hidden; lessons/resources put on a takedown hold → learners get 451), or **Archive** (whole course, through the course state machine; shared YouTube media is not deleted).
3. `POST /api/admin/trust/complaints/{id}/resolve` with a note. The complainant and the course instructors are notified; the action is audited.
4. Counter-notice accepted → `POST /api/admin/trust/holds/{id}/release` (lessons/resources) or un-archive by republishing through review; record the reason.
5. Repeat infringers → instructor suspension (5.4).

### 5.2 Video takedown / broken YouTube video
YouTube is the system of record for video; Mastemy never stores or re-hosts video.
1. Source: YouTube status sync marks assets `Restricted`/`Failed`; the queue `GET /api/admin/operations/broken-links` lists the live courses and lessons affected.
2. If YouTube removed the video for a rights claim: file/attach a complaint and Hide (hold) the affected lessons so learners see a clear "unavailable" instead of a dead player; notify the instructor (`POST …/broken-links/{id}/notify`).
3. If Mastemy must take a video down (rights holder notice to us): hold the lessons via the complaint workflow, and the channel owner (Mastemy-managed channel: platform staff; instructor-owned: the instructor) sets the YouTube video to private/removes it in YouTube Studio. Record the YouTube video id in the complaint note.
4. Restoration: the instructor re-uploads from the source master they retain (see `youtube-operations.md`), relinks the lesson and republishes; release the hold.
Never download YouTube videos as a backup or to re-host them.

### 5.3 Malware detected on upload
The upload was already rejected (422) and discarded. Check the audit log / logs (`Upload rejected: malware signature …`) for the instructor and course; contact the instructor (their device may be compromised); repeated detections → suspend the instructor pending review.

### 5.4 Instructor suspension
`POST /api/admin/trust/instructors/{userId}/suspend {reason}`: studio writes blocked immediately, earnings parked in a `Held` payout batch (Finance cannot approve it), learners keep access to live courses. `…/reinstate {note}` reverses it and releases earnings to the next payout batch. To also take courses down, archive them separately.

### 5.5 Appeals
`GET /api/admin/trust/appeals?status=Pending` weekly; decide with a different staff member from the one who hid the content where possible.

## 6. Backups and restore drills

* Nightly: `scripts/backup.sh` (cron on the host, with `MYSQL_HOST`, `MYSQL_PASSWORD`, `RESOURCES_DIR=/var/lib/docker/volumes/<project>_appdata/_data/resources`, `BACKUP_DIR`, `RETENTION_DAYS`). Copy each set off-host, encrypted (e.g. `age`/`gpg` + object storage you already own). Also copy the DataProtection key directory.
* Monthly (and after every schema migration): `scripts/restore-test.sh` — restores the latest backup into a scratch database and temp directory and verifies row counts and resource hashes. Archive its output with the date. Latest evidence: `restore-test-evidence.md`.
* Real restore: `scripts/restore.sh <set>` with the API stopped (`FORCE=1` to replace existing data), then smoke-test.
* Targets: RPO ≤ 24 h (nightly), RTO ≤ 2 h for a single-host restore of a < 10 GB database.
