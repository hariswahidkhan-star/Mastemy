import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api, getRefreshToken, onSessionChange, refreshSession, setSession } from '../api/client';
import type { AuthResponse, Role, UserDto } from '../api/types';

interface AuthValue {
  user: UserDto | null;
  /** True until the initial refresh-token exchange has settled. */
  initializing: boolean;
  /** Returns the server's AuthResponse; the session is only established when `status` is "ok". For
   * "mfa_required" / "mfa_enrollment_required" the caller completes the challenge, then calls `completeLogin`. */
  login: (email: string, password: string) => Promise<AuthResponse>;
  /** Establishes a full session from an AuthResponse (after MFA verification or enrollment). */
  completeLogin: (auth: AuthResponse) => void;
  /** Re-reads the current user (e.g. after email verification). */
  refreshUser: () => Promise<void>;
  register: (input: {
    email: string;
    password: string;
    displayName: string;
    preferredLanguage: string;
  }) => Promise<UserDto>;
  logout: () => Promise<void>;
  hasRole: (...roles: Role[]) => boolean;
}

const AuthContext = createContext<AuthValue | null>(null);

/** Roles with at least one admin workspace section (Moderator tools are not part of this UI yet). */
export const STAFF_ROLES: Role[] = ['Reviewer', 'Support', 'Finance', 'Admin', 'SuperAdmin'];
export const AUTHOR_ROLES: Role[] = ['Instructor', 'Admin', 'SuperAdmin'];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDto | null>(null);
  const [initializing, setInitializing] = useState<boolean>(() => !!getRefreshToken());
  const qc = useQueryClient();

  useEffect(
    () =>
      onSessionChange((auth) => {
        setUser(auth?.user ?? null);
      }),
    [],
  );

  useEffect(() => {
    if (!getRefreshToken()) return;
    let cancelled = false;
    refreshSession()
      .then(async (ok) => {
        if (!ok || cancelled) return;
        // Authoritative roles come from /api/auth/me.
        try {
          const me = await api<UserDto>('/api/auth/me');
          if (!cancelled) setUser(me);
        } catch {
          /* keep user from refresh response */
        }
      })
      .finally(() => {
        if (!cancelled) setInitializing(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await api<AuthResponse>('/api/auth/login', {
        method: 'POST',
        body: { email, password },
        noRetry: true,
      });
      if (!res.status || res.status === 'ok') {
        setSession(res);
        qc.clear();
      } else {
        // A pending MFA step never leaves a previous user's session behind.
        setSession(null);
      }
      return res;
    },
    [qc],
  );

  const completeLogin = useCallback(
    (auth: AuthResponse) => {
      setSession(auth);
      qc.clear();
    },
    [qc],
  );

  const refreshUser = useCallback(async () => {
    try {
      setUser(await api<UserDto>('/api/auth/me'));
    } catch {
      /* keep the current user */
    }
  }, []);

  const register = useCallback<AuthValue['register']>(
    async (input) => {
      const res = await api<AuthResponse>('/api/auth/register', {
        method: 'POST',
        body: input,
        noRetry: true,
      });
      setSession(res);
      qc.clear();
      return res.user;
    },
    [qc],
  );

  const logout = useCallback(async () => {
    const refreshToken = getRefreshToken();
    try {
      if (refreshToken)
        await api('/api/auth/logout', { method: 'POST', body: { refreshToken }, noRetry: true });
    } catch {
      /* server-side revoke is best-effort; local session is cleared regardless */
    }
    setSession(null);
    qc.clear();
  }, [qc]);

  const value = useMemo<AuthValue>(
    () => ({
      user,
      initializing,
      login,
      completeLogin,
      refreshUser,
      register,
      logout,
      hasRole: (...roles) => !!user && roles.some((r) => user.roles.includes(r)),
    }),
    [user, initializing, login, completeLogin, refreshUser, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
