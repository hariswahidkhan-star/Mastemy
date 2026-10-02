# Exchange Online Administration Basics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1447` v0.1.0 | Batch 12 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Exchange Online recipient and PowerShell documentation read via the Microsoft Learn MCP on 2026-10-02. Specific product UI labels can vary by release and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/exchange/recipients-in-exchange-online/manage-user-mailboxes/manage-user-mailboxes |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-EXO |
| Legacy IDs | MST-MIC-SK-EOAB-001 |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — Exchange Online Administration Basics (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Describe Exchange Online recipients and the Exchange admin center
2. Manage user mailboxes and properties with the EAC and PowerShell
3. Explain mail flow rules, permissions and basic troubleshooting

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Recipients and the admin center (MASTEMY-DESIGN 34%, design weight)

- Worked applications: (1) Classify three recipients as user mailbox, shared mailbox or distribution group; (2) Connect to Exchange Online PowerShell with the ExchangeOnlineManagement module
- Common misconception addressed: Assuming the EAC and PowerShell are mutually exclusive rather than complementary
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Recipient types and the Exchange admin center | 80 | 4 |
| M01L02 | Connecting to Exchange Online PowerShell | 80 | 4 |

### M02 Managing mailboxes (MASTEMY-DESIGN 33%, design weight)

- Worked applications: (1) Use Set-Mailbox to change a mailbox send-size limit; (2) Grant Full Access to a mailbox with Add-MailboxPermission
- Common misconception addressed: Confusing Full Access with Send As when delegating mailbox access
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Mailbox properties with Get-Mailbox and Set-Mailbox | 80 | 4 |
| M02L02 | Permissions and delegation | 80 | 4 |

### M03 Mail flow and troubleshooting (MASTEMY-DESIGN 33%, design weight)

- Worked applications: (1) Describe what a transport (mail flow) rule does; (2) Write a Get-Mailbox filter to report mailboxes with litigation hold enabled
- Common misconception addressed: Expecting PowerShell changes to be instant everywhere, ignoring replication delay
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Mail flow rules and connectors | 80 | 4 |
| M03L02 | Basic troubleshooting and reporting | 80 | 4 |

## Integrative case

A new admin onboards a user: creates and configures the mailbox, sets a forwarding and send-size property, grants a delegate Full Access, and writes the Exchange Online PowerShell commands to report on all mailboxes matching a condition.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1447-final-protected | 24 | 32 | yes |
| MST-1447-final-alternate | 24 | 32 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Recipients and the admin center | 8 |
| Managing mailboxes | 8 |
| Mail flow and troubleshooting | 8 |

Minimum reviewed item bank: 180 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1447-Q0001** (single-answer, Select ONE) Which cmdlet changes a property, such as the send-size limit, on an existing Exchange Online mailbox?

- A. Set-Mailbox **(key)**  
  _Rationale:_ Correct: Set-Mailbox changes properties on an existing mailbox.
- B. Get-Mailbox  
  _Rationale:_ Get-Mailbox reads properties but does not change them.
- C. New-Mailbox  
  _Rationale:_ New-Mailbox creates a mailbox rather than changing an existing one.
- D. Remove-Mailbox  
  _Rationale:_ Remove-Mailbox deletes a mailbox.

**MST-1447-Q0002** (multiple-answer, Select TWO) Which TWO statements about managing Exchange Online are correct? (Select TWO.)

- A. You connect to Exchange Online PowerShell using the ExchangeOnlineManagement module **(key)**  
  _Rationale:_ Correct: that module provides Connect-ExchangeOnline.
- B. Get-Mailbox can return many properties with Format-List **(key)**  
  _Rationale:_ Correct: piping to Format-List shows the mailbox's properties.
- C. PowerShell cannot be used for Exchange Online administration  
  _Rationale:_ Incorrect: PowerShell is a primary administration interface for Exchange Online.
- D. Set-Mailbox is used only to read mailbox size  
  _Rationale:_ Incorrect: Set-Mailbox changes properties; reading is done with Get-Mailbox.

**MST-1447-Q0003** (single-answer, Select ONE) To give an administrator the ability to open and read all user mailboxes, which permission is granted?

- A. Full Access via Add-MailboxPermission **(key)**  
  _Rationale:_ Correct: Full Access lets the grantee open the mailbox and its contents.
- B. Send As only  
  _Rationale:_ Send As lets a user send as the mailbox but not read its contents.
- C. A mail flow rule  
  _Rationale:_ Mail flow rules govern message routing, not mailbox access.
- D. A distribution group membership  
  _Rationale:_ Group membership does not grant mailbox access rights.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
