# ISC2 Certified Cloud Security Professional: CCSP

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0244` v0.1.0 | Wave 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | ISC2 (no affiliation or endorsement) |
| Exam code | CCSP |
| Version basis | unresolved |
| Evidence | **unverified-needs-official-check** - issuer site blocked by egress proxy (EGRESS_BLOCKED) on 2026-10-02; verified_on empty. Domain structure below is a DESIGN ASSUMPTION. |
| Legacy IDs | MST-CYB-ISC2-CCSP-001 |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply cloud concepts, architecture and design
2. Secure cloud data
3. Secure cloud platform and infrastructure
4. Secure cloud applications
5. Run cloud security operations
6. Address legal, risk and compliance in the cloud

> Outcomes are DESIGN ASSUMPTIONS derived without a verified official outline; confirm against the issuer's exam page at blueprint review.

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Cloud Concepts, Architecture and Design (weighting: DESIGN ASSUMPTION)

- Worked applications: (1) Map shared responsibility across IaaS/PaaS/SaaS; (2) Select a deployment model for three workloads
- Common misconception addressed: Assuming the provider secures customer data in SaaS
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Cloud computing concepts and reference architecture | 160 | 6 |
| M01L02 | Cloud service and deployment models | 160 | 6 |
| M01L03 | Security design principles for cloud | 160 | 6 |

### M02 Cloud Data Security (weighting: DESIGN ASSUMPTION)

- Worked applications: (1) Design key management for data at rest and in transit; (2) Choose tokenisation vs encryption for a payment field
- Common misconception addressed: Believing provider-managed keys remove customer responsibility
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Data lifecycle in the cloud | 160 | 6 |
| M02L02 | Data classification and discovery | 160 | 6 |
| M02L03 | Encryption, tokenisation and key management | 160 | 6 |

### M03 Cloud Platform and Infrastructure Security (weighting: DESIGN ASSUMPTION)

- Worked applications: (1) Harden a cloud network with segmentation and controls; (2) Design multi-region resilience to an RTO
- Common misconception addressed: Treating a region as equivalent to an availability zone
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Cloud infrastructure components | 160 | 6 |
| M03L02 | Securing compute, storage and network | 160 | 6 |
| M03L03 | Business continuity in the cloud | 160 | 6 |

### M04 Cloud Application Security (weighting: DESIGN ASSUMPTION)

- Worked applications: (1) Secure an API gateway and tokens; (2) Identify a misconfiguration leaking a storage bucket
- Common misconception addressed: Assuming cloud-native services are secure by default
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Secure SDLC in the cloud | 160 | 6 |
| M04L02 | Cloud application vulnerabilities | 160 | 6 |
| M04L03 | Identity and APIs | 160 | 6 |

### M05 Cloud Security Operations (weighting: DESIGN ASSUMPTION)

- Worked applications: (1) Design cloud logging and alerting baselines; (2) Sequence response to a leaked access key
- Common misconception addressed: Confusing provider logs with customer-plane logs
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Operating cloud infrastructure securely | 160 | 6 |
| M05L02 | Monitoring and logging | 160 | 6 |
| M05L03 | Incident and change management | 160 | 6 |

### M06 Legal, Risk and Compliance (weighting: DESIGN ASSUMPTION)

- Worked applications: (1) Map a data-residency rule to control requirements; (2) Assess a provider's audit attestations
- Common misconception addressed: Thinking a compliance certificate transfers all risk to the provider
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Legal and regulatory requirements | 160 | 6 |
| M06L02 | Privacy in the cloud | 160 | 6 |
| M06L03 | Audit and vendor risk | 160 | 6 |

## Integrative case

Integrative scenario synthesising the course's domains into a single applied decision task; defended with reasoning. DESIGN ASSUMPTION pending blueprint review.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified (issuer site blocked); confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0244-practice-form-A | 108 | 108 | yes |
| MST-0244-practice-form-B | 108 | 108 | no (optional practice) |
| MST-0244-practice-form-C | 108 | 108 | no (optional practice) |
| MST-0244-final-protected | 108 | 108 | yes |

(answer review budget: 72 min; required forms 216 min + review = cumulative 288 min)

| Domain | Items per form |
|---|---|
| Cloud Concepts, Architecture and Design | 18 |
| Cloud Data Security | 18 |
| Cloud Platform and Infrastructure Security | 18 |
| Cloud Application Security | 18 |
| Cloud Security Operations | 18 |
| Legal, Risk and Compliance | 18 |

Minimum reviewed item bank: 1152 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0244-Q0001** (single-answer, Select ONE) In an IaaS deployment, which responsibility always remains with the customer?

- A. Operating system patching and data protection **(key)**  
  _Rationale:_ Correct: in IaaS the customer manages the OS upward, including data.
- B. Physical datacentre security  
  _Rationale:_ Physical security is always the provider's responsibility.
- C. Hypervisor maintenance  
  _Rationale:_ The provider maintains the virtualisation layer.
- D. Hardware disposal  
  _Rationale:_ Hardware lifecycle is the provider's responsibility.

**MST-0244-Q0002** (single-answer, Select ONE) A company must keep encryption keys outside the cloud provider's control for a sensitive dataset. Which approach fits?

- A. Customer-managed keys held in the customer's own key service (BYOK/HYOK) **(key)**  
  _Rationale:_ Correct: holding keys under customer control keeps the provider from decrypting data.
- B. Provider-managed default encryption keys  
  _Rationale:_ Default provider keys leave the provider able to decrypt.
- C. Disabling encryption to simplify access  
  _Rationale:_ Removing encryption increases exposure and fails the requirement.
- D. Relying on transport encryption only  
  _Rationale:_ Transport encryption does not protect data at rest or control keys.

**MST-0244-Q0003** (multiple-answer, Select TWO) Which TWO controls most directly reduce the risk of a publicly exposed cloud storage bucket?

- A. Enforce default-deny public access at the account level **(key)**  
  _Rationale:_ Correct: blocking public access by default prevents accidental exposure.
- B. Continuously scan configuration for public buckets **(key)**  
  _Rationale:_ Correct: configuration monitoring catches drift that exposes data.
- C. Increase the storage tier performance  
  _Rationale:_ Performance tier is unrelated to access exposure.
- D. Add more object versions  
  _Rationale:_ Versioning does not restrict who can read the objects.
- E. Rotate the bucket name monthly  
  _Rationale:_ Renaming does not control access permissions.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.