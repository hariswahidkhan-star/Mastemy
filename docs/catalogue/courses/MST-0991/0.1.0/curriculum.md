# GitHub Actions: Tested and Governed Automation

Course ID: MST-0991 | Version: 0.1.0 | Category 25: Devops, Cybersecurity, Testing, And Software Architecture

> This document is a **curriculum specification**, not course content. No lesson scripts, notes, videos, captions or full item bank have been produced. It records the planned structure, outcomes and assessment design for a Mastemy skills course with no external awarding body.

## Course identity

- **Issuer:** Mastemy (no external awarding body)
- **Class:** general-professional-skills | **Level:** foundation
- **Planned time:** 20 hours (1200 minutes); instruction 960 min, assessment 240 min (80/20)
- **Verification status:** n/a-no-official-syllabus (no official body publishes a syllabus for this skill; module weights are MASTEMY-DESIGN, not official weightings)
- **Certificate:** Mastemy Certificate of Completion (does not award any external professional certification or licence)

## Learning outcomes

- **MST-0991-LO1** — Workflow fundamentals
- **MST-0991-LO2** — Actions, dependencies and caching
- **MST-0991-LO3** — Secrets, permissions and security
- **MST-0991-LO4** — Deployment and governance

## Module and lesson plan

### M01 — Workflow fundamentals  _(MASTEMY-DESIGN 26%)_

- M01L01 — Workflows, events, jobs and steps (120 min)
- M01L02 — Runners, the YAML syntax and the workflow file (120 min)
- Worked applications: Write a workflow that runs tests on every pull request; Trigger a workflow on push to main and on a schedule
- Common misconception addressed: Thinking every job in a workflow shares the same filesystem and runner by default

### M02 — Actions, dependencies and caching  _(MASTEMY-DESIGN 26%)_

- M02L01 — Using and pinning marketplace actions (120 min)
- M02L02 — Caching, artifacts and passing data between jobs (120 min)
- Worked applications: Cache package dependencies to speed up repeated runs; Upload a build artifact in one job and download it in another
- Common misconception addressed: Referencing an action by a mutable tag instead of a pinned version

### M03 — Secrets, permissions and security  _(MASTEMY-DESIGN 24%)_

- M03L01 — Secrets, variables and the GITHUB_TOKEN (120 min)
- M03L02 — Least-privilege permissions and environment protection (120 min)
- Worked applications: Scope the GITHUB_TOKEN permissions down to read-only where possible; Store a deploy credential as an environment secret with required reviewers
- Common misconception addressed: Printing secrets to logs or exposing them to workflows from forked pull requests

### M04 — Deployment and governance  _(MASTEMY-DESIGN 24%)_

- M04L01 — Environments, approvals and deployment jobs (120 min)
- M04L02 — Branch protection, required checks and reusable workflows (120 min)
- Worked applications: Require a manual approval before the production deployment job runs; Make the test workflow a required status check via branch protection
- Common misconception addressed: Assuming a green workflow is enforced without configuring required checks

## Integrative case

Build a governed CI/CD workflow in GitHub Actions for a web service: run tests on pull requests, cache dependencies, scope secrets and permissions, deploy to an environment with required approval, and enforce the workflow with branch protection.

## Assessment design

- Lesson checks (unscored for the certificate): 6 items per lesson, 60 min budget.
- Module checks: one per module, 21 items / 21 min each, threshold 75%.
- Final assessment: one protected form of 40 items (40 min), threshold 80%, plus an optional protected alternate form (not counted in planned time).
- Item formats: single-answer MCQ and multiple-answer selection only (all-or-nothing scoring on multiple-answer).
- Planned reviewed item bank: 344 items (items_reviewed = 0 at this stage).

## What this course does not assess

Selection items assess knowledge and applied reasoning only. Hands-on performance is taught through instructor-built projects and walkthroughs and is not assessed by the MCQ/MR format.
