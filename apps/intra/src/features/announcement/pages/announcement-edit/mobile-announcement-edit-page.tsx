'use client';

import { AnnouncementWrite } from '@hiarc-platform/domain';
import { SkeletonTransition, FormSkeleton, useMinimumLoading } from '@hiarc-platform/design-system';
import { useAnnouncementEditPageState } from '../../hooks/page/use-announcement-edit-page-state';

export function MobileAnnouncementEditPage(): React.ReactElement {
  const { id, studyId, announcement, studyOptions, isLoading, error, handleSubmit } =
    useAnnouncementEditPageState();

  const showSkeleton = useMinimumLoading(isLoading);

  // 로딩 중일 때
  // 에러가 발생했을 때
  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-red-500">공지사항을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  return (
    <SkeletonTransition loading={showSkeleton} skeleton={<FormSkeleton />}>
      <div className="flex w-full flex-col gap-4">
        <AnnouncementWrite
          announcementId={id}
          initialStudyId={studyId}
          announcement={announcement}
          studyOptions={studyOptions}
          disableCategoryChange={true}
          disableStudyTypeChange={true}
          onSubmit={handleSubmit}
        />
      </div>
    </SkeletonTransition>
  );
}
