'use client';

import { PageLayout } from '@hiarc-platform/ui';
import { DesktopStudyListPage, MobileStudyListPage } from '@/features/study/pages/study-list';

export default function StudyListPage(): React.ReactElement {
  return (
    <PageLayout
      desktopChildren={<DesktopStudyListPage />}
      mobileChildren={<MobileStudyListPage />}
    />
  );
}
