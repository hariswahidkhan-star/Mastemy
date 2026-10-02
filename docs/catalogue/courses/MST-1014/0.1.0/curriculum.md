# Cloud Security Posture and Configuration Assurance

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1014` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Cloud Security Posture and Configuration Assurance (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Cloud security posture fundamentals
2. Identity, access and least privilege
3. Network and data-protection configuration
4. Benchmarks, baselines and compliance mapping
5. Detecting and remediating misconfigurations
6. Continuous assurance and guardrails

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 Cloud security posture fundamentals (MASTEMY-DESIGN 16%)

- Worked applications: (1) Draw the shared-responsibility boundary for an IaaS workload; (2) Build a resource inventory for one cloud account
- Common misconception addressed: Believing the cloud provider secures your configurations for you
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Posture, shared responsibility and CSPM | 80 | 6 |
| M01L02 | The cloud control plane and inventory | 80 | 6 |

### M02 Identity, access and least privilege (MASTEMY-DESIGN 17%)

- Worked applications: (1) Rewrite an over-broad policy to least privilege; (2) Find and disable an unused high-privilege credential
- Common misconception addressed: Treating 'authenticated' as equivalent to 'authorised'
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | IAM roles, policies and trust | 80 | 6 |
| M02L02 | Enforcing least privilege and removing standing access | 80 | 6 |

### M03 Network and data-protection configuration (MASTEMY-DESIGN 16%)

- Worked applications: (1) Close a security group that exposes a database to the internet; (2) Verify encryption-at-rest and block public storage access
- Common misconception addressed: Assuming a private subnet alone makes a resource unreachable
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Securing network exposure and segmentation | 80 | 6 |
| M03L02 | Encryption, key management and public exposure | 80 | 6 |

### M04 Benchmarks, baselines and compliance mapping (MASTEMY-DESIGN 16%)

- Worked applications: (1) Score an account against a CIS benchmark subset; (2) Map three failing checks to a compliance control
- Common misconception addressed: Confusing a passing benchmark score with being compliant
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Baselines and benchmarks (CIS, provider defaults) | 80 | 6 |
| M04L02 | Mapping controls to compliance frameworks | 80 | 6 |

### M05 Detecting and remediating misconfigurations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Triage a list of findings by exploitability and exposure; (2) Write a remediation step for a public bucket finding
- Common misconception addressed: Remediating by severity label alone, ignoring exposure
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Finding drift and misconfigurations | 80 | 6 |
| M05L02 | Prioritising and remediating findings | 80 | 6 |

### M06 Continuous assurance and guardrails (MASTEMY-DESIGN 18%)

- Worked applications: (1) Write a preventive guardrail that blocks public buckets; (2) Design a weekly posture report for stakeholders
- Common misconception addressed: Relying only on periodic scans instead of preventive controls
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Preventive guardrails and policy as code | 80 | 6 |
| M06L02 | Continuous monitoring and reporting | 80 | 6 |

## Integrative case

Assess a single cloud account that hosts a public web app and a private database: inventory the resources, fix an over-broad IAM policy and an internet-exposed database, confirm encryption and no public storage, score it against a benchmark subset, add a preventive guardrail against public buckets, and produce a posture report.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1014-final-protected | 30 | 30 | yes |
| MST-1014-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Cloud security posture fundamentals | 5 |
| Identity, access and least privilege | 5 |
| Network and data-protection configuration | 5 |
| Benchmarks, baselines and compliance mapping | 5 |
| Detecting and remediating misconfigurations | 5 |
| Continuous assurance and guardrails | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1014-Q0001** (single-answer, Select ONE) Under the shared-responsibility model for an IaaS virtual machine, who is responsible for patching the guest operating system?

- A. The customer, because the OS runs above the provider's responsibility boundary for IaaS **(key)**  
  _Rationale:_ Correct: for IaaS the provider secures the hypervisor and below; the guest OS is the customer's.
- B. The cloud provider, because they own all underlying hardware  
  _Rationale:_ The provider owns the hardware but not the guest OS in IaaS.
- C. Neither party, because the OS patches itself automatically  
  _Rationale:_ Patching is not automatic by default and must be owned.
- D. A third-party auditor  
  _Rationale:_ Auditors assess, they do not operate the control.

**MST-1014-Q0002** (multiple-answer, Select ALL that apply) Which two findings represent an internet-exposed data store that should be prioritised? (Select TWO)

- A. A storage bucket with a public-read access policy **(key)**  
  _Rationale:_ Correct: public-read exposes data directly to the internet.
- B. A database security group allowing 0.0.0.0/0 on the database port **(key)**  
  _Rationale:_ Correct: an any-source rule on the DB port exposes it to the internet.
- C. A database encrypted at rest with a managed key  
  _Rationale:_ Encryption at rest is a good control, not an exposure.
- D. A VM in a private subnet with no public IP  
  _Rationale:_ No public IP and a private subnet is not internet-exposed.

**MST-1014-Q0003** (single-answer, Select ONE) Why is a preventive guardrail generally stronger than a periodic scan for stopping public buckets?

- A. It blocks the misconfiguration at creation time rather than reporting it after the fact **(key)**  
  _Rationale:_ Correct: prevention stops the exposure window that a scan only detects later.
- B. It removes the need to ever inventory resources  
  _Rationale:_ Inventory is still needed regardless of guardrails.
- C. It encrypts the bucket contents automatically  
  _Rationale:_ A guardrail controls configuration, it does not perform encryption.
- D. It guarantees compliance with every framework  
  _Rationale:_ One guardrail does not equal full compliance.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
