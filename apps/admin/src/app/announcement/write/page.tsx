import { PageLayout } from '@hiarc-platform/ui';
import { DesktopAnnouncementWritePage, MobileAnnouncementWritePage } from '@/features/announcement/pages/announcement-write-page';

export default function WriteAnnouncementPage(): React.ReactElement {
  return (
    <PageLayout
      desktopChildren={<DesktopAnnouncementWritePage />}
      mobileChildren={<MobileAnnouncementWritePage />}
    />
  );
}
