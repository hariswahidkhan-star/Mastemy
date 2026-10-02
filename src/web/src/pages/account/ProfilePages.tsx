import { startTransition, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { accountApi, accountKeys, parseInterests, timeZones } from '../../api/account';
import type { EvidenceType, ProfileDto, ProfileLink, SkillEvidenceDto } from '../../api/account';
import { ApiError, downloadFile, setSession } from '../../api/client';
import { useApiMutation } from '../../api/hooks';
import { useAuth } from '../../auth/AuthProvider';
import { Button } from '../../components/ui/Button';
import { Checkbox, Field, Input, Select, Textarea } from '../../components/ui/Field';
import { EmptyState } from '../../components/ui/EmptyState';
import { Badge, Notice, QueryState } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import { accountError, cleanCode } from './Mfa';
import { AccountShell } from './SecurityPage';

const MAX_LINKS = 5;

/** Mirrors the server's link rule: https only, no credentials in the URL. */
export function isValidProfileUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === 'https:' && !u.username && !u.password && !!u.hostname;
  } catch {
    return false;
  }
}

function ProfileForm({ profile }: { profile: ProfileDto }) {
  const { t } = useI18n();
  const { hasRole, refreshUser } = useAuth();
  const toast = useToast();
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [headline, setHeadline] = useState(profile.headline);
  const [bio, setBio] = useState(profile.bio);
  const [language, setLanguage] = useState(profile.preferredLanguage);
  const [timeZone, setTimeZone] = useState(profile.timeZone || 'UTC');
  const [links, setLinks] = useState<ProfileLink[]>(profile.links);
  const [publicProfile, setPublicProfile] = useState(profile.publicInstructorProfile);
  const zones = useMemo(() => timeZones(profile.timeZone), [profile.timeZone]);
  const isInstructor = hasRole('Instructor');

  const linkErrors = links.map((l) =>
    !l.label.trim() || l.label.trim().length > 50
      ? t('account.profile.linkLabelRule')
      : !isValidProfileUrl(l.url.trim())
        ? t('account.profile.linkUrlRule')
        : undefined,
  );
  const nameError =
    displayName.trim().length < 2 || displayName.trim().length > 80
      ? t('validation.minChars', { n: 2 })
      : undefined;
  const invalid =
    !!nameError || headline.length > 160 || bio.length > 5000 || linkErrors.some(Boolean);

  const save = useApiMutation(
    () =>
      accountApi.updateProfile({
        displayName: displayName.trim(),
        headline: headline.trim(),
        bio: bio.trim(),
        preferredLanguage: language,
        timeZone,
        links: links.map((l) => ({ label: l.label.trim(), url: l.url.trim() })),
        ...(isInstructor ? { publicInstructorProfile: publicProfile } : {}),
      }),
    [accountKeys.profile],
    () => {
      toast.success(t('account.profile.saved'));
      void refreshUser();
    },
  );

  const setLink = (i: number, patch: Partial<ProfileLink>) =>
    setLinks((ls) => ls.map((l, j) => (j === i ? { ...l, ...patch } : l)));

  return (
    <form
      className="card stack"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!invalid) save.mutate(undefined);
      }}
    >
      <div className="row" style={{ alignItems: 'center' }}>
        <span
          aria-hidden="true"
          style={{
            inlineSize: 56,
            blockSize: 56,
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            fontWeight: 700,
            background: 'var(--color-accent-soft, var(--color-surface-2, #e8eefc))',
          }}
        >
          {profile.initials}
        </span>
        <div>
          <strong>{profile.email}</strong>{' '}
          {profile.emailVerified ? (
            <Badge tone="success">{t('account.profile.emailVerified')}</Badge>
          ) : (
            <Badge tone="warning">{t('account.profile.emailUnverified')}</Badge>
          )}
          <p className="small muted" style={{ margin: 0 }}>
            {t('account.profile.noAvatar')}
          </p>
        </div>
      </div>
      <Field label={t('auth.displayName')} error={nameError} required>
        <Input
          autoComplete="name"
          value={displayName}
          maxLength={80}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </Field>
      <Field
        label={t('account.profile.headline')}
        hint={t('account.common.chars', { n: headline.length, max: 160 })}
        error={headline.length > 160 ? t('account.error.invalid_headline') : undefined}
      >
        <Input value={headline} onChange={(e) => setHeadline(e.target.value)} />
      </Field>
      <Field
        label={t('account.profile.bio')}
        hint={t('account.common.chars', { n: bio.length, max: 5000 })}
        error={bio.length > 5000 ? t('account.error.invalid_bio') : undefined}
      >
        <Textarea rows={6} value={bio} onChange={(e) => setBio(e.target.value)} />
      </Field>
      <div className="grid-2">
        <Field label={t('auth.preferredLanguage')}>
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            options={[
              { value: 'en', label: t('language.en') },
              { value: 'ar', label: t('language.ar') },
            ]}
          />
        </Field>
        <Field label={t('account.profile.timeZone')}>
          <Select
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
            options={zones.map((z) => ({ value: z, label: z.replace(/_/g, ' ') }))}
          />
        </Field>
      </div>
      <fieldset style={{ border: 'none', padding: 0, margin: 0 }} className="stack">
        <legend className="field__label">{t('account.profile.links')}</legend>
        <p className="small muted">{t('account.profile.linksHelp', { max: MAX_LINKS })}</p>
        {links.length === 0 ? <p className="small">{t('account.profile.noLinks')}</p> : null}
        {links.map((l, i) => (
          <div key={i} className="row" style={{ alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <Field label={t('account.profile.linkLabel', { n: i + 1 })} className="grow">
              <Input
                value={l.label}
                maxLength={50}
                onChange={(e) => setLink(i, { label: e.target.value })}
              />
            </Field>
            <Field
              label={t('account.profile.linkUrl', { n: i + 1 })}
              className="grow"
              error={l.url || l.label ? linkErrors[i] : undefined}
            >
              <Input
                type="url"
                dir="ltr"
                placeholder="https://"
                value={l.url}
                onChange={(e) => setLink(i, { url: e.target.value })}
              />
            </Field>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLinks((ls) => ls.filter((_, j) => j !== i))}
              aria-label={t('account.profile.removeLink', { n: i + 1 })}
            >
              {t('account.common.remove')}
            </Button>
          </div>
        ))}
        {links.length < MAX_LINKS ? (
          <div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setLinks((ls) => [...ls, { label: '', url: '' }])}
            >
              {t('account.profile.addLink')}
            </Button>
          </div>
        ) : null}
      </fieldset>
      {isInstructor ? (
        <div className="stack">
          <Checkbox
            label={t('account.profile.publicProfile')}
            hint={t('account.profile.publicProfileHint')}
            checked={publicProfile}
            onChange={(e) => setPublicProfile(e.target.checked)}
          />
          {profile.publicInstructorProfile ? (
            <Link to={`/instructors/${profile.id}`}>{t('account.profile.viewPublic')}</Link>
          ) : null}
        </div>
      ) : null}
      {save.isError ? <Notice tone="danger">{accountError(save.error, t)}</Notice> : null}
      <div>
        <Button type="submit" loading={save.isPending} disabled={invalid}>
          {t('common.save')}
        </Button>
      </div>
    </form>
  );
}

