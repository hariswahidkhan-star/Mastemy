# Unity Game Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1590` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-UGD-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Unity Game Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Unity foundations
2. Scripting with C#
3. Transforms and movement
4. Physics and collisions
5. Input
6. Prefabs and assets
7. UI and audio
8. Building and optimisation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on developing 2D/3D games with Unity; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Unity foundations (MASTEMY-DESIGN 13%)

- Worked applications: (1) Create a scene and add a GameObject; (2) Attach components to compose behaviour
- Common misconception addressed: Thinking a GameObject does anything without components
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The editor and project structure | 75 | 5 |
| M01L02 | GameObjects and components | 75 | 5 |

### M02 Scripting with C# (MASTEMY-DESIGN 13%)

- Worked applications: (1) Write a MonoBehaviour that moves an object; (2) Choose Update vs FixedUpdate correctly
- Common misconception addressed: Doing physics in Update instead of FixedUpdate
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | MonoBehaviour lifecycle | 75 | 5 |
| M02L02 | Update, FixedUpdate and Start | 75 | 5 |

### M03 Transforms and movement (MASTEMY-DESIGN 12%)

- Worked applications: (1) Translate and rotate a transform; (2) Move relative to local vs world space
- Common misconception addressed: Confusing local and world space transforms
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Position, rotation and scale | 75 | 5 |
| M03L02 | Moving and rotating objects | 75 | 5 |

### M04 Physics and collisions (MASTEMY-DESIGN 13%)

- Worked applications: (1) Add a Rigidbody and detect a collision; (2) Use a trigger for a pickup
- Common misconception addressed: Expecting collisions without a collider or rigidbody
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Rigidbodies and colliders | 75 | 5 |
| M04L02 | Triggers and collision events | 75 | 5 |

### M05 Input (MASTEMY-DESIGN 12%)

- Worked applications: (1) Read movement input each frame; (2) Map a jump action to a key
- Common misconception addressed: Reading input in FixedUpdate and missing presses
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Reading player input | 75 | 5 |
| M05L02 | Mapping controls | 75 | 5 |

### M06 Prefabs and assets (MASTEMY-DESIGN 13%)

- Worked applications: (1) Make a reusable prefab; (2) Spawn enemies by instantiating a prefab
- Common misconception addressed: Editing instances instead of the prefab source
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Creating and using prefabs | 75 | 5 |
| M06L02 | Instantiating at runtime | 75 | 5 |

### M07 UI and audio (MASTEMY-DESIGN 12%)

- Worked applications: (1) Show a score with a UI text element; (2) Play a sound on an event
- Common misconception addressed: Putting gameplay logic inside UI callbacks
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Canvas and UI elements | 75 | 5 |
| M07L02 | Playing sounds | 75 | 5 |

### M08 Building and optimisation (MASTEMY-DESIGN 12%)

- Worked applications: (1) Build the game for a target platform; (2) Profile and reduce draw calls
- Common misconception addressed: Shipping without profiling obvious performance issues
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Building for a platform | 75 | 5 |
| M08L02 | Basic performance profiling | 75 | 5 |

## Integrative case

Build a small Unity game: set up a scene with GameObjects and components, script movement and collisions, drive gameplay with physics and input, add simple UI and audio, and organise assets with prefabs.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1590-final-protected | 40 | 40 | yes |
| MST-1590-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Unity foundations | 5 |
| Scripting with C# | 5 |
| Transforms and movement | 5 |
| Physics and collisions | 5 |
| Input | 5 |
| Prefabs and assets | 5 |
| UI and audio | 5 |
| Building and optimisation | 5 |

Minimum reviewed item bank: 448 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1590-Q0001** (single-answer, Select ONE) Why should physics-related movement use FixedUpdate rather than Update in Unity?

- A. FixedUpdate runs on the physics timestep, giving consistent, frame-rate-independent physics **(key)**  
  _Rationale:_ Correct: physics should be driven on the fixed timestep.
- B. Update never runs during gameplay  
  _Rationale:_ Update runs every frame.
- C. FixedUpdate renders the frame  
  _Rationale:_ Rendering is not FixedUpdate's job.
- D. Update cannot access components  
  _Rationale:_ Update can access components fine.

**MST-1590-Q0002** (single-answer, Select ONE) What is required for two Unity objects to generate a physics collision?

- A. Appropriate colliders, with at least one having a Rigidbody **(key)**  
  _Rationale:_ Correct: colliders define shape and a Rigidbody enables physics interaction.
- B. Only a script with no components  
  _Rationale:_ Components are required for physics.
- C. A UI Canvas on each object  
  _Rationale:_ Canvas is for UI, not collisions.
- D. Identical materials  
  _Rationale:_ Materials do not drive collisions.

**MST-1590-Q0003** (multiple-answer, Select ALL that apply) Which statements about Unity prefabs are correct? (Select TWO)

- A. A prefab is a reusable template you can instantiate many times **(key)**  
  _Rationale:_ Correct: prefabs promote reuse and consistency.
- B. Editing the prefab asset updates its instances **(key)**  
  _Rationale:_ Correct: changes to the source propagate to instances.
- C. Prefabs cannot be instantiated at runtime  
  _Rationale:_ False; Instantiate spawns prefabs at runtime.
- D. Each prefab can exist only once in a scene  
  _Rationale:_ False; you can place many instances.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
