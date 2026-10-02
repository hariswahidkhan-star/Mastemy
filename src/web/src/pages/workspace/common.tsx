import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useQuery } from '@tanstack/react-query';
import { api, ApiError } from '../../api/client';
import { wsKeys } from '../../api/workspace';
import type { AiStatusDto } from '../../api/workspace';
import { useAuth } from '../../auth/AuthProvider';
import { Button } from '../../components/ui/Button';
import { errorMessage } from '../../components/ui/ErrorState';
import { Notice } from '../../components/ui/misc';
import { useI18n } from '../../i18n/I18nProvider';
import type { TFunction } from '../../i18n/I18nProvider';
import '../../styles/workspace.css';

/** Problem codes that get a dedicated, translated explanation (the rest fall back to the server's title). */
export const KNOWN_CODES = [
  'editor_scope',
  'instructor_suspended',
  'precondition_failed',
  'agreement_required',
  'agreement_version_mismatch',
  'ai_not_configured',
  'ai_unavailable',
  'ai_rate_limited',
  'ai_budget_exhausted',
  'ai_refused',
  'ai_invalid_output',
  'exam_in_progress',
  'not_enrolled',
  'content_unavailable',
  'consent_required',
  'translation_language_taken',
  'rate_limited',
  'appeal_pending',
  'appeal_already_decided',
  'not_hidden',
  'complaint_closed',
  'hold_released',
  'video_not_broken',
  'not_linked',
] as const;

export function wsError(error: unknown, t: TFunction): string {
  if (error instanceof ApiError) {
    for (const code of KNOWN_CODES) if (error.is(code)) return t(`workspace.errors.${code}`);
    if (error.status === 451) return t('workspace.errors.content_unavailable');
  }
  return errorMessage(error, t);
}

export function WsError({ error }: { error: unknown }) {
  const { t } = useI18n();
  if (!error) return null;
  return <Notice tone="danger">{wsError(error, t)}</Notice>;
}

/** GET /api/ai/status (signed-in only). */
export function useAiStatus() {
  const { user } = useAuth();
  return useQuery({
    queryKey: [...wsKeys.aiStatus, user?.id ?? 'anon'],
    queryFn: () => api<AiStatusDto>('/api/ai/status'),
    enabled: !!user,
    staleTime: 5 * 60_000,
    retry: false,
  });
}

/**
 * Renders `children` only when AI is configured; otherwise a clear note instead of any entry point
 * (no dead buttons). While loading it renders nothing.
 */
export function AiGate({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  const status = useAiStatus();
  if (status.isPending) return null;
  if (status.isError || !status.data?.configured)
    return (
      <Notice tone="info" title={t('workspace.ai.notEnabledTitle')}>
        {t('workspace.ai.notEnabled')}
      </Notice>
    );
  return <>{children}</>;
}

/** Side drawer (modal): focus moves in, Escape closes, focus returns to the opener. */
export function Drawer({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: ReactNode;
  onClose: () => void;
  children: ReactNode;
}) {
  const { t } = useI18n();
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  });
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeRef.current();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      prev?.focus?.();
    };
  }, [open]);
  if (!open) return null;
  return createPortal(
    <>
      <div className="ws-drawer-backdrop" onMouseDown={onClose} />
      <div
        className="ws-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={id}
        ref={ref}
        tabIndex={-1}
      >
        <div className="ws-drawer__head">
          <h2 id={id}>{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label={t('common.close')}>
            ✕
          </Button>
        </div>
        <div className="ws-drawer__body">{children}</div>
      </div>
    </>,
    document.body,
  );
}

export function fmtDateTime(iso: string | null | undefined, lang: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat(lang === 'ar' ? 'ar' : 'en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(d);
}
