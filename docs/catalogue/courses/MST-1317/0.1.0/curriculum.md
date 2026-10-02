# Dimensionality Reduction (PCA, t-SNE, UMAP)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1317` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Explain why dimensionality reduction is useful
2. Describe how PCA finds principal components
3. Interpret explained variance and component meaning
4. Explain what t-SNE and UMAP are for and their limits
5. Choose an appropriate technique and read its output responsibly

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Why reduce dimensions (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain one problem high dimensions cause; (2) Match a goal to reduction use
- Common misconception addressed: Assuming more features is always better
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The curse of dimensionality | 96 | 8 |
| M01L02 | Goals: compression and visualisation | 96 | 8 |

### M02 PCA mechanics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Describe what the first component captures; (2) Explain orthogonality of components
- Common misconception addressed: Thinking PCA components are original features
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Variance and principal components | 96 | 8 |
| M02L02 | Eigen-directions intuition | 96 | 8 |

### M03 Interpreting PCA (MASTEMY-DESIGN 20%)

- Worked applications: (1) Read a scree plot; (2) Pick components for 90% variance
- Common misconception addressed: Keeping components that explain little variance
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Explained variance ratio | 96 | 8 |
| M03L02 | Choosing the number of components | 96 | 8 |

### M04 Nonlinear methods (MASTEMY-DESIGN 20%)

- Worked applications: (1) State what t-SNE preserves and not; (2) Contrast UMAP with t-SNE
- Common misconception addressed: Reading cluster sizes and distances in t-SNE literally
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | t-SNE for visualisation | 96 | 8 |
| M04L02 | UMAP and its trade-offs | 96 | 8 |

### M05 Choosing a method (MASTEMY-DESIGN 20%)

- Worked applications: (1) Pick PCA or UMAP for a goal; (2) Caveat a 2-D embedding honestly
- Common misconception addressed: Treating a 2-D plot as the full truth
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Linear versus nonlinear | 96 | 8 |
| M05L02 | Responsible interpretation | 96 | 8 |

## Integrative case

An analyst has 200 features and wants to both speed up a model and visualise the data. Recommend techniques for each goal, explain how to choose components, and caution how to read a 2-D embedding.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1317-final-protected | 25 | 25 | yes |
| MST-1317-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why reduce dimensions | 5 |
| PCA mechanics | 5 |
| Interpreting PCA | 5 |
| Nonlinear methods | 5 |
| Choosing a method | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1317-Q0001** (single-answer, Select ONE) What does the first principal component in PCA capture?

- A. The direction of greatest variance in the data **(key)**  
  _Rationale:_ Correct: PC1 is the maximum-variance direction.
- B. The least important original feature  
  _Rationale:_ Components are not single original features.
- C. A random axis in the data  
  _Rationale:_ Components are chosen to maximise variance, not randomly.
- D. The target label values  
  _Rationale:_ PCA is unsupervised and ignores labels.

**MST-1317-Q0002** (multiple-answer, Select TWO) Which TWO cautions apply when reading a t-SNE plot? (Select TWO.)

- A. Distances between clusters may not be meaningful **(key)**  
  _Rationale:_ Correct: t-SNE does not preserve global distances well.
- B. Cluster sizes can be distorted by the method **(key)**  
  _Rationale:_ Correct: apparent sizes are not reliable.
- C. The axes have fixed real-world units  
  _Rationale:_ t-SNE axes have no inherent units.
- D. It always preserves exact global geometry  
  _Rationale:_ Global geometry is not preserved.

**MST-1317-Q0003** (single-answer, Select ONE) How should you choose the number of PCA components to keep?

- A. Keep enough to explain a target share of total variance **(key)**  
  _Rationale:_ Correct: explained-variance thresholds guide the choice.
- B. Always keep exactly two components  
  _Rationale:_ Two is only for 2-D plotting, not a general rule.
- C. Keep the components explaining the least variance  
  _Rationale:_ Low-variance components are usually dropped.
- D. Keep as many as there are rows  
  _Rationale:_ That defeats the purpose of reduction.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
