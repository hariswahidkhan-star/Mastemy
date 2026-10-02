# AI in Insurance Underwriting

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1410` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

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

1. Identify AI use cases in insurance underwriting
2. Interpret AI risk-scoring and pricing outputs
3. Recognise fairness, discrimination and regulatory limits
4. Protect policyholder data and privacy
5. Judge explainability and oversight requirements

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 AI in underwriting (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map AI uses across underwriting; (2) Pick the highest-value use case
- Common misconception addressed: Treating an AI risk score as an objective truth
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Where AI fits in underwriting | 39 | 6 |
| M01L02 | Benefits, limits and expectations | 39 | 6 |

### M02 Risk scoring and pricing (MASTEMY-DESIGN 20%)

- Worked applications: (1) Interrogate an AI risk-score recommendation; (2) Judge an AI pricing suggestion
- Common misconception addressed: Acting on a score without checking its basis
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | How AI risk models work | 39 | 6 |
| M02L02 | Interpreting scores and prices | 39 | 6 |

### M03 Fairness and regulation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Spot a proxy-discrimination risk; (2) Check a model against a regulatory limit
- Common misconception addressed: Assuming a model is fair because it excludes protected traits
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Discrimination and proxy variables | 38 | 6 |
| M03L02 | Regulatory and conduct limits | 38 | 6 |

### M04 Data and privacy (MASTEMY-DESIGN 20%)

- Worked applications: (1) Check a data use against a privacy rule; (2) Spot a consent problem in data use
- Common misconception addressed: Assuming any available data can feed the model
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Policyholder data handling | 38 | 6 |
| M04L02 | Privacy, consent and compliance | 38 | 6 |

### M05 Explainability and oversight (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide what explanation a decision needs; (2) Define oversight for an underwriting model
- Common misconception addressed: Using an unexplainable model for consequential decisions
- Module check: 6 items / 6 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Explainable decisions | 38 | 6 |
| M05L02 | Oversight and accountability | 38 | 6 |

## Integrative case

An insurer wants to use AI in underwriting. Identify use cases, judge risk-scoring and pricing outputs, address fairness and regulation, protect data, and set oversight so decisions remain explainable and compliant.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1410-final-protected | 25 | 25 | yes |
| MST-1410-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI in underwriting | 5 |
| Risk scoring and pricing | 5 |
| Fairness and regulation | 5 |
| Data and privacy | 5 |
| Explainability and oversight | 5 |

Minimum reviewed item bank: 238 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1410-Q0001** (single-answer, Select ONE) A model excludes protected characteristics but uses postcode and shopping data. Why is fairness still a concern?

- A. Such variables can act as proxies and produce discriminatory outcomes **(key)**  
  _Rationale:_ Correct: proxy variables can reproduce discrimination indirectly.
- B. Excluding protected traits guarantees fairness  
  _Rationale:_ Proxies can still create unfair outcomes.
- C. Fairness is irrelevant in underwriting  
  _Rationale:_ Fairness and conduct rules apply.
- D. Only direct use of protected traits matters  
  _Rationale:_ Indirect proxies also matter.

**MST-1410-Q0002** (multiple-answer, Select TWO) Which TWO practices support responsible AI underwriting? (Select TWO.)

- A. Ensure consequential decisions are explainable **(key)**  
  _Rationale:_ Correct: explainability supports fairness and compliance.
- B. Keep human oversight and accountability **(key)**  
  _Rationale:_ Correct: oversight manages model and conduct risk.
- C. Use any available data without checking consent  
  _Rationale:_ That breaches privacy rules.
- D. Assume the model is fair without testing  
  _Rationale:_ Fairness must be tested, including for proxies.

**MST-1410-Q0003** (single-answer, Select ONE) Why does explainability matter for AI underwriting decisions?

- A. Policyholders and regulators need to understand and challenge decisions **(key)**  
  _Rationale:_ Correct: explainability supports fairness, trust and compliance.
- B. It has no bearing on compliance  
  _Rationale:_ Many regimes require explainability.
- C. Only accuracy matters, never explanation  
  _Rationale:_ Explanation matters for consequential decisions.
- D. Explainability slows decisions with no benefit  
  _Rationale:_ It protects fairness and trust.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
