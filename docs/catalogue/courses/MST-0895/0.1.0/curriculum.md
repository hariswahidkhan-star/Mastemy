# Frontend Security and Dependency Risk Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0895` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Frontend Security and Dependency Risk Management (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the main client-side security risks facing web frontends
2. Describe XSS types and how safe rendering and encoding prevent them
3. Explain how CSP and security headers reduce client-side risk
4. Describe how third-party packages introduce risk and how to assess it
5. Explain how to audit, prioritise and remediate dependency vulnerabilities

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Frontend threat model (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map three features to the client-side risks they introduce; (2) Rank four threats by likelihood and impact for one app
- Common misconception addressed: Believing security is only a backend concern
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The browser trust model and attack surface | 96 | 8 |
| M01L02 | Common frontend threats and their impact | 96 | 8 |

### M02 Cross-site scripting and injection (MASTEMY-DESIGN 20%)

- Worked applications: (1) Spot the unsafe sink in a snippet that renders user input; (2) Rewrite a dangerous innerHTML use into a safe one
- Common misconception addressed: Assuming a frontend framework removes all XSS risk automatically
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Stored, reflected and DOM-based XSS | 96 | 8 |
| M02L02 | Output encoding, sanitisation and safe sinks | 96 | 8 |

### M03 Content Security Policy and headers (MASTEMY-DESIGN 20%)

- Worked applications: (1) Write a starting CSP for an app with one CDN and inline scripts; (2) Diagnose why a resource is blocked from a CSP violation report
- Common misconception addressed: Thinking a single wildcard CSP provides meaningful protection
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Content Security Policy directives | 96 | 8 |
| M03L02 | Other protective headers and their trade-offs | 96 | 8 |

### M04 Dependency and supply-chain risk (MASTEMY-DESIGN 20%)

- Worked applications: (1) Assess a dependency's risk from its metadata and tree; (2) Decide whether to add, pin or replace a risky package
- Common misconception addressed: Believing popular packages are automatically safe
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | The dependency tree and transitive risk | 96 | 8 |
| M04L02 | Typosquatting, malicious packages and provenance | 96 | 8 |

### M05 Auditing and remediation workflow (MASTEMY-DESIGN 20%)

- Worked applications: (1) Triage an audit report into fix-now, fix-later and accept; (2) Plan a safe upgrade for a vulnerable transitive dependency
- Common misconception addressed: Assuming every reported vulnerability must be patched immediately regardless of reachability
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Lockfiles, audits and advisories | 96 | 8 |
| M05L02 | Prioritising and patching vulnerabilities safely | 96 | 8 |

## Integrative case

A frontend team inherits an app with an outdated dependency tree and no security headers. Build a threat model, add a Content Security Policy, triage an audit report into prioritised fixes, and justify which vulnerabilities you patch now versus accept with a documented reason.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0895-final-protected | 35 | 35 | yes |
| MST-0895-final-alternate | 35 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Frontend threat model | 7 |
| Cross-site scripting and injection | 7 |
| Content Security Policy and headers | 7 |
| Dependency and supply-chain risk | 7 |
| Auditing and remediation workflow | 7 |

Minimum reviewed item bank: 398 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0895-Q0001** (single-answer, Select ONE) User-supplied text is inserted with element.innerHTML and renders as markup. Which risk does this most directly create?

- A. DOM-based cross-site scripting **(key)**  
  _Rationale:_ Correct: writing untrusted input to innerHTML lets injected markup and scripts execute in the page.
- B. A slow network request  
  _Rationale:_ Rendering text to innerHTML is not a network performance issue.
- C. A broken CSS layout only  
  _Rationale:_ The core risk is script injection, not merely layout.
- D. A server-side SQL injection  
  _Rationale:_ SQL injection is a backend database concern, not this client-side sink.

**MST-0895-Q0002** (multiple-answer, Select TWO) Which TWO practices reduce supply-chain risk from third-party frontend packages? (Select TWO.)

- A. Commit a lockfile so installed versions are reproducible **(key)**  
  _Rationale:_ Correct: a lockfile pins exact resolved versions and prevents silent drift.
- B. Review a dependency's provenance and maintenance before adding it **(key)**  
  _Rationale:_ Correct: vetting provenance and activity catches typosquats and abandoned packages.
- C. Always install the newest version with no pin  
  _Rationale:_ Floating to the newest version invites unreviewed and possibly malicious updates.
- D. Trust any package with many downloads without review  
  _Rationale:_ Popularity does not guarantee safety; compromised popular packages exist.

**MST-0895-Q0003** (single-answer, Select ONE) A dependency audit flags many issues. What is the best first step before patching everything?

- A. Triage by severity and whether the vulnerable code is reachable in your app **(key)**  
  _Rationale:_ Correct: prioritising by severity and reachability focuses effort where real risk exists.
- B. Delete every dependency that appears in the report  
  _Rationale:_ Blanket deletion breaks the app and ignores actual risk.
- C. Ignore the report because audits are always noise  
  _Rationale:_ Dismissing audits wholesale leaves real vulnerabilities unaddressed.
- D. Patch alphabetically regardless of severity  
  _Rationale:_ Alphabetical order bears no relation to risk and wastes effort.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
