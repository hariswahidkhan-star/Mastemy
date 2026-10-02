/**
 * Wave 2 API surface: discovery, discussions, announcements, notifications, issues, resources and captions,
 * certificates (PDF/visibility), published snapshots and diffs, YouTube publishing extras and enterprise
 * workspaces. Field names mirror the C# DTOs in src/Mastemy.Api/Modules/** (camelCase JSON).
 */
import { useQuery } from '@tanstack/react-query';
import { api, ApiError, getAccessToken, qs, refreshSession, apiUrl } from './client';
import type { CourseLevel, CourseStatus, Guid, IsoDate } from './types';

// ---------- Discovery ----------
export interface CourseCardLiteDto {
  id: Guid;
  slug: string;
  title: string;
  subtitle: string;
  level: CourseLevel;
  language: string;
  minPrice: number | null;
  currency: string | null;
}
export interface WishlistItemDto {
  course: CourseCardLiteDto;
  addedAt: IsoDate;
}
export interface RecentlyViewedDto {
  course: CourseCardLiteDto;
  viewedAt: IsoDate;
}
export interface ComparePackageDto {
  id: Guid;
  title: string;
  contents: string;
  price: number;
  currency: string;
  accessDays: number;
}
export interface CompareCourseDto {
  id: Guid;
  slug: string;
  title: string;
  level: CourseLevel;
  language: string;
  lessonCount: number;
  readyVideoCount: number;
  activeQuestionCount: number;
  totalDurationSeconds: number;
  packages: ComparePackageDto[];
  ratingAverage: number | null;
  ratingCount: number;
  reviewedAt: IsoDate | null;
  credentialType: string;
}

// ---------- Discussions ----------
export interface ThreadSummaryDto {
  id: Guid;
  courseId: Guid;
  lessonId: Guid | null;
  authorId: Guid;
  authorName: string;
  title: string;
  body: string;
  resolved: boolean;
  hidden: boolean;
  replyCount: number;
  createdAt: IsoDate;
  updatedAt: IsoDate;
}
export interface ReplyDto {
  id: Guid;
  threadId: Guid;
  authorId: Guid;
  authorName: string;
  body: string;
  isInstructorReply: boolean;
  hidden: boolean;
  createdAt: IsoDate;
}
export interface ThreadDetailDto {
  thread: ThreadSummaryDto;
  replies: ReplyDto[];
  /** Author-only notice when the thread was hidden by moderation. */
  moderation?: import('./finala').ModerationNoticeDto | null;
}
export interface EngagementPage<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// ---------- Announcements ----------
export interface AnnouncementDto {
  id: Guid;
  courseId: Guid;
  authorId: Guid;
  authorName: string;
  title: string;
  body: string;
  createdAt: IsoDate;
}
export interface AnnouncementCreatedDto {
  announcement: AnnouncementDto;
  notifiedCount: number;
  /** True when the Idempotency-Key matched an earlier post: nothing new was sent. */
  duplicate?: boolean;
}

// ---------- Notifications ----------
export const NOTIFICATION_KINDS = [
  'announcement',
  'reply',
  'review_reply',
  'course_updated',
  'certificate',
  'issue_reported',
] as const;
export interface NotificationDto {
  id: Guid;
  kind: string;
  title: string;
  link: string;
  readAt: IsoDate | null;
  createdAt: IsoDate;
}
export interface NotificationPageDto extends EngagementPage<NotificationDto> {
  unreadCount: number;
}
export interface PreferenceDto {
  kind: string;
  inApp: boolean;
  email: boolean;
}
export interface PreferencesDto {
  emailAvailable: boolean;
  items: PreferenceDto[];
}

// ---------- Issues ----------
export const ISSUE_CATEGORIES = [
  'VideoUnavailable',
  'ContentError',
  'QuestionError',
  'Other',
] as const;
export interface IssueDto {
  id: number;
  courseId: Guid;
  lessonId: Guid | null;
  category: string;
  body: string;
  reporterId: Guid | null;
  reporterName: string;
  createdAt: IsoDate;
}

