# Cursor Foundations: Editor, Agent, and Codebase Navigation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0551` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Intended to reflect Cursor's official documentation at cursor.com/docs; the egress proxy blocked the vendor site this session, so no official page was read. Feature names, keybindings and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CURSOR-FEATURES |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Cursor Foundations: Editor, Agent, and Codebase Navigation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Navigate the Cursor editor and its core panels confidently
2. Use the agent and inline edit for everyday coding tasks
3. Give the agent the right codebase context for a request
4. Review and accept or reject agent changes safely
5. Decide when to use the agent versus editing directly

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 The Cursor editor (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Locate and use the editor, chat and agent panels for one task; (2) Configure the workspace for a new repository
- Common misconception addressed: Treating Cursor as only an autocomplete tool
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Editor layout and core panels | 72 | 5 |
| M01L02 | Opening and configuring a repository | 72 | 5 |

### M02 Agent and inline edit (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Use inline edit to refactor a single function; (2) Use the agent to make a small multi-file change
- Common misconception addressed: Accepting an agent change without reading the diff
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Inline edit for focused changes | 96 | 5 |
| M02L02 | The agent for multi-step tasks | 96 | 5 |

### M03 Giving the agent context (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Attach the right files to a request instead of the whole repo; (2) Use references so the agent edits the intended code
- Common misconception addressed: Assuming the agent already knows the whole codebase perfectly
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | How Cursor gathers codebase context | 80 | 5 |
| M03L02 | Pointing the agent at the right files | 80 | 5 |
| M03L03 | Keeping context focused to improve results | 80 | 5 |

### M04 Reviewing agent work (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Review a diff and reject an out-of-scope edit; (2) Run tests before accepting a change
- Common misconception addressed: Trusting that a green chat summary means the tests passed
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reading and judging a diff | 96 | 5 |
| M04L02 | Running tests and verifying before accepting | 96 | 5 |

### M05 Agent versus direct editing (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose agent or manual edit for five tasks; (2) Recover cleanly when the agent goes off track
- Common misconception addressed: Using the agent for a trivial edit you could type faster
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | When the agent helps and when it does not | 96 | 5 |
| M05L02 | Steering, interrupting and recovering | 96 | 5 |

## Integrative case

A developer joins a .NET/React repository in Cursor: index the codebase, use the agent to add a small endpoint with the right context, review the multi-file diff, run the tests, and reject the one change that touched an unrelated file.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0551-final-protected | 30 | 40 | yes |
| MST-0551-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The Cursor editor | 5 |
| Agent and inline edit | 6 |
| Giving the agent context | 7 |
| Reviewing agent work | 6 |
| Agent versus direct editing | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0551-Q0001** (single-answer, Select ONE) The Cursor agent made changes across four files, including one unrelated to the task. What should you do before accepting?

- A. Review the full diff and reject the unrelated change **(key)**  
  _Rationale:_ Correct: reviewing the diff and rejecting out-of-scope edits is the accountable step.
- B. Accept everything because the agent is usually right  
  _Rationale:_ Accepting unreviewed multi-file edits is exactly the risk to avoid.
- C. Delete the repository and start over  
  _Rationale:_ That is disproportionate; the diff can simply be reviewed.
- D. Disable tests so the change applies faster  
  _Rationale:_ Disabling tests removes the check you need.

**MST-0551-Q0002** (multiple-answer, Select TWO) Which TWO actions give the Cursor agent better context for a scoped change? (Select TWO.)

- A. Attach the specific files the change touches **(key)**  
  _Rationale:_ Correct: focused, relevant files improve the agent's results.
- B. Reference the exact function or symbol to edit **(key)**  
  _Rationale:_ Correct: precise references reduce the chance of editing the wrong code.
- C. Paste the entire repository into the chat  
  _Rationale:_ Dumping everything adds noise and wastes context.
- D. Give no files and hope it finds them  
  _Rationale:_ Leaving context to chance produces unreliable edits.

**MST-0551-Q0003** (single-answer, Select ONE) Which task is the clearest case for a direct manual edit rather than the agent?

- A. Renaming one local variable in the file you are looking at **(key)**  
  _Rationale:_ Correct: a trivial local edit is faster to type than to delegate.
- B. A coordinated change across many files  
  _Rationale:_ That is where the agent helps most.
- C. Adding a feature touching several modules  
  _Rationale:_ A multi-step task suits the agent.
- D. Refactoring with repository-wide impact  
  _Rationale:_ Broad changes benefit from agent assistance plus review.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
