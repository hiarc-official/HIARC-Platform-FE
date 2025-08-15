'use client';
import { AnnouncementWrite } from '@hiarc-platform/ui';
import { BackButton, Divider, PageLayout, DialogUtil, LoadingDots } from '@hiarc-platform/ui';
import { Title } from '@hiarc-platform/ui';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useAdminAnnouncement } from '@/features/announcement/hooks/use-admin-announcement';
import { useUpdateAdminAnnouncement } from '@/features/announcement/hooks/use-update-admin-announcement';
import { CreateAnnouncementRequest } from '@hiarc-platform/shared';

export default function EditAnnouncementPage(): React.ReactElement {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const { data: announcement, isLoading, error } = useAdminAnnouncement(id);
  const { mutate: updateAnnouncement } = useUpdateAdminAnnouncement();

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
            DialogUtil.showSuccess('공지사항이 성공적으로 수정되었습니다.', undefined, () => {
              router.back();
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

  return (
    <PageLayout>
      <div className="flex w-full flex-col items-center gap-6">
        <BackButton onClick={() => router.back()} />
        <div className="flex w-full items-center justify-between">
          <Title size="sm" weight="bold">
            공지사항 수정
          </Title>
        </div>
        <Divider variant="horizontal" size="full" />
      </div>
      <AnnouncementWrite announcementId={id} announcement={announcement} onSubmit={handleSubmit} />
    </PageLayout>
  );
}
