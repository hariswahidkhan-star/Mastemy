# Amazon Route 53 and CloudFront

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1488` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - vendor product documentation not reachable from build env (https://docs.aws.amazon.com/route53/; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — Amazon Route 53 and CloudFront (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain DNS concepts and Route 53 hosted zones
2. Choose Route 53 routing policies for a scenario
3. Configure health checks and DNS failover
4. Explain CloudFront caching and edge delivery
5. Configure cache behaviors, TTLs and invalidations
6. Secure delivery with TLS and origin protection

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 DNS and Route 53 (MASTEMY-DESIGN 16%)

- Worked applications: (1) Create an A/ALIAS record for a site; (2) Explain public vs private hosted zones
- Common misconception addressed: Confusing a CNAME with an ALIAS at the zone apex
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | DNS fundamentals | 48 | 5 |
| M01L02 | Hosted zones and records | 48 | 5 |
### M02 Routing policies (MASTEMY-DESIGN 16%)

- Worked applications: (1) Pick a routing policy for A/B testing; (2) Route users to the nearest region
- Common misconception addressed: Using simple routing where latency or failover is needed
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Simple, weighted and latency routing | 48 | 5 |
| M02L02 | Geolocation and failover routing | 48 | 5 |
### M03 Health and failover (MASTEMY-DESIGN 17%)

- Worked applications: (1) Configure a health check on an endpoint; (2) Fail traffic over to a standby
- Common misconception addressed: Expecting failover without health checks configured
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Health checks | 48 | 5 |
| M03L02 | DNS failover | 48 | 5 |
### M04 CloudFront basics (MASTEMY-DESIGN 17%)

- Worked applications: (1) Put CloudFront in front of an S3 origin; (2) Explain how edge caching cuts latency
- Common misconception addressed: Assuming CloudFront caches dynamic, uncacheable responses by default
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Edge delivery and caching | 48 | 5 |
| M04L02 | Origins and distributions | 48 | 5 |
### M05 Cache behavior (MASTEMY-DESIGN 17%)

- Worked applications: (1) Set TTLs for static vs dynamic paths; (2) Invalidate a stale object
- Common misconception addressed: Setting a long TTL then expecting instant updates without invalidation
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | TTLs and cache keys | 48 | 5 |
| M05L02 | Invalidations and behaviors | 48 | 5 |
### M06 Securing delivery (MASTEMY-DESIGN 17%)

- Worked applications: (1) Serve HTTPS with an ACM certificate; (2) Lock the origin to CloudFront only
- Common misconception addressed: Leaving the S3 origin publicly readable
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | TLS and certificates | 48 | 5 |
| M06L02 | Origin access protection | 48 | 5 |

## Integrative case

A team delivers a global web app: register and manage DNS in Route 53, choose routing policies, add health checks and failover, put CloudFront in front for caching and TLS, and secure the origin, then measure latency improvements.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1488-final-protected | 30 | 30 | yes |
| MST-1488-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| DNS and Route 53 | 5 |
| Routing policies | 5 |
| Health and failover | 5 |
| CloudFront basics | 5 |
| Cache behavior | 5 |
| Securing delivery | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1488-Q0001** (single-answer, Select ONE) Which Route 53 routing policy sends users to the AWS region that gives them the lowest latency?

- A. Latency-based routing **(key)**  
  _Rationale:_ Correct: latency-based routing directs users to the lowest-latency region.
- B. Simple routing  
  _Rationale:_ Simple routing returns one record set without latency awareness.
- C. Weighted routing only  
  _Rationale:_ Weighted routing splits by weight, not by latency.
- D. Alias-only routing  
  _Rationale:_ ALIAS is a record type, not a latency policy.

**MST-1488-Q0002** (multiple-answer, Select TWO) Which TWO improve a global web app's delivery with CloudFront? (Select TWO.)

- A. Cache static assets at edge locations with appropriate TTLs **(key)**  
  _Rationale:_ Correct: edge caching reduces latency and origin load.
- B. Serve HTTPS using an ACM certificate **(key)**  
  _Rationale:_ Correct: TLS at the edge secures delivery for users.
- C. Make the S3 origin publicly readable to everyone  
  _Rationale:_ A public origin bypasses CloudFront protection and is a risk.
- D. Set a 1-second TTL on all static files to force constant refetch  
  _Rationale:_ Tiny TTLs defeat caching and raise origin load.

**MST-1488-Q0003** (single-answer, Select ONE) After updating a file at the origin, why might CloudFront still serve the old version?

- A. The object is still cached at the edge until its TTL expires or it is invalidated **(key)**  
  _Rationale:_ Correct: cached objects persist until TTL expiry or an invalidation.
- B. Route 53 deleted the DNS record  
  _Rationale:_ A deleted record would stop resolution, not serve a stale file.
- C. CloudFront never caches anything  
  _Rationale:_ CloudFront caches by design; that is the point.
- D. TLS certificates block updates  
  _Rationale:_ Certificates secure transport, not cache freshness.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
