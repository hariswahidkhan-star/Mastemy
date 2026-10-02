# Amazon Q for Developers

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1492` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - vendor product documentation not reachable from build env (https://docs.aws.amazon.com/amazonq/; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — Amazon Q for Developers (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what Amazon Q Developer does and its surfaces
2. Use inline code suggestions and chat in the IDE
3. Ask questions about AWS services and account resources
4. Use code transformation and review features
5. Apply security scanning on code
6. Verify output and handle references and privacy

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Amazon Q overview (MASTEMY-DESIGN 16%)

- Worked applications: (1) Pick the right surface for a task; (2) Describe a task Q can accelerate
- Common misconception addressed: Treating Q output as always correct without review
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What Amazon Q Developer is | 48 | 5 |
| M01L02 | Surfaces: IDE, CLI, console | 48 | 5 |
### M02 Code assistance (MASTEMY-DESIGN 16%)

- Worked applications: (1) Accept and adapt a suggestion; (2) Ask Q to explain unfamiliar code
- Common misconception addressed: Accepting suggestions blindly without understanding them
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Inline suggestions | 48 | 5 |
| M02L02 | Chat and explanations | 48 | 5 |
### M03 AWS questions (MASTEMY-DESIGN 17%)

- Worked applications: (1) Ask how to configure an AWS service; (2) Query resources within permissions
- Common misconception addressed: Expecting answers about resources outside granted permissions
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Service questions | 48 | 5 |
| M03L02 | Account and resource context | 48 | 5 |
### M04 Code transformation (MASTEMY-DESIGN 17%)

- Worked applications: (1) Run a language/version upgrade; (2) Review a proposed transformation diff
- Common misconception addressed: Merging a transformation without reviewing the diff
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Upgrades and refactors | 48 | 5 |
| M04L02 | Reviewing changes | 48 | 5 |
### M05 Security scanning (MASTEMY-DESIGN 17%)

- Worked applications: (1) Scan code for a vulnerability; (2) Apply a suggested fix and re-scan
- Common misconception addressed: Assuming a scan guarantees the code is fully secure
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Finding vulnerabilities | 48 | 5 |
| M05L02 | Remediation suggestions | 48 | 5 |
### M06 Trust and references (MASTEMY-DESIGN 17%)

- Worked applications: (1) Verify a generated snippet before use; (2) Handle a flagged code reference responsibly
- Common misconception addressed: Ignoring code-reference and data-handling obligations
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Verifying output | 48 | 5 |
| M06L02 | Code references and privacy | 48 | 5 |

## Integrative case

A developer uses Amazon Q Developer in the IDE and CLI: get code suggestions and explanations, ask about AWS services, transform and review code, and apply security scanning, while verifying output and handling code references responsibly, then integrate it into a real task.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1492-final-protected | 30 | 30 | yes |
| MST-1492-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Amazon Q overview | 5 |
| Code assistance | 5 |
| AWS questions | 5 |
| Code transformation | 5 |
| Security scanning | 5 |
| Trust and references | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1492-Q0001** (single-answer, Select ONE) Before committing a code suggestion from Amazon Q Developer, a developer should:

- A. Review and test it to confirm it is correct and appropriate **(key)**  
  _Rationale:_ Correct: AI suggestions must be reviewed and tested before use.
- B. Commit it immediately because the AI produced it  
  _Rationale:_ AI output can be wrong; review is required.
- C. Disable version control to avoid conflicts  
  _Rationale:_ Disabling version control is unsafe and unrelated.
- D. Delete all tests to speed up the commit  
  _Rationale:_ Removing tests increases risk, not safety.

**MST-1492-Q0002** (multiple-answer, Select TWO) Which TWO are appropriate uses of Amazon Q Developer? (Select TWO.)

- A. Explaining unfamiliar code and suggesting implementations **(key)**  
  _Rationale:_ Correct: Q explains code and offers suggestions to adapt.
- B. Scanning code for potential security issues **(key)**  
  _Rationale:_ Correct: Q Developer can scan code and suggest remediations.
- C. Guaranteeing code is 100% secure with no further review  
  _Rationale:_ A scan reduces risk but does not guarantee security.
- D. Accessing resources outside the user's granted permissions  
  _Rationale:_ Q operates within the user's permissions, not beyond them.

**MST-1492-Q0003** (single-answer, Select ONE) Where can Amazon Q Developer assist a developer directly while writing code?

- A. Inline in the IDE with suggestions and chat **(key)**  
  _Rationale:_ Correct: Q provides inline suggestions and chat within the IDE.
- B. Only by mailing a report once a month  
  _Rationale:_ Q works interactively, not via monthly mail.
- C. Only inside Route 53  
  _Rationale:_ Route 53 is DNS and unrelated.
- D. Only through printed documentation  
  _Rationale:_ Q is an interactive assistant, not printed docs.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