export function ProfilePage() {
  const { t } = useI18n();
  usePageMeta(t('account.profile.title'), undefined, { noindex: true });
  const profile = useQuery({ queryKey: accountKeys.profile, queryFn: accountApi.profile });
  return (
    <AccountShell title={t('account.profile.title')} subtitle={t('account.profile.subtitle')}>
      <QueryState query={profile}>{(p) => <ProfileForm key={p.id} profile={p} />}</QueryState>
    </AccountShell>
  );
}

/** Onboarding after registration (and editable later): learning goals. Skippable. */
export function WelcomePage() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const toast = useToast();
  usePageMeta(t('account.goals.title'), undefined, { noindex: true });
  const goals = useQuery({ queryKey: accountKeys.goals, queryFn: accountApi.goals });
  const [text, setText] = useState('');
  const [interests, setInterests] = useState('');
  const [language, setLanguage] = useState<string>(lang);
  useEffect(() => {
    if (!goals.data) return;
    setText(goals.data.goals);
    setInterests(goals.data.skillsOfInterest.join(', '));
    if (goals.data.learningLanguage) setLanguage(goals.data.learningLanguage);
  }, [goals.data]);
  const list = parseInterests(interests);
  const langValid = /^[a-z]{2,3}(-[A-Za-z]{2,4})?$/.test(language);
  const invalid =
    text.length > 2000 || list.length > 20 || list.some((s) => s.length > 60) || !langValid;
  const save = useApiMutation(
    () =>
      accountApi.putGoals({
        goals: text.trim(),
        skillsOfInterest: list,
        learningLanguage: language,
      }),
    [accountKeys.goals],
    () => {
      toast.success(t('account.goals.saved'));
      navigate('/me');
    },
  );
  const isNew = !goals.data?.updatedAt;
  return (
    <div className="container page" style={{ maxInlineSize: 720 }}>
      <h1 className="page-title">
        {isNew ? t('account.goals.welcome') : t('account.goals.title')}
      </h1>
      <p className="page-subtitle">{t('account.goals.intro')}</p>
      <QueryState query={goals}>
        {() => (
          <form
            className="card stack"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              if (!invalid) save.mutate(undefined);
            }}
          >
            <Field
              label={t('account.goals.goals')}
              hint={t('account.common.chars', { n: text.length, max: 2000 })}
              error={text.length > 2000 ? t('account.goals.tooLong') : undefined}
            >
              <Textarea rows={5} value={text} onChange={(e) => setText(e.target.value)} />
            </Field>
            <Field
              label={t('account.goals.interests')}
              hint={t('account.goals.interestsHint', { n: list.length })}
              error={
                list.length > 20 || list.some((s) => s.length > 60)
                  ? t('account.goals.interestsRule')
                  : undefined
              }
            >
              <Input value={interests} onChange={(e) => setInterests(e.target.value)} />
            </Field>
            <Field
              label={t('account.goals.language')}
              hint={t('account.goals.languageHint')}
              error={!langValid ? t('account.error.invalid_language') : undefined}
            >
              <Input
                dir="ltr"
                value={language}
                list="learning-languages"
                onChange={(e) => setLanguage(e.target.value.trim())}
              />
            </Field>
            <datalist id="learning-languages">
              <option value="en">{t('language.en')}</option>
              <option value="ar">{t('language.ar')}</option>
            </datalist>
            {save.isError ? <Notice tone="danger">{accountError(save.error, t)}</Notice> : null}
            <div className="row">
              <Button type="submit" loading={save.isPending} disabled={invalid}>
                {t('account.goals.save')}
              </Button>
              <Link className="btn btn--ghost btn--md" to="/me">
                {t('account.goals.skip')}
              </Link>
            </div>
          </form>
        )}
      </QueryState>
    </div>
  );
}

