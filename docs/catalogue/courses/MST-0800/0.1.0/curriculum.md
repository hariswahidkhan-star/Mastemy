# Anthropic + Python + Streamlit: Analytical Assistant Delivery

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0800` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Anthropic + Python + Streamlit: Analytical Assistant Delivery (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Scope an analytical assistant and the questions it will answer
2. Use the Anthropic API from Python reliably and safely
3. Perform analysis in Python with verifiable, reproducible results
4. Deliver the assistant in a Streamlit app with clear outputs
5. Operate the assistant with evaluation, limits and governance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Scoping the assistant (20%)

- Worked applications: (1) Turn a vague analytical ask into answerable questions; (2) Define analyses the assistant must not attempt unaided
- Common misconception addressed: Letting the assistant answer questions the data cannot support
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Defining analytical questions and data | 96 | 7 |
| M01L02 | Boundaries and what to refuse | 96 | 7 |

### M02 Anthropic API in Python (20%)

- Worked applications: (1) Call Claude from Python and parse a structured result; (2) Handle a transient API error gracefully
- Common misconception addressed: Assuming the API call always succeeds and returns clean output
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Reliable, structured calls to Claude | 96 | 7 |
| M02L02 | Timeouts, retries and error handling | 96 | 7 |

### M03 Verifiable analysis (20%)

- Worked applications: (1) Reproduce an analysis result from the raw data; (2) Catch an AI-suggested method that misreads the data
- Common misconception addressed: Trusting an AI-suggested analysis without reproducing it
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Reproducible analysis in Python | 96 | 7 |
| M03L02 | Checking AI-suggested analysis against the data | 96 | 7 |

### M04 Streamlit delivery (20%)

- Worked applications: (1) Build a Streamlit view that states its data and assumptions; (2) Surface uncertainty rather than a false-precise number
- Common misconception addressed: Presenting an analysis result with no assumptions or caveats
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Building clear, honest outputs | 96 | 7 |
| M04L02 | Showing assumptions, data and limits | 96 | 7 |

### M05 Operating the assistant (20%)

- Worked applications: (1) Evaluate assistant answers against known results; (2) Cap cost and rate without blocking legitimate analysis
- Common misconception addressed: Shipping with no evaluation or cost control
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Evaluation and monitoring | 96 | 7 |
| M05L02 | Cost, rate limits and governance | 96 | 7 |

## Integrative case

A data team ships an analytical assistant: scope answerable questions, call the Anthropic API from Python reliably, run reproducible analysis, deliver it in Streamlit with stated assumptions, and operate with evaluation and cost controls.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0800-final-protected | 40 | 50 | yes |
| MST-0800-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Scoping the assistant | 8 |
| Anthropic API in Python | 8 |
| Verifiable analysis | 8 |
| Streamlit delivery | 8 |
| Operating the assistant | 8 |

Minimum reviewed item bank: 388 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0800-Q0001** (single-answer, Select ONE) Claude suggests an analysis method that produces a striking result. Before presenting it, you should:

- A. Reproduce the result from the raw data and check the method fits **(key)**  
  _Rationale:_ Correct: a result must be reproducible and the method appropriate before use.
- B. Present it because the result is compelling  
  _Rationale:_ A compelling result can still be a methodological artefact.
- C. Ask Claude to confirm it is correct  
  _Rationale:_ The model's self-confirmation is not verification.
- D. Round the result to make it look more cautious  
  _Rationale:_ Rounding does not validate the underlying analysis.

**MST-0800-Q0002** (multiple-answer, Select TWO) Which TWO things should an analytical output show to be honest? (Select TWO.)

- A. The assumptions the analysis relies on **(key)**  
  _Rationale:_ Correct: readers must know what the result depends on.
- B. The data source and its as-of date **(key)**  
  _Rationale:_ Correct: provenance and currency let the reader judge the result.
- C. The maximum number of decimal places possible  
  _Rationale:_ False precision misleads about certainty.
- D. A headline number with no context  
  _Rationale:_ A context-free number invites misinterpretation.

**MST-0800-Q0003** (single-answer, Select ONE) A call to the Anthropic API fails with a transient error. What is the appropriate handling?

- A. Retry with backoff a bounded number of times, then surface the error **(key)**  
  _Rationale:_ Correct: bounded retries handle transient faults without hiding real failures.
- B. Crash the whole app so the user notices  
  _Rationale:_ Crashing on a transient fault is a poor user experience.
- C. Retry immediately and forever  
  _Rationale:_ Unbounded immediate retries worsen load and can hang the app.
- D. Silently return an empty result  
  _Rationale:_ Hiding the failure produces misleading empty output.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
