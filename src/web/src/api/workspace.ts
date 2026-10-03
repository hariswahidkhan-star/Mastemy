/**
 * Wave 3 "workspace" API surface: authoring productivity, consent-based analytics, study tools, trust & safety,
 * operations and AI assistance. Field names mirror the C# records in src/Mastemy.Api/Modules/{Authoring,Analytics,
 * StudyTools,Trust,Operations,Ai} (camelCase JSON, enums as strings).
 */
import { api, apiFetch, ApiError, apiUrl, getAccessToken } from './client';
import type {
  CourseStatus,
  Guid,
  IsoDate,
  StudioLessonDto as BaseLessonDto,
  StudioModuleDto,
} from './types';

/** StudioLessonDto as the server sends it (the shared type predates `notesVersion`). */
export type StudioLessonDto = BaseLessonDto & { notesVersion: number };

export const wsKeys = {
  notes: (lessonId: string) => ['ws', 'notes', lessonId] as const,
  revisions: (lessonId: string) => ['ws', 'revisions', lessonId] as const,
  history: (courseId: string) => ['ws', 'history', courseId] as const,
  checklist: (courseId: string) => ['ws', 'checklist', courseId] as const,
  translations: (courseId: string) => ['ws', 'translations', courseId] as const,
  templates: ['ws', 'templates'] as const,
  agreement: ['ws', 'agreement'] as const,
  consent: ['ws', 'consent'] as const,
  courseAnalytics: (id: string, range: string) => ['ws', 'analytics', id, range] as const,
  questionStats: (id: string) => ['ws', 'qstats', id] as const,
  adminDashboard: (range: string) => ['ws', 'adminDashboard', range] as const,
  studyPlan: ['ws', 'studyPlan'] as const,
  folders: ['ws', 'folders'] as const,
  bookmarks: (lessonId?: string) => ['ws', 'bookmarks', lessonId ?? 'all'] as const,
  continueLearning: ['ws', 'continue'] as const,
  complaints: (status: string, page: number) => ['ws', 'complaints', status, page] as const,
  holds: (all: boolean) => ['ws', 'holds', all] as const,
  suspensions: (all: boolean) => ['ws', 'suspensions', all] as const,
  appeals: (status: string, page: number) => ['ws', 'appeals', status, page] as const,
  myAppeals: ['ws', 'myAppeals'] as const,
  brokenLinks: ['ws', 'brokenLinks'] as const,
  overdue: (months: number) => ['ws', 'overdue', months] as const,
  health: ['ws', 'health'] as const,
  aiStatus: ['ws', 'aiStatus'] as const,
  aiUsageMe: ['ws', 'aiUsageMe'] as const,
  conversations: (courseId: string) => ['ws', 'conversations', courseId] as const,
  conversation: (id: string) => ['ws', 'conversation', id] as const,
  aiAdminUsage: (period: string) => ['ws', 'aiAdminUsage', period] as const,
  feynmanSessions: (courseId: string) => ['ws', 'feynman', courseId] as const,
  scenarioTemplates: (courseId: string) => ['ws', 'scenarioTemplates', courseId] as const,
  scenarioSessions: (courseId: string) => ['ws', 'scenarioSessions', courseId] as const,
  skillGraph: (categoryId?: number) => ['ws', 'skillGraph', categoryId] as const,
  skillMastery: (categoryId?: number) => ['ws', 'skillMastery', categoryId] as const,
  skillRecommendations: ['ws', 'skillRecommendations'] as const,
  exerciseHistory: (courseId: string) => ['ws', 'exerciseHistory', courseId] as const,
  studyPathStreak: ['ws', 'studyPathStreak'] as const,
  studyPathChallenge: (courseId: string) => ['ws', 'studyPathChallenge', courseId] as const,
};

