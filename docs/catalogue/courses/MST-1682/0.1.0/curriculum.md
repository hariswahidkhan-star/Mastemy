# Email Security

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1682` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-ES-002 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Email Security (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain email threats and why email is heavily targeted
2. Describe authentication standards SPF, DKIM and DMARC
3. Apply filtering, sandboxing and anti-phishing controls
4. Handle sensitive email with encryption and data controls
5. Respond to email-borne incidents

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Email threats (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Classify three malicious emails by technique; (2) Explain how spoofing a domain works
- Common misconception addressed: Believing a familiar sender name proves the email is genuine
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why email is a top attack vector | 72 | 6 |
| M01L02 | Phishing, spoofing and malicious attachments | 72 | 6 |

### M02 Email authentication (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Explain what an SPF record checks; (2) Decide a DMARC policy for a domain
- Common misconception addressed: Assuming SPF alone fully prevents spoofing
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | SPF and DKIM | 72 | 6 |
| M02L02 | DMARC and alignment | 72 | 6 |

### M03 Filtering and defence (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Decide how a filter should handle a suspicious attachment; (2) Explain how URL rewriting protects users
- Common misconception addressed: Trusting the filter so completely that users stop being careful
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Spam and malware filtering | 72 | 6 |
| M03L02 | Attachment and URL sandboxing | 72 | 6 |

### M04 Sensitive email (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose a safe way to send a sensitive document; (2) Spot an auto-complete recipient mistake before sending
- Common misconception addressed: Sending sensitive data unencrypted because it is faster
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Encrypting email and attachments | 72 | 6 |
| M04L02 | Preventing accidental data disclosure | 72 | 6 |

### M05 Email incident response (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) List the steps to investigate a reported phish; (2) Decide who to notify after a widespread phishing campaign
- Common misconception addressed: Deleting the reported email before it has been analysed
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Investigating a reported phishing email | 72 | 6 |
| M05L02 | Containment and user notification | 72 | 6 |

## Integrative case

A company suffers repeated spoofed emails impersonating its own domain and staff clicking malicious attachments. Explain why email is targeted, deploy sender-authentication records, add filtering and attachment sandboxing, and define how a reported phishing email is investigated and contained.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1682-final-protected | 25 | 25 | yes |
| MST-1682-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Email threats | 5 |
| Email authentication | 5 |
| Filtering and defence | 5 |
| Sensitive email | 5 |
| Email incident response | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1682-Q0001** (single-answer, Select ONE) What is the role of DMARC in email security?

- A. It tells receivers how to handle mail that fails SPF and DKIM alignment **(key)**  
  _Rationale:_ Correct: DMARC sets policy and reporting on authentication failures.
- B. It encrypts every email in transit  
  _Rationale:_ DMARC governs authentication policy, not encryption.
- C. It replaces the need for spam filtering  
  _Rationale:_ Filtering is still needed alongside authentication.
- D. It guarantees no phishing will ever arrive  
  _Rationale:_ DMARC reduces spoofing but does not stop all phishing.

**MST-1682-Q0002** (multiple-answer, Select TWO) Which TWO controls reduce the impact of malicious email? (Select TWO.)

- A. Sandboxing attachments before delivery **(key)**  
  _Rationale:_ Correct: sandboxing detonates attachments safely before users open them.
- B. Rewriting and checking URLs at click time **(key)**  
  _Rationale:_ Correct: time-of-click checks catch links that turn malicious later.
- C. Disabling the spam filter to speed delivery  
  _Rationale:_ Disabling filtering increases malicious delivery.
- D. Publishing all staff passwords in the signature  
  _Rationale:_ This is an obvious and severe exposure, not a control.

**MST-1682-Q0003** (single-answer, Select ONE) A phishing email is reported by a user. What should happen before deleting it everywhere?

- A. Investigate it to find who else received it and what it does **(key)**  
  _Rationale:_ Correct: analysis guides containment and scoping before removal.
- B. Delete it instantly from all mailboxes with no analysis  
  _Rationale:_ Immediate deletion destroys evidence needed to scope the campaign.
- C. Reply to the sender to complain  
  _Rationale:_ Replying may confirm the address is live to the attacker.
- D. Forward it to everyone as a warning example  
  _Rationale:_ Forwarding the live email spreads the threat.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
