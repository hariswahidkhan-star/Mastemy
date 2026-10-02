"""Master catalogue v2: Appendix A (MST-0001..MST-1300) is the authoritative
backlog; the v1 inventory (1,076 rows) is reconciled into it through an explicit
crosswalk. Emits everything under docs/catalogue/ (see README "File layout").

Called from build_catalogue.py after the v1 rows are rebuilt in memory.
"""
import collections
import csv
import json
import os
import re

from reconcile import crosswalk, Sim, toks, BRANDS, CERT_CATEGORIES
from data_sources import SOURCES, RETIRED_EXCLUDED, RETIRING, SESSION_DATE, OFFICIALLY_VERIFIED_CODES, SECONDARY_CODES
from data_curricula import CURRICULA
from data_packages import B1_EXTRAS, BATCH2, BATCH2_ORDER, OFFICIAL, PARTIAL, NOSYL
from data_catalogue import BATCH1, PATHWAYS

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
OUT = os.path.join(ROOT, "docs", "catalogue")
INP = os.path.join(HERE, "input")
VERSION = "0.1.0"
FIRST_ADDITION = 1301

FIELDS = [
    # A. identity
    "course_id", "course_version", "working_title", "publication_title", "origin", "category_no", "category_name",
    "course_class", "level", "learner_persona", "target_role", "prerequisites", "language", "jurisdiction",
    "tool_licences", "issuer", "official_exam_code", "exam_version", "exam_status", "exam_resolution_required",
    "scope_boundary", "credential_disclaimer_id",
    # duration (80/20)
    "planned_hours", "planned_total_minutes", "instruction_minutes", "assessment_minutes",
    "lesson_check_minutes", "module_assessment_minutes", "cumulative_assessment_minutes", "duration_basis",
    # assessment
    "question_formats", "multiple_answer_scoring", "practice_forms_planned", "mcq_limitation_note",
    # certificate
    "certificate_type", "certificate_wording", "completion_rule_id",
    # evidence + workflow
    "verification_status", "verified_on", "source_ids", "workflow_state", "curriculum_depth", "priority_batch",
    "pkg_a_identity", "pkg_b_coverage", "pkg_c_lessons", "pkg_d_materials", "pkg_e_assessment",
    "pkg_f_operations", "pkg_g_publication", "pkg_h_qa",
    # dedup + reconciliation
    "dedup_status", "dedup_partner", "counted_distinct_inclusive", "counted_distinct_strict",
    "legacy_course_ids", "merged_legacy_ids", "pathway_ids",
    # platform governance
    "youtube_playlist_id", "caption_langs", "instructor_owner", "approval_status",
]

LEGACY_CAT_TO_NEW = {"AI": "11", "LNG": "10"}

ISSUERS = [
    ("ACCA", "ACCA"), ("US CPA", "AICPA & CIMA / NASBA (US CPA Exam)"), ("US CMA", "IMA"), ("CIMA", "CIMA (AICPA & CIMA)"),
    ("US Enrolled Agent", "IRS"), ("CFA", "CFA Institute"), ("CAIA", "CAIA Association"), ("FRM", "GARP"),
    ("CIPM", "CFA Institute"), ("CFP", "CFP Board"), ("AFP", "AFP"), ("FINRA", "FINRA"), ("NASAA", "NASAA"),
    ("NFA", "NFA"), ("SOA", "SOA"), ("CAS", "CAS"), ("GARP", "GARP"), ("CIA", "The IIA"), ("IIA", "The IIA"),
    ("ISACA", "ISACA"), ("ACFE", "ACFE"), ("ACAMS", "ACAMS"), ("IAPP", "IAPP"), ("SCCE", "SCCE"), ("HCCA", "HCCA"),
    ("OCEG", "OCEG"), ("DRI", "DRI International"), ("BCI", "BCI"), ("PMI", "PMI"), ("PeopleCert", "PeopleCert"),
    ("Scrum.org", "Scrum.org"), ("Scrum Alliance", "Scrum Alliance"), ("SAFe", "Scaled Agile"), ("IIBA", "IIBA"),
    ("AACE", "AACE International"), ("Microsoft", "Microsoft"), ("GitHub", "GitHub (Microsoft)"), ("AWS", "AWS"),
    ("Google Cloud", "Google Cloud"), ("Databricks", "Databricks"), ("Snowflake", "Snowflake"), ("Tableau", "Tableau"),
    ("Salesforce", "Salesforce"), ("ISC2", "ISC2"), ("CompTIA", "CompTIA"), ("Cisco", "Cisco"),
    ("Juniper", "Juniper Networks"), ("Red Hat", "Red Hat"), ("Linux Foundation", "Linux Foundation"), ("LPI", "LPI"),
    ("HashiCorp", "HashiCorp"), ("GIAC", "GIAC"), ("EC-Council", "EC-Council"), ("OffSec", "OffSec"),
    ("SHRM", "SHRM"), ("HRCI", "HRCI"), ("ATD", "ATD"), ("PayrollOrg", "PayrollOrg"), ("ASCM", "ASCM"), ("ISM", "ISM"),
    ("ASQ", "ASQ"), ("BCSP", "BCSP"), ("BGC", "BGC"), ("NEBOSH", "NEBOSH"), ("IOSH", "IOSH"), ("IFMA", "IFMA"),
    ("NCLEX-RN", "NCSBN"), ("NCLEX-PN", "NCSBN"), ("USMLE", "USMLE (FSMB/NBME)"), ("NBME", "NBME"), ("NCCPA", "NCCPA"),
    ("NAPLEX", "NABP"), ("PTCB", "PTCB"), ("AMT", "AMT"), ("AAMA", "AAMA"), ("AHIMA", "AHIMA"), ("AAPC", "AAPC"),
    ("NAHQ", "NAHQ"), ("NREMT", "NREMT"), ("FSBPT", "FSBPT"), ("NBCOT", "NBCOT"), ("ARRT", "ARRT"),
    ("ARDMS", "ARDMS"), ("ASCP", "ASCP BOC"), ("CDR", "CDR"), ("NCEES", "NCEES"), ("Praxis", "ETS"),
    ("IELTS", "IELTS partners"), ("TOEFL", "ETS"), ("PTE", "Pearson"), ("OET", "OET"), ("Duolingo", "Duolingo"),
    ("Cambridge", "Cambridge English"), ("TOEIC", "ETS"), ("CELPIP", "Paragon Testing"), ("SAT", "College Board"),
    ("ACT", "ACT"), ("GRE", "ETS"), ("GMAT", "GMAC"), ("LSAT", "LSAC"), ("MCAT", "AAMC"), ("GED", "GED Testing Service"),
    ("AP", "College Board"), ("Goethe-Zertifikat", "Goethe-Institut"), ("DELF", "France Education international"),
    ("DELE", "Instituto Cervantes"), ("JLPT", "JLPT administrators"), ("TOPIK", "NIIED"), ("ITIL", "PeopleCert"),
    ("ServiceNow", "ServiceNow"), ("Oracle", "Oracle"), ("SAP", "SAP"), ("ISTQB", "ISTQB"), ("TOGAF", "The Open Group"),
    ("CIPS", "CIPS"), ("NCARB", "NCARB"), ("US Multistate", "NCBE"), ("Uniform Bar", "NCBE"), ("NextGen Bar", "NCBE"),
    ("NASM", "NASM"), ("ACE", "ACE"), ("ACSM", "ACSM"), ("NSCA", "NSCA"), ("CBIC", "CBIC"), ("ANCC", "ANCC"),
    ("AANPCB", "AANPCB"), ("AACN", "AACN"), ("ONCC", "ONCC"), ("CCI", "CCI"), ("ASIS", "ASIS"), ("BICSI", "BICSI"),
    ("GBCI", "GBCI"), ("WELL", "IWBI"), ("NCMA", "NCMA"),
]
LICENSING_ISSUERS = {"NCSBN", "USMLE (FSMB/NBME)", "NBME", "NCCPA", "NABP", "NCEES", "NCBE", "FINRA", "NASAA", "NFA", "IRS",
                     "AICPA & CIMA / NASBA (US CPA Exam)", "FSBPT", "NBCOT", "ARRT", "NREMT", "NCARB", "PTCB", "CDR"}
US_ISSUERS = LICENSING_ISSUERS | {"IMA", "CFP Board", "SHRM", "HRCI", "AAPC", "AHIMA", "AAMA", "AMT", "NAHQ", "ARDMS",
                                  "ASCP BOC", "College Board", "ACT", "LSAC", "AAMC", "GED Testing Service", "ANCC",
                                  "AANPCB", "AACN", "ONCC", "CCI", "CBIC", "BCSP", "BGC", "NCMA", "SOA", "CAS"}
VENDOR_WORDS = set(("microsoft excel word powerpoint outlook teams onenote loop planner sharepoint onedrive copilot azure "
                    "fabric power dynamics entra sentinel defender purview foundry chatgpt openai codex claude anthropic "
                    "cursor github google gemini gmail notebooklm bigquery looker appsheet aws amazon sagemaker bedrock "
                    "salesforce hubspot tableau qlik alteryx snowflake databricks sap oracle mysql postgresql mongodb redis "
                    "neo4j cassandra elasticsearch clickhouse kafka airflow dbt spark pyspark docker kubernetes helm terraform "
                    "ansible jenkins gitlab langchain langgraph llamaindex haystack n8n zapier adobe figma canva davinci "
                    "revit autocad solidworks primavera shopify meta linkedin tiktok youtube jira confluence notion slack "
                    "servicenow forms lists vba").split())
