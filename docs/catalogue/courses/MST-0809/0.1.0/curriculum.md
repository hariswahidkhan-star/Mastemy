# ChatGPT + Jira + Confluence: Product Delivery Documentation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0809` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — ChatGPT + Jira + Confluence: Product Delivery Documentation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Scope product delivery documentation and its sources of truth
2. Use Jira issues and queries as the structured work record
3. Use ChatGPT to draft consistent documentation from issues
4. Publish linked, templated pages in Confluence
5. Verify documentation against the work record and record sign-off

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Delivery documentation scope (MASTEMY-DESIGN 20%)

- Worked applications: (1) List the documents a release needs and their owners; (2) Decide which tool is the source of truth for each artefact
- Common misconception addressed: Letting documentation drift out of sync with the tracked work
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What product delivery docs must capture | 120 | 7 |
| M01L02 | Audience, source of truth and ownership | 120 | 7 |

### M02 Jira as the work record (MASTEMY-DESIGN 20%)

- Worked applications: (1) Write a JQL query for issues shipped in a release; (2) Map issue fields to the fields a release note needs
- Common misconception addressed: Treating free-text comments as structured, queryable data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Issues, epics and workflow states | 120 | 7 |
| M02L02 | Queries and structured fields | 120 | 7 |

### M03 ChatGPT-assisted drafting (MASTEMY-DESIGN 20%)

- Worked applications: (1) Draft release notes from a set of resolved issues; (2) Create a reusable prompt template for consistent notes
- Common misconception addressed: Publishing AI-drafted notes without checking them against Jira
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Summarising issues into release notes | 120 | 7 |
| M03L02 | Prompting for consistent structure | 120 | 7 |

### M04 Confluence publishing (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build a release-notes template with linked issue keys; (2) Embed a live Jira query into a Confluence page
- Common misconception addressed: Copying issue details by hand so links break and rot
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Page structure, templates and links | 120 | 7 |
| M04L02 | Linking Confluence to Jira records | 120 | 7 |

### M05 Review and traceability (MASTEMY-DESIGN 20%)

- Worked applications: (1) Verify each release-note line against its Jira issue; (2) Record who approved the published documentation
- Common misconception addressed: Shipping documentation with no traceable approval
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Fact-checking against the work record | 120 | 7 |
| M05L02 | Change history and sign-off | 120 | 7 |

## Integrative case

Produce release documentation for a sprint: query the shipped Jira issues, draft release notes with ChatGPT from those issues, publish them in a Confluence template with live links back to Jira, verify each line against its issue, and record who approved the page.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0809-final-protected | 40 | 50 | yes |
| MST-0809-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Delivery documentation scope | 8 |
| Jira as the work record | 8 |
| ChatGPT-assisted drafting | 8 |
| Confluence publishing | 8 |
| Review and traceability | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0809-Q0001** (single-answer, Select ONE) Why embed a live Jira query in a Confluence release page instead of pasting issue details by hand?

- A. So the page stays in sync with the tracked issues and links do not rot **(key)**  
  _Rationale:_ Correct: a live link keeps the page consistent with the source of truth.
- B. Because pasted text is encrypted  
  _Rationale:_ Pasting does not encrypt anything.
- C. Because it removes the need to review the notes  
  _Rationale:_ Review is still required regardless of linking.
- D. Because Confluence cannot display text  
  _Rationale:_ Confluence displays text; the issue is drift, not capability.

**MST-0809-Q0002** (multiple-answer, Select TWO) Which TWO practices keep ChatGPT-drafted release notes trustworthy? (Select TWO.)

- A. Verify each drafted line against its Jira issue **(key)**  
  _Rationale:_ Correct: verification ties the note to the actual work record.
- B. Use a consistent prompt template for structure **(key)**  
  _Rationale:_ Correct: a template yields consistent, reviewable output.
- C. Publish drafts before anyone reads them  
  _Rationale:_ Unreviewed drafts can misstate what shipped.
- D. Invent issue keys that look plausible  
  _Rationale:_ Fabricated keys break traceability.

**MST-0809-Q0003** (single-answer, Select ONE) Jira comments contain useful context but are free text. What is the limitation for reporting?

- A. Free text is not reliably queryable, so structured fields are needed for reporting **(key)**  
  _Rationale:_ Correct: structured fields support consistent queries; comments do not.
- B. Comments are automatically structured data  
  _Rationale:_ Comments are unstructured free text.
- C. Comments cannot be read by people  
  _Rationale:_ Comments are readable; they are just not queryable.
- D. Reporting never needs structure  
  _Rationale:_ Consistent reporting relies on structured fields.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
