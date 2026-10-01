import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import { api, qs } from './client';
import type {
  CategoryDto,
  CourseCardDto,
  CourseDetailDto,
  DashboardDto,
  LearnCourseDto,
  LessonViewDto,
  OnboardingStatus,
  Paged,
  StudioCourseDto,
  YouTubeChannelDto,
} from './types';

export interface CourseQuery {
  q?: string;
  category?: string;
  level?: string;
  language?: string;
  sort?: 'newest' | 'updated' | 'title';
  page?: number;
}

export const keys = {
  categories: ['categories'] as const,
  courses: (q: CourseQuery) => ['courses', q] as const,
  course: (slug: string) => ['course', slug] as const,
  learnCourse: (slug: string) => ['learn', 'course', slug] as const,
  lesson: (id: string) => ['learn', 'lesson', id] as const,
  notes: (params: { lessonId?: string; q?: string }) => ['me', 'notes', params] as const,
  dashboard: ['me', 'dashboard'] as const,
  onboarding: ['onboarding'] as const,
  studioCourses: ['studio', 'courses'] as const,
  studioCourse: (id: string) => ['studio', 'course', id] as const,
  channels: ['youtube', 'channels'] as const,
};

export function useCategories() {
  return useQuery({
    queryKey: keys.categories,
    queryFn: () => api<CategoryDto[]>('/api/categories'),
    staleTime: 5 * 60_000,
  });
}

export function useCourses(q: CourseQuery) {
  return useQuery({
    queryKey: keys.courses(q),
    queryFn: () => api<Paged<CourseCardDto>>(`/api/courses${qs({ ...q })}`),
    placeholderData: (prev) => prev,
  });
}

export function useCourse(slug: string) {
  return useQuery({
    queryKey: keys.course(slug),
    queryFn: () => api<CourseDetailDto>(`/api/courses/${encodeURIComponent(slug)}`),
  });
}

export function useLearnCourse(slug: string) {
  return useQuery({
    queryKey: keys.learnCourse(slug),
    queryFn: () => api<LearnCourseDto>(`/api/learn/courses/${encodeURIComponent(slug)}`),
  });
}

export function useLesson(id: string | undefined) {
  return useQuery({
    queryKey: keys.lesson(id ?? ''),
    queryFn: () => api<LessonViewDto>(`/api/learn/lessons/${id}`),
    enabled: !!id,
  });
}

export function useDashboard() {
  return useQuery({
    queryKey: keys.dashboard,
    queryFn: () => api<DashboardDto>('/api/me/dashboard'),
  });
}

export function useOnboardingStatus() {
  return useQuery({
    queryKey: keys.onboarding,
    queryFn: () => api<OnboardingStatus>('/api/instructor-onboarding/status'),
  });
}

export function useStudioCourses() {
  return useQuery({
    queryKey: keys.studioCourses,
    queryFn: () => api<StudioCourseDto[] | Paged<StudioCourseDto>>('/api/studio/courses'),
    select: (d) => (Array.isArray(d) ? d : d.items),
  });
}

export function useStudioCourse(id: string) {
  return useQuery({
    queryKey: keys.studioCourse(id),
    queryFn: () => api<StudioCourseDto>(`/api/studio/courses/${id}`),
  });
}

export function useChannels() {
  return useQuery({
    queryKey: keys.channels,
    queryFn: () => api<YouTubeChannelDto[]>('/api/youtube/channels'),
  });
}

/** Mutation helper that invalidates the given keys on success. */
export function useApiMutation<TVars, TResult = unknown>(
  fn: (vars: TVars) => Promise<TResult>,
  invalidate: QueryKey[] = [],
  onSuccess?: (result: TResult, vars: TVars) => void,
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: async (result, vars) => {
      await Promise.all(invalidate.map((k) => qc.invalidateQueries({ queryKey: k })));
      onSuccess?.(result, vars);
    },
  });
}
