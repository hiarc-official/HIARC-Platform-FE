import { cn, CommonTableBody, CommonTableHead, Pagination } from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/util';
import { useMemo, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { STUDENT_LIST_COLUMN } from './student-list-column';
import { PageableModel, Student } from '@hiarc-platform/shared';

interface StudentTableProps {
  pageableModel?: PageableModel<Student>;
  className?: string;
  onPageChange?(page: number): void;
}

export function StudentTable({
  pageableModel,
  className,
  onPageChange,
}: StudentTableProps): React.ReactElement {
  const columns = useMemo(() => STUDENT_LIST_COLUMN, []);
  const [globalFilter, setGlobalFilter] = useState('');
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
