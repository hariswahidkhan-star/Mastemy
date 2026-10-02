# Cursor Skills and Reusable Engineering Workflows

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0563` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Cursor's official documentation; the egress proxy blocked docs.cursor.com this session (EGRESS_BLOCKED), so no official page was read. Features, menu names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session (docs.cursor.com, EGRESS_BLOCKED); sources: SRC-CURSOR-0563 |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Cursor Skills and Reusable Engineering Workflows (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain why reusable workflows beat re-explaining conventions each time
2. Author a clear, example-driven reusable skill or rule
3. Apply project rules and share workflows across a team with versioning
4. Test and maintain workflows so they stay correct
5. Reuse workflows responsibly with review, ownership and no leaked specifics

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use or writing quality; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 Why reusable workflows matter (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Identify three repeated tasks worth capturing; (2) Decide what belongs in a reusable rule versus a one-off prompt
- Common misconception addressed: Re-explaining the same conventions in every prompt
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Repeated engineering tasks worth capturing | 72 | 5 |
| M01L02 | What a reusable skill or rule encodes | 72 | 5 |

### M02 Authoring a reusable skill (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Write a skill that encodes a team coding convention; (2) Add examples that make the skill reliable
- Common misconception addressed: Writing a vague skill that produces inconsistent results
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Writing a clear, scoped skill or rule | 96 | 5 |
| M02L02 | Including examples and constraints that steer output | 96 | 5 |

### M03 Project rules and shared context (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Add a project rule that enforces a convention; (2) Share and version a rule for the whole team
- Common misconception addressed: Letting personal rules silently override team standards
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Project-level rules the agent always applies | 80 | 5 |
| M03L02 | Sharing skills and rules across a team | 80 | 5 |
| M03L03 | Versioning and updating shared workflows | 80 | 5 |

### M04 Testing and maintaining workflows (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Verify a skill against a few representative tasks; (2) Fix a skill that started producing wrong output
- Common misconception addressed: Keeping a stale skill that no longer matches the codebase
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Checking a skill produces the intended output | 96 | 5 |
| M04L02 | Retiring or fixing a skill that drifts | 96 | 5 |

### M05 Responsible reuse (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Review a shared skill for leaked specifics; (2) Assign ownership for a team workflow
- Common misconception addressed: Baking a client name or secret into a shared skill
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Keeping secrets and client specifics out of shared skills | 96 | 5 |
| M05L02 | Review and ownership for shared workflows | 96 | 5 |

## Integrative case

A team captures its code-review conventions as a reusable Cursor skill and project rule: author it with examples, verify it against representative tasks, share and version it for everyone, strip any client-specific detail, and assign an owner to keep it current.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0563-final-protected | 30 | 40 | yes |
| MST-0563-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why reusable workflows matter | 5 |
| Authoring a reusable skill | 6 |
| Project rules and shared context | 7 |
| Testing and maintaining workflows | 6 |
| Responsible reuse | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0563-Q0001** (single-answer, Select ONE) What makes a reusable Cursor skill reliable?

- A. A clear scope with examples and constraints that steer output **(key)**  
  _Rationale:_ Correct: scope, examples and constraints make output consistent.
- B. Keeping it as vague as possible for flexibility  
  _Rationale:_ Vagueness produces inconsistent results.
- C. Embedding a client's name so it feels specific  
  _Rationale:_ Client specifics do not belong in a shared skill.
- D. Never updating it once written  
  _Rationale:_ Skills drift and need maintenance.

**MST-0563-Q0002** (multiple-answer, Select TWO) Which TWO practices keep shared workflows healthy? (Select TWO.)

- A. Version shared rules and assign an owner **(key)**  
  _Rationale:_ Correct: versioning and ownership keep workflows current.
- B. Verify a skill against representative tasks **(key)**  
  _Rationale:_ Correct: testing confirms the skill still produces the right output.
- C. Let personal rules silently override team standards  
  _Rationale:_ Silent overrides fragment team conventions.
- D. Bake secrets into the shared skill for convenience  
  _Rationale:_ Secrets must never be embedded in shared content.

**MST-0563-Q0003** (single-answer, Select ONE) A shared skill starts producing output that no longer matches the codebase. What should happen?

- A. Fix or retire the skill so it matches current conventions **(key)**  
  _Rationale:_ Correct: a drifted skill must be corrected or removed.
- B. Keep using it because it was approved once  
  _Rationale:_ Past approval does not excuse current drift.
- C. Tell everyone to ignore its output manually  
  _Rationale:_ A skill everyone must override has no value.
- D. Add more client-specific detail to it  
  _Rationale:_ That does not address the drift and leaks specifics.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
