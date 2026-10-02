# Claude Code Codebase Audits and Refactoring

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0538` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude Code, Claude product and developer documentation (docs.anthropic.com / docs.claude.com). The egress proxy blocked docs.anthropic.com this session (EGRESS_BLOCKED), so no official page was read. Commands, flags, feature names, plan names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; docs.anthropic.com blocked by egress proxy this session) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-CODE-REFACTOR |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude Code Codebase Audits and Refactoring (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Audit a codebase with Claude Code to surface risks and debt
2. Prioritise findings by impact and effort rather than by ease of fix
3. Refactor behind a safety net of tests so behaviour is preserved
4. Make large refactors reviewable through small, ordered steps
5. Verify that a refactor changed structure without changing behaviour

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use, code quality or judgement under real conditions; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 Auditing a codebase (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Produce an audit that names concrete risks, not vague smells; (2) Distinguish genuine risk from stylistic preference
- Common misconception addressed: Equating a long file list of findings with an actionable audit
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Running a structured codebase audit | 72 | 5 |
| M01L02 | Describing risks concretely and evidence-based | 72 | 5 |

### M02 Prioritising findings (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Rank findings by impact and effort; (2) Pick the highest-value refactor to do first
- Common misconception addressed: Fixing the easiest issues first regardless of their impact
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Impact-versus-effort prioritisation | 96 | 5 |
| M02L02 | Sequencing refactors for value | 96 | 5 |

### M03 Refactoring behind a safety net (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Add characterisation tests before changing legacy code; (2) Extract a function while keeping behaviour identical
- Common misconception addressed: Refactoring untested code and hoping behaviour stayed the same
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Characterisation tests for legacy code | 80 | 5 |
| M03L02 | Behaviour-preserving extraction | 80 | 5 |
| M03L03 | Refactoring without a behaviour change | 80 | 5 |

### M04 Making large refactors reviewable (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Split a large refactor into small ordered commits; (2) Keep each step green and reviewable
- Common misconception addressed: Submitting one enormous refactor diff no reviewer can check
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Decomposing a large refactor | 96 | 5 |
| M04L02 | Ordered, reviewable refactor steps | 96 | 5 |

### M05 Verifying a refactor (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Confirm tests and outputs are unchanged after a refactor; (2) Review a refactor diff for accidental behaviour change
- Common misconception addressed: Assuming structure-only edits cannot change behaviour
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Confirming behaviour is preserved | 96 | 5 |
| M05L02 | Reviewing a refactor for hidden changes | 96 | 5 |

## Integrative case

A team inherits a service with a 2,000-line module: they audit it with Claude Code, prioritise the riskiest coupling, add characterisation tests, and extract cohesive modules in small reviewed steps with behaviour unchanged.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0538-final-protected | 30 | 40 | yes |
| MST-0538-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Auditing a codebase | 5 |
| Prioritising findings | 6 |
| Refactoring behind a safety net | 7 |
| Making large refactors reviewable | 6 |
| Verifying a refactor | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0538-Q0001** (single-answer, Select ONE) Before refactoring a complex, untested legacy function, the safest first step is to:

- A. Add characterisation tests that capture current behaviour **(key)**
  _Rationale:_ Correct: capturing existing behaviour lets you refactor without changing it unknowingly.
- B. Rewrite it from scratch immediately
  _Rationale:_ Rewriting without a safety net risks silent behaviour changes.
- C. Delete it and see what breaks
  _Rationale:_ Removing code to probe dependencies is reckless in production code.
- D. Rename its variables first
  _Rationale:_ Renaming does not protect behaviour during a refactor.

**MST-0538-Q0002** (multiple-answer, Select TWO) Which TWO make a large refactor reviewable? (Select TWO.)

- A. Splitting it into small, ordered steps **(key)**
  _Rationale:_ Correct: small steps are far easier to review correctly.
- B. Keeping each step building and passing tests **(key)**
  _Rationale:_ Correct: green intermediate states keep the refactor recoverable.
- C. Bundling unrelated feature changes to save a PR
  _Rationale:_ Mixing changes obscures review and raises risk.
- D. Avoiding tests so the diff is smaller
  _Rationale:_ Dropping tests removes the safety net the refactor needs.

**MST-0538-Q0003** (single-answer, Select ONE) An audit lists twenty findings. What should drive which to fix first?

- A. Their impact weighed against the effort to fix them **(key)**
  _Rationale:_ Correct: impact-versus-effort prioritisation maximises value.
- B. Which one is quickest to fix regardless of impact
  _Rationale:_ Easiest-first can leave the biggest risks untouched.
- C. Alphabetical order of file names
  _Rationale:_ File name order has no bearing on risk.
- D. Which the newest team member prefers
  _Rationale:_ Preference is not a prioritisation basis for risk.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
