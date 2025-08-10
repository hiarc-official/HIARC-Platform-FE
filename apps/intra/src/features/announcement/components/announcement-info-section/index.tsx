import { cn, Divider, Label, Title } from '@hiarc-platform/ui';

interface AnnouncementInfoSectionProps {
  announcementTitle: string;
  announcementCategory: 'rating' | 'study' | 'etc' | 'general' | 'external';
  announcementDate: string;
  className?: string;
}

export function AnnouncementInfoSection({
  announcementTitle,
  announcementCategory,
  announcementDate,
  className,
}: AnnouncementInfoSectionProps): React.ReactElement {
  return (
    <div className={cn('flex w-full flex-col', className)}>
      <div className="flex w-full items-center justify-between">
        <Title size="sm" weight="bold">
          {announcementTitle}
        </Title>
        <div className="flex items-center gap-3">
          <Label size="md" className="text-orange">
            {announcementCategory}
          </Label>
          <Divider variant="vertical" size="10px" />
          <Label size="md" className="text-gray-700">
            {announcementDate}
          </Label>
        </div>
      </div>
      <Divider variant="horizontal" size="full" className="mt-6" />
    </div>
  );
}