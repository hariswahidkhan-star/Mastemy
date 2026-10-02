# Taxonomy, discovery, certification directory and production backlog (wave 3)

Module: `src/Mastemy.Api/Modules/Taxonomy` (tables prefixed `Taxonomy_`). Catalog search changes live in
`Modules/Catalog/CatalogQueryService.cs` / `CatalogControllers.cs`. Errors are RFC 7807 with `code`.

## Configuration (`Taxonomy:*`)
| Key | Default | Meaning |
|---|---|---|
| `CertificationFreshDays` | 180 | Max age of a certification's `LastCheckedAt` for verification and public display |
| `AiAcademySlug` | `ai-academy` | Category whose courses (incl. descendants) form the homepage "AI Skills" row |
| `DailyJobEnabled` | true | Background job: bestseller recompute + stale-certification flagging |
| `DailyJobIntervalHours` | 24 | Job interval |
| `BestsellerWindowDays` | 30 | Bestseller window |
| `BestsellerMinBuyers` | 10 | Bestseller minimum distinct buyers |
| `RoadmapPath` | (unset) | Path to `course-roadmap.md` for the import endpoint when no markdown is posted |

## Public (anonymous)
| Method | Route | Notes |
|---|---|---|
| GET | `/api/courses` | Existing search plus new query params: `instructor` (user id); `duration` (`short` <2h, `medium` 2–6h, `long` 6–17h, `extended` ≥17h of published video); `updatedWithinDays` (1–3650; publish time of the current snapshot); `minPrice`/`maxPrice` (cheapest active approved package; a price filter excludes courses that have no package; currencies are not converted); `minRating` (1–5, non-hidden reviews only); `skill` (code; includes child skills; snapshot-safe links); `certification` (slug or exam code; publicly visible certifications only). The response adds `didYouMean` (string or null). All filters are SQL subqueries, so paging stays in SQL. |
| GET | `/api/search/suggestions?q=` | At least 2 chars. Up to 8 `{kind: course|skill|certification, text, key}`. Matches a prefix of the title or of any word in the title (live snapshot titles), a skill name or code, or a public certification title or exam code. |
| GET | `/api/home` | `{featured: Collection[], new, recentlyUpdated, aiSkills, certificationPreparation: CourseCard[], beginnerPathways: PathwaySummary[], bestselling: {course, distinctBuyers, bestsellerLabel}[], bestsellerRule}`. Featured = active Editorial collections without a category. New = most recently first-published. Recently Updated = courses whose current snapshot version is > 1, ordered by snapshot publish time. Certification Preparation = live courses linked to a publicly visible certification. Bestselling contains only rule-eligible courses. |
| GET | `/api/skills` | Active skills. |
| GET | `/api/courses/{slug}/taxonomy` | `{skills, certifications}` of a live course as of its current snapshot. 404 when not live. |
| GET | `/api/certifications?q=&issuer=&kind=` | Public directory. Shows only `Verified`, `PublishedPreparation` and `InformationOnly` entries that have a reviewer and a `lastCheckedAt` within 180 days. Each row includes `lastCheckedAt`. |
| GET | `/api/certifications/{slug}` | Detail: objectives (weights), official source, renewal info, `nonMcqDisclosure` (when the exam has non-MCQ tasks), `replacedBySlug`, live preparation courses. |
| GET | `/api/pathways?level=` / `/api/pathways/{slug}` | Published pathways with at least one live course. Non-live members are dropped. |
| POST | `/api/pathways/{slug}/enroll` | Requires auth. Enrolls the learner in every live course of the pathway (learning is free; premium packages are bought per course). Idempotent: `{pathwayId, enrolled, alreadyEnrolled, courseIds}`. |
| GET | `/api/collections/{slug}` | Active collection with its live courses. 404 when inactive or empty. |
| GET | `/api/academies/{slug}` | Academy category (`IsAcademy`), its pathways, collections with that `categoryId` (featured), and up to 24 newest live courses in the category tree. |
| GET | `/api/instructors?q=&page=&pageSize=` | Non-suspended users with the Instructor role who teach at least one live course: `{id, displayName, liveCourseCount, ratingAverage, ratingCount, headline}`. `headline` comes from `Account_Profiles` and is set only when the instructor turned on `publicInstructorProfile` (and the profile is not deleted); otherwise null. |
| GET | `/api/instructors/{id}` | Same fields plus `bio` and live course cards. 404 otherwise. |
| GET | `/api/notes-library?q=&page=&pageSize=` | Live courses ordered by title (pageSize 1–50): `{items: [{course: CourseCard, hasNotes, lessonsWithNotes}], total, page, pageSize}`. `hasNotes` is computed from the published snapshot payload (any lesson with non-empty free or premium notes); note text is never returned. |

