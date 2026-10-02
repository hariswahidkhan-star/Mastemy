# Operating Cost Model

YouTube hosts all course video, so there is no video-hosting, video-CDN or transcoding bill. The platform still has
running costs. Every price below is either a placeholder to be filled in from the provider's current quote for the
chosen region, or a default value from the code that must be checked against the provider's current price list.
Nothing here has been purchased.

## Variables

| Symbol | Meaning |
|---|---|
| U | Monthly active users |
| P | Average page/API payload per active user per month (GB) |
| R | Non-video resource downloads per month (GB) |
| V | Video GB relayed per month through the optional API uploader (0 with Studio + link) |
| E | Emails sent per month (notifications, verification, password reset, invitations, complaints) |
| N, A | Number of one-off paid orders, average order value |
| S, B | Subscription renewals per month, average subscription invoice |
| G | Disputes per month |
| T_in, T_out, T_cr, T_cw | AI input, output, cache-read and cache-write tokens per month |
| D | Database size (GB) |
| K | Resource uploads scanned per month |

## Cost lines

| Line | Formula | Notes |
|---|---|---|
| App hosting | `instances × instance_price` | API + SSR/nginx + workers on one host by default. Relay uploads and ClamAV need headroom |
| MySQL | `managed_db_price(tier) + storage_price × D` | Or self-hosted on the app host. Add HA if required |
| Bandwidth (egress) | `egress_price × (U × P + R)` | Video playback egress is YouTube's, not ours |
| Relay upload bandwidth | `ingress_price × V + egress_price × V` | Every relayed byte enters and leaves the app server. Ingress is often free; egress to Google may be billed. Also uses CPU and memory (one 8 MiB chunk buffer per active upload) |
| Resource storage | `storage_price × (notes + PDFs + images + captions GB)` | On the existing host, bounded by `Resources:PerCourseQuotaBytes` (500 MiB default) × courses. Disclose when capacity must grow |
| Email (SMTP) | `smtp_plan_fee + price_per_1000 × E / 1000` | Any SMTP provider (`Email:*`). Email is opt-in for notifications, so E is mostly transactional mail. Dedicated IP and domain authentication (SPF/DKIM/DMARC) may add fees |
| Payment fees: one-off | `N × (pct_fee × A + fixed_fee) + FX_fees` | Stripe pricing for the merchant country and card mix |
| Payment fees: subscriptions | `S × (pct_fee × B + fixed_fee) + S × B × billing_pct` | Stripe Billing charges an extra percentage of recurring volume (check the current Billing plan). Failed-payment retries are free; their cost is churn |
| Disputes | `G × dispute_fee` | Charged per chargeback whatever the outcome (check the current Stripe fee); the lost amount is also reversed from the ledger |
| Tax/invoicing tools | `0` in code | Mastemy issues invoices itself (`Invoice:*`, `Tax:Mode`). An external tax engine or accountant is an extra cost if advice requires one |
| AI (Anthropic) | `Σ_model (T_in × InputPerMTok + T_out × OutputPerMTok + T_cr × CacheReadPerMTok + T_cw × CacheWritePerMTok) / 1,000,000` | Prices per million tokens come from `Ai:Pricing` (table below), and `/api/admin/ai/usage` reports estimates with them. **Update the table to the provider's current price list**; the estimate is only as good as the table |
| AI budget ceiling | `≤ Ai:GlobalMonthlyTokens × blended_price_per_token` | Hard caps: global 200M tokens, org 5M, instructor 2M, premium user 600k, user 200k per month (defaults). Requests beyond a cap get 429 `ai_budget_exhausted` |
| Backups | `backup_storage_price × (D_compressed + resources + keys) × retained_copies + restore_drill_compute` | Videos excluded by design. `scripts/backup.sh` keeps `RETENTION_DAYS` daily sets. Off-host encrypted copies cost extra. Monthly drills need scratch DB space ≈ D |
| Domain + TLS | `domain_annual / 12` | TLS via free ACME (e.g. Let's Encrypt) or the provider |
| Logging | `log_GB × log_ingest_price + log_GB × retention_months × log_storage_price` | JSON logs (`Logging:Json`), about 0.5 KB per request line at Information level. Self-hosting costs disk only |
| Traces/metrics (OTLP backend) | `spans × Otel:TraceSampleRatio × price_per_span + active_series × price_per_series` | Off unless `Otel:Endpoint` is set. Health probes are not traced. Many vendors have free tiers; a self-hosted collector + Prometheus/Tempo uses host CPU, RAM and disk |
| Uptime/alerting | `checks × price_per_check` | External probe of `/health/live` and `/health/ready`. Free tiers usually suffice |
| Malware scanning (ClamAV) | `0 licence + host RAM (~1.2–1.6 GB for signatures) + CPU × K + signature-update egress` | ClamAV is GPL software, run as an optional container (`--profile scanning`) on the existing host. It may force a larger instance; count the size difference here. A commercial scanning API would cost `K × price_per_scan` instead |
| YouTube Data API | 0 currency cost | Quota-limited (default daily units). Uploads, playlist sync and caption pushes use a lot of quota; increases need Google review. Availability re-checks every `YouTube:RecheckHours` use 1 unit per 50 videos (videos.list) |
| People (not infrastructure) | owner estimate | Reviewers, moderators, finance, support, subject experts, video production, translation, legal/tax advice, accessibility audit, penetration test. These usually exceed the infrastructure lines |

## AI price table (code default `Ai:Pricing`, USD per million tokens)

These values ship in `src/Mastemy.Api/Modules/Ai/AiModels.cs`. Override them with
`Ai__Pricing__{model}__InputPerMTok` etc. They are estimates for reporting only, and Mastemy is billed by the provider,
not by this table. Verify them against the provider's current pricing before using them for budgeting.

| Model | Input | Output | Cache read | Cache write |
|---|---|---|---|---|
| `claude-opus-5-5` (default `Ai:Model`) | 4.00 | 20.00 | 0.20 | 5.00 |
| `claude-opus-5` | 5.00 | 25.00 | 0.50 | 6.25 |
| `claude-opus-4-8` | 5.00 | 25.00 | 0.50 | 6.25 |
| `claude-sonnet-5-5` | 2.00 | 10.00 | 0.20 | 2.50 |
| `claude-haiku-4-5` | 1.00 | 5.00 | 0.10 | 1.25 |

Worked example with the default model: one tutor turn with ~6 retrieved chunks (≈ 5k input tokens, part of it cached)
and a 600-token answer costs about `5,000 × 4 / 1M + 600 × 20 / 1M ≈ 0.032 USD` before cache savings. A user at the 200k
monthly cap therefore costs at most about `200,000 × (blend of 4 and 20) / 1M`, roughly 1–2 USD. These figures are
illustrative and depend on the real input/output mix.

## Monthly total

`Total = hosting + mysql + bandwidth + relay + storage + email + payments (one-off + subscriptions + disputes) + AI +
backups + domain + logging + telemetry + uptime + scanning (+ people)`

## Not costs here (by design)

Video storage, video CDN, transcoding, and source-master cloud archives are not costs here. Producers keep originals on
their own devices or storage they already control. Their backup cost is theirs and should be planned per
`youtube-operations.md`.
