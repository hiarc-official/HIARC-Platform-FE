'use client';

import { CommonTableBody, CommonTableHead, Label, TablePagination } from '@hiarc-platform/ui';
import { CategoryChip } from '@hiarc-platform/ui/src/components/category-chip';
import { Title } from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/util';
import { ColumnDef, Row } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { Button } from '@hiarc-platform/ui';
import SelectButtonSection from '@/features/components/notice-section/select-button-section';
import { useRouter } from 'next/navigation';

interface Notice {
  number?: number;
  name: string;
  category: 'rating' | 'study' | 'etc' | 'general' | 'external';
  title: string;
  date: string;
  isPublic?: boolean;
}

const OFFICER_LIST_COLUMN: Array<ColumnDef<Notice>> = [
  {
    id: 'name',
    accessorKey: 'name',
    enableSorting: false,
    size: 15,
    minSize: 15,
    maxSize: 15,
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
    size: 20,
    minSize: 20,
    maxSize: 20,
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
    size: 20,
    minSize: 20,
    maxSize: 20,
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
    size: 20,
    minSize: 20,
    maxSize: 20,
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

const officersData: Notice[] = [
  { name: 'John', title: '첫 번째 공지사항', date: '2025.10.01', number: 1, category: 'general' },
  { name: 'Jane', title: '두 번째 공지사항', date: '2025.10.02', number: 2, category: 'study' },
  { name: 'Alice', title: '세 번째 공지사항', date: '2025.10.03', number: 3, category: 'rating' },
  { name: 'Bob', title: '네 번째 공지사항', date: '2025.10.04', number: 4, category: 'etc' },
  {
    name: 'Charlie',
    title: '다섯 번째 공지사항',
    date: '2025.10.05',
    number: 5,
    category: 'external',
  },
  {
    name: 'David',
    title: '여섯 번째 공지사항',
    date: '2025.10.06',
    number: 6,
    category: 'general',
  },
  { name: 'Eve', title: '일곱 번째 공지사항', date: '2025.10.07', number: 7, category: 'study' },
  { name: 'Frank', title: '여덟 번째 공지사항', date: '2025.10.08', number: 8, category: 'rating' },
  { name: 'Grace', title: '아홉 번째 공지사항', date: '2025.10.09', number: 9, category: 'etc' },
  { name: 'Henry', title: '열 번째 공지사항', date: '2025.10.10', number: 10, category: 'general' },
  {
    name: 'Ivy',
    title: '열한 번째 공지사항',
    date: '2025.10.11',
    number: 11,
    category: 'external',
  },
  { name: 'Jack', title: '열두 번째 공지사항', date: '2025.10.12', number: 12, category: 'study' },
  { name: 'Kate', title: '열세 번째 공지사항', date: '2025.10.13', number: 13, category: 'rating' },
  { name: 'Luke', title: '열네 번째 공지사항', date: '2025.10.14', number: 14, category: 'etc' },
  {
    name: 'Mary',
    title: '열다섯 번째 공지사항',
    date: '2025.10.15',
    number: 15,
    category: 'general',
  },
];

export default function NoticePage(): React.ReactElement {
  const columns = useMemo(() => OFFICER_LIST_COLUMN, []);
  const router = useRouter();
  const [globalFilter, setGlobalFilter] = useState('');
  const table = useTable({
    columns,
    data: officersData,
    pageState: [0, () => {}],
    totalPages: 10,
    globalFilterState: [globalFilter, setGlobalFilter],
  });

  return (
    <main className="flex w-full  justify-center ">
      <div className="mt-7 flex max-w-[1200px] flex-col ">
        <div className="mb-7  flex justify-between">
          <Title size="sm" weight="bold">
            공지사항
          </Title>
          <Button size="md" onClick={() => router.push('/notice/write')}>
            작성하기
          </Button>
        </div>
        <SelectButtonSection />
        <div className="z-10 mt-6  flex-col items-center justify-between font-mono text-sm lg:flex">
          <table className="w-full table-fixed">
            <CommonTableHead table={table} />
            <CommonTableBody
              table={table}
              onClick={function (row: Row<Notice>): void {
                console.log('Row clicked:', row.original);
              }}
            />
          </table>
          <TablePagination table={table}></TablePagination>
        </div>
      </div>
    </main>
  );
}
