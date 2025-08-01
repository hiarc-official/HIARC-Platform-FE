import { cn, Label } from '@hiarc-platform/ui';

interface NoticeContentSectionProps {
  content?: string;
  className?: string;
}

export function NoticeContentSection({
  content,
  className,
}: NoticeContentSectionProps): React.ReactElement {
  return (
    <div className={cn('w-full self-start', className)}>
      <Label size="lg" className="text-gray-900">
        {content}
      </Label>
    </div>
  );
}
