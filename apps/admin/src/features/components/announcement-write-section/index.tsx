import DetailInformationSection from './detail-information-section';

interface AnnouncementWriteProps {
  announcementId?: number;
}

export default function AnnouncementWrite({ announcementId }: AnnouncementWriteProps): React.ReactElement {
  return (
    <div className="mt-8 flex min-h-screen w-full flex-col gap-4">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <DetailInformationSection announcementId={announcementId} />
        </div>
      </div>
    </div>
  );
}
