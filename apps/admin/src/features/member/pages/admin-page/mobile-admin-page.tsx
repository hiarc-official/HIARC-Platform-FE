'use client';
import { Label, Title } from '@hiarc-platform/ui';
import { AdminTable } from '../../components/admin-table';
import { InstructorTable } from '../../components/instrcutor-table';
import { AddAdminTriggerButton } from '../../components/dialog/add-admin-trigger-button';
import { useAdminPageState } from '../../hooks/page/use-admin-page-state';

export function MobileAdminPage(): React.ReactElement {
  const { adminList, instructorList } = useAdminPageState();

  return (
    <div className="flex min-h-screen w-full flex-col gap-4 px-4 py-4">
      <Title size="sm" weight="bold">
        운영진/스터디장 관리
      </Title>
      <div className="flex w-full items-center justify-between">
        <Label size="md" weight="bold">
          운영진
        </Label>
        <AddAdminTriggerButton />
      </div>
      <AdminTable adminData={adminList} />
      <div className="flex w-full items-center">
        <Label size="md" weight="bold">
          스터디장
        </Label>
      </div>
      <InstructorTable instructorData={instructorList} />
    </div>
  );
}