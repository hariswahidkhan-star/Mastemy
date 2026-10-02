# Messaging (spec §9 instructor operations, §16 controlled learner messaging)

Module: `src/Mastemy.Api/Modules/Messaging`. Tables: `Messaging_Conversations`, `Messaging_Messages`, `Messaging_ReadMarkers`,
`Messaging_Blocks`, `Messaging_Reports`, `Messaging_CourseAutoMessages`, `Messaging_AutoMessageDeliveries`, `Messaging_WorkerState`.

## Model and rules

- One **conversation per (course, learner)**: the learner on one side, the course's instructor team (all `CourseInstructors`
  who still hold an authoring role and are not suspended) on the other. There is **no learner↔learner messaging** by construction.
- A learner may message a course's instructors only while **enrolled**. Instructors may reply, and may start a message to any
  **enrolled** learner of a course they teach.
- Bodies are **plain text**, 1–`Messaging:MaxBodyLength` (default 2000) characters; HTML markup is rejected (`html_not_allowed`).
- **Rate limits** per sender (typed messages only): `Messaging:MaxPerHour` (default 30) and `Messaging:MaxPerDay` (default 200) → `429 rate_limited`.
- **Blocks**: a user can block someone they share a conversation with. A blocked instructor cannot message that learner
  (`403 messaging_blocked`); a learner blocked by every instructor of a course cannot message it. Blocked senders are also
  skipped for automatic messages.
- **Reports** file a Trust complaint (`Trust_Complaints`, type `Abuse`, course = conversation course, evidence = message body,
  sender, timestamps and the reporter's reason). Trust has no dedicated "message" complaint target, so the target type is stored
  as the sentinel value `100` (`MessagingRules.MessageComplaintTarget`) and the target id is the message id. One report per
  (message, reporter).
- **Moderator hide**: staff or `Moderator` role. Hidden messages show `hidden: true, body: null` to participants; moderators still see
  the body. Moderators can read any conversation.
- **Notifications**: recipients get an in-app notification of kind `message` (respecting per-kind preferences; email via outbox
  only when opted in and SMTP configured). Link: `/messages/{conversationId}`.

Errors use the standard problem-details shape; the code is in `type`.

## Endpoints (all require authentication)

| Method | Path | Who | Notes |
|---|---|---|---|
| GET | `/api/messages/conversations` | any | Conversations where the caller is the learner or an instructor of the course. `ConversationDto { id, courseId, courseTitle, learnerId, learnerName, myRole: Learner\|Instructor, lastMessageAt, unread }` |
| GET | `/api/messages/conversations/{id}?before=&limit=50` | participant / moderator | `{ conversation, messages: MessageDto[], hasMore }` (oldest→newest page, `before` = cursor). Marks the thread read. Non-participants: 404. |
| POST | `/api/messages/conversations/{id}/messages` | participant | `{ body }` → 201 `SentMessageDto { conversation, message }` |
| POST | `/api/courses/{courseId}/messages` | enrolled learner | Learner → instructors. 403 when not enrolled or blocked by all instructors. |
| POST | `/api/studio/courses/{courseId}/learners/{learnerId}/messages` | course instructor | 403 not an instructor; 404 learner not enrolled; 403 `messaging_blocked`. |
| POST | `/api/messages/{messageId}/report` | participant (not the sender) | `{ reason }` (10–2000) → 201 `{ id, messageId, complaintId, createdAt }`; 409 `already_reported`. |
| GET | `/api/messages/blocks` | any | Users the caller blocked. |
| POST | `/api/messages/blocks` | any | `{ userId }` — only someone the caller shares a conversation with (else 404). Idempotent. |
| DELETE | `/api/messages/blocks/{userId}` | any | 204. |
| GET | `/api/moderation/messages/reports?includeHidden=false` | staff / Moderator | Reported messages with body, reporter, complaint id. |
| POST | `/api/moderation/messages/{id}/hide` | staff / Moderator | `{ reason }` (3–500). Audited `message.hidden`. |
| POST | `/api/moderation/messages/{id}/unhide` | staff / Moderator | Audited `message.unhidden`. |
| GET | `/api/studio/courses/{courseId}/auto-messages` | course editor / staff | `[{ kind: Welcome\|Completion, body, enabled, enabledSince, updatedAt }]` |
| PUT | `/api/studio/courses/{courseId}/auto-messages/{welcome\|completion}` | course editor / staff | `{ body (1–5000 plain text), enabled }`. Audited `course.auto_message.updated`. |

`MessageDto { id, conversationId, senderId, senderName, senderRole: Learner|Instructor, kind: Text|Welcome|Completion, body|null, hidden, hiddenReason, createdAt }`.

## Welcome and completion messages

`AutoMessageWorker` (BackgroundService; `Messaging:AutoMessagesEnabled` default true, `Messaging:AutoMessageIntervalSeconds`
default 60) polls since its last run (5-minute overlap):

- **Welcome**: new `Enrollments` of courses with an enabled welcome message, created after the message was enabled
  (`enabledSince`), so switching it on never messages the existing learner base.
- **Completion**: `LessonProgress` rows completed since the last run that belong to the course's current published snapshot
  (`SnapshotLessons` at `Course.PublishedVersion`); the message is sent when the learner has completed **every** lesson of that snapshot.

Delivery is idempotent per (user, course, kind) via `INSERT IGNORE` into `Messaging_AutoMessageDeliveries` in the same transaction as
the message, so overlapping runs or several API instances never double-send. The sender is the course owner (or the first active
instructor); if the learner blocked every instructor the delivery is recorded and skipped.
