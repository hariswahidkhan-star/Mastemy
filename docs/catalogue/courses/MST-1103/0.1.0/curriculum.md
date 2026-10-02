# Technical SEO: Crawling, Indexing, and Site Architecture

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1103` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills course; no external exam outline to verify |
| Legacy IDs | - |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Technical SEO: Crawling, Indexing, and Site Architecture (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. How search engines work
2. Crawling and crawl budget
3. Indexing control
4. Site architecture and internal linking
5. Structured data and sitemaps
6. Performance, mobile and auditing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items check knowledge and applied reasoning only; hands-on performance is taught through instructor-built projects and walkthroughs, not assessed by MCQ/MR.

## Modules

### M01 How search engines work (MASTEMY-DESIGN 17%)

- Worked applications: (1) Trace a page from crawl to ranking; (2) Distinguish crawling, indexing and ranking for a case
- Common misconception addressed: Assuming a published page is automatically indexed
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Crawling, indexing and ranking | 67 | 6 |
| M01L02 | Search engine bots and rendering | 67 | 6 |
| M01L03 | Where technical SEO fits | 67 | 6 |

### M02 Crawling and crawl budget (MASTEMY-DESIGN 17%)

- Worked applications: (1) Read a log file to find wasted crawl; (2) Fix a crawl trap in a faceted navigation
- Common misconception addressed: Blocking a page in robots.txt to deindex it
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | robots.txt and directives | 67 | 6 |
| M02L02 | Crawl budget and efficiency | 67 | 6 |
| M02L03 | Diagnosing crawl issues | 67 | 6 |

### M03 Indexing control (MASTEMY-DESIGN 16%)

- Worked applications: (1) Decide index vs noindex for five page types; (2) Set a canonical for a duplicate page
- Common misconception addressed: Confusing noindex with a canonical tag
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | noindex, canonical and parameters | 67 | 6 |
| M03L02 | Managing duplicate content | 67 | 6 |
| M03L03 | Pagination and parameter handling | 67 | 6 |

### M04 Site architecture and internal linking (MASTEMY-DESIGN 17%)

- Worked applications: (1) Flatten a deep site to fewer clicks from home; (2) Plan internal links to a priority page
- Common misconception addressed: Burying key pages many clicks deep
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Logical site structure | 67 | 6 |
| M04L02 | Internal linking for authority flow | 67 | 6 |
| M04L03 | URL structure best practice | 67 | 6 |

### M05 Structured data and sitemaps (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add schema markup to a product page; (2) Build and submit an XML sitemap
- Common misconception addressed: Marking up content that is not on the page
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | XML sitemaps | 66 | 6 |
| M05L02 | Structured data and schema | 66 | 6 |
| M05L03 | Rich results eligibility | 66 | 6 |

### M06 Performance, mobile and auditing (MASTEMY-DESIGN 16%)

- Worked applications: (1) Interpret Core Web Vitals for a slow page; (2) Run a technical SEO audit checklist
- Common misconception addressed: Ignoring mobile and speed as 'not real SEO'
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Core Web Vitals and speed | 66 | 6 |
| M06L02 | Mobile-first indexing | 66 | 6 |
| M06L03 | Running a technical audit | 66 | 6 |

## Integrative case

Audit an underperforming site: diagnose why key pages are not indexed, fix crawl waste and duplicate-content signals, flatten the architecture, add sitemaps and schema, and improve Core Web Vitals.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1103-final-protected | 30 | 30 | yes |
| MST-1103-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| How search engines work | 5 |
| Crawling and crawl budget | 5 |
| Indexing control | 5 |
| Site architecture and internal linking | 5 |
| Structured data and sitemaps | 5 |
| Performance, mobile and auditing | 5 |

Minimum reviewed item bank: 486 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1103-Q0001** (single-answer, Select ONE) To keep a page out of the search index, the correct approach is to:

- A. Block it in robots.txt  
  _Rationale:_ Blocking crawl can leave an already-known URL indexed and stops engines seeing a noindex.
- B. Allow crawling and add a noindex directive **(key)**  
  _Rationale:_ Correct: the page must be crawlable for the engine to read and honour the noindex.
- C. Delete the sitemap  
  _Rationale:_ Removing a sitemap entry does not deindex a page.
- D. Add a canonical to another page  
  _Rationale:_ Canonical is a consolidation hint, not a reliable removal method.

**MST-1103-Q0002** (single-answer, Select ONE) A key page sitting eight clicks from the homepage is a problem mainly because:

- A. Deep pages are always lower quality  
  _Rationale:_ Depth is about discoverability, not inherent quality.
- B. Depth reduces crawl priority and link authority reaching the page **(key)**  
  _Rationale:_ Correct: important pages should sit shallow so crawlers and authority reach them easily.
- C. Search engines cannot render deep pages  
  _Rationale:_ Rendering is unrelated to click depth.
- D. URLs become too long automatically  
  _Rationale:_ URL length is a separate concern from click depth.

**MST-1103-Q0003** (multiple-answer, Select TWO) Which TWO statements about canonical and noindex tags are correct? (Select TWO)

- A. A canonical tag tells search engines which version of similar pages to treat as primary **(key)**  
  _Rationale:_ Correct: canonical consolidates duplicate or similar URLs to a preferred one.
- B. noindex asks search engines to keep a crawlable page out of the index **(key)**  
  _Rationale:_ Correct: noindex is the directive for excluding a page from the index.
- C. A canonical reliably removes a page from the index  
  _Rationale:_ Canonical is a hint for consolidation, not a removal directive.
- D. noindex and canonical mean exactly the same thing  
  _Rationale:_ They serve different purposes and should not be conflated.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
