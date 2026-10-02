# Agent Memory, State, and Long-Running Task Design

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0618` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Agent Memory, State, and Long-Running Task Design (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Distinguish short-term context, working state and long-term memory
2. Design what to persist, summarise or discard
3. Implement durable state for long-running and resumable tasks
4. Manage memory growth, staleness and retrieval

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Kinds of memory (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Map a conversation's information to short-term, working and long-term stores; (2) Decide what to summarise versus store verbatim
- Common misconception addressed: Treating the context window as permanent memory
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Context window vs state vs memory | 80 | 5 |
| M01L02 | What to persist or summarise | 80 | 5 |
| M01L03 | Memory schemas | 80 | 5 |

### M02 Durable state (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Persist task state so a crashed task can resume; (2) Design a checkpoint for a multi-step long-running task
- Common misconception addressed: Keeping task progress only in memory so a restart loses it
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Persisting working state | 80 | 5 |
| M02L02 | Checkpoints and resumption | 80 | 5 |
| M02L03 | Idempotent steps | 80 | 5 |

### M03 Managing memory (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Add a retrieval step so only relevant memory enters the prompt; (2) Add an expiry/compaction policy to bound memory growth
- Common misconception addressed: Loading all memory into every prompt until the context overflows
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Retrieval over memory | 80 | 5 |
| M03L02 | Staleness and expiry | 80 | 5 |
| M03L03 | Compaction and cost | 80 | 5 |

## Integrative case

A team designs memory for an assistant that runs tasks over days: separate the live context window from durable state and long-term memory, decide what to persist or summarise, make tasks resumable after a crash, and keep memory from growing stale or unbounded.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0618-final-protected | 30 | 30 | yes |
| MST-0618-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Kinds of memory | 10 |
| Durable state | 10 |
| Managing memory | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0618-Q0001** (single-answer, Select ONE) Why is the model's context window a poor place to keep long-term memory?

- A. It is bounded and transient, so information in it is lost and cannot grow indefinitely **(key)**  
  _Rationale:_ Correct: the window has a fixed size and does not persist across sessions.
- B. It is encrypted and cannot be read  
  _Rationale:_ The context is readable by the model; that is not the issue.
- C. It automatically backs up to disk  
  _Rationale:_ The window is not a durable store.
- D. It grows without limit for free  
  _Rationale:_ The window is finite, which is exactly the problem.

**MST-0618-Q0002** (multiple-answer, Select TWO) Which TWO let a long-running task survive a crash and resume? (Select TWO.)

- A. Persist task state to a durable store at checkpoints **(key)**  
  _Rationale:_ Correct: durable checkpoints are what a restart reads to resume.
- B. Make each step idempotent so re-running it is safe **(key)**  
  _Rationale:_ Correct: idempotent steps allow safe resumption without double effects.
- C. Hold all progress only in local variables  
  _Rationale:_ Local state is lost on crash.
- D. Increase the model's temperature  
  _Rationale:_ Sampling settings do not provide durability.

**MST-0618-Q0003** (single-answer, Select ONE) An agent's prompts keep overflowing the context as memory grows. What is the right fix?

- A. Retrieve only relevant memory into the prompt and compact or expire the rest **(key)**  
  _Rationale:_ Correct: selective retrieval plus compaction keeps the prompt bounded.
- B. Always load the entire memory into every prompt  
  _Rationale:_ That is the cause of the overflow, not the fix.
- C. Delete the model  
  _Rationale:_ Removing the model does not manage memory.
- D. Disable the task  
  _Rationale:_ Turning off the task avoids rather than solves the problem.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
