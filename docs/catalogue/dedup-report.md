# Semantic Deduplication and Reconciliation Report

Generated 2026-10-02 by `scripts/catalogue/build_catalogue.py`. Every number is computed from the emitted files.

## Result

- Candidate rows after reconciliation: **1878** (Appendix A 1300 + v1 additions 578).
- Distinct courses, inclusive count (excludes duplicates, component modules, retired and retirement-blocked rows): **1869**.
- Distinct courses, strict count (also excludes rows still under differentiation, overlap, thin-scope or version review): **1740**.
- Requirement of at least 1,000 genuinely distinct courses: **met** on the strict count.

These are planning counts of distinct course *scopes*. None of these courses has content, videos or reviewed items yet.

## Method

1. Appendix A (1,300 rows, MST-0001..MST-1300) is imported unchanged as the authoritative backlog (`scripts/catalogue/input/appendix_a.csv`).
2. Each v1 row (1,076) is compared with every Appendix A title by IDF-weighted token similarity. Certification rows keep level words (Foundation/Practitioner, Level I/II) and exam codes; a brand/tool word present on only one side, or a certification-vs-skills mismatch, reduces the score. Matches are one-to-one, best score first (threshold 0.45; certification pairs 0.34).
3. `scripts/catalogue/input/crosswalk_overrides.csv` records manual decisions (maps, merges, retirements, forced additions); they win over the heuristic.
4. Unmatched v1 rows become additions with new IDs from MST-1301 upward, recorded in `catalog/mst-id-registry.json`; IDs are never reused. A v1 row whose best match is already taken and scores >= 0.55 is recorded as a merged duplicate instead.
5. Within the combined set, `scripts/catalogue/input/dedup_decisions.csv` holds reviewed decisions (duplicates, component modules, brand/tool-swap differentiation reviews, content reuse); additions are also flagged automatically for thin scope (<= 10 h), version checks, or a close Appendix A neighbour (similarity >= 0.40).
6. Exam rows are checked against `research/retired_exams.csv` (17 Microsoft exams confirmed retired on the official Microsoft retirement page this run) and the scheduled-retirement list.

Limits: title-level comparison cannot prove two outlines are different. Rows marked for review are kept out of the strict count until their blueprints are compared.

## Crosswalk (v1 -> MST)

| Action | v1 rows |
|---|---|
| addition | 578 |
| mapped | 476 |
| merged-duplicate | 16 |
| retired-excluded | 6 |

Mapped by method: manual-override=134, title-similarity=342

Full detail: `catalog/id-crosswalk.csv`. Every v1 ID appears exactly once; none is dropped silently.

## Dedup status of catalogue rows

| Status | Rows | Counted (inclusive) | Counted (strict) |
|---|---|---|---|
| content-reuse | 7 | yes | yes |
| differentiation-review | 18 | yes | no |
| distinct | 1733 | yes | yes |
| duplicate-of | 2 | no | no |
| module-of | 6 | no | no |
| needs-version-check | 4 | yes | no |
| overlap-review | 11 | yes | no |
| retiring-blocked | 1 | no | no |
| thin-scope-review | 96 | yes | no |

## Per category

