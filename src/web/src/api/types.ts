/**
 * DTOs mirroring docs/api-contract.md (v1). JSON is camelCase, enums are strings,
 * errors are RFC 7807 problem details. Fields the contract does not spell out are
 * marked "assumed" and are always treated as optional by the UI.
 */

export type Guid = string;
export type IsoDate = string;

export interface ProblemDetails {
  status: number;
  title: string;
  type: string;
  detail?: string;
  errors?: Record<string, string[]>;
}

export interface Paged<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// ---------- Enums ----------
export const ROLES = [
  'Student',
  'Instructor',
  'Reviewer',
  'Moderator',
  'Support',
  'Finance',
  'Admin',
  'SuperAdmin',
] as const;
export type Role = (typeof ROLES)[number];

export type CourseStatus =
  'Draft' | 'InReview' | 'ChangesRequested' | 'Approved' | 'Published' | 'Updating' | 'Archived';
export const COURSE_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Executive'] as const;
export type CourseLevel = (typeof COURSE_LEVELS)[number];
export type VideoStatus =
  | 'Draft'
  | 'AwaitingApproval'
  | 'AwaitingSourceFile'
  | 'Uploading'
  | 'Processing'
  | 'InContentReview'
  | 'Ready'
  | 'Restricted'
  | 'Failed';
export type UploadSessionStatus =
  | 'AwaitingApproval'
  | 'Approved'
  | 'AwaitingSourceFile'
  | 'Uploading'
  | 'Completed'
  | 'Cancelled'
  | 'Failed'
  | 'Expired';
export type QuestionType = 'SingleChoice' | 'MultipleSelect';
export const QUESTION_STATES = ['Draft', 'Reviewed', 'Approved', 'Active', 'Retired'] as const;
export type QuestionState = (typeof QUESTION_STATES)[number];
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export const ASSESSMENT_KINDS = [
  'LessonPractice',
  'ModuleTest',
  'FinalAssessment',
  'MockExam',
  'Diagnostic',
] as const;
export type AssessmentKind = (typeof ASSESSMENT_KINDS)[number];
export type AssessmentMode = 'Practice' | 'Exam';
export type MultiSelectScoring = 'AllOrNothing' | 'PartialCredit';
export type AttemptStatus = 'InProgress' | 'Submitted' | 'Expired';
export type ApplicationStatus =
  'Submitted' | 'InReview' | 'ChangesRequested' | 'Approved' | 'Rejected';
export type ChannelMode = 'MastemyManaged' | 'InstructorOwned';
export type EntitlementSource = 'Purchase' | 'Organization' | 'Grant' | 'Subscription';

// ---------- Identity ----------
export interface UserDto {
  id: Guid;
  email: string;
  displayName: string;
  preferredLanguage: string;
  roles: Role[];
}
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: IsoDate;
  user: UserDto;
}
export interface AdminUserDto extends UserDto {
  isSuspended?: boolean; // assumed
  createdAt?: IsoDate; // assumed
}
export type PlatformSettings = Record<string, boolean>;
export interface AuditEntry {
  id: number;
  actorId?: Guid | null;
  action: string;
  entityType: string;
  entityId: string;
  details?: string | null;
  createdAt: IsoDate;
}

// ---------- Onboarding ----------
export interface InstructorApplicationDto {
  id: Guid;
  userId?: Guid;
  applicantName?: string; // assumed
  applicantEmail?: string; // assumed
  headline: string;
  bio: string;
  expertiseEvidence: string;
  testVideoUrl: string;
  status: ApplicationStatus;
  reviewerNotes?: string | null;
  createdAt?: IsoDate;
  reviewedAt?: IsoDate | null;
}
export interface OnboardingStatus {
  registrationOpen: boolean;
  inviteOnly: boolean;
  paused: boolean;
  myApplication?: InstructorApplicationDto | null;
}

