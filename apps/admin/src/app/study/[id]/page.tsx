'use client';

import { StudyInfoSection } from '@/features/study/components/study-info-section';
import { TabSection } from '@/features/study/components/tab-section';
import { BackButton, Button, PageLayout, SingleColumnLayout } from '@hiarc-platform/ui';
import { useRouter, useParams } from 'next/navigation';
import { useStudy } from '@/features/study/hooks';
import React, { useState, useEffect } from 'react';

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
        <SingleColumnLayout>
          <div className="flex justify-center items-center h-64">
            <div>로딩 중...</div>
          </div>
        </SingleColumnLayout>
      </PageLayout>
    );
  }

  if (error || !studyData) {
    return (
      <PageLayout>
        <SingleColumnLayout>
          <BackButton onClick={() => router.back()} />
          <div className="flex justify-center items-center h-64">
            <div>스터디 정보를 불러오는 중 오류가 발생했습니다.</div>
          </div>
        </SingleColumnLayout>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <SingleColumnLayout>
        <BackButton onClick={() => router.back()} />
        <StudyInfoSection className="pt-5" studyData={studyData.data} />
        <TabSection className="pt-8" isAdmin={true} />
        <Button variant="line" className="mt-8 w-[186px]" onClick={() => router.push('/study')}>
          목록으로
        </Button>
      </SingleColumnLayout>
    </PageLayout>
  );
}