EXAM_CODE_RE = re.compile(r"\b([A-Z]{2,3}-\d{3}|[A-Z]{3}-C\d{2})\b")
GENERIC_TRACK_RE = re.compile(r"Certification-Track|Certification Preparation|Current-Version|Retirement-Aware|Beta Blueprint|Transition Blueprint|Current Exam Blueprint", re.I)
MAJOR_HOURS = [  # (regex on title, hours) - design assumptions, not issuer study-hour claims
    (r"^ACCA (SBL|SBR|AFM|APM|ATX|AAA)\b", 150), (r"^ACCA (PM|TX|FR|AA|FM)\b", 120), (r"^ACCA Diploma", 100),
    (r"^ACCA (BT|MA|FA|LW)\b", 80), (r"^ACCA (FA1|MA1|FA2|MA2|FBT|FMA|FFA)\b", 50), (r"^US CPA", 150),
    (r"^US CMA", 150), (r"^CIA Part", 100), (r"^CFA Level", 300), (r"^FRM Part", 200), (r"^CAIA Level", 200),
    (r"^CIMA (BA\d)", 60), (r"^CIMA (E|P|F)\d", 100), (r"^CIMA .*Case Study", 80), (r"^US Enrolled Agent", 80),
    (r"^CIPM Level", 120), (r"^CFP ", 200), (r"^SOA Exam|^CAS Exam", 200), (r"^USMLE|^NBME", 300),
    (r"^NCLEX", 150), (r"^NCCPA|^NAPLEX", 150), (r"^NCEES (FE|PE)", 150), (r"Bar Examination|Bar Exam", 250),
    (r"^ISACA (CISA|CISM|CRISC|CGEIT)", 80), (r"^ISC2 Certified Information Systems Security Professional", 100),
    (r"^PMI PMP", 80), (r"^IELTS (Academic|General Training): Complete", 80), (r"^(TOEFL|PTE|GMAT|GRE|LSAT|MCAT|SAT|ACT)\b", 80),
    (r"^AP ", 120), (r"^NCARB ARE", 80),
]
MCQ_LIMITS = [
    (r"IELTS|TOEFL|PTE|OET|Duolingo|Cambridge|TOEIC|CELPIP|Goethe|DELF|DELE", "Official test assesses writing and speaking; MCQ/MR cannot assess productive skills. Mastemy teaches all four skills by video and model-answer analysis but scores only receptive and knowledge items."),
    (r"US CPA", "Official exam includes task-based simulations; Mastemy assesses the knowledge behind them with MCQ/MR only and demonstrates TBS methods by video."),
    (r"CFA Level III", "Level III includes constructed-response questions; Mastemy assesses concepts by MCQ/MR and teaches written responses through narrated model answers only."),
    (r"^ACCA|DipIFR", "Applied Skills/Strategic Professional exams include constructed-response and computer-based workspace tasks that MCQ cannot replicate."),
    (r"^CIPS", "CIPS units mix objective and constructed-response formats; written components are not assessed."),
    (r"NCLEX", "NCLEX includes alternate and next-generation clinical-judgment item formats; Mastemy uses MCQ/MR only and does not replicate clinical performance."),
    (r"RHCSA|RHCE|LFCS|CKA|CKAD|CKS|OSCP|Red Hat Certified|Certified Kubernetes", "Official exam is performance-based (hands-on); Mastemy offers knowledge preparation and video demonstrations only."),
    (r"Case Study", "Case-study exams require written analysis; MCQ/MR assesses knowledge and case reasoning only."),
    (r"Bar Exam|Writing", "Written components are not assessed by MCQ/MR; model-answer analysis is shown by video only."),
]
DEFAULT_LIMIT = {
    "skills-code": "Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.",
    "skills": "Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.",
    "exam": "Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.",
}
CODE_WORDS = set("programming python java javascript typescript csharp dotnet react angular vue node rust go kotlin swift php ruby sql api code developer development".split())


def read_csv(p):
    with open(p, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def write_csv(p, fields, rows):
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields, extrasaction="ignore")
        w.writeheader()
        w.writerows(rows)


def issuer_of(title):
    for pre, name in ISSUERS:
        if re.match(re.escape(pre) + r"(\b|:)", title):
            return name
    return ""


def legacy_new_category(l):
    cat, fam, t = l["category"], l["_key"].split(":")[1] if l["course_type"] == "certification-prep" else "SK", l["title"].lower()
    cert = l["course_type"] == "certification-prep"
    if cat in LEGACY_CAT_TO_NEW:
        return LEGACY_CAT_TO_NEW[cat]
    if cat == "MIC":
        if cert:
            return "05"
        return "17" if re.search(r"azure|power|dynamics|fabric|sentinel|purview|entra|bicep|defender", t) else "16"
    if cat == "GCP":
        return "06" if cert and fam == "GCP" else ("28" if fam == "GADS" else "18")
    if cat == "AWS":
        return "06" if cert else "19"
    if cat == "PRG":
        if cert:
            return "31" if fam in ("ORA", "SF", "PYI") else "07"
        if re.search(r"javascript|typescript|react|html|css|web|node|next|angular|vue|svelte|mobile|flutter", t):
            return "22"
        if re.search(r"devops|docker|kubernetes|ci/cd|git|terraform|testing|security|architecture|sre|observab|platform|infrastructure", t):
            return "25"
        return "23"
    if cat == "DAT":
        return "06" if cert else "24"
    if cat == "CYB":
        if cert:
            return "03" if fam == "ISACA" else ("31" if fam == "SNOW" else "07")
        return "25"
    if cat == "FIN":
        return ("01" if fam in ("ACCA", "CPA", "CMA", "CIMA", "EA") else "02") if cert else "26"
    if cat == "PMB":
        if cert:
            return "31" if fam == "ITIL" else ("08" if fam == "LSS" else "04")
        return "29" if re.search(r"project|earned|schedul|lean|risk|cost|portfolio|programme|benefit", t) else "27"
    if cat == "HLT":
        return "09" if cert else "32"
    if cat == "ENG":
        if cert:
            return "09" if fam == "NCEES" else "08"
        return "29"
    if cat == "BUS":
        if cert:
            return "31" if fam in ("SAP", "SFDC") else ("28" if fam == "HUB" else "08")
        return "28" if re.search(r"marketing|seo|sales|brand|content|social|e-commerce|customer|pricing", t) else "27"
    if cat == "CRE":
        return "28"
    return "27"


def level_of(title, legacy_level=None):
    if legacy_level:
        return legacy_level
    t = title
    if re.search(r"\b(Advanced|Expert|Professional —|Level III|Part 2|Part II|Strategic|Senior|Master|Architect|Step 3|PE )", t):
        return "advanced"
    if re.search(r"\b(Foundations?|Fundamentals|Essentials|Literacy|Level I\b|Part 1|Part I\b|Core 1|Entry|Associate\b|BA\d|Digital Leader|Cloud Practitioner)", t):
        return "foundation"
    return "intermediate"


def hours_rule(title, cls, legacy_hours=None):
    for rx, h in MAJOR_HOURS:
        if re.search(rx, title):
            return h, "design-assumption: major professional examination scale"
    if legacy_hours:
        return legacy_hours, "carried from v1 inventory estimate (design assumption)"
    if cls in ("independent-certification-exam-prep", "licensing-examination-knowledge-prep"):
        if re.search(r"Fundamentals|Foundation|Essentials|Practitioner$|Digital Leader|Associate:|Associate$|Core 1|Core 2|Level I\b", title):
            return 30, "design-assumption: entry-level exam"
        if re.search(r"Professional|Expert|Advanced|Specialty|Senior|Master|Architect", title):
            return 60, "design-assumption: advanced exam"
        return 45, "design-assumption: mid-level exam"
    if re.search(r"Complete|: Foundations to|End-to-End", title):
        return 40, "design-assumption: complete skills course"
    if re.search(r"^Advanced|Production|Architecture", title):
        return 30, "design-assumption: advanced skills course"
    if cls == "integrated-workflow-skills":
        return 20, "design-assumption: integrated workflow course"
    return 20, "design-assumption: focused skills course"


def split_minutes(hours):
    """Documented rounding rule: T = hours*60; I = round-half-up(0.8T); A = T - I.
    Default split of A: lesson 5%T, module 7%T, cumulative = A - lesson - module."""
    T = int(round(hours * 60))
    I = int(0.8 * T + 0.5)
    A = T - I
    lesson = int(0.05 * T + 0.5)
    module = int(0.07 * T + 0.5)
    return T, I, A, lesson, module, A - lesson - module


