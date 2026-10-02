import { useState } from 'react';
import type { FormEvent } from 'react';
import { api, ApiError } from '../../api/client';
import { problemCode } from '../../api/commerce';
import {
  categoryTree,
  descendantIds,
  fbKeys,
  useAdminCategories,
  validateCategory,
} from '../../api/finalb';
import type { CategoryAdminDto, CategoryAdminInput } from '../../api/finalb';
import { useApiMutation } from '../../api/hooks';
import { Badge, Notice, PageHeader, QueryState } from '../../components/ui/misc';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog, Dialog } from '../../components/ui/Dialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { errorMessage } from '../../components/ui/ErrorState';
import { Checkbox, Field, Input, Select } from '../../components/ui/Field';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import type { TFunction } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';

const CODES = [
  'invalid_slug',
  'slug_taken',
  'invalid_name',
  'invalid_sort_order',
  'invalid_parent',
  'category_cycle',
  'category_too_deep',
  'category_has_courses',
  'category_has_children',
  'category_has_pathways',
];

export function categoryError(e: unknown, t: TFunction): string {
  const code = problemCode(e);
  if (CODES.includes(code)) return t(`finalb.categories.err.${code}`);
  return errorMessage(e, t);
}

const blank = (parentId: number | null): CategoryAdminInput => ({
  slug: '',
  nameEn: '',
  nameAr: '',
  parentId,
  isAcademy: false,
  sortOrder: 0,
});

