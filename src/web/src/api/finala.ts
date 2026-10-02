/**
 * Final-wave learner/staff features (area "finala"): messaging, completion awards and sharing, self-graded
 * review, support console, MFA reset, pickers, calendar subscription. Field names mirror the C# records in
 * src/Mastemy.Api/Modules (MessagingService.cs, CompletionAwards.cs, MfaResetAndSupport.cs, OrderBrowserService.cs,
 * PracticeService.cs, RegradeAndAnalytics.cs, AccommodationService.cs, StudyPlanService.cs, AnalyticsReports.cs).
 */
import { api, qs } from './client';
import type { Guid, IsoDate } from './types';

// ---------- messaging ----------
export type MessagingRole = 'Learner' | 'Instructor';
export interface ConversationDto {
  id: Guid;
  courseId: Guid;
  courseTitle: string;
  learnerId: Guid;
  learnerName: string;
  myRole: MessagingRole;
  lastMessageAt: IsoDate;
  unread: number;
}
export interface MessageDto {
  id: Guid;
  conversationId: Guid;
  senderId: Guid;
  senderName: string;
  senderRole: MessagingRole;
  kind: 'Text' | 'Welcome' | 'Completion';
  body: string | null;
  hidden: boolean;
  hiddenReason: string | null;
  createdAt: IsoDate;
}
export interface ConversationPageDto {
  conversation: ConversationDto;
  messages: MessageDto[];
  hasMore: boolean;
}
export interface SentMessageDto {
  conversation: ConversationDto;
  message: MessageDto;
}
export interface BlockDto {
  userId: Guid;
  displayName: string;
  createdAt: IsoDate;
}
export interface MessageReportDto {
  id: Guid;
  messageId: Guid;
  complaintId: Guid;
  createdAt: IsoDate;
}
export interface ModerationReportDto {
  reportId: Guid;
  messageId: Guid;
  conversationId: Guid;
  courseId: Guid;
  senderId: Guid;
  senderName: string;
  reporterId: Guid;
  reason: string;
  body: string;
  hidden: boolean;
  complaintId: Guid;
  createdAt: IsoDate;
}
export interface AutoMessageDto {
  kind: 'Welcome' | 'Completion';
  body: string;
  enabled: boolean;
  enabledSince: IsoDate | null;
  updatedAt: IsoDate | null;
}

/** Messaging:MaxBodyLength default (server is the authority; it rejects longer bodies). */
export const MESSAGE_MAX = 2000;
export const AUTO_MESSAGE_MAX = 5000;
export const REPORT_MIN = 10;
export const REPORT_MAX = 2000;
export const HIDE_MIN = 3;
export const HIDE_MAX = 500;

/** Client-side validation mirroring TextRules.PlainText: 1..max chars, no HTML markup. */
export function validateMessageBody(
  body: string,
  max = MESSAGE_MAX,
): 'empty' | 'tooLong' | 'html' | null {
  const trimmed = body.trim();
  if (!trimmed) return 'empty';
  if (trimmed.length > max) return 'tooLong';
  if (/<\/?[a-z][^>]*>/i.test(trimmed)) return 'html';
  return null;
}

export const msgKeys = {
  conversations: ['finala', 'conversations'] as const,
  conversation: (id: string) => ['finala', 'conversation', id] as const,
  blocks: ['finala', 'blocks'] as const,
  reports: (includeHidden: boolean) => ['finala', 'msg-reports', includeHidden] as const,
  autoMessages: (courseId: string) => ['finala', 'auto-messages', courseId] as const,
  completionAward: (courseId: string) => ['finala', 'completion-award', courseId] as const,
  calendarToken: ['finala', 'calendar-token'] as const,
};

