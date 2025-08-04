import { cn, Divider } from '@hiarc-platform/ui';
import { StudyInfo } from './study-info';
import { StudyTitle } from './study-title';

interface StudyInfoSectionProps {
  className?: string;
}

export function StudyInfoSection({ className }: StudyInfoSectionProps): React.ReactElement {
  return (
    <div className={cn('flex w-full flex-col', className)}>
      <StudyTitle />
      <Divider variant="horizontal" size="full" className="mb-6 mt-4" />
      <StudyInfo />
      <Divider variant="horizontal" size="full" className="mt-6 bg-gray-200" />
    </div>
  );
}
