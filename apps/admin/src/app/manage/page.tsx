import { ManagePage } from '@/features/member/pages/manage-page';
import { PageLayout } from '@hiarc-platform/design-system';

export default function ManagePageRoute(): React.ReactElement {
  return (
    <PageLayout>
      <ManagePage />
    </PageLayout>
  );
}
