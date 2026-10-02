# ISC2 CISSP-ISSAP Concentration Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1643` v0.1.0 | Batch 7 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | ISC2 (no affiliation or endorsement) |
| Exam code | ISSAP |
| Version basis | unresolved - needs official-source verification |
| Evidence | **unverified-needs-official-check** - issuer egress blocked 2026-10-02; official domains/weights/objective IDs/item counts NOT verified |
| Legacy IDs | MST-CYB-ISC2-ISSAP-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 72 / module checks 108 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

> **Modules below are Mastemy design groupings, not a reproduction of the official blueprint.** The official syllabus could not be fetched (issuer network egress blocked on 2026-10-02); domain names, weightings, objective IDs, item counts and durations are **not verified**.

## Learning outcomes

1. Explain security architecture governance, requirements analysis and alignment to business and risk
2. Design identity, access management and authentication architectures
3. Architect secure infrastructure, network and application/data security controls
4. Plan architecture for cryptography, security operations and resilience

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Architecture governance and requirements (not published - design grouping)

- Worked applications: (1) Translate three business objectives into security requirements and candidate control sets; (2) Produce a one-page architecture decision record for a contested control trade-off
- Common misconception addressed: Treating a security architecture as a product to buy rather than a set of decisions to justify
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Security architecture frameworks and the architect's role | 100 | 6 |
| M01L02 | Capturing security requirements from business and risk | 100 | 6 |
| M01L03 | Mapping controls to requirements and trade-offs | 100 | 6 |
| M01L04 | Documenting and communicating architecture decisions | 100 | 6 |

### M02 Identity and access management architecture (not published - design grouping)

- Worked applications: (1) Design an SSO and MFA flow for employees and external partners with different assurance needs; (2) Choose RBAC vs ABAC for a scenario and defend the decision against scale and audit needs
- Common misconception addressed: Assuming authentication and authorization are the same control
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Identity lifecycle and federation design | 100 | 6 |
| M02L02 | Authentication factors and assurance levels | 100 | 6 |
| M02L03 | Authorization models: RBAC, ABAC and least privilege | 100 | 6 |
| M02L04 | Privileged access and single sign-on architecture | 100 | 6 |

### M03 Infrastructure, cryptography and operations architecture (not published - design grouping)

- Worked applications: (1) Segment a three-tier application and place controls at each trust boundary; (2) Design a key-management lifecycle for data at rest and in transit and note rotation duties
- Common misconception addressed: Believing encryption alone removes the need for access control and key management
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Network segmentation and secure infrastructure patterns | 100 | 6 |
| M03L02 | Application and data security architecture | 100 | 6 |
| M03L03 | Cryptographic architecture and key management | 100 | 6 |
| M03L04 | Security operations, monitoring and resilience design | 100 | 6 |

## Integrative case

A payments company re-architects its platform: define security requirements, design federated identity and least-privilege access, segment the network, add a key-management scheme, and present the trade-offs to an architecture review board.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official exam's question count and duration are not verified (issuer egress blocked); confirm on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1643-practice-form-A | 45 | 45 | yes |
| MST-1643-practice-form-B | 45 | 45 | no (optional practice) |
| MST-1643-practice-form-C | 45 | 45 | no (optional practice) |
| MST-1643-final-protected | 45 | 45 | yes |

| Domain (design grouping) | Items per form |
|---|---|
| Architecture governance and requirements | 15 |
| Identity and access management architecture | 15 |
| Infrastructure, cryptography and operations architecture | 15 |

Minimum reviewed item bank: 540 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1643-Q0001** (single-answer, Select ONE) An architect must let a partner organization's staff sign in with their own corporate identities, without creating local accounts. Which design best fits?

- A. Identity federation with a trusted external identity provider **(key)**  
  _Rationale:_ Correct: federation lets the partner authenticate users at their own IdP and assert identity to your systems.
- B. Creating shared local accounts for the partner team  
  _Rationale:_ Shared accounts break accountability and are explicitly discouraged.
- C. Disabling authentication for partner traffic  
  _Rationale:_ Removing authentication eliminates the control entirely.
- D. Emailing a single password to all partner staff  
  _Rationale:_ A shared emailed password is neither auditable nor revocable per user.

**MST-1643-Q0002** (single-answer, Select ONE) Which control model grants access based on evaluated attributes such as department, location and time rather than fixed role names?

- A. ABAC (attribute-based access control) **(key)**  
  _Rationale:_ Correct: ABAC evaluates attributes/policies at access time.
- B. RBAC (role-based access control)  
  _Rationale:_ RBAC assigns permissions to named roles, not evaluated attributes.
- C. MAC enforced solely by file owners  
  _Rationale:_ Owner-set permissions describe discretionary control, not attribute policy.
- D. No access control  
  _Rationale:_ This describes an absence of control, not a model.

**MST-1643-Q0003** (multiple-answer, Select TWO) Select TWO responsibilities that belong to a sound cryptographic key-management architecture.

- A. Defining key rotation and expiry schedules **(key)**  
  _Rationale:_ Correct: rotation limits exposure if a key is compromised.
- B. Restricting and auditing access to key material **(key)**  
  _Rationale:_ Correct: controlling who can use keys is central to key management.
- C. Hard-coding keys into application source code  
  _Rationale:_ Embedding keys in source exposes them in repositories and builds.
- D. Reusing one key for every system indefinitely  
  _Rationale:_ A single never-rotated key maximizes blast radius on compromise.
- E. Publishing private keys to simplify integration  
  _Rationale:_ Private keys must never be published; doing so defeats the control.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
