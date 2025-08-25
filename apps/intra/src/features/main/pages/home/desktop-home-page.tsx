import { ServerScheduleSection } from '../../components/hiarc-schedule-section/server-schedule-section';
import { AnnouncementListSection } from '../../components/announcement-list-section';
import { StudyListSection } from '../../components/study-list-section';
import { ContentSection, TwoColumnLayout } from '@hiarc-platform/ui';

export async function DesktopHomePage(): Promise<React.ReactElement> {
  return (
    <ContentSection>
      <TwoColumnLayout
        left={<ServerScheduleSection daysToShow={7} />}
        right={<AnnouncementListSection />}
        bottom={<StudyListSection className="mt-10" />}
      />
    </ContentSection>
  );
}
