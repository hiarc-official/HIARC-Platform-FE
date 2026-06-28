'use client';

import {
  SkeletonTransition,
  BackButton,
  Button,
  DetailPageSkeleton,
  useMinimumLoading,
} from '@hiarc-platform/design-system';
import { StudyInfoSection } from '@hiarc-platform/domain';
import { useStudyDetailPageState } from '@/features/study/hooks/page/use-study-detail-page-state';
import { TabSection } from '@/features/study/components/tab-section/TabSection';

export function DesktopStudyDetailPage(): React.ReactElement {
  const {
    studyId,
    studyData,
    isLoading,
    error,
    mounted,
    handleEditClick,
    handleApplyClick,
    handleBackClick,
    handleListClick,
  } = useStudyDetailPageState();

  const showSkeleton = useMinimumLoading(!mounted || isLoading);

  if (error || !studyData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">스터디 정보를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <SkeletonTransition loading={showSkeleton} skeleton={<DetailPageSkeleton />}>
      <div className="flex flex-col">
        <BackButton onClick={handleBackClick} />
        <StudyInfoSection
          className="pt-5"
          studyData={studyData}
          onEditClick={handleEditClick}
          onApplyClick={handleApplyClick}
        />
        <TabSection
          className="pt-8"
          studyName={studyData?.name ?? ''}
          isStudent={studyData?.isStudent ?? false}
          isAdmin={studyData?.isInstructor ?? false}
          studyId={studyId}
          semesterId={studyData?.semesterId ?? 1}
          isGroupStudy={studyData?.isGroupStudy ?? false}
        />
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button variant="line" className="w-[186px]" onClick={handleListClick}>
            목록으로
          </Button>
        </div>
      </div>
    </SkeletonTransition>
  );
}
