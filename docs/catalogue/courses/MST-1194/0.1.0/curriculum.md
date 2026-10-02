# AI for Supply-Chain Planning and Logistics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1194` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-ASC-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Identify where AI adds value across planning, inventory and logistics
2. Use AI to assist demand sensing and planning with human verification
3. Apply AI to logistics optimisation and exception management responsibly
4. Recognise data-quality, bias and over-automation risks in supply-chain AI
5. Keep human control, controls and auditability over AI-assisted planning

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of the tools and workflows taught, the quality of live outputs, and professional judgement on the job are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded prompts or peer review.

## Modules

### M01 AI in supply chain (MASTEMY-DESIGN 20%)

- Worked applications: (1) Sort supply-chain tasks by AI suitability; (2) Explain why the final plan stays with the planner
- Common misconception addressed: Expecting AI to run planning with no human oversight
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Where AI helps planning and logistics | 96 | 8 |
| M01L02 | Use cases and their limits | 96 | 8 |
### M02 Demand and planning (MASTEMY-DESIGN 20%)

- Worked applications: (1) Verify an AI demand signal against actual orders; (2) Challenge an AI forecast that ignores a known promotion
- Common misconception addressed: Trusting an AI demand signal without checking the drivers
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | AI-assisted demand sensing | 96 | 8 |
| M02L02 | Reviewing AI forecasts and signals | 96 | 8 |
### M03 Logistics and exceptions (MASTEMY-DESIGN 20%)

- Worked applications: (1) Review an AI-proposed route for a real-world constraint; (2) Triage AI exception alerts by business impact
- Common misconception addressed: Following an AI route that ignores a physical constraint
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | AI for routing and load planning | 96 | 8 |
| M03L02 | Exception management and alerts | 96 | 8 |
### M04 Data and risk (MASTEMY-DESIGN 20%)

- Worked applications: (1) Spot a master-data error that would mislead AI planning; (2) Identify where over-automation could cause harm
- Common misconception addressed: Feeding poor master data into AI and trusting the result
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Data quality and master data | 96 | 8 |
| M04L02 | Bias and over-automation | 96 | 8 |
### M05 Control and governance (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design a human checkpoint before an AI plan is released; (2) Document AI use so a plan can be reviewed
- Common misconception addressed: Releasing an AI plan with no human checkpoint
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Human-in-the-loop planning | 96 | 8 |
| M05L02 | Auditability of AI-assisted plans | 96 | 8 |

## Integrative case

A supply-chain planner must introduce AI to a planning process: choose where AI helps demand sensing and route planning, keep the final plan decision human, protect commercial data, and present a governance plan to the operations director showing where AI must not run unchecked.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1194-final-protected | 25 | 25 | yes |
| MST-1194-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI in supply chain | 5 |
| Demand and planning | 5 |
| Logistics and exceptions | 5 |
| Data and risk | 5 |
| Control and governance | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1194-Q0001** (single-answer, Select ONE) An AI demand signal predicts a sharp sales jump next week. Before changing the plan, what should the planner do first?

- A. Check the drivers behind the signal against known demand events **(key)**  
  _Rationale:_ Correct: verifying the cause prevents over-reacting to a spurious signal.
- B. Immediately double all orders  
  _Rationale:_ Acting on an unverified signal can cause costly excess.
- C. Ignore the signal because AI is unreliable  
  _Rationale:_ Dismissing it outright wastes a potentially useful input; verify instead.
- D. Delete the historical data  
  _Rationale:_ Removing history degrades future planning.

**MST-1194-Q0002** (multiple-answer, Select TWO) Which TWO data problems would most undermine AI-assisted planning? (Select TWO.)

- A. Inaccurate master data such as wrong lead times **(key)**  
  _Rationale:_ Correct: bad master data propagates into every AI recommendation.
- B. Large gaps in historical demand records **(key)**  
  _Rationale:_ Correct: missing history weakens the AI's basis for prediction.
- C. A clean, reconciled order history  
  _Rationale:_ Clean data helps planning rather than harming it.
- D. Accurate current inventory counts  
  _Rationale:_ Accurate counts improve, not undermine, planning.

**MST-1194-Q0003** (single-answer, Select ONE) An AI routing tool proposes a route that passes a bridge too low for the vehicle. What does this illustrate?

- A. AI output needs human review against real-world constraints it may not know **(key)**  
  _Rationale:_ Correct: AI can miss physical constraints, so human checks remain essential.
- B. AI routing should always be followed exactly  
  _Rationale:_ Following an unsafe route blindly is the error being illustrated.
- C. Physical constraints never matter in routing  
  _Rationale:_ Physical constraints are precisely what matter here.
- D. The vehicle data is irrelevant  
  _Rationale:_ Vehicle data is central to a valid route.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