| Cat | Name | Appendix A | v1 additions | Raw | Inclusive | Strict |
|---|---|---|---|---|---|---|
| 01 | Accounting And Tax Certification Preparation | 50 | 0 | 50 | 50 | 50 |
| 02 | Investment, Banking, Risk, And Actuarial Credentials | 40 | 0 | 40 | 40 | 40 |
| 03 | Audit, Privacy, Governance, And Compliance Credentials | 30 | 1 | 31 | 31 | 31 |
| 04 | Project, Agile, Product, And Business-Analysis Credentials | 40 | 0 | 40 | 40 | 40 |
| 05 | Microsoft, Office, And Github Credential Preparation | 40 | 10 | 50 | 49 | 48 |
| 06 | Aws, Google Cloud, And Data-Platform Credentials | 40 | 4 | 44 | 44 | 44 |
| 07 | Cybersecurity, Networks, Linux, And Infrastructure Credentials | 50 | 15 | 65 | 65 | 65 |
| 08 | Hr, Supply Chain, Quality, And Safety Credentials | 50 | 2 | 52 | 52 | 51 |
| 09 | Us Healthcare, Engineering, Education, And Licensing Examinations | 50 | 1 | 51 | 51 | 51 |
| 10 | Language Proficiency, Admissions, And Academic Skills | 40 | 20 | 60 | 54 | 54 |
| 11 | Artificial Intelligence And Machine-Learning Foundations | 40 | 112 | 152 | 152 | 102 |
| 12 | Chatgpt, Openai, And Codex Applications | 40 | 0 | 40 | 40 | 40 |
| 13 | Claude, Anthropic, And Claude Code Applications | 40 | 0 | 40 | 40 | 30 |
| 14 | Cursor And Ai-Assisted Software-Development Tools | 30 | 0 | 30 | 30 | 24 |
| 15 | Rag, Prompt Engineering, Agents, And Ai-System Reliability | 50 | 0 | 50 | 50 | 49 |
| 16 | Excel, Microsoft 365, And Copilot Productivity | 50 | 15 | 65 | 64 | 50 |
| 17 | Azure, Fabric, Power Platform, And Dynamics Skills | 40 | 14 | 54 | 54 | 41 |
| 18 | Google Workspace, Gemini, And Google Cloud Skills | 30 | 28 | 58 | 58 | 58 |
| 19 | Amazon And Aws Practical Application Skills | 30 | 29 | 59 | 59 | 59 |
| 20 | Cross-Platform Ai And End-To-End Business Workflows | 40 | 0 | 40 | 40 | 40 |
| 21 | .Net, C#, Java, And Enterprise Backend Development | 40 | 0 | 40 | 40 | 40 |
| 22 | Javascript, Typescript, Frontend, And Mobile Web | 40 | 11 | 51 | 51 | 51 |
| 23 | Major Programming Languages And Computer-Science Skills | 40 | 58 | 98 | 98 | 97 |
| 24 | Data Engineering, Databases, Statistics, And Analytics | 40 | 37 | 77 | 77 | 77 |
| 25 | Devops, Cybersecurity, Testing, And Software Architecture | 40 | 55 | 95 | 95 | 94 |
| 26 | Finance, Accounting, And Commercial Business Skills | 40 | 42 | 82 | 82 | 82 |
| 27 | Leadership, Hr, Entrepreneurship, And Professional Skills | 40 | 28 | 68 | 67 | 52 |
| 28 | Marketing, Sales, Design, And Digital-Content Skills | 40 | 23 | 63 | 63 | 57 |
| 29 | Engineering, Supply Chain, Sustainability, And Project Delivery | 40 | 33 | 73 | 73 | 69 |
| 30 | Applied Ai By Industry And Professional Role | 40 | 0 | 40 | 40 | 40 |
| 31 | Enterprise Platforms, It Service Management, And Ai Credentials | 40 | 18 | 58 | 58 | 52 |
| 32 | Additional Global Credentials And Us Professional Examinations | 40 | 22 | 62 | 62 | 62 |
| | **Total** | 1300 | 578 | 1878 | 1869 | 1740 |

## Reviewed decisions

