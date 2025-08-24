import { PageLayout } from '@hiarc-platform/ui';
import { DesktopAnnouncementEditPage, MobileAnnouncementEditPage } from '@/features/announcement/pages/announcement-edit-page';

export default function EditAnnouncementPage(): React.ReactElement {
  return (
    <PageLayout
      desktopChildren={<DesktopAnnouncementEditPage />}
      mobileChildren={<MobileAnnouncementEditPage />}
    />
  );
}
