# Networking Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1653` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-CYB-SK-NF-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Networking Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Network models and components
2. Addressing and subnetting
3. Core protocols and services
4. Wireless, security and the edge
5. Troubleshooting and tools

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on device configuration; practical skills are taught through instructor-built labs.

## Modules

### M01 Network models and components (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map a web request to the OSI layers it crosses; (2) Identify the role of a switch vs a router in an office
- Common misconception addressed: Confusing a switch (within a network) with a router (between networks)
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What a network is; LAN, WAN and topologies | 72 | 6 |
| M01L02 | The OSI and TCP/IP models and key devices | 72 | 6 |

### M02 Addressing and subnetting (MASTEMY-DESIGN 24%)

- Worked applications: (1) Split a /24 into two usable subnets; (2) Decide whether two addresses are on the same subnet
- Common misconception addressed: Thinking any two private addresses can always talk without routing
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | IP addressing, IPv4/IPv6 and private ranges | 72 | 6 |
| M02L02 | Subnet masks, CIDR and basic subnetting | 72 | 6 |

### M03 Core protocols and services (MASTEMY-DESIGN 24%)

- Worked applications: (1) Trace what DNS does when you type a URL; (2) Explain why DHCP saves manual configuration
- Common misconception addressed: Believing DNS and DHCP are the same service
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | TCP vs UDP, ports and common protocols | 72 | 6 |
| M03L02 | DNS, DHCP, NAT and how they fit together | 72 | 6 |

### M04 Wireless, security and the edge (MASTEMY-DESIGN 16%)

- Worked applications: (1) Choose a secure Wi-Fi standard for a guest network; (2) Place a firewall between the office and the internet
- Common misconception addressed: Assuming Wi-Fi is private just because it needs a password
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Wireless basics and securing Wi-Fi | 72 | 6 |
| M04L02 | Firewalls, VPNs and network security basics | 72 | 6 |

### M05 Troubleshooting and tools (MASTEMY-DESIGN 16%)

- Worked applications: (1) Use ping and traceroute to locate where traffic stops; (2) Work the layers to isolate a 'no internet' fault
- Common misconception addressed: Jumping to replacing hardware before testing connectivity
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | A layered troubleshooting method | 72 | 6 |
| M05L02 | Common tools: ping, traceroute, ipconfig/ifconfig | 72 | 6 |

## Integrative case

Design the network for a small two-floor office: assign a private IP scheme with subnets per floor, decide what connects to switches vs the router, plan DNS and DHCP, and troubleshoot why one PC cannot reach the internet by working up the layers.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1653-final-protected | 25 | 25 | yes |
| MST-1653-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Network models and components | 5 |
| Addressing and subnetting | 5 |
| Core protocols and services | 5 |
| Wireless, security and the edge | 5 |
| Troubleshooting and tools | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1653-Q0001** (single-answer, Select ONE) Which device forwards traffic BETWEEN different networks, choosing a path based on IP addresses?

- A. A router **(key)**  
  _Rationale:_ Correct: a router forwards packets between networks using IP addressing.
- B. A switch  
  _Rationale:_ A switch forwards frames within a single local network using MAC addresses.
- C. A hub  
  _Rationale:_ A hub simply repeats signals to all ports within one segment.
- D. A network cable  
  _Rationale:_ A cable is a medium; it does not make forwarding decisions.

**MST-1653-Q0002** (multiple-answer, Select ALL that apply) Which statements correctly contrast TCP and UDP? (Select TWO)

- A. TCP establishes a connection and retransmits lost data **(key)**  
  _Rationale:_ Correct: TCP is connection-oriented and reliable.
- B. UDP sends datagrams without guaranteeing delivery or order **(key)**  
  _Rationale:_ Correct: UDP is connectionless and does not guarantee delivery.
- C. UDP always encrypts its payload  
  _Rationale:_ UDP does not provide encryption by itself.
- D. TCP is faster than UDP because it does less work  
  _Rationale:_ TCP does more work (acknowledgements, ordering), so it is generally not faster than UDP.

**MST-1653-Q0003** (single-answer, Select ONE) A PC gets an IP address but cannot resolve website names, though it can ping public IP addresses. What is the most likely cause?

- A. A DNS problem **(key)**  
  _Rationale:_ Correct: reaching IPs but not names points to name resolution (DNS) failing.
- B. A faulty network cable  
  _Rationale:_ A cable fault would usually stop all connectivity, including pinging IPs.
- C. No IP address assigned  
  _Rationale:_ The PC has an IP and can reach IPs, so addressing is working.
- D. The firewall blocking all traffic  
  _Rationale:_ If all traffic were blocked, pinging public IPs would also fail.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
