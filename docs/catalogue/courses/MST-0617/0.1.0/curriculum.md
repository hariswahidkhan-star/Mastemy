# Human Approval Workflows for AI Agents

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0617` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs. Tool- and model-specific behaviour is vendor-neutral here and must be verified against the current official documentation at production. |
| Evidence | **n/a-no-official-syllabus** - no official source syllabus exists for this skills scope |
| Legacy IDs | none |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Human Approval Workflows for AI Agents (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Identify actions that require human approval and why
2. Design approval gates, pause and resume points in an agent
3. Present clear, reviewable requests to approvers
4. Record decisions and handle timeouts, rejections and escalation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 When to require approval (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Classify a list of agent actions by risk and reversibility; (2) Draft an approval policy for one high-risk action
- Common misconception addressed: Gating everything for approval so the workflow becomes unusable
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Risk and reversibility | 80 | 5 |
| M01L02 | Approval policies | 80 | 5 |
| M01L03 | Proportionate oversight | 80 | 5 |

### M02 Gates and pause/resume (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Insert an approval gate that holds a destructive action; (2) Resume the agent exactly where it paused after approval
- Common misconception addressed: Letting the action execute while approval is still pending
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Approval gates | 80 | 5 |
| M02L02 | Pausing and holding state | 80 | 5 |
| M02L03 | Resuming after a decision | 80 | 5 |

### M03 Review and decisions (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Present the approver a summary plus the exact action to be taken; (2) Handle a rejection and a timeout with a safe default
- Common misconception addressed: Defaulting to approve on timeout instead of to a safe no-op
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Presenting a reviewable request | 80 | 5 |
| M03L02 | Recording decisions and audit | 80 | 5 |
| M03L03 | Timeouts, rejection and escalation | 80 | 5 |

## Integrative case

A team adds human oversight to an agent that can take consequential actions: classify which actions need approval, insert pause points that hold the action, present the approver a clear summary and the exact action, then record the decision and handle rejection, timeout and escalation.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0617-final-protected | 30 | 30 | yes |
| MST-0617-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| When to require approval | 10 |
| Gates and pause/resume | 10 |
| Review and decisions | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0617-Q0001** (single-answer, Select ONE) Which agent action most clearly warrants a human approval gate?

- A. An irreversible, high-impact action such as deleting production data **(key)**  
  _Rationale:_ Correct: irreversible high-impact actions are the prime candidates for approval.
- B. Reading a public help article  
  _Rationale:_ Low-risk reversible reads do not need approval.
- C. Formatting its own output as a list  
  _Rationale:_ Presentation choices carry no risk.
- D. Counting tokens in a prompt  
  _Rationale:_ An internal, harmless computation needs no gate.

**MST-0617-Q0002** (multiple-answer, Select TWO) Which TWO make an approval request easy to review well? (Select TWO.)

- A. A concise summary of what will happen and why **(key)**  
  _Rationale:_ Correct: the approver needs the intent and impact at a glance.
- B. The exact action and its parameters that will execute **(key)**  
  _Rationale:_ Correct: showing the precise action lets the approver verify it.
- C. A request with no detail, just an Approve button  
  _Rationale:_ Without detail the approval is meaningless.
- D. A 50-page raw log dump with no summary  
  _Rationale:_ An unstructured dump hides the decision the approver must make.

**MST-0617-Q0003** (single-answer, Select ONE) An approval request times out with no response. What is the safe default?

- A. Do not perform the action; hold or cancel and escalate **(key)**  
  _Rationale:_ Correct: a timeout should fail safe to no action, not proceed.
- B. Automatically approve and run the action  
  _Rationale:_ Auto-approving on timeout defeats the oversight.
- C. Retry the action indefinitely  
  _Rationale:_ Blind retries can repeatedly attempt a risky action.
- D. Delete the pending state and the audit record  
  _Rationale:_ Destroying the record removes accountability.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
