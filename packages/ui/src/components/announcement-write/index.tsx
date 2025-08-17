import DetailInformationSection from './detail-information-section';
import { CreateAnnouncementRequest, Announcement, SelectOption } from '@hiarc-platform/shared';

export interface AnnouncementWriteProps {
  announcementId?: number;
  announcement?: Announcement;
  initialAnnouncementType?: 'GENERAL' | 'STUDY' | 'RATING' | 'ETC' | 'EXTERNAL';
  initialStudyId?: number;
  initialStudyAnnounceType?: '일반' | '회차별 공지';
  studyOptions?: SelectOption[];
  onSubmit?(data: CreateAnnouncementRequest, isEditMode: boolean, announcementId?: number): void;
}

export default function AnnouncementWrite({
  announcementId,
  announcement,
  initialAnnouncementType,
  initialStudyId,
  initialStudyAnnounceType,
  studyOptions,
  onSubmit,
}: AnnouncementWriteProps): React.ReactElement {
  return (
    <div className="mt-8 flex min-h-screen w-full flex-col gap-4">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <DetailInformationSection
            announcementId={announcementId}
            announcement={announcement}
            initialAnnouncementType={initialAnnouncementType}
            initialStudyId={initialStudyId}
            initialStudyAnnounceType={initialStudyAnnounceType}
            studyOptions={studyOptions}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}
