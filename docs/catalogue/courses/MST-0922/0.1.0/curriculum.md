# Scala: Functional Programming and Data Applications

Course ID: MST-0922 | Version: 0.1.0 | Category 23: Major Programming Languages And Computer-Science Skills

> This document is a **curriculum specification**, not course content. No lesson scripts, notes, videos, captions or full item bank have been produced. It records the planned structure, outcomes and assessment design for a Mastemy skills course with no external awarding body.

## Course identity

- **Issuer:** Mastemy (no external awarding body)
- **Class:** general-professional-skills | **Level:** foundation
- **Planned time:** 20 hours (1200 minutes); instruction 960 min, assessment 240 min (80/20)
- **Verification status:** n/a-no-official-syllabus (no official body publishes a syllabus for this skill; module weights are MASTEMY-DESIGN, not official weightings)
- **Certificate:** Mastemy Certificate of Completion (does not award any external professional certification or licence)

## Learning outcomes

- **MST-0922-LO1** — Scala language foundations
- **MST-0922-LO2** — Functional programming core
- **MST-0922-LO3** — Collections and error handling
- **MST-0922-LO4** — Applications, concurrency and tooling

## Module and lesson plan

### M01 — Scala language foundations  _(MASTEMY-DESIGN 26%)_

- M01L01 — Values, types, expressions and the REPL (120 min)
- M01L02 — Methods, functions and immutability (120 min)
- Worked applications: Rewrite a mutable running total as an immutable fold; Use the REPL to explore type inference on an expression
- Common misconception addressed: Treating val and var as interchangeable and defaulting to var

### M02 — Functional programming core  _(MASTEMY-DESIGN 26%)_

- M02L01 — Higher-order functions, map, filter and fold (120 min)
- M02L02 — Pattern matching, case classes and sealed traits (120 min)
- Worked applications: Summarise a list of sales with map and reduce; Model a payment outcome with a sealed trait and match on it
- Common misconception addressed: Believing a non-exhaustive match is safe when matching on a sealed trait

### M03 — Collections and error handling  _(MASTEMY-DESIGN 24%)_

- M03L01 — Immutable collections and transformations (120 min)
- M03L02 — Option, Either and Try for safe error handling (120 min)
- Worked applications: Parse user input returning an Either of error or value; Replace null checks with Option and getOrElse
- Common misconception addressed: Using null in Scala instead of Option to represent absence

### M04 — Applications, concurrency and tooling  _(MASTEMY-DESIGN 24%)_

- M04L01 — Traits, objects and structuring an application (120 min)
- M04L02 — Introduction to Futures and the build tooling (sbt) (120 min)
- Worked applications: Compose two Futures that call independent services; Organise code into traits and a companion object, built with sbt
- Common misconception addressed: Assuming a Future runs sequentially and blocks the caller by default

## Integrative case

Build a batch sales-analytics job in Scala: model records with case classes and sealed traits, transform collections with immutable higher-order functions, handle missing data with Option and Either, and structure the code into tested pure functions.

## Assessment design

- Lesson checks (unscored for the certificate): 6 items per lesson, 60 min budget.
- Module checks: one per module, 21 items / 21 min each, threshold 75%.
- Final assessment: one protected form of 40 items (40 min), threshold 80%, plus an optional protected alternate form (not counted in planned time).
- Item formats: single-answer MCQ and multiple-answer selection only (all-or-nothing scoring on multiple-answer).
- Planned reviewed item bank: 344 items (items_reviewed = 0 at this stage).

## What this course does not assess

Selection items assess knowledge and applied reasoning only. Hands-on performance is taught through instructor-built projects and walkthroughs and is not assessed by the MCQ/MR format.
