# MySQL Performance Optimization and Query Tuning

Course ID: MST-0944 | Version: 0.1.0 | Category 24: Data Engineering, Databases, Statistics, And Analytics

> This document is a **curriculum specification**, not course content. No lesson scripts, notes, videos, captions or full item bank have been produced. It records the planned structure, outcomes and assessment design for a Mastemy skills course with no external awarding body.

## Course identity

- **Issuer:** Mastemy (no external awarding body)
- **Class:** general-professional-skills | **Level:** foundation
- **Planned time:** 20 hours (1200 minutes); instruction 960 min, assessment 240 min (80/20)
- **Verification status:** n/a-no-official-syllabus (no official body publishes a syllabus for this skill; module weights are MASTEMY-DESIGN, not official weightings)
- **Certificate:** Mastemy Certificate of Completion (does not award any external professional certification or licence)

## Learning outcomes

- **MST-0944-LO1** — How MySQL executes queries
- **MST-0944-LO2** — Indexing strategy
- **MST-0944-LO3** — Query tuning and schema design
- **MST-0944-LO4** — Server configuration and monitoring

## Module and lesson plan

### M01 — How MySQL executes queries  _(MASTEMY-DESIGN 26%)_

- M01L01 — Storage engines, InnoDB and the query execution path (120 min)
- M01L02 — Reading EXPLAIN and understanding access types (120 min)
- Worked applications: Interpret an EXPLAIN plan and identify a full table scan; Compare the plan before and after adding a WHERE-matching index
- Common misconception addressed: Reading EXPLAIN rows as exact row counts rather than estimates

### M02 — Indexing strategy  _(MASTEMY-DESIGN 26%)_

- M02L01 — B-tree indexes, selectivity and cardinality (120 min)
- M02L02 — Composite indexes, covering indexes and index order (120 min)
- Worked applications: Design a composite index honouring the left-prefix rule for a filter-and-sort query; Create a covering index so a query is served from the index alone
- Common misconception addressed: Adding an index per column instead of one composite index for a multi-column filter

### M03 — Query tuning and schema design  _(MASTEMY-DESIGN 24%)_

- M03L01 — Rewriting queries, joins and avoiding anti-patterns (120 min)
- M03L02 — Data types, normalisation and partitioning basics (120 min)
- Worked applications: Rewrite a correlated subquery as a join and measure the difference; Choose appropriate column types to shrink row size and speed scans
- Common misconception addressed: Using SELECT * everywhere and assuming the optimiser makes it free

### M04 — Server configuration and monitoring  _(MASTEMY-DESIGN 24%)_

- M04L01 — Buffer pool, key configuration and connection handling (120 min)
- M04L02 — The slow query log, performance_schema and ongoing monitoring (120 min)
- Worked applications: Enable and read the slow query log to find the top offenders; Size the InnoDB buffer pool for a read-heavy workload
- Common misconception addressed: Believing more hardware always fixes a query that lacks a usable index

## Integrative case

Diagnose and tune a slow MySQL-backed order system: read EXPLAIN plans for the worst queries, design indexes that match the access patterns, rewrite problem queries, and set server and schema choices that keep the workload fast as data grows.

## Assessment design

- Lesson checks (unscored for the certificate): 6 items per lesson, 60 min budget.
- Module checks: one per module, 21 items / 21 min each, threshold 75%.
- Final assessment: one protected form of 40 items (40 min), threshold 80%, plus an optional protected alternate form (not counted in planned time).
- Item formats: single-answer MCQ and multiple-answer selection only (all-or-nothing scoring on multiple-answer).
- Planned reviewed item bank: 344 items (items_reviewed = 0 at this stage).

## What this course does not assess

Selection items assess knowledge and applied reasoning only. Hands-on performance is taught through instructor-built projects and walkthroughs and is not assessed by the MCQ/MR format.
