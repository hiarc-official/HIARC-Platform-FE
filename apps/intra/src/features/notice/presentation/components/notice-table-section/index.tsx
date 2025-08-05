import {
  CategoryChip,
  cn,
  CommonTableBody,
  CommonTableHead,
  Label,
  TablePagination,
} from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/util';
import { ColumnDef, Row } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

export interface Notice {
  number?: number;
  name: string;
  category: 'rating' | 'study' | 'etc' | 'general' | 'external';
  title: string;
  date: string;
}

const OFFICER_LIST_COLUMN: Array<ColumnDef<Notice>> = [
  {
    id: 'name',
    accessorKey: 'name',
    enableSorting: false,
    size: 60,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        번호
      </Label>
    ),
    cell: ({ row }: { row: { original: Notice } }) => (
      <Label size="md" weight="regular">
        {row.original.number ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'category',
    accessorKey: 'category',
    size: 100,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        카테고리
      </Label>
    ),
    cell: ({ row }: { row: { original: Notice } }) => (
      <CategoryChip category={row.original.category}></CategoryChip>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'title',
    accessorKey: 'title',
    size: 0,
    meta: {
      headAlign: 'center',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        제목
      </Label>
    ),
    cell: ({ row }: { row: { original: Notice } }) => (
      <Label size="md" weight="regular" className="pl-4">
        {row.original.title ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'author',
    accessorKey: 'name',
    size: 64,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        작성자
      </Label>
    ),
    cell: ({ row }: { row: { original: Notice } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.name ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'date',
    accessorKey: 'date',
    size: 96,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        작성일
      </Label>
    ),
    cell: ({ row }: { row: { original: Notice } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.date ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
];

interface NoticeTableSectionProps {
  className?: string;
  data: Notice[];
}

export function NoticeTableSection({
  className,
  data,
}: NoticeTableSectionProps): React.ReactElement {
  const columns = useMemo(() => OFFICER_LIST_COLUMN, []);
  const [globalFilter, setGlobalFilter] = useState('');
  const router = useRouter();
  const table = useTable({
    columns,
    data,
    pageState: [0, () => {}],
    totalPages: 10,
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
