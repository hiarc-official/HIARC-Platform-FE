'use client';
import { AnnouncementWrite } from '@hiarc-platform/ui';
import { BackButton, Divider, PageLayout, DialogUtil, LoadingDots } from '@hiarc-platform/ui';
import { Title, Label } from '@hiarc-platform/ui';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useAdminAnnouncement } from '@/features/announcement/hooks/use-admin-announcement';
import { useUpdateAdminAnnouncement } from '@/features/announcement/hooks/use-update-admin-announcement';
import { CreateAnnouncementRequest } from '@hiarc-platform/shared';
import { useStudyOptions } from '@/features/study/hooks';
import { useSemesterStoreInit, useSemesterStore } from '@/hooks/use-semester-store';

export default function EditAnnouncementPage(): React.ReactElement {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const { data: announcement, isLoading, error } = useAdminAnnouncement(id);
  const { mutate: updateAnnouncement } = useUpdateAdminAnnouncement();

  // 스터디 옵션을 위한 semester store 초기화
  useSemesterStoreInit();
  const { getSelectedSemester } = useSemesterStore();
  const { data: studyOptions } = useStudyOptions(getSelectedSemester()?.semesterId?.toString());

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
            DialogUtil.showSuccess('강의가 성공적으로 수정되었습니다.', undefined, () => {
              // 스터디 상세 페이지로 이동
              if (announcement?.studyId) {
                router.push(`/study/${announcement.studyId}`);
              } else {
                router.back();
              }
            });
          },
          onError: (error) => {
            const errorMessage = error instanceof Error ? error.message : '수정에 실패했습니다.';
            DialogUtil.showError(errorMessage);
          },
        }
      );
    }
  };

  // 로딩 중일 때
  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex min-h-[400px] items-center justify-center">
          <LoadingDots />
        </div>
      </PageLayout>
    );
  }

  // 에러가 발생했을 때
  if (error) {
    return (
      <PageLayout>
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-red-500">공지사항을 불러오는데 실패했습니다.</p>
        </div>
      </PageLayout>
    );
  }

  // 스터디 정보가 있으면 스터디 강의로 처리
  const isLecture = announcement?.studyId && announcement?.lectureRound;
  const pageTitle = isLecture
    ? `${announcement?.studyName} - ${announcement?.lectureRound}회차 강의 수정`
    : '공지사항 수정';

  return (
    <PageLayout>
      <div className="flex w-full flex-col items-center gap-6">
        <BackButton
          onClick={() => {
            if (announcement?.studyId) {
              router.push(`/study/${announcement.studyId}`);
            } else {
              router.back();
            }
          }}
        />
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
    </PageLayout>
  );
}
