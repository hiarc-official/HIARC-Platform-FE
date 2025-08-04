'use client';

import { StudyInfoSection } from '@/features/study/components/study-info-section';
import { TabSection } from '@/features/study/components/tab-section';
import { BackButton, Button, PageLayout, SingleColumnLayout } from '@hiarc-platform/ui';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function StudyPage(): React.ReactElement {
  const router = useRouter();

  return (
    <PageLayout>
      <SingleColumnLayout>
        <BackButton onClick={() => router.back()} />
        <StudyInfoSection className="pt-5" />
        <TabSection className="pt-8" isAdmin={true} />
        <Button variant="line" className="mt-8 w-[186px]">
          메인으로
        </Button>
      </SingleColumnLayout>
    </PageLayout>
  );
}
