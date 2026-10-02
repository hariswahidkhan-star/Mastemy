# DNS and PKI Essentials

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1683` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-DPE-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — DNS and PKI Essentials (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain how DNS works and its security weaknesses
2. Apply DNS security measures such as DNSSEC and filtering
3. Explain public-key infrastructure and the certificate chain of trust
4. Manage certificates through their lifecycle
5. Troubleshoot common DNS and certificate problems

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 How DNS works (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Trace a name resolution from client to answer; (2) Explain how cache poisoning misleads users
- Common misconception addressed: Assuming DNS answers are always authentic and trustworthy
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Resolution, records and caching | 72 | 6 |
| M01L02 | DNS weaknesses and attacks | 72 | 6 |

### M02 DNS security (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Explain what DNSSEC does and does not protect; (2) Use DNS filtering to block known-bad domains
- Common misconception addressed: Believing DNSSEC encrypts DNS queries for privacy
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | DNSSEC and integrity | 72 | 6 |
| M02L02 | DNS filtering and monitoring | 72 | 6 |

### M03 PKI and trust (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Trace a certificate chain to a trusted root; (2) Explain why a self-signed certificate triggers a warning
- Common misconception addressed: Thinking any certificate, regardless of issuer, proves trust
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Certificates and the chain of trust | 72 | 6 |
| M03L02 | Certificate authorities and validation | 72 | 6 |

### M04 Certificate lifecycle (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Plan automated renewal to prevent expiry; (2) Decide when a certificate must be revoked
- Common misconception addressed: Letting certificates expire because renewal is manual and forgotten
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Issuance, renewal and revocation | 72 | 6 |
| M04L02 | Avoiding expiry and key compromise | 72 | 6 |

### M05 Troubleshooting (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Diagnose why a hostname does not resolve; (2) Interpret a browser certificate error
- Common misconception addressed: Clicking through certificate warnings instead of fixing them
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Diagnosing DNS resolution failures | 72 | 6 |
| M05L02 | Diagnosing certificate errors | 72 | 6 |

## Integrative case

A company's website shows certificate warnings and users are occasionally sent to look-alike sites. Explain how DNS resolution and certificate trust work, add DNS filtering and integrity protection, fix the certificate chain, and set up a lifecycle so certificates never silently expire again.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1683-final-protected | 25 | 25 | yes |
| MST-1683-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| How DNS works | 5 |
| DNS security | 5 |
| PKI and trust | 5 |
| Certificate lifecycle | 5 |
| Troubleshooting | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1683-Q0001** (single-answer, Select ONE) What does DNSSEC primarily provide?

- A. Integrity and authenticity of DNS responses through signatures **(key)**  
  _Rationale:_ Correct: DNSSEC lets resolvers verify answers are authentic and unaltered.
- B. Encryption of DNS queries for privacy  
  _Rationale:_ DNSSEC adds integrity, not confidentiality; that is DoH/DoT.
- C. Faster DNS resolution  
  _Rationale:_ DNSSEC is about trust, not speed.
- D. A guarantee that websites are safe  
  _Rationale:_ It validates records, not website safety.

**MST-1683-Q0002** (multiple-answer, Select TWO) Which TWO practices keep certificates trustworthy over time? (Select TWO.)

- A. Automating renewal before expiry **(key)**  
  _Rationale:_ Correct: automation prevents accidental expiry outages.
- B. Revoking a certificate if its private key is compromised **(key)**  
  _Rationale:_ Correct: revocation invalidates a compromised certificate.
- C. Clicking through browser certificate warnings  
  _Rationale:_ Ignoring warnings hides real trust problems.
- D. Sharing the private key widely for convenience  
  _Rationale:_ Exposing the private key destroys the certificate's trust.

**MST-1683-Q0003** (single-answer, Select ONE) A browser shows a certificate warning for an internal site using a self-signed certificate. Why?

- A. The certificate is not signed by a CA the browser already trusts **(key)**  
  _Rationale:_ Correct: trust requires a chain to a recognised authority.
- B. Self-signed certificates cannot encrypt anything  
  _Rationale:_ They can encrypt; the issue is trust, not encryption.
- C. The site must be offline  
  _Rationale:_ A warning does not mean the site is offline.
- D. DNS has failed completely  
  _Rationale:_ A certificate warning is distinct from DNS failure.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