// ---------- Resources and captions ----------
export interface ResourceDto {
  id: Guid;
  courseId: Guid;
  lessonId: Guid | null;
  kind: 'Resource' | 'Caption' | string;
  language: string;
  fileName: string;
  contentType: string;
  sizeBytes: number;
  sha256: string;
  isPremium: boolean;
  version: number;
  createdAt: IsoDate;
}
export interface LearnerResourceDto {
  id: Guid;
  lessonId: Guid | null;
  kind: string;
  language: string;
  fileName: string;
  contentType: string;
  sizeBytes: number;
  isPremium: boolean;
  locked: boolean;
  version: number;
  downloadUrl: string | null;
}
export interface ResourceUsageDto {
  usedBytes: number;
  quotaBytes: number;
  maxFileBytes: number;
}
export interface CaptionTrackDto {
  id: Guid;
  language: string;
  url: string;
  version: number;
}
export interface TranscriptMatch {
  captionId: Guid;
  language: string;
  startSeconds: number;
  endSeconds: number;
  start: string;
  text: string;
}

// ---------- Certificates ----------
export interface MyCertificateDto {
  id: Guid;
  code: string;
  courseId: Guid;
  courseTitle: string;
  recipientName: string;
  issuedAt: IsoDate;
  status: 'Valid' | 'Revoked';
  scorePercent: number;
  assessmentCriteria: string;
  publiclyVisible: boolean;
  kind?: 'AssessedKnowledge' | 'Completion';
  title?: string;
}

// ---------- Snapshots and diff ----------
export interface SnapshotLesson {
  id: Guid;
  code: string;
  title: string;
  objective: string;
  sortOrder: number;
  isPreview: boolean;
  videoAssetId: Guid | null;
  youtubeVideoId: string | null;
  durationSeconds: number;
  notesMarkdown: string;
  premiumNotesMarkdown: string | null;
  notesVersion: number;
}
export interface SnapshotModule {
  id: Guid;
  code: string;
  title: string;
  sortOrder: number;
  lessons: SnapshotLesson[];
}
export interface CourseSnapshotPayload {
  title: string;
  subtitle: string;
  description: string;
  audience: string;
  prerequisites: string;
  outcomes: string;
  language: string;
  level: CourseLevel;
  credentialType: string;
  passThresholdPercent: number;
  promoVideoId: string | null;
  categories: number[];
  modules: SnapshotModule[];
}
export interface PublishedPreviewDto {
  courseId: Guid;
  version: number;
  publishedAt: IsoDate;
  publishedBy: Guid;
  payload: CourseSnapshotPayload;
}
export interface FieldChangeDto {
  field: string;
  before: string | null;
  after: string | null;
}
export interface DiffModuleDto {
  id: Guid;
  title: string;
}
export interface DiffLessonDto {
  id: Guid;
  moduleId: Guid;
  title: string;
}
export interface ChangedEntityDto {
  id: Guid;
  title: string;
  changes: FieldChangeDto[];
}
export interface CourseDiffDto {
  courseId: Guid;
  status: CourseStatus;
  baseVersion: number | null;
  hasChanges: boolean;
  courseFields: FieldChangeDto[];
  modulesAdded: DiffModuleDto[];
  modulesRemoved: DiffModuleDto[];
  modulesChanged: ChangedEntityDto[];
  lessonsAdded: DiffLessonDto[];
  lessonsRemoved: DiffLessonDto[];
  lessonsChanged: ChangedEntityDto[];
}

// ---------- YouTube publishing ----------
export interface ChannelInfoDto {
  id: Guid;
  channelId: string;
  title: string;
  mode: 'MastemyManaged' | 'InstructorOwned';
  ownerUserId: Guid | null;
  isActive: boolean;
  authorized: boolean;
  grantedScopes: string | null;
  authorizedAt: IsoDate | null;
  revokedAt: IsoDate | null;
}
export interface PlaylistSyncResult {
  playlistId: string;
  created: boolean;
  videoCount: number;
  inserted: number;
  moved: number;
  removed: number;
  skippedLessonIds: Guid[];
}
export interface CaptionPushResult {
  captionId: string;
  videoId: string;
  language: string;
}

