import { cn, CommonTableBody, CommonTableHead, Label, TablePagination } from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/util';
import { Row } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { NOTICE_LIST_COLUMN } from './notice-list-column';

export interface Notice {
  number?: number;
  name: string;
  category: 'rating' | 'study' | 'etc' | 'general' | 'external';
  title: string;
  date: string;
}

interface NoticeTableSectionProps {
  className?: string;
  data: Notice[];
}

export function NoticeTable({ className, data }: NoticeTableSectionProps): React.ReactElement {
  const columns = useMemo(() => NOTICE_LIST_COLUMN, []);
  const [globalFilter, setGlobalFilter] = useState('');
  const [page, setPage] = useState(0);
  const router = useRouter();

  const table = useTable({
    columns,
    data,
    pageState: [page, setPage],
    totalPages: Math.ceil(data.length / 10),
    globalFilterState: [globalFilter, setGlobalFilter],
  });

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          className="w-full"
        >
          <CommonTableHead
            table={table}
            className="border-b border-t border-b-gray-200 border-t-gray-900 bg-white"
          />
          <CommonTableBody
            table={table}
            onClick={function (row: Row<Notice>): void {
              const id = row.original.number;
              if (!id) {
                return;
              }
              router.push(`/notice/${id}`);
            }}
          />
        </motion.div>
      </AnimatePresence>
      <TablePagination className="mt-8" table={table} />
    </div>
  );
}
