# Power BI Embedded Analytics for .NET Applications

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0710` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Power BI embedded analytics documentation read via the Microsoft Learn MCP on 2026-10-02 (embed-for-your-customers / app-owns-data, service principal vs master user, Microsoft.Identity.Web and Microsoft.PowerBI.Api NuGet, embed tokens, capacity for production). SDK versions and portal steps change and must be confirmed before production. |
| Official sources | https://learn.microsoft.com/power-bi/developer/embedded/embedded-analytics-power-bi; https://learn.microsoft.com/power-bi/developer/embedded/embed-customer-app |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-PBI-EMBEDDED |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Power BI Embedded Analytics for .NET Applications (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Distinguish embed-for-your-customers (app-owns-data) from embed-for-your-organization
2. Register a Microsoft Entra app and choose service principal or master user auth
3. Acquire a Microsoft Entra token and a Power BI embed token in a .NET app
4. Embed a report using the Power BI client APIs and required NuGet packages
5. Plan workspace access and production capacity requirements

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Embedded analytics models (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Choose the model for an ISV portal; (2) Choose the model for an internal app
- Common misconception addressed: Assuming app users always need their own Power BI license
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What Power BI embedded analytics is | 88 | 5 |
| M01L02 | Embed for your customers vs your organization | 88 | 5 |

### M02 Identity and authentication (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Decide auth method for an ISV scenario; (2) List the parameters an app-owns-data app needs
- Common misconception addressed: Confusing a Microsoft Entra token with a Power BI embed token
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Registering a Microsoft Entra app | 88 | 5 |
| M02L02 | Service principal versus master user | 87 | 5 |

### M03 Tokens and the .NET embedding flow (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Add the required NuGet packages to a .NET app; (2) Trace the two-token flow for an embedded report
- Common misconception addressed: Thinking one token type is sufficient for app-owns-data embedding
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Acquiring a Microsoft Entra access token | 87 | 5 |
| M03L02 | Getting a Power BI embed token | 87 | 5 |
| M03L03 | Using Microsoft.PowerBI.Api and Microsoft.Identity.Web | 87 | 5 |

### M04 Embedding the report client-side (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Build the embed configuration object; (2) Enable a client-side interaction on the report
- Common misconception addressed: Hard-coding the service root URL for all clouds
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | The Power BI client APIs and embed config | 87 | 5 |
| M04L02 | Interacting with the embedded report | 87 | 5 |

### M05 Workspace access and production (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Add the service principal to a workspace; (2) Plan the capacity purchase before go-live
- Common misconception addressed: Shipping to production on free trial tokens without buying capacity
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Granting the service principal workspace access | 87 | 5 |
| M05L02 | Capacity and moving to production | 87 | 5 |

## Integrative case

An ISV embeds a Power BI report into a .NET 8 customer portal using app-owns-data with a service principal, acquiring tokens with Microsoft.Identity.Web and planning a capacity purchase before go-live.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0710-final-protected | 30 | 40 | yes |
| MST-0710-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Embedded analytics models | 5 |
| Identity and authentication | 6 |
| Tokens and the .NET embedding flow | 7 |
| Embedding the report client-side | 6 |
| Workspace access and production | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0710-Q0001** (single-answer, Select ONE) In an embed-for-your-customers (app-owns-data) solution, what is true of the application's end users?

- A. They do not need to sign in to Power BI or hold a Power BI license **(key)**  
  _Rationale:_ Correct: in app-owns-data the app, not the user, owns the Power BI identity and licensing.
- B. Each must have a Power BI Pro license  
  _Rationale:_ That describes user-owns-data, not app-owns-data.
- C. Each must be added to the Power BI workspace  
  _Rationale:_ The service principal or master user is added, not every end user.
- D. They must install Power BI Desktop  
  _Rationale:_ End users view embedded content in the app, not Desktop.

**MST-0710-Q0002** (multiple-answer, Select TWO) Which TWO NuGet packages are used in the .NET app-owns-data tutorial? (Select TWO.)

- A. Microsoft.Identity.Web **(key)**  
  _Rationale:_ Correct: used to acquire Microsoft Entra tokens.
- B. Microsoft.PowerBI.Api **(key)**  
  _Rationale:_ Correct: the client library for Power BI REST APIs and embed tokens.
- C. Microsoft.EntityFrameworkCore  
  _Rationale:_ Entity Framework is unrelated to Power BI embedding.
- D. Newtonsoft.Excel  
  _Rationale:_ This is not a real package used for embedding.

**MST-0710-Q0003** (single-answer, Select ONE) Before moving an embedded report to production, what must you buy if you developed with free trial tokens?

- A. A Power BI/Fabric capacity **(key)**  
  _Rationale:_ Correct: production embedding requires a purchased capacity; otherwise a trial banner persists.
- B. A new Microsoft Entra tenant  
  _Rationale:_ A new tenant is not required for production.
- C. A separate Visual Studio license per user  
  _Rationale:_ That is unrelated to embedding in production.
- D. A master user license for every end user  
  _Rationale:_ End users do not need licenses in app-owns-data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
