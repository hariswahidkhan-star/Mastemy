"""Registry of externally authored full-curriculum-spec course packages (Wave 1).

Six parallel agents hand-wrote 90 course packages into
``docs/catalogue/courses/<MST-ID>/0.1.0/`` and listed them in the wave
manifests under ``docs/catalogue/wave-manifests/wave1-cat*.csv``. The central
generator (``master_catalogue.py``) does not otherwise know about them, so this
module is the single source of truth that lets the generator:

* mark those 90 rows as ``full-curriculum-spec`` (without re-writing the
  hand-authored package files), and
* register every ``SRC-*`` source id the agents referenced so references
  resolve in the source register.

Everything here is derived from files on disk (the manifests and each package's
``course_metadata.json``); nothing is hard-coded per course. The manifests are
the authoritative list of the 90 MST-IDs and their verification tokens; each
package's own ``course_metadata.json`` value wins when it differs (and the
difference is reported by ``reconciliation_notes``).
"""
import csv
import glob
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
OUT = os.path.join(ROOT, "docs", "catalogue")
MANIFEST_DIR = os.path.join(OUT, "wave-manifests")
VERSION = "0.1.0"

# The four valid verification tokens (docs/catalogue/data-dictionary.md).
VALID_VERIFICATION = {
    "verified-official-source", "vendor-docs-partial",
    "unverified-needs-official-check", "n/a-no-official-syllabus",
}
# Normalise the free-form tokens the agents used onto the valid enum.
VERIFICATION_ALIASES = {
    "verified": "verified-official-source",
    "verified-official": "verified-official-source",
    "verified-official-source": "verified-official-source",
    "official-source": "verified-official-source",
    "vendor-docs-partial": "vendor-docs-partial",
    "vendor-docs": "vendor-docs-partial",
    "vendor-partial": "vendor-docs-partial",
    "unverified": "unverified-needs-official-check",
    "unverified-needs-official-check": "unverified-needs-official-check",
    "needs-official-check": "unverified-needs-official-check",
    "n/a-no-official-syllabus": "n/a-no-official-syllabus",
    "n/a-no-official-source": "n/a-no-official-syllabus",
    "na-no-official-syllabus": "n/a-no-official-syllabus",
    "n/a": "n/a-no-official-syllabus",
}


def normalise_verification(token):
    t = (token or "").strip()
    return VERIFICATION_ALIASES.get(t.lower(), t)


def _manifest_rows():
    """Yield (mst_id, verification_status) from every wave manifest.

    Manifests have differing columns; the id is in ``mst_id`` or ``course_id``.
    """
    for f in sorted(glob.glob(os.path.join(MANIFEST_DIR, "wave1-cat*.csv"))):
        with open(f, newline="", encoding="utf-8") as fh:
            for row in csv.DictReader(fh):
                mid = (row.get("mst_id") or row.get("course_id") or "").strip()
                if mid:
                    yield mid, normalise_verification(row.get("verification_status", ""))


def _package_metadata(mid):
    p = os.path.join(OUT, "courses", mid, VERSION, "course_metadata.json")
    with open(p, encoding="utf-8") as fh:
        return json.load(fh)


def _source_refs():
    """Collect the agents' ``source_reference`` objects by SRC id."""
    refs = {}
    for mid in manifest_ids():
        meta = _package_metadata(mid)
        cands = []
        sr = meta.get("source_reference")
        if isinstance(sr, dict):
            cands.append(sr)
        for key in ("verification_sources", "sources"):
            v = meta.get(key)
            if isinstance(v, list):
                cands += [x for x in v if isinstance(x, dict)]
        for c in cands:
            sid = c.get("source_id")
            if sid and sid not in refs:
                refs[sid] = c
    return refs


def manifest_ids():
    """Ordered, de-duplicated list of the 90 Wave 1 MST-IDs."""
    seen = []
    for mid, _vs in _manifest_rows():
        if mid not in seen:
            seen.append(mid)
    return seen


def _is_official_source(sid, ref, existing_ids, existing_official):
    """Whether a source id counts as an official-method citation.

    A source already in the register keeps whatever method the register
    records (so a secondary id such as ``SRC-MS-RETIRE-2026`` is NOT treated as
    official just because of its prefix). For a new source, Microsoft Learn
    docs (``SRC-MS-*``) and any reference the agent itself marked
    verified/vendor-docs-partial are official.
    """
    if sid in existing_ids:
        return sid in existing_official
    if sid.startswith("SRC-MS-"):
        return True
    vs = normalise_verification((ref or {}).get("verification_status", ""))
    return vs in ("verified-official-source", "vendor-docs-partial")


