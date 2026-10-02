# Data Ethics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1638` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-DAT-SK-DE-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain core data ethics principles and why they matter
2. Apply privacy, consent and data-minimisation principles
3. Identify and reduce bias and unfairness in data and models
4. Reason about transparency, accountability and explainability
5. Apply an ethical decision framework to real cases

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Principles and foundations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Match four scenarios to the principle most at stake; (2) Explain the difference between legal and ethical obligations
- Common misconception addressed: Assuming anything legal is automatically ethical
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why data ethics matters | 96 | 8 |
| M01L02 | Core principles and frameworks | 96 | 8 |

### M02 Privacy and consent (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide what data is truly necessary for a stated purpose; (2) Judge whether a described consent process is meaningful
- Common misconception addressed: Believing anonymisation is permanent and risk-free
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Privacy, consent and data minimisation | 96 | 8 |
| M02L02 | De-identification and re-identification risk | 96 | 8 |

### M03 Bias and fairness (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trace how biased training data produces an unfair outcome; (2) Explain why two fairness metrics can conflict
- Common misconception addressed: Assuming removing a sensitive attribute removes bias
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Sources of bias in data and models | 96 | 8 |
| M03L02 | Fairness notions and their trade-offs | 96 | 8 |

### M04 Transparency and accountability (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide what must be disclosed to people affected by a model; (2) Assign accountability for a harmful automated decision
- Common misconception addressed: Hiding behind 'the algorithm decided' to avoid accountability
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Transparency and explainability | 96 | 8 |
| M04L02 | Accountability and redress | 96 | 8 |

### M05 Ethical decision-making (MASTEMY-DESIGN 20%)

- Worked applications: (1) Work a described case through an ethical framework to a decision; (2) Identify the stakeholders and harms in a proposed data use
- Common misconception addressed: Treating ethics as a one-time checklist rather than ongoing judgement
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | An ethical decision framework | 96 | 8 |
| M05L02 | Applying it to real cases | 96 | 8 |

## Integrative case

A company plans to use customer data to train a scoring model. Identify the principles at stake, test whether consent and data minimisation are met, examine the data and metrics for bias and conflicting fairness notions, decide what must be disclosed and who is accountable, and reach a defensible recommendation using an ethical framework.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1638-final-protected | 25 | 25 | yes |
| MST-1638-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Principles and foundations | 5 |
| Privacy and consent | 5 |
| Bias and fairness | 5 |
| Transparency and accountability | 5 |
| Ethical decision-making | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1638-Q0001** (single-answer, Select ONE) Removing a sensitive attribute like race from the data will:

- A. Not necessarily remove bias, because correlated proxy variables can remain **(key)**  
  _Rationale:_ Correct: proxies can reintroduce the same bias.
- B. Always fully eliminate bias  
  _Rationale:_ Proxy variables mean bias can persist.
- C. Make the model illegal to use  
  _Rationale:_ Removal does not determine legality by itself.
- D. Guarantee fairness by every definition  
  _Rationale:_ Fairness definitions can still be violated.

**MST-1638-Q0002** (multiple-answer, Select TWO) Which TWO reflect sound data-ethics practice? (Select TWO.)

- A. Collect only the data necessary for the stated purpose **(key)**  
  _Rationale:_ Correct: data minimisation reduces risk and respects people.
- B. Keep a human accountable for consequential automated decisions **(key)**  
  _Rationale:_ Correct: accountability cannot be delegated to 'the algorithm'.
- C. Assume anything legal is automatically ethical  
  _Rationale:_ Legal and ethical obligations are not identical.
- D. Collect maximum data in case it is useful later  
  _Rationale:_ Over-collection violates minimisation and increases risk.

**MST-1638-Q0003** (single-answer, Select ONE) An automated system makes a harmful decision. Which stance is ethically sound?

- A. A named human or body remains accountable and must provide redress **(key)**  
  _Rationale:_ Correct: accountability stays with people, not the tool.
- B. No one is accountable because the algorithm decided  
  _Rationale:_ 'The algorithm decided' does not remove human accountability.
- C. The affected person bears all responsibility  
  _Rationale:_ Shifting blame to the affected person is not ethical.
- D. Accountability is unnecessary if the model is accurate  
  _Rationale:_ Accuracy does not remove the need for accountability.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
