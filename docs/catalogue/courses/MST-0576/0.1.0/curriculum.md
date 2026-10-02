# Building Software from Specifications with AI Coding Agents

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0576` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs. Tool- and model-specific behaviour is vendor-neutral here and must be verified against the current official documentation at production. |
| Evidence | **n/a-no-official-syllabus** - no official source syllabus exists for this skills scope |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Building Software from Specifications with AI Coding Agents (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain why a clear specification drives reliable agent output
2. Write unambiguous, testable acceptance criteria
3. Decompose a spec into agent-sized, reviewable tasks
4. Steer coding agents and correct course mid-task
5. Verify agent output against acceptance criteria
6. Integrate agent work with human ownership and review

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Specifications as the source of truth (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Judge whether a spec is implementable; (2) Find ambiguity that would mislead an agent
- Common misconception addressed: Expecting an agent to fill gaps correctly
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why specs matter for agents | 80 | 8 |
| M01L02 | Spotting ambiguity and gaps | 80 | 8 |

### M02 Writing testable requirements (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Turn a vague requirement into acceptance criteria; (2) Write criteria an agent and a test can check
- Common misconception addressed: Writing goals that cannot be verified
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | From requirement to criterion | 80 | 8 |
| M02L02 | Acceptance criteria that test | 80 | 8 |

### M03 Decomposing work for agents (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Break a spec into incremental tasks; (2) Order tasks to keep each change reviewable
- Common misconception addressed: Handing a whole feature to an agent at once
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Task decomposition | 80 | 8 |
| M03L02 | Incremental, reviewable changes | 80 | 8 |

### M04 Driving and steering agents (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Give an agent the right context and constraints; (2) Redirect an agent that drifts from the spec
- Common misconception addressed: Letting an agent run unbounded
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Context, constraints and guardrails | 80 | 8 |
| M04L02 | Steering and course correction | 80 | 8 |

### M05 Verifying against the spec (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Check an implementation against its criteria; (2) Write tests that enforce the spec
- Common misconception addressed: Accepting output that 'looks done'
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Checking against acceptance criteria | 80 | 8 |
| M05L02 | Tests that enforce the spec | 80 | 8 |

### M06 Integration and accountability (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Review and merge agent increments safely; (2) Assign ownership of the shipped feature
- Common misconception addressed: No human owner for the final result
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Review and integration | 80 | 8 |
| M06L02 | Human ownership of the result | 80 | 8 |

## Integrative case

A product team must ship a feature from a written specification using AI coding agents. Turn the spec into unambiguous, testable requirements, drive agents to implement in reviewable increments, verify against acceptance criteria, and keep humans accountable for the result.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0576-final-protected | 40 | 40 | yes |
| MST-0576-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Specifications as the source of truth | 7 |
| Writing testable requirements | 7 |
| Decomposing work for agents | 7 |
| Driving and steering agents | 7 |
| Verifying against the spec | 6 |
| Integration and accountability | 6 |

Minimum reviewed item bank: 440 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0576-Q0001** (single-answer, Select ONE) An agent implements a feature but the spec was ambiguous about an edge case. What is the root issue?

- A. The specification left an ambiguity the agent could not resolve correctly on its own **(key)**  
  _Rationale:_ Correct: ambiguous specs produce unreliable agent output.
- B. The agent model was too small  
  _Rationale:_ The gap is in the spec, not model size.
- C. Agents cannot write code at all  
  _Rationale:_ Agents can implement clear specs.
- D. The programming language was wrong  
  _Rationale:_ Language choice is not the cause.

**MST-0576-Q0002** (multiple-answer, Select TWO) Which TWO qualities make a requirement suitable for an AI coding agent? (Select TWO.)

- A. It is unambiguous about expected behaviour **(key)**  
  _Rationale:_ Correct: clarity prevents misimplementation.
- B. It has verifiable acceptance criteria **(key)**  
  _Rationale:_ Correct: testable criteria let you verify output.
- C. It is written as a single huge task  
  _Rationale:_ Large undifferentiated tasks are hard to review.
- D. It omits edge cases to save space  
  _Rationale:_ Omitting edge cases invites wrong behaviour.

**MST-0576-Q0003** (single-answer, Select ONE) Why decompose a feature into small tasks for an agent rather than one large one?

- A. Smaller increments stay reviewable and limit the blast radius of mistakes **(key)**  
  _Rationale:_ Correct: incremental, reviewable changes are safer and easier to verify.
- B. Agents charge per task so it is cheaper  
  _Rationale:_ Cost structure is not the reason.
- C. Large tasks are impossible for any model  
  _Rationale:_ Possible but harder to review and verify.
- D. It lets you skip testing  
  _Rationale:_ Decomposition does not remove the need for tests.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
