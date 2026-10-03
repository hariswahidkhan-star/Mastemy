# ADAS and Autonomous Driving Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2401` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | curriculum specification (design assumption, see course package); no official syllabus exists for this general professional-skills course |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — ADAS and Autonomous Driving Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the SAE levels of driving automation and their boundaries
2. Describe the sensors used for perception and their strengths and limits
3. Explain sensor fusion, localisation and the role of maps
4. Summarise common ADAS features and how they operate
5. Describe decision, planning and control in an automated driving stack
6. Discuss safety, validation and human-factors considerations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Automation levels (20% (design weight), design weight)

- Worked applications: (1) Classify a described feature set as Level 2 or Level 3; (2) Define an operational design domain for a highway pilot
- Common misconception addressed: A Level 2 system means the driver can stop paying attention
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | SAE levels 0-5 | 48 | 3 |
| M01L02 | ODD concept | 48 | 3 |
| M01L03 | Driver monitoring | 48 | 3 |
| M01L04 | Responsibility and handover | 48 | 3 |

### M02 Perception sensors (20% (design weight), design weight)

- Worked applications: (1) Match a weather condition to the sensor most degraded by it; (2) Explain why radar complements a camera
- Common misconception addressed: A single camera alone is sufficient for all driving conditions
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Camera | 48 | 3 |
| M02L02 | Radar | 48 | 3 |
| M02L03 | Lidar | 48 | 3 |
| M02L04 | Ultrasonic and sensor limits | 48 | 3 |

### M03 Fusion and localisation (20% (design weight), design weight)

- Worked applications: (1) Explain why fusing radar and camera improves object detection; (2) Describe how localisation uses an HD map
- Common misconception addressed: Sensor fusion is just averaging all sensors blindly
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Sensor fusion | 48 | 3 |
| M03L02 | Localisation | 48 | 3 |
| M03L03 | HD maps | 48 | 3 |
| M03L04 | Object tracking | 48 | 3 |

### M04 ADAS features (20% (design weight), design weight)

- Worked applications: (1) Trace how adaptive cruise control maintains a gap; (2) Explain when automatic emergency braking should intervene
- Common misconception addressed: Lane keeping and lane centring are identical features
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Adaptive cruise control | 48 | 3 |
| M04L02 | Lane keeping | 48 | 3 |
| M04L03 | Automatic emergency braking | 48 | 3 |
| M04L04 | Parking assist | 48 | 3 |

### M05 Decision and safety (20% (design weight), design weight)

- Worked applications: (1) Order the perception-plan-act stages of an automated manoeuvre; (2) Explain why scenario-based testing is needed for validation
- Common misconception addressed: If a system passes a short road test it is proven safe for all conditions
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Planning and control | 48 | 3 |
| M05L02 | Behaviour prediction | 48 | 3 |
| M05L03 | Safety and validation | 48 | 3 |
| M05L04 | Human factors | 48 | 3 |

## Integrative case

A product team scopes a highway driver-assistance feature: they must define its operational design domain and SAE level, choose a sensor suite, specify driver-monitoring and handover behaviour, and outline a validation approach.

## Cumulative assessment

Form length basis: 40-item knowledge form (1 minute per item) across automation levels, sensors, fusion, ADAS features and safety

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2401-final-protected | 40 | 40 | yes |
| MST-2401-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Automation levels | 8 |
| Perception sensors | 8 |
| Fusion and localisation | 8 |
| ADAS features | 8 |
| Decision and safety | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2401-Q0001** (single-answer, Select ONE) Under the SAE levels of driving automation, what is the key distinction of Level 3 compared with Level 2?

- A. At Level 3 no driver is ever required in the vehicle  
  _Rationale:_ That describes higher levels; Level 3 still relies on a fallback-ready user.
- B. At Level 3 the system performs the full driving task within its ODD and the driver need not monitor continuously, but must take over when requested **(key)**  
  _Rationale:_ Level 3 is conditional automation: within its ODD the driver can disengage from monitoring but must resume control on a takeover request.
- C. Level 3 and Level 2 are identical in required driver attention  
  _Rationale:_ They differ precisely in monitoring requirements.
- D. Level 3 removes all sensors from the vehicle  
  _Rationale:_ Higher automation requires more capable sensing, not none.

**MST-2401-Q0002** (single-answer, Select ONE) Why is radar often fused with cameras in ADAS perception?

- A. Radar provides high-resolution colour images  
  _Rationale:_ Radar does not provide colour or high spatial resolution; cameras do.
- B. Radar measures range and closing speed robustly in poor visibility, complementing the camera's rich but weather-sensitive imagery **(key)**  
  _Rationale:_ Radar's direct range and velocity sensing in rain, fog and darkness complements the camera's detailed but light-dependent data.
- C. Radar is only used for infotainment  
  _Rationale:_ Radar is a perception sensor, not an entertainment feature.
- D. Cameras cannot detect anything at all  
  _Rationale:_ Cameras are highly capable; fusion combines complementary strengths.

**MST-2401-Q0003** (multiple-answer, Select TWO) A validation lead reviews an ADAS feature before release. Select TWO limitations that are important to communicate honestly about a Level 2 system.

- A. The driver remains responsible and must supervise continuously **(key)**  
  _Rationale:_ Level 2 requires constant driver supervision; this must be made clear.
- B. Performance can degrade outside the defined operational design domain **(key)**  
  _Rationale:_ Behaviour is only assured within the ODD, so limits must be stated honestly.
- C. The system is fully autonomous and needs no driver  
  _Rationale:_ That is false for Level 2 and dangerous to imply.
- D. The system has been proven safe in every possible scenario  
  _Rationale:_ No finite test campaign proves safety in every scenario.
- E. Sensors work identically in all weather and lighting  
  _Rationale:_ Sensor performance varies with conditions, so this claim is false.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
