import { cn, CommonTableBody, CommonTableHead, TablePagination } from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/util';
import { Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { Student, STUDENT_LIST_COLUMN } from './student-list-column';

interface StudentTableProps {
  data?: Student[];
  className?: string;
}

export function StudentTable({ data, className }: StudentTableProps): React.ReactElement {
  const columns = useMemo(() => STUDENT_LIST_COLUMN, []);
  const router = useRouter();
  const [globalFilter, setGlobalFilter] = useState('');
  const table = useTable({
    columns,
    data: data ?? [],
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
          <CommonTableHead className="bg-gray-100 text-gray-900" table={table} />
          <CommonTableBody
            table={table}
            onClick={function (row: Row<Student>): void {
              console.log('Row clicked:', row.original);
              const studentNumber = row.original.number;
              if (studentNumber !== undefined) {
                router.push(`/student/${studentNumber}`);
              }
            }}
          />
        </motion.div>
      </AnimatePresence>
      <TablePagination className="mt-8" table={table} />
    </div>
  );
}
