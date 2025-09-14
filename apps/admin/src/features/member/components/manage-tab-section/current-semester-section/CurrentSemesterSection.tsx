import { Button, cn, Pagination } from '@hiarc-platform/ui';
import { MemberSearchFilter } from './MemberSearchFilter';
import { useSelectedSemester } from '@/shared/hooks/use-semester-store';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDownloadExcel, useMembers } from '@/features/member/hooks';
import { MemberTable } from '../../member-table/MemberTable';

interface CurrentSemesterSectionProps {
  className?: string;
}

export function CurrentSemesterSection({
  className,
}: CurrentSemesterSectionProps): React.ReactElement {
  const searchParams = useSearchParams();

  // URL에서 파라미터 가져오기
  const [page, setPage] = useState(Number(searchParams.get('page')) || 0);
  const [searchFilters, setSearchFilters] = useState<{ name?: string; bojHandle?: string }>({
    name: searchParams.get('name') || undefined,
    bojHandle: searchParams.get('bojHandle') || undefined,
  });

  // URL 파라미터가 변경되면 상태 업데이트
  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 0);
    setSearchFilters({
      name: searchParams.get('name') || undefined,
      bojHandle: searchParams.get('bojHandle') || undefined,
    });
  }, [searchParams]);

  // 선택된 학기 정보 가져오기
  const { selectedSemesterId, selectedSemester } = useSelectedSemester();

  // 현재 학기인지 확인 (현재 날짜 기준)
  const getCurrentSemester = (): {
    year: number;
    type: 'FIRST' | 'SECOND';
  } => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // 0-based이므로 +1

    // 3월~8월: 1학기, 9월~2월: 2학기
    const currentSemesterType = currentMonth >= 3 && currentMonth <= 8 ? 'FIRST' : 'SECOND';

    return {
      year: currentYear,
      type: currentSemesterType,
    };
  };

  const currentSemester = getCurrentSemester();
  const isCurrentSemester =
    selectedSemester?.semesterYear === currentSemester.year &&
    selectedSemester?.semesterType === currentSemester.type;

  // 학생 리스트 데이터 가져오기
  const { data: studentData } = useMembers({
    semesterId: Number(selectedSemesterId) || 0,
    name: searchFilters.name,
    bojHandle: searchFilters.bojHandle,
    page,
    size: 10,
  });

  // 엑셀 다운로드 훅
  const downloadExcel = useDownloadExcel();

  const totalCount = studentData?.totalElements || 0;

  // 검색 핸들러
  const handleSearch = (filters: { name?: string; bojHandle?: string }): void => {
    setSearchFilters(filters);
    setPage(0);
  };

  // 페이지 변경 핸들러 (URL도 업데이트)
  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
    const newSearchParams = new URLSearchParams(searchParams);
    if (newPage === 0) {
      newSearchParams.delete('page');
    } else {
      newSearchParams.set('page', newPage.toString());
    }
    window.history.replaceState(null, '', `?${newSearchParams.toString()}`);
  };

  // 엑셀 다운로드 핸들러
  const handleDownload = (): void => {
    if (selectedSemesterId) {
      downloadExcel.mutate(Number(selectedSemesterId));
    }
  };

  return (
    <div className={cn('flex w-full flex-col gap-6', className)}>
      <MemberSearchFilter onSearch={handleSearch} />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between text-md">
          <div>총 {totalCount}건</div>
          <Button
            className="w-[106px]"
            size="sm"
            variant="secondary"
            onClick={handleDownload}
            disabled={downloadExcel.isPending || !selectedSemesterId}
          >
            {downloadExcel.isPending ? '다운로드 중...' : '명단 다운로드'}
          </Button>
        </div>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[1200px]">
            <MemberTable
              pageableModel={studentData}
              onPageChange={handlePageChange}
              isCurrentSemester={isCurrentSemester}
              showPagination={false}
            />
          </div>
        </div>
        {studentData && (
          <div className="flex w-full justify-center">
            <Pagination
              className="mt-8"
              pageableModel={studentData}
              onPageChange={(page) => handlePageChange(page - 1)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
