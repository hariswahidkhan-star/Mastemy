# Google Tag Manager: Event Tracking and Governance

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1107` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Google Tag Manager: Event Tracking and Governance (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. GTM fundamentals
2. The data layer
3. Triggers and variables
4. Tagging common events
5. Testing, debugging and publishing
6. Governance, consent and quality

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 GTM fundamentals (MASTEMY-DESIGN 17%)

- Worked applications: (1) Label the tag, trigger and variable in a setup; (2) Trace how a container loads on a page
- Common misconception addressed: Confusing the container snippet with a single tag
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Tags, triggers and variables | 67 | 6 |
| M01L02 | Containers and the data layer | 67 | 6 |
| M01L03 | How GTM fits the tech stack | 67 | 6 |

### M02 The data layer (MASTEMY-DESIGN 17%)

- Worked applications: (1) Design a data-layer object for a purchase; (2) Read a value from the data layer into a variable
- Common misconception addressed: Scraping the DOM instead of using the data layer
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | What the data layer is | 67 | 6 |
| M02L02 | Pushing structured data | 67 | 6 |
| M02L03 | Data-layer variables | 67 | 6 |

### M03 Triggers and variables (MASTEMY-DESIGN 16%)

- Worked applications: (1) Build a trigger for a specific form submit; (2) Create a lookup-table variable
- Common misconception addressed: Firing a tag on all pages when it should be scoped
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Trigger types and conditions | 67 | 6 |
| M03L02 | Built-in and custom variables | 67 | 6 |
| M03L03 | Trigger groups and exceptions | 67 | 6 |

### M04 Tagging common events (MASTEMY-DESIGN 17%)

- Worked applications: (1) Configure a GA4 event tag via GTM; (2) Track an outbound link click
- Common misconception addressed: Duplicating a conversion so it counts twice
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | GA4 event tags in GTM | 67 | 6 |
| M04L02 | Clicks, forms and scroll tracking | 67 | 6 |
| M04L03 | Avoiding duplicate firing | 67 | 6 |

### M05 Testing, debugging and publishing (MASTEMY-DESIGN 17%)

- Worked applications: (1) Use Preview mode to verify a tag; (2) Roll back to a previous container version
- Common misconception addressed: Publishing straight to production without previewing
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Preview and debug mode | 66 | 6 |
| M05L02 | Versions and publishing | 66 | 6 |
| M05L03 | Workspaces and change management | 66 | 6 |

### M06 Governance, consent and quality (MASTEMY-DESIGN 16%)

- Worked applications: (1) Map tags to consent categories; (2) Write a naming convention for a container
- Common misconception addressed: Firing marketing tags before consent is given
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Consent mode and privacy | 66 | 6 |
| M06L02 | Naming conventions and documentation | 66 | 6 |
| M06L03 | Access, governance and audits | 66 | 6 |

## Integrative case

Implement tracking for a site through GTM: design the data layer, build triggers and variables, configure GA4 event tags without duplication, verify everything in Preview, and publish under a consent-aware governance model.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1107-final-protected | 30 | 30 | yes |
| MST-1107-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| GTM fundamentals | 5 |
| The data layer | 5 |
| Triggers and variables | 5 |
| Tagging common events | 5 |
| Testing, debugging and publishing | 5 |
| Governance, consent and quality | 5 |

Minimum reviewed item bank: 486 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1107-Q0001** (single-answer, Select ONE) The data layer in GTM is best described as:

- A. A visual report of tag performance  
  _Rationale:_ That is not what the data layer is; it is a data structure, not a report.
- B. A structured object holding information for tags, triggers and variables to use **(key)**  
  _Rationale:_ Correct: the data layer is a structured store of values GTM reads from.
- C. The container snippet itself  
  _Rationale:_ The snippet loads GTM; the data layer is the structured data it reads.
- D. A Google Analytics property  
  _Rationale:_ The data layer is part of the page/GTM, not a GA property.

**MST-1107-Q0002** (single-answer, Select ONE) Before publishing a new tag to production, the recommended step is to:

- A. Publish immediately and watch live reports  
  _Rationale:_ Publishing untested tags risks broken or duplicated tracking in production.
- B. Use Preview and debug mode to confirm the tag fires correctly **(key)**  
  _Rationale:_ Correct: Preview mode verifies firing and data before going live.
- C. Delete the old container first  
  _Rationale:_ Deleting the container is unnecessary and harmful.
- D. Disable the data layer  
  _Rationale:_ Disabling the data layer would break tracking, not test it.

**MST-1107-Q0003** (multiple-answer, Select TWO) Which TWO are good GTM governance and consent practices? (Select TWO)

- A. Hold non-essential marketing tags until the user grants consent **(key)**  
  _Rationale:_ Correct: consent-aware firing is required for privacy compliance.
- B. Use clear naming conventions and document tags for maintainability **(key)**  
  _Rationale:_ Correct: naming and documentation keep a container auditable.
- C. Give every team member full publish access by default  
  _Rationale:_ Unrestricted publish access undermines governance and control.
- D. Fire all tags on page load regardless of consent  
  _Rationale:_ Ignoring consent is a privacy and compliance failure.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
