/**
 * Wave 3 question bank / assessment delivery / practice / regrading / certificates (spec §13–§15, §17).
 * Shapes mirror the C# records in src/Mastemy.Api/Modules/Questions and Modules/Assessment
 * (docs/api-contract-wave3/questions-assessment.md). Enums are serialized as strings.
 */
import { useQuery } from '@tanstack/react-query';
import { api, apiFetch, qs } from './client';
import type { Guid, IsoDate, Paged, QuestionType, Difficulty } from './types';

export const COGNITIVE_LEVELS = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate'] as const;
export type CognitiveLevel = (typeof COGNITIVE_LEVELS)[number];
export type ChallengeStatus = 'Open' | 'Resolved';
export type ChallengeResolution = 'NoChange' | 'Revise' | 'Retire';
export type RegradeStatus = 'Proposed' | 'Applied' | 'Rejected';
export type CertificateFlagStatus = 'Open' | 'Kept' | 'Revoked';
export type CertificateRequestStatus = 'Pending' | 'Approved' | 'Rejected';
export type MultiSelectScoring = 'AllOrNothing' | 'PartialCredit';

// ---------- question meta / case groups ----------
export interface QuestionMetaDto {
  cognitiveLevel: CognitiveLevel | null;
  caseGroupId: Guid | null;
  caseGroupOrder: number;
  sourceQuestionId: Guid | null;
  sourceVersion: number | null;
  sourceCourseId: Guid | null;
  reusable: boolean;
}
export interface CaseGroupInput {
  title: string;
  exhibitMarkdown: string;
  resourceIds: Guid[];
}
export interface CaseGroupDto extends CaseGroupInput {
  id: Guid;
  courseId: Guid;
  questionIds: Guid[];
  createdAt: IsoDate;
  updatedAt: IsoDate;
}

// ---------- import ----------
export interface ImportInspectResult {
  format: string;
  headers: string[];
  suggestedMapping: Record<string, string | null>;
  columns: string[];
  requiredColumns: string[];
  sampleRows: string[][];
  rowCount: number;
}
export interface ImportRowResult {
  row: number;
  externalId: string;
  ok: boolean;
  errors: string[];
}
export interface ImportPreviewResult {
  batchId: Guid;
  mode: string;
  status: string;
  rows: ImportRowResult[];
  validCount: number;
  errorCount: number;
}
export interface ImportCommitResult {
  batchId: Guid;
  status: string;
  created: number;
  updated: number;
  error?: string | null;
}
export interface ImportStatusResult {
  batchId: Guid;
  status: 'Previewed' | 'Queued' | 'Processing' | 'Committed' | 'Failed' | string;
  rowCount: number;
  errorCount: number;
  created: number;
  updated: number;
  error: string | null;
  createdAt: IsoDate;
  queuedAt: IsoDate | null;
  finishedAt: IsoDate | null;
}

// ---------- reuse ----------
export interface SharedQuestionDto {
  id: Guid;
  courseId: Guid;
  externalId: string;
  version: number;
  type: QuestionType;
  language: string;
  stem: string;
  difficulty: Difficulty;
  skillCode: string;
  cognitiveLevel: CognitiveLevel | null;
  optionCount: number;
}

// ---------- challenges ----------
export interface ChallengeDto {
  id: Guid;
  questionId: Guid;
  questionVersionId: Guid;
  courseId: Guid;
  questionExternalId: string;
  userId: Guid;
  reason: string;
  status: ChallengeStatus;
  resolution: ChallengeResolution | null;
  resolutionNote: string | null;
  resolvedBy: Guid | null;
  createdAt: IsoDate;
  resolvedAt: IsoDate | null;
}
export interface MyChallengeDto {
  id: Guid;
  questionVersionId: Guid;
  reason: string;
  status: ChallengeStatus;
  resolution: ChallengeResolution | null;
  resolutionNote: string | null;
  createdAt: IsoDate;
  resolvedAt: IsoDate | null;
}

