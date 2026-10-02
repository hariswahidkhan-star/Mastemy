"""Source register for the Mastemy catalogue.

Every row records exactly HOW it was checked in the 2026-10-02 session.
- method "official-fetch": the official page itself was retrieved and read
  (Microsoft Learn MCP server, which returns learn.microsoft.com content).
- method "search-snippet": only a web-search summary was available; the
  official page was blocked by the session egress proxy, so the fact is
  treated as NOT verified and the course stays `unverified-needs-official-check`.
"""

SESSION_DATE = "2026-10-02"

# (source_id, family, url, publisher, source_type, method, accessed_on, finding)
SOURCES = [
    ("SRC-MS-AZ900", "Microsoft", "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900",
     "Microsoft", "official", "official-fetch", SESSION_DATE,
     "AZ-900 skills measured as of 2026-07-20: cloud concepts 25-30%; architecture & services 35-40%; management & governance 30-35%. Pass 700."),
    ("SRC-MS-AI900", "Microsoft", "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-900",
     "Microsoft", "official", "official-fetch", SESSION_DATE,
     "Study guide banner: AI-900 RETIRED 2026-06-30. Excluded from catalogue; superseded by AI-901."),
    ("SRC-MS-AI901", "Microsoft", "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901",
     "Microsoft", "official", "official-fetch", SESSION_DATE,
     "AI-901 skills measured as of 2026-04-15: Identify AI concepts and capabilities 40-45%; Implement AI solutions by using Microsoft Foundry 55-60%."),
    ("SRC-MS-SC900", "Microsoft", "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-900",
     "Microsoft", "official", "official-fetch", SESSION_DATE,
     "SC-900 skills measured as of 2026-10-21 (published ahead of effective date): concepts 10-15%; Entra 25-30%; security 35-40%; compliance 20-25%."),
    ("SRC-MS-AZ104", "Microsoft", "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104",
     "Microsoft", "official", "official-fetch", SESSION_DATE,
     "AZ-104 skills measured as of 2026-04-17: identities/governance 20-25%; storage 15-20%; compute 20-25%; networking 15-20%; monitor/maintain 10-15%."),
    ("SRC-MS-DP900", "Microsoft", "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-900",
     "Microsoft", "official", "official-fetch", SESSION_DATE,
     "DP-900 skills measured as of 2026-07-21: core data 25-30%; relational 20-25%; non-relational 15-20%; analytics 25-30%."),
    ("SRC-MS-PL900", "Microsoft", "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-900",
     "Microsoft", "official", "official-fetch", SESSION_DATE,
     "PL-900 skills measured as of 2026-07-24: business value 5-10%; environment 20-25%; Power Apps 20-25%; Power Automate 20-25%; Copilot Studio agents 20-25%."),
    ("SRC-MS-RETIRE-2026", "Microsoft", "https://www.certcrush.app/blog/microsoft-certifications-retiring-2026-full-list",
     "third party", "secondary", "search-snippet", SESSION_DATE,
     "Reports retirements in 2026 of MS-900 (->AB-900), AI-102 (->AI-103), AZ-204 (->AI-200), DP-100 (->AI-300), AZ-500, AZ-800/801. Official retirement pages not reachable; NOT verified."),
    ("SRC-AWS-CLF", "AWS", "https://docs.aws.amazon.com/pdfs/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.pdf",
     "AWS", "official (not retrieved)", "search-snippet", SESSION_DATE,
     "Snippet: CLF-C02 domains 24/30/34/12; 65 questions; 90 min. docs.aws.amazon.com blocked by egress proxy; NOT verified."),
    ("SRC-AWS-SAA", "AWS", "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
     "AWS", "official (not retrieved)", "search-snippet", SESSION_DATE,
     "Search results CONFLICT on whether SAA-C03 has been replaced by an 'SAA-C04'. Exam code kept as SAA-C03 with exam_status=unknown; must be checked."),
    ("SRC-COMPTIA-SECPLUS", "CompTIA", "https://www.comptia.org/en-us/certifications/security/",
     "CompTIA", "official (not retrieved)", "search-snippet", SESSION_DATE,
     "Snippets: SY0-701 domains 12/22/18/28/20; English retirement reported 2027-06-11; SY0-801 in draft. comptia.org blocked; NOT verified."),
    ("SRC-PMI-PMP-2026", "PMI", "https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf",
     "PMI", "official (not retrieved)", "search-snippet", SESSION_DATE,
     "Snippets: new PMP ECO effective 2026-07-09: People 33%, Process 41%, Business Environment 26%; 26 tasks. pmi.org blocked; NOT verified."),
    ("SRC-GCP-CDL", "Google Cloud", "https://services.google.com/fh/files/misc/cloud_digital_leader_exam_guide_english.pdf",
     "Google Cloud", "official (not retrieved)", "search-snippet", SESSION_DATE,
     "Snippet: six sections ~17-18% each; 50-60 questions; 90 min. services.google.com blocked; NOT verified."),
    ("SRC-CFA-L1", "CFA Institute", "https://www.cfainstitute.org/programs/cfa-program/exam",
     "CFA Institute", "official (not retrieved)", "search-snippet", SESSION_DATE,
     "Snippets (third-party): 10 topic areas with ranges (Ethics 15-20%, Quant 6-9%, Econ 6-9%, FSA 11-14%, Corp 6-9%, Equity 11-14%, FI 11-14%, Deriv 5-8%, Alts 7-10%, PM 8-12%). NOT verified."),
    ("SRC-AICPA-CPA", "AICPA", "https://www.aicpa-cima.com/resources/download/learn-what-is-tested-on-the-cpa-exam",
     "AICPA & CIMA", "official (not retrieved)", "search-snippet", SESSION_DATE,
     "Snippets: Core AUD/FAR/REG + one Discipline BAR/ISC/TCP, 4 hours each; no structural changes for 2026. NOT verified."),
    ("SRC-ACCA-FR", "ACCA", "https://www.accaglobal.com/content/dam/acca/global/PDF-students/acca/f7/studyguides/fr_s26_j27_syllabus_and_study_guide.pdf",
     "ACCA", "official (not retrieved)", "search-snippet", SESSION_DATE,
     "Snippets: FR syllabus areas A-E (framework; transactions; interpret; prepare single & group FS; employability/tech). accaglobal.com blocked; NOT verified."),
    ("SRC-IELTS", "IELTS", "https://www.cambridgeenglish.org/exams-and-tests/ielts/test-format/",
     "Cambridge English", "official (not retrieved)", "search-snippet", SESSION_DATE,
     "Snippets: L 30 min/40 q, R 60 min/40 q, W 60 min/2 tasks, S 11-14 min; total ~2h45. NOT verified. Writing/Speaking are not MCQ-assessable."),
    ("SRC-EGRESS", "Session", "n/a", "Mastemy", "process note", "n/a", SESSION_DATE,
     "WebFetch to docs.aws.amazon.com, comptia.org, accaglobal.com, pmi.org, services.google.com, techcommunity.microsoft.com and learn.microsoft.com (WebFetch) returned EGRESS_BLOCKED. Only the Microsoft Learn MCP returned official pages."),
]

