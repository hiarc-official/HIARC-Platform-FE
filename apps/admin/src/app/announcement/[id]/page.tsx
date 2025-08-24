import { PageLayout } from '@hiarc-platform/ui';
import { DesktopAnnouncementDetailPage, MobileAnnouncementDetailPage } from '@/features/announcement/pages/announcement-detail-page';

export default function AnnouncementDetailPage(): React.ReactElement {
  return (
    <PageLayout
      desktopChildren={<DesktopAnnouncementDetailPage />}
      mobileChildren={<MobileAnnouncementDetailPage />}
    />
  );
}
