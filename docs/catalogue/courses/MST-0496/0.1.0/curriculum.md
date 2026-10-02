# OpenAI API Foundations and Secure Authentication

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0496` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam | none - Mastemy skills course; no external exam or official syllabus |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — OpenAI API Foundations and Secure Authentication (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the OpenAI API request/response model and core concepts
2. Authenticate to the API securely and manage keys and secrets
3. Make and parse basic API calls with correct error handling
4. Apply secure configuration and secret-management practices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Writing and running real integration code and judgement on production security are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded code or peer review.

## Modules

### M01 API foundations (25%)

- Worked applications: (1) Trace one request from client to response and back; (2) Match three parameters to what they control
- Common misconception addressed: Thinking the API remembers prior calls without you sending context
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The request/response model | 120 | 6 |
| M01L02 | Endpoints, models and parameters | 120 | 6 |

### M02 Authentication and keys (25%)

- Worked applications: (1) Create a scoped API key and describe how it authenticates a call; (2) Plan a key-rotation schedule
- Common misconception addressed: Hard-coding an API key directly in client-side code
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | How API keys authenticate requests | 120 | 6 |
| M02L02 | Creating, rotating and scoping keys | 120 | 6 |

### M03 Making basic calls (25%)

- Worked applications: (1) Write pseudocode that parses a successful response safely; (2) Handle a 401 and a 429 differently with the right response
- Common misconception addressed: Treating every non-200 status the same way
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | A first request and parsing the response | 120 | 6 |
| M03L02 | Handling errors and status codes | 120 | 6 |

### M04 Secret management (25%)

- Worked applications: (1) Move a key from code into an environment variable or secret store; (2) Keep API calls server-side so keys are never exposed to the browser
- Common misconception addressed: Committing a secret key to a public repository
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Storing secrets outside source code | 120 | 6 |
| M04L02 | Environment and server-side key handling | 120 | 6 |

## Integrative case

A junior developer must add OpenAI API calls to a small web app securely: they learn the request/response model, create a scoped key, keep all calls server-side with secrets in a secret store, parse responses and handle 401/429 errors correctly, and set up key rotation.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy-designed skills course; form length set from the assessment time budget, not an external exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0496-final-protected | 72 | 72 | yes |
| MST-0496-final-alternate | 72 | 72 | no (optional) |

| Domain | Items per form |
|---|---|
| API foundations | 18 |
| Authentication and keys | 18 |
| Making basic calls | 18 |
| Secret management | 18 |

Minimum reviewed item bank: 408 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0496-Q0001** (single-answer, Select ONE) Where should an OpenAI API key be used so it is not exposed to end users?

- A. On a server-side component, never in client-side browser code **(key)**  
  _Rationale:_ Correct: keys must stay server-side; client-side code is visible to users.
- B. Hard-coded in the front-end JavaScript bundle  
  _Rationale:_ Front-end code is downloadable, exposing the key to everyone.
- C. In a public GitHub repository for convenience  
  _Rationale:_ Publishing a key leaks it immediately.
- D. In a URL query string to every browser  
  _Rationale:_ Keys in URLs are logged and exposed; this is insecure.

**MST-0496-Q0002** (single-answer, Select ONE) An API call returns HTTP 429. What does this indicate and what is the right response?

- A. A rate/quota limit was hit; back off and retry later **(key)**  
  _Rationale:_ Correct: 429 signals too many requests; the client should back off and retry.
- B. The key is invalid and must be regenerated  
  _Rationale:_ An invalid key returns 401, not 429.
- C. The request succeeded  
  _Rationale:_ 429 is an error, not success.
- D. The model does not exist  
  _Rationale:_ A missing model is a different error, typically 404.

**MST-0496-Q0003** (multiple-answer, Select TWO) Which TWO practices keep API keys secure in a deployed app? (Select TWO)

- A. Store keys in a secret manager or environment variable, not in code **(key)**  
  _Rationale:_ Correct: secrets belong outside source code and client bundles.
- B. Rotate keys periodically and on suspected exposure **(key)**  
  _Rationale:_ Correct: rotation limits the window a leaked key is useful.
- C. Embed the key in client-side JavaScript  
  _Rationale:_ Client-side code exposes the key to all users.
- D. Email the key to the whole team in plain text  
  _Rationale:_ Sharing keys in plaintext spreads and risks the secret.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.

