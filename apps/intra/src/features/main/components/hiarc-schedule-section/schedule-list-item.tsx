import { CategoryChip, cn, Label } from '@hiarc-platform/ui';

interface ScheduleListItemProps {
  title: string;
  category: 'RATING' | 'STUDY' | 'ETC' | 'GENERAL' | 'EXTERNAL';
  date?: string;
  className?: string;
}

export function ScheduleListItem({
  title,
  category,
  date,
  className,
}: ScheduleListItemProps): React.ReactElement {
  return (
    <div
      className={cn(
        'flex w-full gap-2 rounded-sm border border-gray-200 p-3',
        'cursor-pointer transition-colors duration-200 hover:bg-gray-50',
        className
      )}
    >
      <div className="w-20">
        <CategoryChip category={category} />
      </div>
      <div className="flex w-full items-center justify-between">
        <Label size="md" className="">
          {title}
        </Label>
        <Label size="sm" className="cursor-pointer text-gray-700">
          {date}
        </Label>
      </div>
    </div>
  );
}
