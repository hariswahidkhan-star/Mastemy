# Juniper JNCIS-ENT

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0266` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Juniper Networks (no affiliation or endorsement) |
| Exam code | not resolved |
| Version basis | unresolved (official source not verified) |
| Evidence | **unverified-needs-official-check** - issuer site EGRESS_BLOCKED on 2026-10-02; domains below are DESIGN ASSUMPTIONS |
| Legacy IDs | - |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Configure and troubleshoot Layer 2 switching, VLANs and spanning tree
2. Configure and troubleshoot OSPF and IS-IS in enterprise networks
3. Configure and troubleshoot BGP and routing policy
4. Implement Layer 2 security and high-availability features

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

> Domains, weightings and objectives are DESIGN ASSUMPTIONS. The official issuer page was blocked by the egress proxy (EGRESS_BLOCKED) on 2026-10-02 and third-party sources were not treated as authoritative. Confirm every domain and weighting against the official exam page before authoring.

## Modules

### M01 Layer 2 Switching and VLANs (weight: design assumption, unverified)

- Worked applications: (1) Resolve a spanning-tree loop introduced by a mis-cabled access switch; (2) Design a VLAN and trunk plan for a three-floor office
- Common misconception addressed: Assuming VLANs alone prevent broadcast storms without spanning tree
- Module check: 48 items / 48 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Bridging, VLANs and trunking | 180 | 6 |
| M01L02 | Spanning tree protocols | 180 | 6 |
| M01L03 | Layer 2 troubleshooting | 180 | 6 |

### M02 OSPF and IS-IS (weight: design assumption, unverified)

- Worked applications: (1) Diagnose a stuck OSPF adjacency to an MTU or area-type mismatch; (2) Design an IS-IS level boundary for a two-region enterprise
- Common misconception addressed: Expecting OSPF neighbours to form across mismatched area types
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | OSPF areas and adjacencies | 180 | 6 |
| M02L02 | IS-IS levels and adjacencies | 180 | 6 |
| M02L03 | IGP troubleshooting | 180 | 6 |

### M03 BGP and Routing Policy (weight: design assumption, unverified)

- Worked applications: (1) Apply local-preference and AS-path policy to prefer one upstream; (2) Filter a customer's advertised prefixes with an import policy
- Common misconception addressed: Confusing the direction of local-preference vs MED influence
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | BGP peering and attributes | 180 | 6 |
| M03L02 | Routing policy and route filtering | 180 | 6 |
| M03L03 | BGP troubleshooting | 180 | 6 |

### M04 Layer 2 Security and High Availability (weight: design assumption, unverified)

- Worked applications: (1) Configure port security and storm control for an untrusted access edge; (2) Design a redundant-gateway deployment and test failover
- Common misconception addressed: Believing redundancy is working without actually testing failover
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Port security and storm control | 180 | 6 |
| M04L02 | First-hop and device redundancy | 180 | 6 |
| M04L03 | High-availability troubleshooting | 180 | 6 |

## Integrative case

An enterprise campus is redesigned for resilience: build the VLAN/spanning-tree access layer, an OSPF or IS-IS core, BGP to two ISPs with policy, and Layer 2 security plus gateway redundancy; defend convergence and failure-domain choices.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count/duration not verified (EGRESS_BLOCKED 2026-10-02); confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0266-practice-form-A | 93 | 93 | yes |
| MST-0266-practice-form-B | 93 | 93 | no (optional practice) |
| MST-0266-practice-form-C | 93 | 93 | no (optional practice) |
| MST-0266-final-protected | 93 | 93 | yes |

| Domain | Items per form |
|---|---|
| Layer 2 Switching and VLANs | 24 |
| OSPF and IS-IS | 23 |
| BGP and Routing Policy | 23 |
| Layer 2 Security and High Availability | 23 |

Minimum reviewed item bank: 894 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0266-Q0001** (single-answer, Select ONE) A new switch uplink creates an intermittent broadcast storm. Which protocol is designed to prevent the Layer 2 loop causing it?

- A. Spanning Tree Protocol **(key)**  
  _Rationale:_ Correct: STP blocks redundant paths to prevent Layer 2 loops.
- B. BGP  
  _Rationale:_ BGP is a Layer 3 path-vector protocol, not a loop-prevention mechanism for bridging.
- C. DHCP  
  _Rationale:_ DHCP assigns addresses and does not prevent bridging loops.
- D. SNMP  
  _Rationale:_ SNMP is for monitoring, not loop prevention.

**MST-0266-Q0002** (single-answer, Select ONE) To prefer one upstream ISP for outbound traffic within your AS, which BGP attribute is most appropriate?

- A. Local preference **(key)**  
  _Rationale:_ Correct: local preference is the standard way to influence outbound path selection AS-wide.
- B. MED  
  _Rationale:_ MED influences how a neighbour AS sends traffic to you, not your outbound choice.
- C. Origin code  
  _Rationale:_ Origin is a low-priority tiebreaker, not the primary outbound control.
- D. Router ID  
  _Rationale:_ Router ID is a final tiebreaker, not a policy control.

**MST-0266-Q0003** (multiple-answer, Select TWO) Which TWO controls harden an untrusted access-layer port? (Select TWO)

- A. Port security limiting learned MAC addresses **(key)**  
  _Rationale:_ Correct: port security limits MACs to curb spoofing and CAM flooding.
- B. Storm control to cap broadcast/multicast rates **(key)**  
  _Rationale:_ Correct: storm control limits broadcast/multicast floods.
- C. Enabling an unauthenticated trunk to all VLANs  
  _Rationale:_ An open trunk exposes every VLAN and weakens security.
- D. Disabling spanning tree on the port  
  _Rationale:_ Disabling STP invites loops rather than hardening the port.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
