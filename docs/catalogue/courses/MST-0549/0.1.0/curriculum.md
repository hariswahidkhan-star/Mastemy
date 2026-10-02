# Claude Agent Reliability, Evaluations, and Failure Recovery

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0549` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude documentation on building agents, evaluations and reliability; the egress proxy blocks docs.anthropic.com this session, so no official page was read. Evaluation harness details and recommended patterns are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-AGENT-RELIABILITY |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude Agent Reliability, Evaluations, and Failure Recovery (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe common failure modes of LLM agents and how they manifest
2. Build an evaluation set that measures agent task success
3. Add guardrails and checks that catch failures before they reach users
4. Design retries, fallbacks and recovery for failed steps
5. Monitor an agent in production and feed failures back into evaluations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules


### M01 Agent failure modes (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Classify three agent failures from their traces; (2) Reproduce a flaky failure reliably
- Common misconception addressed: Treating a one-off success as proof the agent is reliable
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | How agents fail | 96 | 6 |
| M01L02 | Observing a failure in a trace | 96 | 6 |
### M02 Evaluations (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Write an eval set with clear pass criteria; (2) Score a run against the eval set
- Common misconception addressed: Evaluating only on happy-path cases
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Building an eval set | 96 | 6 |
| M02L02 | Scoring task success objectively | 96 | 6 |
### M03 Guardrails and checks (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Add a post-condition that blocks an unsafe action; (2) Validate a step's output before the next step runs
- Common misconception addressed: Relying on the model to police itself with no external check
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Pre- and post-conditions | 96 | 6 |
| M03L02 | Catching bad output before users | 96 | 6 |
### M04 Recovery (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Design a retry-then-fallback path for a failing tool; (2) Degrade to a safe default when recovery fails
- Common misconception addressed: Retrying an action that is not safe to repeat
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Retries and fallbacks | 96 | 6 |
| M04L02 | Graceful degradation | 96 | 6 |
### M05 Production monitoring (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Add tracing that captures enough to diagnose a failure; (2) Turn a production failure into a new eval case
- Common misconception addressed: Fixing a production failure without adding a regression test
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Tracing and alerting | 96 | 6 |
| M05L02 | Closing the loop into evals | 96 | 6 |

## Integrative case

A team ships a customer-facing agent that keeps failing intermittently: classify the failure modes from traces, build an evaluation set covering the failures, add guardrails and a retry-then-fallback path, monitor in production, and feed every new failure back into the evals. Framework-specific claims are flagged for official verification.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0549-final-protected | 30 | 40 | yes |
| MST-0549-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Agent failure modes | 6 |
| Evaluations | 6 |
| Guardrails and checks | 6 |
| Recovery | 6 |
| Production monitoring | 6 |

Minimum reviewed item bank: 340 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0549-Q0001** (single-answer, Select ONE) An agent passed a single demo run. Why is that insufficient evidence of reliability?

- A. One success does not measure behaviour across the range of real cases **(key)**  
  _Rationale:_ Correct: reliability needs an evaluation set covering many cases, including failures.
- B. Demos always use a different model  
  _Rationale:_ That is not generally true and not the core issue.
- C. A single run proves reliability  
  _Rationale:_ It does not; variance and edge cases remain untested.
- D. Agents cannot be evaluated at all  
  _Rationale:_ They can and should be evaluated.
**MST-0549-Q0002** (multiple-answer, Select TWO) Which TWO belong in a robust agent reliability setup? (Select TWO.)

- A. An evaluation set with objective pass criteria **(key)**  
  _Rationale:_ Correct: objective evals measure task success.
- B. Post-conditions that block unsafe actions before they reach users **(key)**  
  _Rationale:_ Correct: external checks catch failures the model misses.
- C. Trusting the model to self-police with no external validation  
  _Rationale:_ Self-policing alone is not a guardrail.
- D. Evaluating only on cases you know pass  
  _Rationale:_ Omitting failure cases hides real weaknesses.
**MST-0549-Q0003** (single-answer, Select ONE) A tool call fails intermittently and the step is NOT safe to repeat. What recovery design is appropriate?

- A. Fall back to a safe default or human handoff rather than blindly retrying **(key)**  
  _Rationale:_ Correct: unsafe-to-repeat steps need a fallback, not an automatic retry.
- B. Retry the call immediately as many times as needed  
  _Rationale:_ Retrying an unsafe action can cause duplicate side-effects.
- C. Ignore the failure and continue  
  _Rationale:_ Continuing on a failed step risks a bad outcome.
- D. Crash the whole agent  
  _Rationale:_ Graceful degradation is preferable to crashing.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
