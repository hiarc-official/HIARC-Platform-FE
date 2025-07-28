'use client';

import { CompetitionSection } from '@/features/my/presentation/components/competition-section';
import { HitingSection } from '@/features/my/presentation/components/hiting-section';
import { MyInfoSection } from '@/features/my/presentation/components/my-info-section';
import { StreakSection } from '@/features/my/presentation/components/streak-section';
import { StudySection } from '@/features/my/presentation/components/study-section';
import { Divider, Label } from '@hiarc-platform/ui';
import router from 'next/router';

export default function MyPage(): React.ReactElement {
  const attendance = [true, true, true, true, true, true, true, true];
  const assignment = [true, true, false, true, true, true, true, true];

  return (
    <div className="flex w-full items-center justify-between border-b border-gray-200  py-4 sm:px-10">
      <div className="mx-auto flex w-full min-w-[600px] max-w-[1200px] flex-col items-center justify-between">
        <button
          className="flex cursor-pointer items-center self-start rounded-md p-2 transition-colors hover:bg-gray-50"
          onClick={() => router.back()}
        >
          <Label size="md" className="cursor-pointer text-gray-700">
            ← 뒤로가기
          </Label>
        </button>
        <MyInfoSection className="mt-5" />
        <Divider variant="horizontal" size="full" className="mt-4 bg-gray-900" />
        <div className="flex w-full gap-4 pt-8">
          <div className="flex w-1/2 flex-col gap-4">
            <HitingSection season={6} total={10000} today={6} />
            <StreakSection />
          </div>
          <div className="flex w-1/2 flex-col gap-4">
            <CompetitionSection />
          </div>
        </div>
        <Divider variant="horizontal" size="full" className="mt-8 bg-gray-900" />
        <StudySection attendance={attendance} assignment={assignment} className="mt-8" />
      </div>
    </div>
  );
}
