'use client';

import { AwardSection } from '@/features/award/components/award-section';
import { HitingSection } from '@/features/member/components/hiting-section';
import { MyInfoSection } from '@/features/member/components/my-info-section';
import { StreakSection } from '@/features/member/components/streak-section';
import { Divider, LoadingDots, FadeIn, Label } from '@hiarc-platform/ui';
import { MemberProfile } from '../../types/model/member-profile';

interface MobileMemberDetailPageProps {
  memberProfileData?: MemberProfile;
  isLoading: boolean;
  error: Error | null;
}

export function MobileMemberDetailPage({
  memberProfileData,
  isLoading,
  error,
}: MobileMemberDetailPageProps): React.ReactElement {
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingDots />
      </div>
    );
  }

  if (error !== null) {
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
    <FadeIn isVisible={!isLoading && !error}>
      <MyInfoSection className="mt-10" isMe={false} memberProfileData={memberProfileData} />
      <Divider variant="horizontal" size="full" className="mt-4 bg-gray-900" />
      <HitingSection
        className="mt-6"
        isMe={false}
        season={memberProfileData?.rating?.seasonScore ?? 0}
        total={memberProfileData?.rating?.totalScore ?? 0}
        today={memberProfileData?.rating?.todayScore ?? 0}
        ratingRecords={memberProfileData?.rating?.records ?? []}
      />
      <StreakSection
        className="mt-4"
        totalDays={memberProfileData?.streak?.currentTotalStreak}
        currentSeasonDays={memberProfileData?.streak?.currentSeasonStreak}
        streakStartAt={memberProfileData?.streak?.streakStartAt}
        streakData={memberProfileData?.streak?.streakData ?? []}
      />
      <AwardSection className="mt-4" awardList={memberProfileData?.award ?? []} />
    </FadeIn>
  );
}
