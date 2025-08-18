import { Button, cn } from '@hiarc-platform/ui';
import { InputButtons } from './InputButtons';
import { useStudentList } from '@/features/student/hooks';
import { useSelectedSemester } from '@/hooks/use-semester-store';
import { useState } from 'react';
import { StudentTable } from '@/features/student/components/student-table';

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

  const totalCount = studentData?.totalElements || 0;

  return (
    <div className={cn('flex w-full flex-col gap-6', className)}>
      <InputButtons />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between text-md">
          <div>총 {totalCount}건</div>
          <Button className="w-[106px]" size="sm" variant="secondary">
            명단 다운로드
          </Button>
        </div>
        <StudentTable pageableModel={studentData} onPageChange={setPage} />
      </div>
    </div>
  );
}
