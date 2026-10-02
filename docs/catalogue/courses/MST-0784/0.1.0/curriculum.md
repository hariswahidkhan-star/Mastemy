# ChatGPT + Google Workspace: Research-to-Action Workflow

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0784` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — ChatGPT + Google Workspace: Research-to-Action Workflow (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Plan a research-to-action workflow across Docs, Sheets and Gmail
2. Use ChatGPT to summarise and structure source material responsibly
3. Capture structured outputs into Sheets with validation
4. Draft actions and communications with a human approval step
5. Govern data handling, sharing and auditability across the workflow

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Workflow design (20%)

- Worked applications: (1) Map a research request to Docs/Sheets/Gmail stages and handoffs; (2) Decide which steps must stay human-in-the-loop
- Common misconception addressed: Automating a decision step that needs human judgement
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Stages, handoffs and human checkpoints | 120 | 7 |
| M01L02 | Choosing what to automate vs review | 120 | 7 |

### M02 Responsible summarisation (20%)

- Worked applications: (1) Summarise five articles and cite each claim back to its source; (2) Detect a summary that overstates a source and fix it
- Common misconception addressed: Treating an AI summary as a faithful quote of the source
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Prompting for grounded summaries | 120 | 7 |
| M02L02 | Checking summaries against sources | 120 | 7 |

### M03 Structured capture in Sheets (20%)

- Worked applications: (1) Convert a summary into a validated Sheets row with required fields; (2) Add data validation that rejects malformed entries
- Common misconception addressed: Pasting free text where structured fields are needed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Designing the capture schema | 120 | 7 |
| M03L02 | Validation and error handling in Sheets | 120 | 7 |

### M04 Drafting actions (20%)

- Worked applications: (1) Draft a follow-up email that a reviewer approves before sending; (2) Flag an action that should not be sent automatically
- Common misconception addressed: Letting the assistant send outbound email without approval
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Draft-then-approve email patterns | 120 | 7 |
| M04L02 | Guardrails on outbound actions | 120 | 7 |

### M05 Governance and audit (20%)

- Worked applications: (1) Set sharing scopes so a doc is not exposed beyond its audience; (2) Produce an audit trail of who approved what and when
- Common misconception addressed: Sharing 'anyone with the link' for internal research
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Sharing scopes and data handling | 120 | 7 |
| M05L02 | Audit trails and retention | 120 | 7 |

## Integrative case

An analyst runs a weekly research-to-action loop: ChatGPT summarises sources with citations, results land in a validated Sheet, follow-up emails are drafted for approval, and every step leaves an auditable trail with correct sharing scopes.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0784-final-protected | 40 | 50 | yes |
| MST-0784-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Workflow design | 8 |
| Responsible summarisation | 8 |
| Structured capture in Sheets | 8 |
| Drafting actions | 8 |
| Governance and audit | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0784-Q0001** (single-answer, Select ONE) The workflow proposes to auto-send follow-up emails generated by ChatGPT. What is the safest design?

- A. Draft the email and require human approval before sending **(key)**  
  _Rationale:_ Correct: outbound communication is a high-impact action that warrants a human gate.
- B. Send automatically and apologise for mistakes later  
  _Rationale:_ Sending first and correcting later damages trust and may breach policy.
- C. Send only to internal addresses automatically  
  _Rationale:_ Internal recipients can still be harmed by an incorrect or premature message.
- D. Send if the draft is under 100 words  
  _Rationale:_ Length is unrelated to whether the content is correct or appropriate.

**MST-0784-Q0002** (multiple-answer, Select TWO) Which TWO practices keep AI summaries trustworthy in this workflow? (Select TWO.)

- A. Cite each claim back to its source **(key)**  
  _Rationale:_ Correct: traceable claims can be checked.
- B. Verify summaries against the source text **(key)**  
  _Rationale:_ Correct: checking against the source catches overstatement.
- C. Share research docs as 'anyone with the link'  
  _Rationale:_ Open link sharing is a governance risk, not a trust practice.
- D. Paste summaries as free text into Sheets  
  _Rationale:_ Unstructured capture undermines validation.

**MST-0784-Q0003** (single-answer, Select ONE) Which step in a research-to-action loop most clearly must remain human-in-the-loop?

- A. Approving an external communication before it is sent **(key)**  
  _Rationale:_ Correct: a consequential outbound decision needs human judgement.
- B. Counting the number of sources  
  _Rationale:_ Counting is mechanical and safe to automate.
- C. Formatting a Sheets header row  
  _Rationale:_ Formatting is low-risk and automatable.
- D. Converting a date to ISO format  
  _Rationale:_ A deterministic transform does not need human review.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
