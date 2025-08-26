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
  const formatContent = (text?: string) => {
    if (!text) return '';
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className={cn('min-h-40 w-full self-start', className)}>
      <Label size="lg" className="text-gray-900">
        {formatContent(content)}
      </Label>
    </div>
  );
}
