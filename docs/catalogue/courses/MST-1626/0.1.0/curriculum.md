# Healthcare Data Analytics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1626` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-DAT-SK-HDA-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe common healthcare data types and their sources
2. Navigate coding systems and interoperability standards at a conceptual level
3. Analyse quality, utilisation and outcome measures
4. Apply privacy, consent and de-identification principles
5. Interpret healthcare analyses with appropriate caution

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Healthcare data landscape (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose the right data source for three analytic questions; (2) Identify why claims data can misrepresent clinical events
- Common misconception addressed: Assuming EHR data is complete and clean
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | EHR, claims, registries and device data | 96 | 8 |
| M01L02 | Strengths and limitations of each source | 96 | 8 |

### M02 Coding and standards (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map a described diagnosis to the type of code that would represent it; (2) Explain why two systems may record the same condition differently
- Common misconception addressed: Treating a diagnosis code as a precise clinical truth
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | ICD, CPT and terminology systems (conceptual) | 96 | 8 |
| M02L02 | Interoperability standards such as HL7 and FHIR (conceptual) | 96 | 8 |

### M03 Quality and outcome measures (MASTEMY-DESIGN 20%)

- Worked applications: (1) Interpret a readmission-rate measure and its denominator; (2) Explain why risk adjustment is needed before comparing hospitals
- Common misconception addressed: Comparing raw outcome rates without risk adjustment
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Utilisation, readmission and quality measures | 96 | 8 |
| M03L02 | Risk adjustment and benchmarking | 96 | 8 |

### M04 Privacy and ethics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide what fields to remove to de-identify a sample extract; (2) Judge whether a proposed data use meets a minimum-necessary test
- Common misconception addressed: Believing removing the name alone makes a record anonymous
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Privacy, consent and minimum necessary | 96 | 8 |
| M04L02 | De-identification and safe data handling | 96 | 8 |

### M05 Interpreting with caution (MASTEMY-DESIGN 20%)

- Worked applications: (1) Spot a confounder in a 'treatment vs outcome' observational finding; (2) Rewrite an overstated conclusion into a cautious, accurate one
- Common misconception addressed: Reading an association in observational data as proof of a treatment effect
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Confounding and bias in observational data | 96 | 8 |
| M05L02 | Communicating findings responsibly to clinicians | 96 | 8 |

## Integrative case

An analyst is asked whether a care-management programme reduced readmissions. Choose the right data sources, apply risk adjustment before comparing groups, check for confounding in the observational design, de-identify the extract appropriately, and report the finding to clinicians with honest caveats.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1626-final-protected | 25 | 25 | yes |
| MST-1626-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Healthcare data landscape | 5 |
| Coding and standards | 5 |
| Quality and outcome measures | 5 |
| Privacy and ethics | 5 |
| Interpreting with caution | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1626-Q0001** (single-answer, Select ONE) Why is risk adjustment applied before comparing hospital outcome rates?

- A. Hospitals treat different patient mixes, so raw rates are not comparable **(key)**  
  _Rationale:_ Correct: risk adjustment accounts for differing patient severity.
- B. It makes all hospitals look the same  
  _Rationale:_ It controls for case mix, not to equalise results artificially.
- C. It is only a billing requirement  
  _Rationale:_ It is an analytic necessity for fair comparison.
- D. Raw rates are always comparable  
  _Rationale:_ Raw rates ignore patient-mix differences.

**MST-1626-Q0002** (multiple-answer, Select TWO) Which TWO are required to responsibly de-identify a patient dataset? (Select TWO.)

- A. Remove or generalise identifiers beyond just the name, including dates and small geographies **(key)**  
  _Rationale:_ Correct: many quasi-identifiers can re-identify a person.
- B. Limit the data to the minimum necessary for the purpose **(key)**  
  _Rationale:_ Correct: minimum-necessary reduces exposure risk.
- C. Keep full dates of birth because they are not names  
  _Rationale:_ Full dates are strong quasi-identifiers and must be handled.
- D. Share the raw record widely to speed analysis  
  _Rationale:_ Wide sharing of raw records violates privacy principles.

**MST-1626-Q0003** (single-answer, Select ONE) An observational analysis shows patients on a drug had better outcomes. What is the safest interpretation?

- A. The association may be confounded; it does not prove the drug caused the outcome **(key)**  
  _Rationale:_ Correct: observational associations can be driven by confounders.
- B. The drug definitely caused the better outcomes  
  _Rationale:_ Observational data cannot establish causation on its own.
- C. The drug is harmful  
  _Rationale:_ That contradicts the observed association and is unsupported.
- D. No further analysis is ever needed  
  _Rationale:_ Confounding must be investigated before any causal claim.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
