'use client';

import { HiarcScheduleSection } from '@/features/main/components/hiarc-schedule-section';
import { NoticeListSection } from '@/features/main/components/notice-list-section';
import { OnboardingButton } from '@/features/main/components/onboarding-button';
import { StudyListSection } from '@/features/main/components/study-list-section';
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
