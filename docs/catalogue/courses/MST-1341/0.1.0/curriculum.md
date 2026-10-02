# LLM Observability and Monitoring

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1341` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what observability means for LLM applications
2. Instrument traces, spans and token usage for LLM calls
3. Define metrics for latency, cost, quality and errors
4. Detect prompt and data drift in production
5. Design dashboards and alerts for an LLM service

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Observability for LLM apps (MASTEMY-DESIGN 20%)

- Worked applications: (1) List the signals worth capturing per request; (2) Explain why standard APM is not enough for LLMs
- Common misconception addressed: Treating an LLM call as an opaque black box
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What to observe in an LLM system | 72 | 8 |
| M01L02 | Logs, metrics and traces recap | 72 | 8 |

### M02 Tracing LLM calls (MASTEMY-DESIGN 20%)

- Worked applications: (1) Add spans around prompt build, model call and tools; (2) Capture token counts and cost per request
- Common misconception addressed: Logging only the final answer and nothing else
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Spans, traces and token accounting | 72 | 8 |
| M02L02 | Capturing prompts, outputs and tool steps | 72 | 8 |

### M03 Quality and cost metrics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Define a quality signal from user feedback; (2) Track cost per request and per feature
- Common misconception addressed: Watching latency but ignoring answer quality
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Latency, cost and error metrics | 72 | 8 |
| M03L02 | Online quality signals | 72 | 8 |

### M04 Drift detection (MASTEMY-DESIGN 20%)

- Worked applications: (1) Spot input distribution drift in logs; (2) Detect a drop in answer quality over time
- Common misconception addressed: Assuming inputs stay the same as at launch
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Input and output drift | 72 | 8 |
| M04L02 | Monitoring for degradation | 72 | 8 |

### M05 Dashboards and alerting (MASTEMY-DESIGN 20%)

- Worked applications: (1) Set an actionable alert threshold; (2) Design a dashboard for on-call triage
- Common misconception addressed: Alerting on everything until alerts are ignored
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Building useful dashboards | 72 | 8 |
| M05L02 | Alerting without fatigue | 72 | 8 |

## Integrative case

An LLM feature is live and occasionally gives slow or poor answers. Instrument the application with tracing and metrics, define the signals that distinguish a latency problem from a quality problem, set alert thresholds, and build a dashboard the on-call engineer can act on.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1341-final-protected | 25 | 25 | yes |
| MST-1341-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Observability for LLM apps | 5 |
| Tracing LLM calls | 5 |
| Quality and cost metrics | 5 |
| Drift detection | 5 |
| Dashboards and alerting | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1341-Q0001** (single-answer, Select ONE) Why is tracing individual spans (prompt build, model call, tool calls) valuable in an LLM app?

- A. It localises where latency or errors occur within a single request **(key)**  
  _Rationale:_ Correct: span-level traces show which step is slow or failing.
- B. It reduces the model's parameter count  
  _Rationale:_ Tracing is observability, not compression.
- C. It guarantees the answer is correct  
  _Rationale:_ Tracing measures behaviour; it does not ensure correctness.
- D. It removes the need for any metrics  
  _Rationale:_ Traces complement, not replace, metrics.

**MST-1341-Q0002** (multiple-answer, Select TWO) Which TWO signals should an LLM observability setup capture beyond standard app metrics? (Select TWO.)

- A. Token usage and cost per request **(key)**  
  _Rationale:_ Correct: tokens drive cost and are LLM-specific.
- B. Output quality signals such as user feedback or judge scores **(key)**  
  _Rationale:_ Correct: quality is a first-class LLM signal, not captured by uptime alone.
- C. Only CPU temperature of the client device  
  _Rationale:_ That is unrelated to LLM behaviour.
- D. Nothing beyond HTTP status codes  
  _Rationale:_ Status codes miss quality, cost and drift.

**MST-1341-Q0003** (single-answer, Select ONE) Users' questions have gradually changed topic since launch and answers are worse. Which concept names this?

- A. Input drift **(key)**  
  _Rationale:_ Correct: the input distribution has shifted away from what the system was tuned for.
- B. Overfitting  
  _Rationale:_ Overfitting is a training issue, not a production input shift.
- C. Quantisation  
  _Rationale:_ Quantisation is a compression technique, unrelated here.
- D. Rate limiting  
  _Rationale:_ Rate limiting controls request volume, not topic shift.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
