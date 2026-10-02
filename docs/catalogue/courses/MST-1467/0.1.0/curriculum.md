# Google Search Console and SEO Basics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1467` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - vendor product documentation not reachable from build env (https://support.google.com/webmasters; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — Google Search Console and SEO Basics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how search crawling, indexing and ranking work
2. Verify a property and submit a sitemap in Search Console
3. Diagnose coverage and indexing issues
4. Analyze the Performance report for queries, clicks and position
5. Apply on-page SEO (titles, headings, structure)
6. Improve Core Web Vitals and mobile usability

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 How search works (MASTEMY-DESIGN 16%)

- Worked applications: (1) Explain why a page may be crawled but not indexed; (2) List signals that influence ranking
- Common misconception addressed: Believing submitting a URL guarantees top ranking
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Crawling and indexing | 48 | 5 |
| M01L02 | Ranking signals | 48 | 5 |
### M02 Setup (MASTEMY-DESIGN 16%)

- Worked applications: (1) Verify a domain property; (2) Submit a sitemap and check robots.txt
- Common misconception addressed: Blocking important pages in robots.txt by mistake
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Property verification | 48 | 5 |
| M02L02 | Sitemaps and robots | 48 | 5 |
### M03 Indexing issues (MASTEMY-DESIGN 17%)

- Worked applications: (1) Diagnose an excluded page in the report; (2) Use URL Inspection to request indexing
- Common misconception addressed: Assuming noindex pages should appear in search
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Coverage and the Index report | 48 | 5 |
| M03L02 | URL inspection and fixes | 48 | 5 |
### M04 Performance analysis (MASTEMY-DESIGN 17%)

- Worked applications: (1) Find high-impression, low-CTR queries; (2) Compare position changes over time
- Common misconception addressed: Confusing impressions with clicks
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Queries, clicks and impressions | 48 | 5 |
| M04L02 | Average position and CTR | 48 | 5 |
### M05 On-page SEO (MASTEMY-DESIGN 17%)

- Worked applications: (1) Rewrite a weak title and meta description; (2) Add internal links to a key page
- Common misconception addressed: Keyword stuffing instead of useful content
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Titles, headings and content | 48 | 5 |
| M05L02 | Internal links and structured data | 48 | 5 |
### M06 Technical health (MASTEMY-DESIGN 17%)

- Worked applications: (1) Interpret an LCP/CLS issue; (2) Fix a mobile usability error
- Common misconception addressed: Ignoring page experience signals entirely
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Core Web Vitals | 48 | 5 |
| M06L02 | Mobile usability | 48 | 5 |

## Integrative case

A site owner wants more organic traffic: verify the site in Search Console, submit a sitemap, fix indexing and Core Web Vitals issues, analyze the Performance report for queries and pages, and apply on-page SEO, then prioritize fixes by impact.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1467-final-protected | 30 | 30 | yes |
| MST-1467-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| How search works | 5 |
| Setup | 5 |
| Indexing issues | 5 |
| Performance analysis | 5 |
| On-page SEO | 5 |
| Technical health | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1467-Q0001** (single-answer, Select ONE) A page is crawled by Google but is not appearing in search results. Which tool shows why?

- A. The URL Inspection tool in Search Console **(key)**  
  _Rationale:_ Correct: URL Inspection reports the page's index status and reasons.
- B. Google Analytics real-time report  
  _Rationale:_ Analytics shows traffic, not index status.
- C. The firewall log  
  _Rationale:_ Firewall logs are unrelated to indexing.
- D. The billing report  
  _Rationale:_ Billing is unrelated to indexing.

**MST-1467-Q0002** (multiple-answer, Select TWO) Which TWO on-page changes can improve a page's search performance? (Select TWO.)

- A. Write a clear, relevant title and meta description **(key)**  
  _Rationale:_ Correct: descriptive titles/descriptions improve relevance and click-through.
- B. Add helpful internal links to the page **(key)**  
  _Rationale:_ Correct: internal links help discovery and signal importance.
- C. Repeat the keyword dozens of times (keyword stuffing)  
  _Rationale:_ Stuffing degrades quality and can hurt rankings.
- D. Block the page with noindex to rank it faster  
  _Rationale:_ noindex removes the page from search entirely.

**MST-1467-Q0003** (single-answer, Select ONE) In the Search Console Performance report, what does a high number of impressions with a low CTR suggest?

- A. The page ranks/shows but the title or snippet is not compelling enough to earn clicks **(key)**  
  _Rationale:_ Correct: many impressions with few clicks points to a weak title/snippet or position.
- B. The page is not indexed at all  
  _Rationale:_ Impressions mean it is showing in results, so it is indexed.
- C. The site is blocked by robots.txt  
  _Rationale:_ A blocked page would not accumulate impressions.
- D. Core Web Vitals are perfect  
  _Rationale:_ CTR is not a direct measure of Core Web Vitals.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
