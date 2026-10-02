# Laravel: Production PHP Application Architecture

Course ID: MST-0917 | Version: 0.1.0 | Category 23: Major Programming Languages And Computer-Science Skills

> This document is a **curriculum specification**, not course content. No lesson scripts, notes, videos, captions or full item bank have been produced. It records the planned structure, outcomes and assessment design for a Mastemy skills course with no external awarding body.

## Course identity

- **Issuer:** Mastemy (no external awarding body)
- **Class:** general-professional-skills | **Level:** foundation
- **Planned time:** 30 hours (1800 minutes); instruction 1440 min, assessment 360 min (80/20)
- **Verification status:** n/a-no-official-syllabus (no official body publishes a syllabus for this skill; module weights are MASTEMY-DESIGN, not official weightings)
- **Certificate:** Mastemy Certificate of Completion (does not award any external professional certification or licence)

## Learning outcomes

- **MST-0917-LO1** — Laravel foundations and request lifecycle
- **MST-0917-LO2** — Eloquent ORM and the database
- **MST-0917-LO3** — Blade, forms and validation
- **MST-0917-LO4** — Authentication, authorization and sessions
- **MST-0917-LO5** — Queues, events and the ecosystem
- **MST-0917-LO6** — Testing and production readiness

## Module and lesson plan

### M01 — Laravel foundations and request lifecycle  _(MASTEMY-DESIGN 17%)_

- M01L01 — MVC structure, the request lifecycle and service container (120 min)
- M01L02 — Routing, controllers and middleware (120 min)
- Worked applications: Trace a request from public/index.php through middleware to a controller response; Bind an interface to an implementation in the service container and resolve it in a controller
- Common misconception addressed: Believing routes are matched in file order regardless of HTTP verb

### M02 — Eloquent ORM and the database  _(MASTEMY-DESIGN 18%)_

- M02L01 — Migrations, models and Eloquent CRUD (120 min)
- M02L02 — Relationships, eager loading and query scopes (120 min)
- Worked applications: Model a projects/tasks one-to-many relationship with migrations and Eloquent; Fix an N+1 query by eager loading a relationship
- Common misconception addressed: Assuming Eloquent relationships are loaded lazily with no performance cost

### M03 — Blade, forms and validation  _(MASTEMY-DESIGN 16%)_

- M03L01 — Blade templating and components (120 min)
- M03L02 — Form requests, validation rules and error display (120 min)
- Worked applications: Build a task-create form backed by a FormRequest with validation messages; Extract a reusable Blade component for a task card
- Common misconception addressed: Trusting client-side validation and skipping server-side validation

### M04 — Authentication, authorization and sessions  _(MASTEMY-DESIGN 17%)_

- M04L01 — Authentication, sessions and guards (120 min)
- M04L02 — Gates, policies and authorization (120 min)
- Worked applications: Write a TaskPolicy so only a project member can edit a task; Register a gate and protect a route with the can middleware
- Common misconception addressed: Confusing authentication (who you are) with authorization (what you may do)

### M05 — Queues, events and the ecosystem  _(MASTEMY-DESIGN 16%)_

- M05L01 — Events, listeners and queued jobs (120 min)
- M05L02 — Mail, notifications and scheduled commands (120 min)
- Worked applications: Queue a job that emails a task assignee on assignment; Schedule an artisan command to prune completed tasks nightly
- Common misconception addressed: Expecting queued jobs to run synchronously without a running worker

### M06 — Testing and production readiness  _(MASTEMY-DESIGN 16%)_

- M06L01 — Feature and unit testing with PHPUnit and factories (120 min)
- M06L02 — Configuration, environments and deployment basics (120 min)
- Worked applications: Write a feature test that asserts an authenticated user can create a task; Move secrets into environment variables and cache config for production
- Common misconception addressed: Committing the .env file and hard-coding credentials in config files

## Integrative case

Build a small team task-management web application in Laravel: model projects and tasks with Eloquent, expose RESTful controllers and validated form requests, protect routes with authentication and policies, queue an email notification, and cover the domain with feature and unit tests.

## Assessment design

- Lesson checks (unscored for the certificate): 6 items per lesson, 90 min budget.
- Module checks: one per module, 21 items / 21 min each, threshold 75%.
- Final assessment: one protected form of 40 items (40 min), threshold 80%, plus an optional protected alternate form (not counted in planned time).
- Item formats: single-answer MCQ and multiple-answer selection only (all-or-nothing scoring on multiple-answer).
- Planned reviewed item bank: 476 items (items_reviewed = 0 at this stage).

## What this course does not assess

Selection items assess knowledge and applied reasoning only. Hands-on performance is taught through instructor-built projects and walkthroughs and is not assessed by the MCQ/MR format.
