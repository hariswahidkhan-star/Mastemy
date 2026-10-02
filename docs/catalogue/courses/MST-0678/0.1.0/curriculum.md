# Microsoft 365 Copilot Information Security and Permissions

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0678` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Purview and Microsoft 365 Copilot documentation read via the Microsoft Learn MCP on 2026-10-02 (Copilot honours existing permissions, sensitivity labels and the EXTRACT usage right, label inheritance, oversharing remediation and controls, DSPM for AI, SharePoint/OneDrive sharing). Capability names and portal paths change frequently; confirm against current docs before production. |
| Official sources | https://learn.microsoft.com/purview/ai-microsoft-purview; https://learn.microsoft.com/microsoft-365/copilot/configure-secure-governed-data-foundation-microsoft-365-copilot |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-COPILOT-SECURITY |
| Legacy IDs | none |
| Planned time | T = 1350 min; instruction I = 1080 min (80%); assessment A = 270 min (20%) |
| Assessment split | lesson checks 45 / module checks 64 / cumulative 161 min |
| Certificate | Mastemy Certificate of Completion — Microsoft 365 Copilot Information Security and Permissions (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how Copilot honours existing Microsoft 365 permissions
2. Describe sensitivity labels, encryption and the EXTRACT usage right
3. Identify and remediate oversharing risks
4. Use Microsoft Purview and DSPM for AI to govern Copilot data
5. Apply oversharing controls and label inheritance appropriately

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Copilot and the permission model (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Explain why a user cannot retrieve a file they lack access to; (2) Map the permission boundary for a sample query
- Common misconception addressed: Believing Copilot can bypass permissions to reach any tenant data
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | How Copilot respects existing permissions | 120 | 5 |
| M01L02 | The oversharing risk amplified by AI | 120 | 5 |

### M02 Sensitivity labels and encryption (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Trace label inheritance from a source doc to a Copilot output; (2) Explain why EXTRACT matters for encrypted content
- Common misconception addressed: Assuming a label name alone controls whether Copilot can read content
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Sensitivity labels and content markings | 120 | 5 |
| M02L02 | Encryption and the EXTRACT usage right | 120 | 5 |
| M02L03 | Label inheritance | 120 | 5 |

### M03 Oversharing remediation (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Use a data-access-governance report to find overshared sites; (2) Rescope a company-wide sharing link
- Common misconception addressed: Remediating oversharing only after, rather than before, enabling Copilot
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Finding overshared content | 120 | 5 |
| M03L02 | Remediating sharing links and permissions | 120 | 5 |

### M04 Purview and DSPM for AI (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Create a DSPM for AI data risk assessment; (2) Apply a one-click sensitivity-label policy
- Common misconception addressed: Expecting one-click policies to replace a governed data foundation
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | DSPM for AI and data risk assessments | 120 | 5 |
| M04L02 | One-click policies and oversharing controls | 120 | 5 |

## Integrative case

A security admin prepares a tenant for Copilot: confirm permission boundaries, apply sensitivity labels and understand EXTRACT, run data-access-governance reports to find overshared sites, remediate sharing links, and stand up DSPM for AI policies to monitor risky interactions.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0678-final-protected | 30 | 40 | yes |
| MST-0678-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Copilot and the permission model | 8 |
| Sensitivity labels and encryption | 8 |
| Oversharing remediation | 7 |
| Purview and DSPM for AI | 7 |

Minimum reviewed item bank: 278 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0678-Q0001** (single-answer, Select ONE) A user asks Copilot about a document they have no permission to open. What happens?

- A. Copilot does not return that content, because it respects existing permissions **(key)**  
  _Rationale:_ Correct: Copilot honours the user's existing access; inaccessible data is not returned.
- B. Copilot returns it because AI overrides permissions  
  _Rationale:_ Copilot does not override Microsoft 365 permissions.
- C. Copilot returns it only if encrypted  
  _Rationale:_ Encryption adds protection; it does not grant access.
- D. Copilot deletes the document  
  _Rationale:_ Copilot does not delete content in response to a query.

**MST-0678-Q0002** (multiple-answer, Select TWO) Which TWO statements about sensitivity labels and Copilot are correct? (Select TWO.)

- A. A Copilot output can inherit the sensitivity label of its source content **(key)**  
  _Rationale:_ Correct: label inheritance carries protection to generated items.
- B. For encrypted content, users need the EXTRACT usage right for Copilot to return the text **(key)**  
  _Rationale:_ Correct: EXTRACT (plus VIEW) is required to return encrypted content.
- C. Labels are irrelevant once Copilot is enabled  
  _Rationale:_ Labels remain a key protection layer with Copilot.
- D. Applying a label removes all access controls  
  _Rationale:_ Labels add, not remove, protection and controls.

**MST-0678-Q0003** (single-answer, Select ONE) When should oversharing be remediated relative to enabling Copilot?

- A. Before and as an ongoing activity, because Copilot can surface overshared data faster **(key)**  
  _Rationale:_ Correct: remediate oversharing before and continuously, since AI amplifies the risk.
- B. Only after users complain  
  _Rationale:_ Reactive-only remediation leaves data exposed.
- C. Never; Copilot handles it automatically  
  _Rationale:_ Copilot does not fix permissions automatically.
- D. Only for external users  
  _Rationale:_ Internal oversharing is also a risk Copilot can amplify.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
