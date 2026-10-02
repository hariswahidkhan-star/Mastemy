# Identity, Access Management, and Zero Trust

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1012` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Identity, Access Management, and Zero Trust (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Identity and access management foundations
2. Authentication factors and MFA
3. Authorization models: RBAC and ABAC
4. Federation, SSO and tokens
5. Zero Trust principles and architecture
6. Lifecycle, least privilege and monitoring

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 Identity and access management foundations (MASTEMY-DESIGN 16%)

- Worked applications: (1) Distinguish authentication from authorization; (2) Explain the role of an identity provider
- Common misconception addressed: Treating authentication and authorization as the same step
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Identities, accounts and the AAA model | 80 | 6 |
| M01L02 | Identity providers and directories | 80 | 6 |

### M02 Authentication factors and MFA (MASTEMY-DESIGN 17%)

- Worked applications: (1) Classify factors into the three categories; (2) Choose a phishing-resistant factor for admin access
- Common misconception addressed: Counting two passwords as multi-factor authentication
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Something you know, have and are | 80 | 6 |
| M02L02 | MFA, phishing-resistant factors and passwordless | 80 | 6 |

### M03 Authorization models: RBAC and ABAC (MASTEMY-DESIGN 16%)

- Worked applications: (1) Design roles for a small application; (2) Write an ABAC policy using user and resource attributes
- Common misconception addressed: Granting broad roles instead of least-privilege roles
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Role-based access control | 80 | 6 |
| M03L02 | Attribute-based access control and policies | 80 | 6 |

### M04 Federation, SSO and tokens (MASTEMY-DESIGN 16%)

- Worked applications: (1) Explain the SSO login flow at a high level; (2) Validate an access token's scope before granting access
- Common misconception addressed: Trusting a token without verifying its signature and audience
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | SSO, SAML and OpenID Connect | 80 | 6 |
| M04L02 | OAuth 2.0 tokens, scopes and validation | 80 | 6 |

### M05 Zero Trust principles and architecture (MASTEMY-DESIGN 17%)

- Worked applications: (1) Reframe a perimeter design as Zero Trust; (2) Place a policy enforcement point in front of a service
- Common misconception addressed: Assuming being inside the network perimeter implies trust
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Never trust, always verify; assume breach | 80 | 6 |
| M05L02 | Policy enforcement points and microsegmentation | 80 | 6 |

### M06 Lifecycle, least privilege and monitoring (MASTEMY-DESIGN 18%)

- Worked applications: (1) Design an offboarding step that revokes access promptly; (2) Grant just-in-time elevated access with expiry
- Common misconception addressed: Leaving standing privileged access that is never reviewed
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Joiner-mover-leaver and access reviews | 80 | 6 |
| M06L02 | Least privilege, just-in-time access and auditing | 80 | 6 |

## Integrative case

Design access for a SaaS platform under Zero Trust: separate authentication from authorization, require phishing-resistant MFA for admins, model least-privilege RBAC with just-in-time elevation, integrate SSO via OpenID Connect with token validation, and add joiner-mover-leaver reviews and auditing.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1012-final-protected | 30 | 30 | yes |
| MST-1012-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Identity and access management foundations | 5 |
| Authentication factors and MFA | 5 |
| Authorization models: RBAC and ABAC | 5 |
| Federation, SSO and tokens | 5 |
| Zero Trust principles and architecture | 5 |
| Lifecycle, least privilege and monitoring | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1012-Q0001** (single-answer, Select ONE) What is the difference between authentication and authorization?

- A. Authentication proves who you are; authorization decides what you may do **(key)**  
  _Rationale:_ Correct: authentication establishes identity, authorization grants permissions.
- B. They are two names for the same check  
  _Rationale:_ They are distinct steps with different purposes.
- C. Authorization happens before authentication  
  _Rationale:_ You must establish identity before deciding permissions.
- D. Authentication only applies to machines  
  _Rationale:_ Authentication applies to users and machines alike.

**MST-1012-Q0002** (multiple-answer, Select ALL that apply) Which are core Zero Trust principles? (Select TWO)

- A. Never trust, always verify every request **(key)**  
  _Rationale:_ Correct: Zero Trust verifies each request regardless of origin.
- B. Enforce least privilege and assume breach **(key)**  
  _Rationale:_ Correct: minimal access and an assume-breach posture are central to Zero Trust.
- C. Trust any device once it is inside the network perimeter  
  _Rationale:_ Implicit perimeter trust is exactly what Zero Trust rejects.
- D. Grant permanent administrator rights to reduce friction  
  _Rationale:_ Standing broad privilege violates least privilege.

**MST-1012-Q0003** (single-answer, Select ONE) Which combination counts as genuine multi-factor authentication?

- A. A password plus a one-time code from a hardware or app authenticator **(key)**  
  _Rationale:_ Correct: this combines something you know with something you have.
- B. Two different passwords  
  _Rationale:_ Both are the same factor type (something you know).
- C. A username and a password  
  _Rationale:_ A username is an identifier, not a factor.
- D. Answering two security questions  
  _Rationale:_ Both are knowledge factors, so this is single-factor.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
