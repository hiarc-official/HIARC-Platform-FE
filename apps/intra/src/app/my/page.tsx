'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { PageLayout, DialogUtil } from '@hiarc-platform/ui';
import { DesktopMyPage, MobileMyPage } from '@/features/member/pages/my-page';

export default function MyPage(): React.ReactElement {
  const router = useRouter();
  const dialogShown = useRef(false);

  useEffect(() => {
    if (!dialogShown.current) {
      dialogShown.current = true;
      DialogUtil.showError('현재 기능 준비중입니다', () => {
        router.push('/');
      });
    }
  }, [router]);

  return <PageLayout desktopChildren={<div />} mobileChildren={<div />} />;
}
