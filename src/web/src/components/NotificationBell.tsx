import { useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client';
import { useNotifications, w2keys } from '../api/wave2';
import type { NotificationDto, NotificationPageDto } from '../api/wave2';
import { useI18n } from '../i18n/I18nProvider';
import { Button } from './ui/Button';

/** Badge text for the unread count: hidden at 0, capped at "99+". */
export function unreadBadge(count: number): string | null {
  if (!count || count < 1) return null;
  return count > 99 ? '99+' : String(count);
}

/** Only in-app paths are followed; anything else falls back to the notifications page. */
export function safeLink(link: string | null | undefined): string {
  return link && link.startsWith('/') && !link.startsWith('//') ? link : '/me/notifications';
}

export function NotificationBellView({
  data,
  open,
  onToggle,
  onOpenItem,
  onReadAll,
  readingAll,
}: {
  data: NotificationPageDto | undefined;
  open: boolean;
  onToggle: () => void;
  onOpenItem: (n: NotificationDto) => void;
  onReadAll: () => void;
  readingAll?: boolean;
}) {
  const { t, fmtDate } = useI18n();
  const menuId = useId();
  const unread = data?.unreadCount ?? 0;
  const badge = unreadBadge(unread);
  return (
    <div className="bell">
      <Button
        variant="ghost"
        size="sm"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={
          unread > 0 ? t('notifications.bellUnread', { n: unread }) : t('notifications.bell')
        }
        onClick={onToggle}
      >
        <span aria-hidden="true">🔔</span>
        {badge ? (
          <span className="bell__count" aria-hidden="true" data-testid="bell-count">
            {badge}
          </span>
        ) : null}
      </Button>
      {open ? (
        <div
          className="bell__panel"
          id={menuId}
          role="region"
          aria-label={t('notifications.title')}
        >
          <div className="row row--between">
            <strong>{t('notifications.title')}</strong>
            <Button
              size="sm"
              variant="ghost"
              onClick={onReadAll}
              disabled={unread === 0}
              loading={readingAll}
            >
              {t('notifications.readAll')}
            </Button>
          </div>
          {!data ? (
            <p className="small muted">{t('common.loading')}</p>
          ) : data.items.length === 0 ? (
            <p className="small muted">{t('notifications.empty')}</p>
          ) : (
            <ul className="bell__list">
              {data.items.map((n) => (
                <li key={n.id} className={n.readAt ? '' : 'bell__item--unread'}>
                  <button type="button" className="bell__item" onClick={() => onOpenItem(n)}>
                    <span>
                      {n.readAt ? null : (
                        <span className="visually-hidden">{t('notifications.unread')} </span>
                      )}
                      {n.title}
                    </span>
                    <span className="small muted">
                      {t(`notifications.kind.${n.kind}`)} · {fmtDate(n.createdAt)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <Link to="/me/notifications" className="small" onClick={onToggle}>
            {t('notifications.seeAll')}
          </Link>
        </div>
      ) : null}
    </div>
  );
}

/** Header bell (signed-in users only): unread count polled every minute, dropdown with the latest items. */
export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [readingAll, setReadingAll] = useState(false);
  const qc = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const query = useNotifications(1, 6);
  const ref = useRef<HTMLDivElement>(null);

  const { refetch } = query;
  useEffect(() => {
    const id = window.setInterval(() => void refetch(), 60_000);
    return () => window.clearInterval(id);
  }, [refetch]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const refresh = () => qc.invalidateQueries({ queryKey: w2keys.notifications });

  return (
    <div ref={ref}>
      <NotificationBellView
        data={query.data}
        open={open}
        readingAll={readingAll}
        onToggle={() => {
          setOpen((o) => !o);
          if (!open) void refetch();
        }}
        onReadAll={() => {
          setReadingAll(true);
          api('/api/me/notifications/read-all', { method: 'POST' })
            .then(refresh)
            .catch(() => undefined)
            .finally(() => setReadingAll(false));
        }}
        onOpenItem={(n) => {
          setOpen(false);
          if (!n.readAt)
            void api(`/api/me/notifications/${n.id}/read`, { method: 'POST' })
              .then(refresh)
              .catch(() => undefined);
          navigate(safeLink(n.link));
        }}
      />
    </div>
  );
}
