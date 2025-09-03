import { BackButton } from '../../back-button';
import { Divider } from '../../divider';
import { Title } from '../../label/title';
import { cn } from '../../../lib/utils';
import { useRouter } from 'next/navigation';

import React from 'react';

interface AnnouncementDesktopHeaderProps {
  title: string;
  className?: string;
}

export function AnnouncementDesktopHeader({
  title,
  className,
}: AnnouncementDesktopHeaderProps): React.ReactElement {
  const router = useRouter();

  const handleBackClick = (): void => {
    router.back();
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
