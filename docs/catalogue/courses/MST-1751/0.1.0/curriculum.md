# User Stories and Backlog Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1751` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PMB-SK-USBM-001 |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — User Stories and Backlog Management (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Thinking in user stories
2. Writing good stories
3. Splitting and sizing
4. Managing the backlog
5. From backlog to delivery

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on performance of the skill; applied practice comes through instructor-facilitated exercises and model-answer analysis.

## Modules

### M01 Thinking in user stories (MASTEMY-DESIGN 22%)

- Worked applications: (1) Rewrite a feature spec as a user story; (2) Identify the conversation a story should trigger
- Common misconception addressed: Treating a user story as a mini requirements document
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What a user story is and is not | 58 | 6 |
| M01L02 | The role of conversation over documentation | 58 | 6 |

### M02 Writing good stories (MASTEMY-DESIGN 20%)

- Worked applications: (1) Apply INVEST to critique a story; (2) Write acceptance criteria for a story
- Common misconception addressed: Writing stories so big they can never be finished in an iteration
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The story template and INVEST | 58 | 6 |
| M02L02 | Acceptance criteria | 58 | 6 |

### M03 Splitting and sizing (MASTEMY-DESIGN 20%)

- Worked applications: (1) Split an epic into thin vertical slices; (2) Size two stories relative to each other
- Common misconception addressed: Splitting by technical layer instead of by value
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Splitting large stories (epics) | 58 | 6 |
| M03L02 | Relative sizing basics | 58 | 6 |

### M04 Managing the backlog (MASTEMY-DESIGN 20%)

- Worked applications: (1) Order a small backlog by value and risk; (2) Run a refinement pass on messy items
- Common misconception addressed: Letting the backlog become a bottomless wish list
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Ordering by value and risk | 57 | 6 |
| M04L02 | Refinement and keeping the backlog healthy | 57 | 6 |

### M05 From backlog to delivery (MASTEMY-DESIGN 18%)

- Worked applications: (1) Apply a definition of ready to a story; (2) Interpret a burndown without gaming it
- Common misconception addressed: Marking work 'done' when it only meets part of the criteria
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Definition of ready and done | 57 | 6 |
| M05L02 | Tracking progress honestly | 57 | 6 |

## Integrative case

A team's backlog is a 200-item dumping ground of vague one-liners and giant features. Bring it under control: rewrite items as user stories with acceptance criteria, apply INVEST, split epics into valuable slices, order by value and risk, and establish definitions of ready and done so delivery becomes predictable.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1751-final-protected | 25 | 25 | yes |
| MST-1751-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Thinking in user stories | 5 |
| Writing good stories | 5 |
| Splitting and sizing | 5 |
| Managing the backlog | 5 |
| From backlog to delivery | 5 |

Minimum reviewed item bank: 270 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1751-Q0001** (single-answer, Select ONE) Which best describes the purpose of a user story?

- A. A short placeholder that prompts a conversation about a need **(key)**  
  _Rationale:_ Correct: stories capture intent and trigger discussion, not full specs.
- B. A complete, signed-off requirements specification  
  _Rationale:_ Stories deliberately avoid being exhaustive up-front specs.
- C. A technical design document for developers  
  _Rationale:_ Design is separate; a story expresses user value.
- D. A fixed contract that cannot change  
  _Rationale:_ Stories are refined and can change as understanding grows.

**MST-1751-Q0002** (multiple-answer, Select TWO) Which statements about splitting a large story are correct? (Select TWO)

- A. Each slice should still deliver observable user value **(key)**  
  _Rationale:_ Correct: vertical slices keep each piece valuable and demonstrable.
- B. Splitting should keep stories small enough to finish in one iteration **(key)**  
  _Rationale:_ Correct: right-sized stories improve flow and feedback.
- C. Stories should be split by technical layer such as 'the database part'  
  _Rationale:_ Layer splits produce pieces with no standalone user value.
- D. A split story must never have acceptance criteria  
  _Rationale:_ Every story, including slices, needs acceptance criteria.

**MST-1751-Q0003** (single-answer, Select ONE) A story is marked 'done' although two of its five acceptance criteria are unmet. What principle is violated?

- A. Definition of done requires all acceptance criteria to be satisfied **(key)**  
  _Rationale:_ Correct: partial completion is not done and hides remaining work.
- B. Acceptance criteria are optional  
  _Rationale:_ They define what done means for the story.
- C. Done means the developer feels finished  
  _Rationale:_ Done is defined by agreed criteria, not personal judgement.
- D. Stories should not have acceptance criteria  
  _Rationale:_ Criteria are essential to judging completion.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
