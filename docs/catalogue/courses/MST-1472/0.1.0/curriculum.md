# Apigee API Management Basics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1472` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official Google Cloud documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — Apigee API Management Basics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain API management concepts and the role of an API gateway
2. Create and deploy API proxies in Apigee
3. Apply security, quota and traffic policies to proxies
4. Monitor, version and productize APIs

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 API management foundations (MASTEMY-DESIGN 25%)

- Worked applications: (1) Map a backend service to a managed API; (2) Identify where a gateway sits in request flow
- Common misconception addressed: Thinking an API gateway is just a reverse proxy with no policy layer
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why API management and gateways | 72 | 7 |
| M01L02 | Apigee architecture and concepts | 72 | 7 |

### M02 Building API proxies (MASTEMY-DESIGN 25%)

- Worked applications: (1) Create a proxy for an existing REST backend; (2) Add a conditional flow for one resource path
- Common misconception addressed: Confusing the proxy endpoint with the target endpoint
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Creating and deploying API proxies | 72 | 7 |
| M02L02 | Proxy endpoints, flows and policies | 72 | 7 |

### M03 Securing and controlling traffic (MASTEMY-DESIGN 25%)

- Worked applications: (1) Attach an API-key verification policy; (2) Add a quota of 1000 requests/day per app
- Common misconception addressed: Treating a quota policy and spike-arrest as interchangeable
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | API keys and OAuth policies | 72 | 7 |
| M03L02 | Quota, spike arrest and rate limiting | 72 | 7 |

### M04 Operating and productizing APIs (MASTEMY-DESIGN 25%)

- Worked applications: (1) Bundle proxies into an API product; (2) Promote a proxy from test to prod environment
- Common misconception addressed: Assuming deploying to one environment publishes the API to all
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | API products, apps and developers | 72 | 7 |
| M04L02 | Analytics, versioning and environments | 72 | 7 |

## Integrative case

A company exposes an internal orders service to partners. Front it with an Apigee API proxy: add key/OAuth security, a quota and spike-arrest policy, transform the response, then publish it as a product with analytics.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1472-final-protected | 28 | 35 | yes |
| MST-1472-final-alternate | 28 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| API management foundations | 7 |
| Building API proxies | 7 |
| Securing and controlling traffic | 7 |
| Operating and productizing APIs | 7 |

Minimum reviewed item bank: 264 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1472-Q0001** (single-answer, Select ONE) In Apigee, which component receives the client request before it reaches the backend?

- A. The proxy endpoint **(key)**  
  _Rationale:_ Correct: the proxy endpoint faces the client; the target endpoint faces the backend.
- B. The target endpoint  
  _Rationale:_ The target endpoint connects to the backend service, not the client.
- C. The API product  
  _Rationale:_ An API product bundles proxies for consumption; it does not receive requests.
- D. The developer app  
  _Rationale:_ A developer app holds credentials; it does not process the request flow.

**MST-1472-Q0002** (multiple-answer, Select TWO) Which TWO policies help protect a backend from traffic overload? (Select TWO.)

- A. Spike Arrest **(key)**  
  _Rationale:_ Correct: Spike Arrest smooths sudden traffic bursts.
- B. Quota **(key)**  
  _Rationale:_ Correct: Quota caps total calls over a period.
- C. AssignMessage only  
  _Rationale:_ AssignMessage manipulates messages; it does not limit traffic.
- D. ExtractVariables  
  _Rationale:_ ExtractVariables reads values; it does not throttle traffic.

**MST-1472-Q0003** (single-answer, Select ONE) What is the purpose of an API product in Apigee?

- A. To bundle one or more proxies/resources for controlled consumption by apps **(key)**  
  _Rationale:_ Correct: products package API resources with access and quota settings.
- B. To store the backend source code  
  _Rationale:_ Apigee does not store backend application code.
- C. To replace the need for environments  
  _Rationale:_ Environments still host deployed proxies.
- D. To generate OAuth tokens directly from the backend  
  _Rationale:_ Token handling is done via policies, not the product object.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
