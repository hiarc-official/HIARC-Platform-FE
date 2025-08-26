import { StudyListPage } from '@/features/study/pages/study-list-page';
import { PageLayout } from '@hiarc-platform/ui';

export default function StudyPage(): React.ReactElement {
  return (
    <PageLayout>
      <StudyListPage />
    </PageLayout>
  );
}
