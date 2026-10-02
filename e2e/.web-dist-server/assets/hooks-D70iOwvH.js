import { n as useQueryClient } from "./QueryClientProvider-BuGUlZsk.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { t as useMutation } from "./useMutation-BVU18dYp.js";
import { f as qs, i as api } from "./Button-6CizQUWS.js";
//#region src/api/hooks.ts
var keys = {
	categories: ["categories"],
	courses: (q) => ["courses", q],
	course: (slug) => ["course", slug],
	learnCourse: (slug) => [
		"learn",
		"course",
		slug
	],
	lesson: (id) => [
		"learn",
		"lesson",
		id
	],
	notes: (params) => [
		"me",
		"notes",
		params
	],
	dashboard: ["me", "dashboard"],
	onboarding: ["onboarding"],
	studioCourses: ["studio", "courses"],
	studioCourse: (id) => [
		"studio",
		"course",
		id
	],
	channels: ["youtube", "channels"]
};
function useCategories() {
	return useQuery({
		queryKey: keys.categories,
		queryFn: () => api("/api/categories"),
		staleTime: 3e5
	});
}
function useCourses(q) {
	return useQuery({
		queryKey: keys.courses(q),
		queryFn: () => api(`/api/courses${qs({ ...q })}`),
		placeholderData: (prev) => prev
	});
}
function useCourse(slug) {
	return useQuery({
		queryKey: keys.course(slug),
		queryFn: () => api(`/api/courses/${encodeURIComponent(slug)}`)
	});
}
/** The API nests per-learner progress; the UI reads it flattened onto each lesson. */
function toLearnCourse(d) {
	return {
		...d,
		id: d.courseId ?? d.id,
		modules: d.modules.map((m) => ({
			...m,
			lessons: m.lessons.map(({ progress, ...l }) => ({
				...l,
				completed: progress?.completed ?? l.completed,
				positionSeconds: progress?.positionSeconds ?? l.positionSeconds
			}))
		}))
	};
}
function toLessonView({ progress, ...v }) {
	return {
		...v,
		lesson: {
			...v.lesson,
			positionSeconds: progress?.positionSeconds ?? v.lesson.positionSeconds
		}
	};
}
function useLearnCourse(slug) {
	return useQuery({
		queryKey: keys.learnCourse(slug),
		queryFn: () => api(`/api/learn/courses/${encodeURIComponent(slug)}`),
		select: toLearnCourse
	});
}
function useLesson(id) {
	return useQuery({
		queryKey: keys.lesson(id ?? ""),
		queryFn: () => api(`/api/learn/lessons/${id}`),
		select: toLessonView,
		enabled: !!id
	});
}
function useDashboard() {
	return useQuery({
		queryKey: keys.dashboard,
		queryFn: () => api("/api/me/dashboard")
	});
}
function useOnboardingStatus() {
	return useQuery({
		queryKey: keys.onboarding,
		queryFn: () => api("/api/instructor-onboarding/status")
	});
}
function useStudioCourses() {
	return useQuery({
		queryKey: keys.studioCourses,
		queryFn: () => api("/api/studio/courses"),
		select: (d) => Array.isArray(d) ? d : d.items
	});
}
function useStudioCourse(id) {
	return useQuery({
		queryKey: keys.studioCourse(id),
		queryFn: () => api(`/api/studio/courses/${id}`)
	});
}
function useChannels() {
	return useQuery({
		queryKey: keys.channels,
		queryFn: () => api("/api/youtube/channels")
	});
}
/** Mutation helper that invalidates the given keys on success. */
function useApiMutation(fn, invalidate = [], onSuccess) {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: fn,
		onSuccess: async (result, vars) => {
			await Promise.all(invalidate.map((k) => qc.invalidateQueries({ queryKey: k })));
			onSuccess?.(result, vars);
		}
	});
}
//#endregion
export { useCourse as a, useLearnCourse as c, useStudioCourse as d, useStudioCourses as f, useChannels as i, useLesson as l, useApiMutation as n, useCourses as o, useCategories as r, useDashboard as s, keys as t, useOnboardingStatus as u };

//# sourceMappingURL=hooks-D70iOwvH.js.map