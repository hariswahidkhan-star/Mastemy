"""Registry of externally authored full-curriculum-spec course packages (all waves).

Across successive integration waves, parallel agents hand-wrote course packages
into ``docs/catalogue/courses/<MST-ID>/0.1.0/`` and listed them in the wave
manifests under ``docs/catalogue/wave-manifests/wave<N>-cat*.csv`` (wave 1,
wave 2, and any future wave). The central generator (``master_catalogue.py``)
does not otherwise know about them, so this module is the single source of truth
that lets the generator:

* mark those rows as ``full-curriculum-spec`` (without re-writing the
  hand-authored package files), and
* register every ``SRC-*`` source id the agents referenced so references
  resolve in the source register.

Everything here is derived from files on disk (the manifests and each package's
``course_metadata.json``); nothing is hard-coded per course. The module globs
*every* ``wave<N>-cat*.csv`` manifest, so new waves are picked up automatically.
Manifests use differing header schemas (the course id is in ``mst_id`` or
``course_id``; some carry ``source_url``/``note`` columns) — the id and the
verification token are read schema-tolerantly, and each package's own
``course_metadata.json`` value wins when it differs (the difference is reported
by ``reconciliation_notes``). The "promote without regenerate" behaviour is
identical for every wave: these IDs are never added to the write_package set.
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

    Globs every ``wave<N>-cat*.csv`` (wave1, wave2, and any future waveN).
    Manifests have differing columns; the id is in ``mst_id`` or ``course_id``.
    """
    for f in sorted(glob.glob(os.path.join(MANIFEST_DIR, "wave*-cat*.csv"))):
        with open(f, newline="", encoding="utf-8") as fh:
            for row in csv.DictReader(fh):
                mid = (row.get("mst_id") or row.get("course_id") or "").strip()
                if mid:
                    yield mid, normalise_verification(row.get("verification_status", ""))


def _package_metadata(mid):
    p = os.path.join(OUT, "courses", mid, VERSION, "course_metadata.json")
    with open(p, encoding="utf-8") as fh:
        return json.load(fh)


def _split_minutes(hours):
    """Mirror of master_catalogue.split_minutes (T=hours*60; I=round-half-up(0.8T); A=T-I)."""
    T = int(round(hours * 60))
    I = int(0.8 * T + 0.5)
    return T, I, T - I


def _content_hours(mid, meta_hours):
    """Planned hours implied by the hand-authored package content.

    Some packages declare a rounded ``planned_hours`` that does not match the
    minutes actually laid out in ``syllabus.csv`` (instruction) and
    ``assessments/forms.json`` (assessment). The package content is the source
    of truth for its own time budget, so derive the planned hours from it when
    it is a self-consistent 80/20 split that differs from the declared value.
    Returns ``(hours, note)`` where ``note`` is empty unless a reconciliation
    was applied. Falls back to the declared integer hours on any mismatch so
    wave packages that are already consistent are untouched.
    """
    base = os.path.join(OUT, "courses", mid, VERSION)
    syl_p = os.path.join(base, "syllabus.csv")
    forms_p = os.path.join(base, "assessments", "forms.json")
    if not (os.path.exists(syl_p) and os.path.exists(forms_p)):
        return meta_hours, ""
    try:
        with open(syl_p, newline="", encoding="utf-8") as fh:
            lesson_sum = sum(int(x["instruction_minutes"]) for x in csv.DictReader(fh))
        with open(forms_p, encoding="utf-8") as fh:
            forms_total = int(json.load(fh)["time_budget_minutes"]["total"])
    except (KeyError, ValueError, TypeError):
        return meta_hours, ""
    content_T = lesson_sum + forms_total
    # The clean 80/20 equality check below is the real guard: trust any positive
    # content budget whose minutes reproduce exactly under the default split
    # (exam-prep packages legitimately land on 15-minute, not 30-minute, totals).
    if content_T <= 0:
        return meta_hours, ""
    hours = content_T / 60.0
    T, I, A = _split_minutes(hours)
    # Only trust the content-derived value when the package is a clean 80/20
    # split (so the default catalogue arithmetic reproduces it exactly).
    if (T, I, A) != (content_T, lesson_sum, forms_total):
        return meta_hours, ""
    if abs(hours - meta_hours) < 1e-9:
        return meta_hours, ""
    hours = int(hours) if float(hours).is_integer() else hours
    note = (f"planned_hours {meta_hours} (metadata) reconciled to {hours} from package "
            f"content (instruction {lesson_sum} min + assessment {forms_total} min = {content_T} min)")
    return hours, note


def _source_refs():
    """Collect the agents' ``source_reference`` objects by SRC id."""
    refs = {}
    for mid in manifest_ids():
        meta = _package_metadata(mid)
        cands = []
        sr = meta.get("source_reference")
        if isinstance(sr, dict):
            cands.append(sr)
        # Bare URL-string lists (e.g. ``verification_sources: ["https://..."]``)
        # carry no source_id of their own, so associate them with the package's
        # single declared source id when there is exactly one.
        url_only = []
        for key in ("verification_sources", "sources"):
            v = meta.get(key)
            if isinstance(v, list):
                cands += [x for x in v if isinstance(x, dict)]
                url_only += [x for x in v if isinstance(x, str) and x.strip()]
        sid_list = [s.strip() for s in (meta.get("source_ids") or "").split("|") if s.strip()]
        if url_only and len(sid_list) == 1:
            cands.append({"source_id": sid_list[0], "source_urls": url_only})
        for c in cands:
            sid = c.get("source_id")
            if sid and sid not in refs:
                refs[sid] = c
    return refs


def manifest_ids():
    """Ordered, de-duplicated list of every wave's MST-IDs (all manifests)."""
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
    # Microsoft Learn docs are fetchable this session via the Microsoft Learn
    # MCP: both the legacy ``SRC-MS-*`` exam/docs ids and the ``SRC-MSLEARN-*``
    # vendor-docs ids point at learn.microsoft.com pages read this session, so
    # both count as official-method (official-fetch).
    if sid.startswith("SRC-MS-") or sid.startswith("SRC-MSLEARN-"):
        return True
    vs = normalise_verification((ref or {}).get("verification_status", ""))
    return vs in ("verified-official-source", "vendor-docs-partial")


def wave_sources(existing_ids, existing_official):
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


def load_waves():
    """Per-course overrides for every externally authored spec (all waves).

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

        planned_hours, hours_note = _content_hours(mid, int(meta["planned_hours"]))
        if hours_note:
            notes.append(hours_note)

        out[mid] = dict(
            verification_status=vs,
            verified_on=von,
            source_ids=src_ids,
            planned_hours=planned_hours,
            course_class=meta["course_class"],
            priority_batch=int(meta.get("priority_batch") or 3),
            manifest_verification=man_vs,
            reconciliation_notes="; ".join(notes),
        )
    return out