| Course | Decision | Partner | Note |
|---|---|---|---|
| MST-0044 ACCA FA1: Recording Financial Transactions | content-reuse | MST-0003 | ACCA FA1 reuses FA content; distinct foundation-level award |
| MST-0045 ACCA MA1: Management Information | content-reuse | MST-0002 | ACCA MA1 reuses MA content; distinct foundation-level award |
| MST-0046 ACCA FA2: Maintaining Financial Records | content-reuse | MST-0003 | ACCA FA2 reuses FA content; distinct foundation-level award |
| MST-0047 ACCA MA2: Managing Costs and Finance | content-reuse | MST-0002 | ACCA MA2 reuses MA content; distinct foundation-level award |
| MST-0048 ACCA FBT: Foundations in Business and Technology | content-reuse | MST-0001 | ACCA Foundations FBT reuses BT content; distinct pathway per master prompt section 5 |
| MST-0049 ACCA FMA: Foundations in Management Accounting | content-reuse | MST-0002 | ACCA FMA reuses MA content; distinct pathway |
| MST-0050 ACCA FFA: Foundations in Financial Accounting | content-reuse | MST-0003 | ACCA FFA reuses FA content; distinct pathway |
| MST-0182 Microsoft MS-102: Microsoft 365 Administrator Expert — Retirement-Aware Track | retiring-blocked |  | MS-102 retires 2026-11-30 per official Microsoft page; a new course cannot be produced and published before retirement |
| MST-0393 IELTS Academic Writing: Task Analysis and Model-Response Evaluation | module-of | MST-0391 | IELTS Academic Writing is a component of the four-skill IELTS Academic course; offer as an optional focused module, not a separate counted course |
| MST-0394 IELTS General Training Writing: Letters and Essays | module-of | MST-0392 | IELTS GT Writing is a component of the four-skill GT course |
| MST-0395 IELTS Speaking: Fluency, Pronunciation, and Response Strategy | module-of | MST-0391|MST-0392 | IELTS Speaking is shared by Academic and GT; component module |
| MST-0396 IELTS Listening: Comprehension and Test Strategy | module-of | MST-0391|MST-0392 | IELTS Listening is shared by Academic and GT; component module |
| MST-0397 IELTS Academic Reading: Advanced Comprehension and Evidence | module-of | MST-0391 | IELTS Academic Reading is a component of the four-skill Academic course |
| MST-0398 IELTS General Training Reading: Workplace and Everyday Texts | module-of | MST-0392 | IELTS GT Reading is a component of the four-skill GT course |
| MST-0511 Claude for Work: Current Features and Professional Foundations | differentiation-review | MST-0471 | brand-swap risk: Claude for Work vs ChatGPT for Work; must differ by product capabilities, not just the tool name |
| MST-0513 Claude Projects: Knowledge Organization and Team Workflows | differentiation-review | MST-0473 | brand-swap risk: Claude Projects vs ChatGPT Projects |
| MST-0515 Claude Research and Evidence-Based Synthesis | differentiation-review | MST-0475 | brand-swap risk: research/verification workflows |
| MST-0516 Claude for Financial Modeling and Spreadsheet Analysis | differentiation-review | MST-0479 | brand-swap risk: financial analysis with two chat assistants |
| MST-0517 Claude for Board Papers and Executive Communication | differentiation-review | MST-0477 | brand-swap risk: executive writing |
| MST-0518 Claude for Contract Analysis and Policy Drafting Support | differentiation-review | MST-0486 | brand-swap risk: contract review support |
| MST-0521 Claude for Presentation Planning and Slide Content | differentiation-review | MST-0478 | brand-swap risk: presentations |
| MST-0522 Claude for Business Process Design and Standard Operating Procedures | differentiation-review | MST-0485 | brand-swap risk: SOP/process documentation |
| MST-0523 Claude for Product Management and Requirements Analysis | differentiation-review | MST-0487 | brand-swap risk: product requirements |
| MST-0525 Claude for Data Cleaning and Analytical Reporting | differentiation-review | MST-0476 | brand-swap risk: data analysis |
| MST-0555 Cursor for React and TypeScript Frontend Development | differentiation-review | MST-0535 | tool-swap risk: Cursor vs Claude Code for React/TypeScript |
| MST-0556 Cursor for .NET and C# Backend Development | differentiation-review | MST-0534 | tool-swap risk: Cursor vs Claude Code for .NET |
| MST-0557 Cursor for Python Application Development | differentiation-review | MST-0536 | tool-swap risk: Cursor vs Claude Code for Python |
| MST-0560 Cursor for Automated Testing and Defect Repair | differentiation-review | MST-0537 | tool-swap risk: testing and defect repair |
| MST-0562 Cursor MCP Servers and Enterprise Tool Connections | differentiation-review | MST-0541 | tool-swap risk: MCP integration |
| MST-0566 Cursor Pull-Request Review and Bugbot Workflows | differentiation-review | MST-0542 | tool-swap risk: PR review workflows |
| MST-0602 Enterprise RAG with SharePoint and Microsoft Data | differentiation-review | MST-0801 | overlap: enterprise RAG over SharePoint appears as both a RAG course and an integration course |
| MST-0654 AI-Assisted Excel Financial Statement Analysis | differentiation-review | MST-1023 | overlap: financial statement analysis with and without AI assistance |
| MST-1424 Excel Financial Modelling Basics | duplicate-of | MST-0638 | thin split: 'Excel Financial Modelling Basics' is the opening module of the Excel financial modelling course |
| MST-1828 Business Communication | duplicate-of | MST-1069 | v1 'Business Communication' duplicates Appendix A business communication and professional writing |

