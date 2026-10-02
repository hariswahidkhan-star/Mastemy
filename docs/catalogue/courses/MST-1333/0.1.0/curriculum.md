# Variational Autoencoders

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1333` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Relate autoencoders to VAEs
2. Explain the VAE objective (ELBO)
3. Explain the reparameterisation trick
4. Recognise VAE behaviour and issues
5. Apply VAEs and compare with other generative models

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Autoencoders to VAEs (MASTEMY-DESIGN 20%)

- Worked applications: (1) Contrast an autoencoder with a VAE; (2) Explain why a structured latent space helps generation
- Common misconception addressed: Thinking a plain autoencoder is already generative
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Plain autoencoders | 120 | 8 |
| M01L02 | Why we need a probabilistic latent space | 120 | 8 |

### M02 The VAE objective (MASTEMY-DESIGN 20%)

- Worked applications: (1) Name the two ELBO terms; (2) Explain what the KL term encourages
- Common misconception addressed: Ignoring the KL term and treating a VAE as an autoencoder
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Latent variables and the encoder/decoder | 120 | 8 |
| M02L02 | The ELBO: reconstruction + KL | 120 | 8 |

### M03 Making it trainable (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain why reparameterisation enables gradients; (2) Describe sampling at generation time
- Common misconception addressed: Believing you can backprop through a raw random sample
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | The reparameterisation trick | 120 | 8 |
| M03L02 | Sampling and gradients | 120 | 8 |

### M04 Behaviour and issues (MASTEMY-DESIGN 20%)

- Worked applications: (1) Recognise posterior collapse; (2) Explain the beta trade-off
- Common misconception addressed: Assuming VAEs always produce sharp samples
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Posterior collapse and blurriness | 120 | 8 |
| M04L02 | Beta-VAE and disentanglement | 120 | 8 |

### M05 Applications and comparison (MASTEMY-DESIGN 20%)

- Worked applications: (1) Use the latent space for interpolation; (2) Compare VAEs with GANs and diffusion
- Common misconception addressed: Treating VAEs, GANs and diffusion as interchangeable
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Latent interpolation and anomaly use | 120 | 8 |
| M05L02 | VAE vs GAN vs diffusion | 120 | 8 |

## Integrative case

A team wants a generative model with a smooth, interpretable latent space for anomaly detection. Explain the ELBO and reparameterisation, address posterior collapse, and compare VAEs with GANs and diffusion.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1333-final-protected | 25 | 25 | yes |
| MST-1333-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Autoencoders to VAEs | 5 |
| The VAE objective | 5 |
| Making it trainable | 5 |
| Behaviour and issues | 5 |
| Applications and comparison | 5 |

Minimum reviewed item bank: 420 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1333-Q0001** (single-answer, Select ONE) What are the two terms in the VAE training objective (ELBO)?

- A. A reconstruction term and a KL-divergence regularisation term **(key)**  
  _Rationale:_ Correct: the ELBO balances reconstruction against a latent prior.
- B. A generator loss and a discriminator loss  
  _Rationale:_ That describes a GAN.
- C. A noise-adding and a denoising term  
  _Rationale:_ That describes diffusion.
- D. Only a classification cross-entropy term  
  _Rationale:_ A VAE is not a classifier.

**MST-1333-Q0002** (multiple-answer, Select TWO) Which TWO statements about the reparameterisation trick are correct? (Select TWO.)

- A. It expresses the latent sample as a deterministic function of a noise variable **(key)**  
  _Rationale:_ Correct: this moves randomness outside the gradient path.
- B. It allows gradients to flow through the sampling step **(key)**  
  _Rationale:_ Correct: that is its purpose.
- C. It removes the need for an encoder  
  _Rationale:_ The encoder is still needed.
- D. It makes the KL term unnecessary  
  _Rationale:_ The KL term remains in the objective.

**MST-1333-Q0003** (single-answer, Select ONE) What is posterior collapse in a VAE?

- A. The latent code is ignored and the decoder relies on little or no latent information **(key)**  
  _Rationale:_ Correct: the KL term can drive the posterior toward the prior, ignoring z.
- B. The encoder deletes the dataset  
  _Rationale:_ No data is deleted.
- C. The decoder outputs only noise forever  
  _Rationale:_ That is not posterior collapse.
- D. The learning rate collapses to zero  
  _Rationale:_ That is unrelated.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
