# AI assistance (spec §19, §15 exam boundary, §16 private chats)

Provider: Anthropic Messages API (`POST {Ai:BaseUrl}/v1/messages`, streamed SSE) via `IAiProvider` / `AnthropicProvider`.
No tools are ever sent. The system prompt carries a prompt-cache breakpoint; `output_config.effort` = `Ai:Effort`;
server-side refusal fallbacks (`fallbacks: "default"`, beta `server-side-fallback-2026-07-01`) are on unless `Ai:RefusalFallback=false`.

When `Ai:ApiKey` is empty every AI endpoint below (except `GET /api/ai/status` and `/api/admin/ai/*`) returns
**503 `ai_not_configured`**. Provider outage → 503 `ai_unavailable`; malformed provider output → 502 `ai_invalid_output`;
provider refusal on a generation call → 422 `ai_refused`.

Common errors: 401 unauthenticated; 403 `not_enrolled`; 403 `exam_in_progress` (the user has an unexpired InProgress
Exam-mode attempt in the course: tutor, practice generation and practice check are blocked); 429 `ai_rate_limited`
(per user, `Ai:PerUserPerMinute`); 429 `ai_budget_exhausted` (user-plan, organization or global monthly token budget).

## Learner

| Method | Path | Notes |
|---|---|---|
| GET | `/api/ai/status` | `{configured, model, message}`, so the UI can show "not configured". |
| GET | `/api/ai/usage/me` | `{period, plan (free/premium/instructor), usedTokens, limitTokens, remainingTokens}` |
| POST | `/api/ai/tutor/conversations` | `{courseId, title?}`. Live course; caller must be enrolled, entitled, an author or staff. |
| GET | `/api/ai/tutor/conversations?courseId=` | Only the caller's own conversations. |
| GET | `/api/ai/tutor/conversations/{id}` | Owner only (404 for everyone else, staff included). Messages with citations. |
| DELETE | `/api/ai/tutor/conversations/{id}` | Owner only. 204. |
| POST | `/api/ai/tutor/conversations/{id}/messages` | `{content}` (at most `Ai:MaxUserMessageChars`, default 2000). Response is `text/event-stream`. |
| POST | `/api/ai/practice` | `{courseId, lessonId?, count 1-5}` returns an AI-generated, unreviewed, unscored practice set with the keys hidden. |
| GET | `/api/ai/practice/{id}` | Owner only, until it expires (`Ai:PracticeSetHours`, default 24). |
| POST | `/api/ai/practice/{id}/check` | `{questionIndex, selected:[int]}` returns `{correct, correctIndexes, explanation, rationales, label}`. Never recorded as an attempt. |

### Tutor stream events
```
event: delta      data: {"text":"..."}                     (repeated; citation markers rewritten to [n])
event: citations  data: [{chunkId, lessonId, lessonTitle, section, sourceKind, startSeconds}]
event: done       data: {messageId, content, grounded, outcome, citations, usage}
event: error      data: {code, message, status}           (provider failure after the stream opened; no done follows)
```
`done.content` is authoritative. If the model cited nothing valid, or answered `NOT_COVERED`, the content is replaced by the
"not covered in this course" refusal (`outcome: not_covered`, `grounded: false`). The other outcomes are `answered`,
`answered_truncated`, `declined_assessment_item` (the message reproduces an Active question stem; the model is not called)
and `refused`. Citations are checked against the chunk ids that were actually supplied, and invented ids are stripped.

Grounding: only the course's current PUBLISHED snapshot is indexed. That covers lesson notes, premium notes and premium caption
tracks (retrieved only for entitled users, authors and staff), and caption transcript cues with timestamps. Questions, options,
rationales, explanations and answer keys are never indexed or sent. Retrieval is BM25 over heading-aware chunks of about
`Ai:ChunkTokens` (800) tokens. A score below `Ai:RetrievalMinScore` gives the not-covered refusal without a model call. Retrieved
text is wrapped in `<course_material>` / `<source>` delimiters, and any forged delimiter tags in the text are neutralised.

## Instructor (policy Instructor + course editor)

| Method | Path | Notes |
|---|---|---|
| POST | `/api/ai/studio/courses/{courseId}/assist` | `{kind: Outline, VideoScript, LessonNotes, CaptionCleanup or Metadata; lessonId?, input?, language?}` returns `{kind, draft, label, requiresReview:true, model}`. Nothing is saved to the course. Audited as `ai.assist.generated` (with the draft's SHA-256). |
| POST | `/api/ai/studio/courses/{courseId}/mcq-drafts` | `{lessonId?, count 1-10, sourceText?, language?}` returns `{createdQuestionIds, rejected, label}`. The structured JSON output is validated with the bank's own rules. Questions are created through QuestionService as **Draft** (normal review required), flagged in `Ai_GeneratedQuestions` and audited as `ai.mcq_draft.created`. |

## Staff (policy Staff)

| Method | Path | Notes |
|---|---|---|
| GET | `/api/admin/ai/usage?period=yyyy-MM` | Totals plus breakdowns by feature, model, top users (ids) and organization. Cost estimates come from `Ai:Pricing`. |
| GET | `/api/admin/ai/conversations?userId=&courseId=` | Metadata only (id, user, course, messageCount, timestamps), never content. |
| POST | `/api/admin/ai/courses/{courseId}/reindex` | Forces an index rebuild from the published snapshot (audited). |

## Configuration (`Ai:*`)
`ApiKey` (empty = disabled), `BaseUrl` (default `https://api.anthropic.com`), `Model` (default `claude-opus-5-5`), `Effort` (medium),
`RefusalFallback` (true), `TimeoutSeconds` (300), `TutorMaxOutputTokens` (4096), `GenerationMaxOutputTokens` (16000),
`MaxUserMessageChars` (2000), `MaxAssistInputChars` (60000), `HistoryTurns` (6), `RetrievalTopK` (6), `RetrievalMinScore` (0.5),
`ChunkTokens` (800), `UserMonthlyTokens` (200k), `PremiumUserMonthlyTokens` (600k; applies with any active entitlement), `InstructorMonthlyTokens` (2M),
`OrgMonthlyTokens` (5M), `GlobalMonthlyTokens` (200M), `PerUserPerMinute` (10), `ConversationRetentionDays` (90), `PracticeSetHours` (24),
`IndexPollSeconds` (30), `BackgroundEnabled` (true), `StemSimilarityThreshold` (0.6), `Pricing:{model}:{InputPerMTok, OutputPerMTok, CacheReadPerMTok, CacheWritePerMTok}`.

Background worker (`AiMaintenanceWorker`): every `IndexPollSeconds` it rebuilds the index of any live course whose published
version changed, drops the indexes of courses that are no longer live, deletes conversations idle longer than the retention
period, and deletes expired practice sets.

New tables: `Ai_Chunks`, `Ai_IndexStates`, `Ai_Conversations`, `Ai_Messages`, `Ai_Usage`, `Ai_GeneratedQuestions`, `Ai_PracticeSets`.
