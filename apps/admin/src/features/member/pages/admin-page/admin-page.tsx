'use client';
import { useSelectedSemester } from '@/shared/hooks/use-semester-store';
import { useAdmins, useInstructors } from '@/features/member/hooks';
import { Button, DialogUtil, Label, Title, cn } from '@hiarc-platform/ui';
import { AdminTable } from '../../components/admin-table';
import { InstructorTable } from '../../components/instrcutor-table';
import { AddAdminDialog } from '../../components/dialog/add-admin-dialog';

export function AdminPage(): React.ReactElement {
  const { selectedSemesterId } = useSelectedSemester();
  const { data: adminList } = useAdmins(Number(selectedSemesterId));
  const { data: instructorList } = useInstructors(Number(selectedSemesterId));

  const handleOpenDialog = (): void => {
    DialogUtil.showComponent(<AddAdminDialog />);
  };

  return (
    <div className={cn('flex min-h-screen w-full flex-col gap-6 py-4', 'pt-10 md:pt-0')}>
      <Title size="sm" weight="bold" className="hidden md:block">
        운영진/스터디장 관리
      </Title>
      <div className="flex w-full items-center justify-between">
        <Label size={'lg'} weight="bold">
          운영진
        </Label>
        <Button size="xs" onClick={handleOpenDialog} className="md:hidden">
          추가하기
        </Button>
        <Button size="sm" onClick={handleOpenDialog} className="hidden w-[106px] md:block">
          추가하기
        </Button>
      </div>
      <div className="w-full  overflow-x-auto">
        <div className="min-w-[600px]">
          <AdminTable adminData={adminList || []} />
        </div>
      </div>
      <div className="flex w-full items-center">
        <Label size={'lg'} weight="bold">
          스터디장
        </Label>
      </div>
      <div className="w-full  overflow-x-auto">
        <div className="min-w-[400px]">
          <InstructorTable instructorData={instructorList || []} />
        </div>
      </div>
    </div>
  );
}
