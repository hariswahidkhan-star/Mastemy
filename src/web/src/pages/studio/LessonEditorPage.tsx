import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { api } from '../../api/client';
import { keys, useApiMutation, useStudioCourse } from '../../api/hooks';
import type { StudioCourseDto, StudioLessonDto } from '../../api/types';
import { Markdown } from '../../components/Markdown';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { errorMessage } from '../../components/ui/ErrorState';
import { Checkbox, Field, Input, Textarea } from '../../components/ui/Field';
import { Notice, PageHeader, QueryState } from '../../components/ui/misc';
import { Tabs } from '../../components/ui/Tabs';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import { UploadPanel, VideoLinkForm, VideoStatusCard } from './VideoPanels';

function MarkdownEditor({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  const { t } = useI18n();
  const [mode, setMode] = useState('write');
  return (
    <div className="field">
      <span className="field__label">{label}</span>
      {hint ? <p className="field__hint">{hint}</p> : null}
      <Tabs
        label={label}
        value={mode}
        onChange={setMode}
        tabs={[
          {
            id: 'write',
            label: t('editor.write'),
            content: (
              <Textarea
                className="mono"
                rows={14}
                aria-label={label}
                value={value}
                onChange={(e) => onChange(e.target.value)}
              />
            ),
          },
          {
            id: 'preview',
            label: t('editor.preview'),
            content: value.trim() ? (
              <Markdown source={value} />
            ) : (
              <p className="muted">{t('editor.nothing')}</p>
            ),
          },
        ]}
      />
    </div>
  );
}

function LessonForm({ course, lesson }: { course: StudioCourseDto; lesson: StudioLessonDto }) {
  const { t } = useI18n();
  const toast = useToast();
  const [title, setTitle] = useState(lesson.title);
  const [objective, setObjective] = useState(lesson.objective);
  const [isPreview, setIsPreview] = useState(!!lesson.isPreview);
  const [notes, setNotes] = useState(lesson.notesMarkdown ?? '');
  const [premium, setPremium] = useState(lesson.premiumNotesMarkdown ?? '');
  const courseKey = keys.studioCourse(course.id);
  const saveLesson = useApiMutation(
    () =>
      api(`/api/studio/lessons/${lesson.id}`, {
        method: 'PUT',
        body: { title: title.trim(), objective: objective.trim(), isPreview },
      }),
    [courseKey],
    () => toast.success(t('common.saved')),
  );
  const saveNotes = useApiMutation(
    () =>
      api(`/api/studio/lessons/${lesson.id}/notes`, {
        method: 'PUT',
        body: { notesMarkdown: notes, premiumNotesMarkdown: premium },
      }),
    [courseKey],
    () => toast.success(t('editor.notesSaved')),
  );
  const [tab, setTab] = useState('details');
  return (
    <Tabs
      label={t('editor.tabs')}
      value={tab}
      onChange={setTab}
      tabs={[
        {
          id: 'details',
          label: t('editor.details'),
          content: (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (title.trim()) saveLesson.mutate(undefined);
              }}
            >
              <Field
                label={t('curriculum.lessonTitle')}
                required
                error={title.trim() ? undefined : t('validation.required')}
              >
                <Input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} />
              </Field>
              <Field label={t('learn.objective')} hint={t('editor.objectiveHint')}>
                <Textarea
                  rows={3}
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                />
              </Field>
              <Checkbox
                label={t('editor.isPreview')}
                hint={t('editor.isPreviewHint')}
                checked={isPreview}
                onChange={(e) => setIsPreview(e.target.checked)}
              />
              {saveLesson.isError ? (
                <Notice tone="danger">{errorMessage(saveLesson.error, t)}</Notice>
              ) : null}
              <Button type="submit" loading={saveLesson.isPending}>
                {t('common.save')}
              </Button>
            </form>
          ),
        },
        {
          id: 'notes',
          label: t('editor.notes'),
          content: (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveNotes.mutate(undefined);
              }}
            >
              <MarkdownEditor
                label={t('learn.studyNotes')}
                hint={t('editor.notesHint')}
                value={notes}
                onChange={setNotes}
              />
              <MarkdownEditor
                label={t('learn.premiumNotes')}
                hint={t('editor.premiumHint')}
                value={premium}
                onChange={setPremium}
              />
              {saveNotes.isError ? (
                <Notice tone="danger">{errorMessage(saveNotes.error, t)}</Notice>
              ) : null}
              <Button type="submit" loading={saveNotes.isPending}>
                {t('editor.saveNotes')}
              </Button>
            </form>
          ),
        },
        {
          id: 'video',
          label: t('editor.video'),
          content: (
            <div className="stack">
              {lesson.video ? (
                <VideoStatusCard video={lesson.video} courseId={course.id} />
              ) : (
                <Notice tone="warning">{t('editor.noVideo')}</Notice>
              )}
              <VideoLinkForm lesson={lesson} courseId={course.id} />
            </div>
          ),
        },
        {
          id: 'upload',
          label: t('editor.upload'),
          content: <UploadPanel lesson={lesson} courseId={course.id} />,
        },
      ]}
    />
  );
}

export function LessonEditorPage() {
  const { id = '', lessonId = '' } = useParams();
  const { t } = useI18n();
  const course = useStudioCourse(id);
  const lesson = course.data?.modules.flatMap((m) => m.lessons).find((l) => l.id === lessonId);
  usePageMeta(lesson?.title ?? t('editor.lesson'), undefined, { noindex: true });
  return (
    <QueryState query={course}>
      {(c) =>
        !lesson ? (
          <EmptyState
            title={t('editor.notFound')}
            action={{ label: c.title, to: `/studio/courses/${c.id}?tab=curriculum` }}
          />
        ) : (
          <>
            <nav className="small muted" aria-label={t('common.breadcrumb')}>
              <Link to="/studio">{t('studio.courses')}</Link> /{' '}
              <Link to={`/studio/courses/${c.id}?tab=curriculum`}>{c.title}</Link> / {lesson.title}
            </nav>
            <PageHeader title={lesson.title} />
            <LessonForm key={lesson.id} course={c} lesson={lesson} />
          </>
        )
      }
    </QueryState>
  );
}
