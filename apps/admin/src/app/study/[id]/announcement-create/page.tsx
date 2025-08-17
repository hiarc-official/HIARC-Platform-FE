'use client';

import { useParams, useRouter } from 'next/navigation';
import { Label, Title, AnnouncementWrite } from '@hiarc-platform/ui';
import { CreateAnnouncementRequest } from '@hiarc-platform/shared';
import { announcementApi } from '@/features/announcement/api/announcement';
import { DialogUtil } from '@hiarc-platform/ui';
import { useSemesterStoreInit, useSemesterStore } from '@/hooks/use-semester-store';
import { useStudyOptions } from '@/features/study/hooks';

export default function StudyAnnouncementCreatePage(): React.ReactElement {
  const params = useParams();
  const router = useRouter();
  const studyId = typeof params.id === 'string' ? Number(params.id) : undefined;

  // Initialize semester store and get study options
  useSemesterStoreInit();
  const { selectedSemesterId } = useSemesterStore();
  const { data: studyOptions = [] } = useStudyOptions(selectedSemesterId);

  const handleSubmit = async (
    data: CreateAnnouncementRequest,
    isEditMode: boolean,
    announcementId?: number
  ): Promise<void> => {
    try {
      console.log('Creating study announcement:', data);

      await announcementApi.CREATE_ADMIN_ANNOUNCEMENT(data);

      DialogUtil.showSuccess('스터디 공지사항이 성공적으로 생성되었습니다.', undefined, () => {
        router.push(`/study/${studyId}`);
      });
    } catch (error) {
      console.error('스터디 공지사항 생성 실패:', error);
      DialogUtil.showError('스터디 공지사항 생성에 실패했습니다.');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6">
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-6">
        <button
          className="flex cursor-pointer items-center self-start rounded-md p-2 transition-colors hover:bg-gray-50"
          onClick={() => router.push(`/study/${studyId}`)}
        >
          <Label size="md" className="cursor-pointer text-gray-700">
            ← 뒤로가기
          </Label>
        </button>

        <div className="flex w-full items-center justify-between">
          <Title size="sm" weight="bold">
            스터디 공지사항 작성
          </Title>
        </div>

        <div className="h-px w-full bg-gray-700"></div>

        <div className="w-full">
          <AnnouncementWrite
            initialAnnouncementType="STUDY"
            initialStudyId={studyId}
            studyOptions={studyOptions}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </main>
  );
}
