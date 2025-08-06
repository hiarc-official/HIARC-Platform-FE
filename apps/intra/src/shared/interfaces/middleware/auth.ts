import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import type { UserProfile } from '../../types/auth/user-profile';

interface AuthConfig {
  apiUrl: string;
  cookieName: string;
}

const authConfig: AuthConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
  cookieName: 'session',
};

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export async function getSession(): Promise<UserProfile | null> {
  try {
    const response = await fetch(`${authConfig.apiUrl}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookies().toString(),
      },
      credentials: 'include',
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to get session:', error);
    return null;
  }
}

export async function getSessionFromRequest(request: NextRequest): Promise<UserProfile | null> {
  try {
    const response = await fetch(`${authConfig.apiUrl}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: request.headers.get('cookie') || '',
      },
      credentials: 'include',
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to get session from request:', error);
    return null;
  }
}

export async function authMiddleware(request: NextRequest): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl;

  // 보호된 라우트 정의
  const protectedRoutes = [''];

  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return null;
  }

  const session = await getSessionFromRequest(request);

  if (!session) {
    const loginUrl = new URL('/login', request.url);
    // 접근했던 페이지를 기억했다가 로그인 후에 리디렉션 하기 위해 추가
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return null;
}

export async function signOut(): Promise<void> {
  try {
    await fetch(`${authConfig.apiUrl}/auth/refresh/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookies().toString(),
      },
      credentials: 'include',
    });
  } catch (error) {
    console.error('Failed to sign out:', error);
    throw new AuthError('로그아웃 실패');
  }
}

export function requireAuth<T extends any[]>(handler: (...args: T) => Promise<Response>) {
  return async (...args: T): Promise<Response> => {
    const session = await getSession();

    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return handler(...args);
  };
}

export function withAuth<T extends any[]>(
  handler: (session: UserProfile, ...args: T) => Promise<Response>
) {
  return async (...args: T): Promise<Response> => {
    const session = await getSession();

    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return handler(session, ...args);
  };
}

export const auth = {
  getSession,
  getSessionFromRequest,
  authMiddleware,
  signOut,
  requireAuth,
  withAuth,
};
