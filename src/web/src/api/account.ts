/**
 * Wave 3 account surface: login challenges and MFA, email verification, password recovery, sessions,
 * profile, learning goals, skill profile and data rights. Field names mirror the C# records in
 * src/Mastemy.Api/Modules/Identity/IdentityDtos.cs and Modules/Account/AccountServices.cs (camelCase JSON).
 */
import { api, ApiError } from './client';
import type { AuthResponse, CourseCardDto, Guid, IsoDate, Role } from './types';

// ---------- MFA ----------
export interface MfaStatusDto {
  enabled: boolean;
  enabledAt: IsoDate | null;
  remainingRecoveryCodes: number;
  required: boolean;
}
export interface MfaEnrollmentDto {
  secret: string;
  otpAuthUri: string;
  digits: number;
  periodSeconds: number;
  algorithm: string;
}
export interface MfaEnrolledDto {
  recoveryCodes: string[];
  session: AuthResponse;
}
export interface RecoveryCodesDto {
  recoveryCodes: string[];
}
export interface MessageDto {
  message: string;
}
export interface SessionDto {
  id: Guid;
  createdAt: IsoDate;
  lastUsedAt: IsoDate;
  expiresAt: IsoDate;
  userAgent: string;
  ipAddress: string;
  lastIpAddress: string;
  mfaAuthenticated: boolean;
  current: boolean;
}

// ---------- Account ----------
export interface ProfileLink {
  label: string;
  url: string;
}
export interface ProfileDto {
  id: Guid;
  email: string;
  displayName: string;
  initials: string;
  headline: string;
  bio: string;
  preferredLanguage: string;
  timeZone: string;
  links: ProfileLink[];
  publicInstructorProfile: boolean;
  emailVerified: boolean;
  mfaEnabled: boolean;
  roles: Role[];
}
export interface UpdateProfileRequest {
  displayName?: string;
  headline?: string;
  bio?: string;
  preferredLanguage?: string;
  timeZone?: string;
  links?: ProfileLink[];
  publicInstructorProfile?: boolean;
}
export interface PublicInstructorProfileDto {
  id: Guid;
  displayName: string;
  initials: string;
  headline: string;
  bio: string;
  links: ProfileLink[];
}
/** `GET /api/instructors/{id}` (taxonomy directory). */
export interface InstructorDirectoryProfileDto {
  id: Guid;
  displayName: string;
  liveCourseCount: number;
  ratingAverage: number | null;
  ratingCount: number;
  courses: CourseCardDto[];
}
export interface LearningGoalsDto {
  goals: string;
  skillsOfInterest: string[];
  learningLanguage: string;
  updatedAt: IsoDate | null;
}
export type EvidenceType = 'self_declared' | 'mcq_assessed' | 'external_credential';
export interface SkillEvidenceDto {
  id: Guid | null;
  name: string;
  evidenceType: EvidenceType;
  label: string;
  verified: boolean;
  issuer: string | null;
  credentialUrl: string | null;
  obtainedAt: IsoDate | null;
  assessmentsPassed: number | null;
  bestScorePercent: number | null;
  lastPassedAt: IsoDate | null;
}
export interface SkillProfileDto {
  items: SkillEvidenceDto[];
  notice: string;
}
export interface AddSkillRequest {
  name: string;
  evidenceType: 'self_declared' | 'external_credential';
  issuer?: string;
  credentialUrl?: string;
  obtainedAt?: string;
}

export const accountKeys = {
  mfaStatus: ['account', 'mfa'] as const,
  sessions: ['account', 'sessions'] as const,
  profile: ['account', 'profile'] as const,
  goals: ['account', 'goals'] as const,
  skills: ['account', 'skills'] as const,
  instructor: (id: string) => ['account', 'instructor', id] as const,
};

/** Calls an endpoint with an explicit bearer token (the restricted MFA-enrollment token). */
export function withToken(token: string | undefined): { headers?: Record<string, string> } {
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
}