## v1 rows merged or retired (not carried as separate courses)

| v1 ID | v1 title | Action | Into | Reason |
|---|---|---|---|---|
| MST-AI-SK-SLR-001 | Supervised Learning: Regression | merged-duplicate | MST-0436 | scope already covered by Appendix A row |
| MST-AI-SK-ODS-001 | Object Detection and Segmentation | merged-duplicate | MST-0445 | thin split: object detection/segmentation is inside the computer-vision course |
| MST-AI-SK-MCAD-001 | Model Cards and AI Documentation | merged-duplicate | MST-0470 | thin split: model documentation is inside responsible-AI governance |
| MST-MIC-MS-PL200-001 | Microsoft Power Platform Functional Consultant (PL-200) Exam Prep | retired-excluded | - | retired 2026-08-31 per official Microsoft retirement page (SRC-MS-RETIRE-OFFICIAL) |
| MST-MIC-MS-PL600-001 | Microsoft Power Platform Solution Architect (PL-600) Exam Prep | retired-excluded | - | retired 2026-06-30 per official Microsoft retirement page |
| MST-MIC-MS-MB240-001 | Dynamics 365 Field Service Functional Consultant (MB-240) Exam Prep | retired-excluded | - | retired 2026-06-30 per official Microsoft retirement page |
| MST-MIC-MS-MB280-001 | Dynamics 365 Customer Experience Analyst (MB-280) Exam Prep | retired-excluded | - | retired 2026-07-31 per official Microsoft retirement page |
| MST-MIC-MS-MB335-001 | Dynamics 365 Supply Chain Management Functional Consultant Expert (MB-335) Exam Prep | retired-excluded | - | retired 2026-06-30 per official Microsoft retirement page |
| MST-MIC-MS-MB700-001 | Dynamics 365 Finance and Operations Apps Solution Architect (MB-700) Exam Prep | retired-excluded | - | retired 2026-06-30 per official Microsoft retirement page |
| MST-GCP-GADS-GADSSEARCH-001 | Google Ads Search Certification Prep | merged-duplicate | MST-1108 | duplicate scope: free Skillshop badge prep folded into the Google Ads search skills course |
| MST-GCP-GADS-GADSDISPLAY-001 | Google Ads Display Certification Prep | merged-duplicate | MST-1109 | duplicate scope: folded into Google Ads shopping/display/video course |
| MST-GCP-GADS-GADSVIDEO-001 | Google Ads Video Certification Prep | merged-duplicate | MST-1109 | duplicate scope: folded into Google Ads shopping/display/video course |
| MST-GCP-GADS-GA4CERT-001 | Google Analytics Certification Prep | merged-duplicate | MST-1106 | duplicate scope: folded into GA4 measurement course |
| MST-PRG-ORA-1Z0829-001 | Oracle Certified Professional: Java SE 17 Developer (1Z0-829) Exam Prep | merged-duplicate | MST-1240 | version-variant: Java SE 17 (1Z0-829) and Java SE 21 (1Z0-830) are versions of one Oracle Java SE Developer Professional course |
| MST-PRG-SK-IP-001 | Intermediate Python | merged-duplicate | MST-0901 | thin split: beginner/intermediate Python levels are one complete-foundations course |
| MST-PRG-SK-AR-001 | Advanced React | merged-duplicate | MST-0869 | scope already covered by Appendix A row |
| MST-DAT-SK-DCL-001 | Data Catalogs and Lineage | merged-duplicate | MST-0966 | scope already covered by Appendix A row |
| MST-DAT-SK-PBA-001 | Power BI for Analysts | merged-duplicate | MST-0707 | duplicate: second Power BI introductory course |
| MST-CYB-SK-ZTA-001 | Zero Trust Architecture | merged-duplicate | MST-1012 | duplicate: zero trust is inside IAM and Zero Trust course |
| MST-PMB-ITIL-ITIL4F-001 | ITIL 4 Foundation Exam Prep | merged-duplicate | MST-1221 | version-variant: ITIL 4 Foundation is the prior version of ITIL (Version 5) Foundation; annual/version variants are not new courses |
| MST-ENG-CIPS-L4-001 | CIPS Level 4 Diploma in Procurement and Supply Knowledge Prep | merged-duplicate | MST-1261 | superseded by module split: Appendix A splits the CIPS L4 Diploma into L4M1-L4M8 (MST-1261..1268) |
| MST-ENG-SK-DPF-001 | Demand Planning and Forecasting | merged-duplicate | MST-1164 | scope already covered by Appendix A row |