// ---------- Catalog ----------
export interface CategoryDto {
  id: number;
  slug: string;
  nameEn: string;
  nameAr: string;
  parentId: number | null;
  isAcademy: boolean;
  courseCount: number;
}
export interface InstructorSummary {
  /** The API sends userId; id is kept for older mocks. */
  userId?: Guid;
  id?: Guid;
  displayName: string;
  role?: string;
  headline?: string; // assumed
}
export interface CourseCardDto {
  id: Guid;
  slug: string;
  title: string;
  subtitle?: string;
  level: CourseLevel;
  language: string;
  status?: CourseStatus;
  /** Category slugs. */
  categories?: string[];
  /** The catalogue sends display names; the course detail sends InstructorSummary objects. */
  instructors?: InstructorSummary[] | string[];
  videoCount?: number;
  questionCount?: number;
  totalDurationSeconds?: number;
  updatedAt?: IsoDate;
  publishedAt?: IsoDate | null;
  isAcademy?: boolean; // assumed
  ratingAverage?: number | null;
  ratingCount?: number;
}
export interface LessonSummary {
  id: Guid;
  title: string;
  durationSeconds: number;
  isPreview: boolean;
  hasVideo: boolean;
}
export interface ModuleSummary {
  id: Guid;
  title: string;
  lessons: LessonSummary[];
}
export interface PackageDto {
  id: Guid;
  title: string;
  contents: string; // newline separated list of included paid services
  price: number;
  currency: string;
  accessDays: number;
  approvalStatus?: 'Proposed' | 'Approved' | 'Rejected';
  courseId?: Guid;
  courseTitle?: string; // assumed (admin list)
}
export interface CourseDetailDto extends CourseCardDto {
  description: string;
  audience: string;
  prerequisites: string;
  outcomes: string[];
  modules: ModuleSummary[];
  videoCount: number;
  questionCount: number;
  totalDurationSeconds: number;
  instructors: InstructorSummary[];
  packages: PackageDto[];
  reviewedAt: IsoDate | null;
  ratingAverage?: number | null;
  ratingCount: number;
  credentialType?: string; // assumed (Course.CredentialType)
  refundTerms?: string; // assumed; UI falls back to platform policy text
  promoVideoId?: string | null;
}
export interface CourseReviewDto {
  id: Guid;
  rating: number;
  body: string;
  authorName?: string;
  verifiedPurchase: boolean;
  instructorReply?: string | null;
  createdAt: IsoDate;
}

// ---------- Studio ----------
export interface StudioCourseDto {
  id: Guid;
  slug: string;
  code?: string;
  title: string;
  subtitle?: string;
  description: string;
  audience: string;
  prerequisites: string;
  outcomes: string[];
  goals?: string; // assumed
  language: string;
  level: CourseLevel;
  status: CourseStatus;
  categoryIds?: number[];
  modules: StudioModuleDto[];
  updatedAt?: IsoDate;
}
export interface StudioModuleDto {
  id: Guid;
  code?: string;
  title: string;
  sortOrder?: number;
  lessons: StudioLessonDto[];
}
export interface StudioLessonDto {
  id: Guid;
  code?: string;
  title: string;
  objective: string;
  sortOrder?: number;
  isPreview?: boolean;
  notesMarkdown?: string;
  premiumNotesMarkdown?: string | null;
  video?: VideoAssetDto | null;
}
export interface CourseInput {
  title: string;
  subtitle?: string;
  description: string;
  audience: string;
  prerequisites: string;
  outcomes: string[];
  goals?: string;
  language: string;
  level: CourseLevel;
  categoryIds: number[];
}
export interface ValidationResult {
  ok: boolean;
  issues: string[];
}
export interface ReviewCommentDto {
  id: Guid;
  lessonId?: Guid | null;
  questionId?: Guid | null;
  videoTimestampSeconds?: number | null;
  authorName?: string;
  body: string;
  createdAt: IsoDate;
}

