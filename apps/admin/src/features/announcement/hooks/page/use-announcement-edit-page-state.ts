import { useRouter, useParams } from 'next/navigation';
import { useAdminAnnouncement } from '@/features/announcement/hooks/use-admin-announcement';
import { useUpdateAdminAnnouncement } from '@/features/announcement/hooks/use-update-admin-announcement';
import { CreateAnnouncementRequest } from '@hiarc-platform/shared';
import { useStudyOptions } from '@/features/study/hooks';
import { useSemesterStoreInit, useSemesterStore } from '@/hooks/use-semester-store';
import { DialogUtil } from '@hiarc-platform/ui';

export function useAnnouncementEditPageState() {
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
            const errorMessage = error instanceof Error ? error.message : '수정에 실패했습니다.';
            DialogUtil.showError(errorMessage);
          },
        }
      );
    }
  };

  const handleBackClick = (): void => {
    if (announcement?.studyId) {
      router.push(`/study/${announcement.studyId}`);
    } else {
      router.back();
    }
  };

  // 스터디 정보가 있으면 스터디 강의로 처리
  const isLecture = announcement?.studyId && announcement?.lectureRound;
  const pageTitle = isLecture
    ? `${announcement?.studyName} - ${announcement?.lectureRound}회차 강의 수정`
    : '공지사항 수정';

  return {
    id,
    announcement,
    isLoading,
    error,
    studyOptions: studyOptions || [],
    isLecture,
    pageTitle,
    handleSubmit,
    handleBackClick,
  };
}