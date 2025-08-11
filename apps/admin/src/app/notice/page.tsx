'use client';

import { Title } from '@hiarc-platform/ui';
import { Button } from '@hiarc-platform/ui';
import SelectButtonSection from '@/features/components/notice-section/select-button-section';
import { useRouter } from 'next/navigation';
import { NoticeTable } from '@/features/notice/components/notice-table';
import { Notice } from '@/features/notice/components/notice-table/notice-list-column';
import { PageLayout } from '@hiarc-platform/ui';
import { noticeData } from 'constants/mock';

export default function NoticePage(): React.ReactElement {
  const router = useRouter();

  return (
    <PageLayout>
      <div className="flex max-w-[1200px] flex-col ">
        <div className="mb-7  flex justify-between">
          <Title size="sm" weight="bold">
            공지사항
          </Title>
          <Button size="md" onClick={() => router.push('/notice/write')}>
            작성하기
          </Button>
        </div>
        <SelectButtonSection />
        <NoticeTable className="mt-6" data={noticeData} />
      </div>
    </PageLayout>
  );
}