// ---------- YouTube ----------
export interface YouTubeChannelDto {
  id: Guid;
  channelId: string;
  title: string;
  mode: ChannelMode;
}
export interface VideoAssetDto {
  id: Guid;
  youTubeVideoId: string;
  /** Mastemy channel record the video belongs to (VideoAssetDto.ChannelId). */
  channelId?: Guid | null;
  title: string;
  durationSeconds: number;
  status: VideoStatus;
  statusReason?: string | null;
  privacyStatus?: string | null;
  embeddable?: boolean | null;
  lastCheckedAt?: IsoDate | null;
  lessonId?: Guid | null; // assumed for admin list
  courseTitle?: string; // assumed for admin list
}
export interface PlaylistPreviewItem {
  videoId: string;
  title: string;
  durationSeconds: number;
}
export interface UploadSessionDto {
  id: Guid;
  status: UploadSessionStatus;
  confirmedOffset: number;
  fileSize?: number;
  failureReason?: string | null;
  resultVideoId?: string | null;
}

// ---------- Learning ----------
export interface LearnLesson {
  id: Guid;
  title: string;
  durationSeconds: number;
  isPreview: boolean;
  youtubeVideoId: string | null;
  completed?: boolean;
  positionSeconds?: number;
}
export interface LearnCourseDto {
  id: Guid;
  slug: string;
  title: string;
  modules: { id: Guid; title: string; lessons: LearnLesson[] }[];
  enrolled?: boolean;
  lastLessonId?: Guid | null;
}
export interface AssessmentSummary {
  id: Guid;
  title: string;
  kind: AssessmentKind;
  mode: AssessmentMode;
  timeLimitMinutes: number | null;
  maxAttempts: number | null;
  passPercent: number;
  multiSelectScoring: MultiSelectScoring;
  questionCount: number;
  isPremium: boolean;
  countsTowardCertificate: boolean;
  attemptsUsed?: number;
}
export interface LessonViewDto {
  lesson: {
    id: Guid;
    title: string;
    objective: string;
    durationSeconds: number;
    courseSlug?: string;
    positionSeconds?: number; // assumed: resume position for logged-in learner
  };
  youtubeVideoId: string | null;
  notesMarkdown: string;
  premiumNotesMarkdown: string | null;
  premiumLocked: boolean;
  assessments: AssessmentSummary[];
}
export interface LearnerNoteDto {
  id: Guid;
  lessonId: Guid;
  lessonTitle?: string;
  courseSlug?: string;
  timestampSeconds: number | null;
  body: string;
  tags: string;
  createdAt: IsoDate;
  updatedAt: IsoDate;
}
export interface EntitlementDto {
  id: Guid;
  /** The API sends the course as a reference; the flat fields are kept for older mocks. */
  course?: { id: Guid; slug: string; title: string };
  courseId?: Guid;
  courseTitle?: string;
  courseSlug?: string;
  packageId?: Guid | null;
  packageTitle?: string | null;
  source: EntitlementSource;
  startsAt: IsoDate;
  endsAt: IsoDate | null;
}
export interface CertificateDto {
  id?: Guid;
  code: string;
  recipientName: string;
  courseTitle: string;
  assessmentCriteria?: string;
  scorePercent?: number;
  status: 'Valid' | 'Revoked';
  issuedAt: IsoDate;
  revocationReason?: string | null;
}
export interface AttemptSummaryDto {
  id: Guid;
  assessmentId: Guid;
  assessmentTitle?: string;
  status: AttemptStatus;
  scorePercent?: number | null;
  passed?: boolean | null;
  startedAt: IsoDate;
  submittedAt?: IsoDate | null;
}
export interface DashboardDto {
  enrollments: {
    course: CourseCardDto;
    progressPercent: number;
    lastLessonId: Guid | null;
  }[];
  entitlements: EntitlementDto[];
  certificates: CertificateDto[];
  recentAttempts: AttemptSummaryDto[];
}

