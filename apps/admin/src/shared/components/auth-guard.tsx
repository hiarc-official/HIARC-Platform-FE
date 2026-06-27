'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { DialogUtil } from '@hiarc-platform/design-system';
import { useAuthStore } from '../stores/auth-store';

/**
 * 클라이언트 사이드 인증 가드
 * - 로그인하지 않은 상태에서 보호된 페이지에 접근하면 무조건 로그인 페이지로 보냅니다.
 * - 로그인했지만 관리자 자격(adminRole)이 없으면 모달을 띄운 뒤 로그인 페이지로 돌려보냅니다.
 *
 * 미들웨어는 토큰 쿠키 존재만 확인하므로(edge 런타임 한계), 실제 자격 검증은 여기서 수행합니다.
 */
const PUBLIC_ROUTES = ['/login', '/oauth', '/oauth-fail'];

const NO_PERMISSION_MESSAGE = '접근 권한이 없는 계정입니다. 다시 로그인해주세요.';

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

function isQualifiedRole(adminRole: string | null | undefined): boolean {
  return Boolean(adminRole) && adminRole !== 'NONE';
}

export function AuthGuard({ children }: { children: React.ReactNode }): React.ReactNode {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, clearAuth } = useAuthStore();

  // persist 스토어가 localStorage에서 복원되기 전(SSR/첫 렌더)에는 판단을 보류
  const [mounted, setMounted] = useState(false);
  const handledRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 경로가 바뀌면 가드 판단을 다시 수행
  useEffect(() => {
    handledRef.current = false;
  }, [pathname]);

  const isPublic = isPublicRoute(pathname);
  const qualified = isAuthenticated && Boolean(user) && isQualifiedRole(user?.adminRole);

  useEffect(() => {
    if (!mounted || isPublic || handledRef.current) {
      return;
    }

    // 로그인하지 않은 경우 → 무조건 로그인 페이지 우선
    if (!isAuthenticated || !user) {
      handledRef.current = true;
      router.replace('/login');
      return;
    }

    // 로그인했지만 자격이 없는 경우 → 모달 후 로그인 페이지로
    if (!isQualifiedRole(user.adminRole)) {
      handledRef.current = true;
      DialogUtil.showError(NO_PERMISSION_MESSAGE, () => {
        clearAuth();
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-storage');
        }
        router.replace('/login');
      });
    }
  }, [mounted, isPublic, isAuthenticated, user, router, clearAuth]);

  // 공개 라우트는 항상 렌더
  if (isPublic) {
    return children;
  }

  // 복원 전이거나 자격이 없는 경우 보호된 콘텐츠를 노출하지 않음
  if (!mounted || !qualified) {
    return null;
  }

  return children;
}
