# Code Review Practices

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1573` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-CRP-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Code Review Practices (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Purpose of review
2. What to look for
3. Giving feedback
4. Prioritising issues
5. Reviewing effectively
6. Security and risk
7. Automation
8. Review culture

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on effective code review; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Purpose of review (MASTEMY-DESIGN 13%)

- Worked applications: (1) List the benefits a review provides; (2) Set expectations for what review covers
- Common misconception addressed: Treating review purely as a gate to pass, not a conversation
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Goals of code review | 60 | 5 |
| M01L02 | What review can and cannot catch | 60 | 5 |

### M02 What to look for (MASTEMY-DESIGN 13%)

- Worked applications: (1) Spot a missing edge case in a diff; (2) Judge whether a change is adequately tested
- Common misconception addressed: Focusing only on style while missing logic bugs
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Correctness and edge cases | 60 | 5 |
| M02L02 | Design, readability and tests | 60 | 5 |

### M03 Giving feedback (MASTEMY-DESIGN 12%)

- Worked applications: (1) Rewrite a vague comment to be actionable; (2) Phrase feedback as a question or suggestion
- Common misconception addressed: Making feedback about the author rather than the code
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Actionable, specific comments | 60 | 5 |
| M03L02 | Tone and respect | 60 | 5 |

### M04 Prioritising issues (MASTEMY-DESIGN 13%)

- Worked applications: (1) Label a comment as blocking or nit; (2) Decide which issues must be fixed before merge
- Common misconception addressed: Blocking a PR over subjective preferences
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Blocking vs non-blocking | 60 | 5 |
| M04L02 | Nits and preferences | 60 | 5 |

### M05 Reviewing effectively (MASTEMY-DESIGN 12%)

- Worked applications: (1) Request a large PR be split; (2) Review within an agreed turnaround
- Common misconception addressed: Rubber-stamping a huge PR you did not actually read
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Small PRs and review scope | 60 | 5 |
| M05L02 | Reviewing in a reasonable time | 60 | 5 |

### M06 Security and risk (MASTEMY-DESIGN 13%)

- Worked applications: (1) Flag an injection risk in a diff; (2) Request extra care for an auth change
- Common misconception addressed: Assuming the CI pipeline catches all security issues
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Common security review checks | 60 | 5 |
| M06L02 | Handling risky changes | 60 | 5 |

### M07 Automation (MASTEMY-DESIGN 12%)

- Worked applications: (1) Delegate formatting to an auto-formatter; (2) Rely on CI for mechanical checks
- Common misconception addressed: Manually nitpicking formatting a tool already enforces
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Linters, formatters and CI checks | 60 | 5 |
| M07L02 | Letting tools handle style | 60 | 5 |

### M08 Review culture (MASTEMY-DESIGN 12%)

- Worked applications: (1) Respond constructively to review feedback; (2) Escalate a stalemate appropriately
- Common misconception addressed: Letting disagreements turn personal or stall indefinitely
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Author and reviewer responsibilities | 60 | 5 |
| M08L02 | Disagreement and escalation | 60 | 5 |

## Integrative case

Review a realistic pull request that adds a feature: assess correctness, design, tests and security, write actionable and respectful comments, distinguish blocking issues from nits, and decide whether to approve.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1573-final-protected | 40 | 40 | yes |
| MST-1573-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Purpose of review | 5 |
| What to look for | 5 |
| Giving feedback | 5 |
| Prioritising issues | 5 |
| Reviewing effectively | 5 |
| Security and risk | 5 |
| Automation | 5 |
| Review culture | 5 |

Minimum reviewed item bank: 400 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1573-Q0001** (single-answer, Select ONE) What distinguishes a 'blocking' review comment from a 'nit'?

- A. A blocking comment identifies an issue that must be resolved before merge; a nit is a minor, optional suggestion **(key)**  
  _Rationale:_ Correct: labelling severity helps authors prioritise.
- B. A nit must always be fixed before merge  
  _Rationale:_ Nits are optional by definition.
- C. Blocking comments are only about formatting  
  _Rationale:_ Formatting is usually a nit, not blocking.
- D. There is no practical difference  
  _Rationale:_ The distinction guides what gates the merge.

**MST-1573-Q0002** (single-answer, Select ONE) Why are smaller pull requests generally easier to review well?

- A. Reviewers can reason about the full change and catch more issues than in a large diff **(key)**  
  _Rationale:_ Correct: review quality drops as diff size grows.
- B. They always contain fewer bugs regardless of content  
  _Rationale:_ Size does not guarantee correctness.
- C. They skip CI checks  
  _Rationale:_ Size does not change CI behaviour.
- D. They do not need tests  
  _Rationale:_ Tests are still expected.

**MST-1573-Q0003** (multiple-answer, Select ALL that apply) Which practices make code-review feedback more effective? (Select TWO)

- A. Make comments specific and actionable, pointing to the line and a concrete suggestion **(key)**  
  _Rationale:_ Correct: authors can act on precise feedback.
- B. Critique the code, not the author **(key)**  
  _Rationale:_ Correct: keeping it impersonal sustains a healthy culture.
- C. Delay reviews indefinitely to be thorough  
  _Rationale:_ False; slow reviews block the team.
- D. Block merges over personal style preferences  
  _Rationale:_ False; subjective nits should not gate merges.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
