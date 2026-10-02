# AI for Startups

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1409` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

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

1. Identify where AI creates real value for a startup
2. Evaluate build-versus-buy and model choices
3. Manage cost, data and dependency risk
4. Recognise privacy, IP and compliance constraints
5. Judge responsible and defensible AI product decisions

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 AI value for startups (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map AI uses to a startup's value; (2) Pick the highest-value opportunity
- Common misconception addressed: Adding AI for marketing rather than real value
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Where AI creates value | 39 | 6 |
| M01L02 | Hype, limits and realistic bets | 39 | 6 |

### M02 Build, buy and models (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide build-versus-buy for a feature; (2) Match a model choice to a use case
- Common misconception addressed: Building bespoke models when an API would do
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Build-versus-buy decisions | 39 | 6 |
| M02L02 | Choosing and using models | 39 | 6 |

### M03 Cost and dependency (MASTEMY-DESIGN 20%)

- Worked applications: (1) Estimate the cost of an AI feature at scale; (2) Plan around a model-provider dependency
- Common misconception addressed: Ignoring unit economics of AI calls at scale
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Managing AI costs | 38 | 6 |
| M03L02 | Vendor and model dependency | 38 | 6 |

### M04 Data, privacy and IP (MASTEMY-DESIGN 20%)

- Worked applications: (1) Check a feature against a privacy rule; (2) Spot an IP risk in training or outputs
- Common misconception addressed: Assuming customer data can be used to train freely
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Data and privacy | 38 | 6 |
| M04L02 | IP and compliance | 38 | 6 |

### M05 Responsible, defensible AI (MASTEMY-DESIGN 20%)

- Worked applications: (1) Identify a trust or safety gap; (2) Judge what makes an AI product defensible
- Common misconception addressed: Treating a thin API wrapper as a durable moat
- Module check: 6 items / 6 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Trust, safety and quality | 38 | 6 |
| M05L02 | Defensibility and responsible rollout | 38 | 6 |

## Integrative case

A startup wants to build with AI and use it internally. Decide where AI creates real value, evaluate build-versus-buy and models, manage cost, data and risk, and set a responsible path to a defensible, trustworthy product.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1409-final-protected | 25 | 25 | yes |
| MST-1409-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI value for startups | 5 |
| Build, buy and models | 5 |
| Cost and dependency | 5 |
| Data, privacy and IP | 5 |
| Responsible, defensible AI | 5 |

Minimum reviewed item bank: 238 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1409-Q0001** (single-answer, Select ONE) A startup plans to train a custom model for a feature an existing API already handles well. What is the better first move?

- A. Start with the API and build custom only if clear value justifies it **(key)**  
  _Rationale:_ Correct: build-versus-buy should favour the lower-risk option until value is proven.
- B. Always build a custom model from scratch  
  _Rationale:_ Custom builds add cost and risk without proven need.
- C. Avoid AI entirely  
  _Rationale:_ AI can add value when used sensibly.
- D. Choose based on what sounds most impressive  
  _Rationale:_ Impressiveness is not a sound basis.

**MST-1409-Q0002** (multiple-answer, Select TWO) Which TWO practices support responsible AI product decisions in a startup? (Select TWO.)

- A. Handle customer data within privacy and consent rules **(key)**  
  _Rationale:_ Correct: lawful data use protects users and the company.
- B. Watch unit economics and provider dependency **(key)**  
  _Rationale:_ Correct: cost and dependency risks can sink a product.
- C. Train on customer data without consent  
  _Rationale:_ That breaches privacy and trust.
- D. Assume an API wrapper alone is a durable moat  
  _Rationale:_ Thin wrappers are easily copied.

**MST-1409-Q0003** (single-answer, Select ONE) Why watch the unit economics of AI calls as a startup scales?

- A. Per-call costs can grow with usage and erode margins at scale **(key)**  
  _Rationale:_ Correct: AI costs scale with usage and can threaten viability.
- B. AI calls are always free  
  _Rationale:_ AI calls usually carry per-use cost.
- C. Costs never change with scale  
  _Rationale:_ Costs typically grow with usage.
- D. Only investors need to consider cost  
  _Rationale:_ Founders must manage unit economics.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
