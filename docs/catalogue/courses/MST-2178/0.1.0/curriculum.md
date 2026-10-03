# Space Mission Operations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2178` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Educational operations overview; concepts versioned by verification date. No official syllabus; conceptual civil/commercial mission operations only - NO operational military tactics. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Space Mission Operations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the phases of a space mission from launch to end-of-life
2. Explain the roles of the ground segment and mission control
3. Describe telemetry, tracking and command concepts
4. Explain flight dynamics, planning and anomaly response at a concept level
5. Describe space situational awareness and debris mitigation concepts
6. Communicate operational trade-offs and risk to stakeholders

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Mission phases and control (25% (Mastemy design weight), design weight)

- Worked applications: (1) Order the phases of a typical mission lifecycle; (2) Describe one role in a mission control team
- Common misconception addressed: Thinking operations end once the satellite reaches orbit
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Mission phases from launch to disposal | 120 | 7 |
| M01L02 | Mission control and operations teams | 120 | 7 |

### M02 Ground segment and TT&C (25% (Mastemy design weight), design weight)

- Worked applications: (1) Trace a command from control room to spacecraft; (2) Explain what telemetry tells operators
- Common misconception addressed: Believing a satellite runs itself with no ground contact
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Ground stations and networks | 120 | 7 |
| M02L02 | Telemetry, tracking and command concepts | 120 | 7 |

### M03 Flight dynamics and planning (25% (Mastemy design weight), design weight)

- Worked applications: (1) Plan a simple ground-station contact schedule; (2) Explain why contact windows are limited
- Common misconception addressed: Assuming a satellite is always in view of one station
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Orbit determination and planning conceptually | 120 | 7 |
| M03L02 | Scheduling, passes and contact windows | 120 | 7 |

### M04 Safety and sustainability (25% (Mastemy design weight), design weight)

- Worked applications: (1) Outline a basic anomaly-response sequence; (2) Explain why end-of-life disposal matters for debris
- Common misconception addressed: Treating space as unlimited with no debris concern
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Anomaly detection and response basics | 120 | 7 |
| M04L02 | Space situational awareness and debris mitigation | 120 | 7 |

## Integrative case

An operations class plans, at concept level only, the operations of a civil Earth-observation satellite: they lay out mission phases, the ground segment and TT&C, flight-dynamics planning and contact scheduling, and anomaly and end-of-life/debris handling, presenting operational trade-offs for review.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2178-final-protected | 40 | 40 | yes |
| MST-2178-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Mission phases and control | 10 |
| Ground segment and TT&C | 10 |
| Flight dynamics and planning | 10 |
| Safety and sustainability | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2178-Q0001** (single-answer, Select ONE) What is the main role of the ground segment in space mission operations?

- A. To command the spacecraft and receive its telemetry and data **(key)**  
  _Rationale:_ Correct: the ground segment commands the spacecraft and receives telemetry.
- B. To physically repair the satellite in orbit  
  _Rationale:_ Routine in-orbit physical repair is not the ground segment's role.
- C. To replace the need for any orbit  
  _Rationale:_ The ground segment supports, not replaces, the orbit.
- D. To generate the spacecraft's electrical power  
  _Rationale:_ Power is generated onboard, not by the ground segment.

**MST-2178-Q0002** (multiple-answer, Select TWO) Which TWO statements about mission operations are correct? (Select TWO.)

- A. Telemetry lets operators monitor spacecraft health and status **(key)**  
  _Rationale:_ Correct: telemetry conveys health and status data to the ground.
- B. Contact windows limit when a ground station can talk to a satellite **(key)**  
  _Rationale:_ Correct: visibility passes constrain communication times.
- C. A satellite is always visible to every ground station  
  _Rationale:_ Visibility is intermittent and geometry-dependent.
- D. Operations stop the moment a satellite reaches orbit  
  _Rationale:_ Operations continue throughout the mission life.

**MST-2178-Q0003** (single-answer, Select ONE) Why does responsible mission operations include end-of-life disposal planning?

- A. To reduce orbital debris and protect the space environment for others **(key)**  
  _Rationale:_ Correct: disposal mitigates debris and preserves usable orbits.
- B. Because satellites are legally required to explode  
  _Rationale:_ Disposal is about safe removal, not destruction by explosion.
- C. Because debris poses no risk to anyone  
  _Rationale:_ Debris is a real collision risk to other spacecraft.
- D. Because orbits are infinite and self-cleaning  
  _Rationale:_ Orbits are finite resources and debris persists.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
