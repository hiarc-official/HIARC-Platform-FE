'use client';

import { PageLayout } from '@hiarc-platform/ui';
import React from 'react';
import { StudyEditPage } from '@/features/study/pages/study-edit-page/study-edit-page';

export default function EditStudyPage(): React.ReactElement {
  return (
    <PageLayout>
      <StudyEditPage />
    </PageLayout>
  );
}
