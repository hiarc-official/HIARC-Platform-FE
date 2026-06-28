import { AdminPage } from '@/features/member/pages/admin-page';
import { PageLayout } from '@hiarc-platform/design-system';

export default function AdminPageRoute(): React.ReactElement {
  return (
    <PageLayout>
      <AdminPage />
    </PageLayout>
  );
}
