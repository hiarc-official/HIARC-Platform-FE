'use client';

import { PageLayout } from '@hiarc-platform/ui';
import { DesktopStudyDetailPage, MobileStudyDetailPage } from '@/features/study/pages/study-detail';

export default function StudyPage(): React.ReactElement {
  return (
    <PageLayout
      desktopChildren={<DesktopStudyDetailPage />}
      mobileChildren={<MobileStudyDetailPage />}
    />
  );
}
