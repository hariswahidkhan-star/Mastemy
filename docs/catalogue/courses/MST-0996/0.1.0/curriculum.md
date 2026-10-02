# Incident Management and Blameless Postmortems

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0996` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — Incident Management and Blameless Postmortems (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Incident management fundamentals and severity
2. Detection, alerting and declaring an incident
3. Roles: incident commander, comms and scribe
4. Coordinating response and mitigation
5. Communication with stakeholders and customers
6. Blameless postmortem principles
7. Writing the postmortem and timeline
8. Action items, follow-through and metrics

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; live tooling, real incident response and system operation are not assessed in this format.

## Modules

### M01 Incident management fundamentals and severity (MASTEMY-DESIGN 13%)

- Worked applications: (1) Classify an outage into the right severity; (2) Decide when to escalate to a higher severity
- Common misconception addressed: Treating every alert as a full incident and causing fatigue
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What counts as an incident and why process matters | 120 | 6 |
| M01L02 | Severity levels and escalation criteria | 120 | 6 |

### M02 Detection, alerting and declaring an incident (MASTEMY-DESIGN 13%)

- Worked applications: (1) Turn a noisy alert into a declared incident; (2) Page the correct on-call responder
- Common misconception addressed: Delaying declaration until the problem is fully understood
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Detecting incidents from alerts and signals | 120 | 6 |
| M02L02 | Declaring an incident and paging responders | 120 | 6 |

### M03 Roles: incident commander, comms and scribe (MASTEMY-DESIGN 12%)

- Worked applications: (1) Assign incident commander and scribe at the start; (2) Hand off command cleanly across a shift
- Common misconception addressed: Having no single incident commander so decisions stall
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | The incident commander role | 120 | 6 |
| M03L02 | Communications lead and scribe responsibilities | 120 | 6 |

### M04 Coordinating response and mitigation (MASTEMY-DESIGN 12%)

- Worked applications: (1) Choose a fast mitigation over a slow root-cause fix; (2) Coordinate parallel workstreams during response
- Common misconception addressed: Chasing root cause while customers are still down instead of mitigating first
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Running the response and assigning work | 120 | 6 |
| M04L02 | Mitigation versus root-cause fixing under pressure | 120 | 6 |

### M05 Communication with stakeholders and customers (MASTEMY-DESIGN 13%)

- Worked applications: (1) Draft a concise internal status update; (2) Write a customer-facing status page message
- Common misconception addressed: Going silent with stakeholders during a long incident
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Internal status updates cadence | 120 | 6 |
| M05L02 | External and customer communication | 120 | 6 |

### M06 Blameless postmortem principles (MASTEMY-DESIGN 13%)

- Worked applications: (1) Reframe a blameful statement into a blameless one; (2) Identify a systemic cause behind an operator mistake
- Common misconception addressed: Turning the postmortem into blame and hiding future mistakes
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Why blameless, and psychological safety | 120 | 6 |
| M06L02 | Separating human error from system weakness | 120 | 6 |

### M07 Writing the postmortem and timeline (MASTEMY-DESIGN 12%)

- Worked applications: (1) Reconstruct a timeline from logs and chat; (2) Quantify impact in users and minutes
- Common misconception addressed: Writing a vague timeline that cannot be learned from
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Building an accurate timeline | 120 | 6 |
| M07L02 | Documenting contributing factors and impact | 120 | 6 |

### M08 Action items, follow-through and metrics (MASTEMY-DESIGN 12%)

- Worked applications: (1) Write an action item with an owner and date; (2) Report MTTR and recurrence for a quarter
- Common misconception addressed: Logging action items that no one owns or ever closes
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Writing effective action items | 120 | 6 |
| M08L02 | Tracking MTTR, recurrence and follow-through | 120 | 6 |

## Integrative case

Run an end-to-end incident for a payments outage: declare severity and assign incident-command roles, mitigate first and communicate on a cadence to stakeholders, then lead a blameless postmortem with an accurate timeline, systemic contributing factors, and owned, dated action items tracked to closure.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0996-final-protected | 40 | 40 | yes |
| MST-0996-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Incident management fundamentals and severity | 5 |
| Detection, alerting and declaring an incident | 5 |
| Roles: incident commander, comms and scribe | 5 |
| Coordinating response and mitigation | 5 |
| Communication with stakeholders and customers | 5 |
| Blameless postmortem principles | 5 |
| Writing the postmortem and timeline | 5 |
| Action items, follow-through and metrics | 5 |

Minimum reviewed item bank: 608 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0996-Q0001** (single-answer, Select ONE) During an active outage affecting customers, what should the response team prioritise first?

- A. Mitigating impact to restore service, even with a temporary fix, before pursuing full root cause **(key)**  
  _Rationale:_ Correct: restoring service for users comes first; root-cause analysis follows in the postmortem.
- B. Completing a full root-cause analysis before taking any action  
  _Rationale:_ Waiting for full root cause prolongs customer impact.
- C. Assigning blame to the engineer who made the last change  
  _Rationale:_ Blame is counterproductive and not a response priority.
- D. Closing the incident quietly without informing stakeholders  
  _Rationale:_ Stakeholders must be kept informed during an incident.

**MST-0996-Q0002** (multiple-answer, Select ALL that apply) Which statements describe a blameless postmortem correctly? (Select TWO)

- A. It focuses on systemic contributing factors rather than individual fault **(key)**  
  _Rationale:_ Correct: blameless postmortems examine how the system allowed the failure, not who to punish.
- B. It aims to create psychological safety so people report issues honestly **(key)**  
  _Rationale:_ Correct: removing blame encourages honest disclosure and better learning.
- C. Its main output is identifying who to discipline  
  _Rationale:_ Discipline is explicitly not the goal of a blameless postmortem.
- D. It should omit the timeline to keep the document short  
  _Rationale:_ An accurate timeline is essential to learning from the incident.

**MST-0996-Q0003** (single-answer, Select ONE) What makes an action item from a postmortem effective?

- A. It has a clear owner, a due date and addresses a contributing factor **(key)**  
  _Rationale:_ Correct: effective action items are specific, owned, dated and tied to a real cause.
- B. It is written as a general aspiration with no owner  
  _Rationale:_ Unowned, vague items rarely get done.
- C. It assigns collective responsibility to the whole company  
  _Rationale:_ Diffuse responsibility means no one acts.
- D. It is marked done as soon as the postmortem is published  
  _Rationale:_ Closing it before the work is done defeats its purpose.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