function evidenceLabel(type: EvidenceType, t: (k: string) => string): string {
  return t(`account.skills.evidence.${type}`);
}

function SkillItem({
  s,
  onDelete,
  deleting,
}: {
  s: SkillEvidenceDto;
  onDelete?: () => void;
  deleting: boolean;
}) {
  const { t, fmtDate, fmtNumber } = useI18n();
  const tone =
    s.evidenceType === 'mcq_assessed'
      ? 'info'
      : s.evidenceType === 'external_credential'
        ? 'warning'
        : 'neutral';
  return (
    <li className="card card--flat stack" style={{ listStyle: 'none' }}>
      <div className="row row--between" style={{ flexWrap: 'wrap' }}>
        <strong>{s.name}</strong>
        <Badge tone={tone}>{t(`account.skills.type.${s.evidenceType}`)}</Badge>
      </div>
      <p className="small" style={{ margin: 0 }}>
        {evidenceLabel(s.evidenceType, t)}
      </p>
      {s.evidenceType === 'mcq_assessed' ? (
        <p className="small muted" style={{ margin: 0 }}>
          {t('account.skills.mcqStats', {
            n: s.assessmentsPassed ?? 0,
            best: s.bestScorePercent != null ? fmtNumber(s.bestScorePercent) : '—',
            date: fmtDate(s.lastPassedAt),
          })}
        </p>
      ) : null}
      {s.issuer ? (
        <p className="small muted" style={{ margin: 0 }}>
          {t('account.skills.issuer')}: {s.issuer}
          {s.obtainedAt ? ` · ${fmtDate(s.obtainedAt)}` : ''}
          {s.credentialUrl ? (
            <>
              {' · '}
              <a href={s.credentialUrl} target="_blank" rel="noopener noreferrer nofollow">
                {t('account.skills.credentialLink')}
              </a>
            </>
          ) : null}
        </p>
      ) : s.obtainedAt ? (
        <p className="small muted" style={{ margin: 0 }}>
          {fmtDate(s.obtainedAt)}
        </p>
      ) : null}
      {onDelete ? (
        <div>
          <Button
            size="sm"
            variant="ghost"
            loading={deleting}
            onClick={onDelete}
            aria-label={t('account.skills.removeNamed', { name: s.name })}
          >
            {t('account.common.remove')}
          </Button>
        </div>
      ) : null}
    </li>
  );
}

