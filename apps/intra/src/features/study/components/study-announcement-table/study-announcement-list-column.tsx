import { Label } from '@hiarc-platform/ui';
import { ColumnDef } from '@tanstack/react-table';
import { StudyAnnouncement } from '.';

export const STUDY_ANNOUNCEMENT_LIST_COLUMN: Array<ColumnDef<StudyAnnouncement>> = [
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
    cell: ({ row }: { row: { original: StudyAnnouncement } }) => (
      <Label size="md" weight="regular">
        {row.original.number ?? '-'}
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
    cell: ({ row }: { row: { original: StudyAnnouncement } }) => (
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
    cell: ({ row }: { row: { original: StudyAnnouncement } }) => (
      <Label size="md" weight="regular">
        {row.original.date ?? '-'}
      </Label>
    ),
  },
];