import { CategoryChip, cn, Label } from '@hiarc-platform/ui';

interface RatingListItemProps {
  title: string;
  category: 'RATING' | 'STUDY' | 'ETC' | 'GENERAL' | 'EXTERNAL';
  className?: string;
}

export function RatingListItem({
  title,
  category,
  className,
}: RatingListItemProps): React.ReactElement {
  return (
    <div className={cn('flex w-full gap-2 border-b border-gray-200 p-3', className)}>
      <div className="w-20 flex-shrink-0">
        <CategoryChip category={category} />
      </div>
      <div className="flex w-full min-w-0 flex-grow items-center">
        <Label
          size="md"
          weight={category === 'RATING' ? 'bold' : 'regular'}
          className="min-w-0 truncate"
        >
          {title}
        </Label>
      </div>
    </div>
  );
}
