import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import type { OrgDto } from '../../api/wave2';
import type { TabDef } from '../../components/ui/Tabs';
import { Spinner } from '../../components/ui/Spinner';
import type { TFunction } from '../../i18n/I18nProvider';

const ent = () => import('./Enterprise');
const PathwayAssignmentsTab = lazy(() => ent().then((m) => ({ default: m.PathwayAssignmentsTab })));
const MaterialsTab = lazy(() => ent().then((m) => ({ default: m.MaterialsTab })));
const SeatsTab = lazy(() => ent().then((m) => ({ default: m.SeatsTab })));
const SsoTab = lazy(() => ent().then((m) => ({ default: m.SsoTab })));

function L({ children, label }: { children: ReactNode; label: string }) {
  return <Suspense fallback={<Spinner label={label} />}>{children}</Suspense>;
}

/** Enterprise phase 2 tabs on the organization page (Managers see pathways/materials; Admins also seats and SSO). */
export function finalbOrgTabs(org: OrgDto, isOrgAdmin: boolean, t: TFunction): TabDef[] {
  const tabs: TabDef[] = [
    {
      id: 'pathways',
      label: t('finalb.ent.tabs.pathways'),
      content: (
        <L label={t('common.loading')}>
          <PathwayAssignmentsTab org={org} canGrantPremium={isOrgAdmin} />
        </L>
      ),
    },
    {
      id: 'materials',
      label: t('finalb.ent.tabs.materials'),
      content: (
        <L label={t('common.loading')}>
          <MaterialsTab org={org} isAdmin={isOrgAdmin} />
        </L>
      ),
    },
  ];
  if (isOrgAdmin)
    tabs.push(
      {
        id: 'seats',
        label: t('finalb.ent.tabs.seats'),
        content: (
          <L label={t('common.loading')}>
            <SeatsTab org={org} />
          </L>
        ),
      },
      {
        id: 'sso',
        label: t('finalb.ent.tabs.sso'),
        content: (
          <L label={t('common.loading')}>
            <SsoTab org={org} />
          </L>
        ),
      },
    );
  return tabs;
}
