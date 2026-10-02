# AI for Insurance Operations and Claims Review Support

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1189` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Explain where AI supports insurance operations and claims handling
2. Use AI to triage and summarise claims documentation
3. Verify AI outputs and keep decisions with authorised handlers
4. Support fraud-flagging and quality review responsibly
5. Manage fairness, privacy and regulatory considerations in claims AI

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 AI in insurance operations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Sort claims tasks by suitability for AI support; (2) Identify steps needing an authorised human decision
- Common misconception addressed: Assuming AI can settle or decline a claim on its own
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Where AI helps in claims | 96 | 8 |
| M01L02 | Mapping AI to the claims workflow | 96 | 8 |

### M02 Triage and summarisation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Summarise a claim file into a structured brief; (2) Route claims to fast-track or detailed review based on criteria
- Common misconception addressed: Trusting a triage label without reading the underlying file
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Summarising a claim file | 96 | 8 |
| M02L02 | Triaging and routing claims | 96 | 8 |

### M03 Verifying and authority (MASTEMY-DESIGN 20%)

- Worked applications: (1) Verify an AI-stated policy detail against the policy document; (2) Mark the point where a licensed handler must decide
- Common misconception addressed: Letting an AI recommendation stand in for an authorised decision
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Checking AI outputs | 96 | 8 |
| M03L02 | Keeping decisions with authorised handlers | 96 | 8 |

### M04 Fraud flags and quality (MASTEMY-DESIGN 20%)

- Worked applications: (1) Interpret a fraud flag as a prompt for review, not a verdict; (2) Use AI to check claims handling for consistency
- Common misconception addressed: Treating an AI fraud flag as proof rather than a reason to investigate
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Supporting fraud detection | 96 | 8 |
| M04L02 | Quality review and consistency | 96 | 8 |

### M05 Fairness, privacy and regulation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Check a claims-AI process for unfair impact; (2) Handle claimant personal data under privacy rules
- Common misconception addressed: Assuming claims AI is automatically fair and privacy-compliant
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Fairness and adverse decisions | 96 | 8 |
| M05L02 | Privacy and regulatory duties | 96 | 8 |

## Integrative case

A claims analyst uses an AI assistant to triage incoming motor claims. Summarise each claim file, surface items that may need closer review, draft a handling recommendation, and ensure a human handler makes the coverage decision while fairness and privacy requirements are met.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1189-final-protected | 25 | 25 | yes |
| MST-1189-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI in insurance operations | 5 |
| Triage and summarisation | 5 |
| Verifying and authority | 5 |
| Fraud flags and quality | 5 |
| Fairness, privacy and regulation | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1189-Q0001** (single-answer, Select ONE) An AI model flags a claim as 'possible fraud.' How should a claims handler treat this flag?

- A. As a prompt to investigate further, not as proof the claim is fraudulent  **(key)**  
  _Rationale:_ Correct: a flag indicates risk to review; it is not evidence of fraud by itself.
- B. As conclusive proof allowing immediate denial  
  _Rationale:_ Denying on a flag alone is unfair and likely non-compliant.
- C. As a reason to ignore the claim entirely  
  _Rationale:_ The claim must still be handled; the flag prompts review.
- D. As irrelevant, since fraud flags are never useful  
  _Rationale:_ Flags can usefully focus review when treated as signals, not verdicts.

**MST-1189-Q0002** (multiple-answer, Select TWO) Which TWO practices support responsible AI-assisted claims triage? (Select TWO.)

- A. Having an authorised handler make the final coverage decision  **(key)**  
  _Rationale:_ Correct: coverage decisions must rest with an authorised human.
- B. Handling claimant personal data in line with privacy rules  **(key)**  
  _Rationale:_ Correct: privacy duties apply to personal data used by claims AI.
- C. Auto-declining any claim the model scores as high risk  
  _Rationale:_ Automated declines on a score alone are unfair and risky.
- D. Sharing full claim files with any external tool for convenience  
  _Rationale:_ Uncontrolled sharing breaches privacy obligations.

**MST-1189-Q0003** (single-answer, Select ONE) An AI summary says a claim is 'covered under the policy.' Before acting, what should the handler verify?

- A. The stated coverage against the actual policy wording and endorsements  **(key)**  
  _Rationale:_ Correct: coverage statements must be checked against the governing policy document.
- B. Nothing; AI coverage statements are always correct  
  _Rationale:_ AI can misread policy terms; verification is needed.
- C. Only the claimant's name  
  _Rationale:_ The coverage position itself is what must be verified.
- D. That the summary is long enough  
  _Rationale:_ Length is irrelevant to whether coverage is correctly stated.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
