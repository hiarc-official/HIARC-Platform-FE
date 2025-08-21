import { PageableModel, StudySummary } from '@hiarc-platform/shared';
import { cn, CommonTableBody, CommonTableHead, Pagination } from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/util';
import { Row } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { STUDY_LIST_COLUMN } from './study-list-column';

interface StudyTableProps {
  pageableModel?: PageableModel<StudySummary> | null;
  className?: string;
  onPageChange?(page: number): void;
}

export function StudyTable({
  pageableModel,
  className,
  onPageChange,
}: StudyTableProps): React.ReactElement {
  const router = useRouter();
  const columns = useMemo(() => STUDY_LIST_COLUMN, []);
  const [globalFilter, setGlobalFilter] = useState('');

  const data = pageableModel?.content ?? [];
  const totalPages = pageableModel?.totalPages ?? 0;

  const table = useTable({
    columns,
    data,
    pageState: [0, () => {}],
    totalPages,
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
          <CommonTableBody
            table={table}
            onClick={function (row: Row<StudySummary>): void {
              const id = row.original.studyId;
              if (!id) {
                return;
              }
              router.push(`/study/${id}`);
            }}
          />
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
