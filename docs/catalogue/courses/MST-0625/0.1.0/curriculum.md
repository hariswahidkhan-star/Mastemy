# AI Data Leakage Prevention and Secret Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0625` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — AI Data Leakage Prevention and Secret Management (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Identify where sensitive data and secrets can leak in AI systems
2. Apply least privilege, redaction and masking
3. Manage secrets with a vault and short-lived credentials
4. Monitor, test and respond to leakage

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Leakage surfaces (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Map how a secret could reach prompts, logs or model output; (2) Classify data fields by sensitivity
- Common misconception addressed: Assuming data is safe once it is 'inside' the system
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Where leaks happen | 80 | 5 |
| M01L02 | Prompts, logs and outputs | 80 | 5 |
| M01L03 | Data classification | 80 | 5 |

### M02 Protecting data (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Redact or mask sensitive fields before they reach the model or logs; (2) Apply least privilege to what each component can read
- Common misconception addressed: Logging full prompts and responses including sensitive data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Redaction and masking | 80 | 5 |
| M02L02 | Least-privilege access | 80 | 5 |
| M02L03 | Minimising what the model sees | 80 | 5 |

### M03 Secrets and response (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Move a hard-coded key into a vault with a short-lived token; (2) Add detection for a secret appearing in output or logs
- Common misconception addressed: Keeping long-lived secrets hard-coded in config or prompts
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Vaults and short-lived credentials | 80 | 5 |
| M03L02 | Leak detection and monitoring | 80 | 5 |
| M03L03 | Incident response and rotation | 80 | 5 |

## Integrative case

A team prevents data leakage in an AI product: map where secrets and sensitive data flow through prompts, logs and tools, redact and mask sensitive fields, move credentials into a managed vault with short-lived tokens, and monitor and test for leaks before and after release.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0625-final-protected | 30 | 30 | yes |
| MST-0625-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Leakage surfaces | 10 |
| Protecting data | 10 |
| Secrets and response | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0625-Q0001** (single-answer, Select ONE) Which is a common and avoidable data-leakage surface in AI systems?

- A. Logging full prompts and responses containing sensitive data **(key)**  
  _Rationale:_ Correct: unredacted prompt/response logs are a frequent leak source.
- B. Using a model at all  
  _Rationale:_ Using a model is not itself a leak; how data is handled is.
- C. Writing clear documentation  
  _Rationale:_ Documentation is not a leakage surface.
- D. Naming variables descriptively  
  _Rationale:_ Variable naming does not leak data.

**MST-0625-Q0002** (multiple-answer, Select TWO) Which TWO reduce the risk of secret leakage? (Select TWO.)

- A. Store secrets in a vault and issue short-lived credentials **(key)**  
  _Rationale:_ Correct: a vault with short-lived tokens limits exposure if one leaks.
- B. Redact sensitive fields before they reach prompts and logs **(key)**  
  _Rationale:_ Correct: redaction keeps sensitive data out of places it can leak.
- C. Hard-code API keys directly in the prompt template  
  _Rationale:_ Secrets in prompts are easily exposed.
- D. Email the production keys to the whole team  
  _Rationale:_ Broad distribution of secrets maximises leak risk.

**MST-0625-Q0003** (single-answer, Select ONE) What is the principle of least privilege applied to an AI component's data access?

- A. Give each component access only to the data it genuinely needs **(key)**  
  _Rationale:_ Correct: least privilege minimises what can leak from any one component.
- B. Give every component full access for convenience  
  _Rationale:_ Broad access is the opposite of least privilege.
- C. Remove all access so nothing works  
  _Rationale:_ Least privilege is minimal necessary access, not zero access.
- D. Grant access based on seniority only  
  _Rationale:_ Access should follow need, not title.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
