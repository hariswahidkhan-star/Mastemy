# Network Troubleshooting

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1687` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-NT-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Network Troubleshooting (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Apply a structured troubleshooting methodology to network faults
2. Diagnose Layer 1-3 connectivity problems
3. Troubleshoot DNS, DHCP and name-resolution issues
4. Use common tools to isolate and verify network faults
5. Document findings and escalate effectively

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Troubleshooting methodology (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Order the steps of a structured methodology for a scenario; (2) Turn a vague complaint into a testable problem statement
- Common misconception addressed: Changing settings before defining the problem
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | A structured approach to network faults | 72 | 6 |
| M01L02 | Defining the problem and gathering information | 72 | 6 |

### M02 Physical and data-link layer faults (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Interpret interface error counters; (2) Diagnose a VLAN misconfiguration
- Common misconception addressed: Assuming a link-up light means the link is healthy
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Cabling, ports and link status (Layer 1) | 72 | 6 |
| M02L02 | Switching, VLANs and MAC issues (Layer 2) | 72 | 6 |

### M03 Network-layer and connectivity faults (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Spot a wrong subnet mask or gateway; (2) Trace where a packet stops with traceroute
- Common misconception addressed: Confusing 'can ping the gateway' with 'can reach the internet'
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | IP addressing, subnets and gateways | 72 | 6 |
| M03L02 | Routing and reachability (Layer 3) | 72 | 6 |

### M04 DNS, DHCP and name resolution (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Diagnose an APIPA/169.254 address; (2) Decide if a fault is connectivity or DNS
- Common misconception addressed: Blaming the network when DNS is the real fault
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | DHCP lease and address problems | 72 | 6 |
| M04L02 | DNS resolution failures | 72 | 6 |

### M05 Tools, verification and escalation (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Pick the right tool for a given symptom; (2) Write a concise fault record for escalation
- Common misconception addressed: Closing a ticket without verifying the fix end to end
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Using ping, traceroute and packet capture | 72 | 6 |
| M05L02 | Verifying the fix and documenting the outcome | 72 | 6 |

## Integrative case

Users on one floor report that the intranet 'is down'. Some sites load, others do not, and a new switch was installed yesterday. Work a structured methodology from the physical layer upward, use the right tools to isolate the fault, identify the likely cause, verify the fix and document it for handover.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1687-final-protected | 25 | 25 | yes |
| MST-1687-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Troubleshooting methodology | 5 |
| Physical and data-link layer faults | 5 |
| Network-layer and connectivity faults | 5 |
| DNS, DHCP and name resolution | 5 |
| Tools, verification and escalation | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1687-Q0001** (single-answer, Select ONE) A host has IP 169.254.10.5. What does this most likely indicate?

- A. The host failed to obtain an address from DHCP **(key)**  
  _Rationale:_ Correct: 169.254.x.x is an APIPA self-assigned address, meaning no DHCP reply.
- B. The host has a working static public address  
  _Rationale:_ 169.254.x.x is a link-local range, not a public address.
- C. DNS resolution has failed  
  _Rationale:_ This is an addressing symptom, not DNS.
- D. The default gateway is correctly set  
  _Rationale:_ An APIPA address usually has no usable gateway.

**MST-1687-Q0002** (multiple-answer, Select TWO) Which TWO steps belong early in a structured troubleshooting methodology? (Select TWO.)

- A. Define the problem clearly **(key)**  
  _Rationale:_ Correct: a clear problem statement guides every later step.
- B. Gather information about scope and recent changes **(key)**  
  _Rationale:_ Correct: scope and recent changes narrow the cause.
- C. Replace hardware before testing  
  _Rationale:_ Swapping hardware first wastes effort and hides the cause.
- D. Close the ticket before verifying  
  _Rationale:_ Closing early skips verification entirely.

**MST-1687-Q0003** (single-answer, Select ONE) A user can ping the default gateway but cannot load any website. Where should you look first?

- A. Name resolution and the path beyond the gateway **(key)**  
  _Rationale:_ Correct: local link works, so investigate DNS and upstream routing.
- B. The network cable to the user's PC  
  _Rationale:_ Reaching the gateway shows the local link is up.
- C. The user's monitor  
  _Rationale:_ The display is unrelated to connectivity.
- D. The switch port LED colour  
  _Rationale:_ Gateway reachability already confirms Layer 1-2 locally.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
