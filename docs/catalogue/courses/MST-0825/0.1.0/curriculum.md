# .NET Application Architecture and Dependency Injection

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0825` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Provider facts checked on Microsoft Learn 2026-10-02 (Dependency injection in ASP.NET Core: service lifetimes (transient/scoped/singleton), constructor injection, keyed services, scope validation). Other lessons are Mastemy design; re-check provider docs for the product versions chosen at production. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-ASPNETCORE-DI (https://learn.microsoft.com/aspnet/core/fundamentals/dependency-injection; https://learn.microsoft.com/dotnet/core/extensions/dependency-injection; accessed 2026-10-02) |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — .NET Application Architecture and Dependency Injection (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain dependency injection and the built-in .NET DI container
2. Choose correct service lifetimes and avoid captive dependencies
3. Structure an application into layers with clear boundaries
4. Apply configuration and options patterns
5. Keep the composition root and cross-cutting concerns clean

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 DI fundamentals (MASTEMY-DESIGN 20%)

- Worked applications: (1) Register and resolve a service via constructor injection; (2) Replace a concrete dependency with an interface for testing
- Common misconception addressed: Using a service locator instead of constructor injection
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why DI, and the built-in container | 120 | 7 |
| M01L02 | Constructor injection and registration | 120 | 7 |

### M02 Service lifetimes (MASTEMY-DESIGN 20%)

- Worked applications: (1) Pick transient/scoped/singleton for three services; (2) Detect a scoped service captured by a singleton
- Common misconception addressed: Injecting a scoped service into a singleton
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Transient, scoped and singleton | 120 | 7 |
| M02L02 | Captive dependencies and scope validation | 120 | 7 |

### M03 Layering (MASTEMY-DESIGN 20%)

- Worked applications: (1) Separate domain, application and infrastructure concerns; (2) Keep the domain free of framework dependencies
- Common misconception addressed: Letting the database type leak into the domain
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Layered/clean architecture boundaries | 120 | 7 |
| M03L02 | Dependency direction and abstractions | 120 | 7 |

### M04 Configuration and options (MASTEMY-DESIGN 20%)

- Worked applications: (1) Bind a strongly typed options object from configuration; (2) Keep a secret out of appsettings and in user secrets
- Common misconception addressed: Hard-coding configuration values in code
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Configuration providers and binding | 120 | 7 |
| M04L02 | The options pattern and secrets | 120 | 7 |

### M05 Composition and cross-cutting (MASTEMY-DESIGN 20%)

- Worked applications: (1) Keep registration in one composition root; (2) Add logging as a cross-cutting concern via DI
- Common misconception addressed: Scattering new-ing of dependencies across the codebase
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | The composition root | 120 | 7 |
| M05L02 | Cross-cutting concerns: logging and middleware | 120 | 7 |

## Integrative case

Restructure a tangled service into layers: introduce interfaces and constructor injection, choose correct lifetimes to remove a captive-dependency bug, bind options from configuration with secrets in user secrets, and centralise registration in one composition root.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0825-final-protected | 40 | 50 | yes |
| MST-0825-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| DI fundamentals | 8 |
| Service lifetimes | 8 |
| Layering | 8 |
| Configuration and options | 8 |
| Composition and cross-cutting | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0825-Q0001** (single-answer, Select ONE) A singleton service takes a scoped DbContext in its constructor. Why is this a problem?

- A. The scoped DbContext is captured for the app lifetime, outliving its intended scope **(key)**  
  _Rationale:_ Correct: a singleton capturing a scoped service is a captive dependency and scope validation flags it.
- B. Singletons cannot have constructors  
  _Rationale:_ Singletons can have constructors.
- C. DbContext cannot be injected at all  
  _Rationale:_ DbContext can be injected with the right lifetime.
- D. Scoped services are slower than singletons  
  _Rationale:_ Performance is not the issue here.

**MST-0825-Q0002** (multiple-answer, Select TWO) Which TWO are benefits of constructor injection over a service locator? (Select TWO.)

- A. Dependencies are explicit in the constructor signature **(key)**  
  _Rationale:_ Correct: explicit dependencies follow the Explicit Dependencies Principle.
- B. The container can validate and supply dependencies **(key)**  
  _Rationale:_ Correct: the DI container resolves declared constructor dependencies.
- C. It hides what a class needs  
  _Rationale:_ A service locator hides dependencies; constructor injection reveals them.
- D. It removes the need for interfaces entirely  
  _Rationale:_ Interfaces remain useful for abstraction and testing.

**MST-0825-Q0003** (single-answer, Select ONE) Where should a database connection string that is a secret live for a production ASP.NET Core app?

- A. In a secret store / environment configuration, not committed in appsettings.json **(key)**  
  _Rationale:_ Correct: secrets belong in a secret store or protected configuration, kept out of source.
- B. Hard-coded in the C# source  
  _Rationale:_ Hard-coding secrets exposes them in source control.
- C. In a public README  
  _Rationale:_ A README is public and inappropriate for secrets.
- D. In client-side JavaScript  
  _Rationale:_ Client code is fully visible to users.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
