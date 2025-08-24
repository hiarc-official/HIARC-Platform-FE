import { PageLayout } from '@hiarc-platform/ui';
import { DesktopAwardListPage, MobileAwardListPage } from '@/features/award/pages/award-list-page';

export default function CompetitonListPage(): React.ReactElement {
  return (
    <PageLayout
      desktopChildren={<DesktopAwardListPage />}
      mobileChildren={<MobileAwardListPage />}
    />
  );
}