// ---------- Enterprise ----------
export const ORG_ROLES = ['Member', 'Manager', 'Admin'] as const;
export interface OrgDto {
  id: Guid;
  name: string;
  slug: string;
  seatLimit: number;
  seatsUsed: number;
  isActive: boolean;
  createdAt: IsoDate;
}
export interface MemberDto {
  userId: Guid;
  /** Only org Admins and staff receive member emails; Managers get null. */
  email: string | null;
  displayName: string;
  role: string;
  department: string;
  joinedAt: IsoDate;
}
export interface BulkRowResult {
  line: number;
  email: string;
  error: string | null;
}
export interface BulkPreviewDto {
  total: number;
  valid: number;
  seatsAvailable: number;
  canCommit: boolean;
  rows: BulkRowResult[];
}
export interface BulkInviteResultDto {
  total: number;
  invited: number;
  seatsAvailable: number;
  rows: BulkRowResult[];
  invitations: InvitationCreatedDto[];
}
export interface InvitationCreatedDto {
  id: Guid;
  email: string;
  role: string;
  department: string;
  expiresAt: IsoDate;
  token: string;
  emailQueued: boolean;
}
export interface InvitationDto {
  id: Guid;
  email: string;
  role: string;
  department: string;
  invitedBy: Guid;
  createdAt: IsoDate;
  expiresAt: IsoDate;
}
export interface AcceptedInvitationDto {
  organizationId: Guid;
  organizationName: string;
  organizationSlug: string;
  role: string;
  department: string;
}
export interface AssignmentDto {
  id: Guid;
  courseId: Guid;
  courseTitle: string;
  scope: 'Organization' | 'Department' | 'User' | string;
  userId: Guid | null;
  department: string | null;
  grantsPremium: boolean;
  dueAt: IsoDate | null;
  createdAt: IsoDate;
}
export interface ProgressRowDto {
  userId: Guid;
  email: string;
  displayName: string;
  department: string;
  courseId: Guid;
  courseTitle: string;
  completedLessons: number;
  totalLessons: number;
  progressPercent: number;
  bestScorePercent: number | null;
  passed: boolean;
  certificateCode: string | null;
  dueAt: IsoDate | null;
  overdue: boolean;
}
export interface MyOrgAssignmentDto {
  assignmentId: Guid;
  courseId: Guid;
  courseTitle: string;
  courseSlug: string;
  grantsPremium: boolean;
  dueAt: IsoDate | null;
  overdue: boolean;
}
export interface MyOrgDto {
  id: Guid;
  name: string;
  slug: string;
  role: string;
  department: string;
  assignments: MyOrgAssignmentDto[];
}

// ---------- Query keys ----------
export const w2keys = {
  wishlist: ['me', 'wishlist'] as const,
  recent: ['me', 'recently-viewed'] as const,
  compare: (ids: string[]) => ['compare', ids] as const,
  related: (courseId: string) => ['related', courseId] as const,
  discussions: (courseId: string, params: object) => ['discussions', courseId, params] as const,
  discussionsAll: (courseId: string) => ['discussions', courseId] as const,
  thread: (id: string) => ['discussion', id] as const,
  announcements: (courseId: string) => ['announcements', courseId] as const,
  notifications: ['me', 'notifications'] as const,
  notificationPrefs: ['me', 'notification-preferences'] as const,
  issues: (courseId: string) => ['studio', 'issues', courseId] as const,
  studioResources: (courseId: string) => ['studio', 'resources', courseId] as const,
  resourceUsage: (courseId: string) => ['studio', 'resources', courseId, 'usage'] as const,
  lessonResources: (lessonId: string) => ['learn', 'resources', lessonId] as const,
  captions: (lessonId: string) => ['learn', 'captions', lessonId] as const,
  myCertificates: ['me', 'certificates'] as const,
  publishedPreview: (courseId: string) => ['studio', 'published-preview', courseId] as const,
  diff: (courseId: string) => ['review', 'diff', courseId] as const,
  channelsInfo: ['youtube', 'channels', 'info'] as const,
  adminOrgs: ['admin', 'orgs'] as const,
  org: (id: string) => ['orgs', id] as const,
  orgMembers: (id: string) => ['orgs', id, 'members'] as const,
  orgAssignments: (id: string) => ['orgs', id, 'assignments'] as const,
  orgReport: (id: string) => ['orgs', id, 'report'] as const,
  orgInvitations: (id: string) => ['orgs', id, 'invitations'] as const,
  myOrgs: ['me', 'organizations'] as const,
};

