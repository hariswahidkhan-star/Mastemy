# Statistical Process Control

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1794` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify. Sources: MASTEMY-DESIGN (internal course design; no external syllabus) |
| Legacy IDs | MST-ENG-SK-SPC-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Statistical Process Control (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Variation and SPC basics
2. Data and distributions
3. Control charts for variables
4. Control charts for attributes
5. Process capability

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate calibrating gauges or running a live chart; hands-on practice belongs in a lab.

## Modules

### M01 Variation and SPC basics (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Classify variation as common or special cause; (2) Explain the danger of tampering
- Common misconception addressed: Reacting to every data point as if it were a special cause
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Common vs special cause variation | 96 | 8 |
| M01L02 | Why SPC works | 96 | 8 |

### M02 Data and distributions (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose a sampling plan for a measurement; (2) Relate sigma to the spread of data
- Common misconception addressed: Treating a small biased sample as representative
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Measurement data and sampling | 96 | 8 |
| M02L02 | The normal distribution and sigma | 96 | 8 |

### M03 Control charts for variables (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Compute control limits for an X-bar/R chart; (2) Apply run rules to detect a shift
- Common misconception addressed: Confusing control limits with specification limits
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | X-bar and R charts | 96 | 8 |
| M03L02 | Reading and acting on charts | 96 | 8 |

### M04 Control charts for attributes (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Select the correct attribute chart for data; (2) Interpret an out-of-control attribute point
- Common misconception addressed: Using a variables chart for count data
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | p, np, c and u charts | 96 | 8 |
| M04L02 | Choosing the right chart | 96 | 8 |

### M05 Process capability (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Compute Cp and Cpk for a process; (2) Explain why a process can be in control but not capable
- Common misconception addressed: Assuming an in-control process must also meet specification
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Cp and Cpk | 96 | 8 |
| M05L02 | Capability vs control | 96 | 8 |

## Integrative case

A machined-part process produces occasional out-of-spec parts. The learner must separate common from special cause, pick a sampling and charting approach, compute and read control charts, choose attribute charts where needed, and assess capability with Cp and Cpk, then recommend whether to adjust the process or the specification.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1794-final-protected | 25 | 25 | yes |
| MST-1794-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Variation and SPC basics | 5 |
| Data and distributions | 5 |
| Control charts for variables | 5 |
| Control charts for attributes | 5 |
| Process capability | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1794-Q0001** (single-answer, Select ONE) Common-cause variation is:

- A. The natural, inherent variation of a stable process **(key)**  
  _Rationale:_ Correct: common cause is the background variation present when only chance acts.
- B. A one-off disturbance from an assignable source  
  _Rationale:_ That is special-cause variation.
- C. Always a sign the process is broken  
  _Rationale:_ Common cause is normal, not a fault.
- D. Caused only by operator mistakes  
  _Rationale:_ Common cause is inherent, not blamed on operators.

**MST-1794-Q0002** (multiple-answer, Select TWO) Which TWO statements about Cpk are correct? (Select TWO.)

- A. Cpk accounts for how centred the process is within the specification **(key)**  
  _Rationale:_ Correct: Cpk reflects both spread and centring.
- B. A higher Cpk means more output falls within specification **(key)**  
  _Rationale:_ Correct: larger Cpk indicates greater capability.
- C. Cpk measures whether the process is in statistical control  
  _Rationale:_ Control is assessed by charts, not Cpk.
- D. Cpk and the specification limits are the same thing  
  _Rationale:_ Cpk is a ratio using the limits, not the limits themselves.

**MST-1794-Q0003** (single-answer, Select ONE) Control limits on a chart are:

- A. Calculated from the process data to show expected variation **(key)**  
  _Rationale:_ Correct: control limits come from the process itself, unlike specification limits.
- B. Set by the customer's tolerance requirements  
  _Rationale:_ Those are specification limits, not control limits.
- C. Always exactly equal to the specification limits  
  _Rationale:_ Control and specification limits are independent.
- D. Chosen arbitrarily by the operator  
  _Rationale:_ Control limits are computed, not guessed.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
