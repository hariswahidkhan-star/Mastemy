# ChatGPT + n8n + Gmail: Human-Approved Customer Follow-Up

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0796` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — ChatGPT + n8n + Gmail: Human-Approved Customer Follow-Up (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Scope a human-approved customer follow-up automation
2. Use ChatGPT to draft follow-ups that stay accurate and on-policy
3. Build the orchestration in n8n with a human-approval step
4. Send approved messages through Gmail with records
5. Operate the automation with controls, limits and auditing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Scoping the automation (20%)

- Worked applications: (1) Decide which follow-ups may be automated and which must not; (2) Place the human-approval point in the flow
- Common misconception addressed: Automating end-to-end with no human in the loop
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What to automate and what to keep human | 96 | 7 |
| M01L02 | Triggers, data and approval points | 96 | 7 |

### M02 ChatGPT-drafted follow-ups (20%)

- Worked applications: (1) Draft a follow-up that uses only verified customer facts; (2) Catch a draft that promises something out of policy
- Common misconception addressed: Queueing ChatGPT drafts without a policy or accuracy check
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Prompting for accurate, on-policy drafts | 96 | 7 |
| M02L02 | Checking drafts before they are queued | 96 | 7 |

### M03 Orchestration in n8n (20%)

- Worked applications: (1) Build an n8n flow that pauses for human approval; (2) Handle a failed step without sending a broken message
- Common misconception addressed: Designing a flow that sends even when a step fails
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Building the flow with an approval node | 96 | 7 |
| M03L02 | Error handling and retries | 96 | 7 |

### M04 Sending through Gmail (20%)

- Worked applications: (1) Send an approved message and log it against the customer; (2) Prevent a duplicate send on retry
- Common misconception addressed: Sending without a record of what went to which customer
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Sending approved messages reliably | 96 | 7 |
| M04L02 | Recording what was sent and to whom | 96 | 7 |

### M05 Operating the automation (20%)

- Worked applications: (1) Honour an opt-out before any message is drafted; (2) Add a kill-switch that halts the automation safely
- Common misconception addressed: Running with no opt-out handling or way to stop it
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Rate limits, opt-outs and compliance | 96 | 7 |
| M05L02 | Auditing and kill-switch | 96 | 7 |

## Integrative case

A support team automates customer follow-up with a human in the loop: scope what may be automated, draft with ChatGPT on-policy, orchestrate in n8n with an approval node, send approved mail via Gmail with records, and operate with opt-outs and a kill-switch.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0796-final-protected | 40 | 50 | yes |
| MST-0796-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Scoping the automation | 8 |
| ChatGPT-drafted follow-ups | 8 |
| Orchestration in n8n | 8 |
| Sending through Gmail | 8 |
| Operating the automation | 8 |

Minimum reviewed item bank: 388 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0796-Q0001** (single-answer, Select ONE) Where should the human-approval step sit in a customer follow-up automation?

- A. Before any message is sent to the customer **(key)**  
  _Rationale:_ Correct: approval must gate the outbound action, not follow it.
- B. After the message has already been sent  
  _Rationale:_ Approval after sending cannot prevent a bad message.
- C. Only when the automation errors  
  _Rationale:_ Errors are not the only risk; wrong-but-successful sends also need gating.
- D. It is unnecessary if ChatGPT drafted the message  
  _Rationale:_ AI drafting is exactly why human approval is needed.

**MST-0796-Q0002** (multiple-answer, Select TWO) Which TWO controls must a customer-messaging automation include? (Select TWO.)

- A. Honouring opt-outs before drafting or sending **(key)**  
  _Rationale:_ Correct: contacting opted-out customers is a compliance breach.
- B. A kill-switch to halt the automation safely **(key)**  
  _Rationale:_ Correct: an operator must be able to stop a misbehaving automation.
- C. Sending as fast as the API allows  
  _Rationale:_ Ignoring rate limits and pacing invites blocks and complaints.
- D. Removing the record of sent messages to save space  
  _Rationale:_ Destroying send records removes the audit trail.

**MST-0796-Q0003** (single-answer, Select ONE) A step in the n8n flow fails partway through composing a follow-up. What should the flow do?

- A. Stop and surface the failure without sending a broken message **(key)**  
  _Rationale:_ Correct: a failed step must not result in an incorrect customer send.
- B. Send whatever was composed so far  
  _Rationale:_ Sending a partial message harms the customer relationship.
- C. Retry forever until it succeeds  
  _Rationale:_ Unbounded retries can spam the customer or hang the flow.
- D. Skip the failed step and continue  
  _Rationale:_ Silently skipping a step can send an incomplete or wrong message.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
