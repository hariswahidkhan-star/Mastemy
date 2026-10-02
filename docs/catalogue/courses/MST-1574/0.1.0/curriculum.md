# Technical Documentation for Developers

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1574` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-TDD-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Technical Documentation for Developers (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Documentation foundations
2. Types of documentation
3. Getting started docs
4. Reference docs
5. How-to guides
6. Writing clearly
7. Maintaining docs
8. Publishing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on writing technical documentation; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Documentation foundations (MASTEMY-DESIGN 13%)

- Worked applications: (1) Identify the reader of a given doc; (2) State the goal of a documentation page
- Common misconception addressed: Writing for yourself instead of the intended audience
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why docs matter | 60 | 5 |
| M01L02 | Audience and purpose | 60 | 5 |

### M02 Types of documentation (MASTEMY-DESIGN 13%)

- Worked applications: (1) Classify a page by the Divio four types; (2) Pick the right type for a user's need
- Common misconception addressed: Mixing a tutorial and a reference into one confusing page
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Tutorials, how-tos, reference, explanation | 60 | 5 |
| M02L02 | Choosing the right type | 60 | 5 |

### M03 Getting started docs (MASTEMY-DESIGN 12%)

- Worked applications: (1) Write a copy-pasteable quickstart; (2) Verify the install steps actually work
- Common misconception addressed: Assuming the reader shares your environment and context
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Quickstarts and installation | 60 | 5 |
| M03L02 | First runnable example | 60 | 5 |

### M04 Reference docs (MASTEMY-DESIGN 13%)

- Worked applications: (1) Document a function's parameters and return; (2) List the errors a call can raise
- Common misconception addressed: Describing behaviour vaguely without signatures
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Documenting an API | 60 | 5 |
| M04L02 | Parameters, returns and errors | 60 | 5 |

### M05 How-to guides (MASTEMY-DESIGN 12%)

- Worked applications: (1) Write a how-to for a specific task; (2) State prerequisites up front
- Common misconception addressed: Burying the task under unrelated background
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Task-oriented guides | 60 | 5 |
| M05L02 | Steps and prerequisites | 60 | 5 |

### M06 Writing clearly (MASTEMY-DESIGN 13%)

- Worked applications: (1) Simplify a dense paragraph; (2) Add a minimal runnable example
- Common misconception addressed: Using jargon without defining it
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Plain language and structure | 60 | 5 |
| M06L02 | Examples and code samples | 60 | 5 |

### M07 Maintaining docs (MASTEMY-DESIGN 12%)

- Worked applications: (1) Review docs in the same PR as code; (2) Flag a doc that drifted from the code
- Common misconception addressed: Letting docs rot after the code changes
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Docs as code and versioning | 60 | 5 |
| M07L02 | Keeping docs in sync with code | 60 | 5 |

### M08 Publishing (MASTEMY-DESIGN 12%)

- Worked applications: (1) Organise docs into a navigable structure; (2) Add a feedback mechanism to a page
- Common misconception addressed: Publishing docs with no navigation or search
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Static site generators | 60 | 5 |
| M08L02 | Structure, search and feedback | 60 | 5 |

## Integrative case

Document a small library: write a README with a quickstart, an API reference, a how-to guide and a short conceptual explanation, choosing the right documentation type for each need and making examples runnable.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1574-final-protected | 40 | 40 | yes |
| MST-1574-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Documentation foundations | 5 |
| Types of documentation | 5 |
| Getting started docs | 5 |
| Reference docs | 5 |
| How-to guides | 5 |
| Writing clearly | 5 |
| Maintaining docs | 5 |
| Publishing | 5 |

Minimum reviewed item bank: 400 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1574-Q0001** (single-answer, Select ONE) In the Divio documentation system, how does a tutorial differ from a how-to guide?

- A. A tutorial teaches a beginner through a guided lesson; a how-to solves a specific task for someone who already knows the basics **(key)**  
  _Rationale:_ Correct: they serve different readers and goals.
- B. A tutorial is reference material listing every parameter  
  _Rationale:_ That describes reference, not a tutorial.
- C. A how-to explains underlying concepts and theory  
  _Rationale:_ That describes explanation, not a how-to.
- D. They are interchangeable names for the same thing  
  _Rationale:_ They are distinct documentation types.

**MST-1574-Q0002** (single-answer, Select ONE) Why should a quickstart's example be copy-pasteable and verified?

- A. A reader can succeed immediately, building trust and reducing support load **(key)**  
  _Rationale:_ Correct: a working first example is the strongest onboarding.
- B. It makes the docs site load faster  
  _Rationale:_ Unrelated to page speed.
- C. It replaces the need for reference docs  
  _Rationale:_ Reference is still needed for details.
- D. It guarantees the library has no bugs  
  _Rationale:_ It does not prove correctness of the library.

**MST-1574-Q0003** (multiple-answer, Select ALL that apply) Which practices keep documentation trustworthy over time? (Select TWO)

- A. Treat docs as code and update them in the same pull request as the change **(key)**  
  _Rationale:_ Correct: coupling docs to changes prevents drift.
- B. Provide minimal, runnable examples that are tested **(key)**  
  _Rationale:_ Correct: verified examples stay accurate.
- C. Write docs once and never revisit them  
  _Rationale:_ False; stale docs mislead readers.
- D. Fill reference pages with marketing language  
  _Rationale:_ False; reference should be precise and factual.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
