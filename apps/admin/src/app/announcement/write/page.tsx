'use client';

import { BackButton, Divider, PageLayout, DialogUtil } from '@hiarc-platform/ui';
import { Title } from '@hiarc-platform/ui';
import { useRouter } from 'next/navigation';
import { useCreateAdminAnnouncement } from '@/features/announcement/hooks/use-create-admin-announcement';
import { CreateAnnouncementRequest } from '@hiarc-platform/shared';
import { AnnouncementWrite } from '@hiarc-platform/ui';

export default function WriteAnnouncementPage(): React.ReactElement {
  const router = useRouter();
  const { mutate: createAnnouncement } = useCreateAdminAnnouncement();

  const handleSubmit = (data: CreateAnnouncementRequest): void => {
    createAnnouncement(data, {
      onSuccess: () => {
        DialogUtil.showSuccess('공지사항이 성공적으로 등록되었습니다.', undefined, () => {
          router.back();
        });
      },
      onError: (error) => {
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
      <AnnouncementWrite onSubmit={handleSubmit} />
    </PageLayout>
  );
}
