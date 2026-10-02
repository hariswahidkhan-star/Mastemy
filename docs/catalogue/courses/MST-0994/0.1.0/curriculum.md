# Site Reliability Engineering: Service Levels and Reliability

Course ID: MST-0994 | Version: 0.1.0 | Category 25: Devops, Cybersecurity, Testing, And Software Architecture

> This document is a **curriculum specification**, not course content. No lesson scripts, notes, videos, captions or full item bank have been produced. It records the planned structure, outcomes and assessment design for a Mastemy skills course with no external awarding body.

## Course identity

- **Issuer:** Mastemy (no external awarding body)
- **Class:** general-professional-skills | **Level:** foundation
- **Planned time:** 20 hours (1200 minutes); instruction 960 min, assessment 240 min (80/20)
- **Verification status:** n/a-no-official-syllabus (no official body publishes a syllabus for this skill; module weights are MASTEMY-DESIGN, not official weightings)
- **Certificate:** Mastemy Certificate of Completion (does not award any external professional certification or licence)

## Learning outcomes

- **MST-0994-LO1** — SRE foundations
- **MST-0994-LO2** — Service level objectives
- **MST-0994-LO3** — Error budgets
- **MST-0994-LO4** — Reliability in practice

## Module and lesson plan

### M01 — SRE foundations  _(MASTEMY-DESIGN 26%)_

- M01L01 — What SRE is, reliability as a feature and toil (120 min)
- M01L02 — SLIs, SLOs and SLAs defined (120 min)
- Worked applications: Classify three measurements as SLI, SLO or SLA; Identify toil in an on-call workflow and propose automation
- Common misconception addressed: Treating an SLA and an SLO as the same thing

### M02 — Service level objectives  _(MASTEMY-DESIGN 26%)_

- M02L01 — Choosing good SLIs for a user journey (120 min)
- M02L02 — Setting realistic SLOs and measurement windows (120 min)
- Worked applications: Define an availability SLI from request success rate; Set a 99.9% SLO over a 28-day window for an API
- Common misconception addressed: Setting a 100% SLO and leaving no room for change

### M03 — Error budgets  _(MASTEMY-DESIGN 24%)_

- M03L01 — Error budgets and burn rate (120 min)
- M03L02 — Using the budget to balance features and reliability (120 min)
- Worked applications: Compute remaining error budget from an SLO and current performance; Decide to pause risky releases when the budget is nearly exhausted
- Common misconception addressed: Alerting on every error rather than on error-budget burn rate

### M04 — Reliability in practice  _(MASTEMY-DESIGN 24%)_

- M04L01 — Monitoring, alerting and on-call (120 min)
- M04L02 — Capacity, change management and reducing toil (120 min)
- Worked applications: Design a burn-rate alert that pages only on meaningful budget loss; Draft an error-budget policy agreed with product stakeholders
- Common misconception addressed: Believing more alerts always mean better reliability

## Integrative case

Define reliability for a customer-facing API: pick SLIs, set SLOs and an error budget, decide alerting on burn rate, and use the budget to balance new features against reliability work, documenting the policy for the team.

## Assessment design

- Lesson checks (unscored for the certificate): 6 items per lesson, 60 min budget.
- Module checks: one per module, 21 items / 21 min each, threshold 75%.
- Final assessment: one protected form of 40 items (40 min), threshold 80%, plus an optional protected alternate form (not counted in planned time).
- Item formats: single-answer MCQ and multiple-answer selection only (all-or-nothing scoring on multiple-answer).
- Planned reviewed item bank: 344 items (items_reviewed = 0 at this stage).

## What this course does not assess

Selection items assess knowledge and applied reasoning only. Hands-on performance is taught through instructor-built projects and walkthroughs and is not assessed by the MCQ/MR format.
