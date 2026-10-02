# ChatGPT Enterprise Permissions and Information Governance

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0492` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam | none - Mastemy skills course; no external exam or official syllabus |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — ChatGPT Enterprise Permissions and Information Governance (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Map enterprise roles and permissions for ChatGPT access
2. Design information-governance rules for AI-assisted work
3. Configure data retention, logging and access reviews
4. Apply compliance and audit controls to enterprise AI use

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on enterprise configuration and organisation- and jurisdiction-specific compliance judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded configurations or peer review.

## Modules

### M01 Roles and permissions (25%)

- Worked applications: (1) Design a role model that uses SSO groups for ChatGPT access; (2) Scope a sensitive project so only one team can reach it
- Common misconception addressed: Assuming SSO alone enforces data-level access inside the tool
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Enterprise role models and SSO | 120 | 6 |
| M01L02 | Scoping access to resources | 120 | 6 |

### M02 Information governance (25%)

- Worked applications: (1) Classify three document types and set prompt rules for each; (2) Write a rule for when source data may not be pasted at all
- Common misconception addressed: Treating all company data as equally safe to put into prompts
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Data classification for AI use | 120 | 6 |
| M02L02 | Rules for what may enter a prompt | 120 | 6 |

### M03 Retention and auditing (25%)

- Worked applications: (1) Configure retention and logging to meet a stated policy; (2) Schedule a quarterly access review and define its owner
- Common misconception addressed: Enabling logging but never reviewing the logs
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Retention and logging settings | 120 | 6 |
| M03L02 | Periodic access reviews | 120 | 6 |

### M04 Compliance and audit (25%)

- Worked applications: (1) Map workspace controls to two requirements of a named framework; (2) Prepare an evidence pack for an auditor's access-control question
- Common misconception addressed: Claiming compliance without evidence that controls operate
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Mapping controls to a compliance framework | 120 | 6 |
| M04L02 | Responding to an audit request | 120 | 6 |

## Integrative case

A governance lead at a regulated enterprise must stand up ChatGPT Enterprise responsibly: they map SSO-based roles, classify data and set prompt rules by classification, configure retention and logging, schedule quarterly access reviews, and assemble audit evidence mapping the controls to the organisation's compliance framework.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy-designed skills course; form length set from the assessment time budget, not an external exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0492-final-protected | 72 | 72 | yes |
| MST-0492-final-alternate | 72 | 72 | no (optional) |

| Domain | Items per form |
|---|---|
| Roles and permissions | 18 |
| Information governance | 18 |
| Retention and auditing | 18 |
| Compliance and audit | 18 |

Minimum reviewed item bank: 408 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0492-Q0001** (single-answer, Select ONE) Why classify data before writing rules about what may be entered into ChatGPT prompts?

- A. Rules can then differ by sensitivity instead of treating all data the same **(key)**  
  _Rationale:_ Correct: classification lets governance apply proportionate rules by sensitivity.
- B. Classification makes the model answer faster  
  _Rationale:_ Classification does not affect model speed.
- C. It removes the need for any human review  
  _Rationale:_ Classification supports, but does not replace, human review.
- D. It increases the context window  
  _Rationale:_ Classification is unrelated to context window size.

**MST-0492-Q0002** (single-answer, Select ONE) An enterprise enables audit logging but no one examines the logs. What governance gap remains?

- A. Logs provide no assurance unless they are reviewed and acted on **(key)**  
  _Rationale:_ Correct: a control only operates if its output is reviewed; unreviewed logs give no assurance.
- B. Logging automatically blocks all misuse  
  _Rationale:_ Logging records events; it does not by itself prevent misuse.
- C. The gap is closed as soon as logging is on  
  _Rationale:_ Enabling logging is necessary but not sufficient without review.
- D. Logs replace the need for access reviews  
  _Rationale:_ Logs and periodic access reviews serve different purposes.

**MST-0492-Q0003** (multiple-answer, Select TWO) Which TWO elements belong in an access review for enterprise ChatGPT? (Select TWO)

- A. A named owner responsible for the review **(key)**  
  _Rationale:_ Correct: accountability requires a named owner.
- B. A defined cadence, such as quarterly **(key)**  
  _Rationale:_ Correct: a periodic cadence makes the review a repeatable control.
- C. The interface colour scheme  
  _Rationale:_ Appearance is irrelevant to access governance.
- D. The number of emojis used in prompts  
  _Rationale:_ This has no governance relevance.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.