def mcq_limit(title, cls):
    for rx, note in MCQ_LIMITS:
        if re.search(rx, title):
            return note
    if cls in ("independent-certification-exam-prep", "licensing-examination-knowledge-prep"):
        return DEFAULT_LIMIT["exam"]
    if toks(title) & CODE_WORDS:
        return DEFAULT_LIMIT["skills-code"]
    return DEFAULT_LIMIT["skills"]


def classify(title, cat_no, issuer, legacy=None):
    if legacy is not None and cat_no not in CERT_CATEGORIES:
        if legacy["course_type"] == "certification-prep":
            return "independent-certification-exam-prep"
    if cat_no in CERT_CATEGORIES and (legacy is None or legacy["course_type"] == "certification-prep"):
        if issuer in LICENSING_ISSUERS or cat_no == "10":
            return "licensing-examination-knowledge-prep"
        return "independent-certification-exam-prep"
    if cat_no == "20":
        return "integrated-workflow-skills"
    w = set(re.findall(r"[a-z0-9]+", title.lower()))
    if w & VENDOR_WORDS or ".NET" in title or "C#" in title:
        return "vendor-platform-skills"
    return "general-professional-skills"


def jurisdiction_of(title, issuer):
    if "United Kingdom" in title:
        return "United Kingdom"
    if re.search(r"International Variant|Global Variant|International", title):
        return "international"
    if re.match(r"US |United States", title) or issuer in US_ISSUERS or "-US" in title or "California" in title:
        return "United States" + (" (California)" if "California" in title else "")
    if re.search(r"Tax|Law|Legal|VAT|Payroll|Privacy|Healthcare|Safety|Compliance", title):
        return "jurisdiction-specific: set per course version"
    return "global"


def build_registry(appendix, additions):
    p = os.path.join(OUT, "catalog", "mst-id-registry.json")
    reg = json.load(open(p)) if os.path.exists(p) else {}
    for a in appendix:
        reg.setdefault("A:" + a["mst_id"], a["mst_id"])
    used = {int(v[4:]) for v in reg.values()}
    nxt = max([FIRST_ADDITION - 1] + [u for u in used if u >= FIRST_ADDITION]) + 1
    for lid in additions:
        k = "L:" + lid
        if k not in reg:
            reg[k] = f"MST-{nxt:04d}"
            nxt += 1
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, "w") as f:
        json.dump(dict(sorted(reg.items(), key=lambda kv: kv[1])), f, indent=1)
    return reg


def load_dedup_decisions():
    p = os.path.join(INP, "dedup_decisions.csv")
    return {r["mst_id"]: r for r in read_csv(p)} if os.path.exists(p) else {}


def build(legacy_rows):
    appendix = read_csv(os.path.join(INP, "appendix_a.csv"))
    cat_names = {a["category_no"]: a["category_name"] for a in appendix}
    by_lid = {l["course_id"]: l for l in legacy_rows}
    xw, _sim = crosswalk(appendix, legacy_rows)
    additions = [l["course_id"] for l in legacy_rows if xw[l["course_id"]]["action"] == "addition"]
    reg = build_registry(appendix, additions)
    for lid in additions:
        xw[lid]["mst_id"] = reg["L:" + lid]

    mapped = collections.defaultdict(list)
    merged = collections.defaultdict(list)
    for lid, v in xw.items():
        if v["action"] == "mapped":
            mapped[v["mst_id"]].append(lid)
        elif v["action"] == "merged-duplicate":
            merged[v["mst_id"]].append(lid)

    # batch membership by master id
    batch1 = {}
    for key in BATCH1:
        lid = next(l["course_id"] for l in legacy_rows if l["_key"] == key)
        if xw[lid]["action"] not in ("mapped", "addition"):
            raise SystemExit(f"Batch 1 course {lid} is not mapped or added")
        batch1[xw[lid]["mst_id"]] = key
    batch2 = {}
    for key in BATCH2_ORDER:
        if key.startswith("MST-"):
            batch2[key] = key
        else:
            lid = next(l["course_id"] for l in legacy_rows if l["_key"] == key)
            batch2[xw[lid]["mst_id"]] = key

    rows = []
    src = [(a["mst_id"], "appendix-a", a["title"], a["category_no"], None) for a in appendix]
    src += [(reg["L:" + lid], "legacy-addition", by_lid[lid]["title"], legacy_new_category(by_lid[lid]), by_lid[lid]) for lid in additions]
    retiring_codes = RETIRING
    retired_codes = {r[0] for r in RETIRED_EXCLUDED}
    b2_codes = {BATCH2[k]["code"]: k for k in BATCH2 if BATCH2[k]["code"]}
    for mid, origin, title, cat_no, leg in src:
        lids = mapped.get(mid, [])
        lrow = leg or (by_lid[lids[0]] if lids else None)
        issuer = issuer_of(title) or (lrow["awarding_body"] if lrow and lrow["course_type"] == "certification-prep" else "")
        cls = classify(title, cat_no, issuer, lrow if origin == "legacy-addition" else (lrow if lrow and lrow["course_type"] == "certification-prep" else None))
        if cls in ("independent-certification-exam-prep", "licensing-examination-knowledge-prep") and not issuer:
            issuer = (lrow or {}).get("awarding_body", "") or "unresolved"
        if cls not in ("independent-certification-exam-prep", "licensing-examination-knowledge-prep"):
            issuer = "Mastemy (no external awarding body)"
        m = EXAM_CODE_RE.search(title)
        code = (lrow["official_exam_code"] if lrow and lrow["official_exam_code"] else (m.group(1) if m else ""))
        if cls not in ("independent-certification-exam-prep", "licensing-examination-knowledge-prep"):
            code = ""
        # hours
        spec_hours = None
        if mid in batch1:
            spec_hours = int(next(l for l in legacy_rows if l["_key"] == batch1[mid])["est_learner_hours"])
        elif mid in batch2:
            spec_hours = BATCH2[batch2[mid]]["hours"]
        if spec_hours:
            hours, basis = spec_hours, "curriculum specification (design assumption, see course package)"
        else:
            hours, basis = hours_rule(title, cls, int(lrow["est_learner_hours"]) if origin == "legacy-addition" else None)
        T, I, A, lc, mc, cc = split_minutes(hours)
        # verification
        vcode_src = OFFICIALLY_VERIFIED_CODES.get(code)
        if vcode_src:
            vstat, von, sids = "verified-official-source", SESSION_DATE, vcode_src
        elif mid in batch2 and BATCH2[batch2[mid]]["evidence"] == PARTIAL:
            vstat, von, sids = "vendor-docs-partial", SESSION_DATE, BATCH2[batch2[mid]]["source"]
        elif cls in ("independent-certification-exam-prep", "licensing-examination-knowledge-prep"):
            vstat, von, sids = "unverified-needs-official-check", "", SECONDARY_CODES.get(code, "")
        else:
            vstat, von, sids = "n/a-no-official-syllabus", "", (BATCH2[batch2[mid]]["source"] if mid in batch2 else "")
        # exam status
        if cls not in ("independent-certification-exam-prep", "licensing-examination-knowledge-prep"):
            estat = "n/a"
        elif code in retired_codes:
            estat = "retired"
        elif code in retiring_codes:
            estat = retiring_codes[code][0]
            sids = "|".join(x for x in [sids, retiring_codes[code][1]] if x)
        elif vstat == "verified-official-source":
            estat = "current"
        else:
            estat = "unknown"
        exam_res = (cls in ("independent-certification-exam-prep", "licensing-examination-knowledge-prep")
                    and vstat != "verified-official-source" and (not code or bool(GENERIC_TRACK_RE.search(title))))
        exam_version = "unresolved"
        if mid in batch1:
            exam_version = CURRICULA[batch1[mid]]["effective"]
        elif mid in batch2:
            exam_version = BATCH2[batch2[mid]]["effective"] if BATCH2[batch2[mid]]["kind"] == "exam" else "n/a (skills course; feature table versioned by verification date)"
        elif cls not in ("independent-certification-exam-prep", "licensing-examination-knowledge-prep"):
            exam_version = "n/a"
        # depth / workflow
        if mid in batch1 or mid in batch2:
            depth, wf = "full-curriculum-spec", "Blueprint review"
        else:
            depth, wf = "inventory", ("Source verification" if vstat == "verified-official-source" else "Candidate")
        if estat.startswith("retiring") and code == "MS-102":
            wf = "Blocked"
        is_exam = cls in ("independent-certification-exam-prep", "licensing-examination-knowledge-prep")
        regulated = re.search(r"NCLEX|USMLE|Nurs|Medical|Pharm|Bar Exam|Law|Tax|CPA|Health|Clinical|Safety", title)
        disc = "DISC-REGULATED-02" if (is_exam and regulated) else ("DISC-CERTPREP-02" if is_exam else "DISC-SKILLS-02")
        cert_word = ("Completion of independent preparation course; does not award the external professional certification or license."
                     if is_exam else f"Mastemy Certificate of Completion — {title}")
        if mid in batch1:
            pb = 1
        elif mid in batch2:
            pb = 2
        elif re.search(r"^ACCA|^US CPA|^CIA Part|CISA|PMI PMP|^CFA Level|^US CMA|NCLEX|IELTS|Excel|Copilot|ChatGPT|OpenAI|Claude|Anthropic|Cursor|RAG|Retrieval|\.NET|C#|ASP\.NET|JavaScript|TypeScript|Microsoft (AB|AI)-", title):
            pb = 3
        elif is_exam:
            pb = 4
        else:
            pb = 5
        full = depth == "full-curriculum-spec"
        rows.append(dict(
            course_id=mid, course_version=VERSION, working_title=title, publication_title="", origin=origin,
            category_no=cat_no, category_name=cat_names[cat_no], course_class=cls,
            level=level_of(title, lrow["level"] if lrow else None),
            learner_persona=("candidate preparing for the named external examination" if is_exam else "working professional or student building the named skill"),
            target_role="to be set at blueprint review" if not full else ("exam candidate" if is_exam else "practitioner"),
            prerequisites="none", language="en", jurisdiction=jurisdiction_of(title, issuer),
            tool_licences=("vendor product access required; exact plan recorded in feature/version table before production"
                           if cls in ("vendor-platform-skills", "integrated-workflow-skills") else "none required (confirm at blueprint)"),
            issuer=issuer, official_exam_code=code, exam_version=exam_version, exam_status=estat,
            exam_resolution_required="yes" if exam_res else "no",
            scope_boundary=("official outline for the stated exam version only; no other editions mixed" if is_exam
                            else "skills scope as defined in the course blueprint; not an official vendor credential"),
            credential_disclaimer_id=disc,
            planned_hours=hours, planned_total_minutes=T, instruction_minutes=I, assessment_minutes=A,
            lesson_check_minutes=lc, module_assessment_minutes=mc, cumulative_assessment_minutes=cc, duration_basis=basis,
            question_formats="single-answer-mcq|multiple-answer-selection", multiple_answer_scoring="all-or-nothing",
            practice_forms_planned=(3 if is_exam else 1), mcq_limitation_note=mcq_limit(title, cls),
            certificate_type="mastemy-certificate-of-completion", certificate_wording=cert_word, completion_rule_id="CR-DEFAULT-75-80",
            verification_status=vstat, verified_on=von, source_ids=sids, workflow_state=wf, curriculum_depth=depth,
            priority_batch=pb,
            pkg_a_identity="drafted" if full else "partial-derived", pkg_b_coverage="drafted" if full else "not-started",
            pkg_c_lessons="not-started", pkg_d_materials="not-started",
            pkg_e_assessment="blueprint-and-samples" if full else "not-started",
            pkg_f_operations="partial" if full else "not-started", pkg_g_publication="not-started",
            pkg_h_qa="automated-checks-only" if full else "not-started",
            dedup_status="distinct", dedup_partner="", counted_distinct_inclusive="yes", counted_distinct_strict="yes",
            legacy_course_ids="|".join(lids if origin == "appendix-a" else [leg["course_id"]]),
            merged_legacy_ids="|".join(merged.get(mid, [])), pathway_ids="",
            youtube_playlist_id="", caption_langs="en", instructor_owner="", approval_status="draft",
            _batch1=batch1.get(mid), _batch2=batch2.get(mid), _legacy=lrow,
        ))
    return rows, xw, reg, appendix


