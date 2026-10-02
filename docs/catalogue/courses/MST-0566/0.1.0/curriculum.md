# Cursor Pull-Request Review and Bugbot Workflows

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0566` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Cursor's official documentation; the egress proxy blocked docs.cursor.com this session (EGRESS_BLOCKED), so no official page was read. Features, menu names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session (docs.cursor.com, EGRESS_BLOCKED); sources: SRC-CURSOR-0566 |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Cursor Pull-Request Review and Bugbot Workflows (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what automated PR review catches and where human review stays essential
2. Set up and tune automated pull-request review
3. Triage and act on review findings, verifying applied fixes
4. Make review a meaningful quality gate and measure its value
5. Practise review responsibly with data care and clear accountability

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use or writing quality; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 AI in the review workflow (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) List issues automated review catches well; (2) Identify review judgement that stays human
- Common misconception addressed: Treating an automated review as a substitute for human review
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What automated PR review can and cannot catch | 72 | 5 |
| M01L02 | Where human review stays essential | 72 | 5 |

### M02 Setting up automated PR review (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Enable automated review on a repository; (2) Tune the reviewer to reduce noise
- Common misconception addressed: Leaving the reviewer so noisy that real issues are ignored
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Enabling review on pull requests | 96 | 5 |
| M02L02 | Tuning what the reviewer flags | 96 | 5 |

### M03 Acting on review findings (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Triage a batch of automated findings; (2) Apply and verify a suggested fix
- Common misconception addressed: Applying suggested fixes blindly without verifying them
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Triaging findings: fix, dismiss or discuss | 80 | 5 |
| M03L02 | Applying suggested fixes safely | 80 | 5 |
| M03L03 | Confirming a fix actually resolves the finding | 80 | 5 |

### M04 Quality gates and signal (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Define what a review gate must pass; (2) Check whether findings correlate with real defects
- Common misconception addressed: Letting review become a box-ticking gate
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Making review a useful gate, not a rubber stamp | 96 | 5 |
| M04L02 | Measuring whether review improves quality | 96 | 5 |

### M05 Responsible review practice (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Review a finding without leaking sensitive detail; (2) Assign accountability for a merged change
- Common misconception addressed: Assuming no accountability because an AI reviewed it
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Keeping sensitive code and data out of review prompts | 96 | 5 |
| M05L02 | Accountability for merged changes | 96 | 5 |

## Integrative case

A team adds automated PR review and a review bot to its workflow: tune it to cut noise, triage its findings into fix, dismiss or discuss, verify every applied suggestion, keep it as a gate rather than a rubber stamp, and keep a human accountable for each merge.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0566-final-protected | 30 | 40 | yes |
| MST-0566-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI in the review workflow | 5 |
| Setting up automated PR review | 6 |
| Acting on review findings | 7 |
| Quality gates and signal | 6 |
| Responsible review practice | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0566-Q0001** (single-answer, Select ONE) What is the right relationship between automated PR review and human review?

- A. Automated review assists; a human stays accountable for the merge **(key)**  
  _Rationale:_ Correct: automation supports review but does not replace human judgement.
- B. Automated review fully replaces human review  
  _Rationale:_ Automation misses judgement and context a human provides.
- C. Human review is unnecessary once a bot is enabled  
  _Rationale:_ A bot cannot own accountability for a merge.
- D. Both can be skipped if tests pass  
  _Rationale:_ Tests do not cover design, security and context review.

**MST-0566-Q0002** (multiple-answer, Select TWO) Which TWO habits keep automated review valuable? (Select TWO.)

- A. Tune the reviewer to reduce noise **(key)**  
  _Rationale:_ Correct: a noisy reviewer gets ignored, hiding real issues.
- B. Verify a suggested fix actually resolves the finding **(key)**  
  _Rationale:_ Correct: suggested fixes must be checked, not applied blindly.
- C. Apply every suggestion automatically  
  _Rationale:_ Blind application introduces unreviewed changes.
- D. Treat review as a box to tick  
  _Rationale:_ A rubber-stamp gate adds no quality.

**MST-0566-Q0003** (single-answer, Select ONE) The review bot produces so many low-value flags that developers ignore it. What should you do?

- A. Tune what it flags so real issues stand out **(key)**  
  _Rationale:_ Correct: reducing noise restores the signal developers act on.
- B. Disable human review instead  
  _Rationale:_ Removing human review makes the problem worse.
- C. Merge without reading any findings  
  _Rationale:_ Ignoring findings defeats the purpose of review.
- D. Accept that review no longer adds value  
  _Rationale:_ The fix is tuning, not abandoning review.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
