# Cisco CCNP Service Provider: SPCOR Core Exam

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0264` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

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

1. Explain service provider architecture and network fundamentals
2. Configure and troubleshoot core routing and MPLS/segment routing
3. Configure and troubleshoot service provider services and VPNs
4. Apply automation and assurance to service provider operations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

> Domains, weightings and objectives are DESIGN ASSUMPTIONS. The official issuer page was blocked by the egress proxy (EGRESS_BLOCKED) on 2026-10-02 and third-party sources were not treated as authoritative. Confirm every domain and weighting against the official exam page before authoring.

## Modules

### M01 Architecture (weight: design assumption, unverified)

- Worked applications: (1) Choose a core design that meets a stated convergence and scale target; (2) Compare centralised vs distributed forwarding for a provider edge
- Common misconception addressed: Conflating the control plane with the data/forwarding plane
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Service provider network architectures | 144 | 6 |
| M01L02 | Hardware and software forwarding planes | 144 | 6 |
| M01L03 | Design principles and scalability | 144 | 6 |

### M02 Networking (weight: design assumption, unverified)

- Worked applications: (1) Design an IS-IS level-1/level-2 hierarchy for a multi-region core; (2) Apply BGP communities to steer customer traffic
- Common misconception addressed: Assuming a single flat IGP area scales to a national backbone
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | IGP design with OSPF and IS-IS | 144 | 6 |
| M02L02 | BGP for provider networks | 144 | 6 |
| M02L03 | Routing troubleshooting | 144 | 6 |

### M03 MPLS and Segment Routing (weight: design assumption, unverified)

- Worked applications: (1) Migrate an LDP core toward Segment Routing with minimal disruption; (2) Build an SR traffic-engineering policy to avoid a congested link
- Common misconception addressed: Treating Segment Routing as requiring per-flow state in the core
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | MPLS label distribution and forwarding | 144 | 6 |
| M03L02 | Segment Routing with MPLS and SRv6 | 144 | 6 |
| M03L03 | Traffic engineering | 144 | 6 |

### M04 Services (weight: design assumption, unverified)

- Worked applications: (1) Provision an L3VPN with route targets for a multi-site customer; (2) Design a DiffServ QoS model honouring an SLA across the core
- Common misconception addressed: Mixing customer and provider route distinguishers and route targets
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | L3VPN and L2VPN services | 144 | 6 |
| M04L02 | Multicast services | 144 | 6 |
| M04L03 | QoS for provider services | 144 | 6 |

### M05 Automation (weight: design assumption, unverified)

- Worked applications: (1) Draft a model-driven telemetry subscription for link utilisation; (2) Outline a closed-loop remediation for an SLA breach
- Common misconception addressed: Polling SNMP at high frequency instead of streaming telemetry
- Module check: 37 items / 37 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Model-driven configuration and telemetry | 144 | 6 |
| M05L02 | Programmability and APIs | 144 | 6 |
| M05L03 | Assurance and closed-loop operations | 144 | 6 |

## Integrative case

A service provider scales its backbone for new enterprise VPN customers: design the IGP/BGP core, migrate to Segment Routing, provision L3VPN with QoS SLAs, and add model-driven telemetry assurance; justify choices for scale and operability.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count/duration not verified (EGRESS_BLOCKED 2026-10-02); confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0264-practice-form-A | 93 | 93 | yes |
| MST-0264-practice-form-B | 93 | 93 | no (optional practice) |
| MST-0264-practice-form-C | 93 | 93 | no (optional practice) |
| MST-0264-final-protected | 93 | 93 | yes |

| Domain | Items per form |
|---|---|
| Architecture | 19 |
| Networking | 19 |
| MPLS and Segment Routing | 19 |
| Services | 18 |
| Automation | 18 |

Minimum reviewed item bank: 930 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0264-Q0001** (single-answer, Select ONE) A national backbone needs scalable IGP hierarchy. Which IS-IS design supports this best?

- A. A level-1/level-2 hierarchy with regional L1 areas **(key)**  
  _Rationale:_ Correct: L1/L2 hierarchy scales by summarising regional areas into the L2 core.
- B. A single flat level-2 domain for all routers  
  _Rationale:_ A flat domain does not scale to a national backbone.
- C. Running OSPF and IS-IS on every link simultaneously  
  _Rationale:_ Running both IGPs everywhere adds complexity without scaling benefit.
- D. Static routes only  
  _Rationale:_ Static routing cannot scale or converge for a backbone.

**MST-0264-Q0002** (single-answer, Select ONE) Which statement about Segment Routing with MPLS is correct?

- A. The path is encoded in the packet header, removing per-flow core state **(key)**  
  _Rationale:_ Correct: SR source-routes via a label stack, so the core holds no per-flow state.
- B. Every core router must hold per-flow RSVP state  
  _Rationale:_ That describes RSVP-TE, not Segment Routing.
- C. It requires LDP on every node to function  
  _Rationale:_ SR-MPLS does not require LDP; it distributes labels via the IGP.
- D. It cannot do traffic engineering  
  _Rationale:_ SR explicitly supports traffic engineering via segment lists.

**MST-0264-Q0003** (multiple-answer, Select TWO) Which TWO identifiers are required to deliver an MPLS L3VPN correctly for multiple customers? (Select TWO)

- A. Route distinguisher (RD) to keep prefixes unique **(key)**  
  _Rationale:_ Correct: the RD makes overlapping customer prefixes unique in VPNv4.
- B. Route target (RT) to control import/export **(key)**  
  _Rationale:_ Correct: RTs control which VRFs import and export the routes.
- C. A shared public IP for all customers  
  _Rationale:_ A shared public IP does not separate customer routing.
- D. A single global VRF for all customers  
  _Rationale:_ One global VRF would mix customer routes, defeating isolation.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
