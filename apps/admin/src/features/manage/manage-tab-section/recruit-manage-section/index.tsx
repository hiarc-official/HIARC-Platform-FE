'use client';
import { LabeledSelector } from '@hiarc-platform/ui';
import { RecruitSummary } from './recruit-bar/recruitment-summary';
import { selectOption } from 'constants/selectOption';
import { StudentApplyTable } from '@/features/student/components/student-apply-table';
import { RecruitTextManageButton } from './recruit-bar/recruit-text-manage-button';
import { useState } from 'react';

export function RecruitManageSection(): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex w-full flex-col gap-4">
      <RecruitSummary />
      <div className="flex justify-end">
        <RecruitTextManageButton isOpen={isOpen} setIsOpen={setIsOpen} />
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
