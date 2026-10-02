# Unsupervised Learning: Clustering and Dimensionality Reduction

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0437` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-ULC-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the goals and limits of unsupervised learning
2. Apply k-means and hierarchical clustering
3. Use density-based clustering where appropriate
4. Reduce dimensions with PCA and manifold methods
5. Evaluate cluster quality without labels
6. Interpret and communicate unsupervised results

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Unsupervised foundations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose a distance measure for mixed features; (2) Explain why scaling changes clustering results
- Common misconception addressed: Clustering unscaled features of different magnitudes
- Module check: 26 items / 26 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Goals, uses and feature scaling | 144 | 8 |
| M01L02 | Distance, similarity and the curse of dimensionality | 144 | 8 |

### M02 Partitional and hierarchical clustering (MASTEMY-DESIGN 20%)

- Worked applications: (1) Pick k with the elbow and silhouette; (2) Cut a dendrogram into sensible clusters
- Common misconception addressed: Assuming k-means finds non-spherical clusters
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | k-means and choosing k | 144 | 8 |
| M02L02 | Hierarchical clustering and dendrograms | 144 | 8 |

### M03 Density-based clustering (MASTEMY-DESIGN 20%)

- Worked applications: (1) Tune DBSCAN parameters for a dataset; (2) Decide between k-means and DBSCAN for a case
- Common misconception addressed: Expecting one global density setting to fit all regions
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | DBSCAN and noise | 144 | 8 |
| M03L02 | When density methods fit | 144 | 8 |

### M04 Dimensionality reduction (MASTEMY-DESIGN 20%)

- Worked applications: (1) Reduce features with PCA and keep variance; (2) Read a 2-D embedding critically
- Common misconception addressed: Reading t-SNE distances as faithful global geometry
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | PCA | 144 | 8 |
| M04L02 | t-SNE and UMAP for visualisation | 144 | 8 |

### M05 Evaluation and interpretation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Score clusters with silhouette and stability; (2) Describe segments to a business audience
- Common misconception addressed: Over-interpreting clusters that are not stable
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Internal validity measures | 144 | 8 |
| M05L02 | Communicating segments | 144 | 8 |

## Integrative case

Given an unlabelled customer dataset, segment it into meaningful groups: scale the features, choose a clustering method and number of clusters, reduce dimensions for visualisation, and defend whether the segments are real and useful rather than artefacts.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0437-final-protected | 25 | 25 | yes |
| MST-0437-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Unsupervised foundations | 5 |
| Partitional and hierarchical clustering | 5 |
| Density-based clustering | 5 |
| Dimensionality reduction | 5 |
| Evaluation and interpretation | 5 |

Minimum reviewed item bank: 462 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0437-Q0001** (single-answer, Select ONE) Why must features usually be scaled before k-means?

- A. k-means uses distances, so a large-magnitude feature would dominate **(key)**  
  _Rationale:_ Correct: unscaled features distort distance-based clustering.
- B. k-means cannot run on unscaled data  
  _Rationale:_ It runs, but gives distorted clusters.
- C. Scaling changes the number of clusters k  
  _Rationale:_ Scaling does not set k.
- D. Scaling guarantees spherical clusters  
  _Rationale:_ It does not change cluster shape assumptions.

**MST-0437-Q0002** (multiple-answer, Select TWO) Which TWO cautions apply when reading a t-SNE or UMAP 2-D plot? (Select TWO.)

- A. Distances between far-apart clusters are not meaningful **(key)**  
  _Rationale:_ Correct: these methods preserve local, not global, structure.
- B. Cluster sizes and densities in the plot can be distorted **(key)**  
  _Rationale:_ Correct: apparent size does not reflect true density.
- C. The axes have fixed, interpretable units  
  _Rationale:_ They do not; the axes are not interpretable.
- D. The embedding is deterministic regardless of settings  
  _Rationale:_ Results depend on parameters and initialisation.

**MST-0437-Q0003** (single-answer, Select ONE) A dataset has elongated, non-spherical clusters with noise. Which method fits best?

- A. DBSCAN, which finds arbitrary-shaped dense regions and marks noise **(key)**  
  _Rationale:_ Correct: density-based clustering handles shape and noise.
- B. k-means, because it is the default  
  _Rationale:_ k-means assumes roughly spherical clusters.
- C. PCA, because it clusters data  
  _Rationale:_ PCA reduces dimensions; it does not cluster.
- D. No method can handle noise  
  _Rationale:_ DBSCAN explicitly labels noise points.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
