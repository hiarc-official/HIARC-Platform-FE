'use client';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useAdminAnnouncement } from '@/features/announcement/hooks/use-admin-announcement';
import { useUpdateAdminAnnouncement } from '@/features/announcement/hooks/use-update-admin-announcement';
import { CreateAnnouncementRequest } from '@hiarc-platform/shared';
import { useStudyOptions } from '@/features/study/hooks';
import { useSemesterStoreInit } from '@/shared/hooks/use-semester-store';
import { 
  AnnouncementWrite, 
  BackButton, 
  Divider, 
  LoadingDots, 
  Title, 
  Label,
  DialogUtil 
} from '@hiarc-platform/ui';

export function AnnouncementEditPage(): React.ReactElement {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const id = Number(params.id);
  const studyId = Number(searchParams.get('studyId')) || 0;
  const { data: announcement, isLoading, error } = useAdminAnnouncement(id);
  const { mutate: updateAnnouncement } = useUpdateAdminAnnouncement();

  // 스터디 옵션을 위한 semester store 초기화
  useSemesterStoreInit();
  const { data: studyOptions } = useStudyOptions(announcement?.semesterId);

  const handleSubmit = (
    data: CreateAnnouncementRequest,
    isEditMode: boolean,
    announcementId?: number
  ): void => {
    if (announcementId) {
      updateAnnouncement(
        { id: announcementId, data },
        {
          onSuccess: () => {
            DialogUtil.showSuccess('강의가 성공적으로 수정되었습니다.', () => {
              // 스터디 상세 페이지로 이동
              if (announcement?.studyId) {
                router.push(`/study/${announcement.studyId}`);
              } else {
                router.back();
              }
            });
          },
          onError: (error) => {
            DialogUtil.showServerError(error);
          },
        }
      );
    }
  };

  const handleBackClick = (): void => {
    const targetStudyId = studyId || announcement?.studyId;
    if (targetStudyId) {
      router.push(`/study/${targetStudyId}`);
    } else {
      router.back();
    }
  };

  // 스터디 정보가 있으면 스터디 강의로 처리
  const isLecture = announcement?.studyId && announcement?.lectureRound;
  const pageTitle = isLecture
    ? `${announcement?.studyName} - ${announcement?.lectureRound}회차 강의 수정`
    : '공지사항 수정';

  // 로딩 중일 때
  if (isLoading) {
    return (
      <>
        {/* Desktop loading */}
        <div className="hidden md:flex min-h-[400px] items-center justify-center">
          <LoadingDots />
        </div>
        {/* Mobile loading */}
        <div className="flex md:hidden min-h-[400px] items-center justify-center px-4">
          <LoadingDots />
        </div>
      </>
    );
  }

  // 에러가 발생했을 때
  if (error) {
    return (
      <>
        {/* Desktop error */}
        <div className="hidden md:flex min-h-[400px] items-center justify-center">
          <p className="text-red-500">공지사항을 불러오는데 실패했습니다.</p>
        </div>
        {/* Mobile error */}
        <div className="flex md:hidden min-h-[400px] items-center justify-center px-4">
          <p className="text-red-500 text-sm text-center">공지사항을 불러오는데 실패했습니다.</p>
        </div>
      </>
    );
  }

  return (
    <div className="w-full">
      {/* Desktop layout */}
      <div className="hidden md:block">
        <div className="flex w-full flex-col items-center gap-6">
          <BackButton onClick={handleBackClick} />
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full items-center justify-between">
              <Title size="sm" weight="bold">
                {pageTitle}
              </Title>
            </div>
            {isLecture && (
              <div className="flex items-center gap-4">
                <Label size="md" className="text-gray-600">
                  스터디: {announcement?.studyName}
                </Label>
                <Label size="md" className="text-gray-600">
                  회차: {announcement?.lectureRound}회차
                </Label>
              </div>
            )}
          </div>
          <Divider variant="horizontal" size="full" />
        </div>
        <AnnouncementWrite
          announcementId={id}
          announcement={announcement}
          studyOptions={studyOptions || []}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Mobile layout */}
      <div className="block md:hidden px-4">
        <div className="flex w-full flex-col items-center gap-4">
          <BackButton onClick={handleBackClick} />
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full items-center justify-between">
              <Title size="sm" weight="bold">
                {pageTitle}
              </Title>
            </div>
            {isLecture && (
              <div className="flex flex-col gap-1">
                <Label size="sm" className="text-gray-600">
                  스터디: {announcement?.studyName}
                </Label>
                <Label size="sm" className="text-gray-600">
                  회차: {announcement?.lectureRound}회차
                </Label>
              </div>
            )}
          </div>
          <Divider variant="horizontal" size="full" />
        </div>
        <AnnouncementWrite
          announcementId={id}
          announcement={announcement}
          studyOptions={studyOptions || []}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}