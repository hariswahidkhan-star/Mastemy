# Launch Checklist (owner actions)

These items cannot be completed in the repository. They need accounts, credentials, real content, people or legal
review. Work through them in order: later items depend on earlier ones. "Where" is the configuration key (environment
variable form in `.env`) or the place in the product. The full key list is in `README.md`.

## 1. Infrastructure and domain

| # | Action | Where |
|---|---|---|
| 1.1 | Choose the host and region. Size it for API + SSR + MySQL (+ ClamAV ≈ 1.5 GB RAM). Fill in `operating-cost-model.md` with real quotes | — |
| 1.2 | Register the domain. Point DNS (A/AAAA) at the host. Terminate TLS with a free ACME certificate or the provider's. nginx in the `web` image listens on port 80, so put TLS in front of it | DNS provider; reverse proxy / load balancer |
| 1.3 | Set the public origin everywhere: `PUBLIC_BASE_URL=https://<domain>` (drives `Seo__PublicBaseUrl` and SSR), `Cors__Origins__0=https://<domain>`, `Email__PublicBaseUrl=https://<domain>` | `.env` |
| 1.4 | Set `Certificates__VerifyBaseUrl=https://<domain>/verify`. This URL is printed and QR-encoded on every certificate PDF, so get it right before the first certificate is issued | `.env` |
| 1.5 | Generate secrets: `Jwt__Key` (≥ 32 random bytes), `MYSQL_PASSWORD`, `MYSQL_ROOT_PASSWORD`. Store them in the host secret store, never in git | `.env` / secret store |
| 1.6 | Persist and back up Data Protection keys: set `DataProtection__KeysPath=/app/data/keys` (on the `appdata` volume). Losing these keys makes stored OAuth tokens, MFA secrets and payout destinations unreadable | `.env` |
| 1.7 | `Database__MigrateOnStartup=true` for the first deploy (or run migrations as in `deployment-runbook.md`) | `.env` |

## 2. Accounts and staff security

| # | Action | Where |
|---|---|---|
| 2.1 | Seed the first SuperAdmin with a real mailbox and a strong password (`Seed__SuperAdminEmail`, `Seed__SuperAdminPassword`). Sign in, enroll MFA, store the recovery codes offline, then **remove the seed variables** | `.env`, `/me/security` |
| 2.2 | Keep `Security__RequireMfaForPrivileged=true` (the default). Every Admin, SuperAdmin, Finance, Reviewer and Moderator enrolls TOTP at first sign-in. There is no admin MFA-reset function, so recovery codes are the only way back in after a lost authenticator. Make sure every staff member stores them, and keep at least two SuperAdmins | `.env`; staff onboarding |
| 2.3 | Create staff accounts. Verify each email, then have a SuperAdmin assign roles. Decide what Support staff will do: the Support role currently grants no capability | Admin → Users |
| 2.4 | Leave the onboarding flags at their defaults (registration off, invite-only on, Mode B off, uploader off) until the items in section 4 are done | Admin → Settings |

## 3. Email (SMTP)

| # | Action | Where |
|---|---|---|
| 3.1 | Open an SMTP provider account. Authenticate the sending domain (SPF, DKIM, DMARC) | Provider, DNS |
| 3.2 | Set `Email__SmtpHost`, `Email__SmtpPort`, `Email__Username`, `Email__Password`, `Email__From`, `Email__EnableSsl` | `.env` |
| 3.3 | Test registration verification, password reset, an org invitation and a notification email. Check `/health/ready` → `email_outbox` | Staff `/health/ready` |
| 3.4 | Set a support address for the Contact page (`VITE_SUPPORT_EMAIL`, a web build variable) | web build env |

## 4. YouTube

| # | Action | Where |
|---|---|---|
| 4.1 | Create the Mastemy YouTube channel under an organization-controlled Google account (not a personal one) | YouTube / Google |
| 4.2 | Create a Google Cloud project. Enable YouTube Data API v3. Create an API key restricted to that API and to the server's IP | Google Cloud console; `YouTube__ApiKey` |
| 4.3 | Create an OAuth client (web). Redirect URI `https://<domain>/api/youtube/oauth/callback` | `YouTube__OAuthClientId`, `YouTube__OAuthClientSecret`, `YouTube__OAuthRedirectUri` |
| 4.4 | Complete **Google OAuth app verification** for the YouTube scopes requested (including `youtube.force-ssl`) | Google Cloud console |
| 4.5 | Complete the **YouTube API Services audit / compliance review**. Until it clears, API uploads are private-only (shown as Restricted). Request a quota increase if you need uploads or playlist sync at volume | Google forms |
| 4.6 | Register and authorize the channel in Mastemy. Do a real test: link a video, sync a playlist, push a caption | Admin → Videos / Channels |
| 4.7 | Only after 4.4–4.6 and a successful real upload test, consider enabling `YouTubeApiUploadsEnabled`. Studio + link remains the launch default | Admin → Settings |
| 4.8 | Write the producers' source-file backup policy (`youtube-operations.md`) | Internal policy |

## 5. Payments (Stripe), invoicing and tax

