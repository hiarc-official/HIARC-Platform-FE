import { Button, cn } from '@hiarc-platform/ui';
import { InputButtons } from './InputButtons';
import { useStudentList } from '@/features/student/hooks';
import { useSelectedSemester } from '@/hooks/use-semester-store';
import { useState } from 'react';
import { StudentTable } from '@/features/student/components/student-table';
import { useDownloadExcel } from '@/features/student/hooks/use-download-excel';

interface CurrentSemesterSectionProps {
  className?: string;
}

export function CurrentSemesterSection({
  className,
}: CurrentSemesterSectionProps): React.ReactElement {
  // 페이지네이션 상태
  const [page, setPage] = useState(0);

  // 선택된 학기 정보 가져오기
  const { selectedSemesterId } = useSelectedSemester();

  // 학생 리스트 데이터 가져오기
  const { data: studentData } = useStudentList({
    semesterId: Number(selectedSemesterId) || 0,
    page,
    size: 10,
  });

  // 엑셀 다운로드 훅
  const downloadExcel = useDownloadExcel();

  const totalCount = studentData?.totalElements || 0;

  // 엑셀 다운로드 핸들러
  const handleDownload = () => {
    if (selectedSemesterId) {
      downloadExcel.mutate(Number(selectedSemesterId));
    }
  };

  return (
    <div className={cn('flex w-full flex-col gap-6', className)}>
      <InputButtons />
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
        <StudentTable pageableModel={studentData} onPageChange={setPage} />
      </div>
    </div>
  );
}