// ---------- Authoring ----------
export interface LessonNotesDto {
  lessonId: Guid;
  notesVersion: number;
  etag: string;
  notesMarkdown: string;
  premiumNotesMarkdown: string | null;
}
export interface LessonRevisionSummaryDto {
  revision: number;
  authorId: Guid | null;
  authorName: string | null;
  createdAt: IsoDate;
  restoredFromRevision: number | null;
  notesLength: number;
  premiumNotesLength: number;
  isCurrent: boolean;
}
export interface LessonRevisionDto {
  revision: number;
  authorId: Guid | null;
  authorName: string | null;
  createdAt: IsoDate;
  restoredFromRevision: number | null;
  notesMarkdown: string;
  premiumNotesMarkdown: string | null;
  isCurrent: boolean;
}
export interface CourseHistoryEntryDto {
  kind: 'audit' | 'notes_revision' | string;
  action: string;
  at: IsoDate;
  actorId: Guid | null;
  actorName: string | null;
  lessonId: Guid | null;
  revision: number | null;
  details: string | null;
}
export interface CourseHistoryDto {
  courseId: Guid;
  page: number;
  pageSize: number;
  hasMore: boolean;
  items: CourseHistoryEntryDto[];
}
export interface TemplateLessonDto {
  title: string;
  objective: string | null;
}
export interface TemplateModuleDto {
  title: string;
  lessons: TemplateLessonDto[] | null;
}
export interface CourseTemplateDto {
  id: Guid;
  name: string;
  description: string;
  modules: TemplateModuleDto[];
  checklist: string[];
  isActive: boolean;
  updatedAt: IsoDate;
}
export interface ChecklistItemDto {
  id: Guid;
  text: string;
  sortOrder: number;
  done: boolean;
  doneBy: Guid | null;
  doneAt: IsoDate | null;
}
export interface StudioTranslationDto {
  courseId: Guid;
  code: string;
  title: string;
  language: string;
  status: CourseStatus;
}
export interface AgreementDto {
  id: Guid;
  version: string;
  title: string;
  body: string;
  publishedAt: IsoDate;
}
export interface MyAgreementDto {
  current: AgreementDto | null;
  required: boolean;
  accepted: boolean;
  acceptedAt: IsoDate | null;
}
export interface PreviewLessonView {
  lesson: { id: Guid; title: string; objective: string; durationSeconds: number };
  youtubeVideoId: string | null;
  notesMarkdown: string;
  premiumNotesMarkdown: string | null;
  premiumLocked: boolean;
  hasPremiumNotes: boolean;
  assessments: { id: Guid; title: string; kind: string; questionCount: number }[];
}
export interface LearnerPreviewDto {
  courseId: Guid;
  as: 'free' | 'premium';
  device: string;
  isDraftPreview: boolean;
  curriculum: {
    title: string;
    subtitle: string;
    modules: {
      id: Guid;
      title: string;
      lessons: { id: Guid; title: string; durationSeconds: number; isPreview: boolean }[];
    }[];
  };
  lessons: PreviewLessonView[];
}

export const NOTES_CONFLICT = 'precondition_failed';

/** PUT notes with If-Match; returns the lesson and the new ETag from the response header. */
export async function saveNotes(
  lessonId: string,
  etag: string,
  body: { notesMarkdown: string; premiumNotesMarkdown: string },
): Promise<{ lesson: StudioLessonDto; etag: string }> {
  const res = await apiFetch(`/api/studio/lessons/${lessonId}/notes`, {
    method: 'PUT',
    body,
    headers: { 'If-Match': etag },
  });
  const lesson = (await res.json()) as StudioLessonDto;
  return { lesson, etag: res.headers.get('ETag') ?? `"n${lesson.notesVersion}"` };
}

export async function restoreRevision(
  lessonId: string,
  revision: number,
  etag: string,
): Promise<{ lesson: StudioLessonDto; etag: string }> {
  const res = await apiFetch(`/api/studio/lessons/${lessonId}/revisions/${revision}/restore`, {
    method: 'POST',
    headers: { 'If-Match': etag },
  });
  const lesson = (await res.json()) as StudioLessonDto;
  return { lesson, etag: res.headers.get('ETag') ?? `"n${lesson.notesVersion}"` };
}

/**
 * GET notes. The JSON field is `eTag` (camelCased `ETag`); the `ETag` response header is the authority, so the
 * view model exposes it as `etag`.
 */
export async function getNotes(lessonId: string): Promise<LessonNotesDto> {
  const res = await apiFetch(`/api/studio/lessons/${lessonId}/notes`);
  const body = (await res.json()) as Omit<LessonNotesDto, 'etag'> & { eTag?: string };
  return { ...body, etag: res.headers.get('ETag') ?? body.eTag ?? `"n${body.notesVersion}"` };
}
export const duplicateModule = (id: string) =>
  api<StudioModuleDto>(`/api/studio/modules/${id}/duplicate`, { method: 'POST' });
export const duplicateLesson = (id: string) =>
  api<StudioLessonDto>(`/api/studio/lessons/${id}/duplicate`, { method: 'POST' });
export const bulkLessons = (moduleId: string, titles: string[]) =>
  api<StudioLessonDto[]>(`/api/studio/modules/${moduleId}/lessons/bulk`, {
    method: 'POST',
    body: { titles },
  });

