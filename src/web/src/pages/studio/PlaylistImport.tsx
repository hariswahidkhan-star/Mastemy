import { useState } from 'react';
import { api } from '../../api/client';
import { keys, useApiMutation, useChannels } from '../../api/hooks';
import type { PlaylistPreviewItem } from '../../api/types';
import { Duration } from '../../components/Duration';
import { Button } from '../../components/ui/Button';
import { errorMessage } from '../../components/ui/ErrorState';
import { Checkbox, Field, Input, Select } from '../../components/ui/Field';
import { Notice } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';

interface Row extends PlaylistPreviewItem {
  include: boolean;
}

/** Playlist import produces a reviewable draft; nothing is created until the author commits. */
export function PlaylistImport({ courseId }: { courseId: string }) {
  const { t } = useI18n();
  const toast = useToast();
  const channels = useChannels();
  const [url, setUrl] = useState('');
  const [channelId, setChannelId] = useState('');
  const [moduleTitle, setModuleTitle] = useState('');
  const [rows, setRows] = useState<Row[] | null>(null);

  const preview = useApiMutation(
    () =>
      api<PlaylistPreviewItem[] | { items: PlaylistPreviewItem[] }>(
        `/api/studio/courses/${courseId}/import-playlist`,
        {
          method: 'POST',
          body: { playlistUrl: url.trim(), channelId },
        },
      ),
    [],
    (res) => setRows((Array.isArray(res) ? res : res.items).map((r) => ({ ...r, include: true }))),
  );
  const commit = useApiMutation(
    () =>
      api(`/api/studio/courses/${courseId}/import-playlist/commit`, {
        method: 'POST',
        body: {
          moduleTitle: moduleTitle.trim(),
          items: (rows ?? [])
            .filter((r) => r.include)
            .map((r) => ({ videoId: r.videoId, title: r.title.trim() })),
        },
      }),
    [keys.studioCourse(courseId)],
    () => {
      setRows(null);
      setUrl('');
      setModuleTitle('');
      toast.success(t('playlist.committed'));
    },
  );

  const included = rows?.filter((r) => r.include) ?? [];
  const invalidTitles = included.some((r) => !r.title.trim());

  return (
    <section className="card card--flat" aria-labelledby="pl-h">
      <h2 id="pl-h">{t('playlist.title')}</h2>
      <p className="small muted">{t('playlist.help')}</p>
      <form
        className="split"
        onSubmit={(e) => {
          e.preventDefault();
          preview.mutate(undefined);
        }}
      >
        <Field label={t('playlist.url')} required>
          <Input type="url" value={url} onChange={(e) => setUrl(e.target.value)} />
        </Field>
        <Field label={t('video.channel')} required>
          <Select
            value={channelId}
            onChange={(e) => setChannelId(e.target.value)}
            placeholder={t('video.chooseChannel')}
            options={(channels.data ?? []).map((c) => ({ value: c.id, label: c.title }))}
          />
        </Field>
        <div>
          <Button
            type="submit"
            variant="secondary"
            loading={preview.isPending}
            disabled={!url.trim() || !channelId}
          >
            {t('playlist.preview')}
          </Button>
        </div>
      </form>
      {preview.isError ? <Notice tone="danger">{errorMessage(preview.error, t)}</Notice> : null}
      {rows ? (
        rows.length === 0 ? (
          <p className="muted">{t('playlist.empty')}</p>
        ) : (
          <>
            <div className="table-wrap" style={{ marginBlock: 'var(--space-4)' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">{t('playlist.include')}</th>
                    <th scope="col">{t('playlist.lessonTitle')}</th>
                    <th scope="col">{t('playlist.videoId')}</th>
                    <th scope="col">{t('course.duration')}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={r.videoId}>
                      <td>
                        <Checkbox
                          label={
                            <span className="visually-hidden">
                              {t('playlist.includeRow', { n: i + 1 })}
                            </span>
                          }
                          checked={r.include}
                          onChange={(e) =>
                            setRows(
                              rows.map((x, j) =>
                                j === i ? { ...x, include: e.target.checked } : x,
                              ),
                            )
                          }
                        />
                      </td>
                      <td>
                        <Input
                          aria-label={t('playlist.titleRow', { n: i + 1 })}
                          value={r.title}
                          onChange={(e) =>
                            setRows(
                              rows.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)),
                            )
                          }
                        />
                      </td>
                      <td className="mono">{r.videoId}</td>
                      <td>
                        <Duration seconds={r.durationSeconds} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Field label={t('playlist.moduleTitle')} required>
              <Input value={moduleTitle} onChange={(e) => setModuleTitle(e.target.value)} />
            </Field>
            {commit.isError ? <Notice tone="danger">{errorMessage(commit.error, t)}</Notice> : null}
            <div className="row">
              <Button
                onClick={() => commit.mutate(undefined)}
                loading={commit.isPending}
                disabled={included.length === 0 || invalidTitles || !moduleTitle.trim()}
              >
                {t('playlist.commit', { n: included.length })}
              </Button>
              <Button variant="ghost" onClick={() => setRows(null)}>
                {t('common.cancel')}
              </Button>
            </div>
          </>
        )
      ) : null}
    </section>
  );
}
