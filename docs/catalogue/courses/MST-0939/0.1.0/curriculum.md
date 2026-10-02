# Object-Oriented Design and Software Design Patterns

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0939` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **MASTEMY-DESIGN** - Mastemy-designed curriculum; no official syllabus |
| Evidence | **n/a-no-official-syllabus** - no external issuer to verify against |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — Object-Oriented Design and Software Design Patterns (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply core object-oriented principles to model a domain
2. Evaluate designs against SOLID and related principles
3. Select and apply appropriate creational, structural and behavioural patterns
4. Judge when a pattern adds value versus unnecessary complexity

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation, the quality of tools and live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, submitted code or peer review.

## Modules

### M01 Object-oriented foundations (25%, MASTEMY-DESIGN)

- Worked applications: (1) Refactor a god class into cohesive collaborating objects; (2) Replace an inheritance hierarchy with composition for a varying behaviour
- Common misconception addressed: Reaching for inheritance to reuse code when composition is the better fit
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Encapsulation and abstraction | 120 | 6 |
| M01L02 | Inheritance versus composition | 120 | 6 |
| M01L03 | Polymorphism and interfaces | 120 | 6 |
| M01L04 | Cohesion and coupling | 120 | 6 |

### M02 Design principles (SOLID and beyond) (25%, MASTEMY-DESIGN)

- Worked applications: (1) Spot a Liskov violation in a subclass and fix it; (2) Invert a dependency so a high-level module stops depending on a detail
- Common misconception addressed: Treating SOLID as rigid rules rather than tradeoff-driven guidelines
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Single responsibility and open-closed | 120 | 6 |
| M02L02 | Liskov substitution | 120 | 6 |
| M02L03 | Interface segregation and dependency inversion | 120 | 6 |
| M02L04 | DRY, YAGNI and law of Demeter | 120 | 6 |

### M03 Creational and structural patterns (25%, MASTEMY-DESIGN)

- Worked applications: (1) Choose between a factory and a builder for a complex object; (2) Wrap a third-party API with an adapter to protect your domain
- Common misconception addressed: Overusing the singleton pattern and creating hidden global state
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Factory and abstract factory | 120 | 6 |
| M03L02 | Builder and singleton tradeoffs | 120 | 6 |
| M03L03 | Adapter, facade and decorator | 120 | 6 |
| M03L04 | Composite and proxy | 120 | 6 |

### M04 Behavioural patterns and applied design (25%, MASTEMY-DESIGN)

- Worked applications: (1) Replace a conditional block with the strategy pattern; (2) Model a workflow with the state pattern and justify it over flags
- Common misconception addressed: Forcing a design pattern where a simpler solution would do
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Strategy and template method | 120 | 6 |
| M04L02 | Observer and publish-subscribe | 120 | 6 |
| M04L03 | Command and state | 120 | 6 |
| M04L04 | Choosing, combining and avoiding patterns | 120 | 6 |

## Integrative case

A payments module has grown rigid: every new provider forces edits across the codebase. Redesign it with the right principles and patterns so providers plug in cleanly, and defend each pattern choice against a simpler alternative.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0939-final-protected | 144 | 144 | yes |
| MST-0939-final-alternate | 144 | 144 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Object-oriented foundations | 36 |
| Design principles (SOLID and beyond) | 36 |
| Creational and structural patterns | 36 |
| Behavioural patterns and applied design | 36 |

Minimum reviewed item bank: 816 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0939-Q0001** (single-answer, Select ONE) A class must let callers choose among interchangeable sorting behaviours at runtime without conditionals. Which pattern fits best?

- A. Strategy **(key)**  
  _Rationale:_ Correct: the strategy pattern encapsulates interchangeable algorithms behind a common interface, selectable at runtime.
- B. Singleton  
  _Rationale:_ Singleton controls instance count, not interchangeable behaviour.
- C. Adapter  
  _Rationale:_ Adapter converts one interface to another; it does not select among algorithms.
- D. Builder  
  _Rationale:_ Builder constructs complex objects step by step; it does not swap behaviours.

**MST-0939-Q0002** (single-answer, Select ONE) A subclass overrides a method so that it throws on inputs the base class accepts. Which principle does this most directly violate?

- A. Liskov substitution principle **(key)**  
  _Rationale:_ Correct: subtypes must be usable wherever the base type is expected; narrowing accepted inputs breaks substitutability.
- B. Single responsibility principle  
  _Rationale:_ SRP concerns how many reasons a class has to change, not substitutability.
- C. Interface segregation principle  
  _Rationale:_ ISP concerns fat interfaces forcing unused dependencies.
- D. Open-closed principle  
  _Rationale:_ OCP concerns extension without modification, not substitution behaviour.

**MST-0939-Q0003** (multiple-answer, Select TWO) Which TWO are valid reasons to prefer composition over inheritance? (Select TWO)

- A. It avoids tight coupling to a base class's implementation **(key)**  
  _Rationale:_ Correct: composition depends on interfaces, not a concrete parent's internals.
- B. It lets behaviour be swapped or combined at runtime **(key)**  
  _Rationale:_ Correct: composed collaborators can be replaced without changing a class hierarchy.
- C. It always results in fewer lines of code  
  _Rationale:_ Composition can add delegation code; line count is not the reason.
- D. It guarantees better runtime performance  
  _Rationale:_ Performance is not inherently improved by composition.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
