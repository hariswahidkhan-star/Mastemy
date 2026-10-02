# Gemini + Google Ads + GA4: Campaign Optimization Workflow

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0789` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official Google Ads / GA4 / Gemini documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Gemini + Google Ads + GA4: Campaign Optimization Workflow (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Connect campaign goals across Google Ads and GA4
2. Use Gemini to draft and critique ad assets and hypotheses
3. Define conversions and audiences in GA4
4. Run an optimization loop from data to campaign change
5. Report results and avoid common attribution pitfalls

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Workflow framing (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map a goal to GA4 and Ads signals; (2) Draft a workflow diagram for the loop
- Common misconception addressed: Treating the three tools as unrelated silos
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Goals, roles of each tool | 120 | 7 |
| M01L02 | Mapping the end-to-end loop | 120 | 7 |

### M02 Gemini-assisted assets (MASTEMY-DESIGN 20%)

- Worked applications: (1) Generate three ad variants with Gemini; (2) Fact-check an AI claim before publishing
- Common misconception addressed: Publishing AI-drafted copy without human review
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Drafting ad copy and variants with Gemini | 120 | 7 |
| M02L02 | Critiquing and grounding outputs | 120 | 7 |

### M03 GA4 measurement (MASTEMY-DESIGN 20%)

- Worked applications: (1) Mark a key event as a conversion; (2) Build an audience for remarketing
- Common misconception addressed: Treating every event as a conversion
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Events, conversions and audiences | 120 | 7 |
| M03L02 | Linking GA4 with Google Ads | 120 | 7 |

### M04 Optimization loop (MASTEMY-DESIGN 20%)

- Worked applications: (1) Form a test hypothesis from GA4 data; (2) Adjust a campaign based on evidence
- Common misconception addressed: Changing many variables at once so results are unreadable
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reading signals and forming hypotheses | 120 | 7 |
| M04L02 | Applying a campaign change | 120 | 7 |

### M05 Reporting and pitfalls (MASTEMY-DESIGN 20%)

- Worked applications: (1) Summarize a test result for stakeholders; (2) Explain an attribution caveat
- Common misconception addressed: Claiming causation from correlated metric movements
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Reporting outcomes | 120 | 7 |
| M05L02 | Attribution pitfalls | 120 | 7 |

## Integrative case

Run one optimization cycle for a campaign: frame the goal across Google Ads and GA4, use Gemini to draft and critique ad variants, configure a GA4 conversion and audience, apply one evidence-based change, and report the result with an attribution caveat.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0789-final-protected | 40 | 50 | yes |
| MST-0789-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Workflow framing | 8 |
| Gemini-assisted assets | 8 |
| GA4 measurement | 8 |
| Optimization loop | 8 |
| Reporting and pitfalls | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0789-Q0001** (single-answer, Select ONE) In GA4, what distinguishes a conversion from an ordinary event?

- A. A conversion is a key event you have marked as important to the business **(key)**  
  _Rationale:_ Correct: conversions are key events flagged as meaningful outcomes.
- B. Conversions are automatically every event collected  
  _Rationale:_ Not every event is a conversion.
- C. Conversions only exist in Google Ads, not GA4  
  _Rationale:_ GA4 defines key events/conversions that can be shared with Ads.
- D. A conversion is any page view  
  _Rationale:_ Page views are events, not automatically conversions.

**MST-0789-Q0002** (multiple-answer, Select TWO) Which TWO practices make an AI-assisted ad workflow trustworthy? (Select TWO.)

- A. Have a human review and fact-check Gemini-drafted copy before publishing **(key)**  
  _Rationale:_ Correct: human review guards against errors and unsupported claims.
- B. Change one variable at a time so test results are interpretable **(key)**  
  _Rationale:_ Correct: isolating variables keeps the optimization loop readable.
- C. Publish AI output directly to live campaigns without review  
  _Rationale:_ Unreviewed output risks errors and policy issues.
- D. Mark every event as a conversion to inflate numbers  
  _Rationale:_ That distorts measurement and misleads decisions.

**MST-0789-Q0003** (single-answer, Select ONE) Why change only one campaign variable per optimization cycle?

- A. So the effect of the change can be attributed clearly **(key)**  
  _Rationale:_ Correct: isolating a variable makes the result interpretable.
- B. Because Google Ads forbids multiple changes  
  _Rationale:_ It is a method choice, not a platform restriction.
- C. To avoid using GA4 data  
  _Rationale:_ GA4 data still informs the single change.
- D. Because Gemini can only suggest one change  
  _Rationale:_ Gemini can suggest many; the discipline is the analyst's.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
