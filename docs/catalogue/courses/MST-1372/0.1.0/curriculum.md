# AI Red Teaming Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1372` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Red teaming foundations
2. Attacking LLMs and apps
3. Attacking ML models
4. From findings to defence

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Red teaming foundations (MASTEMY-DESIGN 25%)

- Worked applications: (1) Set rules of engagement for a test; (2) Scope a red-team exercise
- Common misconception addressed: Confusing ad-hoc prompt poking with a structured red-team exercise
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What AI red teaming is | 72 | 6 |
| M01L02 | Scope, rules of engagement and ethics | 72 | 6 |

### M02 Attacking LLMs and apps (MASTEMY-DESIGN 25%)

- Worked applications: (1) Craft a prompt-injection test; (2) Probe for data-exfiltration paths
- Common misconception addressed: Assuming a model refusal in one phrasing means it is safe in all
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Prompt injection and jailbreaks | 72 | 6 |
| M02L02 | Data exfiltration and tool misuse | 72 | 6 |

### M03 Attacking ML models (MASTEMY-DESIGN 25%)

- Worked applications: (1) Design an evasion test; (2) Assess model-extraction exposure
- Common misconception addressed: Believing accuracy on clean data implies robustness to attacks
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Adversarial examples and evasion | 72 | 6 |
| M03L02 | Data poisoning and model extraction | 72 | 6 |

### M04 From findings to defence (MASTEMY-DESIGN 25%)

- Worked applications: (1) Write up a red-team finding; (2) Recommend layered defences
- Common misconception addressed: Patching one jailbreak string instead of the underlying weakness
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reporting, severity and disclosure | 72 | 6 |
| M04L02 | Guardrails and defence-in-depth | 72 | 6 |

## Integrative case

Before launch, you must red-team a customer-facing LLM assistant with tool access. Set rules of engagement, test prompt injection and exfiltration, assess adversarial and poisoning exposure, and report findings that drive defence-in-depth rather than one-off string blocks.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1372-final-protected | 20 | 20 | yes |
| MST-1372-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Red teaming foundations | 5 |
| Attacking LLMs and apps | 5 |
| Attacking ML models | 5 |
| From findings to defence | 5 |

Minimum reviewed item bank: 232 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1372-Q0001** (single-answer, Select ONE) Why are clear rules of engagement essential before red teaming?

- A. They define authorised scope and limits, keeping testing legal and safe **(key)**  
  _Rationale:_ Correct: ROE prevent harm and unauthorised actions.
- B. They guarantee no vulnerabilities will be found  
  _Rationale:_ ROE govern conduct, not findings.
- C. They make the system faster  
  _Rationale:_ Unrelated to performance.
- D. They replace the need for any report  
  _Rationale:_ Reporting is still required.

**MST-1372-Q0002** (multiple-answer, Select TWO) Which TWO are genuine LLM-application attack classes a red team probes? (Select TWO.)

- A. Prompt injection via untrusted content **(key)**  
  _Rationale:_ Correct: injected instructions can hijack the model.
- B. Data exfiltration through tool or retrieval misuse **(key)**  
  _Rationale:_ Correct: attackers can coax out sensitive data.
- C. Running out of disk space on the laptop  
  _Rationale:_ Not an AI attack class.
- D. Choosing a slower font  
  _Rationale:_ Irrelevant to security.

**MST-1372-Q0003** (single-answer, Select ONE) A single jailbreak phrase is blocked. Why is that insufficient as a fix?

- A. The underlying weakness remains and countless rephrasings can bypass one string **(key)**  
  _Rationale:_ Correct: defence must address the root cause, not one string.
- B. Blocking one string fixes all jailbreaks  
  _Rationale:_ It does not; variations remain.
- C. Red teaming forbids any fixes  
  _Rationale:_ Fixes are the goal.
- D. Guardrails are unnecessary after one block  
  _Rationale:_ Layered guardrails are still needed.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
