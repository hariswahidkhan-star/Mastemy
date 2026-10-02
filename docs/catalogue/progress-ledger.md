# Progress Ledger

Last generated: 2026-10-02, by the catalogue generator.

| Batch | Scope | Status |
|---|---|---|
| 0 | Architecture, full inventory (1076 courses), pathways, source register, policies, QA | Done |
| 1 | Full curriculum blueprints for 10 courses | Done (specs only; no lesson scripts, videos or item banks yet) |
| 2 | Blueprints for wave-2 cert-prep courses after official syllabus verification | Not started |
| 3+ | Item-bank authoring, video production, SME review, approval | Not started |

## What exists at each depth

- **full-curriculum** (10): curriculum spec in `curricula/` (outcomes, modules/lessons, traceability, assessment blueprint, production notes, 3 sample MCQs). No lesson content, videos or full item bank yet.
- **blueprint** (0): none in this batch.
- **inventory** (1066): catalogue row only (metadata, hours, pathway, wave).

## Batch 1 courses

| Course ID | Title | Evidence | Min. item bank |
|---|---|---|---|
| `MST-MIC-MS-AZ900-001` | Microsoft Azure Fundamentals (AZ-900) Exam Prep | verified-official-source | 290 |
| `MST-MIC-MS-AI901-001` | Microsoft Azure AI Fundamentals (AI-901) Exam Prep | verified-official-source | 298 |
| `MST-MIC-MS-SC900-001` | Microsoft Security, Compliance, and Identity Fundamentals (SC-900) Exam Prep | verified-official-source | 293 |
| `MST-MIC-MS-AZ104-001` | Microsoft Azure Administrator (AZ-104) Exam Prep | verified-official-source | 450 |
| `MST-MIC-MS-DP900-001` | Microsoft Azure Data Fundamentals (DP-900) Exam Prep | verified-official-source | 294 |
| `MST-MIC-MS-PL900-001` | Microsoft Power Platform Fundamentals (PL-900) Exam Prep | verified-official-source | 300 |
| `MST-AWS-AWS-CLFC02-001` | AWS Certified Cloud Practitioner (CLF-C02) Exam Prep | secondary-only-needs-official-check | 388 |
| `MST-CYB-CMPT-SY0701-001` | CompTIA Security+ (SY0-701) Exam Prep | secondary-only-needs-official-check | 513 |
| `MST-PMB-PMI-PMP-001` | PMI Project Management Professional (PMP) Exam Prep | secondary-only-needs-official-check | 809 |
| `MST-FIN-CFA-L1-001` | CFA Program Level I Exam Prep | secondary-only-needs-official-check | 3330 |

## Verification position

- verified-official-source: 6 courses (Microsoft study guides read through the Microsoft Learn MCP).
- unverified-needs-official-check: 332 cert-prep courses. Several have secondary (search-snippet) evidence only; see source-register.csv.
- n/a-no-official-syllabus: 738 skills/foundation courses.

## Known gaps

- Official sites for AWS, CompTIA, PMI, ACCA, Google Cloud, CFA and IELTS were blocked by the session egress proxy, so 4 of the 10 Batch 1 specs (CLF-C02, SY0-701, PMP, CFA L-I) rest on secondary evidence and must be re-verified before production.
- Most exam codes (for example SAP, Salesforce, Databricks and some AWS/Google codes) are left blank instead of guessed.
- MCQ-only delivery cannot assess writing/speaking, task-based simulations or performance-based labs. These are flagged per course in `assessment_note`.
- No partnerships or endorsements exist. The certificate policy forbids implying any.