/** Splits a pasted list into lesson titles: one per line, list markers and numbering stripped, max 200 chars. */
export function parseLessonList(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((l) =>
      l
        .replace(/^\s*(?:[-*•]|\d+[.)])\s+/, '')
        .trim()
        .slice(0, 200),
    )
    .filter((l) => l.length > 0);
}

// ---------- Analytics ----------
export interface ConsentDto {
  analytics: boolean;
  source: 'account' | 'cookie';
}
export type AnalyticsEventType =
  | 'course_view'
  | 'lesson_view'
  | 'video_play'
  | 'video_complete'
  | 'preview_play'
  | 'checkout_start'
  | 'search';
export interface BucketPointDto {
  bucket: string;
  value: number;
}
export interface CurrencyBucketDto {
  bucket: string;
  currency: string;
  amount: number;
}
export interface FunnelStepDto {
  lessonId: Guid;
  moduleTitle: string;
  lessonTitle: string;
  sortIndex: number;
  started: number;
  completed: number;
}
export interface AssessmentStatDto {
  assessmentId: Guid;
  title: string;
  kind: string;
  attempts: number;
  passed: number;
  passRatePercent: number;
  averageScorePercent: number | null;
}
export interface LedgerTotalDto {
  currency: string;
  kind: string;
  gross: number;
  instructorAmount: number;
  platformAmount: number;
  entries: number;
}
export interface CourseAnalyticsDto {
  courseId: Guid;
  from: IsoDate;
  to: IsoDate;
  bucket: string;
  generatedAt: IsoDate;
  enrollmentsOverTime: BucketPointDto[];
  enrollmentsInRange: number;
  totalEnrollments: number;
  activeLearnersOverTime: BucketPointDto[];
  activeLearnersInRange: number;
  completionFunnel: FunnelStepDto[];
  averageProgressPercent: number;
  assessments: AssessmentStatDto[];
  questionStatsUrl: string;
  conversion: {
    courseViewVisitors: number;
    enrollments: number;
    purchases: number;
    viewToEnrollPercent: number | null;
    enrollToPurchasePercent: number | null;
    note: string;
  };
  revenue: LedgerTotalDto[];
  myEarnings: LedgerTotalDto[];
  revenueOverTime: CurrencyBucketDto[];
  refunds: { paidOrders: number; refundedOrders: number; refundRatePercent: number | null };
}
export interface QuestionStatDto {
  questionId: Guid;
  externalId: string;
  answered: number;
  fullCredit: number;
  averagePoints: number | null;
  fullCreditPercent: number | null;
}
export interface CurrencyTotalDto {
  currency: string;
  count: number;
  amount: number;
}
export interface AdminDashboardDto {
  from: IsoDate;
  to: IsoDate;
  bucket: string;
  generatedAt: IsoDate;
  totalUsers: number;
  newSignupsInRange: number;
  signupsOverTime: BucketPointDto[];
  activeLearnersInRange: number;
  activeLearnersOverTime: BucketPointDto[];
  publishedCourses: number;
  ordersByCurrency: CurrencyTotalDto[];
  revenueOverTime: CurrencyBucketDto[];
  refundsByCurrency: CurrencyTotalDto[];
  pendingRefundRequests: number;
  aiUsage: import('./finala').AiUsageSummaryDto | null;
  videosNeedingRepair: number;
  videosNeedingRepairSample: {
    id: Guid;
    youTubeVideoId: string;
    title: string;
    status: string;
    reason: string | null;
    lastCheckedAt: IsoDate | null;
  }[];
  contentReviewMonths: number;
  overdueContentUpdates: number;
  overdueContentSample: {
    id: Guid;
    code: string;
    title: string;
    lastPublishedAt: IsoDate | null;
  }[];
  reviewQueues: {
    coursesInReview: number;
    questionsAwaitingReview: number;
    questionsAwaitingApproval: number;
    instructorApplications: number;
    refundRequests: number;
    uploadApprovals: number;
  };
}

