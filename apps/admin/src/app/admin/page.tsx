import { PageLayout } from '@hiarc-platform/ui';
import { DesktopAdminPage, MobileAdminPage } from '@/features/member/pages/admin-page';

export default function AdminPage(): React.ReactElement {
  return (
    <PageLayout
      desktopChildren={<DesktopAdminPage />}
      mobileChildren={<MobileAdminPage />}
    />
  );
}