export function SkillsPage() {
  const { t } = useI18n();
  const toast = useToast();
  usePageMeta(t('account.skills.title'), undefined, { noindex: true });
  const skills = useQuery({ queryKey: accountKeys.skills, queryFn: accountApi.skills });
  const [name, setName] = useState('');
  const [type, setType] = useState<'self_declared' | 'external_credential'>('self_declared');
  const [issuer, setIssuer] = useState('');
  const [url, setUrl] = useState('');
  const [obtained, setObtained] = useState('');
  const external = type === 'external_credential';
  const urlError =
    url.trim() && !isValidProfileUrl(url.trim()) ? t('account.profile.linkUrlRule') : undefined;
  const invalid =
    !name.trim() || name.trim().length > 60 || (external && !issuer.trim()) || !!urlError;
  const add = useApiMutation(
    () =>
      accountApi.addSkill({
        name: name.trim(),
        evidenceType: type,
        ...(external ? { issuer: issuer.trim(), credentialUrl: url.trim() || undefined } : {}),
        obtainedAt: obtained ? `${obtained}T00:00:00Z` : undefined,
      }),
    [accountKeys.skills],
    () => {
      setName('');
      setIssuer('');
      setUrl('');
      setObtained('');
      toast.success(t('account.skills.added'));
    },
  );
  const del = useApiMutation((id: string) => accountApi.deleteSkill(id), [accountKeys.skills]);
  return (
    <AccountShell title={t('account.skills.title')} subtitle={t('account.skills.subtitle')}>
      <Notice tone="info" title={t('account.skills.noticeTitle')}>
        {t('account.skills.notice')}
      </Notice>
      <QueryState query={skills}>
        {(d) =>
          d.items.length === 0 ? (
            <EmptyState
              title={t('account.skills.empty')}
              description={t('account.skills.emptyHint')}
            />
          ) : (
            <ul className="stack" style={{ padding: 0 }} aria-label={t('account.skills.listLabel')}>
              {d.items.map((s) => (
                <SkillItem
                  key={s.id ?? `mcq-${s.name}`}
                  s={s}
                  deleting={del.isPending && del.variables === s.id}
                  onDelete={
                    s.id && s.evidenceType !== 'mcq_assessed' ? () => del.mutate(s.id!) : undefined
                  }
                />
              ))}
            </ul>
          )
        }
      </QueryState>
      {del.isError ? <Notice tone="danger">{accountError(del.error, t)}</Notice> : null}
      <form
        className="card stack"
        style={{ marginBlockStart: 'var(--space-5)' }}
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (!invalid) add.mutate(undefined);
        }}
      >
        <h2 className="section__title">{t('account.skills.addTitle')}</h2>
        <Field label={t('account.skills.name')} required>
          <Input value={name} maxLength={60} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field label={t('account.skills.evidenceType')} hint={evidenceLabel(type, t)}>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value as typeof type)}
            options={[
              { value: 'self_declared', label: t('account.skills.type.self_declared') },
              { value: 'external_credential', label: t('account.skills.type.external_credential') },
            ]}
          />
        </Field>
        {external ? (
          <>
            <Field label={t('account.skills.issuer')} required>
              <Input value={issuer} onChange={(e) => setIssuer(e.target.value)} />
            </Field>
            <Field label={t('account.skills.credentialUrl')} error={urlError}>
              <Input
                type="url"
                dir="ltr"
                placeholder="https://"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Field>
          </>
        ) : null}
        <Field label={t('account.skills.obtainedAt')}>
          <Input type="date" value={obtained} onChange={(e) => setObtained(e.target.value)} />
        </Field>
        {add.isError ? <Notice tone="danger">{accountError(add.error, t)}</Notice> : null}
        <div>
          <Button type="submit" loading={add.isPending} disabled={invalid}>
            {t('account.skills.add')}
          </Button>
        </div>
      </form>
    </AccountShell>
  );
}

