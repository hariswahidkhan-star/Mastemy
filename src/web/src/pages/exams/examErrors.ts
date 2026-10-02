import { ApiError } from '../../api/client';
import { errorMessage } from '../../components/ui/ErrorState';
import type { TFunction } from '../../i18n/I18nProvider';

/** Problem codes from the wave 3 question/assessment API that deserve a specific explanation. */
const CODES = [
  'premium_required',
  'no_matching_questions',
  'no_courses',
  'attempt_paused',
  'pause_not_allowed',
  'exposure_limit_reached',
  'attempt_in_progress',
  'malformed_xlsx',
  'case_group_in_use',
  'copy_rejected',
] as const;

export function examError(error: unknown, t: TFunction): string {
  if (error instanceof ApiError) {
    const code = CODES.find((c) => error.is(c));
    if (code === 'malformed_xlsx') {
      return t('exams.errors.malformed_xlsx', { detail: error.problem?.title ?? '' });
    }
    if (code) {
      const detail = error.problem?.title;
      const base = t(`exams.errors.${code}`);
      return detail && code !== 'premium_required' ? `${base} (${detail})` : base;
    }
  }
  return errorMessage(error, t);
}

export function isPremiumError(error: unknown): boolean {
  return error instanceof ApiError && error.is('premium_required');
}
