import { cn } from '../../../lib/utils';
import { Divider } from '../../divider';
import { HeaderSection } from './header-section';
import { LocationScheduleSection } from './location-schedule-section';
import { RelatedUrlsSection } from './related-urls-section';

interface AnnouncementInfoSectionProps {
  announcementTitle: string;
  announcementCategory: 'RATING' | 'STUDY' | 'ETC' | 'GENERAL' | 'EXTERNAL';
  announcementDate?: Date;
  urlList?: string[];
  place?: string;
  scheduleStartAt?: Date;
  scheduleEndAt?: Date;
  applicationStartAt?: Date;
  applicationEndAt?: Date;
  applicationUrl?: string;
  memberRole?: string | null;
  className?: string;
}

export function AnnouncementInfoSection({
  announcementTitle,
  announcementCategory,
  announcementDate,
  urlList,
  place,
  scheduleStartAt,
  applicationStartAt,
  applicationEndAt,
  applicationUrl,
  memberRole,
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
        applicationStartAt={applicationStartAt}
        applicationEndAt={applicationEndAt}
        applicationUrl={applicationUrl}
        memberRole={memberRole}
      />
      <RelatedUrlsSection urlList={urlList} />
      {/* 모바일에서만 표시되는 까만색 구분선 */}
      <Divider variant="horizontal" size="full" className="mt-6 bg-gray-900 block md:hidden" />
    </div>
  );
}
