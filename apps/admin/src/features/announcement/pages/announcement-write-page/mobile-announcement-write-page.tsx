'use client';
import { BackButton, Divider } from '@hiarc-platform/ui';
import { Title } from '@hiarc-platform/ui';
import { AnnouncementWrite } from '@hiarc-platform/ui';
import { useAnnouncementWritePageState } from '../../hooks/page/use-announcement-write-page-state';

export function MobileAnnouncementWritePage(): React.ReactElement {
  const {
    studyOptions,
    initialType,
    initialStudyId,
    initialStudyAnnounceType,
    handleSubmit,
    handleBackClick,
  } = useAnnouncementWritePageState();

  return (
    <div className="px-4">
      <div className="flex w-full flex-col items-center gap-4">
        <BackButton onClick={handleBackClick} />
        <div className="flex w-full items-center justify-between">
          <Title size="sm" weight="bold">
            공지사항 작성
          </Title>
        </div>
        <Divider variant="horizontal" size="full" />
      </div>
      <AnnouncementWrite
        studyOptions={studyOptions}
        initialAnnouncementType={initialType}
        initialStudyId={initialStudyId}
        initialStudyAnnounceType={initialStudyAnnounceType}
        onSubmit={handleSubmit}
      />
    </div>
  );
}