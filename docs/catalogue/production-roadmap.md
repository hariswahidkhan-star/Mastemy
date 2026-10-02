# Production Roadmap (static)

Follows master prompt section 18. Row-level priority is `priority_batch`; stage is `workflow_state`.

| Batch | Contents | Status / gate |
|---|---|---|
| 1 | 10 v1 specs re-keyed to MST IDs and upgraded to the package format | Specs exist. Four (MST-0051, MST-0121, MST-0201, MST-0250) rest on secondary evidence and must be re-verified |
| 2 | 10 new specs: AB-730, AB-731, AI-103, Copilot in Excel, Claude Code Foundations, RAG, .NET + MySQL, GH-300, PL-300, DP-600 | Specs exist; verified from Microsoft Learn / code.claude.com where stated |
| 3 | Section 18 priority families: ACCA papers, US CPA sections, CIA parts, CISA, PMP, CFA levels, US CMA parts, NCLEX-RN/PN, IELTS, AI in Excel, Microsoft platform AI, ChatGPT, Claude, Cursor, RAG, .NET, JavaScript/TypeScript | Blocked on issuer syllabus access for the exam families (proxy-blocked this run); skills courses can proceed |
| 4 | Other exam preparation | Exact exam/version resolution, then source verification |
| 5 | Other skills courses | Blueprint review |

## Per-course pipeline
Candidate -> Source verification (exact syllabus fetched, exam-version record complete) -> Blueprint review (full curriculum spec) -> Authoring (scripts, storyboards, notes, captions) -> Assessment review (full bank, SME-reviewed) -> Video production (YouTube upload, IDs recorded) -> Quality approval (`quality-gates.md`) -> Published. Each run ends by regenerating `operations/production_manifest.json`; the next run starts from it.

## Rules
1. Exams with a scheduled retirement before realistic release (MS-102, 2026-11-30) are blocked; successors are preferred.
2. Courses whose official exam relies mainly on non-MCQ components are scheduled after MCQ-heavy exams and always carry their limitation note.
3. Translations (Arabic, Spanish, French, Chinese, Russian, Korean) start only after the English master passes subject review; they are versions, not new courses.