export const messagingApi = {
  conversations: () => api<ConversationDto[]>('/api/messages/conversations'),
  conversation: (id: string, before?: string) =>
    api<ConversationPageDto>(`/api/messages/conversations/${id}${qs({ before, limit: 50 })}`),
  reply: (id: string, body: string) =>
    api<SentMessageDto>(`/api/messages/conversations/${id}/messages`, {
      method: 'POST',
      body: { body },
    }),
  toInstructors: (courseId: string, body: string) =>
    api<SentMessageDto>(`/api/courses/${courseId}/messages`, { method: 'POST', body: { body } }),
  toLearner: (courseId: string, learnerId: string, body: string) =>
    api<SentMessageDto>(`/api/studio/courses/${courseId}/learners/${learnerId}/messages`, {
      method: 'POST',
      body: { body },
    }),
  report: (messageId: string, reason: string) =>
    api<MessageReportDto>(`/api/messages/${messageId}/report`, {
      method: 'POST',
      body: { reason },
    }),
  blocks: () => api<BlockDto[]>('/api/messages/blocks'),
  block: (userId: string) =>
    api<BlockDto>('/api/messages/blocks', { method: 'POST', body: { userId } }),
  unblock: (userId: string) => api(`/api/messages/blocks/${userId}`, { method: 'DELETE' }),
  reports: (includeHidden: boolean) =>
    api<ModerationReportDto[]>(`/api/moderation/messages/reports${qs({ includeHidden })}`),
  hide: (messageId: string, reason: string) =>
    api<MessageDto>(`/api/moderation/messages/${messageId}/hide`, {
      method: 'POST',
      body: { reason },
    }),
  unhide: (messageId: string) =>
    api<MessageDto>(`/api/moderation/messages/${messageId}/unhide`, { method: 'POST' }),
  autoMessages: (courseId: string) =>
    api<AutoMessageDto[]>(`/api/studio/courses/${courseId}/auto-messages`),
  setAutoMessage: (
    courseId: string,
    kind: 'welcome' | 'completion',
    body: string,
    enabled: boolean,
  ) =>
    api<AutoMessageDto>(`/api/studio/courses/${courseId}/auto-messages/${kind}`, {
      method: 'PUT',
      body: { body, enabled },
    }),
};

// ---------- hidden posts (author view) ----------
export interface ModerationNoticeDto {
  hidden: boolean;
  reason: string;
  hiddenAt: IsoDate | null;
  appealTargetType: string;
  appealTargetId: Guid;
  appealUrl: string;
  appealsPage: string;
}

// ---------- completion awards / sharing ----------
export type CredentialKind = 'AssessedKnowledge' | 'Completion';
export interface CompletionAwardSettingDto {
  courseId: Guid;
  enabled: boolean;
  updatedAt: IsoDate | null;
}
export interface CompletionAwardDto {
  id: Guid;
  code: string;
  kind: 'Completion';
  title: string;
  courseId: Guid;
  courseTitle: string;
  recipientName: string;
  lessonCount: number;
  snapshotVersion: number;
  status: 'Valid' | 'Revoked';
  publiclyVisible: boolean;
  issuedAt: IsoDate;
}
export interface CertificateShareDto {
  id: Guid;
  kind: CredentialKind;
  certificationName: string;
  linkedInAddToProfileUrl: string;
  verificationUrl: string;
}

export const awardsApi = {
  setting: (courseId: string) =>
    api<CompletionAwardSettingDto>(`/api/studio/courses/${courseId}/completion-award`),
  setSetting: (courseId: string, enabled: boolean) =>
    api<CompletionAwardSettingDto>(`/api/studio/courses/${courseId}/completion-award`, {
      method: 'PUT',
      body: { enabled },
    }),
  claim: (courseId: string) =>
    api<CompletionAwardDto>(`/api/me/courses/${courseId}/completion-award`, { method: 'POST' }),
  share: (id: string) => api<CertificateShareDto>(`/api/me/certificates/${id}/share`),
};

/** Only LinkedIn's own add-to-profile endpoint is opened from the share button. */
export function isLinkedInAddUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return (
      u.protocol === 'https:' && u.hostname === 'www.linkedin.com' && u.pathname === '/profile/add'
    );
  } catch {
    return false;
  }
}

// ---------- practice: self-grade / bookmarks ----------
export interface ReviewCardDto {
  questionId: Guid;
  dueAt: IsoDate;
  intervalDays: number;
  repetitions: number;
  easeFactor: number;
  lastQuality: number;
}
export const SELF_GRADES = [0, 1, 2, 3, 4, 5] as const;

export const practiceApi = {
  selfGrade: (sessionId: string, itemId: string, quality: number) =>
    api<ReviewCardDto>(`/api/practice/sessions/${sessionId}/items/${itemId}/self-grade`, {
      method: 'POST',
      body: { quality },
    }),
  bookmarkPracticeItem: (sessionId: string, itemId: string) =>
    api<{ questionId: Guid }>(`/api/practice/sessions/${sessionId}/items/${itemId}/bookmark`, {
      method: 'PUT',
    }),
  bookmarkAttemptItem: (attemptId: string, itemId: string) =>
    api(`/api/attempts/${attemptId}/items/${itemId}/bookmark`, { method: 'PUT' }),
};

