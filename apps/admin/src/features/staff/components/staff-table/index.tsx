'use client';
import { Admin } from '@hiarc-platform/shared';
import { cn, CommonTableBody, CommonTableHead, DialogUtil } from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/util';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useMemo, useState } from 'react';
import { useDeleteAdmin } from '@/features/student/hooks';
import { useSelectedSemester } from '@/hooks/use-semester-store';
import { createStaffColumns } from './columns';

interface StaffTableSectionProps {
  staffData: Admin[];
  className?: string;
}

export function StaffTable({ staffData, className }: StaffTableSectionProps): React.ReactElement {
  const deleteAdminMutation = useDeleteAdmin();
  const { selectedSemesterId } = useSelectedSemester();
  const [globalFilter, setGlobalFilter] = useState('');

  const handleDeleteAdmin = useCallback(async (admin: Admin): Promise<void> => {
    if (!selectedSemesterId) {
      alert('학기를 선택해주세요.');
      return;
    }

    DialogUtil.showConfirm(`${admin.memberName}님의 관리자 권한을 삭제하시겠습니까?`, async () => {
      try {
        await deleteAdminMutation.mutateAsync({
          memberId: admin.memberId,
          semesterId: Number(selectedSemesterId),
        });
      } catch (error) {
        console.error('삭제 실패:', error);
      }
    });
  }, [selectedSemesterId, deleteAdminMutation]);

  const columns = useMemo(
    () =>
      createStaffColumns({
        onDelete: handleDeleteAdmin,
        isDeleting: deleteAdminMutation.isPending,
      }),
    [deleteAdminMutation.isPending, handleDeleteAdmin]
  );

  const table = useTable({
    columns,
    data: staffData,
    pageState: [0, () => {}],
    totalPages: 10,
    globalFilterState: [globalFilter, setGlobalFilter],
  });

  return (
    <div className={cn('w-full flex-col items-center', className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key="table"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          className="w-full"
        >
          <CommonTableHead table={table} className="bg-gray-100" />
          <CommonTableBody table={table} onClick={function (): void {}} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
