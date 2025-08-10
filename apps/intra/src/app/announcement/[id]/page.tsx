'use client';

import { AnnouncementContentSection } from '@/features/announcement/components/announcement-content-section';
import { AnnouncementIndicatorSection } from '@/features/announcement/components/announcement-indicator-section';
import { AnnouncementInfoSection } from '@/features/announcement/components/announcement-info-section';
import useAnnouncement from '@/features/announcement/hooks/use-announcement';
import { BackButton, Button, PageLayout } from '@hiarc-platform/ui';
import { useRouter, useParams } from 'next/navigation';

export default function AnnouncementDetail(): React.ReactElement {
  const router = useRouter();
  const params = useParams();
  const announcementId = String(params.id);

  const { data: announcement, isLoading, error } = useAnnouncement(announcementId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !announcement) {
    return <div>공지사항을 불러올 수 없습니다.</div>;
  }

  return (
    <PageLayout
      desktopChildren={
        <div className="flex flex-col items-center">
          <BackButton onClick={() => router.back()} />
          <AnnouncementInfoSection
            className="mt-6"
            announcementTitle={announcement.title}
            announcementCategory={announcement.category}
            announcementDate={announcement.createdAt}
          />
          <AnnouncementContentSection className="mt-8" content={announcement.content} />
          <AnnouncementIndicatorSection className="mt-8" />
          <Button
            variant="line"
            className="mt-8 w-[186px]"
            onClick={() => router.push('/announcement')}
          >
            목록으로
          </Button>
        </div>
      }
      mobileChildren={
        <div className="flex flex-col items-center">
          <AnnouncementInfoSection
            className="mt-6"
            announcementTitle={announcement.title}
            announcementCategory={announcement.category}
            announcementDate={announcement.createdAt}
          />
          <AnnouncementContentSection className="mt-8" content={announcement.content} />
          <AnnouncementIndicatorSection className="mt-8" />
          <Button
            variant="line"
            className="mt-8 w-[186px]"
            onClick={() => router.push('/announcement')}
          >
            목록으로
          </Button>
        </div>
      }
    />
  );
}
