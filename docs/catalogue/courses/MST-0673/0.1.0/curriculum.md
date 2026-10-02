# SharePoint Information Architecture and Permissions

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0673` v0.1.0 | Batch 12 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft SharePoint information-architecture and site-permissions documentation read via the Microsoft Learn MCP on 2026-10-02. Specific product UI labels can vary by release and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/sharepoint/information-architecture-modern-experience |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-SPIA |
| Legacy IDs | none |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — SharePoint Information Architecture and Permissions (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Design a modern, flat SharePoint information architecture using sites and hubs
2. Plan navigation, metadata and content organisation for findability
3. Plan and manage site permissions using groups, levels and inheritance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Modern information architecture (MASTEMY-DESIGN 34%, design weight)

- Worked applications: (1) Decide whether a new topic should be a site or a page within a site; (2) Associate three related sites with a hub site
- Common misconception addressed: Building deep subsite hierarchies instead of a modern flat architecture
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Sites, hubs and the flat architecture | 240 | 12 |
| M01L02 | Navigation and the three levels of navigation | 240 | 12 |

### M02 Metadata and findability (MASTEMY-DESIGN 33%, design weight)

- Worked applications: (1) Define two managed properties to improve search relevancy; (2) Use a Highlighted Content web part to surface content from other sites
- Common misconception addressed: Relying only on folders instead of metadata for organising and finding content
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Managed metadata and content types | 240 | 12 |
| M02L02 | Search, roll-up web parts and content targeting | 240 | 12 |

### M03 Permissions and governance (MASTEMY-DESIGN 33%, design weight)

- Worked applications: (1) Assign Visitors, Members and Owners groups for a new site; (2) Decide when to break permission inheritance for a sensitive library
- Common misconception addressed: Granting permissions to individual users instead of SharePoint groups
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Groups, permission levels and least privilege | 240 | 12 |
| M03L02 | Inheritance and fine-grained permissions | 240 | 12 |

## Integrative case

An intranet owner plans a departmental SharePoint structure: chooses a flat site/hub design, defines navigation and metadata, and designs a least-privilege permissions model using default groups and inheritance, documenting where inheritance is broken and why.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0673-final-protected | 72 | 96 | yes |
| MST-0673-final-alternate | 72 | 96 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Modern information architecture | 24 |
| Metadata and findability | 24 |
| Permissions and governance | 24 |

Minimum reviewed item bank: 540 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0673-Q0001** (single-answer, Select ONE) In modern SharePoint, what is the recommended way to connect a family of related sites?

- A. Associate them with a hub site **(key)**  
  _Rationale:_ Correct: hub sites connect related sites while keeping a flat architecture.
- B. Create nested subsites under one site collection  
  _Rationale:_ Subsites are not recommended in the modern flat architecture.
- C. Put all content in one giant document library  
  _Rationale:_ A single library does not connect sites and harms findability.
- D. Give every user Full Control  
  _Rationale:_ Permissions do not connect sites and this violates least privilege.

**MST-0673-Q0002** (multiple-answer, Select TWO) Which TWO practices follow Microsoft's SharePoint permissions guidance? (Select TWO.)

- A. Follow the principle of least privilege **(key)**  
  _Rationale:_ Correct: least privilege is a core SharePoint permissions guideline.
- B. Use the default Members, Visitors and Owners groups **(key)**  
  _Rationale:_ Correct: using standard groups and controlling at site level is recommended.
- C. Assign permissions to individual users wherever possible  
  _Rationale:_ Incorrect: Microsoft recommends groups over individual users.
- D. Break inheritance on every list and item by default  
  _Rationale:_ Incorrect: extensive fine-grained permissions increase management burden and are discouraged.

**MST-0673-Q0003** (single-answer, Select ONE) What happens when you stop inheriting permissions on a document library?

- A. It copies the parent's groups and permissions, then breaks the link so later parent changes do not flow down **(key)**  
  _Rationale:_ Correct: breaking inheritance copies current permissions and then decouples the child.
- B. It immediately removes all existing permissions from the library  
  _Rationale:_ Existing permissions are copied, not removed.
- C. It deletes the library  
  _Rationale:_ Breaking inheritance does not delete content.
- D. It grants every user Full Control  
  _Rationale:_ It does not change permission levels to Full Control.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
