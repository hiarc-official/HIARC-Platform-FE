'use client';
import { RecruitSummary } from './recruit-bar/recruitment-summary';
import { StudentApplyTable } from '@/features/student/components/student-apply-table';
import { RecruitTextManageButton } from './recruit-bar/recruit-text-manage-button';
import { useState } from 'react';
import { Label } from '@hiarc-platform/ui';
import { RecruitStartModalTrigger } from './recruit-modal/recruit-start-modal-trigger';

export function RecruitManageSection(): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [IsRecruit, setIsRecruit] = useState(false);
  //모집중이 아닐때
  if (!IsRecruit) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-[30%]">
        <div className="flex w-[344px] flex-col items-center gap-6">
          <Label size="lg">현재는 학회원 모집이 진헹되고 있지 않습니다.</Label>
          <RecruitStartModalTrigger
            onClick={() => {
              setIsRecruit(true);
            }}
          />
        </div>
      </div>
    );
  }
  //모집중일때
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
