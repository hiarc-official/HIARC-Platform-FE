'use client';

import { BackButton, Button } from '@hiarc-platform/ui';
import { useRouter } from 'next/navigation';

interface AnnouncementNavigationSectionProps {
  className?: string;
  showBackButton?: boolean;
}

export function AnnouncementNavigationSection({
  className,
  showBackButton = false
}: AnnouncementNavigationSectionProps): React.ReactElement {
  const router = useRouter();

  const handleGoBack = (): void => {
    router.back();
  };

  const handleGoToList = (): void => {
    router.push('/announcement');
  };

  if (showBackButton) {
    return <BackButton onClick={handleGoBack} />;
  }

  return (
    <Button variant="line" className={className} onClick={handleGoToList}>
      목록으로
    </Button>
  );
}