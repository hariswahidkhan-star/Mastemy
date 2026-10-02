# Domain-Driven Design and Business Capability Modeling

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1003` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Domain-Driven Design and Business Capability Modeling (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. DDD foundations and ubiquitous language
2. Strategic design and bounded contexts
3. Context mapping and integration patterns
4. Tactical patterns: entities, value objects, aggregates
5. Domain events and application services
6. Aligning bounded contexts with business capabilities

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 DDD foundations and ubiquitous language (MASTEMY-DESIGN 16%)

- Worked applications: (1) Capture domain terms into a shared glossary; (2) Rewrite a feature in the domain's own language
- Common misconception addressed: Letting technical jargon replace the business's own terms
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The domain, the model and why DDD | 80 | 6 |
| M01L02 | Building a ubiquitous language with domain experts | 80 | 6 |

### M02 Strategic design and bounded contexts (MASTEMY-DESIGN 17%)

- Worked applications: (1) Split an ambiguous model into two bounded contexts; (2) Classify subdomains to focus effort on the core
- Common misconception addressed: Trying to build one universal model for the whole business
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Bounded contexts and model boundaries | 80 | 6 |
| M02L02 | Core, supporting and generic subdomains | 80 | 6 |

### M03 Context mapping and integration patterns (MASTEMY-DESIGN 16%)

- Worked applications: (1) Draw a context map between two teams; (2) Introduce an anti-corruption layer against a legacy system
- Common misconception addressed: Letting an upstream model's language leak into a downstream context
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Context maps: partnership, customer-supplier, conformist | 80 | 6 |
| M03L02 | Anti-corruption layers and shared kernels | 80 | 6 |

### M04 Tactical patterns: entities, value objects, aggregates (MASTEMY-DESIGN 16%)

- Worked applications: (1) Model money as a value object; (2) Define an aggregate boundary that protects an invariant
- Common misconception addressed: Making every object an entity with an identity it does not need
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Entities vs value objects | 80 | 6 |
| M04L02 | Aggregates, roots and invariants | 80 | 6 |

### M05 Domain events and application services (MASTEMY-DESIGN 17%)

- Worked applications: (1) Raise a domain event when an invariant-changing action occurs; (2) Keep business rules in the domain rather than the service layer
- Common misconception addressed: Putting domain logic in application services, creating an anemic model
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Domain events and what they represent | 80 | 6 |
| M05L02 | Application services, repositories and the domain layer | 80 | 6 |

### M06 Aligning bounded contexts with business capabilities (MASTEMY-DESIGN 18%)

- Worked applications: (1) Map a capability to the context that owns it; (2) Align team ownership with context boundaries
- Common misconception addressed: Drawing service boundaries by technical layer instead of business capability
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Business capability modeling | 80 | 6 |
| M06L02 | Mapping capabilities to contexts and team boundaries | 80 | 6 |

## Integrative case

Model an e-commerce business with DDD: build a ubiquitous language, identify bounded contexts for ordering, fulfilment and billing, draw a context map with an anti-corruption layer against a legacy inventory system, define aggregates that protect ordering invariants, and align the contexts with business capabilities and team ownership.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1003-final-protected | 30 | 30 | yes |
| MST-1003-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| DDD foundations and ubiquitous language | 5 |
| Strategic design and bounded contexts | 5 |
| Context mapping and integration patterns | 5 |
| Tactical patterns: entities, value objects, aggregates | 5 |
| Domain events and application services | 5 |
| Aligning bounded contexts with business capabilities | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1003-Q0001** (single-answer, Select ONE) What is a bounded context in Domain-Driven Design?

- A. An explicit boundary within which a particular domain model and its language apply consistently **(key)**  
  _Rationale:_ Correct: a bounded context defines where a model and its terms hold a single, consistent meaning.
- B. A database table that stores the whole domain  
  _Rationale:_ A bounded context is a modeling boundary, not a table.
- C. A single class that represents the business  
  _Rationale:_ It is a boundary around a model, not one class.
- D. The user interface layer of an application  
  _Rationale:_ It is about the model boundary, not the UI.

**MST-1003-Q0002** (multiple-answer, Select ALL that apply) Which statements distinguish entities from value objects? (Select TWO)

- A. An entity has a distinct identity that persists over time **(key)**  
  _Rationale:_ Correct: identity is what defines an entity across state changes.
- B. A value object is defined only by its attributes and is interchangeable when equal **(key)**  
  _Rationale:_ Correct: value objects have no identity and are compared by value.
- C. Value objects always have a unique database ID  
  _Rationale:_ That describes entities, not value objects.
- D. Entities are always immutable and have no identity  
  _Rationale:_ Entities have identity and may change state over time.

**MST-1003-Q0003** (single-answer, Select ONE) What problem does an anti-corruption layer solve?

- A. It stops an external or legacy model's concepts from leaking into and corrupting your context's model **(key)**  
  _Rationale:_ Correct: the ACL translates between models so the downstream context stays clean.
- B. It encrypts data between services  
  _Rationale:_ It is a modeling translation layer, not encryption.
- C. It removes the need for bounded contexts  
  _Rationale:_ It supports contexts; it does not replace them.
- D. It merges two models into one shared model  
  _Rationale:_ That is the opposite of what an ACL protects against.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
