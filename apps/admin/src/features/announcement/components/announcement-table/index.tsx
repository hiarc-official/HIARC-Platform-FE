import { cn, CommonTableBody, CommonTableHead, TablePagination } from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/util';
import { Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { ADMIN_ANNOUNCEMENT_LIST_COLUMN } from './announcement-list-column';
import { Announcement } from '../../types/model/announcement';
import { AnimatePresence, motion } from 'framer-motion';

interface AdminAnnouncementTableProps {
  data?: Announcement[];
  className?: string;
}

export function AnnouncementTable({ data, className }: AdminAnnouncementTableProps): React.ReactElement {
  const columns = useMemo(() => ADMIN_ANNOUNCEMENT_LIST_COLUMN, []);
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
          <CommonTableHead className="text-gray-900" table={table} />
          <CommonTableBody
            table={table}
            onClick={function (row: Row<Announcement>): void {
              console.log('Row clicked:', row.original);
              const announcementId = row.original.announcementId;
              if (announcementId !== undefined) {
                router.push(`/announcement/${announcementId}`);
              }
            }}
          />
        </motion.div>
      </AnimatePresence>
      <TablePagination className="mt-8" table={table} />
    </div>
  );
}
