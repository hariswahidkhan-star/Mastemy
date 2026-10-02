# AI in Telecommunications

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1400` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

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

1. Identify AI use cases across telecom operations
2. Apply AI to network optimisation and predictive maintenance
3. Use AI for customer service and churn responsibly
4. Recognise data, privacy and security constraints
5. Judge bias, reliability and oversight needs

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 AI across telecom (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map AI use cases across the network and business; (2) Pick the highest-value use case
- Common misconception addressed: Expecting AI to fix structural network problems alone
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Where AI fits in telecom | 39 | 6 |
| M01L02 | Benefits, limits and hype | 39 | 6 |

### M02 Network operations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Judge an AI optimisation recommendation; (2) Assess a predictive-maintenance alert
- Common misconception addressed: Acting on AI alerts without verifying root cause
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Network optimisation with AI | 39 | 6 |
| M02L02 | Predictive maintenance and fault detection | 39 | 6 |

### M03 Customers and churn (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design an escalation path for an AI service bot; (2) Judge a churn-model recommendation for fairness
- Common misconception addressed: Targeting customers on a churn score without checks
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | AI for customer service | 38 | 6 |
| M03L02 | Churn prediction and retention | 38 | 6 |

### M04 Data, privacy and security (MASTEMY-DESIGN 20%)

- Worked applications: (1) Check a use case against a privacy rule; (2) Spot a security risk in an AI deployment
- Common misconception addressed: Assuming network and customer data can be used freely
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Customer and network data | 38 | 6 |
| M04L02 | Privacy, security and compliance | 38 | 6 |

### M05 Risk, bias and oversight (MASTEMY-DESIGN 20%)

- Worked applications: (1) Identify a bias risk in a telecom model; (2) Define oversight for an AI rollout
- Common misconception addressed: Trusting AI decisions without monitoring outcomes
- Module check: 6 items / 6 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Bias and reliability risks | 38 | 6 |
| M05L02 | Governance and oversight | 38 | 6 |

## Integrative case

A telecom operator wants to apply AI across network operations, customer service and fraud. Identify use cases, judge AI outputs for network and churn decisions, address data and privacy, and plan responsible deployment.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1400-final-protected | 25 | 25 | yes |
| MST-1400-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI across telecom | 5 |
| Network operations | 5 |
| Customers and churn | 5 |
| Data, privacy and security | 5 |
| Risk, bias and oversight | 5 |

Minimum reviewed item bank: 238 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1400-Q0001** (single-answer, Select ONE) A churn model flags a customer as high-risk. What is the responsible next step?

- A. Review the recommendation for fairness and accuracy before acting **(key)**  
  _Rationale:_ Correct: churn scores can be biased or wrong and need review.
- B. Automatically cut the customer's service  
  _Rationale:_ Acting blindly on a score can harm customers unfairly.
- C. Assume the score is always correct  
  _Rationale:_ Models can be wrong or biased.
- D. Ignore privacy rules when using the data  
  _Rationale:_ Privacy rules still apply to customer data.

**MST-1400-Q0002** (multiple-answer, Select TWO) Which TWO practices support responsible AI use in telecom? (Select TWO.)

- A. Use customer and network data within privacy and security rules **(key)**  
  _Rationale:_ Correct: lawful, secure data use protects customers and the operator.
- B. Monitor models for bias and reliability over time **(key)**  
  _Rationale:_ Correct: ongoing oversight catches drift and unfair outcomes.
- C. Share raw customer data with any vendor on request  
  _Rationale:_ Uncontrolled sharing breaches privacy and security.
- D. Deploy models once and never review them  
  _Rationale:_ Models degrade and need monitoring.

**MST-1400-Q0003** (single-answer, Select ONE) Why verify the root cause behind an AI fault-detection alert?

- A. Alerts can be false positives or point to the wrong cause **(key)**  
  _Rationale:_ Correct: verification avoids acting on misleading alerts.
- B. Alerts are always correct  
  _Rationale:_ AI alerts can be wrong.
- C. Root cause never matters for action  
  _Rationale:_ Correct action depends on the real cause.
- D. Verification wastes time with no benefit  
  _Rationale:_ Verification prevents costly wrong actions.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