// ---------- assessment disclosure ----------
export interface AssessmentNegativeMarking {
  id: Guid;
  title: string;
  negativeMarkingPerWrong?: number;
  negativeMarkingRules?: string | null;
}

// ---------- regrade preview ----------
export interface RegradePreviewDto {
  regradeId: Guid;
  affectedAttempts: number;
  changedAttempts: number;
  newlyPassing: number;
  newlyFailing: number;
  certificatesToFlag: number;
  results: {
    attemptId: Guid;
    userId: Guid;
    oldPointsEarned: number;
    newPointsEarned: number;
    oldScorePercent: number;
    newScorePercent: number;
    oldPassed: boolean;
    newPassed: boolean;
  }[];
}

// ---------- support / MFA reset ----------
export interface UserLookupDto {
  id: Guid;
  displayName: string;
  maskedEmail: string;
  isSuspended: boolean;
}
export interface SupportUserDto {
  id: Guid;
  displayName: string;
  maskedEmail: string;
  emailVerified: boolean;
  isSuspended: boolean;
  mfaEnabled: boolean;
  createdAt: IsoDate;
  enrollments: { courseId: Guid; courseTitle: string; enrolledAt: IsoDate }[];
  orders: { id: Guid; status: string; total: number; currency: string; createdAt: IsoDate }[];
  certificates: {
    id: Guid;
    kind: CredentialKind;
    courseTitle: string;
    status: string;
    issuedAt: IsoDate;
  }[];
}
export interface SupportOrderDto {
  id: Guid;
  userId: Guid;
  maskedBuyerEmail: string;
  status: string;
  total: number;
  currency: string;
  createdAt: IsoDate;
  paidAt: IsoDate | null;
  courseTitles: string[];
  maskedPaymentIds: string[];
  refunds: { amount: number; status: string; createdAt: IsoDate }[];
  invoiceNumbers: string[];
}
export interface MfaResetResultDto {
  userId: Guid;
  resetId: Guid;
  resetAt: IsoDate;
  sessionsRevoked: boolean;
  reenrollmentRequired: boolean;
}

export const supportApi = {
  lookup: (q: string) => api<UserLookupDto[]>(`/api/support/users/lookup${qs({ q, limit: 25 })}`),
  user: (id: string) => api<SupportUserDto>(`/api/support/users/${id}`),
  resend: (id: string) =>
    api(`/api/support/users/${id}/email-verification/resend`, { method: 'POST' }),
  orders: (p: { email?: string; orderId?: string }) =>
    api<SupportOrderDto[]>(`/api/support/orders${qs(p)}`),
  mfaReset: (id: string, reason: string) =>
    api<MfaResetResultDto>(`/api/admin/users/${id}/mfa/reset`, {
      method: 'POST',
      body: { reason },
      noRetry: true,
    }),
};

// ---------- pickers ----------
export interface AssessmentPickerDto {
  id: Guid;
  title: string;
  courseId: Guid;
  courseCode: string;
  courseTitle: string;
  kind: string;
  mode: string;
  timeLimitMinutes: number | null;
  countsTowardCertificate: boolean;
}
export interface ImageResourceDto {
  id: Guid;
  courseId: Guid;
  fileName: string;
  contentType: string;
  sizeBytes: number;
  isPremium: boolean;
  kind: string;
}

// ---------- study tools ----------
export interface CalendarTokenDto {
  token: string;
  url: string;
  createdAt: IsoDate;
}
export interface CalendarTokenStatusDto {
  active: boolean;
  createdAt: IsoDate | null;
  lastUsedAt: IsoDate | null;
}
export const calendarApi = {
  status: () => api<CalendarTokenStatusDto>('/api/me/study-plan/calendar-token'),
  create: () => api<CalendarTokenDto>('/api/me/study-plan/calendar-token', { method: 'POST' }),
  revoke: () => api('/api/me/study-plan/calendar-token', { method: 'DELETE' }),
};

// ---------- analytics ----------
export interface AiUsageSummaryDto {
  calls: number;
  distinctUsers: number;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  costEstimate: number;
  byFeature: {
    feature: string;
    calls: number;
    inputTokens: number;
    outputTokens: number;
    costEstimate: number;
  }[];
}
