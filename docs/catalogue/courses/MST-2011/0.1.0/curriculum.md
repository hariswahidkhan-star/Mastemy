# Cheminformatics: Molecular Representations, Databases and AI Workflows

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2011` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Cheminformatics: Molecular Representations, Databases and AI Workflows (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Represent molecules with SMILES, InChI and fingerprints
2. Compute and interpret molecular descriptors
3. Query and curate chemical databases
4. Assess data quality, standardisation and duplicates
5. Measure molecular similarity and perform clustering
6. Build reproducible AI-ready cheminformatics workflows

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Molecular representations (17% (design weight), design weight)

- Worked applications: (1) Convert between a structure and its SMILES string; (2) Generate a fingerprint for a given molecule
- Common misconception addressed: Assuming one molecule has only a single valid SMILES
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | SMILES and InChI notation | 81 | 5 |
| M01L02 | Fingerprints and structure keys | 82 | 5 |

### M02 Descriptors (17% (design weight), design weight)

- Worked applications: (1) Compute logP-type descriptors for a molecule set; (2) Explain why correlated descriptors cause problems
- Common misconception addressed: Treating every descriptor as independent of the others
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Physicochemical descriptors | 81 | 5 |
| M02L02 | Interpreting descriptor spaces | 82 | 5 |

### M03 Chemical databases (17% (design weight), design weight)

- Worked applications: (1) Build a substructure query against a database; (2) Retrieve analogues of a seed compound
- Common misconception addressed: Equating an exact-match search with a substructure search
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Public chemical databases | 81 | 5 |
| M03L02 | Querying and retrieving structures | 82 | 5 |

### M04 Data curation (17% (design weight), design weight)

- Worked applications: (1) Standardise salts and tautomers in a data set; (2) Detect and remove duplicate structures
- Common misconception addressed: Keeping charged and neutral forms as distinct molecules
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Standardisation and normalisation | 81 | 5 |
| M04L02 | Duplicates, salts and tautomers | 82 | 5 |

### M05 Similarity and clustering (16% (design weight), design weight)

- Worked applications: (1) Compute Tanimoto similarity between two molecules; (2) Cluster a library and pick a diverse subset
- Common misconception addressed: Reading a high similarity score as structural identity
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Similarity metrics and the Tanimoto coefficient | 77 | 5 |
| M05L02 | Clustering and diversity selection | 77 | 5 |

### M06 AI-ready workflows (16% (design weight), design weight)

- Worked applications: (1) Design a leakage-free train/test split by scaffold; (2) Make a featurisation pipeline reproducible
- Common misconception addressed: Splitting data randomly so near-duplicates cross the split
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Featurisation pipelines for models | 77 | 5 |
| M06L02 | Reproducibility and data leakage control | 77 | 5 |

## Integrative case

A discovery-informatics trainee prepares a screening library: they must standardise structures and compute descriptors and similarity by hand, curate duplicates and salts, then build a reproducible featurisation pipeline with a scaffold split that avoids data leakage into the model.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2011-final-protected | 40 | 40 | yes |
| MST-2011-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Molecular representations | 7 |
| Descriptors | 7 |
| Chemical databases | 7 |
| Data curation | 7 |
| Similarity and clustering | 6 |
| AI-ready workflows | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2011-Q0001** (single-answer, Select ONE) Why can the same molecule be written as several different valid SMILES strings?

- A. SMILES depends on the chosen starting atom and traversal order, so canonicalisation is needed **(key)**  
  _Rationale:_ Correct: canonical SMILES gives one standard string per molecule.
- B. SMILES strings are always unique for each molecule  
  _Rationale:_ Non-canonical SMILES are not unique.
- C. Because the molecule changes structure each time  
  _Rationale:_ The structure is unchanged; only the string representation differs.
- D. Because SMILES encodes three-dimensional coordinates  
  _Rationale:_ SMILES encodes connectivity, not 3D coordinates.

**MST-2011-Q0002** (multiple-answer, Select TWO) Which TWO steps help prevent data leakage in a cheminformatics model? (Select TWO.)

- A. Splitting train and test sets by molecular scaffold **(key)**  
  _Rationale:_ Correct: scaffold splits keep near-duplicates out of both sets.
- B. Removing duplicate structures before splitting **(key)**  
  _Rationale:_ Correct: duplicates across splits leak information.
- C. Tuning hyperparameters on the test set  
  _Rationale:_ That leaks test information into training.
- D. Random splitting of highly similar analogues  
  _Rationale:_ Random splits let near-duplicates cross the boundary.

**MST-2011-Q0003** (single-answer, Select ONE) What does a Tanimoto coefficient of 0.9 between two fingerprints indicate?

- A. The molecules are highly similar by that fingerprint, though not necessarily identical **(key)**  
  _Rationale:_ Correct: high similarity is not proof of the same structure.
- B. The molecules are definitely the same compound  
  _Rationale:_ High similarity does not guarantee identity.
- C. The molecules share no features  
  _Rationale:_ A high value indicates many shared features.
- D. The value is invalid because it exceeds 0.5  
  _Rationale:_ Tanimoto values range from 0 to 1; 0.9 is valid.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
