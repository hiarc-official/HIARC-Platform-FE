import { NextRequest, NextResponse } from 'next/server';

/**
 * 인증 미들웨어
 * - access 토큰 쿠키 존재 여부로 인증을 확인하고, 없으면 로그인 페이지로 리디렉션
 * - 회원 서비스 앱은 공개 브라우징(목록/상세)을 허용하고,
 *   개인 페이지(/my)와 글 작성/수정 등 인증이 반드시 필요한 경로만 보호
 *
 * 주의: 미들웨어(edge)에서는 백엔드 시크릿이 없어 JWT 서명 검증이 불가능합니다.
 * 여기서는 토큰 존재만 확인하고, 실제 권한 검증은 백엔드 API(401/403)에서 수행합니다.
 *
 * @param req NextRequest
 * @returns NextResponse | null
 */
const protectedRoutes = ['/my'];

function isProtectedRoute(pathname: string): boolean {
  if (protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))) {
    return true;
  }
  // 글 작성/수정 페이지는 인증 필요 (예: /announcement/write, /announcement/[id]/edit)
  if (pathname.endsWith('/write') || pathname.endsWith('/edit')) {
    return true;
  }
  return false;
}

export function authMiddleware(req: NextRequest): NextResponse | null {
  const { pathname } = req.nextUrl;

  if (!isProtectedRoute(pathname)) {
    return null;
  }

  const tokenKey = process.env.ACCESS_TOKEN_KEY ?? 'access';
  const token = req.cookies.get(tokenKey)?.value;

  if (!token) {
    const loginUrl = new URL('/login', req.url);
    // 로그인 후 원래 접근하려던 페이지로 돌아가기 위해 경로를 쿼리로 전달
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return null;
}
