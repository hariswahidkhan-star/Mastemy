import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/client';
import { useApiMutation } from '../../api/hooks';
import { loc, usePublicSkills } from '../../api/discover';
import type {
  CertificationAdminDto,
  CoverageObjectiveDto,
  CoverageReportDto,
  PublicCertificationSummaryDto,
  SkillDto,
} from '../../api/discover';
import { fbKeys, mappedIds } from '../../api/finalb';
import type { CertificationMappingsDto } from '../../api/finalb';
import { toQuestionList } from '../../api/questions';
import type { RawQuestionDto } from '../../api/questions';
import type { StudioCourseDto } from '../../api/types';
import { useAuth } from '../../auth/AuthProvider';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { errorMessage } from '../../components/ui/ErrorState';
import { Checkbox, Field, Input, Select } from '../../components/ui/Field';
import { Notice, QueryState } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { CoverageTable } from '../../components/discover/Coverage';
import '../../styles/discover.css';

const MAX_SKILLS = 30;

function SkillsEditor({ course }: { course: StudioCourseDto }) {
  const { t, lang } = useI18n();
  const toast = useToast();
  const catalog = usePublicSkills();
  const key = ['studio', 'course', course.id, 'skills'];
  const current = useQuery({
    queryKey: key,
    queryFn: () => api<SkillDto[]>(`/api/studio/courses/${course.id}/skills`),
  });
  const [codes, setCodes] = useState<string[] | null>(null);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    if (current.data && codes === null) setCodes(current.data.map((s) => s.code));
  }, [current.data, codes]);
  const save = useApiMutation(
    (c: string[]) =>
      api<SkillDto[]>(`/api/studio/courses/${course.id}/skills`, {
        method: 'PUT',
        body: { codes: c },
      }),
    [key],
    (r) => {
      setCodes(r.map((s) => s.code));
      toast.success(t('discover.studio.skillsSaved'));
    },
  );
  const selected = codes ?? [];
  const f = filter.trim().toLowerCase();
  const options = (catalog.data ?? []).filter(
    (s) =>
      !f ||
      s.code.toLowerCase().includes(f) ||
      s.nameEn.toLowerCase().includes(f) ||
      s.nameAr.includes(filter.trim()),
  );
  const dirty =
    !!current.data &&
    JSON.stringify([...selected].sort()) !== JSON.stringify(current.data.map((s) => s.code).sort());
  return (
    <section className="section" aria-labelledby="studio-skills">
      <h2 className="section__title" id="studio-skills">
        {t('discover.studio.skillsTitle')}
      </h2>
      <p className="small muted">{t('discover.studio.skillsNote', { n: MAX_SKILLS })}</p>
      <QueryState query={current}>
        {() =>
          (catalog.data ?? []).length === 0 && !catalog.isPending ? (
            <p className="small muted">{t('discover.studio.noSkills')}</p>
          ) : (
            <>
              <Field label={t('discover.studio.filterSkills')}>
                <Input type="search" value={filter} onChange={(e) => setFilter(e.target.value)} />
              </Field>
              <fieldset style={{ border: 0, padding: 0, margin: 'var(--space-3) 0' }}>
                <legend className="visually-hidden">{t('discover.studio.skillsTitle')}</legend>
                <div className="check-grid">
                  {options.map((s) => (
                    <Checkbox
                      key={s.id}
                      label={`${loc(lang, s.nameEn, s.nameAr)} (${s.code})`}
                      checked={selected.includes(s.code)}
                      disabled={!selected.includes(s.code) && selected.length >= MAX_SKILLS}
                      onChange={(e) =>
                        setCodes(
                          e.target.checked
                            ? [...selected, s.code]
                            : selected.filter((c) => c !== s.code),
                        )
                      }
                    />
                  ))}
                </div>
              </fieldset>
              <p className="small" aria-live="polite">
                {t('discover.studio.selectedCount', { n: selected.length, max: MAX_SKILLS })}
              </p>
              {save.isError ? <Notice tone="danger">{errorMessage(save.error, t)}</Notice> : null}
              <Button
                disabled={!dirty}
                loading={save.isPending}
                onClick={() => save.mutate(selected)}
              >
                {t('discover.studio.saveSkills')}
              </Button>
            </>
          )
        }
      </QueryState>
    </section>
  );
}

