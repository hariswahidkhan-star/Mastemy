# Claude Code Subagents and Task Decomposition

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0539` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude Code, Claude product and developer documentation (docs.anthropic.com / docs.claude.com). The egress proxy blocked docs.anthropic.com this session (EGRESS_BLOCKED), so no official page was read. Commands, flags, feature names, plan names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; docs.anthropic.com blocked by egress proxy this session) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-CODE-SUBAGENTS |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude Code Subagents and Task Decomposition (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how subagents let Claude Code decompose and parallelise work
2. Decide when a task benefits from delegation to a subagent versus staying inline
3. Scope a subagent's task, inputs and expected report clearly
4. Combine subagent results into a coherent whole and resolve conflicts
5. Recognise the limits and overhead of subagent delegation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use, code quality or judgement under real conditions; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 What subagents are and why decompose (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Identify a task that genuinely parallelises; (2) Spot a task where delegation adds overhead without benefit
- Common misconception addressed: Thinking more subagents always means faster, better results
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Subagents and task decomposition | 72 | 5 |
| M01L02 | When parallel work helps and when it does not | 72 | 5 |

### M02 Deciding when to delegate (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose which parts of a task to delegate; (2) Keep coupled decisions in one place to avoid conflicts
- Common misconception addressed: Delegating tightly coupled work that then produces conflicting results
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Delegation versus inline work | 96 | 5 |
| M02L02 | Avoiding delegation of tightly coupled decisions | 96 | 5 |

### M03 Scoping a subagent task (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Write a precise subagent brief with inputs and expected output; (2) Define what a subagent must report back
- Common misconception addressed: Giving a subagent a vague goal and no definition of the report it must return
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Writing a precise subagent brief | 80 | 5 |
| M03L02 | Specifying inputs and the expected report | 80 | 5 |
| M03L03 | Bounding a subagent's scope | 80 | 5 |

### M04 Combining results (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Merge three subagent reports into one plan; (2) Resolve a conflict between two subagent proposals
- Common misconception addressed: Concatenating subagent outputs without reconciling contradictions
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reconciling and merging subagent reports | 96 | 5 |
| M04L02 | Resolving conflicting subagent conclusions | 96 | 5 |

### M05 Limits and overhead of delegation (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Estimate when delegation overhead outweighs the benefit; (2) Decide a sensible number of parallel subagents for a task
- Common misconception addressed: Ignoring the coordination cost and context limits of many subagents
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Coordination overhead and context limits | 96 | 5 |
| M05L02 | Right-sizing parallel delegation | 96 | 5 |

## Integrative case

A developer modernising a large repo uses subagents to investigate three independent modules in parallel, then reconciles their reports into one migration plan, resolving a conflict where two subagents proposed clashing interfaces.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0539-final-protected | 30 | 40 | yes |
| MST-0539-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What subagents are and why decompose | 5 |
| Deciding when to delegate | 6 |
| Scoping a subagent task | 7 |
| Combining results | 6 |
| Limits and overhead of delegation | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0539-Q0001** (single-answer, Select ONE) Which task is the best candidate for subagent delegation?

- A. Investigating three independent modules that do not share state **(key)**
  _Rationale:_ Correct: independent work parallelises cleanly with little coordination cost.
- B. Designing one shared interface every module must agree on
  _Rationale:_ A single coupled decision is better kept in one place.
- C. Renaming one variable in one file
  _Rationale:_ Trivial inline work gains nothing from delegation.
- D. A task whose steps each depend on the previous result
  _Rationale:_ Strictly sequential work cannot be parallelised usefully.

**MST-0539-Q0002** (multiple-answer, Select TWO) Which TWO belong in a well-scoped subagent brief? (Select TWO.)

- A. The specific inputs the subagent should work from **(key)**
  _Rationale:_ Correct: clear inputs keep the subagent on the intended material.
- B. A definition of the report the subagent must return **(key)**
  _Rationale:_ Correct: a defined output makes results combinable.
- C. An instruction to do whatever it thinks best with no bounds
  _Rationale:_ Unbounded scope produces results that are hard to combine.
- D. The parent's entire unrelated conversation history
  _Rationale:_ Irrelevant context adds noise and overhead.

**MST-0539-Q0003** (single-answer, Select ONE) Two subagents return proposals with incompatible interfaces. The right action is to:

- A. Reconcile them into one coherent decision before proceeding **(key)**
  _Rationale:_ Correct: conflicts must be resolved so the combined result is consistent.
- B. Merge both as-is and let callers pick
  _Rationale:_ Shipping contradictory interfaces pushes the conflict downstream.
- C. Discard both reports and start over
  _Rationale:_ The investigations have value; reconcile rather than discard.
- D. Pick the longer report automatically
  _Rationale:_ Length is not a basis for resolving a design conflict.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
