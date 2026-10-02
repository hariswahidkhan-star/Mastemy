# AI for Manufacturing Quality and Process Improvement

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1195` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain where AI supports manufacturing quality and process improvement
2. Use AI to analyse quality data and draft improvement findings
3. Verify AI outputs against process data and domain knowledge
4. Support root-cause analysis and corrective action responsibly
5. Manage data quality, validation and decision accountability

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 AI in manufacturing quality (MASTEMY-DESIGN 20%)

- Worked applications: (1) Sort quality tasks by suitability for AI support; (2) Identify decisions that must stay with a quality engineer
- Common misconception addressed: Assuming AI can authorise a process change on its own
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Where AI helps quality work | 96 | 8 |
| M01L02 | Mapping AI to the quality workflow | 96 | 8 |

### M02 Analysing quality data (MASTEMY-DESIGN 20%)

- Worked applications: (1) Use AI to surface patterns in a defect dataset; (2) Draft a findings summary from control-chart data
- Common misconception addressed: Trusting an AI pattern without checking it against the raw data
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Analysing defect and process data | 96 | 8 |
| M02L02 | Drafting improvement findings | 96 | 8 |

### M03 Verifying outputs (MASTEMY-DESIGN 20%)

- Worked applications: (1) Verify an AI-suggested correlation against process records; (2) Reject a statistically plausible but physically impossible cause
- Common misconception addressed: Confusing a correlation the model found with an established cause
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Checking against process data | 96 | 8 |
| M03L02 | Applying domain knowledge | 96 | 8 |

### M04 Root-cause and corrective action (MASTEMY-DESIGN 20%)

- Worked applications: (1) Use AI to structure a root-cause analysis for review; (2) Plan validation of a corrective action before rollout
- Common misconception addressed: Implementing a corrective action without validating it first
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Supporting root-cause analysis | 96 | 8 |
| M04L02 | Corrective action and validation | 96 | 8 |

### M05 Data quality and accountability (MASTEMY-DESIGN 20%)

- Worked applications: (1) Check measurement-data quality before an AI analysis; (2) Record the engineer sign-off on an AI-supported change
- Common misconception addressed: Assuming good-looking charts mean the measurement data was sound
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Data quality for quality AI | 96 | 8 |
| M05L02 | Governance and sign-off | 96 | 8 |

## Integrative case

A quality engineer uses an AI assistant to investigate a rise in defects on a production line. Analyse the quality data, draft candidate causes, verify them against process evidence, support a root-cause and corrective-action write-up, and ensure an engineer validates any change before it is implemented.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1195-final-protected | 25 | 25 | yes |
| MST-1195-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI in manufacturing quality | 5 |
| Analysing quality data | 5 |
| Verifying outputs | 5 |
| Root-cause and corrective action | 5 |
| Data quality and accountability | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1195-Q0001** (single-answer, Select ONE) An AI analysis reports a strong correlation between ambient humidity and a surface defect. Before acting, what should the quality engineer do?

- A. Check whether a plausible physical mechanism and process evidence support the link before treating it as a cause  **(key)**  
  _Rationale:_ Correct: correlation is a lead to investigate, not an established cause; domain evidence is needed.
- B. Change the process immediately based on the correlation alone  
  _Rationale:_ Acting on correlation without a validated cause risks an ineffective or harmful change.
- C. Assume the correlation is definitely the root cause  
  _Rationale:_ A found correlation is not proof of causation.
- D. Discard the finding because AI cannot find patterns  
  _Rationale:_ The pattern is a useful lead; it simply needs verification.

**MST-1195-Q0002** (multiple-answer, Select TWO) Which TWO practices make an AI-supported corrective action sound? (Select TWO.)

- A. Validating the proposed change before rolling it out across the line  **(key)**  
  _Rationale:_ Correct: validation confirms the change actually fixes the problem without side effects.
- B. Recording the engineer's sign-off on the change  **(key)**  
  _Rationale:_ Correct: accountability requires a recorded human sign-off.
- C. Implementing the AI's suggestion directly in production with no trial  
  _Rationale:_ Unvalidated changes can make quality worse.
- D. Ignoring the measurement-data quality behind the analysis  
  _Rationale:_ Poor measurement data can invalidate the whole analysis.

**MST-1195-Q0003** (single-answer, Select ONE) A set of control charts drafted with AI looks clean and well-presented, but the gauges used to collect the data were never calibrated. What is the risk?

- A. The analysis may be based on unreliable measurements despite looking convincing  **(key)**  
  _Rationale:_ Correct: uncalibrated measurement undermines the data, regardless of how good the charts look.
- B. None, because clean charts prove the data is good  
  _Rationale:_ Presentation quality does not validate measurement quality.
- C. The AI will detect and fix the calibration problem itself  
  _Rationale:_ AI does not inherently detect uncalibrated measurement systems.
- D. Calibration has no effect on quality data  
  _Rationale:_ Calibration is fundamental to trustworthy measurement data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