// ---------- Hooks ----------
export function useWishlist(enabled = true) {
  return useQuery({
    queryKey: w2keys.wishlist,
    queryFn: () => api<WishlistItemDto[]>('/api/me/wishlist'),
    enabled,
  });
}

export function useRecentlyViewed() {
  return useQuery({
    queryKey: w2keys.recent,
    queryFn: () => api<RecentlyViewedDto[]>('/api/me/recently-viewed'),
  });
}

export function useRelated(courseId: string) {
  return useQuery({
    queryKey: w2keys.related(courseId),
    queryFn: () => api<CourseCardLiteDto[]>(`/api/courses/${courseId}/related`),
  });
}

export function useCompare(ids: string[]) {
  return useQuery({
    queryKey: w2keys.compare(ids),
    queryFn: () => api<CompareCourseDto[]>(`/api/courses/compare${qs({ ids: ids.join(',') })}`),
    enabled: ids.length >= 2 && ids.length <= 4,
  });
}

export function useNotifications(page = 1, pageSize = 20, unreadOnly = false) {
  return useQuery({
    queryKey: [...w2keys.notifications, { page, pageSize, unreadOnly }],
    queryFn: () =>
      api<NotificationPageDto>(`/api/me/notifications${qs({ page, pageSize, unreadOnly })}`),
  });
}

export function useMyCertificates() {
  return useQuery({
    queryKey: w2keys.myCertificates,
    queryFn: () => api<MyCertificateDto[]>('/api/me/certificates'),
  });
}

export function useChannelInfo(enabled = true) {
  return useQuery({
    queryKey: w2keys.channelsInfo,
    queryFn: () => api<ChannelInfoDto[]>('/api/youtube/channels'),
    enabled,
  });
}

export function useMyOrgs() {
  return useQuery({
    queryKey: w2keys.myOrgs,
    queryFn: () => api<MyOrgDto[]>('/api/me/organizations'),
  });
}

// ---------- Multipart upload with progress ----------

function parseProblem(status: number, statusText: string, text: string): ApiError {
  let problem = null;
  try {
    if (text) {
      const p = JSON.parse(text) as {
        status?: number;
        title?: string;
        type?: string;
        detail?: string;
      };
      problem = {
        status: p.status ?? status,
        title: p.title ?? statusText,
        type: p.type ?? '',
        detail: p.detail,
      };
    }
  } catch {
    /* non-JSON body */
  }
  return new ApiError(status, problem, statusText || `HTTP ${status}`);
}

function sendOnce<T>(
  method: string,
  path: string,
  form: FormData,
  onProgress?: (fraction: number) => void,
): Promise<{ status: number; result?: T; error?: ApiError }> {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, apiUrl(path));
    xhr.setRequestHeader('Accept', 'application/json');
    const token = getAccessToken();
    if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) onProgress(e.loaded / e.total);
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        let result: T | undefined;
        try {
          result = xhr.responseText ? (JSON.parse(xhr.responseText) as T) : undefined;
        } catch {
          result = undefined;
        }
        resolve({ status: xhr.status, result });
      } else {
        resolve({
          status: xhr.status,
          error: parseProblem(xhr.status, xhr.statusText, xhr.responseText),
        });
      }
    };
    xhr.onerror = () => resolve({ status: 0, error: new ApiError(0, null, 'Network error') });
    xhr.send(form);
  });
}

/** Sends one multipart part named `file`, reporting upload progress (0..1). Retries once after a token refresh. */
export async function uploadFile<T>(
  path: string,
  file: File,
  opts: { method?: 'POST' | 'PUT'; onProgress?: (fraction: number) => void } = {},
): Promise<T> {
  const form = () => {
    const f = new FormData();
    f.append('file', file, file.name);
    return f;
  };
  const method = opts.method ?? 'POST';
  let res = await sendOnce<T>(method, path, form(), opts.onProgress);
  if (res.status === 401 && (await refreshSession())) {
    res = await sendOnce<T>(method, path, form(), opts.onProgress);
  }
  if (res.error) throw res.error;
  return res.result as T;
}

export function formatBytes(n: number, locale = 'en'): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let v = n;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  const num = new Intl.NumberFormat(locale, { maximumFractionDigits: i === 0 ? 0 : 1 }).format(v);
  return `${num} ${units[i]}`;
}