## Studio (course authors and staff)
| Method | Route | Notes |
|---|---|---|
| GET | `/api/studio/courses/{id}/skills` | Working skill set (authors, reviewers, staff). |
| PUT | `/api/studio/courses/{id}/skills` | `{codes: string[]}` (≤30; each must exist and be active). Course editors and staff. Audited. **Snapshot-safe:** each link is stored with `AddedAt`/`RemovedAt`, and the public sees a link only if it was in effect when the current snapshot was published, so changes appear at the next publish. Legacy live courses without a snapshot show no skills. |
| GET | `/api/studio/courses/{courseId}/certifications/{certId}/coverage` | Coverage report (authors, reviewers, staff). |
| GET | `/api/studio/courses/{courseId}/certifications/{certId}/mappings` | Current mappings `{certificationId, courseId, linked, objectives: [{objectiveId, code, title, lessonIds, questionIds}]}` limited to this course's lessons/questions (authors, reviewers, staff; 403 otherwise). |
| PUT | `/api/studio/objectives/{objectiveId}/courses/{courseId}/lessons` | `{ids}` replaces the course's lessons mapped to the objective. The course must be linked to the certification first (409 `course_not_linked`). |
| PUT | `/api/studio/objectives/{objectiveId}/courses/{courseId}/questions` | Same, for the course's questions. |

Coverage report: `{certificationId, certificationTitle, courseId, objectiveCount, gapCount, coveredWeightPercent, objectives: [{objectiveId, code, title, weightPercent, lessonCount, activeQuestionCount, gap, gaps: ["no_lessons"|"no_active_questions"]}]}`. Only `Active` questions count.

## Admin
Skills (Staff): `GET/POST /api/admin/skills`, `PUT /api/admin/skills/{id}`. Codes must match `[A-Za-z0-9][A-Za-z0-9._-]{0,63}` and be unique; parent cycles are rejected.
`GET /api/admin/skills/unknown-question-codes` (Reviewer/Staff) is a soft check: it lists question skill codes (current and pending versions) that are not in the catalog, with counts. Question writes are not blocked.

Certification directory (Reviewer or Staff; every change is audited):
- `GET/POST /api/admin/certification-issuers`, `PUT /api/admin/certification-issuers/{id}`
- `GET /api/admin/certifications?state=&stale=true`. With `stale=true` this is the re-check queue: entries in a verified state that are stale or whose verification was cleared by an edit.
- `GET/POST /api/admin/certifications`, `PUT /api/admin/certifications/{id}`
- `POST /api/admin/certifications/{id}/state` `{state, notes}`
- `POST /api/admin/certifications/{id}/objectives`, `PUT|DELETE /api/admin/certification-objectives/{id}` (weights total ≤ 100)
- `PUT|DELETE /api/admin/certifications/{id}/courses/{courseId}` (course ↔ certification link)
- `GET /api/admin/certifications/{id}/coverage?courseId=`
- `GET /api/admin/certifications/{id}/mappings?courseId=` (same payload as the studio mappings read)
- `GET /api/admin/certifications/{id}/courses`: linked courses `[{courseId, slug, title, status, isLive, linkedAt}]`, live or not
- `POST /api/admin/certifications/flag-stale` (Staff; does the same as the daily job)

State rules:
- States: `ResearchCandidate, Verified, InProduction, PublishedPreparation, InformationOnly, Retired`. Kinds: `Examination, Qualification, CompletionAward, ProfessionalCertification`.
- Moving into `Verified`, `InProduction`, `PublishedPreparation` or `InformationOnly` requires:
  - an https official source URL;
  - a `lastCheckedAt` within 180 days;
  - an acting reviewer who is not `lastEditedBy`;
  - a non-MCQ disclosure when `hasNonMcqTasks` is set.
- `InProduction` and `PublishedPreparation` also need objectives. `PublishedPreparation` also needs at least one linked live course.
- If a check fails the call returns 409 `verification_failed`. On success the reviewer is recorded (`reviewerId`, `verifiedAt`).
- Any edit to the certification's fields or objectives clears `reviewerId`. The entry is then hidden publicly until someone other than the editor re-verifies it (by posting the state again).
- `Retired` can only be reopened as `ResearchCandidate`. `replacedById` links the replacement.
- Public visibility is checked at read time, so stale entries disappear immediately. The daily job sets `staleFlaggedAt` and writes an audit row.

