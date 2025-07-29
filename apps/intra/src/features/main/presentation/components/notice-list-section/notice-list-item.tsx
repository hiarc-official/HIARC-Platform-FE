import { CategoryChip, cn, Label } from '@hiarc-platform/ui';

interface NoticeListItemProps {
  title: string;
  category: 'rating' | 'study' | 'etc' | 'general' | 'external';
  date?: string;
  className?: string;
}

export function NoticeListItem({
  title,
  category,
  date,
  className,
}: NoticeListItemProps): React.ReactElement {
  return (
    <div
      className={cn(
        'flex w-full gap-2 border-b border-gray-200 p-3',
        'cursor-pointer transition-colors duration-200 hover:bg-gray-50',
        className
      )}
    >
      <div className="w-20">
        <CategoryChip category={category} />
      </div>
      <div className="flex w-full items-center justify-between">
        <Label size="md" weight={category === 'rating' ? 'bold' : 'regular'} className="">
          {title}
        </Label>
        <Label size="sm" className="cursor-pointer text-gray-700">
          {date}
        </Label>
      </div>
    </div>
  );
}
