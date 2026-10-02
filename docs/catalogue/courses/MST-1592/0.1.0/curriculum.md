# Godot Game Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1592` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-GGD-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Godot Game Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Godot foundations
2. GDScript
3. Scenes and instancing
4. Signals
5. Input
6. Physics and movement
7. UI and resources
8. Exporting

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on developing games with the Godot engine; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Godot foundations (MASTEMY-DESIGN 13%)

- Worked applications: (1) Build a scene from nodes; (2) Explain the scene tree hierarchy
- Common misconception addressed: Confusing a node with a scene instance
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The editor and scene system | 75 | 5 |
| M01L02 | Nodes and the scene tree | 75 | 5 |

### M02 GDScript (MASTEMY-DESIGN 13%)

- Worked applications: (1) Write a script that moves a node; (2) Access a child node from a script
- Common misconception addressed: Expecting a node to behave without a script or built-in behaviour
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | GDScript basics | 75 | 5 |
| M02L02 | Attaching scripts to nodes | 75 | 5 |

### M03 Scenes and instancing (MASTEMY-DESIGN 12%)

- Worked applications: (1) Turn a group of nodes into a reusable scene; (2) Instance a scene to spawn an enemy
- Common misconception addressed: Duplicating nodes instead of instancing a scene
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Scenes as reusable units | 75 | 5 |
| M03L02 | Instancing scenes | 75 | 5 |

### M04 Signals (MASTEMY-DESIGN 13%)

- Worked applications: (1) Connect a button's pressed signal; (2) Emit a custom signal on an event
- Common misconception addressed: Tightly coupling nodes instead of using signals
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Emitting and connecting signals | 75 | 5 |
| M04L02 | Decoupling with signals | 75 | 5 |

### M05 Input (MASTEMY-DESIGN 12%)

- Worked applications: (1) Read a movement action; (2) Define an input action in the map
- Common misconception addressed: Hardcoding keycodes instead of input actions
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Input handling and actions | 75 | 5 |
| M05L02 | Input maps | 75 | 5 |

### M06 Physics and movement (MASTEMY-DESIGN 13%)

- Worked applications: (1) Move a character with move_and_slide; (2) Detect an overlap with an Area node
- Common misconception addressed: Moving the transform directly and breaking collision
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | CharacterBody and move_and_slide | 75 | 5 |
| M06L02 | Collisions and areas | 75 | 5 |

### M07 UI and resources (MASTEMY-DESIGN 12%)

- Worked applications: (1) Build a HUD with Control nodes; (2) Export a variable to tune in the editor
- Common misconception addressed: Hardcoding values that should be exported
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Control nodes for UI | 75 | 5 |
| M07L02 | Resources and exported variables | 75 | 5 |

### M08 Exporting (MASTEMY-DESIGN 12%)

- Worked applications: (1) Configure an export preset; (2) Export the game for a platform
- Common misconception addressed: Exporting without installing export templates
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Export templates and presets | 75 | 5 |
| M08L02 | Exporting to a platform | 75 | 5 |

## Integrative case

Build a small Godot game: compose a scene from nodes, script behaviour in GDScript, use signals for decoupled communication, handle input and physics, and instance scenes to spawn objects.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1592-final-protected | 40 | 40 | yes |
| MST-1592-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Godot foundations | 5 |
| GDScript | 5 |
| Scenes and instancing | 5 |
| Signals | 5 |
| Input | 5 |
| Physics and movement | 5 |
| UI and resources | 5 |
| Exporting | 5 |

Minimum reviewed item bank: 448 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1592-Q0001** (single-answer, Select ONE) Why are signals the idiomatic way for Godot nodes to communicate about events?

- A. They decouple the emitter from the receiver, so nodes do not need direct references to each other **(key)**  
  _Rationale:_ Correct: signals enable loose coupling, like an observer pattern.
- B. They make the game render faster  
  _Rationale:_ Signals are about structure, not rendering speed.
- C. They replace the need for the scene tree  
  _Rationale:_ The scene tree still organises nodes.
- D. They are the only way to move a node  
  _Rationale:_ Movement is done via code/physics, not signals.

**MST-1592-Q0002** (single-answer, Select ONE) What is the benefit of turning a group of nodes into a reusable scene and instancing it?

- A. You can spawn many copies and update them all by editing the source scene **(key)**  
  _Rationale:_ Correct: instancing promotes reuse and consistency.
- B. It permanently merges the nodes into one node  
  _Rationale:_ Instancing keeps them as reusable units.
- C. It disables scripts on those nodes  
  _Rationale:_ Scripts remain attached.
- D. It prevents the scene from being edited  
  _Rationale:_ The source scene stays editable.

**MST-1592-Q0003** (multiple-answer, Select ALL that apply) Which statements about Godot's node and scene system are correct? (Select TWO)

- A. A scene is a tree of nodes that can itself be instanced inside other scenes **(key)**  
  _Rationale:_ Correct: scenes compose hierarchically.
- B. Scripts are attached to nodes to give them custom behaviour **(key)**  
  _Rationale:_ Correct: GDScript (or other) extends node behaviour.
- C. Nodes cannot be arranged in a hierarchy  
  _Rationale:_ False; the scene tree is hierarchical.
- D. Every game must be a single node with no children  
  _Rationale:_ False; games are composed of many nodes/scenes.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
