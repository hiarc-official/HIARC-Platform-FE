'use client';

import { AnnouncementSummary, PageableModel } from '@hiarc-platform/shared';
import { cn, CommonTableBody, CommonTableHead, Pagination, DialogUtil } from '../../..';
import { useTable } from '@hiarc-platform/shared';
import { Row } from '@tanstack/react-table';
import { useMemo, useState, useCallback } from 'react';
import {
  STUDY_ANNOUNCEMENT_COLUMN,
  MOBILE_STUDY_ANNOUNCEMENT_COLUMN,
} from './announcement-columns';

interface AnnouncementTableProps {
  pageableModel?: PageableModel<AnnouncementSummary> | null;
  onPageChange?(page: number): void;
  className?: string;
  isInstructor?: boolean;
  studyId?: number;
  semesterId?: number;
  onEditClick?(announcement: AnnouncementSummary): void;
  onDeleteClick?(announcementId: number): void;
  onRowClick?(announcement: AnnouncementSummary): void;
}

export function StudyAnnouncementTable({
  className,
  pageableModel,
  onPageChange,
  isInstructor = false,
  onEditClick,
  onDeleteClick,
  onRowClick,
}: AnnouncementTableProps): React.ReactElement {
  const [globalFilter, setGlobalFilter] = useState('');

  const handleEdit = useCallback(
    (announcement: AnnouncementSummary): void => {
      onEditClick?.(announcement);
    },
    [onEditClick]
  );

  const handleDelete = useCallback(
    (announcement: AnnouncementSummary): void => {
      if (!announcement.announcementId) {
        console.error('공지사항 삭제 실패: announcementId가 없습니다.');
        return;
      }

      DialogUtil.showConfirm('정말 이 공지사항을 삭제하시겠습니까?', () => {
        onDeleteClick?.(announcement.announcementId!);
      });
    },
    [onDeleteClick]
  );

  const desktopColumns = useMemo(
    () =>
      STUDY_ANNOUNCEMENT_COLUMN.filter((col) => col.id !== 'actions' || isInstructor).map(
        (col) => ({
          ...col,
          meta: {
            ...col.meta,
            isInstructor,
            handleEdit,
            handleDelete,
          },
        })
      ),
    [isInstructor, handleEdit, handleDelete]
  );

  const mobileColumns = useMemo(
    () =>
      MOBILE_STUDY_ANNOUNCEMENT_COLUMN.filter((col) => col.id !== 'actions' || isInstructor).map(
        (col) => ({
          ...col,
          meta: {
            ...col.meta,
            isInstructor,
            handleEdit,
            handleDelete,
          },
        })
      ),
    [isInstructor, handleEdit, handleDelete]
  );

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
      <div className="hidden w-full md:block">
        <CommonTableHead table={desktopTable} className="border-b border-b-gray-200" />
        <CommonTableBody
          table={desktopTable}
          onClick={function (row: Row<AnnouncementSummary>): void {
            onRowClick?.(row.original);
          }}
        />
      </div>

      {/* 모바일 뷰 */}
      <div className="block w-full md:hidden">
        <CommonTableBody
          table={mobileTable}
          gapPx={0}
          onClick={function (row: Row<AnnouncementSummary>): void {
            onRowClick?.(row.original);
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
