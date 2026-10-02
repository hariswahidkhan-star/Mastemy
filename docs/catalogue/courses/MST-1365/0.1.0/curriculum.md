# AI Ethics and Fairness

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1365` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Foundations of AI ethics
2. Fairness definitions
3. Sources of unfairness
4. Responsible practice

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Foundations of AI ethics (MASTEMY-DESIGN 25%)

- Worked applications: (1) Map stakeholders and potential harms; (2) Apply a principle to a design choice
- Common misconception addressed: Treating ethics as a one-time checkbox rather than an ongoing practice
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Core principles: fairness, accountability, transparency | 72 | 6 |
| M01L02 | Stakeholders and harms | 72 | 6 |

### M02 Fairness definitions (MASTEMY-DESIGN 25%)

- Worked applications: (1) Pick a fairness definition for a case; (2) Show why two definitions conflict
- Common misconception addressed: Assuming one fairness metric can satisfy every stakeholder at once
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Group vs individual fairness | 72 | 6 |
| M02L02 | Demographic parity, equalised odds and trade-offs | 72 | 6 |

### M03 Sources of unfairness (MASTEMY-DESIGN 25%)

- Worked applications: (1) Trace a biased outcome to its source; (2) Identify a proxy variable for a protected trait
- Common misconception addressed: Believing removing a protected attribute removes bias
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Bias in data, labels and objectives | 72 | 6 |
| M03L02 | Feedback loops and proxies | 72 | 6 |

### M04 Responsible practice (MASTEMY-DESIGN 25%)

- Worked applications: (1) Draft a model/data documentation note; (2) Plan an ongoing fairness review
- Common misconception addressed: Thinking a fair launch stays fair without monitoring
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Transparency, documentation and consent | 72 | 6 |
| M04L02 | Governance and ongoing review | 72 | 6 |

## Integrative case

A lender's model is accused of disadvantaging a protected group. Identify where unfairness enters, choose and justify a fairness definition, show the trade-offs, and set documentation and ongoing review so the decision is defensible.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1365-final-protected | 20 | 20 | yes |
| MST-1365-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Foundations of AI ethics | 5 |
| Fairness definitions | 5 |
| Sources of unfairness | 5 |
| Responsible practice | 5 |

Minimum reviewed item bank: 232 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1365-Q0001** (single-answer, Select ONE) Why can simply deleting the protected attribute (e.g. race) fail to remove bias?

- A. Other features can act as proxies that still encode the protected trait **(key)**  
  _Rationale:_ Correct: correlated proxies reintroduce the bias.
- B. Deleting a column always removes all bias  
  _Rationale:_ It does not, because of proxies.
- C. The model cannot train without it  
  _Rationale:_ Models can train without it; that is not the issue.
- D. It violates the licence of the dataset  
  _Rationale:_ Not the reason bias persists.

**MST-1365-Q0002** (multiple-answer, Select TWO) Which TWO statements about fairness metrics are correct? (Select TWO.)

- A. Demographic parity and equalised odds can be mathematically incompatible **(key)**  
  _Rationale:_ Correct: you often cannot satisfy both at once.
- B. Choosing a fairness definition is a context-dependent value judgement **(key)**  
  _Rationale:_ Correct: the right metric depends on the harm and stakeholders.
- C. One metric is objectively correct for all situations  
  _Rationale:_ No single metric fits every case.
- D. Fairness metrics eliminate the need for human judgement  
  _Rationale:_ Human judgement remains essential.

**MST-1365-Q0003** (single-answer, Select ONE) What keeps a system fair after launch?

- A. Ongoing monitoring and periodic review for drift and new harms **(key)**  
  _Rationale:_ Correct: fairness can degrade as data and usage change.
- B. A single pre-launch audit forever  
  _Rationale:_ One audit cannot cover future drift.
- C. Higher model accuracy alone  
  _Rationale:_ Accuracy does not guarantee fairness.
- D. Removing all documentation  
  _Rationale:_ Documentation supports, not harms, accountability.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
