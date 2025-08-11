'use client';
import { cn, CommonTableBody, CommonTableHead, Label } from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/util';
import { ColumnDef, Row } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

export interface StudyLeader {
  number?: number;
  role: string;
  name: string;
  handle: string;
  studyName: string;
}

const STAFF_LIST_COLUMN: Array<ColumnDef<StudyLeader>> = [
  {
    id: 'role',
    accessorKey: 'role',
    size: 150,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        직함
      </Label>
    ),
    cell: ({ row }: { row: { original: StudyLeader } }) => (
      <Label size="md" weight="regular">
        {row.original.role ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'name',
    accessorKey: 'name',
    size: 300,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        이름
      </Label>
    ),
    cell: ({ row }: { row: { original: StudyLeader } }) => (
      <Label size="md" weight="regular">
        {row.original.name ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'handle',
    accessorKey: 'handle',
    size: 300,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        핸들명
      </Label>
    ),
    cell: ({ row }: { row: { original: StudyLeader } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.handle ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'startStaff',
    accessorKey: 'startStaff',
    size: 300,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        스터디명
      </Label>
    ),
    cell: ({ row }: { row: { original: StudyLeader } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.studyName ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
];

interface StudyReaderTableSectionProps {
  studyLeaderData: StudyLeader[];
  className?: string;
}

export function StudyLeaderTable({
  studyLeaderData,
  className,
}: StudyReaderTableSectionProps): React.ReactElement {
  const router = useRouter();
  const columns = useMemo(() => STAFF_LIST_COLUMN, []);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useTable({
    columns,
    data: studyLeaderData,
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
            onClick={function (row: Row<StudyLeader>): void {
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
