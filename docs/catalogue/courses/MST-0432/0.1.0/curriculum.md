# AI Literacy, Limitations, and Responsible Workplace Use

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0432` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Explain core AI concepts needed to use tools sensibly
2. Describe the main limitations and risks of generative AI
3. Apply practical checks to AI outputs before acting on them
4. Identify privacy, security and intellectual-property concerns
5. Follow responsible and transparent AI-use practices at work

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Foundations of AI literacy (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain why the same prompt can give different answers; (2) Rewrite a vague request into a clear instruction
- Common misconception addressed: Thinking the model stores and recalls exact facts
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What generative models do | 96 | 8 |
| M01L02 | Prompts, context and why outputs vary | 96 | 8 |

### M02 Limitations and failure modes (MASTEMY-DESIGN 20%)

- Worked applications: (1) Catch a fabricated citation in a sample answer; (2) Identify a biased framing in generated text
- Common misconception addressed: Trusting confident wording as a sign of accuracy
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Hallucination and fabricated sources | 96 | 8 |
| M02L02 | Bias, staleness and reasoning gaps | 96 | 8 |

### M03 Verifying AI output (MASTEMY-DESIGN 20%)

- Worked applications: (1) Apply a three-step verification routine to an answer; (2) Decide which outputs need a second human reviewer
- Common misconception addressed: Skipping verification because the draft 'looks right'
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Fact-checking and source-grounding | 96 | 8 |
| M03L02 | Structured review for high-stakes tasks | 96 | 8 |

### M04 Privacy, security and IP (MASTEMY-DESIGN 20%)

- Worked applications: (1) Classify five inputs as safe or unsafe to share; (2) Explain an IP risk in reusing generated content
- Common misconception addressed: Pasting confidential data into a public tool
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | What not to put into AI tools | 96 | 8 |
| M04L02 | Confidentiality, copyright and data retention | 96 | 8 |

### M05 Responsible and transparent use (MASTEMY-DESIGN 20%)

- Worked applications: (1) Draft a disclosure line for AI-assisted work; (2) Map an escalation path for a risky output
- Common misconception addressed: Treating AI output as unattributable and consequence-free
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Disclosure and human accountability | 96 | 8 |
| M05L02 | Writing and following an AI-use policy | 96 | 8 |

## Integrative case

A department is rolling out a generative-AI assistant to 200 staff. Draft the responsible-use guidance: acceptable tasks, what must never be entered, how to check outputs, when to disclose AI use, and an escalation path, then defend it to compliance and to sceptical staff.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0432-final-protected | 25 | 25 | yes |
| MST-0432-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Foundations of AI literacy | 5 |
| Limitations and failure modes | 5 |
| Verifying AI output | 5 |
| Privacy, security and IP | 5 |
| Responsible and transparent use | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0432-Q0001** (single-answer, Select ONE) A generated answer cites a very specific source that does not exist. What has happened?

- A. The model hallucinated a plausible-sounding but fabricated citation **(key)**  
  _Rationale:_ Correct: models can generate convincing but false references.
- B. The source was deleted from the internet moments ago  
  _Rationale:_ The model does not fetch live sources; it generated the text.
- C. The model made a typo in an otherwise real citation  
  _Rationale:_ The reference does not exist at all; this is fabrication, not a typo.
- D. The citation must be real because it is detailed  
  _Rationale:_ Detail is not evidence of truth for generated text.

**MST-0432-Q0002** (multiple-answer, Select TWO) Which TWO inputs should staff never paste into a public AI tool? (Select TWO.)

- A. A customer's personal identifying data **(key)**  
  _Rationale:_ Correct: this breaches privacy and data-protection duties.
- B. Unreleased confidential product plans **(key)**  
  _Rationale:_ Correct: confidential IP should not leave controlled systems.
- C. A publicly published blog post  
  _Rationale:_ Public content carries little confidentiality risk.
- D. A generic question about grammar  
  _Rationale:_ A generic query exposes no sensitive data.

**MST-0432-Q0003** (single-answer, Select ONE) When is a disclosure that AI assisted the work most clearly warranted?

- A. When the output is used in a decision that affects others and accuracy matters **(key)**  
  _Rationale:_ Correct: transparency supports accountability in consequential use.
- B. Only when the AI is wrong  
  _Rationale:_ Disclosure is about transparency, not only error.
- C. Never, because it undermines the work  
  _Rationale:_ Disclosure supports, not undermines, responsible use.
- D. Only for internal brainstorming notes  
  _Rationale:_ Low-stakes private drafts are the weakest case for disclosure.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
