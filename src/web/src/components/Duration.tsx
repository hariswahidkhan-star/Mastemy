import { durationParts } from '../lib/format';
import { useI18n } from '../i18n/I18nProvider';

export function Duration({ seconds }: { seconds: number }) {
  const { t } = useI18n();
  const { h, m } = durationParts(seconds);
  if (h > 0) return <>{t('format.hoursMinutes', { h, m })}</>;
  return <>{t('format.minutes', { m: Math.max(m, seconds > 0 ? 1 : 0) })}</>;
}
