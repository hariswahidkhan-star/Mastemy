import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api, ApiError, downloadFile } from '../../api/client';
import { useApiMutation } from '../../api/hooks';
import {
  NOTIFICATION_KINDS,
  useMyCertificates,
  useMyOrgs,
  useNotifications,
  w2keys,
} from '../../api/wave2';
import type { MyCertificateDto, PreferenceDto, PreferencesDto } from '../../api/wave2';
import { safeLink } from '../../components/NotificationBell';
import { Button, ButtonLink } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { errorMessage } from '../../components/ui/ErrorState';
import { Checkbox } from '../../components/ui/Field';
import {
  Badge,
  Notice,
  PageHeader,
  Pagination,
  QueryState,
  StatusBadge,
} from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';

// ---------- Notifications page ----------

export function NotificationsPage() {
  const { t, fmtDate } = useI18n();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const list = useNotifications(page, 20, unreadOnly);
  usePageMeta(t('notifications.title'), undefined, { noindex: true });
  const refresh = () => qc.invalidateQueries({ queryKey: w2keys.notifications });
  const readAll = useApiMutation(
    () => api('/api/me/notifications/read-all', { method: 'POST' }),
    [w2keys.notifications],
    () => toast.success(t('notifications.allRead')),
  );
  const markRead = useApiMutation(
    (id: string) => api(`/api/me/notifications/${id}/read`, { method: 'POST' }),
    [w2keys.notifications],
  );
  return (
    <div className="container page">
      <PageHeader
        title={t('notifications.title')}
        actions={
          <>
            <ButtonLink to="/me/settings/notifications" variant="secondary" size="sm">
              {t('notifications.settings')}
            </ButtonLink>
            <Button
              size="sm"
              onClick={() => readAll.mutate(undefined)}
              loading={readAll.isPending}
              disabled={!list.data || list.data.unreadCount === 0}
            >
              {t('notifications.readAll')}
            </Button>
          </>
        }
      />
      <Checkbox
        label={t('notifications.unreadOnly')}
        checked={unreadOnly}
        onChange={(e) => {
          setPage(1);
          setUnreadOnly(e.target.checked);
        }}
      />
      <QueryState query={list}>
        {(data) =>
          data.items.length === 0 ? (
            <EmptyState
              title={unreadOnly ? t('notifications.noneUnread') : t('notifications.empty')}
            />
          ) : (
            <>
              <p className="small muted" aria-live="polite">
                {t('notifications.unreadCount', { n: data.unreadCount })}
              </p>
              <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
                {data.items.map((n) => (
                  <li
                    key={n.id}
                    className={n.readAt ? 'card card--flat' : 'card card--flat card--unread'}
                  >
                    <div className="row row--between">
                      <div>
                        <Badge tone={n.readAt ? 'neutral' : 'info'}>
                          {t(`notifications.kind.${n.kind}`)}
                        </Badge>{' '}
                        <Link
                          to={safeLink(n.link)}
                          onClick={() => {
                            if (!n.readAt) markRead.mutate(n.id);
                          }}
                        >
                          {n.title}
                        </Link>
                        <div className="small muted">{fmtDate(n.createdAt)}</div>
                      </div>
                      {!n.readAt ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markRead.mutate(n.id, { onSuccess: () => void refresh() })}
                          aria-label={t('notifications.markReadNamed', { title: n.title })}
                        >
                          {t('notifications.markRead')}
                        </Button>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
              <Pagination
                page={data.page}
                pageSize={data.pageSize}
                total={data.total}
                onPage={setPage}
              />
            </>
          )
        }
      </QueryState>
      <p>
        <Button variant="ghost" size="sm" onClick={() => navigate('/me')}>
          {t('common.back')}
        </Button>
      </p>
    </div>
  );
}

// ---------- Notification preferences ----------

export function mergePrefs(server: PreferenceDto[]): PreferenceDto[] {
  return NOTIFICATION_KINDS.map(
    (kind) => server.find((p) => p.kind === kind) ?? { kind, inApp: true, email: false },
  );
}

export function NotificationSettingsPage() {
  const { t } = useI18n();
  const toast = useToast();
  usePageMeta(t('notifications.settingsTitle'), undefined, { noindex: true });
  const prefs = useQuery({
    queryKey: w2keys.notificationPrefs,
    queryFn: () => api<PreferencesDto>('/api/me/notification-preferences'),
  });
  const [items, setItems] = useState<PreferenceDto[] | null>(null);
  useEffect(() => {
    if (prefs.data) setItems(mergePrefs(prefs.data.items));
  }, [prefs.data]);
  const save = useApiMutation(
    (list: PreferenceDto[]) =>
      api<PreferencesDto>('/api/me/notification-preferences', {
        method: 'PUT',
        body: { items: list },
      }),
    [w2keys.notificationPrefs],
    () => toast.success(t('notifications.prefsSaved')),
  );
  const set = (kind: string, field: 'inApp' | 'email', value: boolean) =>
    setItems((list) => (list ?? []).map((p) => (p.kind === kind ? { ...p, [field]: value } : p)));

  return (
    <div className="container page">
      <PageHeader
        title={t('notifications.settingsTitle')}
        subtitle={t('notifications.settingsSubtitle')}
      />
      <QueryState query={prefs}>
        {(data) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (items) save.mutate(items);
            }}
          >
            {!data.emailAvailable ? (
              <Notice tone="warning" title={t('notifications.emailUnavailableTitle')}>
                {t('notifications.emailUnavailable')}
              </Notice>
            ) : null}
            <div className="table-wrap">
              <table className="table">
                <caption className="visually-hidden">{t('notifications.settingsTitle')}</caption>
                <thead>
                  <tr>
                    <th scope="col">{t('notifications.kindHeader')}</th>
                    <th scope="col">{t('notifications.inApp')}</th>
                    <th scope="col">{t('notifications.email')}</th>
                  </tr>
                </thead>
                <tbody>
                  {(items ?? mergePrefs(data.items)).map((p) => (
                    <tr key={p.kind}>
                      <th scope="row">{t(`notifications.kind.${p.kind}`)}</th>
                      <td>
                        <Checkbox
                          label={
                            <span className="visually-hidden">
                              {t('notifications.inAppFor', {
                                kind: t(`notifications.kind.${p.kind}`),
                              })}
                            </span>
                          }
                          checked={p.inApp}
                          onChange={(e) => set(p.kind, 'inApp', e.target.checked)}
                        />
                      </td>
                      <td>
                        <Checkbox
                          label={
                            <span className="visually-hidden">
                              {t('notifications.emailFor', {
                                kind: t(`notifications.kind.${p.kind}`),
                              })}
                            </span>
                          }
                          checked={p.email}
                          onChange={(e) => set(p.kind, 'email', e.target.checked)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!data.emailAvailable ? (
              <p className="small muted">{t('notifications.emailStoredNote')}</p>
            ) : null}
            {save.isError ? <Notice tone="danger">{errorMessage(save.error, t)}</Notice> : null}
            <Button type="submit" loading={save.isPending} disabled={!items}>
              {t('common.save')}
            </Button>
          </form>
        )}
      </QueryState>
    </div>
  );
}

// ---------- Certificates (dashboard) ----------

function CertificateRow({ cert }: { cert: MyCertificateDto }) {
  const { t, fmtDate } = useI18n();
  const toast = useToast();
  const [downloading, setDownloading] = useState(false);
  // Optimistic: the toggle reflects the choice at once and reverts if the API refuses it.
  const [visible, setVisible] = useState(cert.publiclyVisible);
  const [synced, setSynced] = useState(cert.publiclyVisible);
  if (synced !== cert.publiclyVisible) {
    setSynced(cert.publiclyVisible);
    setVisible(cert.publiclyVisible);
  }
  const visibility = useApiMutation(
    (publiclyVisible: boolean) =>
      api<MyCertificateDto>(`/api/me/certificates/${cert.id}/visibility`, {
        method: 'PUT',
        body: { publiclyVisible },
      }),
    [w2keys.myCertificates],
    (r) =>
      toast.success(r.publiclyVisible ? t('certificates.nowPublic') : t('certificates.nowPrivate')),
  );
  const revoked = cert.status === 'Revoked';
  return (
    <li>
      <strong>{cert.courseTitle}</strong> <StatusBadge status={cert.status} />{' '}
      <Badge tone={visible ? 'success' : 'neutral'}>
        {visible ? t('certificates.public') : t('certificates.private')}
      </Badge>
      <div className="small">
        <Link to={`/verify/${encodeURIComponent(cert.code)}`}>{cert.code}</Link> ·{' '}
        {fmtDate(cert.issuedAt)}
      </div>
      <div className="row" style={{ marginBlockStart: 'var(--space-2)' }}>
        <Button
          size="sm"
          variant="secondary"
          loading={downloading}
          disabled={revoked}
          onClick={() => {
            setDownloading(true);
            downloadFile(
              `/api/certificates/${encodeURIComponent(cert.code)}/pdf`,
              `mastemy-certificate-${cert.code}.pdf`,
            )
              .catch((e) =>
                toast.error(
                  e instanceof ApiError && e.is('certificate_revoked')
                    ? t('certificates.revokedPdf')
                    : errorMessage(e, t),
                ),
              )
              .finally(() => setDownloading(false));
          }}
        >
          {t('certificates.downloadPdf')}
        </Button>
        <Checkbox
          label={t('certificates.publicToggle')}
          hint={t('certificates.publicHint')}
          checked={visible}
          disabled={visibility.isPending}
          onChange={(e) => {
            const next = e.target.checked;
            setVisible(next);
            visibility.mutate(next, { onError: () => setVisible(!next) });
          }}
        />
      </div>
      {visibility.isError ? (
        <Notice tone="danger">{errorMessage(visibility.error, t)}</Notice>
      ) : null}
    </li>
  );
}

export function CertificatesSection() {
  const { t } = useI18n();
  const certs = useMyCertificates();
  return (
    <section className="card">
      <h2>{t('dashboard.certificates')}</h2>
      <QueryState query={certs}>
        {(list) =>
          list.length === 0 ? (
            <p className="muted">{t('dashboard.noCertificates')}</p>
          ) : (
            <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
              {list.map((c) => (
                <CertificateRow key={c.id} cert={c} />
              ))}
            </ul>
          )
        }
      </QueryState>
    </section>
  );
}

// ---------- Member view: assigned courses ----------

export function MyOrganizationsSection() {
  const { t, fmtDate } = useI18n();
  const orgs = useMyOrgs();
  if (orgs.isPending || orgs.isError || orgs.data.length === 0) return null;
  return (
    <section className="card" aria-labelledby="my-orgs-h">
      <h2 id="my-orgs-h">{t('orgs.assignedTitle')}</h2>
      {orgs.data.map((o) => (
        <div key={o.id} className="stack" style={{ marginBlockEnd: 'var(--space-4)' }}>
          <h3 style={{ marginBlockEnd: 0 }}>
            {o.name} <Badge>{t(`orgs.role.${o.role}`)}</Badge>
            {o.department ? <span className="small muted"> · {o.department}</span> : null}
          </h3>
          {o.role === 'Admin' || o.role === 'Manager' ? (
            <Link to={`/orgs/${o.id}`} className="small">
              {t('orgs.manage')}
            </Link>
          ) : null}
          {o.assignments.length === 0 ? (
            <p className="muted small">{t('orgs.noAssignments')}</p>
          ) : (
            <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
              {o.assignments.map((a) => (
                <li key={a.assignmentId} className="row row--between">
                  <div>
                    <Link to={`/courses/${a.courseSlug}`}>
                      <strong>{a.courseTitle}</strong>
                    </Link>{' '}
                    {a.grantsPremium ? (
                      <Badge tone="accent">{t('orgs.premiumIncluded')}</Badge>
                    ) : null}{' '}
                    {a.overdue ? <Badge tone="danger">{t('orgs.overdue')}</Badge> : null}
                    <div className="small muted">
                      {a.dueAt ? t('orgs.dueOn', { date: fmtDate(a.dueAt) }) : t('orgs.noDue')}
                    </div>
                  </div>
                  <ButtonLink size="sm" to={`/learn/${a.courseSlug}`}>
                    {t('course.startWatching')}
                  </ButtonLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
}
