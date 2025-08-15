import { cn, Divider } from '@hiarc-platform/ui';
import { StudyInfo } from './study-info';
import { StudyTitle } from './study-title';
import { Study } from '@hiarc-platform/shared';

interface StudyInfoSectionProps {
  className?: string;
  studyData?: Study | null;
}

export function StudyInfoSection({
  className,
  studyData,
}: StudyInfoSectionProps): React.ReactElement {
  return (
    <div className={cn('flex w-full flex-col', className)}>
      <StudyTitle studyData={studyData} />
      <Divider variant="horizontal" size="full" className="mb-6 mt-4" />
      <StudyInfo studyData={studyData} />
      <Divider variant="horizontal" size="full" className="mt-6 bg-gray-200" />
    </div>
  );
}
