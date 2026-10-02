# .NET MAUI Cross-Platform Application Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0844` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Provider facts checked on Microsoft Learn 2026-10-02 (.NET MAUI cross-platform framework: single project, controls, platform APIs). Other lessons are Mastemy design; re-check provider docs for the product versions chosen at production. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-MAUI (https://learn.microsoft.com/dotnet/maui/what-is-maui; https://learn.microsoft.com/dotnet/maui/fundamentals/single-project; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — .NET MAUI Cross-Platform Application Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain .NET MAUI and the single-code-base cross-platform model
2. Understand the single project and multi-targeting
3. Build UI with XAML, controls and layouts
4. Use data binding and the MVVM pattern
5. Access native device features through cross-platform APIs
6. Understand the app entry point, handlers and how MAUI compiles per platform

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 MAUI fundamentals (MASTEMY-DESIGN 16%)

- Worked applications: (1) List the platforms a single MAUI project targets; (2) Explain how MAUI apps compile per platform
- Common misconception addressed: Thinking you need a separate project per platform
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What .NET MAUI is | 80 | 5 |
| M01L02 | Supported platforms and compilation | 80 | 5 |

### M02 Single project (MASTEMY-DESIGN 16%)

- Worked applications: (1) Add a shared image used on all platforms; (2) Place platform-specific code in the Platforms folder
- Common misconception addressed: Duplicating resources per platform unnecessarily
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Single project and multi-targeting | 80 | 5 |
| M02L02 | Platform folders and shared resources | 80 | 5 |

### M03 UI with XAML (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a page layout with a CollectionView; (2) Add Shell-based navigation
- Common misconception addressed: Mixing business logic into XAML code-behind
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | XAML, controls and the layout engine | 80 | 5 |
| M03L02 | Pages and navigation | 80 | 5 |

### M04 Data binding and MVVM (MASTEMY-DESIGN 17%)

- Worked applications: (1) Bind a list to a view model property; (2) Wire a button to a command
- Common misconception addressed: Updating UI directly instead of binding to a view model
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Data binding basics | 80 | 5 |
| M04L02 | MVVM with view models and commands | 80 | 5 |

### M05 Device features (MASTEMY-DESIGN 17%)

- Worked applications: (1) Read the device's network state; (2) Request a runtime permission before using GPS
- Common misconception addressed: Assuming every API works without requesting permissions
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Cross-platform device APIs | 80 | 5 |
| M05L02 | Permissions and sensors | 80 | 5 |

### M06 App model (MASTEMY-DESIGN 17%)

- Worked applications: (1) Trace startup through CreateMauiApp; (2) Add a handler customization for one platform
- Common misconception addressed: Confusing MAUI controls with the underlying native views
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | App entry point and MauiProgram | 80 | 5 |
| M06L02 | Handlers and platform code | 80 | 5 |

## Integrative case

Build a field-service app for Android, iOS, Windows and macOS from one .NET MAUI project: lay out pages in XAML, bind a job list with MVVM, read the device GPS and network state through cross-platform APIs, and add a small piece of platform-specific code where needed.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0844-final-protected | 40 | 50 | yes |
| MST-0844-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| MAUI fundamentals | 7 |
| Single project | 7 |
| UI with XAML | 7 |
| Data binding and MVVM | 7 |
| Device features | 6 |
| App model | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0844-Q0001** (single-answer, Select ONE) What is .NET MAUI?

- A. A cross-platform framework for native mobile and desktop apps from one C# and XAML code base **(key)**  
  _Rationale:_ Correct: MAUI targets Android, iOS, macOS and Windows from a single project.
- B. A server-side web API framework  
  _Rationale:_ That describes ASP.NET Core, not MAUI.
- C. A relational database  
  _Rationale:_ MAUI is a UI framework, not a database.
- D. A container orchestrator  
  _Rationale:_ MAUI does not orchestrate containers.

**MST-0844-Q0002** (multiple-answer, Select TWO) Which TWO are true about the .NET MAUI single project? (Select TWO.)

- A. One shared project can target Android, iOS, macOS and Windows **(key)**  
  _Rationale:_ Correct: a single project multi-targets several platforms.
- B. Platform-specific code lives in the Platforms folder and is built only for that platform **(key)**  
  _Rationale:_ Correct: the build includes each Platforms subfolder only for its platform.
- C. You must create one separate project per target platform  
  _Rationale:_ The single project removes the need for per-platform projects.
- D. Shared resources must be duplicated into each platform folder  
  _Rationale:_ Resources are shared in the single project.

**MST-0844-Q0003** (single-answer, Select ONE) Which pattern does .NET MAUI support for separating UI from logic through data binding?

- A. MVVM (Model-View-ViewModel) **(key)**  
  _Rationale:_ Correct: MAUI supports data binding and the MVVM pattern.
- B. Storing state only in the XAML code-behind  
  _Rationale:_ Putting logic in code-behind defeats separation.
- C. Writing all logic in the platform native languages  
  _Rationale:_ MAUI lets you share logic in C#; MVVM organizes it.
- D. Using the database as the view model  
  _Rationale:_ A database is not a view model.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
