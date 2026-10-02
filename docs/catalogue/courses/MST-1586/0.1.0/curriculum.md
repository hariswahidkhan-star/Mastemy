# Service Mesh Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1586` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-SMF-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Service Mesh Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Service mesh foundations
2. Sidecar proxies
3. Secure communication
4. Traffic management
5. Resilience
6. Observability
7. Policy and access
8. Operations and trade-offs

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on operating a service mesh; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Service mesh foundations (MASTEMY-DESIGN 13%)

- Worked applications: (1) Explain what a mesh adds over plain networking; (2) Distinguish the data and control planes
- Common misconception addressed: Thinking a mesh replaces the need for an API gateway entirely
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The problem a mesh solves | 60 | 5 |
| M01L02 | Data plane vs control plane | 60 | 5 |

### M02 Sidecar proxies (MASTEMY-DESIGN 13%)

- Worked applications: (1) Describe how a sidecar intercepts traffic; (2) Reason about added latency from the proxy
- Common misconception addressed: Assuming sidecars add no latency or resource cost
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The sidecar pattern | 60 | 5 |
| M02L02 | How traffic is intercepted | 60 | 5 |

### M03 Secure communication (MASTEMY-DESIGN 12%)

- Worked applications: (1) Enable mTLS across services; (2) Explain workload identity in the mesh
- Common misconception addressed: Assuming encryption in the mesh authenticates the end user
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Mutual TLS between services | 60 | 5 |
| M03L02 | Identity and certificates | 60 | 5 |

### M04 Traffic management (MASTEMY-DESIGN 13%)

- Worked applications: (1) Shift 10% of traffic to a canary; (2) Configure a blue-green cutover
- Common misconception addressed: Rolling out to 100% without a canary step
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Routing and traffic splitting | 60 | 5 |
| M04L02 | Canary and blue-green | 60 | 5 |

### M05 Resilience (MASTEMY-DESIGN 12%)

- Worked applications: (1) Add timeouts and retries to a route; (2) Inject a fault to test resilience
- Common misconception addressed: Configuring retries that amplify an outage
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Retries, timeouts and circuit breaking | 60 | 5 |
| M05L02 | Fault injection | 60 | 5 |

### M06 Observability (MASTEMY-DESIGN 13%)

- Worked applications: (1) Read golden-signal metrics from the mesh; (2) Follow a request across services with tracing
- Common misconception addressed: Relying on the mesh for tracing without propagating context
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Metrics, logs and traces from the mesh | 60 | 5 |
| M06L02 | Distributed tracing | 60 | 5 |

### M07 Policy and access (MASTEMY-DESIGN 12%)

- Worked applications: (1) Write an allow/deny policy between services; (2) Apply a rate limit to a service
- Common misconception addressed: Opening all service-to-service traffic by default
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Authorization policies | 60 | 5 |
| M07L02 | Rate limiting at the mesh | 60 | 5 |

### M08 Operations and trade-offs (MASTEMY-DESIGN 12%)

- Worked applications: (1) Plan a mesh upgrade; (2) Decide whether a small system needs a mesh
- Common misconception addressed: Adopting a mesh for a two-service system that does not need one
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Installing and upgrading a mesh | 60 | 5 |
| M08L02 | When a mesh is worth it | 60 | 5 |

## Integrative case

Introduce a service mesh to a microservice system: explain the sidecar data plane and control plane, enable mutual TLS, add traffic shifting for a canary release, and set up observability, weighing the mesh's overhead against its benefits.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1586-final-protected | 40 | 40 | yes |
| MST-1586-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Service mesh foundations | 5 |
| Sidecar proxies | 5 |
| Secure communication | 5 |
| Traffic management | 5 |
| Resilience | 5 |
| Observability | 5 |
| Policy and access | 5 |
| Operations and trade-offs | 5 |

Minimum reviewed item bank: 400 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1586-Q0001** (single-answer, Select ONE) What is the role of the data plane in a service mesh?

- A. The sidecar proxies that intercept and handle service-to-service traffic **(key)**  
  _Rationale:_ Correct: the data plane carries the actual request traffic.
- B. The component that stores configuration and pushes policy  
  _Rationale:_ That is the control plane.
- C. The user-facing API gateway only  
  _Rationale:_ The data plane is the mesh's proxies, not just the gateway.
- D. The database layer  
  _Rationale:_ The mesh does not manage databases.

**MST-1586-Q0002** (single-answer, Select ONE) What does enabling mutual TLS (mTLS) in a mesh provide?

- A. Encrypted and mutually authenticated service-to-service communication **(key)**  
  _Rationale:_ Correct: mTLS authenticates both ends and encrypts traffic between workloads.
- B. Authentication of the human end user  
  _Rationale:_ mTLS authenticates workloads, not end users.
- C. Automatic horizontal scaling  
  _Rationale:_ Unrelated to mTLS.
- D. Elimination of all network latency  
  _Rationale:_ Encryption adds, not removes, overhead.

**MST-1586-Q0003** (multiple-answer, Select ALL that apply) Which statements about service-mesh traffic management are correct? (Select TWO)

- A. Traffic splitting lets you send a small percentage to a canary version **(key)**  
  _Rationale:_ Correct: gradual rollout reduces blast radius.
- B. Timeouts and retries can be configured at the mesh without app changes **(key)**  
  _Rationale:_ Correct: resilience policy lives in the mesh.
- C. A mesh removes all latency from requests  
  _Rationale:_ False; sidecars add some latency.
- D. Retries can never worsen an outage  
  _Rationale:_ False; aggressive retries can amplify load.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
