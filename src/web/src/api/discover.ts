/**
 * Taxonomy / discovery / certification directory / backlog client (wave 3).
 * Shapes mirror the C# records in src/Mastemy.Api/Modules/Taxonomy/TaxonomyDtos.cs and
 * Modules/Catalog/CatalogQueryService.cs (enums are serialized as strings).
 */
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { api, qs } from './client';
import type { CategoryDto, CourseCardDto, CourseLevel, Guid, IsoDate } from './types';

// ---------- enums ----------
export const CERT_STATES = [
  'ResearchCandidate',
  'Verified',
  'InProduction',
  'PublishedPreparation',
  'InformationOnly',
  'Retired',
] as const;
export type CertificationState = (typeof CERT_STATES)[number];
/** States that require the verification checks (and make an entry publicly visible when fresh). */
export const VERIFIED_STATES: CertificationState[] = [
  'Verified',
  'InProduction',
  'PublishedPreparation',
  'InformationOnly',
];
export const CERT_KINDS = [
  'Examination',
  'Qualification',
  'CompletionAward',
  'ProfessionalCertification',
] as const;
export type CertificationKind = (typeof CERT_KINDS)[number];
export const COLLECTION_KINDS = ['Editorial', 'Topic'] as const;
export type CollectionKind = (typeof COLLECTION_KINDS)[number];
export const IDEA_STATES = [
  'Idea',
  'Validating',
  'Approved',
  'InProduction',
  'Published',
  'Rejected',
] as const;
export type CourseIdeaState = (typeof IDEA_STATES)[number];

/** Allowed backlog transitions (mirrors BacklogService; the server stays the authority). */
export const IDEA_TRANSITIONS: Record<CourseIdeaState, CourseIdeaState[]> = {
  Idea: ['Validating', 'Rejected'],
  Validating: ['Idea', 'Approved', 'Rejected'],
  Approved: ['Validating', 'InProduction', 'Rejected'],
  InProduction: ['Approved', 'Published', 'Rejected'],
  Rejected: ['Idea'],
  Published: [],
};

