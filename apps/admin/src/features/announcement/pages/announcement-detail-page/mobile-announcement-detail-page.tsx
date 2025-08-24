'use client';
import { BackButton, LoadingDots, Button, FadeIn } from '@hiarc-platform/ui';
import {
  AnnouncementIndicatorSection,
  AnnouncementInfoSection,
  AnnouncementContentSection,
} from '@hiarc-platform/ui';
import { useAnnouncementDetailPageState } from '../../hooks/page/use-announcement-detail-page-state';

export function MobileAnnouncementDetailPage(): React.ReactElement {
  const { announcement, isLoading, error, handleBackClick, handleGoToList } =
    useAnnouncementDetailPageState();

  if (isLoading) {
    return (
      <FadeIn
        isVisible={true}
        duration={0.3}
        className="flex min-h-screen items-center justify-center px-4"
      >
        <LoadingDots size="lg" className="flex min-h-screen items-center justify-center" />
      </FadeIn>
    );
  }

  if (error) {
    return (
      <FadeIn
        isVisible={true}
        duration={0.3}
        className="flex min-h-screen items-center justify-center px-4"
      >
        <p className="text-gray-500 text-sm text-center">문제가 발생했습니다.</p>
      </FadeIn>
    );
  }

  return (
    <FadeIn
      isVisible={Boolean(announcement)}
      duration={0.4}
      className="flex flex-col items-center px-4"
    >
      <BackButton onClick={handleBackClick} />
      <AnnouncementInfoSection
        className="mt-4"
        announcementTitle={announcement?.title || '제목 없음'}
        announcementCategory={announcement?.announcementType || 'GENERAL'}
        announcementDate={announcement?.createdAt?.toISOString() || '날짜 없음'}
        urlList={announcement?.attachmentUrls || []}
        place={announcement?.place || ''}
        scheduleStartAt={announcement?.scheduleStartAt || undefined}
        scheduleEndAt={announcement?.scheduleEndAt || undefined}
        applicationStartAt={announcement?.applicationStartAt || undefined}
        applicationEndAt={announcement?.applicationEndAt || undefined}
        applicationUrl={announcement?.applicationUrl || ''}
      />
      <AnnouncementContentSection className="mt-6" content={announcement?.content || ''} />
      <AnnouncementIndicatorSection
        className="mt-6"
        prevData={announcement?.prev}
        nextData={announcement?.next}
      />
      <Button variant="line" className="mt-6 w-full max-w-[200px]" onClick={handleGoToList}>
        목록으로
      </Button>
    </FadeIn>
  );
}