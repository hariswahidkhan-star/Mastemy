# Operating Cost Model

There is no video-hosting, video-CDN or transcoding bill: YouTube hosts all course video. The platform still has running costs. All figures are placeholders to be filled from actual provider quotes for the chosen region; nothing here has been purchased.

## Variables

| Symbol | Meaning |
|---|---|
| U | Monthly active users |
| P | Average page/API payload transferred per active user per month (GB) |
| R | Non-video resource downloads per month (GB) |
| V | Video GB relayed per month through the optional API uploader (0 when using Studio + link) |
| E | Emails sent per month |
| N, A | Number of paid orders, average order value |
| T | AI tokens consumed per month (input + output) |
| D | Database size (GB) |

## Cost lines

| Line | Formula | Notes |
|---|---|---|
| App hosting | `instances × instance_price` | Size for API + workers; relay uploads need headroom for concurrent streams |
| MySQL | `managed_db_price(tier) + storage_price × D` | Or self-hosted on app host; include HA if required |
| Bandwidth (egress) | `egress_price × (U × P + R)` | Video playback egress is YouTube's, not ours |
| Relay upload bandwidth | `ingress_price × V + egress_price × V` | Every relayed byte enters and leaves the app server; ingress often free, egress to Google may be billed. CPU/memory also consumed |
| Resource storage | `storage_price × (notes + PDFs + images + captions GB)` | Bounded, on existing host; disclose when capacity must grow |
| Email | `email_price_per_1000 × E / 1000` | Transactional + opt-in notifications |
| Payment fees | `N × (pct_fee × A + fixed_fee) + dispute_fees + FX_fees` | Stripe pricing for merchant country |
| AI | `price_per_token × T` | Enforce per-user allowances and global monthly budget cap |
| Backups | `backup_storage_price × (D_compressed + resources) × retained_copies + restore_drill_compute` | Videos excluded by design. `scripts/backup.sh` keeps `RETENTION_DAYS` daily sets; off-host copies cost extra. Monthly restore drills need temporary scratch DB space ≈ D |
| Domain + TLS | `domain_annual / 12` | TLS via free ACME or provider |
| Monitoring/logging | `log_GB × log_ingest_price + log_GB × retention_months × log_storage_price` | JSON logs (`Logging__Json`). Volume ≈ requests × ~0.5 KB per log line at Information level. Self-hosting on the app host costs disk only |
| Traces/metrics (OTLP) | `spans × sample_ratio × price_per_span + active_series × price_per_series` | Off unless `Otel__Endpoint` is set. Reduce cost with `Otel__TraceSampleRatio` (e.g. 0.1). Health probes are not traced. Many vendors have free tiers; a self-hosted collector + Prometheus/Tempo uses host CPU, RAM and disk |
| Uptime/alerting | `checks × price_per_check` | External probe of `/health/live` and `/health/ready`; free tiers usually suffice |
| Malware scanning | `0 licence + host RAM (~1.2–1.6 GB for ClamAV signatures) + CPU per scan + signature-update egress` | ClamAV is GPL software, run as an optional container (`--profile scanning`) on the existing host. It may force a larger instance size; count that delta here. A commercial scanning API costs `uploads × price_per_scan` instead |
| YouTube Data API | 0 currency cost | Quota-limited (default daily units); uploads consume large quota, increases require Google review |

## Monthly total

`Total = hosting + mysql + bandwidth + relay + storage + email + payments + AI + backups + domain + logging + telemetry + uptime + scanning`

## Not costs here (by design)

Video storage, video CDN, transcoding, source-master cloud archive. Producers keep originals on their own devices/storage they already control; their backup cost is theirs and should be planned per `youtube-operations.md`.
