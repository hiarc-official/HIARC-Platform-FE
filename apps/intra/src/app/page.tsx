import { PageLayout } from '@hiarc-platform/design-system';
import { DesktopHomePage, MobileHomePage } from '@/features/main/pages/home';
import { ConditionalOnboardingButton } from '@/features/main/components/conditional-onboarding-button';
import { cookies } from 'next/headers';

export default async function Home(): Promise<React.ReactElement> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(process.env.ACCESS_TOKEN_KEY || '');
  const isAuthenticated = Boolean(authCookie?.value);

  return (
    <PageLayout
      desktopChildren={<DesktopHomePage />}
      mobileChildren={<MobileHomePage />}
      stickyBottom={<ConditionalOnboardingButton isAuthenticated={isAuthenticated} />}
    />
  );
}
