# AI for Drug Discovery

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1981` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — AI for Drug Discovery (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the drug-discovery pipeline and where AI is applied
2. Explain molecular representations and property prediction
3. Describe virtual screening and generative molecular design
4. Explain protein structure prediction and its uses
5. Evaluate models with appropriate data splits and metrics
6. Reason about validation, bias and the limits of in silico results

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 The pipeline and AI's role (25% (Mastemy design weight), design weight)

- Worked applications: (1) Map AI methods onto the stages of the pipeline; (2) Decide whether a problem needs machine learning or a simpler rule
- Common misconception addressed: Believing AI replaces experimental validation in drug discovery
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The drug-discovery pipeline end to end | 120 | 7 |
| M01L02 | Where machine learning adds value and where it does not | 120 | 7 |

### M02 Molecular representation and prediction (25% (Mastemy design weight), design weight)

- Worked applications: (1) Convert a small molecule between a SMILES string and a graph description; (2) Choose features for a solubility-prediction task
- Common misconception addressed: Assuming a high training accuracy means a useful model
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Molecular representations: SMILES, graphs and fingerprints | 120 | 7 |
| M02L02 | Property and activity prediction with machine learning | 120 | 7 |

### M03 Screening and design (25% (Mastemy design weight), design weight)

- Worked applications: (1) Rank docking hits and state the caveats; (2) Critique a generative model that proposes unstable molecules
- Common misconception addressed: Trusting generated molecules without synthesizability or safety checks
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Virtual screening and docking | 120 | 7 |
| M03L02 | Generative design of candidate molecules | 120 | 7 |

### M04 Structure and evaluation (25% (Mastemy design weight), design weight)

- Worked applications: (1) Choose a scaffold split instead of a random split and justify it; (2) Detect data leakage in a described activity-prediction study
- Common misconception addressed: Using random splits that leak near-duplicate molecules across train and test
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Protein structure prediction and its uses | 120 | 7 |
| M04L02 | Evaluation, validation and avoiding leakage | 120 | 7 |

## Integrative case

A discovery team wants to prioritise compounds for synthesis using machine learning on assay data: design the representation, model and evaluation so the ranking is honest, and state clearly what in silico results can and cannot establish without wet-lab confirmation.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1981-final-protected | 40 | 40 | yes |
| MST-1981-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The pipeline and AI's role | 10 |
| Molecular representation and prediction | 10 |
| Screening and design | 10 |
| Structure and evaluation | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1981-Q0001** (single-answer, Select ONE) Why is a scaffold split often preferred over a random split when evaluating a molecular-property model?

- A. It reduces leakage of near-identical molecules between train and test **(key)**  
  _Rationale:_ Correct: scaffold splits test generalisation to novel chemistry.
- B. It guarantees a higher test score  
  _Rationale:_ It usually lowers, and more honestly estimates, performance.
- C. It removes the need for a test set  
  _Rationale:_ A separate test set is still required.
- D. It makes the dataset larger  
  _Rationale:_ Splitting does not add any data.

**MST-1981-Q0002** (multiple-answer, Select TWO) Which TWO are common ways to represent a molecule for machine learning? (Select TWO.)

- A. SMILES strings **(key)**  
  _Rationale:_ Correct: SMILES encode molecular structure as text.
- B. Molecular graphs with atoms as nodes and bonds as edges **(key)**  
  _Rationale:_ Correct: graphs capture connectivity for graph models.
- C. A single molecular-weight number only  
  _Rationale:_ One scalar discards most structural information.
- D. The compound's catalogue price  
  _Rationale:_ Price is not a structural representation.

**MST-1981-Q0003** (single-answer, Select ONE) An in silico model ranks a compound as highly active. What is the responsible interpretation?

- A. It is a hypothesis to be confirmed experimentally, not an established result **(key)**  
  _Rationale:_ Correct: computational predictions require wet-lab validation.
- B. The compound is proven to be an effective drug  
  _Rationale:_ No efficacy is established in silico.
- C. No further testing is needed  
  _Rationale:_ Experimental confirmation is essential.
- D. The output is a clinical recommendation  
  _Rationale:_ It is not medical advice or a clinical claim.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
