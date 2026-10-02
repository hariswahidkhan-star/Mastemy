import { ApiError } from '../../api/client';
import { errorMessage } from '../../components/ui/ErrorState';
import { Notice } from '../../components/ui/misc';
import { useI18n } from '../../i18n/I18nProvider';
import type { TFunction } from '../../i18n/I18nProvider';

/** Problem `type` codes this area explains in its own words (finala.errors.<code>). */
const KNOWN = [
  'messaging_blocked',
  'rate_limited',
  'html_not_allowed',
  'already_reported',
  'invalid_report',
  'invalid_block',
  'fresh_mfa_required',
  'cannot_reset_own_mfa',
  'mfa_not_enabled',
  'invalid_reason',
  'completion_awards_disabled',
  'not_enrolled',
  'course_not_completed',
  'certificate_not_public',
  'verify_url_not_configured',
  'certificate_revoked',
  'not_checked',
  'already_graded',
  'premium_required',
  'attempt_in_progress',
  'regrade_decided',
  'no_study_plan',
  'invalid_state',
  'use_confirm',
] as const;

export function finalaError(error: unknown, t: TFunction): string {
  if (error instanceof ApiError) {
    const code = KNOWN.find((c) => error.is(c));
    if (code) return t(`finala.errors.${code}`);
    if (error.status === 410) return t('finala.errors.certificate_revoked');
  }
  return errorMessage(error, t);
}

export function FinalaError({ error }: { error: unknown }) {
  const { t } = useI18n();
  if (!error) return null;
  return <Notice tone="danger">{finalaError(error, t)}</Notice>;
}