function MappingDialog({
  course,
  certId,
  objective,
  kind,
  onClose,
  onSaved,
}: {
  course: StudioCourseDto;
  certId: string;
  objective: CoverageObjectiveDto;
  kind: 'lessons' | 'questions';
  onClose: () => void;
  onSaved: (r: CoverageReportDto) => void;
}) {
  const { t } = useI18n();
  const [ids, setIds] = useState<string[]>([]);
  // Preload the current mapping so saving edits it instead of silently replacing it.
  const current = useQuery({
    queryKey: fbKeys.mappings(course.id, certId),
    queryFn: () =>
      api<CertificationMappingsDto>(
        `/api/studio/courses/${course.id}/certifications/${certId}/mappings`,
      ),
  });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (loaded || !current.data) return;
    setIds(mappedIds(current.data, objective.objectiveId, kind));
    setLoaded(true);
  }, [current.data, loaded, objective.objectiveId, kind]);
  const questions = useQuery({
    queryKey: ['studio', 'course', course.id, 'questions', 'mapping'],
    queryFn: () =>
      api<RawQuestionDto[] | { items: RawQuestionDto[] }>(
        `/api/studio/courses/${course.id}/questions`,
      ).then(toQuestionList),
    enabled: kind === 'questions',
  });
  const save = useApiMutation(
    () =>
      api<CoverageReportDto>(
        `/api/studio/objectives/${objective.objectiveId}/courses/${course.id}/${kind}`,
        {
          method: 'PUT',
          body: { ids },
        },
      ),
    [fbKeys.mappings(course.id, certId)],
    onSaved,
  );
  const toggle = (id: string, on: boolean) =>
    setIds((x) => (on ? [...x, id] : x.filter((i) => i !== id)));
  const currentCount = kind === 'lessons' ? objective.lessonCount : objective.activeQuestionCount;
  return (
    <Dialog
      open
      wide
      title={t(
        kind === 'lessons'
          ? 'discover.studio.mapLessonsTitle'
          : 'discover.studio.mapQuestionsTitle',
        { code: objective.code },
      )}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button
            loading={save.isPending}
            disabled={!loaded}
            onClick={() => save.mutate(undefined)}
          >
            {t('discover.studio.saveMapping', { n: ids.length })}
          </Button>
        </>
      }
    >
      <p>{objective.title}</p>
      {current.isPending ? (
        <p className="small muted">{t('common.loading')}</p>
      ) : current.isError ? (
        <Notice tone="danger">{errorMessage(current.error, t)}</Notice>
      ) : !current.data.linked ? (
        <Notice tone="warning">{t('finalb.mapping.notLinked')}</Notice>
      ) : (
        <Notice tone="info">
          {t('finalb.mapping.preloaded', {
            n: mappedIds(current.data, objective.objectiveId, kind).length,
            active: currentCount,
          })}
        </Notice>
      )}
      {kind === 'lessons' ? (
        course.modules.length === 0 ? (
          <p className="small muted">{t('discover.studio.noLessons')}</p>
        ) : (
          course.modules.map((m) => (
            <fieldset key={m.id} style={{ border: 0, padding: 0, margin: 'var(--space-3) 0' }}>
              <legend className="field__label">{m.title}</legend>
              <div className="check-grid">
                {m.lessons.map((l) => (
                  <Checkbox
                    key={l.id}
                    label={l.title}
                    checked={ids.includes(l.id)}
                    onChange={(e) => toggle(l.id, e.target.checked)}
                  />
                ))}
              </div>
            </fieldset>
          ))
        )
      ) : (
        <QueryState query={questions}>
          {(qs) =>
            qs.length === 0 ? (
              <p className="small muted">{t('discover.studio.noQuestions')}</p>
            ) : (
              <div className="check-grid" style={{ marginBlockStart: 'var(--space-3)' }}>
                {qs.map((q) => (
                  <Checkbox
                    key={q.id}
                    label={`${q.externalId ? `${q.externalId}: ` : ''}${q.stem.slice(0, 90)}`}
                    hint={t(`status.${q.state}`)}
                    checked={ids.includes(q.id)}
                    onChange={(e) => toggle(q.id, e.target.checked)}
                  />
                ))}
              </div>
            )
          }
        </QueryState>
      )}
      <p className="small muted">{t('discover.studio.activeOnly')}</p>
      {save.isError ? <Notice tone="danger">{errorMessage(save.error, t)}</Notice> : null}
    </Dialog>
  );
}

