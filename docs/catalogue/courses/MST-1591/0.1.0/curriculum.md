# Unreal Engine Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1591` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-UEF-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Unreal Engine Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Unreal foundations
2. Blueprints
3. Gameplay framework
4. Input
5. Movement and physics
6. Materials and rendering
7. C++ and Blueprints together
8. Packaging

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on developing games with Unreal Engine; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Unreal foundations (MASTEMY-DESIGN 13%)

- Worked applications: (1) Create a level and place actors; (2) Compose an actor from components
- Common misconception addressed: Confusing an actor with a Blueprint class
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The editor and project layout | 75 | 5 |
| M01L02 | Actors and components | 75 | 5 |

### M02 Blueprints (MASTEMY-DESIGN 13%)

- Worked applications: (1) Wire an event to an action in Blueprint; (2) Create a variable and a function
- Common misconception addressed: Building giant unreadable Blueprint spaghetti
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Visual scripting basics | 75 | 5 |
| M02L02 | Events, variables and functions | 75 | 5 |

### M03 Gameplay framework (MASTEMY-DESIGN 12%)

- Worked applications: (1) Set up a GameMode with a default pawn; (2) Possess a pawn with a controller
- Common misconception addressed: Putting player logic in the wrong framework class
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | GameMode, Pawn and Controller | 75 | 5 |
| M03L02 | Possession and input routing | 75 | 5 |

### M04 Input (MASTEMY-DESIGN 13%)

- Worked applications: (1) Map an input action to movement; (2) Bind a jump action
- Common misconception addressed: Hardcoding keys instead of using input mappings
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Input mapping | 75 | 5 |
| M04L02 | Handling actions and axes | 75 | 5 |

### M05 Movement and physics (MASTEMY-DESIGN 12%)

- Worked applications: (1) Move a character pawn; (2) Set up collision responses
- Common misconception addressed: Ignoring collision channels and getting unexpected overlaps
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Character movement | 75 | 5 |
| M05L02 | Collision and physics | 75 | 5 |

### M06 Materials and rendering (MASTEMY-DESIGN 13%)

- Worked applications: (1) Create a simple material; (2) Place and tune a light
- Common misconception addressed: Shipping with unbuilt lighting
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Materials and the material editor | 75 | 5 |
| M06L02 | Lighting basics | 75 | 5 |

### M07 C++ and Blueprints together (MASTEMY-DESIGN 12%)

- Worked applications: (1) Decide C++ vs Blueprint for a feature; (2) Expose a C++ property to Blueprint
- Common misconception addressed: Doing everything in C++ or everything in Blueprint dogmatically
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | When to use C++ vs Blueprint | 75 | 5 |
| M07L02 | Exposing C++ to Blueprint | 75 | 5 |

### M08 Packaging (MASTEMY-DESIGN 12%)

- Worked applications: (1) Package the project for a platform; (2) Adjust packaging settings
- Common misconception addressed: Packaging without testing a cooked build
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Building and packaging | 75 | 5 |
| M08L02 | Platform settings | 75 | 5 |

## Integrative case

Build a small Unreal level: place actors, create a player pawn with input, script interactions in Blueprints, use the gameplay framework (GameMode, Pawn, Controller), and package the project for a platform.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1591-final-protected | 40 | 40 | yes |
| MST-1591-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Unreal foundations | 5 |
| Blueprints | 5 |
| Gameplay framework | 5 |
| Input | 5 |
| Movement and physics | 5 |
| Materials and rendering | 5 |
| C++ and Blueprints together | 5 |
| Packaging | 5 |

Minimum reviewed item bank: 448 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1591-Q0001** (single-answer, Select ONE) In Unreal's gameplay framework, what is the role of the GameMode?

- A. It defines the rules of play, including the default pawn, controller and game state **(key)**  
  _Rationale:_ Correct: GameMode sets up the framework classes and rules.
- B. It stores the player's input key bindings only  
  _Rationale:_ Input mappings are configured separately.
- C. It renders all materials  
  _Rationale:_ Rendering is not GameMode's responsibility.
- D. It is the physics engine  
  _Rationale:_ GameMode is not the physics system.

**MST-1591-Q0002** (single-answer, Select ONE) When is C++ generally preferred over Blueprint in Unreal?

- A. For performance-critical or complex core systems, while Blueprint suits rapid iteration and designer-facing logic **(key)**  
  _Rationale:_ Correct: a common split is core in C++, iteration in Blueprint.
- B. C++ is always required; Blueprint cannot ship games  
  _Rationale:_ False; many games ship heavy Blueprint use.
- C. Blueprint is always faster than C++  
  _Rationale:_ Generally C++ is faster for hot paths.
- D. They cannot be used in the same project  
  _Rationale:_ They interoperate within a project.

**MST-1591-Q0003** (multiple-answer, Select ALL that apply) Which statements about Unreal Blueprints are correct? (Select TWO)

- A. Blueprints are a visual scripting system driven by events and nodes **(key)**  
  _Rationale:_ Correct: logic is built from event-driven node graphs.
- B. C++ properties and functions can be exposed to Blueprints **(key)**  
  _Rationale:_ Correct: UPROPERTY/UFUNCTION macros expose them.
- C. Blueprints cannot define variables or functions  
  _Rationale:_ False; they support both.
- D. A single massive Blueprint graph is the recommended structure  
  _Rationale:_ False; large tangled graphs are discouraged.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
