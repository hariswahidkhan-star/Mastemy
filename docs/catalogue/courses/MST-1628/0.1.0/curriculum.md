# Web Analytics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1628` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-DAT-SK-WA-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain web analytics concepts, metrics and data collection
2. Distinguish sessions, users, events and conversions
3. Analyse acquisition, behaviour and conversion funnels
4. Set up goals, segments and basic experiments
5. Respect privacy, consent and data-quality limits in web data

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 How web data is collected (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trace how a button click becomes an event in an analytics report; (2) Explain why ad blockers and consent choices cause under-counting
- Common misconception addressed: Treating web analytics counts as an exact census of all visitors
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Tags, events and the data layer | 96 | 8 |
| M01L02 | Server-side vs client-side and sampling | 96 | 8 |

### M02 Core metrics and entities (MASTEMY-DESIGN 20%)

- Worked applications: (1) Reconcile a difference between users and sessions for one report; (2) Define a conversion for a lead-generation site
- Common misconception addressed: Confusing a user with a session or a device
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Users, sessions, events and pageviews | 96 | 8 |
| M02L02 | Bounce, engagement and conversion definitions | 96 | 8 |

### M03 Acquisition and behaviour (MASTEMY-DESIGN 20%)

- Worked applications: (1) Attribute traffic to channels from UTM parameters; (2) Find the step with the biggest drop-off in a checkout funnel
- Common misconception addressed: Reading high traffic as success regardless of conversion
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Channels, sources and campaign tracking | 96 | 8 |
| M03L02 | Behaviour flow and funnel analysis | 96 | 8 |

### M04 Goals, segments and tests (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build a segment of returning mobile users and compare conversion; (2) Decide whether an A/B test result is significant or needs more data
- Common misconception addressed: Calling an A/B test early as soon as one variant looks ahead
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Goals, segments and audiences | 96 | 8 |
| M04L02 | A/B testing on the web and significance | 96 | 8 |

### M05 Privacy and data quality (MASTEMY-DESIGN 20%)

- Worked applications: (1) List the data-quality checks before trusting a spike in traffic; (2) Explain how consent banners affect what can be measured
- Common misconception addressed: Ignoring consent and privacy constraints when designing tracking
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Consent, cookies and privacy regulation (conceptual) | 96 | 8 |
| M05L02 | Data-quality checks and attribution limits | 96 | 8 |

## Integrative case

A growth analyst is asked why checkout conversion dropped. Verify the tracking and data quality first, segment users to isolate where the drop occurs, read the funnel for the failing step, judge whether an A/B fix shows a significant lift, and account for consent-related measurement gaps in the conclusion.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1628-final-protected | 25 | 25 | yes |
| MST-1628-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| How web data is collected | 5 |
| Core metrics and entities | 5 |
| Acquisition and behaviour | 5 |
| Goals, segments and tests | 5 |
| Privacy and data quality | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1628-Q0001** (single-answer, Select ONE) Why can web analytics undercount visitors?

- A. Ad blockers, consent refusals and tracking-prevention stop some events from being recorded **(key)**  
  _Rationale:_ Correct: blocked or unconsented tracking leads to under-counting.
- B. Browsers double every event  
  _Rationale:_ That would overcount, and is not the typical issue.
- C. Analytics tools record a perfect census  
  _Rationale:_ They sample and miss blocked events.
- D. Servers refuse all client events  
  _Rationale:_ Many events are recorded; only some are missed.

**MST-1628-Q0002** (multiple-answer, Select TWO) Which TWO are good practices when running a web A/B test? (Select TWO.)

- A. Decide the sample size and run time before starting **(key)**  
  _Rationale:_ Correct: pre-committing avoids peeking bias.
- B. Wait for the planned sample before declaring a winner **(key)**  
  _Rationale:_ Correct: stopping early inflates false positives.
- C. Stop the test as soon as one variant is briefly ahead  
  _Rationale:_ Early stopping on noise produces false winners.
- D. Change the variant mid-test whenever it looks weak  
  _Rationale:_ Mid-test changes invalidate the comparison.

**MST-1628-Q0003** (single-answer, Select ONE) A report shows 1,000 users and 1,600 sessions. What does this most likely mean?

- A. Some users visited more than once, creating multiple sessions **(key)**  
  _Rationale:_ Correct: sessions exceed users when people return.
- B. The data must be wrong because sessions cannot exceed users  
  _Rationale:_ Sessions routinely exceed users through repeat visits.
- C. Every user had exactly one session  
  _Rationale:_ That would make the two counts equal.
- D. Users and sessions mean the same thing  
  _Rationale:_ They are distinct entities.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