// ---------- attempts (wave 3 additions) ----------
export interface LearnerOptionDto {
  id: Guid;
  text: string;
}
export interface ExamItemView {
  itemId: Guid;
  sortOrder: number;
  type: QuestionType;
  stem: string;
  options: LearnerOptionDto[];
  selectedOptionIds: Guid[];
  flagged: boolean;
  caseGroupId?: Guid | null;
}
export interface AttemptCaseDto {
  caseGroupId: Guid;
  title: string;
  exhibitMarkdown: string;
  resourceIds: Guid[];
  itemIds: Guid[];
}
export interface AttemptPauseState {
  allowPause: boolean;
  paused: boolean;
  pausedAt: IsoDate | null;
  pauseSecondsRemaining: number;
}
export interface ExamAttemptView {
  id: Guid;
  assessmentId: Guid;
  mode: 'Practice' | 'Exam';
  status: string;
  startedAt: IsoDate;
  deadlineAt: IsoDate | null;
  serverNow: IsoDate;
  submittedAt: IsoDate | null;
  items: ExamItemView[];
  cases?: AttemptCaseDto[] | null;
  pause?: AttemptPauseState | null;
  extraTimePercent?: number | null;
  untimed?: boolean;
}
export interface ReviewOptionDto {
  id: Guid;
  text: string;
  isCorrect: boolean;
  selected: boolean;
  rationale: string;
}
export interface ReviewItemDto {
  itemId: Guid;
  sortOrder: number;
  type: QuestionType;
  stem: string;
  explanation: string;
  points: number;
  correct: boolean;
  selectedOptionIds: Guid[];
  correctOptionIds: Guid[];
  options: ReviewOptionDto[];
  workedSolution?: string | null;
}
export interface SkillResultDto {
  skill: string;
  pointsEarned: number;
  questions: number;
  accuracyPercent: number;
  weak: boolean;
}
export interface LessonRecommendationDto {
  lessonId: Guid;
  moduleTitle: string;
  lessonTitle: string;
  weakSkills: string[];
  misses: number;
}
export interface RecommendationsDto {
  attemptId: Guid;
  kind: string;
  skills: SkillResultDto[];
  lessons: LessonRecommendationDto[];
  readinessIsEstimate: boolean;
  readinessDisclaimer: string;
}
export interface CheckResultDto {
  itemId: Guid;
  correct: boolean;
  correctOptionIds: Guid[];
  rationales: { optionId: Guid; rationale: string }[];
  explanation: string;
  workedSolution?: string | null;
}

// ---------- practice ----------
export interface PracticeSessionInput {
  courseIds?: Guid[];
  topics?: string[];
  skills?: string[];
  difficulties?: Difficulty[];
  objectives?: string[];
  unseenOnly?: boolean;
  previousMistakes?: boolean;
  bookmarkedOnly?: boolean;
  dueForReview?: boolean;
  count?: number;
}
export interface PracticeItemView {
  itemId: Guid;
  sortOrder: number;
  courseId: Guid;
  type: QuestionType;
  stem: string;
  options: LearnerOptionDto[];
  selectedOptionIds: Guid[];
  checked: boolean;
  caseGroupId: Guid | null;
  caseTitle: string | null;
  caseExhibitMarkdown: string | null;
  questionId?: Guid;
  /** SM-2 quality (0–5) the learner chose after checking, when any. */
  selfGrade?: number | null;
}
export interface PracticeSessionView {
  id: Guid;
  createdAt: IsoDate;
  finishedAt: IsoDate | null;
  scoringPolicy: MultiSelectScoring;
  items: PracticeItemView[];
}
export interface PracticeSessionSummary {
  id: Guid;
  createdAt: IsoDate;
  finishedAt: IsoDate | null;
  items: number;
  answered: number;
}
export interface PracticeResult {
  sessionId: Guid;
  total: number;
  answered: number;
  correct: number;
  pointsEarned: number;
  review: ReviewItemDto[];
  readinessIsEstimate: boolean;
  readinessDisclaimer: string;
}
export interface BookmarkDto {
  questionId: Guid;
  courseId: Guid;
  stem: string;
  createdAt: IsoDate;
}
export interface DueReviewDto {
  questionId: Guid;
  courseId: Guid;
  dueAt: IsoDate;
  intervalDays: number;
  repetitions: number;
  easeFactor: number;
}

