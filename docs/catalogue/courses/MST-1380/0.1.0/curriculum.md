# AI for Data Analysts

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1380` v0.1.0 | Batch 12 | workflow: Blueprint review | approval: draft

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

1. Identify where AI accelerates the data analysis workflow
2. Use AI to assist querying, cleaning and exploration responsibly
3. Interpret and verify AI-generated analysis and code
4. Communicate insights with honest uncertainty and caveats
5. Recognise data quality, bias and privacy risks in AI analysis

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 AI in the analysis workflow (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map AI uses across cleaning, analysis and reporting; (2) Identify one analysis step AI must not do unchecked
- Common misconception addressed: Believing AI removes the need to understand the data
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Where AI helps analysts | 39 | 6 |
| M01L02 | Tools, claims and realistic limits | 39 | 6 |

### M02 Querying, cleaning and code (MASTEMY-DESIGN 20%)

- Worked applications: (1) Review an AI-written SQL query for a subtle logic error; (2) Use AI to draft a cleaning step, then validate the result
- Common misconception addressed: Running AI-written queries without checking their logic
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | AI-assisted querying and transformation | 39 | 6 |
| M02L02 | Reviewing AI-generated analysis code | 39 | 6 |

### M03 Exploration and insight (MASTEMY-DESIGN 20%)

- Worked applications: (1) Spot a spurious pattern suggested by an AI summary; (2) Ask AI for hypotheses, then test them against data
- Common misconception addressed: Treating an AI-surfaced correlation as causation
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | AI-assisted exploration | 38 | 6 |
| M03L02 | From patterns to defensible insight | 38 | 6 |

### M04 Communicating results (MASTEMY-DESIGN 20%)

- Worked applications: (1) Rewrite an overconfident AI insight with honest caveats; (2) Draft a chart caption that states the key limitation
- Common misconception addressed: Presenting AI output as certain when it is uncertain
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Explaining findings honestly | 38 | 6 |
| M04L02 | Uncertainty, caveats and storytelling | 38 | 6 |

### M05 Quality, bias and privacy (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trace a misleading result to a data quality issue; (2) Check an analysis against a basic privacy rule
- Common misconception addressed: Assuming AI compensates for poor underlying data
- Module check: 6 items / 6 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Data quality and bias | 38 | 6 |
| M05L02 | Privacy and responsible data use | 38 | 6 |

## Integrative case

A data analyst must deliver a stakeholder report under time pressure using AI assistance. Decide where AI speeds up querying, cleaning and visual drafting, verify the AI's outputs, and communicate findings with honest caveats about data quality and uncertainty.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1380-final-protected | 25 | 25 | yes |
| MST-1380-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI in the analysis workflow | 5 |
| Querying, cleaning and code | 5 |
| Exploration and insight | 5 |
| Communicating results | 5 |
| Quality, bias and privacy | 5 |

Minimum reviewed item bank: 238 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1380-Q0001** (single-answer, Select ONE) An AI writes a SQL query that returns a plausible number. Before reporting it, the analyst should mainly:

- A. Read the query logic and validate it against known results **(key)**  
  _Rationale:_ Correct: AI queries can contain subtle logic errors producing plausible but wrong numbers.
- B. Report the number because it looks reasonable  
  _Rationale:_ Plausibility is not verification.
- C. Assume the AI understood the schema perfectly  
  _Rationale:_ AI can misread or assume schema details.
- D. Trust it since it ran without error  
  _Rationale:_ Running without error does not mean the logic is correct.

**MST-1380-Q0002** (multiple-answer, Select TWO) Which TWO practices support honest communication of AI-assisted analysis? (Select TWO.)

- A. State the key data limitations and uncertainty **(key)**  
  _Rationale:_ Correct: caveats keep the audience from over-trusting results.
- B. Distinguish correlation from proven causation **(key)**  
  _Rationale:_ Correct: avoiding false causal claims keeps findings defensible.
- C. Present every AI-surfaced pattern as a firm conclusion  
  _Rationale:_ Patterns can be spurious; overstating them misleads.
- D. Hide the data quality issues from stakeholders  
  _Rationale:_ Concealing limitations misleads decision-makers.

**MST-1380-Q0003** (single-answer, Select ONE) An AI summary reports that two metrics 'move together'. What is the safest interpretation?

- A. They are correlated, which does not by itself prove one causes the other **(key)**  
  _Rationale:_ Correct: correlation is not causation.
- B. One definitely causes the other  
  _Rationale:_ Correlation alone does not establish causation.
- C. The relationship must be meaningful  
  _Rationale:_ Correlations can be coincidental or confounded.
- D. Causation is proven by the AI  
  _Rationale:_ AI noting a correlation does not prove causation.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
