# Cisco CCNP Data Center: DCCOR Core Exam

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0263` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Cisco (no affiliation or endorsement) |
| Exam code | not resolved |
| Version basis | unresolved (official source not verified) |
| Evidence | **unverified-needs-official-check** - issuer site EGRESS_BLOCKED on 2026-10-02; domains below are DESIGN ASSUMPTIONS |
| Legacy IDs | - |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Configure and troubleshoot data center network fabrics and overlays
2. Configure and troubleshoot unified compute and server policies
3. Configure and troubleshoot data center storage networking
4. Apply automation and security to data center operations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

> Domains, weightings and objectives are DESIGN ASSUMPTIONS. The official issuer page was blocked by the egress proxy (EGRESS_BLOCKED) on 2026-10-02 and third-party sources were not treated as authoritative. Confirm every domain and weighting against the official exam page before authoring.

## Modules

### M01 Network (weight: design assumption, unverified)

- Worked applications: (1) Trace an endpoint across a VXLAN/EVPN fabric from MAC learning to route advertisement; (2) Design a spine-leaf topology sized for a stated oversubscription ratio
- Common misconception addressed: Confusing the underlay routing table with the overlay tenant reachability
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Spine-leaf fabrics and VXLAN/EVPN overlays | 144 | 6 |
| M01L02 | Data center routing and switching | 144 | 6 |
| M01L03 | Fabric troubleshooting | 144 | 6 |

### M02 Compute (weight: design assumption, unverified)

- Worked applications: (1) Build a service-profile template that makes servers stateless and swappable; (2) Diagnose a blade that fails to associate its service profile
- Common misconception addressed: Treating a service profile as tied to specific hardware
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Unified computing architecture and components | 144 | 6 |
| M02L02 | Service profiles and templates | 144 | 6 |
| M02L03 | Compute troubleshooting | 144 | 6 |

### M03 Storage Network (weight: design assumption, unverified)

- Worked applications: (1) Design single-initiator zoning for a new storage array; (2) Resolve an FCoE host that cannot log in to the fabric
- Common misconception addressed: Assuming VLAN separation alone isolates FCoE storage traffic
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Fibre Channel and FCoE fundamentals | 144 | 6 |
| M03L02 | Zoning and VSANs | 144 | 6 |
| M03L03 | Storage troubleshooting | 144 | 6 |

### M04 Automation (weight: design assumption, unverified)

- Worked applications: (1) Draft an idempotent automation workflow to provision a tenant network; (2) Parse an API response to confirm a configuration change applied
- Common misconception addressed: Writing automation that is not idempotent and drifts on re-run
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Data center automation models and tools | 144 | 6 |
| M04L02 | APIs and programmability | 144 | 6 |
| M04L03 | Automation troubleshooting | 144 | 6 |

### M05 Security (weight: design assumption, unverified)

- Worked applications: (1) Apply micro-segmentation policy to isolate a sensitive application tier; (2) Scope an RBAC model for network, compute and storage admins
- Common misconception addressed: Granting broad admin roles rather than least-privilege scopes
- Module check: 37 items / 37 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Data center access and segmentation security | 144 | 6 |
| M05L02 | Role-based access and policy | 144 | 6 |
| M05L03 | Security troubleshooting | 144 | 6 |

## Integrative case

A data center refresh consolidates compute, storage and network onto a programmable fabric: design the VXLAN/EVPN overlay, stateless compute profiles, storage zoning, segmentation policy and an automation workflow; defend the plan for resilience and least privilege.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count/duration not verified (EGRESS_BLOCKED 2026-10-02); confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0263-practice-form-A | 93 | 93 | yes |
| MST-0263-practice-form-B | 93 | 93 | no (optional practice) |
| MST-0263-practice-form-C | 93 | 93 | no (optional practice) |
| MST-0263-final-protected | 93 | 93 | yes |

| Domain | Items per form |
|---|---|
| Network | 19 |
| Compute | 19 |
| Storage Network | 19 |
| Automation | 18 |
| Security | 18 |

Minimum reviewed item bank: 930 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0263-Q0001** (single-answer, Select ONE) In a VXLAN/EVPN fabric, which plane advertises host MAC/IP reachability between leaf switches?

- A. BGP EVPN control plane **(key)**  
  _Rationale:_ Correct: EVPN uses MP-BGP to advertise MAC/IP reachability.
- B. Spanning tree  
  _Rationale:_ Spanning tree is not used for overlay reachability in EVPN fabrics.
- C. The underlay default route  
  _Rationale:_ The underlay provides VTEP reachability, not host MAC/IP advertisement.
- D. FCoE  
  _Rationale:_ FCoE is a storage protocol, unrelated to EVPN host advertisement.

**MST-0263-Q0002** (single-answer, Select ONE) A stateless server deployment lets a replacement blade assume the failed server's identity. Which construct enables this?

- A. A service profile **(key)**  
  _Rationale:_ Correct: a service profile abstracts identity so it can move to new hardware.
- B. A VSAN  
  _Rationale:_ A VSAN segments storage traffic; it does not carry server identity.
- C. A spanning-tree root bridge  
  _Rationale:_ Root bridge election is unrelated to server identity portability.
- D. A DHCP reservation  
  _Rationale:_ A DHCP reservation maps an address, not full server identity/policy.

**MST-0263-Q0003** (multiple-answer, Select TWO) Which TWO practices improve Fibre Channel storage security and correctness? (Select TWO)

- A. Use single-initiator zoning **(key)**  
  _Rationale:_ Correct: single-initiator zoning limits fault and attack scope.
- B. Separate traffic with VSANs **(key)**  
  _Rationale:_ Correct: VSANs isolate fabrics and fault domains.
- C. Place all hosts and targets in one large zone  
  _Rationale:_ A single large zone increases fault and attack scope.
- D. Disable fabric logins entirely  
  _Rationale:_ Disabling logins would prevent storage access altogether.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
