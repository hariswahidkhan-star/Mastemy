# Natural-Language-to-SQL Systems with Read-Only Safeguards

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0628` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Natural-Language-to-SQL Systems with Read-Only Safeguards (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Translate natural-language questions into SQL against a schema
2. Enforce read-only access and prevent destructive or unbounded queries
3. Validate, limit and sandbox generated SQL before execution
4. Verify results and handle ambiguity and failures

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 NL to SQL basics (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Provide schema context and generate SQL for a question; (2) Handle an ambiguous question by asking a clarifying question
- Common misconception addressed: Assuming the model knows the schema without being given it
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Schema context and grounding | 80 | 5 |
| M01L02 | Generating SQL | 80 | 5 |
| M01L03 | Handling ambiguity | 80 | 5 |

### M02 Read-only safeguards (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Configure a read-only database role for the feature; (2) Reject a generated statement that would write or delete
- Common misconception addressed: Relying on the prompt to forbid writes instead of a read-only role
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Read-only roles and permissions | 80 | 5 |
| M02L02 | Blocking destructive statements | 80 | 5 |
| M02L03 | Row and cost limits | 80 | 5 |

### M03 Validation and verification (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Validate and add a LIMIT to generated SQL before execution; (2) Run in a sandbox and verify the result against the question
- Common misconception addressed: Executing generated SQL directly on production with no validation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Query validation and limits | 80 | 5 |
| M03L02 | Sandboxed execution | 80 | 5 |
| M03L03 | Result verification | 80 | 5 |

## Integrative case

A team builds a safe natural-language-to-SQL feature: give the model the schema, generate SQL for a question, enforce a read-only role, validate and limit the query before running it in a sandbox, and verify results while handling ambiguous questions gracefully.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0628-final-protected | 30 | 30 | yes |
| MST-0628-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| NL to SQL basics | 10 |
| Read-only safeguards | 10 |
| Validation and verification | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0628-Q0001** (single-answer, Select ONE) What is the most reliable way to stop a natural-language-to-SQL feature from modifying data?

- A. Run queries under a database role that has read-only permissions **(key)**  
  _Rationale:_ Correct: a read-only role enforces the restriction at the database, not just in the prompt.
- B. Ask the model politely in the prompt not to write data  
  _Rationale:_ A prompt instruction can be bypassed and is not enforcement.
- C. Trust that the model will never generate a DELETE  
  _Rationale:_ Models can and do generate destructive statements.
- D. Disable logging of queries  
  _Rationale:_ Logging is unrelated to preventing writes.

**MST-0628-Q0002** (multiple-answer, Select TWO) Which TWO safeguards should wrap generated SQL before it runs? (Select TWO.)

- A. Validate the statement and reject writes or destructive operations **(key)**  
  _Rationale:_ Correct: validation blocks dangerous statements before execution.
- B. Add a row/time limit and run it in a sandbox with least privilege **(key)**  
  _Rationale:_ Correct: limits and sandboxing bound the damage and cost of a query.
- C. Execute it directly against the production primary with admin rights  
  _Rationale:_ That removes every safeguard and is highly risky.
- D. Skip verification of the result  
  _Rationale:_ Unverified results can be silently wrong.

**MST-0628-Q0003** (single-answer, Select ONE) A user's question is ambiguous about which date range to use. What should the system do?

- A. Ask a clarifying question rather than guessing a range **(key)**  
  _Rationale:_ Correct: clarifying avoids confidently returning the wrong answer.
- B. Pick a random range and run it  
  _Rationale:_ Guessing produces unreliable, misleading results.
- C. Return every row in the table  
  _Rationale:_ An unbounded dump is unsafe and unhelpful.
- D. Delete the ambiguous rows  
  _Rationale:_ A read-only feature must never delete, and deletion does not resolve ambiguity.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
