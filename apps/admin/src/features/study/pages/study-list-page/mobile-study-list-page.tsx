'use client';
import { Title, Button, LoadingDots, FadeIn } from '@hiarc-platform/ui';
import { StudyTable } from '../../components/study-table';
import { useStudyListPageState } from '../../hooks/page/use-study-list-page-state';

export function MobileStudyListPage(): React.ReactElement {
  const {
    studiesData,
    isLoading,
    error,
    currentPage,
    handlePageChange,
    handleCreateStudy,
  } = useStudyListPageState();

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
        <p className="text-gray-500">스터디 목록을 불러오는 중 오류가 발생했습니다.</p>
      </FadeIn>
    );
  }

  return (
    <FadeIn isVisible={Boolean(studiesData)} duration={0.4} className="flex flex-col px-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Title size="sm" weight="bold">
            스터디
          </Title>
          <Button size="sm" onClick={handleCreateStudy}>
            개설하기
          </Button>
        </div>
      </div>
      <StudyTable className="mt-4" pageableModel={studiesData} onPageChange={handlePageChange} />
    </FadeIn>
  );
}