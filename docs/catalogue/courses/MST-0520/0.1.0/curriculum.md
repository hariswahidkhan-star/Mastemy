# Claude for Course Authoring and Learning-Outcome Mapping

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0520` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude product and Help Center pages; the egress proxy blocked docs.anthropic.com this session (EGRESS_BLOCKED), so no official page was read. Features, plan names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-COURSE-AUTHORING |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude for Course Authoring and Learning-Outcome Mapping (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Write measurable learning outcomes at appropriate cognitive levels
2. Map content to outcomes and detect coverage gaps
3. Draft assessment items that genuinely align to their outcomes
4. Ensure every outcome is both taught and assessed
5. Review a drafted course and document outstanding quality needs

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use or writing quality; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 Learning outcomes (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Rewrite vague goals as measurable learning outcomes; (2) Choose an appropriate cognitive level for each outcome
- Common misconception addressed: Writing outcomes that describe activities rather than measurable learning
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What makes a learning outcome measurable | 72 | 5 |
| M01L02 | Cognitive levels and verbs | 72 | 5 |

### M02 Mapping content to outcomes (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Map each lesson to the outcome it serves; (2) Find outcomes with no supporting content
- Common misconception addressed: Assuming content covers an outcome without checking the mapping
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Building an outcome-to-content map | 96 | 5 |
| M02L02 | Finding coverage gaps | 96 | 5 |

### M03 Assessment alignment (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Draft assessment items aligned to a specific outcome; (2) Check that an item measures the outcome it claims to
- Common misconception addressed: Writing assessment items that test recall when the outcome requires application
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Aligning items to outcomes | 80 | 5 |
| M03L02 | Matching item depth to outcome depth | 80 | 5 |
| M03L03 | Reviewing items for construct relevance | 80 | 5 |

### M04 Coverage and constructive alignment (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Verify every outcome is both taught and assessed; (2) Fix an outcome that is taught but never assessed
- Common misconception addressed: Marking an outcome covered when nothing actually assesses it
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | The taught-and-assessed check | 96 | 5 |
| M04L02 | Closing alignment gaps | 96 | 5 |

### M05 Review and quality (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Run a structured review of a drafted course; (2) Record assumptions and what still needs SME review
- Common misconception addressed: Treating an AI-drafted course as finished without SME review
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | A course review checklist | 96 | 5 |
| M05L02 | Documenting assumptions and SME needs | 96 | 5 |

## Integrative case

An instructional designer uses Claude to build a short course: write measurable learning outcomes, map content to each outcome, draft aligned assessment items, and check that every outcome is both taught and assessed before the course is signed off.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0520-final-protected | 30 | 40 | yes |
| MST-0520-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Learning outcomes | 5 |
| Mapping content to outcomes | 6 |
| Assessment alignment | 7 |
| Coverage and constructive alignment | 6 |
| Review and quality | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0520-Q0001** (single-answer, Select ONE) An outcome reads 'Students will watch three videos'. Why is this a weak learning outcome?

- A. It describes an activity, not measurable learning **(key)**  
  _Rationale:_ Correct: outcomes should state what the learner can do, not an activity performed.
- B. It names too few videos  
  _Rationale:_ The count is not the problem.
- C. It is too short  
  _Rationale:_ Length is not the issue.
- D. It mentions students  
  _Rationale:_ Referring to students is appropriate.

**MST-0520-Q0002** (multiple-answer, Select TWO) Which TWO checks confirm constructive alignment in a course? (Select TWO.)

- A. Every outcome has content that teaches it **(key)**  
  _Rationale:_ Correct: outcomes must be taught.
- B. Every outcome has an assessment that measures it **(key)**  
  _Rationale:_ Correct: outcomes must also be assessed.
- C. Every lesson has the same length  
  _Rationale:_ Equal length is unrelated to alignment.
- D. Outcomes are hidden from learners  
  _Rationale:_ Hiding outcomes does not aid alignment.

**MST-0520-Q0003** (single-answer, Select ONE) An outcome requires learners to 'apply' a method, but the draft item only asks them to define it. What is the alignment problem?

- A. The item tests recall, not the application the outcome requires **(key)**  
  _Rationale:_ Correct: item depth must match the outcome's cognitive level.
- B. The item is too long  
  _Rationale:_ Length is not the alignment issue.
- C. The outcome is wrong  
  _Rationale:_ The outcome is fine; the item is misaligned.
- D. Nothing is wrong  
  _Rationale:_ There is a real depth mismatch.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