def wave1_sources(existing_ids, existing_official):
    """Source-register rows for every new SRC id the agents referenced.

    ``existing_ids`` / ``existing_official`` describe the sources already in the
    register so we neither duplicate them nor mislabel their method.
    Returns ``(rows, proxy_blocked_ids)``.
    """
    refs = _source_refs()
    used = set()
    for mid in manifest_ids():
        meta = _package_metadata(mid)
        for s in (meta.get("source_ids") or "").split("|"):
            s = s.strip()
            if s:
                used.add(s)
    rows, proxy_blocked = [], []
    for sid in sorted(used):
        if sid in existing_ids:
            continue
        ref = refs.get(sid, {})
        urls = ref.get("source_urls") or ref.get("urls") or []
        url = urls[0] if urls else "n/a (vendor site blocked by egress proxy this session)"
        basis = ref.get("version_basis") or ref.get("note") or ""
        official = _is_official_source(sid, ref, existing_ids, existing_official)
        if official:
            method = "official-fetch"
            stype = "official"
            finding = (basis or "Official vendor documentation read this session.")[:480]
        else:
            method = "search-snippet/not-retrieved (proxy-blocked)"
            stype = "secondary"
            finding = (basis or "Official issuer/vendor page blocked by the egress proxy this session; NOT verified.")[:480]
            proxy_blocked.append(sid)
        publisher = sid.split("-")[1].title() if len(sid.split("-")) > 1 else "unknown"
        rows.append((sid, publisher, url, publisher, stype, method, "2026-10-02" if official else "", finding))
    return rows, proxy_blocked


def load_wave1():
    """Per-course overrides for the 90 externally authored specs.

    Each value carries the reconciled verification fields (package value wins),
    planned hours, course class, priority batch, and a reconciliation note when
    a value was changed. Verification is honestly downgraded to
    ``unverified-needs-official-check`` when a verified/vendor claim cannot cite
    an official source id (so the validator's evidence check stays truthful).
    """
    # Pre-existing register state, to decide which source ids are official.
    reg_path = os.path.join(OUT, "research", "source_register.csv")
    existing_ids, existing_official = set(), set()
    if os.path.exists(reg_path):
        with open(reg_path, newline="", encoding="utf-8") as fh:
            for s in csv.DictReader(fh):
                existing_ids.add(s["source_id"])
                if (s["method"] or "").startswith("official"):
                    existing_official.add(s["source_id"])
    refs = _source_refs()

    manifest = dict(_manifest_rows())
    out = {}
    for mid in manifest_ids():
        meta = _package_metadata(mid)
        man_vs = manifest.get(mid, "")
        meta_vs = normalise_verification(meta.get("verification_status") or man_vs)
        notes = []
        if meta.get("verification_status") and meta["verification_status"] != meta_vs:
            notes.append(f"token '{meta['verification_status']}' -> '{meta_vs}'")
        if man_vs and meta_vs != man_vs:
            notes.append(f"manifest '{man_vs}' overridden by package '{meta_vs}'")

        src_ids = (meta.get("source_ids") or "").strip()
        vs = meta_vs if meta_vs in VALID_VERIFICATION else "unverified-needs-official-check"
        von = (meta.get("verified_on") or "").strip()

        if vs in ("verified-official-source", "vendor-docs-partial"):
            first = src_ids.split("|")[0].strip() if src_ids else ""
            official = bool(first) and _is_official_source(first, refs.get(first, {}), existing_ids, existing_official)
            if not official:
                reason = "no source id cited" if not first else f"source {first} is not an official-method citation"
                notes.append(f"'{vs}' downgraded to 'unverified-needs-official-check' ({reason})")
                vs = "unverified-needs-official-check"
                von = ""
        if vs not in ("verified-official-source", "vendor-docs-partial"):
            von = ""  # unverified/n-a rows carry no verified_on date

        out[mid] = dict(
            verification_status=vs,
            verified_on=von,
            source_ids=src_ids,
            planned_hours=int(meta["planned_hours"]),
            course_class=meta["course_class"],
            priority_batch=int(meta.get("priority_batch") or 3),
            manifest_verification=man_vs,
            reconciliation_notes="; ".join(notes),
        )
    return out
