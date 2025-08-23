'use client';

import { HiarcScheduleSection } from '../../components/hiarc-schedule-section';
import { AnnouncementListSection } from '../../components/announcement-list-section';
import { OnboardingButton } from '../../components/onboarding-button';
import { StudyListSection } from '../../components/study-list-section';
import { useHomePageState } from '../../hooks/page/use-home-page-state';
import {
  ContentSection,
  SingleColumnLayout,
} from '@hiarc-platform/ui';

export function MobileHomePage(): React.ReactElement {
  const { isAuthenticated } = useHomePageState();

  return (
    <>
      <ContentSection>
        <SingleColumnLayout>
          <HiarcScheduleSection daysToShow={3} />
          <AnnouncementListSection className="mt-6" />
          <StudyListSection className="mt-6" />
        </SingleColumnLayout>
      </ContentSection>
      {!isAuthenticated && <OnboardingButton />}
    </>
  );
}