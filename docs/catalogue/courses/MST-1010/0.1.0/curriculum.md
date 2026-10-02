# Web Application Security and OWASP Risk Mitigation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1010` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **MASTEMY-DESIGN** - Mastemy-designed curriculum; no official syllabus |
| Evidence | **n/a-no-official-syllabus** - no external issuer to verify against |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — Web Application Security and OWASP Risk Mitigation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the web trust model and use the OWASP Top 10 as a risk lens
2. Identify and remediate injection and broken-access-control vulnerabilities
3. Mitigate client-side and data-exposure risks such as XSS, CSRF and crypto failures
4. Apply defence-in-depth controls and appropriate web security testing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation, the quality of tools and live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, submitted code or peer review.

## Modules

### M01 Web security foundations (25%, MASTEMY-DESIGN)

- Worked applications: (1) Map a request's trust boundaries from browser to database; (2) Classify three reported bugs against the OWASP Top 10
- Common misconception addressed: Trusting data from the client because the UI validated it
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | How the web trust model works | 120 | 6 |
| M01L02 | HTTP, cookies and the same-origin policy | 120 | 6 |
| M01L03 | The OWASP Top 10 as a risk lens | 120 | 6 |
| M01L04 | Input, output and trust boundaries | 120 | 6 |

### M02 Injection and access-control risks (25%, MASTEMY-DESIGN)

- Worked applications: (1) Rewrite a vulnerable query to use parameterisation; (2) Fix an insecure direct object reference with an authorisation check
- Common misconception addressed: Relying on hidden fields or obscurity instead of server-side authorisation
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | SQL and command injection | 120 | 6 |
| M02L02 | Broken access control and IDOR | 120 | 6 |
| M02L03 | Authentication and session flaws | 120 | 6 |
| M02L04 | Server-side request forgery | 120 | 6 |

### M03 Client-side and data risks (25%, MASTEMY-DESIGN)

- Worked applications: (1) Apply contextual output encoding to stop an XSS; (2) Add anti-CSRF protection to a state-changing form
- Common misconception addressed: Treating HTTPS alone as sufficient protection for all web risks
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Cross-site scripting (XSS) | 120 | 6 |
| M03L02 | Cross-site request forgery (CSRF) | 120 | 6 |
| M03L03 | Security misconfiguration | 120 | 6 |
| M03L04 | Cryptographic failures and data exposure | 120 | 6 |

### M04 Defence in depth and verification (25%, MASTEMY-DESIGN)

- Worked applications: (1) Configure a content security policy that mitigates XSS; (2) Choose review, SAST and DAST for the web risks each finds
- Common misconception addressed: Adding a web application firewall and assuming the code no longer matters
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Secure headers and CSP | 120 | 6 |
| M04L02 | Dependency and supply-chain risk | 120 | 6 |
| M04L03 | Logging, monitoring and rate limiting | 120 | 6 |
| M04L04 | Testing: review, SAST and DAST for web | 120 | 6 |

## Integrative case

A web app handling customer data has outstanding findings across injection, access control and XSS. Prioritise them with the OWASP Top 10, apply the correct fixes, add defence-in-depth controls, and justify why each control addresses its risk.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1010-final-protected | 144 | 144 | yes |
| MST-1010-final-alternate | 144 | 144 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Web security foundations | 36 |
| Injection and access-control risks | 36 |
| Client-side and data risks | 36 |
| Defence in depth and verification | 36 |

Minimum reviewed item bank: 816 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1010-Q0001** (single-answer, Select ONE) A query is built by concatenating user input into a SQL string. Which fix most directly prevents SQL injection?

- A. Use parameterised queries (prepared statements) **(key)**  
  _Rationale:_ Correct: parameterisation separates code from data so input cannot alter the query structure.
- B. Escape only single quotes in the input  
  _Rationale:_ Manual escaping is error-prone and misses encodings and contexts that parameterisation handles safely.
- C. Hide the SQL error messages  
  _Rationale:_ Hiding errors limits information leakage but does not stop the injection.
- D. Run the database on a different port  
  _Rationale:_ Changing the port does not affect query construction.

**MST-1010-Q0002** (single-answer, Select ONE) A user changes an id in a URL and views another customer's order. Which OWASP risk category is this?

- A. Broken access control (insecure direct object reference) **(key)**  
  _Rationale:_ Correct: missing server-side authorisation on an object reference is broken access control.
- B. Cryptographic failure  
  _Rationale:_ No encryption weakness is described; the flaw is authorisation.
- C. Cross-site scripting  
  _Rationale:_ XSS involves executing attacker script in a victim's browser, not object access.
- D. Security logging failure  
  _Rationale:_ The flaw is missing authorisation, not inadequate logging.

**MST-1010-Q0003** (multiple-answer, Select TWO) Which TWO controls help mitigate cross-site scripting? (Select TWO)

- A. Contextual output encoding of untrusted data **(key)**  
  _Rationale:_ Correct: encoding output for its context prevents data from being interpreted as script.
- B. A restrictive Content Security Policy **(key)**  
  _Rationale:_ Correct: a CSP limits which scripts can execute, reducing XSS impact.
- C. Storing passwords in plaintext  
  _Rationale:_ Plaintext passwords are a separate, serious flaw and do nothing against XSS.
- D. Disabling HTTPS  
  _Rationale:_ Disabling HTTPS weakens transport security and does not address XSS.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
