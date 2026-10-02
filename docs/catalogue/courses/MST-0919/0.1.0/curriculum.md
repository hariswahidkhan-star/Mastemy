# Ruby on Rails: Full-Stack Web Development

Course ID: MST-0919 | Version: 0.1.0 | Category 23: Major Programming Languages And Computer-Science Skills

> This document is a **curriculum specification**, not course content. No lesson scripts, notes, videos, captions or full item bank have been produced. It records the planned structure, outcomes and assessment design for a Mastemy skills course with no external awarding body.

## Course identity

- **Issuer:** Mastemy (no external awarding body)
- **Class:** general-professional-skills | **Level:** foundation
- **Planned time:** 20 hours (1200 minutes); instruction 960 min, assessment 240 min (80/20)
- **Verification status:** n/a-no-official-syllabus (no official body publishes a syllabus for this skill; module weights are MASTEMY-DESIGN, not official weightings)
- **Certificate:** Mastemy Certificate of Completion (does not award any external professional certification or licence)

## Learning outcomes

- **MST-0919-LO1** — Rails fundamentals and MVC
- **MST-0919-LO2** — Active Record and the database
- **MST-0919-LO3** — Views, forms and the asset pipeline
- **MST-0919-LO4** — Authentication, testing and deployment

## Module and lesson plan

### M01 — Rails fundamentals and MVC  _(MASTEMY-DESIGN 26%)_

- M01L01 — Rails conventions, the request cycle and routing (120 min)
- M01L02 — Controllers, actions and views (120 min)
- Worked applications: Generate a Book resource and trace a request through router, controller and view; Add a custom member route and its controller action
- Common misconception addressed: Thinking Rails routes must be declared one per action rather than as resources

### M02 — Active Record and the database  _(MASTEMY-DESIGN 26%)_

- M02L01 — Migrations, models and validations (120 min)
- M02L02 — Associations and querying (120 min)
- Worked applications: Model books and reviews with a has_many/belongs_to association; Validate presence and uniqueness on a model and surface errors
- Common misconception addressed: Assuming validations run on raw SQL inserts that bypass Active Record

### M03 — Views, forms and the asset pipeline  _(MASTEMY-DESIGN 24%)_

- M03L01 — ERB templates, partials and layouts (120 min)
- M03L02 — Form helpers, strong parameters and flash messages (120 min)
- Worked applications: Build a new-book form with form_with and strong parameters; Extract a review partial rendered from the book show page
- Common misconception addressed: Permitting all params instead of using strong parameters, risking mass assignment

### M04 — Authentication, testing and deployment  _(MASTEMY-DESIGN 24%)_

- M04L01 — Sessions, authentication and before_action filters (120 min)
- M04L02 — Testing with Minitest and preparing for deployment (120 min)
- Worked applications: Restrict editing a book to its signed-in owner with a before_action; Write a model test for the review-rating validation
- Common misconception addressed: Storing passwords in plain text instead of using has_secure_password

## Integrative case

Build a bookshelf web application in Rails: scaffold Book and Review resources with migrations and Active Record associations, add RESTful controllers and views, validate input, authenticate users, and cover models and requests with tests.

## Assessment design

- Lesson checks (unscored for the certificate): 6 items per lesson, 60 min budget.
- Module checks: one per module, 21 items / 21 min each, threshold 75%.
- Final assessment: one protected form of 40 items (40 min), threshold 80%, plus an optional protected alternate form (not counted in planned time).
- Item formats: single-answer MCQ and multiple-answer selection only (all-or-nothing scoring on multiple-answer).
- Planned reviewed item bank: 344 items (items_reviewed = 0 at this stage).

## What this course does not assess

Selection items assess knowledge and applied reasoning only. Hands-on performance is taught through instructor-built projects and walkthroughs and is not assessed by the MCQ/MR format.
