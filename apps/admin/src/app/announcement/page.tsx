'use client';

import { Title, Button, PageLayout } from '@hiarc-platform/ui';
import SelectButtonSection from '@/features/components/announcement-section/select-button-section';
import { useRouter } from 'next/navigation';
import { AnnouncementTable } from '@/features/announcement/components/announcement-table';
import { useAdminAnnouncements } from '@/features/announcement/hooks';

export default function AnnouncementPage(): React.ReactElement {
  const router = useRouter();
  const { data: announcementsData, isLoading, error } = useAdminAnnouncements({
    page: 0,
    size: 20,
    sort: 'createdAt,desc',
  });

  const announcements = announcementsData?.content || [];

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
        {isLoading ? (
          <div className="mt-6 text-center">Loading...</div>
        ) : error ? (
          <div className="mt-6 text-center text-red-500">
            공지사항을 불러오는 중 오류가 발생했습니다.
          </div>
        ) : (
          <AnnouncementTable className="mt-6" data={announcements} />
        )}
      </div>
    </PageLayout>
  );
}