// ---------- DTOs ----------
export interface SkillDto {
  id: number;
  code: string;
  nameEn: string;
  nameAr: string;
  parentId: number | null;
  isActive: boolean;
}
export interface UnknownSkillCodeDto {
  code: string;
  questionCount: number;
}
export interface IssuerDto {
  id: Guid;
  name: string;
  websiteUrl: string | null;
  country: string;
}
export interface ObjectiveDto {
  id: Guid;
  code: string;
  title: string;
  weightPercent: number;
  sortOrder: number;
}
export interface CertificationAdminDto {
  id: Guid;
  issuerId: Guid;
  issuerName: string;
  slug: string;
  title: string;
  jurisdiction: string;
  examCode: string;
  levelOrPart: string;
  version: string;
  effectiveFrom: IsoDate | null;
  effectiveTo: IsoDate | null;
  prerequisites: string;
  officialSourceUrl: string;
  lastCheckedAt: IsoDate | null;
  evidenceNotes: string;
  renewalInfo: string;
  rightsNotes: string;
  kind: CertificationKind;
  state: CertificationState;
  hasNonMcqTasks: boolean;
  nonMcqDisclosure: string;
  replacedById: Guid | null;
  reviewerId: Guid | null;
  verifiedAt: IsoDate | null;
  lastEditedBy: Guid | null;
  staleFlaggedAt: IsoDate | null;
  isStale: boolean;
  publiclyVisible: boolean;
  updatedAt: IsoDate;
  objectives: ObjectiveDto[];
}
export interface CertificationUpsert {
  issuerId: Guid;
  title: string;
  slug?: string | null;
  jurisdiction?: string | null;
  examCode?: string | null;
  levelOrPart?: string | null;
  version?: string | null;
  effectiveFrom?: string | null;
  effectiveTo?: string | null;
  prerequisites?: string | null;
  officialSourceUrl?: string | null;
  lastCheckedAt?: string | null;
  evidenceNotes?: string | null;
  renewalInfo?: string | null;
  rightsNotes?: string | null;
  kind: CertificationKind;
  hasNonMcqTasks?: boolean;
  nonMcqDisclosure?: string | null;
  replacedById?: Guid | null;
}
export interface PublicCertificationSummaryDto {
  id: Guid;
  slug: string;
  title: string;
  issuerName: string;
  jurisdiction: string;
  examCode: string;
  levelOrPart: string;
  kind: CertificationKind;
  state: CertificationState;
  lastCheckedAt: IsoDate;
  preparationCourseCount: number;
}
export interface PublicCertificationDto {
  id: Guid;
  slug: string;
  title: string;
  issuerName: string;
  jurisdiction: string;
  examCode: string;
  levelOrPart: string;
  version: string;
  effectiveFrom: IsoDate | null;
  effectiveTo: IsoDate | null;
  prerequisites: string;
  officialSourceUrl: string;
  lastCheckedAt: IsoDate;
  renewalInfo: string;
  kind: CertificationKind;
  state: CertificationState;
  nonMcqDisclosure: string | null;
  replacedBySlug: string | null;
  objectives: ObjectiveDto[];
  preparationCourses: CourseCardDto[];
}
export interface CoverageObjectiveDto {
  objectiveId: Guid;
  code: string;
  title: string;
  weightPercent: number;
  lessonCount: number;
  activeQuestionCount: number;
  gap: boolean;
  gaps: string[];
}
export interface CoverageReportDto {
  certificationId: Guid;
  certificationTitle: string;
  courseId: Guid | null;
  objectiveCount: number;
  gapCount: number;
  coveredWeightPercent: number;
  objectives: CoverageObjectiveDto[];
}
export interface PathwaySummaryDto {
  id: Guid;
  slug: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  level: CourseLevel;
  courseCount: number;
  totalDurationSeconds: number;
  skills: string[];
}
export interface PathwayDetailDto {
  id: Guid;
  slug: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  level: CourseLevel;
  skills: SkillDto[];
  courses: CourseCardDto[];
}
export interface PathwayAdminDto {
  id: Guid;
  slug: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  level: CourseLevel;
  categoryId: number | null;
  isPublished: boolean;
  sortOrder: number;
  courseIds: Guid[];
  skillCodes: string[];
  updatedAt: IsoDate;
}
export interface PathwayEnrollResultDto {
  pathwayId: Guid;
  enrolled: number;
  alreadyEnrolled: number;
  courseIds: Guid[];
}
export interface CollectionAdminDto {
  id: Guid;
  slug: string;
  titleEn: string;
  titleAr: string;
  kind: CollectionKind;
  categoryId: number | null;
  activeFrom: IsoDate | null;
  activeTo: IsoDate | null;
  sortOrder: number;
  courseIds: Guid[];
  activeNow: boolean;
}
export interface CollectionDto {
  id: Guid;
  slug: string;
  titleEn: string;
  titleAr: string;
  kind: CollectionKind;
  courses: CourseCardDto[];
}
export interface BestsellerCardDto {
  course: CourseCardDto;
  distinctBuyers: number;
  bestsellerLabel: boolean;
}
export interface HomeDto {
  featured: CollectionDto[];
  new: CourseCardDto[];
  recentlyUpdated: CourseCardDto[];
  aiSkills: CourseCardDto[];
  certificationPreparation: CourseCardDto[];
  beginnerPathways: PathwaySummaryDto[];
  bestselling: BestsellerCardDto[];
  bestsellerRule: string;
}
export interface AcademyDto {
  category: CategoryDto;
  pathways: PathwaySummaryDto[];
  featured: CollectionDto[];
  courses: CourseCardDto[];
}
export interface BestsellerStat {
  courseId: Guid;
  distinctBuyers: number;
  netRevenue: number;
  eligible: boolean;
  windowStart: IsoDate;
  computedAt: IsoDate;
}
export interface BestsellerRunDto {
  coursesConsidered: number;
  eligible: number;
  windowStart: IsoDate;
  computedAt: IsoDate;
}
export interface InstructorSummaryDto {
  id: Guid;
  displayName: string;
  liveCourseCount: number;
  ratingAverage: number | null;
  ratingCount: number;
}
export interface Paged<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
export interface CourseIdeaDto {
  id: Guid;
  title: string;
  audience: string;
  rationale: string;
  demandEvidence: string;
  group: string;
  state: CourseIdeaState;
  ownerId: Guid | null;
  updateOwnerId: Guid | null;
  linkedCourseId: Guid | null;
  certificationIds: Guid[];
  maintenanceCostNote: string;
  priorityScore: number;
  roadmapRank: number | null;
  createdAt: IsoDate;
  updatedAt: IsoDate;
}
export interface RoadmapImportResultDto {
  parsed: number;
  created: number;
  skipped: number;
}
export interface SuggestionDto {
  kind: 'course' | 'skill' | 'certification';
  text: string;
  key: string;
}
export interface CourseSearchResult extends Paged<CourseCardDto> {
  didYouMean: string | null;
}