// ---------- Questions ----------
export interface QuestionOptionInput {
  id?: Guid;
  text: string;
  isCorrect: boolean;
  rationale: string;
}
export interface QuestionInput {
  externalId: string;
  type: QuestionType;
  language: string;
  stem: string;
  explanation: string;
  difficulty: Difficulty;
  skillCode: string;
  certificationObjective: string;
  tags: string;
  sourceReference: string;
  allowShuffle: boolean;
  moduleId?: Guid | null;
  lessonId?: Guid | null;
  options: QuestionOptionInput[];
  /** Wave 3 (§13): optional on input; `meta` on read. */
  cognitiveLevel?: string | null;
  caseGroupId?: Guid | null;
  caseGroupOrder?: number | null;
}
export interface QuestionDto extends QuestionInput {
  id: Guid;
  state: QuestionState;
  currentVersion: number;
  updatedAt?: IsoDate;
  /** Wave 3 provenance of copied questions and staff reusable flag. */
  sourceQuestionId?: Guid | null;
  sourceVersion?: number | null;
  sourceCourseId?: Guid | null;
  reusable?: boolean;
}
export interface ImportPreviewRow {
  row: number;
  externalId: string;
  ok: boolean;
  errors: string[];
}
export interface ImportPreview {
  batchId: Guid;
  rows: ImportPreviewRow[];
  validCount: number;
  errorCount: number;
}

// ---------- Assessment ----------
export interface AssessmentInput {
  title: string;
  kind: AssessmentKind;
  mode: AssessmentMode;
  timeLimitMinutes: number | null;
  maxAttempts: number | null;
  passPercent: number;
  multiSelectScoring: MultiSelectScoring;
  questionCount: number;
  isPremium: boolean;
  countsTowardCertificate: boolean;
  moduleId?: Guid | null;
  lessonId?: Guid | null;
  questionIds: Guid[];
}
export interface StudioAssessmentDto extends AssessmentInput {
  id: Guid;
}
export interface AttemptItemView {
  itemId: Guid;
  type: QuestionType;
  stem: string;
  options: { id: Guid; text: string }[];
  selectedOptionIds: Guid[];
  flagged: boolean;
}
export interface AttemptView {
  id: Guid;
  assessmentId?: Guid;
  assessmentTitle?: string; // assumed
  mode?: AssessmentMode; // assumed
  status: AttemptStatus;
  deadlineAt: IsoDate | null;
  serverNow: IsoDate;
  items: AttemptItemView[];
  result?: AttemptResult | null; // assumed: present on GET when submitted
}
export interface ReviewItem {
  itemId: Guid;
  stem?: string;
  correct: boolean;
  correctOptionIds: Guid[];
  selectedOptionIds?: Guid[];
  explanation?: string;
  rationales?: Record<Guid, string> | { optionId: Guid; text: string }[];
}
export interface AttemptResult {
  scorePercent: number;
  passed: boolean;
  passPercent: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  topics: { tag: string; correct: number; total: number }[];
  review?: ReviewItem[] | null;
  certificateCode?: string | null;
}
export interface PracticeCheck {
  correct: boolean;
  correctOptionIds: Guid[];
  rationales: Record<Guid, string>;
}

// ---------- Commerce ----------
export interface PackageInput {
  title: string;
  contents: string;
  price: number;
  currency: string;
  accessDays: number;
}
export interface RefundDto {
  id: Guid;
  orderId: Guid;
  amount: number;
  currency?: string;
  reason: string;
  status: 'Requested' | 'Completed' | 'Rejected';
  createdAt: IsoDate;
}
export interface EarningsEntry {
  id: Guid;
  orderId: Guid;
  courseId: Guid;
  courseTitle?: string;
  kind: 'Sale' | 'RefundReversal';
  grossAmount: number;
  instructorAmount: number;
  platformAmount: number;
  currency: string;
  createdAt: IsoDate;
}
export interface EarningsDto {
  entries: EarningsEntry[];
  totals: { currency: string; instructorAmount: number; grossSales: number; entries: number }[];
}
