'use client';

import { CompetitionSection } from '@/features/auth/components/competition-section';
import { HitingSection } from '@/features/auth/components/hiting-section';
import { MyInfoSection } from '@/features/auth/components/my-info-section';
import { StreakSection } from '@/features/auth/components/streak-section';
import { StudySection } from '@/features/auth/components/study-section';
import { useMyPageState } from '@/features/member/hooks/page/use-my-page-state';
import {
  BackButton,
  Divider,
  LoadingDots,
  FadeIn,
} from '@hiarc-platform/ui';

export function MobileMyPage(): React.ReactElement {
  const {
    user,
    hydrated,
    myPageData,
    myPageDataLoading,
    myPageDataError,
    isDataReady,
    handleUpdateIntroduction,
    handleBackClick,
  } = useMyPageState();

  if (!hydrated) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingDots />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingDots />
      </div>
    );
  }

  if (myPageDataLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingDots />
      </div>
    );
  }

  if (myPageDataError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-lg text-gray-600">문제가 발생했습니다.</p>
          <BackButton onClick={handleBackClick} />
        </div>
      </div>
    );
  }

  return (
    <FadeIn isVisible={isDataReady ?? false}>
      <MyInfoSection
        className="mt-5"
        bojHandle={myPageData?.bojHandle}
        name={myPageData?.name}
        introduction={myPageData?.introduction}
        onSave={handleUpdateIntroduction}
        rating={myPageData?.tier ?? 'UNRATED'}
        div={myPageData?.division ?? 'DIV_1'}
      />
      <Divider variant="horizontal" size="full" className="mt-4 bg-gray-900" />
      <HitingSection
        className="mt-6"
        season={myPageData?.rating?.seasonScore ?? 0}
        total={myPageData?.rating?.totalScore ?? 0}
        today={myPageData?.rating?.todayScore ?? 0}
      />
      <StreakSection className="mt-4" />
      <CompetitionSection className="mt-4" awardList={myPageData?.award ?? []} />
      <Divider variant="horizontal" size="full" className="mt-6 bg-gray-900" />
      <StudySection className="mt-6" />
    </FadeIn>
  );
}