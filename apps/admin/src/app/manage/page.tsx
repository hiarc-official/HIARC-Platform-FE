import { PageLayout } from '@hiarc-platform/ui';
import { DesktopManagePage, MobileManagePage } from '@/features/member/pages/manage-page';

export default function ManagePage(): React.ReactElement {
  return (
    <PageLayout
      desktopChildren={<DesktopManagePage />}
      mobileChildren={<MobileManagePage />}
    />
  );
}
