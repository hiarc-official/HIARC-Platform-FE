import { cn, CommonTableBody, CommonTableHead, Pagination, SlideFade } from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/shared';
import { Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { ANNOUNCEMENT_LIST_COLUMN, MOBILE_ANNOUNCEMENT_LIST_COLUMN } from './announcement-list-column';
import { AnnouncementSummary, PageableModel } from '@hiarc-platform/shared';

interface AnnouncementTableSectionProps {
  pageableModel?: PageableModel<AnnouncementSummary>;
  className?: string;
  onPageChange?(page: number): void;
}

export function AnnouncementTable({
  className,
  pageableModel,
  onPageChange,
}: AnnouncementTableSectionProps): React.ReactElement {
  const desktopColumns = useMemo(() => ANNOUNCEMENT_LIST_COLUMN, []);
  const mobileColumns = useMemo(() => MOBILE_ANNOUNCEMENT_LIST_COLUMN, []);
  const [globalFilter, setGlobalFilter] = useState('');
  const [page, setPage] = useState(0);
  const router = useRouter();

  const desktopTable = useTable({
    columns: desktopColumns,
    data: pageableModel?.content || [],
    pageState: [page, setPage],
    totalPages: Math.ceil((pageableModel?.totalElements || 0) / 10),
    globalFilterState: [globalFilter, setGlobalFilter],
  });
  
  const mobileTable = useTable({
    columns: mobileColumns,
    data: pageableModel?.content || [],
    pageState: [page, setPage],
    totalPages: Math.ceil((pageableModel?.totalElements || 0) / 10),
    globalFilterState: [globalFilter, setGlobalFilter],
  });

  return (
    <div className={cn('flex w-full flex-col', className)}>
      {/* 데스크톱 뷰 */}
      <SlideFade key="desktop-table" className="hidden md:block w-full">
        <CommonTableHead
          table={desktopTable}
          className="border-b border-t border-b-gray-200 border-t-gray-900 bg-white"
        />
        <CommonTableBody
          table={desktopTable}
          onClick={function (row: Row<AnnouncementSummary>): void {
            const announcementId = row.original.announcementId;
            if (!announcementId) {
              return;
            }
            router.push(`/announcement/${announcementId}`);
          }}
        />
      </SlideFade>
      
      {/* 모바일 뷰 */}
      <SlideFade key="mobile-table" className="block md:hidden w-full">
        <CommonTableBody
          table={mobileTable}
          onClick={function (row: Row<AnnouncementSummary>): void {
            const announcementId = row.original.announcementId;
            if (!announcementId) {
              return;
            }
            router.push(`/announcement/${announcementId}`);
          }}
        />
      </SlideFade>
      
      {pageableModel && onPageChange && (
        <div className="flex w-full justify-center">
          <Pagination className="mt-8" pageableModel={pageableModel} onPageChange={onPageChange} />
        </div>
      )}
    </div>
  );
}
