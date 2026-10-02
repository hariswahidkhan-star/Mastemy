# Internationalization and Right-to-Left Web Interfaces

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0899` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Internationalization and Right-to-Left Web Interfaces (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain internationalization versus localization and why they are separated
2. Describe locale-aware formatting of text, numbers, dates and plurals
3. Explain how bidirectional and right-to-left scripts change layout
4. Describe localizing content, assets and formats beyond UI strings
5. Explain the engineering workflow for extracting, managing and testing translations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 i18n foundations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Separate i18n tasks from l10n tasks for one feature; (2) Choose the effective locale from Accept-Language and user settings
- Common misconception addressed: Treating internationalization as merely swapping out English strings
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | i18n vs l10n and the translation pipeline | 96 | 8 |
| M01L02 | Locale identifiers and user language negotiation | 96 | 8 |

### M02 Message formatting and plurals (MASTEMY-DESIGN 20%)

- Worked applications: (1) Format a price and date for three locales; (2) Write a plural-aware message for a count that varies
- Common misconception addressed: Assuming English plural rules (one/other) apply to every language
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Number, date and currency formatting by locale | 96 | 8 |
| M02L02 | Plural rules, gender and message interpolation | 96 | 8 |

### M03 Right-to-left layout (MASTEMY-DESIGN 20%)

- Worked applications: (1) Convert a left/right CSS layout to logical properties; (2) Identify which icons must and must not mirror in RTL
- Common misconception addressed: Believing RTL support is just setting text-align: right
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Bidi text, direction and the dir attribute | 96 | 8 |
| M03L02 | Logical properties and mirroring layouts | 96 | 8 |

### M04 Content and asset localization (MASTEMY-DESIGN 20%)

- Worked applications: (1) Redesign a button that breaks when its label expands 40%; (2) Decide which assets need a localized variant
- Common misconception addressed: Assuming translated text always fits the original layout
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Translating content and handling text expansion | 96 | 8 |
| M04L02 | Localizing images, media and formats | 96 | 8 |

### M05 i18n engineering workflow (MASTEMY-DESIGN 20%)

- Worked applications: (1) Set up extraction keys for a screen of hard-coded strings; (2) Use pseudolocalization to find untranslated or clipped text
- Common misconception addressed: Thinking i18n can be retrofitted trivially after launch with no code changes
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | String extraction and translation management | 96 | 8 |
| M05L02 | Pseudolocalization and i18n testing | 96 | 8 |

## Integrative case

A product expanding into Arabic and German markets must become translatable and support right-to-left layout. Audit the UI for hard-coded strings and left/right assumptions, plan locale-aware formatting and plurals, convert the layout to logical properties, and define a translation and testing workflow.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0899-final-protected | 35 | 35 | yes |
| MST-0899-final-alternate | 35 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| i18n foundations | 7 |
| Message formatting and plurals | 7 |
| Right-to-left layout | 7 |
| Content and asset localization | 7 |
| i18n engineering workflow | 7 |

Minimum reviewed item bank: 398 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0899-Q0001** (single-answer, Select ONE) What is the clearest distinction between internationalization (i18n) and localization (l10n)?

- A. i18n prepares the product to support many locales; l10n adapts it to a specific locale **(key)**  
  _Rationale:_ Correct: i18n is the engineering groundwork, l10n is the per-locale adaptation such as translation.
- B. i18n means translating strings; l10n means writing code  
  _Rationale:_ This reverses the roles; translation is part of l10n.
- C. They are identical terms  
  _Rationale:_ They name distinct, sequential activities.
- D. i18n applies only to right-to-left languages  
  _Rationale:_ i18n applies to all locales, not only RTL ones.

**MST-0899-Q0002** (multiple-answer, Select TWO) Which TWO practices correctly support a right-to-left layout? (Select TWO.)

- A. Use CSS logical properties such as margin-inline-start instead of margin-left **(key)**  
  _Rationale:_ Correct: logical properties flip automatically with text direction.
- B. Set the dir attribute so the browser lays out bidi text correctly **(key)**  
  _Rationale:_ Correct: the dir attribute drives bidirectional layout and text direction.
- C. Hard-code every margin to the left side  
  _Rationale:_ Fixed left-side margins do not flip for RTL and break the layout.
- D. Mirror all icons including directional-neutral ones like a clock  
  _Rationale:_ Neutral icons such as a clock must not be mirrored; only direction-dependent icons like a back arrow flip.

**MST-0899-Q0003** (single-answer, Select ONE) A translated German label is 40% longer than the English original and overflows its button. What is the best fix?

- A. Design the layout to accommodate text expansion with flexible sizing **(key)**  
  _Rationale:_ Correct: allowing for text expansion is a core i18n layout requirement.
- B. Forbid translations longer than the English text  
  _Rationale:_ Languages legitimately expand; forbidding it would mistranslate content.
- C. Shrink the font until any text fits  
  _Rationale:_ Arbitrary shrinking harms readability and accessibility.
- D. Truncate the translation silently  
  _Rationale:_ Silent truncation loses meaning and is a defect, not a fix.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
