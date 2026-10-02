# Root-Cause Failure Analysis and Reliability Improvement

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1160` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the purpose and triggers of root-cause analysis (RCA)
2. Gather and preserve failure evidence and build a failure timeline
3. Apply RCA techniques such as 5-Whys, fishbone and fault-tree analysis
4. Distinguish physical, human and latent (systemic) root causes
5. Develop and verify corrective actions that prevent recurrence

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 RCA foundations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Write a sharp problem statement for a recurring seal failure; (2) Decide whether an event warrants a full RCA or a quick fix
- Common misconception addressed: Jumping to a solution before the problem is clearly defined
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What RCA is and when to trigger it | 96 | 8 |
| M01L02 | Problem definition and failure modes | 96 | 8 |

### M02 Evidence and data (MASTEMY-DESIGN 20%)

- Worked applications: (1) List the parts, position, people, paper and paradigms to preserve after a failure; (2) Order scattered events into a defensible failure timeline
- Common misconception addressed: Discarding or disturbing physical evidence before it is recorded
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Preserving the 5 Ps of evidence | 96 | 8 |
| M02L02 | Building the failure timeline | 96 | 8 |

### M03 Analysis techniques (MASTEMY-DESIGN 20%)

- Worked applications: (1) Run a 5-Whys that reaches a systemic cause, not a person to blame; (2) Build a simple fault tree for a loss of lubrication event
- Common misconception addressed: Stopping 5-Whys at the first human error instead of the system behind it
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | 5-Whys and cause-and-effect (fishbone) diagrams | 96 | 8 |
| M03L02 | Fault-tree and logic-tree analysis | 96 | 8 |

### M04 Cause classification (MASTEMY-DESIGN 20%)

- Worked applications: (1) Classify the causes of a bearing failure into physical, human and latent; (2) Spot a confirmation-bias trap in a draft RCA conclusion
- Common misconception addressed: Treating human error as the root cause rather than a symptom of the system
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Physical, human and latent root causes | 96 | 8 |
| M04L02 | Avoiding blame and confirmation bias | 96 | 8 |

### M05 Corrective action and verification (MASTEMY-DESIGN 20%)

- Worked applications: (1) Rank candidate corrective actions by effectiveness using a hierarchy of controls; (2) Define the evidence that will confirm recurrence has stopped
- Common misconception addressed: Closing an RCA without verifying that the action actually worked
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Designing effective corrective actions | 96 | 8 |
| M05L02 | Verifying effectiveness and closing out | 96 | 8 |

## Integrative case

After a third gearbox failure in a year, an engineer leads an RCA. Preserve evidence and build the timeline, work 5-Whys and a fault tree to separate physical, human and latent causes, propose corrective actions ranked by the hierarchy of controls, and define how effectiveness will be verified before closing the case.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1160-final-protected | 25 | 25 | yes |
| MST-1160-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| RCA foundations | 5 |
| Evidence and data | 5 |
| Analysis techniques | 5 |
| Cause classification | 5 |
| Corrective action and verification | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1160-Q0001** (single-answer, Select ONE) A 5-Whys analysis ends at 'the technician did not grease the bearing'. Why is this usually an inadequate root cause?

- A. It names a human action but not the system reason that allowed it **(key)**  
  _Rationale:_ Correct: effective RCA continues to the systemic cause, e.g. a missing or unclear PM task, so the fix prevents recurrence.
- B. Human error can never be a contributing factor  
  _Rationale:_ Human error can contribute, but it is rarely the deepest actionable cause.
- C. 5-Whys should always stop at exactly five whys  
  _Rationale:_ The number is a guide; you continue until a controllable systemic cause is found.
- D. Bearings do not fail from lack of grease  
  _Rationale:_ Lubrication loss is a valid physical mechanism; the issue is stopping the analysis too early.

**MST-1160-Q0002** (multiple-answer, Select TWO) Immediately after a failure, which TWO actions best preserve evidence for RCA? (Select TWO.)

- A. Photograph and tag the failed parts before cleaning them **(key)**  
  _Rationale:_ Correct: physical evidence must be captured in its as-found state.
- B. Record operator accounts and recent operating data **(key)**  
  _Rationale:_ Correct: people and paper/data are part of the evidence and are quickly lost.
- C. Clean and reinstall the failed component to restore service fast  
  _Rationale:_ Cleaning destroys physical evidence needed to find the mechanism.
- D. Decide the likely cause first, then collect only supporting data  
  _Rationale:_ That invites confirmation bias and ignores disconfirming evidence.

**MST-1160-Q0003** (single-answer, Select ONE) Using the hierarchy of controls, which corrective action is most likely to prevent recurrence of an over-torqued bolted joint?

- A. Design the joint so the correct torque is built in or hard to get wrong **(key)**  
  _Rationale:_ Correct: elimination/engineering controls outrank reminders and training in reliability.
- B. Add a reminder note on the work order  
  _Rationale:_ Reminders are weak administrative controls that rely on memory.
- C. Retrain the technician who made the error  
  _Rationale:_ Training alone is a weak control and fades over time.
- D. Ask the team to be more careful  
  _Rationale:_ Exhortation is the weakest control and rarely prevents recurrence.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
