import { Button, cn } from '@hiarc-platform/ui';
import { InputButtons } from './InputButtons';
import { StudentApplyTable } from '@/features/student/components/student-apply-table';
interface CurrentSemesterSectionProps {
  className?: string;
}

export function CurrentSemesterSection({
  className,
}: CurrentSemesterSectionProps): React.ReactElement {
  return (
    <div className={cn('flex w-full flex-col gap-6', className)}>
      <InputButtons />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center justify-between text-md">
          <div>총 58건</div>
          <Button className="w-[106px]" size="sm" variant="secondary">
            명단 다운로드
          </Button>
        </div>
        <StudentApplyTable />
      </div>
    </div>
  );
}
