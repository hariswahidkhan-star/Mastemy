import { NavLink, Outlet } from 'react-router';
import { useI18n } from '../../i18n/I18nProvider';

export function StudioLayout() {
  const { t } = useI18n();
  return (
    <div className="container side-layout">
      <nav aria-label={t('studio.nav')}>
        <ul className="side-nav">
          <li>
            <NavLink to="/studio" end>
              {t('studio.courses')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/studio/new">{t('studio.newCourse')}</NavLink>
          </li>
          <li>
            <NavLink to="/studio/earnings">{t('studio.earnings')}</NavLink>
          </li>
          <li>
            <NavLink to="/studio/commerce">{t('commerce.nav.studioPricing')}</NavLink>
          </li>
          <li>
            <NavLink to="/studio/payouts">{t('commerce.nav.payouts')}</NavLink>
          </li>
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
