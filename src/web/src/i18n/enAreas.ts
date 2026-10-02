import accountEn from './account.en.json';
import commerceEn from './commerce.en.json';
import discoverEn from './discover.en.json';
import examsEn from './exams.en.json';
import finalaEn from './finala.en.json';
import finalbEn from './finalb.en.json';
import workspaceEn from './workspace.en.json';

/** English area namespaces (one top-level key each), merged over en.json by `ensureLang`. */
export const EN_AREAS: Record<string, unknown> = Object.assign(
  {},
  accountEn,
  commerceEn,
  discoverEn,
  examsEn,
  finalaEn,
  finalbEn,
  workspaceEn,
);
