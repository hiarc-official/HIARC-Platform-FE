import { cn } from '../../../lib/utils';
import { Label } from '../../label/label';

interface AnnouncementContentSectionProps {
  content?: string;
  className?: string;
}

export function AnnouncementContentSection({
  content,
  className,
}: AnnouncementContentSectionProps): React.ReactElement {
  return (
    <div className={cn('w-full self-start', className)}>
      <Label size="lg" className="text-gray-900">
        {content}
      </Label>
    </div>
  );
}