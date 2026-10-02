import { ApiError } from '../api/client';
import { formatBytes } from '../api/wave2';
import type { TFunction } from '../i18n/I18nProvider';
import { errorMessage } from '../components/ui/ErrorState';

/** Problem codes returned by resource uploads, in the order they are checked. */
export const RESOURCE_ERROR_CODES = [
  'video_not_allowed',
  'archive_not_allowed',
  'file_type_not_allowed',
  'file_content_mismatch',
  'duplicate_resource',
  'file_too_large',
  'quota_exceeded',
  'course_not_editable',
  'invalid_language',
  'invalid_caption_file',
  'captions_must_be_free',
  'multipart_required',
  'file_required',
] as const;

/**
 * Maps a resource upload/replace failure to a clear, translated message. `video_not_allowed` explains that
 * videos belong on YouTube; unknown failures fall back to the generic problem text.
 */
export function resourceUploadMessage(
  error: unknown,
  t: TFunction,
  limits?: { maxFileBytes?: number; lang?: string },
): string {
  if (error instanceof ApiError) {
    const code = RESOURCE_ERROR_CODES.find((c) => error.is(c));
    if (code === 'file_too_large' && limits?.maxFileBytes)
      return t('resources.err.file_too_large_max', {
        max: formatBytes(limits.maxFileBytes, limits.lang),
      });
    if (code) return t(`resources.err.${code}`);
    if (error.status === 415) return t('resources.err.file_type_not_allowed');
    if (error.status === 413) return t('resources.err.file_too_large');
  }
  return errorMessage(error, t);
}
