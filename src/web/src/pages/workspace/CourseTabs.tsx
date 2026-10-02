import type { StudioCourseDto } from '../../api/types';
import type { TabDef } from '../../components/ui/Tabs';
import type { TFunction } from '../../i18n/I18nProvider';
import { CourseAnalyticsPanel } from './Analytics';
import { ChecklistPanel, CopiesPanel, CourseHistoryPanel, PreviewPanel } from './Authoring';

/** Wave 3 tabs appended to the studio course editor. */
export function workspaceCourseTabs(course: StudioCourseDto, t: TFunction): TabDef[] {
  return [
    {
      id: 'checklist',
      label: t('workspace.tabs.checklist'),
      content: <ChecklistPanel course={course} />,
    },
    {
      id: 'preview',
      label: t('workspace.tabs.preview'),
      content: <PreviewPanel course={course} />,
    },
    {
      id: 'history',
      label: t('workspace.tabs.history'),
      content: <CourseHistoryPanel course={course} />,
    },
    {
      id: 'copies',
      label: t('workspace.tabs.copies'),
      content: <CopiesPanel course={course} />,
    },
    {
      id: 'analytics',
      label: t('workspace.tabs.analytics'),
      content: <CourseAnalyticsPanel course={course} />,
    },
  ];
}
