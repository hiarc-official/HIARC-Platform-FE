import { cn, Divider, Label, Title } from '@hiarc-platform/ui';
import Image from 'next/image';

interface AnnouncementInfoSectionProps {
  announcementTitle: string;
  announcementCategory: 'RATING' | 'STUDY' | 'ETC' | 'GENERAL' | 'EXTERNAL';
  announcementDate: string;
  urlList?: string[];
  className?: string;
}

export function AnnouncementInfoSection({
  announcementTitle,
  announcementCategory,
  announcementDate,
  urlList,
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
      <div className="flex w-full">
        <Image src="/shared-assets/Link.svg" width={20} height={20} alt="link" />
        <Label size="lg" weight="semibold">
          관련 URL
        </Label>
        <div className="flex w-full flex-col">
          {urlList?.map((url, index) => (
            <a key={index} href={url} className="text-blue-500 hover:underline">
              {url}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