## Exam rows needing exact exam/version resolution (318)

Generic titles ('Certification-Track', 'Certification Preparation', 'Current-Version', 'Retirement-Aware', beta or transition tracks) and unverified rows without an issuer exam code. They stay in the backlog but cannot pass Source verification until the exact exam and edition are recorded.

`MST-0043`, `MST-0044`, `MST-0045`, `MST-0046`, `MST-0047`, `MST-0048`, `MST-0049`, `MST-0050`, `MST-0058`, `MST-0059`, `MST-0061`, `MST-0062`, `MST-0063`, `MST-0064`, `MST-0065`, `MST-0066`, `MST-0067`, `MST-0068`, `MST-0069`, `MST-0070`, `MST-0071`, `MST-0072`, `MST-0073`, `MST-0074`, `MST-0075`, `MST-0076`, `MST-0077`, `MST-0078`, `MST-0079`, `MST-0080`, `MST-0081`, `MST-0082`, `MST-0083`, `MST-0084`, `MST-0085`, `MST-0086`, `MST-0087`, `MST-0088`, `MST-0089`, `MST-0090`, `MST-0099`, `MST-0100`, `MST-0101`, `MST-0102`, `MST-0103`, `MST-0104`, `MST-0105`, `MST-0106`, `MST-0107`, `MST-0108`, `MST-0109`, `MST-0111`, `MST-0112`, `MST-0113`, `MST-0114`, `MST-0115`, `MST-0116`, `MST-0117`, `MST-0118`, `MST-0119`, `MST-0120`, `MST-0121`, `MST-0129`, `MST-0130`, `MST-0136`, `MST-0141`, `MST-0142`, `MST-0143`, `MST-0144`, `MST-0145`, `MST-0149`, `MST-0150`, `MST-0151`, `MST-0155`, `MST-0156`, `MST-0157`, `MST-0158`, `MST-0159`, `MST-0160`, `MST-0193`, `MST-0194`, `MST-0196`, `MST-0197`, `MST-0198`, `MST-0199`, `MST-0205`, `MST-0210`, `MST-0211`, `MST-0212`, `MST-0214`, `MST-0216`, `MST-0217`, `MST-0221`, `MST-0225`, `MST-0226`, `MST-0227`, `MST-0228`, `MST-0229`, `MST-0230`, `MST-0231`, `MST-0232`, `MST-0234`, `MST-0235`, `MST-0236`, `MST-0237`, `MST-0238`, `MST-0239`, `MST-0240`, `MST-0254`, `MST-0257`, `MST-0258`, `MST-0263`, `MST-0264`, `MST-0265`, `MST-0266`, `MST-0267`, `MST-0271`, `MST-0272`, `MST-0273`, `MST-0274`, `MST-0275`, `MST-0276`, `MST-0277`, `MST-0278`, `MST-0279`, `MST-0280`, `MST-0281`, `MST-0282`, `MST-0284`, `MST-0285`, `MST-0286`, `MST-0287`, `MST-0288`, `MST-0290`, `MST-0296`, `MST-0297`, `MST-0298`, `MST-0299`, `MST-0300`, `MST-0301`, `MST-0302`, `MST-0306`, `MST-0308`, `MST-0309`, `MST-0310`, `MST-0319`, `MST-0320`, `MST-0321`, `MST-0322`, `MST-0323`, `MST-0324`, `MST-0325`, `MST-0326`, `MST-0327`, `MST-0328`, `MST-0329`, `MST-0330`, `MST-0331`, `MST-0332`, `MST-0333`, `MST-0334`, `MST-0335`, `MST-0336`, `MST-0337`, `MST-0338`, `MST-0339`, `MST-0340`, `MST-0346`, `MST-0350`, `MST-0352`, `MST-0355`, `MST-0357`, `MST-0358`, `MST-0359`, `MST-0360`, `MST-0362`, `MST-0363`, `MST-0364`, `MST-0365`, `MST-0366`, `MST-0367`, `MST-0368`, `MST-0369`, `MST-0370`, `MST-0378`, `MST-0379`, `MST-0380`, `MST-0381`, `MST-0382`, `MST-0383`, `MST-0384`, `MST-0385`, `MST-0386`, `MST-0387`, `MST-0388`, `MST-0389`, `MST-0390`, `MST-0407`, `MST-0408`, `MST-0409`, `MST-0410`, `MST-0411`, `MST-0412`, `MST-0413`, `MST-0414`, `MST-0415`, `MST-0416`, `MST-0417`, `MST-0418`, `MST-0419`, `MST-0420`, `MST-0421`, `MST-0422`, `MST-0423`, `MST-0424`, `MST-0425`, `MST-0426`, `MST-0428`, `MST-1129`, `MST-1130`, `MST-1131`, `MST-1132`, `MST-1133`, `MST-1153`, `MST-1221`, `MST-1222`, `MST-1223`, `MST-1224`, `MST-1225`, `MST-1226`, `MST-1227`, `MST-1231`, `MST-1232`, `MST-1233`, `MST-1234`, `MST-1235`, `MST-1236`, `MST-1237`, `MST-1238`, `MST-1239`, `MST-1240`, `MST-1241`, `MST-1242`, `MST-1243`, `MST-1244`, `MST-1245`, `MST-1246`, `MST-1247`, `MST-1248`, `MST-1249`, `MST-1250`, `MST-1251`, `MST-1252`, `MST-1253`, `MST-1254`, `MST-1257`, `MST-1259`, `MST-1260`, `MST-1261`, `MST-1262`, `MST-1263`, `MST-1264`, `MST-1265`, `MST-1266`, `MST-1267`, `MST-1268`, `MST-1269`, `MST-1270`, `MST-1271`, `MST-1272`, `MST-1273`, `MST-1274`, `MST-1275`, `MST-1276`, `MST-1277`, `MST-1278`, `MST-1279`, `MST-1280`, `MST-1281`, `MST-1282`, `MST-1283`, `MST-1284`, `MST-1287`, `MST-1288`, `MST-1289`, `MST-1290`, `MST-1291`, `MST-1292`, `MST-1293`, `MST-1295`, `MST-1296`, `MST-1297`, `MST-1298`, `MST-1299`, `MST-1300`, `MST-1303`, `MST-1518`, `MST-1519`, `MST-1601`, `MST-1602`, `MST-1603`, `MST-1604`, `MST-1646`, `MST-1647`, `MST-1648`, `MST-1650`, `MST-1741`, `MST-1811`, `MST-1812`, `MST-1813`, `MST-1814`, `MST-1815`, `MST-1816`, `MST-1817`, `MST-1818`, `MST-1819`, `MST-1820`, `MST-1863`

