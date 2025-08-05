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

export interface Study {
  number?: number;
  category: 'onGoing' | 'recruiting' | 'finished';
  semester: string;
  studyName: string;
  studyHead: string;
  date: string;
}

const STUDY_LIST_COLUMN: Array<ColumnDef<Study>> = [
  {
    id: 'category',
    accessorKey: 'category',
    size: 50,
    minSize: 50,
    maxSize: 50,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        상태
      </Label>
    ),
    cell: ({ row }: { row: { original: Study } }) => (
      <CategoryChip category={row.original.category}></CategoryChip>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'semester',
    accessorKey: 'semester',
    size: 50,
    minSize: 50,
    maxSize: 50,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        진행 학기
      </Label>
    ),
    cell: ({ row }: { row: { original: Study } }) => (
      <Label size="md" weight="regular">
        {row.original.semester ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'studyName',
    accessorKey: 'studyName',
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        스터디명
      </Label>
    ),
    cell: ({ row }: { row: { original: Study } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.studyName ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'studyHead',
    accessorKey: 'studyHead',
    size: 50,
    minSize: 50,
    maxSize: 50,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        스터디장
      </Label>
    ),
    cell: ({ row }: { row: { original: Study } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.studyHead ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
];

interface StudyTableSectionProps {
  studyData: Study[];
  className?: string;
}

export function StudyTableSection({
  studyData,
  className,
}: StudyTableSectionProps): React.ReactElement {
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
          <table className="w-full table-fixed">
            <CommonTableHead table={table} className="bg-gray-100" />
            <CommonTableBody
              table={table}
              onClick={function (row: Row<Study>): void {
                const id = row.original.number;
                if (!id) {
                  return;
                }
                router.push(`/study/${id}`);
              }}
            />
          </table>
        </motion.div>
      </AnimatePresence>
      <TablePagination className="pt-8" table={table} />
    </div>
  );
}
