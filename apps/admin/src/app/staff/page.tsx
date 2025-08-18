'use client';

import { Label, PageLayout, Title } from '@hiarc-platform/ui';
import AddStaffTriggerButton from '@/features/staff/components/add-staff-trigger-button';
import { StaffTable } from '@/features/staff/components/staff-table';
import { InstructorTable } from '@/features/staff/components/study-leader-table';
import { useAdminList, useInstructorList } from '@/features/student/hooks';
import { useSelectedSemester } from '@/hooks/use-semester-store';

export default function StaffPage(): React.ReactElement {
  const { selectedSemesterId } = useSelectedSemester();
  const { data: adminList } = useAdminList(Number(selectedSemesterId));
  const { data: instructorList } = useInstructorList(Number(selectedSemesterId));

  return (
    <PageLayout>
      <div className=" flex min-h-screen w-full flex-col gap-6 py-4 ">
        <Title size="sm" weight="bold">
          운영진/스터디장 관리
        </Title>
        <div className="flex w-full items-center justify-between">
          <Label size="lg" weight="bold">
            운영진
          </Label>
          <AddStaffTriggerButton />
        </div>
        <StaffTable staffData={adminList || []} />
        <div className="flex w-full items-center ">
          <Label size="lg" weight="bold">
            스터디장
          </Label>
        </div>
        <InstructorTable instructorData={instructorList || []} />
      </div>
    </PageLayout>
  );
}
