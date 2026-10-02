# LPI LPIC-2: Exam 202

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0280` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | LPI (no affiliation or endorsement) |
| Exam code | unresolved - not published in catalog |
| Version basis | unresolved - needs official-source verification |
| Evidence | **unverified-needs-official-check** - issuer egress blocked 2026-10-02; official domains/weights/objective IDs/item counts/codes NOT verified |
| Legacy IDs | none |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 72 / module checks 108 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

> **Modules below are Mastemy design groupings, not a reproduction of the official blueprint.** The official syllabus could not be fetched (issuer network egress blocked on 2026-10-02); domain names, weightings, objective IDs, item counts, exam codes and durations are **not verified**.

## Learning outcomes

1. Configure core network services (DNS, web, file sharing)
2. Configure email and client management services
3. Apply system security, firewalls and VPNs
4. Troubleshoot network services and access controls

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: This preparation assesses knowledge and applied reasoning through MCQ/MR only; it does not reproduce the official exam's hands-on, performance-based or non-MCQ item formats.

## Modules

### M01 Domain name and web services (not published - design grouping)

- Worked applications: (1) Create a forward DNS zone and verify resolution; (2) Configure a virtual host for a second website
- Common misconception addressed: Confusing a DNS A record with a CNAME alias
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Basic DNS server configuration | 100 | 6 |
| M01L02 | Create and maintain DNS zones | 100 | 6 |
| M01L03 | Securing a DNS server | 100 | 6 |
| M01L04 | Web servers and reverse proxies | 100 | 6 |

### M02 File sharing and email services (not published - design grouping)

- Worked applications: (1) Share a directory over NFS or Samba with correct permissions; (2) Trace an email from MTA to mailbox delivery
- Common misconception addressed: Assuming Samba permissions override underlying filesystem permissions
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | File sharing with Samba | 100 | 6 |
| M02L02 | File sharing with NFS | 100 | 6 |
| M02L03 | Mail transfer agents (MTA) basics | 100 | 6 |
| M02L04 | Local email delivery and remote access | 100 | 6 |

### M03 System security, firewalls and VPNs (not published - design grouping)

- Worked applications: (1) Write firewall rules to allow only required services; (2) Design a site-to-site VPN at a high level
- Common misconception addressed: Believing a VPN alone makes all internal services secure
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Configuring a router and packet filtering | 100 | 6 |
| M03L02 | FTP and secure shell (SSH) services | 100 | 6 |
| M03L03 | Security tasks and intrusion detection basics | 100 | 6 |
| M03L04 | OpenVPN and encrypted tunnels | 100 | 6 |

## Integrative case

An administrator stands up shared services for a department: run DNS and a web server, provide file and email services, and protect everything with firewall rules and a VPN, troubleshooting as issues arise.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official exam's question count and duration are not verified (issuer egress blocked); confirm on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0280-practice-form-A | 45 | 45 | yes |
| MST-0280-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0280-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0280-final-protected | 45 | 45 | yes |

| Domain (design grouping) | Items per form |
|---|---|
| Domain name and web services | 15 |
| File sharing and email services | 15 |
| System security, firewalls and VPNs | 15 |

Minimum reviewed item bank: 540 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0280-Q0001** (single-answer, Select ONE) Which DNS record type maps a hostname directly to an IPv4 address?

- A. A record **(key)**  
  _Rationale:_ Correct: an A record maps a name to an IPv4 address.
- B. MX record  
  _Rationale:_ An MX record identifies mail servers for a domain, not a host's IPv4 address.
- C. CNAME record  
  _Rationale:_ A CNAME aliases one name to another name, not directly to an address.
- D. TXT record  
  _Rationale:_ A TXT record stores arbitrary text, not an address mapping.

**MST-0280-Q0002** (single-answer, Select ONE) What is the primary role of a mail transfer agent (MTA)?

- A. Route and deliver email between mail servers **(key)**  
  _Rationale:_ Correct: an MTA transfers email between servers using SMTP.
- B. Display email in a user's graphical client  
  _Rationale:_ That is a mail user agent (MUA), not an MTA.
- C. Resolve hostnames to IP addresses  
  _Rationale:_ That is the role of DNS, not an MTA.
- D. Serve web pages over HTTP  
  _Rationale:_ Serving web pages is a web server's role, not an MTA's.

**MST-0280-Q0003** (multiple-answer, Select TWO) Select TWO statements that correctly describe firewall packet filtering.

- A. Rules can permit or deny traffic based on port and protocol **(key)**  
  _Rationale:_ Correct: packet filters match on attributes such as port and protocol.
- B. A default-deny policy blocks traffic not explicitly allowed **(key)**  
  _Rationale:_ Correct: default-deny is a common, safer baseline posture.
- C. Packet filtering inspects the full application payload by default  
  _Rationale:_ Basic packet filtering works at network/transport layers, not deep payload inspection.
- D. Firewall rules never need to be saved to persist across reboots  
  _Rationale:_ Rules usually must be saved or made persistent to survive a reboot.
- E. A firewall removes the need for service-level authentication  
  _Rationale:_ Services still require their own authentication regardless of the firewall.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
