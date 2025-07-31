'use client';

import { StudyInfoSection } from '@/features/study/presentation/study-info-section';
import { TabSection } from '@/features/study/presentation/tab-section';
import { BackButton, Button } from '@hiarc-platform/ui';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function StudyPage(): React.ReactElement {
  const router = useRouter();

  return (
    <div className="flex w-full items-center justify-between border-b border-gray-200  py-4 sm:px-10">
      <div className="mx-auto flex w-full min-w-[600px] max-w-[1200px] flex-col items-center justify-between">
        <BackButton onClick={() => router.back()} />
        <StudyInfoSection className="pt-5" />
        <TabSection className="pt-8" isAdmin={true} />
        <Button variant="line" className="mt-8 w-[186px]">
          메인으로
        </Button>
      </div>
    </div>
  );
}
