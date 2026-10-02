# Prompt-Injection Defense and Untrusted-Content Handling

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0624` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Prompt-Injection Defense and Untrusted-Content Handling (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain prompt injection and why untrusted content is dangerous
2. Separate trusted instructions from untrusted data
3. Apply input and output defenses and least privilege
4. Test for injection and monitor in production

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Understanding injection (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Trace how injected text in a fetched page can hijack an agent; (2) Classify content sources as trusted or untrusted
- Common misconception addressed: Treating retrieved or user content as trusted instructions
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What prompt injection is | 80 | 5 |
| M01L02 | Direct vs indirect injection | 80 | 5 |
| M01L03 | Trust boundaries | 80 | 5 |

### M02 Defenses (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Structure a prompt so untrusted data cannot pose as instructions; (2) Constrain a tool so an injected instruction cannot misuse it
- Common misconception addressed: Believing a single clever system prompt fully prevents injection
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Separating instructions from data | 80 | 5 |
| M02L02 | Least-privilege tools | 80 | 5 |
| M02L03 | Input and output filtering | 80 | 5 |

### M03 Testing and monitoring (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Run a set of injection payloads against the agent; (2) Add a detector and alert for suspicious tool use
- Common misconception addressed: Testing once and assuming the defense holds forever
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Injection test suites | 80 | 5 |
| M03L02 | Detection and alerting | 80 | 5 |
| M03L03 | Defense in depth | 80 | 5 |

## Integrative case

A team hardens an assistant that reads web pages and documents: treat all fetched content as untrusted data rather than instructions, separate system instructions from retrieved text, constrain tools with least privilege, filter and validate outputs, and test with injection payloads before and after release.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0624-final-protected | 30 | 30 | yes |
| MST-0624-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Understanding injection | 10 |
| Defenses | 10 |
| Testing and monitoring | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0624-Q0001** (single-answer, Select ONE) What is the core principle for handling content an agent fetches from the web?

- A. Treat it as untrusted data, never as instructions to obey **(key)**  
  _Rationale:_ Correct: fetched content must be data, not commands, to prevent indirect injection.
- B. Treat it as trusted system instructions  
  _Rationale:_ That is exactly what enables indirect prompt injection.
- C. Execute any instructions it contains immediately  
  _Rationale:_ Obeying embedded instructions is the vulnerability.
- D. Give it the same authority as the developer's prompt  
  _Rationale:_ Untrusted content must never share the trusted prompt's authority.

**MST-0624-Q0002** (multiple-answer, Select TWO) Which TWO are effective layers of defense against prompt injection? (Select TWO.)

- A. Separate trusted instructions from untrusted data in the prompt structure **(key)**  
  _Rationale:_ Correct: a clear boundary stops data from posing as instructions.
- B. Constrain tools with least privilege so an injected command can do little **(key)**  
  _Rationale:_ Correct: least privilege limits the damage any injection can cause.
- C. Rely on one cleverly worded system prompt as the only defense  
  _Rationale:_ A single prompt is not robust; defense must be layered.
- D. Give the agent unrestricted tool access  
  _Rationale:_ Broad access maximises what an injection can exploit.

**MST-0624-Q0003** (single-answer, Select ONE) Why is a single well-crafted system prompt not a sufficient injection defense?

- A. Attackers adapt, so defense must be layered with tool limits, filtering and monitoring **(key)**  
  _Rationale:_ Correct: injection defense needs defense in depth, not one prompt.
- B. System prompts are illegal  
  _Rationale:_ System prompts are normal and legal.
- C. Prompts cannot contain instructions  
  _Rationale:_ Prompts do contain instructions; that is not the issue.
- D. It makes the model faster  
  _Rationale:_ Speed is unrelated to injection defense.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
