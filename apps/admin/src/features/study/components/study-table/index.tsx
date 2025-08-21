import { PageableModel, StudySummary } from '@hiarc-platform/shared';
import {
  cn,
  CommonTableBody,
  CommonTableHead,
  Label,
  Pagination,
  StudyStatusChip,
} from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/util';
import { ColumnDef, Row } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

const STUDY_LIST_COLUMN: Array<ColumnDef<StudySummary>> = [
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
        상태
      </Label>
    ),
    cell: ({ row }: { row: { original: StudySummary } }) => (
      <StudyStatusChip status={row.original.studyStatus}></StudyStatusChip>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'semester',
    accessorKey: 'semester',
    size: 150,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        진행 학기
      </Label>
    ),
    cell: ({ row }: { row: { original: StudySummary } }) => (
      <Label size="md" weight="regular">
        {row.original.semesterName}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'studyName',
    accessorKey: 'studyName',
    size: 0,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        스터디명
      </Label>
    ),
    cell: ({ row }: { row: { original: StudySummary } }) => (
      <Label size="md" weight="regular" className="text-gray-700">
        {row.original.studyName ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'studyHead',
    accessorKey: 'studyHead',
    size: 300,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        스터디장 이름(핸들명)
      </Label>
    ),
    cell: ({ row }: { row: { original: StudySummary } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        ({row.original.instructorName ?? '-'}) {row.original.instructorBojHandle ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
];

interface StudyTableSectionProps {
  pageableModel?: PageableModel<StudySummary> | null;
  className?: string;
  onPageChange?(page: number): void;
}

export function StudyTable({
  pageableModel,
  className,
  onPageChange,
}: StudyTableSectionProps): React.ReactElement {
  const router = useRouter();
  const columns = useMemo(() => STUDY_LIST_COLUMN, []);
  const [globalFilter, setGlobalFilter] = useState('');

  const data = pageableModel?.content ?? [];
  const totalPages = pageableModel?.totalPages ?? 0;

  const table = useTable({
    columns,
    data,
    pageState: [0, () => {}],
    totalPages,
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
      {pageableModel && onPageChange && (
        <div className="flex w-full justify-center">
          <Pagination className="mt-8" pageableModel={pageableModel} onPageChange={onPageChange} />
        </div>
      )}
    </div>
  );
}
