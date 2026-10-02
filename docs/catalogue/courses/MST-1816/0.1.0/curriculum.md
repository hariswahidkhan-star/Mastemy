# Salesforce Certified Sales Cloud Consultant Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1816` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Salesforce (no affiliation or endorsement) |
| Exam code | DESIGN ASSUMPTION - not confirmed (official_exam_code left blank) |
| Version basis | unresolved - not confirmed from an official source |
| Evidence | **unverified-needs-official-check** - official source could not be fetched (network egress blocked 2026-10-02); outline is a DESIGN ASSUMPTION |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 40 / module checks 140 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%%, final >= 80%%) |

## Learning outcomes

1. Gather requirements and design Sales Cloud solutions that fit a sales process
2. Configure lead, opportunity, account and forecasting functionality
3. Design sales productivity, automation and data-quality features
4. Plan analytics, adoption and deployment for a Sales Cloud implementation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

> All module titles, lesson titles and weightings below are **DESIGN ASSUMPTIONS** pending verification against the official exam outline (issuer site egress blocked on 2026-10-02).

## Modules

### M01 Discovery and solution design (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Map a described sales process to opportunity stages; (2) Identify a requirement that needs a custom object
- Common misconception addressed: Jumping to configuration before confirming the sales process
- Module check: 35 items / 35 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Requirement gathering and sales process mapping | 150 | 6 |
| M01L02 | Translating needs into a Sales Cloud design | 150 | 6 |

### M02 Leads, opportunities and forecasting (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Design a lead-assignment rule for territories; (2) Choose a forecast category mapping for stages
- Common misconception addressed: Confusing lead conversion with opportunity creation timing
- Module check: 35 items / 35 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Lead management, conversion and assignment | 150 | 6 |
| M02L02 | Opportunity stages, products and forecasting | 150 | 6 |

### M03 Productivity and automation (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Add a validation rule to enforce required close data; (2) Design a guided path for a key stage
- Common misconception addressed: Over-automating in ways that block legitimate edge cases
- Module check: 35 items / 35 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Activities, paths, and sales productivity tools | 150 | 6 |
| M03L02 | Automation with flows and validation for data quality | 150 | 6 |

### M04 Analytics, adoption and deployment (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Build a pipeline dashboard requirement; (2) Draft an adoption-measurement metric
- Common misconception addressed: Measuring logins rather than meaningful sales behaviour
- Module check: 35 items / 35 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reports, dashboards and sales KPIs | 150 | 6 |
| M04L02 | Change management, training and deployment | 150 | 6 |

## Integrative case

A B2B software company is implementing Sales Cloud: capture requirements for its lead-to-cash process, configure opportunity stages and forecasting, add productivity automation, and plan reporting and user adoption.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official source not verified (egress blocked); confirm question count and duration on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1816-practice-form-A | 45 | 45 | yes |
| MST-1816-practice-form-B | 45 | 45 | no (optional practice) |
| MST-1816-practice-form-C | 45 | 45 | no (optional practice) |
| MST-1816-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Discovery and solution design | 12 |
| Leads, opportunities and forecasting | 11 |
| Productivity and automation | 11 |
| Analytics, adoption and deployment | 11 |

Minimum reviewed item bank: 556 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1816-Q0001** (single-answer, Select ONE) A consultant is told 'reps keep skipping key stages.' What is the best first design response?

- A. Immediately build a complex approval process  
  _Rationale:_ Building before understanding the process risks solving the wrong problem.
- B. Confirm the intended sales process, then consider guided paths or validation **(key)**  
  _Rationale:_ Correct: confirm the process first, then apply paths/validation to enforce stage discipline.
- C. Delete the opportunity object  
  _Rationale:_ Removing the core object is not a valid response.
- D. Tell reps to try harder with no config change  
  _Rationale:_ Ignoring tooling options is not a consultant solution.

**MST-1816-Q0002** (single-answer, Select ONE) Which feature best enforces that a required field is completed before an opportunity can be marked Closed Won?

- A. A report subscription  
  _Rationale:_ Report subscriptions distribute reports; they do not enforce data entry.
- B. A validation rule **(key)**  
  _Rationale:_ Correct: a validation rule can block the save unless the required condition is met at that stage.
- C. A list view filter  
  _Rationale:_ A list view only changes what records are displayed.
- D. A chatter post  
  _Rationale:_ Chatter is collaboration, not data enforcement.

**MST-1816-Q0003** (multiple-answer, Select TWO) Which TWO are appropriate ways to measure meaningful Sales Cloud adoption?

- A. Percentage of opportunities with up-to-date next steps **(key)**  
  _Rationale:_ Correct: data completeness on active deals reflects real adoption.
- B. Share of deals logged in Salesforce vs spreadsheets **(key)**  
  _Rationale:_ Correct: migration of work into the platform is a meaningful adoption signal.
- C. Total number of page scrolls per user  
  _Rationale:_ Scroll counts are vanity metrics, not meaningful adoption.
- D. Number of login screens displayed  
  _Rationale:_ Login screen counts do not indicate adoption.


## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
