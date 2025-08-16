import { cn, CommonTableBody, CommonTableHead, Pagination } from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/util';
import { useMemo, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { useAwardListColumns } from './award-list-column';
import { PageableModel } from '@hiarc-platform/shared';
import { Award } from '../../../../../../../packages/shared/src/types/award/award';

interface CompetitionTableProps {
  data?: PageableModel<Award> | null;
  className?: string;
}

export function CompetitionTable({ data, className }: CompetitionTableProps): React.ReactElement {
  const column = useAwardListColumns();
  const columns = useMemo(() => column, [column]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const table = useTable({
    columns,
    data: data?.content ?? [],
    pageState: [currentPage, setCurrentPage],
    totalPages: data?.totalPages ?? 0,
    globalFilterState: [globalFilter, setGlobalFilter],
  });

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

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
          <CommonTableBody table={table} onClick={() => {}} />
        </motion.div>
      </AnimatePresence>
      <Pagination className="mt-8" pageableModel={data} onPageChange={handlePageChange} />
    </div>
  );
}
