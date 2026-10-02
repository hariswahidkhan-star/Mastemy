# AI for Product Managers

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1378` v0.1.0 | Batch 12 | workflow: Blueprint review | approval: draft

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

1. Identify where AI creates genuine product value for users
2. Scope and prioritise AI features against feasibility and risk
3. Use AI to accelerate discovery, research and documentation
4. Set realistic expectations for AI capability and failure modes
5. Address data, ethics and trust in AI product decisions

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 AI product value and fit (MASTEMY-DESIGN 20%)

- Worked applications: (1) Judge whether AI is the right tool for three feature ideas; (2) State the user problem an AI feature would actually solve
- Common misconception addressed: Adding AI because it is trendy rather than to solve a problem
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | When AI is the right solution | 39 | 6 |
| M01L02 | User value versus novelty | 39 | 6 |

### M02 Discovery and research with AI (MASTEMY-DESIGN 20%)

- Worked applications: (1) Use AI to cluster user interview notes, then sanity-check; (2) Draft a PRD section with AI and correct its gaps
- Common misconception addressed: Treating AI-summarised research as ground truth
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Accelerating discovery and synthesis | 39 | 6 |
| M02L02 | AI-assisted docs, specs and requirements | 39 | 6 |

### M03 Scoping AI features (MASTEMY-DESIGN 20%)

- Worked applications: (1) Define acceptance criteria that account for AI errors; (2) Design a graceful fallback for a failed AI response
- Common misconception addressed: Scoping an AI feature as if accuracy will be perfect
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Designing for uncertainty and failure | 38 | 6 |
| M03L02 | Scoping an MVP responsibly | 38 | 6 |

### M04 Metrics, cost and feasibility (MASTEMY-DESIGN 20%)

- Worked applications: (1) Estimate the cost drivers of an AI feature at scale; (2) Choose a success metric that reflects real user value
- Common misconception addressed: Ignoring inference cost and latency in the business case
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Cost, latency and feasibility | 38 | 6 |
| M04L02 | Measuring AI feature success | 38 | 6 |

### M05 Ethics, data and trust (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design a disclosure for an AI-generated recommendation; (2) Identify the data a feature needs and its privacy risk
- Common misconception addressed: Assuming users will trust AI output without transparency
- Module check: 6 items / 6 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Data, privacy and consent in products | 38 | 6 |
| M05L02 | Transparency, trust and user control | 38 | 6 |

## Integrative case

A product manager must decide whether to add an AI feature to an existing app. Evaluate the user problem, judge whether AI is the right solution, scope a minimal responsible version, and name the data, cost and trust risks for a go/no-go recommendation.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1378-final-protected | 25 | 25 | yes |
| MST-1378-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI product value and fit | 5 |
| Discovery and research with AI | 5 |
| Scoping AI features | 5 |
| Metrics, cost and feasibility | 5 |
| Ethics, data and trust | 5 |

Minimum reviewed item bank: 238 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1378-Q0001** (single-answer, Select ONE) A PM is pushed to 'add AI' to boost marketing appeal. What should drive the decision instead?

- A. Whether AI meaningfully solves a real user problem better than alternatives **(key)**  
  _Rationale:_ Correct: user value and fit should drive the decision, not hype.
- B. Whether competitors mention AI in their ads  
  _Rationale:_ Competitor marketing is not a sound basis for a feature.
- C. Whether the word 'AI' will impress investors  
  _Rationale:_ Impression is not user value.
- D. Whether it is the newest technology available  
  _Rationale:_ Novelty does not establish usefulness.

**MST-1378-Q0002** (multiple-answer, Select TWO) Which TWO design choices handle AI uncertainty responsibly in a product? (Select TWO.)

- A. Provide a clear fallback when the AI response is low-confidence or fails **(key)**  
  _Rationale:_ Correct: fallbacks protect the user experience when AI errs.
- B. Let users review or correct AI output before it acts **(key)**  
  _Rationale:_ Correct: human review limits the impact of AI errors.
- C. Hide all errors and present output as always correct  
  _Rationale:_ Hiding errors misleads users and erodes trust.
- D. Assume the model is always right at launch  
  _Rationale:_ Assuming perfection ignores real failure modes.

**MST-1378-Q0003** (single-answer, Select ONE) Why must a PM consider inference cost early when scoping an AI feature?

- A. Per-request costs can make a feature unviable at scale **(key)**  
  _Rationale:_ Correct: cost and latency at scale can break the business case.
- B. Inference is always free  
  _Rationale:_ Running models typically has a real per-use cost.
- C. Cost only matters after launch  
  _Rationale:_ Unplanned costs can sink a feature after launch.
- D. Latency never affects user experience  
  _Rationale:_ Latency often directly affects usability.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
