'use client';

import { PageLayout } from '@hiarc-platform/ui';
import { StudyEditPage } from '@/features/study/pages';
import React from 'react';

export default function EditStudyPage(): React.ReactElement {
  return (
    <PageLayout>
      <StudyEditPage />
    </PageLayout>
  );
}
