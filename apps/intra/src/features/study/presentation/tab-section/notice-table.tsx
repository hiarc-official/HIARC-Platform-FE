import { cn, CommonTableBody, CommonTableHead, Label, TablePagination } from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/util';
import { ColumnDef, Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

interface StudyNotice {
  number?: number;
  name: string;
  category: 'rating' | 'study' | 'etc' | 'general' | 'external';
  title: string;
  date: string;
}

const STUDY_NOTICE_COLUMN: Array<ColumnDef<StudyNotice>> = [
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
    cell: ({ row }: { row: { original: StudyNotice } }) => (
      <Label size="md" weight="regular">
        {row.original.number ?? '-'}
      </Label>
    ),
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
    cell: ({ row }: { row: { original: StudyNotice } }) => (
      <Label size="md" weight="regular" className="pl-4">
        {row.original.title ?? '-'}
      </Label>
    ),
  },
  {
    id: 'date',
    accessorKey: 'date',
    size: 25,
    minSize: 25,
    maxSize: 25,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        작성일
      </Label>
    ),
    cell: ({ row }: { row: { original: StudyNotice } }) => (
      <Label size="md" weight="regular">
        {row.original.date ?? '-'}
      </Label>
    ),
  },
];

const noticeData: StudyNotice[] = [
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

interface NoticeTableProps {
  className?: string;
}

export function NoticeTable({ className }: NoticeTableProps): React.ReactElement {
  const columns = useMemo(() => STUDY_NOTICE_COLUMN, []);
  const [globalFilter, setGlobalFilter] = useState('');
  const router = useRouter();

  const table = useTable({
    columns,
    data: noticeData,
    pageState: [0, () => {}],
    totalPages: 10,
    globalFilterState: [globalFilter, setGlobalFilter],
  });

  return (
    <div className={cn('flex w-full flex-col gap-4', className)}>
      <table className="w-full table-fixed">
        <CommonTableHead table={table} className="border-b border-b-gray-200" />
        <CommonTableBody
          table={table}
          onClick={function (row: Row<StudyNotice>): void {
            const id = row.original.number;
            if (!id) {
              return;
            }
            router.push(`/study/notice/${id}`);
          }}
        />
      </table>
      <TablePagination table={table} />
    </div>
  );
}
