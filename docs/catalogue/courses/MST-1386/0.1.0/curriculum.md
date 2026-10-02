# AI for Cybersecurity Defenders

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1386` v0.1.0 | Batch 12 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 480 min; instruction I = 384 min (80%); assessment A = 96 min (20%) |
| Assessment split | lesson checks 24 / module checks 34 / cumulative 38 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Identify where AI supports defensive security operations
2. Use AI to assist detection, triage and investigation responsibly
3. Recognise how attackers use AI and how to counter it
4. Evaluate the limits, bias and risks of AI security tools
5. Keep human analysts accountable for security decisions

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 AI in defensive security (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map AI uses across detection, triage and response; (2) Identify one security decision AI must not make alone
- Common misconception addressed: Believing AI can replace the security analyst
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Where AI helps defenders | 39 | 6 |
| M01L02 | Tools, claims and realistic limits | 39 | 6 |

### M02 Detection, triage and investigation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Use AI to prioritise alerts, then verify the top one; (2) Summarise an incident timeline with AI and correct it
- Common misconception addressed: Trusting an AI alert ranking without investigation
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | AI-assisted detection and triage | 39 | 6 |
| M02L02 | Investigation support and verification | 39 | 6 |

### M03 Adversarial use of AI (MASTEMY-DESIGN 20%)

- Worked applications: (1) Spot AI-generated phishing signals in a sample email; (2) Identify how an attacker might abuse a security chatbot
- Common misconception addressed: Assuming AI only helps defenders, not attackers
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | How attackers use AI | 38 | 6 |
| M03L02 | Prompt injection and new attack surfaces | 38 | 6 |

### M04 Limits, bias and tool risk (MASTEMY-DESIGN 20%)

- Worked applications: (1) Identify a false-positive risk in an AI detector; (2) Check whether an AI tool could leak sensitive logs
- Common misconception addressed: Treating an AI tool's output as ground truth
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | False positives, bias and drift | 38 | 6 |
| M04L02 | Data sensitivity and tool risk | 38 | 6 |

### M05 Human oversight and accountability (MASTEMY-DESIGN 20%)

- Worked applications: (1) Place a human approval point before an automated block; (2) Write who is accountable for an AI-influenced response
- Common misconception addressed: Automating response actions with no human check
- Module check: 6 items / 6 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Human-in-the-loop response | 38 | 6 |
| M05L02 | Accountability and documentation | 38 | 6 |

## Integrative case

A security analyst wants to use AI to cope with high alert volume. Decide where AI can assist triage and investigation, guard against false confidence and new attack surfaces, and keep a human accountable for escalation and response decisions.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1386-final-protected | 25 | 25 | yes |
| MST-1386-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI in defensive security | 5 |
| Detection, triage and investigation | 5 |
| Adversarial use of AI | 5 |
| Limits, bias and tool risk | 5 |
| Human oversight and accountability | 5 |

Minimum reviewed item bank: 238 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1386-Q0001** (single-answer, Select ONE) Why does AI change the phishing threat landscape for defenders?

- A. Attackers can generate more convincing, tailored lures at scale **(key)**  
  _Rationale:_ Correct: generative AI lowers the cost of high-quality, targeted phishing.
- B. Phishing is no longer possible with AI around  
  _Rationale:_ AI does not eliminate phishing; it can amplify it.
- C. AI only ever helps defenders  
  _Rationale:_ Attackers also use AI.
- D. AI makes all emails automatically safe  
  _Rationale:_ AI does not make emails safe.

**MST-1386-Q0002** (multiple-answer, Select TWO) Which TWO practices keep AI-assisted security operations safe? (Select TWO.)

- A. Require human approval before high-impact automated response actions **(key)**  
  _Rationale:_ Correct: human approval prevents damaging automated mistakes.
- B. Verify AI alert rankings before acting on them **(key)**  
  _Rationale:_ Correct: verification guards against false confidence.
- C. Auto-block based on raw AI output with no review  
  _Rationale:_ Unreviewed automated blocking can cause outages or miss threats.
- D. Feed sensitive logs into any public AI tool  
  _Rationale:_ Sending sensitive logs to uncontrolled tools risks leakage.

**MST-1386-Q0003** (single-answer, Select ONE) An AI tool ranks an alert as low priority. What is the appropriate analyst response?

- A. Treat the ranking as a hint and verify before dismissing a potential threat **(key)**  
  _Rationale:_ Correct: AI rankings can be wrong, so verification protects against missed incidents.
- B. Dismiss the alert immediately without checking  
  _Rationale:_ Blindly trusting the ranking can let real threats through.
- C. Assume the AI considered every context perfectly  
  _Rationale:_ AI may lack full context.
- D. Escalate everything regardless of evidence  
  _Rationale:_ Ignoring the triage signal entirely wastes capacity; verify instead.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
