import { useRouter, useSearchParams } from 'next/navigation';
import { useCreateAdminAnnouncement } from '@/features/announcement/hooks/use-create-admin-announcement';
import { CreateAnnouncementRequest } from '@hiarc-platform/shared';
import { useSemesterStoreInit, useSemesterStore } from '@/hooks/use-semester-store';
import { useStudyOptions } from '@/features/study/hooks';
import { DialogUtil } from '@hiarc-platform/ui';

export function useAnnouncementWritePageState() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate: createAnnouncement } = useCreateAdminAnnouncement();

  // Get query parameters
  const initialType = searchParams.get('type') as
    | 'GENERAL'
    | 'STUDY'
    | 'RATING'
    | 'ETC'
    | 'EXTERNAL'
    | null;
  const initialStudyId = searchParams.get('studyId');
  const isLecture = searchParams.get('isLecture') === 'true';

  // Initialize semester store and get study options
  useSemesterStoreInit();
  const { selectedSemesterId } = useSemesterStore();
  const { data: studyOptions = [] } = useStudyOptions(selectedSemesterId);

  const handleSubmit = (data: CreateAnnouncementRequest): void => {
    createAnnouncement(data, {
      onSuccess: () => {
        const successMessage =
          initialType === 'STUDY'
            ? '스터디 공지사항이 성공적으로 등록되었습니다.'
            : '공지사항이 성공적으로 등록되었습니다.';
        const redirectPath =
          initialType === 'STUDY' && initialStudyId ? `/study/${initialStudyId}` : '/announcement';

        DialogUtil.showSuccess(successMessage, () => {
          router.push(redirectPath);
        });
      },
      onError: (error) => {
        const errorMessage = error instanceof Error ? error.message : '등록에 실패했습니다.';
        DialogUtil.showError(errorMessage);
      },
    });
  };

  const handleBackClick = (): void => {
    router.back();
  };

  return {
    studyOptions,
    initialType: initialType || 'GENERAL',
    initialStudyId: initialStudyId ? Number(initialStudyId) : undefined,
    initialStudyAnnounceType: (isLecture ? '회차별 공지' : '일반') as '회차별 공지' | '일반',
    handleSubmit,
    handleBackClick,
  };
}