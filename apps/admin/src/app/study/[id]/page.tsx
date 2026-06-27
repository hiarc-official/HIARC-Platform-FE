'use client';

import { TabSection } from '@/features/study/components';
import { BackButton, Button, PageLayout, DetailPageSkeleton, useMinimumLoading } from '@hiarc-platform/design-system';
import { StudyInfoSection } from '@hiarc-platform/domain';
import { useRouter, useParams } from 'next/navigation';
import { useStudy } from '@/features/study/hooks';
import React, { useState, useEffect } from 'react';
import { FadeIn } from '@hiarc-platform/design-system';

export default function StudyPage(): React.ReactElement {
  const router = useRouter();
  const params = useParams();
  const studyId = Number(params.id);
  const { data: studyData, isLoading, error } = useStudy(studyId);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showSkeleton = useMinimumLoading(!mounted || isLoading);

  if (showSkeleton) {
    return (
      <PageLayout>
        <DetailPageSkeleton className="mt-5 md:mt-0" />
      </PageLayout>
    );
  }

  if (error || !studyData) {
    return (
      <FadeIn
        isVisible={true}
        duration={0.3}
        className="flex min-h-screen items-center justify-center"
      >
        <p className="text-gray-500">스터디 정보를 불러오는 중 오류가 발생했습니다.</p>
      </FadeIn>
    );
  }

  const contentComponent = (
    <FadeIn isVisible={Boolean(studyData)} duration={0.4} className="mt-5 flex flex-col md:mt-0">
      <BackButton onClick={() => router.back()} className="hidden md:flex" />
      <StudyInfoSection
        className="pt-5"
        isAdmin={true}
        studyData={studyData}
        onEditClick={() => router.push(`/study/${studyId}/edit`)}
      />
      <TabSection
        className="pt-8"
        isAdmin={true}
        studyName={studyData?.name ?? ''}
        studyId={studyId}
        isGroupStudy={studyData?.isGroupStudy ?? false}
      />
      <div className="mt-8 flex items-center justify-center gap-4">
        <Button variant="line" className="w-[186px]" onClick={() => router.push('/study')}>
          목록으로
        </Button>
      </div>
    </FadeIn>
  );

  return <PageLayout>{contentComponent}</PageLayout>;
}
