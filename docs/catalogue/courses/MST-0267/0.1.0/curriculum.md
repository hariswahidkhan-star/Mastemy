# Juniper JNCIP-ENT

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0267` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

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

1. Configure and troubleshoot advanced OSPF and IS-IS
2. Configure and troubleshoot advanced BGP, routing policy and instances
3. Configure and troubleshoot Layer 2 and Layer 3 VPNs and multicast
4. Implement class of service and device security

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

> Domains, weightings and objectives are DESIGN ASSUMPTIONS. The official issuer page was blocked by the egress proxy (EGRESS_BLOCKED) on 2026-10-02 and third-party sources were not treated as authoritative. Confirm every domain and weighting against the official exam page before authoring.

## Modules

### M01 Advanced OSPF and IS-IS (weight: design assumption, unverified)

- Worked applications: (1) Reduce LSA flooding with stub/NSSA area design for a large OSPF domain; (2) Configure IS-IS route leaking to enable optimal inter-level routing
- Common misconception addressed: Assuming a totally stubby area can carry external routes
- Module check: 48 items / 48 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | OSPF area types, LSAs and scaling | 180 | 6 |
| M01L02 | IS-IS route leaking and optimisation | 180 | 6 |
| M01L03 | Advanced IGP troubleshooting | 180 | 6 |

### M02 Advanced BGP, Policy and Instances (weight: design assumption, unverified)

- Worked applications: (1) Design a route-reflector cluster that avoids path hiding; (2) Leak routes between VRFs with policy and rib-groups
- Common misconception addressed: Expecting a single route reflector to preserve all best-path diversity
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | BGP scaling with route reflection and confederations | 180 | 6 |
| M02L02 | Advanced routing policy | 180 | 6 |
| M02L03 | Routing instances and VRFs | 180 | 6 |

### M03 VPNs and Multicast (weight: design assumption, unverified)

- Worked applications: (1) Provision an L3VPN with route targets and verify customer reachability; (2) Build a PIM sparse-mode multicast domain with a rendezvous point
- Common misconception addressed: Confusing the role of RD (uniqueness) with RT (import/export)
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Layer 3 VPNs | 180 | 6 |
| M03L02 | Layer 2 VPNs and VPLS | 180 | 6 |
| M03L03 | Multicast routing | 180 | 6 |

### M04 Class of Service and Security (weight: design assumption, unverified)

- Worked applications: (1) Design a four-class CoS scheme honouring a voice/video SLA; (2) Protect the routing engine with a loopback firewall filter
- Common misconception addressed: Marking traffic at the edge but failing to honour it in the core
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Class of service classification and scheduling | 180 | 6 |
| M04L02 | Device and control-plane security | 180 | 6 |
| M04L03 | CoS and security troubleshooting | 180 | 6 |

## Integrative case

A provider-edge engineer onboards a multi-site enterprise customer: scale the IGP and BGP, deliver L3VPN and multicast services with a four-class CoS SLA, and harden the control plane; justify each design against scale, correctness and security.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count/duration not verified (EGRESS_BLOCKED 2026-10-02); confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0267-practice-form-A | 93 | 93 | yes |
| MST-0267-practice-form-B | 93 | 93 | no (optional practice) |
| MST-0267-practice-form-C | 93 | 93 | no (optional practice) |
| MST-0267-final-protected | 93 | 93 | yes |

| Domain | Items per form |
|---|---|
| Advanced OSPF and IS-IS | 24 |
| Advanced BGP, Policy and Instances | 23 |
| VPNs and Multicast | 23 |
| Class of Service and Security | 23 |

Minimum reviewed item bank: 894 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0267-Q0001** (single-answer, Select ONE) A large OSPF domain suffers excessive LSA flooding. Which design most directly reduces it?

- A. Use stub/NSSA areas to limit external LSA propagation **(key)**  
  _Rationale:_ Correct: stub-type areas block external LSAs, cutting flooding.
- B. Put every router in area 0  
  _Rationale:_ A single backbone area increases, not reduces, flooding.
- C. Increase the hello interval only  
  _Rationale:_ Hello timing does not control LSA flooding scope.
- D. Disable OSPF authentication  
  _Rationale:_ Authentication does not affect flooding volume.

**MST-0267-Q0002** (single-answer, Select ONE) In a route-reflector design, what problem can arise that you must plan around?

- A. Path diversity can be lost because the RR reflects only its best path **(key)**  
  _Rationale:_ Correct: an RR advertises only its best path, which can hide alternatives.
- B. iBGP sessions become impossible  
  _Rationale:_ Route reflection is a way to scale iBGP, not prevent it.
- C. BGP stops supporting policy  
  _Rationale:_ Policy still applies with route reflection.
- D. All eBGP sessions reset  
  _Rationale:_ Route reflection concerns iBGP scaling, not eBGP resets.

**MST-0267-Q0003** (multiple-answer, Select TWO) Which TWO statements about MPLS L3VPN identifiers are correct? (Select TWO)

- A. The RD makes overlapping customer prefixes unique **(key)**  
  _Rationale:_ Correct: the RD ensures VPNv4 prefix uniqueness.
- B. RTs determine which VRFs import a route **(key)**  
  _Rationale:_ Correct: route targets control import/export between VRFs.
- C. The RD controls import/export policy  
  _Rationale:_ Import/export is controlled by RTs, not the RD.
- D. RTs guarantee prefix uniqueness  
  _Rationale:_ Uniqueness is the RD's job, not the RT's.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
