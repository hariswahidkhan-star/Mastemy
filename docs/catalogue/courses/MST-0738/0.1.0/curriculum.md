# Google AI Studio: Prototyping and Evaluating AI Applications

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0738` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Google AI Studio docs; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GOOG-AISTUDIO (https://ai.google.dev/aistudio; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Google AI Studio: Prototyping and Evaluating AI Applications (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Navigate AI Studio and create prompts
2. Design and compare prompt variations
3. Tune model parameters for a task
4. Use structured output and system instructions
5. Evaluate outputs and iterate
6. Export prompts to code and deploy

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 AI Studio basics (MASTEMY-DESIGN 16%)

- Worked applications: (1) Create a freeform prompt and run it; (2) Save and reopen a prompt
- Common misconception addressed: Confusing a saved prompt with a deployed endpoint
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Interface and prompt types | 80 | 7 |
| M01L02 | Creating and saving prompts | 80 | 7 |

### M02 Prompt design (MASTEMY-DESIGN 16%)

- Worked applications: (1) Add few-shot examples to steer output; (2) Write a system instruction to fix tone
- Common misconception addressed: Adding contradictory examples that confuse the model
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Few-shot examples | 80 | 7 |
| M02L02 | System instructions | 80 | 7 |

### M03 Parameter tuning (MASTEMY-DESIGN 17%)

- Worked applications: (1) Lower temperature for consistent output; (2) Set a stop sequence to end generation cleanly
- Common misconception addressed: Expecting top-p and temperature to be interchangeable
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Temperature and top-p | 80 | 7 |
| M03L02 | Output length and stop sequences | 80 | 7 |

### M04 Structured output (MASTEMY-DESIGN 17%)

- Worked applications: (1) Request output as structured JSON; (2) Constrain fields with a schema
- Common misconception addressed: Assuming the UI preview guarantees valid JSON in code
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | JSON output mode | 80 | 7 |
| M04L02 | Schema-constrained responses | 80 | 7 |

### M05 Evaluation and iteration (MASTEMY-DESIGN 17%)

- Worked applications: (1) Run a prompt across several test inputs; (2) Compare two variants side by side
- Common misconception addressed: Judging a prompt on a single lucky example
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Testing across sample inputs | 80 | 7 |
| M05L02 | Comparing prompt variants | 80 | 7 |

### M06 Export and deploy (MASTEMY-DESIGN 17%)

- Worked applications: (1) Export a prompt to API code; (2) Move a key to a server environment
- Common misconception addressed: Shipping the studio key in client code
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Exporting to code | 80 | 7 |
| M06L02 | Keys, quotas and next steps | 80 | 7 |

## Integrative case

Prototype a product-description generator in AI Studio: craft a prompt with a system instruction, compare two prompt variants, tune temperature and output length, request structured JSON, evaluate results on sample inputs, then export to API code.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0738-final-protected | 40 | 50 | yes |
| MST-0738-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI Studio basics | 6 |
| Prompt design | 6 |
| Parameter tuning | 7 |
| Structured output | 7 |
| Evaluation and iteration | 7 |
| Export and deploy | 7 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0738-Q0001** (single-answer, Select ONE) What is the primary purpose of Google AI Studio?

- A. Prototype, test and tune prompts before exporting them to code **(key)**  
  _Rationale:_ Correct: AI Studio is for prototyping and tuning prompts.
- B. Host production traffic at scale with SLAs  
  _Rationale:_ Production hosting is handled by the API, not the studio.
- C. Train new foundation models from scratch  
  _Rationale:_ The studio does not train base models.
- D. Manage billing accounts only  
  _Rationale:_ Billing is not its purpose.

**MST-0738-Q0002** (single-answer, Select ONE) Lowering the temperature parameter tends to make outputs:

- A. More focused and consistent **(key)**  
  _Rationale:_ Correct: lower temperature reduces randomness.
- B. More random and varied  
  _Rationale:_ Higher temperature increases variation, not lower.
- C. Longer regardless of content  
  _Rationale:_ Temperature does not control length.
- D. Always factually correct  
  _Rationale:_ Temperature does not control accuracy.

**MST-0738-Q0003** (multiple-answer, Select TWO) Which TWO practices give a trustworthy evaluation of a prompt in AI Studio? (Select TWO.)

- A. Test across several representative inputs **(key)**  
  _Rationale:_ Correct: multiple inputs reveal real behaviour.
- B. Compare variants under the same conditions **(key)**  
  _Rationale:_ Correct: controlled comparison isolates the change.
- C. Judge on a single favourable example  
  _Rationale:_ One example is not representative.
- D. Change several settings at once while comparing  
  _Rationale:_ Changing many things at once confounds the result.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
