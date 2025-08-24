import { cn, CommonTableBody, CommonTableHead, Pagination, DialogUtil } from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/util';
import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PageableModel, Student } from '@hiarc-platform/shared';
import { createStudentColumns } from './columns';
import { useDeleteMember } from '../../hooks';

interface MemberTableProps {
  pageableModel?: PageableModel<Student>;
  className?: string;
  onPageChange?(page: number): void;
}

export function MemberTable({
  pageableModel,
  className,
  onPageChange,
}: MemberTableProps): React.ReactElement {
  const deleteMemberMutation = useDeleteMember();
  const [globalFilter, setGlobalFilter] = useState('');

  const handleDeleteMember = useCallback(
    async (student: Student) => {
      DialogUtil.showConfirm(`${student.name}님을 정말로 탈퇴 처리하시겠습니까?`, async () => {
        try {
          await deleteMemberMutation.mutateAsync(student.id!);
        } catch (error) {
          console.error('탈퇴 처리 실패:', error);
        }
      });
    },
    [deleteMemberMutation]
  );

  const columns = useMemo(
    () =>
      createStudentColumns({
        onDelete: handleDeleteMember,
        isDeleting: deleteMemberMutation.isPending,
      }),
    [handleDeleteMember, deleteMemberMutation.isPending]
  );
  const table = useTable({
    columns,
    data: pageableModel?.content ?? [],
    pageState: [pageableModel?.number ?? 0, () => {}],
    totalPages: pageableModel?.totalPages ?? 0,
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
          <CommonTableHead className="bg-gray-100 text-gray-900" table={table} />
          <CommonTableBody table={table} onClick={function (): void {}} />
        </motion.div>
      </AnimatePresence>
      {pageableModel && onPageChange && (
        <div className="flex w-full justify-center">
          <Pagination className="mt-8" pageableModel={pageableModel} onPageChange={onPageChange} />
        </div>
      )}
    </div>
  );
}
