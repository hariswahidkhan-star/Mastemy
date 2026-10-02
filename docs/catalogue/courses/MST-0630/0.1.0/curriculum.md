# Production AI Gateway: Routing, Fallbacks, Budgets, and Policies

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0630` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs. Tool- and model-specific behaviour is vendor-neutral here and must be verified against the current official documentation at production. |
| Evidence | **n/a-no-official-syllabus** - no official source syllabus exists for this skills scope |
| Legacy IDs | none |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Production AI Gateway: Routing, Fallbacks, Budgets, and Policies (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design an AI gateway that fronts multiple models and providers
2. Implement routing, fallbacks and retries
3. Enforce budgets, rate limits and quotas
4. Apply policies, caching and observability centrally

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Gateway and routing (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Route requests to models by capability and cost; (2) Add a fallback to a second provider on failure
- Common misconception addressed: Hard-wiring one provider into every service instead of routing through a gateway
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why a gateway | 80 | 5 |
| M01L02 | Routing strategies | 80 | 5 |
| M01L03 | Fallbacks and retries | 80 | 5 |

### M02 Budgets and limits (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Enforce a per-tenant monthly budget; (2) Add a rate limit and quota per key
- Common misconception addressed: Running with no budget so one tenant can exhaust spend
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Budgets and cost tracking | 80 | 5 |
| M02L02 | Rate limits and quotas | 80 | 5 |
| M02L03 | Overload and backpressure | 80 | 5 |

### M03 Policies and operations (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Apply a content/access policy at the gateway for all callers; (2) Add response caching and central tracing
- Common misconception addressed: Enforcing policy in each service separately so it drifts and gaps appear
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Central policy enforcement | 80 | 5 |
| M03L02 | Caching | 80 | 5 |
| M03L03 | Observability and metrics | 80 | 5 |

## Integrative case

A team puts an AI gateway in front of several model providers: route requests by cost and capability, fall back when a provider fails, enforce per-tenant budgets and rate limits, apply content and access policies centrally, and add caching and observability for the whole fleet.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0630-final-protected | 30 | 30 | yes |
| MST-0630-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Gateway and routing | 10 |
| Budgets and limits | 10 |
| Policies and operations | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0630-Q0001** (single-answer, Select ONE) What is a primary benefit of routing all AI calls through a gateway?

- A. Central control of routing, budgets, policy and observability across providers **(key)**  
  _Rationale:_ Correct: a gateway centralises cross-cutting controls instead of duplicating them.
- B. It makes every model free  
  _Rationale:_ A gateway does not remove provider costs.
- C. It guarantees the model never makes mistakes  
  _Rationale:_ A gateway does not change model accuracy.
- D. It eliminates the need for any monitoring  
  _Rationale:_ A gateway is where monitoring is centralised, not removed.

**MST-0630-Q0002** (multiple-answer, Select TWO) Which TWO keep one tenant from exhausting shared AI spend? (Select TWO.)

- A. Per-tenant budgets with cost tracking **(key)**  
  _Rationale:_ Correct: a budget caps how much a tenant can spend.
- B. Rate limits and quotas per API key **(key)**  
  _Rationale:_ Correct: rate limits and quotas bound usage over time.
- C. A single shared unlimited key for everyone  
  _Rationale:_ An unlimited shared key allows runaway spend.
- D. Turning off cost tracking  
  _Rationale:_ Without tracking you cannot enforce or see spend.

**MST-0630-Q0003** (single-answer, Select ONE) A provider starts returning errors. What should a production AI gateway do?

- A. Fall back to an alternate provider or model and retry within limits **(key)**  
  _Rationale:_ Correct: routing with fallbacks keeps the service up when one provider fails.
- B. Return the error to every user and stop  
  _Rationale:_ A single provider outage should not take the whole service down.
- C. Retry the failing provider forever with no limit  
  _Rationale:_ Unbounded retries amplify the outage and cost.
- D. Disable the gateway  
  _Rationale:_ Turning off the gateway removes exactly the control that handles this.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
