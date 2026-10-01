import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nProvider, translate, useI18n } from '../i18n/I18nProvider';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

function Switcher() {
  const { lang, setLang, t } = useI18n();
  return (
    <button type="button" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}>
      {t('nav.courses')}
    </button>
  );
}

function flatKeys(obj: object, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    typeof v === 'string' ? [`${prefix}${k}`] : flatKeys(v as object, `${prefix}${k}.`),
  );
}

describe('i18n', () => {
  it('switching to Arabic sets dir="rtl" and lang="ar" on <html>', async () => {
    render(
      <I18nProvider initialLang="en">
        <Switcher />
      </I18nProvider>,
    );
    expect(document.documentElement.dir).toBe('ltr');
    expect(document.documentElement.lang).toBe('en');
    await act(async () => {
      await userEvent.click(screen.getByRole('button'));
    });
    expect(document.documentElement.dir).toBe('rtl');
    expect(document.documentElement.lang).toBe('ar');
    expect(screen.getByRole('button')).toHaveTextContent('كل الدورات');
    expect(localStorage.getItem('mastemy.lang')).toBe('ar');
  });

  it('English and Arabic dictionaries have identical keys', () => {
    expect(flatKeys(ar).sort()).toEqual(flatKeys(en).sort());
  });

  it('interpolates variables', () => {
    expect(translate('en', 'common.pageOf', { page: 2, pages: 5 })).toBe('Page 2 of 5');
  });
});
