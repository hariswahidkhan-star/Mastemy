# Nginx and Web Servers

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1589` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-PRG-SK-NWS-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Nginx and Web Servers (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what a web server does and how Nginx handles requests
2. Describe Nginx configuration structure and serving static content
3. Explain using Nginx as a reverse proxy and load balancer
4. Describe enabling TLS, caching and performance features
5. Explain operating, logging and hardening an Nginx server

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Web server fundamentals (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trace an HTTP request through a web server; (2) Explain why an event-driven model handles many connections
- Common misconception addressed: Believing a web server must spawn one thread per connection
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | HTTP request handling and the client-server model | 96 | 8 |
| M01L02 | Nginx architecture and the event-driven model | 96 | 8 |

### M02 Configuration and serving content (MASTEMY-DESIGN 20%)

- Worked applications: (1) Write a server block that serves a static site; (2) Route two paths to different locations
- Common misconception addressed: Confusing the order and specificity of location matching
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The config file, contexts and directives | 96 | 8 |
| M02L02 | Server blocks, locations and static files | 96 | 8 |

### M03 Reverse proxy and load balancing (MASTEMY-DESIGN 20%)

- Worked applications: (1) Proxy requests to an application server; (2) Balance traffic across three upstream servers
- Common misconception addressed: Assuming a reverse proxy and a forward proxy are the same thing
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Reverse proxy fundamentals | 96 | 8 |
| M03L02 | Load balancing methods and upstreams | 96 | 8 |

### M04 TLS, caching and performance (MASTEMY-DESIGN 20%)

- Worked applications: (1) Configure TLS termination for a site; (2) Add caching headers and compression for static assets
- Common misconception addressed: Believing enabling gzip is always beneficial for every content type
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | TLS termination and HTTPS configuration | 96 | 8 |
| M04L02 | Caching, compression and keep-alive | 96 | 8 |

### M05 Operations, logging and security (MASTEMY-DESIGN 20%)

- Worked applications: (1) Diagnose a 502 using the error log; (2) Add rate limiting to protect an endpoint
- Common misconception addressed: Ignoring logs when diagnosing server errors
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Access and error logs and troubleshooting | 96 | 8 |
| M05L02 | Rate limiting, security headers and hardening | 96 | 8 |

## Integrative case

A team must put a web application behind Nginx. Serve the static assets, reverse-proxy the app and load-balance across several instances, terminate TLS, add caching and compression, then set up logging, rate limiting and security headers. Diagnose a 502 from the logs and defend the configuration at an ops review.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1589-final-protected | 35 | 35 | yes |
| MST-1589-final-alternate | 35 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Web server fundamentals | 7 |
| Configuration and serving content | 7 |
| Reverse proxy and load balancing | 7 |
| TLS, caching and performance | 7 |
| Operations, logging and security | 7 |

Minimum reviewed item bank: 398 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1589-Q0001** (single-answer, Select ONE) Why can Nginx's event-driven model serve many concurrent connections efficiently?

- A. It handles many connections per worker with asynchronous events instead of one thread each **(key)**  
  _Rationale:_ Correct: an event loop multiplexes many connections per worker, avoiding per-connection thread overhead.
- B. It opens a new operating-system process for every single request  
  _Rationale:_ That is the model Nginx avoids; it would not scale well.
- C. It refuses connections beyond a small fixed number  
  _Rationale:_ The event model exists to handle large numbers, not to cap them low.
- D. It serves only one client at a time  
  _Rationale:_ It serves many clients concurrently.

**MST-1589-Q0002** (multiple-answer, Select TWO) Which TWO are valid roles for Nginx in front of an application? (Select TWO.)

- A. Terminating TLS and forwarding plain requests to the app **(key)**  
  _Rationale:_ Correct: TLS termination at the proxy is a standard Nginx role.
- B. Load-balancing requests across several upstream app servers **(key)**  
  _Rationale:_ Correct: distributing traffic across upstreams is a core reverse-proxy role.
- C. Replacing the application's database  
  _Rationale:_ Nginx is a web server/proxy, not a database.
- D. Compiling the application source code  
  _Rationale:_ Nginx does not build application code.

**MST-1589-Q0003** (single-answer, Select ONE) Clients get intermittent 502 Bad Gateway responses from an Nginx reverse proxy. What is the best first diagnostic step?

- A. Check the Nginx error log and the upstream server's health **(key)**  
  _Rationale:_ Correct: a 502 means the upstream failed to respond properly; the error log and upstream status reveal why.
- B. Delete the Nginx configuration file  
  _Rationale:_ Deleting the config removes the proxy rather than diagnosing the fault.
- C. Assume the client's browser is broken  
  _Rationale:_ A systemic 502 points at the proxy or upstream, not individual browsers.
- D. Disable logging to reduce noise  
  _Rationale:_ Disabling logs removes the evidence needed to diagnose the error.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
