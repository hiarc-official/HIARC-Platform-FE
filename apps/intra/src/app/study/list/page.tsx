'use client';

import {
  Button,
  CategoryChip,
  CommonTableBody,
  CommonTableHead,
  Label,
  LabeledInput,
  LabeledSelector,
  TablePagination,
  Title,
} from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/util';
import { ColumnDef, Row } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

interface Study {
  number?: number;
  category: 'rating' | 'study' | 'etc' | 'general' | 'external';
  semester: string;
  studyName: string;
  studyHead: string;
  date: string;
}

const STUDY_LIST_COLUMN: Array<ColumnDef<Study>> = [
  {
    id: 'category',
    accessorKey: 'category',
    size: 30,
    minSize: 30,
    maxSize: 30,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        카테고리
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
    size: 30,
    minSize: 30,
    maxSize: 30,
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
    size: 40,
    minSize: 40,
    maxSize: 40,
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

const studyData: Study[] = [
  {
    studyName: '알고리즘 스터디',
    category: 'study',
    semester: '2025-1',
    studyHead: '피카츄',
    date: '2025.10.01',
    number: 1,
  },
  {
    studyName: '알고리즘 스터디',
    category: 'study',
    semester: '2025-1',
    studyHead: '피카츄',
    date: '2025.10.01',
    number: 2,
  },
  {
    studyName: '알고리즘 스터디',
    category: 'study',
    semester: '2025-1',
    studyHead: '피카츄',
    date: '2025.10.01',
    number: 3,
  },
  {
    studyName: '알고리즘 스터디',
    category: 'study',
    semester: '2025-1',
    studyHead: '피카츄',
    date: '2025.10.01',
    number: 1,
  },
];

export default function StudyListPage(): React.ReactElement {
  const columns = useMemo(() => STUDY_LIST_COLUMN, []);
  const [globalFilter, setGlobalFilter] = useState('');
  const router = useRouter();

  const table = useTable({
    columns,
    data: studyData,
    pageState: [0, () => {}],
    totalPages: 10,
    globalFilterState: [globalFilter, setGlobalFilter],
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-8">
      <div className="z-10 flex w-full max-w-[1200px] flex-col gap-8">
        <Title size="sm" weight="bold">
          스터디
        </Title>
        <div className="flex w-full items-end justify-between gap-4 rounded-md border border-gray-100 p-6 ">
          <LabeledSelector
            placeholder={'123'}
            required={false}
            label={'진행 학기'}
            options={[]}
            value="123"
            onChange={(value: unknown) => {
              console.log(value);
            }}
          />
          <LabeledInput label={'스터디명'}></LabeledInput>
          <div className="flex w-full items-center gap-2">
            <Button variant="secondary" size="md" className="w-full">
              초기화
            </Button>
            <Button variant="fill" size="md" className="w-full bg-primary-200">
              검색
            </Button>
          </div>
        </div>

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
    </main>
  );
}
