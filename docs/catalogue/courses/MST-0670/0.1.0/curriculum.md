# Microsoft Forms: Surveys, Quizzes, and Data Collection

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0670` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Forms documentation read via the Microsoft Learn MCP on 2026-10-02. Specific portal and UI labels can vary by release channel and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/microsoft-forms/set-up-microsoft-forms |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-FORMS |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Microsoft Forms: Surveys, Quizzes, and Data Collection (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Build forms, surveys and polls with appropriate question types
2. Create quizzes with autograding and branching
3. Control distribution, response settings and access
4. Analyze responses and export results for reporting

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Building forms and surveys (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a five-question onboarding survey; (2) Apply a theme and configure form settings
- Common misconception addressed: Using a single text question where a choice question would structure data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Create a form and choose question types | 120 | 5 |
| M01L02 | Themes and form settings | 120 | 5 |

### M02 Quizzes and branching (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Create an autograded compliance quiz; (2) Add branching so answers route to relevant follow-ups
- Common misconception addressed: Expecting branching to grade rather than route respondents
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Quizzes and autograding | 120 | 5 |
| M02L02 | Branching logic | 120 | 5 |

### M03 Distribution and access (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Restrict a form to the organization; (2) Enable anonymous external responses for a public survey
- Common misconception addressed: Assuming anonymous responses still capture respondent identity
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Sharing and response settings | 120 | 5 |
| M03L02 | Internal versus external responses | 120 | 5 |

### M04 Results and analysis (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Read the built-in response summary; (2) Export responses to Excel for further analysis
- Common misconception addressed: Treating the Present view as an exportable report file
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Built-in analytics | 120 | 5 |
| M04L02 | Export to Excel and reporting | 120 | 5 |

## Integrative case

An HR team builds an onboarding survey and a compliance quiz, controls who can respond, and exports results to Excel for analysis.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0670-final-protected | 30 | 40 | yes |
| MST-0670-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Building forms and surveys | 8 |
| Quizzes and branching | 7 |
| Distribution and access | 8 |
| Results and analysis | 7 |

Minimum reviewed item bank: 308 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0670-Q0001** (single-answer, Select ONE) A team needs to analyse survey responses in a PivotTable. What is the recommended path?

- A. Export the responses to Excel **(key)**  
  _Rationale:_ Correct: Forms data can be exported to Excel for further analysis or grading.
- B. Screenshot each response  
  _Rationale:_ Screenshots are not analysable data.
- C. Delete and recreate the form  
  _Rationale:_ Recreating the form does not produce analysable data.
- D. Convert the form to a SharePoint site  
  _Rationale:_ Forms are not converted into sites to analyse data.

**MST-0670-Q0002** (multiple-answer, Select TWO) Which TWO capabilities does Microsoft Forms provide? (Select TWO.)

- A. Autograding of quiz answers **(key)**  
  _Rationale:_ Correct: quizzes support autograding.
- B. Built-in analytics for responses **(key)**  
  _Rationale:_ Correct: Forms provides real-time response analytics.
- C. Deploying Azure virtual networks  
  _Rationale:_ Networking is an Azure function, not a Forms feature.
- D. Running Exchange Online PowerShell  
  _Rationale:_ PowerShell administration is unrelated to Forms.

**MST-0670-Q0003** (single-answer, Select ONE) What does branching in a form do?

- A. Routes a respondent to different questions based on their answers **(key)**  
  _Rationale:_ Correct: branching directs respondents to relevant follow-up questions.
- B. Automatically assigns a grade  
  _Rationale:_ Grading is a quiz feature, separate from branching.
- C. Encrypts the response data  
  _Rationale:_ Branching does not change encryption.
- D. Shares the form externally  
  _Rationale:_ Sharing settings, not branching, control external access.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
