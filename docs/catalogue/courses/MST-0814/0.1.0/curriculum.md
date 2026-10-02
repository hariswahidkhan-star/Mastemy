# Gemini + YouTube Studio + Sheets: Video Content Operations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0814` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor/product documentation pages were proxy-blocked (EGRESS_BLOCKED) in this session; no official syllabus or weighting is published for this skills course. Re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor/product pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Gemini + YouTube Studio + Sheets: Video Content Operations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use Gemini to plan and draft video content and metadata
2. Manage uploads, captions and chapters in YouTube Studio
3. Track channel performance with Google Sheets
4. Operate a repeatable end-to-end content workflow with editorial review

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Plan content with Gemini (MASTEMY-DESIGN 25%)

- Worked applications: (1) Draft five video titles and descriptions from a topic brief with Gemini; (2) Turn a transcript into chapter timestamps with Gemini
- Common misconception addressed: Treating Gemini output as factually verified without review
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Prompting Gemini for video topics and outlines | 120 | 7 |
| M01L02 | Scripting and metadata drafts with Gemini | 120 | 7 |

### M02 Produce and upload in YouTube Studio (MASTEMY-DESIGN 25%)

- Worked applications: (1) Configure a scheduled upload with chapters and captions; (2) Set up an end screen linking to a playlist
- Common misconception addressed: Believing auto-generated captions need no correction
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Uploading, metadata and thumbnails in YouTube Studio | 120 | 7 |
| M02L02 | Captions, chapters and end screens | 120 | 7 |

### M03 Track performance with Sheets (MASTEMY-DESIGN 25%)

- Worked applications: (1) Build a Sheet pulling views, CTR and retention per video; (2) Write a formula flagging videos below a CTR threshold
- Common misconception addressed: Confusing impressions with views
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Exporting YouTube analytics into Sheets | 120 | 7 |
| M03L02 | Dashboards and formulas for channel KPIs | 120 | 7 |

### M04 Operate the end-to-end workflow (MASTEMY-DESIGN 25%)

- Worked applications: (1) Document a weekly publish-and-review runbook; (2) Add a Gemini review step for metadata quality
- Common misconception addressed: Assuming automation removes the need for human editorial review
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Connecting Gemini, Studio and Sheets into a repeatable pipeline | 120 | 7 |
| M04L02 | Review cadence and content governance | 120 | 7 |

## Integrative case

Run one week of a learning channel: use Gemini to draft titles and descriptions for three videos, publish them in YouTube Studio with corrected captions and chapters, then build a Sheet tracking click-through rate and retention and decide which topic to repeat.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0814-final-protected | 40 | 50 | yes |
| MST-0814-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Plan content with Gemini | 10 |
| Produce and upload in YouTube Studio | 10 |
| Track performance with Sheets | 10 |
| Operate the end-to-end workflow | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0814-Q0001** (single-answer, Select ONE) What should you always do with metadata that Gemini drafts before publishing it?

- A. Review and edit it for accuracy and policy compliance **(key)**  
  _Rationale:_ Correct: generated metadata can contain errors or policy issues and must be checked by a human.
- B. Publish it unchanged to save time  
  _Rationale:_ Unreviewed generated text may be inaccurate or violate policy.
- C. Delete it and always rewrite everything by hand  
  _Rationale:_ The draft is a useful starting point; wholesale rewriting is unnecessary.
- D. Translate it to another language first  
  _Rationale:_ Translation does not address accuracy or policy review.

**MST-0814-Q0002** (multiple-answer, Select TWO) Which TWO YouTube Studio metrics best help you judge whether a video performed well? (Select TWO.)

- A. Click-through rate **(key)**  
  _Rationale:_ Correct: CTR reflects how well the title and thumbnail attract clicks.
- B. Average view duration **(key)**  
  _Rationale:_ Correct: AVD reflects whether the content kept viewers watching.
- C. Total lifetime subscriber count  
  _Rationale:_ A channel-wide total does not isolate one video's performance.
- D. The file's upload timestamp  
  _Rationale:_ The upload time is metadata, not a performance signal.

**MST-0814-Q0003** (single-answer, Select ONE) In Sheets, which function best pulls the matching view count for a given video ID from an exported data tab?

- A. XLOOKUP (or VLOOKUP) **(key)**  
  _Rationale:_ Correct: a lookup function matches the video ID and returns its view count.
- B. SUM  
  _Rationale:_ SUM adds a range; it does not match by key.
- C. TODAY  
  _Rationale:_ TODAY returns the current date.
- D. CONCATENATE  
  _Rationale:_ CONCATENATE joins text; it does not look up values.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
