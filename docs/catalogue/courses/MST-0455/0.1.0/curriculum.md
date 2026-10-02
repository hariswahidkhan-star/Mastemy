# Multimodal AI: Text, Images, Audio, and Video

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0455` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-GAVA-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Multimodal foundations
2. Vision-language models
3. Audio and video
4. Generation and evaluation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Multimodal foundations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Describe a shared embedding space; (2) Choose modalities for a task
- Common misconception addressed: Assuming one encoder fits all modalities unchanged
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Modalities and representation | 120 | 8 |
| M01L02 | Aligning text, image, audio and video | 120 | 8 |

### M02 Vision-language models (MASTEMY-DESIGN 20%)

- Worked applications: (1) Use a contrastive model for retrieval; (2) Frame a VQA task and its inputs
- Common misconception addressed: Treating VQA as plain image classification
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Image-text contrastive models | 120 | 8 |
| M02L02 | Captioning and visual question answering | 120 | 8 |

### M03 Audio and video (MASTEMY-DESIGN 20%)

- Worked applications: (1) Pick a model for audio captioning; (2) Handle temporal context in video
- Common misconception addressed: Ignoring time order when modelling video
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Speech and audio-text models | 120 | 8 |
| M03L02 | Video understanding and temporal context | 120 | 8 |

### M04 Generation and evaluation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Condition image generation on text; (2) Choose metrics for a captioning system
- Common misconception addressed: Using a single accuracy number for multimodal quality
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Cross-modal generation | 120 | 8 |
| M04L02 | Evaluating multimodal systems | 120 | 8 |

## Integrative case

A media platform wants to search video by spoken content and generate thumbnails from a text brief. Choose encoders and alignment across modalities, frame retrieval and generation tasks, and design evaluation that reflects cross-modal quality.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0455-final-protected | 20 | 20 | yes |
| MST-0455-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Multimodal foundations | 5 |
| Vision-language models | 5 |
| Audio and video | 5 |
| Generation and evaluation | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0455-Q0001** (single-answer, Select ONE) What is the key idea behind a contrastive image-text model used for retrieval?

- A. It maps images and text into a shared space where matching pairs are close **(key)**  
  _Rationale:_ Correct: contrastive training aligns matched image-text pairs.
- B. It converts all images to text before training  
  _Rationale:_ It aligns embeddings, it does not transcribe images to text.
- C. It only works on audio  
  _Rationale:_ It is an image-text method.
- D. It requires no training data  
  _Rationale:_ Contrastive training needs paired data.

**MST-0455-Q0002** (multiple-answer, Select TWO) Which TWO are genuine challenges specific to video understanding? (Select TWO.)

- A. Modelling temporal order across frames **(key)**  
  _Rationale:_ Correct: video has a time dimension that must be modelled.
- B. High compute and memory from many frames **(key)**  
  _Rationale:_ Correct: video multiplies per-frame cost.
- C. Video has no visual content  
  _Rationale:_ Video is inherently visual.
- D. Frames can be shuffled with no effect  
  _Rationale:_ Shuffling destroys temporal meaning.

**MST-0455-Q0003** (single-answer, Select ONE) Why is a single accuracy number usually inadequate for a multimodal captioning system?

- A. Captioning quality involves relevance, fluency and grounding, not one label **(key)**  
  _Rationale:_ Correct: captioning needs several complementary measures.
- B. Accuracy cannot be computed for text  
  _Rationale:_ Text metrics exist; accuracy alone is just insufficient.
- C. Captioning has a single correct output always  
  _Rationale:_ Many valid captions can exist.
- D. Multimodal systems cannot be evaluated  
  _Rationale:_ They can be evaluated with suitable metrics.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
