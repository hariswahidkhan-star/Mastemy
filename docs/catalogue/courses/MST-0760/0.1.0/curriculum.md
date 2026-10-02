# Amazon API Gateway: Secure API Design and Operations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0760` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Amazon API Gateway Developer Guide; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-APIGW (https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Amazon API Gateway: Secure API Design and Operations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Choose between REST, HTTP and WebSocket APIs
2. Design resources, methods and integrations
3. Secure APIs with authorizers, keys and resource policies
4. Control traffic with throttling, usage plans and caching
5. Deploy with stages, variables and canary releases
6. Monitor, log and troubleshoot APIs

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 API types and design (MASTEMY-DESIGN 16%)

- Worked applications: (1) Choose HTTP vs REST API for a cost-sensitive proxy; (2) Model a resource hierarchy for an orders API
- Common misconception addressed: Assuming REST APIs are always the right default over HTTP APIs
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | REST, HTTP and WebSocket APIs | 80 | 7 |
| M01L02 | Resources, methods and models | 80 | 7 |

### M02 Integrations (MASTEMY-DESIGN 16%)

- Worked applications: (1) Wire a Lambda proxy integration for a GET route; (2) Transform a request with a mapping template
- Common misconception addressed: Expecting proxy integration to transform payloads for you
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Lambda and HTTP integrations | 80 | 7 |
| M02L02 | Proxy vs non-proxy and mapping templates | 80 | 7 |

### M03 Authentication and authorization (MASTEMY-DESIGN 17%)

- Worked applications: (1) Protect a route with a Cognito user-pool authorizer; (2) Restrict an API to a VPC with a resource policy
- Common misconception addressed: Treating API keys as an authentication mechanism
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | IAM, Cognito and Lambda authorizers | 80 | 7 |
| M03L02 | API keys and resource policies | 80 | 7 |

### M04 Traffic management (MASTEMY-DESIGN 17%)

- Worked applications: (1) Apply a usage plan with a rate and burst limit; (2) Enable stage caching for a read-heavy endpoint
- Common misconception addressed: Relying on caching for data that must always be fresh
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Throttling and usage plans | 80 | 7 |
| M04L02 | Caching and request validation | 80 | 7 |

### M05 Deployment and stages (MASTEMY-DESIGN 17%)

- Worked applications: (1) Promote a build with a canary release to 10% traffic; (2) Use a stage variable to point at a Lambda alias
- Common misconception addressed: Editing a live stage without a deployment
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Stages and stage variables | 80 | 7 |
| M05L02 | Canary releases and rollbacks | 80 | 7 |

### M06 Observability (MASTEMY-DESIGN 17%)

- Worked applications: (1) Enable access logging and find a 5xx spike; (2) Trace a slow request end to end with X-Ray
- Common misconception addressed: Assuming 4xx errors are always a gateway fault
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | CloudWatch metrics and logs | 80 | 7 |
| M06L02 | X-Ray tracing and troubleshooting | 80 | 7 |

## Integrative case

Design and operate a secure orders API: pick the right API type, build Lambda integrations, protect routes with a Cognito authorizer and a VPC resource policy, add a usage plan and caching, promote with a canary release, then diagnose a 5xx spike with logs and X-Ray.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0760-final-protected | 40 | 50 | yes |
| MST-0760-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| API types and design | 7 |
| Integrations | 7 |
| Authentication and authorization | 7 |
| Traffic management | 7 |
| Deployment and stages | 6 |
| Observability | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0760-Q0001** (single-answer, Select ONE) What is the correct role of an API key in API Gateway?

- A. To identify a client for usage plans and throttling, not to authenticate it **(key)**  
  _Rationale:_ Correct: API keys track and meter clients via usage plans; they are not an authentication mechanism.
- B. To securely authenticate the caller's identity  
  _Rationale:_ API keys are not an authentication mechanism and must not be relied on for identity.
- C. To encrypt the payload in transit  
  _Rationale:_ TLS handles transport encryption, not API keys.
- D. To replace IAM entirely  
  _Rationale:_ API keys do not replace IAM-based authorization.

**MST-0760-Q0002** (single-answer, Select ONE) Which deployment approach shifts a small percentage of traffic to a new version to limit blast radius?

- A. A canary release on the stage **(key)**  
  _Rationale:_ Correct: a canary release routes a small traffic percentage to the new deployment.
- B. Deleting the old stage  
  _Rationale:_ Deleting a stage removes it entirely rather than testing gradually.
- C. Disabling CloudWatch logs  
  _Rationale:_ Turning off logging does not control traffic.
- D. Increasing the cache TTL  
  _Rationale:_ Cache TTL is unrelated to gradual rollout.

**MST-0760-Q0003** (multiple-answer, Select TWO) Which TWO mechanisms help protect and control access to an API Gateway endpoint? (Select TWO.)

- A. A Cognito or Lambda authorizer on the method **(key)**  
  _Rationale:_ Correct: authorizers validate the caller before the request reaches the integration.
- B. A resource policy restricting source VPC or IP **(key)**  
  _Rationale:_ Correct: resource policies constrain who can invoke the API.
- C. Raising the stage cache size  
  _Rationale:_ Cache size affects performance, not access control.
- D. Renaming the API  
  _Rationale:_ The API name has no security effect.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