export const accountApi = {
  mfaStatus: (token?: string) =>
    api<MfaStatusDto>('/api/auth/mfa/status', { ...withToken(token), noRetry: !!token }),
  enroll: (token?: string) =>
    api<MfaEnrollmentDto>('/api/auth/mfa/enroll', {
      method: 'POST',
      ...withToken(token),
      noRetry: !!token,
    }),
  confirmEnroll: (code: string, token?: string) =>
    api<MfaEnrolledDto>('/api/auth/mfa/enroll/confirm', {
      method: 'POST',
      body: { code },
      ...withToken(token),
      noRetry: !!token,
    }),
  verifyMfa: (mfaToken: string, input: { code?: string; recoveryCode?: string }) =>
    api<AuthResponse>('/api/auth/mfa/verify', {
      method: 'POST',
      body: { mfaToken, ...input },
      noRetry: true,
    }),
  regenerateCodes: (code: string) =>
    api<RecoveryCodesDto>('/api/auth/mfa/recovery-codes', { method: 'POST', body: { code } }),
  disableMfa: (password: string, code: string) =>
    api<void>('/api/auth/mfa/disable', { method: 'POST', body: { password, code } }),
  verifyEmail: (token: string) =>
    api<void>('/api/auth/email/verify', { method: 'POST', body: { token }, noRetry: true }),
  resendEmail: (token?: string) =>
    api<void>('/api/auth/email/resend', { method: 'POST', ...withToken(token) }),
  forgot: (email: string) =>
    api<MessageDto>('/api/auth/password/forgot', {
      method: 'POST',
      body: { email },
      noRetry: true,
    }),
  reset: (token: string, newPassword: string) =>
    api<void>('/api/auth/password/reset', {
      method: 'POST',
      body: { token, newPassword },
      noRetry: true,
    }),
  changePassword: (currentPassword: string, newPassword: string) =>
    api<void>('/api/auth/password/change', {
      method: 'POST',
      body: { currentPassword, newPassword },
    }),
  sessions: () => api<SessionDto[]>('/api/auth/sessions'),
  revokeSession: (id: string) => api<void>(`/api/auth/sessions/${id}`, { method: 'DELETE' }),
  revokeAll: () => api<void>('/api/auth/sessions', { method: 'DELETE' }),
  profile: () => api<ProfileDto>('/api/me/profile'),
  updateProfile: (body: UpdateProfileRequest) =>
    api<ProfileDto>('/api/me/profile', { method: 'PUT', body }),
  goals: () => api<LearningGoalsDto>('/api/me/learning-goals'),
  putGoals: (body: { goals: string; skillsOfInterest: string[]; learningLanguage: string }) =>
    api<LearningGoalsDto>('/api/me/learning-goals', { method: 'PUT', body }),
  skills: () => api<SkillProfileDto>('/api/me/skills'),
  addSkill: (body: AddSkillRequest) =>
    api<SkillEvidenceDto>('/api/me/skills', { method: 'POST', body }),
  deleteSkill: (id: string) => api<void>(`/api/me/skills/${id}`, { method: 'DELETE' }),
  deleteAccount: (body: { password: string; confirm: string; mfaCode?: string }) =>
    api<void>('/api/me', { method: 'DELETE', body }),
  instructorProfile: (id: string) =>
    api<PublicInstructorProfileDto>(`/api/instructors/${id}/profile`),
  instructorDirectory: (id: string) => api<InstructorDirectoryProfileDto>(`/api/instructors/${id}`),
};

/** Resolves to null on 404 so two independent sources can be merged. */
export async function orNull<T>(p: Promise<T>): Promise<T | null> {
  try {
    return await p;
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) return null;
    throw e;
  }
}

/** Normalizes a typed recovery code the way the server compares it (case and dash insensitive). */
export function normalizeRecoveryCode(input: string): string {
  return input.replace(/[\s-]/g, '').toUpperCase();
}

/** Groups a base32 secret in blocks of four for manual entry. */
export function groupSecret(secret: string): string {
  return secret.replace(/\s/g, '').replace(/(.{4})(?=.)/g, '$1 ');
}

/** Fallback IANA zones for runtimes without Intl.supportedValuesOf. */
export const FALLBACK_TIME_ZONES = [
  'UTC',
  'Africa/Cairo',
  'Africa/Casablanca',
  'Africa/Johannesburg',
  'Africa/Lagos',
  'America/Chicago',
  'America/Los_Angeles',
  'America/New_York',
  'America/Sao_Paulo',
  'America/Toronto',
  'Asia/Amman',
  'Asia/Baghdad',
  'Asia/Beirut',
  'Asia/Dubai',
  'Asia/Karachi',
  'Asia/Kolkata',
  'Asia/Qatar',
  'Asia/Riyadh',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Australia/Sydney',
  'Europe/Berlin',
  'Europe/Istanbul',
  'Europe/London',
  'Europe/Madrid',
  'Europe/Paris',
];

export function timeZones(current?: string): string[] {
  let zones: string[] = FALLBACK_TIME_ZONES;
  try {
    const intl = Intl as unknown as { supportedValuesOf?: (k: string) => string[] };
    const list = intl.supportedValuesOf?.('timeZone');
    if (list && list.length > 0) zones = list.includes('UTC') ? list : ['UTC', ...list];
  } catch {
    /* fall back */
  }
  return current && !zones.includes(current) ? [current, ...zones] : zones;
}

/** Skills of interest: comma/newline separated, trimmed, de-duplicated (case-insensitive), ≤ 20. */
export function parseInterests(text: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of text.split(/[,\n]/)) {
    const s = raw.trim();
    if (!s || seen.has(s.toLowerCase())) continue;
    seen.add(s.toLowerCase());
    out.push(s);
  }
  return out;
}
