import { useRouter, useParams } from 'next/navigation';
import useAnnouncement from '../query/use-announcement';

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

export function useAnnouncementDetailPageState() {
  const router = useRouter();
  const params = useParams();
  const announcementId = String(params.id);

  const { data: announcement, isLoading, error } = useAnnouncement(announcementId);

  const handleGoBack = () => {
    router.back();
  };

  const handleGoToList = () => {
    router.push('/announcement');
  };

  // 공지사항 데이터 가공
  const processedAnnouncement = announcement
    ? {
        ...announcement,
        announcementTitle: announcement.announcementTitle || '제목 없음',
        announcementCategory: mapAnnouncementType(announcement.announcementType || 'GENERAL'),
        announcementDate: announcement.createdAt ? formatDate(announcement.createdAt) : '날짜 없음',
        urlList: announcement.attachmentUrls || [],
        place: announcement.place ?? undefined,
        scheduleStartAt: announcement.scheduleStartAt
          ? new Date(announcement.scheduleStartAt)
          : undefined,
        scheduleEndAt: announcement.scheduleEndAt
          ? new Date(announcement.scheduleEndAt)
          : undefined,
        applicationStartAt: announcement.applicationStartAt
          ? new Date(announcement.applicationStartAt)
          : undefined,
        applicationEndAt: announcement.applicationEndAt
          ? new Date(announcement.applicationEndAt)
          : undefined,
        applicationUrl: announcement.applicationUrl || '',
        content: announcement.content || '',
      }
    : null;

  return {
    announcement: processedAnnouncement,
    isLoading,
    error,
    handleGoBack,
    handleGoToList,
  };
}
