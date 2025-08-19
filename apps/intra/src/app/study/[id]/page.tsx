'use client';

import { BackButton, Button, PageLayout, LoadingDots } from '@hiarc-platform/ui';
import { useRouter, useParams } from 'next/navigation';
import useStudy from '@/features/study/hooks/use-study';
import React, { useState, useEffect } from 'react';
import { StudyInfoSection } from '@/features/study/components/study-info-section';
import { TabSection } from '@/features/study/components/tab-section';

export default function StudyPage(): React.ReactElement {
  const router = useRouter();
  const params = useParams();
  const studyId = Number(params.id);
  const { data: studyData, isLoading, error } = useStudy(studyId);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <PageLayout>
        <div className="flex min-h-screen items-center justify-center">
          <LoadingDots size="lg" />
        </div>
      </PageLayout>
    );
  }

  if (error || !studyData) {
    return (
      <PageLayout>
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-gray-500">스터디 정보를 불러오는 중 오류가 발생했습니다.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="flex flex-col">
        <BackButton onClick={() => router.back()} />
        <StudyInfoSection className="pt-5" studyData={studyData} />
        <TabSection className="pt-8" isAdmin={false} studyId={studyId} />
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button variant="line" className="w-[186px]" onClick={() => router.push('/study')}>
            목록으로
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
