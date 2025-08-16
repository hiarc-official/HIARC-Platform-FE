'use client';
import { cn, CommonTableBody, CommonTableHead, IconButton, Label } from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/util';
import { ColumnDef, Row } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

export interface Staff {
  number?: number;
  role: string;
  name: string;
  handle: string;
  startStaff: string;
}

const STAFF_LIST_COLUMN: Array<ColumnDef<Staff>> = [
  {
    id: 'role',
    accessorKey: 'role',
    size: 120,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        직함
      </Label>
    ),
    cell: ({ row }: { row: { original: Staff } }) => (
      <Label size="md" weight="regular">
        {row.original.role ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'name',
    accessorKey: 'name',
    size: 0,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        이름
      </Label>
    ),
    cell: ({ row }: { row: { original: Staff } }) => (
      <Label size="md" weight="regular">
        {row.original.name ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'handle',
    accessorKey: 'handle',
    size: 0,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        핸들명
      </Label>
    ),
    cell: ({ row }: { row: { original: Staff } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.handle ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'startStaff',
    accessorKey: 'startStaff',
    size: 0,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        직함 시작일
      </Label>
    ),
    cell: ({ row }: { row: { original: Staff } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.startStaff ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'date',
    accessorKey: 'date',
    size: 64,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        수정
      </Label>
    ),
    cell: ({ row }: { row: { original: Staff } }) => (
      <IconButton
        className="relative z-10 w-full"
        iconSrc="/shared-assets/Edit.svg"
        size="sm"
        onClick={(event) => {
          event.stopPropagation();
          console.log('Edit clicked for:', row.original);
        }}
      />
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'date',
    accessorKey: 'date',
    size: 64,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        삭제
      </Label>
    ),
    cell: ({ row }: { row: { original: Staff } }) => (
      <IconButton
        className="relative z-10 w-full"
        iconSrc="/shared-assets/Delete.svg"
        size="sm"
        onClick={(event) => {
          event.stopPropagation();
          console.log('Edit clicked for:', row.original);
        }}
      />
    ),
    footer: (props) => props.column.id,
  },
];

interface StaffTableSectionProps {
  staffData: Staff[];
  className?: string;
}

export function StaffTable({ staffData, className }: StaffTableSectionProps): React.ReactElement {
  const router = useRouter();
  const columns = useMemo(() => STAFF_LIST_COLUMN, []);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useTable({
    columns,
    data: staffData,
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
          <CommonTableHead table={table} className="bg-gray-100" />
          <CommonTableBody
            table={table}
            onClick={function (row: Row<Staff>): void {
              const id = row.original.number;
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
