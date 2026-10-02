# IPv6 Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1688` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-IF-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — IPv6 Fundamentals (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain why IPv6 exists and how it differs from IPv4
2. Read, write and compress IPv6 address notation
3. Identify IPv6 address types and scopes
4. Explain IPv6 address assignment (SLAAC, DHCPv6)
5. Describe IPv6 neighbour discovery and basic security considerations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Why IPv6 (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Explain IPv6 to a team used to IPv4; (2) Contrast IPv6 header simplification with IPv4
- Common misconception addressed: Believing IPv6 is just IPv4 with longer addresses
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | IPv4 exhaustion and the case for IPv6 | 72 | 6 |
| M01L02 | Key differences between IPv4 and IPv6 | 72 | 6 |

### M02 Address notation (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Compress a full IPv6 address correctly; (2) Expand a compressed address back to full form
- Common misconception addressed: Using :: more than once in a single address
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | 128-bit addresses and hexadecimal notation | 72 | 6 |
| M02L02 | Zero compression and the :: rule | 72 | 6 |

### M03 Address types and scope (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Classify an address by its leading bits; (2) Pick the right address type for a use case
- Common misconception addressed: Treating link-local (fe80::) addresses as globally routable
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Global unicast, link-local and unique local | 72 | 6 |
| M03L02 | Multicast and anycast; scope | 72 | 6 |

### M04 Address assignment (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose SLAAC or DHCPv6 for a requirement; (2) Trace how a host forms an address with SLAAC
- Common misconception addressed: Assuming IPv6 always needs a DHCP server like IPv4
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | SLAAC and router advertisements | 72 | 6 |
| M04L02 | DHCPv6 (stateful and stateless) | 72 | 6 |

### M05 Neighbour discovery and security (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Map NDP functions to their IPv4 equivalents; (2) Identify a rogue router advertisement risk
- Common misconception addressed: Assuming IPv6 is secure by default and needs no first-hop protection
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Neighbour Discovery Protocol (NDP) | 72 | 6 |
| M05L02 | First-hop security considerations | 72 | 6 |

## Integrative case

A network team is enabling IPv6 alongside IPv4 for the first time. Explain why IPv6 is needed, assign a prefix and plan subnetting, decide between SLAAC and DHCPv6 for client addressing, and note the neighbour-discovery and first-hop security concerns the team must address.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1688-final-protected | 25 | 25 | yes |
| MST-1688-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why IPv6 | 5 |
| Address notation | 5 |
| Address types and scope | 5 |
| Address assignment | 5 |
| Neighbour discovery and security | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1688-Q0001** (single-answer, Select ONE) Which address is a correctly compressed form of 2001:0db8:0000:0000:0000:0000:0000:0001?

- A. 2001:db8::1 **(key)**  
  _Rationale:_ Correct: leading zeros dropped and one run of zero groups replaced by ::.
- B. 2001:db8:::1  
  _Rationale:_ Three colons are invalid; :: already means the run of zeros.
- C. 2001:0db8::0db8::1  
  _Rationale:_ :: may appear only once in an address.
- D. 2001:db8:0:1  
  _Rationale:_ This drops too many groups and is not a valid 128-bit form.

**MST-1688-Q0002** (multiple-answer, Select TWO) Which TWO statements about IPv6 address types are correct? (Select TWO.)

- A. Link-local addresses begin with fe80:: **(key)**  
  _Rationale:_ Correct: fe80::/10 is the link-local range.
- B. Global unicast addresses are routable on the internet **(key)**  
  _Rationale:_ Correct: global unicast is globally routable.
- C. Link-local addresses are routed across the internet  
  _Rationale:_ Link-local is confined to a single link.
- D. IPv6 has no multicast addresses  
  _Rationale:_ IPv6 uses multicast extensively and has no broadcast.

**MST-1688-Q0003** (single-answer, Select ONE) How does a host typically form an address using SLAAC?

- A. It combines a prefix from a router advertisement with an interface identifier **(key)**  
  _Rationale:_ Correct: SLAAC uses the advertised prefix plus a self-generated interface ID.
- B. It always requests the full address from a DHCPv6 server  
  _Rationale:_ That describes stateful DHCPv6, not SLAAC.
- C. It copies the router's exact address  
  _Rationale:_ Hosts do not duplicate the router's address.
- D. It uses a broadcast to claim an address  
  _Rationale:_ IPv6 has no broadcast; SLAAC uses router advertisements.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
