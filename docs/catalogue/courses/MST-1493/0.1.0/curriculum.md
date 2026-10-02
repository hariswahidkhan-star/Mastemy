# AWS Migration Strategies

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1493` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - vendor product documentation not reachable from build env (https://docs.aws.amazon.com/prescriptive-guidance/; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — AWS Migration Strategies (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain cloud migration drivers and phases
2. Assess a portfolio and build a business case
3. Choose among the 7 Rs migration strategies
4. Plan migration waves and dependencies
5. Use AWS migration tooling appropriately
6. Plan cutover, validation and rollback

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Migration foundations (MASTEMY-DESIGN 16%)

- Worked applications: (1) List business drivers for migrating; (2) Describe the three migration phases
- Common misconception addressed: Starting migration before assessing the portfolio
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Drivers and phases | 48 | 5 |
| M01L02 | Assess, mobilize, migrate | 48 | 5 |
### M02 Assessment (MASTEMY-DESIGN 16%)

- Worked applications: (1) Inventory applications and dependencies; (2) Build a simple TCO comparison
- Common misconception addressed: Lifting-and-shifting everything without assessment
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Portfolio discovery | 48 | 5 |
| M02L02 | Business case and TCO | 48 | 5 |
### M03 The 7 Rs (MASTEMY-DESIGN 17%)

- Worked applications: (1) Classify an app by the right R; (2) Decide retire vs retain for a legacy app
- Common misconception addressed: Defaulting every app to rehost regardless of fit
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Rehost, replatform, refactor | 48 | 5 |
| M03L02 | Repurchase, retain, retire, relocate | 48 | 5 |
### M04 Wave planning (MASTEMY-DESIGN 17%)

- Worked applications: (1) Sequence waves by dependency; (2) Group low-risk apps into an early wave
- Common misconception addressed: Migrating a dependent app before its dependency
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Grouping into waves | 48 | 5 |
| M04L02 | Dependencies and sequencing | 48 | 5 |
### M05 Tooling (MASTEMY-DESIGN 17%)

- Worked applications: (1) Pick a tool to replicate servers; (2) Plan a database migration approach
- Common misconception addressed: Assuming one tool covers every workload type
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Discovery and replication tools | 48 | 5 |
| M05L02 | Database migration | 48 | 5 |
### M06 Cutover (MASTEMY-DESIGN 17%)

- Worked applications: (1) Plan a low-risk cutover window; (2) Define validation and a rollback plan
- Common misconception addressed: Cutting over with no validation or rollback plan
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Cutover planning | 48 | 5 |
| M06L02 | Validation and rollback | 48 | 5 |

## Integrative case

An enterprise plans a cloud migration: assess the portfolio, choose among the migration strategies (the 7 Rs), build a wave plan and business case, use migration tooling, and plan cutover and validation, then defend the sequencing to stakeholders.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1493-final-protected | 30 | 30 | yes |
| MST-1493-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Migration foundations | 5 |
| Assessment | 5 |
| The 7 Rs | 5 |
| Wave planning | 5 |
| Tooling | 5 |
| Cutover | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1493-Q0001** (single-answer, Select ONE) An application will move to the cloud with minimal changes, just re-hosting the VMs. Which of the 7 Rs is this?

- A. Rehost (lift and shift) **(key)**  
  _Rationale:_ Correct: rehosting moves workloads with minimal change.
- B. Refactor  
  _Rationale:_ Refactoring re-architects the application significantly.
- C. Retire  
  _Rationale:_ Retire means decommissioning, not migrating.
- D. Repurchase  
  _Rationale:_ Repurchase replaces the app with a SaaS product.

**MST-1493-Q0002** (multiple-answer, Select TWO) Which TWO are sound practices when planning migration waves? (Select TWO.)

- A. Sequence waves so dependencies migrate before dependents **(key)**  
  _Rationale:_ Correct: dependencies must move first to avoid breaking apps.
- B. Start with lower-risk applications to build momentum and learning **(key)**  
  _Rationale:_ Correct: early low-risk waves reduce risk and build capability.
- C. Migrate every application simultaneously with no sequencing  
  _Rationale:_ A big-bang move raises risk and ignores dependencies.
- D. Skip the portfolio assessment to save time  
  _Rationale:_ Skipping assessment leads to poor strategy choices.

**MST-1493-Q0003** (single-answer, Select ONE) Why build a business case and TCO comparison before migrating?

- A. To justify the investment and choose the right strategy per application **(key)**  
  _Rationale:_ Correct: the business case and TCO guide investment and strategy decisions.
- B. Because AWS refuses migrations without one  
  _Rationale:_ It is good practice, not an AWS gate.
- C. To permanently lock the architecture with no changes  
  _Rationale:_ A business case does not lock architecture.
- D. To avoid ever needing validation at cutover  
  _Rationale:_ Validation is still required at cutover regardless.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