// ---------- search query ----------
export const DURATIONS = ['short', 'medium', 'long', 'extended'] as const;
export const FRESHNESS_DAYS = [30, 90, 180, 365] as const;
export const MIN_RATINGS = ['3', '3.5', '4', '4.5'] as const;
export const SORTS = ['newest', 'updated', 'title'] as const;

/** Every URL parameter the catalogue understands, in the order it is written back to the URL. */
export const SEARCH_PARAMS = [
  'q',
  'category',
  'level',
  'language',
  'sort',
  'instructor',
  'duration',
  'updatedWithinDays',
  'minPrice',
  'maxPrice',
  'minRating',
  'skill',
  'certification',
  'page',
] as const;
export type SearchParamKey = (typeof SEARCH_PARAMS)[number];
export type CatalogQuery = Partial<Record<SearchParamKey, string>>;

const NUMERIC = /^\d+(\.\d+)?$/;

/**
 * Reads and normalizes the catalogue query from URL parameters. Invalid values are dropped so a hand-edited
 * URL cannot produce a 400 from the server; the server still validates everything it receives.
 */
export function readCatalogQuery(params: URLSearchParams, fixedCategory?: string): CatalogQuery {
  const out: CatalogQuery = {};
  for (const k of SEARCH_PARAMS) {
    const v = params.get(k)?.trim();
    if (v) out[k] = v;
  }
  if (fixedCategory) out.category = fixedCategory;
  if (out.sort && !(SORTS as readonly string[]).includes(out.sort)) delete out.sort;
  if (out.duration && !(DURATIONS as readonly string[]).includes(out.duration)) delete out.duration;
  if (out.updatedWithinDays) {
    const n = Number(out.updatedWithinDays);
    if (!Number.isInteger(n) || n < 1 || n > 3650) delete out.updatedWithinDays;
  }
  for (const k of ['minPrice', 'maxPrice'] as const) {
    if (out[k] && !NUMERIC.test(out[k])) delete out[k];
  }
  if (out.minRating) {
    const n = Number(out.minRating);
    if (!NUMERIC.test(out.minRating) || n < 1 || n > 5) delete out.minRating;
  }
  if (out.page) {
    const n = Number(out.page);
    if (!Number.isInteger(n) || n < 1) delete out.page;
  }
  if (out.page === '1') delete out.page;
  return out;
}

/** Returns new URL parameters with one filter changed; any filter change resets paging. */
export function withFilter(
  params: URLSearchParams,
  key: SearchParamKey,
  value: string | null | undefined,
): URLSearchParams {
  const next = new URLSearchParams(params);
  if (value) next.set(key, value);
  else next.delete(key);
  if (key !== 'page') next.delete('page');
  return next;
}

/** Number of active filters other than free text, sort and paging (for the "clear filters" control). */
export function activeFilterCount(q: CatalogQuery, fixedCategory?: string): number {
  return SEARCH_PARAMS.filter(
    (k) =>
      k !== 'q' && k !== 'sort' && k !== 'page' && !(k === 'category' && fixedCategory) && !!q[k],
  ).length;
}

// ---------- keys & hooks ----------
export const dkeys = {
  home: ['discover', 'home'] as const,
  skills: ['discover', 'skills'] as const,
  certifications: (p: { q?: string; kind?: string }) => ['discover', 'certifications', p] as const,
  certification: (slug: string) => ['discover-detail', 'certification', slug] as const,
  pathways: (level?: string) => ['discover', 'pathways', level ?? ''] as const,
  pathway: (slug: string) => ['discover-detail', 'pathway', slug] as const,
  collection: (slug: string) => ['discover-detail', 'collection', slug] as const,
  academy: (slug: string) => ['discover-detail', 'academy', slug] as const,
  instructors: (p: { q?: string; page: number; pageSize?: number }) =>
    ['discover', 'instructors', p] as const,
  search: (q: CatalogQuery) => ['courses', 'search', q] as const,
  suggestions: (q: string) => ['discover', 'suggestions', q] as const,
};

