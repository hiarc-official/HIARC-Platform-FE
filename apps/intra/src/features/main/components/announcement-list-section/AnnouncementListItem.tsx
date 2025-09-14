import { CategoryChip, cn, Label } from '@hiarc-platform/ui';
import { useRouter } from 'next/navigation';

interface AnnouncementListItemProps {
  announcementId: number;
  title: string;
  category: 'RATING' | 'STUDY' | 'ETC' | 'GENERAL' | 'EXTERNAL';
  date?: string;
  className?: string;
}

export function AnnouncementListItem({
  announcementId,
  title,
  category,
  date,
  className,
}: AnnouncementListItemProps): React.ReactElement {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/announcement/${announcementId}`);
      }}
      className={cn(
        'flex w-full gap-2 border-b border-gray-200 p-3',
        'cursor-pointer transition-colors duration-200 hover:bg-gray-50',
        className
      )}
    >
      <div className="w-20 flex-shrink-0">
        <CategoryChip category={category} />
      </div>
      <div className="flex w-full min-w-0 flex-grow cursor-pointer items-center justify-between">
        <Label
          size="md"
          weight={category === 'RATING' ? 'bold' : 'regular'}
          className="min-w-0 cursor-pointer truncate"
        >
          {title}
        </Label>
        <Label
          size="sm"
          className="ml-2 flex-shrink-0 cursor-pointer whitespace-nowrap text-gray-700"
        >
          {date}
        </Label>
      </div>
    </div>
  );
}