/** Data rights: export (JSON download) and irreversible account deletion. */
export function PrivacyPage() {
  const { t } = useI18n();
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const toast = useToast();
  usePageMeta(t('account.privacy.title'), undefined, { noindex: true });
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<unknown>(null);
  const [confirm, setConfirm] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const mfa = useQuery({ queryKey: accountKeys.mfaStatus, queryFn: () => accountApi.mfaStatus() });
  const mfaEnabled = mfa.data?.enabled ?? !!user?.mfaEnabled;
  const doExport = async () => {
    setExporting(true);
    setExportError(null);
    try {
      const d = new Date();
      const stamp = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`;
      await downloadFile('/api/me/export', `mastemy-export-${stamp}.json`);
    } catch (e) {
      setExportError(e);
    } finally {
      setExporting(false);
    }
  };
  const ready = confirm === 'DELETE' && !!password && (!mfaEnabled || cleanCode(code).length === 6);
  const del = useApiMutation(
    () =>
      accountApi.deleteAccount({
        password,
        confirm,
        ...(mfaEnabled ? { mfaCode: cleanCode(code) } : {}),
      }),
    [],
    () => {
      // The account is anonymized and every session revoked: leave the private page first (so the route
      // guard does not bounce to the login page), then drop the local session too.
      // Router navigations run as transitions, so the session is cleared in a transition as well and both
      // commit together.
      navigate('/', { replace: true });
      toast.success(t('account.privacy.deletedToast'));
      startTransition(() => {
        setSession(null);
        qc.clear();
      });
    },
  );
  const lastSuper = del.error instanceof ApiError && del.error.is('last_superadmin');
  return (
    <AccountShell title={t('account.privacy.title')} subtitle={t('account.privacy.subtitle')}>
      <section className="card stack" style={{ marginBlockEnd: 'var(--space-5)' }}>
        <h2 className="section__title">{t('account.privacy.exportTitle')}</h2>
        <p>{t('account.privacy.exportBody')}</p>
        {exportError ? <Notice tone="danger">{accountError(exportError, t)}</Notice> : null}
        <div>
          <Button loading={exporting} onClick={() => void doExport()}>
            {t('account.privacy.exportButton')}
          </Button>
        </div>
      </section>
      <section className="card stack" aria-labelledby="delete-account-title">
        <h2 className="section__title" id="delete-account-title">
          {t('account.privacy.deleteTitle')}
        </h2>
        <Notice tone="danger" title={t('account.privacy.deleteWarningTitle')}>
          <p style={{ marginBlockStart: 0 }}>{t('account.privacy.deleteWarning')}</p>
          <ul>
            <li>{t('account.privacy.deleted1')}</li>
            <li>{t('account.privacy.deleted2')}</li>
            <li>{t('account.privacy.retained')}</li>
            <li>{t('account.privacy.retained2')}</li>
          </ul>
        </Notice>
        <form
          className="stack"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            if (ready) del.mutate(undefined);
          }}
        >
          <Field label={t('account.privacy.typeDelete')} required>
            <Input
              autoComplete="off"
              dir="ltr"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </Field>
          <Field label={t('account.password.current')} required>
            <Input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          {mfaEnabled ? (
            <Field label={t('account.mfa.codeLabel')} required>
              <Input
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={7}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/[^0-9 ]/g, ''))}
              />
            </Field>
          ) : null}
          {del.isError ? (
            <Notice tone="danger">
              {lastSuper ? t('account.error.last_superadmin') : accountError(del.error, t)}
            </Notice>
          ) : null}
          <div>
            <Button type="submit" variant="danger" loading={del.isPending} disabled={!ready}>
              {t('account.privacy.deleteButton')}
            </Button>
          </div>
        </form>
      </section>
    </AccountShell>
  );
}
