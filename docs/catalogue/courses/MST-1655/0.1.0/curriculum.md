# IT Support Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1655` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-ISF-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — IT Support Fundamentals (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Describe the role of an IT support technician and the ticket lifecycle
2. Apply a structured troubleshooting method to common hardware and software faults
3. Explain core operating-system, file-system and account concepts relevant to support
4. Carry out basic network connectivity checks and interpret the results
5. Communicate clearly with users and document resolutions responsibly

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 The IT support role and ticketing (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Sort five incidents by priority and justify each; (2) Write a well-structured ticket from a vague user report
- Common misconception addressed: Treating every ticket as the same urgency regardless of business impact
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What IT support does and service expectations | 72 | 6 |
| M01L02 | The ticket lifecycle, priority and escalation | 72 | 6 |

### M02 Structured troubleshooting (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Apply the method to a 'computer will not turn on' report; (2) Decide whether a fault is hardware or software from symptoms
- Common misconception addressed: Changing several things at once so the real cause is never identified
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | A step-by-step troubleshooting method | 72 | 6 |
| M02L02 | Isolating hardware vs software causes | 72 | 6 |

### M03 Operating systems and accounts (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Set NTFS permissions so a user can read but not edit a folder; (2) Plan recovery steps for a corrupted user profile
- Common misconception addressed: Assuming an administrator account should be used for everyday work
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Files, permissions and user profiles | 72 | 6 |
| M03L02 | Common OS maintenance and recovery tasks | 72 | 6 |

### M04 Basic networking for support (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Interpret the output of ping and ipconfig for a disconnected host; (2) Decide whether a problem is local or network-wide
- Common misconception addressed: Believing a reachable gateway means every service must also work
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | IP addresses, DNS and gateways in plain terms | 72 | 6 |
| M04L02 | Connectivity checks: ping, ipconfig and nslookup | 72 | 6 |

### M05 Communication and documentation (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Rewrite a jargon-filled message in plain language; (2) Draft a reusable knowledge-base article from a solved ticket
- Common misconception addressed: Closing a ticket without recording what actually fixed it
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Talking to non-technical users | 72 | 6 |
| M05L02 | Writing resolution notes and knowledge articles | 72 | 6 |

## Integrative case

A technician receives a ticket that a user's laptop will not connect to the office network and printing has stopped. Triage the symptoms, apply a structured troubleshooting method, decide which layer to test first, document each step, and write a clear resolution note the user and the next technician can both follow.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1655-final-protected | 25 | 25 | yes |
| MST-1655-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The IT support role and ticketing | 5 |
| Structured troubleshooting | 5 |
| Operating systems and accounts | 5 |
| Basic networking for support | 5 |
| Communication and documentation | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1655-Q0001** (single-answer, Select ONE) A user reports their computer is 'slow'. What is the best first troubleshooting step?

- A. Gather specific details about when and how the slowness occurs **(key)**  
  _Rationale:_ Correct: defining the problem precisely guides every later step.
- B. Immediately reinstall the operating system  
  _Rationale:_ A full reinstall is drastic and premature before the cause is known.
- C. Replace the hard drive  
  _Rationale:_ Replacing hardware before diagnosis risks wasted cost and effort.
- D. Tell the user to buy a new computer  
  _Rationale:_ This skips diagnosis entirely and does not resolve the ticket.

**MST-1655-Q0002** (multiple-answer, Select TWO) Which TWO actions belong in a good ticket resolution note? (Select TWO.)

- A. The root cause that was identified **(key)**  
  _Rationale:_ Correct: the cause lets the next technician recognise a repeat.
- B. The exact steps taken to fix it **(key)**  
  _Rationale:_ Correct: reproducible steps make the fix reusable.
- C. A guess about what might be wrong next time  
  _Rationale:_ Speculation without evidence is not a resolution record.
- D. The user's personal opinion of the IT team  
  _Rationale:_ Irrelevant to resolving or documenting the incident.

**MST-1655-Q0003** (single-answer, Select ONE) ping to the default gateway succeeds but a website will not load. What does this most likely indicate?

- A. Local link to the gateway is fine; the issue is likely DNS or beyond the gateway **(key)**  
  _Rationale:_ Correct: reaching the gateway isolates the fault to name resolution or upstream.
- B. The network cable is unplugged  
  _Rationale:_ An unplugged cable would normally stop the gateway ping too.
- C. The monitor has failed  
  _Rationale:_ Display hardware is unrelated to network reachability.
- D. The keyboard driver is missing  
  _Rationale:_ Input drivers do not affect gateway reachability.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
