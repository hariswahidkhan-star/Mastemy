# Redis: Caching, Data Structures, and Application Performance

Course ID: MST-0950 | Version: 0.1.0 | Category 24: Data Engineering, Databases, Statistics, And Analytics

> This document is a **curriculum specification**, not course content. No lesson scripts, notes, videos, captions or full item bank have been produced. It records the planned structure, outcomes and assessment design for a Mastemy skills course with no external awarding body.

## Course identity

- **Issuer:** Mastemy (no external awarding body)
- **Class:** general-professional-skills | **Level:** foundation
- **Planned time:** 20 hours (1200 minutes); instruction 960 min, assessment 240 min (80/20)
- **Verification status:** n/a-no-official-syllabus (no official body publishes a syllabus for this skill; module weights are MASTEMY-DESIGN, not official weightings)
- **Certificate:** Mastemy Certificate of Completion (does not award any external professional certification or licence)

## Learning outcomes

- **MST-0950-LO1** — Redis fundamentals
- **MST-0950-LO2** — Core data structures
- **MST-0950-LO3** — Caching patterns
- **MST-0950-LO4** — Persistence, performance and operations

## Module and lesson plan

### M01 — Redis fundamentals  _(MASTEMY-DESIGN 26%)_

- M01L01 — What Redis is, the key space and basic commands (120 min)
- M01L02 — Strings, expiry (TTL) and atomic counters (120 min)
- Worked applications: Store and increment a page-view counter atomically; Set a key with an expiry and observe it disappear
- Common misconception addressed: Treating Redis as a durable primary database by default

### M02 — Core data structures  _(MASTEMY-DESIGN 26%)_

- M02L01 — Lists, hashes and sets (120 min)
- M02L02 — Sorted sets and their use cases (120 min)
- Worked applications: Model a user profile as a hash and update one field; Build a score-ranked leaderboard with a sorted set
- Common misconception addressed: Serialising a whole object into one string when a hash fits better

### M03 — Caching patterns  _(MASTEMY-DESIGN 24%)_

- M03L01 — Cache-aside, read-through and write strategies (120 min)
- M03L02 — Expiry, eviction policies and cache invalidation (120 min)
- Worked applications: Implement cache-aside for an expensive query with a TTL; Choose an eviction policy for a memory-bounded cache
- Common misconception addressed: Believing cached data is automatically invalidated when the source changes

### M04 — Persistence, performance and operations  _(MASTEMY-DESIGN 24%)_

- M04L01 — RDB snapshots, AOF and durability trade-offs (120 min)
- M04L02 — Memory management, pipelining and monitoring (120 min)
- Worked applications: Reduce round trips by pipelining a batch of commands; Compare RDB and AOF for a given durability requirement
- Common misconception addressed: Assuming Redis never loses data even without AOF enabled

## Integrative case

Add Redis to a web application: cache expensive query results with sensible expiry, model a leaderboard and a session store with the right data structures, protect against stale data, and reason about persistence and memory limits.

## Assessment design

- Lesson checks (unscored for the certificate): 6 items per lesson, 60 min budget.
- Module checks: one per module, 21 items / 21 min each, threshold 75%.
- Final assessment: one protected form of 40 items (40 min), threshold 80%, plus an optional protected alternate form (not counted in planned time).
- Item formats: single-answer MCQ and multiple-answer selection only (all-or-nothing scoring on multiple-answer).
- Planned reviewed item bank: 344 items (items_reviewed = 0 at this stage).

## What this course does not assess

Selection items assess knowledge and applied reasoning only. Hands-on performance is taught through instructor-built projects and walkthroughs and is not assessed by the MCQ/MR format.
