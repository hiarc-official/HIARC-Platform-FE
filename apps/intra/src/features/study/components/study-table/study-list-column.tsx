import { Label, CategoryChip } from '@hiarc-platform/ui';
import { ColumnDef } from '@tanstack/react-table';
import { StudySummary } from '../../types/study-summary';

export const STUDY_LIST_COLUMN: Array<ColumnDef<StudySummary>> = [
  {
    id: 'semesterInfo',
    accessorKey: 'semesterYear',
    size: 120,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        학기
      </Label>
    ),
    cell: ({ row }: { row: { original: StudySummary } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.semesterYear} {row.original.semesterType}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'difficulty',
    accessorKey: 'difficulty',
    size: 100,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        난이도
      </Label>
    ),
    cell: ({ row }: { row: { original: StudySummary } }) => (
      <CategoryChip category={row.original.difficulty}></CategoryChip>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'activeStatus',
    accessorKey: 'activeStatus',
    size: 150,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        상태
      </Label>
    ),
    cell: ({ row }: { row: { original: StudySummary } }) => (
      <Label size="md" weight="regular">
        {row.original.activeStatus}
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
        스터디명
      </Label>
    ),
    cell: ({ row }: { row: { original: StudySummary } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.name ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'instructor',
    accessorKey: 'instructorName',
    size: 200,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        담당자
      </Label>
    ),
    cell: ({ row }: { row: { original: StudySummary } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.instructorName} ({row.original.instructorBojHandle})
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'enrollment',
    accessorKey: 'isEnrolled',
    size: 100,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        신청상태
      </Label>
    ),
    cell: ({ row }: { row: { original: StudySummary } }) => (
      <Label
        size="sm"
        weight="regular"
        className={row.original.isEnrolled ? 'text-green-600' : 'text-gray-700'}
      >
        {row.original.isEnrolled ? '신청됨' : '미신청'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
];
