# Blazor Web Application Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0845` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design, cross-checked against Microsoft Learn ASP.NET Core Blazor documentation (vendor docs, partial). This is a skills course, not an official Microsoft credential; confirm the current ASP.NET Core version and render-mode behaviour at blueprint review. |
| Evidence | **vendor-docs-partial** - vendor-docs-partial - module topics cross-checked against official Microsoft Learn Blazor documentation this session; not a full SME review. |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Blazor Web Application Development (module checks >= 75%, final >= 80%) |
| Verification sources | https://learn.microsoft.com/aspnet/core/blazor/ |

## Learning outcomes

1. Build Razor components with parameters, binding and events
2. Choose and apply Blazor render modes correctly
3. Implement routing, layouts and navigation
4. Build and validate forms with EditForm and data binding
5. Integrate components with services via dependency injection

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Components and binding (MASTEMY-DESIGN 20%)

- Worked applications: (1) Pass data to a child component via parameters; (2) Bind an input to a C# field with @bind
- Common misconception addressed: Mutating parent state directly from a child instead of raising an event
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Razor components, parameters and events | 120 | 7 |
| M01L02 | Two-way data binding | 120 | 7 |

### M02 Render modes (MASTEMY-DESIGN 20%)

- Worked applications: (1) Apply @rendermode InteractiveServer to a component; (2) Choose a render mode for an interactive page
- Common misconception addressed: Trying to make the root App component interactive
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Static SSR, Interactive Server, WebAssembly and Auto | 120 | 7 |
| M02L02 | Applying and propagating render modes | 120 | 7 |

### M03 Routing and layouts (MASTEMY-DESIGN 20%)

- Worked applications: (1) Define a routable page with a @page directive; (2) Share a MainLayout across pages
- Common misconception addressed: Expecting server round-trips for internal interactive navigation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Route templates and the Router | 120 | 7 |
| M03L02 | Layouts and navigation | 120 | 7 |

### M04 Forms and validation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Bind a model to an EditForm; (2) Show validation messages for invalid input
- Common misconception addressed: Trusting client-side validation without server-side checks
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | EditForm and input components | 120 | 7 |
| M04L02 | Validation with data annotations | 120 | 7 |

### M05 Services and DI (MASTEMY-DESIGN 20%)

- Worked applications: (1) Inject a service with @inject; (2) Load data in OnInitializedAsync
- Common misconception addressed: Doing long-running work in the component constructor
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Injecting services into components | 120 | 7 |
| M05L02 | Component lifecycle and state | 120 | 7 |

## Integrative case

Build a Blazor Web App dashboard: compose reusable components with parameters and events, select an appropriate render mode for interactivity, route between pages under a shared layout, validate an EditForm, and load data through an injected service in the component lifecycle.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0845-final-protected | 40 | 50 | yes |
| MST-0845-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Components and binding | 8 |
| Render modes | 8 |
| Routing and layouts | 8 |
| Forms and validation | 8 |
| Services and DI | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0845-Q0001** (single-answer, Select ONE) In a Blazor Web App, how do you make a specific page interactive on the server?

- A. Apply @rendermode InteractiveServer to the component **(key)**  
  _Rationale:_ Correct: the @rendermode directive assigns interactive server-side rendering to the component.
- B. Set the App root component to interactive  
  _Rationale:_ Making the root App component interactive is not supported.
- C. Add a <script> tag that calls Blazor.start()  
  _Rationale:_ Render mode is declared with @rendermode, not ad-hoc scripts.
- D. Rename the file to .cshtml  
  _Rationale:_ Blazor components are .razor files; the extension does not set interactivity.

**MST-0845-Q0002** (multiple-answer, Select TWO) Which TWO are valid Blazor render modes for a component? (Select TWO.)

- A. Interactive Server **(key)**  
  _Rationale:_ Correct: Interactive Server renders interactively over a SignalR connection.
- B. Interactive WebAssembly **(key)**  
  _Rationale:_ Correct: Interactive WebAssembly runs the component client-side on the .NET WebAssembly runtime.
- C. Interactive Database  
  _Rationale:_ There is no 'Interactive Database' render mode.
- D. Static Client  
  _Rationale:_ Static rendering is server-side (Static SSR); there is no 'Static Client' mode.

**MST-0845-Q0003** (single-answer, Select ONE) Where should a Blazor component typically load its initial data?

- A. In OnInitializedAsync **(key)**  
  _Rationale:_ Correct: OnInitializedAsync is the lifecycle method for initial async data loading.
- B. In the component constructor with a blocking call  
  _Rationale:_ Blocking work in the constructor harms responsiveness and testability.
- C. In the Razor markup directly  
  _Rationale:_ Markup renders output; it is not where async loading belongs.
- D. In the _Imports.razor file  
  _Rationale:_ _Imports.razor declares usings, not data loading.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
