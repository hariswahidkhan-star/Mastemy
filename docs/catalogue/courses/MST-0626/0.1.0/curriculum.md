# LLM Application Threat Modeling

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0626` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — LLM Application Threat Modeling (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Map an LLM application's assets, entry points and trust boundaries
2. Enumerate LLM-specific threats and abuse cases
3. Rank risks and choose proportionate mitigations
4. Document and maintain the threat model

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Scoping the system (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Draw a data-flow diagram with trust boundaries; (2) List assets and entry points for one feature
- Common misconception addressed: Modeling the model in isolation and ignoring tools, data and users around it
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Assets and entry points | 80 | 5 |
| M01L02 | Data flows and trust boundaries | 80 | 5 |
| M01L03 | Actors and abuse cases | 80 | 5 |

### M02 Enumerating threats (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Enumerate LLM-specific threats for a retrieval-and-tools feature; (2) Write an abuse case for tool misuse
- Common misconception addressed: Only considering generic web threats and missing LLM-specific ones
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | LLM-specific threat categories | 80 | 5 |
| M02L02 | Injection, exfiltration and tool misuse | 80 | 5 |
| M02L03 | Using a structured method | 80 | 5 |

### M03 Mitigation and upkeep (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Rank risks by impact and likelihood; (2) Map each top risk to a proportionate mitigation
- Common misconception addressed: Listing threats but never ranking them or assigning mitigations
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Risk ranking | 80 | 5 |
| M03L02 | Choosing proportionate mitigations | 80 | 5 |
| M03L03 | Maintaining the threat model | 80 | 5 |

## Integrative case

A team threat-models an LLM feature before launch: diagram data flows, assets and trust boundaries, enumerate LLM-specific threats such as injection, data exfiltration and tool misuse, rank them by impact and likelihood, assign mitigations, and keep the model current as the system changes.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0626-final-protected | 30 | 30 | yes |
| MST-0626-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Scoping the system | 10 |
| Enumerating threats | 10 |
| Mitigation and upkeep | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0626-Q0001** (single-answer, Select ONE) What is a trust boundary in an LLM application threat model?

- A. A point where data or control passes between components with different trust levels **(key)**  
  _Rationale:_ Correct: trust boundaries are where untrusted input meets trusted processing.
- B. The maximum context window size  
  _Rationale:_ Context size is a limit, not a trust boundary.
- C. The model's temperature setting  
  _Rationale:_ Temperature is a sampling parameter, not a boundary.
- D. The number of users  
  _Rationale:_ User count is not a trust boundary.

**MST-0626-Q0002** (multiple-answer, Select TWO) Which TWO are LLM-specific threats worth modeling? (Select TWO.)

- A. Indirect prompt injection via retrieved content **(key)**  
  _Rationale:_ Correct: injection through untrusted content is an LLM-specific threat.
- B. Tool misuse where the model is steered to call tools harmfully **(key)**  
  _Rationale:_ Correct: tool misuse is a key LLM-application threat.
- C. Gravity affecting the datacenter  
  _Rationale:_ Not a meaningful software threat.
- D. The office running out of coffee  
  _Rationale:_ Not a security threat to the application.

**MST-0626-Q0003** (single-answer, Select ONE) After enumerating many threats, what is the next essential step?

- A. Rank them by impact and likelihood and assign proportionate mitigations **(key)**  
  _Rationale:_ Correct: ranking and mitigation turn a threat list into actionable security work.
- B. Publish the raw list and do nothing more  
  _Rationale:_ An unranked list with no mitigations does not reduce risk.
- C. Delete the diagram  
  _Rationale:_ Removing the model loses the analysis.
- D. Assume all threats are equally urgent  
  _Rationale:_ Treating everything as equal wastes effort on low risks.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
