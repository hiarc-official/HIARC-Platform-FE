'use client';

import { PageLayout } from '@hiarc-platform/ui';
import { DesktopHomePage, MobileHomePage } from '@/features/main/pages/home';
import { useHomePageState } from '@/features/main/hooks/page/use-home-page-state';
import { OnboardingButton } from '@/features/main/components/onboarding-button';

export default function Home(): React.ReactElement {
  const { isAuthenticated } = useHomePageState();

  return (
    <PageLayout
      desktopChildren={<DesktopHomePage />}
      mobileChildren={<MobileHomePage />}
      stickyBottom={!isAuthenticated && <OnboardingButton />}
    />
  );
}