## Automatically flagged v1 additions

### overlap-review (11)

`MST-1324` Convolutional Neural Networks (near MST-0443); `MST-1339` Building AI Agents (near MST-0576); `MST-1418` Dynamics 365 Sales Functional Consultant (MB-210) Exam Prep (near MST-0185); `MST-1518` Salesforce Certified Platform Developer I Exam Prep (near MST-0239); `MST-1574` Technical Documentation for Developers (near MST-0604); `MST-1582` Infrastructure as Code Patterns (near MST-0988); `MST-1745` Hybrid Project Management (near MST-1141); `MST-1748` Project Cost Management (near MST-1141); `MST-1759` Project Communication Management (near MST-1141); `MST-1806` Construction Project Management (near MST-1141); `MST-1812` Salesforce Certified Platform App Builder Exam Prep (near MST-0239)

### thin-scope-review (96)

`MST-1304` What Is Artificial Intelligence? A Non-Technical Introduction; `MST-1305` AI for Everyone: Concepts, Capabilities and Limits; `MST-1306` History and Milestones of AI; `MST-1307` Mathematics for AI: Probability and Statistics; `MST-1308` Mathematics for AI: Calculus and Optimisation; `MST-1309` Data Literacy for AI; `MST-1310` AI Terminology and Glossary Mastery; `MST-1311` AI in Society: Risks, Benefits and Myths; `MST-1312` Choosing AI Tools for Work; `MST-1374` AI for Marketing; `MST-1375` AI for Finance Professionals; `MST-1376` AI for HR and Recruiting; `MST-1377` AI for Educators; `MST-1378` AI for Product Managers; `MST-1379` AI for Software Testers; `MST-1380` AI for Data Analysts; `MST-1381` AI Productivity for Office Workers; `MST-1382` AI for Content Creators; `MST-1383` AI for Researchers and Academic Writing; `MST-1384` AI Strategy for Executives; `MST-1385` AI Business Case and ROI; `MST-1386` AI for Cybersecurity Defenders; `MST-1387` AI in Retail and E-commerce; `MST-1388` AI in Banking and Insurance; `MST-1389` AI in Logistics; `MST-1390` AI for Students: Study Smarter; `MST-1391` Automation with AI and No-Code Tools; `MST-1392` AI for Spreadsheet Power Users; `MST-1393` AI for Presentations and Documents; `MST-1394` AI Literacy for Managers; `MST-1395` AI Use Policy Writing for Organisations; `MST-1396` Evaluating AI Vendors; `MST-1397` Conversational AI Design; `MST-1398` AI for Journalists and Fact-Checking; `MST-1399` AI in Energy and Utilities; `MST-1400` AI in Telecommunications; `MST-1401` AI for Game Development; `MST-1402` AI and the Future of Work; `MST-1403` AI for Nurses and Allied Health; `MST-1404` AI for Pharmacists; `MST-1405` AI for Engineers (CAE and Design); `MST-1406` AI for Translators and Localisation; `MST-1407` AI for Architects and Construction; `MST-1408` AI in Media and Entertainment; `MST-1409` AI for Startups; `MST-1410` AI in Insurance Underwriting; `MST-1411` AI-Assisted Data Visualisation; `MST-1412` AI for Fraud Detection Teams; `MST-1425` DAX Fundamentals; `MST-1426` Power Automate Cloud Flows Basics; `MST-1427` Outlook Productivity; `MST-1428` Microsoft Entra ID Essentials; `MST-1429` Microsoft Intune Essentials; `MST-1430` PowerShell for Microsoft 365 Administration; `MST-1431` Azure CLI and Bicep Essentials; `MST-1432` Azure Networking Essentials; `MST-1433` Windows 11 for IT Support; `MST-1434` Windows Server Administration Basics; `MST-1435` Microsoft Defender XDR Essentials; `MST-1436` Azure Landing Zones and Well-Architected Framework; `MST-1437` Azure Monitor and Log Analytics with KQL; `MST-1438` KQL (Kusto Query Language) Fundamentals; `MST-1439` Access Database Fundamentals; `MST-1440` Visio for Process Diagrams; `MST-1441` OneNote and Loop for Knowledge Work; `MST-1442` Microsoft Forms and Lists; `MST-1443` Dataverse Fundamentals; `MST-1444` Azure DevOps Boards and Repos; `MST-1446` Microsoft Viva Overview; `MST-1447` Exchange Online Administration Basics; `MST-1448` Azure Storage Deep Dive; `MST-1449` Azure SQL Database Essentials; `MST-1450` Azure Virtual Machines Deep Dive; `MST-1451` Hybrid Identity with Entra Connect; `MST-1741` Lean Six Sigma White Belt; `MST-1821` Business Fundamentals; `MST-1822` Entrepreneurship and Startups; `MST-1823` Business Strategy; `MST-1824` Marketing Fundamentals; `MST-1825` Sales Fundamentals; `MST-1826` Negotiation Skills; `MST-1827` Leadership Fundamentals; `MST-1829` Presentation Skills; `MST-1830` Business Law Fundamentals; `MST-1831` Economics Fundamentals; `MST-1832` International Business; `MST-1833` E-commerce Fundamentals; `MST-1834` CRM Fundamentals; `MST-1835` ERP Fundamentals; `MST-1836` Human Resources Fundamentals; `MST-1837` Diversity, Equity and Inclusion at Work; `MST-1838` Corporate Governance Fundamentals; `MST-1839` Customer Service Excellence; `MST-1840` Brand Management; `MST-1841` Pricing Strategy; `MST-1842` Operations Strategy

### needs-version-check (4)

`MST-1737` ITIL 4 Specialist: Create, Deliver and Support Exam Prep; `MST-1738` ITIL 4 Specialist: Drive Stakeholder Value Exam Prep; `MST-1739` ITIL 4 Specialist: High-velocity IT Exam Prep; `MST-1740` ITIL 4 Strategist: Direct, Plan and Improve Exam Prep
