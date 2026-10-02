# Context Engineering for Production AI Systems

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0587` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Context Engineering for Production AI Systems (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Decide what belongs in a model's context and budget the window
2. Assemble context at runtime from retrieval, summarisation and caching
3. Prevent context leakage and injection
4. Balance context quality against cost and latency

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Designing context (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Decide which sources belong in context for a given query type; (2) Budget a fixed context window across instructions, history and retrieved text
- Common misconception addressed: Stuffing the window with everything available and hoping relevance sorts itself out
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What belongs in context | 80 | 5 |
| M01L02 | Context window budgeting | 80 | 5 |
| M01L03 | Prioritising and ordering context | 80 | 5 |

### M02 Assembling context at runtime (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Assemble context from retrieval plus a running summary; (2) Cache stable context to cut latency and cost
- Common misconception addressed: Re-fetching and re-sending unchanged context on every turn
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Retrieval and assembly pipelines | 80 | 5 |
| M02L02 | Summarisation and compression | 80 | 5 |
| M02L03 | Caching context | 80 | 5 |

### M03 Reliability and cost (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Measure whether retrieved context actually supports the answers; (2) Treat retrieved content as untrusted and prevent injected instructions from being followed
- Common misconception addressed: Trusting retrieved text as if it were part of the system instructions
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Measuring context quality | 80 | 5 |
| M03L02 | Preventing context leakage and injection | 80 | 5 |
| M03L03 | Cost and latency trade-offs | 80 | 5 |

## Integrative case

A production assistant must answer from large, changing knowledge under a fixed context budget. Decide what to include, assemble context at runtime with retrieval and summarisation, defend against injection and leakage, and tune for cost and latency.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0587-final-protected | 30 | 30 | yes |
| MST-0587-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Designing context | 10 |
| Assembling context at runtime | 10 |
| Reliability and cost | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0587-Q0001** (single-answer, Select ONE) Your context window is fixed and the knowledge base is large. What is the best general strategy?

- A. Retrieve and include only the most relevant context, budgeting the window across its parts **(key)**  
  _Rationale:_ Correct: relevance-driven, budgeted assembly uses the window effectively.
- B. Always fill the window with as much text as possible  
  _Rationale:_ Stuffing irrelevant text wastes the budget and can dilute relevance.
- C. Include the entire knowledge base every call  
  _Rationale:_ That is impossible under a fixed window and wasteful.
- D. Send only the user's last message with no retrieval  
  _Rationale:_ Dropping relevant context harms answer quality.

**MST-0587-Q0002** (multiple-answer, Select TWO) Which TWO practices reduce cost and latency without losing needed context? (Select TWO.) (Select TWO.)

- A. Cache stable context so it is not re-sent unchanged every turn **(key)**  
  _Rationale:_ Correct: caching avoids repeated cost for unchanged context.
- B. Summarise or compress long history while keeping key facts **(key)**  
  _Rationale:_ Correct: compression preserves signal while shrinking tokens.
- C. Re-fetch and re-send all context on every request  
  _Rationale:_ Re-sending unchanged context wastes cost and time.
- D. Always use the maximum context window regardless of need  
  _Rationale:_ Maximal context raises cost and latency needlessly.

**MST-0587-Q0003** (single-answer, Select ONE) Retrieved documents sometimes contain text like 'ignore previous instructions'. How should the system treat retrieved content?

- A. As untrusted data that must not be executed as instructions **(key)**  
  _Rationale:_ Correct: treating retrieved text as data defends against prompt injection.
- B. As trusted system instructions to follow  
  _Rationale:_ Following injected instructions is the vulnerability itself.
- C. As higher priority than the system prompt  
  _Rationale:_ Retrieved data must never override the system prompt.
- D. As safe because it came from the knowledge base  
  _Rationale:_ Source does not make embedded instructions safe.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
