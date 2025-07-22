'use client';

import { CommonTableBody, CommonTableHead, Label, TablePagination } from '@hiarc-platform/ui';
import { CategoryChip } from '@hiarc-platform/ui/src/components/category-chip';

import { useTable } from '@hiarc-platform/util';
import { ColumnDef, Row } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

interface Notice {
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
];

export default function Test(): React.ReactElement {
  const columns = useMemo(() => OFFICER_LIST_COLUMN, []);

  const [globalFilter, setGlobalFilter] = useState('');
  const table = useTable({
    columns,
    data: officersData,
    pageState: [0, () => {}],
    totalPages: 10,
    globalFilterState: [globalFilter, setGlobalFilter],
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
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
    </main>
  );
}
