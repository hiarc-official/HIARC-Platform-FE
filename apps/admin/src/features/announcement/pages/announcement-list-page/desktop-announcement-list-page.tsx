'use client';
import { Title, Button, LoadingDots, FadeIn } from '@hiarc-platform/ui';
import { AnnouncementFilter } from '../../components/announcement-filter';
import { AnnouncementTable } from '../../components/announcement-table';
import { useAnnouncementListPageState } from '../../hooks/page/use-announcement-list-page-state';

export function DesktopAnnouncementListPage(): React.ReactElement {
  const {
    pageableModel,
    isLoading,
    error,
    currentPage,
    filters,
    handlePageChange,
    handleFilterChange,
    handleWriteAnnouncement,
  } = useAnnouncementListPageState();

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
      <div className="mb-7 flex justify-between">
        <Title size="sm" weight="bold">
          공지사항
        </Title>
        <Button size="md" onClick={handleWriteAnnouncement}>
          작성하기
        </Button>
      </div>
      <AnnouncementFilter onFilterChange={handleFilterChange} filters={filters} />
      <AnnouncementTable
        className="mt-6"
        pageableModel={pageableModel}
        onPageChange={handlePageChange}
      />
    </FadeIn>
  );
}