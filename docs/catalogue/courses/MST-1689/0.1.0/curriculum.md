# SD-WAN Concepts

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1689` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-SWC-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — SD-WAN Concepts (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain what SD-WAN is and the problems it solves
2. Compare SD-WAN with traditional WAN and MPLS
3. Describe SD-WAN architecture and the control/data plane split
4. Explain application-aware routing and transport independence
5. Describe SD-WAN security and management considerations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 SD-WAN foundations (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Explain SD-WAN benefits to a non-technical stakeholder; (2) Identify a scenario where SD-WAN helps
- Common misconception addressed: Thinking SD-WAN is just a faster internet connection
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What SD-WAN is and the problems it solves | 72 | 6 |
| M01L02 | Business drivers for SD-WAN | 72 | 6 |

### M02 SD-WAN vs traditional WAN (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Compare cost and flexibility of MPLS vs SD-WAN; (2) Decide where MPLS still has a role
- Common misconception addressed: Assuming SD-WAN always replaces MPLS entirely
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Traditional WAN and MPLS basics | 72 | 6 |
| M02L02 | How SD-WAN changes the model | 72 | 6 |

### M03 Architecture (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Label the components of an SD-WAN architecture; (2) Explain the control/data plane separation
- Common misconception addressed: Confusing the overlay network with the underlying transport
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Control plane, data plane and orchestration | 72 | 6 |
| M03L02 | Edge devices and overlay tunnels | 72 | 6 |

### M04 Application-aware routing (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Write a policy to prioritise voice over bulk traffic; (2) Choose a path based on link quality metrics
- Common misconception addressed: Believing all traffic should always take the cheapest link
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Transport independence and path selection | 72 | 6 |
| M04L02 | Application-aware policies and QoS | 72 | 6 |

### M05 Security and management (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Decide where to apply security for local breakout; (2) Use central management to push a policy change
- Common misconception addressed: Enabling local internet breakout without added security
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Securing direct internet breakout | 72 | 6 |
| M05L02 | Centralised management and monitoring | 72 | 6 |

## Integrative case

A retail chain runs expensive MPLS links to every store and suffers poor video-conferencing quality. Evaluate SD-WAN: explain how it differs from the current WAN, design an architecture using mixed transports, apply application-aware policies to prioritise traffic, and address the security of direct internet breakout.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1689-final-protected | 25 | 25 | yes |
| MST-1689-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| SD-WAN foundations | 5 |
| SD-WAN vs traditional WAN | 5 |
| Architecture | 5 |
| Application-aware routing | 5 |
| Security and management | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1689-Q0001** (single-answer, Select ONE) What problem does SD-WAN primarily address compared with traditional MPLS-only WANs?

- A. Rigid, costly transport and no application-aware path selection **(key)**  
  _Rationale:_ Correct: SD-WAN adds transport flexibility and application-aware routing.
- B. The need for any physical connectivity at all  
  _Rationale:_ SD-WAN still relies on underlying transports.
- C. The existence of IP addressing  
  _Rationale:_ SD-WAN does not remove IP addressing.
- D. The need for any security controls  
  _Rationale:_ SD-WAN increases, not removes, the need for security.

**MST-1689-Q0002** (multiple-answer, Select TWO) Which TWO are characteristics of SD-WAN architecture? (Select TWO.)

- A. Separation of the control plane from the data plane **(key)**  
  _Rationale:_ Correct: centralised control is decoupled from forwarding.
- B. An overlay that runs over multiple transport types **(key)**  
  _Rationale:_ Correct: SD-WAN overlays tunnels across mixed transports.
- C. A single fixed MPLS circuit per site only  
  _Rationale:_ SD-WAN is transport-independent, not MPLS-only.
- D. No central orchestration or policy  
  _Rationale:_ Centralised orchestration is a core feature.

**MST-1689-Q0003** (single-answer, Select ONE) Why is application-aware routing valuable in SD-WAN?

- A. It steers each application over the best-performing available path **(key)**  
  _Rationale:_ Correct: policies match traffic to the path that meets its needs.
- B. It forces all traffic onto one link regardless of quality  
  _Rationale:_ That defeats the purpose of path selection.
- C. It disables monitoring of link quality  
  _Rationale:_ It depends on monitoring link quality.
- D. It removes the need for any policy  
  _Rationale:_ It is driven by application policies.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
