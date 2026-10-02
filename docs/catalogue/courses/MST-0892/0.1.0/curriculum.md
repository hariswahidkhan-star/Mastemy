# Expo: Mobile Application Delivery and Updates

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0892` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Expo: Mobile Application Delivery and Updates (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how an Expo project is structured and how the managed and bare workflows differ
2. Describe how EAS Build produces iOS and Android binaries from a cloud pipeline
3. Explain how EAS Update ships JavaScript changes without a new store submission
4. Describe staged rollout, channel promotion and rollback strategies
5. Explain EAS Submit and the end-to-end delivery pipeline to the app stores

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Expo project foundations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map three app requirements to managed vs bare workflow decisions; (2) Read an app.json/app.config.js and predict the resulting native build
- Common misconception addressed: Believing the managed workflow blocks all use of native modules
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The Expo SDK and managed workflow | 96 | 8 |
| M01L02 | app config, native modules and the bare workflow | 96 | 8 |

### M02 Builds with EAS Build (MASTEMY-DESIGN 20%)

- Worked applications: (1) Define development, preview and production build profiles for one app; (2) Diagnose a failed build from an EAS build log excerpt
- Common misconception addressed: Assuming a local machine with Xcode is always required to build an iOS binary
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Configuring eas.json build profiles | 96 | 8 |
| M02L02 | Credentials, signing and build artifacts | 96 | 8 |

### M03 Over-the-air updates with EAS Update (MASTEMY-DESIGN 20%)

- Worked applications: (1) Match four change types to 'OTA update' or 'new store build'; (2) Design a channel-to-branch mapping for staging and production
- Common misconception addressed: Thinking an OTA update can change native code or bump the runtime version safely
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Update channels, branches and runtime versions | 96 | 8 |
| M03L02 | What can and cannot ship over the air | 96 | 8 |

### M04 Release channels and rollout (MASTEMY-DESIGN 20%)

- Worked applications: (1) Plan a phased rollout from internal testers to production; (2) Write a rollback plan for a bad OTA update
- Common misconception addressed: Believing a published OTA update cannot be rolled back
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Promoting a build through channels | 96 | 8 |
| M04L02 | Rollback, republish and monitoring an update | 96 | 8 |

### M05 Store submission and delivery operations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Sequence the steps from code change to a public store release; (2) Decide which version numbers must change for a given release
- Common misconception addressed: Confusing the runtime version with the user-facing store version
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | EAS Submit to App Store and Play Console | 96 | 8 |
| M05L02 | Versioning, review gates and delivery automation | 96 | 8 |

## Integrative case

A product team ships an Expo app to both stores. Plan which changes go out as over-the-air updates and which require a new native build, set up EAS Build and Update channels for staging and production, and write a rollout-and-rollback plan you can defend to the release manager.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0892-final-protected | 35 | 35 | yes |
| MST-0892-final-alternate | 35 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Expo project foundations | 7 |
| Builds with EAS Build | 7 |
| Over-the-air updates with EAS Update | 7 |
| Release channels and rollout | 7 |
| Store submission and delivery operations | 7 |

Minimum reviewed item bank: 398 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0892-Q0001** (single-answer, Select ONE) A team changes only React component JavaScript and some styling, with no new native dependency. Which delivery path is appropriate?

- A. Ship it as an EAS Update over the air to the existing build **(key)**  
  _Rationale:_ Correct: pure JavaScript and asset changes within the same runtime version can ship over the air without a new store build.
- B. Submit a brand-new build to both app stores and wait for review  
  _Rationale:_ A full store submission is unnecessary when no native code or runtime version changed.
- C. Bump the native runtime version and rebuild  
  _Rationale:_ The runtime version only changes when the native layer changes; it did not here.
- D. Nothing can be delivered without Xcode on a local machine  
  _Rationale:_ EAS builds in the cloud and OTA updates need no local native toolchain.

**MST-0892-Q0002** (multiple-answer, Select TWO) Which TWO changes CANNOT be delivered through an EAS Update over the air and require a new native build? (Select TWO.)

- A. Adding a new native module that needs native code **(key)**  
  _Rationale:_ Correct: new native code is compiled into the binary and cannot ship over the air.
- B. Changing the app's minimum supported OS, which alters the native build **(key)**  
  _Rationale:_ Correct: native build configuration changes require a rebuilt binary.
- C. Editing the text of an on-screen label  
  _Rationale:_ Text changes are JavaScript and can ship over the air.
- D. Adjusting a stylesheet colour  
  _Rationale:_ Style changes are JavaScript and can ship over the air.

**MST-0892-Q0003** (single-answer, Select ONE) A production OTA update introduces a crash. What is the fastest safe response using EAS Update?

- A. Republish the previous known-good update to the production branch **(key)**  
  _Rationale:_ Correct: republishing the last good update rolls clients back without a store review.
- B. Submit a new build and wait for store review  
  _Rationale:_ Store review is slow and unnecessary when a prior good JavaScript bundle exists.
- C. Delete the app from the stores  
  _Rationale:_ Removing the app harms all users and does not fix the update.
- D. Ask every user to reinstall  
  _Rationale:_ Users cannot be relied on to reinstall and it does not address the bad bundle.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
