# Salesforce Certified AI Associate Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1813` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Salesforce (no affiliation or endorsement) |
| Exam code | DESIGN ASSUMPTION: not confirmed (official source not verified) |
| Version basis | DESIGN ASSUMPTION - official outline not verified (network egress blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - no official source fetched; confirm outline, weightings and item counts before SME review |
| Legacy IDs | MST-BUS-SFDC-AIA-001 |
| Planned time | T = 1350 min; instruction I = 1080 min (80%); assessment A = 270 min (20%) |
| Assessment split | lesson checks 45 / module checks 105 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain AI fundamentals, including common AI types, terms and how models use data
2. Describe the business and ethical implications of AI, including bias, transparency and accountability
3. Explain Salesforce's trusted AI and ethical-use principles and guidelines
4. Describe data quality and its role in generating trustworthy AI outcomes on the platform

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 AI Fundamentals (weight: DESIGN ASSUMPTION - unverified)

- Worked applications: (1) Classify three CRM scenarios as prediction, classification or generation; (2) Explain in plain terms how training data shapes a model's output
- Common misconception addressed: Believing AI 'understands' like a person rather than predicting from data
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What AI is: machine learning, generative AI and common terminology | 120 | 6 |
| M01L02 | How models learn from data; predictions, prompts and outputs | 120 | 6 |
| M01L03 | Common AI use cases in CRM (predictions, recommendations, generation) | 120 | 6 |

### M02 Ethical and Responsible AI (weight: DESIGN ASSUMPTION - unverified)

- Worked applications: (1) Spot likely bias in a described lead-scoring dataset; (2) Decide where a human-in-the-loop checkpoint is required
- Common misconception addressed: Assuming an accurate-looking model is automatically fair or unbiased
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Bias, fairness and the sources of bias in data and models | 120 | 6 |
| M02L02 | Transparency, explainability, accountability and human oversight | 120 | 6 |
| M02L03 | Privacy, security and the societal impact of AI | 120 | 6 |

### M03 Salesforce Trusted AI and Data Quality (weight: DESIGN ASSUMPTION - unverified)

- Worked applications: (1) Evaluate a dataset against data-quality dimensions before AI use; (2) Map a use case to the relevant trusted-AI principles
- Common misconception addressed: Thinking more data always beats better-quality data
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Salesforce's trusted-AI and ethical-use guiding principles | 120 | 6 |
| M03L02 | Data quality dimensions: accuracy, completeness, consistency, timeliness | 120 | 6 |
| M03L03 | Governance: consent, transparency and responsible deployment | 120 | 6 |

## Integrative case

A company plans to use AI to prioritise sales leads: assess data quality and bias risks, apply trusted-AI principles, and decide what human oversight and transparency the use case needs.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official source not verified; the official question count and duration are unknown. Confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1813-practice-form-A | 45 | 45 | yes |
| MST-1813-practice-form-B | 45 | 45 | no (optional practice) |
| MST-1813-practice-form-C | 45 | 45 | no (optional practice) |
| MST-1813-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| AI Fundamentals | 15 |
| Ethical and Responsible AI | 15 |
| Salesforce Trusted AI and Data Quality | 15 |

Minimum reviewed item bank: 498 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1813-Q0001** (single-answer, Select ONE) Why is data quality critical to trustworthy AI outcomes?

- A. Models learn patterns from data, so poor-quality data produces poor or biased predictions **(key)**  
  _Rationale:_ Correct: 'garbage in, garbage out' - inaccurate or incomplete data degrades and can bias model outputs.
- B. Data quality only affects report formatting  
  _Rationale:_ Data quality affects model behaviour, not just reports.
- C. High-quality data removes the need for human oversight  
  _Rationale:_ Oversight remains necessary regardless of data quality.
- D. AI ignores the training data entirely  
  _Rationale:_ Models depend directly on their training data.

**MST-1813-Q0002** (single-answer, Select ONE) A lead-scoring model consistently ranks one region lower because historical data under-represents it. This is an example of:

- A. Bias arising from unrepresentative training data **(key)**  
  _Rationale:_ Correct: skewed or unrepresentative data leads the model to encode and repeat that bias.
- B. A hardware failure  
  _Rationale:_ This is a data/fairness issue, not hardware.
- C. A network latency problem  
  _Rationale:_ Latency is unrelated to biased scoring.
- D. Correct behaviour that needs no review  
  _Rationale:_ Biased outcomes require investigation and mitigation.

**MST-1813-Q0003** (multiple-answer, Select TWO) Which TWO are principles of responsible/trusted AI?

- A. Transparency about how AI makes decisions **(key)**  
  _Rationale:_ Correct: transparency and explainability are core trusted-AI principles.
- B. Accountability with human oversight **(key)**  
  _Rationale:_ Correct: humans remain accountable and provide oversight of AI.
- C. Maximising model size at any cost  
  _Rationale:_ Bigger is not a responsible-AI principle.
- D. Hiding the use of AI from users  
  _Rationale:_ Concealment contradicts transparency.
- E. Ignoring data privacy to improve accuracy  
  _Rationale:_ Privacy must be respected; it is a core principle.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
