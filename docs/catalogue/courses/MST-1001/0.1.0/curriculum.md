# Software Architecture Documentation and Decision Records

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1001` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | MST-PRG-SK-SAF-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Software Architecture Documentation and Decision Records (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Why and when to document architecture
2. Architecture decision records (ADRs)
3. The C4 model
4. Views, viewpoints and quality attributes
5. Diagramming notations and conventions
6. Keeping documentation alive

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Why and when to document architecture (MASTEMY-DESIGN 17%)

- Worked applications: (1) Identify the audience and decision a document must serve; (2) Decide what not to document to avoid stale pages
- Common misconception addressed: Believing more documentation is always better regardless of upkeep
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Purpose, audiences and the cost of documentation | 120 | 6 |
| M01L02 | Just-enough documentation and keeping it current | 120 | 6 |

### M02 Architecture decision records (ADRs) (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write an ADR capturing context, options and consequences; (2) Supersede an old ADR without deleting the history
- Common misconception addressed: Recording the chosen option but omitting the rejected alternatives and why
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Anatomy of an ADR: context, decision, consequences | 120 | 6 |
| M02L02 | Managing a log of ADRs over time | 120 | 6 |

### M03 The C4 model (MASTEMY-DESIGN 17%)

- Worked applications: (1) Draw a system context diagram for a stakeholder; (2) Produce a container diagram showing deployable units
- Common misconception addressed: Mixing abstraction levels in a single diagram
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Context and container diagrams | 120 | 6 |
| M03L02 | Component and code-level views and their limits | 120 | 6 |

### M04 Views, viewpoints and quality attributes (MASTEMY-DESIGN 17%)

- Worked applications: (1) Select the views needed for a given concern; (2) Write a measurable quality-attribute scenario
- Common misconception addressed: Treating a single box-and-line diagram as the whole architecture
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Documenting structures with multiple views | 120 | 6 |
| M04L02 | Capturing quality-attribute requirements and scenarios | 120 | 6 |

### M05 Diagramming notations and conventions (MASTEMY-DESIGN 16%)

- Worked applications: (1) Add a legend so arrows have unambiguous meaning; (2) Refactor an ambiguous diagram into a consistent notation
- Common misconception addressed: Assuming the reader infers the same meaning you intended from an unlabeled arrow
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Boxes, arrows and the meaning of a line | 120 | 6 |
| M05L02 | Legends, consistency and avoiding ambiguity | 120 | 6 |

### M06 Keeping documentation alive (MASTEMY-DESIGN 16%)

- Worked applications: (1) Store an ADR alongside code and review it in a PR; (2) Set up a diagram that regenerates from a source model
- Common misconception addressed: Writing docs once at kickoff and never revisiting them
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Docs-as-code and review in the pull request | 120 | 6 |
| M06L02 | Generated diagrams and drift detection | 120 | 6 |

## Integrative case

Produce the architecture documentation set for a new internal platform: write a set of ADRs for the key decisions, a C4 context and container view, and a lightweight architecture description that a new engineer and a stakeholder can each use, then review it for gaps.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1001-final-protected | 30 | 30 | yes |
| MST-1001-final-alternate | 30 | 30 | no (optional practice) |

Minimum reviewed item bank: 456 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1001-Q0001** (single-answer, Select ONE) A team wants to record why it chose event-driven integration over synchronous calls, including the alternatives it rejected. Which artifact fits?

- A. An architecture decision record (ADR) **(key)**  
  _Rationale:_ Correct: an ADR captures context, the decision, the alternatives and the consequences.
- B. A deployment runbook  
  _Rationale:_ A runbook documents operational steps, not design rationale.
- C. A sprint burndown chart  
  _Rationale:_ A burndown tracks progress, not architectural decisions.
- D. A unit test report  
  _Rationale:_ A test report shows test outcomes, not decision rationale.

**MST-1001-Q0002** (multiple-answer, Select TWO) Which TWO elements make a good ADR more useful later? (Select TWO)

- A. The context and forces that drove the decision **(key)**  
  _Rationale:_ Correct: future readers need the context to judge whether the decision still holds.
- B. The alternatives considered and why they were rejected **(key)**  
  _Rationale:_ Correct: recorded alternatives let a later team re-evaluate without redoing the analysis.
- C. The author's job title in large font  
  _Rationale:_ Formatting of the author's title adds no decision value.
- D. A promise never to revisit the decision  
  _Rationale:_ ADRs are meant to be superseded, not frozen.

**MST-1001-Q0003** (single-answer, Select ONE) In the C4 model, which diagram is most appropriate to show a non-technical stakeholder how the system fits among its users and external systems?

- A. The system context diagram **(key)**  
  _Rationale:_ Correct: the context diagram shows the system, its users and external systems at the highest level.
- B. The code-level class diagram  
  _Rationale:_ Class diagrams are too detailed for a stakeholder overview.
- C. The component diagram  
  _Rationale:_ Component diagrams expose internal structure beyond stakeholder needs.
- D. A database ER diagram  
  _Rationale:_ An ER diagram shows data structure, not the system's place among users.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
