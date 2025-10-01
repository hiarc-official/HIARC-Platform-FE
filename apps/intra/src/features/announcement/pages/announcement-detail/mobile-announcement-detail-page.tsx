import {
  AnnouncementContentSection,
  AnnouncementIndicatorSection,
  AnnouncementInfoSection,
} from '@hiarc-platform/ui';
import { Announcement, AnnnouncementType } from '@hiarc-platform/shared';
import { AnnouncementNavigationSection } from './components/announcement-navigation-section';

interface MobileAnnouncementDetailPageProps {
  announcement: Announcement;
}

export function MobileAnnouncementDetailPage({
  announcement,
}: MobileAnnouncementDetailPageProps): React.ReactElement {
  const processedAnnouncement = {
    ...announcement,
    announcementTitle: announcement.announcementTitle || '제목 없음',
    announcementCategory: AnnnouncementType[announcement.announcementType || 'GENERAL'],
    announcementDate: announcement.createdAt ? new Date(announcement.createdAt) : undefined,
    urlList: announcement.attachmentUrls || [],
    place: announcement.place ?? undefined,
    scheduleStartAt: announcement.scheduleStartAt
      ? new Date(announcement.scheduleStartAt)
      : undefined,
    scheduleEndAt: announcement.scheduleEndAt ? new Date(announcement.scheduleEndAt) : undefined,
    applicationStartAt: announcement.applicationStartAt
      ? new Date(announcement.applicationStartAt)
      : undefined,
    applicationEndAt: announcement.applicationEndAt
      ? new Date(announcement.applicationEndAt)
      : undefined,
    applicationUrl: announcement.applicationUrl || '',
    content: announcement.content || '',
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="pt-4" />

      <AnnouncementInfoSection
        announcementTitle={processedAnnouncement.announcementTitle}
        announcementCategory={processedAnnouncement.announcementCategory}
        announcementDate={processedAnnouncement.announcementDate}
        urlList={processedAnnouncement.urlList}
        place={processedAnnouncement.place}
        scheduleStartAt={processedAnnouncement.scheduleStartAt}
        scheduleEndAt={processedAnnouncement.scheduleEndAt}
        applicationStartAt={processedAnnouncement.applicationStartAt}
        applicationEndAt={processedAnnouncement.applicationEndAt}
        applicationUrl={processedAnnouncement.applicationUrl}
      />
      <AnnouncementContentSection
        images={announcement.imageUrls || []}
        content={processedAnnouncement.content}
      />
      <AnnouncementIndicatorSection prevData={announcement.prev} nextData={announcement.next} />
      <AnnouncementNavigationSection className="w-full max-w-[186px]" />
    </div>
  );
}
