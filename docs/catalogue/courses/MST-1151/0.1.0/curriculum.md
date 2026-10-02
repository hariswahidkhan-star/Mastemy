# BIM Coordination and Information Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1151` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Explain BIM concepts, maturity and common information-management standards
2. Describe roles, responsibilities and the common data environment
3. Plan information delivery against requirements and milestones
4. Run model federation and clash coordination workflows
5. Manage information quality, handover and asset information

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 BIM foundations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Place three project scenarios on a BIM maturity scale; (2) Match an information-management standard to its purpose
- Common misconception addressed: Treating BIM as only 3D modelling rather than managed information
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | BIM concepts and maturity | 96 | 8 |
| M01L02 | Information-management standards | 96 | 8 |

### M02 Roles and the CDE (MASTEMY-DESIGN 20%)

- Worked applications: (1) Assign responsibilities to the parties in an information-delivery chain; (2) Move a file through the CDE states from work-in-progress to published
- Common misconception addressed: Assuming any shared folder is automatically a compliant CDE
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Roles and responsibilities | 96 | 8 |
| M02L02 | The common data environment and states | 96 | 8 |

### M03 Planning information delivery (MASTEMY-DESIGN 20%)

- Worked applications: (1) Translate client requirements into an information-delivery plan; (2) Map model deliverables to project milestones
- Common misconception addressed: Modelling detail far beyond what the information requirements ask for
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Information requirements and the BEP | 96 | 8 |
| M03L02 | Delivery milestones and the MIDP | 96 | 8 |

### M04 Model federation and clash coordination (MASTEMY-DESIGN 20%)

- Worked applications: (1) Federate architecture, structure and services models for review; (2) Triage a clash report into real clashes and tolerable ones
- Common misconception addressed: Treating every reported geometric clash as an equally urgent defect
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Federating discipline models | 96 | 8 |
| M04L02 | Clash detection and resolution | 96 | 8 |

### M05 Quality, handover and assets (MASTEMY-DESIGN 20%)

- Worked applications: (1) Run a model-quality check against naming and classification rules; (2) Prepare asset data for handover into an operations system
- Common misconception addressed: Delivering a rich model with no structured data the client can actually use
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Information quality checks | 96 | 8 |
| M05L02 | Handover and asset information | 96 | 8 |

## Integrative case

An information manager sets up coordination for a multi-discipline building project. Define the information requirements, structure the common data environment, run a clash-detection and coordination cycle, and prepare the information for handover so the client receives a usable asset information model.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1151-final-protected | 25 | 25 | yes |
| MST-1151-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| BIM foundations | 5 |
| Roles and the CDE | 5 |
| Planning information delivery | 5 |
| Model federation and clash coordination | 5 |
| Quality, handover and assets | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1151-Q0001** (single-answer, Select ONE) A clash-detection run returns 4,000 geometric clashes between services and structure. What is the most effective first coordination step?

- A. Triage and group the clashes, filtering out tolerances and duplicates to find the real issues  **(key)**  
  _Rationale:_ Correct: grouping and filtering turns a raw clash count into a manageable set of genuine coordination problems.
- B. Issue all 4,000 clashes to the design team as individual defects  
  _Rationale:_ Most raw clashes are duplicates or within tolerance; issuing all of them wastes effort.
- C. Ignore the report because 4,000 is clearly a software error  
  _Rationale:_ A high raw count is normal for a first run and should be triaged, not dismissed.
- D. Delete the services model to remove the clashes  
  _Rationale:_ Removing a discipline model defeats the purpose of coordination.

**MST-1151-Q0002** (multiple-answer, Select TWO) Which TWO are core functions of a common data environment? (Select TWO.)

- A. Managing information through defined states such as work-in-progress, shared and published  **(key)**  
  _Rationale:_ Correct: controlled states are central to how a CDE manages information.
- B. Providing a single source of approved project information  **(key)**  
  _Rationale:_ Correct: a CDE gives the team one trusted place for current information.
- C. Automatically generating the client's business case  
  _Rationale:_ A CDE manages information; it does not create the business case.
- D. Replacing the need for any information requirements  
  _Rationale:_ Requirements define what the CDE must deliver; they are still needed.

**MST-1151-Q0003** (single-answer, Select ONE) A client complains that although a detailed 3D model was delivered, the facilities team cannot use it to run maintenance. What was most likely missing?

- A. Structured asset information mapped to the client's operational needs  **(key)**  
  _Rationale:_ Correct: a model needs structured, requirement-driven data to be useful for operations.
- B. More geometric detail in the model  
  _Rationale:_ More geometry does not help operations without structured data.
- C. A larger file size  
  _Rationale:_ File size is not what makes a model operationally useful.
- D. Additional clash reports  
  _Rationale:_ Clash reports support coordination, not operational handover data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
