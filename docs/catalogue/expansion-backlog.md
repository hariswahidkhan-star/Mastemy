# Course Expansion Backlog

Authoritative, tracked list of every requested course domain so nothing is missed. New courses append at
`MST-1879+` with explicit IDs (existing 1–1878 are never renumbered). Each domain gets a disjoint MST-ID range
and a category number (existing categories end at 32; new ones start at 33). Every course is authored as a full
8-file package under `docs/catalogue/courses/<MST-ID>/0.1.0/`, promoted via a `wave-manifests/wave15*.csv`
manifest, then the catalogue is regenerated and the validator must pass.

Honesty rules (unchanged): never invent official exam codes, weightings, LOS or partnerships. New general-skill
courses are `n/a-no-official-syllabus`; anything tied to a real exam/standard with no reachable official source
is `unverified-needs-official-check` with the code recorded only as a design assumption. No video IDs.

Status: `planned` → `authoring` (agent assigned) → `integrated` (regenerated + validator green).

## Status log
- Wave A (AI Governance + Blockchain, Trading, Bio, Chem, Physics, AI-Agents, History): **INTEGRATED** — catalogue 1878 → 1957 (24/24 validator PASS).
- Wave B: launched (9 parallel domain agents).

## Wave A — INTEGRATED ✓ (first parallel wave)
| # | Domain | Category no | MST-ID range | Status |
|---|--------|-------------|--------------|--------|
| A1 | AI Governance & Frameworks (NIST AI RMF, ISO/IEC 42001, EU AI Act, responsible AI) | 33 | 1879–1908 | authoring |
| A2 | Blockchain & Web3 (fundamentals, smart contracts, Solidity, DeFi, security) | 34 | 1909–1938 | authoring |
| A3 | Trading: Forex, Equity, Technical & Fundamental analysis | 35 | 1939–1973 | authoring |
| A4 | Biology + AI in Biology (incl. bioinformatics, AI-for-bio) | 36 | 1974–2003 | authoring |
| A5 | Chemistry + AI in Chemistry | 37 | 2004–2028 | authoring |
| A6 | Physics + AI in Physics | 38 | 2029–2048 | authoring |
| A7 | Building AI Agents & AI Engineering (agents, RAG, TTS/STT, prompt, evals, LLM apps) | 39 | 2049–2098 | authoring |
| A8 | Country & World History | 40 | 2099–2128 | authoring |

## Wave B — planned (next)
| # | Domain | Category no | MST-ID range |
|---|--------|-------------|--------------|
| B1 | Medical Science & Clinical foundations | 41 | 2129–2168 |
| B2 | Defense & Space systems | 42 | 2169–2198 |
| B3 | Construction & Civil | 43 | 2199–2228 |
| B4 | Design & Engineering (mechanical, electrical, CAD, product) | 44 | 2229–2268 |
| B5 | Major web platforms (Shopify, WordPress, Salesforce, HubSpot, Stripe, Notion, Airtable, Figma, etc.) | 45 | 2269–2318 |
| B6 | Hardware & Software (electronics, embedded, OS, systems, computer architecture) | 46 | 2319–2358 |
| B7 | Energy & Energy-saving (renewables, efficiency, grid, storage) | 47 | 2359–2393 |
| B8 | Vehicles & Automotive (incl. EV, autonomous) | 48 | 2394–2423 |
| B9 | Art & Creative (fine art, digital art, music, film, AI art) | 49 | 2424–2458 |

## Wave C — planned
| # | Domain | Category no | MST-ID range |
|---|--------|-------------|--------------|
| C1 | Strategy for CEOs / executive leadership | 50 | 2459–2483 |
| C2 | Finance for non-finance professionals | 51 | 2484–2508 |
| C3 | IFRS / IAS standard-by-standard | 52 | 2509–2548 |
| C4 | All major computer languages — Basic / Intermediate / Advanced ladders | 53 | 2549–2648 |
| C5 | Excel + AI (Copilot) — Basic → Advanced | 54 | 2649–2673 |
| C6 | Futuristic AI across every field + AI foundations → futuristic AI | 55 | 2674–2748 |
| C7 | Quantum & post-quantum; spatial/robotics/embodied; AI-in-every-industry | 56 | 2749–2808 |

## Wave D — planned (separate learner area)
| # | Domain | Category no | MST-ID range | Notes |
|---|--------|-------------|--------------|-------|
| D1 | Mastemy Kids — Maths, Science, Physics, Chemistry, Biology, Earth, Reading, Coding-for-Kids, AI-for-Kids, across age bands (5–7, 8–10, 11–13, 14–17) | 60 | 2809–2958 | **Free/open**, separate app area |

## Cross-cutting workstreams
- **Gap-finder:** a dedicated audit pass to surface requested topics or obvious adjacencies not yet listed here, and append them as new rows.
- **"AI everywhere":** every applicable existing and new course gets an AI-usage angle (an "AI in <subject>" module or lesson) where it adds value — tracked as an enhancement pass over the catalogue.
- **Thin-course enhancement:** the 70 very-thin + ~52 templated courses from the audit, deepened.
- **Practice labs:** sandbox feature (Slice 1 SQL shipped); add engines + author labs into applicable courses.

## Integration rule
Agents author only their disjoint files (package dirs in their range, a `wave15-<cat>.csv` manifest, and an
appendix fragment of their rows). Central integration concatenates appendix rows, regenerates the catalogue
(`python3 scripts/catalogue/build_catalogue.py`), and runs `python3 scripts/catalogue/validate_catalogue.py`
until green. IDs are never reused; a domain that needs more than its range extends into the next free block,
recorded here.
