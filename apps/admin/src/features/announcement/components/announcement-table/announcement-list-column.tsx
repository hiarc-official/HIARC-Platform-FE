import {
  Label,
  CategoryChip,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  DialogUtil,
} from '@hiarc-platform/ui';
import { ColumnDef } from '@tanstack/react-table';
import { AnnouncementSummary } from '@hiarc-platform/shared/src/types/announcement/announcement_summary';

export const getAdminAnnouncementListColumn = (
  deleteAnnouncement: (
    id: number,
    options?: { onSuccess?(): void; onError?(error: unknown): void }
  ) => void,
  onEdit: (id: number) => void
): Array<ColumnDef<AnnouncementSummary>> => [
  {
    id: 'announcementId',
    accessorKey: 'announcementId',
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
    footer: (props) => props.column.id,
  },
  {
    id: 'announcementType',
    accessorKey: 'announcementType',
    size: 100,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        카테고리
      </Label>
    ),
    cell: ({ row }: { row: { original: AnnouncementSummary } }) => (
      <CategoryChip category={row.original.announcementType ?? 'RATING'} />
    ),
    footer: (props) => props.column.id,
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
    footer: (props) => props.column.id,
  },
  {
    id: 'author',
    accessorKey: 'authorName',
    size: 64,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        작성자
      </Label>
    ),
    cell: ({ row }: { row: { original: AnnouncementSummary } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.authorName ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
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
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.createdAt
          ? new Date(row.original.createdAt).toLocaleDateString('ko-KR')
          : '-'}
      </Label>
    ),
  },
  {
    id: 'isPublic',
    accessorKey: 'isPublic',
    size: 64,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        공개 여부
      </Label>
    ),
    cell: ({ row }: { row: { original: AnnouncementSummary } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.isPublic === null
          ? '비공개'
          : row.original.isPublic === true
            ? '공개'
            : '비공개'}
      </Label>
    ),
  },
  {
    id: 'edit',
    size: 64,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        더보기
      </Label>
    ),
    cell: ({ row }: { row: { original: AnnouncementSummary } }) => (
      <Popover>
        <PopoverTrigger asChild>
          <IconButton
            type="button"
            iconSrc="/shared-assets/More.svg"
            onClick={(event) => event.stopPropagation()}
          />
        </PopoverTrigger>
        <PopoverContent align="end" onClick={(event) => event.stopPropagation()}>
          <button
            className="flex h-10 w-24 items-center rounded-sm transition-colors hover:bg-gray-100"
            onClick={(event) => {
              event.stopPropagation();
              if (row.original.announcementId) {
                onEdit(row.original.announcementId);
              }
            }}
          >
            <Label className="ml-3">수정</Label>
          </button>
          <button
            className="flex h-10 w-24 items-center rounded-sm transition-colors hover:bg-gray-100"
            onClick={(event) => {
              event.stopPropagation();
              DialogUtil.showConfirm(
                '삭제된 공지사항은 복구할 수 없습니다.',
                () => {
                  if (row.original.announcementId) {
                    deleteAnnouncement(row.original.announcementId, {
                      onSuccess: () => {
                        DialogUtil.showSuccess('삭제되었습니다.');
                      },
                      onError: (error) => {
                        const errorMessage =
                          error instanceof Error ? error.message : '삭제에 실패했습니다.';
                        DialogUtil.showError(errorMessage);
                      },
                    });
                  }
                },
                undefined,
                {
                  title: '정말로 삭제하시겠습니까?',
                }
              );
            }}
          >
            <Label className="ml-3">삭제</Label>
          </button>
        </PopoverContent>
      </Popover>
    ),
  },
];
