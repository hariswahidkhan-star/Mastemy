# Ionic and Capacitor Hybrid Application Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0893` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Ionic and Capacitor Hybrid Application Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the hybrid (web-in-a-webview) model and where Ionic and Capacitor fit
2. Describe Ionic's component library and adaptive, platform-aware styling
3. Explain how Capacitor plugins expose native capabilities to web code
4. Describe how Capacitor manages the native iOS and Android projects
5. Explain building, deploying and updating a Capacitor app across platforms

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Hybrid app fundamentals (MASTEMY-DESIGN 20%)

- Worked applications: (1) Classify three app ideas as good or poor fits for a hybrid approach; (2) Diagram how web code reaches a native device feature
- Common misconception addressed: Believing a hybrid app cannot access native device features
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Web views, hybrid vs native vs React Native | 96 | 8 |
| M01L02 | The Ionic framework and Capacitor runtime | 96 | 8 |

### M02 Building UI with Ionic components (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose Ionic components for a three-screen flow; (2) Apply a theme that adapts between iOS and Android styles
- Common misconception addressed: Assuming one fixed look must be forced identically on every platform
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Ionic UI components and navigation | 96 | 8 |
| M02L02 | Platform adaptive styling and theming | 96 | 8 |

### M03 Capacitor native bridge and plugins (MASTEMY-DESIGN 20%)

- Worked applications: (1) Pick the right plugin for camera, storage and geolocation needs; (2) Trace a plugin call from JavaScript to the native layer
- Common misconception addressed: Thinking every native feature needs a hand-written custom plugin
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | The Capacitor bridge and core plugins | 96 | 8 |
| M03L02 | Using and configuring community and custom plugins | 96 | 8 |

### M04 Native project integration (MASTEMY-DESIGN 20%)

- Worked applications: (1) Run the copy/sync workflow after a web build change; (2) Add a required permission for a plugin to the native config
- Common misconception addressed: Believing the native platform folders should never be opened or edited
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | The native project folders and sync workflow | 96 | 8 |
| M04L02 | Permissions, configuration and native tooling | 96 | 8 |

### M05 Build, deploy and maintain (MASTEMY-DESIGN 20%)

- Worked applications: (1) Plan a release that targets web, iOS and Android from one codebase; (2) Debug a difference that appears only on a physical device
- Common misconception addressed: Assuming identical behaviour on every platform removes the need for device testing
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Building and deploying to devices and stores | 96 | 8 |
| M05L02 | Live updates, debugging and maintenance | 96 | 8 |

## Integrative case

A startup must ship one product to the web, iOS and Android from a single codebase. Decide whether a hybrid Ionic/Capacitor approach fits, choose components and plugins for the core features, and write a build-and-release plan covering permissions, syncing native projects and device testing.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0893-final-protected | 35 | 35 | yes |
| MST-0893-final-alternate | 35 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Hybrid app fundamentals | 7 |
| Building UI with Ionic components | 7 |
| Capacitor native bridge and plugins | 7 |
| Native project integration | 7 |
| Build, deploy and maintain | 7 |

Minimum reviewed item bank: 398 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0893-Q0001** (single-answer, Select ONE) How does web code in a Capacitor app invoke a native device feature such as the camera?

- A. Through a Capacitor plugin that bridges JavaScript calls to native code **(key)**  
  _Rationale:_ Correct: plugins expose a JavaScript API that the Capacitor bridge forwards to native implementations.
- B. By running native Swift or Kotlin directly inside the web view  
  _Rationale:_ Web views run web code; native code runs behind the bridge, not inside the view.
- C. It cannot; hybrid apps have no access to native features  
  _Rationale:_ Hybrid apps reach native features precisely through the plugin bridge.
- D. By reinstalling the app for each feature  
  _Rationale:_ Reinstalling is unrelated to how a feature is invoked.

**MST-0893-Q0002** (multiple-answer, Select TWO) Which TWO statements about Ionic's platform-adaptive styling are correct? (Select TWO.)

- A. Components can render with iOS or Android conventions depending on the platform **(key)**  
  _Rationale:_ Correct: Ionic adapts component appearance to match each platform's conventions.
- B. A shared theme can define colours and variables reused across platforms **(key)**  
  _Rationale:_ Correct: theming through CSS variables is shared and reused.
- C. Styling must be rewritten natively for each platform  
  _Rationale:_ Styling is defined once in web CSS, not rewritten natively.
- D. Ionic forbids any custom theming  
  _Rationale:_ Ionic explicitly supports custom themes.

**MST-0893-Q0003** (single-answer, Select ONE) After changing the web build, which Capacitor step makes the change appear in the native app?

- A. Copy/sync the web assets into the native projects, then run them **(key)**  
  _Rationale:_ Correct: the sync workflow copies the built web assets into the native projects before they run.
- B. Nothing; native apps read the web source folder live  
  _Rationale:_ Native apps run copied assets, not the live source folder.
- C. Resubmit to the app store for every local change  
  _Rationale:_ Store submission is not needed to test a synced change locally.
- D. Delete the native folders and regenerate the whole project  
  _Rationale:_ A routine sync suffices; regenerating everything is unnecessary.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
