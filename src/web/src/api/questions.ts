import type { Difficulty, QuestionDto, QuestionInput, QuestionState, QuestionType } from './types';

/** Server shape of a question version (GET /api/studio/courses/{id}/questions). */
interface RawVersion {
  type: QuestionType;
  language: string;
  stem: string;
  explanation: string;
  difficulty: Difficulty;
  skillCode: string;
  certificationObjective: string;
  tags: string[];
  sourceReference: string;
  allowShuffle: boolean;
  options: { id: string; text: string; isCorrect: boolean; rationale: string }[];
}
export interface RawQuestionDto {
  id: string;
  externalId: string;
  state: QuestionState;
  currentVersion: number;
  moduleId: string | null;
  lessonId: string | null;
  updatedAt?: string;
  version: RawVersion;
  pendingVersion?: number | null;
  pendingState?: QuestionState | null;
  pending?: RawVersion | null;
}

/**
 * Flattens the server's question (metadata + current version + optional staged edit) into the
 * form-friendly shape. A staged edit is shown (and edited) in place of the current version.
 */
export function toQuestion(raw: RawQuestionDto): QuestionDto {
  const v = raw.pending ?? raw.version;
  return {
    id: raw.id,
    externalId: raw.externalId,
    state: raw.pending && raw.pendingState ? raw.pendingState : raw.state,
    currentVersion: raw.pendingVersion ?? raw.currentVersion,
    updatedAt: raw.updatedAt,
    moduleId: raw.moduleId,
    lessonId: raw.lessonId,
    type: v.type,
    language: v.language,
    stem: v.stem,
    explanation: v.explanation,
    difficulty: v.difficulty,
    skillCode: v.skillCode ?? '',
    certificationObjective: v.certificationObjective ?? '',
    tags: (v.tags ?? []).join(', '),
    sourceReference: v.sourceReference ?? '',
    allowShuffle: v.allowShuffle,
    options: v.options.map((o) => ({
      id: o.id,
      text: o.text,
      isCorrect: o.isCorrect,
      rationale: o.rationale,
    })),
  };
}

export function toQuestionList(d: RawQuestionDto[] | { items: RawQuestionDto[] }): QuestionDto[] {
  return (Array.isArray(d) ? d : d.items).map(toQuestion);
}

/** The API takes tags as a list; the form edits them as a comma-separated string. */
export function toQuestionBody(v: QuestionInput) {
  return {
    ...v,
    tags: v.tags
      .split(/[,;]/)
      .map((s) => s.trim())
      .filter(Boolean),
  };
}
