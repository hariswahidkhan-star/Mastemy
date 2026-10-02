# Wireless Security

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1661` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-WS-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Wireless Security (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain wireless networking concepts relevant to security
2. Compare wireless authentication and encryption standards
3. Identify common wireless attacks and defences
4. Configure a secure wireless network with appropriate segmentation
5. Monitor and troubleshoot wireless security issues

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Wireless fundamentals (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose non-overlapping channels for three access points; (2) Explain why wireless broadens the attack surface
- Common misconception addressed: Thinking hiding the SSID makes a network secure
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Radio basics, SSIDs and channels | 72 | 6 |
| M01L02 | How wireless differs from wired security | 72 | 6 |

### M02 Authentication and encryption (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Recommend an encryption standard for a business network; (2) Decide when 802.1X is worth the extra complexity
- Common misconception addressed: Believing a long Wi-Fi password makes WEP acceptable
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | WPA2 vs WPA3 and the problems with WEP | 72 | 6 |
| M02L02 | Personal vs enterprise (802.1X) authentication | 72 | 6 |

### M03 Wireless attacks (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Spot an evil-twin access point from its characteristics; (2) Explain how a captured handshake is attacked offline
- Common misconception addressed: Assuming an attacker must be physically inside the building
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Rogue APs and evil twins | 72 | 6 |
| M03L02 | Deauthentication and handshake capture | 72 | 6 |

### M04 Secure wireless design (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Design separate SSIDs and VLANs for guests and staff; (2) Reduce signal leakage beyond the premises
- Common misconception addressed: Putting guests and payment systems on the same network
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Segmenting guest and corporate traffic | 72 | 6 |
| M04L02 | Access-point placement and signal control | 72 | 6 |

### M05 Monitoring wireless (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose signals that indicate a rogue access point; (2) Diagnose intermittent drops caused by interference
- Common misconception addressed: Ignoring unknown devices because the password is 'strong'
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Detecting rogue devices | 72 | 6 |
| M05L02 | Troubleshooting interference and abuse | 72 | 6 |

## Integrative case

A cafe wants guest Wi-Fi that does not expose its point-of-sale systems. Choose the right encryption and authentication, separate guest from business traffic, defend against a rogue access point, and set up monitoring to spot abuse.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1661-final-protected | 25 | 25 | yes |
| MST-1661-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Wireless fundamentals | 5 |
| Authentication and encryption | 5 |
| Wireless attacks | 5 |
| Secure wireless design | 5 |
| Monitoring wireless | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1661-Q0001** (single-answer, Select ONE) Which wireless security standard should a business prefer today where devices support it?

- A. WPA3 **(key)**  
  _Rationale:_ Correct: WPA3 offers the strongest current protections for Wi-Fi.
- B. WEP  
  _Rationale:_ WEP is broken and must not be used.
- C. Open with a hidden SSID  
  _Rationale:_ An open network is unencrypted; hiding the SSID is not security.
- D. WPA with TKIP only  
  _Rationale:_ WPA with TKIP is outdated and weaker than WPA2/WPA3.

**MST-1661-Q0002** (multiple-answer, Select TWO) Which TWO signs suggest a rogue or evil-twin access point? (Select TWO.)

- A. A familiar SSID appearing with a different or stronger signal unexpectedly **(key)**  
  _Rationale:_ Correct: a duplicated SSID with odd signal is a classic evil-twin sign.
- B. An access point with an unknown MAC on the corporate channel **(key)**  
  _Rationale:_ Correct: unknown hardware broadcasting your network is suspicious.
- C. A client device asking to join the network  
  _Rationale:_ Join requests are normal client behaviour.
- D. The scheduled nightly backup running  
  _Rationale:_ A backup job is unrelated to rogue access points.

**MST-1661-Q0003** (single-answer, Select ONE) Why should guest Wi-Fi be separated from business systems?

- A. So a compromised guest device cannot reach sensitive internal systems **(key)**  
  _Rationale:_ Correct: separation contains guest-side risk away from critical assets.
- B. Because guests need faster speeds than staff  
  _Rationale:_ Speed is not the security rationale for separation.
- C. To avoid using any encryption  
  _Rationale:_ Separation does not remove the need for encryption.
- D. Because guests cannot use Wi-Fi otherwise  
  _Rationale:_ Guests can use shared networks; separation is about risk, not capability.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
