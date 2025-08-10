'use client';
import { RecruitSummary } from './recruit-bar/recruitment-summary';
import { StudentApplyTable } from '@/features/student/components/student-apply-table';
import { RecruitTextManageButton } from './recruit-bar/recruit-text-manage-button';
import { useState } from 'react';
import { Button, Label } from '@hiarc-platform/ui';

export function RecruitManageSection(): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [recruitNow, setRecruitNow] = useState(false);

  if (!recruitNow) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-[30%]">
        <div className="flex w-[344px] flex-col items-center gap-6">
          <Label size="lg">현재는 학회원 모집이 진헹되고 있지 않습니다.</Label>
          <Button
            className="w-full"
            onClick={() => {
              setRecruitNow(!recruitNow);
            }}
          >
            신규 모집 시작하기
          </Button>
        </div>
      </div>
    );
  }

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
