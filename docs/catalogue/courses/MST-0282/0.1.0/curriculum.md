# HashiCorp Vault Associate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0282` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | HashiCorp (no affiliation or endorsement) |
| Exam code | unresolved - not published in catalog |
| Version basis | unresolved - needs official-source verification |
| Evidence | **unverified-needs-official-check** - issuer egress blocked 2026-10-02; official domains/weights/objective IDs/item counts/codes NOT verified |
| Legacy IDs | MST-PRG-HC-VLTA-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 72 / module checks 108 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

> **Modules below are Mastemy design groupings, not a reproduction of the official blueprint.** The official syllabus could not be fetched (issuer network egress blocked on 2026-10-02); domain names, weightings, objective IDs, item counts, exam codes and durations are **not verified**.

## Learning outcomes

1. Describe Vault architecture, seal/unseal and core concepts
2. Configure authentication methods and policies
3. Manage secrets engines and dynamic secrets
4. Operate Vault securely: tokens, leases and encryption as a service

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: This preparation assesses knowledge and applied reasoning through MCQ/MR only; it does not reproduce the official exam's hands-on, performance-based or non-MCQ item formats.

## Modules

### M01 Vault architecture and core concepts (not published - design grouping)

- Worked applications: (1) Describe what happens during initialise and unseal; (2) Trace a request through the Vault API and barrier
- Common misconception addressed: Confusing sealing with stopping the Vault process
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Vault architecture and the storage barrier | 100 | 6 |
| M01L02 | Seal, unseal and key shares (Shamir) | 100 | 6 |
| M01L03 | Vault interfaces: CLI, API and UI | 100 | 6 |
| M01L04 | Namespaces and high-level deployment concepts | 100 | 6 |

### M02 Authentication and policies (not published - design grouping)

- Worked applications: (1) Write an ACL policy granting least privilege to a path; (2) Choose an auth method for a CI pipeline vs a human user
- Common misconception addressed: Assuming a token's capabilities come from the auth method rather than attached policies
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Authentication methods overview | 100 | 6 |
| M02L02 | Tokens and token lifecycle | 100 | 6 |
| M02L03 | ACL policies and path capabilities | 100 | 6 |
| M02L04 | Identity: entities and groups | 100 | 6 |

### M03 Secrets engines and secure operation (not published - design grouping)

- Worked applications: (1) Enable a dynamic database secrets engine and request credentials; (2) Use transit to encrypt data without storing the key in the app
- Common misconception addressed: Treating the KV static secrets engine as if it issued dynamic, expiring credentials
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Static secrets: the KV engine | 100 | 6 |
| M03L02 | Dynamic secrets and database credentials | 100 | 6 |
| M03L03 | Leases, renewal and revocation | 100 | 6 |
| M03L04 | Encryption as a service with Transit | 100 | 6 |

## Integrative case

A team adopts Vault to stop hard-coding credentials: initialise and unseal Vault, set up an auth method with least-privilege policies, enable a dynamic database secrets engine, and manage token leases and encryption as a service.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official exam's question count and duration are not verified (issuer egress blocked); confirm on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0282-practice-form-A | 45 | 45 | yes |
| MST-0282-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0282-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0282-final-protected | 45 | 45 | yes |

| Domain (design grouping) | Items per form |
|---|---|
| Vault architecture and core concepts | 15 |
| Authentication and policies | 15 |
| Secrets engines and secure operation | 15 |

Minimum reviewed item bank: 540 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0282-Q0001** (single-answer, Select ONE) What must happen before a freshly started Vault server can serve secrets?

- A. It must be unsealed using the required threshold of unseal key shares **(key)**  
  _Rationale:_ Correct: Vault starts sealed and must be unsealed before it can decrypt data and serve requests.
- B. Its storage backend must be deleted  
  _Rationale:_ Deleting storage would destroy Vault's data, not make it ready.
- C. All policies must be removed  
  _Rationale:_ Removing policies does not unseal Vault and would break access control.
- D. Audit logging must be disabled  
  _Rationale:_ Disabling audit logging is unrelated to unsealing and is not required.

**MST-0282-Q0002** (single-answer, Select ONE) What is a key advantage of Vault dynamic secrets over long-lived static credentials?

- A. Credentials are generated on demand and expire automatically via leases **(key)**  
  _Rationale:_ Correct: dynamic secrets are short-lived and revoked on lease expiry, reducing exposure.
- B. They never need to be revoked  
  _Rationale:_ Dynamic secrets are specifically designed to be revoked or expired.
- C. They are stored permanently in plaintext  
  _Rationale:_ Vault does not store secrets in plaintext; this is incorrect and insecure.
- D. They remove the need for any authentication to Vault  
  _Rationale:_ Clients must still authenticate to Vault to obtain dynamic secrets.

**MST-0282-Q0003** (multiple-answer, Select TWO) Select TWO statements that correctly describe Vault ACL policies.

- A. Policies grant capabilities (such as read or create) on specific paths **(key)**  
  _Rationale:_ Correct: policies attach capabilities to paths to authorize actions.
- B. A token's effective permissions come from the policies attached to it **(key)**  
  _Rationale:_ Correct: a token can only do what its attached policies allow.
- C. Policies are written to automatically unseal Vault  
  _Rationale:_ Policies do not unseal Vault; unsealing uses key shares.
- D. By default a policy grants access to every path in Vault  
  _Rationale:_ Vault is deny-by-default; access must be explicitly granted.
- E. Policies store the encrypted secret values themselves  
  _Rationale:_ Secret values are stored by secrets engines, not inside policies.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
