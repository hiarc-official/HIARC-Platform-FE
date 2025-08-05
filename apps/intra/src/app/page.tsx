'use client';

import { HiarcScheduleSection } from '@/features/main/presentation/components/hiarc-schedule-section';
import { NoticeListSection } from '@/features/main/presentation/components/notice-list-section';
import { OnboardingButton } from '@/features/main/presentation/components/onboarding-button';
import { StudyListSection } from '@/features/main/presentation/components/study-list-section';
import {
  ContentSection,
  PageLayout,
  SingleColumnLayout,
  TwoColumnLayout,
} from '@hiarc-platform/ui';

export default function Home(): React.ReactElement {
  return (
    <PageLayout
      mobileChildren={
        <ContentSection>
          <SingleColumnLayout>
            <HiarcScheduleSection daysToShow={3} />
            <NoticeListSection className="mt-6" />
            <StudyListSection className="mt-6" />
          </SingleColumnLayout>
        </ContentSection>
      }
      desktopChildren={
        <ContentSection>
          <TwoColumnLayout
            left={<HiarcScheduleSection daysToShow={7} />}
            right={<NoticeListSection />}
            bottom={<StudyListSection className="mt-6" />}
          />
        </ContentSection>
      }
      stickyBottom={<OnboardingButton />}
    />
  );
}
