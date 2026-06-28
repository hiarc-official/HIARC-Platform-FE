import { BackButton } from '@hiarc-platform/design-system';
import { Divider } from '@hiarc-platform/design-system';
import { Title } from '@hiarc-platform/design-system';
import { cn } from '@hiarc-platform/design-system';

import React from 'react';

interface AnnouncementDesktopHeaderProps {
  title: string;
  className?: string;
  onBackClick?(): void;
}

export function AnnouncementDesktopHeader({
  title,
  className,
  onBackClick,
}: AnnouncementDesktopHeaderProps): React.ReactElement {
  const handleBackClick = (): void => {
    onBackClick?.();
  };

  return (
    <div className={cn('hidden md:block', className)}>
      <div className="flex w-full flex-col items-center gap-3">
        <BackButton onClick={handleBackClick} />
        <div className="flex w-full items-center justify-between">
          <Title size="sm" weight="bold">
            {title}
          </Title>
        </div>
        <Divider variant="horizontal" size="full" />
      </div>
    </div>
  );
}
