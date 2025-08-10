'use client';

import { AnnouncementSearchSection } from '@/features/announcement/components/announcement-search-section';
import { AnnouncementTable } from '@/features/announcement/components/announcement-table';
import useAnnouncements from '@/features/announcement/hooks/use-announcements';
import { PageLayout, Title } from '@hiarc-platform/ui';

export default function AnnouncementList(): React.ReactElement {
  const {
    data: announcements,
    isLoading,
    error,
  } = useAnnouncements({
    page: 0,
    size: 10,
    announcementType: 'STUDY',
    semesterId: 0,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>공지사항을 불러올 수 없습니다.</div>;
  }
  return (
    <PageLayout>
      <Title size="sm" weight="bold">
        공지사항
      </Title>
      <AnnouncementSearchSection className="mt-6" />
      <AnnouncementTable className="mt-8" data={announcements?.content || []} />
    </PageLayout>
  );
}
