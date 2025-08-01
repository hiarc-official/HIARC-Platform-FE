'use client';

import { Button, Label, PageLayout, Title } from '@hiarc-platform/ui';
import Image from 'next/image';
import React from 'react';

export default function LoginPage(): React.ReactElement {
  return (
    <PageLayout className="flex min-h-screen items-center justify-center">
      <div className="mx-auto flex w-full max-w-[470px] flex-col items-center gap-4">
        <Image src={'/SquareLogo.png'} width={145} height={65} alt="logo" />
        <Title className="mt-11" size="sm" weight="bold">
          로그인
        </Title>
        <Button className="mt-7 w-full" variant="social_login" size="xl">
          <Image src={'/Google.svg'} width={20} height={20} alt="Google" />
          <Label size="lg">구글 계정으로 로그인</Label>
        </Button>
      </div>
    </PageLayout>
  );
}
