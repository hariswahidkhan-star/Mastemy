# Claude Prompt Design and Structured Task Instructions

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0512` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Guidance intended to reflect Anthropic's published prompt-engineering documentation; docs.anthropic.com was blocked by the egress proxy this session, so no official page was read. Specific feature names are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-PROMPTING |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude Prompt Design and Structured Task Instructions (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Structure instructions with role, task, context, constraints and output format
2. Use examples and few-shot patterns to steer Claude reliably
3. Decompose a complex task into ordered, checkable steps
4. Design prompts that are testable and repeatable, not one-off
5. Diagnose and repair a prompt that produces the wrong shape of answer

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot grade an actual prompt's output quality; prompt drafting is taught through worked before/after examples.

## Modules

### M01 Anatomy of a structured instruction (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Rewrite a one-line ask as a role/task/context/constraint/format prompt; (2) Specify an exact output format for a downstream system
- Common misconception addressed: Describing the topic but never stating the output format you need
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Role, task, context, constraints, format | 72 | 5 |
| M01L02 | Specifying output shape and acceptance criteria | 72 | 5 |

### M02 Examples and few-shot steering (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Add two examples to fix an inconsistent label set; (2) Pick examples that cover the edge cases, not just the easy ones
- Common misconception addressed: Giving one example and expecting the pattern to generalise
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | When examples help and how many to give | 96 | 5 |
| M02L02 | Choosing representative and edge-case examples | 96 | 5 |

### M03 Decomposition and ordered steps (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Break a report-writing task into retrieve, outline, draft, check steps; (2) Insert a self-check step before the final answer
- Common misconception addressed: Asking for the final answer in one leap on a multi-stage task
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Decomposing a task into ordered steps | 80 | 5 |
| M03L02 | Adding reasoning and self-check steps | 80 | 5 |
| M03L03 | Keeping steps verifiable by a human | 80 | 5 |

### M04 Repeatable, testable prompts (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Turn a working chat prompt into a reusable template with slots; (2) Write three test inputs and expected shapes for a prompt
- Common misconception addressed: Treating a lucky one-off result as a reliable prompt
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | From one-off prompt to reusable template | 96 | 5 |
| M04L02 | Testing a prompt against varied inputs | 96 | 5 |

### M05 Diagnosing and repairing prompts (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Diagnose why a prompt returns prose instead of a table; (2) Repair a prompt that ignores a stated constraint
- Common misconception addressed: Adding more instructions instead of removing the conflicting one
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Reading a wrong answer to find the prompt fault | 96 | 5 |
| M05L02 | Targeted repair and regression-checking the fix | 96 | 5 |

## Integrative case

An operations analyst builds a reusable prompt that turns raw support tickets into a structured triage table: define the role and output schema, add two worked examples, test it against ten tickets, and repair the two cases where it mislabels severity.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0512-final-protected | 30 | 40 | yes |
| MST-0512-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Anatomy of a structured instruction | 5 |
| Examples and few-shot steering | 6 |
| Decomposition and ordered steps | 7 |
| Repeatable, testable prompts | 6 |
| Diagnosing and repairing prompts | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0512-Q0001** (single-answer, Select ONE) A prompt returns a long paragraph, but the next system needs a JSON object with fixed keys. What is the most direct fix?

- A. State the exact output format, including the required keys, in the prompt **(key)**  
  _Rationale:_ Correct: specifying the output schema is the direct way to control answer shape.
- B. Ask the same question again  
  _Rationale:_ Repeating an under-specified prompt tends to repeat the problem.
- C. Make the prompt longer with more background  
  _Rationale:_ More background does not constrain the output shape.
- D. Lower your expectations of the model  
  _Rationale:_ The fault is an unstated format requirement, not model capability.

**MST-0512-Q0002** (multiple-answer, Select TWO) Which TWO choices make a prompt more repeatable across different inputs? (Select TWO.)

- A. Replacing the specific case with named input slots **(key)**  
  _Rationale:_ Correct: parameterising inputs turns a one-off into a template.
- B. Defining acceptance criteria for a correct answer **(key)**  
  _Rationale:_ Correct: explicit criteria let you test the prompt on new inputs.
- C. Relying on a single successful run as proof  
  _Rationale:_ One success does not establish reliability.
- D. Removing all constraints so it is flexible  
  _Rationale:_ Removing constraints usually makes output less consistent.

**MST-0512-Q0003** (single-answer, Select ONE) A single-shot prompt mislabels ambiguous support tickets. Adding what is most likely to help?

- A. Two worked examples that cover the ambiguous cases **(key)**  
  _Rationale:_ Correct: targeted examples steer the model on exactly the cases it gets wrong.
- B. A request to 'be more accurate'  
  _Rationale:_ A vague exhortation gives the model no new signal.
- C. A higher word count  
  _Rationale:_ Length does not address the labelling fault.
- D. Removing the output format  
  _Rationale:_ Removing structure would make the result harder to use, not more accurate.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
