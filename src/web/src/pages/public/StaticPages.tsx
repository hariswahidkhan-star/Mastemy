import { Link } from 'react-router';
import { EmptyState } from '../../components/ui/EmptyState';
import { Notice, PageHeader } from '../../components/ui/misc';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';

const HELP_TOPICS = [
  'free',
  'packages',
  'notes',
  'mcq',
  'exam',
  'cert',
  'progress',
  'refund',
  'unavailable',
  'access',
];

export function HelpPage() {
  const { t } = useI18n();
  usePageMeta(t('help.title'), t('help.subtitle'));
  return (
    <div className="container page" style={{ maxInlineSize: 860 }}>
      <PageHeader title={t('help.title')} subtitle={t('help.subtitle')} />
      <div className="curriculum">
        {HELP_TOPICS.map((k) => (
          <details key={k}>
            <summary>{t(`help.q.${k}`)}</summary>
            <div style={{ padding: '0 var(--space-4) var(--space-4)' }}>
              <p style={{ margin: 0 }}>{t(`help.a.${k}`)}</p>
            </div>
          </details>
        ))}
      </div>
      <p style={{ marginBlockStart: 'var(--space-5)' }}>
        {t('help.more')} <Link to="/contact">{t('nav.contact')}</Link>
      </p>
    </div>
  );
}

const ABOUT_SECTIONS = ['mission', 'model', 'quality', 'certs', 'privacy'];

export function AboutPage() {
  const { t } = useI18n();
  usePageMeta(t('about.title'), t('about.subtitle'));
  return (
    <div className="container page" style={{ maxInlineSize: 860 }}>
      <PageHeader title={t('about.title')} subtitle={t('about.subtitle')} />
      <div className="stack">
        {ABOUT_SECTIONS.map((k) => (
          <section key={k}>
            <h2 className="section__title">{t(`about.${k}.title`)}</h2>
            <p>{t(`about.${k}.body`)}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

export function ContactPage() {
  const { t } = useI18n();
  usePageMeta(t('contact.title'), t('contact.subtitle'));
  const email: string = import.meta.env.VITE_SUPPORT_EMAIL ?? '';
  return (
    <div className="container page" style={{ maxInlineSize: 860 }}>
      <PageHeader title={t('contact.title')} subtitle={t('contact.subtitle')} />
      {email ? (
        <div className="card">
          <h2>{t('contact.emailTitle')}</h2>
          <p>
            <a href={`mailto:${email}`}>{email}</a>
          </p>
          <p className="small muted">{t('contact.emailHint')}</p>
        </div>
      ) : (
        <Notice tone="info" title={t('contact.noEmailTitle')}>
          {t('contact.noEmailBody')}
        </Notice>
      )}
      <div className="grid-2" style={{ marginBlockStart: 'var(--space-5)' }}>
        <div className="card card--flat">
          <h2>{t('contact.learners.title')}</h2>
          <p className="small">{t('contact.learners.body')}</p>
          <Link to="/help">{t('nav.help')}</Link>
        </div>
        <div className="card card--flat">
          <h2>{t('contact.instructors.title')}</h2>
          <p className="small">{t('contact.instructors.body')}</p>
          <Link to="/teach">{t('nav.teach')}</Link>
        </div>
        <div className="card card--flat">
          <h2>{t('contact.employers.title')}</h2>
          <p className="small">{t('contact.employers.body')}</p>
          <Link to="/verify">{t('nav.verify')}</Link>
        </div>
        <div className="card card--flat">
          <h2>{t('contact.rights.title')}</h2>
          <p className="small">{t('contact.rights.body')}</p>
        </div>
      </div>
    </div>
  );
}

export function NotFoundPage() {
  const { t } = useI18n();
  usePageMeta(t('notFound.title'), undefined, { noindex: true });
  return (
    <div className="container page">
      <EmptyState
        title={t('notFound.title')}
        description={t('notFound.body')}
        action={{ label: t('nav.home'), to: '/' }}
      />
    </div>
  );
}
