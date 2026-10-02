# Unity Certified User: Programmer Knowledge Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1863` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Unity (no affiliation or endorsement) |
| Exam code | DESIGN ASSUMPTION - not confirmed from an official source (kept out of official_exam_code) |
| Version basis | DESIGN ASSUMPTION - not confirmed from an official source |
| Evidence | **unverified-needs-official-check** - official source could not be fetched (network egress blocked 2026-10-02) |
| Legacy IDs | MST-CRE-UNITY-UCU-001 |
| Planned time | T = 1350 min; instruction I = 1080 min (80%); assessment A = 270 min (20%) |
| Assessment split | lesson checks 45 / module checks 105 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the Unity Editor layout, GameObjects, components and the scene/prefab workflow
2. Write C# scripts that use MonoBehaviour lifecycle methods, variables and control flow
3. Implement player input, movement, physics interactions and collision handling
4. Manage game state, UI, prefabs and simple debugging within a Unity project

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

> **Module structure, titles and all weightings below are DESIGN ASSUMPTIONS.** The official exam outline could not be fetched (network egress blocked on 2026-10-02) and must be confirmed against the issuer's official source before SME review and publication.

## Modules

### M01 Unity Editor, GameObjects and the C# Scripting Basics (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Convert a configured GameObject into a reusable prefab and instantiate it; (2) Trace which MonoBehaviour method (Awake/Start/Update) runs when
- Common misconception addressed: Thinking a script runs on its own rather than only when attached to a GameObject as a component
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The Unity Editor, scenes, GameObjects and components | 120 | 6 |
| M01L02 | Prefabs, the Inspector and the asset workflow | 120 | 6 |
| M01L03 | C# fundamentals: variables, data types and MonoBehaviour | 120 | 6 |

### M02 Scripting Logic, Input and Movement (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Move a player with WASD/arrow input scaled by Time.deltaTime; (2) Use GetComponent to read and change another component's value
- Common misconception addressed: Multiplying movement by frame count instead of Time.deltaTime, making speed depend on frame rate
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Control flow, methods and referencing other components | 120 | 6 |
| M02L02 | Reading player input and moving a Transform | 120 | 6 |
| M02L03 | Time.deltaTime, frame-rate independence and vectors | 120 | 6 |

### M03 Physics, Collisions, UI and Debugging (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Use OnTriggerEnter to destroy a coin and increment a score field; (2) Read a NullReferenceException in the Console and locate the unassigned reference
- Common misconception addressed: Expecting OnCollisionEnter to fire when a collider is marked as Is Trigger
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Rigidbody, colliders and triggers | 120 | 6 |
| M03L02 | Detecting collisions and trigger events in script | 120 | 6 |
| M03L03 | UI updates, game state and reading the Console to debug | 120 | 6 |

## Integrative case

A junior programmer is handed a half-built 2D collect-the-coins prototype in Unity: wire up player input and movement, make coins disappear on collision and update a score UI, fix a null-reference error, then explain the component/prefab choices made.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official source was not fetched; official question count, duration and domain weightings must be confirmed on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1863-practice-form-A | 45 | 45 | yes |
| MST-1863-practice-form-B | 45 | 45 | no (optional practice) |
| MST-1863-practice-form-C | 45 | 45 | no (optional practice) |
| MST-1863-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Unity Editor, GameObjects and the C# Scripting Basics | 15 |
| Scripting Logic, Input and Movement | 15 |
| Physics, Collisions, UI and Debugging | 15 |

Minimum reviewed item bank: 498 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1863-Q0001** (single-answer, Select ONE) In Unity, what is the correct relationship between a GameObject and a component such as a script?

- A. A component (including a script) is attached to a GameObject to give it behaviour or data **(key)**  
  _Rationale:_ Correct: GameObjects are containers; components attached to them provide behaviour and data.
- B. A GameObject is attached to a component  
  _Rationale:_ This reverses the relationship; components are added to GameObjects, not the other way round.
- C. A script runs independently of any GameObject in the scene  
  _Rationale:_ A MonoBehaviour script only runs when attached to an active GameObject.
- D. Components can exist in a scene without any GameObject  
  _Rationale:_ Components cannot exist on their own; they must belong to a GameObject.

**MST-1863-Q0002** (single-answer, Select ONE) Why is a movement value commonly multiplied by Time.deltaTime in Update()?

- A. To make movement speed independent of the frame rate **(key)**  
  _Rationale:_ Correct: Time.deltaTime is the time since the last frame, so multiplying by it gives consistent speed regardless of frame rate.
- B. To make the object move exactly one unit per frame  
  _Rationale:_ That would make speed depend on frame rate, which is what deltaTime avoids.
- C. To convert the value from radians to degrees  
  _Rationale:_ Time.deltaTime has nothing to do with angle unit conversion.
- D. To pause the game when the frame rate drops  
  _Rationale:_ deltaTime scales motion; it does not pause anything.

**MST-1863-Q0003** (multiple-answer, Select TWO) Select TWO conditions that must be true for OnTriggerEnter to be called between two objects in Unity.

- A. At least one of the two colliders has 'Is Trigger' enabled **(key)**  
  _Rationale:_ Correct: trigger callbacks require at least one collider marked Is Trigger.
- B. At least one of the objects has a Rigidbody component **(key)**  
  _Rationale:_ Correct: trigger/collision messages require a Rigidbody on at least one of the participating objects.
- C. Both objects must have the same tag  
  _Rationale:_ Tags are optional filters in code; they are not required for the callback to fire.
- D. Both objects must be static  
  _Rationale:_ Static objects without a Rigidbody will not generate trigger callbacks.
- E. Both colliders must have 'Is Trigger' disabled  
  _Rationale:_ That describes a physical collision (OnCollisionEnter), not a trigger.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
