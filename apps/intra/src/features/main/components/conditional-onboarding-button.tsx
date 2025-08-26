'use client';

import { SlideFade } from '@hiarc-platform/ui';
import { OnboardingButton } from './onboarding-button';
import { useCurrentSemester } from '@/features/semester/hooks/use-current-semester';

interface ConditionalOnboardingButtonProps {
  isAuthenticated: boolean;
}

export function ConditionalOnboardingButton({
  isAuthenticated,
}: ConditionalOnboardingButtonProps): React.ReactElement | null {
  const { data: currentSemesterData } = useCurrentSemester();

  // 인증된 사용자는 온보딩 버튼을 보지 않음
  if (isAuthenticated) {
    return null;
  }

  // 인증되지 않았지만 recruitingSemester가 없으면 온보딩 버튼을 보지 않음
  if (!currentSemesterData?.recruitingSemester) {
    return null;
  }

  // 인증되지 않았고 recruitingSemester가 있으면 온보딩 버튼 표시
  const recruitingSemester = currentSemesterData.recruitingSemester;
  const semesterName = `${recruitingSemester.semesterYear}년 ${
    recruitingSemester.semesterType === 'FIRST' ? '1학기' : '2학기'
  }`;

  return (
    <SlideFade className="w-full">
      <OnboardingButton semesterName={semesterName} />
    </SlideFade>
  );
}
