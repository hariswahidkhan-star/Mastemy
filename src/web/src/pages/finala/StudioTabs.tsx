import type { StudioCourseDto } from '../../api/types';
import type { TabDef } from '../../components/ui/Tabs';
import type { TFunction } from '../../i18n/I18nProvider';
import { StudioMessagingPanel } from './Messaging';

/** Area "finala" tabs appended to the studio course editor. */
export function finalaCourseTabs(course: StudioCourseDto, t: TFunction): TabDef[] {
  return [
    {
      id: 'messaging',
      label: t('finala.studio.tab'),
      content: <StudioMessagingPanel course={course} />,
    },
  ];
}
