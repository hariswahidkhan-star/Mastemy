# ChatGPT Agent Workflows: Planning, Supervision, and Verification

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0494` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam | none - Mastemy skills course; no external exam or official syllabus |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — ChatGPT Agent Workflows: Planning, Supervision, and Verification (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Decompose a goal into an agent plan with checkpoints
2. Supervise an agent's steps and intervene when needed
3. Verify an agent's outputs and actions against evidence
4. Apply guardrails and stop conditions to agent workflows

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Operating a live agent, the real behaviour of autonomous runs, and judgement on when to intervene are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded runs or peer review.

## Modules

### M01 Planning agent work (25%)

- Worked applications: (1) Break a research-and-summarise goal into a checkpointed plan; (2) Write success criteria for each step of an agent task
- Common misconception addressed: Launching an agent on a vague goal with no checkpoints
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | From goal to a stepwise plan | 120 | 6 |
| M01L02 | Defining checkpoints and success criteria | 120 | 6 |

### M02 Supervising execution (25%)

- Worked applications: (1) Read an agent's step trace to find where it went wrong; (2) Pause an agent and correct a mistaken assumption mid-run
- Common misconception addressed: Assuming the agent followed the plan without reading its trace
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Reading an agent's trace | 120 | 6 |
| M02L02 | Intervening and correcting mid-run | 120 | 6 |

### M03 Verifying results (25%)

- Worked applications: (1) Verify an agent's claimed result against a source of truth; (2) Confirm that a write action actually completed
- Common misconception addressed: Treating an agent's self-reported success as proof it succeeded
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Checking outputs against evidence | 120 | 6 |
| M03L02 | Confirming actions actually happened | 120 | 6 |

### M04 Guardrails and stop conditions (25%)

- Worked applications: (1) Set a permission boundary the agent may not cross; (2) Define a stop condition that escalates to a human
- Common misconception addressed: Running an agent with no stop condition or escalation path
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Setting scope and permission limits | 120 | 6 |
| M04L02 | Defining stop and escalation conditions | 120 | 6 |

## Integrative case

An analyst delegates a multi-step market-research task to a ChatGPT agent: they decompose the goal into a checkpointed plan with success criteria, supervise the run by reading its trace and intervening, verify each claimed result against sources, and set scope limits and a stop condition that escalates to a human.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy-designed skills course; form length set from the assessment time budget, not an external exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0494-final-protected | 72 | 72 | yes |
| MST-0494-final-alternate | 72 | 72 | no (optional) |

| Domain | Items per form |
|---|---|
| Planning agent work | 18 |
| Supervising execution | 18 |
| Verifying results | 18 |
| Guardrails and stop conditions | 18 |

Minimum reviewed item bank: 408 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0494-Q0001** (single-answer, Select ONE) An agent reports 'task complete'. What confirms the task actually succeeded?

- A. Verifying the claimed result and actions against an independent source of truth **(key)**  
  _Rationale:_ Correct: independent verification confirms real outcomes, not just the agent's claim.
- B. The agent repeating that it is confident  
  _Rationale:_ Self-reported confidence is not evidence of success.
- C. A longer final message from the agent  
  _Rationale:_ Message length does not verify an outcome.
- D. The agent using the newest model  
  _Rationale:_ Model version does not confirm a result.

**MST-0494-Q0002** (single-answer, Select ONE) Why define checkpoints with success criteria before launching an agent?

- A. So each step can be judged and the run corrected early **(key)**  
  _Rationale:_ Correct: checkpoints give objective points to supervise and intervene.
- B. So the agent runs faster  
  _Rationale:_ Checkpoints are about control, not speed.
- C. So no human is ever needed  
  _Rationale:_ Checkpoints support human supervision rather than removing it.
- D. To reduce the token price per call  
  _Rationale:_ Checkpoints do not change per-call pricing.

**MST-0494-Q0003** (multiple-answer, Select TWO) Which TWO guardrails limit the damage an agent can do if it goes off-track? (Select TWO)

- A. A scoped permission boundary the agent cannot cross **(key)**  
  _Rationale:_ Correct: limiting scope caps what the agent is able to affect.
- B. A stop condition that escalates to a human **(key)**  
  _Rationale:_ Correct: a stop/escalation condition halts runaway behaviour.
- C. Removing all logging  
  _Rationale:_ Removing logging hides what the agent did and worsens control.
- D. Granting the agent broad write access  
  _Rationale:_ Broad write access increases potential damage.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.

