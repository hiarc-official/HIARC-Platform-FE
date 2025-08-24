import { PageLayout } from '@hiarc-platform/ui';
import { DesktopAnnouncementListPage, MobileAnnouncementListPage } from '@/features/announcement/pages/announcement-list-page';

export default function AnnouncementPage(): React.ReactElement {
  return (
    <PageLayout
      desktopChildren={<DesktopAnnouncementListPage />}
      mobileChildren={<MobileAnnouncementListPage />}
    />
  );
}
