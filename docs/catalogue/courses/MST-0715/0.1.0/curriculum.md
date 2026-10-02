# Power Pages: Secure Business Portals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0715` v0.1.0 | Batch 9 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (independent; not affiliated with or endorsed by Microsoft) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **PARTIAL** - product capabilities grounded in official Microsoft Learn docs; module structure is a Mastemy design assumption |
| Evidence | **vendor-docs-partial** - source SRC-MS-POWERPAGES (https://learn.microsoft.com/power-pages/security/power-pages-security) fetched 2026-10-02 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Power Pages: Secure Business Portals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the skills of 'Build a Power Pages site' to professional tasks
2. Apply the skills of 'Authenticate users' to professional tasks
3. Apply the skills of 'Secure data with web roles and permissions' to professional tasks
4. Apply the skills of 'Apply security best practices' to professional tasks

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of the product, the quality of live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded configuration or peer review.

## Modules

### M01 Build a Power Pages site (25%, design assumption)

- Worked applications: (1) Create a page with a list and a form over a Dataverse table; (2) Decide when to switch site visibility from private to public
- Common misconception addressed: Publishing a site publicly before reviewing its data permissions
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What Power Pages is | 60 | 6 |
| M01L02 | Pages, templates and the design studio | 60 | 6 |
| M01L03 | Lists and forms over Dataverse | 60 | 6 |
| M01L04 | Site visibility (private vs public) | 60 | 6 |
### M02 Authenticate users (25%, design assumption)

- Worked applications: (1) Configure an identity provider and test a signed-in user; (2) Decide between anonymous and authenticated access for a page
- Common misconception addressed: Assuming anonymous users should be able to write business data by default
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Contacts represent site users | 60 | 6 |
| M02L02 | Identity providers (Entra External ID, etc.) | 60 | 6 |
| M02L03 | Authenticated vs anonymous users | 60 | 6 |
| M02L04 | Open registration vs validated email | 60 | 6 |
### M03 Secure data with web roles and permissions (25%, design assumption)

- Worked applications: (1) Create a table permission with Contact access and assign a web role; (2) Restrict a list so users see only their own related records
- Common misconception addressed: Using Global access for sensitive data that should be relationship-scoped
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Web roles (Authenticated, Anonymous, custom) | 60 | 6 |
| M03L02 | Table permissions and access types | 60 | 6 |
| M03L03 | Access types: Global, Contact, Self, Account | 60 | 6 |
| M03L04 | Page permissions | 60 | 6 |
### M04 Apply security best practices (25%, design assumption)

- Worked applications: (1) Limit the Web API to required tables and explicit columns; (2) Replace a client-side filter with a server-side table permission
- Common misconception addressed: Relying on JavaScript filtering as if it were a security boundary
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Server-side enforcement over client filtering | 60 | 6 |
| M04L02 | Column permissions and the Web API | 60 | 6 |
| M04L03 | Least-privilege web roles | 60 | 6 |
| M04L04 | Security scan and HTTPS headers | 60 | 6 |

## Integrative case

A membership organization needs a secure self-service portal: build pages with lists and forms over Dataverse, add authentication, scope data with Contact-access table permissions and web roles, and harden it with server-side enforcement, column permissions and a security scan before going public.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0715-final-protected | 72 | 72 | yes |
| MST-0715-final-alternate | 72 | 72 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Build a Power Pages site | 18 |
| Authenticate users | 18 |
| Secure data with web roles and permissions | 18 |
| Apply security best practices | 18 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0715-Q0001** (single-answer, Select ONE) A Power Pages site must let signed-in members see only their own related records. Which table-permission access type fits?

- A. Contact access **(key)**  
  _Rationale:_ Correct: Contact access scopes records to those related to the signed-in user's contact.
- B. Global access  
  _Rationale:_ Global access exposes all records in the table to the web role.
- C. Anonymous access  
  _Rationale:_ Anonymous access is for unauthenticated users and does not scope to a signed-in member.
- D. No permission at all  
  _Rationale:_ Without a table permission, users cannot access the records at all.
**MST-0715-Q0002** (single-answer, Select ONE) Why is client-side JavaScript filtering not an acceptable security boundary in Power Pages?

- A. Users can bypass or modify it, so authorization must be enforced server-side **(key)**  
  _Rationale:_ Correct: client-side filters can be bypassed; table permissions enforce authorization server-side.
- B. It changes the site theme  
  _Rationale:_ Theming is unrelated to authorization.
- C. It disables the Web API  
  _Rationale:_ Client filtering does not disable the Web API.
- D. It automatically grants Global access  
  _Rationale:_ Client filtering does not alter table-permission access types.
**MST-0715-Q0003** (multiple-answer, Select TWO) Which TWO are correct about Power Pages security? (Select TWO)

- A. Table permissions must be associated with web roles to grant data access **(key)**  
  _Rationale:_ Correct: access to Dataverse records is granted by table permissions tied to web roles.
- B. Granting the Anonymous users web role access to a table exposes that data to anyone **(key)**  
  _Rationale:_ Correct: anonymous table permissions make the data visible to any visitor.
- C. Hiding a page from navigation secures the page  
  _Rationale:_ Hiding from navigation is not security; page permissions are required.
- D. Site visibility defaults to public on creation  
  _Rationale:_ Sites default to private/internal until explicitly made public.

## Verification note

Product capabilities described in this spec were grounded in official Microsoft Learn documentation (https://learn.microsoft.com/power-pages/security/power-pages-security) fetched on 2026-10-02. Microsoft publishes no exam syllabus or topic weights for this skills topic, so module weights and structure are Mastemy design assumptions (documented_topic_weights = []). No partnership, affiliation or endorsement is implied.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
