import { PageLayout } from '@hiarc-platform/ui';
import { DesktopStudyListPage, MobileStudyListPage } from '@/features/study/pages/study-list-page';

export default function StudyPage(): React.ReactElement {
  return (
    <PageLayout
      desktopChildren={<DesktopStudyListPage />}
      mobileChildren={<MobileStudyListPage />}
    />
  );
}