# Families whose syllabus was read from an official page this session.
OFFICIALLY_VERIFIED_CODES = {
    "AZ-900": "SRC-MS-AZ900",
    "AI-901": "SRC-MS-AI901",
    "SC-900": "SRC-MS-SC900",
    "AZ-104": "SRC-MS-AZ104",
    "DP-900": "SRC-MS-DP900",
    "PL-900": "SRC-MS-PL900",
}

# Codes with only secondary evidence this session (status stays unverified).
SECONDARY_CODES = {
    "CLF-C02": "SRC-AWS-CLF",
    "SAA-C03": "SRC-AWS-SAA",
    "SY0-701": "SRC-COMPTIA-SECPLUS",
    "PMP": "SRC-PMI-PMP-2026",
    "CDL": "SRC-GCP-CDL",
    "CFA-L1": "SRC-CFA-L1",
    "CFA-L2": "SRC-CFA-L1",
    "CFA-L3": "SRC-CFA-L1",
    "AUD": "SRC-AICPA-CPA", "FAR": "SRC-AICPA-CPA", "REG": "SRC-AICPA-CPA",
    "BAR": "SRC-AICPA-CPA", "ISC": "SRC-AICPA-CPA", "TCP": "SRC-AICPA-CPA",
    "FR": "SRC-ACCA-FR",
    "IELTS-AC": "SRC-IELTS", "IELTS-GT": "SRC-IELTS",
    "AB-900": "SRC-MS-RETIRE-2026", "AI-103": "SRC-MS-RETIRE-2026",
    "AI-200": "SRC-MS-RETIRE-2026", "AI-300": "SRC-MS-RETIRE-2026",
}

# Retired / reported-retiring exams deliberately NOT given courses.
RETIRED_EXCLUDED = [
    ("AI-900", "Microsoft", "retired 2026-06-30 (official study guide banner)", "SRC-MS-AI900", "AI-901"),
    ("MS-900", "Microsoft", "reported retired 2026-03-31 (secondary)", "SRC-MS-RETIRE-2026", "AB-900"),
    ("AI-102", "Microsoft", "reported retired 2026-06-30 (secondary)", "SRC-MS-RETIRE-2026", "AI-103"),
    ("AZ-204", "Microsoft", "reported retired 2026-07-31 (secondary)", "SRC-MS-RETIRE-2026", "AI-200"),
    ("DP-100", "Microsoft", "reported retired 2026-06-01 (secondary)", "SRC-MS-RETIRE-2026", "AI-300"),
    ("AZ-500", "Microsoft", "reported retiring in 2026 (secondary)", "SRC-MS-RETIRE-2026", "unknown"),
    ("AZ-800", "Microsoft", "reported retiring in 2026 (secondary)", "SRC-MS-RETIRE-2026", "unknown"),
    ("AZ-801", "Microsoft", "reported retiring in 2026 (secondary)", "SRC-MS-RETIRE-2026", "unknown"),
]
