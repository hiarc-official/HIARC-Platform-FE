'use client';

import { HiarcScheduleSection } from '../../components/hiarc-schedule-section';
import { AnnouncementListSection } from '../../components/announcement-list-section';
import { StudyListSection } from '../../components/study-list-section';
import { ContentSection, SingleColumnLayout } from '@hiarc-platform/ui';

export function MobileHomePage(): React.ReactElement {
  return (
    <ContentSection>
      <SingleColumnLayout>
        <HiarcScheduleSection daysToShow={3} />
        <AnnouncementListSection className="mt-10" />
        <StudyListSection className="mt-10" />
      </SingleColumnLayout>
    </ContentSection>
  );
}
