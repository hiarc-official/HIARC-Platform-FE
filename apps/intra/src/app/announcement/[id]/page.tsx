'use client';

import useAnnouncement from '@/features/announcement/hooks/use-announcement';
import {
  AnnouncementContentSection,
  AnnouncementIndicatorSection,
  AnnouncementInfoSection,
  BackButton,
  Button,
  PageLayout,
} from '@hiarc-platform/ui';
import { useRouter, useParams } from 'next/navigation';

function mapAnnouncementType(type: string): 'RATING' | 'STUDY' | 'ETC' | 'GENERAL' | 'EXTERNAL' {
  switch (type) {
    case 'RATING':
      return 'RATING';
    case 'STUDY':
      return 'STUDY';
    case 'GENERAL':
      return 'GENERAL';
    case 'ETC':
      return 'ETC';
    case 'EXTERNAL':
      return 'EXTERNAL';
    default:
      return 'GENERAL';
  }
}

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
            announcementTitle={announcement.title || '제목 없음'}
            announcementCategory={mapAnnouncementType(announcement.announcementType || 'GENERAL')}
            announcementDate={announcement.createdAt?.toISOString() || '날짜 없음'}
          />
          <AnnouncementContentSection className="mt-8" content={announcement.content || ''} />
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
            announcementTitle={announcement.title || '제목 없음'}
            announcementCategory={mapAnnouncementType(announcement.announcementType || 'GENERAL')}
            announcementDate={announcement.createdAt?.toISOString() || '날짜 없음'}
          />
          <AnnouncementContentSection className="mt-8" content={announcement.content || ''} />
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
