# Computer Networking: Protocols, Routing, and Troubleshooting

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0982` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Computer Networking: Protocols, Routing, and Troubleshooting (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Networking models and concepts
2. Addressing and subnetting
3. The transport and network layers
4. Core services: DNS and DHCP
5. Security and the edge
6. Troubleshooting methodology

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Networking models and concepts (MASTEMY-DESIGN 17%)

- Worked applications: (1) Map a web request to layers of the model; (2) Compare the OSI and TCP/IP models
- Common misconception addressed: Treating the OSI layers as physically separate devices
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why layering and the OSI model | 80 | 6 |
| M01L02 | The TCP/IP model and encapsulation | 80 | 6 |

### M02 Addressing and subnetting (MASTEMY-DESIGN 17%)

- Worked applications: (1) Identify the network and host portions of an IPv4 address; (2) Calculate the usable hosts in a subnet
- Common misconception addressed: Confusing a MAC address with an IP address
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | IPv4, MAC and ports | 80 | 6 |
| M02L02 | Subnet masks and CIDR | 80 | 6 |

### M03 The transport and network layers (MASTEMY-DESIGN 17%)

- Worked applications: (1) Compare TCP and UDP for a given application; (2) Explain how a packet is routed between networks
- Common misconception addressed: Assuming UDP is simply a faster, better TCP
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | TCP, UDP and ports | 80 | 6 |
| M03L02 | Routing and the default gateway | 80 | 6 |

### M04 Core services: DNS and DHCP (MASTEMY-DESIGN 17%)

- Worked applications: (1) Trace a DNS lookup from client to answer; (2) Explain how a host obtains an address via DHCP
- Common misconception addressed: Blaming connectivity when the real failure is name resolution
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | DNS resolution | 80 | 6 |
| M04L02 | DHCP and address assignment | 80 | 6 |

### M05 Security and the edge (MASTEMY-DESIGN 16%)

- Worked applications: (1) Describe how a firewall filters traffic by rules; (2) Explain NAT and port forwarding for a service
- Common misconception addressed: Thinking NAT is a complete security control
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Firewalls and ACLs | 80 | 6 |
| M05L02 | NAT, VPNs and the network edge | 80 | 6 |

### M06 Troubleshooting methodology (MASTEMY-DESIGN 16%)

- Worked applications: (1) Apply a layered, bottom-up troubleshooting method; (2) Use ping, traceroute and port checks to isolate a fault
- Common misconception addressed: Changing several things at once so the real cause stays hidden
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | A structured troubleshooting method | 80 | 6 |
| M06L02 | Diagnostic tools and evidence | 80 | 6 |

## Integrative case

Diagnose why an internal web application is unreachable from a branch office: reason through the layered model, check addressing and routing, test name resolution and ports, inspect firewall rules, and document a repeatable troubleshooting method with the evidence at each step.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0982-final-protected | 30 | 30 | yes |
| MST-0982-final-alternate | 30 | 30 | no (optional practice) |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0982-Q0001** (single-answer, Select ONE) At which layer of the TCP/IP model does IP addressing and routing operate?

- A. The internet (network) layer **(key)**  
  _Rationale:_ Correct: IP addressing and routing between networks live at the internet/network layer.
- B. The application layer  
  _Rationale:_ The application layer handles protocols like HTTP, not IP routing.
- C. The link layer  
  _Rationale:_ The link layer handles local delivery and MAC addressing, not routing between networks.
- D. The transport layer  
  _Rationale:_ The transport layer handles TCP/UDP segments, not IP routing.

**MST-0982-Q0002** (multiple-answer, Select TWO) Which TWO statements correctly contrast TCP and UDP? (Select TWO)

- A. TCP provides ordered, reliable delivery with acknowledgements **(key)**  
  _Rationale:_ Correct: TCP guarantees ordered, acknowledged delivery.
- B. UDP has lower overhead and no built-in delivery guarantee **(key)**  
  _Rationale:_ Correct: UDP is connectionless with minimal overhead and no reliability guarantee.
- C. UDP retransmits lost segments automatically  
  _Rationale:_ UDP does not retransmit; that is a TCP feature.
- D. TCP is connectionless  
  _Rationale:_ TCP is connection-oriented, not connectionless.

**MST-0982-Q0003** (single-answer, Select ONE) A user can reach a server by IP address but not by its hostname. What is the most likely cause?

- A. A DNS name-resolution problem **(key)**  
  _Rationale:_ Correct: reachability by IP but not by name points to DNS resolution.
- B. A failed physical cable  
  _Rationale:_ The IP connection works, so the physical link is fine.
- C. An exhausted DHCP pool  
  _Rationale:_ The host already has a working address, so DHCP is not the issue here.
- D. A depleted CPU on the client  
  _Rationale:_ CPU load would not selectively break name resolution.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
