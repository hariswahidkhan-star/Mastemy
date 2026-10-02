# AI for Fraud Detection Teams

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1412` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 480 min; instruction I = 384 min (80%); assessment A = 96 min (20%) |
| Assessment split | lesson checks 24 / module checks 34 / cumulative 38 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Identify AI use cases in fraud detection
2. Interpret model alerts and risk scores
3. Balance detection against false positives and customer impact
4. Recognise fairness, bias and data constraints
5. Judge oversight and investigation standards

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 AI in fraud detection (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map AI uses across the fraud workflow; (2) Pick the highest-value use case
- Common misconception addressed: Treating a fraud score as proof of fraud
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Where AI fits in fraud work | 39 | 6 |
| M01L02 | Benefits, limits and expectations | 39 | 6 |

### M02 Alerts and scores (MASTEMY-DESIGN 20%)

- Worked applications: (1) Triage a set of fraud alerts; (2) Decide when a score warrants investigation
- Common misconception addressed: Acting on a score without investigation
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | How detection models work | 39 | 6 |
| M02L02 | Interpreting alerts and scores | 39 | 6 |

### M03 False positives and impact (MASTEMY-DESIGN 20%)

- Worked applications: (1) Judge a threshold's effect on false positives; (2) Weigh detection against customer friction
- Common misconception addressed: Maximising detection while ignoring customer harm
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Managing false positives | 38 | 6 |
| M03L02 | Customer impact and friction | 38 | 6 |

### M04 Fairness, bias and data (MASTEMY-DESIGN 20%)

- Worked applications: (1) Spot a bias risk affecting a customer group; (2) Check a data use against a privacy rule
- Common misconception addressed: Assuming a detection model treats all groups fairly
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Bias in detection models | 38 | 6 |
| M04L02 | Data, privacy and compliance | 38 | 6 |

### M05 Oversight and investigation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Define oversight for automated blocking; (2) Assign accountability for a decision
- Common misconception addressed: Automating high-stakes blocks with no human review
- Module check: 6 items / 6 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Human oversight of alerts | 38 | 6 |
| M05L02 | Investigation and accountability | 38 | 6 |

## Integrative case

A fraud team wants to use AI to detect and investigate fraud. Identify use cases, interpret model alerts and scores, manage false positives and fairness, protect data, and set oversight for high-stakes decisions.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1412-final-protected | 25 | 25 | yes |
| MST-1412-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI in fraud detection | 5 |
| Alerts and scores | 5 |
| False positives and impact | 5 |
| Fairness, bias and data | 5 |
| Oversight and investigation | 5 |

Minimum reviewed item bank: 238 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1412-Q0001** (single-answer, Select ONE) A model flags a transaction as likely fraud. What is the responsible next step?

- A. Investigate before acting, treating the score as a signal not proof **(key)**  
  _Rationale:_ Correct: a score is a signal that needs investigation, not proof.
- B. Permanently block the customer with no review  
  _Rationale:_ Acting on a score alone can harm innocent customers.
- C. Assume the model is always right  
  _Rationale:_ Models produce false positives.
- D. Ignore the alert entirely  
  _Rationale:_ Alerts should be triaged, not ignored.

**MST-1412-Q0002** (multiple-answer, Select TWO) Which TWO practices support responsible AI fraud detection? (Select TWO.)

- A. Keep human oversight of high-stakes actions like blocking **(key)**  
  _Rationale:_ Correct: oversight protects customers from wrongful action.
- B. Monitor models for bias across customer groups **(key)**  
  _Rationale:_ Correct: bias monitoring guards fairness.
- C. Automate permanent blocks with no review  
  _Rationale:_ That risks serious harm to innocent customers.
- D. Use customer data without regard to privacy rules  
  _Rationale:_ Privacy rules still apply.

**MST-1412-Q0003** (single-answer, Select ONE) Why manage the false-positive rate in a fraud model?

- A. Too many false positives harm genuine customers and erode trust **(key)**  
  _Rationale:_ Correct: false positives create friction and harm for innocent customers.
- B. False positives have no customer impact  
  _Rationale:_ They cause friction and harm.
- C. Only the detection rate matters  
  _Rationale:_ Both detection and false positives matter.
- D. False positives always indicate real fraud  
  _Rationale:_ By definition they are wrongly flagged legitimate cases.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
