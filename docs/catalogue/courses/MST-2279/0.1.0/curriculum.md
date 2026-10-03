# No-Code Workflow Automation with Zapier and Make

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2279` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint and teach durable, transferable platform concepts. Platform features, pricing and user interfaces change frequently; product specifics must be verified at production and on-screen steps may differ from any shown. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — No-Code Workflow Automation with Zapier and Make (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain triggers, actions, data mapping and runs that underpin no-code automation
2. Identify which repetitive processes are good automation candidates
3. Build a multi-step automation connecting several apps
4. Transform and route data with filters, paths and formatting
5. Handle errors, retries and testing so automations are dependable
6. Monitor, document and maintain automations and watch task/operation costs

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Automation fundamentals (25% (design weight), design weight)

- Worked applications: (1) Decide which of five tasks is worth automating first; (2) Describe a trigger and its resulting action in plain terms
- Common misconception addressed: Automating a rarely used task before a daily one
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Triggers, actions and how runs work | 120 | 7 |
| M01L02 | Spotting good automation candidates | 120 | 7 |

### M02 Building multi-step flows (25% (design weight), design weight)

- Worked applications: (1) Build a flow that files form entries and notifies a channel; (2) Map the right form fields into the right destination fields
- Common misconception addressed: Assuming field order is preserved so mapping can be skipped
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Connecting multiple apps in one flow | 120 | 7 |
| M02L02 | Mapping data between steps | 120 | 7 |

### M03 Logic and transformation (25% (design weight), design weight)

- Worked applications: (1) Add a filter so only paid orders continue; (2) Split a flow into two paths by order value
- Common misconception addressed: Building one giant flow instead of using paths or filters
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Filters, paths and conditional routing | 120 | 7 |
| M03L02 | Formatting and transforming data | 120 | 7 |

### M04 Reliability and operations (25% (design weight), design weight)

- Worked applications: (1) Add a fallback step when an app call fails; (2) Test a flow with sample data before enabling it
- Common misconception addressed: Turning an untested automation on in production
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Error handling, retries and testing | 120 | 7 |
| M04L02 | Monitoring, documentation and cost control | 120 | 7 |

## Integrative case

An operations coordinator spends hours re-keying form submissions into a CRM, a spreadsheet and a chat channel: identify the highest-value process, build a multi-step automation that maps fields correctly, filters out incomplete entries, routes high-value leads differently, handles failures, and is tested, documented and monitored for task cost.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2279-final-protected | 40 | 40 | yes |
| MST-2279-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Automation fundamentals | 10 |
| Building multi-step flows | 10 |
| Logic and transformation | 10 |
| Reliability and operations | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2279-Q0001** (single-answer, Select ONE) An automation sometimes writes blank values into the CRM even though the form was filled in. What is the most likely cause?

- A. The fields were not mapped correctly between steps, so data landed in the wrong or empty fields **(key)**  
  _Rationale:_ Correct: incorrect data mapping between trigger and action is the common cause of blank or misplaced values.
- B. The CRM deletes data at random  
  _Rationale:_ CRMs do not randomly blank fields; mapping is the issue.
- C. The form is too colourful  
  _Rationale:_ Appearance has no effect on data mapping.
- D. Automations cannot move text  
  _Rationale:_ Automations move text fine when fields are mapped correctly.

**MST-2279-Q0002** (multiple-answer, Select TWO) Which TWO steps make an automation dependable before you rely on it in production? (Select TWO.)

- A. Testing the flow end to end with representative sample data **(key)**  
  _Rationale:_ Correct: testing with real-shaped data surfaces mapping and logic errors early.
- B. Adding error handling or a fallback for failed steps **(key)**  
  _Rationale:_ Correct: error handling keeps a run from failing silently.
- C. Running it only once and assuming it always works  
  _Rationale:_ A single run does not prove reliability across cases.
- D. Hiding the automation so no one can see it  
  _Rationale:_ Obscurity does not improve reliability.

**MST-2279-Q0003** (single-answer, Select ONE) A team wants high-value leads routed to a sales channel and everyone else to a nurture list, in one automation. What feature fits?

- A. A filter or path that branches on the lead's value **(key)**  
  _Rationale:_ Correct: paths/filters route records down different branches based on a condition.
- B. Two unrelated accounts  
  _Rationale:_ Separate accounts do not provide conditional routing within a flow.
- C. Sending everything to both destinations  
  _Rationale:_ That ignores the routing requirement entirely.
- D. Disabling the trigger  
  _Rationale:_ Disabling the trigger stops the automation rather than routing it.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
