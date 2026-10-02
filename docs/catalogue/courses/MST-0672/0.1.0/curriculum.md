# SharePoint: Team Sites and Document Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0672` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official SharePoint in Microsoft 365 documentation read via the Microsoft Learn MCP on 2026-10-02. Specific portal and UI labels can vary by release channel and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/sharepoint/modern-experience-sharing-permissions |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-SPO |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — SharePoint: Team Sites and Document Management (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe team, communication and hub sites and structure
2. Manage document libraries, versioning and metadata
3. Control permissions, inheritance and sharing
4. Set up navigation and search for findability

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Team sites and structure (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Create a team site connected to a Microsoft 365 group; (2) Associate sites to a hub for shared navigation
- Common misconception addressed: Treating a communication site as a collaboration team site
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Team versus communication sites | 120 | 5 |
| M01L02 | Site structure and hubs | 120 | 5 |

### M02 Document libraries (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Enable versioning and restore a prior version; (2) Add a content type with metadata columns
- Common misconception addressed: Using nested folders where metadata and views would serve better
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Libraries and versioning | 120 | 5 |
| M02L02 | Metadata and content types | 120 | 5 |

### M03 Permissions and sharing (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Break inheritance on a library and set unique permissions; (2) Create a specific-people sharing link
- Common misconception addressed: Breaking inheritance per item instead of managing groups
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Permission levels and inheritance | 120 | 5 |
| M03L02 | Sharing links and external access | 120 | 5 |

### M04 Navigation and search (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Configure site navigation and a landing page; (2) Tune metadata so documents surface in search
- Common misconception addressed: Expecting search to find documents with no useful metadata
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Pages and navigation | 120 | 5 |
| M04L02 | Search and findability | 120 | 5 |

## Integrative case

An admin sets up a project team site with a document library, metadata and content types, scoped permissions, and navigation for a cross-functional team.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0672-final-protected | 30 | 40 | yes |
| MST-0672-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Team sites and structure | 8 |
| Document libraries | 7 |
| Permissions and sharing | 8 |
| Navigation and search | 7 |

Minimum reviewed item bank: 308 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0672-Q0001** (single-answer, Select ONE) By default, how do lists and libraries get their permissions in a SharePoint site?

- A. They inherit permissions from the parent site **(key)**  
  _Rationale:_ Correct: sites and content inherit from the parent until inheritance is broken.
- B. Each item always has unique permissions  
  _Rationale:_ Unique permissions require explicitly breaking inheritance.
- C. Permissions come from Azure Storage tiers  
  _Rationale:_ Access tiers are an Azure Storage concept, not SharePoint permissions.
- D. Only the global admin can read them  
  _Rationale:_ Inherited permissions apply to assigned groups and users, not only the global admin.

**MST-0672-Q0002** (multiple-answer, Select TWO) Which TWO sharing link types exist in modern SharePoint? (Select TWO.)

- A. Specific people links **(key)**  
  _Rationale:_ Correct: specific-people links work only for named recipients.
- B. People in your organization links **(key)**  
  _Rationale:_ Correct: organization links work for internal users.
- C. Bicep deployment links  
  _Rationale:_ Bicep is an Azure IaC tool, not a sharing link type.
- D. Access-tier links  
  _Rationale:_ Access tiers belong to Azure Storage, not SharePoint sharing.

**MST-0672-Q0003** (single-answer, Select ONE) Which site type is best for broadcasting news across an organization?

- A. A communication site **(key)**  
  _Rationale:_ Correct: communication sites are designed for broadcasting news and status.
- B. A private channel site  
  _Rationale:_ Channel sites support a specific Teams channel, not org-wide broadcast.
- C. A OneDrive personal library  
  _Rationale:_ OneDrive is personal storage, not an org broadcast site.
- D. A storage account  
  _Rationale:_ A storage account is Azure infrastructure, not a SharePoint site.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