// ---------- Study tools ----------
export const WEEK_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;
export type WeekDay = (typeof WEEK_DAYS)[number];
export interface StudyPlanItemDto {
  id: Guid;
  courseId: Guid;
  courseTitle: string;
  lessonId: Guid;
  lessonTitle: string;
  durationSeconds: number;
  scheduledAt: IsoDate;
  completed: boolean;
}
export interface StudyPlanDto {
  id: Guid;
  courseIds: Guid[];
  targetDate: IsoDate;
  weeklyMinutes: number;
  sessionDays: WeekDay[];
  sessionHourUtc: number;
  /** Local hour (0–23) in `timeZone`, the learner's profile zone. */
  sessionHour?: number;
  timeZone?: string;
  remindersEnabled: boolean;
  fitsBeforeTarget: boolean;
  finishesAt: IsoDate | null;
  totalLessons: number;
  remainingLessons: number;
  updatedAt: IsoDate;
  weeks: { weekStart: IsoDate; plannedMinutes: number; items: StudyPlanItemDto[] }[];
}
export interface StudyPlanRequest {
  courseIds: Guid[];
  targetDate: string;
  weeklyMinutes: number;
  sessionDays: WeekDay[];
  /** Local hour in the profile time zone. */
  sessionHour: number;
  remindersEnabled: boolean;
}
export interface FolderDto {
  id: Guid;
  name: string;
  sortOrder: number;
  createdAt: IsoDate;
  courses: { courseId: Guid; slug: string; title: string; addedAt: IsoDate }[];
}
export interface BookmarkDto {
  id: Guid;
  courseId: Guid;
  courseTitle: string;
  lessonId: Guid;
  lessonTitle: string;
  timestampSeconds: number;
  label: string;
  lessonAvailable: boolean;
  createdAt: IsoDate;
}
export interface ContinueLearningDto {
  courseId: Guid;
  slug: string;
  courseTitle: string;
  lessonId: Guid | null;
  lessonTitle: string | null;
  positionSeconds: number;
  progressPercent: number;
  completedLessons: number;
  totalLessons: number;
  courseCompleted: boolean;
  lastActivityAt: IsoDate | null;
}

/** Groups plan items into calendar days (UTC date of `scheduledAt`), preserving order. */
export function groupByDay(
  items: StudyPlanItemDto[],
): { day: string; items: StudyPlanItemDto[] }[] {
  const out: { day: string; items: StudyPlanItemDto[] }[] = [];
  for (const it of items) {
    const day = it.scheduledAt.slice(0, 10);
    const last = out[out.length - 1];
    if (last && last.day === day) last.items.push(it);
    else out.push({ day, items: [it] });
  }
  return out;
}

// ---------- Trust & operations ----------
export const COMPLAINT_TYPES = ['Copyright', 'Rights', 'Abuse', 'Privacy', 'Other'] as const;
export type ComplaintTarget =
  'Course' | 'Lesson' | 'Discussion' | 'DiscussionReply' | 'Review' | 'Resource';
export interface ComplaintDto {
  id: Guid;
  type: string;
  targetType: ComplaintTarget;
  targetId: Guid;
  courseId: Guid;
  courseTitle: string | null;
  reporterUserId: Guid | null;
  reporterEmail: string;
  reporterName: string;
  evidence: string;
  status: 'Open' | 'Dismissed' | 'Actioned';
  action: 'None' | 'Dismiss' | 'Hide' | 'Archive';
  resolutionNote: string | null;
  resolvedBy: Guid | null;
  resolvedAt: IsoDate | null;
  createdAt: IsoDate;
}
export interface Paged<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
export interface ContentHoldDto {
  id: Guid;
  targetType: 'Lesson' | 'Resource';
  targetId: Guid;
  courseId: Guid;
  complaintId: Guid | null;
  createdBy: Guid;
  createdAt: IsoDate;
  releasedAt: IsoDate | null;
}
export interface SuspensionDto {
  id: Guid;
  userId: Guid;
  displayName: string | null;
  reason: string;
  holdBatchId: Guid;
  heldEntries: number;
  suspendedBy: Guid;
  suspendedAt: IsoDate;
  reinstatedBy: Guid | null;
  reinstatedAt: IsoDate | null;
  reinstateNote: string | null;
}
export interface AppealDto {
  id: Guid;
  targetType: ComplaintTarget;
  targetId: Guid;
  courseId: Guid;
  appellantId: Guid;
  reason: string;
  status: 'Pending' | 'Upheld' | 'Reinstated';
  decidedBy: Guid | null;
  decisionNote: string | null;
  decidedAt: IsoDate | null;
  createdAt: IsoDate;
}
export interface BrokenLinkDto {
  videoAssetId: Guid;
  youTubeVideoId: string;
  title: string;
  status: string;
  statusReason: string | null;
  lastCheckedAt: IsoDate | null;
  courses: {
    courseId: Guid;
    title: string;
    slug: string;
    version: number;
    lessons: { lessonId: Guid; title: string }[];
    instructorIds: Guid[];
  }[];
  lastNotifiedAt: IsoDate | null;
}
export interface OverdueCourseDto {
  courseId: Guid;
  title: string;
  slug: string;
  status: CourseStatus;
  ownerId: Guid;
  ownerName: string | null;
  lastPublishedAt: IsoDate;
  monthsSincePublish: number;
}
export interface HealthReportDto {
  status: 'Healthy' | 'Degraded' | 'Unhealthy' | string;
  totalDurationMs?: number | null;
  checks?:
    | {
        name: string;
        status: string;
        description: string | null;
        durationMs: number;
        data: Record<string, unknown> | null;
      }[]
    | null;
}