// ---------- accommodations / policy ----------
export interface AccommodationInput {
  userId: Guid;
  assessmentId: Guid | null;
  extraTimePercent: number;
  untimed: boolean;
  reason: string;
}
export interface AccommodationDto extends AccommodationInput {
  id: Guid;
  grantedBy: Guid;
  createdAt: IsoDate;
  revokedAt: IsoDate | null;
}
export interface MyAccommodationDto {
  id: Guid;
  assessmentId: Guid | null;
  extraTimePercent: number;
  untimed: boolean;
  createdAt: IsoDate;
}
export interface AssessmentPolicyInput {
  allowPause: boolean;
  maxPauseMinutes: number;
  maxExposuresPerQuestion: number | null;
}
export interface AssessmentPolicyDto extends AssessmentPolicyInput {
  assessmentId: Guid;
  updatedAt: IsoDate | null;
}

// ---------- regrades / analytics ----------
export interface RegradeDto {
  id: Guid;
  questionId: Guid;
  questionVersionId: Guid;
  oldCorrectOptionIds: Guid[];
  newCorrectOptionIds: Guid[];
  reason: string;
  proposedBy: Guid;
  proposedAt: IsoDate;
  status: RegradeStatus;
  decidedBy: Guid | null;
  decidedAt: IsoDate | null;
  decisionNote: string | null;
  affectedAttempts: number;
  changedAttempts: number;
}
export interface RegradeResultDto {
  attemptId: Guid;
  userId: Guid;
  oldPointsEarned: number;
  newPointsEarned: number;
  oldScorePercent: number;
  newScorePercent: number;
  oldPassed: boolean;
  newPassed: boolean;
}
export interface RegradeDetailDto {
  regrade: RegradeDto;
  results: RegradeResultDto[];
  flaggedCertificateIds: Guid[];
  issuedCertificateCodes: string[];
}
export interface CertificateFlagDto {
  id: Guid;
  certificateId: Guid;
  certificateCode: string;
  userId: Guid;
  regradeId: Guid | null;
  reason: string;
  status: CertificateFlagStatus;
  decidedBy: Guid | null;
  decidedAt: IsoDate | null;
  decisionNote: string | null;
  createdAt: IsoDate;
}
export interface OptionStatDto {
  optionId: Guid;
  sortOrder: number;
  text: string;
  isCorrect: boolean;
  selectedCount: number;
  selectedProportion: number | null;
}
export interface ItemAnalyticsDto {
  questionId: Guid;
  externalId: string;
  questionVersionId: Guid;
  version: number;
  n: number;
  minimumN: number;
  sufficientData: boolean;
  difficulty: number | null;
  difficultyLow: number | null;
  difficultyHigh: number | null;
  discrimination: number | null;
  discriminationLow: number | null;
  discriminationHigh: number | null;
  distractors: OptionStatDto[];
  exposures: number;
  distinctLearners: number;
  note: string;
}

// ---------- certificates ----------
export interface CertificateTemplateInput {
  name: string;
  titleText: string;
  primaryColor: string;
  accentColor: string;
  logoResourceId: Guid | null;
  signatureName: string;
  signatureTitle: string;
}
export interface CertificateTemplateDto extends CertificateTemplateInput {
  id: Guid;
  archived: boolean;
  createdAt: IsoDate;
  updatedAt: IsoDate;
}
export interface CourseTemplateDto {
  courseId: Guid;
  templateId: Guid | null;
}
export interface CorrectionDto {
  id: Guid;
  certificateId: Guid;
  certificateCode: string;
  userId: Guid;
  currentName: string;
  requestedName: string;
  reason: string;
  status: CertificateRequestStatus;
  decidedBy: Guid | null;
  decidedAt: IsoDate | null;
  decisionNote: string | null;
  createdAt: IsoDate;
}
export interface AppealDto {
  id: Guid;
  certificateId: Guid;
  certificateCode: string;
  userId: Guid;
  reason: string;
  revocationReason: string | null;
  status: CertificateRequestStatus;
  decidedBy: Guid | null;
  decidedAt: IsoDate | null;
  decisionNote: string | null;
  createdAt: IsoDate;
}

/** Studio resource (subset of ResourceDto used by pickers). */
export interface StudioResourceDto {
  id: Guid;
  courseId: Guid;
  lessonId: Guid | null;
  kind: string;
  fileName: string;
  contentType: string;
  isPremium: boolean;
}

export const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];

