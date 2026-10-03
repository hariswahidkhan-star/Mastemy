# Building Websites with WordPress

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2270` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint and teach durable, transferable platform concepts. Platform features, pricing and user interfaces change frequently; product specifics must be verified at production and on-screen steps may differ from any shown. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Building Websites with WordPress (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Distinguish hosting, domains and the WordPress software and set up a working site
2. Structure content with pages, posts, categories and menus for clear navigation
3. Build and edit layouts with the block editor and a theme without touching code
4. Choose, install and configure plugins while managing their security and performance cost
5. Apply core security, backup and update practices to keep a site healthy
6. Optimise basic performance and on-page SEO and publish with confidence

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Foundations: hosting, domains and setup (25% (design weight), design weight)

- Worked applications: (1) Decide what belongs on a page vs a post for a small business site; (2) Draw a menu structure from a list of 12 content items
- Common misconception addressed: Confusing WordPress.com hosting with the self-hosted software
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | How WordPress, hosting and domains fit together | 120 | 7 |
| M01L02 | Installing and configuring a new site | 120 | 7 |

### M02 Content and structure (25% (design weight), design weight)

- Worked applications: (1) Reorganise a blog using categories instead of a flat list; (2) Set human-readable permalinks and fix a broken menu link
- Common misconception addressed: Believing tags and categories are interchangeable
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Pages, posts, categories, tags and menus | 120 | 7 |
| M02L02 | Media, permalinks and navigation design | 120 | 7 |

### M03 Design with themes and blocks (25% (design weight), design weight)

- Worked applications: (1) Rebuild a landing section with blocks and save it as a reusable pattern; (2) Change global colours and fonts without editing each page
- Common misconception addressed: Assuming adding more plugins is the only way to change layout
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | The block editor and reusable patterns | 120 | 7 |
| M03L02 | Themes, templates and global styles | 120 | 7 |

### M04 Plugins, security and going live (25% (design weight), design weight)

- Worked applications: (1) Vet two contact-form plugins on reviews, updates and permissions; (2) Create a backup and restore it to a staging copy
- Common misconception addressed: Thinking automatic updates remove the need for backups
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Selecting and configuring plugins safely | 120 | 7 |
| M04L02 | Backups, updates, performance and launch | 120 | 7 |

## Integrative case

A neighbourhood bakery needs a self-hosted site with a menu, an about page and a blog: choose hosting and a domain, install WordPress, structure the content and navigation, build the pages with blocks, add only a vetted contact-form and backup plugin, harden security, check performance and SEO basics, and publish.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2270-final-protected | 40 | 40 | yes |
| MST-2270-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Foundations: hosting, domains and setup | 10 |
| Content and structure | 10 |
| Design with themes and blocks | 10 |
| Plugins, security and going live | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2270-Q0001** (single-answer, Select ONE) A small business cannot find where to install plugins and custom themes on their WordPress.com-hosted site. What is the most likely cause?

- A. Plugin and theme installation is restricted on lower WordPress.com plans; the self-hosted software allows it fully **(key)**  
  _Rationale:_ Correct: the hosted service limits extensibility on some plans, unlike a self-hosted WordPress install.
- B. Plugins no longer exist in WordPress  
  _Rationale:_ Plugins exist; the limitation is the hosting tier.
- C. Their domain is expired  
  _Rationale:_ An expired domain would take the whole site offline, not just hide plugin options.
- D. They must reinstall the browser  
  _Rationale:_ The browser is unrelated to plan-level feature limits.

**MST-2270-Q0002** (multiple-answer, Select TWO) Which TWO practices most reduce the risk of losing a WordPress site to a failed update or attack? (Select TWO.)

- A. Keeping regular, tested off-site backups **(key)**  
  _Rationale:_ Correct: restorable backups let you recover from a bad update or compromise.
- B. Applying core, theme and plugin updates promptly **(key)**  
  _Rationale:_ Correct: timely updates close known vulnerabilities.
- C. Adding as many plugins as possible  
  _Rationale:_ More plugins increase the attack surface and maintenance burden.
- D. Using a longer site title  
  _Rationale:_ The title has no bearing on security or recovery.

**MST-2270-Q0003** (single-answer, Select ONE) A content editor wants the same styled call-to-action block on ten pages and the ability to update it everywhere at once. What is the best approach?

- A. Create it once as a reusable/synced pattern and insert that pattern on each page **(key)**  
  _Rationale:_ Correct: a synced pattern is edited in one place and updates every instance.
- B. Copy and paste the block onto each page separately  
  _Rationale:_ Copies must each be edited individually, defeating the goal.
- C. Install a new plugin for every page  
  _Rationale:_ That adds overhead and does not provide shared editing.
- D. Write the HTML by hand on each page  
  _Rationale:_ Hand-coding ten copies is error-prone and not centrally editable.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
