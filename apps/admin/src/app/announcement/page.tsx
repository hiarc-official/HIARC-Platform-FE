import { AnnouncementListPage } from '@/features/announcement/pages/announcement-list-page';
import { PageLayout } from '@hiarc-platform/ui';

export default function AnnouncementPage(): React.ReactElement {
  return (
    <PageLayout>
      <AnnouncementListPage />
    </PageLayout>
  );
}