# ------------------------------------------------------------------ dedup
STRICT_EXCLUDE = {"differentiation-review", "thin-scope-review", "needs-version-check", "overlap-review"}
NOT_COUNTED = {"duplicate-of", "module-of", "retiring-blocked", "retired-excluded"}


def apply_dedup(rows, xw):
    dec = load_dedup_decisions()
    ids = {r["course_id"] for r in rows}
    for mid, d in dec.items():
        if mid not in ids:
            raise SystemExit(f"dedup_decisions.csv references unknown {mid}")
    by_legacy = {}
    for lid, v in xw.items():
        if v["action"] == "addition":
            by_legacy[v["mst_id"]] = v
    for r in rows:
        mid = r["course_id"]
        status, partner = "distinct", ""
        if mid in dec:
            status, partner = dec[mid]["decision"], dec[mid]["partner"]
        elif r["origin"] == "legacy-addition":
            v = by_legacy.get(mid, {})
            note = v.get("note", "")
            if note.startswith("needs-version-check"):
                status = "needs-version-check"
            elif r["planned_hours"] <= 10:
                status = "thin-scope-review"
            elif isinstance(v.get("score"), float) and v["score"] >= 0.40:
                status, partner = "overlap-review", note.replace("closest Appendix A row ", "")
        if r["exam_status"] == "retired":
            status = "retired-excluded"
        r["dedup_status"], r["dedup_partner"] = status, partner
        r["counted_distinct_inclusive"] = "no" if status in NOT_COUNTED else "yes"
        r["counted_distinct_strict"] = "no" if (status in NOT_COUNTED or status in STRICT_EXCLUDE) else "yes"
        if status == "retiring-blocked":
            r["workflow_state"] = "Blocked"


def remap_pathways(rows, xw, legacy_rows):
    key_to_lid = {l["_key"]: l["course_id"] for l in legacy_rows}
    out = []
    by_id = {r["course_id"]: r for r in rows}
    for pid, (name, _cat, keys) in PATHWAYS.items():
        steps, notes = [], []
        for k in keys:
            lid = key_to_lid[k]
            v = xw[lid]
            if v["action"] in ("mapped", "addition", "merged-duplicate") and v["mst_id"]:
                if v["mst_id"] not in steps:
                    steps.append(v["mst_id"])
                if v["action"] == "merged-duplicate":
                    notes.append(f"{lid} merged into {v['mst_id']}")
            else:
                notes.append(f"{lid} dropped ({v['action']}: {v['note']})")
        out.append(dict(pathway_id=pid, name=name, courses=steps, notes=notes))
        for s in steps:
            by_id[s]["pathway_ids"] = "|".join(x for x in [by_id[s]["pathway_ids"], pid] if x)
        for a, b in zip(steps, steps[1:]):
            if by_id[b]["prerequisites"] == "none":
                by_id[b]["prerequisites"] = a
    return out


# ------------------------------------------------------------------ course packages
def _mid(w):
    nums = [float(x) for x in re.findall(r"\d+", w)]
    return sum(nums) / len(nums)


def _alloc(total, weights):
    mids = [_mid(w) for w in weights]
    raw = [total * m / sum(mids) for m in mids]
    out = [int(x) for x in raw]
    for i in sorted(range(len(raw)), key=lambda i: raw[i] - out[i], reverse=True)[: total - sum(out)]:
        out[i] += 1
    return out


def package_spec(r):
    if r["_batch1"]:
        k = r["_batch1"]
        s = dict(CURRICULA[k])
        s.update(kind="exam", case=B1_EXTRAS[k]["case"], modules=B1_EXTRAS[k]["modules"], batch=1)
        return s
    s = dict(BATCH2[r["_batch2"]])
    s["batch"] = 2
    return s


