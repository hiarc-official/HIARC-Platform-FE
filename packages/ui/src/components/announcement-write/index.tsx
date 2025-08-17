import DetailInformationSection from './detail-information-section';
import { CreateAnnouncementRequest, Announcement, SelectOption } from '@hiarc-platform/shared';

export interface AnnouncementWriteProps {
  announcementId?: number;
  announcement?: Announcement;
  initialAnnouncementType?: 'GENERAL' | 'STUDY' | 'RATING' | 'ETC' | 'EXTERNAL';
  initialStudyId?: number;
  studyOptions?: SelectOption[];
  lectureOptions?: SelectOption[];
  onSubmit?(data: CreateAnnouncementRequest, isEditMode: boolean, announcementId?: number): void;
  onStudyChange?(studyId: number | undefined): void;
}

export default function AnnouncementWrite({
  announcementId,
  announcement,
  initialAnnouncementType,
  initialStudyId,
  studyOptions,
  lectureOptions,
  onSubmit,
  onStudyChange,
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
            studyOptions={studyOptions}
            lectureOptions={lectureOptions}
            onSubmit={onSubmit}
            onStudyChange={onStudyChange}
          />
        </div>
      </div>
    </div>
  );
}
