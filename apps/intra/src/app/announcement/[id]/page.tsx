'use client';

import useAnnouncement from '@/features/announcement/hooks/use-announcement';
import {
  AnnouncementContentSection,
  AnnouncementIndicatorSection,
  AnnouncementInfoSection,
  BackButton,
  Button,
  PageLayout,
  LoadingDots,
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

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export default function AnnouncementDetail(): React.ReactElement {
  const router = useRouter();
  const params = useParams();
  const announcementId = String(params.id);

  const { data: announcement, isLoading, error } = useAnnouncement(announcementId);

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex min-h-screen items-center justify-center">
          <LoadingDots size="lg" />
        </div>
      </PageLayout>
    );
  }

  if (error || !announcement) {
    return (
      <PageLayout>
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-gray-500">공지사항을 불러올 수 없습니다.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      desktopChildren={
        <div className="flex flex-col items-center">
          <BackButton onClick={() => router.back()} />
          <AnnouncementInfoSection
            className="mt-6"
            announcementTitle={announcement.announcementTitle || '제목 없음'}
            announcementCategory={mapAnnouncementType(announcement.announcementType || 'GENERAL')}
            announcementDate={
              announcement.createdAt ? formatDate(announcement.createdAt) : '날짜 없음'
            }
            urlList={announcement.attachmentUrls || []}
            place={announcement.place ?? undefined}
            scheduleStartAt={
              announcement.scheduleStartAt ? new Date(announcement.scheduleStartAt) : undefined
            }
            scheduleEndAt={
              announcement.scheduleEndAt ? new Date(announcement.scheduleEndAt) : undefined
            }
            applicationStartAt={
              announcement.applicationStartAt
                ? new Date(announcement.applicationStartAt)
                : undefined
            }
            applicationEndAt={
              announcement.applicationEndAt ? new Date(announcement.applicationEndAt) : undefined
            }
            applicationUrl={announcement.applicationUrl || ''}
          />
          <AnnouncementContentSection className="mt-8" content={announcement.content || ''} />
          <AnnouncementIndicatorSection
            className="mt-8"
            prevData={announcement.prev}
            nextData={announcement.next}
          />
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
            announcementTitle={announcement.announcementTitle || '제목 없음'}
            announcementCategory={mapAnnouncementType(announcement.announcementType || 'GENERAL')}
            announcementDate={
              announcement.createdAt ? formatDate(announcement.createdAt) : '날짜 없음'
            }
            urlList={announcement.attachmentUrls || []}
            place={announcement.place ?? undefined}
            scheduleStartAt={
              announcement.scheduleStartAt ? new Date(announcement.scheduleStartAt) : undefined
            }
            scheduleEndAt={
              announcement.scheduleEndAt ? new Date(announcement.scheduleEndAt) : undefined
            }
            applicationStartAt={
              announcement.applicationStartAt
                ? new Date(announcement.applicationStartAt)
                : undefined
            }
            applicationEndAt={
              announcement.applicationEndAt ? new Date(announcement.applicationEndAt) : undefined
            }
            applicationUrl={announcement.applicationUrl || ''}
          />
          <AnnouncementContentSection className="mt-8" content={announcement.content || ''} />
          <AnnouncementIndicatorSection
            className="mt-8"
            prevData={announcement.prev}
            nextData={announcement.next}
          />
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
