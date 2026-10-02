import type { CoverageReportDto } from '../../api/discover';
import { useI18n } from '../../i18n/I18nProvider';
import { Badge } from '../ui/misc';

/** Per-objective coverage (mapped lessons and Active questions) of a certification by one or all linked courses. */
export function CoverageTable({
  report,
  fmt,
}: {
  report: CoverageReportDto;
  fmt: (n: number) => string;
}) {
  const { t } = useI18n();
  if (report.objectiveCount === 0)
    return <p className="small muted">{t('discover.cert.noBlueprint')}</p>;
  return (
    <>
      <p className="small">
        {t('discover.coverage.summary', {
          covered: fmt(report.coveredWeightPercent),
          gaps: report.gapCount,
          n: report.objectiveCount,
        })}
      </p>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">{t('discover.cert.objCode')}</th>
              <th scope="col">{t('discover.cert.objTitle')}</th>
              <th scope="col">{t('discover.cert.objWeight')}</th>
              <th scope="col">{t('discover.coverage.lessons')}</th>
              <th scope="col">{t('discover.coverage.questions')}</th>
              <th scope="col">{t('discover.coverage.status')}</th>
            </tr>
          </thead>
          <tbody>
            {report.objectives.map((o) => (
              <tr key={o.objectiveId}>
                <td className="mono">{o.code}</td>
                <td>{o.title}</td>
                <td>{fmt(o.weightPercent)}%</td>
                <td>{o.lessonCount}</td>
                <td>{o.activeQuestionCount}</td>
                <td>
                  {o.gap ? (
                    <Badge tone="warning">
                      {o.gaps.map((g) => t(`discover.coverage.gap.${g}`)).join(', ')}
                    </Badge>
                  ) : (
                    <Badge tone="success">{t('discover.coverage.covered')}</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
