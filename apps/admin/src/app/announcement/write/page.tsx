import { AnnouncementWritePage } from '@/features/announcement/pages/announcement-write-page';
import { PageLayout } from '@hiarc-platform/ui';

export default function WriteAnnouncementPage(): React.ReactElement {
  return (
    <PageLayout>
      <AnnouncementWritePage />
    </PageLayout>
  );
}
