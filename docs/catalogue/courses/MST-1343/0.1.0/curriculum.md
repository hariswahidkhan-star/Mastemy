# Multimodal Models: Vision and Language

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1343` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how multimodal models combine vision and language
2. Describe image-text embedding and alignment at a high level
3. Identify tasks suited to vision-language models
4. Prepare inputs and prompts for multimodal tasks
5. Recognise the limitations and failure modes of multimodal models

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Foundations of multimodality (MASTEMY-DESIGN 20%)

- Worked applications: (1) List tasks that require both vision and language; (2) Explain why modalities must be aligned
- Common misconception addressed: Assuming a text model can 'see' images by itself
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What multimodal models are | 72 | 8 |
| M01L02 | Modalities and why alignment matters | 72 | 8 |

### M02 Image-text representation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Sketch how an image becomes model input; (2) Explain contrastive image-text training conceptually
- Common misconception addressed: Thinking images and text share one native format
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Encoding images for models | 72 | 8 |
| M02L02 | Contrastive alignment (CLIP-style) | 72 | 8 |

### M03 Vision-language tasks (MASTEMY-DESIGN 20%)

- Worked applications: (1) Match a task to a model capability; (2) Design a prompt for visual question answering
- Common misconception addressed: Treating captioning and VQA as the same task
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Captioning, VQA and retrieval | 72 | 8 |
| M03L02 | Prompting multimodal models | 72 | 8 |

### M04 Building a multimodal feature (MASTEMY-DESIGN 20%)

- Worked applications: (1) Prepare and resize images for a model; (2) Define evaluation for an image-QA feature
- Common misconception addressed: Ignoring input quality and resolution limits
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Input preparation and constraints | 72 | 8 |
| M04L02 | Evaluating multimodal outputs | 72 | 8 |

### M05 Limitations and safety (MASTEMY-DESIGN 20%)

- Worked applications: (1) Spot a hallucinated object in a model's answer; (2) Decide where human review is required
- Common misconception addressed: Trusting confident answers about what is in an image
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Hallucination and bias in vision-language | 72 | 8 |
| M05L02 | Human review and safety | 72 | 8 |

## Integrative case

A team wants a feature that answers questions about uploaded images. Choose a suitable vision-language approach, decide how images and text are prepared and prompted, define evaluation for the task, and flag the failure modes that need human review before launch.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1343-final-protected | 25 | 25 | yes |
| MST-1343-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Foundations of multimodality | 5 |
| Image-text representation | 5 |
| Vision-language tasks | 5 |
| Building a multimodal feature | 5 |
| Limitations and safety | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1343-Q0001** (single-answer, Select ONE) What is the core idea behind contrastive image-text training such as CLIP?

- A. Learn a shared space where matching image and text pairs are close together **(key)**  
  _Rationale:_ Correct: contrastive training aligns image and text embeddings for matching pairs.
- B. Convert every image into English sentences before training  
  _Rationale:_ It aligns embeddings; it does not pre-translate images to text.
- C. Train the vision and language parts to never interact  
  _Rationale:_ The point is to relate the two modalities, not isolate them.
- D. Remove all text from the training data  
  _Rationale:_ Text is essential to the image-text pairing.

**MST-1343-Q0002** (multiple-answer, Select TWO) Which TWO are appropriate tasks for a vision-language model? (Select TWO.)

- A. Answering questions about the contents of an image **(key)**  
  _Rationale:_ Correct: visual question answering is a core VLM task.
- B. Generating a caption describing an image **(key)**  
  _Rationale:_ Correct: captioning is a standard VLM task.
- C. Sorting a numeric database with no images or text  
  _Rationale:_ That is a plain data task, not multimodal.
- D. Compiling source code  
  _Rationale:_ Code compilation is unrelated to vision-language models.

**MST-1343-Q0003** (single-answer, Select ONE) A vision-language model confidently reports an object that is not actually in the image. What is this failure called?

- A. Hallucination **(key)**  
  _Rationale:_ Correct: the model fabricates content not supported by the input.
- B. Quantisation error  
  _Rationale:_ That stems from low-precision numerics, not fabricated content.
- C. Overfitting  
  _Rationale:_ Overfitting is a training issue, not a per-image fabrication.
- D. Latency  
  _Rationale:_ Latency is a speed measure, not an incorrect-content issue.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