| # | Action | Where |
|---|---|---|
| 5.1 | Open a Stripe account for the actual merchant entity and country. Complete verification. Set the payout bank | Stripe dashboard |
| 5.2 | Set `Stripe__SecretKey`, `Stripe__SuccessUrl`, `Stripe__CancelUrl` | `.env` |
| 5.3 | Add a webhook endpoint `https://<domain>/api/webhooks/stripe` with the events listed in `api-contract-wave3/commerce.md` (checkout.session.*, customer.subscription.*, invoice.paid, invoice.payment_failed, charge.dispute.*, charge.refunded, refund.*). Set `Stripe__WebhookSecret` | Stripe dashboard; `.env` |
| 5.4 | Test in Stripe test mode: one-off purchase, subscription with renewal and failed payment, refund, dispute. Then switch to live keys | — |
| 5.5 | Set the seller details for invoice PDFs: `Invoice__SellerName`, `Invoice__SellerAddress`, `Invoice__SellerTaxId` | `.env` |
| 5.6 | **Tax review** by a qualified adviser: registrations, VAT/GST/sales tax by market, whether to use `Tax__Mode=Inclusive`, rates to enter, invoice wording, digital-services rules | Adviser; Finance → Tax rates |
| 5.7 | Decide the commercial settings: `Commission__InstructorSharePercent`, refund window, coupon and promotion limits, `Payouts__MinimumAmount`, subscription grace | `.env` |
| 5.8 | Define the payout transfer process outside Mastemy and instructor tax-documentation checks (W-8/W-9 or local equivalents) | Finance procedure |

## 6. AI

| # | Action | Where |
|---|---|---|
| 6.1 | Create an Anthropic API account for the business. Set a spend limit there too | Anthropic console |
| 6.2 | Set `Ai__ApiKey`. Optionally set `Ai__Model`. Review the budgets (`Ai__GlobalMonthlyTokens`, per-user and org caps) | `.env` |
| 6.3 | Update `Ai__Pricing__*` to current prices so the usage reports are accurate | `.env` |
| 6.4 | Confirm the provider's data-use and retention terms meet your privacy commitments (no training on customer content without permission). Reflect them in the privacy notice | Legal |

## 7. Security and operations

| # | Action | Where |
|---|---|---|
| 7.1 | Run ClamAV: `docker compose --profile scanning up -d` and `Scanning__ClamAvHost=clamav` (Required mode) | `.env` |
| 7.2 | Monitoring: choose an OTLP backend (`Otel__Endpoint`, `Otel__Headers`, `Otel__TraceSampleRatio`), set `Logging__Json=true`, ship logs, and configure the alerts in `operations/runbook.md` §2. Add an external uptime probe of `/health/live` | `.env`; monitoring vendor |
| 7.3 | Schedule nightly `scripts/backup.sh` with encrypted off-host copies, including the Data Protection key directory | Host cron |
| 7.4 | **Restore drill on production-size data**: run `scripts/restore-test.sh` against a realistic copy and record the timings against RPO 24 h / RTO 2 h. Existing evidence uses development data only | `operations/restore-test-evidence.md` |
| 7.5 | **Penetration test** by an independent tester (auth/MFA, IDOR across instructors and orgs, answer-key leakage, uploads, webhooks, payment flows, SSR). Fix critical and high findings before launch | External firm |
| 7.6 | Review the client token storage decision (the refresh token is in `localStorage`). Set a strict Content-Security-Policy at the edge | nginx / CDN |
| 7.7 | Decide how many API instances to run. If more than one: shared volumes for resources and keys, and note the per-instance rate limits (`architecture.md` → Multi-instance) | Deployment |

## 8. Legal and policy

| # | Action | Where |
|---|---|---|
| 8.1 | **Legal review** of the Terms, Privacy notice, cookie/consent wording, refund policy, Help/About/Contact pages and the free-video/paid-services disclosure for each operating market | `src/web` content; lawyer |
| 8.2 | Instructor agreement text (licence to host/publish/retain, Mode A/B channel-risk disclosure, payouts, exit and learner continuity). Publish it as a version | Admin → Agreements |
| 8.3 | Commercial review that each package really sells independent study services and does not gate video (spec §2) | Reviewer + lawyer |
| 8.4 | Takedown/complaint contact and procedure. Data-protection contact. Breach notification plan | Contact page; `operations/runbook.md` §3 |
| 8.5 | Certificate wording: confirm it makes no accreditation, CPD or licensing claim in your markets | Admin → Certificate templates |

## 9. Content

| # | Action | Where |
|---|---|---|
| 9.1 | **Certification sources verified by humans**: research each issuer and credential against official sources, then enter and verify it. The reviewer must differ from the editor, and checks must be under 180 days old. Resolve the PCP-AI label. Do not imply partner status | Admin → Certifications |
| 9.2 | Approved brand assets (logo, colours) to replace the placeholders | `src/web` |
| 9.3 | **Pilot course production**: one complete reviewed course with real approved YouTube videos, captions, notes, original MCQs (rationales for every option, independent answer check), assessments and a package. Run it through the full review → publish → purchase → exam → certificate flow on production | Studio, Admin |
| 9.4 | Skills, pathways and featured collections populated from real courses only | Admin → Discover |
| 9.5 | Arabic UI strings reviewed by a professional translator | `src/web/src/i18n/ar.json` |

## 10. Accessibility and final checks

| # | Action | Where |
|---|---|---|
| 10.1 | **Accessibility audit with assistive technology** (screen readers on desktop and mobile, keyboard only, zoom/reflow, RTL) against WCAG 2.2 AA, covering the course page, learning workspace, exam player, checkout and studio. Fix the issues. Publish an accurate accessibility statement (no conformance claim without evidence) | External auditor |
| 10.2 | Smoke test production: sign-up, verify email, watch a free video, buy, take an exam, verify a certificate, refund, `/sitemap.xml`, `/robots.txt`, `/health/ready` | Production |
| 10.3 | Rotate any credential that was used during testing. Confirm no test keys remain | `.env` |