/** /health/ready answers 503 with the same JSON body when Unhealthy; read the body either way. */
export async function fetchHealth(): Promise<HealthReportDto> {
  const token = getAccessToken();
  const res = await fetch(apiUrl('/health/ready'), {
    headers: { Accept: 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  if (res.status !== 200 && res.status !== 503)
    throw new ApiError(res.status, null, res.statusText);
  return (await res.json()) as HealthReportDto;
}

/** Pulls the first GUID out of a pasted link or id. */
export function extractGuid(text: string): string | null {
  const m = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i.exec(text);
  return m ? m[0].toLowerCase() : null;
}

// ---------- AI ----------
export interface AiStatusDto {
  configured: boolean;
  model: string | null;
  message: string | null;
}
export interface ConversationDto {
  id: Guid;
  courseId: Guid;
  title: string;
  messageCount: number;
  createdAt: IsoDate;
  lastMessageAt: IsoDate;
}
export interface CitationDto {
  chunkId: Guid;
  lessonId: Guid;
  lessonTitle: string;
  section: string;
  sourceKind: string;
  startSeconds: number | null;
}
export interface MessageDto {
  id: Guid;
  role: 'user' | 'assistant' | string;
  content: string;
  citations: CitationDto[];
  grounded: boolean;
  outcome: string | null;
  createdAt: IsoDate;
}
export interface ConversationDetailDto {
  conversation: ConversationDto;
  messages: MessageDto[];
}
export interface TutorDone {
  messageId: Guid;
  content: string;
  grounded: boolean;
  outcome: string;
  citations: CitationDto[];
}
export interface PracticeSetDto {
  id: Guid;
  courseId: Guid;
  lessonId: Guid | null;
  label: string;
  aiGenerated: boolean;
  reviewed: boolean;
  scored: boolean;
  questions: {
    index: number;
    stem: string;
    options: { index: number; text: string }[];
    multipleSelect: boolean;
  }[];
  expiresAt: IsoDate;
}
export interface PracticeCheckDto {
  questionIndex: number;
  correct: boolean;
  correctIndexes: number[];
  explanation: string;
  rationales: string[];
  label: string;
}
export const ASSIST_KINDS = [
  'Outline',
  'VideoScript',
  'LessonNotes',
  'CaptionCleanup',
  'Metadata',
] as const;
export type AssistKind = (typeof ASSIST_KINDS)[number];
export interface AssistResultDto {
  kind: AssistKind;
  draft: string;
  label: string;
  requiresReview: boolean;
  model: string;
}
export interface McqDraftResultDto {
  createdQuestionIds: Guid[];
  rejected: string[];
  label: string;
}
export interface UsageRowDto {
  key: string;
  inputTokens: number;
  outputTokens: number;
  costEstimate: number;
  calls: number;
}
export interface AdminUsageDto {
  period: string;
  totalTokens: number;
  totalCost: number;
  globalLimit: number;
  byFeature: UsageRowDto[];
  byModel: UsageRowDto[];
  topUsers: UsageRowDto[];
  byOrganization: UsageRowDto[];
}

// ---------- Feynman Engine ----------
export interface FeynmanSessionDto {
  id: Guid;
  courseId: Guid;
  topic: string;
  exchangeCount: number;
  evaluated: boolean;
  createdUtc: IsoDate;
  evaluatedUtc: IsoDate | null;
}
export interface FeynmanStartResult {
  session: FeynmanSessionDto;
  aiMessage: string;
}
export interface FeynmanDone {
  content: string;
  exchangeCount: number;
  maxExchanges: number;
  canEvaluate: boolean;
}
export interface FeynmanFeedbackDto {
  wellExplained: string[];
  needsWork: string[];
  summary: string;
}
// ---------- Scenario Engine ----------
export interface ScenarioTemplateDto {
  id: number;
  courseId: Guid | null;
  title: string;
  description: string;
  category: string;
  characterName: string;
  characterRole: string;
  situationBrief: string;
  maxTurns: number;
  difficulty: string;
  createdUtc: IsoDate;
}
export interface ScenarioSessionDto {
  id: number;
  templateId: number;
  templateTitle: string;
  characterName: string;
  category: string;
  turnCount: number;
  maxTurns: number;
  isCompleted: boolean;
  overallScore: number | null;
  startedUtc: IsoDate;
  completedUtc: IsoDate | null;
}
export interface ScenarioMessageDto {
  role: string;
  content: string;
  timestamp: IsoDate;
}
export interface ScenarioDimensionScoreDto {
  dimension: string;
  score: number;
  weight: number;
  feedback: string;
}
export interface ScenarioSessionDetailDto {
  id: number;
  templateId: number;
  templateTitle: string;
  characterName: string;
  characterRole: string;
  category: string;
  situationBrief: string;
  turnCount: number;
  maxTurns: number;
  isCompleted: boolean;
  transcript: ScenarioMessageDto[];
  scores: ScenarioDimensionScoreDto[] | null;
  overallScore: number | null;
  summaryFeedback: string | null;
  startedUtc: IsoDate;
  completedUtc: IsoDate | null;
}
export interface ScenarioDone {
  content: string;
  turnCount: number;
  maxTurns: number;
  isCompleted: boolean;
}

// ---------- Skill Graph ----------
export interface SkillNodeDto {
  id: number;
  code: string;
  name: string;
  description: string | null;
  categoryCode: string | null;
  categoryId: number | null;
}
export interface SkillEdgeDto {
  id: number;
  fromSkillId: number;
  toSkillId: number;
}
export interface SkillGraphDto {
  nodes: SkillNodeDto[];
  edges: SkillEdgeDto[];
}
export interface SkillMasteryDto {
  skillId: number;
  skillCode: string;
  skillName: string;
  masteryScore: number;
  evidenceCount: number;
  lastPracticedUtc: IsoDate;
  nextReviewUtc: IsoDate | null;
  stability: number;
  difficulty: number;
}
export interface SkillMasterySummaryDto {
  totalSkills: number;
  masteredCount: number;
  inProgressCount: number;
  weakCount: number;
  dueForReviewCount: number;
  items: SkillMasteryDto[];
}
export interface SkillRecommendationDto {
  skillId: number;
  skillCode: string;
  skillName: string;
  reason: string;
  masteryScore: number;
  nextReviewUtc: IsoDate | null;
}

// ---------- AI Coach ----------
export interface CoachHintDto {
  id: Guid;
  hintText: string;
  hintType: 'Nudge' | 'Warning' | 'Encouragement' | 'Strategy';
  createdUtc: IsoDate;
}

// ---------- Adaptive Exercises ----------
export interface ExercisePayload {
  title: string;
  instructions: string;
  starterCode: string | null;
  expectedBehavior: string;
  hints: string[];
}
export interface GeneratedExerciseDto {
  id: Guid;
  courseId: Guid;
  lessonId: Guid;
  skillArea: string;
  difficulty: string;
  exercise: ExercisePayload;
  attemptedAt: IsoDate | null;
  passed: boolean | null;
  createdUtc: IsoDate;
}

// ---------- Study Path ----------
export interface LearningStreakDto {
  currentStreak: number;
  longestStreak: number;
  lastActivityUtc: IsoDate;
  totalMinutesThisWeek: number;
  weeklyGoalMinutes: number;
}
export interface OptimalOrderItem {
  lessonId: Guid;
  title: string;
  reason: string;
}
export interface StudyPathRecommendationDto {
  id: Guid;
  courseId: Guid;
  recommendedLessonIds: Guid[];
  reasoning: string;
  optimalOrder: OptimalOrderItem[];
  estimatedMinutes: number;
  createdUtc: IsoDate;
}
export interface DailyChallengeContent {
  question: string;
  hint: string;
  type: string;
}
export interface DailyChallengeDto {
  id: Guid;
  courseId: Guid;
  challengeType: string;
  challenge: DailyChallengeContent;
  completed: boolean;
  createdUtc: IsoDate;
}

export interface FeynmanRubricDto {
  accuracy: number;
  completeness: number;
  depth: number;
  clarity: number;
  overallMastery: number;
  misconceptions: string[];
  feedback: FeynmanFeedbackDto;
}
