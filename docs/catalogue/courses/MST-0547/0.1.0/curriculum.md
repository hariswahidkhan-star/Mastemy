# Anthropic Prompt Caching and Token Optimization

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0547` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude API documentation on prompt caching and token usage; the egress proxy blocks docs.anthropic.com this session, so no official page was read. Cache behaviour, breakpoints, TTLs and pricing effects are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-PROMPT-CACHING |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Anthropic Prompt Caching and Token Optimization (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what prompt caching does and when it reduces cost and latency
2. Structure a prompt so stable content is cacheable and variable content is not
3. Measure token usage and reason about input versus output costs
4. Choose model and context strategies that control spend
5. Monitor and verify caching and cost behaviour in production

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules


### M01 Why tokens and caching matter (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Estimate the token cost of a repeated long-context call; (2) Identify which calls would benefit from caching
- Common misconception addressed: Assuming caching helps even when the cached prefix keeps changing
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Tokens, cost and latency basics | 96 | 6 |
| M01L02 | What prompt caching is for | 96 | 6 |
### M02 Structuring cacheable prompts (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Reorder a prompt so the stable system/context comes first; (2) Split variable user input from the cached context
- Common misconception addressed: Interleaving changing content into the part meant to be cached
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Stable prefix vs variable suffix | 96 | 6 |
| M02L02 | Placing cache breakpoints | 96 | 6 |
### M03 Token optimisation (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Cut a bloated context to the minimum needed for the task; (2) Constrain output length to control output-token cost
- Common misconception addressed: Padding prompts with irrelevant context that inflates token cost
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Trimming context without losing meaning | 96 | 6 |
| M03L02 | Output-length control | 96 | 6 |
### M04 Model and context strategy (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Pick a model tier for a cost/quality trade-off; (2) Replace a huge pasted document with targeted retrieval
- Common misconception addressed: Always using the largest model regardless of task difficulty
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Choosing a model for the job | 96 | 6 |
| M04L02 | Retrieval instead of stuffing context | 96 | 6 |
### M05 Monitoring cost (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Read a usage report and attribute cost to input vs output; (2) Confirm that a cached prefix is actually being reused
- Common misconception addressed: Trusting a projected saving without measuring real cache hits
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Reading usage metrics | 96 | 6 |
| M05L02 | Verifying cache hits | 96 | 6 |

## Integrative case

A team runs a high-volume Claude assistant with a large shared instruction set: restructure prompts so the stable context is cacheable, trim unnecessary tokens, choose an appropriate model, and verify real cache hits and cost in usage metrics. Every specific caching parameter is flagged for official verification.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0547-final-protected | 30 | 40 | yes |
| MST-0547-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why tokens and caching matter | 6 |
| Structuring cacheable prompts | 6 |
| Token optimisation | 6 |
| Model and context strategy | 6 |
| Monitoring cost | 6 |

Minimum reviewed item bank: 340 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0547-Q0001** (single-answer, Select ONE) A prompt places a long, unchanging instruction block AFTER the user's changing question. Why does this undermine prompt caching?

- A. Caching reuses a stable prefix; putting changing content first prevents the stable block from being cached **(key)**  
  _Rationale:_ Correct: a reusable prefix must come before variable content.
- B. Caching only works on output tokens  
  _Rationale:_ Caching concerns the input prefix, not output.
- C. Instruction blocks can never be cached  
  _Rationale:_ Stable instruction blocks are exactly what caching targets.
- D. User questions cannot follow instructions  
  _Rationale:_ Ordering is a design choice, not a restriction.
**MST-0547-Q0002** (multiple-answer, Select TWO) Which TWO actions genuinely reduce token cost? (Select TWO.)

- A. Trim irrelevant context that the task does not need **(key)**  
  _Rationale:_ Correct: fewer input tokens cost less.
- B. Constrain the output length when a short answer suffices **(key)**  
  _Rationale:_ Correct: shorter outputs reduce output-token cost.
- C. Add filler context to 'help' the model  
  _Rationale:_ Filler inflates token count and cost.
- D. Always select the largest model  
  _Rationale:_ Larger models can cost more without improving a simple task.
**MST-0547-Q0003** (single-answer, Select ONE) Before claiming a caching change saved money, what should you do?

- A. Measure actual cache hits and cost in usage metrics **(key)**  
  _Rationale:_ Correct: verify real behaviour rather than trusting a projection.
- B. Assume the saving because the prompt looks shorter  
  _Rationale:_ Appearance is not measurement.
- C. Switch off monitoring to reduce overhead  
  _Rationale:_ Monitoring is how you verify the saving.
- D. Delete the usage logs  
  _Rationale:_ Logs are needed to confirm the effect.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
