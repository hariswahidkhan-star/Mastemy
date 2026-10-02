# Cisco CCNP Enterprise: ENARSI Concentration Exam

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0261` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Cisco (no affiliation or endorsement) |
| Exam code | 300-410 |
| Version basis | unresolved (official source not verified) |
| Evidence | **unverified-needs-official-check** - issuer site EGRESS_BLOCKED on 2026-10-02; domains below are DESIGN ASSUMPTIONS |
| Legacy IDs | MST-CYB-CSCO-ENARSI-001 |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Configure and troubleshoot EIGRP, OSPF and BGP in enterprise networks
2. Configure and troubleshoot VPN technologies including DMVPN, MPLS L3VPN and site-to-site VPNs
3. Implement infrastructure security with ACLs, control-plane policing and device access controls
4. Configure and troubleshoot infrastructure services including SNMP, syslog, DHCP, IP SLA and NetFlow

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

> Domains, weightings and objectives are DESIGN ASSUMPTIONS. The official issuer page was blocked by the egress proxy (EGRESS_BLOCKED) on 2026-10-02 and third-party sources were not treated as authoritative. Confirm every domain and weighting against the official exam page before authoring.

## Modules

### M01 Layer 3 Technologies (weight: design assumption, unverified)

- Worked applications: (1) Diagnose a redistribution routing loop between OSPF and EIGRP using route tags; (2) Trace a missing BGP prefix through neighbour state, policy and best-path selection
- Common misconception addressed: Assuming administrative distance alone decides which route installs, ignoring longest-prefix match
- Module check: 48 items / 48 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Troubleshoot EIGRP for IPv4 and IPv6 | 180 | 6 |
| M01L02 | Troubleshoot OSPFv2 and OSPFv3 | 180 | 6 |
| M01L03 | Troubleshoot BGP and route redistribution | 180 | 6 |

### M02 VPN Technologies (weight: design assumption, unverified)

- Worked applications: (1) Localise a DMVPN spoke-to-spoke failure to NHRP registration vs tunnel protection; (2) Verify VRF route leaking and route-target import/export for an MPLS L3VPN customer
- Common misconception addressed: Believing a tunnel that is 'up/up' guarantees end-to-end reachability
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Troubleshoot DMVPN phases and NHRP | 180 | 6 |
| M02L02 | Configure and troubleshoot MPLS Layer 3 VPNs | 180 | 6 |
| M02L03 | Troubleshoot site-to-site GRE and IPsec tunnels | 180 | 6 |

### M03 Infrastructure Security (weight: design assumption, unverified)

- Worked applications: (1) Build a CoPP policy that rate-limits management traffic without dropping routing protocols; (2) Author an IPv6 ACL that permits OSPFv3 and DHCPv6 while denying rogue RAs
- Common misconception addressed: Treating an ACL permit as sufficient without accounting for the implicit deny at the end
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Secure device access with AAA, TACACS+ and RADIUS | 180 | 6 |
| M03L02 | Protect the control plane with CoPP and routing authentication | 180 | 6 |
| M03L03 | Filter traffic with IPv4 and IPv6 ACLs | 180 | 6 |

### M04 Infrastructure Services (weight: design assumption, unverified)

- Worked applications: (1) Design an IP SLA plus object-tracking failover for a dual-ISP edge; (2) Interpret a NetFlow top-talkers report to identify an exfiltration pattern
- Common misconception addressed: Confusing the DHCP relay agent address with the default gateway handed to clients
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Configure SNMP, syslog and NetFlow | 180 | 6 |
| M04L02 | Configure DHCP and DHCP relay | 180 | 6 |
| M04L03 | Configure IP SLA and object tracking | 180 | 6 |

## Integrative case

A regional enterprise merges two networks after an acquisition: resolve overlapping OSPF/EIGRP domains, interconnect sites with DMVPN and MPLS L3VPN, harden device access, and instrument the edge with IP SLA failover; defend each design choice.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count/duration not verified (EGRESS_BLOCKED 2026-10-02); confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0261-practice-form-A | 93 | 93 | yes |
| MST-0261-practice-form-B | 93 | 93 | no (optional practice) |
| MST-0261-practice-form-C | 93 | 93 | no (optional practice) |
| MST-0261-final-protected | 93 | 93 | yes |

| Domain | Items per form |
|---|---|
| Layer 3 Technologies | 24 |
| VPN Technologies | 23 |
| Infrastructure Security | 23 |
| Infrastructure Services | 23 |

Minimum reviewed item bank: 894 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0261-Q0001** (single-answer, Select ONE) OSPF neighbours on a point-to-point link reach EXSTART/EXCHANGE but never FULL. Which cause is most likely?

- A. MTU mismatch between the two interfaces **(key)**  
  _Rationale:_ Correct: an MTU mismatch stalls the database exchange at EXSTART/EXCHANGE.
- B. Different OSPF process IDs  
  _Rationale:_ Process IDs are locally significant and do not prevent adjacency.
- C. Mismatched hello/dead timers  
  _Rationale:_ Timer mismatch prevents reaching even 2-WAY/EXSTART, not stalling at EXCHANGE.
- D. Different interface bandwidth  
  _Rationale:_ Bandwidth affects cost, not adjacency formation.

**MST-0261-Q0002** (single-answer, Select ONE) A DMVPN spoke cannot build a spoke-to-spoke tunnel though both reach the hub. Which component should you check first?

- A. NHRP resolution and registration **(key)**  
  _Rationale:_ Correct: spoke-to-spoke tunnels depend on NHRP resolving the peer's NBMA address.
- B. The hub's default route  
  _Rationale:_ Hub reachability already works, so the hub default route is not the blocker.
- C. The spoke's console password  
  _Rationale:_ Console access is unrelated to tunnel establishment.
- D. QoS shaping on the hub  
  _Rationale:_ Shaping may affect performance but does not stop tunnel resolution.

**MST-0261-Q0003** (multiple-answer, Select TWO) Which TWO actions help a Control Plane Policing (CoPP) policy protect the router without breaking operations? (Select TWO)

- A. Permit routing-protocol traffic to the control plane **(key)**  
  _Rationale:_ Correct: routing protocols must reach the control plane or adjacencies drop.
- B. Rate-limit management traffic such as SSH and SNMP **(key)**  
  _Rationale:_ Correct: rate-limiting management protects the CPU from floods while allowing access.
- C. Drop all traffic destined to the control plane  
  _Rationale:_ Dropping everything would break routing and management entirely.
- D. Apply the policy only to transit data traffic  
  _Rationale:_ CoPP protects control-plane traffic, not transit data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