/** Missing lists are treated as empty so a partial response never breaks the page. */
export function normalizeHome(h: Partial<HomeDto>): HomeDto {
  return {
    featured: h.featured ?? [],
    new: h.new ?? [],
    recentlyUpdated: h.recentlyUpdated ?? [],
    aiSkills: h.aiSkills ?? [],
    certificationPreparation: h.certificationPreparation ?? [],
    beginnerPathways: h.beginnerPathways ?? [],
    bestselling: h.bestselling ?? [],
    bestsellerRule: h.bestsellerRule ?? '',
  };
}

export function useHome() {
  return useQuery({
    queryKey: dkeys.home,
    queryFn: () => api<Partial<HomeDto>>('/api/home'),
    select: normalizeHome,
  });
}
export function usePublicSkills() {
  return useQuery({
    queryKey: dkeys.skills,
    queryFn: () => api<SkillDto[]>('/api/skills'),
    staleTime: 5 * 60_000,
  });
}
export function usePublicCertifications(p: { q?: string; kind?: string } = {}) {
  return useQuery({
    queryKey: dkeys.certifications(p),
    queryFn: () => api<PublicCertificationSummaryDto[]>(`/api/certifications${qs(p)}`),
    placeholderData: keepPreviousData,
  });
}
export function useCertification(slug: string) {
  return useQuery({
    queryKey: dkeys.certification(slug),
    queryFn: () => api<PublicCertificationDto>(`/api/certifications/${encodeURIComponent(slug)}`),
  });
}
export function usePathways(level?: string, enabled = true) {
  return useQuery({
    queryKey: dkeys.pathways(level),
    queryFn: () => api<PathwaySummaryDto[]>(`/api/pathways${qs({ level })}`),
    enabled,
  });
}
export function usePathway(slug: string) {
  return useQuery({
    queryKey: dkeys.pathway(slug),
    queryFn: () => api<PathwayDetailDto>(`/api/pathways/${encodeURIComponent(slug)}`),
  });
}
export function useCollection(slug: string) {
  return useQuery({
    queryKey: dkeys.collection(slug),
    queryFn: () => api<CollectionDto>(`/api/collections/${encodeURIComponent(slug)}`),
  });
}
export function useAcademy(slug: string) {
  return useQuery({
    queryKey: dkeys.academy(slug),
    queryFn: () => api<AcademyDto>(`/api/academies/${encodeURIComponent(slug)}`),
  });
}
export function useInstructors(p: { q?: string; page: number; pageSize?: number }) {
  return useQuery({
    queryKey: dkeys.instructors(p),
    queryFn: () => api<Paged<InstructorSummaryDto>>(`/api/instructors${qs(p)}`),
    placeholderData: keepPreviousData,
  });
}
export function useCatalogSearch(q: CatalogQuery) {
  return useQuery({
    queryKey: dkeys.search(q),
    queryFn: () => api<CourseSearchResult>(`/api/courses${qs(q)}`),
    placeholderData: keepPreviousData,
  });
}
export function useSuggestions(q: string) {
  const term = q.trim();
  return useQuery({
    queryKey: dkeys.suggestions(term),
    queryFn: ({ signal }) =>
      api<SuggestionDto[]>(`/api/search/suggestions${qs({ q: term })}`, { signal }),
    enabled: term.length >= 2,
    staleTime: 60_000,
  });
}

/** Where a suggestion leads: courses open directly, skills and certifications filter the catalogue. */
export function suggestionHref(s: SuggestionDto): string {
  if (s.kind === 'course') return `/courses/${encodeURIComponent(s.key)}`;
  if (s.kind === 'certification') return `/certifications/${encodeURIComponent(s.key)}`;
  return `/courses?skill=${encodeURIComponent(s.key)}`;
}

/** Localized title for the bilingual taxonomy records (Arabic falls back to English when empty). */
export function loc(lang: string, en: string, ar: string | null | undefined): string {
  return lang === 'ar' && ar ? ar : en;
}
