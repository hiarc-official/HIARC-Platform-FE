'use client';

import { PageLayout } from '@hiarc-platform/ui';
import { DesktopMyPage, MobileMyPage } from '@/features/member/pages/my-page';

export default function MyPage(): React.ReactElement {
  return <PageLayout desktopChildren={<DesktopMyPage />} mobileChildren={<MobileMyPage />} />;
}
