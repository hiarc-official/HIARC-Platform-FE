'use client';
import { Admin } from '@hiarc-platform/shared';
import {
  cn,
  CommonTableBody,
  CommonTableHead,
  DialogUtil,
  IconButton,
  Label,
} from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/util';
import { ColumnDef } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { EditAdminDialog } from '../edit-admin-dialog';
import { useDeleteAdmin } from '@/features/student/hooks';
import { useSelectedSemester } from '@/hooks/use-semester-store';

interface StaffTableSectionProps {
  staffData: Admin[];
  className?: string;
}

export function StaffTable({ staffData, className }: StaffTableSectionProps): React.ReactElement {
  const deleteAdminMutation = useDeleteAdmin();
  const { selectedSemesterId } = useSelectedSemester();
  const [globalFilter, setGlobalFilter] = useState('');

  const handleDeleteAdmin = async (admin: Admin) => {
    if (!selectedSemesterId) {
      alert('학기를 선택해주세요.');
      return;
    }

    DialogUtil.showConfirm(`${admin.memberName}님의 관리자 권한을 삭제하시겠습니까?`, async () => {
      try {
        await deleteAdminMutation.mutateAsync({
          memberId: admin.memberId,
          semesterId: Number(selectedSemesterId),
        });
      } catch (error) {
        console.error('삭제 실패:', error);
      }
    });
  };

  const STAFF_LIST_COLUMN: Array<ColumnDef<Admin>> = [
    {
      id: 'role',
      accessorKey: 'role',
      size: 120,
      meta: {
        headAlign: 'left',
        bodyAlign: 'left',
      },
      header: () => (
        <Label size="md" weight="bold">
          직함
        </Label>
      ),
      cell: ({ row }: { row: { original: Admin } }) => (
        <Label size="md" weight="regular">
          {row.original.adminRole ?? '-'}
        </Label>
      ),
      footer: (props) => props.column.id,
    },
    {
      id: 'name',
      accessorKey: 'name',
      size: 0,
      meta: {
        headAlign: 'left',
        bodyAlign: 'left',
      },
      header: () => (
        <Label size="md" weight="bold">
          이름
        </Label>
      ),
      cell: ({ row }: { row: { original: Admin } }) => (
        <Label size="md" weight="regular">
          {row.original.memberName ?? '-'}
        </Label>
      ),
      footer: (props) => props.column.id,
    },
    {
      id: 'handle',
      accessorKey: 'handle',
      size: 0,
      meta: {
        headAlign: 'left',
        bodyAlign: 'left',
      },
      header: () => (
        <Label size="md" weight="bold">
          핸들명
        </Label>
      ),
      cell: ({ row }: { row: { original: Admin } }) => (
        <Label size="sm" weight="regular" className="text-gray-700">
          {row.original.bojHandle ?? '-'}
        </Label>
      ),
      footer: (props) => props.column.id,
    },
    {
      id: 'startStaff',
      accessorKey: 'startStaff',
      size: 0,
      meta: {
        headAlign: 'left',
        bodyAlign: 'left',
      },
      header: () => (
        <Label size="md" weight="bold">
          직함 시작일
        </Label>
      ),
      cell: ({ row }: { row: { original: Admin } }) => {
        const formatDate = (date: string | Date | null | undefined) => {
          if (!date) {
            return '-';
          }
          const dateObj = typeof date === 'string' ? new Date(date) : date;
          return dateObj.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
        };

        return (
          <Label size="sm" weight="regular" className="text-gray-700">
            {formatDate(row.original.adminStartedAt)}
          </Label>
        );
      },
      footer: (props) => props.column.id,
    },
    {
      id: 'edit',
      accessorKey: 'edit',
      size: 64,
      meta: {
        headAlign: 'center',
        bodyAlign: 'center',
      },
      header: () => (
        <Label size="md" weight="bold">
          수정
        </Label>
      ),
      cell: ({ row }: { row: { original: Admin } }) => (
        <IconButton
          className="relative z-10 w-full"
          iconSrc="/shared-assets/Edit.svg"
          size="sm"
          onClick={(event) => {
            event.stopPropagation();
            DialogUtil.showComponent(<EditAdminDialog admin={row.original} />);
          }}
        />
      ),
      footer: (props) => props.column.id,
    },
    {
      id: 'delete',
      accessorKey: 'delete',
      size: 64,
      meta: {
        headAlign: 'center',
        bodyAlign: 'center',
      },
      header: () => (
        <Label size="md" weight="bold">
          삭제
        </Label>
      ),
      cell: ({ row }: { row: { original: Admin } }) => (
        <IconButton
          className="relative z-10 w-full"
          iconSrc="/shared-assets/Delete.svg"
          size="sm"
          onClick={(event) => {
            event.stopPropagation();
            handleDeleteAdmin(row.original);
          }}
          disabled={deleteAdminMutation.isPending}
        />
      ),
      footer: (props) => props.column.id,
    },
  ];

  const columns = useMemo(() => STAFF_LIST_COLUMN, [STAFF_LIST_COLUMN]);

  const table = useTable({
    columns,
    data: staffData,
    pageState: [0, () => {}],
    totalPages: 10,
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
          <CommonTableBody table={table} onClick={function (): void {}} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
