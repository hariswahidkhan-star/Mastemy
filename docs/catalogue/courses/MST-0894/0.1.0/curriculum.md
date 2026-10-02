# Electron: Cross-Platform Desktop Applications

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0894` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Electron: Cross-Platform Desktop Applications (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Electron's process model
2. Communicate safely between processes
3. Harden an Electron application
4. Package, sign and update desktop apps

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Electron architecture (MASTEMY-DESIGN 25%)

- Worked applications: (1) Create a BrowserWindow from the main process; (2) Handle app ready and window-all-closed events
- Common misconception addressed: Confusing the main process with the renderer process responsibilities
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Main and renderer processes | 120 | 7 |
| M01L02 | The app lifecycle and windows | 120 | 7 |

### M02 Inter-process communication (MASTEMY-DESIGN 25%)

- Worked applications: (1) Call a main-process function via ipcRenderer.invoke; (2) Expose a safe API with contextBridge
- Common misconception addressed: Enabling nodeIntegration in the renderer for convenience
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | ipcMain, ipcRenderer and invoke/handle | 120 | 7 |
| M02L02 | contextBridge and safe exposure | 120 | 7 |

### M03 Security hardening (MASTEMY-DESIGN 25%)

- Worked applications: (1) Turn on contextIsolation and a preload bridge; (2) Set a Content Security Policy for the renderer
- Common misconception addressed: Believing loading remote content with nodeIntegration is safe
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | contextIsolation and sandboxing | 120 | 7 |
| M03L02 | CSP, remote content and permissions | 120 | 7 |

### M04 Packaging and updates (MASTEMY-DESIGN 25%)

- Worked applications: (1) Package and sign an app for distribution; (2) Wire up an auto-updater feed
- Common misconception addressed: Assuming unsigned apps install without OS gatekeeper warnings
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Packaging and code signing | 120 | 7 |
| M04L02 | Auto-update channels | 120 | 7 |

## Integrative case

Build a secure Markdown editor in Electron: a main process managing windows, a hardened renderer with contextIsolation and a contextBridge-exposed file API, a strict CSP, and signed packaging with auto-update for Windows and macOS.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0894-final-protected | 40 | 48 | yes |
| MST-0894-final-alternate | 40 | 48 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Electron architecture | 10 |
| Inter-process communication | 10 |
| Security hardening | 10 |
| Packaging and updates | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0894-Q0001** (single-answer, Select ONE) Which responsibility belongs to the Electron main process, not the renderer?

- A. Creating native windows and accessing OS-level APIs **(key)**  
  _Rationale:_ Correct: the main process manages windows and native integration.
- B. Rendering the DOM for a window  
  _Rationale:_ DOM rendering happens in the renderer process.
- C. Running the page's client-side JavaScript UI  
  _Rationale:_ UI JavaScript runs in the renderer.
- D. Handling CSS layout  
  _Rationale:_ Layout is a renderer concern.

**MST-0894-Q0002** (multiple-answer, Select TWO) Which TWO settings harden an Electron renderer against untrusted content? (Select TWO.)

- A. Enabling contextIsolation **(key)**  
  _Rationale:_ Correct: contextIsolation separates preload and page contexts.
- B. Exposing only a minimal API via contextBridge **(key)**  
  _Rationale:_ Correct: a narrow bridge limits what the page can do.
- C. Enabling nodeIntegration in the renderer  
  _Rationale:_ That gives page scripts full Node access, a major risk.
- D. Disabling the Content Security Policy  
  _Rationale:_ Removing CSP weakens defence against injected scripts.

**MST-0894-Q0003** (single-answer, Select ONE) How should a renderer request a privileged action like reading a file?

- A. Call a narrow function exposed via contextBridge that uses ipcRenderer.invoke to the main process **(key)**  
  _Rationale:_ Correct: the main process performs the privileged work behind a safe bridge.
- B. Use Node's fs directly in the renderer  
  _Rationale:_ That requires unsafe nodeIntegration.
- C. Fetch the file over http from localhost  
  _Rationale:_ That is unnecessary and insecure compared with IPC.
- D. Store the file contents in the manifest  
  _Rationale:_ Manifests do not perform file I/O.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
