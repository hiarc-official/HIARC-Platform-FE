import { cn } from '@hiarc-platform/ui';
import { NextButton } from './next-button';
import { PreviousButton } from './previous-button';

interface NoticeIndicatorSectionProps {
  className?: string;
}

export function NoticeIndicatorSection({
  className,
}: NoticeIndicatorSectionProps): React.ReactElement {
  return (
    <div className={cn('flex w-full flex-col md:flex-row md:justify-between md:gap-2', className)}>
      <PreviousButton onClick={() => {}} />
      <NextButton onClick={() => {}} />
    </div>
  );
}
