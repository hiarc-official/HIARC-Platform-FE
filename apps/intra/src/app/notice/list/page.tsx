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
  Tabs,
} from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/util';
import { ColumnDef, Row } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
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

const noticeData: Notice[] = [
  { name: '피카츄', title: '첫 번째 공지사항', date: '2025.10.01', number: 1, category: 'general' },
  { name: '라이츄', title: '두 번째 공지사항', date: '2025.10.02', number: 2, category: 'study' },
  { name: '파이리', title: '세 번째 공지사항', date: '2025.10.03', number: 3, category: 'rating' },
  { name: '꼬부기', title: '네 번째 공지사항', date: '2025.10.04', number: 4, category: 'etc' },
  {
    name: '버터플',
    title: '다섯 번째 공지사항',
    date: '2025.10.05',
    number: 5,
    category: 'external',
  },
  {
    name: '야도란',
    title: '여섯 번째 공지사항',
    date: '2025.10.06',
    number: 6,
    category: 'general',
  },
  {
    name: '피죤투',
    title: '일곱 번째 공지사항',
    date: '2025.10.06',
    number: 7,
    category: 'general',
  },
  {
    name: '또가스',
    title: '여덟 번째 공지사항',
    date: '2025.10.06',
    number: 8,
    category: 'general',
  },
  {
    name: '아보',
    title: '아홉 번째 공지사항',
    date: '2025.10.06',
    number: 9,
    category: 'general',
  },
  {
    name: '이상해씨',
    title: '열 번째 공지사항',
    date: '2025.10.06',
    number: 10,
    category: 'general',
  },
];

const newsData: Notice[] = [
  {
    name: '피카츄 뉴스',
    title: '첫 번째 뉴스',
    date: '2025.10.01',
    number: 1,
    category: 'general',
  },
  {
    name: '라이츄 뉴스',
    title: '두 번째 뉴스',
    date: '2025.10.02',
    number: 2,
    category: 'study',
  },
  {
    name: '파이리 뉴스',
    title: '세 번째 뉴스',
    date: '2025.10.03',
    number: 3,
    category: 'rating',
  },
  {
    name: '꼬부기 뉴스',
    title: '네 번째 뉴스',
    date: '2025.10.04',
    number: 4,
    category: 'etc',
  },
  {
    name: '버터플 뉴스',
    title: '다섯 번째 뉴스',
    date: '2025.10.05',
    number: 5,
    category: 'external',
  },
  {
    name: '야도란 뉴스',
    title: '여섯 번째 뉴스',
    date: '2025.10.06',
    number: 6,
    category: 'general',
  },
  {
    name: '피죤투 뉴스',
    title: '일곱 번째 뉴스',
    date: '2025.10.06',
    number: 7,
    category: 'general',
  },
  {
    name: '또가스 뉴스',
    title: '여덟 번째 뉴스',
    date: '2025.10.06',
    number: 8,
    category: 'general',
  },
  {
    name: '아보 뉴스',
    title: '아홉 번째 뉴스',
    date: '2025.10.06',
    number: 9,
    category: 'general',
  },
  {
    name: '이상해씨 뉴스',
    title: '열 번째 뉴스',
    date: '2025.10.06',
    number: 10,
    category: 'general',
  },
];

export default function NoticeList(): React.ReactElement {
  const columns = useMemo(() => OFFICER_LIST_COLUMN, []);
  const [globalFilter, setGlobalFilter] = useState('');
  const router = useRouter();
  const tabItems = [
    { label: '알고리즘 소식', value: 'news' },
    { label: '공지사항', value: 'notice' },
  ];
  const [tab, setTab] = useState('notice');

  const data = tab === 'news' ? newsData : noticeData;

  const table = useTable({
    columns,
    data,
    pageState: [0, () => {}],
    totalPages: 10,
    globalFilterState: [globalFilter, setGlobalFilter],
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-8">
      <div className="z-10 flex w-full max-w-[1200px] flex-col items-center gap-8">
        <Tabs tabs={tabItems} activeTab={tab} onTabClick={setTab} className="self-start" />
        <div className="flex w-full items-end justify-between gap-4 rounded-md border border-gray-100 p-6 ">
          <LabeledSelector
            placeholder={'123'}
            required={false}
            label={'카테고리'}
            options={[]}
            value="123"
            onChange={(value: unknown) => {
              console.log(value);
            }}
          />
          <LabeledSelector
            placeholder={'123'}
            required={false}
            label={'학기'}
            options={[]}
            value="123"
            onChange={(value: unknown) => {
              console.log(value);
            }}
          />
          <LabeledInput label={'123'}></LabeledInput>
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
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="w-full"
          >
            <table className="w-full table-fixed">
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
            </table>
            <TablePagination table={table} />
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
