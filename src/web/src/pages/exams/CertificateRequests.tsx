import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/client';
import { useApiMutation } from '../../api/hooks';
import { examKeys, useMyAccommodations } from '../../api/exams';
import type { AppealDto, CorrectionDto } from '../../api/exams';
import { useMyCertificates, w2keys } from '../../api/wave2';
import type { MyCertificateDto } from '../../api/wave2';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { Field, Input, Textarea } from '../../components/ui/Field';
import { Badge, Notice } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { examError } from './examErrors';

type Mode = { kind: 'correction' | 'appeal'; cert: MyCertificateDto } | null;

/**
 * Dashboard section: request a certificate name correction (valid certificates) or appeal a revocation
 * (revoked certificates), and follow the status of earlier requests. Also lists exam accommodations.
 */
export function CertificateRequestsSection() {
  const { t, fmtDate } = useI18n();
  const toast = useToast();
  const certs = useMyCertificates();
  const corrections = useQuery({
    queryKey: examKeys.myCorrections,
    queryFn: () => api<CorrectionDto[]>('/api/me/certificate-corrections'),
  });
  const appeals = useQuery({
    queryKey: examKeys.myAppeals,
    queryFn: () => api<AppealDto[]>('/api/me/certificate-appeals'),
  });
  const accommodations = useMyAccommodations();
  const [mode, setMode] = useState<Mode>(null);
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const submit = useApiMutation(
    () =>
      mode?.kind === 'correction'
        ? api(`/api/me/certificates/${mode.cert.id}/corrections`, {
            method: 'POST',
            body: { requestedName: name.trim(), reason: reason.trim() },
          })
        : api(`/api/me/certificates/${mode?.cert.id}/appeals`, {
            method: 'POST',
            body: { reason: reason.trim() },
          }),
    [examKeys.myCorrections, examKeys.myAppeals, w2keys.myCertificates],
    () => {
      toast.success(
        mode?.kind === 'correction'
          ? t('exams.certReq.correctionSent')
          : t('exams.certReq.appealSent'),
      );
      setMode(null);
    },
  );
  const open = (kind: 'correction' | 'appeal', cert: MyCertificateDto) => {
    setMode({ kind, cert });
    setName(cert.recipientName);
    setReason('');
    submit.reset();
  };
  const nameOk = name.trim().length >= 2 && name.trim().length <= 100;
  const reasonOk =
    mode?.kind === 'appeal'
      ? reason.trim().length >= 10 && reason.trim().length <= 2000
      : reason.trim().length > 0;
  const pendingFor = (certId: string) =>
    (corrections.data ?? []).some((c) => c.certificateId === certId && c.status === 'Pending') ||
    (appeals.data ?? []).some((a) => a.certificateId === certId && a.status === 'Pending');

  const list = certs.data ?? [];
  const requests = [
    ...(corrections.data ?? []).map((c) => ({ ...c, kind: 'correction' as const })),
    ...(appeals.data ?? []).map((a) => ({ ...a, kind: 'appeal' as const })),
  ].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const acc = accommodations.data ?? [];
  if (list.length === 0 && requests.length === 0 && acc.length === 0) return null;

  return (
    <section className="card stack" aria-labelledby="cert-req-h">
      <h2 id="cert-req-h">{t('exams.certReq.title')}</h2>
      {list.length > 0 ? (
        <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
          {list.map((c) => (
            <li key={c.id} className="row row--between">
              <span>
                <strong>{c.courseTitle}</strong>{' '}
                <span className="small muted">
                  {c.code} · {c.recipientName}
                </span>
              </span>
              {pendingFor(c.id) ? (
                <Badge tone="info">{t('exams.certReq.pending')}</Badge>
              ) : c.status === 'Valid' ? (
                <Button
                  size="sm"
                  variant="ghost"
                  aria-label={t('exams.certReq.correctFor', { course: c.courseTitle })}
                  onClick={() => open('correction', c)}
                >
                  {t('exams.certReq.correct')}
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="secondary"
                  aria-label={t('exams.certReq.appealFor', { course: c.courseTitle })}
                  onClick={() => open('appeal', c)}
                >
                  {t('exams.certReq.appeal')}
                </Button>
              )}
            </li>
          ))}
        </ul>
      ) : null}
      {requests.length > 0 ? (
        <>
          <h3>{t('exams.certReq.history')}</h3>
          <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
            {requests.map((r) => (
              <li key={r.id} className="small">
                <Badge
                  tone={
                    r.status === 'Approved'
                      ? 'success'
                      : r.status === 'Rejected'
                        ? 'danger'
                        : 'info'
                  }
                >
                  {t(`exams.requests.status.${r.status}`)}
                </Badge>{' '}
                {r.kind === 'correction' && 'requestedName' in r
                  ? t('exams.requests.nameChange', { from: r.currentName, to: r.requestedName })
                  : t('exams.certReq.appealOf', { code: r.certificateCode })}{' '}
                <span className="muted">{fmtDate(r.createdAt)}</span>
                {r.decisionNote ? <div className="muted">{r.decisionNote}</div> : null}
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {acc.length > 0 ? (
        <>
          <h3>{t('exams.acc.mine')}</h3>
          <ul className="small">
            {acc.map((a) => (
              <li key={a.id}>
                {a.untimed
                  ? t('exams.acc.untimedShort')
                  : t('exams.acc.extraShort', { n: a.extraTimePercent })}{' '}
                · {a.assessmentId ? t('exams.acc.oneAssessment') : t('exams.acc.global')}
              </li>
            ))}
          </ul>
        </>
      ) : null}
      <Dialog
        open={mode !== null}
        title={
          mode?.kind === 'correction'
            ? t('exams.certReq.correctTitle')
            : t('exams.certReq.appealTitle')
        }
        onClose={() => setMode(null)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setMode(null)}>
              {t('common.cancel')}
            </Button>
            <Button
              loading={submit.isPending}
              disabled={!reasonOk || (mode?.kind === 'correction' && !nameOk)}
              onClick={() => submit.mutate(undefined)}
            >
              {t('exams.certReq.send')}
            </Button>
          </>
        }
      >
        {mode?.kind === 'correction' ? (
          <>
            <p className="small">{t('exams.certReq.correctBody')}</p>
            <Field
              label={t('exams.certReq.newName')}
              error={nameOk ? undefined : t('exams.certReq.nameRule')}
              required
            >
              <Input value={name} maxLength={100} onChange={(e) => setName(e.target.value)} />
            </Field>
          </>
        ) : (
          <p className="small">{t('exams.certReq.appealBody')}</p>
        )}
        <Field
          label={t('exams.certReq.reason')}
          hint={mode?.kind === 'appeal' ? t('exams.challenge.reasonHint') : undefined}
          required
        >
          <Textarea
            rows={3}
            maxLength={2000}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Field>
        {submit.isError ? <Notice tone="danger">{examError(submit.error, t)}</Notice> : null}
      </Dialog>
    </section>
  );
}