def plan_package(r, s):
    T, I, A = r["planned_total_minutes"], r["instruction_minutes"], r["assessment_minutes"]
    doms = s["domains"]
    nm = len(doms)
    nl = sum(len(d[2]) for d in doms)
    form_min = s["mock"]["minutes"]
    if s["kind"] == "exam":
        cum_need = 2 * form_min + 10  # practice form A + protected final form + answer review
    else:
        cum_need = form_min + 10      # final assessment + answer review
    cum = max(int(0.08 * T + 0.5), cum_need)
    mod = int(0.07 * T + 0.5)
    les = A - cum - mod
    floor = int(0.03 * T + 0.5)
    if les < floor:
        mod -= floor - les
        les = floor
    if mod < 10 * nm:
        raise SystemExit(f"{r['course_id']}: planned hours too low for module assessments after cumulative forms")
    review = cum - (cum_need - 10)
    lesson_min = []
    mod_instr = _alloc(I, [d[1] for d in doms])
    for (dname, w, lessons), mi in zip(doms, mod_instr):
        base = mi // len(lessons)
        mins = [base] * len(lessons)
        mins[-1] += mi - base * len(lessons)
        lesson_min.append(mins)
    les_items = max(3, les // nl)
    mod_test_min = mod // nm
    forms_n = 4 if s["kind"] == "exam" else 2
    bank = (les_items * nl + mod_test_min * nm) * 2 + forms_n * s["mock"]["items"]
    dev = ""
    if (les, mod, cum) != (int(0.05 * T + 0.5), int(0.07 * T + 0.5), A - int(0.05 * T + 0.5) - int(0.07 * T + 0.5)):
        dev = (f"Split adjusted from default 5/7/8% to lesson {les} / module {mod} / cumulative {cum} min "
               f"so the required cumulative forms fit; total assessment stays {A} min (20%).")
    return dict(T=T, I=I, A=A, les=les, mod=mod, cum=cum, review=review, nm=nm, nl=nl, lesson_min=lesson_min,
                les_items=les_items, mod_test_min=mod_test_min, forms_n=forms_n, bank=bank, deviation=dev,
                form_alloc=_alloc(s["mock"]["items"], [d[1] for d in doms]))


def item_json(cid, n, stem, opts, lesson_ref, domain_ref):
    keys = "ABCDEFG"
    correct = [keys[i] for i, o in enumerate(opts) if o[1]]
    multi = len(correct) > 1
    m = re.search(r"Select (TWO|THREE|all that apply)", stem)
    return dict(
        item_id=f"{cid}-Q{n:04d}", item_version="0.1.0", item_type="multiple-answer" if multi else "single-answer",
        selection_rule=(m.group(0) if m else "Select ONE") if multi else "Select ONE", stem=stem,
        options=[dict(key=keys[i], text=o[0], correct=o[1], rationale=o[2]) for i, o in enumerate(opts)],
        correct_keys=correct, explanation=next(o[2] for o in opts if o[1]),
        outcome_refs=[lesson_ref], domain_ref=domain_ref, cognitive_level="apply" if len(stem) > 110 else "understand",
        difficulty="medium (estimated, not calibrated)", expected_seconds=75 if multi else 60,
        provenance="original Mastemy item drafted by an AI agent; no external question source",
        scoring="all-or-nothing" if multi else "single-key", randomise_options=True,
        reviewer=None, publication_state="draft-unreviewed")


def write_package(r, sources):
    s = package_spec(r)
    p = plan_package(r, s)
    cid, ver = r["course_id"], r["course_version"]
    base = os.path.join(OUT, "courses", cid, ver)
    os.makedirs(os.path.join(base, "assessments"), exist_ok=True)
    doms = s["domains"]
    if len(s["modules"]) != len(doms):
        raise SystemExit(f"{cid}: module extras do not match domains")
    src_ids = [x for x in s["source"].split("|") if x]
    is_exam = s["kind"] == "exam"
    weight_label = "official domain weight" if is_exam else "Mastemy design weight (no official weighting)"
    # syllabus + coverage
    syl, cov, yt = [], [], []
    for mi, ((dname, w, lessons), (w1, w2, misc), mins) in enumerate(zip(doms, s["modules"], p["lesson_min"]), 1):
        for li, (ln, lm) in enumerate(zip(lessons, mins), 1):
            lid = f"M{mi:02d}L{li:02d}"
            syl.append(dict(module_id=f"M{mi:02d}", module_title=dname, module_weight=w, weight_basis=weight_label,
                            module_purpose=f"Teach every in-scope objective under '{dname}' to the depth the source requires.",
                            module_prerequisites=("previous module" if mi > 1 else "course prerequisites"),
                            lesson_id=lid, lesson_title=ln, instruction_minutes=lm, lesson_check_items=p["les_items"],
                            worked_application_1=w1, worked_application_2=w2, common_misconception=misc,
                            completion_requirement="watch lesson video, complete lesson check (unscored for certificate), pass module check >= 75%"))
            cov.append(dict(outcome_id=f"{cid}-D{mi:02d}.{li:02d}",
                            outcome_id_basis=("Mastemy internal ID for an official sub-objective (issuer publishes no IDs)" if is_exam
                                              else "Mastemy internal ID (no issuer syllabus)"),
                            outcome_text=ln, source_ref=f"{s['source']} :: {dname}", module_id=f"M{mi:02d}", lesson_id=lid,
                            cognitive_depth="explain|apply (to confirm at blueprint review)", explanation_status="not-authored",
                            worked_example_status="titled-not-authored", notes_section_status="not-authored",
                            planned_items=p["les_items"] * 2, items_authored=0, review_status="mapped-not-taught",
                            reviewer_decision="pending"))
            yt.append(dict(lesson_id=lid, planned_title=f"{r['working_title']} | {ln}", playlist=f"{cid}-M{mi:02d}",
                           youtube_video_id="", channel_id="", target_minutes=int(lm * 0.6), captions="not-started",
                           language="en", thumbnail_brief="not-started", publication_state="not-produced"))
    write_csv(os.path.join(base, "syllabus.csv"), list(syl[0].keys()), syl)
    write_csv(os.path.join(base, "outcome_coverage.csv"), list(cov[0].keys()), cov)
    write_csv(os.path.join(base, "youtube_asset_manifest.csv"), list(yt[0].keys()), yt)
    # forms
    forms = []
    names = ["practice-form-A", "practice-form-B", "practice-form-C", "final-protected"] if is_exam else ["final-protected", "final-alternate"]
    for fn in names:
        forms.append(dict(form_id=f"{cid}-{fn}", items=s["mock"]["items"], minutes=s["mock"]["minutes"],
                          required=(fn in ("practice-form-A", "final-protected") if is_exam else fn == "final-protected"),
                          counted_in_planned_time=(fn in ("practice-form-A", "final-protected") if is_exam else fn == "final-protected"),
                          protected_pool=fn.startswith("final"), shares_items_with_other_forms=False,
                          domain_allocation={d[0]: n for d, n in zip(doms, p["form_alloc"])},
                          label="knowledge practice (format differs from the official exam where it uses non-MCQ items)" if is_exam else "Mastemy final assessment"))
    forms_doc = dict(course_id=cid, version=ver, length_basis=s["mock"]["basis"],
                     scoring=dict(single_answer="1 point for the single key", multiple_answer="all-or-nothing on the exact key set; no partial credit configured",
                                  module_check_threshold_pct=75, final_threshold_pct=80,
                                  note="Mastemy learning thresholds, not external pass marks; platform scores do not predict scaled exam scores"),
                     time_budget_minutes=dict(lesson_checks=p["les"], module_assessments=p["mod"], cumulative=p["cum"],
                                              cumulative_breakdown=dict(required_forms=p["cum"] - p["review"], answer_review=p["review"]),
                                              total=p["A"], deviation_from_default_split=p["deviation"] or "none"),
                     module_checks=[dict(module_id=f"M{i:02d}", minutes=p["mod_test_min"], items=p["mod_test_min"]) for i in range(1, p["nm"] + 1)],
                     forms=forms)
    with open(os.path.join(base, "assessments", "forms.json"), "w") as f:
        json.dump(forms_doc, f, indent=1, ensure_ascii=False)
    items = [item_json(cid, n, stem, opts, f"{cid}-D{min(n, len(doms)):02d}.01", doms[min(n, len(doms)) - 1][0])
             for n, (stem, opts) in enumerate(s["samples"], 1)]
    qb = dict(course_id=cid, version=ver, status="samples only - full bank not authored",
              bank_plan=dict(minimum_reviewed_items=p["bank"], lesson_check_items=p["les_items"] * p["nl"],
                             module_check_items=p["mod_test_min"] * p["nm"], alternates_factor=2,
                             cumulative_forms=p["forms_n"], items_per_form=s["mock"]["items"],
                             basis="(lesson + module items) x 2 alternates + forms x form length; master prompt design ranges 200-600 (skills) / 600-1,500+ (large certifications)"),
              items_authored=len(items), items_reviewed=0, items=items)
    with open(os.path.join(base, "assessments", "question_bank.json"), "w") as f:
        json.dump(qb, f, indent=1, ensure_ascii=False)
    meta = {k: r[k] for k in FIELDS}
    meta.update(dict(
        package_batch=s["batch"], learning_outcomes=[dict(id=f"{cid}-LO{i}", text=o) for i, o in enumerate(s["outcomes"], 1)],
        integrative_case=s["case"], exam_version_record=dict(
            issuing_body=r["issuer"], credential_title=r["working_title"], exam_code=s.get("code", ""),
            syllabus_edition=s["effective"], status=r["exam_status"], official_source_ids=src_ids,
            source_urls=[sources[x][2] for x in src_ids if x in sources], documented_topic_weights=[(d[0], d[1]) for d in doms],
            item_formats_on_platform="single-answer MCQ and multiple-answer selection only",
            permitted_marketing_language="independent preparation; no affiliation or endorsement", content_rights="original Mastemy content only",
            access_date=SESSION_DATE, reviewer_status="not reviewed by a qualified SME") if is_exam else None,
        assesses=["knowledge and applied reasoning on every in-scope outcome via MCQ/MR", "case-based decisions in the integrative case"],
        does_not_assess=[r["mcq_limitation_note"]],
        time_plan=dict(planned_total_minutes=p["T"], instruction_minutes=p["I"], assessment_minutes=p["A"],
                       rounding_rule="I = round-half-up(0.8 x T); A = T - I",
                       video_runtime_target_minutes=int(p["I"] * 0.6), optional_practice_not_counted=(names[1:3] if is_exam else names[1:])),
        not_produced=["lesson scripts", "storyboards", "notes", "captions", "full item bank", "videos", "YouTube uploads", "SME review"],
    ))
    meta = {k: v for k, v in meta.items() if not k.startswith("_")}
    with open(os.path.join(base, "course_metadata.json"), "w") as f:
        json.dump(meta, f, indent=1, ensure_ascii=False)
    # human-readable curriculum spec
    L = [f"# {r['working_title']}", "",
         f"> **Full curriculum specification - not finished lesson content, scripts or videos.** `{cid}` v{ver} | Batch {s['batch']} | workflow: {r['workflow_state']} | approval: draft", "",
         "| Field | Value |", "|---|---|",
         f"| Course class | {r['course_class']} |", f"| Issuer | {r['issuer']} (no affiliation or endorsement) |",
         f"| Exam code | {s.get('code') or 'n/a'} |", f"| Version basis | {s['effective']} |",
         f"| Evidence | **{r['verification_status']}** - sources: {', '.join(src_ids)} |",
         f"| Legacy IDs | {r['legacy_course_ids'] or 'none'} |",
         f"| Planned time | T = {p['T']} min; instruction I = {p['I']} min (80%); assessment A = {p['A']} min (20%) |",
         f"| Assessment split | lesson checks {p['les']} / module checks {p['mod']} / cumulative {p['cum']} min |",
         f"| Certificate | {r['certificate_wording']} (module checks >= 75%, final >= 80%) |", ""]
    if p["deviation"]:
        L += [f"Split note: {p['deviation']}", ""]
    L += ["## Learning outcomes", ""] + [f"{i}. {o}" for i, o in enumerate(s["outcomes"], 1)]
    L += ["", "## What this course assesses / does not assess", "",
          "- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.",
          f"- Does not assess: {r['mcq_limitation_note']}", "", "## Modules", ""]
    for mi, ((dname, w, lessons), (w1, w2, misc), mins) in enumerate(zip(doms, s["modules"], p["lesson_min"]), 1):
        L += [f"### M{mi:02d} {dname} ({w}{'' if is_exam else ', design weight'})", "",
              f"- Worked applications: (1) {w1}; (2) {w2}", f"- Common misconception addressed: {misc}",
              f"- Module check: {p['mod_test_min']} items / {p['mod_test_min']} min, threshold 75%", "",
              "| Lesson | Title | Instruction min | Lesson-check items |", "|---|---|---|---|"]
        L += [f"| M{mi:02d}L{li:02d} | {ln} | {lm} | {p['les_items']} |" for li, (ln, lm) in enumerate(zip(lessons, mins), 1)]
        L.append("")
    L += ["## Integrative case", "", s["case"], "", "## Cumulative assessment", "",
          f"Form length basis: {s['mock']['basis']}", "",
          "| Form | Items | Minutes | Required (counted in T) |", "|---|---|---|---|"]
    L += [f"| {f['form_id']} | {f['items']} | {f['minutes']} | {'yes' if f['required'] else 'no (optional practice)'} |" for f in forms]
    L += ["", "| Domain | Items per form |", "|---|---|"] + [f"| {d[0]} | {n} |" for d, n in zip(doms, p["form_alloc"])]
    L += ["", f"Minimum reviewed item bank: {p['bank']} (plan; {len(items)} sample items drafted, 0 reviewed).", "",
          "## Sample items (original, draft, unreviewed)", ""]
    for it in items:
        L += [f"**{it['item_id']}** ({it['item_type']}, {it['selection_rule']}) {it['stem']}", ""]
        L += [f"- {o['key']}. {o['text']}{' **(key)**' if o['correct'] else ''}  \n  _Rationale:_ {o['rationale']}" for o in it["options"]]
        L.append("")
    L += ["## Package files", "", "`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.", ""]
    with open(os.path.join(base, "curriculum.md"), "w") as f:
        f.write("\n".join(L))
    return dict(course_id=cid, title=r["working_title"], batch=s["batch"], evidence=r["verification_status"],
                bank=p["bank"], plan=p, items=items, path=os.path.relpath(base, OUT), spec=s)


# ------------------------------------------------------------------ registers
def source_register():
    rows = []
    for s in SOURCES:
        rows.append(dict(source_id=s[0], family=s[1], url=s[2], publisher=s[3], source_type=s[4], method=s[5],
                         accessed_on=s[6], finding=s[7], origin="mastemy-session"))
    for b in read_csv(os.path.join(INP, "appendix_b_sources.csv")):
        rows.append(dict(source_id="APB-" + b["key"], family=b["name"], url=b["url"], publisher=b["name"].split(" ")[0],
                         source_type="discovery anchor", method="not re-checked this run (user-supplied register)",
                         accessed_on="", finding=f"Prompt status: {b['prompt_status']}; prompt checked: {b['prompt_checked']}; purpose: {b['purpose']}",
                         origin="master-prompt-appendix-b"))
    return rows


def exam_versions(rows, sources):
    out = []
    for r in rows:
        if not r["course_class"].endswith("prep"):
            continue
        sids = [x for x in r["source_ids"].split("|") if x]
        out.append(dict(course_id=r["course_id"], issuing_body=r["issuer"], credential_title=r["working_title"],
                        exam_code=r["official_exam_code"], jurisdiction=r["jurisdiction"], language="en",
                        syllabus_edition=r["exam_version"], status=r["exam_status"],
                        official_source_url="|".join(sources[x][2] for x in sids if x in sources and sources[x][4] == "official"),
                        evidence=r["verification_status"], access_date=r["verified_on"],
                        topic_weights=("see course package" if r["curriculum_depth"] == "full-curriculum-spec" and r["verification_status"] == "verified-official-source" else "not documented"),
                        item_formats_note=r["mcq_limitation_note"], prerequisites_or_eligibility="not checked",
                        permitted_marketing_language="independent preparation; no affiliation/endorsement",
                        exact_resolution_required=r["exam_resolution_required"], reviewer_status="none"))
    return out


SECTION5 = [("ACCA papers BT..AAA", r"^ACCA (BT|MA|FA|LW|PM|TX|FR|AA|FM|SBL|SBR|AFM|APM|ATX|AAA):", 15),
            ("US CPA AUD/FAR/REG/BAR/ISC/TCP", r"^US CPA (AUD|FAR|REG|BAR|ISC|TCP):", 6),
            ("CIA Parts 1-3", r"^CIA Part [123]:", 3), ("CFA Levels I-III", r"^CFA Level (I|II|III):", 3),
            ("US CMA Parts 1-2", r"^US CMA Part [12]:", 2), ("CISA", r"CISA", 1), ("PMP", r"PMI PMP", 1),
            ("NCLEX-RN and NCLEX-PN", r"^NCLEX-(RN|PN):", 2), ("IELTS Academic and General Training (four-skill)", r"^IELTS (Academic|General Training): Complete", 2)]
LANGS12 = ["C#", ".NET", "JavaScript", "TypeScript", "Java", "Python", "C Programming", "C++", "Go:", "Rust", "Kotlin", "Swift",
           "PHP", "Ruby", "Dart", "R:", "SQL", "Bash", "PowerShell"]


def coverage_gaps(rows):
    titles = [r["working_title"] for r in rows if r["counted_distinct_inclusive"] == "yes"]
    G = []

    def g(area, gap, evidence, action, status="open", blocking="no"):
        G.append(dict(gap_id=f"GAP-{len(G)+1:03d}", area=area, gap=gap, evidence=evidence, proposed_action=action,
                      owner="curriculum director (unassigned)", status=status, release_blocking=blocking))
    for name, rx, n in SECTION5:
        got = sum(1 for t in titles if re.search(rx, t))
        g("Section 5 named structure", f"{name}: {got}/{n} separate courses present", "automated title check",
          "none" if got >= n else "add missing courses", "closed" if got >= n else "open", "no" if got >= n else "yes")
    miss = [l for l in LANGS12 if not any(l in t for t in titles)]
    g("Section 12 programming languages", "missing: " + (", ".join(miss) or "none"), "automated title check",
      "add courses for missing languages" if miss else "none", "open" if miss else "closed")
    for area, gap, ev, act, blk in [
        ("ACCA", "Redesigned ACCA qualification from 2027 has no separate version mapping; current papers must not be relabelled", "accaglobal.com blocked (EGRESS_BLOCKED) this run", "create future-version exam records once the official timeline and syllabi are readable", "yes"),
        ("US CPA", "Forthcoming blueprint versions not recorded; examination-year routing not configured", "aicpa-cima.com blocked", "record blueprint per examination year", "yes"),
        ("CFA Level III", "Single course row MST-0053 must carry the common core plus three selectable pathways (Portfolio Management, Private Markets, Private Wealth) as separate pathway modules", "pathway names from master prompt; cfainstitute.org blocked", "model pathways as selectable module sets in the course version", "no"),
        ("CIA", "Current syllabus and language-transition rules not verified", "theiia.org blocked", "verify before blueprint", "yes"),
        ("PMP", "July 2026 exam content outline only known from secondary snippets", "pmi.org blocked", "re-verify MST-0121 spec", "yes"),
        ("NCLEX", "2026 RN/PN test plans not read", "nclex.com blocked", "verify before blueprint", "yes"),
        ("ISACA", "Credential registry not re-checked; newer AI credentials may be missing or renamed", "isaca.org blocked", "check registry", "no"),
        ("Microsoft", "AI-200, AI-300 and AB-900 courses (v1 additions) rely on secondary successor reports; study guides not fetched this run", "SRC-MS-RETIRE-2026 (secondary)", "fetch study guides via Microsoft Learn", "no"),
        ("Microsoft", "Microsoft Applied Skills credentials are not represented as courses (design decision: they are lab-assessed and several retired in 2026)", "SRC-MS-RETIRE-OFFICIAL lists Applied Skills retirements", "decide whether to add knowledge-prep modules", "no"),
        ("AWS", "AI Business Strategist (beta) and Advanced Networking retirement status unverified", "aws.amazon.com/docs.aws.amazon.com blocked", "verify before blueprint", "no"),
        ("Google Cloud", "Professional Agentic Architect transition status unverified", "services.google.com blocked", "verify", "no"),
        ("CompTIA", "Security+ SY0-701 retirement reported 2027-06-11 (secondary); successor SY0-801 not in catalogue", "SRC-COMPTIA-SECPLUS (secondary)", "add successor row once objectives are published", "no"),
        ("ITIL", "v1 ITIL 4 specialist modules kept as additions flagged needs-version-check against ITIL Version 5", "peoplecert.org not checked", "verify and retire or merge", "no"),
        ("Localisation", "Arabic, Spanish, French, Chinese, Russian and Korean language versions not started; translations are versions, not new courses", "master prompt section 14", "plan after English masters pass review", "no"),
        ("Categories", "v1 health-science skills courses (medical terminology etc.) placed in category 32 for want of a skills category", "category mapping rule", "confirm category fit", "no"),
        ("Dedup method", "Semantic deduplication is title-based (IDF-weighted token similarity plus manual decisions); outline-level overlap can only be confirmed once blueprints exist", "dedup-report.md", "repeat dedup at blueprint stage", "no"),
        ("Sources", f"{len(read_csv(os.path.join(INP, 'appendix_b_sources.csv')))} Appendix B anchors are recorded as user-supplied and not re-verified", "research/source_register.csv", "verify each anchor when its course reaches source verification", "no"),
    ]:
        g(area, gap, ev, act, "open", blk)
    return G


def unresolved_issues(rows):
    n_res = sum(r["exam_resolution_required"] == "yes" for r in rows if r["counted_distinct_inclusive"] == "yes")
    I = [
        ("high", "All courses", "No qualified SME reviewer assigned; no content is approved", "yes"),
        ("high", "All courses", "No videos produced or uploaded; YouTube channel/playlist IDs empty", "yes"),
        ("high", "Exam rows", f"{n_res} exam-prep rows need exact issuer exam code/version resolution before blueprint", "yes"),
        ("high", "Batch 1", "MST-0201 (CLF-C02), MST-0250 (SY0-701), MST-0121 (PMP) and MST-0051 (CFA L-I) specs rest on secondary evidence only", "yes"),
        ("high", "Sources", "Issuer sites for ACCA, AICPA, IIA, ISACA, PMI, CFA, NCSBN, Cursor blocked by egress proxy this run", "yes"),
        ("high", "MST-0182", "MS-102 retires 2026-11-30 (official); course blocked", "yes"),
        ("medium", "MST-0200", "GH-300 study guide 'skills at a glance' lists an extra 25-30% line without detail; weights sum above 100%", "yes"),
        ("medium", "Microsoft exams", "Mock lengths are design assumptions (study guides give no question count or duration)", "yes"),
        ("medium", "MST-0188", "AB-730 outline effective 2026-10-20; prior outline for earlier sittings not captured", "no"),
        ("medium", "MST-0171", "DP-600 outline effective 2026-10-19; prior outline for earlier sittings not captured", "no"),
        ("medium", "MST-0830", "EF Core MySQL provider support for the chosen EF Core version must be rechecked", "no"),
        ("medium", "MST-0531", "Claude Code installation, plans and pricing not verified", "no"),
        ("low", "MST-0649", "=COPILOT() worksheet function seen only in a Q&A answer (preview); excluded until official page checked", "no"),
        ("medium", "Dedup", "Title-level dedup only; differentiation-review rows need outline comparison", "no"),
    ]
    return [dict(issue_id=f"UI-{i:03d}", severity=s, area=a, description=d, owner="unassigned", decision="open", release_blocking=b)
            for i, (s, a, d, b) in enumerate(I, 1)]


# ------------------------------------------------------------------ writers
def write_all(rows, xw, legacy_rows, pathways, packages):
    sources = {s[0]: s for s in SOURCES}
    clean = [{k: r[k] for k in FIELDS} for r in rows]
    write_csv(os.path.join(OUT, "catalog", "course_catalog.csv"), FIELDS, clean)
    with open(os.path.join(OUT, "catalog", "course_catalog.json"), "w") as f:
        json.dump(dict(generated_by="scripts/catalogue/build_catalogue.py", session_date=SESSION_DATE, count=len(clean),
                       note="Planning inventory. No course content, videos or reviewed items exist yet.", courses=clean), f, indent=1, ensure_ascii=False)
    cw = []
    for l in legacy_rows:
        v = xw[l["course_id"]]
        cw.append(dict(legacy_course_id=l["course_id"], legacy_title=l["title"], action=v["action"], mst_id=v["mst_id"],
                       similarity=v["score"], method=v["method"], note=v["note"]))
    write_csv(os.path.join(OUT, "catalog", "id-crosswalk.csv"), list(cw[0].keys()), cw)
    write_csv(os.path.join(OUT, "catalog", "legacy-v1-catalogue.csv"), [k for k in legacy_rows[0] if not k.startswith("_")], legacy_rows)
    srcs = source_register()
    write_csv(os.path.join(OUT, "research", "source_register.csv"), list(srcs[0].keys()), srcs)
    ev = exam_versions(rows, sources)
    write_csv(os.path.join(OUT, "research", "exam_versions.csv"), list(ev[0].keys()), ev)
    write_csv(os.path.join(OUT, "research", "retired_exams.csv"), ["exam_code", "vendor", "status", "source_id", "successor"],
              [dict(zip(["exam_code", "vendor", "status", "source_id", "successor"], x)) for x in RETIRED_EXCLUDED])
    gaps = coverage_gaps(rows)
    write_csv(os.path.join(OUT, "research", "coverage_gaps.csv"), list(gaps[0].keys()), gaps)
    ui = unresolved_issues(rows)
    write_csv(os.path.join(OUT, "operations", "unresolved_issues.csv"), list(ui[0].keys()), ui)
    with open(os.path.join(OUT, "pathways.json"), "w") as f:
        json.dump(pathways, f, indent=1)
    by_id = {r["course_id"]: r for r in rows}
    L = ["# Learning Pathways", "", "Generated. Pathways from the v1 catalogue, re-keyed to MST-NNNN IDs through `catalog/id-crosswalk.csv`. "
         "Earlier steps are recommended, not mandatory, prerequisites. Pathways are Mastemy learning orders, not issuer certification paths.", ""]
    for p in pathways:
        L += [f"## {p['pathway_id']} - {p['name']}", "", "| Step | Course ID | Title | Hours |", "|---|---|---|---|"]
        L += [f"| {i} | `{c}` | {by_id[c]['working_title']} | {by_id[c]['planned_hours']} |" for i, c in enumerate(p["courses"], 1)]
        if p["notes"]:
            L += ["", "Notes: " + "; ".join(p["notes"])]
        L.append("")
    with open(os.path.join(OUT, "pathways.md"), "w") as f:
        f.write("\n".join(L))
    try:
        import openpyxl
        wb = openpyxl.Workbook()
        for name, fields, data in [("course_catalog", FIELDS, clean), ("id_crosswalk", list(cw[0].keys()), cw),
                                   ("source_register", list(srcs[0].keys()), srcs), ("coverage_gaps", list(gaps[0].keys()), gaps)]:
            ws = wb.active if name == "course_catalog" else wb.create_sheet(name)
            ws.title = name
            ws.append(fields)
            for d in data:
                ws.append([d[k] for k in fields])
            ws.freeze_panes = "A2"
        wb.properties.creator = "Mastemy catalogue generator"
        wb.save(os.path.join(OUT, "catalog", "course_catalog.xlsx"))
        xlsx = True
    except ImportError:
        xlsx = False
    write_dedup_report(rows, xw, legacy_rows)
    write_gaps_md(gaps)
    manifest(rows, packages, xlsx)
    return xlsx


def counts(rows):
    c = collections.Counter()
    for r in rows:
        c["raw"] += 1
        c["inclusive"] += r["counted_distinct_inclusive"] == "yes"
        c["strict"] += r["counted_distinct_strict"] == "yes"
    return c


def write_dedup_report(rows, xw, legacy_rows):
    c = counts(rows)
    act = collections.Counter(v["action"] for v in xw.values())
    meth = collections.Counter(v["method"] for v in xw.values() if v["action"] == "mapped")
    st = collections.Counter(r["dedup_status"] for r in rows)
    a_rows = [r for r in rows if r["origin"] == "appendix-a"]
    L = ["# Semantic Deduplication and Reconciliation Report", "",
         f"Generated {SESSION_DATE} by `scripts/catalogue/build_catalogue.py`. Every number is computed from the emitted files.", "",
         "## Result", "",
         f"- Candidate rows after reconciliation: **{c['raw']}** (Appendix A {len(a_rows)} + v1 additions {c['raw'] - len(a_rows)}).",
         f"- Distinct courses, inclusive count (excludes duplicates, component modules, retired and retirement-blocked rows): **{c['inclusive']}**.",
         f"- Distinct courses, strict count (also excludes rows still under differentiation, overlap, thin-scope or version review): **{c['strict']}**.",
         f"- Requirement of at least 1,000 genuinely distinct courses: **{'met' if c['strict'] >= 1000 else 'NOT met'}** on the strict count.", "",
         "These are planning counts of distinct course *scopes*. None of these courses has content, videos or reviewed items yet.", "",
         "## Method", "",
         "1. Appendix A (1,300 rows, MST-0001..MST-1300) is imported unchanged as the authoritative backlog (`scripts/catalogue/input/appendix_a.csv`).",
         "2. Each v1 row (1,076) is compared with every Appendix A title by IDF-weighted token similarity. Certification rows keep level words (Foundation/Practitioner, Level I/II) and exam codes; a brand/tool word present on only one side, or a certification-vs-skills mismatch, reduces the score. Matches are one-to-one, best score first (threshold 0.45; certification pairs 0.34).",
         "3. `scripts/catalogue/input/crosswalk_overrides.csv` records manual decisions (maps, merges, retirements, forced additions); they win over the heuristic.",
         "4. Unmatched v1 rows become additions with new IDs from MST-1301 upward, recorded in `catalog/mst-id-registry.json`; IDs are never reused. A v1 row whose best match is already taken and scores >= 0.55 is recorded as a merged duplicate instead.",
         "5. Within the combined set, `scripts/catalogue/input/dedup_decisions.csv` holds reviewed decisions (duplicates, component modules, brand/tool-swap differentiation reviews, content reuse); additions are also flagged automatically for thin scope (<= 10 h), version checks, or a close Appendix A neighbour (similarity >= 0.40).",
         "6. Exam rows are checked against `research/retired_exams.csv` (17 Microsoft exams confirmed retired on the official Microsoft retirement page this run) and the scheduled-retirement list.", "",
         "Limits: title-level comparison cannot prove two outlines are different. Rows marked for review are kept out of the strict count until their blueprints are compared.", "",
         "## Crosswalk (v1 -> MST)", "", "| Action | v1 rows |", "|---|---|"]
    L += [f"| {k} | {v} |" for k, v in sorted(act.items())]
    L += ["", f"Mapped by method: " + ", ".join(f"{k}={v}" for k, v in sorted(meth.items())), "",
          "Full detail: `catalog/id-crosswalk.csv`. Every v1 ID appears exactly once; none is dropped silently.", "",
          "## Dedup status of catalogue rows", "", "| Status | Rows | Counted (inclusive) | Counted (strict) |", "|---|---|---|---|"]
    for s_, n in sorted(st.items()):
        L.append(f"| {s_} | {n} | {'no' if s_ in NOT_COUNTED else 'yes'} | {'no' if (s_ in NOT_COUNTED or s_ in STRICT_EXCLUDE) else 'yes'} |")
    L += ["", "## Per category", "", "| Cat | Name | Appendix A | v1 additions | Raw | Inclusive | Strict |", "|---|---|---|---|---|---|---|"]
    cats = sorted({r["category_no"] for r in rows})
    for cno in cats:
        rs = [r for r in rows if r["category_no"] == cno]
        L.append(f"| {cno} | {rs[0]['category_name']} | {sum(r['origin']=='appendix-a' for r in rs)} | {sum(r['origin']=='legacy-addition' for r in rs)} | {len(rs)} | "
                 f"{sum(r['counted_distinct_inclusive']=='yes' for r in rs)} | {sum(r['counted_distinct_strict']=='yes' for r in rs)} |")
    L += [f"| | **Total** | {len(a_rows)} | {c['raw']-len(a_rows)} | {c['raw']} | {c['inclusive']} | {c['strict']} |", "",
          "## Reviewed decisions", "", "| Course | Decision | Partner | Note |", "|---|---|---|---|"]
    by_id = {r["course_id"]: r for r in rows}
    for mid, d in sorted(load_dedup_decisions().items()):
        L.append(f"| {mid} {by_id[mid]['working_title']} | {d['decision']} | {d['partner']} | {d['note']} |")
    L += ["", "## v1 rows merged or retired (not carried as separate courses)", "", "| v1 ID | v1 title | Action | Into | Reason |", "|---|---|---|---|---|"]
    for l in legacy_rows:
        v = xw[l["course_id"]]
        if v["action"] in ("merged-duplicate", "retired-excluded"):
            L.append(f"| {l['course_id']} | {l['title']} | {v['action']} | {v['mst_id'] or '-'} | {v['note']} |")
    gen = [r for r in rows if r["exam_resolution_required"] == "yes" and r["counted_distinct_inclusive"] == "yes"]
    L += ["", f"## Exam rows needing exact exam/version resolution ({len(gen)})", "",
          "Generic titles ('Certification-Track', 'Certification Preparation', 'Current-Version', 'Retirement-Aware', beta or transition tracks) and unverified rows without an issuer exam code. "
          "They stay in the backlog but cannot pass Source verification until the exact exam and edition are recorded.", ""]
    L.append(", ".join(f"`{r['course_id']}`" for r in gen))
    L += ["", "## Automatically flagged v1 additions", ""]
    for s_ in ("overlap-review", "thin-scope-review", "needs-version-check"):
        fl = [r for r in rows if r["dedup_status"] == s_]
        L += [f"### {s_} ({len(fl)})", "", "; ".join(f"`{r['course_id']}` {r['working_title']}" + (f" (near {r['dedup_partner']})" if r["dedup_partner"] else "") for r in fl), ""]
    with open(os.path.join(OUT, "dedup-report.md"), "w") as f:
        f.write("\n".join(L))


def write_gaps_md(gaps):
    L = ["# Coverage-Gap Register", "", "Generated. Machine-readable copy: `research/coverage_gaps.csv`. This finite catalogue does not include every credential in the world; this register lists known gaps and unverified areas.", "",
         "| ID | Area | Gap | Evidence | Proposed action | Status | Release-blocking |", "|---|---|---|---|---|---|---|"]
    L += [f"| {g['gap_id']} | {g['area']} | {g['gap']} | {g['evidence']} | {g['proposed_action']} | {g['status']} | {g['release_blocking']} |" for g in gaps]
    with open(os.path.join(OUT, "coverage-gaps.md"), "w") as f:
        f.write("\n".join(L) + "\n")


def manifest(rows, packages, xlsx):
    c = counts(rows)
    m = dict(
        generated_on=SESSION_DATE, generator="scripts/catalogue/build_catalogue.py",
        handover=dict(candidate_courses=c["raw"], validated_distinct_courses_inclusive=c["inclusive"],
                      validated_distinct_courses_strict=c["strict"],
                      validated_distinct_note="distinct after title-level reconciliation and dedup; not validated against issuer sources (see verified counts)",
                      full_curriculum_specifications=len(packages), full_curricula_completed_as_content=0,
                      scripts_completed=0, reviewed_items_completed=0,
                      draft_sample_items=sum(len(p["items"]) for p in packages), videos_generated=0, videos_uploaded=0,
                      courses_approved=0, courses_published=0,
                      blocked_courses=sum(r["workflow_state"] == "Blocked" for r in rows),
                      verified_official_source=sum(r["verification_status"] == "verified-official-source" for r in rows),
                      vendor_docs_partial=sum(r["verification_status"] == "vendor-docs-partial" for r in rows)),
        batches=[dict(batch=b, courses=[dict(course_id=p["course_id"], title=p["title"], evidence=p["evidence"], package=p["path"])
                                        for p in packages if p["batch"] == b]) for b in (1, 2)],
        workflow_states=dict(collections.Counter(r["workflow_state"] for r in rows)),
        next_batch_proposal=dict(
            needs_source_access=["MST-0001", "MST-0002", "MST-0003", "MST-0016", "MST-0017", "MST-0091", "MST-0094", "MST-0022", "MST-0341", "MST-0391"],
            verifiable_now_via_microsoft_learn=["AB-900", "AI-200", "AI-300", "SC-200", "AZ-305"],
            note="Section 18 priorities (ACCA, CPA, CIA, CISA, CMA, NCLEX, IELTS) need the issuer syllabi; their sites were blocked by the egress proxy this run."),
        outputs=dict(catalogue="docs/catalogue/catalog/", research="docs/catalogue/research/", courses="docs/catalogue/courses/",
                     operations="docs/catalogue/operations/", xlsx_written=xlsx))
    os.makedirs(os.path.join(OUT, "operations"), exist_ok=True)
    with open(os.path.join(OUT, "operations", "production_manifest.json"), "w") as f:
        json.dump(m, f, indent=1)


def run(legacy_rows):
    rows, xw, reg, _app = build(legacy_rows)
    apply_dedup(rows, xw)
    pathways = remap_pathways(rows, xw, legacy_rows)
    sources = {s[0]: s for s in SOURCES}
    packages = []
    for r in rows:
        if r["_batch1"] or r["_batch2"]:
            packages.append(write_package(r, sources))
    packages.sort(key=lambda p: (p["batch"], p["course_id"]))
    xlsx = write_all(rows, xw, legacy_rows, pathways, packages)
    meta = dict(xlsx_written=xlsx, packages=[dict(course_id=p["course_id"], title=p["title"], batch=p["batch"], evidence=p["evidence"],
                                                  bank=p["bank"], path=p["path"]) for p in packages])
    with open(os.path.join(OUT, ".build-meta.json"), "w") as f:
        json.dump(meta, f, indent=1)
    return rows, packages
