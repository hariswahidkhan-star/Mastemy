import ar from './ar.json';
import accountAr from './account.ar.json';
import commerceAr from './commerce.ar.json';
import discoverAr from './discover.ar.json';
import examsAr from './exams.ar.json';
import finalaAr from './finala.ar.json';
import finalbAr from './finalb.ar.json';
import workspaceAr from './workspace.ar.json';

/** The merged Arabic dictionary (core + area namespaces); loaded on demand by `ensureLang('ar')`. */
export const AR_DICT: Record<string, unknown> = Object.assign(
  {},
  ar,
  accountAr,
  commerceAr,
  discoverAr,
  examsAr,
  finalaAr,
  finalbAr,
  workspaceAr,
);
