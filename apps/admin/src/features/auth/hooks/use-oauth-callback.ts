import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DialogUtil } from '@hiarc-platform/design-system';
import { authApi } from '../api/auth';
import { useAuthStore } from '../../../shared/stores/auth-store';

// 콜백 쿼리로 전달된 email 값을 신뢰하지 않고 형식을 검증한 뒤 사용
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useOAuthCallback(): { isProcessing: boolean } {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, clearAuth } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processOAuthCallback = async (): Promise<void> => {
      try {
        const needSignup = searchParams.get('needSignup');
        const email = searchParams.get('email');

        if (!needSignup) {
          router.push('/login');
          return;
        }

        if (needSignup === 'true') {
          // 회원가입이 필요한 경우 - OAuth 실패 페이지로 이동
          if (email && EMAIL_REGEX.test(email)) {
            sessionStorage.setItem('signupEmail', email);
          }
          router.push('/oauth-fail/signup');
        } else if (needSignup === 'false') {
          // 로그인 완료된 사용자 - 유저 정보 패칭 후 메인으로 이동
          try {
            const getMeResponse = await authApi.GET_ME();

            // 관리자 자격(adminRole)이 없는 경우 → 모달 후 로그인 페이지로 돌려보냄
            if (!getMeResponse.adminRole || getMeResponse.adminRole === 'NONE') {
              clearAuth();
              if (typeof window !== 'undefined') {
                localStorage.removeItem('auth-storage');
              }
              DialogUtil.showError('접근 권한이 없는 계정입니다. 다시 로그인해주세요.', () => {
                router.replace('/login');
              });
              return;
            }

            // Zustand store에 유저 정보만 저장 (토큰은 서버에서 관리)
            login(getMeResponse);
            router.push('/');
          } catch (error) {
            console.error('유저 정보 패칭 실패:', error);
            clearAuth();
            router.push('/login');
          }
        }
      } catch (error) {
        console.error('OAuth 콜백 처리 실패:', error);
        clearAuth();
        router.push('/login');
      } finally {
        setIsProcessing(false);
      }
    };

    processOAuthCallback();
  }, [router, searchParams, login, clearAuth]);

  return {
    isProcessing,
  };
}
