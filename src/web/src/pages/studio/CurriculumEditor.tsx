import { useState } from 'react';
import type { DragEvent } from 'react';
import { Link } from 'react-router';
import { api } from '../../api/client';
import { keys, useApiMutation } from '../../api/hooks';
import type { StudioCourseDto, StudioLessonDto, StudioModuleDto } from '../../api/types';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog, Dialog } from '../../components/ui/Dialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { errorMessage } from '../../components/ui/ErrorState';
import { Field, Input } from '../../components/ui/Field';
import { Notice, StatusBadge } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { PlaylistImport } from './PlaylistImport';
import { DuplicateLessonButton, ModuleTools } from '../workspace/Authoring';

export function moveItem<T>(list: T[], from: number, to: number): T[] {
  if (from === to || from < 0 || to < 0 || from >= list.length || to >= list.length) return list;
  const copy = [...list];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

type DragRef =
  { kind: 'module'; id: string } | { kind: 'lesson'; id: string; moduleId: string } | null;

export function CurriculumEditor({ course }: { course: StudioCourseDto }) {
  const { t } = useI18n();
  const toast = useToast();
  const courseKey = keys.studioCourse(course.id);
  const modules = course.modules;
  const [drag, setDrag] = useState<DragRef>(null);
  const [over, setOver] = useState<string | null>(null);
  const [newModule, setNewModule] = useState('');
  const [rename, setRename] = useState<{
    kind: 'module' | 'lesson';
    id: string;
    title: string;
    objective?: string;
  } | null>(null);
  const [addLessonTo, setAddLessonTo] = useState<StudioModuleDto | null>(null);
  const [lessonDraft, setLessonDraft] = useState({ title: '', objective: '' });
  const [toDelete, setToDelete] = useState<{
    kind: 'module' | 'lesson';
    id: string;
    title: string;
  } | null>(null);

  const onError = (e: unknown) => toast.error(errorMessage(e, t));

  const addModule = useApiMutation(
    (title: string) =>
      api(`/api/studio/courses/${course.id}/modules`, { method: 'POST', body: { title } }),
    [courseKey],
    () => setNewModule(''),
  );
  const reorderModules = useApiMutation(
    (ids: string[]) =>
      api(`/api/studio/courses/${course.id}/modules/reorder`, { method: 'POST', body: { ids } }),
    [courseKey],
  );
  const reorderLessons = useApiMutation(
    ({ moduleId, ids }: { moduleId: string; ids: string[] }) =>
      api(`/api/studio/modules/${moduleId}/lessons/reorder`, { method: 'POST', body: { ids } }),
    [courseKey],
  );
  const addLesson = useApiMutation(
    ({ moduleId, title, objective }: { moduleId: string; title: string; objective: string }) =>
      api(`/api/studio/modules/${moduleId}/lessons`, {
        method: 'POST',
        body: { title, objective },
      }),
    [courseKey],
    () => {
      setAddLessonTo(null);
      setLessonDraft({ title: '', objective: '' });
    },
  );
  const saveRename = useApiMutation(
    (r: NonNullable<typeof rename>) =>
      r.kind === 'module'
        ? api(`/api/studio/modules/${r.id}`, { method: 'PUT', body: { title: r.title } })
        : api(`/api/studio/lessons/${r.id}`, {
            method: 'PUT',
            body: { title: r.title, objective: r.objective ?? '' },
          }),
    [courseKey],
    () => setRename(null),
  );
  const remove = useApiMutation(
    (d: NonNullable<typeof toDelete>) =>
      api(d.kind === 'module' ? `/api/studio/modules/${d.id}` : `/api/studio/lessons/${d.id}`, {
        method: 'DELETE',
      }),
    [courseKey],
    () => setToDelete(null),
  );

  const moveModule = (from: number, to: number) => {
    const next = moveItem(modules, from, to);
    if (next !== modules)
      reorderModules.mutate(
        next.map((m) => m.id),
        { onError },
      );
  };
  const moveLesson = (m: StudioModuleDto, from: number, to: number) => {
    const next = moveItem(m.lessons, from, to);
    if (next !== m.lessons)
      reorderLessons.mutate({ moduleId: m.id, ids: next.map((l) => l.id) }, { onError });
  };

  // ---- native drag and drop (keyboard users use the up/down buttons) ----
  const dragProps = (ref: NonNullable<DragRef>, overId: string, onDrop: () => void) => ({
    draggable: true,
    onDragStart: (e: DragEvent) => {
      e.stopPropagation();
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', ref.id);
      setDrag(ref);
    },
    onDragEnd: () => {
      setDrag(null);
      setOver(null);
    },
    onDragOver: (e: DragEvent) => {
      if (!drag || drag.kind !== ref.kind) return;
      if (drag.kind === 'lesson' && ref.kind === 'lesson' && drag.moduleId !== ref.moduleId) return;
      e.preventDefault();
      e.stopPropagation();
      setOver(overId);
    },
    onDrop: (e: DragEvent) => {
      if (!drag || drag.kind !== ref.kind) return;
      e.preventDefault();
      e.stopPropagation();
      onDrop();
      setDrag(null);
      setOver(null);
    },
    'data-dragging': drag?.id === ref.id,
    'data-over': over === overId && drag?.id !== ref.id,
  });

  const busy = reorderModules.isPending || reorderLessons.isPending;

  return (
    <div className="stack">
      <p className="small muted">{t('curriculum.help')}</p>
      {busy ? (
        <p className="small" role="status">
          {t('curriculum.saving')}
        </p>
      ) : null}
      {modules.length === 0 ? (
        <EmptyState title={t('curriculum.empty')} description={t('curriculum.emptyBody')} />
      ) : null}
      {modules.map((m, mi) => (
        <section
          key={m.id}
          className="module-block"
          aria-label={m.title}
          {...dragProps({ kind: 'module', id: m.id }, `m-${m.id}`, () => {
            if (drag?.kind === 'module')
              moveModule(
                modules.findIndex((x) => x.id === drag.id),
                mi,
              );
          })}
        >
          <div className="row row--between">
            <div className="row">
              <span className="drag-handle" aria-hidden="true" title={t('curriculum.dragHint')}>
                ⠿
              </span>
              <h3 style={{ margin: 0 }}>
                {mi + 1}. {m.title}
              </h3>
            </div>
            <div className="row">
              <Button
                size="sm"
                variant="ghost"
                disabled={mi === 0 || busy}
                onClick={() => moveModule(mi, mi - 1)}
                aria-label={t('curriculum.moveUp', { title: m.title })}
              >
                ↑
              </Button>
              <Button
                size="sm"
                variant="ghost"
                disabled={mi === modules.length - 1 || busy}
                onClick={() => moveModule(mi, mi + 1)}
                aria-label={t('curriculum.moveDown', { title: m.title })}
              >
                ↓
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setRename({ kind: 'module', id: m.id, title: m.title })}
              >
                {t('curriculum.rename')}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setToDelete({ kind: 'module', id: m.id, title: m.title })}
              >
                {t('common.delete')}
              </Button>
            </div>
          </div>
          {m.lessons.length === 0 ? (
            <p className="small muted">{t('curriculum.noLessons')}</p>
          ) : null}
          {m.lessons.map((l: StudioLessonDto, li) => (
            <div
              key={l.id}
              className="lesson-row"
              {...dragProps({ kind: 'lesson', id: l.id, moduleId: m.id }, `l-${l.id}`, () => {
                if (drag?.kind === 'lesson')
                  moveLesson(
                    m,
                    m.lessons.findIndex((x) => x.id === drag.id),
                    li,
                  );
              })}
            >
              <span className="drag-handle" aria-hidden="true">
                ⠿
              </span>
              <span className="lesson-row__title">
                <Link to={`/studio/courses/${course.id}/lessons/${l.id}`}>{l.title}</Link>{' '}
                {l.video ? (
                  <StatusBadge status={l.video.status} />
                ) : (
                  <span className="small muted">{t('curriculum.noVideo')}</span>
                )}
              </span>
              <Button
                size="sm"
                variant="ghost"
                disabled={li === 0 || busy}
                onClick={() => moveLesson(m, li, li - 1)}
                aria-label={t('curriculum.moveUp', { title: l.title })}
              >
                ↑
              </Button>
              <Button
                size="sm"
                variant="ghost"
                disabled={li === m.lessons.length - 1 || busy}
                onClick={() => moveLesson(m, li, li + 1)}
                aria-label={t('curriculum.moveDown', { title: l.title })}
              >
                ↓
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() =>
                  setRename({ kind: 'lesson', id: l.id, title: l.title, objective: l.objective })
                }
              >
                {t('curriculum.rename')}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setToDelete({ kind: 'lesson', id: l.id, title: l.title })}
              >
                {t('common.delete')}
              </Button>
              <DuplicateLessonButton lesson={l} courseId={course.id} />
            </div>
          ))}
          <Button
            size="sm"
            variant="secondary"
            style={{ marginBlockStart: 'var(--space-3)' }}
            onClick={() => setAddLessonTo(m)}
          >
            {t('curriculum.addLesson')}
          </Button>{' '}
          <ModuleTools module={m} courseId={course.id} />
        </section>
      ))}
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          if (newModule.trim()) addModule.mutate(newModule.trim(), { onError });
        }}
      >
        <Field label={t('curriculum.newModule')}>
          <Input value={newModule} onChange={(e) => setNewModule(e.target.value)} maxLength={200} />
        </Field>
        <Button type="submit" loading={addModule.isPending} disabled={!newModule.trim()}>
          {t('curriculum.addModule')}
        </Button>
      </form>

      <PlaylistImport courseId={course.id} />

      <Dialog
        open={!!addLessonTo}
        title={t('curriculum.addLessonTo', { module: addLessonTo?.title ?? '' })}
        onClose={() => setAddLessonTo(null)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setAddLessonTo(null)}>
              {t('common.cancel')}
            </Button>
            <Button
              loading={addLesson.isPending}
              disabled={!lessonDraft.title.trim()}
              onClick={() =>
                addLessonTo &&
                addLesson.mutate({
                  moduleId: addLessonTo.id,
                  title: lessonDraft.title.trim(),
                  objective: lessonDraft.objective.trim(),
                })
              }
            >
              {t('curriculum.addLesson')}
            </Button>
          </>
        }
      >
        <Field label={t('curriculum.lessonTitle')} required>
          <Input
            value={lessonDraft.title}
            onChange={(e) => setLessonDraft({ ...lessonDraft, title: e.target.value })}
          />
        </Field>
        <Field label={t('learn.objective')}>
          <Input
            value={lessonDraft.objective}
            onChange={(e) => setLessonDraft({ ...lessonDraft, objective: e.target.value })}
          />
        </Field>
        {addLesson.isError ? (
          <Notice tone="danger">{errorMessage(addLesson.error, t)}</Notice>
        ) : null}
      </Dialog>

      <Dialog
        open={!!rename}
        title={t('curriculum.rename')}
        onClose={() => setRename(null)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setRename(null)}>
              {t('common.cancel')}
            </Button>
            <Button
              loading={saveRename.isPending}
              disabled={!rename?.title.trim()}
              onClick={() => rename && saveRename.mutate(rename)}
            >
              {t('common.save')}
            </Button>
          </>
        }
      >
        {rename ? (
          <>
            <Field label={t('curriculum.titleLabel')} required>
              <Input
                value={rename.title}
                onChange={(e) => setRename({ ...rename, title: e.target.value })}
              />
            </Field>
            {rename.kind === 'lesson' ? (
              <Field label={t('learn.objective')}>
                <Input
                  value={rename.objective ?? ''}
                  onChange={(e) => setRename({ ...rename, objective: e.target.value })}
                />
              </Field>
            ) : null}
          </>
        ) : null}
        {saveRename.isError ? (
          <Notice tone="danger">{errorMessage(saveRename.error, t)}</Notice>
        ) : null}
      </Dialog>

      <ConfirmDialog
        open={!!toDelete}
        danger
        title={t('curriculum.deleteTitle', { title: toDelete?.title ?? '' })}
        body={
          <>
            <p>
              {toDelete?.kind === 'module'
                ? t('curriculum.deleteModuleBody')
                : t('curriculum.deleteLessonBody')}
            </p>
            {remove.isError ? <Notice tone="danger">{errorMessage(remove.error, t)}</Notice> : null}
          </>
        }
        confirmLabel={t('common.delete')}
        loading={remove.isPending}
        onCancel={() => setToDelete(null)}
        onConfirm={() => toDelete && remove.mutate(toDelete)}
      />
    </div>
  );
}
