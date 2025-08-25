'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCreateAdminAnnouncement } from '@/features/announcement/hooks/use-create-admin-announcement';
import { CreateAnnouncementRequest } from '@hiarc-platform/shared';
import { useSemesterStoreInit, useSemesterStore } from '@/shared/hooks/use-semester-store';
import { useStudyOptions } from '@/features/study/hooks';
import { BackButton, Divider, Title, AnnouncementWrite, DialogUtil } from '@hiarc-platform/ui';

export function AnnouncementWritePage(): React.ReactElement {
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
  const { data: studyOptions = [] } = useStudyOptions(Number(selectedSemesterId));

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
        DialogUtil.showServerError(error);
      },
    });
  };

  const handleBackClick = (): void => {
    router.back();
  };

  return (
    <div className="w-full">
      {/* Desktop layout */}
      <div className="hidden md:block">
        <div className="flex w-full flex-col items-center gap-6">
          <BackButton onClick={handleBackClick} />
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
          initialStudyAnnounceType={(isLecture ? '회차별 공지' : '일반') as '회차별 공지' | '일반'}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Mobile layout */}
      <div className="block md:hidden px-4">
        <div className="flex w-full flex-col items-center gap-4">
          <BackButton onClick={handleBackClick} />
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
          initialStudyAnnounceType={(isLecture ? '회차별 공지' : '일반') as '회차별 공지' | '일반'}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}