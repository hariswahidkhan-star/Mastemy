# OpenAI Safety, Guardrails, and Prompt-Injection Defenses

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0507` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam | none - Mastemy skills course; no external exam or official syllabus |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — OpenAI Safety, Guardrails, and Prompt-Injection Defenses (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Identify safety risks and prompt-injection attacks in LLM applications
2. Apply input and output guardrails
3. Defend against prompt injection and data exfiltration
4. Monitor, test and respond to safety incidents

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Building guardrails and injection defenses and running adversarial tests are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded code or peer review.

## Modules

### M01 Threat foundations (25%)

- Worked applications: (1) Classify three risks for a given application; (2) Trace an injection through a tool call
- Common misconception addressed: Believing a system prompt alone keeps the model safe
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | LLM safety risks | 120 | 6 |
| M01L02 | How prompt injection works | 120 | 6 |

### M02 Guardrails (25%)

- Worked applications: (1) Add an input filter for out-of-scope requests; (2) Validate an output before acting on it
- Common misconception addressed: Trusting model output and acting on it without checks
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Input guardrails | 120 | 6 |
| M02L02 | Output guardrails | 120 | 6 |

### M03 Injection defenses (25%)

- Worked applications: (1) Separate untrusted document text from instructions; (2) Scope a tool to least privilege
- Common misconception addressed: Passing retrieved web or document text as if it were trusted instructions
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Isolating untrusted content | 120 | 6 |
| M03L02 | Limiting tool and data access | 120 | 6 |

### M04 Monitoring and response (25%)

- Worked applications: (1) Add logging that flags suspicious inputs; (2) Write an adversarial test for injection
- Common misconception addressed: Having no plan for when a guardrail is bypassed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Detecting and logging attacks | 120 | 6 |
| M04L02 | Incident response and testing | 120 | 6 |

## Integrative case

A team hardens a document question-and-answer assistant: it treats retrieved text as untrusted, adds input and output guardrails, scopes tools to least privilege, logs suspicious inputs, and runs adversarial injection tests with an incident plan before launch.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy-designed skills course; form length set from the assessment time budget, not an external exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0507-final-protected | 72 | 72 | yes |
| MST-0507-final-alternate | 72 | 72 | no (optional) |

| Domain | Items per form |
|---|---|
| Threat foundations | 18 |
| Guardrails | 18 |
| Injection defenses | 18 |
| Monitoring and response | 18 |

Minimum reviewed item bank: 408 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0507-Q0001** (single-answer, Select ONE) What is a prompt-injection attack?

- A. Untrusted content tricks the model into following instructions it should not **(key)**  
  _Rationale:_ Correct: injection hides adversarial instructions in untrusted content.
- B. A way to make the model respond faster  
  _Rationale:_ Injection is an attack, not a performance feature.
- C. A method for reducing token cost  
  _Rationale:_ Injection has nothing to do with cost.
- D. A type of billing error  
  _Rationale:_ Injection is a safety threat, not a billing issue.

**MST-0507-Q0002** (single-answer, Select ONE) How should retrieved document or web text be treated in an LLM application?

- A. As untrusted data, kept separate from trusted instructions **(key)**  
  _Rationale:_ Correct: untrusted content must not be treated as instructions.
- B. As trusted instructions the model should always follow  
  _Rationale:_ Treating retrieved text as instructions enables injection.
- C. As a replacement for all guardrails  
  _Rationale:_ Retrieved text does not replace guardrails.
- D. As a billing optimisation  
  _Rationale:_ This is a safety concern, not billing.

**MST-0507-Q0003** (multiple-answer, Select TWO) Which TWO controls help defend an assistant against prompt injection? (Select TWO)

- A. Scope tools to least privilege **(key)**  
  _Rationale:_ Correct: least privilege limits what an injection can achieve.
- B. Validate outputs before acting on them **(key)**  
  _Rationale:_ Correct: output validation catches unsafe actions.
- C. Trust any instruction found in retrieved text  
  _Rationale:_ Trusting retrieved instructions is the vulnerability itself.
- D. Remove all logging of suspicious inputs  
  _Rationale:_ Logging is needed to detect and respond to attacks.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
