# Mobile Application Testing and Quality Assurance

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1008` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | MST-PRG-SK-MAT-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Mobile Application Testing and Quality Assurance (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Mobile testing landscape
2. Functional and UI testing
3. Mobile-specific conditions
4. Automation for mobile
5. Performance and resource testing
6. Release, stores and post-release

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Mobile testing landscape (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a device/OS coverage matrix from usage data; (2) Decide real-device vs emulator for a given check
- Common misconception addressed: Assuming one flagship device represents the whole user base
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | How mobile testing differs from web | 80 | 6 |
| M01L02 | Platforms, fragmentation and coverage strategy | 80 | 6 |

### M02 Functional and UI testing (MASTEMY-DESIGN 17%)

- Worked applications: (1) Test a gesture-driven flow across orientations; (2) Check accessibility labels on an interactive screen
- Common misconception addressed: Treating a mobile screen like a desktop page with a mouse
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Testing native, hybrid and responsive UIs | 80 | 6 |
| M02L02 | Gestures, orientation and accessibility | 80 | 6 |

### M03 Mobile-specific conditions (MASTEMY-DESIGN 17%)

- Worked applications: (1) Verify behaviour across loss of connectivity and recovery; (2) Test an incoming-call interruption during a transaction
- Common misconception addressed: Testing only on fast wifi and ignoring flaky mobile networks
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Network variability and offline behaviour | 80 | 6 |
| M03L02 | Interruptions, permissions and battery/background | 80 | 6 |

### M04 Automation for mobile (MASTEMY-DESIGN 17%)

- Worked applications: (1) Automate a critical journey with resilient locators; (2) Reduce flakiness caused by animations and timing
- Common misconception addressed: Expecting web selectors to work unchanged on native apps
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Choosing an automation approach | 80 | 6 |
| M04L02 | Stable locators and flaky-test control on devices | 80 | 6 |

### M05 Performance and resource testing (MASTEMY-DESIGN 16%)

- Worked applications: (1) Measure cold-start time against a target; (2) Detect excessive battery or data use in a scenario
- Common misconception addressed: Judging performance only on a high-end device on wifi
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | App launch, responsiveness and jank | 80 | 6 |
| M05L02 | Battery, memory and data-usage checks | 80 | 6 |

### M06 Release, stores and post-release (MASTEMY-DESIGN 16%)

- Worked applications: (1) Prepare a store-compliance checklist before submission; (2) Use a staged rollout with crash-rate gates
- Common misconception addressed: Treating store approval as proof the app is defect-free
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Beta channels and store review checks | 80 | 6 |
| M06L02 | Crash reporting and staged rollout | 80 | 6 |

## Integrative case

Build a mobile test strategy for a banking app across iOS and Android: choose a device/OS coverage matrix, decide real-device versus emulator use, cover network, interruption, permission and battery conditions, automate the critical journeys, and plan for store release checks.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1008-final-protected | 30 | 30 | yes |
| MST-1008-final-alternate | 30 | 30 | no (optional practice) |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1008-Q0001** (single-answer, Select ONE) Which condition is most important to test on mobile that is often overlooked on desktop web?

- A. Behaviour when connectivity drops and later recovers **(key)**  
  _Rationale:_ Correct: mobile networks are variable, so loss and recovery of connectivity is a core scenario.
- B. Mouse hover tooltips  
  _Rationale:_ Hover is a desktop concern, not a mobile priority.
- C. Browser print preview  
  _Rationale:_ Print preview is rarely relevant to a mobile app.
- D. Multi-window desktop tiling  
  _Rationale:_ Desktop tiling is not a mobile scenario.

**MST-1008-Q0002** (multiple-answer, Select TWO) Which TWO interruptions should a mobile test suite verify do not corrupt an in-progress transaction? (Select TWO)

- A. An incoming phone call **(key)**  
  _Rationale:_ Correct: a call backgrounds the app and must not corrupt state.
- B. The OS revoking a permission while backgrounded **(key)**  
  _Rationale:_ Correct: permission changes while backgrounded can break resumed flows.
- C. The user changing the device wallpaper  
  _Rationale:_ Changing wallpaper does not affect app transaction state.
- D. Rotating the home-screen icon layout  
  _Rationale:_ Icon layout changes are unrelated to in-app transactions.

**MST-1008-Q0003** (single-answer, Select ONE) For a large, fragmented Android user base, how should a coverage matrix be chosen?

- A. By prioritising device/OS combinations that match real usage data **(key)**  
  _Rationale:_ Correct: coverage should follow actual user device and OS distribution.
- B. By testing only the newest OS version  
  _Rationale:_ Many users run older OS versions that must be covered.
- C. By testing only one emulator configuration  
  _Rationale:_ A single emulator cannot represent fragmentation.
- D. By testing every possible device that exists  
  _Rationale:_ Exhaustive device coverage is infeasible; usage-based prioritisation is used.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
