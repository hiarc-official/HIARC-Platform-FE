import {
  AnnnouncementType,
  getAnnouncementTypeLabel,
  getAnnouncementTypeTextColor,
} from '@hiarc-platform/shared';
import { Divider } from '@hiarc-platform/design-system';
import { Label } from '@hiarc-platform/design-system';
import { Title } from '@hiarc-platform/design-system';
import { cn } from '@hiarc-platform/design-system';
import { DateUtil } from '@hiarc-platform/shared';

interface HeaderSectionProps {
  announcementTitle: string;
  announcementCategory: 'RATING' | 'STUDY' | 'ETC' | 'GENERAL' | 'EXTERNAL';
  announcementDate?: Date;
}

export function HeaderSection({
  announcementTitle,
  announcementCategory,
  announcementDate,
}: HeaderSectionProps): React.ReactElement {
  return (
    <>
      <div className="flex w-full flex-col md:flex-row md:items-center md:justify-between">
        <Title size="sm" weight="bold" disableAnimation>
          {announcementTitle}
        </Title>
        <div className="mt-2 flex items-center gap-3 md:mt-0">
          <Label
            size="md"
            className={cn(getAnnouncementTypeTextColor(AnnnouncementType[announcementCategory]))}
          >
            {getAnnouncementTypeLabel(AnnnouncementType[announcementCategory])}
          </Label>
          <Divider variant="vertical" size="10px" className="hidden md:block" />
          <Label size="md" className="text-gray-700">
            {DateUtil.formatDateWithDots(announcementDate ?? '')}
          </Label>
        </div>
      </div>
      <Divider variant="horizontal" size="full" className="mt-6 hidden md:block" />
    </>
  );
}
