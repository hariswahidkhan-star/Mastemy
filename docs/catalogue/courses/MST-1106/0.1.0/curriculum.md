# Google Analytics 4: Measurement Planning and Analysis

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1106` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills course; no external exam outline to verify |
| Legacy IDs | - |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Google Analytics 4: Measurement Planning and Analysis (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. GA4 fundamentals and the event model
2. Measurement planning
3. Setup, events and conversions
4. Standard reports and Explorations
5. Audiences, attribution and integrations
6. Data quality, privacy and analysis

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 GA4 fundamentals and the event model (MASTEMY-DESIGN 17%)

- Worked applications: (1) Map a user journey to GA4 events; (2) Distinguish an event, parameter and user property
- Common misconception addressed: Thinking GA4 works like session-based Universal Analytics
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The GA4 event-based model | 67 | 6 |
| M01L02 | Properties, data streams and events | 67 | 6 |
| M01L03 | How GA4 differs from the old model | 67 | 6 |

### M02 Measurement planning (MASTEMY-DESIGN 17%)

- Worked applications: (1) Turn a business goal into a measurement plan; (2) Define key events for a lead-gen site
- Common misconception addressed: Tracking everything with no measurement plan
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Building a measurement plan | 67 | 6 |
| M02L02 | Defining key events and KPIs | 67 | 6 |
| M02L03 | Naming conventions and governance | 67 | 6 |

### M03 Setup, events and conversions (MASTEMY-DESIGN 16%)

- Worked applications: (1) Plan a custom event and its parameters; (2) Mark a key event as a conversion
- Common misconception addressed: Creating events with inconsistent names
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Automatic and custom events | 67 | 6 |
| M03L02 | Key events and conversions | 67 | 6 |
| M03L03 | Custom dimensions and metrics | 67 | 6 |

### M04 Standard reports and Explorations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a funnel Exploration for checkout; (2) Use a path exploration to find a drop-off
- Common misconception addressed: Relying only on the default reports for every question
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Standard reports overview | 67 | 6 |
| M04L02 | Explorations and techniques | 67 | 6 |
| M04L03 | Segments and comparisons | 67 | 6 |

### M05 Audiences, attribution and integrations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Create an audience for re-engagement; (2) Compare two attribution models for a decision
- Common misconception addressed: Reading last-click numbers as the whole truth
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Audiences and audience triggers | 66 | 6 |
| M05L02 | Attribution models in GA4 | 66 | 6 |
| M05L03 | Google Ads and BigQuery links | 66 | 6 |

### M06 Data quality, privacy and analysis (MASTEMY-DESIGN 16%)

- Worked applications: (1) Diagnose a data discrepancy; (2) Configure retention and consent-aware settings
- Common misconception addressed: Ignoring consent, filtering and data thresholds
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Data quality and filtering | 66 | 6 |
| M06L02 | Consent, privacy and retention | 66 | 6 |
| M06L03 | Turning analysis into recommendations | 66 | 6 |

## Integrative case

Set up measurement for a business in GA4: write a measurement plan, define key events and conversions, build Explorations to find a funnel drop-off, compare attribution models, and turn the analysis into clear recommendations.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1106-final-protected | 30 | 30 | yes |
| MST-1106-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| GA4 fundamentals and the event model | 5 |
| Measurement planning | 5 |
| Setup, events and conversions | 5 |
| Standard reports and Explorations | 5 |
| Audiences, attribution and integrations | 5 |
| Data quality, privacy and analysis | 5 |

Minimum reviewed item bank: 486 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1106-Q0001** (single-answer, Select ONE) The core unit of data collection in GA4 is the:

- A. Session, as in the previous Universal Analytics model  
  _Rationale:_ GA4 moved away from the session-centric model to events.
- B. Event, with parameters describing it **(key)**  
  _Rationale:_ Correct: GA4 is built on an event-based model where everything is an event with parameters.
- C. Pageview only  
  _Rationale:_ A pageview is just one type of event in GA4, not the core unit.
- D. Hit type fixed by Google  
  _Rationale:_ GA4 does not use the old fixed hit-type structure.

**MST-1106-Q0002** (single-answer, Select ONE) The main reason to write a measurement plan before configuring GA4 is to:

- A. Collect as much raw data as technically possible  
  _Rationale:_ Collecting everything without a plan creates noise, not insight.
- B. Tie tracking to specific business questions and KPIs **(key)**  
  _Rationale:_ Correct: a measurement plan ensures you track what answers real business questions.
- C. Avoid using any custom events  
  _Rationale:_ A plan often justifies custom events; it does not forbid them.
- D. Remove the need for naming conventions  
  _Rationale:_ A plan reinforces naming conventions rather than removing them.

**MST-1106-Q0003** (multiple-answer, Select TWO) Which TWO statements about attribution in GA4 are correct? (Select TWO)

- A. Different attribution models can assign conversion credit differently across channels **(key)**  
  _Rationale:_ Correct: the chosen model changes how credit is distributed.
- B. Last-click attribution can understate the role of earlier touchpoints **(key)**  
  _Rationale:_ Correct: last-click gives all credit to the final interaction, hiding assist value.
- C. Attribution model choice never affects reported channel performance  
  _Rationale:_ Model choice directly changes reported channel credit.
- D. Only one attribution model exists in GA4  
  _Rationale:_ GA4 offers more than one attribution model to compare.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
