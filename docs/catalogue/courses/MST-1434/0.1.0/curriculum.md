# Windows Server Administration Basics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1434` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Windows Server and Active Directory Domain Services documentation read via the Microsoft Learn MCP on 2026-10-02. Tool names and defaults can vary by Windows Server release and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-WINSRV |
| Legacy IDs | none |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — Windows Server Administration Basics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Install and manage Windows Server roles and features
2. Describe Active Directory Domain Services concepts
3. Perform core administration tasks including delegation and FSMO roles

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Server roles and features (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Add the AD DS role with Server Manager; (2) Identify roles available in a Server Core installation
- Common misconception addressed: Thinking Server Core includes a full desktop GUI
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Installing roles and features | 84 | 4 |
| M01L02 | Server Core versus Desktop Experience | 84 | 4 |

### M02 Active Directory Domain Services (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Explain the role of the schema and global catalog; (2) Delegate control with the Delegation of Control Wizard
- Common misconception addressed: Confusing the five FSMO roles with ordinary group memberships
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | AD DS concepts: domains, schema, global catalog | 84 | 4 |
| M02L02 | Users, groups, OUs, and delegation | 84 | 4 |

### M03 Administration and management (MASTEMY-DESIGN 30%, design weight)

- Worked applications: (1) Use the Active Directory Administrative Center PowerShell history viewer; (2) Review FSMO role placement across domain controllers
- Common misconception addressed: Believing Domain Admins membership is required for every routine task
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Managing with tools and PowerShell | 72 | 4 |
| M03L02 | FSMO roles and maintenance | 72 | 4 |

## Integrative case

An administrator promotes a domain controller, delegates password-reset rights for an organizational unit with the Delegation of Control Wizard, and reviews FSMO role placement.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1434-final-protected | 24 | 32 | yes |
| MST-1434-final-alternate | 24 | 32 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Server roles and features | 8 |
| Active Directory Domain Services | 8 |
| Administration and management | 8 |

Minimum reviewed item bank: 180 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1434-Q0001** (single-answer, Select ONE) Which part of AD DS defines the classes of objects and attributes contained in the directory?

- A. The schema **(key)**  
  _Rationale:_ Correct: the schema defines object classes, attributes, and their constraints.
- B. The global catalog  
  _Rationale:_ The global catalog holds searchable info about every object, not the definitions.
- C. The PDC emulator  
  _Rationale:_ The PDC emulator is an FSMO role, not the schema.
- D. A Group Policy Object  
  _Rationale:_ A GPO applies settings; it does not define the directory schema.

**MST-1434-Q0002** (multiple-answer, Select TWO) Which TWO are FSMO roles in Active Directory? (Select TWO.)

- A. Schema master **(key)**  
  _Rationale:_ Correct: the schema master is one of the five FSMO roles.
- B. RID master **(key)**  
  _Rationale:_ Correct: the RID master is one of the five FSMO roles.
- C. Backup operator  
  _Rationale:_ Backup operator is a built-in group, not an FSMO role.
- D. DHCP relay agent  
  _Rationale:_ A DHCP relay agent is a networking feature, not an FSMO role.

**MST-1434-Q0003** (single-answer, Select ONE) Which wizard delegates specific administrative tasks over an OU without granting Domain Admins membership?

- A. The Delegation of Control Wizard **(key)**  
  _Rationale:_ Correct: this wizard assigns a scoped set of tasks over an OU.
- B. The Add Roles and Features Wizard  
  _Rationale:_ That wizard installs roles, it does not delegate permissions.
- C. ADSI Edit  
  _Rationale:_ ADSI Edit is a low-level editor, not the delegation wizard.
- D. The Group Policy Modeling Wizard  
  _Rationale:_ That wizard models policy results, not delegation.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
