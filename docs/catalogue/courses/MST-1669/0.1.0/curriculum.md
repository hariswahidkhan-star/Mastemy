# Web Application Penetration Testing

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1669` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-WAPT-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Web Application Penetration Testing (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain how web applications work and where they are attacked
2. Test for injection and authentication weaknesses responsibly
3. Identify access-control and session-management flaws
4. Recognise client-side and misconfiguration risks
5. Report findings clearly with evidence and remediation advice

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Web app fundamentals (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Read a raw HTTP request and identify its parts; (2) Confirm scope and authorisation before testing
- Common misconception addressed: Testing a target without written authorisation
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | HTTP, requests and the client-server model | 72 | 6 |
| M01L02 | Mapping and scoping a test legally | 72 | 6 |

### M02 Injection flaws (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Identify an input likely vulnerable to SQL injection; (2) Distinguish reflected from stored XSS
- Common misconception addressed: Believing input validation on the client side is enough
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | SQL injection concepts | 72 | 6 |
| M02L02 | Cross-site scripting (XSS) concepts | 72 | 6 |

### M03 Authentication and sessions (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Spot a weak account-recovery flow; (2) Explain how a session token should be handled
- Common misconception addressed: Assuming HTTPS alone makes session handling secure
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Authentication weaknesses | 72 | 6 |
| M03L02 | Session management and fixation | 72 | 6 |

### M04 Access control (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Test whether one user can access another's record; (2) Trace a horizontal-to-vertical privilege escalation
- Common misconception addressed: Trusting that hiding a URL prevents access to it
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Broken access control and IDOR | 72 | 6 |
| M04L02 | Privilege escalation paths | 72 | 6 |

### M05 Reporting (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Write reproducible steps for a confirmed finding; (2) Rate severity and give a concrete fix
- Common misconception addressed: Reporting a vulnerability with no steps a developer can follow
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Evidence, severity and reproducibility | 72 | 6 |
| M05L02 | Writing remediation guidance | 72 | 6 |

## Integrative case

With written authorisation, test a staging web application. Map its functionality, probe for injection and broken access control, confirm a session-handling weakness safely, and write a report that gives developers reproducible steps and clear fixes without exposing the live system.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1669-final-protected | 25 | 25 | yes |
| MST-1669-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Web app fundamentals | 5 |
| Injection flaws | 5 |
| Authentication and sessions | 5 |
| Access control | 5 |
| Reporting | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1669-Q0001** (single-answer, Select ONE) A user can change the id in a URL to view another user's record. Which flaw is this?

- A. Broken access control (insecure direct object reference) **(key)**  
  _Rationale:_ Correct: this is an IDOR, a form of broken access control.
- B. SQL injection  
  _Rationale:_ No database query is being manipulated here.
- C. Cross-site scripting  
  _Rationale:_ No script is being injected into a page.
- D. A denial-of-service attack  
  _Rationale:_ Viewing another record does not deny service.

**MST-1669-Q0002** (multiple-answer, Select TWO) Which TWO must be confirmed before testing a web application? (Select TWO.)

- A. Written authorisation from the owner **(key)**  
  _Rationale:_ Correct: authorisation keeps testing lawful.
- B. An agreed scope of what may be tested **(key)**  
  _Rationale:_ Correct: a defined scope prevents out-of-bounds testing.
- C. The attacker's personal preferences  
  _Rationale:_ Tester preference does not define legality or scope.
- D. A promise that no bugs will be found  
  _Rationale:_ No such promise is possible or relevant.

**MST-1669-Q0003** (single-answer, Select ONE) Why is client-side input validation insufficient on its own to prevent SQL injection?

- A. An attacker can bypass the client and send crafted requests directly to the server **(key)**  
  _Rationale:_ Correct: server-side validation is required because clients can be bypassed.
- B. Client-side validation encrypts the database  
  _Rationale:_ Validation does not encrypt anything.
- C. SQL injection only affects the browser  
  _Rationale:_ SQL injection targets the server-side database.
- D. Servers never receive user input  
  _Rationale:_ Servers do receive and must validate input.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
