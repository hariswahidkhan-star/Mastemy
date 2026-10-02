# React Query and Server-State Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0873` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor/product documentation pages were proxy-blocked (EGRESS_BLOCKED) in this session; no official syllabus or weighting is published for this skills course. Re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor/product pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — React Query and Server-State Management (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Distinguish server state from client state
2. Fetch and cache with queries
3. Update data with mutations and invalidation
4. Apply pagination, prefetching and optimistic updates

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Server vs client state (MASTEMY-DESIGN 25%)

- Worked applications: (1) Replace manual fetch/useEffect with a query; (2) Reason about stale vs fresh data
- Common misconception addressed: Treating remote server data like local component state
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why server state is different | 120 | 7 |
| M01L02 | Queries, cache and staleness | 120 | 7 |

### M02 Queries (MASTEMY-DESIGN 25%)

- Worked applications: (1) Key a query by its parameters; (2) Show loading, error and success states
- Common misconception addressed: Using unstable query keys that change each render
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Query keys and caching | 120 | 7 |
| M02L02 | Background refetching and status flags | 120 | 7 |

### M03 Mutations (MASTEMY-DESIGN 25%)

- Worked applications: (1) Invalidate a list after a create; (2) Add an optimistic update with rollback
- Common misconception addressed: Forgetting to invalidate affected queries
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Mutations and cache updates | 120 | 7 |
| M03L02 | Invalidation and optimistic updates | 120 | 7 |

### M04 Advanced patterns (MASTEMY-DESIGN 25%)

- Worked applications: (1) Implement infinite scroll; (2) Prefetch a detail view on hover
- Common misconception addressed: Refetching everything instead of targeted invalidation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Pagination and infinite queries | 120 | 7 |
| M04L02 | Prefetching and performance | 120 | 7 |

## Integrative case

Convert a product-list screen from manual fetching to React Query: cache the list with parameterised keys, add create and delete mutations that invalidate the right queries, show optimistic updates with rollback, and add infinite scroll with prefetching.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0873-final-protected | 40 | 50 | yes |
| MST-0873-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Server vs client state | 10 |
| Queries | 10 |
| Mutations | 10 |
| Advanced patterns | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0873-Q0001** (single-answer, Select ONE) Server state differs from client state mainly because it...

- A. is remote, shared and can become stale **(key)**  
  _Rationale:_ Correct: server state is owned elsewhere and can go stale.
- B. is always synchronous  
  _Rationale:_ Server state is fetched asynchronously.
- C. never changes  
  _Rationale:_ Server data changes over time.
- D. lives only in the URL  
  _Rationale:_ Server state is not stored in the URL.

**MST-0873-Q0002** (multiple-answer, Select TWO) Which TWO statements about React Query are correct? (Select TWO.)

- A. Query keys identify and cache a query **(key)**  
  _Rationale:_ Correct: the key is how the cache stores and finds data.
- B. Invalidating a query triggers a refetch **(key)**  
  _Rationale:_ Correct: invalidation marks data stale and refetches.
- C. Mutations can never affect the cache  
  _Rationale:_ Mutations commonly update or invalidate the cache.
- D. Query keys should change on every render  
  _Rationale:_ Unstable keys defeat caching.

**MST-0873-Q0003** (single-answer, Select ONE) After a successful create mutation, the affected list should usually be...

- A. invalidated so it refetches fresh data **(key)**  
  _Rationale:_ Correct: invalidation keeps the list consistent with the server.
- B. left stale indefinitely  
  _Rationale:_ A stale list misleads the user.
- C. cleared entirely  
  _Rationale:_ Clearing loses cached data unnecessarily.
- D. ignored  
  _Rationale:_ Ignoring the change leaves the UI inconsistent.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
