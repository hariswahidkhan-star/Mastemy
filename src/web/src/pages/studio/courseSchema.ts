import { z } from 'zod';
import { COURSE_LEVELS } from '../../api/types';
import type { TFunction } from '../../i18n/I18nProvider';

export function courseSchema(t: TFunction) {
  return z.object({
    goals: z
      .string()
      .trim()
      .min(20, t('validation.minChars', { n: 20 }))
      .max(2000),
    audience: z
      .string()
      .trim()
      .min(20, t('validation.minChars', { n: 20 }))
      .max(2000),
    categoryId: z.string().min(1, t('validation.required')),
    level: z.enum(COURSE_LEVELS),
    language: z.enum(['en', 'ar']),
    title: z
      .string()
      .trim()
      .min(8, t('validation.minChars', { n: 8 }))
      .max(120),
    subtitle: z.string().trim().max(200).optional(),
    description: z
      .string()
      .trim()
      .min(80, t('validation.minChars', { n: 80 }))
      .max(10000),
    prerequisites: z.string().trim().max(4000),
    outcomes: z
      .string()
      .trim()
      .refine(
        (v) => v.split(/\r?\n/).filter((l) => l.trim()).length >= 3,
        t('studio.outcomesRule'),
      ),
  });
}
export type CourseFormValues = z.infer<ReturnType<typeof courseSchema>>;

export function toCourseInput(v: CourseFormValues) {
  return {
    title: v.title,
    subtitle: v.subtitle ?? '',
    description: v.description,
    audience: v.audience,
    goals: v.goals,
    prerequisites: v.prerequisites,
    outcomes: v.outcomes,
    language: v.language,
    level: v.level,
    categoryIds: [Number(v.categoryId)],
  };
}
