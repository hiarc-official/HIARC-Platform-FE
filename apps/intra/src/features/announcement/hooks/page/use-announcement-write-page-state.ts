import { useRouter, useSearchParams } from 'next/navigation';
import { CreateAnnouncementRequest } from '@hiarc-platform/shared';
import { DialogUtil } from '@hiarc-platform/ui';
import { useSemesterStoreInit, useSemesterStore } from '@/hooks/use-semester-store';
import { useStudyOptions } from '@/features/study/hooks/use-study-options';
import useCreateStudyAnnouncement from '@/features/study/hooks/use-create-study-announcement';

export function useAnnouncementWritePageState() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate: createAnnouncement } = useCreateStudyAnnouncement();

  // Get query parameters
  const initialType = searchParams.get('type') as
    | 'GENERAL'
    | 'STUDY'
    | 'RATING'
    | 'ETC'
    | 'EXTERNAL'
    | null;
  const initialStudyId = searchParams.get('studyId');
  const semesterId = searchParams.get('semesterId');
  const isLecture = searchParams.get('isLecture') === 'true';

  // Initialize semester store and get study options
  useSemesterStoreInit();
  const { selectedSemesterId } = useSemesterStore();
  const targetSemesterId = semesterId ? Number(semesterId) : selectedSemesterId;
  const { data: studyOptions = [] } = useStudyOptions(Number(targetSemesterId));

  const handleSubmit = (data: CreateAnnouncementRequest): void => {
    const mutationData = initialStudyId
      ? { studyId: Number(initialStudyId), announcementData: data }
      : data;

    createAnnouncement(mutationData, {
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
      onError: (error: Error) => {
        const errorMessage = error instanceof Error ? error.message : '등록에 실패했습니다.';
        DialogUtil.showError(errorMessage);
      },
    });
  };

  const handleGoBack = (): void => {
    router.back();
  };

  return {
    studyOptions,
    initialType: initialType || 'GENERAL',
    initialStudyId: initialStudyId ? Number(initialStudyId) : undefined,
    initialStudyAnnounceType: (isLecture ? '회차별 공지' : '일반') as "일반" | "회차별 공지",
    handleSubmit,
    handleGoBack,
  };
}