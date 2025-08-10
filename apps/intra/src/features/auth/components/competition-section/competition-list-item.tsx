import {
  cn,
  Divider,
  IconButton,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@hiarc-platform/ui';

interface CompetitionListItemProps {
  institution?: string;
  name: string;
  date: string;
  award?: string;
}

export function CompetitionListItem({
  institution,
  name,
  date,
  award,
}: CompetitionListItemProps): React.ReactElement {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-between',
        'border-b border-gray-200',
        'gap-4 py-4'
      )}
    >
      <div className="flex w-full flex-col">
        <Label size="sm" className="text-gray-500">
          {date}
        </Label>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            {institution && (
              <div className="flex flex-row items-center gap-2">
                <Label size="lg">{institution}</Label>
                <Divider variant="vertical" size="10px" />
              </div>
            )}
            <Label size="lg">{name}</Label>
          </div>
          <Label size="lg" weight="bold">
            {award || '참여'}
          </Label>
        </div>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <IconButton type="button" iconSrc="/shared-assets/More.svg" />
        </PopoverTrigger>
        <PopoverContent align="end">
          <button className="flex h-10 w-24 items-center rounded-sm transition-colors hover:bg-gray-100">
            <Label className="ml-3">수정</Label>
          </button>
          <button className="flex h-10 w-24 items-center rounded-sm transition-colors hover:bg-gray-100">
            <Label className="ml-3">삭제</Label>
          </button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
