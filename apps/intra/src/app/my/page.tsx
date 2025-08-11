'use client';

import React, { useEffect } from 'react';
import { CompetitionSection } from '@/features/auth/components/competition-section';
import { HitingSection } from '@/features/auth/components/hiting-section';
import { MyInfoSection } from '@/features/auth/components/my-info-section';
import { StreakSection } from '@/features/auth/components/streak-section';
import { StudySection } from '@/features/auth/components/study-section';
import { useMemberProfile } from '@/features/member/hooks/member/use-member-profile';
import { useMyCurrentStudies, useMyPastStudies } from '@/features/member/hooks/my/use-my-studies';
import { useUpdateMyIntroduction } from '@/features/member/hooks/my/use-update-my-introduction';
import { useAuthStore } from '@/shared/store/auth-store';
import { BackButton, DialogUtil, Divider, PageLayout, TwoColumnLayout } from '@hiarc-platform/ui';
import { useRouter } from 'next/navigation';
import useMyAwards from '@/features/awards/hooks/use-my-awards';

export default function MyPage(): React.ReactElement {
  const attendance = [true, true, true, true, true, true, true, true];
  const assignment = [true, true, false, true, true, true, true, true];
  const router = useRouter();
  const { user } = useAuthStore();
  const [hydrated, setHydrated] = React.useState(false);

  // 모든 hooks를 항상 호출
  const currentUser = user;
  const memberId = currentUser?.memberId ?? 0;

  const { data: myAwards, isLoading: myAwardsLoading, error: myAwardsError } = useMyAwards();
  const {
    data: myProfile,
    isLoading: myProfileLoading,
    error: myProfileError,
  } = useMemberProfile(memberId);
  const updateMyIntroduction = useUpdateMyIntroduction();

  useEffect(() => {
    setHydrated(true);
  }, []);

  // 인증 정보가 없으면 메인으로 리다이렉트
  useEffect(() => {
    if (hydrated && !user) {
      DialogUtil.showError('로그인이 필요한 페이지입니다.', undefined);
    }
  }, [hydrated, user, router]);

  // hydration 완료 전에는 로딩 표시 (hooks 호출 이후)
  if (!hydrated) {
    return <div>Loading...</div>;
  }

  // 유저 정보가 없으면 로딩 표시
  if (!user) {
    return <div>Loading...</div>;
  }

  const handleUpdateIntroduction = async (introduction: string): Promise<void> => {
    await updateMyIntroduction.mutateAsync({ introduction });
  };

  console.log('myAwards', myAwards);

  return (
    <PageLayout
      desktopChildren={
        <>
          <BackButton onClick={() => router.back()} />
          <MyInfoSection
            className="mt-5"
            bojHandle={myProfile?.bojHandle}
            name={myProfile?.name}
            introduction={myProfile?.introduction}
            onSave={handleUpdateIntroduction}
          />
          <Divider variant="horizontal" size="full" className="mt-4 bg-gray-900" />
          <TwoColumnLayout
            className="mt-8"
            left={
              <>
                <HitingSection season={6} total={10000} today={6} />
                <StreakSection className="mt-6" />
              </>
            }
            right={<CompetitionSection awardList={myAwards} />}
          />
          <Divider variant="horizontal" size="full" className="mt-8 bg-gray-900" />
          <StudySection attendance={attendance} assignment={assignment} className="mt-8" />
        </>
      }
      mobileChildren={
        <>
          <MyInfoSection
            className="mt-5"
            bojHandle={myProfile?.bojHandle}
            name={myProfile?.name}
            introduction={myProfile?.introduction}
            onSave={handleUpdateIntroduction}
          />
          <Divider variant="horizontal" size="full" className="mt-4 bg-gray-900" />
          <HitingSection className="mt-8" season={6} total={10000} today={6} />
          <StreakSection className="mt-6" />
          <CompetitionSection className="mt-6" awardList={myAwards} />
          <Divider variant="horizontal" size="full" className="mt-8 bg-gray-900" />
          <StudySection attendance={attendance} assignment={assignment} className="mt-8" />
        </>
      }
    />
  );
}
