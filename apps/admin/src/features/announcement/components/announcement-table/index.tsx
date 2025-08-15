import { cn, CommonTableBody, CommonTableHead, Pagination } from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/util';
import { Announcement, PageableModel } from '@hiarc-platform/shared';
import { Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { getAdminAnnouncementListColumn } from './announcement-list-column';
import { useDeleteAdminAnnouncement } from '../../hooks/use-delete-admin-announcement';

import { AnimatePresence, motion } from 'framer-motion';

interface AdminAnnouncementTableProps {
  pageableModel?: PageableModel<Announcement> | null;
  className?: string;
  onPageChange?(page: number): void;
}

export function AnnouncementTable({
  pageableModel,
  className,
  onPageChange,
}: AdminAnnouncementTableProps): React.ReactElement {
  const router = useRouter();
  const { mutate: deleteAnnouncement } = useDeleteAdminAnnouncement();

  const handleDelete = useCallback(
    (id: number, options?: { onSuccess?(): void; onError?(error: unknown): void }): void => {
      deleteAnnouncement(id, {
        onSuccess: () => {
          options?.onSuccess?.();
        },
        onError: (error) => {
          options?.onError?.(error);
        },
      });
    },
    [deleteAnnouncement]
  );

  const handleEdit = useCallback(
    (id: number): void => {
      router.push(`/announcement/${id}/edit`);
    },
    [router]
  );

  const columns = useMemo(
    () => getAdminAnnouncementListColumn(handleDelete, handleEdit),
    [handleEdit, handleDelete]
  );
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
          <CommonTableHead className="text-gray-900" table={table} />
          <CommonTableBody
            table={table}
            onClick={function (row: Row<Announcement>): void {
              const announcementId = row.original.announcementId;

              if (announcementId !== undefined) {
                router.push(`/announcement/${announcementId}`);
              }
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* PageableModel 기반 Pagination */}
      {pageableModel && onPageChange && (
        <div className="flex w-full justify-center">
          <Pagination className="mt-8" pageableModel={pageableModel} onPageChange={onPageChange} />
        </div>
      )}
    </div>
  );
}
