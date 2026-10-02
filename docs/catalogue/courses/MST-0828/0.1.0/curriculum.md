# ASP.NET Core MVC Application Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0828` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Provider facts checked on Microsoft Learn 2026-10-02 (Overview of ASP.NET Core MVC, views, and model binding: MVC pattern, controllers and actions, Razor views and view models, model binding and validation). Other lessons are Mastemy design; re-check provider docs for the product versions chosen at production. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-ASPNETCORE-MVC (https://learn.microsoft.com/aspnet/core/mvc/overview; https://learn.microsoft.com/aspnet/core/mvc/models/model-binding; accessed 2026-10-02) |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — ASP.NET Core MVC Application Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the MVC pattern and separation of concerns
2. Build controllers, actions and routing
3. Create Razor views, strongly-typed views and view models
4. Apply model binding and validation with ModelState
5. Use filters, layouts and a clean project structure

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 MVC pattern and setup (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map a user request through controller, model and view; (2) Explain why the model does not depend on the view
- Common misconception addressed: Putting business logic in the view or controller
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Models, views and controllers | 120 | 7 |
| M01L02 | Separation of concerns | 120 | 7 |

### M02 Controllers and actions (MASTEMY-DESIGN 20%)

- Worked applications: (1) Write an action that returns a ViewResult; (2) Add attribute routing to a controller action
- Common misconception addressed: Overloading a controller with too many responsibilities
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Action methods and ActionResult | 120 | 7 |
| M02L02 | Routing to controllers (convention and attribute) | 120 | 7 |

### M03 Views and Razor (MASTEMY-DESIGN 20%)

- Worked applications: (1) Create a strongly-typed view with an @model directive; (2) Use a view model to shape data for a page
- Common misconception addressed: Using the business model directly as the view model
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Razor syntax and view discovery | 120 | 7 |
| M03L02 | Strongly-typed views and view models | 120 | 7 |

### M04 Model binding and validation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Bind a form post to a model in an action; (2) Validate input and return the view on invalid ModelState
- Common misconception addressed: Trusting bound input without validating it
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Binding from route, form and query | 120 | 7 |
| M04L02 | Validation and ModelState | 120 | 7 |

### M05 Cross-cutting and structure (MASTEMY-DESIGN 20%)

- Worked applications: (1) Move a repeated check into an action filter; (2) Share a layout across views
- Common misconception addressed: Duplicating the same logic across many actions
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Filters and layouts | 120 | 7 |
| M05L02 | Organising controllers, views and models | 120 | 7 |

## Integrative case

Build an MVC feature: a controller with routed actions, strongly-typed Razor views backed by view models, a form that binds and validates with ModelState, a shared layout, and a filter that removes a repeated check.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0828-final-protected | 40 | 50 | yes |
| MST-0828-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| MVC pattern and setup | 8 |
| Controllers and actions | 8 |
| Views and Razor | 8 |
| Model binding and validation | 8 |
| Cross-cutting and structure | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0828-Q0001** (single-answer, Select ONE) In ASP.NET Core MVC, why does the model not depend on the view or controller?

- A. So the model can be built and tested independently of presentation **(key)**  
  _Rationale:_ Correct: one-way dependency is a key benefit of the separation.
- B. Because the model is written in a different language  
  _Rationale:_ All three are typically C#; the point is dependency direction.
- C. Because views cannot use models  
  _Rationale:_ Views do use models; the model just does not depend on them.
- D. Because controllers never use models  
  _Rationale:_ Controllers do use models.

**MST-0828-Q0002** (multiple-answer, Select TWO) Which TWO are benefits of a dedicated view model over using the business model in the view? (Select TWO.)

- A. The view can vary independently of the business/data model **(key)**  
  _Rationale:_ Correct: separation lets presentation change without touching business types.
- B. It limits what data is exposed to the view and to model binding **(key)**  
  _Rationale:_ Correct: a view model offers a security and shaping benefit.
- C. It removes the need for any model binding  
  _Rationale:_ Model binding is still used with view models.
- D. It makes validation impossible  
  _Rationale:_ View models are commonly where validation attributes live.

**MST-0828-Q0003** (single-answer, Select ONE) A posted form fails validation. What should the action typically do?

- A. Return the view with the invalid ModelState so errors show **(key)**  
  _Rationale:_ Correct: redisplaying the view with ModelState surfaces validation errors.
- B. Save the data anyway  
  _Rationale:_ Saving invalid data defeats validation.
- C. Throw an unhandled exception  
  _Rationale:_ Validation failure is expected flow, not an exception to crash on.
- D. Ignore the errors and redirect to success  
  _Rationale:_ Ignoring errors stores or confirms bad data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
