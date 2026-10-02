# Django

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1553` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-D-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Django (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Django foundations
2. Models and the ORM
3. Migrations
4. Views and URLs
5. Templates
6. Forms
7. Admin and auth
8. Testing and deployment

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on building web applications with Django; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Django foundations (MASTEMY-DESIGN 13%)

- Worked applications: (1) Start a project and create an app; (2) Trace a request through URLconf to a view
- Common misconception addressed: Confusing a Django project with a single app
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Project vs app structure | 75 | 5 |
| M01L02 | The request lifecycle and settings | 75 | 5 |

### M02 Models and the ORM (MASTEMY-DESIGN 13%)

- Worked applications: (1) Model a one-to-many relationship; (2) Filter and order a QuerySet
- Common misconception addressed: Triggering N+1 queries by looping over related objects
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Defining models and fields | 75 | 5 |
| M02L02 | QuerySets and relationships | 75 | 5 |

### M03 Migrations (MASTEMY-DESIGN 12%)

- Worked applications: (1) Generate and apply a migration for a new field; (2) Write a data migration to backfill values
- Common misconception addressed: Editing the database manually instead of via migrations
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Creating and applying migrations | 75 | 5 |
| M03L02 | Schema changes and data migrations | 75 | 5 |

### M04 Views and URLs (MASTEMY-DESIGN 13%)

- Worked applications: (1) Build a ListView and DetailView; (2) Capture a slug in a URL pattern
- Common misconception addressed: Hardcoding URLs instead of using named URL reversing
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Function and class-based views | 75 | 5 |
| M04L02 | URL routing and parameters | 75 | 5 |

### M05 Templates (MASTEMY-DESIGN 12%)

- Worked applications: (1) Extend a base template with blocks; (2) Render a list with a for loop in a template
- Common misconception addressed: Putting business logic inside templates
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Template language and inheritance | 75 | 5 |
| M05L02 | Context and template tags | 75 | 5 |

### M06 Forms (MASTEMY-DESIGN 13%)

- Worked applications: (1) Create a ModelForm and handle POST; (2) Add custom field validation
- Common misconception addressed: Omitting the CSRF token from a POST form
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Django forms and ModelForm | 75 | 5 |
| M06L02 | Validation and CSRF | 75 | 5 |

### M07 Admin and auth (MASTEMY-DESIGN 12%)

- Worked applications: (1) Register a model with a custom admin; (2) Restrict a view to logged-in users
- Common misconception addressed: Exposing sensitive models in the admin without restriction
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | The admin site | 75 | 5 |
| M07L02 | Authentication and permissions | 75 | 5 |

### M08 Testing and deployment (MASTEMY-DESIGN 12%)

- Worked applications: (1) Write a test for a view's response; (2) Configure static files for production
- Common misconception addressed: Running with DEBUG=True in production
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Testing views and models | 75 | 5 |
| M08L02 | Static files and deployment settings | 75 | 5 |

## Integrative case

Build a Django blog: model posts and comments, wire URLs to views and templates, add a form with validation, expose the models in the admin, and write a test for one view.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1553-final-protected | 40 | 40 | yes |
| MST-1553-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Django foundations | 5 |
| Models and the ORM | 5 |
| Migrations | 5 |
| Views and URLs | 5 |
| Templates | 5 |
| Forms | 5 |
| Admin and auth | 5 |
| Testing and deployment | 5 |

Minimum reviewed item bank: 448 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1553-Q0001** (single-answer, Select ONE) What problem does using select_related/prefetch_related solve in the Django ORM?

- A. The N+1 query problem when accessing related objects in a loop **(key)**  
  _Rationale:_ Correct: they fetch related rows up front, avoiding one query per object.
- B. Applying database migrations  
  _Rationale:_ Migrations are a separate system.
- C. Rendering templates faster  
  _Rationale:_ They optimise queries, not template rendering.
- D. Validating form input  
  _Rationale:_ That is handled by forms, not these QuerySet methods.

**MST-1553-Q0002** (single-answer, Select ONE) Why should you use named URL reversing (e.g. reverse()/{% url %}) instead of hardcoded paths?

- A. URLs can change in one place without breaking links throughout the app **(key)**  
  _Rationale:_ Correct: reversing keeps links in sync with URLconf.
- B. It makes templates render without a context  
  _Rationale:_ Unrelated to reversing.
- C. It disables CSRF protection  
  _Rationale:_ Reversing has nothing to do with CSRF.
- D. It is required for the ORM to work  
  _Rationale:_ The ORM is independent of URL reversing.

**MST-1553-Q0003** (multiple-answer, Select ALL that apply) Which statements about Django migrations are correct? (Select TWO)

- A. makemigrations records model changes and migrate applies them to the database **(key)**  
  _Rationale:_ Correct: that is the two-step workflow.
- B. Data migrations can backfill or transform existing rows **(key)**  
  _Rationale:_ Correct: RunPython lets you migrate data, not just schema.
- C. Migrations should be edited directly in the database instead  
  _Rationale:_ False; bypassing migrations causes drift.
- D. Migrations eliminate the need for models  
  _Rationale:_ False; migrations are generated from model definitions.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
