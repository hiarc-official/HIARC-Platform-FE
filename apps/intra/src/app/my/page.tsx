'use client';

import React, { useEffect } from 'react';
import { CompetitionSection } from '@/features/auth/components/competition-section';
import { HitingSection } from '@/features/auth/components/hiting-section';
import { MyInfoSection } from '@/features/auth/components/my-info-section';
import { StreakSection } from '@/features/auth/components/streak-section';
import { StudySection } from '@/features/auth/components/study-section';
import { useUpdateMyIntroduction } from '@/features/member/hooks/my/use-update-my-introduction';
import { useAuthStore } from '@/shared/store/auth-store';
import {
  BackButton,
  DialogUtil,
  Divider,
  PageLayout,
  TwoColumnLayout,
  LoadingDots,
  FadeIn,
} from '@hiarc-platform/ui';
import { useRouter } from 'next/navigation';
import { useMyPageData } from '@/features/member/hooks/my/use-my-page-data';

export default function MyPage(): React.ReactElement {
  const attendance = [true, true, true, true, true, true, true, true];
  const assignment = [true, true, false, true, true, true, true, true];
  const router = useRouter();
  const { user } = useAuthStore();
  const [hydrated, setHydrated] = React.useState(false);

  const {
    data: myPageData,
    isLoading: myPageDataLoading,
    error: myPageDataError,
  } = useMyPageData();

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
    return (
      <PageLayout
        desktopChildren={
          <div className="flex min-h-[400px] items-center justify-center">
            <LoadingDots />
          </div>
        }
        mobileChildren={
          <div className="flex min-h-[400px] items-center justify-center">
            <LoadingDots />
          </div>
        }
      />
    );
  }

  // 유저 정보가 없으면 로딩 표시
  if (!user) {
    return (
      <PageLayout
        desktopChildren={
          <div className="flex min-h-[400px] items-center justify-center">
            <LoadingDots />
          </div>
        }
        mobileChildren={
          <div className="flex min-h-[400px] items-center justify-center">
            <LoadingDots />
          </div>
        }
      />
    );
  }

  // MyPageData 로딩 중
  if (myPageDataLoading) {
    return (
      <PageLayout
        desktopChildren={
          <div className="flex min-h-[400px] items-center justify-center">
            <LoadingDots />
          </div>
        }
        mobileChildren={
          <div className="flex min-h-[400px] items-center justify-center">
            <LoadingDots />
          </div>
        }
      />
    );
  }

  // MyPageData 에러 발생
  if (myPageDataError) {
    return (
      <PageLayout
        desktopChildren={
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <p className="mb-4 text-lg text-gray-600">문제가 발생했습니다.</p>
              <BackButton onClick={() => router.back()} />
            </div>
          </div>
        }
        mobileChildren={
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <p className="mb-4 text-lg text-gray-600">문제가 발생했습니다.</p>
              <BackButton onClick={() => router.back()} />
            </div>
          </div>
        }
      />
    );
  }

  const handleUpdateIntroduction = async (introduction: string): Promise<void> => {
    await updateMyIntroduction.mutateAsync({ introduction });
  };

  const isDataReady = hydrated && user && myPageData && !myPageDataLoading;

  return (
    <PageLayout
      desktopChildren={
        <FadeIn isVisible={isDataReady ?? false}>
          <BackButton onClick={() => router.back()} />
          <MyInfoSection
            className="mt-5"
            bojHandle={myPageData?.bojHandle}
            name={myPageData?.name}
            introduction={myPageData?.introduction}
            onSave={handleUpdateIntroduction}
          />
          <Divider variant="horizontal" size="full" className="mt-4 bg-gray-900" />
          <TwoColumnLayout
            className="mt-8"
            left={
              <>
                <HitingSection
                  season={myPageData?.rating?.seasonScore ?? 0}
                  total={myPageData?.rating?.totalScore ?? 0}
                  today={myPageData?.rating?.todayScore ?? 0}
                />
                <StreakSection className="mt-6" />
              </>
            }
            right={<CompetitionSection awardList={myPageData?.awards ?? []} />}
          />
          <Divider variant="horizontal" size="full" className="mt-8 bg-gray-900" />
          <StudySection attendance={attendance} assignment={assignment} className="mt-8" />
        </FadeIn>
      }
      mobileChildren={
        <FadeIn isVisible={isDataReady ?? false}>
          <MyInfoSection
            className="mt-5"
            bojHandle={myPageData?.bojHandle}
            name={myPageData?.name}
            introduction={myPageData?.introduction}
            onSave={handleUpdateIntroduction}
          />
          <Divider variant="horizontal" size="full" className="mt-4 bg-gray-900" />
          <HitingSection
            className="mt-8"
            season={myPageData?.rating?.seasonScore ?? 0}
            total={myPageData?.rating?.totalScore ?? 0}
            today={myPageData?.rating?.todayScore ?? 0}
          />
          <StreakSection className="mt-6" />
          <CompetitionSection className="mt-6" awardList={myPageData?.awards ?? []} />
          <Divider variant="horizontal" size="full" className="mt-8 bg-gray-900" />
          <StudySection attendance={attendance} assignment={assignment} className="mt-8" />
        </FadeIn>
      }
    />
  );
}
