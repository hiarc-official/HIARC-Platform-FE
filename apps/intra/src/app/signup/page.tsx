'use client';

import { PageLayout } from '@hiarc-platform/ui';
import { DesktopSignupPage, MobileSignupPage } from '@/features/auth/pages/signup';

export default function SignUpPage(): React.ReactElement {
  return (
    <PageLayout
      desktopChildren={<DesktopSignupPage />}
      mobileChildren={<MobileSignupPage />}
    />
  );
}
