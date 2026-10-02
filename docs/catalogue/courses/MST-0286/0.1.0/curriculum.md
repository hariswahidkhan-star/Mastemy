# GIAC Certified Intrusion Analyst: GCIA

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0286` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | GIAC (no affiliation or endorsement) |
| Exam code | unresolved - not published in catalog |
| Version basis | unresolved - needs official-source verification |
| Evidence | **unverified-needs-official-check** - issuer egress blocked 2026-10-02; official domains/weights/objective IDs/item counts/codes NOT verified |
| Legacy IDs | none |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 72 / module checks 108 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

> **Modules below are Mastemy design groupings, not a reproduction of the official blueprint.** The official syllabus could not be fetched (issuer network egress blocked on 2026-10-02); domain names, weightings, objective IDs, item counts, exam codes and durations are **not verified**.

## Learning outcomes

1. Analyse network protocols and packet structures
2. Perform traffic analysis and intrusion detection
3. Write and tune detection signatures and rules
4. Investigate network-based attacks and anomalies

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: This preparation assesses knowledge and applied reasoning through MCQ/MR only; it does not reproduce the official exam's hands-on, performance-based or non-MCQ item formats.

## Modules

### M01 Network protocols and packet analysis (not published - design grouping)

- Worked applications: (1) Decode a TCP handshake from a packet capture; (2) Identify a protocol from header fields alone
- Common misconception addressed: Confusing the TCP three-way handshake with data transfer
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | TCP/IP fundamentals and the OSI model | 100 | 6 |
| M01L02 | IP, TCP and UDP header analysis | 100 | 6 |
| M01L03 | ICMP, DNS and application protocols | 100 | 6 |
| M01L04 | Packet capture tools and reading captures | 100 | 6 |

### M02 Traffic analysis and detection (not published - design grouping)

- Worked applications: (1) Spot a port-scan pattern in traffic; (2) Distinguish a false positive from a real alert
- Common misconception addressed: Assuming every alert indicates a confirmed intrusion
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Network intrusion detection concepts | 100 | 6 |
| M02L02 | Signature vs anomaly detection | 100 | 6 |
| M02L03 | Traffic analysis and flow data | 100 | 6 |
| M02L04 | Alert triage and false positives | 100 | 6 |

### M03 Detection engineering and investigation (not published - design grouping)

- Worked applications: (1) Write a rule to detect a known malicious pattern; (2) Tune a noisy rule to reduce false positives
- Common misconception addressed: Believing a broad rule is better because it catches more traffic
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Writing IDS/IPS rules | 100 | 6 |
| M03L02 | Rule tuning and performance | 100 | 6 |
| M03L03 | Correlating events across sensors | 100 | 6 |
| M03L04 | Investigating and documenting an intrusion | 100 | 6 |

## Integrative case

An analyst monitors a network sensor: read packet captures to understand protocol behaviour, detect a suspicious traffic pattern, write and tune a detection rule, and investigate the activity to confirm an intrusion.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official exam's question count and duration are not verified (issuer egress blocked); confirm on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0286-practice-form-A | 45 | 45 | yes |
| MST-0286-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0286-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0286-final-protected | 45 | 45 | yes |

| Domain (design grouping) | Items per form |
|---|---|
| Network protocols and packet analysis | 15 |
| Traffic analysis and detection | 15 |
| Detection engineering and investigation | 15 |

Minimum reviewed item bank: 540 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0286-Q0001** (single-answer, Select ONE) Which sequence correctly describes the TCP three-way handshake?

- A. SYN, SYN-ACK, ACK **(key)**  
  _Rationale:_ Correct: the client sends SYN, the server replies SYN-ACK, and the client sends ACK.
- B. ACK, SYN, FIN  
  _Rationale:_ This is not the handshake sequence; FIN is used to close a connection.
- C. FIN, FIN-ACK, RST  
  _Rationale:_ These flags relate to closing or resetting, not establishing, a connection.
- D. PSH, URG, ACK  
  _Rationale:_ These flags do not form the connection-establishment handshake.

**MST-0286-Q0002** (single-answer, Select ONE) What is the main difference between signature-based and anomaly-based intrusion detection?

- A. Signature-based matches known patterns; anomaly-based flags deviations from a baseline **(key)**  
  _Rationale:_ Correct: signatures detect known bad patterns while anomaly detection flags unusual behaviour.
- B. Signature-based requires no rules at all  
  _Rationale:_ Signature-based detection depends on defined signatures/rules.
- C. Anomaly-based can only detect previously seen attacks  
  _Rationale:_ Anomaly detection targets deviations, including novel behaviour.
- D. They are identical and interchangeable terms  
  _Rationale:_ They are distinct detection approaches.

**MST-0286-Q0003** (multiple-answer, Select TWO) Select TWO signs that network traffic may indicate a port scan.

- A. Connection attempts to many different ports on one host in a short time **(key)**  
  _Rationale:_ Correct: sweeping many ports quickly is a classic scan indicator.
- B. Many SYN packets with few completed handshakes **(key)**  
  _Rationale:_ Correct: SYN scans leave many half-open connections.
- C. A single long-lived, fully established HTTPS session  
  _Rationale:_ A normal established session is not itself a scan indicator.
- D. A DNS reply to a legitimate query  
  _Rationale:_ A normal DNS reply is expected traffic.
- E. An NTP time-sync request on schedule  
  _Rationale:_ Scheduled time sync is normal, expected traffic.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