Pathways, collections, bestsellers and backlog (Staff, audited):
- `GET/POST /api/admin/pathways`, `PUT|DELETE /api/admin/pathways/{id}`: `{slug, titleEn, titleAr, descriptionEn, descriptionAr, level, categoryId, isPublished, sortOrder, courseIds (ordered), skillCodes}`
- `GET/POST /api/admin/collections`, `PUT|DELETE /api/admin/collections/{id}`: `{slug, titleEn, titleAr, kind: Editorial|Topic, categoryId, activeFrom, activeTo, sortOrder, courseIds}`
- `GET /api/admin/bestsellers` (rows `{courseId, courseTitle, courseSlug, distinctBuyers, netRevenue, eligible, windowStart, computedAt}`), `POST /api/admin/bestsellers/recompute`
- `GET /api/admin/course-ideas?state=&q=`, `GET|PUT|DELETE /api/admin/course-ideas/{id}`, `POST /api/admin/course-ideas`, `POST /api/admin/course-ideas/{id}/state`, `POST /api/admin/course-ideas/import-roadmap` `{markdown?}`

## Bestseller rule
A course is a bestseller only when at least **10 distinct buyers** placed a qualifying order in the last 30 days. An order qualifies when:
- it is in `Paid` status with `PaidAt` inside the window. Refunded, partially refunded, cancelled and charged-back orders are no longer `Paid`, so they do not count;
- it has no refund in `Requested`, `Processing` or `Completed` state. A rejected refund does not remove the sale;
- the buyer is not an author of that course (owner, co-instructor or editor) and not a staff account (Admin, SuperAdmin, Finance, Support, Moderator, Reviewer).

Each buyer counts once per course. A daily job writes the result to `Taxonomy_BestsellerStats`, replacing the table on each run. The label is shown only for rows that meet the rule. Nothing is estimated or padded.

There is no chargeback entity yet. When Commerce adds one, a charged-back order must either leave `Paid` status or get a refund row, so that it is excluded here.

## Production backlog
`CourseIdea` fields: title (unique), audience, rationale, demandEvidence, group, state, ownerId, updateOwnerId, linkedCourseId, certificationIds, maintenanceCostNote, priorityScore (0–1000), roadmapRank. Ideas are never shown publicly.

Allowed transitions:
- Idea → Validating or Rejected
- Validating → Idea, Approved or Rejected
- Approved → Validating, InProduction or Rejected
- InProduction → Approved, Published or Rejected
- Rejected → Idea
- Published is final.

Checks on transitions:
- Approved needs an owner and an update owner (409 `owner_required`).
- InProduction needs a linked course (409 `course_required`).
- Published needs the linked course to be live (409 `course_not_live`).
- Ideas that are in production or published cannot be deleted.

Roadmap import parses the `| # | Candidate | Group | Brief |` table (100 rows) into `Idea` rows. It skips titles that already exist, so running it again is safe. If no markdown is posted, it reads `Taxonomy:RoadmapPath`, or else `docs/course-roadmap.md` above the content root. If neither exists it returns 503 `roadmap_unavailable`. The import never runs automatically.

## Search vocabulary cache
The "did you mean" vocabulary (live snapshot titles + active skill names) is cached in memory for 10 minutes. Publishing or
archiving a course invalidates the cache of the API instance that handled the request. In a multi-instance deployment
the other instances keep their copy until the 10-minute TTL expires, so a new title can take up to 10 minutes to appear in
their suggestions.

## Sitemap and robots (`/sitemap.xml`, `/robots.txt`; `Seo:PublicBaseUrl` required, else 503 `seo_not_configured`)
Every entry is listed in English and with `?lang=ar`, each carrying `en`/`ar`/`x-default` hreflang alternates.
- Static: `/`, `/courses`, `/free-lessons`, `/verify`, `/teach`, `/about`, `/help`, `/contact`, `/categories`, `/certifications`,
  `/pathways`, `/instructors`, `/packages`, `/practice`, `/notes-library`, `/business`, `/articles`, `/bestseller-rule`, `/plans`, `/bundles`.
- Dynamic: live courses; categories with a live course; academies (`IsAcademy` categories with a live course in their tree);
  publicly visible certifications (visible state, reviewer set, checked within the freshness window); published pathways with a
  live course; active collections with a live course; articles `free-video-and-paid-study-services`,
  `how-mcq-certificates-work`, `prepare-for-a-certification-exam`; public instructor profiles (`/instructors/{id}`, same rule as the directory).
- robots.txt disallows `/me`, `/studio`, `/admin`, `/attempts`, `/learn/`, `/api/`, `/login`, `/register`, `/checkout`, `/gift`,
  `/orgs`, `/staff`, `/review`, `/practice/session` (covers `/practice/sessions`).
