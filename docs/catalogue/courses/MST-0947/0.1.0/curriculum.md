# Oracle Database: SQL, PL/SQL, and Administration Foundations

Course ID: MST-0947 | Version: 0.1.0 | Category 24: Data Engineering, Databases, Statistics, And Analytics

> This document is a **curriculum specification**, not course content. No lesson scripts, notes, videos, captions or full item bank have been produced. It records the planned structure, outcomes and assessment design for a Mastemy skills course with no external awarding body.

## Course identity

- **Issuer:** Mastemy (no external awarding body)
- **Class:** general-professional-skills | **Level:** foundation
- **Planned time:** 20 hours (1200 minutes); instruction 960 min, assessment 240 min (80/20)
- **Verification status:** n/a-no-official-syllabus (no official body publishes a syllabus for this skill; module weights are MASTEMY-DESIGN, not official weightings)
- **Certificate:** Mastemy Certificate of Completion (does not award any external professional certification or licence)

## Learning outcomes

- **MST-0947-LO1** — Oracle SQL foundations
- **MST-0947-LO2** — Advanced querying
- **MST-0947-LO3** — PL/SQL programming
- **MST-0947-LO4** — Administration foundations

## Module and lesson plan

### M01 — Oracle SQL foundations  _(MASTEMY-DESIGN 26%)_

- M01L01 — The Oracle architecture, SQL*Plus and SELECT (120 min)
- M01L02 — Joins, set operators and single-row functions (120 min)
- Worked applications: Write a multi-table join reporting employees by department; Use NVL and CASE to clean and classify salary data
- Common misconception addressed: Expecting Oracle string concatenation to use + like some other databases

### M02 — Advanced querying  _(MASTEMY-DESIGN 26%)_

- M02L01 — Aggregates, GROUP BY and HAVING (120 min)
- M02L02 — Subqueries and analytic (window) functions (120 min)
- Worked applications: Rank employees within each department using an analytic function; Filter aggregated groups with HAVING versus WHERE
- Common misconception addressed: Putting an aggregate condition in WHERE instead of HAVING

### M03 — PL/SQL programming  _(MASTEMY-DESIGN 24%)_

- M03L01 — Blocks, variables, control flow and cursors (120 min)
- M03L02 — Procedures, functions, packages and exceptions (120 min)
- Worked applications: Write a cursor loop that applies a salary adjustment with exception handling; Group related procedures into a package with a defined spec and body
- Common misconception addressed: Assuming an unhandled PL/SQL exception silently rolls everything back

### M04 — Administration foundations  _(MASTEMY-DESIGN 24%)_

- M04L01 — Users, roles, privileges and tablespaces (120 min)
- M04L02 — Constraints, indexes and backup/recovery concepts (120 min)
- Worked applications: Grant a role the least privilege needed for a reporting user; Add a foreign-key constraint and a supporting index
- Common misconception addressed: Confusing a role with a user and granting object privileges directly to everyone

## Integrative case

Build and operate the schema for a departmental HR system in Oracle: design tables and constraints, write set-based SQL and analytic queries, encapsulate logic in PL/SQL packages, and apply core administration tasks for users, privileges and backups.

## Assessment design

- Lesson checks (unscored for the certificate): 6 items per lesson, 60 min budget.
- Module checks: one per module, 21 items / 21 min each, threshold 75%.
- Final assessment: one protected form of 40 items (40 min), threshold 80%, plus an optional protected alternate form (not counted in planned time).
- Item formats: single-answer MCQ and multiple-answer selection only (all-or-nothing scoring on multiple-answer).
- Planned reviewed item bank: 344 items (items_reviewed = 0 at this stage).

## What this course does not assess

Selection items assess knowledge and applied reasoning only. Hands-on performance is taught through instructor-built projects and walkthroughs and is not assessed by the MCQ/MR format.
