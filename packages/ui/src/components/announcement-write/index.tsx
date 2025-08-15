import DetailInformationSection from './detail-information-section';
import { CreateAnnouncementRequest, Announcement } from '@hiarc-platform/shared';

export interface AnnouncementWriteProps {
  announcementId?: number;
  announcement?: Announcement;
  onSubmit?(data: CreateAnnouncementRequest, isEditMode: boolean, announcementId?: number): void;
}

export default function AnnouncementWrite({
  announcementId,
  announcement,
  onSubmit,
}: AnnouncementWriteProps): React.ReactElement {
  return (
    <div className="mt-8 flex min-h-screen w-full flex-col gap-4">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <DetailInformationSection
            announcementId={announcementId}
            announcement={announcement}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}
