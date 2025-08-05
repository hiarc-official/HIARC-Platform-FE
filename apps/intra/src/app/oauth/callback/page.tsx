'use client';

import { LoadingDots } from '@hiarc-platform/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useGoogleLogin } from '../../../shared/hooks/use-auth';

export default function OAuthCallbackPage(): React.ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  const googleLogin = useGoogleLogin();

  useEffect(() => {
    const code = searchParams.get('code');
    const needSignup = searchParams.get('needSignup');

    // OAuth 코드가 있는 경우 처리
    if (code) {
      googleLogin.mutate(code, {
        onSuccess: (data) => {
          if (data.needSignup) {
            router.push('/signup');
          } else {
            router.push('/');
          }
        },
        onError: (error) => {
          console.error('로그인 실패:', error);
          router.push('/login');
        },
      });
      return;
    }

    // needSignup만 있는 경우 (이전 로직 유지)
    if (needSignup === 'true') {
      router.push('/signup');
    } else {
      router.push('/');
    }
  }, [router, searchParams, googleLogin]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingDots />
        <div>로그인 처리 중...</div>
      </div>
    </div>
  );
}
