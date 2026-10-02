# Open-Weight Language Models: Selection and Deployment

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0458` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-OWMSD-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Open-weight landscape
2. Selecting a model
3. Deployment options
4. Operating responsibly

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Open-weight landscape (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compare open-weight and API trade-offs; (2) Read a model license for commercial use
- Common misconception addressed: Assuming 'open' always means unrestricted commercial use
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Open-weight vs closed and API models | 120 | 8 |
| M01L02 | Licenses and permitted use | 120 | 8 |

### M02 Selecting a model (MASTEMY-DESIGN 20%)

- Worked applications: (1) Shortlist models for a task and budget; (2) Match model size to available hardware
- Common misconception addressed: Choosing by leaderboard rank alone
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Capability, size and benchmarks | 120 | 8 |
| M02L02 | Fit to task, data and hardware | 120 | 8 |

### M03 Deployment options (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide self-host vs managed for a workload; (2) Estimate cost of self-hosting at scale
- Common misconception addressed: Underestimating operational burden of self-hosting
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Self-hosting vs managed endpoints | 120 | 8 |
| M03L02 | Scaling, security and cost | 120 | 8 |

### M04 Operating responsibly (MASTEMY-DESIGN 20%)

- Worked applications: (1) Version and roll back a deployed model; (2) Document data handling and provenance
- Common misconception addressed: Deploying without a rollback or version plan
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Monitoring, updates and versioning | 120 | 8 |
| M04L02 | Safety, data handling and provenance | 120 | 8 |

## Integrative case

A startup must pick and deploy an open-weight model for a customer feature with a fixed budget. Compare licenses and capabilities, match size to hardware, choose self-hosting versus a managed endpoint, and plan monitoring, versioning and data handling.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0458-final-protected | 20 | 20 | yes |
| MST-0458-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Open-weight landscape | 5 |
| Selecting a model | 5 |
| Deployment options | 5 |
| Operating responsibly | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0458-Q0001** (single-answer, Select ONE) What does 'open-weight' most directly mean for a language model?

- A. The trained model weights are available to download and run yourself **(key)**  
  _Rationale:_ Correct: open-weight means the weights can be obtained and run.
- B. The model is guaranteed free for any commercial use  
  _Rationale:_ Licenses vary; open weights are not automatically unrestricted.
- C. The training data is always fully public  
  _Rationale:_ Open weights do not imply open data.
- D. The model can only be used via an API  
  _Rationale:_ Open weights specifically enable self-hosting.

**MST-0458-Q0002** (multiple-answer, Select TWO) Which TWO factors should drive open-weight model selection for a task? (Select TWO.)

- A. Fit between model capability and the actual task **(key)**  
  _Rationale:_ Correct: capability-task fit is primary.
- B. Model size versus available hardware and budget **(key)**  
  _Rationale:_ Correct: size must fit the hardware and cost limits.
- C. Only the top position on a single leaderboard  
  _Rationale:_ Leaderboard rank alone is a poor sole criterion.
- D. The length of the model's name  
  _Rationale:_ Irrelevant to selection.

**MST-0458-Q0003** (single-answer, Select ONE) Why is a rollback and versioning plan important when self-hosting a model?

- A. A new version can regress behaviour, so you need to revert quickly **(key)**  
  _Rationale:_ Correct: versioning lets you recover from a bad update.
- B. Models never change behaviour between versions  
  _Rationale:_ Behaviour can change across versions.
- C. Versioning increases model accuracy directly  
  _Rationale:_ Versioning is about operations, not accuracy.
- D. Rollback removes the need for monitoring  
  _Rationale:_ Monitoring is still needed to detect issues.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
