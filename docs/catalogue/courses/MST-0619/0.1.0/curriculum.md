# Agent Observability, Tracing, and Replay

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0619` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Agent Observability, Tracing, and Replay (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Instrument an agent with structured traces and spans
2. Capture prompts, tool calls, decisions and outcomes
3. Replay and diff runs to diagnose failures
4. Define metrics, sampling and privacy-safe logging

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Tracing fundamentals (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Add a trace with a span per agent step; (2) Record inputs and outputs for one tool call
- Common misconception addressed: Logging only the final answer and nothing about the steps that produced it
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Traces, spans and context | 80 | 5 |
| M01L02 | What to capture per step | 80 | 5 |
| M01L03 | Correlation and run IDs | 80 | 5 |

### M02 Replay and diagnosis (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Replay a recorded run to reproduce a failure; (2) Diff two runs to find where behaviour diverged
- Common misconception addressed: Trying to debug an agent from a single final error with no step history
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Replaying recorded runs | 80 | 5 |
| M02L02 | Diffing runs | 80 | 5 |
| M02L03 | Root-cause analysis | 80 | 5 |

### M03 Metrics and safe logging (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Define latency, cost and success metrics for the agent; (2) Redact sensitive fields before they reach the trace store
- Common misconception addressed: Writing secrets and personal data straight into traces
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Metrics and dashboards | 80 | 5 |
| M03L02 | Sampling under load | 80 | 5 |
| M03L03 | Privacy-safe redaction | 80 | 5 |

## Integrative case

A team makes an opaque agent debuggable: add structured tracing with spans for each step, capture prompts, tool calls and decisions, enable replay so a failed run can be reproduced and diffed, and define metrics and sampling while keeping sensitive data out of logs.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0619-final-protected | 30 | 30 | yes |
| MST-0619-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Tracing fundamentals | 10 |
| Replay and diagnosis | 10 |
| Metrics and safe logging | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0619-Q0001** (single-answer, Select ONE) Why capture a span for each agent step rather than only the final answer?

- A. Step-level traces show where behaviour went wrong, which a final answer cannot **(key)**  
  _Rationale:_ Correct: per-step visibility is what makes failures diagnosable.
- B. It makes the answer more creative  
  _Rationale:_ Tracing does not change answer content.
- C. It reduces the model's token cost  
  _Rationale:_ Tracing does not lower token usage.
- D. It is required to send the first request  
  _Rationale:_ An agent can run without tracing; tracing is for observability.

**MST-0619-Q0002** (multiple-answer, Select TWO) Which TWO practices keep observability safe and usable? (Select TWO.)

- A. Redact secrets and personal data before writing traces **(key)**  
  _Rationale:_ Correct: redaction keeps sensitive data out of the trace store.
- B. Sample traces under heavy load to control volume and cost **(key)**  
  _Rationale:_ Correct: sampling keeps observability affordable at scale.
- C. Write API keys verbatim into every span  
  _Rationale:_ Logging secrets is a serious leak.
- D. Disable all tracing in production  
  _Rationale:_ Turning off tracing removes the observability you need most in production.

**MST-0619-Q0003** (single-answer, Select ONE) A rare agent failure is hard to reproduce. What capability helps most?

- A. Replaying the recorded run and diffing it against a successful one **(key)**  
  _Rationale:_ Correct: replay plus diff reproduces the failure and isolates where it diverged.
- B. Rewriting the prompt from memory  
  _Rationale:_ Guessing the inputs will not faithfully reproduce the failure.
- C. Increasing the model size  
  _Rationale:_ A bigger model does not reproduce a past run.
- D. Deleting the trace store  
  _Rationale:_ Removing records destroys the data needed to diagnose.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
