import { Label, Button } from '@hiarc-platform/ui';
import { ColumnDef } from '@tanstack/react-table';

export interface Student {
  number?: number;
  name: string;
  category: 'rating' | 'study' | 'etc' | 'general' | 'external';
  title: string;
  date: string;
  isPublic?: boolean;
}

export const STUDENT_LIST_COLUMN: Array<ColumnDef<Student>> = [
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
        {row.original.number ?? '-'}
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
    id: 'handleName',
    accessorKey: 'handleName',
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
        {row.original.number ?? '-'}
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
        {row.original.number ?? '-'}
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
        {row.original.number ?? '-'}
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
    cell: ({ row }: { row: { original: Student } }) => (
      <Label size="md" weight="regular">
        {row.original.number ?? '-'}
      </Label>
    ),
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
    cell: ({ row }: { row: { original: Student } }) => (
      <Label size="md" weight="regular">
        {row.original.number ?? '-'}
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
        현재 상태
      </Label>
    ),
    cell: ({ row }: { row: { original: Student } }) => (
      <Label size="md" weight="regular">
        {row.original.number ?? '-'}
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
          console.log('Edit clicked for:', row.original);
        }}
      >
        탈퇴
      </Button>
    ),
    footer: (props) => props.column.id,
  },
];
