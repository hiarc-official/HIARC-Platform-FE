'use client';

import { BackButton, Divider, PageLayout, DialogUtil } from '@hiarc-platform/ui';
import { Title } from '@hiarc-platform/ui';
import { useRouter, useSearchParams } from 'next/navigation';

import { CreateAnnouncementRequest } from '@hiarc-platform/shared';
import { AnnouncementWrite } from '@hiarc-platform/ui';
import { useSemesterStoreInit, useSemesterStore } from '@/hooks/use-semester-store';
import { useStudyOptions } from '@/features/study/hooks/use-study-options';
import useCreateStudyAnnouncement from '@/features/study/hooks/use-create-study-announcement';

export default function WriteAnnouncementPage(): React.ReactElement {
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

        DialogUtil.showSuccess(successMessage, undefined, () => {
          router.push(redirectPath);
        });
      },
      onError: (error: Error) => {
        const errorMessage = error instanceof Error ? error.message : '등록에 실패했습니다.';
        DialogUtil.showError(errorMessage);
      },
    });
  };

  return (
    <PageLayout>
      <div className="flex w-full flex-col items-center gap-6">
        <BackButton onClick={() => router.back()} />
        <div className="flex w-full items-center justify-between">
          <Title size="sm" weight="bold">
            공지사항 작성
          </Title>
        </div>
        <Divider variant="horizontal" size="full" />
      </div>
      <AnnouncementWrite
        studyOptions={studyOptions}
        initialAnnouncementType={initialType || 'GENERAL'}
        initialStudyId={initialStudyId ? Number(initialStudyId) : undefined}
        initialStudyAnnounceType={isLecture ? '회차별 공지' : '일반'}
        disableCategoryChange={true}
        disableStudyTypeChange={true}
        onSubmit={handleSubmit}
      />
    </PageLayout>
  );
}
