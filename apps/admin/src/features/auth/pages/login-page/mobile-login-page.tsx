'use client';
import { Button, Label, LoadingDots, Title } from '@hiarc-platform/ui';
import Image from 'next/image';
import { useLoginPageState } from '../../hooks/page/use-login-page-state';

export function MobileLoginPage(): React.ReactElement {
  const { user, isLoading, isGoogleLoginLoading, handleGoogleLogin } = useLoginPageState();

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
    <div className="mx-auto flex max-w-[320px] flex-col items-center justify-center px-6 pt-16">
      <Image src={'/shared-assets/SquareLogo.png'} width={120} height={54} alt="logo" />
      <Title className="mt-8" size="sm" weight="bold">
        로그인
      </Title>
      <Button
        className="mt-6 w-full"
        variant="social_login"
        size="lg"
        onClick={handleGoogleLogin}
        disabled={isGoogleLoginLoading}
      >
        <Image src={'/shared-assets/GoogleLogin.svg'} width={18} height={18} alt="Google" />
        <Label size="md">{isGoogleLoginLoading ? '로그인 중...' : '구글 계정으로 로그인'}</Label>
      </Button>
    </div>
  );
}
