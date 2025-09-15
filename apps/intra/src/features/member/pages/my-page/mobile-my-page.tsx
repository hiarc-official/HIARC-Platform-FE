'use client';

import { AwardSection } from '@/features/award/components/award-section';
import { HitingSection } from '@/features/member/components/hiting-section';
import { MyInfoSection } from '@/features/member/components/my-info-section';
import { StreakSection } from '@/features/member/components/streak-section';
import { StudySection } from '@/features/member/components/study-section';
import { useMyPageState } from '@/features/member/hooks/page/use-my-page-state';
import { Divider, LoadingDots, FadeIn, Label } from '@hiarc-platform/ui';

export function MobileMyPage(): React.ReactElement {
  const {
    user,
    myPageData,
    myPageDataLoading,
    myPageDataError,
    isDataReady,
    handleUpdateIntroduction,
  } = useMyPageState();

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
      <div className="mt-20 flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Label size="lg" className=" text-gray-600">
            문제가 발생했습니다.
          </Label>
        </div>
      </div>
    );
  }

  return (
    <FadeIn isVisible={isDataReady ?? false}>
      <MyInfoSection
        className="mt-10"
        isMe={true}
        memberProfileData={myPageData}
        onSave={handleUpdateIntroduction}
      />
      <Divider variant="horizontal" size="full" className="mt-4 bg-gray-900" />
      <HitingSection
        className="mt-6"
        season={myPageData?.rating?.seasonScore ?? 0}
        total={myPageData?.rating?.totalScore ?? 0}
        today={myPageData?.rating?.todayScore ?? 0}
        ratingRecords={myPageData?.rating?.records ?? []}
      />
      <StreakSection
        className="mt-6"
        totalDays={myPageData?.streak?.currentTotalStreak}
        currentSeasonDays={myPageData?.streak?.currentSeasonStreak}
        streakStartAt={myPageData?.streak?.streakStartAt}
        streakData={myPageData?.streak?.streakData ?? []}
      />
      <AwardSection className="mt-6" awardList={myPageData?.award ?? []} isMe={true} />
      <Divider variant="horizontal" size="full" className="mt-6 bg-gray-900" />
      <StudySection className="mt-6" />
    </FadeIn>
  );
}
