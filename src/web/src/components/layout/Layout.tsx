import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import { useAuth, AUTHOR_ROLES, STAFF_ROLES } from '../../auth/AuthProvider';
import { useI18n } from '../../i18n/I18nProvider';
import { useTheme } from '../../theme/ThemeProvider';
import { Button } from '../ui/Button';
import { CompareTray } from '../Discovery';
import { NotificationBell } from '../NotificationBell';
import { MegaMenu } from '../discover/MegaMenu';
import { EmailVerificationBanner } from '../../pages/account/EmailPages';
import { ConsentBanner, ConsentSettingsButton } from '../../pages/workspace/Consent';
import { AttributionCapture } from '../../pages/commerce/shared';

function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Mastemy home">
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <rect width="32" height="32" rx="8" className="logo__bg" />
        <path
          d="M8 23V9l8 8 8-8v14"
          fill="none"
          className="logo__mark"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="logo__word">Mastemy</span>
    </Link>
  );
}

export function Layout() {
  const { t, lang, setLang } = useI18n();
  const { resolved, toggle } = useTheme();
  const { user, hasRole, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navItems: { to: string; label: string; show: boolean }[] = [
    { to: '/courses', label: t('nav.courses'), show: true },
    { to: '/free-lessons', label: t('nav.freeLessons'), show: true },
    { to: '/plans', label: t('commerce.nav.plans'), show: true },
    { to: '/verify', label: t('nav.verify'), show: true },
    { to: '/teach', label: t('nav.teach'), show: !hasRole(...AUTHOR_ROLES) },
    { to: '/me', label: t('nav.dashboard'), show: !!user },
    { to: '/me/profile', label: t('account.nav.account'), show: !!user },
    { to: '/practice', label: t('exams.nav.practice'), show: !!user },
    {
      to: '/staff/exams',
      label: t('exams.nav.staff'),
      show: hasRole('Reviewer', 'Admin', 'SuperAdmin'),
    },
    { to: '/studio', label: t('nav.studio'), show: hasRole(...AUTHOR_ROLES) },
    { to: '/admin', label: t('nav.admin'), show: hasRole(...STAFF_ROLES) },
  ];

  return (
    <div className="app">
      <a href="#main" className="skip-link">
        {t('nav.skip')}
      </a>
      <header className="site-header">
        <div className="container site-header__inner">
          <Logo />
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span aria-hidden="true">☰</span>
            <span className="visually-hidden">{t('nav.menu')}</span>
          </button>
          <nav
            id="primary-nav"
            className={menuOpen ? 'primary-nav primary-nav--open' : 'primary-nav'}
            aria-label={t('nav.primary')}
          >
            <MegaMenu />
            <ul>
              {navItems
                .filter((i) => i.show)
                .map((i) => (
                  <li key={i.to}>
                    <NavLink
                      to={i.to}
                      className={({ isActive }) =>
                        isActive ? 'nav-link nav-link--active' : 'nav-link'
                      }
                    >
                      {i.label}
                    </NavLink>
                  </li>
                ))}
            </ul>
            <div className="header-tools">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                aria-label={t('nav.switchLanguage')}
                lang={lang === 'en' ? 'ar' : 'en'}
              >
                {lang === 'en' ? 'العربية' : 'English'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggle}
                aria-label={resolved === 'dark' ? t('nav.lightMode') : t('nav.darkMode')}
                aria-pressed={resolved === 'dark'}
              >
                <span aria-hidden="true">{resolved === 'dark' ? '☀' : '☾'}</span>
              </Button>
              {user ? (
                <>
                  <NotificationBell />
                  <span className="header-user" title={user.email}>
                    {user.displayName}
                  </span>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      void logout().then(() => navigate('/'));
                    }}
                  >
                    {t('nav.logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Link className="btn btn--ghost btn--sm" to="/login">
                    {t('nav.login')}
                  </Link>
                  <Link className="btn btn--primary btn--sm" to="/register">
                    {t('nav.register')}
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
      <ConsentBanner />
      <main id="main" className="site-main" tabIndex={-1}>
        <EmailVerificationBanner />
        <AttributionCapture />
        <Outlet />
      </main>
      <CompareTray />
      <footer className="site-footer">
        <div className="container site-footer__inner">
          <div>
            <Logo />
            <p className="site-footer__tag">{t('footer.tagline')}</p>
          </div>
          <nav aria-label={t('footer.nav')}>
            <ul className="site-footer__links">
              <li>
                <Link to="/about">{t('nav.about')}</Link>
              </li>
              <li>
                <Link to="/help">{t('nav.help')}</Link>
              </li>
              <li>
                <Link to="/contact">{t('nav.contact')}</Link>
              </li>
              <li>
                <Link to="/teach">{t('nav.teach')}</Link>
              </li>
              <li>
                <Link to="/verify">{t('nav.verify')}</Link>
              </li>
              <li>
                <ConsentSettingsButton />
              </li>
            </ul>
          </nav>
          <p className="site-footer__legal">{t('footer.youtubeNotice')}</p>
        </div>
      </footer>
    </div>
  );
}
