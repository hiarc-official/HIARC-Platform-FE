import { cn, CommonTableBody, CommonTableHead, TablePagination } from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/util';
import { Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { ADMIN_NOTICE_LIST_COLUMN, Notice } from './admin-list-column';

interface AdminNoticeTableProps {
  data?: Notice[];
  className?: string;
}

export function AdminNoticeTable({ data, className }: AdminNoticeTableProps): React.ReactElement {
  const columns = useMemo(() => ADMIN_NOTICE_LIST_COLUMN, []);
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
      <CommonTableHead className="text-gray-900" table={table} />
      <CommonTableBody
        table={table}
        onClick={function (row: Row<Notice>): void {
          console.log('Row clicked:', row.original);
          const noticeNumber = row.original.number;
          if (noticeNumber !== undefined) {
            router.push(`/notice/${noticeNumber}`);
          }
        }}
      />
      <TablePagination className="mt-8" table={table} />
    </div>
  );
}
