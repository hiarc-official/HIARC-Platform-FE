import { cn } from '../../../lib/utils';
import { HeaderSection } from './header-section';
import { LocationScheduleSection } from './location-schedule-section';
import { RelatedUrlsSection } from './related-urls-section';

interface AnnouncementInfoSectionProps {
  announcementTitle: string;
  announcementCategory: 'RATING' | 'STUDY' | 'ETC' | 'GENERAL' | 'EXTERNAL';
  announcementDate: string;
  urlList?: string[];
  place?: string;
  scheduleStartAt?: Date;
  scheduleEndAt?: Date;
  applicationStartAt?: Date;
  applicationEndAt?: Date;
  applicationUrl?: string;
  className?: string;
}

export function AnnouncementInfoSection({
  announcementTitle,
  announcementCategory,
  announcementDate,
  urlList,
  place,
  scheduleStartAt,
  scheduleEndAt,
  applicationStartAt,
  applicationEndAt,
  applicationUrl,
  className,
}: AnnouncementInfoSectionProps): React.ReactElement {
  return (
    <div className={cn('flex w-full flex-col', className)}>
      <HeaderSection
        announcementTitle={announcementTitle}
        announcementCategory={announcementCategory}
        announcementDate={announcementDate}
      />
      <LocationScheduleSection
        place={place}
        scheduleStartAt={scheduleStartAt}
        scheduleEndAt={scheduleEndAt}
        applicationStartAt={applicationStartAt}
        applicationEndAt={applicationEndAt}
        applicationUrl={applicationUrl}
      />
      <RelatedUrlsSection urlList={urlList} />
    </div>
  );
}
