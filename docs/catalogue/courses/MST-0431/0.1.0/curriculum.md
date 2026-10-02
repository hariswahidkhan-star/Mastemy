# Artificial Intelligence Foundations for Nontechnical Professionals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0431` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Explain what AI, machine learning and generative AI are in plain terms
2. Describe where AI performs well and where it typically fails
3. Identify realistic AI use cases in a business setting
4. Interpret common AI outputs and confidence signals responsibly
5. Recognise data, cost and risk factors in adopting AI

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 What AI is and is not (MASTEMY-DESIGN 20%)

- Worked applications: (1) Sort ten everyday technologies into 'AI', 'automation' or 'neither'; (2) Translate three vendor AI claims into plain language
- Common misconception addressed: Believing AI 'understands' the way people do
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Defining AI, ML and generative AI | 96 | 8 |
| M01L02 | A short history and the current landscape | 96 | 8 |

### M02 How modern AI learns (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain to a colleague why a model needs representative data; (2) Trace why a model's accuracy fell after a seasonal change
- Common misconception addressed: Assuming a model is fixed and never needs retraining
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Learning from data, patterns and probabilities | 96 | 8 |
| M02L02 | Training, inference and why models drift | 96 | 8 |

### M03 Strengths and failure modes (MASTEMY-DESIGN 20%)

- Worked applications: (1) Identify a task where AI is the wrong tool; (2) Spot an overconfident but wrong answer in a sample output
- Common misconception addressed: Treating fluent output as factually correct
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Where AI adds value | 96 | 8 |
| M03L02 | Bias, hallucination and overconfidence | 96 | 8 |

### M04 AI in the organisation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Score three candidate use cases on value and feasibility; (2) Draft the data checklist for a proposed use case
- Common misconception addressed: Starting with the tool instead of the problem
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Finding good use cases | 96 | 8 |
| M04L02 | Data, cost and vendor considerations | 96 | 8 |

### M05 Using AI responsibly at work (MASTEMY-DESIGN 20%)

- Worked applications: (1) Define where a human must stay in the loop for a workflow; (2) Write a one-paragraph limitation note for an AI feature
- Common misconception addressed: Assuming the vendor carries all the responsibility
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Human oversight and accountability | 96 | 8 |
| M05L02 | Privacy, security and communicating limits | 96 | 8 |

## Integrative case

A mid-size retailer's operations lead must decide where AI could help the team. Scope three candidate use cases, judge which are a good fit for current AI capability, name the data and risks involved, and present a go/no-go recommendation to leadership without overstating what AI can do.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0431-final-protected | 25 | 25 | yes |
| MST-0431-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What AI is and is not | 5 |
| How modern AI learns | 5 |
| Strengths and failure modes | 5 |
| AI in the organisation | 5 |
| Using AI responsibly at work | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0431-Q0001** (single-answer, Select ONE) A manager says an AI tool 'understands our business'. What is the most accurate correction?

- A. The tool predicts likely text from patterns in data; it has no understanding of your business **(key)**  
  _Rationale:_ Correct: current AI produces statistically likely output, not genuine comprehension.
- B. The tool has read and memorised your company handbook  
  _Rationale:_ It has not; it reflects training-data patterns, not stored company facts.
- C. The tool reasons about your business like an experienced analyst  
  _Rationale:_ It mimics patterns and can be wrong; it does not reason from understanding.
- D. The tool is always right about your business  
  _Rationale:_ Fluency is not accuracy; outputs can be confidently wrong.

**MST-0431-Q0002** (multiple-answer, Select TWO) A team wants to adopt an AI feature responsibly. Which TWO practices support that? (Select TWO.)

- A. Keep a human in the loop for consequential decisions **(key)**  
  _Rationale:_ Correct: human oversight catches errors before they cause harm.
- B. State the known limitations of the feature to users **(key)**  
  _Rationale:_ Correct: communicating limits sets honest expectations.
- C. Treat every AI output as final and authoritative  
  _Rationale:_ Unverified outputs can be wrong; this increases risk.
- D. Hide that AI was used in the workflow  
  _Rationale:_ Lack of disclosure undermines trust and accountability.

**MST-0431-Q0003** (single-answer, Select ONE) Which situation is the best fit for an AI tool?

- A. A high-volume, repetitive task where some error is tolerable and checkable **(key)**  
  _Rationale:_ Correct: AI suits scalable tasks where outputs can be reviewed.
- B. A one-off legal decision with no tolerance for error  
  _Rationale:_ Low error tolerance and high stakes favour expert human judgement.
- C. A task with no available data or examples  
  _Rationale:_ Without data the tool has nothing to learn from.
- D. A task whose answer must be provably exact every time  
  _Rationale:_ Probabilistic tools cannot guarantee exactness.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
