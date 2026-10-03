# TCP/IP Networking and Routing

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2323` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — TCP/IP Networking and Routing (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the layered model and encapsulation across OSI and TCP/IP
2. Describe IP addressing, subnetting and routing basics
3. Compare TCP and UDP and their appropriate uses
4. Explain how DNS, DHCP and common application protocols work
5. Reason about latency, bandwidth and reliability
6. Describe core network security and troubleshooting concepts

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Layered models (25% (Mastemy design weight), design weight)

- Worked applications: (1) Label the headers added as data moves down the protocol stack; (2) Map a web request to the layer that performs each function
- Common misconception addressed: Believing the OSI layers correspond one-to-one with physical devices
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | OSI and TCP/IP layers | 120 | 7 |
| M01L02 | Encapsulation and protocol data units | 120 | 7 |

### M02 Addressing and routing (25% (Mastemy design weight), design weight)

- Worked applications: (1) Subnet a /24 network into four equal subnets and list their ranges; (2) Choose the correct next hop from a small routing table
- Common misconception addressed: Confusing a subnet mask with an IP address
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | IPv4/IPv6 addressing and subnetting | 120 | 7 |
| M02L02 | Routing and forwarding basics | 120 | 7 |

### M03 Transport (25% (Mastemy design weight), design weight)

- Worked applications: (1) Explain why a large file transfer uses TCP rather than UDP; (2) Choose UDP for a real-time voice stream and justify the trade-off
- Common misconception addressed: Assuming UDP is always faster and therefore always better
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | TCP connections, flow and congestion control | 120 | 7 |
| M03L02 | UDP and when datagrams fit | 120 | 7 |

### M04 Application services and security (25% (Mastemy design weight), design weight)

- Worked applications: (1) Trace a DNS lookup from resolver to authoritative server; (2) Use ping and traceroute to localise where a path fails
- Common misconception addressed: Thinking a firewall rule applies in both directions by default
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | DNS, DHCP and HTTP | 120 | 7 |
| M04L02 | Firewalls, NAT and troubleshooting | 120 | 7 |

## Integrative case

A small office cannot reach an internal web app: work through addressing, DNS, routing and firewall rules layer by layer to isolate the fault and propose a fix without disrupting other services.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2323-final-protected | 40 | 40 | yes |
| MST-2323-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Layered models | 10 |
| Addressing and routing | 10 |
| Transport | 10 |
| Application services and security | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2323-Q0001** (single-answer, Select ONE) As data passes down the TCP/IP stack from application to network layer, what happens at each layer?

- A. Each layer adds its own header, encapsulating the data from the layer above **(key)**  
  _Rationale:_ Correct: encapsulation adds headers as the PDU descends the stack.
- B. Each layer removes a header added by the layer above  
  _Rationale:_ Headers are added going down and removed going up.
- C. The data is encrypted once at the physical layer  
  _Rationale:_ Encapsulation is not encryption and is not limited to one layer.
- D. Only the application layer touches the data  
  _Rationale:_ Every layer adds its header during encapsulation.

**MST-2323-Q0002** (multiple-answer, Select TWO) Which TWO characteristics describe UDP compared with TCP? (Select TWO.)

- A. It is connectionless, sending datagrams without a handshake **(key)**  
  _Rationale:_ Correct: UDP does not establish a connection before sending.
- B. It does not guarantee ordered, reliable delivery **(key)**  
  _Rationale:_ Correct: UDP provides no retransmission or ordering guarantees.
- C. It uses a three-way handshake to open a connection  
  _Rationale:_ The handshake is a TCP feature, not UDP.
- D. It provides built-in congestion control  
  _Rationale:_ Congestion control is a TCP mechanism, not UDP.

**MST-2323-Q0003** (single-answer, Select ONE) A host has IP 192.168.1.10 with mask 255.255.255.0. How many usable host addresses exist on its subnet?

- A. 254, because 8 host bits give 256 addresses minus network and broadcast **(key)**  
  _Rationale:_ Correct: 2^8 - 2 = 254 usable host addresses.
- B. 256, counting every address in the range  
  _Rationale:_ The network and broadcast addresses are not usable hosts.
- C. 255, subtracting only the broadcast address  
  _Rationale:_ Both the network and broadcast addresses are excluded.
- D. 512, doubling the address count  
  _Rationale:_ A /24 has 256 total addresses, not 512.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
