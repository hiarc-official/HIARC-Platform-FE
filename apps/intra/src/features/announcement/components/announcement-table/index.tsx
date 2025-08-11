import { cn, CommonTableBody, CommonTableHead, TablePagination } from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/util';
import { Row } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { ANNOUNCEMENT_LIST_COLUMN } from './announcement-list-column';
import type { AnnouncementListItem } from '../../types/announcement';

interface AnnouncementTableSectionProps {
  className?: string;
  data: AnnouncementListItem[];
}

export function AnnouncementTable({
  className,
  data,
}: AnnouncementTableSectionProps): React.ReactElement {
  const columns = useMemo(() => ANNOUNCEMENT_LIST_COLUMN, []);
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
            onClick={function (row: Row<AnnouncementListItem>): void {
              const announcementId = row.original.announcementId;
              if (!announcementId) {
                return;
              }
              router.push(`/announcement/${announcementId}`);
            }}
          />
        </motion.div>
      </AnimatePresence>
      <TablePagination className="mt-8" table={table} />
    </div>
  );
}
