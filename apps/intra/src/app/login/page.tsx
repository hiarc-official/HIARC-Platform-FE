'use client';

import { Button, Label, LoadingDots, Title } from '@hiarc-platform/ui';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAuthStore } from '../../shared/store/auth-store';

export default function LoginPage(): React.ReactElement {
  const { user, isLoading, initialize, isInitialized } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleGoogleLogin = (): void => {
    try {
      // 백엔드 서버의 OAuth 엔드포인트로 리다이렉트
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`;
    } catch (error) {
      console.error('로그인 에러:', error);
    }
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
      <Button className="mt-7 w-full" variant="social_login" size="xl" onClick={handleGoogleLogin}>
        <Image src={'/shared-assets/Google.svg'} width={20} height={20} alt="Google" />
        <Label size="lg">구글 계정으로 로그인</Label>
      </Button>
    </div>
  );
}
