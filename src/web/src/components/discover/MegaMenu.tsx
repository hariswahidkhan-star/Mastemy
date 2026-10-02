import { useEffect, useId, useRef, useState } from 'react';
import type { FocusEvent, KeyboardEvent } from 'react';
import { Link, useLocation } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/client';
import { keys } from '../../api/hooks';
import { dkeys, loc } from '../../api/discover';
import type { PathwaySummaryDto, PublicCertificationSummaryDto } from '../../api/discover';
import type { CategoryDto } from '../../api/types';
import { useI18n } from '../../i18n/I18nProvider';
import '../../styles/discover.css';

const MAX_ITEMS = 8;

export interface MenuTree {
  topics: { category: CategoryDto; children: CategoryDto[] }[];
  academies: CategoryDto[];
}

/** Splits the flat category list into academies and a two-level topic tree (top-level + direct children). */
export function buildMenuTree(categories: CategoryDto[]): MenuTree {
  const academies = categories.filter((c) => c.isAcademy);
  const topics = categories
    .filter((c) => !c.isAcademy && c.parentId === null)
    .map((category) => ({
      category,
      children: categories.filter((c) => c.parentId === category.id && !c.isAcademy),
    }));
  return { topics, academies };
}

/**
 * "Explore" mega-menu using the disclosure pattern: a button with aria-expanded controls a panel of plain
 * links (no menu roles, so normal Tab navigation applies). Escape closes it and returns focus to the
 * button; focus leaving the panel closes it. In the mobile drawer the panel expands inline.
 * Data is fetched only once the panel is first opened.
 */
export function MegaMenu() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname, location.search]);

  const categories = useQuery({
    queryKey: keys.categories,
    queryFn: () => api<CategoryDto[]>('/api/categories'),
    staleTime: 5 * 60_000,
    enabled: everOpened,
  });
  const certs = useQuery({
    queryKey: dkeys.certifications({}),
    queryFn: () => api<PublicCertificationSummaryDto[]>('/api/certifications'),
    enabled: everOpened,
  });
  const pathways = useQuery({
    queryKey: dkeys.pathways(undefined),
    queryFn: () => api<PathwaySummaryDto[]>('/api/pathways'),
    enabled: everOpened,
  });
  const tree = buildMenuTree(categories.data ?? []);
  const name = (c: CategoryDto) => loc(lang, c.nameEn, c.nameAr);

  const toggle = () => {
    setEverOpened(true);
    setOpen((o) => !o);
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && open) {
      e.stopPropagation();
      setOpen(false);
      buttonRef.current?.focus();
    }
  };
  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (open && e.relatedTarget && !e.currentTarget.contains(e.relatedTarget as Node)) {
      setOpen(false);
    }
  };

  return (
    <div className="mega" onKeyDown={onKeyDown} onBlur={onBlur}>
      <button
        ref={buttonRef}
        type="button"
        className="nav-link mega__button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
      >
        {t('discover.menu.explore')} <span aria-hidden="true">{open ? '▴' : '▾'}</span>
      </button>
      <div id={panelId} className="mega__panel" hidden={!open}>
        <div className="mega__grid">
          <section aria-labelledby={`${panelId}-topics`}>
            <h2 className="mega__heading" id={`${panelId}-topics`}>
              {t('discover.menu.categories')}
            </h2>
            {categories.isError ? (
              <p className="small muted">{t('discover.menu.unavailable')}</p>
            ) : (
              <ul className="mega__list">
                {tree.topics.slice(0, MAX_ITEMS).map(({ category, children }) => (
                  <li key={category.id}>
                    <Link to={`/categories/${category.slug}`}>{name(category)}</Link>
                    {children.length > 0 ? (
                      <ul className="mega__sublist">
                        {children.slice(0, 4).map((c) => (
                          <li key={c.id}>
                            <Link to={`/categories/${c.slug}`}>{name(c)}</Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
                <li>
                  <Link to="/categories" className="mega__all">
                    {t('discover.menu.allCategories')}
                  </Link>
                </li>
              </ul>
            )}
          </section>
          <section aria-labelledby={`${panelId}-academies`}>
            <h2 className="mega__heading" id={`${panelId}-academies`}>
              {t('discover.menu.academies')}
            </h2>
            {tree.academies.length === 0 ? (
              <p className="small muted">{t('discover.menu.noneYet')}</p>
            ) : (
              <ul className="mega__list">
                {tree.academies.slice(0, MAX_ITEMS).map((a) => (
                  <li key={a.id}>
                    <Link to={`/academies/${a.slug}`}>{name(a)}</Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section aria-labelledby={`${panelId}-certs`}>
            <h2 className="mega__heading" id={`${panelId}-certs`}>
              {t('discover.menu.certifications')}
            </h2>
            <ul className="mega__list">
              {(certs.data ?? []).slice(0, MAX_ITEMS).map((c) => (
                <li key={c.id}>
                  <Link to={`/certifications/${c.slug}`}>{c.title}</Link>
                </li>
              ))}
              <li>
                <Link to="/certifications" className="mega__all">
                  {t('discover.menu.allCertifications')}
                </Link>
              </li>
            </ul>
          </section>
          <section aria-labelledby={`${panelId}-paths`}>
            <h2 className="mega__heading" id={`${panelId}-paths`}>
              {t('discover.menu.pathways')}
            </h2>
            <ul className="mega__list">
              {(pathways.data ?? []).slice(0, MAX_ITEMS).map((p) => (
                <li key={p.id}>
                  <Link to={`/pathways/${p.slug}`}>{loc(lang, p.titleEn, p.titleAr)}</Link>
                </li>
              ))}
              <li>
                <Link to="/pathways" className="mega__all">
                  {t('discover.menu.allPathways')}
                </Link>
              </li>
            </ul>
          </section>
          <section aria-labelledby={`${panelId}-more`}>
            <h2 className="mega__heading" id={`${panelId}-more`}>
              {t('discover.menu.more')}
            </h2>
            <ul className="mega__list">
              <li>
                <Link to="/free-lessons">{t('nav.freeLessons')}</Link>
              </li>
              <li>
                <Link to="/packages">{t('discover.packages.title')}</Link>
              </li>
              <li>
                <Link to="/practice">{t('discover.practice.title')}</Link>
              </li>
              <li>
                <Link to="/notes-library">{t('discover.notes.title')}</Link>
              </li>
              <li>
                <Link to="/instructors">{t('discover.instructors.title')}</Link>
              </li>
              <li>
                <Link to="/articles">{t('discover.articles.title')}</Link>
              </li>
              <li>
                <Link to="/business">{t('discover.business.title')}</Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
