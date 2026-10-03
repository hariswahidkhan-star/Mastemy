# Bioinformatics Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1979` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Bioinformatics Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe common biological data types and file formats
2. Perform sequence alignment and interpret similarity scores
3. Use databases and search tools to annotate sequences
4. Explain phylogenetic inference from molecular data
5. Apply basic scripting and statistics to biological datasets
6. Reason about reproducibility and data quality in bioinformatics workflows

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Biological data and formats (25% (Mastemy design weight), design weight)

- Worked applications: (1) Parse a FASTA or FASTQ record into its component fields; (2) Choose the right database for a protein versus a nucleotide query
- Common misconception addressed: Assuming every sequence file uses the same format
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Sequences, annotations and common file formats | 120 | 7 |
| M01L02 | Databases and biological data retrieval | 120 | 7 |

### M02 Sequence alignment (25% (Mastemy design weight), design weight)

- Worked applications: (1) Score a short pairwise alignment with a given scheme; (2) Interpret a BLAST e-value and bit score
- Common misconception addressed: Reading a low e-value as proof of biological function
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Pairwise alignment and scoring | 120 | 7 |
| M02L02 | Multiple sequence alignment and BLAST searches | 120 | 7 |

### M03 Phylogenetics and annotation (25% (Mastemy design weight), design weight)

- Worked applications: (1) Read a phylogenetic tree and identify sister taxa; (2) Map ontology terms onto an annotated gene list
- Common misconception addressed: Treating a tree's branch lengths as exact divergence times
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Phylogenetic tree inference | 120 | 7 |
| M03L02 | Functional annotation and ontologies | 120 | 7 |

### M04 Workflows and reproducibility (25% (Mastemy design weight), design weight)

- Worked applications: (1) Write a short script to summarise read-quality metrics; (2) Flag a non-reproducible step in a described pipeline
- Common misconception addressed: Assuming a result is correct because the tool ran without an error
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Scripting and statistics for biological data | 120 | 7 |
| M04L02 | Reproducible pipelines and data quality | 120 | 7 |

## Integrative case

A researcher receives raw sequencing reads and a gene of interest: design a reproducible workflow from quality control through alignment, search and annotation, and justify each tool choice and quality check.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1979-final-protected | 40 | 40 | yes |
| MST-1979-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Biological data and formats | 10 |
| Sequence alignment | 10 |
| Phylogenetics and annotation | 10 |
| Workflows and reproducibility | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1979-Q0001** (single-answer, Select ONE) In a BLAST search, what does a very small e-value indicate?

- A. The match is unlikely to have occurred by chance at that score **(key)**  
  _Rationale:_ Correct: a low e-value means few such matches are expected by chance.
- B. The two sequences are functionally identical  
  _Rationale:_ Statistical significance is not proof of shared function.
- C. The alignment used no scoring matrix  
  _Rationale:_ A scoring matrix is always used.
- D. The query sequence is of low quality  
  _Rationale:_ The e-value reflects match significance, not input quality.

**MST-1979-Q0002** (multiple-answer, Select TWO) Which TWO are common file formats for sequence data in bioinformatics? (Select TWO.)

- A. FASTA **(key)**  
  _Rationale:_ Correct: FASTA stores sequences with header lines.
- B. FASTQ **(key)**  
  _Rationale:_ Correct: FASTQ stores sequences with per-base quality scores.
- C. MP3  
  _Rationale:_ MP3 is an audio format, not sequence data.
- D. DOCX  
  _Rationale:_ DOCX is a word-processing format, not sequence data.

**MST-1979-Q0003** (single-answer, Select ONE) Which practice most improves the reproducibility of a bioinformatics analysis?

- A. Recording tool versions and parameters in a scripted pipeline **(key)**  
  _Rationale:_ Correct: captured versions and scripted steps let others reproduce the result.
- B. Running every step manually and not writing them down  
  _Rationale:_ Undocumented manual steps are hard to reproduce.
- C. Using default settings without noting them  
  _Rationale:_ Unrecorded defaults still hinder reproduction.
- D. Deleting intermediate files immediately  
  _Rationale:_ Removing provenance harms reproducibility.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