function CategoryForm({
  list,
  editing,
  initial,
  onClose,
}: {
  list: CategoryAdminDto[];
  editing: CategoryAdminDto | null;
  initial: CategoryAdminInput;
  onClose: () => void;
}) {
  const { t, lang } = useI18n();
  const toast = useToast();
  const [f, setF] = useState<CategoryAdminInput>(initial);
  const [sortText, setSortText] = useState(String(initial.sortOrder));
  const [touched, setTouched] = useState(false);
  const input: CategoryAdminInput = {
    ...f,
    slug: f.slug.trim().toLowerCase(),
    sortOrder: sortText.trim() === '' ? NaN : Number(sortText),
  };
  const errors = validateCategory(input, list, editing?.id ?? null);
  const save = useApiMutation(
    () =>
      editing
        ? api<CategoryAdminDto>(`/api/admin/categories/${editing.id}`, {
            method: 'PUT',
            body: input,
          })
        : api<CategoryAdminDto>('/api/admin/categories', { method: 'POST', body: input }),
    [fbKeys.adminCategories, ['categories']],
    () => {
      toast.success(t('finalb.categories.saved'));
      onClose();
    },
  );
  const blocked = editing ? descendantIds(list, editing.id) : new Set<number>();
  const parentOptions = categoryTree(list)
    .filter((n) => !blocked.has(n.cat.id))
    .map((n) => ({
      value: String(n.cat.id),
      label: `${'— '.repeat(n.depth)}${lang === 'ar' ? n.cat.nameAr : n.cat.nameEn}`,
    }));
  const err = (k: keyof CategoryAdminInput) =>
    touched && errors[k] ? t(`finalb.categories.err.${errors[k]}`) : undefined;
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (Object.keys(errors).length === 0) save.mutate(undefined);
  };
  return (
    <Dialog
      open
      title={editing ? t('finalb.categories.edit') : t('finalb.categories.create')}
      onClose={onClose}
    >
      <form onSubmit={submit} className="stack" noValidate>
        <Field
          label={t('finalb.categories.slug')}
          hint={t('finalb.categories.slugHint')}
          error={err('slug')}
          required
        >
          <Input value={f.slug} onChange={(e) => setF({ ...f, slug: e.target.value })} />
        </Field>
        <Field label={t('finalb.categories.nameEn')} error={err('nameEn')} required>
          <Input
            value={f.nameEn}
            maxLength={100}
            onChange={(e) => setF({ ...f, nameEn: e.target.value })}
          />
        </Field>
        <Field label={t('finalb.categories.nameAr')} error={err('nameAr')} required>
          <Input
            value={f.nameAr}
            dir="rtl"
            lang="ar"
            maxLength={100}
            onChange={(e) => setF({ ...f, nameAr: e.target.value })}
          />
        </Field>
        <Field label={t('finalb.categories.parent')} error={err('parentId')}>
          <Select
            value={f.parentId === null ? '' : String(f.parentId)}
            placeholder={t('finalb.categories.noParent')}
            options={parentOptions}
            onChange={(e) =>
              setF({ ...f, parentId: e.target.value === '' ? null : Number(e.target.value) })
            }
          />
        </Field>
        <Field label={t('finalb.categories.sort')} error={err('sortOrder')}>
          <Input
            type="number"
            inputMode="numeric"
            value={sortText}
            onChange={(e) => setSortText(e.target.value)}
          />
        </Field>
        <Checkbox
          label={t('finalb.categories.academy')}
          hint={t('finalb.categories.academyHint')}
          checked={f.isAcademy}
          onChange={(e) => setF({ ...f, isAcademy: e.target.checked })}
        />
        {save.isError ? <Notice tone="danger">{categoryError(save.error, t)}</Notice> : null}
        <div className="row">
          <Button type="submit" loading={save.isPending}>
            {t('common.save')}
          </Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            {t('common.cancel')}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

/** `/admin/categories`: staff tree editor for the catalog categories. */
export function AdminCategoriesPage() {
  const { t, lang } = useI18n();
  usePageMeta(t('finalb.categories.title'), undefined, { noindex: true });
  const toast = useToast();
  const cats = useAdminCategories();
  const [form, setForm] = useState<{
    editing: CategoryAdminDto | null;
    initial: CategoryAdminInput;
  } | null>(null);
  const [deleting, setDeleting] = useState<CategoryAdminDto | null>(null);
  const del = useApiMutation(
    (c: CategoryAdminDto) => api(`/api/admin/categories/${c.id}`, { method: 'DELETE' }),
    [fbKeys.adminCategories, ['categories']],
    () => {
      toast.success(t('finalb.categories.deleted'));
      setDeleting(null);
    },
  );
  return (
    <div className="page">
      <PageHeader
        title={t('finalb.categories.title')}
        subtitle={t('finalb.categories.subtitle')}
        actions={
          <Button onClick={() => setForm({ editing: null, initial: blank(null) })}>
            {t('finalb.categories.create')}
          </Button>
        }
      />
      <QueryState query={cats}>
        {(list) =>
          list.length === 0 ? (
            <EmptyState title={t('finalb.categories.empty')} />
          ) : (
            <ul
              className="stack"
              style={{ listStyle: 'none', padding: 0 }}
              aria-label={t('finalb.categories.tree')}
            >
              {categoryTree(list).map(({ cat: c, depth }) => (
                <li
                  key={c.id}
                  className="card card--flat row row--between"
                  style={{ marginInlineStart: `calc(${depth} * var(--space-5, 1.5rem))` }}
                  data-category-slug={c.slug}
                >
                  <span>
                    <strong>{lang === 'ar' ? c.nameAr : c.nameEn}</strong>{' '}
                    <span className="small muted">
                      {lang === 'ar' ? c.nameEn : c.nameAr} · <span className="mono">{c.slug}</span>{' '}
                      · {t('finalb.categories.sortShort', { n: c.sortOrder })} ·{' '}
                      {t('finalb.categories.counts', {
                        courses: c.courseCount,
                        children: c.childCount,
                      })}
                    </span>{' '}
                    {c.isAcademy ? (
                      <Badge tone="accent">{t('finalb.categories.academyBadge')}</Badge>
                    ) : null}
                  </span>
                  <span className="row">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setForm({ editing: null, initial: blank(c.id) })}
                    >
                      {t('finalb.categories.addChild')}
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() =>
                        setForm({
                          editing: c,
                          initial: {
                            slug: c.slug,
                            nameEn: c.nameEn,
                            nameAr: c.nameAr,
                            parentId: c.parentId,
                            isAcademy: c.isAcademy,
                            sortOrder: c.sortOrder,
                          },
                        })
                      }
                    >
                      {t('common.edit')}
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => {
                        del.reset();
                        setDeleting(c);
                      }}
                    >
                      {t('common.delete')}
                    </Button>
                  </span>
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
      {form && cats.data ? (
        <CategoryForm
          list={cats.data}
          editing={form.editing}
          initial={form.initial}
          onClose={() => setForm(null)}
        />
      ) : null}
      <ConfirmDialog
        open={!!deleting}
        danger
        title={t('finalb.categories.deleteTitle', { name: deleting?.nameEn ?? '' })}
        body={
          <>
            <p>{t('finalb.categories.deleteBody')}</p>
            {del.isError ? (
              <Notice
                tone={
                  del.error instanceof ApiError && del.error.status === 409 ? 'warning' : 'danger'
                }
                title={t('finalb.categories.cannotDelete')}
              >
                {categoryError(del.error, t)}
              </Notice>
            ) : null}
          </>
        }
        confirmLabel={t('common.delete')}
        loading={del.isPending}
        onCancel={() => setDeleting(null)}
        onConfirm={() => deleting && del.mutate(deleting)}
      />
    </div>
  );
}
