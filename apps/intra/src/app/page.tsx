'use client';

import { HiarcScheduleSection } from '@/features/main/presentation/components/hiarc-schedule-section';
import { NoticeListSection } from '@/features/main/presentation/components/notice-list-section';
import { OnboardingButton } from '@/features/main/presentation/components/onboarding-button';
import { StudyListSection } from '@/features/main/presentation/components/study-list-section';
import { cn } from '@hiarc-platform/ui';

export default function Home(): React.ReactElement {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center">
      <div className="flex w-full items-center justify-between py-4 pb-72 sm:px-10">
        <div className="mx-auto flex w-full min-w-[600px] max-w-[1200px] flex-col items-center justify-between">
          <div className="flex w-full gap-4">
            <div className="w-1/2">
              <HiarcScheduleSection />
            </div>
            <div className="w-1/2">
              <NoticeListSection />
            </div>
          </div>
          <StudyListSection />
        </div>
      </div>
      <div
        className={cn(
          'pointer-events-auto sticky bottom-8 z-10',
          'mx-auto mb-4 flex w-full max-w-[1200px] justify-center sm:px-10'
        )}
      >
        <OnboardingButton />
      </div>
    </div>
  );
}
