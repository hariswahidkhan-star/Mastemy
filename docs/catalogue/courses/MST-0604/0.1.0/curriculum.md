# RAG for Technical Documentation and Codebases

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0604` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs. Tool- and model-specific behaviour is vendor-neutral here and must be verified against the current official documentation at production. |
| Evidence | **n/a-no-official-syllabus** - no official source syllabus exists for this skills scope |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — RAG for Technical Documentation and Codebases (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what makes code and doc retrieval distinctive
2. Chunk code along meaningful boundaries
3. Index symbols, references and dependencies
4. Retrieve answers for the correct version or release
5. Ground answers with exact, openable citations
6. Keep the code index fresh as the repo changes

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 RAG over code and docs (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Identify where code structure matters for retrieval; (2) Distinguish doc questions from code questions
- Common misconception addressed: Treating code as ordinary prose
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Code vs prose retrieval | 80 | 8 |
| M01L02 | Docs, APIs and examples | 80 | 8 |

### M02 Parsing and chunking code (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Chunk by function/class rather than fixed size; (2) Keep signatures with their implementations
- Common misconception addressed: Fixed-size chunks that split functions
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Syntax-aware chunking | 80 | 8 |
| M02L02 | Keeping context with definitions | 80 | 8 |

### M03 Indexing symbols and relationships (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Index definitions and their usages; (2) Link a function to its callers
- Common misconception addressed: Indexing text only and losing references
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Symbol and reference indexing | 80 | 8 |
| M03L02 | Dependency and usage links | 80 | 8 |

### M04 Version-aware retrieval (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Answer for a specific release or branch; (2) Flag when an API changed between versions
- Common misconception addressed: Mixing APIs from incompatible versions
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Version and branch awareness | 80 | 8 |
| M04L02 | Handling API changes | 80 | 8 |

### M05 Grounded, located answers (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Cite file and line a developer can open; (2) Show the relevant snippet, not a paraphrase
- Common misconception addressed: Paraphrasing code and inventing APIs
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | File and line citations | 80 | 8 |
| M05L02 | Showing real snippets | 80 | 8 |

### M06 Freshness and maintenance (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Reindex on relevant commits; (2) Detect stale answers after refactors
- Common misconception addressed: Serving answers from a stale index
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Reindexing on change | 80 | 8 |
| M06L02 | Detecting stale results | 80 | 8 |

## Integrative case

A developer assistant answers questions over a large codebase and its docs. Design retrieval that understands code structure and versions, keeps answers grounded in the right file and release, handles API changes, and cites exact locations developers can open.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0604-final-protected | 40 | 40 | yes |
| MST-0604-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| RAG over code and docs | 7 |
| Parsing and chunking code | 7 |
| Indexing symbols and relationships | 7 |
| Version-aware retrieval | 7 |
| Grounded, located answers | 6 |
| Freshness and maintenance | 6 |

Minimum reviewed item bank: 440 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0604-Q0001** (single-answer, Select ONE) A code assistant splits a function across two fixed-size chunks, so retrieval returns half a function. What chunking change helps most?

- A. Chunk along syntactic boundaries so functions and classes stay intact **(key)**  
  _Rationale:_ Correct: syntax-aware chunking keeps meaningful units together.
- B. Make chunks even smaller  
  _Rationale:_ Smaller fixed chunks worsen fragmentation.
- C. Remove all comments first  
  _Rationale:_ Comments are not the cause of the split.
- D. Index only file names  
  _Rationale:_ That removes the content entirely.

**MST-0604-Q0002** (multiple-answer, Select TWO) Which TWO practices keep a code assistant's answers trustworthy? (Select TWO.)

- A. Retrieve for the correct version or branch the user is on **(key)**  
  _Rationale:_ Correct: version-aware retrieval avoids mixing incompatible APIs.
- B. Cite exact file and line and show the real snippet **(key)**  
  _Rationale:_ Correct: precise, openable citations let developers verify.
- C. Paraphrase code from memory  
  _Rationale:_ Paraphrase invites invented APIs.
- D. Serve from a never-updated index  
  _Rationale:_ Stale indexes give outdated answers.

**MST-0604-Q0003** (single-answer, Select ONE) After a large refactor, the assistant still returns old function names. What is the fix?

- A. Reindex on relevant commits and detect stale results **(key)**  
  _Rationale:_ Correct: freshness requires reindexing and stale-detection.
- B. Increase the context window  
  _Rationale:_ A bigger window does not refresh stale content.
- C. Lower the temperature  
  _Rationale:_ Temperature does not update the index.
- D. Ask users to phrase questions differently  
  _Rationale:_ The problem is the stale index, not phrasing.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
