# Microsoft 365 Copilot: End-to-End Workplace Productivity

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0675` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft 365 Copilot documentation read via the Microsoft Learn MCP on 2026-10-02 (Copilot overview, architecture/grounding, Microsoft Graph, Work IQ, enterprise data protection, licensing tiers). Licensing names and per-app feature sets change frequently and must be confirmed against the current service before production. |
| Official sources | https://learn.microsoft.com/microsoft-365/copilot/microsoft-365-copilot-overview; https://learn.microsoft.com/microsoft-365/copilot/microsoft-365-copilot-architecture |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-M365-COPILOT |
| Legacy IDs | MST-MIC-SK-M365CP-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Microsoft 365 Copilot: End-to-End Workplace Productivity (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the Microsoft 365 Copilot experiences across the core apps and Copilot Chat
2. Explain how grounding in web and organizational data works
3. Apply enterprise data protection, permission and sensitivity-label awareness
4. Verify Copilot output before using it in professional work
5. Choose the right Copilot surface for a given workplace task

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 The Microsoft 365 Copilot landscape (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Map five tasks to the right Copilot surface; (2) Distinguish basic chat from the licensed experience
- Common misconception addressed: Assuming all Copilot experiences ground in organizational data
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Copilot across Word, Excel, PowerPoint, Outlook and Teams | 88 | 5 |
| M01L02 | Copilot Chat versus licensed Microsoft 365 Copilot | 88 | 5 |

### M02 How grounding works (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Trace a prompt through grounding to a response; (2) Explain what organizational grounding adds
- Common misconception addressed: Believing grounding makes every answer correct
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The prompt and grounding flow | 88 | 5 |
| M02L02 | Microsoft Graph and Work IQ grounding | 87 | 5 |

### M03 Data protection, permissions and compliance (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Explain why Copilot cannot surface an inaccessible file; (2) Classify content before using it in a prompt
- Common misconception addressed: Assuming Copilot ignores existing access controls
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Enterprise data protection | 87 | 5 |
| M03L02 | Permission trimming and sensitivity labels | 87 | 5 |
| M03L03 | Governance and admin controls at a glance | 87 | 5 |

### M04 Verification and responsible use (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Fact-check a Copilot summary against sources; (2) Write an AI-assistance note for a report
- Common misconception addressed: Pasting Copilot output into a deliverable unchecked
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Verifying figures, quotes and citations | 87 | 5 |
| M04L02 | Recording what was AI-assisted | 87 | 5 |

### M05 Choosing the right surface (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Select surfaces for a reporting cycle; (2) Plan a synthesise-draft-build-verify workflow
- Common misconception addressed: Using chat for work that belongs in an in-app Copilot and vice versa
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Matching surface to task | 87 | 5 |
| M05L02 | An end-to-end weekly reporting workflow | 87 | 5 |

## Integrative case

An operations lead adopts Microsoft 365 Copilot across Outlook, Teams, Word and Excel for a weekly reporting cycle: synthesise a meeting, draft the summary, build the deck, and verify figures, while respecting data protection and permissions.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0675-final-protected | 30 | 40 | yes |
| MST-0675-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The Microsoft 365 Copilot landscape | 5 |
| How grounding works | 6 |
| Data protection, permissions and compliance | 7 |
| Verification and responsible use | 6 |
| Choosing the right surface | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0675-Q0001** (single-answer, Select ONE) A user asks Copilot Chat (basic, unlicensed) about a figure in an internal file they did not upload. Why might Copilot be unable to use it?

- A. Basic Copilot Chat cannot access organizational data via Microsoft Graph **(key)**  
  _Rationale:_ Correct: the basic experience does not ground in tenant data via Graph; the file must be uploaded or a licensed experience used.
- B. Copilot deleted the file  
  _Rationale:_ Copilot does not delete organizational files.
- C. The file is always public  
  _Rationale:_ Access depends on permissions, and basic chat lacks Graph grounding.
- D. Copilot only works offline  
  _Rationale:_ Copilot is a cloud service, not offline-only.

**MST-0675-Q0002** (multiple-answer, Select TWO) Which TWO are true of the licensed Microsoft 365 Copilot experience? (Select TWO.)

- A. It can ground responses in organizational data via Microsoft Graph **(key)**  
  _Rationale:_ Correct: the licensed experience grounds in tenant data the user can access.
- B. It trims results to content the signed-in user is permitted to see **(key)**  
  _Rationale:_ Correct: permission trimming applies to Copilot responses.
- C. It bypasses sensitivity labels for speed  
  _Rationale:_ Copilot honours sensitivity labels.
- D. It guarantees every answer is factually correct  
  _Rationale:_ Output must still be verified.

**MST-0675-Q0003** (single-answer, Select ONE) Before including a Copilot-generated figure in a board summary, the correct step is to:

- A. Verify the figure against the trusted source **(key)**  
  _Rationale:_ Correct: generated figures must be verified before professional use.
- B. Trust it because Copilot used organizational data  
  _Rationale:_ Grounding does not guarantee correctness; verify.
- C. Remove all figures from the summary  
  _Rationale:_ Removing figures is not required; verifying is.
- D. Share the prompt publicly  
  _Rationale:_ Sharing prompts is unrelated and may expose data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
