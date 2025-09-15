'use client';

import { Label, PageLayout } from '@hiarc-platform/ui';
import { DesktopSignupPage, MobileSignupPage } from '@/features/auth/pages/signup';
import { useCurrentSemester } from '@/features/semester/hooks/use-current-semester';

export default function SignUpPage(): React.ReactElement {
  const { data: currentSemesterData } = useCurrentSemester();

  if (!currentSemesterData?.recruitingSemester) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Label size="lg" className="text-gray-600">
          모집 중이 아닙니다.
        </Label>
      </div>
    );
  }

  return (
    <PageLayout desktopChildren={<DesktopSignupPage />} mobileChildren={<MobileSignupPage />} />
  );
}
