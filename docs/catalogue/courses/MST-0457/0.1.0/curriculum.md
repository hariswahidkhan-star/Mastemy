# Small Language Models and Edge AI

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0457` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Small models and edge AI
2. Making models small
3. On-device deployment
4. Evaluation on device

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Small models and edge AI (MASTEMY-DESIGN 20%)

- Worked applications: (1) Match a task to an SLM vs a large model; (2) List device constraints for a deployment
- Common misconception addressed: Assuming bigger models are always better for every task
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why small language models | 120 | 8 |
| M01L02 | Edge constraints: memory, power, latency | 120 | 8 |

### M02 Making models small (MASTEMY-DESIGN 20%)

- Worked applications: (1) Distil a large model into a small one; (2) Quantize a model to fit a device
- Common misconception addressed: Pruning aggressively without re-evaluating accuracy
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Distillation and pruning | 120 | 8 |
| M02L02 | Quantization for edge | 120 | 8 |

### M03 On-device deployment (MASTEMY-DESIGN 20%)

- Worked applications: (1) Export a model to an edge runtime; (2) Plan offline updates for a fleet
- Common misconception addressed: Ignoring on-device privacy advantages and duties
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Runtimes and formats for edge | 120 | 8 |
| M03L02 | Offline, privacy and update strategies | 120 | 8 |

### M04 Evaluation on device (MASTEMY-DESIGN 20%)

- Worked applications: (1) Measure on-device latency and energy; (2) Choose a model size for a battery budget
- Common misconception addressed: Benchmarking only on a powerful server, not the target device
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Measuring latency and energy | 120 | 8 |
| M04L02 | Accuracy vs resource trade-offs | 120 | 8 |

## Integrative case

A wearable must run a language feature offline on limited battery. Decide whether a small model fits, apply distillation and quantization, export to an edge runtime, and evaluate accuracy against latency and energy on the real device.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0457-final-protected | 20 | 20 | yes |
| MST-0457-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Small models and edge AI | 5 |
| Making models small | 5 |
| On-device deployment | 5 |
| Evaluation on device | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0457-Q0001** (single-answer, Select ONE) What is a core reason to choose a small language model for an edge device?

- A. It fits limited memory and runs within latency and power budgets **(key)**  
  _Rationale:_ Correct: small models suit constrained hardware.
- B. It always matches the accuracy of the largest models  
  _Rationale:_ Small models usually trade some accuracy.
- C. It removes the need for any evaluation  
  _Rationale:_ Evaluation is still needed.
- D. It requires a datacenter GPU to run  
  _Rationale:_ The point is to avoid heavy hardware.

**MST-0457-Q0002** (multiple-answer, Select TWO) Which TWO techniques help shrink a model for edge deployment? (Select TWO.)

- A. Knowledge distillation into a smaller student **(key)**  
  _Rationale:_ Correct: distillation transfers capability to a smaller model.
- B. Quantization to lower-precision weights **(key)**  
  _Rationale:_ Correct: quantization reduces size and compute.
- C. Increasing the parameter count  
  _Rationale:_ That makes the model larger, not smaller.
- D. Adding more layers at full precision  
  _Rationale:_ That increases size and cost.

**MST-0457-Q0003** (single-answer, Select ONE) Why should edge models be benchmarked on the target device, not only a server?

- A. Device latency, memory and energy differ sharply from server conditions **(key)**  
  _Rationale:_ Correct: on-device resources determine real performance.
- B. Servers cannot run models  
  _Rationale:_ Servers can run models; they just differ from devices.
- C. Accuracy depends only on the server  
  _Rationale:_ Accuracy is not server-specific here.
- D. Edge devices never have constraints  
  _Rationale:_ Edge devices are tightly constrained.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