// ---------- query keys ----------
export const examKeys = {
  caseGroups: (courseId: string) => ['exams', 'case-groups', courseId] as const,
  resources: (courseId: string) => ['exams', 'resources', courseId] as const,
  shared: (q: string, page: number) => ['exams', 'shared', q, page] as const,
  courseChallenges: (courseId: string, status: string) =>
    ['exams', 'course-challenges', courseId, status] as const,
  reviewChallenges: (status: string) => ['exams', 'review-challenges', status] as const,
  myChallenges: ['exams', 'my-challenges'] as const,
  regrades: (status: string) => ['exams', 'regrades', status] as const,
  regrade: (id: string) => ['exams', 'regrade', id] as const,
  flags: (status: string) => ['exams', 'flags', status] as const,
  analytics: (assessmentId: string) => ['exams', 'analytics', assessmentId] as const,
  questionAnalytics: (id: string) => ['exams', 'question-analytics', id] as const,
  practiceSessions: ['exams', 'practice-sessions'] as const,
  practiceSession: (id: string) => ['exams', 'practice-session', id] as const,
  bookmarks: ['exams', 'bookmarks'] as const,
  due: ['exams', 'due'] as const,
  myAccommodations: ['exams', 'my-accommodations'] as const,
  accommodations: (userId: string, includeRevoked: boolean) =>
    ['exams', 'accommodations', userId, includeRevoked] as const,
  policy: (assessmentId: string) => ['exams', 'policy', assessmentId] as const,
  templates: (includeArchived: boolean) => ['exams', 'templates', includeArchived] as const,
  courseTemplate: (courseId: string) => ['exams', 'course-template', courseId] as const,
  myCorrections: ['exams', 'my-corrections'] as const,
  myAppeals: ['exams', 'my-appeals'] as const,
  corrections: (status: string) => ['exams', 'corrections', status] as const,
  appeals: (status: string) => ['exams', 'appeals', status] as const,
  recommendations: (attemptId: string) => ['exams', 'recommendations', attemptId] as const,
};

// ---------- hooks ----------
export const useCaseGroups = (courseId: string) =>
  useQuery({
    queryKey: examKeys.caseGroups(courseId),
    queryFn: () => api<CaseGroupDto[]>(`/api/studio/courses/${courseId}/case-groups`),
    enabled: !!courseId,
  });

export const useCourseResources = (courseId: string) =>
  useQuery({
    queryKey: examKeys.resources(courseId),
    queryFn: () => api<StudioResourceDto[]>(`/api/studio/courses/${courseId}/resources`),
    enabled: !!courseId,
  });

export const useMyAccommodations = (enabled = true) =>
  useQuery({
    queryKey: examKeys.myAccommodations,
    queryFn: () => api<MyAccommodationDto[]>('/api/me/accommodations'),
    enabled,
  });

export const useBookmarks = () =>
  useQuery({
    queryKey: examKeys.bookmarks,
    queryFn: () => api<BookmarkDto[]>('/api/me/question-bookmarks'),
  });

export const useDueReviews = () =>
  useQuery({
    queryKey: examKeys.due,
    queryFn: () => api<DueReviewDto[]>(`/api/practice/review/due${qs({ limit: 50 })}`),
  });

export const usePracticeSessions = () =>
  useQuery({
    queryKey: examKeys.practiceSessions,
    queryFn: () => api<PracticeSessionSummary[]>('/api/practice/sessions'),
  });

export const useMyChallenges = () =>
  useQuery({
    queryKey: examKeys.myChallenges,
    queryFn: () => api<MyChallengeDto[]>('/api/me/question-challenges'),
  });

export const useTemplates = (includeArchived = false, enabled = true) =>
  useQuery({
    queryKey: examKeys.templates(includeArchived),
    queryFn: () =>
      api<CertificateTemplateDto[]>(`/api/certificate-templates${qs({ includeArchived })}`),
    enabled,
  });

export const useShared = (q: string, page: number) =>
  useQuery({
    queryKey: examKeys.shared(q, page),
    queryFn: () =>
      api<Paged<SharedQuestionDto>>(`/api/studio/shared-questions${qs({ q, page, pageSize: 20 })}`),
  });

/** Multipart POST helper (the shared client sends FormData untouched). */
export async function postForm<T>(
  path: string,
  form: FormData,
): Promise<{ status: number; body: T }> {
  const res = await apiFetch(path, { method: 'POST', body: form });
  const text = await res.text();
  return { status: res.status, body: (text ? JSON.parse(text) : undefined) as T };
}

/** Pretty numeric helpers for analytics. */
export function fmtStat(v: number | null | undefined, digits = 2): string {
  return v === null || v === undefined ? '—' : v.toFixed(digits);
}
