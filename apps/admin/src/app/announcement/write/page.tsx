'use client';
import AnnouncementWrite from '@/features/components/announcement-write-section';
import { BackButton, Divider, PageLayout } from '@hiarc-platform/ui';
import { Title } from '@hiarc-platform/ui';
import { useRouter } from 'next/navigation';

export default function WriteAnnouncementPage(): React.ReactElement {
  const router = useRouter();

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
      <AnnouncementWrite />
    </PageLayout>
  );
}
