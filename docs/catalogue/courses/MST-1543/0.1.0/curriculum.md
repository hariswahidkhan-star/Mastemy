# Computer Networks for Developers

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1543` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-CND-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Computer Networks for Developers (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Network models and layering
2. The link and physical layers
3. The network layer and IP
4. Transport: TCP and UDP
5. DNS and application protocols
6. HTTP and the web
7. Security on the wire
8. Performance and debugging

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live packet analysis; capturing and debugging traffic is taught through instructor-built walkthroughs.

## Modules

### M01 Network models and layering (MASTEMY-DESIGN 12%)

- Worked applications: (1) Map a web request to the TCP/IP layers; (2) Trace encapsulation from application data to a frame
- Common misconception addressed: Expecting the OSI model to map one-to-one onto real protocols
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The layered model: OSI and TCP/IP | 75 | 6 |
| M01L02 | Encapsulation and how data moves through layers | 75 | 6 |

### M02 The link and physical layers (MASTEMY-DESIGN 11%)

- Worked applications: (1) Explain how a switch forwards by MAC address; (2) Resolve an IP to a MAC with ARP
- Common misconception addressed: Confusing a MAC address with an IP address
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Ethernet, MAC addresses and switches | 75 | 6 |
| M02L02 | ARP and the local-network boundary | 75 | 6 |

### M03 The network layer and IP (MASTEMY-DESIGN 14%)

- Worked applications: (1) Subnet a /24 into smaller networks; (2) Explain how NAT maps private to public addresses
- Common misconception addressed: Assuming private IP ranges are routable on the public internet
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | IPv4/IPv6 addressing and subnetting | 75 | 6 |
| M03L02 | Routing, CIDR and NAT | 75 | 6 |

### M04 Transport: TCP and UDP (MASTEMY-DESIGN 14%)

- Worked applications: (1) Walk through the TCP three-way handshake; (2) Choose TCP vs UDP for two application scenarios
- Common misconception addressed: Believing UDP guarantees delivery order
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | TCP: handshake, reliability and flow control | 75 | 6 |
| M04L02 | UDP, ports and choosing a transport | 75 | 6 |

### M05 DNS and application protocols (MASTEMY-DESIGN 12%)

- Worked applications: (1) Trace a recursive DNS lookup; (2) Interpret common DNS record types
- Common misconception addressed: Thinking DNS returns a single fixed answer regardless of caching/TTL
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | DNS resolution and record types | 75 | 6 |
| M05L02 | SMTP/FTP overview and protocol design ideas | 75 | 6 |

### M06 HTTP and the web (MASTEMY-DESIGN 13%)

- Worked applications: (1) Interpret a request/response with status and headers; (2) Explain how caching headers avoid a round trip
- Common misconception addressed: Treating HTTP as stateful rather than stateless with cookies/tokens
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | HTTP methods, status codes and headers | 75 | 6 |
| M06L02 | HTTP/1.1 vs HTTP/2/3, caching and cookies | 75 | 6 |

### M07 Security on the wire (MASTEMY-DESIGN 12%)

- Worked applications: (1) Describe what the TLS handshake establishes; (2) Explain how a certificate proves server identity
- Common misconception addressed: Assuming HTTPS alone authenticates the user as well as the server
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | TLS, certificates and the handshake | 75 | 6 |
| M07L02 | Common network attacks and defences | 75 | 6 |

### M08 Performance and debugging (MASTEMY-DESIGN 12%)

- Worked applications: (1) Diagnose a slow request using latency vs bandwidth; (2) Follow a route with traceroute
- Common misconception addressed: Conflating bandwidth with latency when diagnosing slowness
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Latency, bandwidth, RTT and throughput | 75 | 6 |
| M08L02 | Tools: ping, traceroute, curl and packet capture | 75 | 6 |

## Integrative case

Debug a slow and intermittently failing web API: map the request across the TCP/IP layers, reason about DNS resolution and TCP connection setup, interpret HTTP status codes and caching headers, verify the TLS certificate chain, and separate latency from bandwidth to locate the bottleneck.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1543-final-protected | 40 | 40 | yes |
| MST-1543-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Network models and layering | 5 |
| The link and physical layers | 5 |
| The network layer and IP | 5 |
| Transport: TCP and UDP | 5 |
| DNS and application protocols | 5 |
| HTTP and the web | 5 |
| Security on the wire | 5 |
| Performance and debugging | 5 |

Minimum reviewed item bank: 482 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1543-Q0001** (single-answer, Select ONE) Which transport protocol should a developer choose when every byte must arrive, in order, without loss?

- A. TCP, because it provides ordered, reliable, connection-oriented delivery **(key)**  
  _Rationale:_ Correct: TCP handles retransmission, ordering and flow control for reliable streams.
- B. UDP, because it guarantees ordering  
  _Rationale:_ UDP is connectionless and gives no ordering or delivery guarantee.
- C. ARP, because it is faster  
  _Rationale:_ ARP is a link-layer address-resolution protocol, not a transport.
- D. ICMP, because it is reliable  
  _Rationale:_ ICMP is for control/diagnostics, not reliable data transport.

**MST-1543-Q0002** (multiple-answer, Select TWO) Which statements about HTTP are correct? (Select TWO)

- A. HTTP is stateless; state is carried via cookies or tokens **(key)**  
  _Rationale:_ Correct: each request is independent, so applications add state with cookies/tokens.
- B. A 404 status means the requested resource was not found **(key)**  
  _Rationale:_ Correct: 404 is the standard not-found client-error status.
- C. A 200 status indicates a server error  
  _Rationale:_ 200 means success; 5xx codes indicate server errors.
- D. HTTP requires a new TCP connection for every object in HTTP/2  
  _Rationale:_ HTTP/2 multiplexes many streams over one connection, reducing connections.

**MST-1543-Q0003** (single-answer, Select ONE) What does NAT (Network Address Translation) primarily do?

- A. Maps private internal addresses to one or more public addresses so hosts can share them **(key)**  
  _Rationale:_ Correct: NAT lets many private hosts reach the internet through shared public addresses.
- B. Encrypts all traffic leaving the network  
  _Rationale:_ NAT does not encrypt; that is the role of TLS/VPNs.
- C. Assigns MAC addresses to devices  
  _Rationale:_ MAC addresses are hardware-assigned, not set by NAT.
- D. Resolves domain names to IP addresses  
  _Rationale:_ Name resolution is DNS, not NAT.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
