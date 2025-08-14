import { Divider } from '../../divider';
import { Label } from '../../label/label';
import { Title } from '../../label/title';

interface HeaderSectionProps {
  announcementTitle: string;
  announcementCategory: 'RATING' | 'STUDY' | 'ETC' | 'GENERAL' | 'EXTERNAL';
  announcementDate: string;
}

export function HeaderSection({
  announcementTitle,
  announcementCategory,
  announcementDate,
}: HeaderSectionProps): React.ReactElement {
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <Title size="sm" weight="bold" disableAnimation>
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
    </>
  );
}