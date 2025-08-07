import { LabeledSelector } from '@hiarc-platform/ui';
import { RecruitSummar } from './recruitment-summary';
import { selectOption } from 'constants/selectOption';
import { StudentApplyTable } from '@/features/student/components/student-apply-table';
export function RecruitManageSection(): React.ReactElement {
  return (
    <div className="flex w-full flex-col gap-4">
      <RecruitSummar />
      <div className="flex justify-end">
        <LabeledSelector
          label=""
          showLabel={false}
          options={selectOption['모집문구관리']}
          placeholder="모집 문구 관리"
          triggerClassName="bg-primary-200 text-white data-[placeholder]:text-white"
          className="w-[138px]"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center justify-between text-md">
          <div>신청 명단 총 58건</div>
        </div>
        <StudentApplyTable />
      </div>
    </div>
  );
}
