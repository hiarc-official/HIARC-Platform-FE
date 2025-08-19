import {
  cn,
  CommonTableBody,
  CommonTableHead,
  Pagination,
  Label,
  Button,
  DialogUtil,
} from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/util';
import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { AnimatePresence, motion } from 'framer-motion';
import { PageableModel, Student } from '@hiarc-platform/shared';
import { useDeleteMember } from '@/features/student/hooks';

interface StudentTableProps {
  pageableModel?: PageableModel<Student>;
  className?: string;
  onPageChange?(page: number): void;
}

export function StudentTable({
  pageableModel,
  className,
  onPageChange,
}: StudentTableProps): React.ReactElement {
  const deleteMemberMutation = useDeleteMember();
  const [globalFilter, setGlobalFilter] = useState('');

  const handleDeleteMember = async (student: Student) => {
    DialogUtil.showConfirm(`${student.name}님을 정말로 탈퇴 처리하시겠습니까?`, async () => {
      try {
        await deleteMemberMutation.mutateAsync(student.id!);
      } catch (error) {
        console.error('탈퇴 처리 실패:', error);
      }
    });
  };

  const STUDENT_LIST_COLUMN: Array<ColumnDef<Student>> = [
    {
      id: 'number',
      accessorKey: 'number',
      enableSorting: false,
      size: 56,
      meta: {
        headAlign: 'center',
        bodyAlign: 'center',
      },
      header: () => (
        <Label size="md" weight="bold">
          번호
        </Label>
      ),
      cell: ({ row }: { row: { original: Student } }) => (
        <Label size="md" weight="regular">
          {row.original.id ?? '-'}
        </Label>
      ),
      footer: (props) => props.column.id,
    },
    {
      id: 'name',
      accessorKey: 'name',
      enableSorting: false,
      size: 100,
      meta: {
        headAlign: 'left',
        bodyAlign: 'left',
      },
      header: () => (
        <Label size="md" weight="bold">
          이름
        </Label>
      ),
      cell: ({ row }: { row: { original: Student } }) => (
        <Label size="md" weight="regular">
          {row.original.name ?? '-'}
        </Label>
      ),
      footer: (props) => props.column.id,
    },
    {
      id: 'bojHandle',
      accessorKey: 'bojHandle',
      enableSorting: false,
      size: 150,
      meta: {
        headAlign: 'left',
        bodyAlign: 'left',
      },
      header: () => (
        <Label size="md" weight="bold">
          핸들명
        </Label>
      ),
      cell: ({ row }: { row: { original: Student } }) => (
        <Label size="md" weight="regular">
          {row.original.bojHandle ?? '-'}
        </Label>
      ),
      footer: (props) => props.column.id,
    },
    {
      id: 'studentId',
      accessorKey: 'studentId',
      enableSorting: false,
      size: 100,
      meta: {
        headAlign: 'left',
        bodyAlign: 'left',
      },
      header: () => (
        <Label size="md" weight="bold">
          학번
        </Label>
      ),
      cell: ({ row }: { row: { original: Student } }) => (
        <Label size="md" weight="regular">
          {row.original.studentId ?? '-'}
        </Label>
      ),
      footer: (props) => props.column.id,
    },
    {
      id: 'contact',
      accessorKey: 'contact',
      enableSorting: false,
      size: 0,
      meta: {
        headAlign: 'left',
        bodyAlign: 'left',
      },
      header: () => (
        <Label size="md" weight="bold">
          연락처
        </Label>
      ),
      cell: ({ row }: { row: { original: Student } }) => (
        <Label size="md" weight="regular">
          {row.original.phoneAddress ?? '-'}
        </Label>
      ),
      footer: (props) => props.column.id,
    },
    {
      id: 'studyList',
      accessorKey: 'studyList',
      enableSorting: false,
      size: 0,
      meta: {
        headAlign: 'left',
        bodyAlign: 'left',
      },
      header: () => (
        <Label size="md" weight="bold">
          참여스터디
        </Label>
      ),
      cell: ({ row }: { row: { original: Student } }) => {
        const studies = row.original.studies;
        if (!studies || studies.length === 0) {
          return (
            <Label size="md" weight="regular">
              -
            </Label>
          );
        }

        return (
          <div className="flex flex-col gap-1">
            {studies.map((study, index) => (
              <Label key={index} size="md" weight="regular">
                • {study.studyName}
              </Label>
            ))}
          </div>
        );
      },
      footer: (props) => props.column.id,
    },
    {
      id: 'semester',
      accessorKey: 'semester',
      enableSorting: false,
      size: 0,
      meta: {
        headAlign: 'left',
        bodyAlign: 'left',
      },
      header: () => (
        <Label size="md" weight="bold">
          이전 참여 학기
        </Label>
      ),
      cell: ({ row }: { row: { original: Student } }) => {
        const semesters = row.original.participatedSemesters;
        if (!semesters || semesters.length === 0) {
          return (
            <Label size="md" weight="regular">
              -
            </Label>
          );
        }

        // 연도별로 그룹화
        const groupedByYear = semesters.reduce(
          (acc, semester) => {
            const year = semester.semesterYear;
            if (!acc[year ?? 0]) {
              acc[year ?? 0] = [];
            }
            acc[year ?? 0].push(semester);
            return acc;
          },
          {} as Record<number, typeof semesters>
        );

        return (
          <div className="flex flex-col gap-1">
            {Object.entries(groupedByYear)
              .sort(([first], [second]) => Number(second) - Number(first)) // 최신 연도부터
              .map(([year, yearSemesters]) => {
                const semesterTexts = yearSemesters
                  .sort((first) => (first.semesterType === 'FIRST' ? -1 : 1))
                  .map((semester) => `${semester.semesterType === 'FIRST' ? '1학기' : '2학기'}`)
                  .join(', ');

                return (
                  <Label key={year} size="md" weight="regular">
                    • {year}년 {semesterTexts}
                  </Label>
                );
              })}
          </div>
        );
      },
      footer: (props) => props.column.id,
    },
    {
      id: 'status',
      accessorKey: 'status',
      enableSorting: false,
      size: 0,
      meta: {
        headAlign: 'left',
        bodyAlign: 'left',
      },
      header: () => (
        <Label size="md" weight="bold">
          현재 상태
        </Label>
      ),
      cell: ({ row }: { row: { original: Student } }) => (
        <Label size="md" weight="regular">
          {row.original.memberRole ?? '-'}
        </Label>
      ),
      footer: (props) => props.column.id,
    },
    {
      id: 'withdrawButton',
      accessorKey: 'withdrawButton',
      size: 60,
      meta: {
        headAlign: 'left',
        bodyAlign: 'left',
      },
      header: () => (
        <Label size="md" weight="bold">
          탈퇴
        </Label>
      ),
      cell: ({ row }: { row: { original: Student } }) => (
        <Button
          className="relative z-10 w-full bg-primary-100"
          size="xs"
          onClick={(event) => {
            event.stopPropagation();
            handleDeleteMember(row.original);
          }}
          disabled={deleteMemberMutation.isPending}
        >
          탈퇴
        </Button>
      ),
      footer: (props) => props.column.id,
    },
  ];

  const columns = useMemo(() => STUDENT_LIST_COLUMN, [STUDENT_LIST_COLUMN]);
  const table = useTable({
    columns,
    data: pageableModel?.content ?? [],
    pageState: [pageableModel?.number ?? 0, () => {}],
    totalPages: pageableModel?.totalPages ?? 0,
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
          <CommonTableHead className="bg-gray-100 text-gray-900" table={table} />
          <CommonTableBody table={table} onClick={function (): void {}} />
        </motion.div>
      </AnimatePresence>
      {pageableModel && onPageChange && (
        <div className="flex w-full justify-center">
          <Pagination className="mt-8" pageableModel={pageableModel} onPageChange={onPageChange} />
        </div>
      )}
    </div>
  );
}
