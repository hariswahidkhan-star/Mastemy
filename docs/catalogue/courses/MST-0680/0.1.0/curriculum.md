# Accessible Microsoft 365 Documents and Presentations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0680` v0.1.0 | Batch 12 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft 365 Apps accessibility guidance read via the Microsoft Learn MCP on 2026-10-02. Specific product UI labels can vary by release and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/microsoft-365-apps/deploy/accessibility-guide |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-M365ACC |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Accessible Microsoft 365 Documents and Presentations (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain accessibility principles and why accessible content matters
2. Create accessible Word, PowerPoint and Excel content using built-in features
3. Use the Accessibility Checker and remediate common issues

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Accessibility principles (MASTEMY-DESIGN 34%, design weight)

- Worked applications: (1) Apply built-in heading styles to structure a document; (2) Rewrite a 'click here' link as meaningful link text
- Common misconception addressed: Using bold large text to imitate a heading instead of a real heading style
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why accessibility matters and who it helps | 160 | 8 |
| M01L02 | Headings, structure and meaningful order | 160 | 8 |

### M02 Accessible content features (MASTEMY-DESIGN 33%, design weight)

- Worked applications: (1) Write concise alt text for an informative image; (2) Choose an accessible template for a presentation
- Common misconception addressed: Relying on colour alone to convey meaning in a chart or slide
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Alt text, images and tables | 160 | 8 |
| M02L02 | Colour contrast, captions and templates | 160 | 8 |

### M03 Checking and remediation (MASTEMY-DESIGN 33%, design weight)

- Worked applications: (1) Run the Accessibility Checker and fix a flagged missing-alt-text issue; (2) Decide when a built-in pass still needs a manual contrast check
- Common misconception addressed: Assuming a clean Accessibility Checker result guarantees full WCAG conformance
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Running the Accessibility Checker | 160 | 8 |
| M03L02 | Interpreting results and remaining limits | 160 | 8 |

## Integrative case

A communications specialist prepares a report and a slide deck: adds alt text, uses heading styles and meaningful link text, checks colour contrast, runs the Accessibility Checker, and documents the remaining issues and the limits of the built-in checker.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0680-final-protected | 48 | 64 | yes |
| MST-0680-final-alternate | 48 | 64 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Accessibility principles | 16 |
| Accessible content features | 16 |
| Checking and remediation | 16 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0680-Q0001** (single-answer, Select ONE) A document passes the built-in Office Accessibility Checker. What is the most accurate conclusion?

- A. It is a useful first pass, but some issues (e.g. colour contrast on complex backgrounds) may still need manual review **(key)**  
  _Rationale:_ Correct: the built-in checker is a first-pass tool and can miss issues external WCAG checkers catch.
- B. The document is guaranteed to meet all WCAG AA criteria  
  _Rationale:_ Incorrect: a clean pass does not guarantee full WCAG conformance.
- C. No images in the document need alt text  
  _Rationale:_ A pass does not mean alt text is unnecessary; it may have been supplied or missed.
- D. The document cannot be improved further  
  _Rationale:_ Manual review can still improve accessibility.

**MST-0680-Q0002** (multiple-answer, Select TWO) Which TWO techniques improve the accessibility of a Word document? (Select TWO.)

- A. Using built-in heading styles for structure **(key)**  
  _Rationale:_ Correct: heading styles give screen readers a navigable structure.
- B. Writing descriptive, meaningful link text **(key)**  
  _Rationale:_ Correct: meaningful link text helps users who navigate by links.
- C. Conveying required information with colour only  
  _Rationale:_ Incorrect: colour alone excludes users who cannot distinguish it.
- D. Using blank lines to create visual headings  
  _Rationale:_ Incorrect: blank lines are not real structure for assistive technology.

**MST-0680-Q0003** (single-answer, Select ONE) What is the main purpose of alt text on an informative image?

- A. To describe the image's meaning for people using screen readers **(key)**  
  _Rationale:_ Correct: alt text conveys the image's content and function to assistive technology.
- B. To increase the image's resolution  
  _Rationale:_ Alt text does not affect image quality.
- C. To change the image's colour contrast  
  _Rationale:_ Alt text is textual and does not alter colours.
- D. To compress the file size  
  _Rationale:_ Alt text does not compress files.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
