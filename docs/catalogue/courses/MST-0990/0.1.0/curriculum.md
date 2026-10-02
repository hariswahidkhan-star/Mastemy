# CI/CD Architecture and Secure Release Pipelines

Course ID: MST-0990 | Version: 0.1.0 | Category 25: Devops, Cybersecurity, Testing, And Software Architecture

> This document is a **curriculum specification**, not course content. No lesson scripts, notes, videos, captions or full item bank have been produced. It records the planned structure, outcomes and assessment design for a Mastemy skills course with no external awarding body.

## Course identity

- **Issuer:** Mastemy (no external awarding body)
- **Class:** general-professional-skills | **Level:** foundation
- **Planned time:** 30 hours (1800 minutes); instruction 1440 min, assessment 360 min (80/20)
- **Verification status:** n/a-no-official-syllabus (no official body publishes a syllabus for this skill; module weights are MASTEMY-DESIGN, not official weightings)
- **Certificate:** Mastemy Certificate of Completion (does not award any external professional certification or licence)

## Learning outcomes

- **MST-0990-LO1** — CI/CD foundations
- **MST-0990-LO2** — Build and test automation
- **MST-0990-LO3** — Pipeline security
- **MST-0990-LO4** — Secrets and configuration
- **MST-0990-LO5** — Deployment strategies
- **MST-0990-LO6** — Observability and governance

## Module and lesson plan

### M01 — CI/CD foundations  _(MASTEMY-DESIGN 16%)_

- M01L01 — Continuous integration, delivery and deployment defined (120 min)
- M01L02 — Pipeline stages, triggers and the build-test-deploy flow (120 min)
- Worked applications: Map a commit-to-production flow into discrete pipeline stages; Distinguish continuous delivery from continuous deployment for a team
- Common misconception addressed: Using the terms continuous delivery and continuous deployment as synonyms

### M02 — Build and test automation  _(MASTEMY-DESIGN 17%)_

- M02L01 — Reproducible builds and artifact creation (120 min)
- M02L02 — Automated test stages and fast feedback (120 min)
- Worked applications: Produce an immutable build artifact tagged by commit; Order unit, integration and smoke tests for fastest useful feedback
- Common misconception addressed: Rebuilding the artifact separately for each environment instead of promoting one

### M03 — Pipeline security  _(MASTEMY-DESIGN 17%)_

- M03L01 — Securing the pipeline: least privilege and supply chain (120 min)
- M03L02 — Dependency, SAST and artifact scanning (120 min)
- Worked applications: Add a dependency-vulnerability scan that fails the build on criticals; Give a deploy job only the scoped credentials it needs
- Common misconception addressed: Treating the CI system as trusted and giving pipelines broad admin credentials

### M04 — Secrets and configuration  _(MASTEMY-DESIGN 16%)_

- M04L01 — Secret management and configuration per environment (120 min)
- M04L02 — Signing, provenance and verifying artifacts (120 min)
- Worked applications: Inject secrets at deploy time from a secret store, not from the repo; Sign a build artifact and verify the signature before deploy
- Common misconception addressed: Committing secrets to the repository or baking them into the image

### M05 — Deployment strategies  _(MASTEMY-DESIGN 17%)_

- M05L01 — Environments, approvals and promotion (120 min)
- M05L02 — Blue-green, canary and rollback strategies (120 min)
- Worked applications: Promote one artifact through staging to production with an approval gate; Design a canary release with an automatic rollback trigger
- Common misconception addressed: Assuming a deploy is safe because tests passed, with no rollback plan

### M06 — Observability and governance  _(MASTEMY-DESIGN 17%)_

- M06L01 — Pipeline and deployment metrics (DORA) (120 min)
- M06L02 — Auditability, compliance and continuous improvement (120 min)
- Worked applications: Track lead time and change-failure rate for the pipeline; Produce an audit trail linking each deploy to its commit and approver
- Common misconception addressed: Measuring only deploy frequency and ignoring change-failure rate

## Integrative case

Design a secure release pipeline for a containerised service: build and test on every commit, scan dependencies and artifacts, sign and promote images through environments with approvals, manage secrets safely, and define rollback and audit for each deploy.

## Assessment design

- Lesson checks (unscored for the certificate): 6 items per lesson, 90 min budget.
- Module checks: one per module, 21 items / 21 min each, threshold 75%.
- Final assessment: one protected form of 40 items (40 min), threshold 80%, plus an optional protected alternate form (not counted in planned time).
- Item formats: single-answer MCQ and multiple-answer selection only (all-or-nothing scoring on multiple-answer).
- Planned reviewed item bank: 476 items (items_reviewed = 0 at this stage).

## What this course does not assess

Selection items assess knowledge and applied reasoning only. Hands-on performance is taught through instructor-built projects and walkthroughs and is not assessed by the MCQ/MR format.
