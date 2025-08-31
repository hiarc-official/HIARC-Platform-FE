'use client';

import { useRouter } from 'next/navigation';
import { Title, Button, LoadingDots, FadeIn } from '@hiarc-platform/ui';
import { AnnouncementFilter } from '../../components/announcement-filter/announcement-filter';
import { AnnouncementTable } from '../../components/announcement-table/announcement-table';
import { useAdminAnnouncementListPageState } from '../../hooks/page/use-admin-announcement-list-page-state';

export function AnnouncementListPage(): React.ReactElement {
  const router = useRouter();
  const { filterParams, pageableModel, isLoading, error, handlePageChange, handleFilterChange } =
    useAdminAnnouncementListPageState();

  const handleWriteAnnouncement = (): void => {
    router.push('/announcement/write');
  };

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

  return (
    <FadeIn isVisible={Boolean(pageableModel)} duration={0.4} className="flex flex-col">
      {/* 모바일에서 고정 헤더로 인한 패딩 추가 */}
      <div className="pt-10 md:pt-0" />

      <div className="mb-7 hidden justify-between md:flex">
        <Title size="sm" weight="bold">
          공지사항
        </Title>
        <Button size="md" onClick={handleWriteAnnouncement}>
          작성하기
        </Button>
      </div>

      {/* 모바일: 상세 검색과 작성하기 버튼을 나란히 */}
      <div className="mb-6 flex items-center justify-between gap-4 md:hidden">
        <AnnouncementFilter onFilterChange={handleFilterChange} filters={filterParams} />
        <Button size="xs" onClick={handleWriteAnnouncement}>
          작성하기
        </Button>
      </div>

      {/* 데스크톱: 기존 필터 */}
      <div className="hidden md:block">
        <AnnouncementFilter onFilterChange={handleFilterChange} filters={filterParams} />
      </div>
      <AnnouncementTable
        className="mt-6"
        pageableModel={pageableModel}
        onPageChange={handlePageChange}
      />
    </FadeIn>
  );
}
