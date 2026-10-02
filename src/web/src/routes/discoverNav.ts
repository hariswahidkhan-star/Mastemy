import type { Role } from '../api/types';

/** Admin navigation entries for the discovery area (label keys are full i18n keys). */
export const DISCOVER_ADMIN_SECTIONS: { to: string; key: string; label: string; roles: Role[] }[] =
  [
    {
      to: '/admin/certifications',
      key: 'certifications',
      label: 'discover.admin.nav.certifications',
      roles: ['Reviewer', 'Admin', 'SuperAdmin'],
    },
    {
      to: '/admin/skills',
      key: 'skills',
      label: 'discover.admin.nav.skills',
      roles: ['Admin', 'SuperAdmin'],
    },
    {
      to: '/admin/pathways',
      key: 'pathways',
      label: 'discover.admin.nav.pathways',
      roles: ['Admin', 'SuperAdmin'],
    },
    {
      to: '/admin/collections',
      key: 'collections',
      label: 'discover.admin.nav.collections',
      roles: ['Admin', 'SuperAdmin'],
    },
    {
      to: '/admin/bestsellers',
      key: 'bestsellers',
      label: 'discover.admin.nav.bestsellers',
      roles: ['Admin', 'SuperAdmin'],
    },
    {
      to: '/admin/course-ideas',
      key: 'ideas',
      label: 'discover.admin.nav.ideas',
      roles: ['Admin', 'SuperAdmin'],
    },
  ];
