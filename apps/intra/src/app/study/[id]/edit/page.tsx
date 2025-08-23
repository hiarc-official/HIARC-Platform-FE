'use client';

import { PageLayout } from '@hiarc-platform/ui';
import { DesktopStudyEditPage, MobileStudyEditPage } from '@/features/study/pages/study-edit';

export default function EditStudyPage(): React.ReactElement {
  return (
    <PageLayout
      desktopChildren={<DesktopStudyEditPage />}
      mobileChildren={<MobileStudyEditPage />}
    />
  );
}
