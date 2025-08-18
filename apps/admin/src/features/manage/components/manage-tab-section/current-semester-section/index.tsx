import { Button, cn } from '@hiarc-platform/ui';
import { InputButtons } from './InputButtons';
import { StudentApplyTable } from '@/features/student/components/student-apply-table';
import { useRecruitmentList } from '@/features/student/hooks';
import { useCurrentSemester } from '@/features/semester/hooks/use-current-semester';
import { useState } from 'react';

interface CurrentSemesterSectionProps {
  className?: string;
}

export function CurrentSemesterSection({
  className,
}: CurrentSemesterSectionProps): React.ReactElement {
  // 페이지네이션 상태
  const [page, setPage] = useState(0);

  // 현재 학기 정보 가져오기
  const { data: currentSemester } = useCurrentSemester();

  // 모집 리스트 데이터 가져오기
  const { data: recruitmentData } = useRecruitmentList({
    semesterId: currentSemester?.currentSemester?.semesterId || 0,
    page,
    size: 10,
  });

  const totalCount = recruitmentData?.totalElements || 0;

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
        <StudentApplyTable pageableModel={recruitmentData} onPageChange={setPage} />
      </div>
    </div>
  );
}
