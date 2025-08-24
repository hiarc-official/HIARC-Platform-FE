'use client';

import { Label, PageLayout, Title } from '@hiarc-platform/ui';

import { AdminTable } from '@/features/member/components/admin-table';
import { InstructorTable } from '@/features/member/components/instrcutor-table';
import { useSelectedSemester } from '@/hooks/use-semester-store';
import { useAdmins, useInstructors } from '@/features/member/hooks';
import { AddAdminTriggerButton } from '@/features/member/components/dialog/add-admin-trigger-button';

export default function AdminPage(): React.ReactElement {
  const { selectedSemesterId } = useSelectedSemester();
  const { data: adminList } = useAdmins(Number(selectedSemesterId));
  const { data: instructorList } = useInstructors(Number(selectedSemesterId));

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
          <AddAdminTriggerButton />
        </div>
        <AdminTable adminData={adminList || []} />
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
