import { PageLayout } from '@hiarc-platform/ui';
import { ManageTabSection } from '@/features/manage/components/manage-tab-section';
export default function ManagePage(): React.ReactElement {
  return (
    <PageLayout>
      <ManageTabSection />
    </PageLayout>
  );
}
