# Google Forms: Surveys, Assessments, and Data Collection

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0733` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Google Forms product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GOOG-FORMS (https://support.google.com/docs/topic/9055404; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Google Forms: Surveys, Assessments, and Data Collection (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Build forms with varied question types and sections
2. Apply validation, required fields and logic branching
3. Create quizzes with answer keys and automatic grading
4. Configure sharing, response limits and collaboration
5. Analyse responses and link to Sheets
6. Apply privacy, accessibility and data practices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Building forms (MASTEMY-DESIGN 16%)

- Worked applications: (1) Build a multi-section intake form; (2) Choose the right question type for each field
- Common misconception addressed: Using a free-text box where a choice list would clean the data
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Question types and sections | 80 | 7 |
| M01L02 | Themes and layout | 80 | 7 |

### M02 Validation and logic (MASTEMY-DESIGN 16%)

- Worked applications: (1) Validate an email field and a number range; (2) Branch to different sections based on an answer
- Common misconception addressed: Assuming validation guarantees honest or accurate answers
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Required fields and response validation | 80 | 7 |
| M02L02 | Section branching (go to section) | 80 | 7 |

### M03 Quizzes and grading (MASTEMY-DESIGN 17%)

- Worked applications: (1) Create an auto-graded quiz with per-question feedback; (2) Release grades manually after review
- Common misconception addressed: Auto-grading free-text answers reliably
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Answer keys and points | 80 | 7 |
| M03L02 | Feedback and release settings | 80 | 7 |

### M04 Sharing and collaboration (MASTEMY-DESIGN 17%)

- Worked applications: (1) Limit a form to one response per signed-in user; (2) Add a collaborator to co-edit the form
- Common misconception addressed: Confusing editors (co-authors) with respondents
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Sending and response settings | 80 | 7 |
| M04L02 | Collaborators and templates | 80 | 7 |

### M05 Analysing responses (MASTEMY-DESIGN 17%)

- Worked applications: (1) Link responses to a Sheet for pivot analysis; (2) Read the summary charts for a quick trend
- Common misconception addressed: Editing the linked Sheet and expecting the form to change
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Summary charts and individual responses | 80 | 7 |
| M05L02 | Linking responses to Sheets | 80 | 7 |

### M06 Privacy and accessibility (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add a consent statement and collect email appropriately; (2) Make questions accessible with clear labels
- Common misconception addressed: Collecting personal data without a stated purpose or consent
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Collecting email and consent | 80 | 7 |
| M06L02 | Accessible question design | 80 | 7 |

## Integrative case

Build a governed survey-and-quiz workflow: design a multi-section form with the right question types, add validation and branching, create an auto-graded quiz with feedback, limit responses and add a collaborator, link responses to Sheets for analysis, and add consent and accessible labels.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0733-final-protected | 40 | 50 | yes |
| MST-0733-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Building forms | 7 |
| Validation and logic | 7 |
| Quizzes and grading | 7 |
| Sharing and collaboration | 7 |
| Analysing responses | 6 |
| Privacy and accessibility | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0733-Q0001** (single-answer, Select ONE) Which setting ensures a numeric answer falls within an allowed range before submission?

- A. Response validation on the question **(key)**  
  _Rationale:_ Correct: response validation enforces rules such as a number range.
- B. A form theme  
  _Rationale:_ Themes change appearance, not validation.
- C. The confirmation message  
  _Rationale:_ The confirmation shows after submission; it does not validate input.
- D. Linking to Sheets  
  _Rationale:_ Linking stores responses; it does not validate them.

**MST-0733-Q0002** (single-answer, Select ONE) You want respondents who answer 'No' to skip a whole section. Which feature do you use?

- A. Go-to-section-based-on-answer branching **(key)**  
  _Rationale:_ Correct: section branching routes respondents based on their answer.
- B. A required field  
  _Rationale:_ Required only forces an answer; it does not route.
- C. A quiz answer key  
  _Rationale:_ Answer keys grade; they do not branch navigation.
- D. A theme colour  
  _Rationale:_ Appearance does not affect navigation.

**MST-0733-Q0003** (multiple-answer, Select TWO) Which TWO practices support responsible data collection in a form? (Select TWO.)

- A. State the purpose and obtain consent when collecting personal data **(key)**  
  _Rationale:_ Correct: stating purpose and consent is responsible practice.
- B. Use clear labels so questions are accessible **(key)**  
  _Rationale:_ Correct: accessible labels help all respondents answer correctly.
- C. Collect personal data without explaining why  
  _Rationale:_ Collecting without purpose or consent is poor practice.
- D. Rely on auto-grading for free-text opinions  
  _Rationale:_ Free-text opinions cannot be reliably auto-graded.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
