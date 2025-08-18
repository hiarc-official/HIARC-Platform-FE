import { StudentApply } from '@hiarc-platform/shared';
import { Label, Button } from '@hiarc-platform/ui';
import { ColumnDef } from '@tanstack/react-table';
import { useSelectedSemester } from '@/hooks/use-semester-store';
import { useCurrentSemester } from '@/features/semester/hooks/use-current-semester';

function ApprovalButton({ studentApply }: { studentApply: StudentApply }) {
  const { selectedSemesterId } = useSelectedSemester();
  const { data: currentSemester } = useCurrentSemester();
  
  const isCurrentSemesterSelected = selectedSemesterId === currentSemester?.currentSemester?.semesterId?.toString();
  
  if (!isCurrentSemesterSelected) {
    return null;
  }
  
  return (
    <Button
      className="relative z-10 w-full bg-primary-100"
      size="xs"
      onClick={(event) => {
        event.stopPropagation();
        console.log('Edit clicked for:', studentApply);
      }}
    >
      승인하기
    </Button>
  );
}

export const STUDENT_APPLY_LIST_COLUMN: Array<ColumnDef<StudentApply>> = [
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
    cell: ({ row }: { row: { original: StudentApply } }) => (
      <Label size="md" weight="regular">
        {row.original.memberId ?? '-'}
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
    cell: ({ row }: { row: { original: StudentApply } }) => (
      <Label size="md" weight="regular">
        {row.original.memberName ?? '-'}
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
    cell: ({ row }: { row: { original: StudentApply } }) => (
      <Label size="md" weight="regular">
        {row.original.bojHandle ?? '-'}
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
    cell: ({ row }: { row: { original: StudentApply } }) => (
      <Label size="md" weight="regular">
        {row.original.phoneAddress ?? '-'}
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
    cell: ({ row }: { row: { original: StudentApply } }) => (
      <Label size="md" weight="regular">
        {row.original.studentId ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'department',
    accessorKey: 'department',
    enableSorting: false,
    size: 0,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        학과
      </Label>
    ),
    cell: ({ row }: { row: { original: StudentApply } }) => (
      <Label size="md" weight="regular">
        {row.original.department ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'doubleMajor',
    accessorKey: 'doubleMajor',
    enableSorting: false,
    size: 0,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        복전 여부
      </Label>
    ),
    cell: ({ row }: { row: { original: StudentApply } }) => (
      <Label size="md" weight="regular">
        {row.original.isDoubleMajor ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'grade',
    accessorKey: 'grade',
    enableSorting: false,
    size: 0,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        Grade
      </Label>
    ),
    cell: ({ row }: { row: { original: StudentApply } }) => (
      <Label size="md" weight="regular">
        {row.original.grade ?? '-'}
      </Label>
    ),
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
        재학여부
      </Label>
    ),
    cell: ({ row }: { row: { original: StudentApply } }) => (
      <Label size="md" weight="regular">
        {row.original.absenceStatus ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'approve',
    accessorKey: 'approve',
    enableSorting: false,
    size: 0,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        승인여부
      </Label>
    ),
    cell: ({ row }: { row: { original: StudentApply } }) => (
      <Label size="md" weight="regular">
        {row.original.applicationStatus ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'approveButton',
    accessorKey: 'approveButton',
    size: 60,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        승인
      </Label>
    ),
    cell: ({ row }: { row: { original: StudentApply } }) => (
      <ApprovalButton studentApply={row.original} />
    ),
    footer: (props) => props.column.id,
  },
];
