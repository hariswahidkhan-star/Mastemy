# Claude + Notion + Slack: Team Knowledge and Handover Workflow

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0815` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Claude + Notion + Slack: Team Knowledge and Handover Workflow (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Scope team knowledge and handover documentation
2. Structure a Notion knowledge base with templates
3. Use Claude to draft and verify knowledge entries
4. Capture and link decisions from Slack
5. Maintain freshness, ownership and handover sign-off

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Knowledge and handover scope (MASTEMY-DESIGN 20%)

- Worked applications: (1) Define the sections a handover document needs; (2) Decide which system owns each piece of knowledge
- Common misconception addressed: Letting knowledge live only in chat where it is lost
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What good handover documentation captures | 120 | 7 |
| M01L02 | Ownership, freshness and source of truth | 120 | 7 |

### M02 Notion as the knowledge base (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build a Notion database for runbooks with status properties; (2) Create a reusable handover template
- Common misconception addressed: Storing structured knowledge as unsearchable free text
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Pages, databases and properties | 120 | 7 |
| M02L02 | Templates and structure | 120 | 7 |

### M03 Claude-assisted authoring (MASTEMY-DESIGN 20%)

- Worked applications: (1) Summarise a Slack thread into a Notion runbook entry; (2) Confirm the summary with the knowledge owner
- Common misconception addressed: Publishing an AI summary without owner confirmation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Summarising threads into docs | 120 | 7 |
| M03L02 | Verifying summaries with owners | 120 | 7 |

### M04 Slack integration (MASTEMY-DESIGN 20%)

- Worked applications: (1) Turn a decision in Slack into a linked Notion entry; (2) Post a Notion link back into the relevant Slack channel
- Common misconception addressed: Copying Slack messages by hand so context and links are lost
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Capturing decisions from Slack | 120 | 7 |
| M04L02 | Linking Slack to the knowledge base | 120 | 7 |

### M05 Maintenance and review (MASTEMY-DESIGN 20%)

- Worked applications: (1) Add a review date and owner to each knowledge entry; (2) Run a handover checklist and record sign-off
- Common misconception addressed: Treating the knowledge base as done after one write
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Freshness checks and ownership | 120 | 7 |
| M05L02 | Handover sign-off | 120 | 7 |

## Integrative case

Build a team handover workflow: structure a Notion knowledge base, capture a decision and a runbook from Slack threads, use Claude to draft the entries, confirm each with its owner, link Notion and Slack both ways, and add review dates so the knowledge stays fresh.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0815-final-protected | 40 | 50 | yes |
| MST-0815-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Knowledge and handover scope | 8 |
| Notion as the knowledge base | 8 |
| Claude-assisted authoring | 8 |
| Slack integration | 8 |
| Maintenance and review | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0815-Q0001** (single-answer, Select ONE) Why move decisions out of Slack threads into a structured Notion knowledge base?

- A. Chat is hard to search and decisions get lost; a knowledge base preserves them **(key)**  
  _Rationale:_ Correct: a structured base keeps decisions findable and durable.
- B. Because Slack deletes all messages daily  
  _Rationale:_ Slack retention varies; the point is findability, not deletion.
- C. Because Notion is encrypted and Slack is not  
  _Rationale:_ The issue is structure and searchability, not encryption.
- D. Because chat cannot hold text  
  _Rationale:_ Chat holds text; it is just not a durable knowledge base.

**MST-0815-Q0002** (multiple-answer, Select TWO) Which TWO practices keep a Claude-drafted knowledge entry trustworthy? (Select TWO.)

- A. Have the knowledge owner confirm the summary **(key)**  
  _Rationale:_ Correct: owner confirmation catches errors the AI cannot.
- B. Link the entry back to its source thread **(key)**  
  _Rationale:_ Correct: a source link preserves traceability.
- C. Publish the summary without any review  
  _Rationale:_ Unreviewed summaries can be wrong.
- D. Delete the original thread after summarising  
  _Rationale:_ Deleting the source removes the ability to verify.

**MST-0815-Q0003** (single-answer, Select ONE) Why add a review date and owner to each knowledge entry?

- A. So stale knowledge is revisited and someone is accountable for it **(key)**  
  _Rationale:_ Correct: freshness dates and owners keep the base reliable over time.
- B. Because entries expire automatically without them  
  _Rationale:_ Entries do not auto-expire; the date prompts review.
- C. Because it removes the need to write clearly  
  _Rationale:_ Clarity is still required.
- D. Because owners prevent anyone else reading  
  _Rationale:_ Ownership is about accountability, not access control.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
