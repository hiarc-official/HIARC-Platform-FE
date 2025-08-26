import { AnnouncementDetailPage as AnnouncementDetailPageComponent } from '@/features/announcement/pages/announcement-detail-page';
import { PageLayout } from '@hiarc-platform/ui';

export default function AnnouncementDetailPage(): React.ReactElement {
  return (
    <PageLayout>
      <AnnouncementDetailPageComponent />
    </PageLayout>
  );
}
