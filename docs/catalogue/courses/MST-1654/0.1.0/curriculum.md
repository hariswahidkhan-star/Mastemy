# TCP/IP Deep Dive

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1654` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — TCP/IP Deep Dive (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Network models and the lower layers
2. Addressing, routing and transport
3. Application protocols, DNS and troubleshooting

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 Network models and the lower layers (MASTEMY-DESIGN 34%)

- Worked applications: (1) Map a protocol to its layer in both models; (2) Trace how ARP resolves an IP to a MAC address
- Common misconception addressed: Confusing the OSI model's layer count with the TCP/IP model's
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | OSI and TCP/IP models compared | 80 | 6 |
| M01L02 | The link layer: Ethernet, MAC and ARP | 80 | 6 |
| M01L03 | Encapsulation across the stack | 80 | 6 |

### M02 Addressing, routing and transport (MASTEMY-DESIGN 33%)

- Worked applications: (1) Subnet a network with a given CIDR prefix; (2) Explain the TCP three-way handshake step by step
- Common misconception addressed: Believing a larger subnet mask always means more hosts
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | IPv4 addressing, subnetting and CIDR | 80 | 6 |
| M02L02 | Routing and forwarding basics | 80 | 6 |
| M02L03 | TCP vs UDP and the three-way handshake | 80 | 6 |

### M03 Application protocols, DNS and troubleshooting (MASTEMY-DESIGN 33%)

- Worked applications: (1) Walk a DNS query from resolver to authoritative server; (2) Diagnose a connectivity fault layer by layer
- Common misconception addressed: Jumping to the application layer before checking the lower layers
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | DNS resolution end to end | 80 | 6 |
| M03L02 | Common application protocols (HTTP, DHCP) | 80 | 6 |
| M03L03 | Troubleshooting with a layered method | 80 | 6 |

## Integrative case

Diagnose why a workstation cannot load a website: work layer by layer from link (ARP) through IP addressing and routing, confirm the TCP handshake and the transport choice, then follow the DNS resolution path and the HTTP request to find and explain the fault.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1654-final-protected | 30 | 30 | yes |
| MST-1654-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Network models and the lower layers | 10 |
| Addressing, routing and transport | 10 |
| Application protocols, DNS and troubleshooting | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1654-Q0001** (single-answer, Select ONE) Which protocol resolves a known IPv4 address to the MAC address needed to deliver a frame on the local network?

- A. ARP (Address Resolution Protocol) **(key)**  
  _Rationale:_ Correct: ARP maps an IP address to a MAC address on the local link.
- B. DNS  
  _Rationale:_ DNS resolves names to IP addresses, not IP to MAC.
- C. DHCP  
  _Rationale:_ DHCP assigns IP configuration; it does not resolve IP to MAC.
- D. HTTP  
  _Rationale:_ HTTP is an application protocol, unrelated to IP-to-MAC resolution.

**MST-1654-Q0002** (multiple-answer, Select ALL that apply) Which two statements about TCP and UDP are correct? (Select TWO)

- A. TCP establishes a connection with a three-way handshake before data transfer **(key)**  
  _Rationale:_ Correct: TCP uses SYN, SYN-ACK, ACK to set up a connection.
- B. UDP is connectionless and does not guarantee delivery or ordering **(key)**  
  _Rationale:_ Correct: UDP sends datagrams without connection setup or delivery guarantees.
- C. UDP guarantees in-order, reliable delivery like TCP  
  _Rationale:_ UDP provides no delivery or ordering guarantees.
- D. TCP sends data without any acknowledgements  
  _Rationale:_ TCP uses acknowledgements to provide reliability.

**MST-1654-Q0003** (single-answer, Select ONE) Using a layered troubleshooting method, what should you generally verify before blaming the web application?

- A. Lower-layer connectivity such as link, IP addressing, routing and DNS resolution **(key)**  
  _Rationale:_ Correct: confirming the lower layers first isolates the fault efficiently.
- B. The colour scheme of the website  
  _Rationale:_ Presentation styling is unrelated to connectivity faults.
- C. The number of images on the page  
  _Rationale:_ Image count does not explain a failure to connect.
- D. The user's choice of browser theme  
  _Rationale:_ Browser theme has no bearing on network connectivity.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
