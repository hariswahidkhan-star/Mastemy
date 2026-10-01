import { useState } from 'react';
import { useCourses } from '../../api/hooks';
import { CourseCard } from '../../components/CourseCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { PageHeader, Pagination, QueryState } from '../../components/ui/misc';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import { FreeVideoNotice } from './CourseDetailPage';

/** Every published course's video lessons are free on YouTube, so this lists published courses with a direct watch entry. */
export function FreeLessonsPage() {
  const { t } = useI18n();
  const [page, setPage] = useState(1);
  const courses = useCourses({ sort: 'updated', page });
  usePageMeta(t('free.title'), t('free.subtitle'));
  return (
    <div className="container page">
      <PageHeader title={t('free.title')} subtitle={t('free.subtitle')} />
      <FreeVideoNotice />
      <QueryState query={courses}>
        {(data) =>
          data.items.length === 0 ? (
            <EmptyState title={t('free.empty')} description={t('free.emptyBody')} />
          ) : (
            <>
              <div className="grid">
                {data.items.map((c) => (
                  <CourseCard key={c.id} course={c} />
                ))}
              </div>
              <Pagination
                page={data.page}
                pageSize={data.pageSize}
                total={data.total}
                onPage={setPage}
              />
            </>
          )
        }
      </QueryState>
    </div>
  );
}
