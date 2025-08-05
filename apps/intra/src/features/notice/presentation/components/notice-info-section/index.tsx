import { cn, Divider, Label, Title } from '@hiarc-platform/ui';

interface NoticeInfoSectionProps {
  noticeTitle: string;
  noticeCategory: 'rating' | 'study' | 'etc' | 'general' | 'external';
  noticeDate: string;
  className?: string;
}

export function NoticeInfoSection({
  noticeTitle,
  noticeCategory,
  noticeDate,
  className,
}: NoticeInfoSectionProps): React.ReactElement {
  return (
    <div className={cn('flex w-full flex-col', className)}>
      <div className="flex w-full items-center justify-between">
        <Title size="sm" weight="bold">
          {noticeTitle}
        </Title>
        <div className="flex items-center gap-3">
          <Label size="md" className="text-orange">
            {noticeCategory}
          </Label>
          <Divider variant="vertical" size="10px" />
          <Label size="md" className="text-gray-700">
            {noticeDate}
          </Label>
        </div>
      </div>
      <Divider variant="horizontal" size="full" className="mt-6" />
    </div>
  );
}
