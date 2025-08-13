import { cn, CommonTableBody, CommonTableHead } from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/util';
import { Row } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { STUDY_LIST_COLUMN } from './study-list-column';
import { StudySummary } from '../../types/model/study-summary';

interface StudyTableProps {
  studyData: StudySummary[];
  className?: string;
}

export function StudyTable({ studyData, className }: StudyTableProps): React.ReactElement {
  const router = useRouter();
  const columns = useMemo(() => STUDY_LIST_COLUMN, []);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useTable({
    columns,
    data: studyData,
    pageState: [0, () => {}],
    totalPages: 10,
    globalFilterState: [globalFilter, setGlobalFilter],
  });

  return (
    <div className={cn('flex w-full flex-col gap-4', className)}>
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
    </div>
  );
}
