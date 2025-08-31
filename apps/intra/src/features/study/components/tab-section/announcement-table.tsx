import { AnnouncementSummary, PageableModel } from '@hiarc-platform/shared';
import { cn, CommonTableBody, CommonTableHead, Label, Pagination } from '@hiarc-platform/ui';
import { DateUtil, useTable } from '@hiarc-platform/shared';
import { ColumnDef, Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

const MOBILE_STUDY_ANNOUNCEMENT_COLUMN: Array<ColumnDef<AnnouncementSummary>> = [
  {
    id: 'number',
    accessorKey: 'number',
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
    cell: ({ row }: { row: { original: AnnouncementSummary } }) => (
      <Label size="md" weight="regular">
        {row.original.announcementId ?? '-'}
      </Label>
    ),
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
    cell: ({ row }: { row: { original: AnnouncementSummary } }) => (
      <Label size="md" weight="regular" className="pl-4">
        {row.original.title ?? '-'}
      </Label>
    ),
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
    cell: ({ row }: { row: { original: AnnouncementSummary } }) => (
      <Label size="xs" weight="regular">
        {DateUtil.formatDateWithDots(row.original.createdAt ?? '') ?? '-'}
      </Label>
    ),
  },
];

const STUDY_ANNOUNCEMENT_COLUMN: Array<ColumnDef<AnnouncementSummary>> = [
  {
    id: 'number',
    accessorKey: 'number',
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
    cell: ({ row }: { row: { original: AnnouncementSummary } }) => (
      <Label size="md" weight="regular">
        {row.original.announcementId ?? '-'}
      </Label>
    ),
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
    cell: ({ row }: { row: { original: AnnouncementSummary } }) => (
      <Label size="md" weight="regular" className="pl-4">
        {row.original.title ?? '-'}
      </Label>
    ),
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
    cell: ({ row }: { row: { original: AnnouncementSummary } }) => (
      <Label size="xs" weight="regular">
        {DateUtil.formatDateWithDots(row.original.createdAt ?? '') ?? '-'}
      </Label>
    ),
  },
];

interface AnnouncementTableProps {
  pageableModel?: PageableModel<AnnouncementSummary> | null;
  onPageChange?(page: number): void;
  className?: string;
}

export function AnnouncementTable({
  className,
  pageableModel,
  onPageChange,
}: AnnouncementTableProps): React.ReactElement {
  const desktopColumns = useMemo(() => STUDY_ANNOUNCEMENT_COLUMN, []);
  const mobileColumns = useMemo(() => MOBILE_STUDY_ANNOUNCEMENT_COLUMN, []);
  const [globalFilter, setGlobalFilter] = useState('');
  const router = useRouter();

  const desktopTable = useTable({
    columns: desktopColumns,
    data: pageableModel?.content ?? [],
    pageState: [0, () => {}],
    totalPages: pageableModel?.totalPages ?? 0,
    globalFilterState: [globalFilter, setGlobalFilter],
  });
  
  const mobileTable = useTable({
    columns: mobileColumns,
    data: pageableModel?.content ?? [],
    pageState: [0, () => {}],
    totalPages: pageableModel?.totalPages ?? 0,
    globalFilterState: [globalFilter, setGlobalFilter],
  });

  return (
    <div className={cn('flex w-full flex-col', className)}>
      {/* 데스크톱 뷰 */}
      <div className="hidden md:block w-full">
        <CommonTableHead table={desktopTable} className="border-b border-b-gray-200" />
        <CommonTableBody
          table={desktopTable}
          onClick={function (row: Row<AnnouncementSummary>): void {
            const id = row.original.announcementId;
            if (!id) {
              return;
            }
            router.push(`/announcement/${id}`);
          }}
        />
      </div>
      
      {/* 모바일 뷰 */}
      <div className="block md:hidden w-full">
        <CommonTableBody
          table={mobileTable}
          onClick={function (row: Row<AnnouncementSummary>): void {
            const id = row.original.announcementId;
            if (!id) {
              return;
            }
            router.push(`/announcement/${id}`);
          }}
        />
      </div>

      {pageableModel && onPageChange && (
        <div className="flex w-full justify-center">
          <Pagination className="mt-8" pageableModel={pageableModel} onPageChange={onPageChange} />
        </div>
      )}
    </div>
  );
}
