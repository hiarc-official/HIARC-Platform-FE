'use client';

import { Title, Button, PageLayout } from '@hiarc-platform/ui';
import SelectButtonSection from '@/features/components/announcement-section/select-button-section';
import { useRouter } from 'next/navigation';
import { AnnouncementTable } from '@/features/announcement/components/announcement-table';
import { announcementData } from 'constants/mock';

export default function AnnouncementPage(): React.ReactElement {
  const router = useRouter();

  return (
    <PageLayout>
      <div className="flex max-w-[1200px] flex-col ">
        <div className="mb-7  flex justify-between">
          <Title size="sm" weight="bold">
            공지사항
          </Title>
          <Button size="md" onClick={() => router.push('/announcement/write')}>
            작성하기
          </Button>
        </div>
        <SelectButtonSection />
        <AnnouncementTable className="mt-6" data={announcementData} />
      </div>
    </PageLayout>
  );
}
