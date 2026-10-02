# Visio for Process Diagrams

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1440` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Visio documentation read via the Microsoft Learn MCP on 2026-10-02. UI labels and template names can vary by Visio version and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/office/client-developer/visio/how-to-manipulate-the-visio-file-format-programmatically |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-VISIO |
| Legacy IDs | none |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — Visio for Process Diagrams (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Navigate Visio templates, stencils, and shapes
2. Build process diagrams with shapes and dynamic connectors
3. Create advanced diagrams and share Visio files

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Visio basics and templates (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Create a drawing from the Basic Flowchart template; (2) Drag a Start/End shape onto the canvas
- Common misconception addressed: Starting from a blank page instead of a fitting template
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Visio interface, templates, and stencils | 84 | 4 |
| M01L02 | Shapes and the drawing canvas | 84 | 4 |

### M02 Building process diagrams (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Connect a Process shape to a Start/End shape with a connector; (2) Add descriptive text to each shape
- Common misconception addressed: Drawing lines manually instead of using dynamic connectors that stay attached
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Flowchart shapes and connectors | 84 | 4 |
| M02L02 | Layout and AutoConnect | 84 | 4 |

### M03 Advanced diagrams and sharing (MASTEMY-DESIGN 30%, design weight)

- Worked applications: (1) Build a workflow diagram using stage shapes; (2) Save a diagram as .vsdx and share it
- Common misconception addressed: Mixing shapes from incompatible stencils in a workflow diagram
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Containers, stages, and workflow stencils | 72 | 4 |
| M03L02 | Saving, exporting, and sharing | 72 | 4 |

## Integrative case

A business analyst builds a basic flowchart from a template, connects shapes with dynamic connectors, labels each step, and saves the diagram as a .vsdx file to share.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1440-final-protected | 24 | 32 | yes |
| MST-1440-final-alternate | 24 | 32 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Visio basics and templates | 8 |
| Building process diagrams | 8 |
| Advanced diagrams and sharing | 8 |

Minimum reviewed item bank: 180 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1440-Q0001** (single-answer, Select ONE) Which template is a good starting point for a simple process diagram in Visio?

- A. Basic Flowchart **(key)**  
  _Rationale:_ Correct: the Basic Flowchart template provides flowchart shapes and connectors.
- B. Floor Plan  
  _Rationale:_ Floor Plan is for building layouts, not process flows.
- C. Network Rack  
  _Rationale:_ Network Rack is for equipment diagrams, not process flows.
- D. No template at all  
  _Rationale:_ Starting from a fitting template is recommended over a blank page.

**MST-1440-Q0002** (multiple-answer, Select TWO) Which TWO are good practices when building a Visio flowchart? (Select TWO.)

- A. Use dynamic connectors that stay attached to shapes **(key)**  
  _Rationale:_ Correct: dynamic connectors keep the diagram connected when shapes move.
- B. Use shapes from the appropriate stencil for the diagram type **(key)**  
  _Rationale:_ Correct: using the correct stencil keeps diagrams valid and consistent.
- C. Mix shapes from incompatible workflow templates  
  _Rationale:_ Incorrect: mixing incompatible stencils breaks workflow diagrams.
- D. Avoid labeling shapes to keep diagrams clean  
  _Rationale:_ Incorrect: labels communicate each step's purpose.

**MST-1440-Q0003** (single-answer, Select ONE) What file extension does a standard Visio drawing use?

- A. .vsdx **(key)**  
  _Rationale:_ Correct: .vsdx is the standard Visio drawing format.
- B. .docx  
  _Rationale:_ .docx is a Word document format.
- C. .pptx  
  _Rationale:_ .pptx is a PowerPoint format.
- D. .accdb  
  _Rationale:_ .accdb is an Access database format.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
