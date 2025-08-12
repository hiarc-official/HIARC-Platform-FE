'use client';

import { HiarcScheduleSection } from '@/features/main/components/hiarc-schedule-section';
import { AnnouncementListSection } from '@/features/main/components/announcement-list-section';
import { OnboardingButton } from '@/features/main/components/onboarding-button';
import { StudyListSection } from '@/features/main/components/study-list-section';
import {
  ContentSection,
  PageLayout,
  SingleColumnLayout,
  TwoColumnLayout,
} from '@hiarc-platform/ui';

export const metaData = {
  title: 'HIARC 플랫폼',
  description: 'HIARC 플랫폼에 오신 것을 환영합니다. 스터디와 공지사항을 확인하세요.',
};

export default function Home(): React.ReactElement {
  return (
    <PageLayout
      mobileChildren={
        <ContentSection>
          <SingleColumnLayout>
            <HiarcScheduleSection daysToShow={3} />
            <AnnouncementListSection className="mt-6" />
            <StudyListSection className="mt-6" />
          </SingleColumnLayout>
        </ContentSection>
      }
      desktopChildren={
        <ContentSection>
          <TwoColumnLayout
            left={<HiarcScheduleSection daysToShow={7} />}
            right={<AnnouncementListSection />}
            bottom={<StudyListSection className="mt-6" />}
          />
        </ContentSection>
      }
      stickyBottom={<OnboardingButton />}
    />
  );
}