function CertificationMapping({ course }: { course: StudioCourseDto }) {
  const { t, fmtNumber } = useI18n();
  const { hasRole } = useAuth();
  const toast = useToast();
  const staff = hasRole('Reviewer', 'Admin', 'SuperAdmin');
  const publicCerts = useQuery({
    queryKey: ['discover', 'certifications', {}],
    queryFn: () => api<PublicCertificationSummaryDto[]>('/api/certifications'),
    enabled: !staff,
  });
  const adminCerts = useQuery({
    queryKey: ['admin', 'certs', '', false],
    queryFn: () => api<CertificationAdminDto[]>('/api/admin/certifications'),
    enabled: staff,
  });
  const options = staff
    ? (adminCerts.data ?? []).map((c) => ({
        value: c.id,
        label: c.examCode ? `${c.title} (${c.examCode})` : c.title,
      }))
    : (publicCerts.data ?? []).map((c) => ({
        value: c.id,
        label: c.examCode ? `${c.title} (${c.examCode})` : c.title,
      }));
  const [certId, setCertId] = useState('');
  const covKey = ['studio', 'coverage', course.id, certId];
  const coverage = useQuery({
    queryKey: covKey,
    queryFn: () =>
      api<CoverageReportDto>(`/api/studio/courses/${course.id}/certifications/${certId}/coverage`),
    enabled: !!certId,
  });
  const [mapping, setMapping] = useState<{
    objective: CoverageObjectiveDto;
    kind: 'lessons' | 'questions';
  } | null>(null);
  const [report, setReport] = useState<CoverageReportDto | null>(null);
  useEffect(() => setReport(null), [certId]);
  const shown = report ?? coverage.data;

  return (
    <section className="section" aria-labelledby="studio-cert">
      <h2 className="section__title" id="studio-cert">
        {t('discover.studio.certTitle')}
      </h2>
      <p className="small muted">{t('discover.studio.certNote')}</p>
      <Field label={t('discover.studio.chooseCert')}>
        <Select
          value={certId}
          onChange={(e) => setCertId(e.target.value)}
          placeholder={t('discover.admin.choose')}
          options={options}
        />
      </Field>
      {certId ? (
        coverage.isPending ? (
          <p className="small muted">{t('common.loading')}</p>
        ) : coverage.isError && !report ? (
          <Notice tone="danger">{errorMessage(coverage.error, t)}</Notice>
        ) : shown ? (
          <>
            <CoverageTable report={shown} fmt={fmtNumber} />
            {shown.objectives.length > 0 ? (
              <ul
                className="ordered-picker"
                style={{ marginBlockStart: 'var(--space-3)' }}
                aria-label={t('discover.studio.mapActions')}
              >
                {shown.objectives.map((o) => (
                  <li key={o.objectiveId}>
                    <span className="mono">{o.code}</span>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setMapping({ objective: o, kind: 'lessons' })}
                      aria-label={t('discover.studio.mapLessonsNamed', { code: o.code })}
                    >
                      {t('discover.studio.mapLessons')}
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setMapping({ objective: o, kind: 'questions' })}
                      aria-label={t('discover.studio.mapQuestionsNamed', { code: o.code })}
                    >
                      {t('discover.studio.mapQuestions')}
                    </Button>
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        ) : null
      ) : null}
      {mapping ? (
        <MappingDialog
          course={course}
          certId={certId}
          objective={mapping.objective}
          kind={mapping.kind}
          onClose={() => setMapping(null)}
          onSaved={(r) => {
            setReport(r);
            setMapping(null);
            toast.success(t('discover.studio.mappingSaved'));
          }}
        />
      ) : null}
    </section>
  );
}

/** Studio course editor tab: skills (snapshot-safe) and certification objective mapping with coverage. */
export function StudioTaxonomyPanel({ course }: { course: StudioCourseDto }) {
  return (
    <>
      <SkillsEditor course={course} />
      <CertificationMapping course={course} />
    </>
  );
}
