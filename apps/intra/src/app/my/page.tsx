'use client';

import { CompetitionSection } from '@/features/my/components/competition-section';
import { HitingSection } from '@/features/my/components/hiting-section';
import { MyInfoSection } from '@/features/my/components/my-info-section';
import { StreakSection } from '@/features/my/components/streak-section';
import { StudySection } from '@/features/my/components/study-section';
import { BackButton, Divider, PageLayout, TwoColumnLayout } from '@hiarc-platform/ui';
import { useRouter } from 'next/navigation';

export default function MyPage(): React.ReactElement {
  const attendance = [true, true, true, true, true, true, true, true];
  const assignment = [true, true, false, true, true, true, true, true];
  const router = useRouter();

  return (
    <PageLayout
      desktopChildren={
        <>
          <BackButton onClick={() => router.back()} />
          <MyInfoSection className="mt-5" />
          <Divider variant="horizontal" size="full" className="mt-4 bg-gray-900" />
          <TwoColumnLayout
            className="mt-8"
            left={
              <>
                <HitingSection season={6} total={10000} today={6} />
                <StreakSection />
              </>
            }
            right={<CompetitionSection />}
          />
          <Divider variant="horizontal" size="full" className="mt-8 bg-gray-900" />
          <StudySection attendance={attendance} assignment={assignment} className="mt-8" />
        </>
      }
      mobileChildren={
        <>
          <MyInfoSection className="mt-5" />
          <Divider variant="horizontal" size="full" className="mt-4 bg-gray-900" />
          <HitingSection className="mt-8" season={6} total={10000} today={6} />
          <StreakSection className="mt-6" />
          <CompetitionSection className="mt-6" />
          <Divider variant="horizontal" size="full" className="mt-8 bg-gray-900" />
          <StudySection attendance={attendance} assignment={assignment} className="mt-8" />
        </>
      }
    />
  );
}
