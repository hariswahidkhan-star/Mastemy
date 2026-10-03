# Rocket Propulsion Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2173` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Educational physics-overview course; concepts versioned by verification date. No official syllabus; conceptual propulsion principles only - NO build, manufacturing or hazardous procedures. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Rocket Propulsion Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the principle of rocket propulsion and conservation of momentum
2. Describe the rocket equation and the role of specific impulse conceptually
3. Compare chemical, electric and other propulsion types at a concept level
4. Describe the main components of a propulsion system conceptually
5. Explain staging and why it improves performance
6. Communicate propulsion trade-offs to non-specialists

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Principles of propulsion (25% (Mastemy design weight), design weight)

- Worked applications: (1) Explain thrust using conservation of momentum; (2) Describe why a rocket works in vacuum
- Common misconception addressed: Thinking a rocket pushes against the air to move
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Newton's third law and thrust | 120 | 7 |
| M01L02 | Momentum, exhaust velocity and the basic idea | 120 | 7 |

### M02 Performance concepts (25% (Mastemy design weight), design weight)

- Worked applications: (1) Interpret how mass ratio affects delta-v qualitatively; (2) Explain what a higher specific impulse buys you
- Common misconception addressed: Believing more fuel always linearly means more speed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The rocket equation conceptually | 120 | 7 |
| M02L02 | Specific impulse and what it means | 120 | 7 |

### M03 Propulsion types compared (25% (Mastemy design weight), design weight)

- Worked applications: (1) Match a propulsion type to a mission profile conceptually; (2) Compare high-thrust vs high-efficiency trade-offs
- Common misconception addressed: Assuming one propulsion type is best for everything
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Chemical propulsion at a concept level | 120 | 7 |
| M03L02 | Electric and alternative propulsion concepts | 120 | 7 |

### M04 System architecture and staging (25% (Mastemy design weight), design weight)

- Worked applications: (1) Describe the role of a nozzle at a concept level; (2) Explain why staging reduces dead mass
- Common misconception addressed: Thinking a single stage is always the simplest best choice
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Major components and their roles conceptually | 120 | 7 |
| M04L02 | Why multi-stage rockets perform better | 120 | 7 |

## Integrative case

An introductory class compares, at concept level only, propulsion options for a hypothetical interplanetary probe: reasoning from the rocket equation and specific impulse, they weigh chemical versus electric propulsion and staging, and present the trade-offs for a mission concept review - with no build or operational detail.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2173-final-protected | 40 | 40 | yes |
| MST-2173-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Principles of propulsion | 10 |
| Performance concepts | 10 |
| Propulsion types compared | 10 |
| System architecture and staging | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2173-Q0001** (single-answer, Select ONE) Why can a rocket produce thrust in the vacuum of space?

- A. It expels mass, and conservation of momentum pushes it the other way **(key)**  
  _Rationale:_ Correct: thrust comes from expelling mass, not pushing on air.
- B. It pushes against the surrounding air  
  _Rationale:_ There is no air in vacuum; thrust is from expelled mass.
- C. It uses wings to generate lift  
  _Rationale:_ Wings need air; rockets work by momentum exchange.
- D. It is pulled forward by gravity  
  _Rationale:_ Gravity does not provide forward thrust here.

**MST-2173-Q0002** (multiple-answer, Select TWO) Which TWO statements about specific impulse and the rocket equation are correct? (Select TWO.)

- A. Higher specific impulse means more delta-v for the same propellant **(key)**  
  _Rationale:_ Correct: specific impulse measures propulsion efficiency.
- B. A higher mass ratio increases achievable delta-v **(key)**  
  _Rationale:_ Correct: carrying relatively more propellant raises delta-v.
- C. Delta-v is independent of exhaust velocity  
  _Rationale:_ Delta-v depends directly on exhaust velocity.
- D. Specific impulse has no effect on performance  
  _Rationale:_ Specific impulse strongly affects performance.

**MST-2173-Q0003** (single-answer, Select ONE) Why do launch vehicles often use multiple stages?

- A. Dropping empty stages sheds dead mass, improving overall performance **(key)**  
  _Rationale:_ Correct: staging discards spent structure to boost efficiency.
- B. Because more stages always cost less money  
  _Rationale:_ Staging adds complexity and cost; the benefit is performance.
- C. Because single stages cannot carry fuel  
  _Rationale:_ Single stages carry fuel; staging improves mass efficiency.
- D. Because stages make the rocket lighter at liftoff  
  _Rationale:_ Liftoff mass is not reduced by staging; dead mass is shed in flight.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
