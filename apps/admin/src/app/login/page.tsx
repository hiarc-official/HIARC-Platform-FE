'use client';

import { Button, Label, LoadingDots, Title } from '@hiarc-platform/ui';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAuthStore } from '../../shared/store/auth-store';
import useGoogleLogin from '@/features/auth/hooks/use-google-login';

export default function LoginPage(): React.ReactElement {
  const { user, isLoading, logout } = useAuthStore();
  const router = useRouter();
  const { googleLogin, isLoading: isGoogleLoginLoading } = useGoogleLogin();

  useEffect(() => {
    if (user) {
      logout();
      console.log('이미 로그인된 사용자입니다:', user);
      // router.push('/');
    }
  }, [user, router, logout]);

  const handleGoogleLogin = (): void => {
    googleLogin();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingDots />
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div>리다이렉트 중...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-[400px] flex-col items-center justify-center px-4 pt-20">
      <Image src={'/shared-assets/SquareLogo.png'} width={145} height={65} alt="logo" />
      <Title className="mt-11" size="sm" weight="bold">
        로그인
      </Title>
      <Button
        className="mt-7 w-full"
        variant="social_login"
        size="xl"
        onClick={handleGoogleLogin}
        disabled={isGoogleLoginLoading}
      >
        <Image src={'/shared-assets/Google.svg'} width={20} height={20} alt="Google" />
        <Label size="lg">{isGoogleLoginLoading ? '로그인 중...' : '구글 계정으로 로그인'}</Label>
      </Button>
    </div>
  );
}
