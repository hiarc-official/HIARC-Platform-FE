'use client';
import { BackButton, PageLayout, LoadingDots } from '@hiarc-platform/ui';
import { Button } from '@hiarc-platform/ui';
import { useParams, useRouter } from 'next/navigation';
import { FadeIn } from '@/components/fade-in';
import {
  AnnouncementIndicatorSection,
  AnnouncementInfoSection,
  AnnouncementContentSection,
} from '@hiarc-platform/ui';
import { useAdminAnnouncement } from '@/features/announcement/hooks';

export default function AnnouncementDetailPage(): React.ReactElement {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const { data: announcement, isLoading, error } = useAdminAnnouncement(id);

  if (isLoading) {
    return (
      <FadeIn
        isVisible={true}
        duration={0.3}
        className="flex min-h-screen items-center justify-center"
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
        className="flex min-h-screen items-center justify-center"
      >
        <p className="text-gray-500">문제가 발생했습니다.</p>
      </FadeIn>
    );
  }

  const contentComponent = (
    <FadeIn isVisible={Boolean(announcement)} duration={0.4} className="flex flex-col items-center">
      <BackButton onClick={() => router.back()} />
      <AnnouncementInfoSection
        className="mt-6"
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
      <AnnouncementContentSection className="mt-8" content={announcement?.content || ''} />
      <AnnouncementIndicatorSection
        className="mt-8"
        prevData={announcement?.prev}
        nextData={announcement?.next}
      />
      <Button
        variant="line"
        className="mt-8 w-[186px]"
        onClick={() => router.push('/announcement')}
      >
        목록으로
      </Button>
    </FadeIn>
  );

  return <PageLayout desktopChildren={contentComponent} mobileChildren={contentComponent} />;
}
