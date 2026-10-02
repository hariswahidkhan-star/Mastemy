"""Reconciliation helpers: legacy (v1, 1,076 rows) -> Appendix A MST-NNNN IDs,
and semantic-duplicate heuristics. Pure functions; no I/O except overrides.

Similarity is an IDF-weighted token Jaccard over normalised titles. It is a
screening heuristic only: every automatic decision is recorded with its score
and method, and manual decisions in crosswalk_overrides.csv win.
"""
import csv
import collections
import math
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))

STOP = set(("and for the of a an in with to on by using from exam prep preparation certification certified "
            "knowledge complete foundations foundation fundamentals essentials course skills track current version "
            "independent comprehensive application applications development basics overview introduction level "
            "practitioner mcq assessable").split())
SYN = {"modelling": "modeling", "optimisation": "optimization", "organisation": "organization",
       "visualisation": "visualization", "centre": "center", "defence": "defense", "programme": "program",
       "behavioural": "behavioral", "colour": "color", "labelling": "labeling", "analyse": "analyze"}
# Tool/brand tokens: a title that adds one of these is a different product scope.
BRANDS = {"chatgpt", "openai", "claude", "anthropic", "cursor", "copilot", "gemini", "codex", "dotnet",
          "java", "spring", "python", "react", "angular", "vue", "aws", "amazon", "azure", "google", "excel",
          "langchain", "llamaindex", "n8n", "zapier", "make", "salesforce", "sap", "fabric", "power", "bedrock",
          "github", "csharp", "typescript", "javascript", "kotlin", "node"}


LEVEL_WORDS = {"foundation", "practitioner", "associate", "professional", "level", "specialist", "expert",
               "advanced", "core", "part", "i", "ii", "iii", "1", "2", "3", "step"}


def code_key(code):
    return re.sub(r"[^a-z0-9]", "", code.lower())


def toks_cert(t):
    """Token set for certification-vs-certification comparison: keeps level words
    (Foundation vs Practitioner, Level I vs II) and joined exam codes (AZ-400 -> az400)."""
    codes = {code_key(m) for m in re.findall(r"\b[A-Z0-9]{1,5}-[A-Z0-9]{2,5}\b", t)}
    w = set(re.findall(r"[a-z0-9+]+", t.lower()))
    keep = {x for x in w if x in LEVEL_WORDS}
    return frozenset(toks(t) | keep | codes)


def toks(t):
    t = t.replace("C#", " csharp ").replace(".NET", " dotnet ").replace("C++", " cpp ").replace("F#", " fsharp ")
    w = [SYN.get(x, x) for x in re.findall(r"[a-z0-9]+", t.lower())]
    w = [x[:-1] if len(x) > 4 and x.endswith("s") and not x.endswith("ss") else x for x in w]
    return frozenset(x for x in w if x not in STOP)


class Sim:
    def __init__(self, titles):
        docs = [toks(t) for t in titles]
        self.df = collections.Counter(x for d in docs for x in d)
        self.n = len(docs)

    def idf(self, x):
        return math.log(self.n / (1 + self.df[x])) + 1

    def __call__(self, a, b, kind_mismatch=False):
        u = sum(self.idf(x) for x in a | b)
        if not u:
            return 0.0
        s = sum(self.idf(x) for x in a & b) / u
        # brand added on one side only -> different product scope
        if (a ^ b) & BRANDS and not (a & b & BRANDS):
            s *= 0.6
        if kind_mismatch:  # certification-prep vs skills course
            s *= 0.6
        return s


def load_overrides():
    """crosswalk_overrides.csv: legacy_id, action(map|addition|merge|retire), mst_id, note"""
    p = os.path.join(HERE, "input", "crosswalk_overrides.csv")
    out = {}
    if os.path.exists(p):
        for r in csv.DictReader(open(p)):
            out[r["legacy_id"]] = r
    return out


CERT_CATEGORIES = {"01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "31", "32"}
MAP_T, MERGE_T, CERT_MAP_T = 0.45, 0.55, 0.34


def crosswalk(appendix, legacy):
    """Return {legacy_id: dict(action, mst_id, score, method, note)}.

    action: mapped | merged-duplicate | addition. One-to-one for 'mapped'."""
    sim = Sim([a["title"] for a in appendix] + [l["title"] for l in legacy])
    at = [toks(a["title"]) for a in appendix]
    lt = [toks(l["title"] + " " + l["official_exam_code"]) | toks(l["title"]) for l in legacy]
    at_c = [toks_cert(a["title"]) for a in appendix]
    lt_c = [toks_cert(l["title"]) | {code_key(l["official_exam_code"])} - {""} for l in legacy]
    is_cert_a = [a["category_no"] in CERT_CATEGORIES for a in appendix]
    is_cert_l = [l["course_type"] == "certification-prep" for l in legacy]
    ov = load_overrides()
    forced = {r["mst_id"] for r in ov.values() if r["action"] == "map"}
    pairs, best = [], {}
    for j, l in enumerate(legacy):
        for i, a in enumerate(at):
            if is_cert_l[j] and is_cert_a[i]:
                s = sim(lt_c[j], at_c[i])
                if s >= CERT_MAP_T:
                    s = max(s, MAP_T)  # certificate pairs: lower bar, level words already kept
            else:
                s = sim(lt[j], a, is_cert_l[j] != is_cert_a[i])
            if s > best.get(j, (0, -1))[0]:
                best[j] = (s, i)
            if s >= MAP_T:
                pairs.append((s, j, i))
    pairs.sort(key=lambda p: (-p[0], p[1], p[2]))
    idx = {a["mst_id"]: i for i, a in enumerate(appendix)}
    used_l, used_a, res = set(), {idx[m] for m in forced}, {}
    for lid, r in ov.items():
        res[lid] = dict(action={"map": "mapped", "merge": "merged-duplicate", "addition": "addition",
                                "retire": "retired-excluded"}[r["action"]],
                        mst_id=r["mst_id"], score="", method="manual-override", note=r["note"])
    for s, j, i in pairs:
        lid = legacy[j]["course_id"]
        if lid in res or j in used_l or i in used_a:
            continue
        used_l.add(j)
        used_a.add(i)
        res[lid] = dict(action="mapped", mst_id=appendix[i]["mst_id"], score=round(s, 3),
                        method="title-similarity", note="")
    for j, l in enumerate(legacy):
        lid = l["course_id"]
        if lid in res:
            continue
        s, i = best.get(j, (0, -1))
        if s >= MERGE_T:
            res[lid] = dict(action="merged-duplicate", mst_id=appendix[i]["mst_id"], score=round(s, 3),
                            method="title-similarity", note="scope already covered by Appendix A row")
        else:
            res[lid] = dict(action="addition", mst_id="", score=round(s, 3), method="no-match",
                            note=(f"closest Appendix A row {appendix[i]['mst_id']}" if i >= 0 else ""))
    return res, sim
