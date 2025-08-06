'use client';

import { NoticeContentSection } from '@/features/notice/components/notice-content-section';
import { NoticeIndicatorSection } from '@/features/notice/components/notice-indicator-section';
import { NoticeInfoSection } from '@/features/notice/components/notice-info-section';
import { BackButton, Button, PageLayout } from '@hiarc-platform/ui';
import { useRouter } from 'next/navigation';

export default function NoticeDetail(): React.ReactElement {
  const router = useRouter();

  return (
    <PageLayout
      desktopChildren={
        <div className="flex flex-col items-center">
          <BackButton onClick={() => router.back()} />
          <NoticeInfoSection
            className="mt-6"
            noticeTitle="공지 제목"
            noticeCategory="rating"
            noticeDate="작성일"
          />
          <NoticeContentSection className="mt-8" content="공지 내용" />
          <NoticeIndicatorSection className="mt-8" />
          <Button variant="line" className="mt-8 w-[186px]">
            목록으로
          </Button>
        </div>
      }
      mobileChildren={
        <div className="flex flex-col items-center">
          <NoticeInfoSection
            className="mt-6"
            noticeTitle="공지 제목"
            noticeCategory="rating"
            noticeDate="작성일"
          />
          <NoticeContentSection className="mt-8" content="공지 내용" />
          <NoticeIndicatorSection className="mt-8" />
          <Button variant="line" className="mt-8 w-[186px]">
            목록으로
          </Button>
        </div>
      }
    />
  );
}
