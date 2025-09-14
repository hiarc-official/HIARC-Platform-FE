import { CategoryChip, cn, Label } from '@hiarc-platform/ui';
import { useRouter } from 'next/navigation';

interface AnnouncementListItemProps {
  announcementId: number;
  title: string;
  category: 'RATING' | 'STUDY' | 'ETC' | 'GENERAL' | 'EXTERNAL';
  date?: string;
  className?: string;
  isEvent?: boolean;
}

export function AnnouncementListItem({
  announcementId,
  title,
  category,
  date,
  className,
  isEvent = false,
}: AnnouncementListItemProps): React.ReactElement {
  const router = useRouter();
  return (
    <div
      onClick={!isEvent ? () => router.push(`/announcement/${announcementId}`) : undefined}
      className={cn(
        'flex w-full gap-2 border-b border-gray-200 p-3',
        !isEvent && 'cursor-pointer transition-colors duration-200 hover:bg-gray-50',
        className
      )}
    >
      <div className="w-20 flex-shrink-0">
        <CategoryChip category={category} />
      </div>
      <div
        className={cn(
          'flex w-full min-w-0 flex-grow items-center justify-between',
          !isEvent && 'cursor-pointer'
        )}
      >
        <Label
          size="md"
          weight={category === 'RATING' ? 'bold' : 'regular'}
          className={cn('min-w-0 truncate', !isEvent && 'cursor-pointer')}
        >
          {title}
        </Label>
        <Label
          size="sm"
          className={cn(
            'ml-2 flex-shrink-0 whitespace-nowrap text-gray-700',
            !isEvent && 'cursor-pointer'
          )}
        >
          {date}
        </Label>
      </div>
    </div>
  );
}
