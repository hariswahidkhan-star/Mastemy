# React Native: Cross-Platform Mobile Applications

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0891` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — React Native: Cross-Platform Mobile Applications (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Build UI with React Native core components
2. Implement navigation and state
3. Integrate platform and device APIs
4. Optimise and release a React Native app

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 React Native fundamentals (MASTEMY-DESIGN 25%)

- Worked applications: (1) Build a screen with View, Text and Image; (2) Lay out a card with Flexbox
- Common misconception addressed: Expecting HTML elements like div to work in React Native
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Core components and JSX for mobile | 120 | 7 |
| M01L02 | Styling with Flexbox and StyleSheet | 120 | 7 |

### M02 Navigation and state (MASTEMY-DESIGN 25%)

- Worked applications: (1) Set up stack navigation between two screens; (2) Share auth state via context
- Common misconception addressed: Assuming web routing (URLs) drives React Native navigation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Stack and tab navigation | 120 | 7 |
| M02L02 | Component state and context | 120 | 7 |

### M03 Native modules and platform APIs (MASTEMY-DESIGN 25%)

- Worked applications: (1) Branch styling by platform with Platform.select; (2) Request camera permission before use
- Common misconception addressed: Believing one codebase needs zero platform-specific handling
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Platform differences and Platform.select | 120 | 7 |
| M03L02 | Accessing device APIs and permissions | 120 | 7 |

### M04 Performance and release (MASTEMY-DESIGN 25%)

- Worked applications: (1) Virtualise a long list with FlatList; (2) Prepare a signed release build
- Common misconception addressed: Using ScrollView with map for thousands of rows instead of FlatList
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Lists, FlatList and memoization | 120 | 7 |
| M04L02 | Builds, OTA limits and store release | 120 | 7 |

## Integrative case

Build a cross-platform events app: core-component screens styled with Flexbox, stack and tab navigation, auth via context, camera permission for check-in photos, a virtualised FlatList of events, and signed release builds for both platforms.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0891-final-protected | 40 | 48 | yes |
| MST-0891-final-alternate | 40 | 48 | no (optional practice) |

| Domain | Items per form |
|---|---|
| React Native fundamentals | 10 |
| Navigation and state | 10 |
| Native modules and platform APIs | 10 |
| Performance and release | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0891-Q0001** (single-answer, Select ONE) Which element correctly renders a line of text in React Native?

- A. <Text>Hello</Text> **(key)**  
  _Rationale:_ Correct: Text is the core component for displaying text.
- B. <p>Hello</p>  
  _Rationale:_ HTML elements like p do not exist in React Native.
- C. <div>Hello</div>  
  _Rationale:_ div is web-only; use View for containers.
- D. <span>Hello</span>  
  _Rationale:_ span is HTML; React Native uses Text.

**MST-0891-Q0002** (multiple-answer, Select TWO) Which TWO are correct about rendering long lists performantly in React Native? (Select TWO.)

- A. FlatList virtualises rows, rendering only what is near the viewport **(key)**  
  _Rationale:_ Correct: virtualization keeps memory and work bounded.
- B. A stable keyExtractor helps avoid unnecessary re-renders **(key)**  
  _Rationale:_ Correct: stable keys let the list reuse rows.
- C. ScrollView with mapped children scales best for thousands of rows  
  _Rationale:_ ScrollView renders all children at once and will not scale.
- D. Virtualization requires the web DOM  
  _Rationale:_ React Native virtualizes natively without a DOM.

**MST-0891-Q0003** (single-answer, Select ONE) You need slightly different padding on iOS and Android. What is an idiomatic approach?

- A. Use Platform.select or Platform.OS to branch the style **(key)**  
  _Rationale:_ Correct: Platform APIs provide per-platform values cleanly.
- B. Ship two entirely separate codebases  
  _Rationale:_ That defeats the cross-platform purpose for a minor difference.
- C. Detect the user agent string  
  _Rationale:_ There is no browser user agent in React Native.
- D. Assume both platforms are identical and do nothing  
  _Rationale:_ The requirement is an explicit platform difference.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
