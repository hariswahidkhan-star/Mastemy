# Power Automate: Enterprise Automation and Exception Handling

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0713` v0.1.0 | Batch 9 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (independent; not affiliated with or endorsed by Microsoft) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **PARTIAL** - product capabilities grounded in official Microsoft Learn docs; module structure is a Mastemy design assumption |
| Evidence | **vendor-docs-partial** - source SRC-MS-POWERAUTOMATE-ENT (https://learn.microsoft.com/power-automate/guidance/coding-guidelines/error-handling) fetched 2026-10-02 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Power Automate: Enterprise Automation and Exception Handling (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the skills of 'Design reliable cloud flows' to professional tasks
2. Apply the skills of 'Handle errors robustly' to professional tasks
3. Apply the skills of 'Recover from transient faults' to professional tasks
4. Apply the skills of 'Diagnose and govern at scale' to professional tasks

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of the product, the quality of live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded configuration or peer review.

## Modules

### M01 Design reliable cloud flows (25%, design assumption)

- Worked applications: (1) Choose a trigger and trigger condition for an event-based flow; (2) Organize a flow into Try and supporting scopes
- Common misconception addressed: Expecting event-based triggers to fire instantly rather than on a polling interval
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Triggers and the entry point | 60 | 6 |
| M01L02 | Connectors and connection references | 60 | 6 |
| M01L03 | Polling intervals and trigger conditions | 60 | 6 |
| M01L04 | Structuring flows with scopes | 60 | 6 |
### M02 Handle errors robustly (25%, design assumption)

- Worked applications: (1) Build a Try/Catch scope pattern that logs an error and notifies; (2) Use run-after so a catch scope runs only when the try scope fails
- Common misconception addressed: Assuming a downstream action is skipped silently instead of configuring run-after
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Run-after configuration (has failed) | 60 | 6 |
| M02L02 | Try-Catch with scopes | 60 | 6 |
| M02L03 | The result() function to capture errors | 60 | 6 |
| M02L04 | Terminate with a status | 60 | 6 |
### M03 Recover from transient faults (25%, design assumption)

- Worked applications: (1) Configure an exponential retry policy on a flaky action; (2) Add a delay to recover from a 429 rate-limit response
- Common misconception addressed: Using frequent fixed retries that overwhelm a throttled service
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Retry policies (fixed vs exponential) | 60 | 6 |
| M03L02 | Why exponential backoff is preferred | 60 | 6 |
| M03L03 | Handling 429 rate limits | 60 | 6 |
| M03L04 | Delays inside Apply to each | 60 | 6 |
### M04 Diagnose and govern at scale (25%, design assumption)

- Worked applications: (1) Interpret a 401 vs 404 error and fix the right cause; (2) Explain why a DLP policy change suspended a flow
- Common misconception addressed: Blaming the flow logic when a DLP policy is actually blocking it
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reading run history and error codes (401/403/404/429/500) | 60 | 6 |
| M04L02 | DLP policies and connector groups | 60 | 6 |
| M04L03 | Logging to SharePoint or Application Insights | 60 | 6 |
| M04L04 | Notifications and ownership | 60 | 6 |

## Integrative case

An operations team must automate an approval process reliably: design triggers and scopes, add Try/Catch error handling with run-after, configure exponential retries for a rate-limited connector, and set logging, notifications and DLP-aware governance for the whole flow.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0713-final-protected | 72 | 72 | yes |
| MST-0713-final-alternate | 72 | 72 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Design reliable cloud flows | 18 |
| Handle errors robustly | 18 |
| Recover from transient faults | 18 |
| Diagnose and govern at scale | 18 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0713-Q0001** (single-answer, Select ONE) A critical action occasionally fails due to a transient network issue. Which retry policy does Microsoft prefer, and why?

- A. Exponential, because it spaces retries out and raises the chance of success **(key)**  
  _Rationale:_ Correct: exponential retry increases the interval over time, avoiding overwhelming the service and improving success odds.
- B. No retries, to fail fast every time  
  _Rationale:_ Failing fast abandons recoverable transient faults.
- C. Fixed one-second retries forever  
  _Rationale:_ Frequent fixed retries can overwhelm a throttled service and never back off.
- D. Retrying only after a manual restart  
  _Rationale:_ Manual restarts defeat the purpose of automated transient-fault recovery.
**MST-0713-Q0002** (single-answer, Select ONE) A cloud flow action returns a 401 error. What is the correct first fix?

- A. Re-authenticate the connection **(key)**  
  _Rationale:_ Correct: a 401 means authentication failed, so the connection should be re-authenticated.
- B. Rename the SharePoint list  
  _Rationale:_ Renaming a resource addresses a 404, not a 401 authentication failure.
- C. Add more columns to the output  
  _Rationale:_ Column changes do not resolve an authentication error.
- D. Pause the environment  
  _Rationale:_ Pausing the environment does not fix an expired or invalid credential.
**MST-0713-Q0003** (multiple-answer, Select TWO) Which TWO techniques implement robust error handling in a cloud flow? (Select TWO)

- A. Group actions in a Try scope and a Catch scope set to run after failure **(key)**  
  _Rationale:_ Correct: the Try/Catch scope pattern with run-after handles errors collectively.
- B. Use the Terminate action to stop with a Failed status on a critical error **(key)**  
  _Rationale:_ Correct: Terminate stops the flow and records a status/message for diagnosis.
- C. Ignore the run history  
  _Rationale:_ Ignoring run history removes the primary diagnostic signal.
- D. Disable all connection references  
  _Rationale:_ Disabling connection references breaks the flow rather than handling errors.

## Verification note

Product capabilities described in this spec were grounded in official Microsoft Learn documentation (https://learn.microsoft.com/power-automate/guidance/coding-guidelines/error-handling) fetched on 2026-10-02. Microsoft publishes no exam syllabus or topic weights for this skills topic, so module weights and structure are Mastemy design assumptions (documented_topic_weights = []). No partnership, affiliation or endorsement is implied.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
